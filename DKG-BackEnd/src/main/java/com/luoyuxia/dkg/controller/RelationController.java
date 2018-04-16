package com.luoyuxia.dkg.controller;

import com.luoyuxia.dkg.domain.DKGConceptRelation;
import com.luoyuxia.dkg.service.abs.OntologyObjectPropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/relation")
public class RelationController {
    @Value("${separator}")
    private String separator;
    @Value("${ontology.default}")
    private String defaultOntologyName;
    @Autowired
    private OntologyObjectPropertyService ontologyObjectPropertyService;
    @RequestMapping("")
    public ResponseEntity allRelations() {
        List<DKGConceptRelation> dkgConceptRelationList = ontologyObjectPropertyService.getAllObjectProperties(defaultOntologyName);
        return new ResponseEntity<>(dkgConceptRelationList, HttpStatus.OK);
    }
    @RequestMapping(value = "/import", method = RequestMethod.POST)
    public ResponseEntity importRelation(@RequestParam("file") CommonsMultipartFile file) {
        List<DKGConceptRelation> conceptRelations = new ArrayList<>();
        try(BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line;
            while ((line = bufferedReader.readLine())!=null) {
                line = new String(line.getBytes(), "UTF-8");
                String[] words = line.split(this.separator);
                if (words.length >= 3) {
                    DKGConceptRelation conceptRelation = new DKGConceptRelation(words[0], words[1], words[2]);
                    conceptRelations.add(conceptRelation);
                }
            }
        }
        catch (IOException e){
            e.printStackTrace();
        }
        if (ontologyObjectPropertyService.addObjectProperties(defaultOntologyName, conceptRelations)) {
            return new ResponseEntity<>(conceptRelations, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ArrayList<DKGConceptRelation>(), HttpStatus.OK);
        }
    }

    @RequestMapping(value = "/{fromConcept}/{relation}/{toConcept}", method = RequestMethod.DELETE)
    public ResponseEntity deleteRelation(@PathVariable String fromConcept,
                                         @PathVariable String relation,
                                         @PathVariable String toConcept
                                         ) {
        DKGConceptRelation dkgConceptRelation = new DKGConceptRelation(fromConcept, relation, toConcept);
        boolean deleteResult = ontologyObjectPropertyService.deleteObjectProperty(defaultOntologyName, dkgConceptRelation);
        return new ResponseEntity<>(deleteResult, HttpStatus.OK);
    }
    @RequestMapping("/{concept}")
    public ResponseEntity getRelationByConcept(@PathVariable String concept) {
        List<DKGConceptRelation> dkgConceptRelationList =
                ontologyObjectPropertyService.findObjectPropertiesByDomainName(defaultOntologyName, concept);
        return new ResponseEntity<>(dkgConceptRelationList, HttpStatus.OK);
    }
}
