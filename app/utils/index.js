import request from 'axios';

const win = window || { location: { hostname: '' } };
export const ENV = process.env.NODE_ENV || 'development';
export const BACKEND_URL =  process.env.BACKEND_URL || 'http://staging-backend.gamesmith.com';
export const FRONTEND_URI = process.env.FRONTEND_URI || 'http%3A%2F%2Fdevstagingui.gamesmith.com';
export const FORUM_URL = 'http://forum.gamesmith.com';
export const BASE_FORUM_URL = 'http://forum.gamesmith.com';
const TOKEN = 'authToken';
const USER = 'userData';
const URL = 'redirectTo';

/*
 * Utility function to make AJAX requests using isomorphic fetch.
 * @method String HTTP method, e.g. post, get, put, delete
 * @data Object Data you wish to pass to the server
 * @api String endpoint
 * @return Promise
 */

export function makeRequest(method, data, api, headers = {}) {
  return request({
    url: `${BACKEND_URL}/api/${api}`,
    method,
    data,
    headers,
  });
}

// user info handlers
export function getUserData() {
  return JSON.parse(localStorage.getItem(USER));
}
export function setUserData(userData) {
  localStorage.setItem(USER, JSON.stringify(userData));
}

export function removeUserData() {
  localStorage.removeItem(USER);
}

// view profile url handler
export function getReturnUrl() {
  return JSON.parse(localStorage.getItem(URL));
}
export function setReturnUrl(returnUrl) {
  localStorage.setItem(URL, JSON.stringify(returnUrl));
}

export function removeReturnUrl() {
  localStorage.removeItem(URL);
}

// auth token handlers
export function getAuthToken() {
  return JSON.parse(localStorage.getItem(TOKEN));
}
export function setAuthToken(token) {
  localStorage.setItem(TOKEN, JSON.stringify(token));
}
export function checkAuthToken() {
  const token = getAuthToken();
  // returns false if token is expired
  return token ? new Date(token.expiresOn).toISOString() > new Date().toISOString() : false;
}
export function removeAuthToken() {
  localStorage.removeItem(TOKEN);
  const req = makeRequest('GET', {}, 'forumLogout', {
    'Content-Type' : 'application/x-www-form-urlencoded',
    'X-Auth-Token' : getAuthToken()
  });
}

export function checkUrlAvailabilty(url){
  return true;
  // var xhttp = new XMLHttpRequest();
  //
  // xhttp.onreadystatechange = function() {
  //   if (this.readyState == 4) {
  //     if(this.status == 200){
  //       return true
  //     }else{
  //       return false
  //     }
  //   }
  // };
  //
  // xhttp.open("GET", url, false);
  // xhttp.send();

  // xhttp.open("GET", "http://forum.gamesmith.com:3000", false);
  // xhttp.setRequestHeader('HOST','http://www.gamesmith.com');

}

// function for making Linkedin oauth popup windows
export function linkedinAuth(state) {
  console.log(FRONTEND_URI);
  const w = 475;
  const h = 550;
  const y = (window.outerHeight / 2) + (window.screenY - (h / 2));
  const x = (window.outerWidth / 2) + (window.screenX - (w / 2));
  return window.open(`https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=75d5ul44bm0rac&redirect_uri=${FRONTEND_URI}%2Flinkedin&state=${state}&scope=r_basicprofile%20r_emailaddress`, 'Linkedin Authentication', `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`);
}

export function requireAuth(callback) {
  return (nextState, replace) => {
    // require the auth and user data to be set
    if (!getAuthToken() || !getUserData()) {
      removeAuthToken();
      removeUserData();
      replace('/?login');
    } else if (!checkAuthToken()) {
      removeAuthToken();
      removeUserData();
      replace('/?unauthorized');
    }
    if (callback) callback();
  };
}

export function redirectAuth(callback) {
  return (nextState, replace) => {
    // redirect if user is logged in
    if (checkAuthToken() && getUserData()) {
      replace('/');
    }
    if (callback) callback();
  };
}

export function redirectAuthSSO(callback) {
  return (nextState, replace) => {
    // redirect if user is logged in
    if (checkAuthToken() && getUserData()) {
      console.log('Yeah!!!');
    }
    if (callback) callback();
  };
}
