if (process.env.Node_ENV !== 'production') {//אם אנחנו לא במצב שהאפליקצה בדיפלוייד
    require('dotenv').config()//תדרוש את דוט אינוי שהתקנו שמאפשר למשוך משתנים שונים מפרוסס.אי אן וי.ואז אחרי הנקודה את הקי ששמרנו 
}
// console.log(process.env.CLOUDINAY_CLOUD_NAME)//ידפיס מהאן וי הקובץ המוסתר את הנותונים
// console.log(process.env.CLOUDINAY_KEY)
// console.log(process.env.CLOUDINAY_SECRET)



const express = require('express')//דרישת אקסספרס
const path = require('path') //דרישת פאט' שמביא את הדרך לקובץ זו שיטה של אקספרס שיש לדרוש כדי לרשום את השורה הבאה
const mongoose = require('mongoose');// הגדרת מונגוס
const ejsMate = require('ejs-mate')//דרישה של אי ג'י אס מייט שמאפשר לנו רינדור של אותו עיצוב לכמה עמודים הזרקת עיצוב
const AppError = require('./util/AppError')//דרוש קובץ שהכנסו מהתיקייה
const methodOverride = require('method-override')//לאחר שהתקנו מטוד אוברייד באן פי אם אינסטל מטוד אוברייד נגדיר אותו ונדרוש אותו בקובץ הראשי כדי שנוכל לשלח בקשות פוט או דיליט בצורת פוסט

const passport = require('passport')
const Localpassport = require('passport-local')

const User = require('./models/user');//דרישת המודל של יוזר מתיקיית המודלים


const session = require('express-session');//דרישת סשן
const flash = require('connect-flash');//דרישת פלאש


const mongoSanitize = require('express-mongo-sanitize');//דרישת האבטחה לדאטה בייס שלנו 
const helmet =require('helmet')//התקנת אבטחה
//const dbURL=process.env.DB_URL//מצב דיפלויי הגדרה של משתנה שיקבל את הגישה למונגו דיבי 
const campgroundsRout = require('./routs/campgrounds');//הדגרת חיבוק ודרישת הראוטים של קאמפגראונד
const reviewsRout = require('./routs/reviews');//דרישה וחיבור לראוטים של ריוויוס
const usersRout = require('./routs/users');//דרישה וחיבור לראוטים של ריוויוס







//****install mongoose settings*** */
main().catch(err => console.log(err)); //הדפס את הטעות שהתקבלה אם אין חיבור
async function main() { //פונקציית חיבור
   await mongoose.connect('mongodb://localhost:27017/yelp-camp', {
        useNewUrlParser: true, useUnifiedTopology: true, useUnifiedTopology: true
    }); // התחבר לקולקשיין ילפ קמפ
    console.log("mongoose CONNECTION OPEN!!!"); //הדפס התחבר בהצלחה
}

   // await mongoose.connect('mongodb://localhost:27017/yelp-camp', {
   // await mongoose.connect(dbURL, {


const app = express() //קיבוע אקספרס במשתנה
app.engine('ejs', ejsMate)//מאפשר לנו להזריק עיצוב אחד למספר דפים בעזרת הבודי של בויילרפלייט בלייאטוס
app.set('view engine', 'ejs') //הגדרת איג'י אס לקליטת קבצי איג'י אס
app.set('views', path.join(__dirname, '/views')) // מתיקיית וויוז(מיקום אבסולוטי)

app.use(express.urlencoded({ extended: true })) // העתקנו שורה זו מאקספרסג'יאס.קום כדי שנוכל לקבל את מה שהמשתמש רושם בבודי בתור רק.בודי
app.use(methodOverride('_method'))//המשך הגדרת השיטה
app.use(express.static(path.join(__dirname, 'public'))) //כל פעולה שתעשה תן את המיקום לתיקיה פאבליק בשביל הסיאסאס
app.use(mongoSanitize({
    replaceWith: '_'
}))



const secret ='thisshouldbeabettersecret!';





//****install Session  settings and app.use(session)with thit settings*** */ייצור עבורנו קונקט אס אידי בכל פניה שהוא יהיה קוקי עבור משתמש מסוים היא תשמר בזיכרון למשך שבוע ותפוג תוקפה בעוד שבוע מרגע שתיווצר.

const sessionConfig = {//הגדרות הסשן
    name: 'session',
    secret,
    resave: false,//הגדרה שצריך לרשום
    saveUninitialized: true,

    cookie: {
        httpOnly: true,//משהו של אבטחה שרצוי להוסיף
       //secure:true,   //בדיפלויי אנחנו נוריד את הסוגריים האפורום זה מה שעוזר לכל סשן להיות ייחודי לכל משתמש במציאות 
 expires: Date.now() + 1000 * 60 * 60 * 24 * 7,//הגדרה של הקוקי שיפוג תוקפו בעעוד שבוע מעכשיו
        maxAge: 1000 * 60 * 60 * 24 * 7//הגיל המקסימלי של הקוקי יהיה שבוע מעכשיו.עשינו את זה כדי שלא ישאר במחשב של המשתמש לעד.
    }
}
app.use(session(sessionConfig))//שימוש בהגדרות של הסשן שהגדנו בכלשימוש תיצור קוקי מיוחד שמכיל את הגדרות אלה.
app.use(flash());//שימוש בפלאש


const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    "https://api.mapbox.com/",
    "https://api.tiles.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
];
const connectSrcUrls = [
    "https://api.mapbox.com/",
    "https://a.tiles.mapbox.com/",
    "https://b.tiles.mapbox.com/",
    "https://events.mapbox.com/",
];
const fontSrcUrls = [];

app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/bakish8/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT! 
                "https://images.unsplash.com/",
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);










//passport settings
app.use(passport.initialize())//initialize-שיטה של פאספורט חייב להגדיר את זה אחרי השימוש בסשן
app.use(passport.session())//גם זה הגדרה של פאספורט שחייב להגדיר אחרי השימוש הראשוןבסשן
passport.use(new Localpassport(User.authenticate()))//עוד הגדרה שחייב לציים שים לב הסוגריים בתוך הסוגריים מופיע מודל היוזר שלנו  בסורגיים הרגילות המשתנה שקיבל את לוקאל פאספורט שאותו התקנו והשיטה היא יוז על פאספורט על היוזר אנחנו עושי אוטינטיקייט שהיא גם שיטה של פאספורט שתעזור לנו 

passport.serializeUser(User.serializeUser())//שורה זאת תגדי איך להכניס יוזר לדאטה בייס
passport.deserializeUser(User.deserializeUser())//שורה זאת תגדיר איך להסיר יוזר מהדאטה ביס


//בכל דב שתעשה אפ יוז
//flash response and locals configreation Middleware
app.use((req, res, next) => {//מידל וויאר שהוקם לפני השימוש בראוטים שיתפוס את הבקשות של פלאש עם סקסס או עם ארור וישמור אותם בלוקאלס במשתנים קבועים  
res.locals.cuurentUser = req.user;//השורה הזאת תופסת את המשתמש מהבקשה אם הוא מחובר את פרטי המשתמש האימיייל ושם המשתמש ושמהאותו בלואקלס בקבוע כדי שנוכל להציג או להחביא בנאב באר את הלוג אין שאנחנו מחוברים גם משהו אפשר לעשות בזכות פאספורט
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

// //fake user creation rout
// app.get('/fakeuser', async (req, res) => { //בבקשת גט לראוט זה
//     const user1 = new User({ email: 'omrihage11ver123@gmail.com', username: '11omri_G' }) //הכנסה למשתנה יוזניים1 יוזר חדש שייבנה על פי המודל שייבאנו =נעביר רק אימייל על פי המודל ושם משתמש .....את הססמא נעביר בשורה הבאה
//     const newUser = await User.register(user1, 'password123456')//הסיבה שאנחנו מכניסים את הססמא בשורה הזאת היא כי אנחנו משתמשים בשיטה ראג'יסטר שקיימת עכשייו בזכות שהתקנו את פאספורט לוקאלס אז אנחהנו מכניסים למשתנה ששנקרא ניו יוזר  את ההרשמה של ,ואנחנו מעבירים את המשתנה שמכיל את השם משתמש ואת האימייל על פי המודל ואז את הססמא שלנו,הססמא תקבל סולט וה"האשד" אוטומית ותודפס אחרי זה
//     res.send(newUser)//ההעמוד יגיב עם המשתמש החדש שיצרמו עם הססמא שהיא בגרסאת "האשד" וסולט הססמא נשמרה מאובטחת 
// })




//routs use
app.use('/campgrounds', campgroundsRout)//בדרישה לכתובת זו צרף את הראטור שנדרש קאמפגראונד שיעשה לנו קישור לראוטים למה שמתחיל ב/קאמפגראונד
app.use('/campgrounds/:id/reviews', reviewsRout)//תעשה קישור לראוטים של וויוז למה שמתחיל עם /קאמפגראונדס/:איידי/ריוויוז
app.use('', usersRout)//תעשה קישור לראוטים של וויוז למה שמתחיל עם /קאמפגראונדס/:איידי/ריוויוז



//routs
/*********** */
//HOme rout
app.get('/', (req, res) => {
    res.render('home');
})

app.all('*', (req, res, next) => {// לכל בקשה אפשרית שלא הייתה אחת מאלה רנדר עם אפ ארור שגיאה וסאטוס שאנחנו בחרנו 
    next(new AppError('Page Not Found', 404))
})

//ERROR HANDLER ROUT
app.use((err, req, res, next) => {// מכניסים למשתנה אובייקט את הארור,אם לארור הוגדרו כבר סטאטוס והודעה כמו בשגיאות למעלה אז האובייקט הקבוע מן הסתם ישנה את הטאטוס ואת ההודעה למה שהשגיאה שהתקבלה עצמה נתנה,אם השגיאה לא הוגדרה לא נכתבה למעלה אז השורה למטה בצבע ירוק זוהר זה יהיה ברירת המחדל שתישלח
    const { status = 500 } = err//הכנס באובייקא קבוע  את הגדרות ברירת המחדל לשגיאה שהסטאטוס יהיה שווה ל500 והתגובה תהיה שמשהו השתבש  וכל זה יהיה שווה לשגיאה עצמה הגדרת ברירת מחדל לשגיאה ,עשינו זאת כדי להכיל שגיאות שלא הגדרנו כבר כמו שגיאה 401 לא נמצא שהגדרנו ושגיאת אדמין או שגיאת מנהל שהגדרנו,אם נריץ את ראוט ציקנס אז נראה את שגיאה 500 בקנסול 
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'//הגדרת ברירת מחדל לשגיאה עם תנאי עשינו זאת כדי שיהיה תנאי לשינוי ושתמיד יופיע בטמפלט של ארור איזושהי הודעת שגיאה מתחת 
    res.status(status).render('error', { err })//שלח את סטאטוס 500 לשגיאה ורנדר את עמוד השגיאה שהקמנו בתיקיית וויוז ושלח אליו את השגיאה שהץתקבלה
})



app.listen(process.env.PORT, () => {
    console.log(`Serving on port ${process.env.PORT}`)
})





















