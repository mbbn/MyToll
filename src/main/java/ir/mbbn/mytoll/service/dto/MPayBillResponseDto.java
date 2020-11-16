package ir.mbbn.mytoll.service.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class MPayBillResponseDto implements Serializable {

    private List<PayBillDto> data;
    private PayBillReportDto report;

    public List<PayBillDto> getData() {
        return data;
    }

    public void setData(List<PayBillDto> data) {
        this.data = data;
    }

    public PayBillReportDto getReport() {
        return report;
    }

    public void setReport(PayBillReportDto report) {
        this.report = report;
    }
}
