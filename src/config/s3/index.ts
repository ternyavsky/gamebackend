import { Injectable } from '@nestjs/common';
import { S3ModuleOptions, S3ModuleOptionsFactory } from 'nestjs-s3';

@Injectable()
export class S3Config implements S3ModuleOptionsFactory {
  createS3ModuleOptions(): S3ModuleOptions {
    return {
      config: {
        credentials: {
          accessKeyId: process.env.MINIO_ACCESS_KEY,
          secretAccessKey: process.env.MINIO_SECRET_KEY,
        },
        endpoint: `http://${process.env.MINIO_HOST}:${process.env.MINIO_PORT}`,
        forcePathStyle: true,
        region: 'eu-west-2',
      },
    };
  }
}
