package ir.mbbn.mytoll.web.rest;

import ir.mbbn.mytoll.domain.PayRequest;
import ir.mbbn.mytoll.repository.PayRequestRepository;
import ir.mbbn.mytoll.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link ir.mbbn.mytoll.domain.PayRequest}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PayRequestResource {

    private final Logger log = LoggerFactory.getLogger(PayRequestResource.class);

    private static final String ENTITY_NAME = "payRequest";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PayRequestRepository payRequestRepository;

    public PayRequestResource(PayRequestRepository payRequestRepository) {
        this.payRequestRepository = payRequestRepository;
    }

    /**
     * {@code POST  /pay-requests} : Create a new payRequest.
     *
     * @param payRequest the payRequest to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new payRequest, or with status {@code 400 (Bad Request)} if the payRequest has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/pay-requests")
    public ResponseEntity<PayRequest> createPayRequest(@Valid @RequestBody PayRequest payRequest) throws URISyntaxException {
        log.debug("REST request to save PayRequest : {}", payRequest);
        if (payRequest.getId() != null) {
            throw new BadRequestAlertException("A new payRequest cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PayRequest result = payRequestRepository.save(payRequest);
        return ResponseEntity.created(new URI("/api/pay-requests/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /pay-requests} : Updates an existing payRequest.
     *
     * @param payRequest the payRequest to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated payRequest,
     * or with status {@code 400 (Bad Request)} if the payRequest is not valid,
     * or with status {@code 500 (Internal Server Error)} if the payRequest couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/pay-requests")
    public ResponseEntity<PayRequest> updatePayRequest(@Valid @RequestBody PayRequest payRequest) throws URISyntaxException {
        log.debug("REST request to update PayRequest : {}", payRequest);
        if (payRequest.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PayRequest result = payRequestRepository.save(payRequest);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, payRequest.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /pay-requests} : get all the payRequests.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of payRequests in body.
     */
    @GetMapping("/pay-requests")
    public List<PayRequest> getAllPayRequests(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all PayRequests");
        return payRequestRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /pay-requests/:id} : get the "id" payRequest.
     *
     * @param id the id of the payRequest to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the payRequest, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/pay-requests/{id}")
    public ResponseEntity<PayRequest> getPayRequest(@PathVariable Long id) {
        log.debug("REST request to get PayRequest : {}", id);
        Optional<PayRequest> payRequest = payRequestRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(payRequest);
    }

    @GetMapping("/pay-requests/getPayRequestByTrackingId")
    public ResponseEntity<PayRequest> getPayRequestByTrackingId(@RequestParam String trackingId) {
        log.debug("REST request to get PayRequest : {}", trackingId);
        Optional<PayRequest> payRequest = payRequestRepository.findOneByTrackingId(trackingId);
        return ResponseUtil.wrapOrNotFound(payRequest);
    }

    /**
     * {@code DELETE  /pay-requests/:id} : delete the "id" payRequest.
     *
     * @param id the id of the payRequest to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/pay-requests/{id}")
    public ResponseEntity<Void> deletePayRequest(@PathVariable Long id) {
        log.debug("REST request to delete PayRequest : {}", id);
        payRequestRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}