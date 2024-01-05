package csd.week5.security;

import csd.week5.user.JwtAuthFilter;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@EnableMethodSecurity
@Configuration
public class SecurityConfig {
    @Autowired
    private JwtAuthFilter authFilter;
    private UserDetailsService userDetailsService;

    public SecurityConfig(UserDetailsService userSvc) {
        this.userDetailsService = userSvc;
    }

    /**
     * Exposes a bean of DaoAuthenticationProvider, a type of AuthenticationProvider
     * Attaches the user details and the password encoder
     * 
     * @return
     */

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(encoder());

        return authProvider;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeRequests(authorize -> authorize
                        .antMatchers("/users", "/generateToken").permitAll()
                        .antMatchers(HttpMethod.GET, "/tickets").permitAll()
                        .antMatchers(HttpMethod.POST, "/tickets", "/tickets/").hasRole("ADMIN")
                        .antMatchers(HttpMethod.PUT, "/tickets/*").hasRole("ADMIN")
                        .antMatchers(HttpMethod.DELETE, "/tickets/*").hasRole("ADMIN")
                        .antMatchers(HttpMethod.GET, "/tickets/*/*/buy").hasAnyRole("USER", "ADMIN")
                        .antMatchers(HttpMethod.GET, "/home").permitAll()
                        .antMatchers(HttpMethod.GET, "/eventInfo/*").permitAll()
                        .antMatchers(HttpMethod.DELETE, "/eventInfo/*").hasRole("ADMIN")
                        .antMatchers(HttpMethod.POST, "/eventInfo").hasRole("ADMIN")
                        .antMatchers(HttpMethod.GET, "/Transactions/*").permitAll()
                        .antMatchers(HttpMethod.GET, "/checkout").hasRole("USER"))
                .httpBasic()
                // Additional security configurations
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class)
                .formLogin().disable()
                .headers().disable();

        return http.build();
    }

    @Bean
    public BCryptPasswordEncoder encoder() {
        // auto-generate a random salt internally
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
