package it.consumatoreinformato.app.task;

import it.consumatoreinformato.app.util.BigDecimalSafe;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
@Profile({"dev", "prod"})
public class StartUpTask implements InitializingBean {
    private static final Logger LOG = LoggerFactory.getLogger(StartUpTask.class);

    @Value("${spring.profiles.active}")
    private String envType;

    @Autowired
    public StartUpTask( BigDecimalSafe bigDecimalSafe ) {
    }

    @Override
    public void afterPropertiesSet() {
    }
}
