package com.luoyuxia.dkg.service.abs;

import com.luoyuxia.dkg.domain.DKGConceptRelation;

import java.util.List;

public interface OntologyObjectPropertyService extends OntologyBaseService{
    boolean addObjectProperties(String ontologyName, List<DKGConceptRelation> dkgConceptRelationList);
    List<DKGConceptRelation> findObjectPropertiesByDomainName(String ontologyName, String concept);
    boolean deleteObjectProperty(String ontologyName, DKGConceptRelation dkgConceptRelation);
    List<DKGConceptRelation> getAllObjectProperties(String ontologyName);
}
