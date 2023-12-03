export default class ProductRepository {
  constructor(dao) {
    this.dao = dao;
  }

  create = async (productData) => {
    return this.dao.create(productData);
  };

  getById = async (id) => {
    return this.dao.findById(id);
  };

  get = async (data) => {
    return this.dao.find(data);
  };

  getAll = async () => {
    return this.dao.findAll();
  };

  getAllPaginated = async (query, options) => {
    return this.dao.findAllPaginated(query, options);
  };

  update = async (id, productData) => {
    return this.dao.update(id, productData);
  };

  delete = async (id) => {
    return this.dao.delete(id);
  };
}
