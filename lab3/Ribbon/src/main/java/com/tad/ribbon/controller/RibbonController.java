package com.tad.ribbon.controller;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import javax.ws.rs.PathParam;
import java.util.Map;

@RestController
public class RibbonController {
    @Autowired
    private RestTemplate restTemplate;

    @GetMapping("/info")
    public String getInfo() {
        return restTemplate.getForObject("http://client-service/info", String.class);
    }

    @GetMapping("/ping")
    public String ping() {;
        String serviceUrl = "http://client-service/api/v2/hrs/ping";
        return restTemplate.getForObject(serviceUrl, String.class);
    }

    @GetMapping("fire/{id}")
    public String fireEmployee(@RequestHeader Map<String, String> headers,
                               @PathVariable(value = "id") Long id) {
        StringBuilder headerString = new StringBuilder("Headers:\n");
        headers.forEach((key, value) -> headerString.append(key).append(": ").append(value).append("\n"));
        System.out.println("Headers: "+ headerString.toString());
        String serviceUrl = "http://client-service/api/v2/hrs/fire/" + id;
        return restTemplate.getForObject(serviceUrl, String.class);
    }

    @GetMapping("move/{worker_id}/{id_from}/{id_to}")
    public String moveEmployee(@PathVariable("worker_id") Long workerId,
                               @PathVariable("id_from") Long idFrom,
                               @PathVariable("id_to") Long idTo) {
        String serviceUrl = "http://client-service/api/v2/hrs/move/" + workerId + "/" + idFrom + "/" + idTo;
        return restTemplate.getForObject(serviceUrl, String.class);
    }

    private static final Logger logger = LoggerFactory.getLogger(RibbonController.class);

    // @GetMapping("move/{workerId}/{idFrom}/{idTo}")
    // public String moveEmployee(@PathVariable("workerId") long id,
    //                            @PathVariable("idFrom") long from,
    //                            @PathVariable("idTo") long to) {
    //     // logger.info("收到请求: workerId={}, idFrom={}, idTo={}", id, from, to);
    //
    //     String serviceUrl = "http://client-service/api/v2/hrs/move/" + id + "/" + from + "/" + to;
    //     logger.info("调用外部服务: {}", serviceUrl);
    //
    //     try {
    //         String response = restTemplate.getForObject(serviceUrl, String.class);
    //         logger.info("外部服务返回: {}", response);
    //         return response;
    //     } catch (Exception e) {
    //         logger.error("调用失败: {}", e.getMessage(), e);
    //         return "调用外部服务失败";
    //     }
    // }


}