package ir.mbbn.mytoll.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

import ir.mbbn.mytoll.domain.enumeration.BaseInfoCategory;

/**
 * A BaseInfo.
 */
@Entity
@Table(name = "base_info")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class BaseInfo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @NotNull
    @Column(name = "code", nullable = false)
    private String code;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "category", nullable = false)
    private BaseInfoCategory category;

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
    @JsonIgnoreProperties(value = "baseInfos", allowSetters = true)
    private BaseInfo group;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public BaseInfo title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCode() {
        return code;
    }

    public BaseInfo code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public BaseInfoCategory getCategory() {
        return category;
    }

    public BaseInfo category(BaseInfoCategory category) {
        this.category = category;
        return this;
    }

    public void setCategory(BaseInfoCategory category) {
        this.category = category;
    }

    public ZonedDateTime getCreationTime() {
        return creationTime;
    }

    public BaseInfo creationTime(ZonedDateTime creationTime) {
        this.creationTime = creationTime;
        return this;
    }

    public void setCreationTime(ZonedDateTime creationTime) {
        this.creationTime = creationTime;
    }

    public String getCreationBy() {
        return creationBy;
    }

    public BaseInfo creationBy(String creationBy) {
        this.creationBy = creationBy;
        return this;
    }

    public void setCreationBy(String creationBy) {
        this.creationBy = creationBy;
    }

    public ZonedDateTime getLastUpdateTime() {
        return lastUpdateTime;
    }

    public BaseInfo lastUpdateTime(ZonedDateTime lastUpdateTime) {
        this.lastUpdateTime = lastUpdateTime;
        return this;
    }

    public void setLastUpdateTime(ZonedDateTime lastUpdateTime) {
        this.lastUpdateTime = lastUpdateTime;
    }

    public String getLastUpdatedBy() {
        return lastUpdatedBy;
    }

    public BaseInfo lastUpdatedBy(String lastUpdatedBy) {
        this.lastUpdatedBy = lastUpdatedBy;
        return this;
    }

    public void setLastUpdatedBy(String lastUpdatedBy) {
        this.lastUpdatedBy = lastUpdatedBy;
    }

    public BaseInfo getGroup() {
        return group;
    }

    public BaseInfo group(BaseInfo baseInfo) {
        this.group = baseInfo;
        return this;
    }

    public void setGroup(BaseInfo baseInfo) {
        this.group = baseInfo;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BaseInfo)) {
            return false;
        }
        return id != null && id.equals(((BaseInfo) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BaseInfo{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", code='" + getCode() + "'" +
            ", category='" + getCategory() + "'" +
            ", creationTime='" + getCreationTime() + "'" +
            ", creationBy='" + getCreationBy() + "'" +
            ", lastUpdateTime='" + getLastUpdateTime() + "'" +
            ", lastUpdatedBy='" + getLastUpdatedBy() + "'" +
            "}";
    }
}
