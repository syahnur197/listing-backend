exports.pickRandomElement = (items) => {
  return items[Math.floor(Math.random() * items.length)];
};

exports.getPaginations = (total, current_page, page_size) => {
  const number_of_pages = Math.ceil(total / page_size);
  current_page = parseInt(current_page);
  const next_page = current_page >= number_of_pages ? null : current_page + 1;
  const previous_page = current_page <= 1 ? null : current_page - 1;

  return {
    total,
    page_size,
    number_of_pages,
    current_page,
    next_page,
    previous_page,
  };
};

exports.appendFilter = (query, properties = []) => {
  if (properties.length > 0) {
    for (let i = 0; i < properties.length; i++) {
      const key = properties[i]["key"];
      const value = properties[i]["value"];
      const operator = properties[i]["operator"];
      query = query.where(key, operator, value);
    }
  }

  return query;
};

exports.formatMobileNumber = (mobile_number) => {
  mobile_number = mobile_number.replace(/-/g, "").replace(/\s/g, "");

  if (mobile_number.substr(0, 4) === "+673" && mobile_number.length === 11)
    return mobile_number;

  if (mobile_number.substr(0, 3) === "673" && mobile_number.length === 10)
    return `+${mobile_number}`;

  if (
    ["8", "7"].includes(mobile_number.substr(0, 1)) &&
    mobile_number.length === 7
  )
    return `+673${mobile_number}`;

  throw new Error("Invalid phone number format! Must be Brunei phone number!");
};

exports.districts = ["Brunei & Muara", "Tutong", "Belait", "Temburong"];

exports.categories = ["Sale", "Rent"];

exports.statuses = ["Proposed", "Under Construction", "Ready-Used"];
