import com.google.inject.Inject;
import com.google.inject.Singleton;
import play.api.inject.ApplicationLifecycle;
import utilities.ArabicaLogger;
import utilities.Authenticator;

@Singleton
public class OnStartup {
    @Inject
    public OnStartup(ApplicationLifecycle lifecycle) {
        ArabicaLogger.logger.debug("Starting Arabica....");

        Authenticator.setup(lifecycle);
    }
}