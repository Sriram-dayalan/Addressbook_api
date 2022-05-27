const { strikethrough } = require('colors');
const { type } = require(`express/lib/response`);
const mongoose = require('mongoose');

const contactschema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        required: true
    },
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },organization:{
        type: String,
    },
    email:{
        type: String
    },
    phoneNO:{
        type: String,
        required: true
    },
    address:{
        Aprtname:{ type: String},
        street:{ type: String},
        city:{ type: String},
        state:{ type: String},
        country:{ type: String},
        postalcode:{type:String}
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Contact',contactschema);
