const { getDb } = require('../database/db');

const ADMIN_ROLES = ['main_admin', 'sub_admin'];

const isAdminEmail = async (email) => {
  if (!email) return false;
  const user = await getDb().collection('users').findOne({ email: String(email) });
  return ADMIN_ROLES.includes(user?.role);
};

module.exports = { isAdminEmail, ADMIN_ROLES };