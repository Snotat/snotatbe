
const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            trim: true
        },
        tel: {
          type:String
        },
        text: {
            type: String,
            requires: true,
            trim: true
        },
     

    }, {
        timestamps: true,
        minimize: false
}
);

module.exports = mongoose.models.User || mongoose.model('User', userSchema)
