package com.tad.b1.config;

import com.tad.b1.resources.InfoResource;
import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.stereotype.Component;


@Component
public class JerseyConfig extends ResourceConfig{
    public JerseyConfig() {
        register(CORSFilter.class);
        register(InfoResource.class);
        // 注册 JAX-RS 资源类
        packages("com.tad.b1.controller");
    }
}