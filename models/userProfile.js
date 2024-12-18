import DBconn from '../config/db.config.js';
import knex from 'knex';

const db = knex(DBconn.dbConn.development);

export default class UserProfile {
  async postUserProfile(data) {
    try {
      const profile = {
        user_id: data.user_id,
        ethncty_id: data.ethncty_id,
        user_typ_id: data.user_typ_id,
        user_first_name: data.user_first_name
          ? data.user_first_name.toLowerCase()
          : null,
        user_last_name: data.user_last_name
          ? data.user_last_name.toLowerCase()
          : null,
        user_phone_nbr: data.user_phone_nbr,
        DOB: data.DOB,
        addr_street1: data.addr_street1
          ? data.addr_street1.toLowerCase()
          : null,
        addr_street2: data.addr_street2
          ? data.addr_street2.toLowerCase()
          : null,
        zipcode: data.zipcode,
        city: data.city,
        country: data.country,
        state: data.state,
        iso_cntry_id: data.iso_cntry_id,
        addr_type_id: data.addr_type_id,
        user_allow_sms_yn: data.user_allow_sms_yn,
        user_allow_wup_sms_yn: data.user_allow_wup_sms_yn,
        user_photo_1: data.user_photo_1,
        user_title_id: data.user_title_id,
        referer: data.referer,
        sys_active_yn: data.sys_active_yn,
        sys_user_id: data.sys_user_id,
      };

      const rec = await db('user_profile').insert(profile);

      return rec;
    } catch (error) {
      return { error, error: -1 };
    }
  }

  //////////////////////////////////////////
  async putUserProfile(data) {
    try {
      const profile = {
        ethncty_id: data.ethncty_id,
        user_typ_id: data.user_typ_id,
        user_first_name: data.user_first_name
          ? data.user_first_name.toLowerCase()
          : null,
        user_last_name: data.user_last_name
          ? data.user_last_name.toLowerCase()
          : null,
        user_phone_nbr: data.user_phone_nbr,
        DOB: data.DOB,
        addr_street1: data.addr_street1
          ? data.addr_street1.toLowerCase()
          : null,
        addr_street2: data.addr_street2
          ? data.addr_street2.toLowerCase()
          : null,
        zipcode: data.zipcode,
        city: data.city,
        country: data.country,
        state: data.state,
        iso_cntry_id: data.iso_cntry_id,
        addr_type_id: data.addr_type_id,
        user_allow_sms_yn: data.user_allow_sms_yn,
        user_allow_wup_sms_yn: data.user_allow_wup_sms_yn,
        user_photo_1: data.user_photo_1,
        user_title_id: data.user_title_id,
        referer: data.referer,
        sys_active_yn: data.sys_active_yn,
        sys_user_id: data.sys_user_id,
      };

      const rec = await db('user_profile')
        .where('user_profile_id', data.user_profile_id)
        .update(profile);

      return rec;
    } catch (error) {
      return error;
    }
  }

  //////////////////////////////////////////
  async getUserProfile(data) {
    try {
      const query = db('user_profile');

      if (data.user_profile_id) {
        query.where('user_profile_id', data.user_profile_id);
      }

      const rec = await query;

      return rec;
    } catch (error) {
      return error;
    }
  }
}
