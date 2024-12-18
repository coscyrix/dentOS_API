import BenefitsService from '../services/benefits.js';
import joi from 'joi';

export default class BenefitsController {
  //////////////////////////////////////////////////////////
  async postBenefits(req, res) {
    const data = req.body;

    console.log(data);

    const schema = joi.object({
      ben_name: joi.string().required(),
      ben_description: joi.string().optional(),
      svc_active_yn: joi.string().default('Y'),
      sys_user_id: joi.number().allow(null),
    });

    const { error } = schema.validate(data);

    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const benefitsService = new BenefitsService();
    const rec = await benefitsService.postBenefits(data);

    if (rec.error) {
      return res.status(400).send({ message: rec.message, error: -1 });
    }

    res.json(rec);
  }

  //////////////////////////////////////////////////////////

  async putBenefits(req, res) {
    const data = req.body;

    const schema = joi.object({
      ben_id: joi.number().required(),
      ben_name: joi.string().optional(),
      ben_description: joi.string().allow(null, '').optional(),
      svc_active_yn: joi.string().valid('Y', 'N').optional(),
      sys_user_id: joi.number().allow(null).optional(),
    });

    const { error } = schema.validate(data);

    if (error) {
      return res
        .status(400)
        .send({ message: error.details[0].message, error: -1 });
    }

    const benefitsService = new BenefitsService();
    const rec = await benefitsService.putBenefits(data);

    if (rec.error) {
      return res.status(400).send({ message: rec.message });
    }

    res.json(rec);
  }

  //////////////////////////////////////////////////////////

  async getBenefits(req, res) {
    const data = req.query;

    const benefitsService = new BenefitsService();
    const rec = await benefitsService.getBenefits(data);

    if (rec.error) {
      return res.status(400).send({ message: rec.message, error: -1 });
    }

    res.json(rec);
  }
}
