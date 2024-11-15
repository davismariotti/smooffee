import com.google.inject.Inject;
import com.google.inject.Singleton;
import play.api.inject.ApplicationLifecycle;
import utilities.ArabicaLogger;
import services.AuthenticationService;

@Singleton
public class OnStartup {
    @Inject
    public OnStartup(ApplicationLifecycle lifecycle) {
        ArabicaLogger.logger.debug("Starting Arabica....");

        AuthenticationService.setup(lifecycle);
    }
}