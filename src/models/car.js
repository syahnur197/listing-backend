const Model = require("../../config/model");

class Car extends Model {
  static get tableName() {
    return "cars";
  }

  static get idColumn() {
    return "id";
  }

  static get relationMappings() {
    const User = require("./user");

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "cars.user_id",
          to: "users.id",
        },
      },
    };
  }

  isOwnedBy(user_id) {
    return parseInt(this.user_id) === parseInt(user_id);
  }
}

module.exports = Car;
