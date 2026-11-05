import type { ToolExtraContent } from "./types";

export const group2: Record<string, ToolExtraContent> = {
  "devops/apache-config-formatter": {
    about: [
      "Apache HTTP Server reads its settings from httpd.conf, from files under conf.d or sites-available, and from per-directory .htaccess files. These are plain directives such as ServerName or RewriteRule, grouped inside container sections like <VirtualHost>, <Directory>, <Location> and <IfModule>. After a few years of edits by different people, or a snippet copied from a forum answer, the indentation drifts and it becomes hard to see which directives belong to which block.",
      "This formatter trims every line and re-indents it by four spaces for each open container, stepping back one level on the matching closing tag. Blank lines and # comments stay where they were, so the result is easy to compare against the original in a diff.",
      "A useful check after formatting: look at the last few lines of the file. If </VirtualHost> or the final directive is still pushed to the right, a container above it was never closed — the same mistake that makes apachectl configtest report that a section \"was not closed\".",
    ],
    faq: [
      {
        question: "Can I change the indent size or use tabs?",
        answer: "No, the formatter always uses four spaces per nesting level. If your team prefers tabs or two spaces, a find-and-replace on the leading spaces in your editor will convert it afterwards.",
      },
      {
        question: "Why aren't my RewriteRule lines indented under RewriteCond?",
        answer: "RewriteCond and RewriteRule are ordinary directives, not containers, so they sit at the same level. Indentation only changes when a line opens or closes a <Tag> section such as <IfModule> or <Directory>.",
      },
      {
        question: "What happens to long directives split with a backslash?",
        answer: "Continuation lines are re-indented to the current block level like any other line. Their content is not joined, split or otherwise changed.",
      },
    ],
  },

  "devops/helm-values-formatter": {
    about: [
      "In a Helm chart, values.yaml holds the defaults that templates read through .Values — image tags, replica counts, resource limits, ingress hosts and so on. YAML uses indentation for structure, so a key that drifts by two spaces can quietly move under the wrong parent, and the chart then renders with a default you thought you had overridden.",
      "This page parses your file with the js-yaml library and writes it back out with 2- or 4-space indentation and no line wrapping. If the YAML can't be parsed, you see the parser's message with a line and column number instead of output, which is often the fastest way to find a stray tab or a misaligned list item. An optional compact (flow) style writes maps and lists inline in {key: value} and [a, b] form.",
      "Tip: if a value contains Helm template syntax such as {{ .Release.Name }}, wrap it in quotes first. Unquoted braces are read as a YAML flow mapping rather than text, so the output won't be what you expect.",
    ],
    faq: [
      {
        question: "Can I format a file with several documents separated by ---?",
        answer: "No, the parser expects a single YAML document, so a stream with multiple --- separated documents returns an error. Format each document on its own; a values.yaml file is normally a single document anyway.",
      },
      {
        question: "What does the compact (flow) style option do?",
        answer: "It writes the whole document in inline flow syntax, with maps in curly braces and lists in square brackets. That is handy for a quick one-line view, but most charts keep the default block style because it is easier to review.",
      },
      {
        question: "What happens to YAML anchors and aliases?",
        answer: "They are resolved when the file is parsed, so the output contains the expanded values. If the same object is reused, it may come back with a generated anchor name such as &ref_0 instead of the name you gave it.",
      },
    ],
  },

  "fun/random-animal": {
    about: [
      "A random animal generator picks animal names for you so you don't keep falling back on the same few favourites. This one draws from a fixed list of 50 animals that mixes big cats, bears, farm animals, marsupials such as the koala and wombat, primates, and sea life like the octopus, seahorse and walrus.",
      "Teachers use it for vocabulary and spelling games, artists use it as a sketch prompt, and families use it for charades or 20 questions. You can pick 1, 5, 10 or 20 names at a time; each entry has its own Copy button, and Copy all puts the whole batch on your clipboard with one name per line.",
      "Every name is chosen independently with the browser's crypto.getRandomValues, so repeats can happen inside one batch. With 50 animals and a batch of 5, the chance of at least one duplicate is about 19% (1 − 0.98 × 0.96 × 0.94 × 0.92 ≈ 0.19). If you need five different animals, click Regenerate until they're all distinct.",
    ],
    faq: [
      {
        question: "How many animals are in the random animal generator?",
        answer: "The list contains 50 animals, so any single pick has a 1 in 50 (2%) chance of being a particular animal.",
      },
      {
        question: "Does it show pictures of the animals?",
        answer: "No, it returns names only. That makes it a good drawing prompt, since you have to picture the animal yourself.",
      },
      {
        question: "Can I get a list of animals without repeats?",
        answer: "There is no no-repeat setting; each name is drawn separately. Choose a small batch and regenerate, or remove duplicates after using Copy all.",
      },
    ],
  },

  "fun/random-bird": {
    about: [
      "This generator suggests bird names from a list of 40, from backyard regulars like the robin, sparrow and blue jay to birds most people only see in documentaries, such as the cassowary, lyrebird, quetzal and hoopoe. The list includes birds of prey, owls, seabirds, tropical parrots and several flightless birds.",
      "It's handy for bird-themed trivia, school research assignments where each student needs a different bird, or a daily sketch prompt. Some entries are broad groups rather than one species — Woodpecker, Hummingbird and Parrot each cover hundreds of species — so narrowing one down to a specific bird can be part of the task.",
      "Choose 1, 5, 10 or 20 results per batch. Names are picked independently, so with 20 picks from 40 birds you will almost always see at least one repeat; regenerate or trim the list if you need every name to be different.",
    ],
    faq: [
      {
        question: "Are these real bird species?",
        answer: "Yes, every entry is a real bird. A few are family or group names, such as Cardinal or Woodpecker, rather than a single precise species.",
      },
      {
        question: "Does the random bird generator include flightless birds?",
        answer: "Yes, the ostrich, emu, cassowary, kiwi and penguin are all on the list.",
      },
      {
        question: "Does it play bird calls or show photos?",
        answer: "No, it only shows the bird's name. Search the name in a field guide or a site like the Cornell Lab's All About Birds for photos and recordings.",
      },
    ],
  },

  "fun/random-book": {
    about: [
      "When you can't decide what to read next, a random book picker takes the choice out of your hands. This one draws from 30 well-known titles: 19th-century classics such as Pride and Prejudice, Moby-Dick and Crime and Punishment; modern novels like 1984, One Hundred Years of Solitude and The Kite Runner; fantasy including The Hobbit and A Game of Thrones; and three popular non-fiction books — Sapiens, Educated and Atomic Habits.",
      "Book clubs use it to choose the next title without arguing, and readers use it for reading challenges. One approach: generate 10 titles and commit to the first one you haven't read yet. Most entries are easy to find in libraries, secondhand shops and as ebooks.",
      "Only the title is shown, without the author or a summary. A few entries, such as The Chronicles of Narnia, are a whole series rather than a single book, so you'll need to choose where to start.",
    ],
    faq: [
      {
        question: "Is this a personalized book recommendation tool?",
        answer: "No, it picks at random from a fixed list and knows nothing about your taste or reading history. It's meant to give you a starting point, not a tailored suggestion.",
      },
      {
        question: "Are the books suitable for children?",
        answer: "Some are, like The Little Prince, The Hobbit, The Chronicles of Narnia and the first Harry Potter book. Others, such as Crime and Punishment or 1984, are aimed at adult readers, so check before handing a result to a child.",
      },
      {
        question: "How many books can it choose from?",
        answer: "The list holds 30 titles, and you can generate 1, 5, 10 or 20 at once.",
      },
    ],
  },

  "fun/random-city": {
    about: [
      "The random city generator returns names from a list of 57 major cities across North and South America, Europe, Africa, Asia and Oceania. Capitals such as Tokyo, Cairo and Nairobi sit alongside large non-capital hubs like Mumbai, Shanghai, São Paulo and Sydney. Names keep their accents, so Bogotá and São Paulo copy exactly as they are spelled locally.",
      "It works well for geography practice: generate five cities and try to name the country for each, or place them on a blank map. Travel planners use it to break a tie between destinations, and writers use it to pick a setting for a story or a character's hometown.",
      "Only city names are returned — no country, population, time zone or coordinates. Each pick is made separately, so the same city can show up twice in one batch, especially when you generate 20 at once.",
    ],
    faq: [
      {
        question: "How many cities does the random city generator include?",
        answer: "It picks from 57 large cities spread over every inhabited continent. Smaller towns and regional cities are not included.",
      },
      {
        question: "Does it show which country each city is in?",
        answer: "No, it shows the city name only. That makes it useful for quizzes where the player has to name the country.",
      },
      {
        question: "Can I use it to pick a random travel destination?",
        answer: "Yes, many people use it for trip ideas. Treat the result as inspiration and check visas, costs and travel advice for the city before booking anything.",
      },
    ],
  },

  "fun/random-country": {
    about: [
      "This generator picks from a list of 51 countries and shows each one with its flag emoji in front of the name. The list covers every inhabited continent: large economies like the United States, China and Germany, plus countries such as Morocco, Kenya, Peru, Vietnam and New Zealand. It is a curated set of well-known countries, not all 195 recognised states.",
      "Teachers use it to assign a \"country of the week\" for research, Model UN groups use it to hand out delegations, and friends use it to choose a cuisine for a themed dinner. Each pick has a roughly 2% chance (1 in 51) of being any particular country.",
      "Copy all copies the flag emoji and the name together, one country per line, which pastes cleanly into a chat or spreadsheet. On Windows, many browsers show flag emoji as two letters such as JP instead of a picture, because Windows doesn't include flag images in its emoji font; the country name is unaffected.",
    ],
    faq: [
      {
        question: "Why do I see two letters instead of a flag?",
        answer: "Flag emoji are built from two letter codes, and some systems — most notably Windows — don't have pictures for them, so the letters are shown instead. The same text will display as a flag on phones and Macs.",
      },
      {
        question: "Can the same country come up twice?",
        answer: "Yes, each country is drawn independently, so repeats are possible within a batch. Regenerate if you need every result to be different.",
      },
    ],
  },

  "fun/random-dinosaur": {
    about: [
      "A random dinosaur generator gives you a prehistoric name to research, draw or quiz on. This one draws from 34 names, from household favourites like Tyrannosaurus Rex, Triceratops and Velociraptor to lesser-known genera such as Therizinosaurus, Amargasaurus and Suchomimus.",
      "It suits classroom projects where each student researches a different animal — when it lived, what it ate and where its fossils were found — and it makes a quick prompt for drawing, clay modelling or a dinosaur-themed party game. Generate 1, 5, 10 or 20 names at a time and copy them individually or all at once.",
      "Brontosaurus and Apatosaurus both appear on the list. For about a century they were treated as the same animal, but a 2015 study argued that Brontosaurus is different enough to be its own genus, which makes the pair a good talking point with curious kids.",
    ],
    faq: [
      {
        question: "Is Pteranodon a dinosaur?",
        answer: "No. Pteranodon, which is on this list because people often think of it as one, was a pterosaur — a flying reptile closely related to dinosaurs but not part of the group.",
      },
      {
        question: "How many dinosaurs are in the generator?",
        answer: "There are 34 names in the list, covering meat-eaters, long-necked sauropods, horned and armoured plant-eaters, and a few bird-like species such as Archaeopteryx.",
      },
      {
        question: "Does it tell me when each dinosaur lived?",
        answer: "No, it only gives the name. Look the name up in a natural history museum's website or an encyclopedia for its period, size and diet.",
      },
    ],
  },

  "fun/random-drink": {
    about: [
      "Stuck on what to order or make? This generator suggests a drink from a list of 29 non-alcoholic options: coffee-shop staples like espresso, cappuccino and matcha latte, teas such as green, hibiscus and chai, juices and smoothies, sodas like cola and root beer, and drinks from different food traditions such as mango lassi and horchata.",
      "Cafés and home baristas use it to pick a \"drink of the day\", party hosts use it to choose a mocktail theme, and it's a simple way to vary what you drink during the week instead of defaulting to the same coffee.",
      "Several suggestions contain caffeine — espresso drinks, cola, chai, green tea and matcha among them — so if you're choosing something for the evening or for children, regenerate past those. Results are drink names only, with no recipes or nutrition details.",
    ],
    faq: [
      {
        question: "Is kombucha alcoholic?",
        answer: "Kombucha is fermented, so it can contain a trace of alcohol, but drinks sold as non-alcoholic are typically kept below 0.5% ABV. Homemade kombucha can end up stronger.",
      },
      {
        question: "Does the random drink generator give recipes?",
        answer: "No, it only suggests the name of a drink. Search the name for a recipe once you've picked one.",
      },
      {
        question: "How many drinks can it suggest?",
        answer: "It picks from 29 drinks, and you can generate 1, 5, 10 or 20 at a time.",
      },
    ],
  },

  "fun/random-flag": {
    about: [
      "The random flag generator shows a grid of country flags with the country name under each one. It picks from the same 51 countries used by the random country tool, and you can display 1, 4, 6, 12 or 20 flags at a time; six is the default.",
      "Each flag is a standard Unicode emoji built from the country's two-letter ISO 3166-1 code. The code is turned into a pair of special \"regional indicator\" characters — G and B become the flag of the United Kingdom — and your device draws the matching picture.",
      "For a flag quiz, cover the names with your hand or a sheet of paper, call out your answers, then check. Similar-looking flags make good practice: Indonesia and Poland both appear on the list and use the same red and white in opposite order.",
    ],
    faq: [
      {
        question: "Can I copy the flags?",
        answer: "This tool has no copy button, but you can select the text in the grid. If you want one-click copying, the Random Country Generator shows the same flags next to each name and has Copy and Copy all buttons.",
      },
      {
        question: "Does it include every country's flag?",
        answer: "No, it uses a curated list of 51 countries across all inhabited continents. Many smaller nations and territories are not included.",
      },
      {
        question: "Does it show state, regional or historical flags?",
        answer: "No, only current national flags from the country list are shown.",
      },
    ],
  },

  "fun/random-food": {
    about: [
      "Deciding what to cook or order is a small decision that takes up more time than it should. This generator picks from 44 well-known dishes from Italian, Japanese, Mexican, Indian, Chinese, Korean, Thai, Vietnamese, Middle Eastern and Greek cooking, plus European comfort food — pho, bibimbap, biryani, paella, goulash, schnitzel and plenty more.",
      "A simple way to use it at home: generate five dishes, cross out anything you lack ingredients for, and cook the first one left. For a group, generate one dish per person and vote. For a weekly plan, generate ten and assign one to each night, skipping any repeats.",
      "Results are dish names only — no recipes, nutrition facts or allergen information — so check ingredients yourself if anyone in the group has a food allergy or dietary restriction.",
    ],
    faq: [
      {
        question: "Are the dishes vegetarian?",
        answer: "Some are, such as falafel, hummus and gnocchi, but many include meat or fish. There is no vegetarian filter, so regenerate past anything that doesn't fit your diet.",
      },
      {
        question: "How many dishes are in the random food generator?",
        answer: "The list has 44 dishes, and you can generate 1, 5, 10 or 20 at once.",
      },
      {
        question: "Can it suggest restaurants near me?",
        answer: "No, it doesn't use your location or any restaurant data. Once you have a dish, search for it in a maps or delivery app.",
      },
    ],
  },

  "fun/random-fruit": {
    about: [
      "This tool picks fruit names from a list of 36, ranging from everyday supermarket fruit like apples, bananas, oranges and grapes to tropical and seasonal ones such as lychee, dragon fruit, jackfruit, persimmon and star fruit. Berries, citrus fruits, melons and stone fruits are all represented.",
      "Parents use it to turn trying new foods into a game — generate one fruit a week and buy it on the next shopping trip. It also works for smoothie experiments: generate two or three fruits and blend whatever comes up. Teachers use it for spelling and alphabet activities with younger children.",
      "Some entries are hard to find fresh in certain regions or seasons. If a result isn't available locally, frozen or canned versions of fruits like mango, pineapple and lychee are often easier to get. Each name is drawn independently, so a batch of 10 or 20 can contain the same fruit more than once.",
    ],
    faq: [
      {
        question: "How many fruits are included?",
        answer: "The generator picks from 36 fruits, from common ones like apple and banana to less familiar ones like guava and persimmon.",
      },
      {
        question: "Is a tomato in the fruit list?",
        answer: "No. Tomatoes are botanically fruits, but because most people cook with them as a vegetable, they appear in the Random Vegetable Generator instead.",
      },
      {
        question: "Does it include exotic fruits?",
        answer: "Yes, about a third of the list is tropical or less common fruit, including dragon fruit, passion fruit, jackfruit, lychee and star fruit.",
      },
    ],
  },

  "fun/random-game": {
    about: [
      "If your backlog is long or your friends can't agree on what to play, a random game picker settles it. The list holds 30 titles across genres: open-world adventures like Breath of the Wild, Red Dead Redemption 2 and The Witcher 3; tough action games such as Elden Ring and Dark Souls III; indie favourites like Hollow Knight, Celeste, Hades and Stardew Valley; competitive multiplayer like Valorant, League of Legends and Rocket League; and party games such as Among Us and Fall Guys.",
      "Two classics that aren't tied to any console, Tetris and chess, are on the list too. One way to use it: generate 10 titles, cross out everything you don't own, and play the first one left for the evening.",
      "Platform availability varies — Super Mario Odyssey and Animal Crossing: New Horizons are Nintendo Switch exclusives, while many others run on PC and several consoles — so check before buying anything.",
    ],
    faq: [
      {
        question: "Are any of the games free to play?",
        answer: "Yes, several are free-to-play, including Fortnite, Valorant, League of Legends, Rocket League and Overwatch 2. Most of the others are paid games.",
      },
      {
        question: "Does it include board games?",
        answer: "Chess is the only board game on the list; everything else is a video game.",
      },
      {
        question: "How many games can the random game generator pick from?",
        answer: "It draws from 30 titles, and you can generate 1, 5, 10 or 20 suggestions at a time.",
      },
    ],
  },

  "fun/random-movie": {
    about: [
      "Choosing a film can take longer than watching one. This generator picks from 35 widely seen movies spanning several decades and genres: crime classics like The Godfather and Goodfellas, science fiction such as The Matrix, Interstellar and Dune, recent award winners including Parasite and Everything Everywhere All at Once, and animation from Toy Story to Spirited Away and Coco.",
      "A fair way to run a movie night: everyone generates one title, then you vote or work through them over several weeks. Two entries, Star Wars and The Lord of the Rings, are series rather than single films, so you'll still need to pick an installment.",
      "Each title is drawn independently. In a batch of 5, the chance of seeing the same movie twice is about 26%, so regenerate if you want five different options. Age ratings vary a lot across the list — Pulp Fiction and Fight Club are not family films — so check before watching with children.",
    ],
    faq: [
      {
        question: "Are there animated movies in the list?",
        answer: "Yes, eight of the 35 titles are animated: The Lion King, Toy Story, Finding Nemo, Up, The Incredibles, Spirited Away, Coco and Spider-Man: Into the Spider-Verse.",
      },
      {
        question: "Can I filter the random movies by genre or year?",
        answer: "No, there are no filters. Generate a larger batch, such as 10 or 20, and pick the result that fits your mood.",
      },
    ],
  },

  "fun/random-pokemon": {
    about: [
      "This unofficial fan tool picks names from 66 of the 151 original Generation I Pokémon, the ones from the first Red, Blue and Yellow games. The list includes all three starter lines, Pikachu, Eevee, Snorlax, Lapras, Magikarp, Mewtwo and Mew, but not every first-generation Pokémon or evolution.",
      "People use it to pick a starter for a replay, to settle which Pokémon to draw next, or to build a challenge team. For a six-member team, set the count to 10 and take the first six distinct names; if a name repeats, skip it.",
      "Each pick is independent, so every listed Pokémon has the same 1 in 66 chance — about 1.5% — of appearing in any single slot. Names are shown as plain text, with Copy and Copy all buttons for pasting into a chat or a team planner.",
    ],
    faq: [
      {
        question: "Does it include all 151 Generation I Pokémon?",
        answer: "No, it uses a selection of 66 well-known Generation I Pokémon rather than the full Pokédex.",
      },
      {
        question: "Can it give me legendary Pokémon?",
        answer: "Mewtwo and Mew are on the list, but the legendary birds Articuno, Zapdos and Moltres are not.",
      },
    ],
  },

  "fun/random-tv-show": {
    about: [
      "This generator suggests a series from a list of 30 popular, well-reviewed shows. It mixes drama (Breaking Bad, Succession, The Crown), comedy (The Office, Friends, Ted Lasso, Brooklyn Nine-Nine), science fiction and fantasy (Stranger Things, Black Mirror, The Witcher), animation (The Simpsons, Rick and Morty, Avatar: The Last Airbender) and anime such as Attack on Titan and Naruto.",
      "Before you start, check how big a commitment the result is. Chernobyl is a five-episode miniseries you can finish in a weekend, while One Piece has more than 1,000 anime episodes.",
      "Several picks are not originally in English — Money Heist is Spanish, Dark is German and Squid Game is Korean — and are usually available with subtitles or dubbing. If you're choosing for a group, generate 5 titles and let everyone veto one until a single show is left.",
    ],
    faq: [
      {
        question: "Does the random TV show generator include anime?",
        answer: "Yes, Attack on Titan, One Piece and Naruto are on the list, along with Western animated series like Avatar: The Last Airbender.",
      },
      {
        question: "Does it tell me which streaming service has the show?",
        answer: "No. Streaming availability changes often and differs by country, so check your services or a site like JustWatch after you pick a show.",
      },
      {
        question: "How many shows are in the list?",
        answer: "There are 30 shows, and you can generate 1, 5, 10 or 20 at once.",
      },
    ],
  },

  "fun/random-vegetable": {
    about: [
      "This tool picks vegetables from a list of 34, covering leafy greens like spinach, kale and bok choy, roots such as carrot, beetroot, turnip and radish, brassicas like broccoli and Brussels sprouts, squashes, peppers, and kitchen staples like onion, garlic and ginger.",
      "It's useful for an \"eat the rainbow\" challenge, for letting kids choose the vegetable for dinner, or for using up a weekly produce box. A practical approach: generate three vegetables and build a stir-fry, soup or tray bake around them.",
      "The list follows how vegetables are used in cooking rather than strict botany. Tomato, cucumber, zucchini, eggplant, bell pepper, pumpkin and corn develop from flowers and are technically fruits, ginger is a rhizome, and mushrooms are fungi rather than plants — but all of them are handled like vegetables in the kitchen.",
    ],
    faq: [
      {
        question: "Why is tomato listed as a vegetable?",
        answer: "Botanically a tomato is a fruit, but it's cooked and sold as a vegetable, and the generator follows kitchen usage.",
      },
      {
        question: "Is a mushroom a vegetable?",
        answer: "Strictly speaking no — mushrooms are fungi. They're included because they're bought and cooked alongside vegetables.",
      },
      {
        question: "How many vegetables are in the random vegetable generator?",
        answer: "It picks from 34 vegetables, and each batch can contain 1, 5, 10 or 20 suggestions.",
      },
    ],
  },

  "go/formatter": {
    about: [
      "Go code is normally formatted with gofmt, which most editors run on save. Sometimes that isn't available: a snippet pasted into a Jira ticket or chat message with its formatting stripped, Go code copied from a PDF or web page, or a quick review on a machine without the Go toolchain. This tool runs gofmt itself, compiled to WebAssembly, right in your browser.",
      "Because it is the real gofmt, the output is canonical: tab indentation, standard spacing around operators, struct fields and trailing comments lined up in columns, grouped imports and one statement per line. You can paste a whole file, or just a few functions or statements without a package line.",
      "The result can go straight into a .go file and will pass a gofmt check in CI without further changes.",
    ],
    faq: [
      {
        question: "Why does gofmt use tabs instead of spaces?",
        answer: "Tabs for indentation and spaces for alignment is the official Go style, so every Go project looks the same. Editors show a tab at whatever width you prefer, usually 4 or 8 columns.",
      },
      {
        question: "Is it safe for multi-line raw strings?",
        answer: "Yes. Backtick strings, including multi-line ones with embedded SQL or templates, are left exactly as written.",
      },
      {
        question: "Will the Go formatter find syntax errors?",
        answer: "Yes. gofmt parses the code first, so a missing brace or parenthesis is reported with its line and column, for example \"2:12: expected ')', found '{'\".",
      },
    ],
  },

  "html/decoder": {
    about: [
      "HTML entities are codes like &amp;, &lt;, &quot; and &#233; that stand in for characters in HTML source. You run into them outside a browser all the time: an API response or JSON field that stores escaped HTML, an RSS feed, a CMS or database export, scraped page source, or log output where every quote has turned into &quot;. Decoding turns that text back into what a reader would actually see.",
      "The decoder hands your text to the browser's own HTML parser through a textarea element, so it recognises every named entity in the HTML standard as well as decimal (&#233;) and hexadecimal (&#xE9;) codes. Tags in the input stay as plain text: &lt;p&gt; becomes <p> in the output, but nothing is rendered or run.",
      "Watch out for &nbsp;. It decodes to a non-breaking space (U+00A0), which looks like a normal space but won't match one in code comparisons or a search for \" \".",
    ],
    faq: [
      {
        question: "Why does my text still contain &lt; after decoding?",
        answer: "The text was probably encoded twice, so &lt; was stored as &amp;lt;. Each pass removes one layer, so paste the output back into the input to decode it again.",
      },
      {
        question: "What is the difference between decoding and unescaping HTML?",
        answer: "In practice they mean the same thing: converting entities such as &amp; and &lt; back into the characters & and <.",
      },
    ],
  },

  "html/encoder": {
    about: [
      "This encoder converts the five characters that are reserved in HTML — & < > \" ' — into entities, and also turns every non-ASCII character into a numeric code. For example, \"Café — 5€\" becomes \"Caf&#233; &#8212; 5&#8364;\". The output is plain ASCII, so it survives systems that might otherwise mangle accented letters, symbols or emoji.",
      "That is useful when you don't control the character encoding at the other end: an older CMS field, an email template passed through several sending systems, an XML or RSS feed that must stay ASCII, or a legacy database column that only stores Latin-1. Browsers decode the entities when rendering, so readers see the original text.",
      "There is a size cost. An é takes 2 bytes in UTF-8 but 6 characters as &#233;, and the grinning-face emoji (U+1F600) takes 4 bytes but becomes the 9-character &#128512;. If your page is already served as UTF-8, the HTML Escape tool is usually the better choice because it leaves those characters readable in the source.",
    ],
    faq: [
      {
        question: "Why does it use numeric codes instead of names like &eacute;?",
        answer: "Numeric codes exist for every Unicode character, while named entities only cover a limited set. Both display the same in a browser.",
      },
      {
        question: "Does it encode spaces or line breaks?",
        answer: "No, ordinary ASCII characters, including spaces, tabs and new lines, are left as they are. It never inserts &nbsp;.",
      },
      {
        question: "Can I use the encoded output in XML?",
        answer: "Yes, numeric character references like &#233; and the entities &amp;, &lt;, &gt; and &quot; are all valid in XML.",
      },
    ],
  },

  "html/escape": {
    about: [
      "Escaping HTML means replacing the five characters that have special meaning in markup — & < > \" ' — with entities, so a browser shows them as text instead of reading them as tags or attribute boundaries. For example, Tom & Jerry's \"Adventures\" becomes Tom &amp; Jerry&#39;s &quot;Adventures&quot;. Every other character, including accented letters and emoji, is left untouched.",
      "The most common use is showing code on a web page: escape an HTML snippet before putting it in a blog post, documentation page or wiki so readers see the tags rather than the browser rendering them. It's also useful for putting user-supplied text into an attribute value, or for writing a bug report in a tool that interprets HTML.",
      "Escaping protects HTML text and quoted attribute values, but not every context. Text placed inside a <script> block, a style attribute or an href that could start with javascript: needs context-specific encoding or validation as well.",
    ],
    faq: [
      {
        question: "Why is the apostrophe escaped as &#39; instead of &apos;?",
        answer: "&apos; was not defined in HTML 4, so some older browsers and email clients don't recognise it. The numeric form &#39; works everywhere.",
      },
      {
        question: "Do I really need to escape > and quotes?",
        answer: "In normal text only & and < are strictly required, and inside an attribute you must escape the quote character you used. Escaping all five is a safe default that works in both places.",
      },
      {
        question: "How do I display HTML code on a web page?",
        answer: "Escape the snippet with this tool, then place the result inside <pre><code> … </code></pre>. The browser will show the tags as text with the original line breaks.",
      },
    ],
  },

  "html/formatter": {
    about: [
      "An HTML formatter, sometimes called a beautifier, turns minified or messy markup into an indented tree you can actually read. Typical situations: inspecting a page's minified source, cleaning up an HTML email template exported from a marketing platform, reading the HTML returned by an API or templating engine, or preparing two versions of a page for a side-by-side diff.",
      "The formatter puts each tag and each run of text on its own line and indents child elements by 2 spaces, 4 spaces or a tab. Void elements like <br> and <img> don't add a level, and the contents of <script>, <style>, <pre> and <textarea> are kept as written. You can copy the result, download it as formatted.html, or press Minify to collapse it again.",
      "The formatter doesn't close tags for you. If indentation keeps creeping to the right toward the end of the file, the source most likely leaves out end tags such as </li> or </p>, which browsers add implicitly.",
    ],
    faq: [
      {
        question: "Why did a space appear between two words after formatting?",
        answer: "Inline elements written back to back, like <b>one</b><i>two</i>, are placed on separate lines, and the new line break renders as a space. Join those lines again where the gap matters.",
      },
      {
        question: "Does the HTML formatter check my markup for errors?",
        answer: "No, it only re-indents and does not report invalid or mismatched tags. Use the W3C Markup Validation Service at validator.w3.org to check for errors.",
      },
    ],
  },

  "html/minifier": {
    about: [
      "Minifying HTML strips out the characters a browser doesn't need — comments, indentation and line breaks — so the file is smaller. It's useful for static pages without a build step, for HTML email templates (Gmail clips messages larger than about 102 KB), and for embedding markup in a JSON string or a JavaScript variable where one line is easier to handle.",
      "This minifier removes comments while keeping conditional comments such as <!--[if mso]>, collapses runs of whitespace into a single space, and removes whitespace between tags. The contents of <script>, <style>, <pre> and <textarea> are copied across unchanged. Byte counts above both panels show the saving: for example, going from 12,400 to 9,300 bytes is a 25% reduction.",
      "Check inline text afterwards. Because whitespace between tags is removed completely, <b>Hello</b> <i>world</i> becomes <b>Hello</b><i>world</i> and displays as \"Helloworld\". Moving the space inside one of the elements avoids that.",
    ],
    faq: [
      {
        question: "Does it minify inline CSS and JavaScript?",
        answer: "No, the contents of <style> and <script> tags are kept exactly as written. Run them through the CSS and JavaScript minifiers separately if you want them compressed too.",
      },
      {
        question: "Does it remove optional tags or attribute quotes?",
        answer: "No, only comments and whitespace are removed. Tags, attributes and their quotes stay as you wrote them, which keeps the output predictable.",
      },
      {
        question: "Is it safe for Outlook email templates?",
        answer: "Conditional comments that start with <!--[if are kept, so Outlook-specific blocks survive. Still send a test email, since the joined-words issue with inline elements can affect email text too.",
      },
    ],
  },

  "html/preview": {
    about: [
      "HTML Preview renders whatever you type into a live page next to the editor, so you can try a snippet from a tutorial, prototype a small component, or check how a layout behaves at the Tablet (768px) and Mobile (390px) widths without creating a file or starting a local server.",
      "The page is loaded into an iframe through its srcdoc attribute with the sandbox set to allow-scripts and allow-modals. Scripts run and alert() or confirm() dialogs appear, but the page gets a unique, isolated origin: it cannot read this site's cookies or storage, cannot open pop-up windows, cannot submit forms, and cannot navigate the main browser tab.",
      "Relative paths such as styles.css or images/logo.png won't load files from your computer, because they resolve against this website. Put CSS in a <style> block, use full https:// links for images and libraries, or embed small images as data URIs. Anything you link from a CDN is fetched over the internet, so the preview isn't fully offline in that case.",
    ],
    faq: [
      {
        question: "Why doesn't my form submit in the HTML preview?",
        answer: "The sandbox doesn't include allow-forms, so form submission is blocked. You can still test form layout and handle the submit event in JavaScript with event.preventDefault().",
      },
      {
        question: "Why does localStorage throw an error in the preview?",
        answer: "The sandboxed page runs at an isolated origin without allow-same-origin, so the browser blocks localStorage, sessionStorage and cookies and throws a security error. Test storage code in a regular page instead.",
      },
      {
        question: "Can I use Bootstrap or Tailwind from a CDN?",
        answer: "Yes, add the <link> or <script> tag with the full CDN URL and it loads like on any page, as long as you're online. Scripts are allowed in the sandbox, so CDN-based JavaScript works too.",
      },
    ],
  },
};
