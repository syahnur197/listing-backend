const Property = require("../models/property");

exports.getAllProperties = async () => {
  const properties = Property.query().withGraphFetched("property_type");

  return properties;
};

exports.getPropertyById = async (property_id) => {
  const property = Property.query().findById(property_id);

  return property;
};
