function getUsers() {
  try {
    return JSON.parse(localStorage.getItem('users')) || [];
  } catch {
    return [];
  }
}

export function getLoggedInUser() {
  try {
    return JSON.parse(localStorage.getItem('loggedInUser')) || null;
  } catch {
    return null;
  }
}

export function signup({ name, email, password }) {
  const users = getUsers();
  if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
    return { success: false, error: 'This email is already registered.' };
  }
  users.push({ name, email, password });
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('loggedInUser', JSON.stringify({ name, email }));
  return { success: true };
}

export function login({ email, password }) {
  const users = getUsers();
  const user = users.find(
    u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  if (!user) return { success: false, error: 'Invalid email or password.' };
  const { password: _, ...safeUser } = user;
  localStorage.setItem('loggedInUser', JSON.stringify(safeUser));
  return { success: true };
}

export function logout() {
  localStorage.removeItem('loggedInUser');
}

export function updateUser({ name, email, phone, bio, location }) {
  const users = getUsers();
  const loggedIn = getLoggedInUser();
  if (!loggedIn) return { success: false, error: 'Not logged in.' };

  const idx = users.findIndex(u => u.email.toLowerCase() === loggedIn.email.toLowerCase());
  if (idx === -1) return { success: false, error: 'User not found.' };

  users[idx] = { ...users[idx], name, email, phone: phone || '', bio: bio || '', location: location || '' };
  localStorage.setItem('users', JSON.stringify(users));

  const updated = { ...loggedIn, name, email, phone: phone || '', bio: bio || '', location: location || '' };
  localStorage.setItem('loggedInUser', JSON.stringify(updated));
  return { success: true, user: updated };
}

export function updateAvatar(avatarDataUrl) {
  const users = getUsers();
  const loggedIn = getLoggedInUser();
  if (!loggedIn) return { success: false };

  const idx = users.findIndex(u => u.email.toLowerCase() === loggedIn.email.toLowerCase());
  if (idx === -1) return { success: false };

  users[idx] = { ...users[idx], avatar: avatarDataUrl };
  localStorage.setItem('users', JSON.stringify(users));

  const updated = { ...loggedIn, avatar: avatarDataUrl };
  localStorage.setItem('loggedInUser', JSON.stringify(updated));
  return { success: true, user: updated };
}
