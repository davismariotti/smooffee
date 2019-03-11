package controllers;

import environment.FakeApplication;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import play.mvc.Http;
import play.mvc.Result;

import static org.junit.Assert.assertEquals;
import static play.mvc.Http.Status.OK;
import static play.test.Helpers.GET;

public class HomeControllerTest {

    @BeforeClass
    public static void setup() {
        FakeApplication.start(true);
    }

    @Test
    public void testIndex() {
        Http.RequestBuilder request = new Http.RequestBuilder()
                .method(GET)
                .uri("/");

        Result result = FakeApplication.routeRequest(request);
        assertEquals(OK, result.status());
    }

    @AfterClass
    public static void teardown() {
        FakeApplication.stop();
    }

}
