package ir.mbbn.mytoll.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;

@Configuration
@EnableScheduling
public class SchedulerConfiguration {

    public static final long DURATION_TIME = 10000;
}
