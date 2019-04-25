package models;

import io.ebean.Model;
import io.ebean.annotation.CreatedTimestamp;
import io.ebean.annotation.NotNull;
import io.ebean.annotation.UpdatedTimestamp;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@MappedSuperclass
public class BaseModel extends Model {

    public static final int REFUNDED = -4;
    public static final int NOT_AVAILABLE = -3;
    public static final int DELETED = -2;
    public static final int CANCELLED = -1;
    public static final int UNKNOWN = 0;
    public static final int ACTIVE = 1;
    public static final int IN_PROGRESS = 2;
    public static final int COMPLETED = 3;

    public static final String REFUNDED_STR = "Refunded";
    public static final String NOT_AVAILABLE_STR = "Not Available";
    public static final String DELETED_STR = "Deleted";
    public static final String CANCELLED_STR = "Cancelled";
    public static final String UNKNOWN_STR = "Unknown";
    public static final String ACTIVE_STR = "Active";
    public static final String IN_PROGRESS_STR = "In Progress";
    public static final String COMPLETED_STR = "Completed";

    private static Map<Integer, String> statusMap = new HashMap<Integer, String>() {{
        put(BaseModel.REFUNDED, REFUNDED_STR);
        put(BaseModel.NOT_AVAILABLE, NOT_AVAILABLE_STR);
        put(BaseModel.DELETED, DELETED_STR);
        put(BaseModel.CANCELLED, CANCELLED_STR);
        put(BaseModel.UNKNOWN, UNKNOWN_STR);
        put(BaseModel.ACTIVE, ACTIVE_STR);
        put(BaseModel.IN_PROGRESS, IN_PROGRESS_STR);
        put(BaseModel.COMPLETED, COMPLETED_STR);
    }};

    @Id
    private Long id;

    @CreatedTimestamp
    @Column(updatable = false)
    private Date createdAt;

    private Date deprecatedAt;

    @UpdatedTimestamp
    private Date updatedAt;

    @NotNull
    @Column(columnDefinition = "INTEGER DEFAULT 0")
    private Integer status = 0;

    public Long getId() {
        return id;
    }

    @SuppressWarnings("unchecked")
    public <T extends BaseModel> T setId(Long id) {
        this.id = id;
        return (T) this;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public Date getDeprecatedAt() {
        return deprecatedAt;
    }

    public <T extends BaseModel> T deprecate() {
        this.deprecatedAt = Timestamp.from(Instant.now());
        return this.store();
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Integer getStatus() {
        return status;
    }

    @SuppressWarnings("unchecked")
    public <T extends BaseModel> T setStatus(int status) {
        this.status = status;
        return (T) this;
    }

    @Override
    public boolean equals(Object obj) {
        return (obj instanceof BaseModel && ((BaseModel) obj).getId().equals(this.id));
    }

    @SuppressWarnings("unchecked")
    public <T extends BaseModel> T store() {
        save();
        return (T) this;
    }

    public static String statusIntToString(int status) {
        return statusMap.get(status);
    }

    public static Integer statusStringToInt(String status) {
        switch (status) {
            case REFUNDED_STR:
                return REFUNDED;
            case NOT_AVAILABLE_STR:
                return NOT_AVAILABLE;
            case DELETED_STR:
                return DELETED;
            case CANCELLED_STR:
                return CANCELLED;
            case ACTIVE_STR:
                return ACTIVE;
            case IN_PROGRESS_STR:
                return IN_PROGRESS;
            case COMPLETED_STR:
                return COMPLETED;
            default:
                return UNKNOWN;
        }
    }
}
