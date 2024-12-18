import AuthService from '../services/auth/auth.js';
import joi from 'joi';

export default class AuthController {
  //////////////////////////////////////////////////
  async signUp(req, res) {
    const data = req.body;

    const schema = joi.object({
      user_email: joi.string().email().required(),
      password: joi.string().required().min(8),
      user_first_name: joi.string().required(),
      user_last_name: joi.string().required(),
      // user_access_key: joi.string().required(),
      role_id: joi.number().optional(),
      conf_id: joi.number().optional(),
      referer: joi.string().allow(null),
    });

    const { error } = schema.validate(data);

    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const authService = new AuthService();
    const rec = await authService.signUp(data);

    if (rec.error) {
      return res.status(400).send({ message: rec.message });
    }

    res.json(rec);
  }

  //////////////////////////////////////////////////
  async signIn(req, res) {
    const data = req.body;

    const schema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().required(),
    });

    const { error } = schema.validate(data);

    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const authService = new AuthService();
    const rec = await authService.signIn(data);
    if (rec.error) {
      return res.status(400).send({ message: rec.message });
    }

    res.json(rec);
  }

  //////////////////////////////////////////////////

  async forgetPassword(req, res) {
    const data = req.body;

    const schema = joi.object({
      user_email: joi.string().email().required(),
    });

    const { error } = schema.validate(data);

    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const authService = new AuthService();
    const rec = await authService.forgetPassword(data);

    if (rec.error) {
      return res.status(400).send({ message: rec.message });
    }

    res.json(rec);
  }

  //////////////////////////////////////////////////

  async changePassword(req, res) {
    const data = req.body;

    const schema = joi.object({
      user_email: joi.string().email().required(),
      password: joi.string().required(),
      new_password: joi.string().required().min(8),
    });

    const { error } = schema.validate(data);

    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    if (data.password === data.new_password) {
      return res
        .status(400)
        .send({ message: 'New password cannot be same as old password' });
    }

    const authService = new AuthService();
    const rec = await authService.changePassword(data);

    if (rec.error) {
      return res.status(400).send({ message: rec.message });
    }

    res.json(rec);
  }

  //////////////////////////////////////////////////

  async resendOtp(req, res) {
    const data = req.body;

    const schema = joi.object({
      user_email: joi.string().email().required(),
    });

    const { error } = schema.validate(data);

    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const authService = new AuthService();
    const rec = await authService.resendOtp(data);

    if (rec.error) {
      return res.status(400).send({ message: rec.message });
    }

    res.json(rec);
  }

  //////////////////////////////////////////////////

  async verifyOtp(req, res) {
    const data = req.body;

    const schema = joi.object({
      user_email: joi.string().email().required(),
      otp: joi
        .string()
        .length(6)
        .pattern(/^[0-9]{6}$/)
        .required(),
    });

    const { error } = schema.validate(data);

    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const authService = new AuthService();
    const rec = await authService.verifyOtp(data);

    if (rec.error) {
      return res.status(400).send({ message: rec.message });
    }

    res.json(rec);
  }
}
