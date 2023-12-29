import chai from "chai";
import supertest from "supertest";
import shortid from "shortid";
import { faker } from "@faker-js/faker";
import { CategoryService, ProductService } from "../../repositories/index.js";
const expect = chai.expect;

const requester = supertest("http://localhost:8080");

describe("TEST /api/product endpoints", () => {
  let productId;
  let product;

  it("should return all products", async () => {
    const { statusCode, ok, _body } = await requester.get("/api/products");
    expect(statusCode).to.equal(200);
    expect(ok).to.equal(true);
    expect(_body.payload).to.be.an("array");
  });

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
    product = _body;

    expect(statusCode).to.equal(200);
    expect(_body).to.be.an("object");
    expect(productId).not.to.be.undefined;
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
    expect(_body.title).to.equal(product.title);
  });

  it("should update a product", async () => {
    const newTitle = faker.commerce.productName();
    const { statusCode, ok, _body } = await requester
      .put(`/api/products/${productId}`)
      .send({ $set: { title: newTitle } });
    expect(statusCode).to.equal(200);
    expect(_body).to.be.an("object");
    expect(_body._id).not.to.be.undefined;
    expect(_body._id).to.equal(productId);
    expect(_body.title).to.equal(newTitle);
  });

  let categoryId;

  it("should add a product category", async () => {
    const { statusCode, ok, _body } = await requester.post(
      `/api/products/category/${shortid.generate()}`
    );
    categoryId = _body._id;
    expect(statusCode).to.equal(200);
    expect(_body).to.be.an("object");
    expect(_body._id).not.to.be.undefined;
  });
});
