package com.mynx.myca500.commons.exceptions;

import lombok.AllArgsConstructor;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}