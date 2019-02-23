package services;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.typesafe.config.ConfigFactory;
import play.api.inject.ApplicationLifecycle;
import utilities.ArabicaLogger;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.concurrent.CompletableFuture;

public class AuthenticationService {

    public static void setup(ApplicationLifecycle lifecycle) {
        try {
            FileInputStream serviceAccount = new FileInputStream(ConfigFactory.load().getString("firebase.conf.location"));

            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .setDatabaseUrl("https://smooffee.firebaseio.com")
                    .build();

            FirebaseApp.initializeApp(options);
        } catch (IOException | IllegalStateException e) {
            ArabicaLogger.logger.error("Error in authenticate - ", e);
        }
        lifecycle.addStopHook(() -> {
            FirebaseApp.getInstance().delete();
            return CompletableFuture.completedFuture(null);
        });
    }

    public static String getUidFromToken(String firebaseAuthToken) throws FirebaseAuthException {
        FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(firebaseAuthToken);

        ArabicaLogger.logger.debug("Decoded uid - {}", decodedToken.getUid());
        return decodedToken.getUid();
    }
}
