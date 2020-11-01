package ir.mbbn.mytoll.service;

import ir.mbbn.mytoll.domain.PlateBill;
import ir.mbbn.mytoll.repository.PlateBillRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link PlateBill}.
 */
@Service
@Transactional
public class PlateBillService {

    private final Logger log = LoggerFactory.getLogger(PlateBillService.class);

    private final PlateBillRepository plateBillRepository;

    public PlateBillService(PlateBillRepository plateBillRepository) {
        this.plateBillRepository = plateBillRepository;
    }

    /**
     * Save a plateBill.
     *
     * @param plateBill the entity to save.
     * @return the persisted entity.
     */
    public PlateBill save(PlateBill plateBill) {
        log.debug("Request to save PlateBill : {}", plateBill);
        return plateBillRepository.save(plateBill);
    }

    /**
     * Get all the plateBills.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<PlateBill> findAll() {
        log.debug("Request to get all PlateBills");
        return plateBillRepository.findAll();
    }


    /**
     * Get one plateBill by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<PlateBill> findOne(Long id) {
        log.debug("Request to get PlateBill : {}", id);
        return plateBillRepository.findById(id);
    }

    /**
     * Delete the plateBill by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete PlateBill : {}", id);
        plateBillRepository.deleteById(id);
    }
}
