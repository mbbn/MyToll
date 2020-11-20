package ir.mbbn.mytoll.service.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.time.ZonedDateTime;

public class TrackingVerificationResponseDto implements Serializable {

    private Boolean isPaid;
    private ZonedDateTime payDate;
    private String billId;

    @JsonProperty("isPaid")
    public Boolean getPaid() {
        return isPaid;
    }

    public void setPaid(Boolean paid) {
        isPaid = paid;
    }

    public ZonedDateTime getPayDate() {
        return payDate;
    }

    public void setPayDate(ZonedDateTime payDate) {
        this.payDate = payDate;
    }

    @JsonProperty("_id")
    public String getBillId() {
        return billId;
    }

    public void setBillId(String billId) {
        this.billId = billId;
    }
}
