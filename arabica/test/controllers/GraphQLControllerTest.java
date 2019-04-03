package controllers;

import environment.FakeApplication;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import play.mvc.Http;
import play.mvc.Result;

import static org.junit.Assert.assertEquals;
import static play.mvc.Http.Status.UNAUTHORIZED;
import static play.mvc.Http.Status.OK;
import static play.test.Helpers.POST;
import static play.test.Helpers.route;

public class GraphQLControllerTest {

    @BeforeClass
    public static void setup() {
        FakeApplication.start(true);
    }

    @AfterClass
    public static void teardown() {
        FakeApplication.stop();
    }

    @Test
    public void testPing() {
        Result result = FakeApplication.routeGraphQLRequest("query { ping }");
        assertEquals(OK, result.status());
    }

    @Test
    public void testNoAuthorization() {
        String requestText = String.format("{ \"query\": \"%s\" }", " query { fake }");
        Http.RequestBuilder request = new Http.RequestBuilder()
                .method(POST)
                .uri("/graphql")
                .bodyText(requestText);
        Result result =  route(FakeApplication.app, request);
        assertEquals(UNAUTHORIZED, result.status());
    }

    @Test
    public void testBearerUndefined() {
        String requestText = String.format("{ \"query\": \"%s\" }", " query { fake }");
        Http.RequestBuilder request = new Http.RequestBuilder()
                .method(POST)
                .uri("/graphql")
                .header("Authorization", "Bearer undefined")
                .bodyText(requestText);
        Result result =  route(FakeApplication.app, request);
        assertEquals(UNAUTHORIZED, result.status());
    }
}
