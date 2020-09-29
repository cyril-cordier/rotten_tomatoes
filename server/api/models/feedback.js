const mongoose = require('mongoose');

const feedbackSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    film: { type: mongoose.Schema.Types.ObjectId, ref: 'Film', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rate :{
        type:String,
        required:true
    },
    review :{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Feedback', feedbackSchema);