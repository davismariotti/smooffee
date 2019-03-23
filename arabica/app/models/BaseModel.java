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

@MappedSuperclass
public class BaseModel extends Model {

    public static final int REFUNDED = -4;
    public static final int NOT_AVAILABLE = -3;
    public static final int DELETED = -2;
    public static final int CANCELLED = -1;
    public static final int ACTIVE = 1;
    public static final int IN_PROGRESS = 2;
    public static final int COMPLETED = 3;

    @Id
    private Long id;

    @CreatedTimestamp
    @Column(updatable=false)
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
        return (T)this;
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

    public int getStatus() {
        return status;
    }

    @SuppressWarnings("unchecked")
    public <T extends BaseModel> T setStatus(int status) {
        this.status = status;
        return (T)this;
    }

    @Override
    public boolean equals(Object obj) {
        return (obj instanceof BaseModel && ((BaseModel) obj).getId().equals(this.id));
    }

    @SuppressWarnings("unchecked")
    public <T extends BaseModel> T store() {
        save();
        return (T)this;
    }
}
