const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const router = require("express").Router();


router.post("/", async (req, res) => {
    const {
        query: { total },
    } = req;
    try {
        const product = await stripe.products.create({
            name: "Your Total IS",
        });
        const price = await stripe.prices.create({
            unit_amount: total,
            currency: "inr",
            product: product.id,
        });
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: price.id,
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${req.headers.origin}/?success=true`,
            cancel_url: `${req.headers.origin}/?canceled=true`,
        });
        res.redirect(303, session.url);
    } catch (err) {
        res.status(err.statusCode || 500).json(err.message);
    }

});

module.exports = router;