
import express from "express"

const stripRouter = express.Router();

import Stripe from 'stripe';
const stripe = Stripe('sk_test_51M3ZeNSEjgF9wMD78YrQ3qfNVFxnhPiqPyh0bEKssUL3vdK0xoUtYUI1BAkXuC6YKbTMDPRx87KcZVE19sdnFzRN00sw0er4Gw');

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
              name: 'Movie Title',
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