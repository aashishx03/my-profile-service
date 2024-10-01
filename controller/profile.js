const bcrypt = require("bcrypt");
const dotenv = require("dotenv").config();

const getHealth = (_, res) => {
  res.status(200).json({
    msg: "Server is Up and Running",
  });
};

const getProfile = (req, res) => {
  try {
    let token = req.headers.authorization;
    if (!token) res.status(403).json({ msg: "Invalid Token" });
    const hash = token[1];
    if (bcrypt.compareSync(process.env.CHAIN_CODE, hash)) {
    } else {
      res.status(401).json({ msg: "Invalid Hash" });
    }
    res.status(200).send(
      JSON.stringify({
        first_name: process.env.FIRST_NAME,
        last_name: process.env.LAST_NAME,
        email: process.env.EMAIL,
        phone: process.env.PHONE,
        yoe: parseInt(process.env.YOE),
        company: process.env.COMPANY,
        designation: process.env.DESIGNATION,
        github_id: process.env.GITHUB_ID,
        linkedin_id: process.env.LINKEDIN_ID,
        twitter_id: process.env.TWITTER_ID,
        instagram_id: process.env.INSTAGRAM_ID,
        website: process.env.WEBSITE,
      })
    );
  } catch (err) {
    console.error(`Error While geting profile data : ${err}`);
    res.status(500).send("Error Getting Profile Data");
  }
};

const verification = (req, res) => {
  if (!req.body.salt) res.status(404).send("Salt Not found");

  try {
    const cryptingToken = req.body.salt;
    const hash = sha512(cryptingToken + process.env.CHAIN_CODE);
    res.send(
      JSON.stringify({
        hash: hash,
      })
    );
  } catch (err) {
    console.error(`Error while verification: ${err}`);
    return res.status(500).send("Error while encryption");
  }
};

module.exports = {
  getHealth,
  getProfile,
  verification,
};
