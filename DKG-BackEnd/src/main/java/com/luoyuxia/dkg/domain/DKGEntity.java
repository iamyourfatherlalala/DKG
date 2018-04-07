package com.luoyuxia.dkg.domain;

import java.util.ArrayList;
import java.util.List;

public class DKGEntity {
    private List<DKGEntityProperty> dkgEntityPropertyList = new ArrayList<>();
    private List<DKGEntityRelation> dkgEntityRelationList = new ArrayList<>();
    public DKGEntity() {
    }
    public DKGEntity(List<DKGEntityProperty> dkgEntityProperties, List<DKGEntityRelation> dkgEntityRelations) {
        this.dkgEntityPropertyList = dkgEntityProperties;
        this.dkgEntityRelationList = dkgEntityRelations;
    }

    public void addDKGEntityRelation(DKGEntityRelation dkgEntityRelation) {
        this.dkgEntityRelationList.add(dkgEntityRelation);
    }

    public List<DKGEntityProperty> getDkgEntityPropertyList() {
        return dkgEntityPropertyList;
    }

    public void setDkgEntityPropertyList(List<DKGEntityProperty> dkgEntityPropertyList) {
        this.dkgEntityPropertyList = dkgEntityPropertyList;
    }

    public List<DKGEntityRelation> getDkgEntityRelationList() {
        return dkgEntityRelationList;
    }

    public void setDkgEntityRelationList(List<DKGEntityRelation> dkgEntityRelationList) {
        this.dkgEntityRelationList = dkgEntityRelationList;
    }
}
