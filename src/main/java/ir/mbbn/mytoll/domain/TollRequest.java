package ir.mbbn.mytoll.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A TollRequest.
 */
@Entity
@Table(name = "toll_request")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TollRequest implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "plate", nullable = false)
    private Integer plate;

    @NotNull
    @Column(name = "mobile", nullable = false)
    private String mobile;

    @NotNull
    @Column(name = "from_date", nullable = false)
    private LocalDate fromDate;

    @NotNull
    @Column(name = "to_date", nullable = false)
    private LocalDate toDate;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getPlate() {
        return plate;
    }

    public TollRequest plate(Integer plate) {
        this.plate = plate;
        return this;
    }

    public void setPlate(Integer plate) {
        this.plate = plate;
    }

    public String getMobile() {
        return mobile;
    }

    public TollRequest mobile(String mobile) {
        this.mobile = mobile;
        return this;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public LocalDate getFromDate() {
        return fromDate;
    }

    public TollRequest fromDate(LocalDate fromDate) {
        this.fromDate = fromDate;
        return this;
    }

    public void setFromDate(LocalDate fromDate) {
        this.fromDate = fromDate;
    }

    public LocalDate getToDate() {
        return toDate;
    }

    public TollRequest toDate(LocalDate toDate) {
        this.toDate = toDate;
        return this;
    }

    public void setToDate(LocalDate toDate) {
        this.toDate = toDate;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TollRequest)) {
            return false;
        }
        return id != null && id.equals(((TollRequest) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TollRequest{" +
            "id=" + getId() +
            ", plate=" + getPlate() +
            ", mobile='" + getMobile() + "'" +
            ", fromDate='" + getFromDate() + "'" +
            ", toDate='" + getToDate() + "'" +
            "}";
    }
}
