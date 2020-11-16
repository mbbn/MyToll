package ir.mbbn.mytoll.web.rest;

import io.github.jhipster.web.util.HeaderUtil;
import ir.mbbn.mytoll.domain.Bill;
import ir.mbbn.mytoll.domain.Customer;
import ir.mbbn.mytoll.domain.PayRequest;
import ir.mbbn.mytoll.domain.TollRequest;

import ir.mbbn.mytoll.service.TollRequestService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Set;

/**
 * REST controller for managing {@link ir.mbbn.mytoll.domain.TollRequest}.
 */
@RestController
@RequestMapping("/api/toll-requests")
public class TollRequestResource {

    private final Logger log = LoggerFactory.getLogger(TollRequestResource.class);

    private static final String ENTITY_NAME = "tollRequest";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TollRequestService tollRequestService;

    public TollRequestResource(TollRequestService tollRequestService) {
        this.tollRequestService = tollRequestService;
    }

    /**
     * {@code GET  /toll-requests} : get the plate bills.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of plate bills in body.
     */
    @PostMapping("/get-plate-bills")
    public List<Bill> getPlateBills(@Valid @RequestBody TollRequest tollRequest) throws URISyntaxException {
        log.debug("REST request to get Plate Bills");
        return tollRequestService.getPlateBills(tollRequest);
    }

    @PostMapping("/mPayBill")
    public ResponseEntity<PayRequest> mPayBill(@RequestBody PayRequest payRequest) throws URISyntaxException {
        log.debug("REST request to Pay Bills");
        String today = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddhhmmss"));
        Customer customer = payRequest.getCustomer();
        String trackId = today + customer.getMobile();
        payRequest.setTrackingId(trackId);
        Set<Bill> bills = tollRequestService.mPayBill(trackId, payRequest.getBills());
        payRequest.setBills(bills);

        return ResponseEntity.accepted()
            .body(payRequest);
    }

    @PostMapping("/pay")
    public void pay(@RequestBody PayRequest payRequest) throws URISyntaxException {
        log.debug("REST request to Pay Bills");
        tollRequestService.pay(payRequest);
    }
}
