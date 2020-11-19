package ir.mbbn.mytoll.service;

import ir.mbbn.mytoll.config.ApplicationProperties;
import ir.mbbn.mytoll.domain.Bill;
import ir.mbbn.mytoll.domain.Customer;
import ir.mbbn.mytoll.domain.PayRequest;
import ir.mbbn.mytoll.repository.PayRequestRepository;
import ir.mbbn.mytoll.service.dto.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.MessageSource;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.DefaultUriBuilderFactory;
import org.springframework.web.util.UriBuilder;

import java.net.URI;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Locale;

@Service
@Transactional
public class PaymentService extends RestTemplate {

    private final Logger log = LoggerFactory.getLogger(PaymentService.class);

    private final ApplicationProperties.SepandarPayment sepandarPayment;
    private final PayRequestRepository payRequestRepository;
    private final String accountNo;
    private final String payTitle;

    private String token;
    private Date expireTime;

    public PaymentService(ApplicationProperties applicationProperties, PayRequestRepository payRequestRepository, MessageSource messageSource) {
        this.sepandarPayment = applicationProperties.getPayment();
        this.payRequestRepository = payRequestRepository;
        this.accountNo = this.sepandarPayment.getAccountNo();
        this.payTitle = messageSource.getMessage("payment.pay.title", null, Locale.forLanguageTag("fa"));
    }

    private UriBuilder getUrlBuilder(){
        String schema = sepandarPayment.getSchema();
        String host = sepandarPayment.getHost();
        int port = sepandarPayment.getPort();
        UriBuilder builder = new DefaultUriBuilderFactory().builder();
        return builder.scheme(schema).host(host).port(port);
    }

    private String login() {
        if(token == null || expireTime == null || System.currentTimeMillis() > expireTime.getTime() ){
            String username = sepandarPayment.getUsername();
            String password = sepandarPayment.getPassword();
            String appId = sepandarPayment.getAppId();
            String orgId = sepandarPayment.getOrgId();
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

    public String pay(PayRequest payRequest){
        try {
            String token = login();
            String PAYMENT_CREATE_PATH = "api/payment/create";
            URI uri = getUrlBuilder().path(PAYMENT_CREATE_PATH).build();
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.AUTHORIZATION, token);
            headers.add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);

            PayRequestDto payRequestDto = new PayRequestDto();

            payRequest.setAccountNo(accountNo);
            payRequestDto.setAccountNo(accountNo);

            payRequest.setTitle(payTitle);
            payRequestDto.setTitle(payTitle);

            String[] externalId = payRequest.getBills().stream().map(Bill::getExternalNumber).toArray(String[]::new);
            payRequestDto.setExternalId(externalId);

            ZonedDateTime expirationDate = ZonedDateTime.now().plusDays(1);
            payRequestDto.setExpirationDate(expirationDate.format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'hh:mm:ss.SSSZ")));
            payRequest.setExpirationDate(expirationDate);

            Customer customer = payRequest.getCustomer();
            payRequestDto.setMobileNumber(customer.getMobile());
            payRequestDto.setSendSms(true);
            payRequest.setSendSms(true);
            payRequestDto.setSendEmail(false);
            payRequestDto.setAmount(payRequest.getAmount());

            String callBackUrl = sepandarPayment.getCallBackUrl() + "/" + payRequest.getTrackingId() + "/1";
            payRequestDto.setCallBackUrl(callBackUrl);
            payRequestDto.setCallBackService(callBackUrl);
            String failureCallBackUrl = sepandarPayment.getFailureCallBackUrl() + "/" + payRequest.getTrackingId() + "/0";
            payRequestDto.setFailureCallBackUrl(failureCallBackUrl);
            payRequestDto.setCallBackService(sepandarPayment.getCallBackUrlService());
            payRequest.setCallBackService(sepandarPayment.getCallBackUrlService());
            payRequestDto.setSource("IPG");

            payRequest.setRequestTime(ZonedDateTime.now());

            HttpEntity<PayRequestDto> requestEntity = new HttpEntity<>(payRequestDto, headers);
            ResponseEntity<SepandarResponseDto<PayResponseDto>> response = exchange(uri, HttpMethod.POST, requestEntity, new ParameterizedTypeReference<SepandarResponseDto<PayResponseDto>>() {});
            SepandarResponseDto<PayResponseDto> sepandarResponseDto = response.getBody();
            if(sepandarResponseDto!= null && sepandarResponseDto.isSuccess()){
                PayResponseDto result = sepandarResponseDto.getResult();
                return result.getUrl();
            }else {
                throw new RuntimeException("failed to login");
            }
        } catch (RestClientException e) {
            throw new RuntimeException("failed to login");
        } finally {
            payRequestRepository.save(payRequest);
        }
    }

    public List<PaymentDto> paid(ZonedDateTime startTime, ZonedDateTime endTime){
        try {
            String token = login();
            String PAYMENT_CREATE_PATH = "api/payment/getall/paid";
            URI uri = getUrlBuilder().path(PAYMENT_CREATE_PATH).build();
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.AUTHORIZATION, token);
            headers.add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);

            PaidRequestDto paidRequestDto = new PaidRequestDto();
            paidRequestDto.setStartTime(startTime);
            paidRequestDto.setEndTime(endTime);

            HttpEntity<PaidRequestDto> requestEntity = new HttpEntity<>(paidRequestDto, headers);
            ResponseEntity<SepandarResponseDto<PaidResponseDto>> response = exchange(uri, HttpMethod.POST, requestEntity, new ParameterizedTypeReference<SepandarResponseDto<PaidResponseDto>>() {});
            SepandarResponseDto<PaidResponseDto> sepandarResponseDto = response.getBody();
            if(sepandarResponseDto!= null && sepandarResponseDto.isSuccess()){
                PaidResponseDto result = sepandarResponseDto.getResult();
                return result.getPayments();
            }else {
                throw new RuntimeException("failed to login");
            }
        } catch (RestClientException e) {
            throw new RuntimeException("failed to login");
        }
    }
}
