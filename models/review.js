const mongoose = require('mongoose');//דרישה למנוגוס
const Schema = mongoose.Schema;//הגדרת סקימה 

const ReviewSchema = new Schema({//הגדרת סקימה חדשה
    body: 'string',//כותרת תהייה סטרינג
    raiting: 'number',
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

})

module.exports = mongoose.model('Review', ReviewSchema)//מידול וייצוא