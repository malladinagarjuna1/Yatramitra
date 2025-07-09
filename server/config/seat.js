require('dotenv').config();
const mongoose = require('mongoose');
const mongoURI =  process.env.MONGO_URI;


let seatbookingDB= null;
let  passengerDB=null;
let flightBookingDB= null ;

 
async function connectToMongoDB(){
 
    try{
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
        });
        console.log('connected to seats mongoDB cluster ');
             seatbookingDB = mongoose.connection.useDb('test');
       passengerDB = mongoose.connection.useDb('test');
       flightBookingDB = mongoose.connection.useDb('test');


    } catch(error){
        console.error('connection error:', error);
        throw error;
    }
}



connectToMongoDB().then(()=>{

       


     console.log('database test API is  connected');
}).catch(err=>{
    console.error('Failed to connect to database', err);
});

module.exports ={
    connectToMongoDB,
    getseatbookingDB: () => seatbookingDB,
        getpassengerDB: () => passengerDB,
          getFlightBookingDB: () => flightBookingDB,
};
