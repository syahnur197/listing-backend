const Model = require("../config/model");
const PropertyType = require("./propery-type");
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
      property_type: {
        relation: Model.BelongsToOneRelation,
        modelClass: PropertyType,
        join: {
          from: "properties.property_type_id",
          to: "property_types.id",
        },
      },
    };
  }
}

module.exports = Property;
