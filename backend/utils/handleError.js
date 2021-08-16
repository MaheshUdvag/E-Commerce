const handleError = (promise) => {
  return promise.then((data) => [data, null]).catch((error) => [null, error]);
};

export default handleError;
