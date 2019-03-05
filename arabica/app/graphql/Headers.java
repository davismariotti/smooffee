package graphql;

import play.mvc.Action;
import play.mvc.Http;
import play.mvc.Result;

import java.util.concurrent.CompletionStage;

public class Headers extends Action.Simple {

    public CompletionStage<Result> call(final Http.Context ctx) {
        ctx.response().setHeader("Access-Control-Allow-Origin", "*");
        ctx.response().setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, PUT, DELETE, OPTIONS");
        ctx.response().setHeader("Access-Control-Allow-Headers","Origin, Content-Type, Authorization");
        ctx.response().setHeader("Access-Control-Expose-Headers", "X-Version");
        ctx.response().setHeader("X-Version", "1");
        return delegate.call(ctx);
    }
}
