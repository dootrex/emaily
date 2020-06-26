const mongoose = require("mongoose");
const { Schema } = mongoose;
const RecipientSchema = require("./Recipient");

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: "User" }, //sets up a relationship as this is a refernce field
  dateSent: Date,
  lastResponded: Date,
});
//inorder for the model to be initiated we need to import this somewhere, which is index.js
mongoose.model("surveys", surveySchema);
