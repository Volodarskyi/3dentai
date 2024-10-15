const {Schema, model, Types} = require('mongoose')

const QuestionSchema = new Schema({
    title: {type: String, required: true, unique: true},
    description: {type: String, required: true, unique: false},
    coverUrl: {type: String, required: false, unique: false},
    author: {type: Types.ObjectId, ref: 'User'},
    type: {type: String, required: true, unique: false},
    created: {type: Date, required: true, unique: true}
});

module.exports = model('Question', QuestionSchema)
