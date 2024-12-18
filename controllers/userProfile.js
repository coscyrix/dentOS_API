import UserProfileService from '../services/userProfile.js';
import joi from 'joi';

export default class UserProfileController {
  //////////////////////////////////////////////////////////
  async postUserProfile(req, res) {
    const data = req.body;

    const schema = joi.object({
      user_id: joi.number().required(),
      ethncty_id: joi.number().required(),
      user_typ_id: joi.number().default(1),
      user_first_name: joi.string().allow(null, ''),
      user_last_name: joi.string().allow(null, ''),
      user_phone_nbr: joi.string().allow(null, ''),
      DOB: joi.date().allow(null),
      addr_street1: joi.string().allow(null, ''),
      addr_street2: joi.string().allow(null, ''),
      zipcode: joi.string().allow(null, ''),
      city: joi.string().allow(null, ''),
      country: joi.string().allow(null, ''),
      state: joi.string().allow(null, ''),
      iso_cntry_id: joi.number().allow(null),
      addr_type_id: joi.number().default(1),
      user_allow_sms_yn: joi.string().default('Y'),
      user_allow_wup_sms_yn: joi.string().default('Y'),
      user_photo_1: joi.string().allow(null, ''),
      user_title_id: joi.number().allow(null),
      referer: joi.string().allow(null, ''),
      sys_active_yn: joi.string().default('Y'),
      sys_user_id: joi.number().allow(null),
    });

    const { error } = schema.validate(data);

    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const userProfileService = new UserProfileService();
    const rec = await userProfileService.postUserProfile(data);

    if (rec.error) {
      return res.status(400).send({ message: rec.message });
    }

    res.json(rec);
  }

  //////////////////////////////////////////////////////////

  async putUserProfile(req, res) {
    const data = req.body;

    const schema = joi.object({
      user_profile_id: joi.number().required(),
      ethncty_id: joi.number().optional(),
      user_typ_id: joi.number().default(1),
      user_first_name: joi.string().allow(null, ''),
      user_last_name: joi.string().allow(null, ''),
      user_phone_nbr: joi.string().allow(null, ''),
      DOB: joi.date().allow(null),
      addr_street1: joi.string().allow(null, ''),
      addr_street2: joi.string().allow(null, ''),
      zipcode: joi.string().allow(null, ''),
      city: joi.string().allow(null, ''),
      country: joi.string().allow(null, ''),
      state: joi.string().allow(null, ''),
      iso_cntry_id: joi.number().allow(null),
      addr_type_id: joi.number().default(1),
      user_allow_sms_yn: joi.string().default('Y'),
      user_allow_wup_sms_yn: joi.string().default('Y'),
      user_photo_1: joi.string().allow(null, ''),
      user_title_id: joi.number().allow(null),
      referer: joi.string().allow(null, ''),
      sys_active_yn: joi.string().default('Y'),
      sys_user_id: joi.number().allow(null),
    });

    const { error } = schema.validate(data);

    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const userProfileService = new UserProfileService();
    const rec = await userProfileService.putUserProfile(data);

    if (rec.error) {
      return res.status(400).send({ message: rec.message });
    }

    res.json(rec);
  }

  //////////////////////////////////////////////////////////

  async getUserProfile(req, res) {
    const data = req.query;

    const userProfileService = new UserProfileService();
    const rec = await userProfileService.getUserProfile(data);

    if (rec.error) {
      return res.status(400).send({ message: rec.message });
    }

    res.json(rec);
  }
}
