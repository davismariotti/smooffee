package utilities;

import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;
import com.sun.jersey.api.client.filter.HTTPBasicAuthFilter;
import com.sun.jersey.core.util.MultivaluedMapImpl;
import com.typesafe.config.Config;
import com.typesafe.config.ConfigFactory;

import javax.ws.rs.core.MediaType;

public class MailGunEmailProvider {

    public static ClientResponse sendEmail(String recipient, String recipientEmail, String subject, String body) {
        Config config = ConfigFactory.load();

        Client client = Client.create();
        client.addFilter(new HTTPBasicAuthFilter("api", config.getString("mailgun.api.key")));
        WebResource webResource = client.resource(String.format("https://api.mailgun.net/v3/%s/messages", config.getString("mailgun.api.domain")));
        MultivaluedMapImpl formData = new MultivaluedMapImpl();
        formData.add("from", String.format("%s <%s>", config.getString("mailgun.api.from.name"), config.getString("mailgun.api.from.email")));
        formData.add("to", String.format("%s <%s>", recipient, recipientEmail));
        formData.add("subject", subject);
        formData.add("text", body);
        if (!config.getString("play.environment").equals("production")) formData.add("o:testmode", "true");

        return webResource.type(MediaType.APPLICATION_FORM_URLENCODED).post(ClientResponse.class, formData);
    }
}
