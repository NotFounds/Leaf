var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const dbUrl = "mongodb://localhost/leaf";
mongoose.connect(dbUrl);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'mongo: Connection Error'));
db.on('connected', () => {
    console.log('mongoose URI locates ' + dbUrl);
});

var messagesSchema = new Schema({
  text: String
});
mongoose.model('messages', messagesSchema);
const Messages = mongoose.model('messages');

module.exports = { Messages: Messages };
