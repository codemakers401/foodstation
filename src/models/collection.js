'use strict';
const { Op } = require("sequelize");
class Collection {
  constructor(model,parent1Model=null,parent2Model=null,parent3Model=null,parent4Model=null,parent5Model=null) {
    this.model = model;
    this.parent1Model=parent1Model
    this.parent2Model=parent2Model
    this.parent3Model=parent3Model
    this.parent4Model=parent4Model
    this.parent5Model=parent5Model
    
  }

  async create(obj) {
    console.log('obj',obj);
    try {
      let newRecord = await this.model.create(obj);
      console.log('newRecord',newRecord);

      return newRecord;
    } catch (e) {
      console.error('error in creating new record for model', this.model,e.message)
    }
  }

  async read(id) {
    let record=[];
    try {
      if (id) {
        record[0] = await this.model.findOne({ where:{id} })
        if(!record[0])
        record[0]=`there is no record with id of ${id}`
      } else {
        record = await this.model.findAll()
      }
      return record;
    } catch (e) {
      console.error('error in reading record/s for model', this.model, e.message)
      // return record[0]=`there is no user with id of ${id}`
    }
 
  }
  
  async readItem(id) {
     let record=[];
    try {
      if (id) {
        record[0] = await this.model.findOne({where:{id}, include: this.parent1Model })
        if(!record[0])
        record[0]=`there is no user with id of ${id}`
      } else {
        record = await this.model.findAll({ include: this.parent1Model})
      }
      return record;
    } catch (e) {
      console.error('error in reading record/s for model', this.model)
    }
  
  }
  async readOrders(custID,billID) {
     let record=[];
    try {if(billID){
        record = await this.model.findAll({where:{custID:custID,id:billID}, include:[{model :this.parent1Model,include:[{model:this.parent2Model,include:this.parent4Model}]},{model :this.parent3Model},{model :this.parent5Model}]})
        return record;
      }else{
        record = await this.model.findAll({where:{custID}, include:[{model :this.parent1Model,include:[{model:this.parent2Model,include:this.parent4Model}]},{model :this.parent3Model},{model :this.parent5Model}]})
        return record;
      }}
   catch (e) {
      console.error('error in reading record/s for model', this.model)
    }
  
  }
  async readAllOrders(statusID) {
     let record=[];
    try {if(statusID){
        record = await this.model.findAll({where:{statusID:statusID}, include:[{model :this.parent1Model,include:[{model:this.parent2Model,include:this.parent4Model}]},{model :this.parent3Model},{model :this.parent5Model}], order:['id']})
        return record;
      }else{
        record = await this.model.findAll({include:[{model :this.parent1Model,include:[{model:this.parent2Model,include:this.parent4Model}]},{model :this.parent3Model},{model :this.parent5Model}], order:['id']})
        return record;
      }}
   catch (e) {
      console.error('error in reading record/s for model (84)', this.model)
    }
  
  }
  async readRunningOrders(custID) {
     let record=[];
    try {
      let max = await this.parent3Model.max('id');
        record = await this.model.findAll({where:{custID:custID,statusID:{[Op.lt]:max}}, include:[{model :this.parent1Model,include:[{model:this.parent2Model,include:this.parent4Model}]},{model :this.parent3Model},{model :this.parent5Model}]})
        return record;
      }
   catch (e) {
      console.error('error in reading record/s for model', this.model)
    }
  
  }
  
  async readItemByResId(id) {
    let record=[];
    try {
      
        record = await this.model.findAll({ include: this.parent1Model , where:{restaID:id} }) 
         if(!record[0])
        record[0]=`there is no record with id of ${id}`
      
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

  async readDriverOrders(driverid) {
    let record=[];
   try {if(driverid){
       record = await this.model.findAll({where:{driverid:driverid}, include:[{model :this.parent1Model,include:[{model:this.parent2Model,include:this.parent4Model}]},{model :this.parent3Model},{model :this.parent5Model}], order:['id']})
       return record;
     }else{
       record = await this.model.findAll({include:[{model :this.parent1Model,include:[{model:this.parent2Model,include:this.parent4Model}]},{model :this.parent3Model},{model :this.parent5Model}], order:['id']})
       return record;
     }}
  catch (e) {
     console.error('error in reading record/s for model (84)', this.model)
   }
 
 }
  
}

module.exports = Collection;