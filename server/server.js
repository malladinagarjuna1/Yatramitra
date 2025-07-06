require('./config/db');
const express = require('express');
const app = express();
const port =5000;
const stripe = require('stripe')(' pk_test_51Rfg0HQuMy4lD6Qs8iokYZTQEjKXhJMjN151bp4FRAw4Kn7CPTs51OCurAmV62Z8vn64dygqPBKqnWx9gJqgQlGh00CJPx7G2R') 



app.use(express.json());
const UserRouter = require('./api/user.js');
app.use('/', UserRouter);

app.listen(port, () =>{
    console.log(`server is running on port ${port}`);

})

const FlightRouter = require('./api/flight');
app.use('/api', FlightRouter);
app.post('/payment',async (req, res)=>{
    const product = await stripe.products.create({
        name: "T-shirt"
    });
    if(product){
        var price= await stripe.prices.create({
            product: `${product.id}`, 
            unit_amount: 100*100,
            currency: 'inr',
        });
    }

    if(price.id){
        var session= await stripe.checkout.sessions.create({
            line_items:[
                {
                    price: `${price.id}`,
                    quantity: 1,
                }

            ],
            mode: 'payment',
            success_url: 'http://localhost:3000/success',
            cancel_url:'http://localhost:3000/cancel',
            customer_email:'demo@gmail.com'

        })
    }

    res.json(session);

})
