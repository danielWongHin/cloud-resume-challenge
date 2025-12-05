import json, markdown
from pathlib import Path

base = Path(__file__).resolve().parent.parent.parent
data_path = base / 'backend'/ "data" / "projects.json"
output_path = base / 'frontend'/ "public" /"data"/ "projectsData.json"
json_str = open(data_path).read()
print(json_str)
projects = json.loads(json_str)


for project in projects:
    project["body_html"] = markdown.markdown(project.pop("body"))

with open(output_path, 'w', encoding='utf-8')as f:
    json.dump(projects, f, ensure_ascii=False)
