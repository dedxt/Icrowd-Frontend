import axios from "axios";
import { ConnectionConfiguration } from "../../configs/index";

export const axiosInstance = axios.create({
    baseURL: ConnectionConfiguration.backendURL + '/api/'
})

/**
 * @param {any} data Response to send
 * @returns {Object}
 */
export const generateSuccess = (data) => {
    return {
      success: true,
      data: data
    };
  };
  
  /**
   * @param {String} errorMessage Error Message
   * @returns {Object}
   */
  export const generateError = (errorMessage) => {
    return {
      success: false,
      data: errorMessage
    };
  };
  

  
  /**
   * @description Error Helper
   * 
   * @param {any} error 
   * @param {String} variant 
   * @returns {Object}
   */
  export const errorHelper = (error, variant) => {
    if (error.response === undefined) {
      return generateError("Network Error");
    }
    if (error.response.statusCode === 401) {
      if (variant === "login") {
        return generateError("Invalid Credentials");
      }
      return generateError("You may have been logged out");
    }
    if (error.response.data.statusCode === 401) {
      if (variant === "login") {
        return generateError("Invalid Credentials");
      }
      return generateError("You may have been logged out");
    }
    if (error.response.status === 401) {
      if (variant === "login")
        return generateError("Invalid Credentials");
      return generateError("You may have been logged out");
    }
    if (error.response.data.message !== "") {
      return generateError(error.response.data.message);
    }
    if (error.response.statusText !== "") {
      return generateError(error.response.statusText);
    }
  };
  
  export const performCallback = (callback, data) => {
    if (callback instanceof Function) {
      if (data !== undefined)
        return callback(data);
      callback();
    }
  };