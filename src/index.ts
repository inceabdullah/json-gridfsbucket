import { Mongoose, mongo } from 'mongoose';
import {Readable} from 'stream';

type Db = InstanceType<typeof mongo.Db>

export const uploadGridFSBucket = (_json: {}, options: {mongoose: Mongoose, db?: Db, bucketName: string, filename: string}): Promise<{bucketName: string, filename: string}|Error>  => new Promise((resolve, reject)=>{
    const {
        mongoose,
        db,
        bucketName,
        filename
    } = options

    const bucketOptions = { bucketName }
    const bucket = new mongoose.mongo.GridFSBucket(db || mongoose.connection.db, bucketOptions)
    const _readable = Readable.from(JSON.stringify(_json),  {encoding: 'utf8'})
    _readable.pipe(bucket.openUploadStream(filename)).
    on('error', error => {
        reject(error)
      }).
      on('finish', () => {
        resolve({
            bucketName,
            filename
        })        
      });
})

export const downloadGridFSBucket = (options: {mongoose: Mongoose, db?: Db, bucketName: string, filename: string}): Promise<JSON|Error> => new Promise((resolve, reject)=>{
  const {
    mongoose,
    db,
    bucketName,
    filename
  } = options

  const bucketOptions = { bucketName }
  const bucket = new mongoose.mongo.GridFSBucket(db || mongoose.connection.db, bucketOptions)
  let chunks = ""
  bucket.openDownloadStreamByName(filename).
  on('data', (chunk: Buffer) => {
    chunks += chunk.toString()
  }).
  on('end', () => {
    resolve(JSON.parse(chunks))
  }).
  on('error', err => {
    reject(err)
  })


})