const express = require('express');
const router = express.Router();
let products = require('../data/products');

// GET /products
router.get('/', (req, res) => {
  const { category } = req.query;
  if (category) {
    const filtered = products.filter(p => p.category === category);
    return res.json(filtered);
  }
  res.json(products);
});

// GET /products/:id
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

// POST /products
router.post('/', (req, res) => {
  const { name, category, price } = req.body;
  if (!name || !category || typeof price !== 'number') {
    return res.status(400).json({ message: 'Invalid data' });
  }
  const newProduct = {
    id: products.length + 1,
    name,
    category,
    price,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

module.exports = router;