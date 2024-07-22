import csv
import random
import string

# Sample data
last_names = ["Raharinaivo", "Rakotoarisoa", "Randria", "Rasolofoson", "Rakotomamonjy", "Randrianarivelo", "Raharimanana", "Rasolofo", "Andrianarivo", "Rajaonarison"]
first_names = ["Andry", "Fitiavana", "Herilala", "Tiana", "Soa", "Mamy", "Rina", "Hasina", "Fanilo", "Finaritra", "Tovo", "Hery", "Tojo", "Miangaly", "Haja"]
ciscos = ["Antananarivo", "Toamasina", "Fianarantsoa", "Mahajanga", "Toliara", "Antsiranana", "Ambatondrazaka", "Antsirabe", "Farafangana", "Morondava", "Mananjary"]
schools = [f"School_{i}" for i in range(1, 101)]
regions = ["Region_{}".format(i) for i in range(1, 23)]

# Generate unique matricule
def generate_matricule():
    return f"{random.randint(10000, 99999)}-{''.join(random.choices(string.ascii_uppercase, k=4))}"

# Generate names
def generate_name():
    last_name = random.choice(last_names)
    first_name = " ".join(random.sample(first_names, random.randint(2, 4)))
    return f"{last_name} {first_name}"

# Generate observation
def generate_observation():
    return "admis" if random.random() < 0.4 else "non admis"

# Generate mention
def generate_mention():
    return random.choices(
        ["très bien", "bien", "assez bien", "passable"],
        weights=[5, 10, 5, 80],
        k=1
    )[0]

# Generate option
def generate_option():
    return random.choices(
        ["A1", "A2", "D", "C", "S", "L", "OSE"],
        weights=[32.5, 32.5, 10, 10, 5, 5, 5],
        k=1
    )[0]

# Generate data for a single region
def generate_data(region, num_entries):
    data = []
    for _ in range(num_entries):
        data.append({
            "matricule": generate_matricule(),
            "name": generate_name(),
            "cisco": random.choice(ciscos),
            "studied_at": random.choice(schools),
            "observation": generate_observation(),
            "mention": generate_mention(),
            "option": generate_option()
        })
    return data

# Save data to CSV
def save_to_csv(region, data):
    filename = f"{region}.csv"
    with open(filename, mode='w', newline='') as file:
        writer = csv.DictWriter(file, fieldnames=["matricule", "name", "cisco", "studied_at", "observation", "mention", "option"])
        writer.writeheader()
        for row in data:
            writer.writerow(row)

# Generate data for each region
for region in regions:
    num_entries = random.randint(1000, 5000)  # Increased the range by a factor of 10
    data = generate_data(region, num_entries)
    save_to_csv(region, data)

print("CSV files generated successfully.")
