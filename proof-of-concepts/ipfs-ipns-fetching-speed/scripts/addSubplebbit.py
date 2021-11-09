import requests

for i in range(1, 101):
    r = requests.post('http://localhost:3000/subplebbit/', data ={"title": str(i)})