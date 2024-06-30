
import express from "express"
import dotenv from "dotenv"
dotenv.config();
const stripRouter = express.Router();

import Stripe from 'stripe';
const stripe = Stripe(`${process.env.SECRET_KEY_Stripe}`);

stripRouter.post('/create-checkout-session', async (req, res) => {
    const { movieId } = req.body;
  
    // Fetch movie details from your database (e.g., price, title)
  
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          // Replace with actual movie details
          price_data: {
            currency: 'inr',
            product_data: {
              name: 'Price of Movie',
            },
            unit_amount: 50000, // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:3000/`
    });
  
    res.json({ id: session.id });
  });


export default stripRouter;