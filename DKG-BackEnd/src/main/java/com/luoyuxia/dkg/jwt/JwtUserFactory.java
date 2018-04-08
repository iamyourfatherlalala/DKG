package com.luoyuxia.dkg.jwt;

import com.luoyuxia.dkg.domain.entity.Role;
import com.luoyuxia.dkg.domain.entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;
import java.util.stream.Collectors;

public class JwtUserFactory {
    private JwtUserFactory() {
    }

    public static JwtUser create(User user) {
        return new JwtUser(
                user.getId(),
                user.getUsername(),
                user.getPassword(),
                mapToGrantedAuthorities(user.getRoles()));
    }
    private static List<GrantedAuthority> mapToGrantedAuthorities(List<Role> authorities) {
        return authorities.stream()
                .map(role->new SimpleGrantedAuthority(role.getRolename()))
                .collect(Collectors.toList());
    }
}
