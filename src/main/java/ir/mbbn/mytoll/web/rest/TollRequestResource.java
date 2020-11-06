package ir.mbbn.mytoll.web.rest;

import ir.mbbn.mytoll.service.dto.PlateBillDTO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

/**
 * REST controller for managing {@link ir.mbbn.mytoll.domain.TollRequest}.
 */
@RestController
@RequestMapping("/api")
public class TollRequestResource {

    private final Logger log = LoggerFactory.getLogger(TollRequestResource.class);

    private static final String ENTITY_NAME = "tollRequest";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    /**
     * {@code GET  /toll-requests} : get the plate bills.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of plate bills in body.
     */
    @PostMapping("/toll-requests")
    public List<PlateBillDTO> getPlateBills(@Valid @RequestBody TollRequest tollRequest) throws URISyntaxException {
        log.debug("REST request to get Plate Bills");
        return new ArrayList<>();
    }
}
