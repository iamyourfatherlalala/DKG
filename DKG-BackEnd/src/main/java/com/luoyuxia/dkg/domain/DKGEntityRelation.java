package com.luoyuxia.dkg.domain;

import java.util.ArrayList;
import java.util.List;

public class DKGEntityRelation {
    private String relation;
    private List<DKGEntityProperty> toDKGEntityPropertyList = new ArrayList<>();

    public DKGEntityRelation(String relation, List<DKGEntityProperty> dkgEntityProperties) {
        this.relation = relation;
        this.toDKGEntityPropertyList =dkgEntityProperties;
    }

    public List<DKGEntityProperty> getToDKGEntityPropertyList() {
        return toDKGEntityPropertyList;
    }

    public void setToDKGEntityPropertyList(List<DKGEntityProperty> toDKGEntityPropertyList) {
        this.toDKGEntityPropertyList = toDKGEntityPropertyList;
    }

    public String getRelation() {
        return relation;
    }

    public void setRelation(String relation) {
        this.relation = relation;
    }
}
