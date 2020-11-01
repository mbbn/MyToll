package ir.mbbn.mytoll.web.rest;

import ir.mbbn.mytoll.domain.PlateBill;
import ir.mbbn.mytoll.service.PlateBillService;
import ir.mbbn.mytoll.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link ir.mbbn.mytoll.domain.PlateBill}.
 */
@RestController
@RequestMapping("/api")
public class PlateBillResource {

    private final Logger log = LoggerFactory.getLogger(PlateBillResource.class);

    private static final String ENTITY_NAME = "plateBill";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PlateBillService plateBillService;

    public PlateBillResource(PlateBillService plateBillService) {
        this.plateBillService = plateBillService;
    }

    /**
     * {@code POST  /plate-bills} : Create a new plateBill.
     *
     * @param plateBill the plateBill to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new plateBill, or with status {@code 400 (Bad Request)} if the plateBill has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/plate-bills")
    public ResponseEntity<PlateBill> createPlateBill(@Valid @RequestBody PlateBill plateBill) throws URISyntaxException {
        log.debug("REST request to save PlateBill : {}", plateBill);
        if (plateBill.getId() != null) {
            throw new BadRequestAlertException("A new plateBill cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PlateBill result = plateBillService.save(plateBill);
        return ResponseEntity.created(new URI("/api/plate-bills/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /plate-bills} : Updates an existing plateBill.
     *
     * @param plateBill the plateBill to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated plateBill,
     * or with status {@code 400 (Bad Request)} if the plateBill is not valid,
     * or with status {@code 500 (Internal Server Error)} if the plateBill couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/plate-bills")
    public ResponseEntity<PlateBill> updatePlateBill(@Valid @RequestBody PlateBill plateBill) throws URISyntaxException {
        log.debug("REST request to update PlateBill : {}", plateBill);
        if (plateBill.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PlateBill result = plateBillService.save(plateBill);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, plateBill.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /plate-bills} : get all the plateBills.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of plateBills in body.
     */
    @GetMapping("/plate-bills")
    public List<PlateBill> getAllPlateBills() {
        log.debug("REST request to get all PlateBills");
        return plateBillService.findAll();
    }

    /**
     * {@code GET  /plate-bills/:id} : get the "id" plateBill.
     *
     * @param id the id of the plateBill to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the plateBill, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/plate-bills/{id}")
    public ResponseEntity<PlateBill> getPlateBill(@PathVariable Long id) {
        log.debug("REST request to get PlateBill : {}", id);
        Optional<PlateBill> plateBill = plateBillService.findOne(id);
        return ResponseUtil.wrapOrNotFound(plateBill);
    }

    /**
     * {@code DELETE  /plate-bills/:id} : delete the "id" plateBill.
     *
     * @param id the id of the plateBill to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/plate-bills/{id}")
    public ResponseEntity<Void> deletePlateBill(@PathVariable Long id) {
        log.debug("REST request to delete PlateBill : {}", id);
        plateBillService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
