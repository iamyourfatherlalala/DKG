package com.luoyuxia.dkg.service.abs;

import com.luoyuxia.dkg.domain.DKGEntity;

import java.util.List;

public interface DKGEntityService {
    List<DKGEntity> getEntityByName(String entityName);
    boolean deleteEntity(String entityName);
    List<DKGEntity> getEntityByLabel(String labelName);
    boolean importEntity(List<DKGEntity> dkgEntityList);
}
