import sys

file_path = 'src/components/FarmerDashboard.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('className=\\"w-4 h-4\\"', 'className="w-4 h-4"')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
