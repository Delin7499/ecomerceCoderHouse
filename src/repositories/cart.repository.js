export default class CartRepository {
  constructor(dao) {
    this.dao = dao;
  }

  create = async (cartData) => {
    return this.dao.create(cartData);
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

  update = async (id, cartData) => {
    return this.dao.update(id, cartData);
  };

  delete = async (id) => {
    return this.dao.delete(id);
  };
}
