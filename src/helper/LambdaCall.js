import axios from "axios";

async function lambdaCall(body) {
  axios.interceptors.request.use(
    (config) => {
      // Add your custom header here
      config.headers['auth-token'] = 'test';
      return config;
    },
    (error) => {
      // Handle request error
      return Promise.reject(error);
    }
  );
  var response = await axios({
    method: "POST",
    // url: "http://localhost:3000/dev/cateringService",
    url:"https://sz3thd76gc.execute-api.ap-south-1.amazonaws.com/dev/catering_service",
    data: body,
  });
  
  return response;
}

export default lambdaCall;
