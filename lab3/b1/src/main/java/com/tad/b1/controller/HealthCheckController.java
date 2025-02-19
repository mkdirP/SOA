package com.tad.b1.controller;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/health") // 资源路径
public class HealthCheckController {

    @GET
    @Produces(MediaType.APPLICATION_JSON) // 返回 JSON 格式
    public Response healthCheck() {
        return Response.ok("{\"status\":\"UP\"}").build(); // 响应状态为 "UP"
    }
}
