package com.tad.ribbon;

import com.tad.ribbon.config.RibbonServerConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.ribbon.RibbonClient;


@SpringBootApplication
@RibbonClient(name = "client-service", configuration = RibbonServerConfig.class)
public class RibbonApplication {

    public static void main(String[] args) {
        SpringApplication.run(RibbonApplication.class, args);
    }

}
