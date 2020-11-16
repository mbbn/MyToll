package ir.mbbn.mytoll.service.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PayBillDto implements Serializable {

    private String cpayTaxId;
    private Integer billAmount;
    private String externalNumber;
    private Integer sepandarShare;
    private Integer issuerShare;
    private String status;
    private String exTrackingId;

    public String getCpayTaxId() {
        return cpayTaxId;
    }

    public void setCpayTaxId(String cpayTaxId) {
        this.cpayTaxId = cpayTaxId;
    }

    public Integer getBillAmount() {
        return billAmount;
    }

    public void setBillAmount(Integer billAmount) {
        this.billAmount = billAmount;
    }

    public String getExternalNumber() {
        return externalNumber;
    }

    public void setExternalNumber(String externalNumber) {
        this.externalNumber = externalNumber;
    }

    public Integer getSepandarShare() {
        return sepandarShare;
    }

    public void setSepandarShare(Integer sepandarShare) {
        this.sepandarShare = sepandarShare;
    }

    public Integer getIssuerShare() {
        return issuerShare;
    }

    public void setIssuerShare(Integer issuerShare) {
        this.issuerShare = issuerShare;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getExTrackingId() {
        return exTrackingId;
    }

    public void setExTrackingId(String exTrackingId) {
        this.exTrackingId = exTrackingId;
    }
}
