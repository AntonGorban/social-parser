import axios from "axios";

const apiUrl = "http://localhost:7000/";

const get = async (url = "") => {
  let response = null;
  await axios
    .get(`${apiUrl}${url}`, {
      headers: { Authorization: `Bearer ${api.apiToken}` },
    })
    .then((r) => (response = r));
  return response;
};
const post = async (url = "", data = {}) => {
  let response = null;
  await axios
    .post(`${apiUrl}${url}`, data, {
      headers: { Authorization: `Bearer ${api.apiToken}` },
    })
    .then((r) => (response = r));
  return response;
};
const patch = async (url = "", data = {}) => {
  let response = null;
  await axios
    .patch(`${apiUrl}${url}`, data, {
      headers: { Authorization: `Bearer ${api.apiToken}` },
    })
    .then((r) => (response = r));
  return response;
};

const api = {
  apiToken: "",
  user: {
    auth: () => get("user/auth/"),
    login: (data) => post("user/login/", data),
    reg: (data) => post("user/reg/", data),
  },
  token: {
    get: () => get("token/"),
    default: () => get("token/default"),
    updateVk: (data) => patch("token/vk", data),
    updateTg: (data) => patch("token/tg", data),
    updateYoutube: (data) => patch("token/youtube", data),
    updateInst: (data) => patch("token/inst", data),
  },
  resource: {
    get: () => get("resource/"),
    getById: (id) => get(`resource/${id}`),
    create: (data) => post("resource/", data),
    update: (id, data) => patch(`resource/${id}`, data),
  },
  parse: {
    get: () => get("parse/"),
    getById: (id) => get(`parse/${id}`),
    create: (data) => get("parse/", data),
  },
  parseUrl: {
    get: () => get("parse-url/"),
  },
};

export default api;