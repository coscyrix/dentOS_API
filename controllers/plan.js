import PlanService from '../services/plan.js';
import joi from 'joi';

export default class PlanController {
  //////////////////////////////////////////////////////////
  async postPlan(req, res) {
    const data = req.body;

    const schema = joi.object({
      plan_name: joi.string().required(),
      plan_desc: joi.string().allow(null, ''),
      plan_type_id: joi.number().required(),
      plan_price_type_id: joi.number().required(),
      plan_tracking_type_id: joi.number().required(),
      plan_rule_xref_id: joi.number().required(),
      plan_min_members: joi.number().required(),
      plan_max_members: joi.number().required(),
      plan_benefit_xref_id: joi.number().required(),
      plan_setup_fees: joi.number().required(),
      plan_benefits: joi.string().allow(null, ''),
      plan_rules: joi.string().allow(null, ''),
      sys_active_yn: joi.string().default('Y'),
      sys_user_id: joi.number().allow(null),
    });

    const { error } = schema.validate(data);

    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const planService = new PlanService();
    const rec = await planService.postPlan(data);

    if (rec.error) {
      return res.status(400).send({ message: rec.message });
    }

    res.json(rec);
  }

  //////////////////////////////////////////////////////////

  async putPlan(req, res) {
    const data = req.body;

    const schema = joi.object({
      plan_id: joi.number().required(),
      plan_name: joi.string().optional(),
      plan_desc: joi.string().allow(null, '').optional(),
      plan_type_id: joi.number().optional(),
      plan_price_type_id: joi.number().optional(),
      plan_tracking_type_id: joi.number().optional(),
      plan_rule_xref_id: joi.number().optional(),
      plan_min_members: joi.number().optional(),
      plan_max_members: joi.number().optional(),
      plan_benefit_xref_id: joi.number().optional(),
      plan_setup_fees: joi.number().optional(),
      plan_benefits: joi.string().allow(null, '').optional(),
      plan_rules: joi.string().allow(null, '').optional(),
      sys_active_yn: joi.string().valid('Y', 'N').optional(),
      sys_user_id: joi.number().allow(null).optional(),
    });

    const { error } = schema.validate(data);

    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const planService = new PlanService();
    const rec = await planService.putPlan(data);

    if (rec.error) {
      return res.status(400).send({ message: rec.message });
    }

    res.json(rec);
  }

  //////////////////////////////////////////////////////////

  async getPlan(req, res) {
    const data = req.query;

    const planService = new PlanService();
    const rec = await planService.getPlan(data);

    if (rec.error) {
      return res.status(400).send({ message: rec.message });
    }

    res.json(rec);
  }
}
