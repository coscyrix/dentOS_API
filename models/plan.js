import DBconn from '../config/db.config.js';
import knex from 'knex';

const db = knex(DBconn.dbConn.development);

export default class Plan {
  async postPlan(data) {
    try {
      const plan = {
        ...(data.plan_name && { plan_name: data.plan_name.toLowerCase() }),
        ...(data.plan_desc && { plan_desc: data.plan_desc.toLowerCase() }),
        ...(data.plan_type_id && { plan_type_id: data.plan_type_id }),
        ...(data.plan_price_type_id && {
          plan_price_type_id: data.plan_price_type_id,
        }),
        ...(data.plan_tracking_type_id && {
          plan_tracking_type_id: data.plan_tracking_type_id,
        }),
        ...(data.plan_rule_xref_id && {
          plan_rule_xref_id: data.plan_rule_xref_id,
        }),
        ...(data.plan_min_members && {
          plan_min_members: data.plan_min_members,
        }),
        ...(data.plan_max_members && {
          plan_max_members: data.plan_max_members,
        }),
        ...(data.plan_benefit_xref_id && {
          plan_benefit_xref_id: data.plan_benefit_xref_id,
        }),
        ...(data.plan_setup_fees && { plan_setup_fees: data.plan_setup_fees }),
        ...(data.plan_benefits && {
          plan_benefits: data.plan_benefits.toLowerCase(),
        }),
        ...(data.plan_rules && { plan_rules: data.plan_rules.toLowerCase() }),
        ...(data.sys_active_yn && { sys_active_yn: data.sys_active_yn }),
        ...(data.sys_user_id && { sys_user_id: data.sys_user_id }),
      };

      const rec = await db('plan').insert(plan);

      return rec;
    } catch (error) {
      return error;
    }
  }

  //////////////////////////////////////////
  async putPlan(data) {
    try {
      const plan = {
        ...(data.plan_name && { plan_name: data.plan_name.toLowerCase() }),
        ...(data.plan_desc && { plan_desc: data.plan_desc.toLowerCase() }),
        ...(data.plan_type_id && { plan_type_id: data.plan_type_id }),
        ...(data.plan_price_type_id && {
          plan_price_type_id: data.plan_price_type_id,
        }),
        ...(data.plan_tracking_type_id && {
          plan_tracking_type_id: data.plan_tracking_type_id,
        }),
        ...(data.plan_rule_xref_id && {
          plan_rule_xref_id: data.plan_rule_xref_id,
        }),
        ...(data.plan_min_members && {
          plan_min_members: data.plan_min_members,
        }),
        ...(data.plan_max_members && {
          plan_max_members: data.plan_max_members,
        }),
        ...(data.plan_benefit_xref_id && {
          plan_benefit_xref_id: data.plan_benefit_xref_id,
        }),
        ...(data.plan_setup_fees && { plan_setup_fees: data.plan_setup_fees }),
        ...(data.plan_benefits && {
          plan_benefits: data.plan_benefits.toLowerCase(),
        }),
        ...(data.plan_rules && { plan_rules: data.plan_rules.toLowerCase() }),
        ...(data.sys_active_yn && { sys_active_yn: data.sys_active_yn }),
        ...(data.sys_user_id && { sys_user_id: data.sys_user_id }),
      };

      const rec = await db('plan').where('plan_id', data.plan_id).update(plan);

      return rec;
    } catch (error) {
      return error;
    }
  }

  //////////////////////////////////////////
  async getPlan(data) {
    try {
      const query = db('plan');

      if (data.plan_id) {
        query.where('plan_id', data.plan_id);
      }

      const rec = await query;

      return rec;
    } catch (error) {
      return error;
    }
  }
}
