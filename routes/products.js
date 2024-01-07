const products = require("../models/Products");
const router = require("express").Router();


router.post("/", async (req, res) => {
    try {
        const data = await products.create(req.body);
        res.status(201).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/", async (req, res) => {
    const {
        query: { cat, find },
    } = req;

    const filterConditions = {};

    if (cat) {
        filterConditions.cat = { $regex: new RegExp(cat, 'i') };
    }

    if (find) {
        filterConditions.$or = [
            { name: { $regex: new RegExp(find, 'i') } },
            { cat: { $regex: new RegExp(find, 'i') } },
            { brand: { $regex: new RegExp(find, 'i') } },
            { desc: { $regex: new RegExp(find, 'i') } },
        ];
    }

    try {
        const data = await products.find(filterConditions);
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.get('/:id', async (req, res) => {

    try {
        const data = await products.findById(req.params.id);

        if (!data) {
            // Product not found
            res.status(404).json({ error: 'Product not found' });
            return;
        }

        // Product found, send data
        res.status(200).json(data);
    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;