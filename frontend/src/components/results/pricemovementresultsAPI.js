import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8000/pricemovement/get_date/",
  responseType: "json"
});