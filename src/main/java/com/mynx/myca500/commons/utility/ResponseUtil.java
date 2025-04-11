package com.mynx.myca500.commons.utility;

import org.springframework.http.HttpStatus;
import java.util.HashMap;
import java.util.Map;

public class ResponseUtil {

    public static Map<String, Object> generateSuccessResponse(HttpStatus status, String message) {
        Map<String, Object> successResponse = new HashMap<>();
        successResponse.put("code", status.value());
        successResponse.put("message", message);
        return Map.of("success", successResponse);
    }
}