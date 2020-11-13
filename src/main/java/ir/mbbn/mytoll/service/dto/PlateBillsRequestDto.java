package ir.mbbn.mytoll.service.dto;

import java.io.Serializable;
import java.util.List;

public class PlateBillsRequestDto implements Serializable {

    private Integer plate;

    private String fromDate;

    private String toDate;

    private List<String> billTypeabbrivation;

    private int pageNum;

    private int count;

    public Integer getPlate() {
        return plate;
    }

    public void setPlate(Integer plate) {
        this.plate = plate;
    }

    public String getFromDate() {
        return fromDate;
    }

    public void setFromDate(String fromDate) {
        this.fromDate = fromDate;
    }

    public String getToDate() {
        return toDate;
    }

    public void setToDate(String toDate) {
        this.toDate = toDate;
    }

    public List<String> getBillTypeabbrivation() {
        return billTypeabbrivation;
    }

    public void setBillTypeabbrivation(List<String> billTypeabbrivation) {
        this.billTypeabbrivation = billTypeabbrivation;
    }

    public int getPageNum() {
        return pageNum;
    }

    public void setPageNum(int pageNum) {
        this.pageNum = pageNum;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }
}
