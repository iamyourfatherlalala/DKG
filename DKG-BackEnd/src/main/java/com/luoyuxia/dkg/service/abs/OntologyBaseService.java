package com.luoyuxia.dkg.service.abs;

import org.semanticweb.owlapi.model.IRI;
import org.semanticweb.owlapi.model.OWLOntology;
import org.semanticweb.owlapi.model.OWLOntologyManager;
import org.semanticweb.owlapi.model.OWLOntologyStorageException;

import java.net.MalformedURLException;

public interface OntologyBaseService {
    OWLOntology loadOWLOntologyFromOntologyLibName(String ontologyName);

    IRI getDocumentIRIFromOntologyLibName(String ontologyName) throws MalformedURLException;

    void saveOntology(OWLOntology ontologyModel) throws OWLOntologyStorageException;

    String getOWLEntityName(IRI iri);

    OWLOntologyManager getOWLOntologyManager();

    IRI resolveOWLEntityIRI(IRI documentIRI, String entityName);
}
