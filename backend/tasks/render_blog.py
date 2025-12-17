import json, markdown
from pathlib import Path

base = Path(__file__).resolve().parent.parent.parent
data_path = base / 'backend'/ "data" / "blogs.json"
output_path = base / 'frontend'/ "public" /"data"/ "blogsData.json"
json_str = open(data_path).read()
print(json_str)
blogs = json.loads(json_str)


for blog in blogs:
    blog["body_html"] = markdown.markdown(blog.pop("body"))

with open(output_path, 'w', encoding='utf-8')as f:
    json.dump(blogs, f, ensure_ascii=False)
