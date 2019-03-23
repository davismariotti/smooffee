package graphql;

import models.BaseModel;

public class QLEntry {

    private Long id;
    private Integer status;

    public QLEntry(BaseModel model) {
        this.id = model.getId();
        this.status = model.getStatus();
    }

    public Long getId() {
        return id;
    }

    public Integer getStatus() {
        return status;
    }
}
