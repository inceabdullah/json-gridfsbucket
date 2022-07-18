import { Mongoose, mongo } from 'mongoose';
declare type Db = InstanceType<typeof mongo.Db>;
export declare const uploadGridFSBucket: (_json: {}, options: {
    mongoose: Mongoose;
    db?: Db;
    bucketName: string;
    filename: string;
}) => Promise<{
    bucketName: string;
    filename: string;
} | Error>;
export declare const downloadGridFSBucket: (options: {
    mongoose: Mongoose;
    db?: Db;
    bucketName: string;
    filename: string;
}) => Promise<JSON | Error>;
export {};
