# S3 Static Web Page with Code Pipline

In this project I developed a S3 static website with Code Pipline incorportating commit and deploy steps. The Static Website will using my resume as demostration.

Required Knowledge:

- AWS S3
- Github
- AWS CodePipline
- AWS IAM
- AWS CloudFront
- AWS Route 53
- AWS Certificate Manager


The project consist of the following stage:

- STAGE 1 : Create a S3 bucket to host your Static Website
- STAGE 2 : Configure CodePipline with Github as commit source and auto deploy to S3 Bucket.
- STAGE 3 : Request the Certificate from AWS Certificate Manager 
- STAGE 4 : Configure Cloudfront Distribution
- STAGE 5 : (Optional) : Register a domain from Route 53 and configure the domain record
- STAGE 6 : Clean Up

## STEP 1 : Create a S3 bucket to host your Static Website

- Go to `S3` console, click on <kbd>Create bucket</kbd>

- For `Bucket name`, choose a unique bucket name for yourself.

- For `AWS Region`, choose your own region or use `us-east-1` to maintain the consistancy.

- Leave the rest as default and click on <kbd>Create bucket</kbd>.

- Upload your static website files to the bucket.

## STEP 2 : Configure CodePipline with Github as commit source and auto deploy to S3 Bucket.

- Go to `CodePipeline` console, click on <kbd>Create pipeline</kbd>.

- For `Pipeline name`, enter the pipeline name. you cannot edit the pipeline name after it is created.

- Select `New service role` , type your service role name and allow AWS CodePipeline to create a service role so it can be used with this new pipeline. Click on <kbd>Next</kbd>

- Select `GitHub(Version 2)` as the Source provider

- Click on <kbd>Connect to GitHub</kbd> to connect your github account. After that, choose your connection that you have already configured.

- Select your Repository name, Branch name, and leave the others setting as default. Click on <kbd>Next</kbd>

- Since we don't have the build source yet, click on <kbd>Skip build stage</kbd>, click on <kbd>Skip</kbd>

- Select `Amazon S3` as your deploy provider, select your bucket's region and created bucket. Enable `Extract file before deploy`. Click on <kbd>Next</kbd>

- Click on <kbd>Create Pipeline</kbd>, once the pipeline is created, it will automatically release a change. If you don't have any file on your github directories, the release will be failed which is normal. 

- If you don't have any file or you would like to update your directoryBack to your computer terminal, in your static website file directories, which has source controlled by your github repo, use the following git command to commit to your directory:-

```
git add -A
git commit -m "A command of what you just changed"
git push
IMAGE_REPO_NAME with a value of your ECR_REPO_NAME_REPLACEME
```

 
## STEP 3 : (Optional) : Register a domain from Route 53 and Create a public hosted zone

- Go to the `Route 53` console, select <kbd>Register domain</kbd>

- Choose a domain name that's available, click on <kbd>Continue</kbd>

- Enter your Contact Details for your domain, click on <kbd>Continue</kbd>

- click on <kbd>Complete Order</kbd>

- Go to the `Hosted Zone` section, click on <kbd>Create hosted zone</kbd>

- Enter the domain name that you have already registered, click on <kbd>Create hosted zone</kbd>

## STEP 4 : Configure Cloudfront Distribution and configure the domain record

## STEP 5 : Request the Certificate from AWS Certificate Manager 

## STEP 6 : Clean Up
