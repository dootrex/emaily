const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  facebookId: String,
  userName: String,
  credits: { type: Number, default: 0 },
});
//when there are two arguements that means we are trying to load
//something, one arguement means we are trying to fetch something
mongoose.model("users", userSchema);
//we dont export anything because all we are doing is creating a model
//we can use this model and make new instances by connecting mongoose
