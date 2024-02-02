
class ProductService {
    constructor(productRepository) {
      this.productRepository = productRepository;
    }
  
    createProduct(product) {
      return this.productRepository.saveProduct(product);
    }

    listProducts(){
      return this.productRepository.listProducts();
    }
  
    getProduct(productId) {
      return this.productRepository.getProductById(productId);
    }
  
    updateProduct(product) {
      return this.productRepository.updateProduct(product);
    }
  
    deleteProduct(productId) {
      return this.productRepository.deleteProduct(productId);
    }
  }
  
  module.exports = ProductService;
  