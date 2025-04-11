
package com.mynx.myca500.commons.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<List<Map<String, String>>> handleResourceNotFoundException(ResourceNotFoundException ex) {
        return new ResponseEntity<>(formatExceptionMsg(getErrorsMap(ex, HttpStatus.NOT_FOUND)), HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(UnauthorizedAccessException.class)
    public ResponseEntity<String> handleUnauthorizedAccessException(UnauthorizedAccessException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
    }
    @ExceptionHandler(ResourceCreationException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<List<Map<String, String>>> handleResourceCreationException(ResourceCreationException ex) {
        return new ResponseEntity<>(formatExceptionMsg(getErrorsMap(ex,
                HttpStatus.INTERNAL_SERVER_ERROR)),
                HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(ValidationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<String> handleValidationException(ValidationException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    private ArrayList formatExceptionMsg(HashMap<String, String> errors){
        ArrayList errorList = new ArrayList<HashMap<String, String>>();
        errorList.add(errors);
        return errorList;
    }

    private HashMap<String, String> getErrorsMap(RuntimeException ex, HttpStatus status){
        return  new HashMap<String, String>(){{
            put("code", String.valueOf(status.value()));
            put("detailedMessage", ex.getMessage());
            put("message", status.getReasonPhrase());
        }};
    }
    public String getExceptionMsg(RuntimeException ex){
        if (ex.getCause()!= null){
            String casue = ex.getCause().getClass().getName();
            String msg = "";
            if (ex.getCause().getCause()!= null){
                msg = ex.getCause()
                        .getCause()
                        .getMessage();
            }
            return casue + "\n" +msg;
        }else {
            return "";
        }
    }
}