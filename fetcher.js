const fs = require('fs');
const request = require('request');

const url = process.argv[2];
const localFilePath = process.argv[3];

function source(url, localFilePath) {
  request.get(url, (error, response, body) => {
    if (error) {
      console.error('Error:', error.message);
    } else if (response.statusCode !== 200) {
      console.error(`Got an error status code ${response.statusCode}`);
    } else {
      fs.writeFile(localFilePath, body, (error) => {
        if (error) {
          console.error('Error:', error.message);
        } else {
          const fileSize = body.length;
          console.log(`Downloaded and saved ${fileSize} bytes to ${localFilePath}`);
        }
      });
    }
  });
}

if (!url || !localFilePath) {
  console.error('Please provide both a URL and a file path');
} else {
  source(url, localFilePath);
}
