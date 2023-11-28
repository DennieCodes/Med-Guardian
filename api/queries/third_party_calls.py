import requests
from queries.pool import pool


class ThirdPartyQueries:
    def get_drug_list(self):
        url = "https://api.fda.gov/drug/drugsfda.json"
        params = {"count": "openfda.brand_name.exact", "limit": 100000}
        response = requests.get(url, params=params)
        data = response.json()["results"]
        return [med["term"] for med in data]

    def get_interactions(self, user_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT name
                        FROM medications
                        WHERE user_id = %s
                        """,
                        [user_id]
                    )
                    rxnorm_ids = self.get_rxnorm_ids(result.fetchall())
                    string_ids = " ".join(rxnorm_ids)
                    url1 = "https://rxnav.nlm.nih.gov/"
                    url2 = "REST/interaction/list.json"
                    url = url1 + url2
                    params = {"rxcuis": string_ids}
                    response = requests.get(url, params=params)
                    response_data = response.json()["fullInteractionTypeGroup"]
                    interactions_dic = response_data[0]["fullInteractionType"]
                    interactions = []
                    for interaction in interactions_dic:
                        item = interaction["interactionPair"][0]["description"]
                        if item is not None:
                            interactions.append(item)
                    return interactions
        except Exception as e:
            return ["No drug-drug interactions were found"]

    def get_rxnorm_ids(self, medications):
        rxnorm_ids = []
        for med in medications:
            url = "https://rxnav.nlm.nih.gov/REST/rxcui.json"
            params = {"name": med, "search": 1}
            response = requests.get(url, params=params)
            response_data = response.json()
            rxnorm_ids.append(response_data["idGroup"]["rxnormId"][0])
        return rxnorm_ids
