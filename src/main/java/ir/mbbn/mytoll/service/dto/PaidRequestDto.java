package ir.mbbn.mytoll.service.dto;

import java.io.Serializable;
import java.time.ZonedDateTime;

public class PaidRequestDto implements Serializable {

    private ZonedDateTime startTime;
    private ZonedDateTime endTime;
    private Integer pageNum;
    private Integer count;

    public ZonedDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(ZonedDateTime startTime) {
        this.startTime = startTime;
    }

    public ZonedDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(ZonedDateTime endTime) {
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
