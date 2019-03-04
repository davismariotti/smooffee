package utilities;

public class QLException extends RuntimeException {
    public QLException(String message) {
        super(message);
    }

    public QLException(Throwable e) {
        super(e);
    }
}
