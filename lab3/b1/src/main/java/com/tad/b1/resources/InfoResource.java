package com.tad.b1.resources;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/info")
@Produces(MediaType.TEXT_PLAIN)
public class InfoResource {
    @GET
    public String getInstanceInfo() {
        return "b1 Instance PID: " + ProcessHandle.current().pid();
    }
}

