const mongoose = require('mongoose');//דרישה למנוגוס
const Schema = mongoose.Schema;//הגדרת סקימה 
const Review = require('./review')


const imageSchema = new Schema({

    url: String,
    filename: String

})

imageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});


const opts = { toJSON: { virtuals: true } };



const CampgroundSchema = new Schema({//הגדרת סקימה חדשה
    title: 'string',//כותרת תהייה סטרינג
    images: [imageSchema],
    price: 'Number',//מחיר יהיה סטרינג ,אולי מספר בהמשך
    description: 'string',//תיאור יהיה סטרינג
    location: 'string',//מיקום יהיה סטרינג
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'

    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    reviews: [{//אריי של ריוויו שהסוג שלו שהוא יתאחסן בדטאטה בייס זה אובג'קא איידי  והמודל שהוא יאוחסן בו זה רייוויו
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
},opts)//שימו לב הגדרנו את האופשיינס שורה אחת לפני תחילת הסקימה כדי שתאפשר את הצגת המחנה בעת לחיצה בקלאסר מאפ 


//וירטואל שמוסיף מאפיין נוסך בשם פרופרטיס לכל קאמפ שמאפשר בעת לחיצה שלו על הקלאסטר מאפ להביא הת הפרטים של המחנה ,כותרת שהיא קישור למחנה ותיאור  של המחנה באנמעות טיז הסתכלו גם בקלאסטר מאפ ובוקבץ האינדקס שמציג את כל המחנות כדי להבין טוב יותר 
CampgroundSchema.virtual('properties.popUpMarkup').get(function() {
    return `${this.id}`
});

CampgroundSchema.virtual('properties.popUpMarkupTitle').get(function() {
    return `${this.title}`
});

CampgroundSchema.virtual('properties.popUpMarkuplocation').get(function() {
    return `${this.location}`
});
CampgroundSchema.virtual('properties.popUpMarkupdescrip').get(function() {
    return `${this.description}`
});
CampgroundSchema.virtual('properties.popUpMarkupPIC').get(function() {
    return `${this.images[0].url}`
});




//${this.title} ${this.location}

//זה מידל וויאר שגורם לכל הריוויוז להימחק אחרי שמחקנו את הקאמפ
CampgroundSchema.post('findOneAndDelete', async function (camp) {//זה מידל וויר של קווירי, אחרי בקשת פוסט  של מחיקה כל שהיא לחווה,הסתכל באינדקס על ראוט המחיקה,אז יש פונקציית אייסינק שמקבלת את החווה הזאת
    if (camp) {//בודקת במאפיין המוצרים שלה אם יש משהו באריי
        await Review.deleteMany({ _id: { $in: camp.reviews } })//אם יש מוצרים באריי תמחק את כולם-האריי של המוצרים הוא אריי של אובייקט איידי אלה אם כן נעשה לו פופלייט,לכן יש אין וסימן דולר ופארם.פרודקס. תמחקא באריי כל מה שיש לו _איידי באריי הזה  חשוב לציין שהשתמשנו כאן במודל פרודקס ושזה קובץ הפארם דרשנו אותו למעלה
    }
})


module.exports = mongoose.model('Campground', CampgroundSchema)//מידול וייצוא