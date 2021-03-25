#!/usr/bin/env python
from bs4 import BeautifulSoup, requests, json

html = requests.get("https://people.dbmi.columbia.edu/~friedma/Projects/DiseaseSymptomKB/index.html")
soup = BeautifulSoup(html.text, "html.parser")

diseases = {}
cur_disease = ""

for tr in soup.find_all('tr')[1:]:
    i = 0

    for td in tr.find_all('td'):
        if i == 0 and "UMLS" in td.p.span.text:
            # text existing in this column has to be disease
            cur_disease = " ".join(td.p.span.text.split())
            diseases[cur_disease] = []
        else:
            if i == 2:
                # text existing in this column has to be symptom
                diseases[cur_disease].append(" ".join(td.p.span.text.split()))

        i += 1


with open("data/disease.json", "w", encoding="utf-8") as f:
    result = {}

    for uncleaned_diseases_str in diseases:
        cleaned_diseases = []
        if "^" in uncleaned_diseases_str:
            uncleaned_diseases_list = uncleaned_diseases_str.split("^")
            for uncleaned_disease in uncleaned_diseases_list:
                cleaned_diseases.append(uncleaned_disease.split("_")[1])
        else:
            cleaned_diseases.append(uncleaned_diseases_str.split("_")[1])

        diseases_heading = str(cleaned_diseases)
        result[diseases_heading] = []

        for uncleaned_symptoms in diseases[uncleaned_diseases_str]:
            if uncleaned_symptoms.strip() != "":
                if "^" in uncleaned_symptoms:
                    uncleaned_diseases = uncleaned_symptoms.split("^")
                    for element in uncleaned_diseases:
                        result[diseases_heading].append(element.split("_")[1])
                else:
                    result[diseases_heading].append(uncleaned_symptoms.split("_")[1])
    json.dump(result, f, indent=4)
