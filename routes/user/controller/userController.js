const bcrypt = require("bcryptjs");
const User = require("../model/User");

function checkIsEmpty(target) {
  if (target.length === 0) {
    return true;
  } else {
    return false;
  }
}
async function signup(req, res) {
  const { username, email, password, firstName, lastName } = req.body;
  let errorObj = {};
  if (checkIsEmpty(username)) {
    errorObj.username = "Username cannot be empty";
  }
  if (checkIsEmpty(email)) {
    errorObj.email = "Email cannot be empty";
  }
  if (checkIsEmpty(password)) {
    errorObj.password = "Password cannot be empty";
  }
  if (checkIsEmpty(firstName)) {
    errorObj.firstName = "First Name cannot be empty";
  }
  if (checkIsEmpty(lastName)) {
    errorObj.lastName = "Last Name cannot be empty";
  }
  if (Object.keys(errorObj).length > 0) {
    return res.status(500).json({ message: "failure", payload: errorObj });
  }
  try {
    let salt = await bcrypt.genSalt(12);
    let hashedPassword = await bcrypt.hash(password, salt);
    const createdUser = new User({
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
    });
    let savedUser = await createdUser.save();
    res.json({ message: "success", data: savedUser });
  } catch (e) {
    console.log(e);
    console.log(e.message);
    res.json({ message: "error", error: e });
  }
}
module.exports = { signup };