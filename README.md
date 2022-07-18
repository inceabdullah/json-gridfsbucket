# json Object to GridFSBucket

Directly JSON Object to GridFSBucket. This package converts JSON object to streamable stringify, then pipe to GridFSBucket.


```JavaScript
import { connect } from 'mongoose';
import { uploadGridFSBucket, downloadGridFSBucket } from "json-gridfsbucket"

const options = {
    user: "root",
    pass: "example",
    dbName: "test"
}

const mongoose = await connect('mongodb://localhost:27017', options);

const _json = {
    foo: "bar",
    very_big_key_of_value: "VERY_BIG_VALUE"
}

const run = async () => {
    const bucketOptions = {
        mongoose, bucketName: "bucket1", filename: "file.json"
    }

    const _resUpload = await uploadGridFSBucket(_json, bucketOptions)
    console.log("res of upload:", _resUpload)
    /**
     *       {
     *          bucketName: "bucket1",
     *          filename: "file.json"
     *       }
    */

    const _resDownload = await downloadGridFSBucket(bucketOptions)
    console.log("res of download:", _resDownload)
    /**
     *      {
     *          foo: "bar",
     *          very_big_key_of_value: "VERY_BIG_VALUE"
     *      }
     */
}

run()


```
