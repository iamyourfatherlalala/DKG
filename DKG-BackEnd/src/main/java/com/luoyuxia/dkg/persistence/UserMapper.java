package com.luoyuxia.dkg.persistence;

import com.luoyuxia.dkg.domain.entity.User;
import org.apache.ibatis.annotations.*;
import org.apache.ibatis.mapping.FetchType;
import org.springframework.stereotype.Component;

@Component
public interface UserMapper {
    @Select("SELECT * FROM user WHERE id = #{id}")
    @Results({
            @Result(id=true,column="id",property="id"),
            @Result(column="id",property="roles",
                    many=@Many(
                            select="com.luoyuxia.dkg.persistence.RoleMapper.getRolesByUserId",
                            fetchType= FetchType.LAZY
                    )
            )
    })
    User getUserById(@Param("id") Long id);


    @Select("SELECT * FROM user WHERE username = #{username}")
    @Results({
            @Result(id=true,column="id",property="id"),
            @Result(column="id",property="roles",
                    many=@Many(
                            select="com.luoyuxia.dkg.persistence.RoleMapper.getRolesByUserId",
                            fetchType= FetchType.EAGER
                    )
            )
    })
    User getUserByUserName(@Param("username") String username);

    @Insert({"INSERT into user(username, nickname, password) " +
            "values(#{username}, #{nickname}, #{password})"})
    @Options(useGeneratedKeys=true, keyColumn="id")
    Long saveUser(User user);
}
