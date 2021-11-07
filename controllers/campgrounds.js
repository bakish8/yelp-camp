
const Campground = require('../models/campground');//דרישת המודל של קאמפגראונד מתיקיית המודלים
const { cloudinary } = require('../cloudinary/index')
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')//דרישת מתוך החבילה של ג'יו קודינג כדי שנוכל להשתמש בשיטות שלה
const mapBoxToken = process.env.MAPBOX_TOKEN//משיכת הטוקן מקובץ האי אן וי לתוך משנה
const geocoder = mbxGeocoding({ accessToken: mapBoxToken })//והגדרת חיבור לג'יו קודינג שלנו באמצעות האקסס טוקן שיקבל את הטורן שהעתקנו מהאתר מאפבוקס ומשכנו מהאיאן וי


// All camps routs

module.exports.index = async (req, res) => {//בבקשת גט לכתובת זו
    const campgrounds = await Campground.find({})//תמצא את כל המחנות והכנס אותם ךקבוע
    res.render('campgrounds/campgrounds', { campgrounds });//רנדר את דף קמפגראונדס בתיקיית קמפגראונד בתיקיית וויוז ושלח אליו את המשתנה עם כל המחנות 
}


//new camp routs:
module.exports.newCampForm = async (req, res) => {//מתי שמבקשים עמוד זה שלח לנו פונקציית אייסינק
    res.render('campgrounds/new');//שתרנדר לנו את העמוד  בשם ניו.איג'יאס
}

module.exports.createCamp = async (req, res) => {//בבקשת פוסט לראוט זה 
    // if (!req.body.campground) throw new AppError('INVALID CAMPGROUND INFORMATION!', 400) //אם אין משהו שהתקבל בני בתיבות של הרשמה מוצר חדש זרוק שגיאה באמצעות אפ ארור שהסטאטוס שלה 400 וההודעה שלה מוגדרת 

    const GeoData = await geocoder.forwardGeocode({
        query: req.body.campground.location,
        limit: 1
    }).send()


    const newcamp = new Campground(req.body.campground)////הכנס למשתנה חדש ניו קאמפ את מה שהמשתמש רשם במידול של קאמפגראונד תכניס לדאטה בייס ושמור במשתנה
    newcamp.geometry = GeoData.body.features[0].geometry
    newcamp.images = req.files.map(f => ({ url: f.path, filename: f.filename }))
    newcamp.owner = req.user._id//השורה הזאת מאפשת לנו למשוך את האיידי של היוזר שמחובר למאפיין בעלים שנמצא במחנה החדש ,הוא יציב בו את האיידי של המשתמש שיצר אותו 
    await newcamp.save()//שמור בדאטה בייס
    console.log(newcamp)
    req.flash('success', 'Successfully made a new campground!');
    res.redirect(`/campgrounds/${newcamp._id}`)//שלח אל העמוד של המוצר החדש
}





//show spesific camp rout

module.exports.ShowOneCamp = async (req, res) => {//בבקשת גט לכתובת זו
    const { id } = req.params;//  האיידי במשתנה
    const campground = await Campground.findById(id).populate({//אנחנו עושים פופולייט לבעלים של התגובה ,לתגובה עצמה ולבעלים שיצר את הקטאמפ]
        path: 'reviews',//פופולייט לריוויס
        populate: {//פופולייט לבעלים של הביקורת 
            path: 'owner'//הגדרה שבאמצעותה נוכל לעשות פופולייט לבעלים של התגובה ובנפרד גם פופולייט לבעלים של הקאמפגראונד 
        }

    }).populate('owner')//תמצא בדאטה בייס את האיידי הזה והכנס אותו למשתנ התעשה פופולייט לביקורות שיפסיקו להיות אובייקט איידי והיו אויביקטים מלאים שנוכל להדפיס ולהשתמש בה אנחנו עושים פופולייט בנפרד גם לבעלים של התגובה וגם לבעלים של הרייווויוס
    console.log(campground)

    if (!campground) {//אם אין קאמפגראונד
        req.flash('error', 'Cannot find that campground!');//הודעת פלאש" לא יכול למצא את המחנה הזה
        res.redirect(`/campgrounds`)//שלח אותנו חזרה לאינד'קס המחנות
    }
    res.render('campgrounds/show', { campground });//אחרת אם יש משהו בתוך הקאמפגראונד שננמצא על ידי האיידי הזה רנדרר את דף שואו ושלח אליו את קאמפגראונד
}



//edit routs
module.exports.EditForm = async (req, res) => {//בבקשת גט לכתובת זו 
    const { id } = req.params;//הכמס את האיידי שמשתנה למשתנה
    const campground = await Campground.findById(id)//מצא את משתנה זה לפי האיידי בדאטה בייס והכנס את מוצר זה למשתנה
    if (!campground) {
        req.flash('error', 'Cannot find that campground!');
        res.redirect(`/campgrounds`)
    }

    res.render('campgrounds/edit', { campground })//רנדר את עמוד העריכה ושלח אליו את המוצר עם האיידי המשתנה
}

module.exports.EditAction = async (req, res) => {//בבקשת פוט לכתובת זו
 const GeoData = await geocoder.forwardGeocode({
        query: req.body.campground.location,
        limit: 1
    }).send()


    console.log(req.body);
    const { id } = req.params;// הכנס את האיידי שמשתנה למשתנה בשם איידי
    const camp = await Campground.findByIdAndUpdate(id, { ...req.body.campground });//הוספנו אויט בהתחלה כי זה לוקח זמן למצא ולעדכן ...כדי שלא ימשיך לרוץ הקוד בנתיים,כזכור לנו התנאים של פיינדוואן אנד אפדייט הם:מי אנחנו רוצים לשנות,מה אנחנו רוצים לשנות,והגדרות,הרן ואלידטורס :טרו נותן לזה שהאימותים על העדכון עדיין יעבדו שם יהיה שם ומספר יהיה מספר...לגבי הניו:טרו הוא זה שמחזיר לנו את הערך החדש כבר ולא את הישן
       camp.geometry = GeoData.body.features[0].geometry

 const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }))//הכנס למשתשתנה אריי שיכיל את התמונות שהתקבלו בעלאת הקבצים בדף העריכה ויציב אותפ באריי עם השם שלהם והכתובת שלהם בקווידינארי
    camp.images.push(...imgs)//דחוף לקמאפ שביקשנו לערוך את התוכן של אימג'ס  התמונות שהוספנו בעמוד העריכה,ה 3 נקודות מבטאות את זה שאנחנו מכניסים את התוכן של אימג'ס לאריי שלנו ולא את האריי עצמו כדי שלא יהיה אריי בתוך אריי
    await camp.save()//שומרים את המחנה עם הנתונים החדשים בזכות הרק בודי ועם התממונות החדשות לאחר שדחפנו אותם חאריי התמונות במאפיין אימג'ס

    if (req.body.deletedImages) {//אם יש בקשה למחיקות תמונה אם יש צ'ק בוקסים מסומנים למחיקת תמונה מסוימת  או תמונות מסוימות 
        for (let filename of req.body.deletedImages) {//תרוץ על הצ'ק בוטקסים שסומנו השממות שלהם
            cloudinary.uploader.destroy(filename)//ותמחק אותם מקלאודינרי
        }
        await camp.updateOne({ $pull: { images: { filename: { $in: req.body.deletedImages } } } })//עדכן את המחנה שמצאנו גם לאחר ששמרנו אותו ואם היה צ'קבוקסים מסומנים למחיקה תמחוק את כל התמונות שהשם שלהם הפייל ניים שלהם הוא אחד מהצ'ק בוקסים של התמונות שהערך של הצ'ק בוקסים הוא הפייל ניים של התמונה אז תעדכן את המחנה תוציא ממנו את כל התמונות שהפייל ניים שלהם היה בתוך הרק.בודי.דיליטד אימג'ס שזה בעצם השם של צ'ק בוקס מסומן 
    }

    req.flash('success', 'Successfully updated campground!!!');//הודעת פלאש מתאימה
    res.redirect(`/campgrounds/${camp._id}`)//רנדר לנו את העמוד הזה ,שיציג לנו את המוצר שערכנו עם הערכים החדשים(האיידי נשאר אותו דבר )
}





//delete routs

module.exports.DeleteCamp = async (req, res) => {//בבקשת פוט לכתובת זו
    const { id } = req.params;// הכנס את האיידי שמשתנה למשתנה בשם איידי
    await Campground.findByIdAndDelete(id)
    req.flash('success', 'Successfully deleted campground')
    res.redirect('/campgrounds')//
}

