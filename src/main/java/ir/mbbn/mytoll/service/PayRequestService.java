package ir.mbbn.mytoll.service;

import ir.mbbn.mytoll.domain.PayRequest;
import ir.mbbn.mytoll.repository.PayRequestRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link PayRequest}.
 */
@Service
@Transactional
public class PayRequestService {

    private final Logger log = LoggerFactory.getLogger(PayRequestService.class);

    private final PayRequestRepository payRequestRepository;

    public PayRequestService(PayRequestRepository payRequestRepository) {
        this.payRequestRepository = payRequestRepository;
    }

    /**
     * Save a payRequest.
     *
     * @param payRequest the entity to save.
     * @return the persisted entity.
     */
    public PayRequest save(PayRequest payRequest) {
        log.debug("Request to save PayRequest : {}", payRequest);
        return payRequestRepository.save(payRequest);
    }

    /**
     * Get all the payRequests.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<PayRequest> findAll(Pageable pageable) {
        log.debug("Request to get all PayRequests");
        return payRequestRepository.findAll(pageable);
    }


    /**
     * Get all the payRequests with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<PayRequest> findAllWithEagerRelationships(Pageable pageable) {
        return payRequestRepository.findAllWithEagerRelationships(pageable);
    }

    /**
     * Get one payRequest by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<PayRequest> findOne(Long id) {
        log.debug("Request to get PayRequest : {}", id);
        return payRequestRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the payRequest by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete PayRequest : {}", id);
        payRequestRepository.deleteById(id);
    }
}
