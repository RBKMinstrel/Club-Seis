package es.minstrel.app.rest.common;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtGeneratorImpl implements JwtGenerator {

    @Value("${project.jwt.signKey}")
    private String signKey;

    @Value("${project.jwt.expirationMinutes}")
    private long expirationMinutes;

    @Override
    public String generate(JwtInfo info) {

        Claims claims = Jwts.claims();

        claims.setSubject(info.getUserName())
                .setExpiration(new Date(System.currentTimeMillis() + expirationMinutes * 60 * 1000));
        claims.put("userId", info.getUserId());
        claims.put("roles", info.getRolesString());

        return Jwts.builder().setClaims(claims).signWith(Keys.hmacShaKeyFor(signKey.getBytes()), SignatureAlgorithm.HS512).compact();

    }

    @Override
    public JwtInfo getInfo(String token) {

        Claims claims = Jwts.parserBuilder().setSigningKey(Keys.hmacShaKeyFor(signKey.getBytes())).build().parseClaimsJws(token).getBody();

        return new JwtInfo(((Integer) claims.get("userId")).longValue(), claims.getSubject(),
                (String) claims.get("roles"));

    }

}
