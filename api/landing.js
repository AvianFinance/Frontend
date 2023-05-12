import { getRequest } from "./utils";

const BASE_URL = "/landing";

export const getBasicData = (address) => getRequest(`${BASE_URL}`);
