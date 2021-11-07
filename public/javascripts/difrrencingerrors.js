
//Differentiating Mongoose Errors rout
const handleValidationErr = err => {//אם שם השגיאה היה ואלדידאטיון ארור אז פונקציה זאת תקבל את איאר אר ותחזיר סטאטוס 400 ותגובה שאנחנו בחרנו  בשגיאה
    return new AppError(`Validation IS FAILED ! try again...`, 400)//שימו לב לשימוש באפ ארור
}
//const handleErr = err => {//אם שם השגיאה היה  ארור אז פונקציה זאת תקבל את איאר אר ותחזיר סטאטוס 404 ותגובה שאנחנו בחרנו  בשגיאה
//  return new AppError(`The server can not find the requested resource. In the browser, this means the URL is not recognized.`, 404)//שימו לב לשימוש באפ ארור
//}
const castErrHandler = err => {//אם שם השגיאה היה קאסט ארור אז פונקציה זאת תקבל את איאר אר ותחזיר סטאטוס 404 ותגובה שאנחנו בחרנו  בשגיאה
    return new AppError(`The server can not find the requested resource. In the browser, this means the URL is not recognized.`, 404)//שימו לב לשימוש באפ ארור
}

//Differentiating Mongoose Errors rout
//כך נבדיל בין שגיאות מונגוס שונות
//מדפיס את שם השגיאה כדי לגלות מהיא השגיאה
//ואז נציג אם שם השגיאה הוא כזה אז נציב במשתנה אי אר אר פונקציה שתקבל את אי אר אר ותחזיר לנו שגיאה שאנחנו הגדרנו את הסטאטוס והתוכן שלה בהתאם לשם השגיאה המתאים שהתקבל
app.use((err, req, res, next) => {
    console.log(err.name)
    if (err.name === 'ValidationError') err = handleValidationErr(err)
    //if (err.name === 'Error') err = handleErr(err)
    if (err.name === 'CastError') err = castErrHandler(err)
    next(err)
})
