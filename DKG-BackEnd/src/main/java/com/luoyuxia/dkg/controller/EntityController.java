package com.luoyuxia.dkg.controller;

import com.luoyuxia.dkg.domain.DKGEntity;
import com.luoyuxia.dkg.service.abs.DKGEntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/entity")
public class EntityController {
    @Autowired
    private DKGEntityService dkgEntityService;
    @RequestMapping("/queryByName/{name}")
    public ResponseEntity queryEntityByName(@PathVariable String name) {
        List<DKGEntity> dkgEntities = dkgEntityService.getEntityByName(name);
        return new ResponseEntity<>(dkgEntities, HttpStatus.OK);
    }
    @RequestMapping("/queryByConcept/{name}")
    public ResponseEntity queryEntityByConceptName(@PathVariable String name) {
        List<DKGEntity> dkgEntities = dkgEntityService.getEntityByLabel(name);
        return new ResponseEntity<>(dkgEntities, HttpStatus.OK);
    }
    @RequestMapping(value = "/{entityName}", method = RequestMethod.DELETE)
    public ResponseEntity deleteEntity(@PathVariable String entityName) {
        return new ResponseEntity<>(dkgEntityService.deleteEntity(entityName), HttpStatus.OK);
    }
    @RequestMapping(value = "/import", method = RequestMethod.POST)
    public ResponseEntity importEntity(@RequestParam("file") MultipartFile file) {
        return new ResponseEntity<>("OK", HttpStatus.OK);
    }
}
