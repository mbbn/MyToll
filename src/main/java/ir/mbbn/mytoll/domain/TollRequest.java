package ir.mbbn.mytoll.domain;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.ZonedDateTime;

/**
 * A TollRequest.
 */
public class TollRequest implements Serializable {

    private static final long serialVersionUID = 1L;

    @NotNull
    private Integer plate;

    @NotNull
    private String mobile;

    private ZonedDateTime fromDate;

    private ZonedDateTime toDate;

    // jhipster-needle-entity-add-field - JHipster will add fields here
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

    public ZonedDateTime getFromDate() {
        return fromDate;
    }

    public TollRequest fromDate(ZonedDateTime fromDate) {
        this.fromDate = fromDate;
        return this;
    }

    public void setFromDate(ZonedDateTime fromDate) {
        this.fromDate = fromDate;
    }

    public ZonedDateTime getToDate() {
        return toDate;
    }

    public TollRequest toDate(ZonedDateTime toDate) {
        this.toDate = toDate;
        return this;
    }

    public void setToDate(ZonedDateTime toDate) {
        this.toDate = toDate;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    // prettier-ignore
    @Override
    public String toString() {
        return "TollRequest{" +
            "plate=" + plate +
            ", mobile='" + mobile + '\'' +
            ", fromDate=" + fromDate +
            ", toDate=" + toDate +
            '}';
    }
}
