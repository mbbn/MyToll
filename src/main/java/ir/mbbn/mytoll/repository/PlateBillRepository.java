package ir.mbbn.mytoll.repository;

import ir.mbbn.mytoll.domain.PlateBill;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the PlateBill entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlateBillRepository extends JpaRepository<PlateBill, Long> {
}
