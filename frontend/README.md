# Frontend Technical Specification

The purpose of the frontend is to create a static website that serves an html resume, and project.

**Remark:** The content might not be able to finish before the submission, but the frontend of the resume should be available.

## Resume Format Considerations

This resume is using [Harvard Resume Template format](https://careerservices.fas.harvard.edu/channels/create-a-resume-cv-or-cover-letter/#uc_resource_tiles-4) as a reference.

### Resume format Generation

In this project, GenAI will be used to generate the starting code for the HTML and some possible CSS. Afterward, the code will be refactored to the preferred standard. The prompt to GPT5 is list as below:

```text
You are a web developer.  Your boss is asking you write the html code by using the Harvard resume format as a reference. The requirement is listed below:
1. The format has been attached. Please help to generate the html code and take the format as reference
2. Please use the least amount of css tags
3. Please don't use a Css framework
```
## HTTP meta tag 
1. The webpage uses the UTF-8 character encoding, which is the standard encoding for almost all languages and symbols
2. The tag `<meta name="viewport">`, makes the webpage responsive and mobile-friendly
3. The effects `width=device-width`, sets width equal to the device’s screen width
4. The effects `initial-scale=1.0`, makes the page start at normal zoom level

## Serve Static Website Locally

### Install HTTP Server
```
npm i http-server -g
```

### Server Website
```
cd frontend
http-server
```

## Project Page
### Bootstrap

In `project.html`, Bootstrap has been used for styling testing purpose. To use bootstrap, the stylesheet has been linked as show below within the head tag `<head></head>`

``` 
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

```
Also, the javascript file is needed for the JavaScript bundle before closing `</body>

```
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
```
### Render Projects

In `project.js`, the project example is saved and the function `renderProjects()` is saved for rendering the project.