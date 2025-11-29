# Frontend Technical Specification

The purpose of the frontend is to create a static website that serves an html resume, portfolio page and also the knowledge page.

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