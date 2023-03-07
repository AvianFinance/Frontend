import { postRequest, getRequest } from "./utils";

const BASE_URL = "/profile";

export const getcollected = (address) => getRequest(`${BASE_URL}/collected/${address}`);

export const getowned = (address) => getRequest(`${BASE_URL}/owned/${address}`);

export const getcollections = (address) => getRequest(`${BASE_URL}/collections/${address}`);

export const getListed = (address) => getRequest(`${BASE_URL}/listed/${address}`);