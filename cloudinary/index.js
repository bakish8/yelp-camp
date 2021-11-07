const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


//הגדרות הקלאודינרי  שיקבל את  מה שהגדרנו בקובץ האי אן וי המוחבא
cloudinary.config({
    cloud_name: process.env.CLOUDINAY_CLOUD_NAME,
    api_key: process.env.CLOUDINAY_KEY,
    api_secret: process.env.CLOUDINAY_SECRET
})

const storage = new CloudinaryStorage({//הכנסה למשתנה סטורג' את קלאודינרי שבדיוק הגדרנו והוא יהיה ניו קלאודינרי סטורג' שהתיקיה שלו באתר 
    cloudinary,//אנחנו מעבירים לו את החשבון שבדיוק הגדרנו לו להתחבר אליו
    params: {//משהו שחייב להגדיר כדי שיכנס לתיקיה

        folder: 'YELP-CAMP',//התיקייה באתר תיקרא יאלפ קאמפ
        allowedFormats: ['jpeg', 'png', 'jpg']//ואת סוגי הקבצים המורשים להתאחסן בתיקיה זו 
    }

})

module.exports = {//ייצא החוצה 
    cloudinary, storage//גם את קלאודינריי וגם את הסטורג' 
}


