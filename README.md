# S3 Static Web Page with Code Pipline

In this project I developed a S3 static website with Code Pipline incorportating commit and deploy steps. The Static Website will using my resume as demostration.

Required Knowledge:

- AWS S3
- Github
- AWS CodePipline
- AWS IAM


The project consist of the following stage:

- STAGE 1 : Create a S3 bucket to host your Static Website
- STAGE 2 : Configure CodePipline with Github as commit source and auto deploy to S3 Bucket.
- STAGE 3 : Configure a CodePipeline with commit and build steps to automate build on commit.
- STAGE 4 : Create an ECS Cluster, TG's , ALB and configure the code pipeline for deployment to ECS Fargate
- STAGE 5 : CLEANUP