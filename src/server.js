const http = require('http');

// Harness SDK
const pkg = require('@harnessio/ff-nodejs-server-sdk');
const { Client, Event } = pkg;

const sdkKey = '';

const client = new Client(sdkKey, {
  enableStream: true,
});

client.on(Event.READY, () => {
  console.log('READY');
});

client.on(Event.FAILED, () => {
  console.log('FAILED');
});

client.on(Event.CHANGED, (identifier) => {
  if (identifier === 'name') {
    console.log('name flag changed');
  }
});

client
  .waitForInitialization()
  .then(() => {
    setInterval(async () => {
      const target = {
        identifier: 'harness',
      };
      process.env.NAME = await client.stringVariation('name', target, '');
      console.log('Evaluation for flag name and target: ', process.env.NAME, target);
    }, 10000);
  })
  .catch((error) => {
    console.log('Error', error);
  });



const handleRequest = (request, response) => {
  console.log('Request Received for URL: ' + request.url);
  response.writeHead(200);
  response.end(`name: ${process.env.NAME}`);
};
const httpServer = http.createServer(handleRequest);
httpServer.listen(8080);
console.log("listening on Port 8080")
