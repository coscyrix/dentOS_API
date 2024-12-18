//controllers/user.js

import UserService from "../services/user.js";
import joi from "joi";

//////////////////////////////////////////

export default class UserController {
  async postUser(req, res) {
    const data = req.body;

    const schema = joi.object({
      user_email: joi.string().email().required(),
      user_first_name: joi.string().required(),
      user_last_name: joi.string().required(),
      user_password: joi.string().required(),
      user_access_key: joi.string().required(),
      role_id: joi.number().required(),
      referer: joi.string().required(),
      conf_id: joi.number().required(),
    });

    const { error } = schema.validate(data);

    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const user = new UserService();
    const rec = await user.postUser(data);

    if (rec.error) {
      return res.status(400).send({ message: rec.message });
    }

    res.json(rec);
  }

  //////////////////////////////////////////

  async putUser(req, res) {
    const data = req.body;

    const schema = joi.object({
      user_email: joi.string().email().required(),
      user_first_name: joi.string().required(),
      user_last_name: joi.string().required(),
      user_access_key: joi.string().required(),
      user_password: joi.string().required(),
      svc_provider_yn: joi.string().required(),
      user_conf_dte: joi.date().required(),
      user_deactivate_dte: joi.date().required(),
      user_active_yn: joi.string().required(),
      sys_last_updte_tsp: joi.date().required(),
      sys_crte_tsp: joi.date().required(),
      sys_user: joi.string().required(),
      role_id: joi.string().required(),
      conf_id: joi.string().required(),
      referer: joi.string().required(),
    });

    const { error } = schema.validate(data);

    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const user = new UserService();
    const rec = await user.putUser(data);

    if (rec.error) {
      return res.status(400).send({ message: rec.message });
    }

    res.json(rec);
  }

  //////////////////////////////////////////

  async getUser(req, res) {
    const data = req.query;

    const user = new UserService();
    const rec = await user.getUser(data);

    if (rec.error) {
      return res.status(400).send({ message: rec.message });
    }

    res.json(rec);
  }
}
