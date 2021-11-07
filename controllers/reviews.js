
const Review = require('../models/review')
const Campground = require('../models/campground');

//edit a review for a specific campground
module.exports.CreateReview = async (req, res) => {// בהוספת ביקורת חדשה למחנה ספציפי תבדוק קודם שאין טעויות בעזרת ואלדייט ריוויו שהוגדר למעלה הוא בודק בעזרת הסקימה המיובאת מסיקמס את אובייקא הגוי שמגדיר מה כל דבר צריך להיות  בביקורת למשל שהרייטינג הוא מספר והבודי הגוף של הביקורת הוא סטרינג ושניהם מאפיינים נדרשים,אם אחד מהתנאים שאמרתי לא נכון אז הוואלדייט רייויו יחזיר שגיאה ולא  ימשיך את הפונקציה
    const campground = await Campground.findById(req.params.id);//תמצא את המחנה שיש לו את האיידי הספציפי הזה ותכניס  אותו למשתנה  
    const review = new Review(req.body.review)//תיקח את מה שבגוף הבקשה של ריבייו ותכניס למשתנה תמדל אותו לפי המודל ריוויו שיבאנו למעלה
    review.owner = req.user._id; //בכך אנחנו מכניסים את האיידי של המשתמש המחובר הספציפי עכשיו למאפיין ה"בעלים" של התגובה 
    campground.reviews.push(review)// תדחוף את הריוו את המשתנה החדש הזה ששמרנו לאריי במאפיין ריוויוז בקמאפ הספציפי שמצאנו מקודם לפי האיידי
    await review.save()//חכה ןשמור את הביקורת בדאטה בייס
    await campground.save()//חכה ושמור את המחנה בדאטה בייס שהוא כולל בתוכו את הביקורת החדשה 
    req.flash('success', 'Successfully edit a Review to this camp');
    res.redirect(`/campgrounds/${campground._id}`)//רנדר לנו את העמוד הזה ,שיציג לנו את המוצר שערכנו עם הערכים החדשים(האיידי נשאר אותו דבר )

}

//Delete a Review deleting also from the camp.reviews with $pull
module.exports.DeleteReview = async (req, res) => {//בבקשת מחיקה לכתובת זו -שימו לב שיש שני משתנים אחד לקאמפ ואחד לביקורת
    const { id, reviewId } = req.params//הכנסה לשתנה שהוא אוביקא קבוע את מה שהתקבל בבקשת המחיקה בשני המשתנים המסומנים בנקודתיים
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })//פול זה שיטה לקחת מהאריי משהו ולמחוק אז רשמנו פול את האריי ריוויוס ולפי מה למחוק נקודוותיים לפי מה למחוק ךפי האיידי הספציפי הזה,קודם כל כמובן שאנו מוצאים את התגובה הספציפית שמדובר עליה
    await Review.findByIdAndDelete(reviewId)//תמצא את הריוו באריי הריוויוס לתמחק אותו לפי האיידי ששמרנו
    req.flash('success', 'Successfully Deleted Review!');//הודעת פלאש מתאימה
    res.redirect(`/campgrounds/${id}`);//שלח חזרה למחנה הספציפי שמחקנו ממנו את ההודעה
}