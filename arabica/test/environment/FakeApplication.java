package environment;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.google.gson.Gson;
import org.apache.commons.exec.CommandLine;
import org.apache.commons.exec.DefaultExecutor;
import org.apache.commons.exec.PumpStreamHandler;
import play.Application;
import play.mvc.Http;
import play.mvc.Result;
import play.test.Helpers;
import services.AuthenticationService;
import utilities.ArabicaLogger;
import utilities.QLException;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Stack;

import static org.junit.Assert.*;
import static play.test.Helpers.*;

public class FakeApplication {

    public static Application app;
    public static Stack<String> authToken = new Stack<>();

    public static void start(boolean mockFirebase) {
        AuthenticationService.mock = mockFirebase;

        ArabicaLogger.logger.debug("---------------------");
        ArabicaLogger.logger.debug(String.format("--- Starting %s", Thread.currentThread().getStackTrace()[2].getClassName()));
        ArabicaLogger.logger.debug("---------------------");
        Map<String, Object> conf = new HashMap<>();
        conf.put("db.default.url","jdbc:h2:mem:play;MODE=PostgreSQL;DATABASE_TO_UPPER=FALSE");
        conf.put("db.default.driver", "org.h2.Driver");
        conf.put("play.evolutions.enabled","true");
        conf.put("play.evolutions.autoApply","true");

        app = Helpers.fakeApplication(conf);

        ArabicaLogger.logger.debug("Starting fake application.");
        Helpers.start(app);
    }

    public static void stop() {
        ArabicaLogger.logger.debug("---------------------");
        ArabicaLogger.logger.debug(String.format("--- Ending %s", Thread.currentThread().getStackTrace()[2].getClassName()));
        ArabicaLogger.logger.debug("---------------------");
        Helpers.stop(app);
    }

    public static Result routeRequest(Http.RequestBuilder request) {
        return route(app, request);
    }

    public static Result routeGraphQLRequest(String query, Object... parameters) {
        String requestText = String.format("{ \"query\": \"%s\" }", query);
        Http.RequestBuilder request = new Http.RequestBuilder()
                .method(POST)
                .uri("/graphql")
                .bodyText(String.format(requestText, parameters));
        if (!authToken.empty()) {
                request = request.header("Authorization", String.format("Bearer %s", authToken.peek()));
        }

        return route(app, request);
    }

    public static String exec(String command) throws Exception {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        CommandLine commandline = CommandLine.parse(command);
        DefaultExecutor exec = new DefaultExecutor();
        PumpStreamHandler streamHandler = new PumpStreamHandler(outputStream);
        exec.setStreamHandler(streamHandler);
        exec.execute(commandline);
        return(outputStream.toString());
    }

    public static <T> T graphQLResultToObject(Result result, String path, Class<T> clazz) {
        try {
            String str = contentAsString(result);
            JsonNode node = new ObjectMapper().readValue(contentAsString(result), ObjectNode.class).get("data");
            for (String pathNode : path.split("/")) {
                if (!node.has(pathNode)) {
                    throw new NullPointerException(String.format("Node '%s' not found for path '%s'", pathNode, path));
                }
                node = node.get(pathNode);
            }
            return new Gson().fromJson(node.toString(), clazz);
        } catch (IOException e) {
            e.printStackTrace();
            throw new QLException(e);
        }
    }

    public static void assertErrorMessageEquals(String expected, Result result) {
        try {
            JsonNode node = new ObjectMapper().readValue(contentAsString(result), ObjectNode.class).get("errors");
            assertNotNull(node);
            assertNotNull(node.get(0));
            assertNotNull(node.get(0).get("message"));
            assertEquals(String.format("\"%s\"", expected), node.get(0).get("message").toString());
        } catch (IOException e) {
            fail();
        }
    }

    public static void assertErrorMessageEquals(String expected, Result result, String code) {
        try {
            JsonNode node = new ObjectMapper().readValue(contentAsString(result), ObjectNode.class).get("errors");
            assertNotNull(node);
            assertNotNull(node.get(0));
            assertNotNull(node.get(0).get("message"));
            assertNotNull(node.get(0).get("code"));
            assertEquals(String.format("\"%s\"", code), node.get(0).get("code").toString());
            assertEquals(String.format("\"%s\"", expected), node.get(0).get("message").toString());
        } catch (IOException e) {
            fail();
        }
    }
}
