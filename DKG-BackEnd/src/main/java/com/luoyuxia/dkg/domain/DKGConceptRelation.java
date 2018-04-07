package com.luoyuxia.dkg.domain;

public class DKGConceptRelation {
    private String fromConcept;
    private String relation;
    private String toConcept;

    public DKGConceptRelation(){
    }
    public DKGConceptRelation(String fromConcept, String relation, String toConcept) {
        this.fromConcept = fromConcept;
        this.relation = relation;
        this.toConcept = toConcept;
    }

    public String getFromConcept() {
        return fromConcept;
    }

    public void setFromConcept(String fromConcept) {
        this.fromConcept = fromConcept;
    }

    public String getRelation() {
        return relation;
    }

    public void setRelation(String relation) {
        this.relation = relation;
    }

    public String getToConcept() {
        return toConcept;
    }

    public void setToConcept(String toConcept) {
        this.toConcept = toConcept;
    }
}
