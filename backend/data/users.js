// backend/data/users.js
import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'FillGuard Admin',
    email: 'fillguard.iot@gmail.com',
    password: bcrypt.hashSync('fillguardse31', 10),
    isAdmin: true,
  },
  {
    name: 'Isuru Dissanayake',
    email: 'dmisurumadhawa@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
  {
    name: 'Test User',
    email: 'test@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
];

export default users;