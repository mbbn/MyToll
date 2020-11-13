package ir.mbbn.mytoll.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import ir.mbbn.mytoll.config.ApplicationProperties;
import ir.mbbn.mytoll.domain.Bill;
import ir.mbbn.mytoll.domain.Plate;
import ir.mbbn.mytoll.domain.TollRequest;
import ir.mbbn.mytoll.domain.enumeration.TaxCategory;
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
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URL;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link TollRequest}.
 */
@Service
@Transactional
public class TollRequestService extends RestTemplate {

    private final Logger log = LoggerFactory.getLogger(TollRequestService.class);

    private final ApplicationProperties.Sepandar sepandar;

    private String token;
    private Date expireTime;

    public TollRequestService(ApplicationProperties applicationProperties) {
        sepandar = applicationProperties.getSepandar();
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

    public List<Bill> getPlateBills(@Valid TollRequest tollRequest) {
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
            plateBillsRequestDto.setPlate(tollRequest.getPlate());
            plateBillsRequestDto.setFromDate(tollRequest.getFromDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'hh:mm:ss.SSSZ")));
            plateBillsRequestDto.setToDate(tollRequest.getToDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'hh:mm:ss.SSSZ")));
            plateBillsRequestDto.setPageNum(0);
            plateBillsRequestDto.setCount(10);
//            new ObjectMapper().writeValueAsString(tollRequest);
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
                    }
                    ExtraInfoDto extraInfo = billDto.getExtraInfo();
                    if(extraInfo!=null){
                        bill.setStreet(extraInfo.getStreet());
                        bill.setFromDate(extraInfo.getFrom());
                        bill.setToDate(extraInfo.getTo());
                    }
                    bill.setBillId(billDto.get_id());
                    bill.setAmount(billDto.getAmount());
                    bill.setExternalNumber(billDto.getExternalNumber());
                    bill.setBillDate(billDto.getBillDate());
                    Plate plate = new Plate();
                    plate.setCode(tollRequest.getPlate());
                    bill.setPlate(plate);
                    return bill;
                }).collect(Collectors.toList());
            }else {
                throw new RuntimeException("failed to login");
            }
        } catch (RestClientException e) {
            throw new RuntimeException("failed to login");
        }finally {

        }
    }
}
