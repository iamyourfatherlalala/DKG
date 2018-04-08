package com.luoyuxia.dkg.service.impl;

import com.luoyuxia.dkg.domain.entity.Role;
import com.luoyuxia.dkg.domain.entity.User;
import com.luoyuxia.dkg.persistence.RoleMapper;
import com.luoyuxia.dkg.persistence.UserMapper;
import com.luoyuxia.dkg.service.abs.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;

@Transactional
@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private RoleMapper roleMapper;

    @Override
    public User getUserByUserName(String userName) {
        return userMapper.getUserByUserName(userName);
    }

    @Override
    public User getUserById(Long id) {
        return userMapper.getUserById(id);
    }

    @Override
    public User register(User user) {
        final String username = user.getUsername();
        if (userMapper.getUserByUserName(username) != null) {
            return null;
        }
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        final String rawPassword = user.getPassword();
        user.setPassword(encoder.encode(rawPassword));
        // set default the user role
        Role userRole = this.getUserRole();
        user.setRoles(Collections.singletonList(userRole));
        userMapper.saveUser(user);
        roleMapper.insertRoleForUser(user.getId(), userRole.getId());
        return user;
    }

    @Override
    public Role getUserRole() {
        Role userRole = new Role();
        userRole.setId(1L);
        userRole.setRolename("ROLE_USER");
        return userRole;
    }

    @Override
    public Role getAdminRole() {
        Role adminRole = new Role();
        adminRole.setId(2L);
        adminRole.setRolename("ROLE_ADMIN");
        return adminRole;
    }
}
