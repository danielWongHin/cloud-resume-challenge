# S3 Static Web Page with Code Pipline

In this project I developed a S3 static website with Code Pipline incorportating commit and deploy steps. The Static Website will using my resume as demostration.

![Architecture](https://github.com/danielWongHin/cv/blob/main/diagram.png)

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
```

## STEP 3 : (Optional) : Register a domain from Route 53 and Create a public hosted zone

- Go to the `Route 53` console, select <kbd>Register domain</kbd>

- Choose a domain name that's available, click on <kbd>Continue</kbd>

- Enter your Contact Details for your domain, click on <kbd>Continue</kbd>

- click on <kbd>Complete Order</kbd>

- Go to the `Hosted Zone` section, click on <kbd>Create hosted zone</kbd>

- Enter the domain name that you have already registered, click on <kbd>Create hosted zone</kbd>

## STEP 4 : (Optional) Request the Certificate from AWS Certificate Manager

- Go to `AWS Certificate Manager`, click on <kbd>Request</kbd>

- Select `Request a public certificate`, click on <kbd>Next</kbd>

- To protect your connection of your domain and sub-domain, Enter wild card of your domain in `Fully qualified domain name`, eg. *.yourdomainname

- Leave the other's setting as default and click on <kbd>Request</kbd>

- Go into your created certificate, click on <kbd>Create records in Route 53</kbd>, a CNAME record will created in your hosted zone

## STEP 5 : Configure Cloudfront Distribution and (Optional) configure the domain record

- Go to the `CloudFront` console, click on <kbd>Create distribution</kbd>.

- Choose your S3 origin in hte `Origin domain`

- Select `Origin access control` setting in the `origin access`, click on `create control setting` to create origin access, select the origin access control you have created.

- In the `viewer protocol policy`, select `Redirect HTTP to HTTPS`

- In the `Alternate domain name (CNAME)`, Add your domain or sub-domain name; In the Custom SSL certificate, select the certificate you have requested from AWS Certificate Manager

- In the `default root object`, enter index.html or the html file that you would like to be the home page

- Click on <kbd>Create distribution</kbd>

- After the origin is distributed, go to the `Origins` tab, select the origins and click <kbd>Edit</kbd>, scroll down to the `Bucket policy`, Clcik on <kbd>Copy policy</kbd> and go to S3 bucket permission to modify the bucket policy.

- You can now access the static webpage by using the Distribution domain name

(Optional)

- Go to the `Route 53` console, and go to the `hosted zone` of your domain

- Click on <kbd>Create records</kbd>, Enter your Record name same as the `Alternate domain name (CNAME)` entered in the CloudFront distribution to create a `A record`

- Set the `Route traffic to` as `Alias to CloudFront distribution` and choose the cloudfront distribution

- Click on <kbd>Create records</kbd>

- You can now access the static wepage by using your domain name

## STEP 6 : Clean Up

- Disable the Cloud Front distribution, after the process being deployed, Delete the distribution.

- Click on the `Origin Access` section, Delete the Origin access controls.

- Go to the `Route 53` console, delete the record for the distribution.

- Go to the `AWS Certificate Manager` console, delete the Certificate.

- Go to the `Codepipeline` console, delete the pipeline

- Go to the `S3` console, empty the bucket. then delete the bucket 

# Follow-up

- Using Infrastructure as a code to deploy the environment

- Command Line operation