const Model = require("../config/model");
const User = require("./user");

class Property extends Model {
  static get tableName() {
    return "properties";
  }

  static get idColumn() {
    return "id";
  }

  static get relationMappings() {
    return {
      owner: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "properties.user_id",
          to: "users.id",
        },
      },
    };
  }
}

module.exports = Property;
