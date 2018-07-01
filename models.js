var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const dbUrl = "mongodb://localhost/leaf";
mongoose.connect(dbUrl);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'mongo: Connection Error'));
db.on('connected', () => {
    console.log('mongoose URI locates ' + dbUrl);
});

var questionSchema = new Schema({
  title: String,
  type: String,
  required: Boolean,
  description: String,
  items: [String],
  id: String
});
var enqueteSchema = new Schema({
  title: String,
  key: String,
  questions: [questionSchema]
});
mongoose.model('enquete', enqueteSchema);
const Enquete = mongoose.model('enquete');

var answerSchema = new Schema({
  meta: {
    key: String,
    uid: String
  },
  answers: [
    {
      id: String,
      value: String
    }
  ]
});
mongoose.model('answer', answerSchema);
const Answer = mongoose.model('answer');

module.exports = { Enquete: Enquete, Answer: Answer };
