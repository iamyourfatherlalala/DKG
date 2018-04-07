import org.neo4j.driver.v1.*;
import org.neo4j.driver.v1.types.Node;
import org.neo4j.driver.v1.types.Relationship;

public class Neo4jTest {
    public static void main(String[] args) {
        String url = "bolt://neo4j:7474@localhost";
        Driver neo4jDriver = GraphDatabase.driver(url, AuthTokens.basic("neo4j", "luoyuxia1997"));
        Session session = neo4jDriver.session();
        StatementResult result = session.run( "MATCH (a:Person {name: \"Jack Nicholson\", born: 1937 })-[r]-(n)  RETURN a, r, n" );
    //    StatementResult result = session.run( "MATCH (a)-[r]-(n) where a.name = 'Jack Nicholson' and a.born = 1937  RETURN a, r, n" );
        while ( result.hasNext() )
        {
            Record record = result.next();
            Node destNode = record.get("a").asNode();
            Relationship relationship = record.get("r").asRelationship();
            Node node = record.get("n").asNode();
            System.out.println( record.get("r").asRelationship());
            System.out.println( record.get("n").asNode().toString());
        }
        session.close();
    }
}
