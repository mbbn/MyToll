package ir.mbbn.mytoll.service;

import ir.mbbn.mytoll.config.ApplicationProperties;
import ir.mbbn.mytoll.domain.Bill;
import ir.mbbn.mytoll.domain.Customer;
import ir.mbbn.mytoll.domain.PayRequest;
import ir.mbbn.mytoll.domain.TollRequest;
import ir.mbbn.mytoll.domain.enumeration.TaxCategory;
import ir.mbbn.mytoll.repository.BillRepository;
import ir.mbbn.mytoll.repository.CustomerRepository;
import ir.mbbn.mytoll.repository.PayRequestRepository;
import ir.mbbn.mytoll.service.dto.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.DefaultUriBuilderFactory;
import org.springframework.web.util.UriBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link TollRequest}.
 */
@Service
@Transactional
public class TollRequestService extends RestTemplate {

    private final Logger log = LoggerFactory.getLogger(TollRequestService.class);

    private final ApplicationProperties.SepandarTax sepandar;
    private final CustomerRepository customerRepository;
    private final BillRepository billRepository;
    private final PaymentService paymentService;
    private final PayRequestRepository payRequestRepository;

    private String token;
    private Date expireTime;

    public TollRequestService(ApplicationProperties applicationProperties, CustomerRepository customerRepository, BillRepository billRepository, PaymentService paymentService, PayRequestRepository payRequestRepository) {
        sepandar = applicationProperties.getTax();
        this.customerRepository = customerRepository;
        this.billRepository = billRepository;
        this.paymentService = paymentService;
        this.payRequestRepository = payRequestRepository;
    }

    private UriBuilder getUrlBuilder(){
        String schema = sepandar.getSchema();
        String host = sepandar.getHost();
        int port = sepandar.getPort();
        UriBuilder builder = new DefaultUriBuilderFactory().builder();
        return builder.scheme(schema).host(host).port(port);
    }

    private String login() {
        if(token == null || expireTime == null || System.currentTimeMillis() > expireTime.getTime() ){
            String username = sepandar.getUsername();
            String password = sepandar.getPassword();
            String appId = sepandar.getAppId();
            String orgId = sepandar.getOrgId();
            try {
                String LOGIN_PATH = "/user/app/login";
                URI uri = getUrlBuilder().path(LOGIN_PATH)
                    .queryParam("username", username)
                    .queryParam("password", password)
                    .queryParam("appId", appId)
                    .queryParam("orgId", orgId).build();
                ResponseEntity<SepandarResponseDto<LoginResponseDto>> response = exchange(uri, HttpMethod.POST, null, new ParameterizedTypeReference<SepandarResponseDto<LoginResponseDto>>() {
                });
                SepandarResponseDto<LoginResponseDto> sepandarResponseDto = response.getBody();
                if(sepandarResponseDto!= null && sepandarResponseDto.isSuccess()){
                    LoginResponseDto loginResponseDto = sepandarResponseDto.getResult();
                    expireTime = loginResponseDto.getExpiredTime();
                    token = loginResponseDto.getToken();
                    return token;
                }else {
                    throw new RuntimeException("failed to login");
                }
            } catch (RestClientException e) {
                throw new RuntimeException("failed to login");
            }
        }else {
            return token;
        }
    }

    public List<Bill> getPlateBills(@Valid Integer plate) {
        try {
            String token = login();
            String GET_PLATE_BILLS_PATH = "api/bill/getPlateBills";
            URI uri = getUrlBuilder().path(GET_PLATE_BILLS_PATH).build();
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.AUTHORIZATION, token);
            headers.add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);

            PlateBillsRequestDto plateBillsRequestDto = new PlateBillsRequestDto();
            ArrayList<String> billTypeabbrivation = new ArrayList<>();
            billTypeabbrivation.add("NSHRPR");
            billTypeabbrivation.add("TEHPRK");
            billTypeabbrivation.add("SHZPRK");
            billTypeabbrivation.add("ISFPRK");
            billTypeabbrivation.add("KSHPRK");
            plateBillsRequestDto.setBillTypeabbrivation(billTypeabbrivation);
            plateBillsRequestDto.setPlate(plate);
            HttpEntity<PlateBillsRequestDto> requestEntity = new HttpEntity<>(plateBillsRequestDto, headers);
            ResponseEntity<SepandarResponseDto<PlateBillsResponseDto>> response = exchange(uri, HttpMethod.POST, requestEntity, new ParameterizedTypeReference<SepandarResponseDto<PlateBillsResponseDto>>() {});
            SepandarResponseDto<PlateBillsResponseDto> sepandarResponseDto = response.getBody();
            if(sepandarResponseDto!= null && sepandarResponseDto.isSuccess()){
                PlateBillsResponseDto result = sepandarResponseDto.getResult();
                return result.getData().stream().map(billDto -> {
                    Bill bill = new Bill();
                    bill.setCategory(TaxCategory.SIDEPARK);
                    BillTypeDto billType = billDto.getBillType();
                    if(billType!= null){
                        bill.setBillType(billType.getBillTypeabbrivation());
                        bill.setBillTypeTitle(billType.getBillTypeTitle());
                        bill.setCategory(TaxCategory.valueOf(billType.getCategoryName()));
                    }
                    ExtraInfoDto extraInfo = billDto.getExtraInfo();
                    if(extraInfo!=null){
                        bill.setStreet(extraInfo.getStreet());
                        bill.setFromDate(extraInfo.getFrom());
                        bill.setToDate(extraInfo.getTo());
                    }
                    bill.setPlate(String.valueOf(plate));
                    bill.setBillId(billDto.get_id());
                    bill.setAmount(billDto.getAmount());
                    bill.setExternalNumber(billDto.getExternalNumber());
                    bill.setBillDate(billDto.getBillDate());
                    return bill;
                }).collect(Collectors.toList());
            }else {
                throw new RuntimeException("failed to login");
            }
        } catch (RestClientException e) {
            throw new RuntimeException("failed to login");
        }
    }

    public String pay(PayRequest payRequest) {
        Customer customer = payRequest.getCustomer();
        String mobileNumber = customer.getMobile();
        customer = customerRepository.findOneCustomerByMobile(mobileNumber).orElse(null);
        if(customer == null){
            customer = new Customer();
            customer.creationBy(mobileNumber);
            customer.creationTime(ZonedDateTime.now());
            customer.lastUpdatedBy(mobileNumber);
            customer.lastUpdateTime(ZonedDateTime.now());
            customer.setMobile(mobileNumber);
            customerRepository.save(customer);
        }
        payRequest.setCustomer(customer);

        String today = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddhhmmss"));
        String trackId = today + customer.getMobile();
        payRequest.setTrackingId(trackId);

        Integer totalAmount = 0;
        Set<String> externalNumbers = payRequest.getBills().stream().map(Bill::getExternalNumber).collect(Collectors.toSet());
        Set<Bill> tryBills = billRepository.findAllByExternalNumberIn(externalNumbers);
        for (Bill payBill : payRequest.getBills()) {
            if (tryBills.stream().noneMatch(bill -> payBill.getExternalNumber().equals(bill.getExternalNumber()))) {
                payBill.setPaid(false);
                tryBills.add(payBill);
            }
            totalAmount += payBill.getAmount();
        }
        payRequest.setAmount(totalAmount);
        payRequest.setBills(tryBills);

        return paymentService.pay(payRequest);
    }

    public PayRequest mPayBill(String trackingId) {
        PayRequest payRequest = payRequestRepository.findOneByTrackingId(trackingId).orElse(null);
        if(payRequest != null){
            try {
                String token = login();
                String M_PAY_BILL_PATH = "api/bill/mPayBill";
                URI uri = getUrlBuilder().path(M_PAY_BILL_PATH).build();
                HttpHeaders headers = new HttpHeaders();
                headers.add(HttpHeaders.AUTHORIZATION, token);
                headers.add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);

                MPayBillRequestDto mPayBillRequestDto = new MPayBillRequestDto();
                mPayBillRequestDto.setBills(payRequest.getBills().stream().map(Bill::getBillId).toArray(String[]::new));
                mPayBillRequestDto.setExTrackingId(trackingId);

                HttpEntity<MPayBillRequestDto> requestEntity = new HttpEntity<>(mPayBillRequestDto, headers);
                ResponseEntity<SepandarResponseDto<MPayBillResponseDto>> response = exchange(uri, HttpMethod.POST, requestEntity, new ParameterizedTypeReference<SepandarResponseDto<MPayBillResponseDto>>() {});
                SepandarResponseDto<MPayBillResponseDto> sepandarResponseDto = response.getBody();
                if(sepandarResponseDto!= null && sepandarResponseDto.isSuccess()){
                    MPayBillResponseDto result = sepandarResponseDto.getResult();
                    Set<Bill> resultBills = new HashSet<>();
                    for(PayBillDto payBillDto:result.getData()){
                        Bill b = payRequest.getBills().stream().filter(bill -> payBillDto.getExTrackingId().equals(trackingId) &&  payBillDto.getExternalNumber().equals(bill.getExternalNumber())).findFirst().orElse(null);
                        if(b!=null){
                            b.setPaid("Paid".equalsIgnoreCase(payBillDto.getStatus()));
                            b.setSepandarShare(payBillDto.getSepandarShare());
                            b.setIssuerShare(payBillDto.getIssuerShare());
                            resultBills.add(b);
                        }
                    }
                    payRequest.setBills(resultBills);
                    payRequest = payRequestRepository.save(payRequest);
                    return payRequest;
                }else {
                    throw new RuntimeException("failed to login");
                }
            } catch (RestClientException e) {
                throw new RuntimeException("failed to login");
            }
        }
        return payRequest;
    }

    public PayRequest trackingVerification(String trackingId) {
        PayRequest payRequest = payRequestRepository.findOneByTrackingId(trackingId).orElse(null);
        if(payRequest != null){
            try {
                String token = login();
                String M_PAY_BILL_PATH = "api/bill/trackingVerification";
                URI uri = getUrlBuilder().path(M_PAY_BILL_PATH).build();
                HttpHeaders headers = new HttpHeaders();
                headers.add(HttpHeaders.AUTHORIZATION, token);
                headers.add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);

                TrackingVerificationRequestDto trackingVerificationRequestDto = new TrackingVerificationRequestDto();
                trackingVerificationRequestDto.setExTrackingId(trackingId);

                HttpEntity<TrackingVerificationRequestDto> requestEntity = new HttpEntity<>(trackingVerificationRequestDto, headers);
                ResponseEntity<SepandarResponseDto<TrackingVerificationResponseDto[]>> response = exchange(uri, HttpMethod.POST, requestEntity, new ParameterizedTypeReference<SepandarResponseDto<TrackingVerificationResponseDto[]>>() {});
                SepandarResponseDto<TrackingVerificationResponseDto[]> sepandarResponseDto = response.getBody();
                if(sepandarResponseDto!= null && sepandarResponseDto.isSuccess()){
                    TrackingVerificationResponseDto[] result = sepandarResponseDto.getResult();
                    for(TrackingVerificationResponseDto responseDto:result){
                        Set<Bill> bills = payRequest.getBills();
                        Bill payedBill = bills.stream().filter(bill -> bill.getBillId().equals(responseDto.getBillId())).findFirst().orElse(null);
                        if(payedBill != null){
                            payedBill.setPaid(responseDto.getPaid());
                        }
                    }
                    payRequest = payRequestRepository.save(payRequest);
                    return payRequest;
                }else {
                    throw new RuntimeException("failed to login");
                }
            } catch (RestClientException e) {
                throw new RuntimeException("failed to login");
            }
        }
        return payRequest;
    }
}
