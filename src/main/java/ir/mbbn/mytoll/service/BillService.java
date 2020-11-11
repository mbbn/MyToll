package ir.mbbn.mytoll.service;

import ir.mbbn.mytoll.domain.Bill;
import ir.mbbn.mytoll.repository.BillRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Bill}.
 */
@Service
@Transactional
public class BillService {

    private final Logger log = LoggerFactory.getLogger(BillService.class);

    private final BillRepository billRepository;

    public BillService(BillRepository billRepository) {
        this.billRepository = billRepository;
    }

    /**
     * Save a bill.
     *
     * @param bill the entity to save.
     * @return the persisted entity.
     */
    public Bill save(Bill bill) {
        log.debug("Request to save Bill : {}", bill);
        return billRepository.save(bill);
    }

    /**
     * Get all the bills.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Bill> findAll() {
        log.debug("Request to get all Bills");
        return billRepository.findAll();
    }


    /**
     * Get one bill by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Bill> findOne(Long id) {
        log.debug("Request to get Bill : {}", id);
        return billRepository.findById(id);
    }

    /**
     * Delete the bill by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Bill : {}", id);
        billRepository.deleteById(id);
    }
}
