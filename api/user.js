import { getRequest, putRequest } from "./utils";

const BASE_URL = "/user";

export const registerUser = (address) => getRequest(`${BASE_URL}/login/${address}`);

export const getUser = (address) => getRequest(`${BASE_URL}/${address}`);

export const updateUser = (address, data) => putRequest(`${BASE_URL}/${address}`, data);