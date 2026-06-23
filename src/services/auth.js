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
  localStorage.setItem('loggedInUser', JSON.stringify({ name: user.name, email: user.email }));
  return { success: true };
}

export function logout() {
  localStorage.removeItem('loggedInUser');
}
