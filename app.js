const express = require('express');
const ProductService = require('./src/services/productService');
const ProductRepository = require('./src/repositories/productRepository');
const Product = require('./src/models/productModel');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(express.json());

async function startApp() {
  try {
    await mongoose.connect('mongodb://localhost:27017/producto', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conexión exitosa a MongoDB');

    configureApp();
  } catch (error) {
    console.error('Error de conexión a MongoDB:', error);
  }
}

function configureApp() {
  const productRepository = new ProductRepository();
  const productService = new ProductService(productRepository);

  app.get('/product/:id', async (req, res) => {
    const productId = parseInt(req.params.id, 10);

    try {
      const product = await productService.getProduct(productId);
      if (product) {
        res.send(product);
      } else {
        res.status(404).send('Producto no encontrado');
      }
    } catch (error) {
      console.error('Error al obtener el producto:', error);
      res.status(500).send('Error interno del servidor');
    }
  });

  app.get('/products', async (req, res) => {
    try {
      const allProducts = await productService.listProducts();
      res.send(allProducts);
    } catch (error) {
      console.error('Error al obtener la lista de productos:', error);
      res.status(500).send('Error interno del servidor');
    }
  });

  app.post('/products', async (req, res) => {
    try {
      const { id, name, brand, price } = req.body;
      const newProduct = new Product({ id, name, brand, price });
      await productService.createProduct(newProduct);
      res.status(201).send('Producto creado exitosamente');
    } catch (error) {
      console.error('Error al crear el producto:', error);
      res.status(500).send('Error interno del servidor');
    }
  });

  app.listen(port, () => {
    console.log(`La aplicación está escuchando en http://localhost:${port}`);
  });
}

startApp();
