const { users } = require("../models/userModel");

// Search profiles
function searchProfiles(req, res) {
  const { ageMin, ageMax, gender, religion, location, keyword } = req.query;

  const results = users.filter((u) => {
    if (!u.approved) return false;
    if (u.id == req.user.id) return false;

    const p = u.profile;

    if (ageMin && p.age && p.age < Number(ageMin)) return false;
    if (ageMax && p.age && p.age > Number(ageMax)) return false;
    if (gender && gender !== "" && p.gender !== gender) return false;
    if (religion && religion !== "" && p.religion !== religion) return false;
    if (
      location &&
      location !== "" &&
      !p.location.toLowerCase().includes(location.toLowerCase())
    )
      return false;
    if (keyword && keyword !== "") {
      const kw = keyword.toLowerCase();
      if (
        !(
          (p.name && p.name.toLowerCase().includes(kw)) ||
          (p.bio && p.bio.toLowerCase().includes(kw))
        )
      ) {
        return false;
      }
    }
    return true;
  });

  res.json(results.map((u) => ({ id: u.id, profile: u.profile })));
}

module.exports = { searchProfiles };
