/*
package com.mynx.myca500.commons.config;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class AspectLogging {
    private final Logger logger = LoggerFactory.getLogger(AspectLogging.class);
    
    @Pointcut("execution(public * com.mynx.mica500.identity.controllers.*.*(..))")
    public void allControllerMethods() {}

    @Before("allControllerMethods()")
    public void logMethodStart(JoinPoint joinPoint) {
        logger.info("Entering method: {}", joinPoint.getSignature().getName());
    }

    @AfterReturning(pointcut = "allControllerMethods()", returning = "response")
    public void logMethodResponse(JoinPoint joinPoint, Object response) {
        logger.info("Exiting method: {} - Returned data: {}", joinPoint.getSignature().getName(), response);
    }

    @AfterThrowing(pointcut = "allControllerMethods()", throwing = "exception")
    public void logMethodException(JoinPoint joinPoint, Throwable exception) {
        logger.error("Exception in method: {}", joinPoint.getSignature().getName(), exception);
    }


}
*/
