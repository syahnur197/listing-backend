const Model = require("../../config/model");
const Property = require("./property");

class PropertyType extends Model {
  static get tableName() {
    return "property_types";
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
          from: "property_types.id",
          to: "properties.property_type_id",
        },
      },
    };
  }
}

module.exports = PropertyType;
