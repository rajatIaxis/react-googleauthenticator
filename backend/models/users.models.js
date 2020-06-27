const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{ type:String, required:true, unique:true },
    secret:{ type:String, required:true },
}, {
    timestamps:true
});

const Users = mongoose.model('Users', userSchema);
module.exports = Users;

