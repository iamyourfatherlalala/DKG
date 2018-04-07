package com.luoyuxia.dkg.service.impl;

import com.luoyuxia.dkg.service.abs.OntologyBaseService;
import com.luoyuxia.dkg.util.OntologyUtil;
import org.semanticweb.owlapi.model.IRI;
import org.semanticweb.owlapi.model.OWLOntology;
import org.semanticweb.owlapi.model.OWLOntologyManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.net.MalformedURLException;

@Service
public class OntologyBaseServiceImpl implements OntologyBaseService {
    @Autowired
    protected OntologyUtil ontologyUtil;
    @Override
    public OWLOntology loadOWLOntologyFromOntologyLibName(String ontologyName) {
        return this.ontologyUtil.loadOWLOntology(ontologyName);
    }

    @Override
    public IRI getDocumentIRIFromOntologyLibName(String ontologyName) throws MalformedURLException {
        return this.ontologyUtil.getDocumentIRIFromOntologyLibName(ontologyName);
    }

    @Override
    public void saveOntology(OWLOntology ontologyModel){
        try {
            this.ontologyUtil.saveOntology(ontologyModel);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public String getOWLEntityName(IRI iri) {
        return this.ontologyUtil.getOWLEntityName(iri);
    }

    @Override
    public OWLOntologyManager getOWLOntologyManager() {
        return OntologyUtil.OWL_ONTOLOGY_MANAGER;
    }

    @Override
    public IRI resolveOWLEntityIRI(IRI documentIRI, String entityName) {
        return this.ontologyUtil.resolveOWLEntity(documentIRI, entityName);
    }
}

