package utilities;

import com.stripe.exception.StripeException;

public class QLException extends RuntimeException {

    private String code;

    public QLException(String message, String code) {
        super(message);
        this.code = code;
    }

    public QLException(Throwable e) {
        super(e);
    }

    public QLException(String message) {
        super(message);
    }

    // Convert Stripe exception to QLException
    public QLException(StripeException e) {
        this(null, e.getCode());
        this.code = e.getCode();
    }

    public String getCode() {
        return code;
    }
}
