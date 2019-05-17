package graphql;

import models.BaseModel;

import java.text.SimpleDateFormat;

public class QLEntry {

    private Long id;
    private String status;
    private String createdAt;

    public QLEntry(BaseModel model) {
        this.id = model.getId();
        this.status = BaseModel.statusIntToString(model.getStatus());
        this.createdAt = new SimpleDateFormat("h:mm a M-d-yyyy").format(model.getCreatedAt());
    }

    public Long getId() {
        return id;
    }

    public String getStatus() {
        return status;
    }

    public String getCreatedAt() {
        return createdAt;
    }
}
