package com.luoyuxia.dkg.persistence;

import com.luoyuxia.dkg.domain.entity.Role;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface RoleMapper {
    @Select("select * from role where id in (select roleid from user_role where userid = #{id})")
    List<Role> getRolesByUserId(@Param("id") Long userId);

    @Insert("insert into user_role values(#{userid}, #{roleid}) ")
    boolean insertRoleForUser(@Param("userid") Long userid, @Param("roleid") Long roleid);
}
