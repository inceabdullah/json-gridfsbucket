import { Mongoose, mongo } from 'mongoose';
declare type Db = InstanceType<typeof mongo.Db>;
export declare type bucketOptions = {
    mongoose: Mongoose;
    db?: Db;
    bucketName: string;
    filename: string;
};
export declare const uploadGridFSBucket: (_json: {}, options: bucketOptions) => Promise<{
    bucketName: string;
    filename: string;
} | Error>;
export declare const downloadGridFSBucket: (options: bucketOptions) => Promise<JSON | Error>;
export {};
