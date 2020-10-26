package ir.mbbn.mytoll.repository;

import ir.mbbn.mytoll.domain.Plate;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Plate entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlateRepository extends JpaRepository<Plate, Long> {
}
