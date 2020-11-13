package ir.mbbn.mytoll.service.dto;

import java.io.Serializable;
import java.util.List;

public class PlateBillsResponseDto implements Serializable {

    private List<BillDto> data;
    private int count;
    private int sumAmount;

    public List<BillDto> getData() {
        return data;
    }

    public void setData(List<BillDto> data) {
        this.data = data;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public int getSumAmount() {
        return sumAmount;
    }

    public void setSumAmount(int sumAmount) {
        this.sumAmount = sumAmount;
    }
}
