import Cookies from 'universal-cookie';

/**
 * Logout the User
 */
export default function logout() {
  /* Logout Action */
  const cookies = new Cookies();

  // remove cookie token
  cookies.remove('token');

  // redirect to the home page
  window.location.href = '/';
}
