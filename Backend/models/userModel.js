const users = [];
let userIdCounter = 1;

class User {
  constructor({ email, mobile, passwordHash, role = "user" }) {
    this.id = userIdCounter++;
    this.email = email;
    this.mobile = mobile;
    this.passwordHash = passwordHash;
    this.role = role;
    this.approved = false;
    this.profile = {
      name: "",
      age: null,
      gender: "",
      location: "",
      religion: "",
      bio: "",
      photoUrl: "",
    };
  }
}

module.exports = {
  users,
  User,
};
