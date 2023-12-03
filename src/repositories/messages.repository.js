export default class MessaageRepository {
  constructor(dao) {
    this.dao = dao;
  }

  create = async (messageData) => {
    return this.dao.create(messageData);
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

  update = async (id, messageData) => {
    return this.dao.update(id, messageData);
  };

  delete = async (id) => {
    return this.dao.delete(id);
  };
}
