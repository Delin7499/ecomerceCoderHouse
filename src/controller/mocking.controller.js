import { faker } from "@faker-js/faker";
import shortid from "shortid";

import Product from "../dao/products.dao.js";

const productDao = new Product();
let mockingProducts = undefined;

export const getProducts = async (req, res) => {
  if (mockingProducts) {
    return res.send(mockingProducts);
  } else {
    mockingProducts = [];

    for (let i = 0; i < 100; i++) {
      productDao.createPoduct({
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code: shortid.generate(),
        price: parseFloat(faker.commerce.price({ min: 100, max: 200, dec: 0 })),
        status: true,
        stock: 100,
        category: faker.commerce.productAdjective(),
        thumbnail: faker.image.url(),
      });
      mockingProducts.push({
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code: shortid.generate(),
        price: parseFloat(faker.commerce.price({ min: 100, max: 200, dec: 0 })),
        status: true,
        stock: 100,
        category: faker.commerce.productAdjective(),
        thumbnail: faker.image.url(),
      });
    }
    return res.send(mockingProducts);
  }
};
