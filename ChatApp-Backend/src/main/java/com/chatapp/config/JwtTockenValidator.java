package com.chatapp.config;

import java.io.IOException;
import java.util.List;

import javax.crypto.SecretKey;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


public class JwtTockenValidator extends OncePerRequestFilter {

	    @Override
	    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
	            throws ServletException, IOException {
	        String jwt = request.getHeader("Authorization");

	        if (jwt != null) {

	            try {
	                // Bearer Token
	                jwt = jwt.substring(7);

	                // Use the SECRET_KEY from JwtConstants
	                SecretKey key = Keys.hmacShaKeyFor(JwtConstants.SECRET_KEY.getBytes());

	                System.out.println("Generated token at time of validation :: " + key);
	                
	                Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
         
	                
	                String username = String.valueOf(claims.get("email"));
	                
	                System.out.println("email :: "+username);
	                
	                String authorities = String.valueOf(claims.get("authorities"));

	                List<GrantedAuthority> auths = AuthorityUtils.commaSeparatedStringToAuthorityList(authorities);

	                Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, auths);

	                SecurityContextHolder.getContext().setAuthentication(authentication);
	                
	                System.out.println(" Token verified ");

	            } catch (Exception e) {
	                throw new BadCredentialsException("Invalid token received...contact admin");
	            }
	        }

	        filterChain.doFilter(request, response);
	    }
	}


