#!/usr/bin/env python
from bs4 import BeautifulSoup
import requests, json, sys, ast, os

current_dir = os.path.dirname(os.path.abspath(sys.argv[0]))
html = requests.get("https://people.dbmi.columbia.edu/~friedma/Projects/DiseaseSymptomKB/index.html")
soup = BeautifulSoup(html.text, "html.parser")

uncleaned_diseases = {}
cur_disease = ""

for tr in soup.find_all('tr')[1:]:
    i = 0

    for td in tr.find_all('td'):
        if i == 0 and "UMLS" in td.p.span.text:
            # text existing in this column has to be disease
            cur_disease = " ".join(td.p.span.text.split())
            uncleaned_diseases[cur_disease] = []
        else:
            if i == 2:
                # text existing in this column has to be symptom
                uncleaned_diseases[cur_disease].append(" ".join(td.p.span.text.split()))

        i += 1


cleaned_result = {}

for uncleaned_diseases_str in uncleaned_diseases:
    cleaned_diseases = []
    if "^" in uncleaned_diseases_str:
        uncleaned_diseases_list = uncleaned_diseases_str.split("^")
        for uncleaned_disease in uncleaned_diseases_list:
            cleaned_diseases.append(uncleaned_disease.split("_")[1])
    else:
        cleaned_diseases.append(uncleaned_diseases_str.split("_")[1])

    diseases_heading = str(cleaned_diseases)
    cleaned_result[diseases_heading] = []

    for uncleaned_symptoms_str in uncleaned_diseases[uncleaned_diseases_str]:
        if uncleaned_symptoms_str.strip() != "":
            if "^" in uncleaned_symptoms_str:
                uncleaned_symptoms = uncleaned_symptoms_str.split("^")
                for element in uncleaned_symptoms:
                    cleaned_result[diseases_heading].append(element.split("_")[1])
            else:
                cleaned_result[diseases_heading].append(uncleaned_symptoms_str.split("_")[1])


unique_symptoms = set()
diseases_per_symptom = {}

for diseases in cleaned_result:
    for symptom in cleaned_result[diseases]:
        if symptom != "":
            unique_symptoms.add(symptom)

for symptom in unique_symptoms:
    diseases_per_symptom[symptom] = []

    for diseases in cleaned_result:
        if symptom in cleaned_result[diseases]:
            diseases_per_symptom[symptom].extend(ast.literal_eval(diseases))


with open(os.path.join(current_dir, "data", "symptoms.json"), "w", encoding="utf-8") as f:
    json.dump(diseases_per_symptom, f, indent=4)
