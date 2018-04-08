package com.luoyuxia.dkg.service;

import com.luoyuxia.dkg.domain.entity.User;
import com.luoyuxia.dkg.jwt.JwtUserFactory;
import com.luoyuxia.dkg.service.abs.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JwtUserDetailsServiceImpl implements UserDetailsService{
    @Autowired
    private UserService userService;
    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        User user = userService.getUserByUserName(s);
        if(user == null) {
            throw new UsernameNotFoundException(String.format("No user found with username '%s'",
                    s));
        }
        else {
            return JwtUserFactory.create(user);
        }
    }
}
