package ir.mbbn.mytoll.service;

import ir.mbbn.mytoll.config.SchedulerConfiguration;
import ir.mbbn.mytoll.domain.PayRequest;
import ir.mbbn.mytoll.repository.PayRequestRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.ZonedDateTime;
import java.util.Optional;

@Component("scheduledTasks")
public class ScheduledTasks {

    private final Logger log = LoggerFactory.getLogger(ScheduledTasks.class);
    private final PayRequestRepository payRequestRepository;

    private ZonedDateTime lastInquiryTime;

    public ScheduledTasks(PayRequestRepository payRequestRepository) {
        this.payRequestRepository = payRequestRepository;
    }

    @Scheduled(fixedRate = SchedulerConfiguration.DURATION_TIME, initialDelay = 1000)
    public void depositBills(){
        if(lastInquiryTime == null){
            Optional<PayRequest> optionalPayRequest = payRequestRepository.findTopByDepositIsNull();
            lastInquiryTime = optionalPayRequest.orElse(null).get;
        }
        log.info("asghar");
    }
}
