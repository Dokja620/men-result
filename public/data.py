import csv
import random

# Expanded lists of first names, last names, and schools
first_names_expanded = [
    "Jean", "Fara", "Herisoa", "Randria", "Haja", "Tahina", "Sarobidy", "Tiana",
    "Aina", "Lalaina", "Voahirana", "Tojo", "Miora", "Miary", "Hery", "Lova",
    "Hasina", "Tahiry", "Tsiry", "Fetra", "Soa", "Mirana", "Rina", "Fano", "Zo",
    "Koto", "Faly", "Solofonirina", "Rivomalala", "Mahery", "Toky", "Mampionona", "Ialy",
    "Ando", "Voara", "Santatra", "Fahasina", "Fitiavana", "Onja", "Rado", "Sitraka",
    "Kanto", "Fitia", "Tovo", "Kintana", "Landy", "Malala", "Soava", "Zara", "Voahangy"
]

last_names_expanded = [
    "RAKOTO", "RASOANAIVO", "RAVELOMANANA", "ANDRIAMATOA", "RAZAFINDRAKOTO", "RAKOTOMAVO",
    "RAKOTONIAINA", "RASOAMANARIVO", "RANDRIANARIVELO", "RAZAKARIVONY", "RATSIMBAZAFY",
    "RAFANOMEZANTSOA", "RAFIDIMANANA", "RAJAONARISON", "RAJOELINA", "RAKOTONDRAZAKA",
    "RANDRIAMANANTENA", "RAKOTOMALALA", "RASOLOARIVONY", "RABEARIVELO", "RAVELONIRINA",
    "RANOROMALALA", "RAKOTONDRAVONY", "RAKOTOMANGA", "RAHARINIRINA", "RANDRIAMBOLOLONA",
    "RAHARISON", "RATOVO", "RAKOTOBE", "RAHANTANIRINA", "RANDRIANASOLO", "RASAMIMANANA",
    "RANDRIANARY", "RAHARIMANANA", "RAHARINAIVO", "RAKOTONIRINA", "RABEMANANTSOA",
    "RAKOTOARISOA", "RAKOTONDRABE", "RAKOTONDRAMBOA", "RAKOTONDRAVAO", "RANDRIAMBOLOLONA",
    "RAKOTOMANANA", "RANDRIANJOHARY", "RANDRIANAMPARANY", "RANARIVELO", "RAKOTONANAHARY"
]

schools_expanded = [
    "EPP Ihosy", "EPP Toliara", "EPP Fianarantsoa", "EPP Antananarivo", "EPP Toamasina",
    "EPP Mahajanga", "EPP Ambatondrazaka", "EPP Antsiranana", "EPP Morondava", "EPP Farafangana",
    "EPP Ambanja", "EPP Ambositra", "EPP Ambovombe", "EPP Ampanihy", "EPP Andapa",
    "EPP Antalaha", "EPP Bealanana", "EPP Bekily", "EPP Belo", "EPP Manakara",
    "EPP Mananjary", "EPP Mandritsara", "EPP Maroantsetra", "EPP Moramanga", "EPP Nosy Be"
]

# Function to generate student data with expanded lists
def generate_student_data(cisco, num_students, start_matricule):
    data = []
    num_non_admis = int(num_students * 0.14)
    for i in range(num_students):
        matricule = start_matricule + i
        first_name = random.choice(first_names_expanded)
        last_name = random.choice(last_names_expanded)
        name = f"{last_name} {first_name}"
        studied_at = random.choice(schools_expanded)
        observation = "non admis" if i < num_non_admis else "admis"
        data.append([matricule, name, cisco, studied_at, observation])
    
    # Shuffle the data to mix non-admis and admis students
    random.shuffle(data)
    
    return data

# List of CISCOs
ciscos = ["AMBATOLAMPY", "AMBATOMAINTY", "AMBATONDRAZAKA", "AMBILOBE", "AMBOASARY-SUD",
          "AMBOHIDRATRIMO", "AMBOHIMAHASOA", "AMBOSITRA", "AMBOVOMBE"]

# Generate and save CSV files for each CISCO with expanded lists
num_students = 100
start_matricule = 140000

for index, cisco in enumerate(ciscos):
    data = generate_student_data(cisco, num_students, start_matricule + index * num_students)
    csv_file_path = f"students_{cisco.lower()}.csv"
    with open(csv_file_path, mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(["matricule", "name", "cisco", "studied_at", "results"])
        for row in data:
            writer.writerow([row[0], row[1], row[2], row[3], row[4]])
    print(f"Generated {csv_file_path}")
