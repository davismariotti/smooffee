package utilities;

public class QLException extends RuntimeException {
    public QLException(String message) { // TODO error codes?
        super(message);
    }

    public QLException(Throwable e) {
        super(e);
    }
}
