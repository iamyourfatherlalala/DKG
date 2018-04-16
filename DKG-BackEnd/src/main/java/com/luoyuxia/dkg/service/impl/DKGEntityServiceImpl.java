package com.luoyuxia.dkg.service.impl;

import com.luoyuxia.dkg.domain.DKGEntity;
import com.luoyuxia.dkg.domain.DKGEntityProperty;
import com.luoyuxia.dkg.domain.DKGEntityRelation;
import com.luoyuxia.dkg.service.abs.DKGEntityService;
import org.neo4j.driver.v1.Driver;
import org.neo4j.driver.v1.Record;
import org.neo4j.driver.v1.Session;
import org.neo4j.driver.v1.StatementResult;
import org.neo4j.driver.v1.types.Node;
import org.neo4j.driver.v1.types.Relationship;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class DKGEntityServiceImpl implements DKGEntityService{
    @Autowired
    private Driver neo4jDriver;
    @Override
    public List<DKGEntity> getEntityByName(String name) {
        Map<String, String> matchMap = new HashMap<>();
        matchMap.put("name", String.format("\"%s\"", name));
        return new ArrayList<>(getEntityByMatchMap(matchMap, null));
    }

    @Override
    public boolean deleteEntity(String entityName) {
        Map<String, String> matchMap = new HashMap<>();
        matchMap.put("name", String.format("\"%s\"", entityName));
        return deleteEntityByMatchMap(matchMap, null);
    }

    private boolean deleteEntityByMatchMap(Map<String, String> matchMap, String type) {
        String matchSql = constructSQLByMatchMap(matchMap, type, "a");
        String totalSql = "MATCH " + matchSql + "-[r]-[n] DELETE a, r";
        Session session = neo4jDriver.session();
        session.run(totalSql);
        session.close();
        return true;
    }

    @Override
    public List<DKGEntity> getEntityByLabel(String labelName) {
        return new ArrayList<>(getEntityByMatchMap(new HashMap<>(), labelName));
    }

    private String constructSQLByMatchMap(Map<String, String> matchMap, String type, String startNodeSymbol) {
        List<String> sqls = new ArrayList<>();
        matchMap.forEach((key, value) -> sqls.add(String.format("%s: %s", key, value)));
        String matchSql = String.join(",", sqls);
        matchSql = type == null ? String.format("(%s{ %s })",startNodeSymbol, matchSql) :
                String.format("(%s:%s { %s })",startNodeSymbol, type, matchSql);
        return matchSql;
    }
    private Collection<DKGEntity> getEntityByMatchMap(Map<String, String> matchMap, String type) {
        Session session = neo4jDriver.session();
        String matchSql = constructSQLByMatchMap(matchMap, type, "a");
        String singleEntitySQL = "MATCH " + matchSql + " RETURN a";
        StatementResult result = session.run(singleEntitySQL);
        Map<Long, DKGEntity> DKGEntityMap = new HashMap<>();
        while (result.hasNext()) {
            Record record = result.next();
            Node destNode = record.get("a").asNode();
            if (DKGEntityMap.get(destNode.id()) == null) {
                DKGEntity dkgEntity = new DKGEntity();
                dkgEntity.setDkgEntityPropertyList(getAllEntityPropertiesForNode(destNode));
                dkgEntity.setId(destNode.id());
                destNode.labels().forEach(dkgEntity::addLabel);
                DKGEntityMap.put(destNode.id(), dkgEntity);
            }
        }
        String withRelationSQL = "MATCH " +  matchSql + "-[r]-(n)  RETURN a, r, n ";
        result = session.run(withRelationSQL);
        while (result.hasNext()) {
            Record record = result.next();
            Node destNode = record.get("a").asNode();
            Relationship relation = record.get("r").asRelationship();
            Node node = record.get("n").asNode();
            DKGEntityRelation dkgEntityRelation = new DKGEntityRelation(relation.type(), getAllEntityPropertiesForNode(node));
            destNode.labels().forEach(dkgEntityRelation::addLabel);
            DKGEntityMap.get(destNode.id()).addDKGEntityRelation(dkgEntityRelation);
        }
        session.close();
        return DKGEntityMap.values();
    }

    private List<DKGEntityProperty> getAllEntityPropertiesForNode(Node node) {
        List<DKGEntityProperty> dkgEntityProperties = new ArrayList<>();
        node.asMap().forEach((key, value) -> {
            String propertyValue = value.toString();
            DKGEntityProperty dkgEntityProperty = new DKGEntityProperty(key, propertyValue);
            dkgEntityProperties.add(dkgEntityProperty);
        });
        return dkgEntityProperties;
    }

    @Override
    public boolean importEntity(List<DKGEntity> dkgEntityList) {
        return false;
    }
}
