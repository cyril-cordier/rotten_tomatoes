const mongoose = require('mongoose');

const filmSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    title:{
        type:String,
        required:true,
    },
    api_id:{
        type:String,
        required:true,
    }, 
    description:{
        type:String,
        required:true,
    },
    year:{
        type:String,
        required:true,
    },
/*     producer:{
        type:String,
        required:true,
    }, */
    image:{
        type:String,
        required:true,
    },
});

module.exports = mongoose.model('Film',filmSchema);