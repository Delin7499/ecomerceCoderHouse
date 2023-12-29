import chai from "chai";
import supertest from "supertest";
const expect = chai.expect;

const requester = supertest("http://localhost:8080");

describe("TEST /api/carts endpoints", () => {
  it("should return all carts", async () => {
    const { statusCode, ok, _body } = await requester.get("/api/carts");
    expect(statusCode).to.equal(200);
    expect(ok).to.equal(true);
    expect(_body).to.be.an("array");
  });

  it("shoud get a cart products by id", async () => {
    const { statusCode, ok, _body } = await requester.get(
      "/api/carts/658f50d412ee99fe733eec91"
    );
    expect(statusCode).to.equal(200);
    expect(ok).to.equal(true);
    expect(_body).to.be.an("array");
  });

  it("should add a product to cart", async () => {
    const { statusCode, ok, _body } = await requester.post(
      "/api/carts/658f50d412ee99fe733eec91/product/658a4156e468dd880d61197f"
    );
    expect(statusCode).to.equal(200);
    expect(ok).to.equal(true);
    expect(_body).to.be.an("object");
  });
});
