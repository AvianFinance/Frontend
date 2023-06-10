import { postRequest, getRequest } from "./utils";

const BASE_URL = "/assets";

export const getNFTDetails = (address, tokenID) => getRequest(`${BASE_URL}/${address}/${tokenID}`);

export const getNFTactivities = (address, tokenID) => getRequest(`${BASE_URL}/activity/${address}/${tokenID}`);

export const getNFTColactivities = (address) => getRequest(`${BASE_URL}/colactivity/${address}`);

export const getUserActivities = (address) => getRequest(`${BASE_URL}/profile/${address}`);
