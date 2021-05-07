const Model = require("../config/model");
const { hashPassword } = require("../services/hasher");
const Property = require("./property");

class User extends Model {
  static get tableName() {
    return "users";
  }

  static get idColumn() {
    return "id";
  }

  static get relationMappings() {
    return {
      properties: {
        relation: Model.HasManyRelation,
        modelClass: Property,
        join: {
          from: "users.id",
          to: "properties.user_id",
        },
      },
    };
  }

  async $beforeInsert(queryContext) {
    await super.$beforeInsert(queryContext);
    this.password = await hashPassword(this.password);
  }
}

module.exports = User;
