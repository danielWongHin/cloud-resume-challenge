## Render Project Emulate Markdown

For our project page we want to be able to render markdown. We know we should render markdown serverside because client side markdown rendering is difficult to implement and provides inconsistent results.

Our render_projects.py will render our json with the markdown into html. Eventually we'll rework this code into our serverless functions.


### JSON pop function

The value of the removed item is the return value of the pop() method:

```python
for project in projects:
    project["body_html"] = markdown.markdown(project.pop("body"))
```

### Create Data for rendering

To create the Data for rendering the project and blog page:

```sh
cd ./backend/task

python render_blog.py 

python render_project.py

```