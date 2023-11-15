import Ticket from "../dao/tickets.dao.js";
import Cart from "../dao/carts.dao.js";
import Product from "../dao/products.dao.js";

const ticketDao = new Ticket();
const cartDao = new Cart();
const productDao = new Product();

export const purchase = async (req, res) => {
  const cartId = req.params.cartId;
  console.log(req.session);

  try {
    const cart = await cartDao.getCartById(cartId);

    if (!cart) {
      return res.status(404).send("Cart doesn't exist");
    }

    const updatedCart = await processPurchase(cart);
    const totalAmount = updatedCart.products.reduce((total, product) => {
      return total + product.quantity * product.product.price;
    }, 0);

    const newTicket = await ticketDao.createTicket({
      amount: totalAmount,
      purchaser: req.session.email,
    });
    req.context.socketServer.emit(`cartUpdate`, updatedCart);
  } catch (error) {
    console.error("Error processing purchase:", error);
    res.status(500).send("Internal Server Error");
  }
};

const processPurchase = async (cart) => {
  const updatedProducts = await Promise.all(
    cart.products.map(async (cartProduct) => {
      const { product, quantity } = cartProduct;

      const availableStock = product.stock;

      if (availableStock >= quantity) {
        const newStock = availableStock - quantity;
        await productDao.updateStock(product._id, newStock);
        return { ...cartProduct, purchased: true };
      } else {
        return { ...cartProduct, purchased: false };
      }
    })
  );

  const purchasedProducts = updatedProducts.filter(
    (cartProduct) => !cartProduct.purchased
  );

  const updatedCart = await cartDao.updateCart(cart._id, {
    products: purchasedProducts,
  });

  return updatedCart;
};
