module.exports = {
  connectUrl: 'mongodb://127.0.0.1:27017/jwtdemo',
  port: 3000,
  baseApi: 'api',
  secret: 'jwt_secret',
  unless_path: [/\/api\/index/, /\/api\/register/, /\/api\/login/],
};
