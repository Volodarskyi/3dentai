const {Schema, model, Types} = require('mongoose')

const UserSchema = new Schema({
    firstName: {type: String, required: true},
    secondName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phone: {type: String, unique: false},
    password: {type: String, required: true},
    avatar: {type: String, unique: false},
    role: {type: String, required: true},
    accessTo:[{type: Types.ObjectId, ref:'Question'}]
});

module.exports = model('User', UserSchema)
