package com.mynx.myca500.commons.utility;


import org.springframework.stereotype.Component;

import java.lang.reflect.Field;

@Component
public class ReflectionUtil {

    public static void copyNonNullProperties(Object src, Object target) {
        Field[] fields = src.getClass().getDeclaredFields();
        for (Field field : fields) {
            field.setAccessible(true);
            try {
                Object value = field.get(src);
                if (value != null) {
                    field.set(target, value);
                }
            } catch (IllegalAccessException e) {
                System.out.println("exception while copying the object values");
            }
        }
    }
}