package models;

import io.ebean.Model;
import io.ebean.annotation.CreatedTimestamp;
import io.ebean.annotation.NotNull;
import io.ebean.annotation.UpdatedTimestamp;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
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

    public Date getCreatedAt() {
        return createdAt;
    }

    public Date getDeprecatedAt() {
        return deprecatedAt;
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
}
