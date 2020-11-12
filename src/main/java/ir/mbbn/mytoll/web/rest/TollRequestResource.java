package ir.mbbn.mytoll.web.rest;

import ir.mbbn.mytoll.domain.Bill;
import ir.mbbn.mytoll.domain.TollRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URISyntaxException;
import java.time.LocalDate;
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
    public List<Bill> getPlateBills(@Valid @RequestBody TollRequest tollRequest) throws URISyntaxException {
        log.debug("REST request to get Plate Bills");
        ArrayList<Bill> bills = new ArrayList<>();
        for (long i = 0; i < 10; i++) {
            Bill e = new Bill();
            e.setId(i);
            e.setAmount(10);
            e.billDate(LocalDate.now());
            e.setBillTypeTitle("پارک حاشیه");
            e.setStreet("خیابان جم");
            e.fromDate(LocalDate.now());
            e.toDate(LocalDate.now());
            bills.add(e);
        }
        return bills;
    }
}
