package ir.mbbn.mytoll.repository;

import ir.mbbn.mytoll.domain.TollRequest;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the TollRequest entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TollRequestRepository extends JpaRepository<TollRequest, Long> {
}
