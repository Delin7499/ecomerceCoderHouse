import chai from "chai";
import supertest from "supertest";
import shortid from "shortid";
import { faker } from "@faker-js/faker";
import { config } from "dotenv";
import { ProductService } from "../../repositories/index.js";
const expect = chai.expect;

const requester = supertest("http://localhost:8080");

describe("TEST get all products", () => {
  it("should return all products", async () => {
    const { statusCode, ok, _body } = await requester.get("/api/products");
    expect(statusCode).to.equal(200);
    expect(ok).to.equal(true);
    expect(_body.payload).to.be.an("array");
  });
});

describe("TEST create product, then delete it", () => {
  let productId;

  it("should create a product", async () => {
    let { statusCode, ok, _body } = await requester.post("/api/products").send({
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      code: shortid.generate(),
      price: parseFloat(faker.commerce.price({ min: 100, max: 200, dec: 0 })),
      status: true,
      stock: 100,
      category: faker.commerce.productAdjective(),
      thumbnail: faker.image.url(),
    });

    productId = _body._id;

    expect(statusCode).to.equal(200);
    expect(_body).to.be.an("object");
    expect(productId).not.to.be.undefined;
  });

  ProductService.delete(productId);
});

describe("TEST get product by id", () => {
  let productId;
  before(async () => {
    const { statusCode, ok, _body } = await requester.get("/api/products");
    productId = _body.payload[0]._id;
  });

  it("should get a product by id", async () => {
    console.log(productId);
    let { statusCode, ok, _body } = await requester.get(
      `/api/products/${productId}`
    );
    expect(statusCode).to.equal(200);
    expect(_body).to.be.an("object");
    expect(_body._id).not.to.be.undefined;
    expect(_body._id).to.equal(productId);
  });
});
