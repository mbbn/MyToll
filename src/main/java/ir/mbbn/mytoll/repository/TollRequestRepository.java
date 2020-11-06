package ir.mbbn.mytoll.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the TollRequest entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TollRequestRepository extends JpaRepository<TollRequest, Long> {
}
