//models/user.js

import DBconn from '../config/db.config.js';
import knex from 'knex';

const db = knex(DBconn.dbConn.development);

export default class User {
  //////////////////////////////////////////

  async postUser(data) {
    try {
      const tmpUsr = {
        user_email: data.user_email.toLowerCase(),
        user_first_name: data.user_first_name.toLowerCase(),
        user_last_name: data.user_last_name.toLowerCase(),
        user_password: data.user_password,
        user_access_key: data.user_access_key,
        role_id: data.role_id ? data.role_id : 5,
        conf_id: data.conf_id,
        referer: data.referer,
      };

      const rec = await db('user').insert(tmpUsr);

      return rec;
    } catch (error) {
      return error;
    }
  }

  //////////////////////////////////////////

  async putUser(data) {
    try {
      const tmpUsr = {
        ...(data.user_first_name && {
          user_first_name: data.user_first_name.toLowerCase(),
        }),
        ...(data.user_last_name && {
          user_last_name: data.user_last_name.toLowerCase(),
        }),
        ...(data.user_access_key && { user_access_key: data.user_access_key }),
        ...(data.user_password && { user_password: data.user_password }),
        ...(data.svc_provider_yn && { svc_provider_yn: data.svc_provider_yn }),
        ...(data.user_conf_dte && { user_conf_dte: data.user_conf_dte }),
        ...(data.user_deactivate_dte && {
          user_deactivate_dte: data.user_deactivate_dte,
        }),
        ...(data.user_active_yn && { user_active_yn: data.user_active_yn }),
        ...(data.sys_last_updte_tsp && {
          sys_last_updte_tsp: data.sys_last_updte_tsp,
        }),
        ...(data.sys_crte_tsp && { sys_crte_tsp: data.sys_crte_tsp }),
        ...(data.sys_user && { sys_user: data.sys_user }),
        ...(data.role_id && { role_id: data.role_id }),
        ...(data.conf_id && { conf_id: data.conf_id }),
        ...(data.referer && { referer: data.referer }),
      };

      const query = db('user').update(tmpUsr);

      if (data.id) {
        query.where('id', data.id);
      }

      if (data.user_email) {
        query.where('user_email', data.user_email);
      }

      const rec = await query;

      return rec;
    } catch (error) {
      return error;
    }
  }

  //////////////////////////////////////////

  async getUser(data) {
    try {
      const query = db('user');

      if (data.id) {
        query.where('id', data.id);
      }

      if (data.user_email) {
        query.where('user_email', data.user_email);
      }

      const rec = await query;

      return rec;
    } catch (error) {
      return error;
    }
  }
}
