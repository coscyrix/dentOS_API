//services/user.js

import User from "../models/user.js";
import UserProfile from "../controllers/userProfile.js";

//////////////////////////////////////////

export default class UserService {
  async postUser(data) {
    const user = new User();
    return user.postUser(data);
  }

  async getUser(data) {
    const user = new User();
    return user.getUser(data);
  }

  async putUser(data) {
    const user = new User();
    return user.putUser(data);
  }
}
