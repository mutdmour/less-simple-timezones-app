const WORLD_TIME_API_ENDPOINT = "https://worldtimeapi.org/api";

const getData = (endpoint) => {
  return fetch(`${WORLD_TIME_API_ENDPOINT}${endpoint}`)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        throw new Error(data.error);
      }

      return data;
    });
};

const getAreaTimezones = (area) => {
  return getData(`/timezone/${area}`);
};

const getCurrentTimezone = () => {
  return getData('/ip');
};

const getLocationTimezoneInfo = (area, location) => {
  return getData(`/timezone/${area}/${location}`);
};

export {
  getAreaTimezones,
  getCurrentTimezone,
  getLocationTimezoneInfo
};