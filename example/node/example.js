const elencyConfig = require('../../clients/node/');

// for testing ignore self signed certificates
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

async function start() {
  const appId = 'awesome-micro-service';
  const environment = 'production';
  const HMACAuthorizationKey = 'YWJlZjYwNzQwYzk4NDY4Zjg3ZTg5MWU0';
  const configEncryptionKey = 'ZTk0YTU5YjNhMjk4NGI3NmIxNWExNzdi';//'M2VlMzRiOTFiNmM0NDY2YWI0MTAxZmZi';

  let elencyConfigInstance;

  function retrieved() {
    console.log();
    console.log('__________________________________________');
    console.log(`Configuration retrieved: ${new Date().toString()}`);
    console.log('Version: ' + elencyConfigInstance.appVersion);
    console.log('Environment: ' + elencyConfigInstance.environment);
    console.log('Configuration Id: ' + elencyConfigInstance.configurationId);
    console.log('Keys and values:');
    console.log();
    
    elencyConfigInstance.getAllKeys().forEach((key) => {
      console.log(key + ': ' + elencyConfigInstance.get(key));
    });
    console.log('__________________________________________');
  }

  function refreshFailure(err) {
    console.log(JSON.stringify(err));
    console.log('** REFRESH FAILURE CONFIG **');
  }

  elencyConfigInstance = elencyConfig({
    uri: 'https://localhost:3000',
    appId,
    appVersion: '2.0.0',
    environment,
    refreshInterval: 1000,
    HMACAuthorizationKey,
    configEncryptionKey,
    retrieved,
    refreshFailure
  });

  try {
    await elencyConfigInstance.init();
  }
  catch (err) {
    console.log(`An error occurred while initialising elencyConfig client: ` + JSON.stringify(err));
    console.log(err);
    process.exit(1);
  }
}

start();