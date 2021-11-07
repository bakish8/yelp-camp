
const User = require('../models/user');//דרישת המודל של קאמפגראונד מתיקיית המודלים
//register
module.exports.Register = async (req, res) => {//מתי שמבקשים עמוד זה שלח לנו פונקציית אייסינק
    res.render('users/register');//רנדר לו את טופס הרשמת המשתמש
}
module.exports.EditNewUser = async (req, res, next) => {//בבקשת פוסט לראוט זה 
    try {
        const { email, username, password } = req.body;//קח את שם המשתמש הססמא והאיימייל שהמשתמש הקליד לרק.בודי
        const user = new User({ email, username });//צור משתמש חדש על פי המודל שיבאנו ושמור אותו במשתנה
        const registeredUser = await User.register(user, password);//redister--תעביר את המשתנה שיצרנו ליוזר רג'יסטר,ואת הססמא שקיבלנו מהרק בודי.רג'יסטר ירשום למעננו את המשתמש במשתנה ויעשה לסססמא שלו האשד וסולט והיא תישמר בדאטה בייס בשורה למטה
        req.login(registeredUser, err => {//שני השורות הבאות דואגות שנחב את המשתמש שלנו ישר אחרי שהוא נרשם בהצלחה
            if (err) return next(err)//אף פעם לא תהיה טעות אבל זה שורה שחייב להוסיף כדי שנוכל לרשום את השורה למעלה ולחבר את המשתמש איך שנרשם
            req.flash('success', 'Successfully made a new user!');//שלח הודעת פלטש תמאימה
            res.redirect('/campgrounds')

        })
    }
    catch (e) {
        req.flash('error', e.message)//תעשה הודעת פלאש שמכילה את התקלה במידה ויש משתמש כזה במערכת 
        res.redirect('/register')
    }
}
//LOGIN
module.exports.LoginPage = async (req, res) => {//מתי שמבקשים עמוד זה שלח לנו פונקציית אייסינק
    res.render('users/login');//רנדר לו את טופס הרשמת המשתמש
}
module.exports.LoginAction = (req, res) => {//שמנו מידל וויאר שבודק אם הססמא מתאימה לשם המשתמש בדאטה בייס והגדרות נוספות שחייב לרשום 
    req.flash('success', 'welcome back!');//שלח הודעת פלטש תמאימה
    const weDidentForgotYou = req.session.returnTo || '/campgrounds';//קבלה מהסשן את הכתובת המקורית שאליה ניסה להכנס המשתמש לפני שהיה מחובר אם לא ניסה להיכנס לכתובת מסויימת אז תכניס למשתנה הזה את האינדקס הראשי שמציג את כל המחנות ראה את קובץ לוגאיןמידלוויאר שנמצא בתיקייה הראשית  
    delete req.session.returnTo//תזכור רק פעם אחת בסשן מאיפה המשתמש בא לפני שהתחבר שמנו את זה במשתנה אחרי לפני ההעברה ומעבירים את הכתובת דרכו מהסשן נמחד את המאפיין ריטורן טו
    res.redirect(weDidentForgotYou)//נעביר את המשתמש לאן שהוא ניסה להכנס קודם או לקאמפגראונדס שזה האינדקס הראשי לאחר החיבור
}
//LOGOUT
module.exports.LogOutAction = (req, res) => {
    req.logout()/// עוד שיטה מיוחדת שיש לנו בזכות שהתקנו והגדרנו את פאספרורט שזה פשוט יתנק אותנו מהמשתמש שאנחנו נמצאים בו
    req.flash('success', 'Goodbye!')
    res.redirect('/campgrounds')//שלח חזרה לקאמפגראונס
}