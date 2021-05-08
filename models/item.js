const Model = require("../config/model");

class Item extends Model {
  static get tableName() {
    return "items";
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
          from: "items.user_id",
          to: "users.id",
        },
      },
    };
  }

  isOwnedBy(user_id) {
    return parseInt(this.user_id) === parseInt(user_id);
  }
}

module.exports = Item;
