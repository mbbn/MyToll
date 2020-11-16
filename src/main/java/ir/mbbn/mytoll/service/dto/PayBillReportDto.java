package ir.mbbn.mytoll.service.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PayBillReportDto implements Serializable {

    private Integer billPaidCount;
    private String trackingId;

    public Integer getBillPaidCount() {
        return billPaidCount;
    }

    public void setBillPaidCount(Integer billPaidCount) {
        this.billPaidCount = billPaidCount;
    }

    public String getTrackingId() {
        return trackingId;
    }

    public void setTrackingId(String trackingId) {
        this.trackingId = trackingId;
    }
}
