export const ANIMALS = [
  "Lion", "Tiger", "Elephant", "Giraffe", "Zebra", "Kangaroo", "Koala", "Panda", "Grizzly Bear", "Polar Bear",
  "Wolf", "Fox", "Rabbit", "Squirrel", "Otter", "Beaver", "Raccoon", "Hedgehog", "Bat", "Camel",
  "Llama", "Alpaca", "Horse", "Donkey", "Bison", "Moose", "Deer", "Reindeer", "Hippopotamus", "Rhinoceros",
  "Cheetah", "Leopard", "Jaguar", "Lynx", "Meerkat", "Sloth", "Armadillo", "Platypus", "Wombat", "Chimpanzee",
  "Gorilla", "Orangutan", "Dolphin", "Whale", "Octopus", "Seahorse", "Jellyfish", "Sea Otter", "Penguin", "Walrus",
];

export interface Country {
  name: string;
  code: string;
}

export const COUNTRIES: Country[] = [
  { name: "United States", code: "US" }, { name: "Canada", code: "CA" }, { name: "Mexico", code: "MX" },
  { name: "Brazil", code: "BR" }, { name: "Argentina", code: "AR" }, { name: "United Kingdom", code: "GB" },
  { name: "France", code: "FR" }, { name: "Germany", code: "DE" }, { name: "Italy", code: "IT" },
  { name: "Spain", code: "ES" }, { name: "Portugal", code: "PT" }, { name: "Netherlands", code: "NL" },
  { name: "Belgium", code: "BE" }, { name: "Switzerland", code: "CH" }, { name: "Sweden", code: "SE" },
  { name: "Norway", code: "NO" }, { name: "Denmark", code: "DK" }, { name: "Finland", code: "FI" },
  { name: "Poland", code: "PL" }, { name: "Greece", code: "GR" }, { name: "Turkey", code: "TR" },
  { name: "Russia", code: "RU" }, { name: "Ukraine", code: "UA" }, { name: "Egypt", code: "EG" },
  { name: "Morocco", code: "MA" }, { name: "Nigeria", code: "NG" }, { name: "Kenya", code: "KE" },
  { name: "South Africa", code: "ZA" }, { name: "India", code: "IN" }, { name: "Pakistan", code: "PK" },
  { name: "Bangladesh", code: "BD" }, { name: "China", code: "CN" }, { name: "Japan", code: "JP" },
  { name: "South Korea", code: "KR" }, { name: "Thailand", code: "TH" }, { name: "Vietnam", code: "VN" },
  { name: "Indonesia", code: "ID" }, { name: "Malaysia", code: "MY" }, { name: "Philippines", code: "PH" },
  { name: "Singapore", code: "SG" }, { name: "Australia", code: "AU" }, { name: "New Zealand", code: "NZ" },
  { name: "Saudi Arabia", code: "SA" }, { name: "United Arab Emirates", code: "AE" }, { name: "Israel", code: "IL" },
  { name: "Iran", code: "IR" }, { name: "Iraq", code: "IQ" }, { name: "Chile", code: "CL" },
  { name: "Peru", code: "PE" }, { name: "Colombia", code: "CO" }, { name: "Venezuela", code: "VE" },
];

export const CITIES = [
  "New York", "Los Angeles", "Chicago", "Toronto", "Vancouver", "Mexico City", "S\u00e3o Paulo", "Rio de Janeiro",
  "Buenos Aires", "London", "Paris", "Berlin", "Rome", "Madrid", "Lisbon", "Amsterdam", "Brussels", "Vienna",
  "Zurich", "Stockholm", "Oslo", "Copenhagen", "Helsinki", "Warsaw", "Prague", "Budapest", "Athens", "Istanbul",
  "Moscow", "Cairo", "Marrakesh", "Lagos", "Nairobi", "Cape Town", "Mumbai", "Delhi", "Bangalore", "Dhaka",
  "Beijing", "Shanghai", "Tokyo", "Osaka", "Seoul", "Bangkok", "Hanoi", "Jakarta", "Kuala Lumpur", "Manila",
  "Singapore", "Sydney", "Melbourne", "Auckland", "Dubai", "Tel Aviv", "Santiago", "Lima", "Bogot\u00e1",
];

export const FOODS = [
  "Pizza", "Sushi", "Tacos", "Burger", "Pasta", "Ramen", "Pad Thai", "Dumplings", "Curry", "Paella",
  "Falafel", "Hummus", "Biryani", "Butter Chicken", "Pho", "Fried Rice", "Kebab", "Lasagna", "Risotto", "Gnocchi",
  "Empanadas", "Enchiladas", "Fajitas", "Burrito", "Quesadilla", "Fish and Chips", "Shepherd's Pie", "Croissant",
  "Waffles", "Pancakes", "Bibimbap", "Kimchi Fried Rice", "Tandoori Chicken", "Samosas", "Spring Rolls",
  "Peking Duck", "Dim Sum", "Chow Mein", "Souvlaki", "Moussaka", "Goulash", "Schnitzel", "Pretzel", "Bruschetta",
];

export const FRUITS = [
  "Apple", "Banana", "Orange", "Grape", "Strawberry", "Blueberry", "Raspberry", "Blackberry", "Mango",
  "Pineapple", "Watermelon", "Cantaloupe", "Honeydew", "Kiwi", "Papaya", "Guava", "Lychee", "Dragon Fruit",
  "Passion Fruit", "Pomegranate", "Peach", "Plum", "Apricot", "Cherry", "Nectarine", "Pear", "Fig",
  "Date", "Coconut", "Lemon", "Lime", "Grapefruit", "Tangerine", "Persimmon", "Star Fruit", "Jackfruit",
];

export const VEGETABLES = [
  "Carrot", "Broccoli", "Spinach", "Kale", "Lettuce", "Cabbage", "Cauliflower", "Potato", "Sweet Potato",
  "Tomato", "Cucumber", "Zucchini", "Eggplant", "Bell Pepper", "Onion", "Garlic", "Ginger", "Celery",
  "Asparagus", "Green Beans", "Peas", "Corn", "Pumpkin", "Butternut Squash", "Radish", "Beetroot",
  "Turnip", "Artichoke", "Brussels Sprouts", "Leek", "Okra", "Bok Choy", "Mushroom", "Chili Pepper",
];

export const DRINKS = [
  "Lemonade", "Iced Tea", "Coffee", "Espresso", "Cappuccino", "Latte", "Hot Chocolate", "Green Tea",
  "Chai Latte", "Smoothie", "Milkshake", "Orange Juice", "Apple Juice", "Sparkling Water", "Cola",
  "Ginger Ale", "Root Beer", "Coconut Water", "Mango Lassi", "Horchata", "Hibiscus Tea", "Matcha Latte",
  "Kombucha", "Lemon Iced Tea", "Watermelon Juice", "Sports Drink", "Herbal Tea", "Mocktail Mojito", "Fruit Punch",
];

export const MOVIES = [
  "The Shawshank Redemption", "The Godfather", "The Dark Knight", "Pulp Fiction", "Forrest Gump",
  "Inception", "The Matrix", "Fight Club", "Interstellar", "Goodfellas", "The Lord of the Rings",
  "Star Wars", "Jurassic Park", "Titanic", "Gladiator", "The Avengers", "Jaws", "Back to the Future",
  "The Lion King", "Toy Story", "Finding Nemo", "Up", "The Incredibles", "Spirited Away", "Parasite",
  "La La Land", "Whiplash", "Get Out", "Mad Max: Fury Road", "The Grand Budapest Hotel", "Coco",
  "Spider-Man: Into the Spider-Verse", "Everything Everywhere All at Once", "Knives Out", "Dune",
];

export const TV_SHOWS = [
  "Breaking Bad", "Game of Thrones", "Stranger Things", "The Office", "Friends", "The Simpsons",
  "The Crown", "Black Mirror", "Sherlock", "Better Call Saul", "The Mandalorian", "Rick and Morty",
  "Chernobyl", "The Witcher", "Money Heist", "Dark", "Peaky Blinders", "Narcos", "The Boys",
  "Squid Game", "Ted Lasso", "Succession", "Fleabag", "Brooklyn Nine-Nine", "How I Met Your Mother",
  "The Big Bang Theory", "Avatar: The Last Airbender", "Attack on Titan", "One Piece", "Naruto",
];

export const BOOKS = [
  "1984", "To Kill a Mockingbird", "Pride and Prejudice", "The Great Gatsby", "Moby-Dick",
  "War and Peace", "Crime and Punishment", "The Catcher in the Rye", "Brave New World", "The Hobbit",
  "Harry Potter and the Sorcerer's Stone", "The Alchemist", "The Little Prince", "Fahrenheit 451",
  "Animal Farm", "The Odyssey", "Don Quixote", "Frankenstein", "Dracula", "The Picture of Dorian Gray",
  "One Hundred Years of Solitude", "The Kite Runner", "Life of Pi", "The Book Thief", "Dune",
  "A Game of Thrones", "The Chronicles of Narnia", "Sapiens", "Educated", "Atomic Habits",
];

export const GAMES = [
  "Minecraft", "The Legend of Zelda: Breath of the Wild", "Super Mario Odyssey", "Red Dead Redemption 2",
  "The Witcher 3", "Grand Theft Auto V", "Portal 2", "Half-Life 2", "Elden Ring", "Dark Souls III",
  "God of War", "Hollow Knight", "Stardew Valley", "Celeste", "Among Us", "Fortnite", "Overwatch 2",
  "Valorant", "League of Legends", "Animal Crossing: New Horizons", "Terraria", "Hades",
  "Cyberpunk 2077", "Fall Guys", "Rocket League", "Tetris", "Chess", "Super Smash Bros. Ultimate",
  "Pok\u00e9mon: Scarlet and Violet", "Final Fantasy VII",
];

export const POKEMON = [
  "Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard", "Squirtle", "Wartortle",
  "Blastoise", "Caterpie", "Butterfree", "Pikachu", "Raichu", "Sandshrew", "Nidoran", "Clefairy",
  "Vulpix", "Jigglypuff", "Zubat", "Oddish", "Psyduck", "Mankey", "Growlithe", "Poliwag", "Abra",
  "Machop", "Bellsprout", "Tentacool", "Geodude", "Ponyta", "Slowpoke", "Magnemite", "Farfetch'd",
  "Doduo", "Seel", "Grimer", "Shellder", "Gastly", "Onix", "Drowzee", "Krabby", "Voltorb", "Exeggcute",
  "Cubone", "Hitmonlee", "Lickitung", "Koffing", "Rhyhorn", "Chansey", "Tangela", "Kangaskhan",
  "Horsea", "Goldeen", "Staryu", "Scyther", "Jynx", "Pinsir", "Tauros", "Magikarp", "Lapras", "Ditto",
  "Eevee", "Snorlax", "Dratini", "Mewtwo", "Mew",
];

export const DINOSAURS = [
  "Tyrannosaurus Rex", "Velociraptor", "Triceratops", "Stegosaurus", "Brachiosaurus", "Diplodocus",
  "Spinosaurus", "Allosaurus", "Ankylosaurus", "Pteranodon", "Parasaurolophus", "Iguanodon",
  "Brontosaurus", "Pachycephalosaurus", "Carnotaurus", "Therizinosaurus", "Giganotosaurus",
  "Deinonychus", "Compsognathus", "Archaeopteryx", "Dilophosaurus", "Gallimimus", "Corythosaurus",
  "Styracosaurus", "Kentrosaurus", "Megalosaurus", "Plateosaurus", "Baryonyx", "Suchomimus",
  "Amargasaurus", "Apatosaurus", "Maiasaura", "Protoceratops", "Oviraptor",
];

export const BIRDS = [
  "Bald Eagle", "Peregrine Falcon", "Barn Owl", "Great Horned Owl", "Snowy Owl", "Blue Jay",
  "Cardinal", "Robin", "Sparrow", "Hummingbird", "Woodpecker", "Kingfisher", "Toucan", "Macaw",
  "Parrot", "Flamingo", "Peacock", "Swan", "Heron", "Crane", "Stork", "Pelican", "Albatross",
  "Puffin", "Penguin", "Ostrich", "Emu", "Cassowary", "Kiwi", "Hawk", "Osprey", "Vulture",
  "Raven", "Crow", "Magpie", "Hoopoe", "Kookaburra", "Lyrebird", "Hornbill", "Quetzal",
];
