const { isAdminEmail } = require('./roles');

const verifyAdmin = async (req, res, next) => {
  try {
    if (!(await isAdminEmail(req.decoded?.email))) {
      return res.status(403).send({ message: 'Forbidden access: Admins only' });
    }
    next();
  } catch (error) {
    res.status(500).send({ message: 'Authorization check failed' });
  }
};

module.exports = verifyAdmin;