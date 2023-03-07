import { postRequest, getRequest } from "./utils";

const BUY_BASE_URL = "/buy/explore";
const RENTAL_BASE_URL = "/rental/explore";

export const getbuylistings = () => getRequest(`${BUY_BASE_URL}`);

export const getrentbuylistings = () => getRequest(`${RENTAL_BASE_URL}`);

export const getbuycollection = (address) => getRequest(`${BUY_BASE_URL}/${address}`);

export const getrentalcollection = (address) => getRequest(`${RENTAL_BASE_URL}/${address}`);