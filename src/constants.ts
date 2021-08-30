// These values can for now be constants because their change in the app reloads the page
export const apiHost = localStorage.getItem('api_host') || process.env.REACT_APP_BEE_HOST || 'http://localhost:1633'
export const debugApiHost = localStorage.getItem('debug_api_host') || process.env.REACT_APP_BEE_DEBUG_HOST || 'http://localhost:1635'
