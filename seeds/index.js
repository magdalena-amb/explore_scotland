
const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/camplife', {
   useNewUrlParser: true,
   useCreateIndex: true,
   useUnifiedTopology: true 
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", ()=> {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
          //your user ID
            author: '6015cc9c78a76d3c448d3692',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                  url: 'https://res.cloudinary.com/dfmretzem/image/upload/v1612525256/CampLife/omng2kxb1cqr3w5a9wp4.jpg',
                  filename: 'CampLife/mibqa2sumhxp5klx5wet'
                }
              ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis eum enim asperiores molestiae eius at vitae, distinctio nesciunt ipsa! Cumque accusamus nisi reprehenderit error libero quasi, neque beatae praesentium autem nam sapiente omnis et quam dolores ratione quas minus rem eveniet necessitatibus amet a itaque, ad architecto. Consectetur, aspernatur illo.',
            price,
            geometry: {
              type:"Point",
              coordinates: [-5.104950591481406,56.82050136253448 ]
            }
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})

