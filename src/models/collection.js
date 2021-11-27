class Collection {
  constructor(model) {
    this.model = model;
  }

  async create(obj) {
    try {
      let newRecord = await this.model.create(obj);
      return newRecord;
    } catch (e) {
      console.error('error in creating new record for model', this.model)
    }
  }

  async read(id) {
    let record=[];
    try {
      if (id) {
        record[0] = await this.model.findOne({ where:{id} })
        if(!record[0])
        record[0]=`there is no user with id of ${id}`
      } else {
        record = await this.model.findAll()
      }
      return record;
    } catch (e) {
      console.error('error in reading record/s for model', this.model)
    }
 
  }

  async update(id, obj) {
    try {
      let recordId = await this.model.findOne({ where: { id} })
      let updateRecord = await recordId.update(obj);
      return updateRecord;
    } catch (e) {
      console.error('error in updating record for model', this.model, `id:${id}`)
    }
  }

  async delete(id) {
    try {
      let deletedRecord = await this.model.destroy({ where: { id: id } });
      return deletedRecord;
    } catch (e) {
      console.error('error in deleting record for model', this.model, `id:${id}`)
    }
  }
  
}

module.exports = Collection;