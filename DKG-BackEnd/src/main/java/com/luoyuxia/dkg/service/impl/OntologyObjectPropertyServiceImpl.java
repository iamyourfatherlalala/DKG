package com.luoyuxia.dkg.service.impl;

import com.luoyuxia.dkg.domain.DKGConceptRelation;
import com.luoyuxia.dkg.service.abs.OntologyObjectPropertyService;
import org.semanticweb.owlapi.model.*;
import org.semanticweb.owlapi.util.OWLEntityRemover;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class OntologyObjectPropertyServiceImpl extends OntologyBaseServiceImpl implements OntologyObjectPropertyService{

    @Override
    public boolean addObjectProperties(String ontologyName, List<DKGConceptRelation> dkgConceptRelationList) {
        OWLOntology ontologyModel = loadOWLOntologyFromOntologyLibName(ontologyName);
        if (ontologyModel == null) {
            return false;
        }
        try {
            OWLOntologyManager owlOntologyManager = getOWLOntologyManager();
            OWLDataFactory dataFactory = owlOntologyManager.getOWLDataFactory();
            IRI documentIRI = getDocumentIRIFromOntologyLibName(ontologyName);
            Set<OWLAxiom> owlAxiomSet = new HashSet<>();
            dkgConceptRelationList.forEach(dkgConceptRelation -> {
                String objectProperty = dkgConceptRelation.getRelation();
                String domain = dkgConceptRelation.getFromConcept();
                String range = dkgConceptRelation.getToConcept();
                IRI owlPropertyIRI = resolveOWLEntityIRI(documentIRI, objectProperty);
                OWLProperty owlProperty = dataFactory.getOWLObjectProperty(owlPropertyIRI);
                IRI owlDomainIRI = resolveOWLEntityIRI(documentIRI, domain);
                OWLClass domainClass = dataFactory.getOWLClass(owlDomainIRI);
                OWLAxiom domainAxiom = dataFactory.getOWLObjectPropertyDomainAxiom(owlProperty.asOWLObjectProperty(),domainClass);
                owlAxiomSet.add(domainAxiom);
                IRI owlRangeIRI = resolveOWLEntityIRI(documentIRI, range);
                OWLClass rangeClass = dataFactory.getOWLClass(owlRangeIRI);
                OWLAxiom rangeAxiom = dataFactory.getOWLObjectPropertyRangeAxiom(owlProperty.asOWLObjectProperty(), rangeClass);
                owlAxiomSet.add(rangeAxiom);
            });
            owlOntologyManager.addAxioms(ontologyModel, owlAxiomSet.stream());
            saveOntology(ontologyModel);
        }
        catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public List<DKGConceptRelation> findObjectPropertiesByDomainName(String ontologyName, String concept) {
        return findObjectProperties(ontologyName, concept);
    }

    private List<DKGConceptRelation> findObjectProperties(String ontologyName, String concept) {
        List<DKGConceptRelation> dkgConceptRelationList = new ArrayList<>();
        OWLOntology ontologyModel = loadOWLOntologyFromOntologyLibName(ontologyName);
        if (ontologyModel == null) {
            return dkgConceptRelationList;
        }
        try {
            ontologyModel.axioms(AxiomType.OBJECT_PROPERTY_DOMAIN).forEach(owlObjectPropertyDomainAxiom -> {
                String domainName = getOWLEntityName(owlObjectPropertyDomainAxiom.getDomain().asOWLClass().getIRI());
                if (concept == null || domainName.equals(concept)) {
                    OWLObjectProperty owlObjectProperty = owlObjectPropertyDomainAxiom.getProperty().asOWLObjectProperty();
                    IRI propertyIRI = owlObjectProperty.getIRI();
                    String propertyName = getOWLEntityName(propertyIRI);
                    ontologyModel.objectPropertyRangeAxioms(owlObjectProperty).forEach(owlObjectPropertyRangeAxiom -> {
                        IRI rangeIRI = owlObjectPropertyRangeAxiom.getRange().asOWLClass().getIRI();
                        String rangeName = getOWLEntityName(rangeIRI);
                        dkgConceptRelationList.add(new DKGConceptRelation(domainName, propertyName, rangeName));
                    });
                }
            });
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return dkgConceptRelationList;
    }

    @Override
    public boolean deleteObjectProperty(String ontologyName, DKGConceptRelation dkgConceptRelation) {
        String domain = dkgConceptRelation.getFromConcept();
        String objectProperty = dkgConceptRelation.getRelation();
        String range = dkgConceptRelation.getToConcept();
        OWLOntology ontologyModel = loadOWLOntologyFromOntologyLibName(ontologyName);
        if (ontologyModel == null) {
            return false;
        }
        try {
            OWLOntologyManager owlOntologyManager = getOWLOntologyManager();
            OWLDataFactory dataFactory = owlOntologyManager.getOWLDataFactory();
            IRI documentIRI = getDocumentIRIFromOntologyLibName(ontologyName);
            IRI propertyIRI = resolveOWLEntityIRI(documentIRI, objectProperty);
            OWLProperty owlProperty = dataFactory.getOWLObjectProperty(propertyIRI);
            Set<OWLAxiom> axiomsToRemove = new HashSet<>();
            IRI owlDomainIRI = resolveOWLEntityIRI(documentIRI, domain);
            OWLClass domainClass = dataFactory.getOWLClass(owlDomainIRI);
            OWLAxiom domainAxiom = dataFactory.getOWLObjectPropertyDomainAxiom(owlProperty.asOWLObjectProperty(),domainClass);
            axiomsToRemove.add(domainAxiom);
            IRI owlRangeIRI = resolveOWLEntityIRI(documentIRI, range);
            OWLClass rangeClass = dataFactory.getOWLClass(owlRangeIRI);
            OWLAxiom rangeAxiom = dataFactory.getOWLObjectPropertyRangeAxiom(owlProperty.asOWLObjectProperty(), rangeClass);
            axiomsToRemove.add(rangeAxiom);
            owlOntologyManager.removeAxioms(ontologyModel, axiomsToRemove.stream());
            // check whether there is any owl class is involved with the object property, if so return true
            boolean shouldDeleteObjectProperty = !ontologyModel.axioms(AxiomType.OBJECT_PROPERTY_DOMAIN).anyMatch(owlObjectPropertyDomainAxiom -> {
                OWLObjectProperty owlObjectProperty = owlObjectPropertyDomainAxiom.getProperty().asOWLObjectProperty();
                return getOWLEntityName(owlObjectProperty.getIRI()).equals(objectProperty);
            });
            // if no any other owl class is involved with the object property, delete it
            if (shouldDeleteObjectProperty) {
                OWLEntity owlEntity = dataFactory.getOWLObjectProperty(propertyIRI);
                OWLEntityRemover remover = new OWLEntityRemover(Collections.singleton(ontologyModel));
                owlEntity.accept(remover);
                owlOntologyManager.applyChanges(remover.getChanges());
            }
            saveOntology(ontologyModel);
        }
        catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public List<DKGConceptRelation> getAllObjectProperties(String ontologyName) {
        return findObjectProperties(ontologyName, null);
    }
}
