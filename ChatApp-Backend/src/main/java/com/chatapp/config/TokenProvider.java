package com.chatapp.config;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Service
public class TokenProvider {
	
	SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256; // Choose your preferred algorithm
	SecretKey key = Keys.secretKeyFor(signatureAlgorithm);
	
	public String generateToken(Authentication authentication) {
		String jwt = Jwts.builder()
				      .setIssuer("the_codebreaker")
				      .setIssuedAt(new Date())
				      .setExpiration(new Date(new Date().getTime()+8640000))  // expire after 24hr
				      .claim("email", authentication.getName())
				      .signWith(key)
				      .compact();
		return jwt;
				      
	}
	
	public String getEmailFromToken(String jwt) {
		
		jwt = jwt.substring(7);
		Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
		String email=String.valueOf(claims.get("email"));
		
		return email;
	}

}
