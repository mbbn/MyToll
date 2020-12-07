package ir.mbbn.mytoll.service;

import ir.mbbn.mytoll.config.ApplicationProperties;
import ir.mbbn.mytoll.domain.Bill;
import ir.mbbn.mytoll.domain.Customer;
import ir.mbbn.mytoll.domain.PayRequest;
import ir.mbbn.mytoll.domain.TollRequest;
import ir.mbbn.mytoll.domain.enumeration.BillStatus;
import ir.mbbn.mytoll.domain.enumeration.TaxCategory;
import ir.mbbn.mytoll.repository.BillRepository;
import ir.mbbn.mytoll.repository.CustomerRepository;
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

    private String token;
    private Date expireTime;

    public TollRequestService(ApplicationProperties applicationProperties, CustomerRepository customerRepository, BillRepository billRepository, PaymentService paymentService) {
        sepandar = applicationProperties.getTax();
        this.customerRepository = customerRepository;
        this.billRepository = billRepository;
        this.paymentService = paymentService;
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
                ResponseEntity<SepandarResponseDto<LoginResponseDto>> response = exchange(uri, HttpMethod.POST, null, new ParameterizedTypeReference<SepandarResponseDto<LoginResponseDto>>() {});
                SepandarResponseDto<LoginResponseDto> sepandarResponseDto = response.getBody();
                if(sepandarResponseDto!= null && sepandarResponseDto.isSuccess()){
                    LoginResponseDto loginResponseDto = sepandarResponseDto.getResult();
                    expireTime = loginResponseDto.getExpiredTime();
                    token = loginResponseDto.getToken();
                    log.trace("login with params username:{}, password:{}, appId:{}, orgId:{}", username, password, appId, orgId);
                    return token;
                } else {
                    assert sepandarResponseDto != null;
                    log.error("failed to login with params username:{}, password:{}, appId:{}, orgId:{} ({})==> {}", username, password, appId, orgId, sepandarResponseDto.getErrorCode(), sepandarResponseDto.getMessage());
                    throw new RuntimeException("failed to login");
                }
            } catch (RestClientException e) {
                log.error("failed to login with params username:{}, password:{}, appId:{}, orgId:{}", username, password, appId, orgId);
                log.trace("failed to login with params username:{}, password:{}, appId:{}, orgId:{}", username, password, appId, orgId, e);
                throw new RuntimeException("failed to login");
            }
        } else {
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
                List<Bill> results = new ArrayList<>();
                for(BillDto billDto:result.getData()){
                    Bill bill = new Bill();
                    bill.setBillStatus(BillStatus.UNPAID);
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
                    results.add(bill);
                }
                log.trace("get plate bills of {} ==> {}", plate, results);
                return results;
            } else {
                assert sepandarResponseDto != null;
                log.error("failed to get plate bills of {} ({})==>{}", plate, sepandarResponseDto.getErrorCode(), sepandarResponseDto.getMessage());
                throw new RuntimeException("failed to get plate bills");
            }
        } catch (RestClientException e) {
            log.error("failed to get plate bills of {}", plate);
            log.trace("failed to get plate bills of {}", plate, e);
            throw new RuntimeException("failed to get plate bills");
        }
    }

    public String pay(PayRequest payRequest) {
        payRequest.setPaid(null);
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
            log.trace("register customer with mobileNumber:{}", mobileNumber);
        }
        payRequest.setCustomer(customer);

        String today = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddhhmmss"));
        String trackId = today + customer.getMobile();
        payRequest.setTrackingId(trackId);

        Integer totalAmount = 0;
        Set<Bill> bills = new HashSet<>();
        for (Bill payBill : payRequest.getBills()) {
            if(payBill.getId() != null){
                Bill bill = billRepository.getOne(payBill.getId());
                bills.add(bill);
            }else {
                bills.add(payBill);
            }
            totalAmount += payBill.getAmount();
        }
        payRequest.setBills(bills);
        payRequest.setAmount(totalAmount);
        return paymentService.pay(payRequest);
    }

    /*public PayRequest mPayBill(PayRequest payRequest) {
        String trackingId = payRequest.getTrackingId();
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
                        if("Paid".equalsIgnoreCase(payBillDto.getStatus())){
                            b.setBillStatus(BillStatus.DEPOSIT);
                        }
                        b.setSepandarShare(payBillDto.getSepandarShare());
                        b.setIssuerShare(payBillDto.getIssuerShare());
                        b.setCpayTaxId(payBillDto.getCpayTaxId());
                        resultBills.add(b);
                    }
                }
                payRequest.setBills(resultBills);
                return payRequestRepository.save(payRequest);
            }else {
                throw new RuntimeException("failed to login");
            }
        } catch (RestClientException e) {
            throw new RuntimeException("failed to login");
        }
    }

    public PayRequest trackingVerification(PayRequest payRequest) {
        try {
            String token = login();
            String M_PAY_BILL_PATH = "api/bill/trackingVerification";
            URI uri = getUrlBuilder().path(M_PAY_BILL_PATH).build();
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.AUTHORIZATION, token);
            headers.add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);

            TrackingVerificationRequestDto trackingVerificationRequestDto = new TrackingVerificationRequestDto();
            String trackingId = payRequest.getTrackingId();
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
                        payedBill.setBillStatus(BillStatus.VERIFIED);
                    }
                }
                return payRequestRepository.save(payRequest);
            }else {
                throw new RuntimeException("failed to login");
            }
        } catch (RestClientException e) {
            throw new RuntimeException("failed to login");
        }
    }*/
}
