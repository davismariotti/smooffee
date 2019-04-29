package graphql;

import models.BaseModel;

public class QLEntry {

    private Long id;
    private String status;

    public QLEntry(BaseModel model) {
        this.id = model.getId();
        this.status = BaseModel.statusIntToString(model.getStatus());
    }

    public Long getId() {
        return id;
    }

    public String getStatus() {
        return status;
    }
}
