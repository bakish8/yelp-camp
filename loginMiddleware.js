const { campgroundSchema, reviewSchema } = require('./schemas.js');//דרישת הסקימה של המחנות ושל ריוויוס
const AppError = require('./util/AppError')//דרישה של אפ ארור מתיקיית יוטיל כדי לזרוק הודעות שגיאה במידה ויש
const Campground = require('./models/campground');//דרישת המודל של קאמפגראונד מתיקיית המודלים
const Review = require('./models/review');//דרישת המודל של קאמפגראונד מתיקיית המודלים



//מידל וויאר בבשם "איז לוגדאין" שכאשר נציג אותו לפני ראוט מסוים יבדוק אם אנחנו אוטינטיקייטד,אם אנחנו מחוברים
//!req.isAuthenticated)( )זה שיטה  שבודקאת אם אנחנו מחוברים  ,אז אם אנחנו לא מחוברים
//אם אנחנו לאמחוברים אז תשמור מאיפה שבאנו מאיפה שביקשנו לבא באתר 
//תציב הודעת פלאש מתאימה
//תחזיכר אותנו לדף ההתחברות 
//אם אנחנו כן מחוברים תמשיך האלה
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {//אם המשתמש לא מחובר
        req.session.returnTo = req.originalUrl  //הכנס לסשן שלנו את הדרך המקורית של הכתובת שבה המשתמש ניסה להיכנס בהתחלה ,אם הוא ניסה להיכנס לדף לא מורשה והועבר לדף הלוגאין אז תשמור את הכתובת של הדף הלא מורשה הזה במאפיין שנקרא ריטורן טווו ששמור בסשן
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}
//נשים את המידל וויאר הזה בכל מקום שאנחנו צריכים שהמשתמש יהיה מחובר 

//JOI server side validation with campgroundSchema
module.exports.validateCampground = (req, res, next) => {//הקמת מידל וויר שכאשר נקרא לו 
    const { error } = campgroundSchema.validate(req.body);//יכניס למשתנה שגיאה  במידה ויש לפי בדיקה של הרק בודי המתקבל מהכנסת קאמפ חדש אל מול הסקימה המיובאת קאמפגראונדסקימה שהוא אובייקא ג'וי שמוודא מה כל דבר צריך להיות
    if (error) {//במידה ומשהו נכנס לארור
        const msg = error.details.map(el => el.message).join(',')//הכנסה למשתנה מסג' את פרטי השגיאה עם פסיקים בן לבין
        throw new AppError(msg, 400)//זרוק באמצעות אפ ארור שגיאה 400 ואת תוכן הודעת השגיאה
    } else {//אחרת ,אם אין שגיאות תמשיך הלאה
        next();
    }
}

//מידל וויאר שכאשר נקרא לו יוודא שהמשתמש המחובר הוא בעל המחנה ,אם הוא בעל המחנה ימשיך הלאה לפעולה המתבקשת אם הוא לא בעל המחנה יקבל הודעת פלאש מתאימה וייועבר לקאמפגראונד אותו רצה לערוך 
module.exports.isOwner = async (req, res, next) => {//הקמת מידל וויר שכאשר נקרא לו 
    const { id } = req.params;// הכנס את האיידי שמשתנה למשתנה בשם איידי
    const campground = await Campground.findById(id)//מצא את משתנה זה לפי האיידי בדאטה בייס והכנס את מוצר זה למשתנה
    if (!campground.owner.equals(req.user._id)) { //אם האיידי של המשתמש שממחובר לא שווה לאיידי של מי שיצר את הקמאפ גראונד בבקשה זו AUTORZIATION
        req.flash('error', 'Ooops...No premission to do that!!!!');//התגה של הודעת פלאש מתאימה
        return res.redirect(`/campgrounds/${campground._id}`)//רנדר לנו את העמוד הזה ,שיציג לנו את המוצר שערכנו עם הערכים החדשים(האיידי נשאר אותו דבר )
    }
    next()
}


module.exports.isReviewOwner = async (req, res, next) => {//הקמת מידל וויר שכאשר נקרא לו 
    const { id, reviewId } = req.params;// הכנס את האיידי שמשתנה למשתנה בשם איידי
    const review = await Review.findById(reviewId)//מצא את משתנה זה לפי האיידי בדאטה בייס והכנס את מוצר זה למשתנה
    if (!review.owner.equals(req.user._id)) { //אם האיידי של המשתמש שממחובר לא שווה לאיידי של מי שיצר את הקמאפ גראונד בבקשה זו AUTORZIATION
        req.flash('error', 'Ooops...No premission to do that!!!!');//התגה של הודעת פלאש מתאימה
        return res.redirect(`/campgrounds/${id}`)//רנדר לנו את העמוד הזה ,שיציג לנו את המוצר שערכנו עם הערכים החדשים(האיידי נשאר אותו דבר )
    }
    next()
}



//JOI server side validation with reviewschema
module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new AppError(msg, 400)
    } else {
        next();
    }
}
