const jwt = require('jsonwebtoken');
const config = require('../../config');

class Auth {
  static sign(ctx, info) {
    const token = jwt.sign(
      {
        username: info.username,
        _id: info._id,
      },
      config.secret,
      { expiresIn: 60 * 120 } //Eg: 60, "2 days", "10h", "7d",文档默认单位ms,实测中发现应该是s, why ?
    );
    return token;
  }

  static verify(ctx, decodedToken, token) {
    let ret = true;
    try {
      const decoded = jwt.verify(token, config.secret);
      ret = false;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Auth;
