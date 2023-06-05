const mongoose = require("mongoose");
mongoose.set('strictQuery', false)
const databaseConnection = async () => {
    try {
        // mongoose.connect('mongodb://localhost:27017/product', error => {
        //     if(error) return console.log(error)
        // console.log("Db Connected");

        // });
        mongoose.connect(`mongodb+srv://admin:RaCYnpIDNDbnr2Q7@ikapos.5urmfnl.mongodb.net`, error => {
            if(error) return console.log(error)
            console.log("Db Connected");

        });
    } catch (error) {
        console.log("Error ============");
    }
};

module.exports = databaseConnection

// // Replace the uri string with your connection string.
// const uri =
//   `mongodb+srv://JD2022:<johndoe@2>@cluster0.ovvq21b.mongodb.net/?retryWrites=true&w=majority`;

// const client = new MongoClient(uri);

// export default async function run() {
//   try {
//     const database = client.db('product');
//     const movies = database.collection('movies');

//     // Query for a movie that has the title 'Back to the Future'
//     const query = { title: 'Back to the Future' };
//     const movie = await movies.findOne(query);

//     console.log(movie);
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);