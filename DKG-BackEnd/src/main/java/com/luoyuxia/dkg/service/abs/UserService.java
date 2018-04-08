package com.luoyuxia.dkg.service.abs;

import com.luoyuxia.dkg.domain.entity.Role;
import com.luoyuxia.dkg.domain.entity.User;

public interface UserService {
    User getUserByUserName(String userName);


    User getUserById(Long id);

    User register(User user);

    Role getUserRole();
    Role getAdminRole();
}
