export default class RecoveryTokenRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async create(tokenData) {
    return await this.dao.create(tokenData);
  }

  async getOne(data) {
    return await this.dao.getOne(data);
  }

  deleteById(id) {
    return this.dao.deleteById(id);
  }
}
