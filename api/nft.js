import { postRequest, getRequest } from "./utils";

const BASE_URL = "/assets";

export const getNFTDetails = (address, tokenID) => getRequest(`${BASE_URL}/${address}/${tokenID}`);
