const {Schema, model, Types} = require('mongoose')

const CardSchema = new Schema({
    questionsBase:{type: Types.ObjectId, ref: 'Question'},
    group:{type: String, required: false, unique: false},
    question:{type: String, required: true, unique: false},
    questionImg: {type: String, required: false, unique: false},
    questionVideo: {type: String, required: false, unique: false},
    answer:{type: String, required: true, unique: false},
    answerImg: {type: String, required: false, unique: false},
    answerVideo: {type: String, required: false, unique: false},
    created: {type: Date, required: true, unique: true},
});

module.exports = model('Card', CardSchema)
