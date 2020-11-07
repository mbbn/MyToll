package ir.mbbn.mytoll.service;

import ir.mbbn.mytoll.domain.TollRequest;
import ir.mbbn.mytoll.repository.TollRequestRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link TollRequest}.
 */
@Service
@Transactional
public class TollRequestService {

    private final Logger log = LoggerFactory.getLogger(TollRequestService.class);

    private final TollRequestRepository tollRequestRepository;

    public TollRequestService(TollRequestRepository tollRequestRepository) {
        this.tollRequestRepository = tollRequestRepository;
    }

    /**
     * Save a tollRequest.
     *
     * @param tollRequest the entity to save.
     * @return the persisted entity.
     */
    public TollRequest save(TollRequest tollRequest) {
        log.debug("Request to save TollRequest : {}", tollRequest);
        return tollRequestRepository.save(tollRequest);
    }

    /**
     * Get all the tollRequests.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<TollRequest> findAll() {
        log.debug("Request to get all TollRequests");
        return tollRequestRepository.findAll();
    }


    /**
     * Get one tollRequest by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<TollRequest> findOne(Long id) {
        log.debug("Request to get TollRequest : {}", id);
        return tollRequestRepository.findById(id);
    }

    /**
     * Delete the tollRequest by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete TollRequest : {}", id);
        tollRequestRepository.deleteById(id);
    }
}
