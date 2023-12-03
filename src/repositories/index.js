import User from "../DAO/mongo/user.mongo.js";
import Ticket from "../DAO/mongo/ticket.mongo.js";
import Message from "../DAO/mongo/message.mongo.js";
import Product from "../DAO/mongo/product.mongo.js";
import Cart from "../DAO/mongo/cart.mongo.js";
import Category from "../DAO/mongo/category.mongo.js";
import RecoveryToken from "../DAO/mongo/recoveryToken.mongo.js";

import UserRepository from "./users.repository.js";
import TicketRepository from "./tickets.repository.js";
import MessageRepository from "./messages.repository.js";
import ProductRepository from "./products.repository.js";
import CartRepository from "./cart.repository.js";
import CategoryRepository from "./category.repository.js";
import RecoveryTokenRepository from "./recoveryToken.repository.js";

export const UserService = new UserRepository(new User());
export const TicketService = new TicketRepository(new Ticket());
export const MessageService = new MessageRepository(new Message());
export const ProductService = new ProductRepository(new Product());
export const CartService = new CartRepository(new Cart());
export const CategoryService = new CategoryRepository(new Category());
export const RecoveryTokenService = new RecoveryTokenRepository(
  new RecoveryToken()
);
