import { faker } from "@faker-js/faker";
import shortid from "shortid";

let mockingProducts = undefined;

export const getProducts = async (req, res) => {
  if (mockingProducts) {
    return res.send(mockingProducts);
  } else {
    mockingProducts = [];

    for (let i = 0; i < 100; i++) {
      mockingProducts.push({
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code: shortid.generate(),
        price: faker.commerce.price(),
        status: true,
        stock: 100,
        category: faker.commerce.productAdjective(),
        thumnail: faker.image.url(),
      });
    }
    return res.send(mockingProducts);
  }
};
