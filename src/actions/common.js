// Common code for actions modules

let checkForApplicationErrors = (res) => {
  // TODO: here we are throwing on the first error for the list of errors
  // returned. Is this sufficient or should we also consider other errors
  // in the list as well?
  if (res.data.errors && res.data.errors.length > 0) {
    throw new Error("Got application errors: " + res.data.errors[0].message, {
      cause: res.data.errors[0]
    });
  }
}
module.exports.checkForApplicationErrors = checkForApplicationErrors;

const baseGraphURL = process.env.REACT_APP_BASE_GRAPH_URL;
if (!baseGraphURL || baseGraphURL === "") {
  console.error("Backend service URL is not defined");
}
module.exports.baseGraphURL = baseGraphURL;