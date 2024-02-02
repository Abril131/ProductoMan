const mongoose = require('mongoose');
const ProductSchema = require('../models/productModel');

class ProductRepository {
  constructor() {
    mongoose.connect('mongodb://127.0.0.1:27017/producto', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    this.Product = mongoose.model('Product', ProductSchema);
  }

  async saveProduct(productData) {
    const product = new this.Product(productData);
    await product.save();
    console.log(`Producto guardado en la base de datos: ${product.name}`);
    return product;
  }

  async listProducts() {
    const products = await this.Product.find({});
    return products;
  }

  async getProductById(productId) {
    const product = await this.Product.findById(productId);
    console.log(`Obteniendo producto de la base de datos con ID: ${productId}`);
    return product;
  }

  async updateProduct(productData) {
    const updatedProduct = await this.Product.findByIdAndUpdate(
      productData.id,
      productData,
      { new: true }
    );

    if (updatedProduct) {
      console.log(`Producto actualizado en la base de datos: ${updatedProduct.name}`);
      return updatedProduct;
    } else {
      throw new Error(`Producto con ID ${productData.id} no encontrado`);
    }
  }

  async deleteProduct(productId) {
    const deletedProduct = await this.Product.findByIdAndDelete(productId);

    if (deletedProduct) {
      console.log(`Producto eliminado de la base de datos: ${deletedProduct.name}`);
      return deletedProduct;
    } else {
      throw new Error(`Producto con ID ${productId} no encontrado`);
    }
  }
}

module.exports = ProductRepository;
