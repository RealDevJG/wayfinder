import axios from "axios";
import { Constants } from "../../utils/constants";

export const WAYFINDER_API_CLIENT = axios.create(Constants.AXIOS_CONFIG);
export const WAYFINDER_REFRESH_API_CLIENT = axios.create(Constants.AXIOS_CONFIG);
