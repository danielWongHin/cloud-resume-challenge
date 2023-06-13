# Setting up S3

- I will use AWS Sam to create:

  - S3 bucket
  - Lambda function

- Make sure YOur IAM user have enough IAM permission for SAM

  - Cloudformation
  - Lambda
  - IAM
  - API Gateway

- Setup the SAM Cli and deploy SAM

  - `sam init`
  - `sam build`
  - `sam deploy --guided`

- Add the following code to template.yaml to create the s3 bucket

```
Resources:
  MyWebsite:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: <United Bucket name>
```
