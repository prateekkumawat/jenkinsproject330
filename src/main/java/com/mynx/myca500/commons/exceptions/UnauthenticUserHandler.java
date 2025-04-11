/*


package com.mynx.myca500.commons.exceptions;

import java.io.IOException;
import java.io.PrintWriter;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.google.gson.Gson;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class UnauthenticUserHandler implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) throws IOException, ServletException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");

        ErrorWrapper errorWrapper = new ErrorWrapper(new ErrorDetails(HttpServletResponse.SC_UNAUTHORIZED, "Access Denied !! " + authException.getMessage()));

        PrintWriter writer = response.getWriter();
        writer.println(new Gson().toJson(errorWrapper));
    }
}

class ErrorWrapper {
    private ErrorDetails error;

    public ErrorWrapper(ErrorDetails error) {
        this.error = error;
    }

    public ErrorDetails getError() {
        return error;
    }

    public void setError(ErrorDetails error) {
        this.error = error;
    }
}

class ErrorDetails {
    private int code;
    private String message;

    public ErrorDetails(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
*/
