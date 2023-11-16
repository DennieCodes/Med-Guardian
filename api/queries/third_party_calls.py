import requests


class ThirdPartyQueries:
    def get_drug_list(self):
        url = "https://api.fda.gov/drug/drugsfda.json"
        params = {"count": "openfda.brand_name.exact", "limit": 100000}
        response = requests.get(url, params=params)
        data = response.json()["results"]
        return [med["term"] for med in data]
