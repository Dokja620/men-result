import json
import random

# Define a list of possible cisco names without '-Cisco'
cisco_names = [
    "Antananarivo",
    "Toamasina",
    "Mahajanga",
    "Fianarantsoa",
    "Toliara",
    "Antsiranana",
    "Ambatondrazaka",
    "Moramanga",
    "Ambanja",
    "Sambava",
    "Maroantsetra",
    "Ikalamavony",
    "Mananjary",
    "Manakara",
    "Tsiroanomandidy",
    "Soanierana-Ivongo",
    "Ankadinandriana",
    "Ankazobe",
    "Miarinarivo",
    "Bongolava"
]

# Define the list of tables and their details
tables_info = []
year = 2024
exam_type = "BAC"

for region_number in range(1, 23):
    # Select a random cisco name from the list
    cisco_name = random.choice(cisco_names)
    
    table_info = {
        "table_name": f"bac_2024_region{region_number}",
        "year": year,
        "exam_type": exam_type,
        "cisco": cisco_name
    }
    tables_info.append(table_info)

# Create the final JSON structure
data = {
    "tables": tables_info
}

# Write to a JSON file
with open('tables_info.json', 'w') as json_file:
    json.dump(data, json_file, indent=4)

print("JSON file with random cisco names (without '-Cisco') created successfully.")
