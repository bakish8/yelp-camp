const express = require('express')//דרישת אקסספרס
const router = express.Router({ mergeParams: true });//הגדרת ראוטר


const { validateReview, isLoggedIn, isReviewOwner } = require('../loginMiddleware');//דרישת המידל וויארים שלנו כדי שנוכל להשתמש בהם 

const catchAsync = require('../util/catchAsync');//דרוש קובץ שהכנסו מהתיקייה 

const reviews = require('../controllers/reviews')//ייבוא של הקונטרולר שיביא את הלוג'יק לראוטרים בקונטרולר יש פעולות שרשמנו עם הלוג'יק הרלוונטי לפעולה של הראוט



//edit a review for a specific campground
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.CreateReview))//בבקשת פוסט לכתובת זו תריץ מידל וויארים שיבאנו מקובץ המידל וויארס לפי הסדר ןאז תפעיל את קאץ אייסינק על הלוג'יק של הפפעולה שנמצתא בקובץ הקונטרולר שיבאנו

//Delete a Review deleting also from the camp.reviews with $pull
router.delete('/:reviewId', isLoggedIn, isReviewOwner, catchAsync(reviews.DeleteReview))

module.exports = router;


