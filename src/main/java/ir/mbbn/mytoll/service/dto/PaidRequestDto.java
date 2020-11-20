package ir.mbbn.mytoll.service.dto;

import java.io.Serializable;
import java.time.ZonedDateTime;

public class PaidRequestDto implements Serializable {

    private String startTime;
    private String endTime;
    private Integer pageNum;
    private Integer count;

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public Integer getPageNum() {
        return pageNum;
    }

    public void setPageNum(Integer pageNum) {
        this.pageNum = pageNum;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }
}
