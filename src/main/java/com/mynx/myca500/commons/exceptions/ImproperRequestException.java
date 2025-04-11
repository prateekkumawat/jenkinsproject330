package com.mynx.myca500.commons.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ImproperRequestException extends RuntimeException{
	public ImproperRequestException(String message) {
        super(message);
    }

}
