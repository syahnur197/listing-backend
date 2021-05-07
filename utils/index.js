exports.pickRandomElement = (items) => {
  return items[Math.floor(Math.random() * items.length)];
};

exports.districts = ["Brunei & Muara", "Tutong", "Belait", "Temburong"];

exports.categories = ["Sale", "Rent"];

exports.statuses = ["Proposed", "Under Construction", "Ready-Used"];
