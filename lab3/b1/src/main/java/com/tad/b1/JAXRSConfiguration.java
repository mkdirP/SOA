package com.tad.b1;

// import com.tad.b1.config.CORSFilter;
import com.tad.b1.config.CORSFilter;
import com.tad.b1.controller.HealthCheckController;
import com.tad.b1.controller.WorkerController;
import com.tad.b1.resources.InfoResource;
import com.tad.b1.resources.JavaEE8Resource;
import jakarta.ws.rs.ApplicationPath;
import jakarta.ws.rs.core.Application;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/**
 * Configures JAX-RS for the application.
 */
@ApplicationPath("/v2")
public class JAXRSConfiguration extends Application {

    private Set<Object> singletons = new HashSet<Object>();
    
    public JAXRSConfiguration() {
        singletons.add(new WorkerController());
        // singletons.add(new HealthCheckController()); // 注册健康检查端点
        singletons.add(new JavaEE8Resource());
        // singletons.add(new InfoResource());
        singletons.add(new CORSFilter());

        // // 注册多个服务实例到 Consul，每个实例使用不同的端口
        // ConsulRegistration.registerService("worker-service", 8081);
        // ConsulRegistration.registerService("worker-service", 8082);
        // 可以继续添加其他实例，例如
        // ConsulRegistration.registerService("worker-service", 8083);
    }
    
    @Override
    public Set<Object> getSingletons() {
        return singletons;
    }

    // @Override
    // public Set<Class<?>> getClasses() {
    //     return super.getClasses();
    // }

    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> resources = new HashSet<>();
        resources.add(InfoResource.class);
        return resources;
    }


    @Override
    public Map<String, Object> getProperties() {
        return super.getProperties();
    }
    
}
