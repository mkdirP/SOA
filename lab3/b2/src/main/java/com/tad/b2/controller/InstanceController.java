package com.tad.b2.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.lang.management.ManagementFactory;

@RestController
public class InstanceController {

    @GetMapping("/info")
    public String getInstancePid() {
        // 获取当前进程的 PID
        String pid = ManagementFactory.getRuntimeMXBean().getName().split("@")[0];
        return "b2 Instance PID: " + pid;
    }
}
