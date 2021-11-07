const express = require('express');//דרישת אקסספרס
const router = express.Router();//הדגרת אקספרס.ראוטר במשתנה ראוטר
const catchAsync = require('../util/catchAsync');//דרישת הקאץ אייסינק שתגרום לכך שלא נצטרך לעטוף כל ראוט וראוט בטריי וקאץ'
const { isLoggedIn, validateCampground, isOwner } = require('../loginMiddleware');//דרישת המידל וויארים שלנו כדי שנוכל להשתמש בהם 
const campgrounds = require('../controllers/campgrounds')
const { storage } = require('../cloudinary/index')
const multer = require('multer')
const upload = multer({ storage })


router.route('/')
    .get(catchAsync(campgrounds.index))// All camps routs
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCamp))//create a camp routs

// .post(upload.array('image'), (req, res) => {
//     console.log(req.files)
//     res.send(req.body)
// })


router.get('/new', isLoggedIn, catchAsync(campgrounds.newCampForm))//new camp FORM routs:

router.get('/:id/edit', isLoggedIn, isOwner, catchAsync(campgrounds.EditForm))//Edit form rout

router.route('/:id')
    .get(catchAsync(campgrounds.ShowOneCamp))////show spesific camp rout
    .put(isLoggedIn, isOwner, upload.array('image'), validateCampground, catchAsync(campgrounds.EditAction))//Edit a  specific camp settings rout
    .delete(isLoggedIn, isOwner, catchAsync(campgrounds.DeleteCamp))//delete a camp rout

module.exports = router;

//לפני הסידור ברוטאר ראוט
// // All camps routs
// router.get('/', catchAsync(campgrounds.index))
// //new camp routs:
// router.get('/new', isLoggedIn, catchAsync(campgrounds.newCampForm))
// router.post('/', isLoggedIn, validateCampground, catchAsync(campgrounds.createCamp))
// //show spesific camp rout
// router.get('/:id', catchAsync(campgrounds.ShowOneCamp))
// //edit routs
// router.get('/:id/edit', isLoggedIn, isOwner, catchAsync(campgrounds.EditForm))
// router.put('/:id', isLoggedIn, isOwner, validateCampground, catchAsync(campgrounds.EditAction))
// //delete routs
// router.delete('/:id', isLoggedIn, isOwner, catchAsync(campgrounds.DeleteCamp))





