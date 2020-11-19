package ir.mbbn.mytoll.service;

import ir.mbbn.mytoll.config.SchedulerConfiguration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.ZonedDateTime;

@Component("scheduledTasks")
public class ScheduledTasks {

    private final Logger log = LoggerFactory.getLogger(ScheduledTasks.class);

    private ZonedDateTime lastInquiryTime;

    @Scheduled(fixedRate = SchedulerConfiguration.DURATION_TIME, initialDelay = 1000)
    public void depositBills(){
        log.info("asghar");
    }
}
