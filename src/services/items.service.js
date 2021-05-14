const Item = require("../models/item");

const page_size = 20;

exports.getAllItems = async (page = null) => {
  if (page === null || page === "0") {
    return await Item.query().withGraphFetched("user");
  } else {
    page -= 1;
    return (await Item.query().withGraphFetched("user").page(page, page_size))
      .results;
  }
};

exports.getItemById = async (item_id) => {
  const item = await Item.query().withGraphFetched("user").findById(item_id);

  return item;
};

exports.findItem = async (property) => {
  const items = await this.findItems(property);

  return items[0];
};

exports.findItems = async (property) => {
  const key = Object.keys(property)[0];
  const value = property[key];

  const items = await Item.query().where(key, value);

  return items;
};

exports.createItem = async (item) => {
  const item_detail = {
    name: item.name,
    price: item.price,
    user_id: item.user_id,
    short_description: item.short_description,
    description: item.description,
  };

  const created_item = await Item.query().insert(item_detail);

  return created_item;
};

exports.updateItem = async (item) => {
  const { id, ...item_detail } = item;

  const updated_item = await Item.query().patch(item_detail).where("id", id);

  if (updated_item) {
    return item;
  }

  return false;
};

exports.deleteItem = async (item_id) => {
  const deleted_item = await Item.query().deleteById(parseInt(item_id));

  return deleted_item > 0;
};
