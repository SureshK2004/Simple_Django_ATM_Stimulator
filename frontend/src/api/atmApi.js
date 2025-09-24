import axios from "axios";

const BASE = "http://localhost:8000/api/atm/";

export const loginApi = (payload) => axios.post(`${BASE}login/`, payload);
export const depositApi = (payload) => axios.post(`${BASE}deposit/`, payload);
export const withdrawApi = (payload) => axios.post(`${BASE}withdraw/`, payload);
export const transferApi = (payload) => axios.post(`${BASE}transfer/`, payload);
export const historyApi = (accNo) => axios.get(`${BASE}history/${accNo}/`);
