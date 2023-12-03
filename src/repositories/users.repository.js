export default class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }

  create = async (userData) => {
    return this.dao.create(userData);
  };

  getById = async (id) => {
    return this.dao.findById(id);
  };

  getByEmail = async (email) => {
    return this.dao.findByEmail(email);
  };

  get = async (data) => {
    return this.dao.find(data);
  };

  getAll = async () => {
    return this.dao.findAll();
  };

  update = async (id, userData) => {
    return this.dao.update(id, userData);
  };

  delete = async (id) => {
    return this.dao.delete(id);
  };

  addTicket = async (userEmail, ticketId) => {
    this.dao.addTicket(userEmail, ticketId);
  };
}
