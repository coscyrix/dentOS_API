import DBconn from '../config/db.config.js';
import knex from 'knex';

const db = knex(DBconn.dbConn.development);

export default class Benefits {
  async postBenefits(data) {
    try {
      const tmpBenefits = {
        ...(data.ben_name && { ben_name: data.ben_name.toLowerCase() }),
        ...(data.ben_description && {
          ben_description: data.ben_description.toLowerCase(),
        }),
        ...(data.svc_active_yn && { svc_active_yn: data.svc_active_yn }),
        ...(data.sys_user_id && { sys_user_id: data.sys_user_id }),
      };

      const rec = await db('benefits').insert(tmpBenefits);

      return rec;
    } catch (error) {
      return error;
    }
  }

  //////////////////////////////////////////
  async putBenefits(data) {
    try {
      const tmpBenefits = {
        ...(data.ben_name && { ben_name: data.ben_name.toLowerCase() }),
        ...(data.ben_description && {
          ben_description: data.ben_description.toLowerCase(),
        }),
        ...(data.svc_active_yn && { svc_active_yn: data.svc_active_yn }),
        ...(data.sys_user_id && { sys_user_id: data.sys_user_id }),
      };

      const rec = await db('benefits')
        .where('ben_id', data.ben_id)
        .update(tmpBenefits);

      return rec;
    } catch (error) {
      return error;
    }
  }

  //////////////////////////////////////////
  async getBenefits(data) {
    try {
      const query = db('benefits');

      if (data.ben_id) {
        query.where('ben_id', data.ben_id);
      }

      const rec = await query;

      return rec;
    } catch (error) {
      return error;
    }
  }
}
