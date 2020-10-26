package ir.mbbn.mytoll.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

import ir.mbbn.mytoll.domain.enumeration.BillCategory;

/**
 * A PlateBill.
 */
@Entity
@Table(name = "plate_bill")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PlateBill implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "category", nullable = false)
    private BillCategory category;

    @NotNull
    @Column(name = "creation_time", nullable = false)
    private ZonedDateTime creationTime;

    @NotNull
    @Column(name = "creation_by", nullable = false)
    private String creationBy;

    @NotNull
    @Column(name = "last_update_time", nullable = false)
    private ZonedDateTime lastUpdateTime;

    @NotNull
    @Column(name = "last_updated_by", nullable = false)
    private String lastUpdatedBy;

    @ManyToOne
    @JsonIgnoreProperties(value = "plateBills", allowSetters = true)
    private BaseInfo billType;

    @ManyToOne
    @JsonIgnoreProperties(value = "bills", allowSetters = true)
    private Plate plate;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BillCategory getCategory() {
        return category;
    }

    public PlateBill category(BillCategory category) {
        this.category = category;
        return this;
    }

    public void setCategory(BillCategory category) {
        this.category = category;
    }

    public ZonedDateTime getCreationTime() {
        return creationTime;
    }

    public PlateBill creationTime(ZonedDateTime creationTime) {
        this.creationTime = creationTime;
        return this;
    }

    public void setCreationTime(ZonedDateTime creationTime) {
        this.creationTime = creationTime;
    }

    public String getCreationBy() {
        return creationBy;
    }

    public PlateBill creationBy(String creationBy) {
        this.creationBy = creationBy;
        return this;
    }

    public void setCreationBy(String creationBy) {
        this.creationBy = creationBy;
    }

    public ZonedDateTime getLastUpdateTime() {
        return lastUpdateTime;
    }

    public PlateBill lastUpdateTime(ZonedDateTime lastUpdateTime) {
        this.lastUpdateTime = lastUpdateTime;
        return this;
    }

    public void setLastUpdateTime(ZonedDateTime lastUpdateTime) {
        this.lastUpdateTime = lastUpdateTime;
    }

    public String getLastUpdatedBy() {
        return lastUpdatedBy;
    }

    public PlateBill lastUpdatedBy(String lastUpdatedBy) {
        this.lastUpdatedBy = lastUpdatedBy;
        return this;
    }

    public void setLastUpdatedBy(String lastUpdatedBy) {
        this.lastUpdatedBy = lastUpdatedBy;
    }

    public BaseInfo getBillType() {
        return billType;
    }

    public PlateBill billType(BaseInfo baseInfo) {
        this.billType = baseInfo;
        return this;
    }

    public void setBillType(BaseInfo baseInfo) {
        this.billType = baseInfo;
    }

    public Plate getPlate() {
        return plate;
    }

    public PlateBill plate(Plate plate) {
        this.plate = plate;
        return this;
    }

    public void setPlate(Plate plate) {
        this.plate = plate;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PlateBill)) {
            return false;
        }
        return id != null && id.equals(((PlateBill) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PlateBill{" +
            "id=" + getId() +
            ", category='" + getCategory() + "'" +
            ", creationTime='" + getCreationTime() + "'" +
            ", creationBy='" + getCreationBy() + "'" +
            ", lastUpdateTime='" + getLastUpdateTime() + "'" +
            ", lastUpdatedBy='" + getLastUpdatedBy() + "'" +
            "}";
    }
}
