package utilities;

import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;
import com.sun.jersey.api.client.filter.HTTPBasicAuthFilter;
import com.sun.jersey.core.util.MultivaluedMapImpl;
import com.typesafe.config.ConfigFactory;

import javax.ws.rs.core.MediaType;

public class MailGunEmailProvider {

    public static ClientResponse sendEmail(String recipient, String recipientEmail, String subject, String body) {
        Client client = Client.create();
        client.addFilter(new HTTPBasicAuthFilter("api", ConfigFactory.load().getString("mailgun.api.key")));
        WebResource webResource = client.resource("https://api.mailgun.net/v3/sandboxb12e6e6afdb349d89cd3bd6d75888b18.mailgun.org/messages");
        MultivaluedMapImpl formData = new MultivaluedMapImpl();
        formData.add("from", "Davis Mariotti <hello@davismariotti.com>");
        formData.add("to", String.format("%s <%s>", recipient, recipientEmail));
        formData.add("subject", subject);
        formData.add("text", body);
        return webResource.type(MediaType.APPLICATION_FORM_URLENCODED).
                post(ClientResponse.class, formData);
    }
}
