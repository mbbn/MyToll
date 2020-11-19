package ir.mbbn.mytoll.service.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.List;

public class PaymentDto implements Serializable {

    private List<String> externalId;
    private Integer amount;
    private ZonedDateTime creationDate;
    private String mobileNumber;
    private ZonedDateTime paymentDate;
    private String bankTrackingId;
    private String trackingId;
    private String shortId;

    public List<String> getExternalId() {
        return externalId;
    }

    public void setExternalId(List<String> externalId) {
        this.externalId = externalId;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public ZonedDateTime getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(ZonedDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public ZonedDateTime getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(ZonedDateTime paymentDate) {
        this.paymentDate = paymentDate;
    }

    public String getBankTrackingId() {
        return bankTrackingId;
    }

    public void setBankTrackingId(String bankTrackingId) {
        this.bankTrackingId = bankTrackingId;
    }

    @JsonProperty("_id")
    public String getTrackingId() {
        return trackingId;
    }

    public void setTrackingId(String trackingId) {
        this.trackingId = trackingId;
    }

    public String getShortId() {
        return shortId;
    }

    public void setShortId(String shortId) {
        this.shortId = shortId;
    }
}
