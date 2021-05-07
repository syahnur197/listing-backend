const path = require("path");
const rfs = require("rotating-file-stream");

const _date = new Date();
const dd = String(_date.getDate()).padStart(2, "0");
const mm = String(_date.getMonth() + 1).padStart(2, "0");
const yyyy = _date.getFullYear();

const today = `${yyyy}${mm}${dd}`;

const log_file = `${today}_app.log`;

exports.accessLogStream = rfs.createStream(log_file, {
  interval: "1d",
  path: path.join(__dirname, "../storage/logs"),
});
