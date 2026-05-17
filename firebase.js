/* =========================================================
   firebase.js — Firebase Realtime Database REST API wrapper
   + Global AppState for current logged-in user
   ========================================================= */

/* ---------- App State (global) ---------- */
const AppState = {
  currentUser: null,   // { email, role, name, phone, key }
  isLoggedIn() { return !!this.currentUser; },
  isEngineer() { return this.currentUser && (this.currentUser.role === 'engineer' || this.currentUser.role === 'admin'); },
  isAdmin()    { return this.currentUser && this.currentUser.role === 'admin'; },
};

/* ---------- Firebase RTDB REST helpers ---------- */
const FirebaseDB = (() => {
  const BASE = 'https://telecom-7d314-default-rtdb.asia-southeast1.firebasedatabase.app';

  async function get(path) {
    try {
      const res = await fetch(`${BASE}/${path}.json`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    } catch (e) {
      console.error('FirebaseDB.get error:', e);
      return null;
    }
  }

  async function set(path, data) {
    try {
      const res = await fetch(`${BASE}/${path}.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    } catch (e) {
      console.error('FirebaseDB.set error:', e);
      return null;
    }
  }

  async function patch(path, data) {
    try {
      const res = await fetch(`${BASE}/${path}.json`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    } catch (e) {
      console.error('FirebaseDB.patch error:', e);
      return null;
    }
  }

  async function push(path, data) {
    try {
      const res = await fetch(`${BASE}/${path}.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    } catch (e) {
      console.error('FirebaseDB.push error:', e);
      return null;
    }
  }

  return { get, set, patch, push };
})();

/* ---------- User DB helpers ---------- */
const UserDB = (() => {

  /** Convert email to a safe Firebase key */
  function emailToKey(email) {
    return email.toLowerCase().replace(/\./g, '_dot_').replace(/@/g, '_at_');
  }

  /** Seed default users if the /users node is empty */
  async function seedDefaultUsers() {
    const existing = await FirebaseDB.get('users');
    if (existing) return; // already seeded

    const defaults = [
      { email: 'admin@telecom.com',    password: 'admin123',  role: 'admin',    name: 'Admin',            phone: '' },
      { email: 'engineer@telecom.com', password: 'eng123',    role: 'engineer', name: 'Network Engineer', phone: '' },
      { email: 'viewer@telecom.com',   password: 'view123',   role: 'viewer',   name: 'Viewer',           phone: '' },
    ];

    for (const u of defaults) {
      const key = emailToKey(u.email);
      await FirebaseDB.set(`users/${key}`, {
        ...u,
        createdAt: new Date().toISOString(),
        lastLogin: null,
      });
    }
    console.log('[UserDB] Default users seeded.');
  }

  /** Verify login credentials. Returns user object or null. */
  async function verifyLogin(email, password) {
    const key = emailToKey(email);
    const user = await FirebaseDB.get(`users/${key}`);
    if (!user) return null;
    if (user.password !== password) return null;
    return { ...user, key };
  }

  /** Record a successful login (lastLogin timestamp) */
  async function recordLogin(key) {
    await FirebaseDB.patch(`users/${key}`, {
      lastLogin: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    });
  }

  /** Save phone number for a user */
  async function savePhone(key, phone) {
    await FirebaseDB.patch(`users/${key}`, { phone });
  }

  /** Create a new user (from settings page) */
  async function createUser(userData) {
    const key = emailToKey(userData.email);
    await FirebaseDB.set(`users/${key}`, {
      ...userData,
      createdAt: new Date().toISOString(),
      lastLogin: null,
      phone: '',
    });
  }

  return { emailToKey, seedDefaultUsers, verifyLogin, recordLogin, savePhone, createUser };
})();
