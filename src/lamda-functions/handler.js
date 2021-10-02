module.exports.hello = async (event, context, callback) => {
  const response = {
    body: JSON.stringify(
      {
        input: event,
        message: 'Go Serverless v1.0! Your function executed successfully!',
      },
      null,
      2,
    ),
    statusCode: 200,
  };
  callback(null, response);
};
// Use this code if you don't use the http event with the LAMBDA-PROXY integration
// return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
