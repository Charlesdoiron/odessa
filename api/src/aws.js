const AWS = require("aws-sdk");
const { CELLAR_ENDPOINT, CELLAR_KEYID, CELLAR_KEYSECRET, BUCKET_NAME, PUBLIC_BUCKET_NAME } = require("../config");

function uploadPublicFile(path, file) {
  return new Promise((resolve, reject) => {
    const s3bucket = new AWS.S3({ endpoint: CELLAR_ENDPOINT, accessKeyId: CELLAR_KEYID, secretAccessKey: CELLAR_KEYSECRET });
    const params = {
      Bucket: PUBLIC_BUCKET_NAME,
      Key: path,
      Body: file.data,
      ContentType: file.mimetype,
      ACL: "public-read",
      Metadata: { "Cache-Control": "max-age=31536000" },
    };
    s3bucket.upload(params, function (err, data) {
      if (err) return reject(`error in callback:${err}`);
      resolve(data);
    });
  });
}

function deleteFile(name) {
  return new Promise((resolve, reject) => {
    const s3bucket = new AWS.S3({ endpoint: CELLAR_ENDPOINT, accessKeyId: CELLAR_KEYID, secretAccessKey: CELLAR_KEYSECRET });
    const params = { Bucket: BUCKET_NAME, Key: name };
    s3bucket.deleteObject(params, (err, data) => {
      if (err) return reject(`error in callback:${err}`);
      resolve(data);
    });
  });
}

function listFiles(path) {
  return new Promise((resolve, reject) => {
    const s3bucket = new AWS.S3({ endpoint: CELLAR_ENDPOINT, accessKeyId: CELLAR_KEYID, secretAccessKey: CELLAR_KEYSECRET });
    const params = { Bucket: BUCKET_NAME, Prefix: path };
    s3bucket.listObjects(params, (err, data) => {
      if (err) return reject(`error in callback:${err}`);
      resolve(data.Contents);
    });
  });
}

const getFile = (name) => {
  const p = new Promise((resolve, reject) => {
    const s3bucket = new AWS.S3({ endpoint: CELLAR_ENDPOINT, accessKeyId: CELLAR_KEYID, secretAccessKey: CELLAR_KEYSECRET });
    const params = { Bucket: BUCKET_NAME, Key: name };
    s3bucket.getObject(params, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
  return p;
};

module.exports = {
  uploadFile,
  uploadPublicFile,
  getFile,
  listFiles,
  deleteFile,
};
