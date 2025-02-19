package com.tad.b2.controller;

import com.tad.b2.service.HrService;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;

import java.util.UUID;

@RestController
@RequestMapping("api/v2/hrs")
public class HrController {
    @Autowired
    private HrService hs;

    // @GetMapping("/info")
    // public String getInstanceInfo() {
    //     return "b2 Instance PID: " + ProcessHandle.current().pid();
    // }

    @GetMapping("/health")
    public String health() {
        return "OK";
    }

    @GetMapping("/ping")
    public String ping() {;
        return "Response from Service Instance: " + UUID.randomUUID().toString();
    }

    @GetMapping("fire/{id}")
    public String fireEmployee(@PathVariable(value = "id") Long id) {
        return hs.fireEmployee(id);
    }

    @GetMapping("move/{worker_id}/{id_from}/{id_to}")
    public ResponseEntity<String> moveEmployee(@PathVariable("worker_id") Long workerId,
                                               @PathVariable("id_from") Long idFrom,
                                               @PathVariable("id_to") Long idTo) {
        try {
            // 执行业务逻辑
            String result = hs.moveEmployee(workerId, idFrom, idTo);
            return ResponseEntity.ok(result); // 返回200状态码和响应
        } catch (HttpClientErrorException e) {
            // 如果外部调用返回4xx错误
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error: " + e.getResponseBodyAsString());
        } catch (HttpServerErrorException e) {
            // 如果外部调用返回5xx错误
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Internal server error: " + e.getResponseBodyAsString());
        } catch (Exception e) {
            // 处理其他任何未捕获的异常
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }


    // @GetMapping("move/{worker_id}/{id_from}/{id_to}")
    // public String moveEmployee(@PathVariable("worker_id") Long workerId,
    //                            @PathVariable("id_from") Long idFrom,
    //                            @PathVariable("id_to") Long idTo) {
    //     return hs.moveEmployee(workerId, idFrom, idTo);
    //     // try {
    //     //     return hs.moveEmployee(workerId, idFrom, idTo);
    //     // } catch (Exception e) {
    //     //     e.printStackTrace(); // 记录完整异常
    //     //     return "Error: " + e.getMessage();
    //     // }
    // }


}