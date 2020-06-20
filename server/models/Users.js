const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    googleId: String,
    facebookId: String
});
//when there are two arguements that means we are trying to load
//something, one arguement means we are trying to fetch something
mongoose.model('users', userSchema);