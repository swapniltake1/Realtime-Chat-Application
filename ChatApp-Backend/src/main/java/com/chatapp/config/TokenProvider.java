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
    
    // Define the key as a SecretKey
    SecretKey key = Keys.hmacShaKeyFor(JwtConstants.SECRET_KEY.getBytes()); // Assuming SECRET_KEY is a String

    public String generateToken(Authentication authentication) {
        
        System.out.println("Generated token at time of creation :: " + key);
        
        String jwt = Jwts.builder()
                .setIssuer("the_codebreaker")
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + 8640000)) // expire after 24hr
                .claim("email", authentication.getName())
                .signWith(key, SignatureAlgorithm.HS256) // Sign with the key and algorithm
                .compact();
        return jwt;
    }

    public String getEmailFromToken(String jwt) {

        jwt = jwt.substring(7);
        Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
        String email = String.valueOf(claims.get("email"));

        return email;
    }
}
