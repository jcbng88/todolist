class TodoService {
  constructor(knex) {
    this.knex = knex;
  }

  async list(user) {
    let todos = await this.knex("todos")
      .select("*")
      .where({ users_id: user.id });
    return todos;
  }

  async add(user, title) {
    let todo = {
      title,
      users_id: user.id,
    };

    let todos = await this.knex.insert(todo).into("todos").returning("*");
    return todos;
  }

  async update(user, title, id) {
    console.log(user, title, id);
    let todo = {
      title,
      users_id: user.id,
    };

    let updated = await this.knex("todos")
      .update(todo)
      .where({ id: id })
      .returning("*");
    return updated;
  }

  async remove(user, id) {
    const deleted = await this.knex("todos")
      .where({ id: id })
      .andWhere({ users_id: user.id })
      .del();
    return deleted;
  }

  async getInfo(user) {
    console.log(user);
    const username = await this.knex("users")
      .select("username")
      .where({ id: user.id });
    console.log(username);
    return username;
  }
}

module.exports = TodoService;
