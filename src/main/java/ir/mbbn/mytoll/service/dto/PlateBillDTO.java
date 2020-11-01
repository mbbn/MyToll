package ir.mbbn.mytoll.service.dto;

import java.time.ZonedDateTime;
import javax.validation.constraints.*;
import java.io.Serializable;
import ir.mbbn.mytoll.domain.enumeration.BillCategory;

/**
 * A DTO for the {@link ir.mbbn.mytoll.domain.PlateBill} entity.
 */
public class PlateBillDTO implements Serializable {
    
    private Long id;

    @NotNull
    private BillCategory category;

    @NotNull
    private ZonedDateTime creationTime;

    @NotNull
    private String creationBy;

    @NotNull
    private ZonedDateTime lastUpdateTime;

    @NotNull
    private String lastUpdatedBy;


    private Long billTypeId;

    private Long plateId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BillCategory getCategory() {
        return category;
    }

    public void setCategory(BillCategory category) {
        this.category = category;
    }

    public ZonedDateTime getCreationTime() {
        return creationTime;
    }

    public void setCreationTime(ZonedDateTime creationTime) {
        this.creationTime = creationTime;
    }

    public String getCreationBy() {
        return creationBy;
    }

    public void setCreationBy(String creationBy) {
        this.creationBy = creationBy;
    }

    public ZonedDateTime getLastUpdateTime() {
        return lastUpdateTime;
    }

    public void setLastUpdateTime(ZonedDateTime lastUpdateTime) {
        this.lastUpdateTime = lastUpdateTime;
    }

    public String getLastUpdatedBy() {
        return lastUpdatedBy;
    }

    public void setLastUpdatedBy(String lastUpdatedBy) {
        this.lastUpdatedBy = lastUpdatedBy;
    }

    public Long getBillTypeId() {
        return billTypeId;
    }

    public void setBillTypeId(Long baseInfoId) {
        this.billTypeId = baseInfoId;
    }

    public Long getPlateId() {
        return plateId;
    }

    public void setPlateId(Long plateId) {
        this.plateId = plateId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PlateBillDTO)) {
            return false;
        }

        return id != null && id.equals(((PlateBillDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PlateBillDTO{" +
            "id=" + getId() +
            ", category='" + getCategory() + "'" +
            ", creationTime='" + getCreationTime() + "'" +
            ", creationBy='" + getCreationBy() + "'" +
            ", lastUpdateTime='" + getLastUpdateTime() + "'" +
            ", lastUpdatedBy='" + getLastUpdatedBy() + "'" +
            ", billTypeId=" + getBillTypeId() +
            ", plateId=" + getPlateId() +
            "}";
    }
}
