package models;

import io.ebean.Model;
import io.ebean.annotation.CreatedTimestamp;
import io.ebean.annotation.NotNull;
import io.ebean.annotation.UpdatedTimestamp;
import org.joda.time.DateTime;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.Date;

@MappedSuperclass
public class BaseModel extends Model {

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

    public void setId(Long id) {
        this.id = id;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public Date getDeprecatedAt() {
        return deprecatedAt;
    }

    public void deprecate() {
        this.deprecatedAt = Timestamp.from(Instant.now());
        this.save();
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

    public void setStatus(Integer status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object obj) {
        return (obj instanceof BaseModel && ((BaseModel) obj).getId().equals(this.id));
    }
}
