import cdk = require('@aws-cdk/core');
import s3 = require('@aws-cdk/aws-s3');

export class S3Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a logging bucket
    const loggingBucket = new s3.Bucket(this, "LoggingBucket", {
      bucketName: "leerandomexamplelogging",
    });

    // Create my bucket to be logged
    const higherLevelBucket = new s3.Bucket(this, "MyBucket", {
      bucketName: "leerandomexamplebucket",
    });

    // Extract the CfnBucket from the L2 Bucket above
    const bucketResource = higherLevelBucket.node.findChild('Resource') as s3.CfnBucket;

    // Override logging configuration to point to my logging bucket
    bucketResource.addPropertyOverride('LoggingConfiguration', {
      "DestinationBucketName": loggingBucket.bucketName,
    });
  }
}