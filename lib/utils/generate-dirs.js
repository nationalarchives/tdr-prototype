const _ = require('lodash');

const foodItems = ["Baking powder", "Chocolate", "Coffee", "Tea", "Sugar", "Flour", "Milk", "Butter", "Egg", "Vanilla",
"Cinnamon", "Honey", "Salt", "Olive oil", "Yeast", "Peanut butter", "Almond", "Coconut", "Cherry",
"Blueberry", "Lemon", "Pumpkin", "Garlic", "Onion", "Tomato", "Basil", "Thyme", "Rosemary", "Cucumber",
"Spinach", "Avocado", "Cabbage", "Carrot", "Potato", "Broccoli", "Pepper", "Zucchini", "Quinoa",
"Rice", "Pasta", "Noodle", "Soy sauce", "Cumin", "Curry", "Ginger", "Paprika", "Mustard", "Sesame",
"Lime", "Orange", "Apple", "Banana", "Grape", "Strawberry", "Pineapple", "Watermelon", "Mango",
"Kiwi", "Peach", "Cranberry", "Raspberry", "Blackberry", "Walnut", "Pecan", "Cashew", "Pistachio",
"Hazelnut", "Chestnut", "Macadamia", "Peanut", "Sunflower", "Chia", "Poppy", "Pumpkin seed", "Hemp",
"Flaxseed", "Sesame seed", "Sunflower seed", "Cashew butter", "Almond butter", "Peanut sauce",
"Coconut milk", "Oat milk", "Soy milk", "Cashew milk", "Almond milk", "Rice milk", "Greek yogurt",
"Cottage cheese", "Cheddar", "Gouda", "Parmesan", "Feta", "Mozzarella", "Brie", "Camembert",
"Blue cheese", "Swiss cheese", "Goat cheese", "Hummus", "Guacamole", "Salsa", "Tzatziki", "Pesto",
"Tapenade", "Baba ganoush", "Ratatouille", "Stir-fry", "Sushi", "Burrito", "Taco", "Pizza", "Burger",
"Wrap", "Salad", "Soup", "Stew", "Curry", "Risotto", "Casserole", "Lasagna", "Frittata", "Omelette",
"Pancake", "Waffle", "French toast", "Muffin", "Scone", "Cupcake", "Brownie", "Cookie", "Cheesecake",
"Tiramisu", "Custard", "Pudding", "Ice cream", "Sorbet", "Smoothie", "Margarita", "Mojito", "Martini",
"Whiskey", "Tequila", "Champagne", "Red wine", "White wine", "Beer", "Cider", "Lemonade", "Iced tea",
"Coffee bean", "Espresso", "Latte", "Cappuccino", "Mocha", "Matcha", "Chai", "Bubble tea", "Protein shake",
"Detox water", "Herbal tea", "Ginger tea", "Chamomile tea", "Peppermint tea", "Green tea", "Black tea",
"Oolong tea", "Pu-erh tea", "Hibiscus tea", "Rooibos tea", "Mate tea", "Lavender", "Jasmine", "Rose",
"Eucalyptus", "Lemon balm", "Peppermint", "Lemongrass", "Lavender oil", "Rosemary oil", "Tea tree oil",
"Eucalyptus oil", "Peppermint oil", "Lemon oil", "Lime oil", "Orange oil", "Grapefruit oil", "Bergamot oil",
"Cinnamon oil", "Clove oil", "Frankincense oil", "Myrrh oil", "Patchouli oil", "Sandalwood oil",
"Chamomile oil", "Ylang-ylang oil", "Lavender candle", "Vanilla candle", "Cinnamon candle", "Sandalwood candle",
"Eucalyptus candle", "Rose candle", "Lemon candle", "Pine candle", "Jasmine candle", "Citrus candle",
"Ocean breeze candle", "Rainforest candle", "Mountain air candle", "Campfire candle", "Winter spice candle",
"Pumpkin spice candle", "Apple cider candle", "Chestnut candle", "Cranberry candle", "Gingerbread candle",
"Peppermint bark candle", "Holiday cheer candle", "Cozy blanket candle", "Sweater weather candle",
"Fireside candle", "Autumn leaves candle", "Harvest moon candle", "Spiced latte candle", "Maple syrup candle",
"Caramel apple candle", "Hot cocoa candle", "Snowflake candle", "Winter wonderland candle", "Frosty morning candle",
"Icy breeze candle", "Northern lights candle", "Ski lodge candle", "Alpine retreat candle", "Fireside chat candle",
"Cabin fever candle", "Mountain retreat candle", "Winter cabin candle", "Sleigh ride candle", "Snowy peak candle",
"Frozen lake candle", "Igloo candle", "Snow angel candle", "Snowman candle", "Snowball fight candle", "Winter sun candle",
"Sunset on the snow candle", "Winter magic candle", "Northern exposure candle", "Aurora borealis candle",
"Winter solstice candle", "Polar vortex candle", "Arctic blast candle", "Penguin party candle", "Arctic fox candle",
"Polar bear candle", "Walrus candle", "Seal candle", "Orca candle", "Beluga whale candle", "Narwhal candle",
"Puffin candle", "Polar owl candle", "Arctic hare candle", "Siberian husky candle", "Alaskan malamute candle",
"Eskimo candle", "Inuit candle", "Igloo village candle", "Ice sculpture candle", "Frozen waterfall candle",
"Glacier candle"]


let directoryStructure = [
  {
    "Gordon_Ramsay": {
      "children": [
        {
          "Julia_Child": {
            "children": [
              "Jamie_Oliver"
            ]
          }
        },
        {
          "Thomas_Keller": {
            "children": [
              "Alice_Waters"
            ]
          }
        }
      ]
    }
  },
  {
    "Ferran_Adria": {
      "children": [
        {
          "Bobby_Flay": {
            "children": [
              "Wolfgang_Puck"
            ]
          }
        },
        {
          "Ina_Garten": {
            "children": [
              "Emeril_Lagasse"
            ]
          }
        }
      ]
    }
  },
  {
    "Alain_Ducasse": {
      "children": [
        {
          "Giada_De_Laurentiis": {
            "children": [
              "Nigella_Lawson"
            ]
          }
        },
        {
          "Paul_Bocuse": {
            "children": [
              "Anthony_Bourdain"
            ]
          }
        }
      ]
    }
  },
  {
    "Ratatouille_Restaurant": {
      "children": [
        {
          "Per_Sebastian_Berglund": {
            "children": [
              "Massimo_Bottura"
            ]
          }
        },
        {
          "Daniel_Humm": {
            "children": [
              "Heston_Bluementhal"
            ]
          }
        }
      ]
    }
  },
  {
    "Nobu_Matsuhisa": {
      "children": [
        {
          "Yotam_Ottolenghi": {
            "children": [
              "Dominique_Crenn",
              "Gaggan_Anand",
              "Grant_Achatz"
            ]
          }
        },
        {
          "Joan_Roca": {
            "children": [
              "Marcus_Wareing"
            ]
          }
        }
      ]
    }
  },
  {
    "Alex_Atala": {
      "children": [
        {
          "Virgilio_Martinez": {
            "children": [
              "Clare_Smyth",
              "Helene_Darroze"
            ]
          }
        },
        {
          "David_Munoz": {
            "children": [
              "Enrique_Olvera"
            ]
          }
        }
      ]
    }
  },
  {
    "Mauro_Colagreco": {
      "children": [
        {
          "Daniel_Boulud": {
            "children": [
              "Guy_Fieri"
            ]
          }
        },
        {
          "Shinobu_Namae": {
            "children": [
              "Yoshihiro_Narisawa"
            ]
          }
        }
      ]
    }
  },
  {
    "Sergio_Herman": {
      "children": [
        {
          "Vicky_Lau": {
            "children": [
              "Pierre_Gagnaire",
              "Gaggan_Bangkok"
            ]
          }
        },
        {
          "Elena_Arzak": {
            "children": [
              "Dominique_Ansel",
              "Alain_Passard"
            ]
          }
        }
      ]
    }
  }
]


// Function to generate a random date in the specified format
function getRandomDate() {
  const day = _.random(1, 28).toString().padStart(2, '0');
  const month = _.random(1, 12).toString().padStart(2, '0');
  const year = _.random(2000, 2022).toString();

  return { "ldm-extracted-day": day, "ldm-extracted-month": month, "ldm-extracted-year": year };
}

// Function to generate a random file object
function generateRandomFileObject() {
  const randomFoodItem = _.sample(foodItems);
  const randomPath = sampleRandomPath(directoryStructure);

  const exts = [".txt", ".doc", ".docx", ".pdf", ".xls", ".xlsx", ".ppt", ".pptx", ".jpg", ".jpeg", ".png", ".gif", ".mp3", ".mp4", ".avi", ".zip", ".rar", ".tar", ".gz", ".json", ".xml", ".html", ".css", ".js", ".md", ".cpp", ".java", ".py", ".php", ".rb"];
  const ext = exts[Math.floor(Math.random() * exts.length)];
  const version = (Math.random() > 0.25) ? "" : ` version ${_.random(1, 10)}`;
  return {
    ...getRandomDate(),
    "name": `${randomFoodItem} ${_.random(1, 100)}${version}${ext}`,
    "path": randomPath
  };
}

function sampleRandomPath(directoryStructure) {
  const randomPath = [];

  function getRandomPathRecursive(node) {

    if (!node || !node.length) {
      return;
    }

    const randomNode = _.sample(node); //either object (if node) or string (if leaf)
    if(_.isString(randomNode)){
      randomPath.push(randomNode);
    } else {
      // If this is an object (i.e. not a string) there is
      // one key and that is the name
      randomPath.push(Object.keys(randomNode)[0]);
    }

    // Randomly end here a portion of the time.
    const randomStop = Math.random()

    if (randomStop > 0.5 && randomNode[Object.keys(randomNode)[0]].children) {
      getRandomPathRecursive(randomNode[Object.keys(randomNode)[0]].children);
    }
  }

  getRandomPathRecursive(directoryStructure);

  return randomPath.join('/');
}

// Generate an array of 200 random objects
const generatedObjects = Array.from({ length: 1000 }, generateRandomFileObject);

console.log(JSON.stringify(generatedObjects, null, 2));
