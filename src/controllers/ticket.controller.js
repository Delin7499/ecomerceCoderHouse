import {
  UserService,
  CartService,
  ProductService,
  TicketService,
} from "../repositories/index.js";

export const purchase = async (req, res) => {
  const cartId = req.params.cartId;

  try {
    const cart = await CartService.getById(cartId);

    if (!cart) {
      return res.status(404).send("Cart doesn't exist");
    }

    const updatedCart = await processPurchase(cart);
    const totalAmount = updatedCart.products.reduce((total, product) => {
      return total + product.quantity * product.product.price;
    }, 0);

    const newTicket = await TicketService.create({
      amount: totalAmount,
      purchaser: req.session.email,
    });
    console.log(newTicket._id);
    UserService.addTicket(req.session.email, newTicket._id);

    req.context.socketServer.emit(`cartUpdate`, updatedCart);
    res.status(200).json({
      message: "Purchase complete",
      purchasedProducts: updatedCart.products,
    });
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
        product.stock -= quantity;
        await ProductService.update(product._id, product);
        return { ...cartProduct, purchased: true };
      } else {
        return { ...cartProduct, purchased: false };
      }
    })
  );

  const notPurchasedProducts = updatedProducts.filter(
    (cartProduct) => !cartProduct.purchased
  );

  const updatedCart = await CartService.update(cart._id, {
    products: notPurchasedProducts,
  });

  const purchasedProducts = updatedProducts.filter(
    (cartProduct) => cartProduct.purchased
  );

  updatedCart.products = purchasedProducts;

  return updatedCart;
};

export const getUserTickets = async (req, res) => {
  const userEmail = req.params.email;

  const user = await UserService.getByEmail(userEmail);

  return res.status(200).send(user.tickets);
};
