import UserProfile from '../models/userProfile.js';

export default class UserProfileService {
  async postUserProfile(data) {
    const userProfile = new UserProfile();
    return userProfile.postUserProfile(data);
  }

  async putUserProfile(data) {
    const userProfile = new UserProfile();
    const updatedUserProfile = userProfile.putUserProfile(data);
    if (updatedUserProfile.error) {
      return { message: 'Error updating user profile', error: -1 };
    }

    if (updatedUserProfile) {
      return { message: 'User profile updated successfully' };
    }
  }

  async getUserProfile(data) {
    const userProfile = new UserProfile();
    return userProfile.getUserProfile(data);
  }
}
