package ir.mbbn.mytoll.web.rest;

import ir.mbbn.mytoll.domain.Bill;
import ir.mbbn.mytoll.repository.BillRepository;
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
 * REST controller for managing {@link ir.mbbn.mytoll.domain.Bill}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class BillResource {

    private final Logger log = LoggerFactory.getLogger(BillResource.class);

    private static final String ENTITY_NAME = "bill";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BillRepository billRepository;

    public BillResource(BillRepository billRepository) {
        this.billRepository = billRepository;
    }

    /**
     * {@code POST  /bills} : Create a new bill.
     *
     * @param bill the bill to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new bill, or with status {@code 400 (Bad Request)} if the bill has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/bills")
    public ResponseEntity<Bill> createBill(@Valid @RequestBody Bill bill) throws URISyntaxException {
        log.debug("REST request to save Bill : {}", bill);
        if (bill.getId() != null) {
            throw new BadRequestAlertException("A new bill cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Bill result = billRepository.save(bill);
        return ResponseEntity.created(new URI("/api/bills/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /bills} : Updates an existing bill.
     *
     * @param bill the bill to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated bill,
     * or with status {@code 400 (Bad Request)} if the bill is not valid,
     * or with status {@code 500 (Internal Server Error)} if the bill couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/bills")
    public ResponseEntity<Bill> updateBill(@Valid @RequestBody Bill bill) throws URISyntaxException {
        log.debug("REST request to update Bill : {}", bill);
        if (bill.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Bill result = billRepository.save(bill);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, bill.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /bills} : get all the bills.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of bills in body.
     */
    @GetMapping("/bills")
    public List<Bill> getAllBills() {
        log.debug("REST request to get all Bills");
        return billRepository.findAll();
    }

    /**
     * {@code GET  /bills/:id} : get the "id" bill.
     *
     * @param id the id of the bill to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the bill, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/bills/{id}")
    public ResponseEntity<Bill> getBill(@PathVariable Long id) {
        log.debug("REST request to get Bill : {}", id);
        Optional<Bill> bill = billRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(bill);
    }

    /**
     * {@code DELETE  /bills/:id} : delete the "id" bill.
     *
     * @param id the id of the bill to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/bills/{id}")
    public ResponseEntity<Void> deleteBill(@PathVariable Long id) {
        log.debug("REST request to delete Bill : {}", id);
        billRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
