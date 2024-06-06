package es.minstrel.app.rest.common;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.web.util.matcher.AntPathRequestMatcher.antMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    protected SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        // @formatter:off
        http.cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(antMatcher("/*")).permitAll()
                        /*Peticiones relativas a userService*/
                        .requestMatchers(antMatcher(HttpMethod.POST, "/api/user/login")).permitAll()
                        .requestMatchers(antMatcher(HttpMethod.POST, "/api/user/loginFromServiceToken")).permitAll()
                        .requestMatchers(antMatcher(HttpMethod.PUT, "/api/user/*")).authenticated()
                        .requestMatchers(antMatcher(HttpMethod.POST, "/api/user/*/changePassword")).authenticated()
                        /*Peticiones relativas a adminService*/
                        .requestMatchers(antMatcher(HttpMethod.GET, "/api/admin/roles")).hasRole("ADMIN")
                        .requestMatchers(antMatcher(HttpMethod.GET, "/api/admin/users")).hasRole("ADMIN")
                        .requestMatchers(antMatcher(HttpMethod.POST, "/api/admin/users")).hasRole("ADMIN")
                        .requestMatchers(antMatcher(HttpMethod.GET, "/api/admin/users/*")).hasRole("ADMIN")
                        .requestMatchers(antMatcher(HttpMethod.PUT, "/api/admin/users/*")).hasRole("ADMIN")
                        .requestMatchers(antMatcher(HttpMethod.DELETE, "/api/admin/users/*")).hasRole("ADMIN")
                        /*Peticiones relativas a contabilidadService*/
                        .requestMatchers(antMatcher(HttpMethod.GET, "/api/contabilidad/conceptos")).hasRole("TESORERO")
                        .requestMatchers(antMatcher(HttpMethod.POST, "/api/contabilidad/conceptos")).hasRole("TESORERO")
                        .requestMatchers(antMatcher(HttpMethod.PUT, "/api/contabilidad/conceptos/*")).hasRole("TESORERO")
                        .requestMatchers(antMatcher(HttpMethod.GET, "/api/contabilidad/categorias")).hasRole("TESORERO")
                        .requestMatchers(antMatcher(HttpMethod.POST, "/api/contabilidad/categorias")).hasRole("TESORERO")
                        .requestMatchers(antMatcher(HttpMethod.PUT, "/api/contabilidad/categorias/*")).hasRole("TESORERO")
                        .requestMatchers(antMatcher(HttpMethod.GET, "/api/contabilidad/cuentas")).hasRole("TESORERO")
                        .requestMatchers(antMatcher(HttpMethod.POST, "/api/contabilidad/cuentas")).hasRole("TESORERO")
                        .requestMatchers(antMatcher(HttpMethod.PUT, "/api/contabilidad/cuentas/*")).hasRole("TESORERO")
                        .requestMatchers(antMatcher(HttpMethod.GET, "/api/contabilidad/razon-social")).hasRole("TESORERO")
                        .requestMatchers(antMatcher(HttpMethod.POST, "/api/contabilidad/razon-social")).hasRole("TESORERO")
                        .requestMatchers(antMatcher(HttpMethod.PUT, "/api/contabilidad/razon-social/*")).hasRole("TESORERO")
                        .requestMatchers(antMatcher(HttpMethod.GET, "/api/contabilidad/movimientos")).hasRole("TESORERO")
                        .requestMatchers(antMatcher(HttpMethod.POST, "/api/contabilidad/movimientos")).hasRole("TESORERO")
                        .requestMatchers(antMatcher(HttpMethod.GET, "/api/contabilidad/movimientos/*")).hasRole("TESORERO")
                        .requestMatchers(antMatcher(HttpMethod.PUT, "/api/contabilidad/movimientos/*")).hasRole("TESORERO")
                        .requestMatchers(antMatcher(HttpMethod.DELETE, "/api/contabilidad/movimientos/*")).hasRole("TESORERO")
                        .requestMatchers(antMatcher(HttpMethod.GET, "/api/contabilidad/summary")).hasRole("TESORERO")
                        .requestMatchers(antMatcher(HttpMethod.GET, "/api/contabilidad/descargar-excel")).hasRole("TESORERO")
                        .requestMatchers(antMatcher(HttpMethod.GET, "/api/contabilidad/subir-excel")).hasRole("TESORERO")
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration config = new CorsConfiguration();
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        config.setAllowCredentials(true);
        config.setAllowedOriginPatterns(Arrays.asList("*"));
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");

        source.registerCorsConfiguration("/**", config);

        return source;

    }

}