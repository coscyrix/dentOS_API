import User from '../../models/user.js';
import logger from '../../config/winston.js';
import {
  hashPassword,
  comparePassword,
  generatePassword,
} from './authCommon.js';
import { generateAccessToken } from '../../middlewares/token.js';
import {
  otpEmail,
  welcomeEmail,
  forgetPasswordEmail,
  changePasswordEmail,
} from '../../utils/emailTmplt.js';
import SendEmail from '../../middlewares/sendEmail.js';
import Otp from '../../models/otp.js';

export default class AuthService {
  constructor() {
    this.user = new User();
    this.otp = new Otp();
    this.sendEmail = new SendEmail();
  }

  ////////////////////////////////////////////

  async signUp(data) {
    const checkUser = await this.user.getUser({ user_email: data.user_email });

    if (checkUser.length > 0) {
      logger.warn(`User already exists`);
      return { message: 'User already exists', error: -1 };
    }

    const hashedPassword = await hashPassword(data.password);
    const userData = { ...data, user_password: hashedPassword };

    const rec = await this.user.postUser(userData);

    if (!rec) {
      logger.warn(`Failed to save user`);
      return { message: 'Failed to save user', error: -1 };
    }

    const otp = await this.otp.postOtp({ email: data.user_email });

    if (!otp) {
      logger.warn(`Failed to save OTP`);
      return { message: 'Failed to save OTP', error: -1 };
    }

    const emailOTP = otpEmail(data.user_email, otp);
    const welcEmail = welcomeEmail(data.user_email);
    const sendWelcome = this.sendEmail.sendMail(welcEmail);
    const sendOTP = this.sendEmail.sendMail(emailOTP);

    return {
      message:
        'User created successfully. An OTP was sent to your email verify your account.',
    };
  }

  ////////////////////////////////////////////

  async signIn(data) {
    const userRecord = await this.user.getUser({ user_email: data.email });

    if (userRecord.length === 0) {
      logger.warn(`User not found`);
      return { message: 'User not found', error: -1 };
    }

    if (userRecord[0].user_active_yn === 'N') {
      logger.warn(`User account is Inactive`);
      return {
        message: 'User account is Inactive. Please contact administrator',
        error: -1,
      };
    }

    const hash = await comparePassword(
      data.password,
      userRecord[0].user_password,
    );

    delete userRecord[0].user_password;
    delete userRecord[0].user_access_key;
    delete userRecord[0].user_conf_dte;
    delete userRecord[0].user_deactivate_dte;
    delete userRecord[0].sys_last_updte_tsp;
    delete userRecord[0].sys_crte_tsp;
    delete userRecord[0].user_active_yn;
    delete userRecord[0].sys_user;

    if (!hash) {
      logger.warn(`Invalid password`);
      return { message: 'Invalid password', error: -1 };
    }
    if (hash) {
      const token = generateAccessToken({ email: userRecord[0].user_email });
      logger.info(`User signed in successfully`);
      return {
        user: userRecord[0],
        token,
        message: 'User signed in successfully',
      };
    }
  }

  ////////////////////////////////////////////

  async forgetPassword(data) {
    const userRecord = await this.user.getUser({ user_email: data.user_email });

    if (userRecord.length === 0) {
      logger.warn(`User not found`);
      return { message: 'User not found', error: -1 };
    }

    if (userRecord[0].user_active_yn === 'N') {
      logger.warn(`User account is Inactive`);
      return {
        message: 'User account is Inactive. Please contact administrator',
        error: -1,
      };
    }

    const newPassword = await generatePassword();
    const hashedPassword = await hashPassword(newPassword);

    const updatePassword = await this.user.putUser({
      user_email: data.user_email,
      user_password: hashedPassword,
      user_active_yn: 'N',
    });

    if (!updatePassword) {
      logger.warn(`Failed to update password`);
      return { message: 'Failed to update password', error: -1 };
    }

    const otp = await this.otp.postOtp({ email: data.user_email });

    if (!otp) {
      logger.warn(`Failed to save OTP`);
      return { message: 'Failed to save OTP', error: -1 };
    }

    const emailOTP = otpEmail(data.user_email, otp);
    const emailForget = forgetPasswordEmail(data.user_email, newPassword);
    const sendOTP = this.sendEmail.sendMail(emailOTP);
    const sendForget = this.sendEmail.sendMail(emailForget);

    return {
      message: 'An OTP was sent to your email to reset your password',
    };
  }

  ////////////////////////////////////////////

  async changePassword(data) {
    const userRecord = await this.user.getUser({ user_email: data.user_email });

    if (userRecord.length === 0) {
      logger.warn(`User not found`);
      return { message: 'User not found', error: -1 };
    }

    if (userRecord[0].user_active_yn === 'N') {
      logger.warn(`User account is Inactive`);
      return {
        message: 'User account is Inactive. Please contact administrator',
        error: -1,
      };
    }

    const hash = await comparePassword(
      data.password,
      userRecord[0].user_password,
    );

    console.log(hash);

    if (!hash) {
      logger.warn(`Invalid password`);
      return { message: 'Invalid password', error: -1 };
    }

    const hashedPassword = await hashPassword(data.new_password);

    const updatePassword = await this.user.putUser({
      user_email: data.user_email,
      user_password: hashedPassword,
    });

    if (!updatePassword) {
      logger.warn(`Failed to update password`);
      return { message: 'Failed to update password', error: -1 };
    }

    const emailChange = changePasswordEmail(data.user_email);
    const sendChange = this.sendEmail.sendMail(emailChange);

    return { message: 'Password changed successfully' };
  }

  ////////////////////////////////////////////

  async resendOtp(data) {
    const userRecord = await this.user.getUser({ user_email: data.user_email });

    if (userRecord.length === 0) {
      logger.warn(`User not found`);
      return { message: 'User not found', error: -1 };
    }

    if (userRecord[0].user_active_yn === 'Y') {
      logger.warn(`User account is already active`);
      return { message: 'User account is already active', error: -1 };
    }

    const otp = await this.otp.postOtp({ email: data.user_email });

    if (!otp) {
      logger.warn(`Failed to save OTP`);
      return { message: 'Failed to save OTP', error: -1 };
    }

    const emailOTP = otpEmail(data.user_email, otp);
    const sendOTP = this.sendEmail.sendMail(emailOTP);

    return { message: 'An OTP was sent to your email to verify your account' };
  }

  ////////////////////////////////////////////

  async verifyOtp(data) {
    try {
      const userRecord = await this.user.getUser({
        user_email: data.user_email,
      });

      if (userRecord.length === 0) {
        logger.warn(`User not found`);
        return { message: 'User not found', error: -1 };
      }

      if (userRecord[0].user_active_yn === 'Y') {
        logger.warn(`User account is already active`);
        return { message: 'User account is already active', error: -1 };
      }

      const otpRecord = await this.otp.getLatestOtp({ email: data.user_email });

      data.otp = parseInt(data.otp);

      if (otpRecord.length === 0) {
        logger.warn(`No OTP found for this account`);
        return { message: 'No OTP found for this account', error: -1 };
      }

      const currentTime = new Date().toISOString();
      const expiresAt = new Date(otpRecord[0].expires_at).toISOString();

      if (expiresAt < currentTime) {
        logger.warn('OTP has expired');
        return { message: 'OTP has expired', error: -1 };
      }

      if (otpRecord[0].otp !== data.otp) {
        logger.warn(`Incorrect OTP`);
        return { message: 'Incorrect OTP', error: -1 };
      }

      const updatePassword = await this.user.putUser({
        user_email: data.user_email,
        user_active_yn: 'Y',
      });

      if (!updatePassword) {
        logger.warn(`Failed to update password`);
        return { message: 'Failed to update password', error: -1 };
      }

      await this.otp.invalidateOTPs({
        email: data.user_email,
        otp: data.otp,
      });

      return { message: 'Account verified successfully' };
    } catch (error) {
      logger.error(`Error verifying OTP: ${error.message}`);
      return { message: 'Error verifying OTP', error: -1 };
    }
  }
}
