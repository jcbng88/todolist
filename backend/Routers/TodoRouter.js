class TodoRouter {
  constructor(todoService, authClass, express) {
    this.todoService = todoService;
    this.authClass = authClass;
    this.express = express;
  }

  router() {
    let router = this.express.Router();

    router.get("/todos", this.authClass.authenticate(), this.list.bind(this));
    router.post("/todos", this.authClass.authenticate(), this.add.bind(this));
    router.put("/todos", this.authClass.authenticate(), this.update.bind(this));
    router.delete(
      "/todos/:id",
      this.authClass.authenticate(),
      this.remove.bind(this)
    );
    router.get("/info", this.authClass.authenticate(), this.getInfo.bind(this));

    return router;
  }

  list(req, res) {
    return this.todoService.list(req.user[0]).then((todos) => res.send(todos));
  }

  add(req, res) {
    return this.todoService
      .add(req.user[0], req.body.title)
      .then((todo) => res.send(todo[0]));
  }

  update(req, res) {
    return this.todoService
      .update(req.user[0], req.body.title, req.body.id)
      .then((todo) => res.send(JSON.stringify(todo)));
  }

  remove(req, res) {
    return this.todoService
      .remove(req.user[0], req.params.id)
      .then(() => res.send(req.params.id));
  }

  getInfo(req, res) {
    return this.todoService
      .getInfo(req.user[0])
      .then((profile) => res.send(profile));
  }
}

module.exports = TodoRouter;
