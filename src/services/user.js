const User = require("../models/user");

const create = async data => {
  const user = new User(data);

  try {
    await user.save();
    return { user };
  } catch (error) {
    throw error;
  }
};

const login = async (email, password) => {
  try {
    const userInstance = await User.findByCredentials(email, password);
    const token = await userInstance.generateWebToken();

    return {
      userInstance,
      token
    };
  } catch (error) {
    throw error;
  }
};

const logout = async user => {
  try {
    console.log(user);
    user.tokens = [];
    await user.save();
    return "you are logout now";
  } catch (error) {
    throw error;
  }
};

module.exports = {
  create,
  login,
  logout
};
