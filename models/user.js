const Model = require("../config/model");
const { hashPassword } = require("../services/hasher.service");
const Item = require("./item");
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
      properties: {
        relation: Model.HasManyRelation,
        modelClass: Item,
        join: {
          from: "users.id",
          to: "items.user_id",
        },
      },
    };
  }

  async $beforeInsert(queryContext) {
    await super.$beforeInsert(queryContext);
    this.password = await hashPassword(this.password);
  }

  $formatJson(jsonRaw) {
    // Remember to call the super class's implementation.
    const { password, refresh_token, ...json } = super.$formatJson(jsonRaw);
    // Do your conversion here.
    return json;
  }
}

module.exports = User;
