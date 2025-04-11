/*
package com.mynx.myca500.commons.utility;

import java.util.Arrays;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.mynx.myca500.commons.exceptions.InsufficientRoleException;

@Component
@Aspect
public class RoleAuthorizationAspect {

	@Value("${auth.features.enabled}")
	private boolean authFeaturesEnabled;

	@Before("@annotation(allowRoles)")
	public void checkRoleAuthorization(JoinPoint joinPoint, AllowRoles allowRoles) {
		if (authFeaturesEnabled) {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			if (authentication != null && authentication.getAuthorities().stream()
					.anyMatch(authority -> Arrays.asList(allowRoles.value()).contains(authority.getAuthority()))) {
				return;
			}
			throw new InsufficientRoleException("Insufficient roles to access this resource");
		} else
			System.out.println("Bypassed Roles check");

	}
}*/
