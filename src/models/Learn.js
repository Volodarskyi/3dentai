const {Schema, model, Types} = require('mongoose')

const LearnSchema = new Schema({
    userId: {type: Types.ObjectId, ref: 'User'},
    baseId: {type: Types.ObjectId, ref: 'Question'},
    knowIds: [{type: Types.ObjectId, ref:'Card'}],
    repeatIds: [{type: Types.ObjectId, ref:'Card'}],
    license:{type: String, required: false},
});

module.exports = model('Learn', LearnSchema)
