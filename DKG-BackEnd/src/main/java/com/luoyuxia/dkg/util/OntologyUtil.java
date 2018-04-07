package com.luoyuxia.dkg.util;


import org.semanticweb.owlapi.apibinding.OWLManager;
import org.semanticweb.owlapi.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

import java.io.File;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.file.Paths;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

@Component
@PropertySource("classpath:application.properties")
public class OntologyUtil {
    @Value("${ontology.postfix}")
    private String postfix;
    private static Logger logger = LoggerFactory.getLogger(OntologyUtil.class);
    @Value("${ontology.uername}")
    private String username;
    @Value("${ontology.store.path}")
    private String ontologyStorePath;
    private static Lock ontologyLock = new ReentrantLock();

    @Value("${ontology.url.prefix}")
    private String ontologyPrefix;

    public static  OWLOntologyManager OWL_ONTOLOGY_MANAGER
            = OWLManager.createOWLOntologyManager();


    public void saveOntology(OWLOntology ontologyModel) throws OWLOntologyStorageException{
        try {
            if (ontologyModel != null) {
                ontologyModel.saveOntology();
                OWL_ONTOLOGY_MANAGER.removeOntology(ontologyModel);
            }
        } catch (OWLOntologyStorageException e) {
            e.printStackTrace();
            logger.error("Can not store owl");
            throw e;
        }
    }

    public IRI getDocumentIRIFromOntologyLibName(String ontologyLibraryName) throws MalformedURLException{
        try {
            URL ontologyUrl = this.getOntologyURL( ontologyLibraryName);
            return IRI.create(ontologyUrl);
        } catch (MalformedURLException e) {
            e.printStackTrace();
            throw  e;
        }
    }

    public URL getOntologyURL(String ontologyName) throws MalformedURLException{
        String rootPrefix = this.ontologyPrefix.replace("?", username);
        return new URL(rootPrefix + ontologyName);
    }


    public OWLOntology loadOWLOntology(String ontologyLibraryName)
    {
        String filePath = Paths.get(ontologyStorePath).resolve(ontologyLibraryName + postfix).toString();
        OWLOntology ontologyModel = null;
        try {
            ontologyModel = OWL_ONTOLOGY_MANAGER.loadOntologyFromOntologyDocument(new File(filePath));
        }
        catch (OWLOntologyAlreadyExistsException owlOntologyAlreadyExistsException) {
            OWLOntologyID owlOntologyID = owlOntologyAlreadyExistsException.getOntologyID();
            ontologyLock.lock();
            try {
                ontologyModel = OWL_ONTOLOGY_MANAGER.getOntology(owlOntologyID);
            }
            catch (Exception e) {
                e.printStackTrace();
            }
            finally {
                ontologyLock.unlock();
            }
        }
        catch (OWLOntologyCreationException e) {
            e.printStackTrace();
            logger.error("Can not load ontology model from local file!");
        }
        catch (Exception e) {
            logger.error(e.toString());
        }
        return ontologyModel;
    }

    public IRI resolveOWLEntity(IRI iri, String owlEntity) {
        return iri.resolve("#" + owlEntity);
    }

    public String getOWLEntityName(IRI iri) {
        String fullUrl = iri.toString();
        int splitIndex = fullUrl.indexOf("#");
        if (splitIndex < 0) {
            return iri.getShortForm();
        }
        return fullUrl.substring(splitIndex + 1, fullUrl.length());
    }
}

