package services.authorization;

public class AuthorizationContext {

    private Long organizationId;
    private String firebaseUid;

    public AuthorizationContext(Long organizationId, String firebaseUid) {
        this.organizationId = organizationId;
        this.firebaseUid = firebaseUid;
    }

    public AuthorizationContext(Long organizationId) {
        this.organizationId = organizationId;
    }

    public AuthorizationContext(String firebaseUid) {
        this.firebaseUid = firebaseUid;
    }

    public Long getOrganizationId() {
        return organizationId;
    }

    public String getFirebaseUid() {
        return firebaseUid;
    }
}
