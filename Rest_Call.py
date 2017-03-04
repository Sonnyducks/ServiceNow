#Need to install requests package for python
#easy_install requests
import requests

# Set the request parameters
url = 'https://<your_instance>.service-now.com/api/now/table/x_79876_land_manag_land_request'

# Eg. User name="admin", Password="admin" for this code sample.
user = 'admin'
pwd = 'admin'

# Set proper headers
headers = {"Content-Type":"application/json","Accept":"application/json"}

# Do the HTTP request
response = requests.post(url, auth=(user, pwd), headers=headers ,data="{\"type\":\"New Well\",\"short_description\":\"New well for Billings, Montana\"}")

# Check for HTTP codes other than 200
if response.status_code != 200: 
    print('Status:', response.status_code, 'Headers:', response.headers, 'Error Response:',response.json())
    exit()

# Decode the JSON response into a dictionary and use the data
data = response.json()
print(data)
