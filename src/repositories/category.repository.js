export default class CategoryRepository {
  constructor(dao) {
    this.dao = dao;
  }

  create = async (categoryData) => {
    return this.dao.create(categoryData);
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

  update = async (id, categoryData) => {
    return this.dao.update(id, categoryData);
  };

  delete = async (id) => {
    return this.dao.delete(id);
  };
}
