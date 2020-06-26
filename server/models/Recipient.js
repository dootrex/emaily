//a document has a limit of 4mb thats why we only did subdocument collection
//only on survey recepient instead of user. Which would reduce the number of
//survey emails one can send to only around 200000. But by making a recepient
//subcollection nested within a single survey we put that limit only on the number
//of recepients.
const mongoose = require("mongoose");
const { Schema } = mongoose;

const recipientSchema = new Schema({
  email: String,
  responded: { type: Boolean, default: false },
});

//rather than registering this schema with mongoose we are going to export this
//check Survey.js to see how we use it
module.exports = recipientSchema;
