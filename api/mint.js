import { postRequest, getRequest } from "./utils";

const BASE_URL = "/collection";

export const createcollection = (data) => postRequest(`${BASE_URL}`, data);

export const getCollections = (address) => getRequest(`${BASE_URL}/${address}`);

export const mintNft = (data) => postRequest("/mint", data);

export const uploadIPFS = (data) => postRequest("/mint/ipfs", data);

export const createWrapcollection = (data) => postRequest(`${BASE_URL}/wrapper`, data);

export const depositNFT = (data) => postRequest("/mint/deposit", data);