package services;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.typesafe.config.ConfigFactory;
import play.api.inject.ApplicationLifecycle;
import utilities.ArabicaLogger;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

public class AuthenticationService {

    public static boolean mock = false;
    public static Map<String, String> mockMap = new HashMap<>();

    public static void setup(ApplicationLifecycle lifecycle) {
        if (!mock) {
            try {
                InputStream is = Thread.currentThread()
                        .getContextClassLoader()
                        .getResourceAsStream(
                                ConfigFactory.load().getString("firebase.conf.location")
                        );

                FirebaseOptions options = new FirebaseOptions.Builder()
                        .setCredentials(GoogleCredentials.fromStream(is))
                        .setDatabaseUrl("https://smooffee.firebaseio.com")
                        .build();

                FirebaseApp.initializeApp(options);
            } catch (IOException | IllegalStateException e) {
                ArabicaLogger.logger.error("Error in authenticate - ", e);
            }
            lifecycle.addStopHook(() -> {
                if (FirebaseApp.getInstance() != null) {
                    FirebaseApp.getInstance().delete();
                }
                return CompletableFuture.completedFuture(null);
            });
        }
    }

    public static String getUidFromToken(String firebaseAuthToken) throws FirebaseAuthException {
        if (!mock) {
            return FirebaseAuth.getInstance().verifyIdToken(firebaseAuthToken).getUid();
        } else {
            if (mockMap.containsKey(firebaseAuthToken)) return mockMap.get(firebaseAuthToken);
            else throw new FirebaseAuthException("MOCKMAPDOESNOTCONTAIN", "Firebase mock map does not contain token");
        }
    }
}
