package com.mynx.myca500.commons.validations;

import jakarta.validation.Constraint;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import jakarta.validation.Payload;

import java.lang.annotation.*;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.util.Arrays;
import java.util.List;

@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.FIELD, ElementType.METHOD})
@Constraint(validatedBy = AllowedValuesValidator.class)
public @interface AllowedValues {
    String message() default "'${validatedValue}' is not allowed. Allowed values are ${allowedValString}";
    String allowedValues();
    Class<?> allowedValuesProvider();
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

class AllowedValuesValidator implements ConstraintValidator<AllowedValues, String> {

    private String[] allowedValues;
    private String allowedValString;

    @Override
    public void initialize(AllowedValues constraintAnnotation) {
        try {
            this.allowedValues = (String[]) constraintAnnotation
                    .allowedValuesProvider()
                    .getMethod("getAllowed", String.class)
                    .invoke(null, constraintAnnotation.allowedValues());
            this.allowedValString = String.join(",", this.allowedValues);

        } catch (IllegalAccessException | InvocationTargetException | NoSuchMethodException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        boolean valid =  value == null || Arrays.asList(this.allowedValues).contains(value);
        if (!valid){
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(
                    String.format(
                            "'%s' is not valid. Allowed values are: [%s]",
                            value,
                            String.join(",", this.allowedValues)
                    )
            ).addConstraintViolation();
        }
        return valid;
    }
}
