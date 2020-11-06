export const isDev = window.location.host !== 'pay.virtualensembleservices.com';
export const domain = isDev ? 'http://localhost:5000/' : '/';
