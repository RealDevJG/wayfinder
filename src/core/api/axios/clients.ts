import axios from "axios";
import { AXIOS_CONFIG } from "../../../common/utils/constants";

export const WAYFINDER_API_CLIENT = axios.create(AXIOS_CONFIG);
export const WAYFINDER_REFRESH_API_CLIENT = axios.create(AXIOS_CONFIG);
