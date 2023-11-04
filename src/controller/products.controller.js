import Product from "../dao/products.dao.js";

const productDao = new Product();

export const getProductsPaginated = async (req, res) => {
  const { limit, page, sort, query } = req.query;

  const sortObjectMapper = {
    asc: { price: 1 },
    desc: { price: -1 },
  };

  const modelQuery = query ? JSON.parse(query) : {};
  const modelLimit = limit ? parseInt(limit, 10) : 10;
  const modelPage = page ? parseInt(page, 10) : 1;
  const modelSort = sortObjectMapper[sort] ?? undefined;

  const myCustomLabels = {
    docs: "payload",
    prevPage: "prevLink",
    nextPage: "nextLink",
  };

  const products = await productDao.getProductsPaginated(modelQuery, {
    limit: modelLimit,
    page: modelPage,
    customLabels: myCustomLabels,
    sort: modelSort,
  });
  const queryURL = encodeURIComponent(JSON.stringify(modelQuery));
  products.prevLink = products.hasPrevPage
    ? `/api/products?page=${products.prevLink}&limit=${modelLimit}&sort=${req.query.sort}&query=${queryURL}`
    : null;
  products.nextLink = products.hasNextPage
    ? `/api/products?page=${products.nextLink}&limit=${modelLimit}&sort=${req.query.sort}&query=${queryURL}`
    : null;

  res.send(products);
};

export const addProduct = async (req, res) => {
  if (
    req.body.title &&
    req.body.description &&
    req.body.code &&
    req.body.price &&
    req.body.status &&
    req.body.stock &&
    req.body.category
  ) {
    const thumbnail = req.body.thumbnail ?? "";
    await productDao.createPoduct({
      title: req.body.title,
      description: req.body.description,
      code: req.body.code,
      price: req.body.price,
      status: req.body.status,
      stock: req.body.stock,
      category: req.body.category,
      thumbnail,
    });

    res.status(200).send();
    req.context.socketServer.emit(`products`, await productDao.getProducts());
  } else {
    res.status(400).send();
  }
};

export const deleteProduct = async (req, res) => {
  await productDao.deleteProductById(req.params.pid);
  req.context.socketServer.emit(`products`, await productDao.getProducts());
  res.status(200).send();
};

export const updateProduct = async (req, res) => {
  const pid = parseInt(req.params.pid, 10);
  const updatedData = req.body;

  await productDao.updateOne(pid, updatedData);
  res.status(204).send();
};

export const addCategory = async (req, res) => {
  await productDao.createCategory(req.params.categoryName);
  res.status(200).send();
};
