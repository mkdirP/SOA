package com.tad.b1;

// import com.tad.b1.config.ConsulRegistration;
import com.tad.b1.config.JerseyConfig;
import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.core.env.Environment;
// import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@ComponentScan({"com.tad.b1.config"})
// @EnableDiscoveryClient
public class Lab3Application  {
    //implements CommandLineRunner

    // private final Environment environment;

    // Constructor injection of Environment to access properties
    // public Lab3Application(Environment environment) {
    //     this.environment = environment;
    // }


    public static void main(String[] args) {
        SpringApplication.run(Lab3Application.class, args);
    }

    // @Override
    // public void run(String... args) throws Exception {
    //     // 获取端口
    //     String serverPort = environment.getProperty("server.port", "8080");  // 默认为8080
    //     int port = Integer.parseInt(serverPort);
    //
    //     // 使用获取到的端口注册服务
    //     // ConsulRegistration.registerService("worker-service", port);
    // }
}