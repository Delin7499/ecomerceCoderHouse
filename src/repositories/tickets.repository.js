export default class TicketRepository {
  constructor(dao) {
    this.dao = dao;
  }

  create = async (ticketData) => {
    return this.dao.create(ticketData);
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

  update = async (id, ticketData) => {
    return this.dao.update(id, ticketData);
  };

  delete = async (id) => {
    return this.dao.delete(id);
  };
}
