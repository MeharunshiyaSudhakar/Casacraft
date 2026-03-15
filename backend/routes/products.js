const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Search products
router.get('/search/:keyword', async (req, res) => {
    try {
        const keyword = req.params.keyword;
        const products = await Product.find({
            $or: [
                { name: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } },
                { category: { $regex: keyword, $options: 'i' } }
            ]
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
 
// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single product
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Seed some initial products for the collections
router.post('/seed', async (req, res) => {
    try {
        await Product.deleteMany(); // Clear existing
        const sampleProducts = [
            {
                name: "Ceramic Minimalist Vase",
                description: "A beautiful hand-crafted ceramic vase perfect for dried flowers or as a standalone sculptural piece.",
                price: 45.00,
                oldPrice: 60.00,
                category: "Decor",
                image: "/images/products/vase.png",
                countInStock: 10,
                isNewProduct: true,
                discount: 25
            },
            {
                name: "Linen Throw Pillow",
                description: "Soft, breathable linen throw pillow in a calming earth tone.",
                price: 32.00,
                category: "Textiles",
                image: "/images/products/pillow.png",
                countInStock: 20,
                isNewProduct: false
            },
            {
                name: "Oak Wood Coffee Table",
                description: "Solid oak coffee table with clean lines and a durable finish.",
                price: 299.00,
                category: "Furniture",
                image: "/images/products/chair.png", // Reusing chair for furniture group
                countInStock: 5,
                isNewProduct: true
            },
            {
                name: "Amber Glass Candle",
                description: "Soy wax candle hand-poured into an elegant amber glass jar. Sandalwood scent.",
                price: 24.00,
                category: "Home Fragrance",
                image: "/images/products/vase.png", // Reusing vase for decor/fragrance
                countInStock: 15,
                isNewProduct: false
            },
            {
                name: "Abstract Canvas Wall Art",
                description: "Textured acrylic painting on stretched canvas, featuring neutral beige and brown tones.",
                price: 120.00,
                category: "Art",
                image: "/images/products/vase.png",
                countInStock: 8,
                isNewProduct: true
            },
            {
                name: "Minimalist Lounge Chair",
                description: "Ergonomic lounge chair upholstered in premium beige fabric with a sleek wooden frame.",
                price: 450.00,
                category: "Furniture",
                image: "/images/products/chair.png",
                countInStock: 4,
                isNewProduct: true
            },
            {
                name: "Floating Wall Shelf",
                description: "Solid walnut floating shelf, perfect for displaying minimalist decor and books.",
                price: 85.00,
                category: "Furniture",
                image: "/images/products/chair.png",
                countInStock: 12,
                isNewProduct: false
            },
            {
                name: "Boucle Accent Stool",
                description: "Textured white boucle accent stool adding soft geometric shapes to any living space.",
                price: 120.00,
                category: "Furniture",
                image: "/images/products/chair.png",
                countInStock: 7,
                isNewProduct: true
            },
            {
                name: "Modern Dining Chair",
                description: "Set of minimalist dining chairs featuring a curved wooden backrest and matte black legs.",
                price: 180.00,
                category: "Furniture",
                image: "/images/products/chair.png",
                countInStock: 16,
                isNewProduct: false
            },
            {
                name: "Woven Rattan Basket",
                description: "Hand-woven rattan basket, perfectly sized for blankets or indoor plants.",
                price: 38.00,
                category: "Storage",
                image: "/images/products/pillow.png",
                countInStock: 25,
                isNewProduct: false
            },
            {
                name: "Matte Black Table Lamp",
                description: "Sleek architectural table lamp with a soft diffused glow. Perfect for bedside or office.",
                price: 89.00,
                category: "Lighting",
                image: "/images/products/lamp.png",
                countInStock: 12,
                isNewProduct: true
            },
            {
                name: "Acacia Wood Salad Bowl",
                description: "Naturally grained acacia wood bowl, carved from a single piece of sustainable timber.",
                price: 42.00,
                category: "Kitchen",
                image: "/images/products/vase.png",
                countInStock: 18,
                isNewProduct: false
            },
            {
                name: "Japanese Stoneware Set",
                description: "Hand-glazed stoneware dining set including 4 plates and 4 bowls. Earthy wabi-sabi finish.",
                price: 155.00,
                category: "Kitchen",
                image: "/images/products/vase.png",
                countInStock: 6,
                isNewProduct: true
            },
            {
                name: "Velvet Emerald Sofa",
                description: "Luxurious 3-seater sofa in deep emerald velvet with brass legs and high-density foam.",
                price: 899.00,
                category: "Furniture",
                image: "/images/products/chair.png",
                countInStock: 2,
                isNewProduct: false
            },
            {
                name: "Nordic Pendant Light",
                description: "Minimalist aluminum pendant light with a matte finish. Ideal for dining areas.",
                price: 110.00,
                category: "Lighting",
                image: "/images/products/lamp.png",
                countInStock: 10,
                isNewProduct: true
            },
            {
                name: "Knitted Cotton Throw",
                description: "Chunky knit throw blanket made from 100% organic cotton. Heavyweight and cozy.",
                price: 75.00,
                category: "Textiles",
                image: "/images/products/pillow.png",
                countInStock: 22,
                isNewProduct: false
            }
        ];

        const createdProducts = await Product.insertMany(sampleProducts);
        res.status(201).json({ message: 'Products seeded successfully', products: createdProducts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
