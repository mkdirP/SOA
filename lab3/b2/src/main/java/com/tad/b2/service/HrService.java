package com.tad.b2.service;

import com.tad.b2.dto.ChangeOrganizationRequest;
import com.tad.b2.dto.ChangeStatusRequest;
import com.tad.b2.entity.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import org.springframework.http.MediaType;


@Service
public class HrService {
    private static String FIRE_REQUEST_URL = "http://localhost:8090/node1/v2/workers/status"; // why b1 ?
    private static String MOVE_REQUEST_URL = "http://localhost:8090/node1/v2/workers/org";
    private static String CHECK_VALID_EMPLOYEE = "http://localhost:8090/node1/v2/workers/check/";

    private static int SUCCESS = 200;

    @Autowired
    private RestTemplate restTemplate;

    public String fireEmployee(long emId) {
        restTemplate = new RestTemplate();

        ChangeStatusRequest data = new ChangeStatusRequest(emId, Status.FIRED);

        HttpHeaders headers = new HttpHeaders();

        headers.setContentType(MediaType.APPLICATION_XML);

        System.out.println("Sending request: " + data.toString());

        HttpEntity<ChangeStatusRequest> requestEntity = new HttpEntity<>(data, headers);


        ResponseEntity<String> res = restTemplate.exchange(
                FIRE_REQUEST_URL,
                HttpMethod.PUT,
                requestEntity,
                String.class);
        // System.out.println(res.toString());
        System.out.println("Response Code: " + res.getStatusCode()); // 打印返回的状态码
        System.out.println("Response Body: " + res.getBody());       // 打印返回的响应体

        return res.getBody();
    }

    public String moveEmployee(long userId, long fromOrgId, long toOrgId) {
        restTemplate = new RestTemplate();
        ResponseEntity<String> checkValidEmployee = restTemplate.getForEntity(
                CHECK_VALID_EMPLOYEE + userId+ "/" + fromOrgId,
                String.class);
        if (checkValidEmployee.getStatusCode() != HttpStatus.OK) {
            return checkValidEmployee.getBody();
        }

        ChangeOrganizationRequest data = new ChangeOrganizationRequest(userId, toOrgId);
        HttpHeaders headers = new HttpHeaders();

        headers.setContentType(MediaType.APPLICATION_XML);

        HttpEntity<String> requestEntity = new HttpEntity<>(data.toString(), headers);
        System.out.println(data.toString());

        ResponseEntity<String> moveEmployee = restTemplate.exchange(
                MOVE_REQUEST_URL,
                HttpMethod.PUT,
                requestEntity,
                String.class);

        return moveEmployee.getBody();
    }
}

