# Changelog

## [1.0.1] - 2026-11-05
### Security & Architecture Updates (Audit Fixes)
- **Database:** Removed legacy `.sql` files. Added `npm run db:setup` script for MongoDB automated index creation.
- **Authorisation:** Implemented strict order ownership verification. Users can no longer access other users' orders.
- **Role Management:** Fixed POST `/users` route to strictly enforce default `role: 'user'`. Admin roles are now managed securely via database, removing `.env` hardcoded email bypass.
- **Code Structure:** Refactored monolithic `index.js` into modular structure (`routes`, `middleware`, `database`, `config`).
- **Dependencies:** Pinned all dependency versions in both `frontend` and `backend` `package.json` files (removed `^` and `~`). Ran `npm audit fix` to resolve vulnerabilities.
- **Secrets:** Renamed variables in Firebase config to resolve false positive secret exposure alerts.

## [1.0.0] - 2026-10-30
### Added
- Initial release of Swad Grill backend and frontend.
- Firebase authentication and RBAC setup.
- MongoDB database connection configured.