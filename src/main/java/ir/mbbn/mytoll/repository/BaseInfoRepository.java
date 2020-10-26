package ir.mbbn.mytoll.repository;

import ir.mbbn.mytoll.domain.BaseInfo;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the BaseInfo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BaseInfoRepository extends JpaRepository<BaseInfo, Long> {
}
