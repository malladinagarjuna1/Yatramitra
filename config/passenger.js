require('dotenv').config();
const mongoose = require('mongoose');
const mongoURI =  process.env.MONGO_URI;



 
async function connectToMongoDB(){
    try{
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
        });
        console.log('connected to seats mongoDB cluster ');

    } catch(error){
        console.error('connection error:', error);
        throw error;
    }
}



let passengerDB;
connectToMongoDB().then(()=>{
     passengerDB = mongoose.connection.useDb('test');
     console.log('database test API is  connected');
}).catch(err=>{
    console.error('Failed to connect to database', err);
});


module.exports ={
    connectToMongoDB,
    getpassengerDB: () => passengerDB,
};
