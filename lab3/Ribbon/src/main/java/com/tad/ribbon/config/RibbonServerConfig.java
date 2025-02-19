package com.tad.ribbon.config;

import com.netflix.loadbalancer.*;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.cloud.netflix.ribbon.StaticServerList;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class RibbonServerConfig {
    @Bean
    @LoadBalanced
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Bean
    public IPing ribbonPing() {
        return new PingUrl(false, "/api/v2/hrs/health");
    }

    @Bean
    public IRule ribbonRule() {
        return new RoundRobinRule(); // or WeightedResponseTimeRule
    }

}