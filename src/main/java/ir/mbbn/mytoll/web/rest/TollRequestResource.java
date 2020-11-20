package ir.mbbn.mytoll.web.rest;

import io.github.jhipster.web.util.ResponseUtil;
import ir.mbbn.mytoll.domain.Bill;
import ir.mbbn.mytoll.domain.PayRequest;

import ir.mbbn.mytoll.domain.enumeration.BillStatus;
import ir.mbbn.mytoll.repository.PayRequestRepository;
import ir.mbbn.mytoll.service.TollRequestService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

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
    private final PayRequestRepository payRequestRepository;

    public TollRequestResource(TollRequestService tollRequestService, PayRequestRepository payRequestRepository) {
        this.tollRequestService = tollRequestService;
        this.payRequestRepository = payRequestRepository;
    }

    /**
     * {@code GET  /toll-requests} : get the plate bills.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of plate bills in body.
     */
    @GetMapping("/get-plate-bills")
    public List<Bill> getPlateBills(@Valid @RequestParam Integer plate) throws URISyntaxException {
        log.debug("REST request to get Plate Bills");
        return tollRequestService.getPlateBills(plate);
    }

    @PostMapping("/pay")
    public String pay(@RequestBody PayRequest payRequest) throws URISyntaxException {
        log.debug("REST request to Pay Bills");
        return tollRequestService.pay(payRequest);
    }

    @GetMapping("/getPayRequest")
    public ResponseEntity<PayRequest> getPayRequest(@RequestParam String trackingId) throws URISyntaxException {
        log.debug("REST request to Pay Bills");
        Optional<PayRequest> optionalPayRequest = payRequestRepository.findOneByTrackingId(trackingId);
        return ResponseUtil.wrapOrNotFound(optionalPayRequest);
    }

    @GetMapping("/verifyPay")
    public ResponseEntity<PayRequest> verifyPay(@RequestParam String trackingId) throws URISyntaxException {
        log.debug("REST request to Pay Bills");
        Optional<PayRequest> optionalPayRequest = payRequestRepository.findOneByTrackingId(trackingId);
        if(optionalPayRequest.isPresent()){
            PayRequest payRequest = optionalPayRequest.get();
            for(Bill bill: payRequest.getBills()){
                bill.setBillStatus(BillStatus.PAID);
            }
            payRequestRepository.save(payRequest);
        }
        return ResponseUtil.wrapOrNotFound(optionalPayRequest);
    }
}
