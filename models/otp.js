//models/otp.js

import DBconn from '../config/db.config.js';
import knex from 'knex';
import speakeasy from 'speakeasy';
import logger from '../config/winston.js';

const db = knex(DBconn.dbConn.development);

export default class Otp {
  //////////////////////////////////////////

  async generateOtp() {
    const otp = speakeasy.totp({
      secret: process.env.OTP_SECRET,
      encoding: 'base32',
    });
    return otp;
  }

  //////////////////////////////////////////////////////
  async postOtp(data) {
    try {
      const generatedOtp = await this.generateOtp();

      const otp = {
        email: data.email,
        otp: generatedOtp,
        expires_at: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
        should_del_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      };
      const rec = await db('otp_codes').insert(otp);

      return generatedOtp;
    } catch (error) {
      return error;
    }
  }
  //////////////////////////////////////////////////////
  async getLatestOtp(data) {
    try {
      const rec = await db('otp_codes')
        .where('email', data.email)
        .orderBy('id', 'desc')
        .limit(1);

      return rec;
    } catch (error) {
      return error;
    }
  }
  ////////////////////////////////////////////

  async invalidateOTPs(data) {
    try {
      const currentTime = new Date().toISOString();

      await db.transaction(async (trx) => {
        // Delete the OTP as used
        await trx
          .withSchema(`${process.env.MYSQL_DATABASE}`)
          .from('otp_codes')
          .where('email', data.email)
          .andWhere('otp', data.otp)
          .del();

        // Delete all otps for this email
        await trx
          .withSchema(`${process.env.MYSQL_DATABASE}`)
          .from('otp_codes')
          .where('email', data.email)
          .del();

        // Delete all expired OTPs
        await trx
          .withSchema(`${process.env.MYSQL_DATABASE}`)
          .from('otp_codes')
          .where('should_del_at', '<', currentTime)
          .del();
      });

      return { message: 'OTP verified successfully' };
    } catch (error) {
      logger.error('Error during OTP verification process:', error);
      return { message: 'Error during verification', error: -1 };
    }
  }
}
