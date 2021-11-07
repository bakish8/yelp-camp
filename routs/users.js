

const express = require('express');//דרישת אקסספרס
const router = express.Router();//הדגרת אקספרס.ראוטר במשתנה ראוטר
const catchAsync = require('../util/catchAsync');//דרישת הקאץ אייסינק שתגרום לכך שלא נצטרך לעטוף כל ראוט וראוט בטריי וקאץ'
const passport = require('passport')

const users = require('../controllers/users')

//register
router.route('/register')
    .get(catchAsync(users.Register))//register form page rout
    .post(catchAsync(users.EditNewUser))//edit a new user roys

//LOGIN

router.route('/login')
    .get(catchAsync(users.LoginPage))//login page rout
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.LoginAction)//    login a user rout            הלוקאל: זה האסטרטרגיה יכול להיות לוקאל או פייסבוק או גוגל זה צצורת החיבור

//LOGOUT
router.get('/logout', users.LogOutAction)



module.exports = router;



//לפני הראוטר ראוט
//register
//router.get('/register', catchAsync(users.Register))
//router.post('/register', catchAsync(users.EditNewUser))

//LOGIN
// router.get('/login', catchAsync(users.LoginPage))

//                                     הלוקאל: זה האסטרטרגיה יכול להיות לוקאל או פייסבוק או גוגל זה צצורת החיבור
// router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.LoginAction)



