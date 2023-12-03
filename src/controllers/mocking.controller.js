import { faker } from "@faker-js/faker";
import { ProductService } from "../repositories/index.js";
import shortid from "shortid";

let mockingProducts = undefined;

export const getProducts = async (req, res) => {
  if (mockingProducts) {
    return res.send(mockingProducts);
  } else {
    mockingProducts = [];

    for (let i = 0; i < 100; i++) {
      ProductService.create({
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
