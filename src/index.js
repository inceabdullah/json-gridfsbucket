"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadGridFSBucket = exports.uploadGridFSBucket = void 0;
const stream_1 = require("stream");
const uploadGridFSBucket = (_json, options) => new Promise((resolve, reject) => {
    const { mongoose, db, bucketName, filename } = options;
    const bucketOptions = { bucketName };
    const bucket = new mongoose.mongo.GridFSBucket(db || mongoose.connection.db, bucketOptions);
    const _readable = stream_1.Readable.from(JSON.stringify(_json), { encoding: 'utf8' });
    _readable.pipe(bucket.openUploadStream(filename)).
        on('error', error => {
        reject(error);
    }).
        on('finish', () => {
        resolve({
            bucketName,
            filename
        });
    });
});
exports.uploadGridFSBucket = uploadGridFSBucket;
const downloadGridFSBucket = (options) => new Promise((resolve, reject) => {
    const { mongoose, db, bucketName, filename } = options;
    const bucketOptions = { bucketName };
    const bucket = new mongoose.mongo.GridFSBucket(db || mongoose.connection.db, bucketOptions);
    let chunks = "";
    bucket.openDownloadStreamByName(filename).
        on('data', (chunk) => {
        chunks += chunk.toString();
    }).
        on('end', () => {
        resolve(JSON.parse(chunks));
    }).
        on('error', err => {
        reject(err);
    });
});
exports.downloadGridFSBucket = downloadGridFSBucket;
