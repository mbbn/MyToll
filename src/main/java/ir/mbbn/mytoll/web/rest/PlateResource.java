package ir.mbbn.mytoll.web.rest;

import ir.mbbn.mytoll.domain.Plate;
import ir.mbbn.mytoll.repository.PlateRepository;
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
 * REST controller for managing {@link ir.mbbn.mytoll.domain.Plate}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PlateResource {

    private final Logger log = LoggerFactory.getLogger(PlateResource.class);

    private static final String ENTITY_NAME = "plate";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PlateRepository plateRepository;

    public PlateResource(PlateRepository plateRepository) {
        this.plateRepository = plateRepository;
    }

    /**
     * {@code POST  /plates} : Create a new plate.
     *
     * @param plate the plate to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new plate, or with status {@code 400 (Bad Request)} if the plate has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/plates")
    public ResponseEntity<Plate> createPlate(@Valid @RequestBody Plate plate) throws URISyntaxException {
        log.debug("REST request to save Plate : {}", plate);
        if (plate.getId() != null) {
            throw new BadRequestAlertException("A new plate cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Plate result = plateRepository.save(plate);
        return ResponseEntity.created(new URI("/api/plates/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /plates} : Updates an existing plate.
     *
     * @param plate the plate to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated plate,
     * or with status {@code 400 (Bad Request)} if the plate is not valid,
     * or with status {@code 500 (Internal Server Error)} if the plate couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/plates")
    public ResponseEntity<Plate> updatePlate(@Valid @RequestBody Plate plate) throws URISyntaxException {
        log.debug("REST request to update Plate : {}", plate);
        if (plate.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Plate result = plateRepository.save(plate);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, plate.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /plates} : get all the plates.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of plates in body.
     */
    @GetMapping("/plates")
    public List<Plate> getAllPlates() {
        log.debug("REST request to get all Plates");
        return plateRepository.findAll();
    }

    /**
     * {@code GET  /plates/:id} : get the "id" plate.
     *
     * @param id the id of the plate to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the plate, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/plates/{id}")
    public ResponseEntity<Plate> getPlate(@PathVariable Long id) {
        log.debug("REST request to get Plate : {}", id);
        Optional<Plate> plate = plateRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(plate);
    }

    /**
     * {@code DELETE  /plates/:id} : delete the "id" plate.
     *
     * @param id the id of the plate to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/plates/{id}")
    public ResponseEntity<Void> deletePlate(@PathVariable Long id) {
        log.debug("REST request to delete Plate : {}", id);
        plateRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
