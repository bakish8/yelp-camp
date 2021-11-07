const mongoose = require('mongoose');//דרישה למנוגוס
const Schema = mongoose.Schema;//הגדרת סקימה 

const passportLocalMongoose = require('passport-local-mongoose')//דרישת פאספורט לוקאל מונגוס והכנסתו למשתנה


const UserSchema = new Schema({//הגדרת סקימה חדשה
    email: {//שמנו רק אימייל שם משתמש וססמא נוטספים דרך הפלאגין של פאספלורט לוקאל מונגוס
        type: String,
        required: true,
        unique: true//מבקשים שהאימייל יהיה יחודי
    }
})

UserSchema.plugin(passportLocalMongoose)//השורה הזאת תוסיף לסקימה שלנו
//יוסיף לסקימה שלנו :
//שדה של יוזר ניים
//שדה של ססמא
//יוודא שהשמות משתמש שלנו הוא ייחודיים ולא משוכפלים
//יעניק לנו אפשרות אפילו להשתמש בשיטות מסוימות של פאספורט


module.exports = mongoose.model('User', UserSchema)//מידול וייצוא של המודל