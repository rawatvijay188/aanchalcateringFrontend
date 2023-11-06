import axios from "axios";

async function lambdaCall(body) {
  var response = await axios({
    method: "POST",
    url: "http://localhost:3000/dev/cateringService",
    data: body,
  });
  return response;
}

export default lambdaCall;
