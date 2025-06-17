const version = localStorage.getItem('gender');
const savedGender = localStorage.getItem('gender');
const currentPath = window.location.pathname;
const fileName = currentPath.split('/').pop();

if (!localStorage.getItem("gender") && !window.location.pathname.includes("index.html")) {
  window.location.href = "index.html";
}
if (fileName !== 'index.html' && (savedGender === 'boy' || savedGender === 'girl')) {
  document.body.classList.add(savedGender);
}
// Общие ссылки
const links = {
  main: {
    cell1: 'exercise.html',
    cell2: 'teory.html',
    cell3: 'alphabet.html',
    cell4: 'faq.html',
  },
  exercises: [
    "exercise1.html",
    "exercise2.html",
    "exercise3.html",
    "exercise4.html",
    "exercise5.html"
  ],
  mainPage: "main.html",
  audioFolder: savedGender === 'boy' ? "src/audiomen" : "src/audiowomen"
};

// Функция для назначения переходов по плиткам
function setLink(id, link) {
  const elem = document.getElementById(id);
  if (elem) {
    elem.style.cursor = 'pointer';
    elem.addEventListener('click', () => {
      window.location.href = link;
    });
  }
}

// Назначение переходов для плиток
if (savedGender) {
  Object.entries(links.main).forEach(([key, url]) => {
    setLink(`main-grid_${key}`, url);
  });

} else {
  console.warn('Пол не выбран');
}
const boyBlock = document.getElementById('boy');
const girlBlock = document.getElementById('girl');

if (boyBlock) {
  boyBlock.addEventListener('click', () => {
    localStorage.setItem('gender', 'boy');
    window.location.href = 'main.html';
  });
  boyBlock.addEventListener('mouseenter', () => document.body.classList.add('boy-hover'));
  boyBlock.addEventListener('mouseleave', () => document.body.classList.remove('boy-hover'));
}

if (girlBlock) {
  girlBlock.addEventListener('click', () => {
    localStorage.setItem('gender', 'girl');
    window.location.href = 'main.html';
  });
  girlBlock.addEventListener('mouseenter', () => document.body.classList.add('girl-hover'));
  girlBlock.addEventListener('mouseleave', () => document.body.classList.remove('girl-hover'));
}

function updateEmojis() {
  // Эмодзи для разных разделов в зависимости от пола
  const emojis = {
      exercises: {
          boy: "🧑🏻‍🏫", // Для мальчиков
          girl: "👩🏻‍🏫"  // Для девочек
      },
      theory: {
          boy: "📘", // Для мальчиков
          girl: "📚"  // Для девочек
      },
      alphabet: {
          boy: "🔤", // Для мальчиков
          girl: "🅰️"  // Для девочек
      },
      faq: {
          boy: "🙋🏻‍♂️", // Для мальчиков
          girl: "🙋🏻‍♀️"  // Для девочек
      }
  };

  // Получаем все элементы с эмодзи
  const emojiElements = document.querySelectorAll('.main_grid_grid-cell_emoji');

  // Устанавливаем эмодзи для каждой клетки
  emojiElements.forEach((emojiElement, index) => {
      switch (index) {
          case 0: // Для "Упражнений"
              emojiElement.textContent = savedGender === 'boy' ? emojis.exercises.boy : emojis.exercises.girl;
              break;
          case 1: // Для "Теории"
              emojiElement.textContent = savedGender === 'boy' ? emojis.theory.boy : emojis.theory.girl;
              break;
          case 2: // Для "Алфавита"
              emojiElement.textContent = savedGender === 'boy' ? emojis.alphabet.boy : emojis.alphabet.girl;
              break;
          case 3: // Для "FAQ"
              emojiElement.textContent = savedGender === 'boy' ? emojis.faq.boy : emojis.faq.girl;
              break;
          default:
              emojiElement.textContent = "";
      }
  });
}

// Вызываем функцию для обновления эмодзи
updateEmojis();

// === Алфавит: переключение произношения ===
const toggleSwitch = document.getElementById('toggle-switch');
const blocks = document.querySelectorAll('.main_grid-alphabet_cell_half1_trans');

// Исходные и новые данные для отображения
const originalContent = [
  "[ei]", "[bi]", "[si]", "[di]", "[i]", "[ef]", "[dʒi]", "[eich]", "[ai]", "[dʒei]",
  "[kei]", "[el]", "[em]", "[en]", "[ou]", "[pi]", "[kju]", "[ɑː]", "[es]", "[ti]",
  "[juː]", "[vi]", "[double-u]", "[eks]", "[wai]", "[zed]"
];
const newContent = [
  "[эй]", "[би]", "[си]", "[ди]", "[и]", "[эф]", "[джи]", "[эйч]", "[ай]", "[джей]",
  "[кей]", "[эл]", "[эм]", "[эн]", "[ау]", "[пи]", "[кью]", "[ар]", "[эс]", "[ти]",
  "[ю]", "[ви]", "[дабл-ю]", "[экс]", "[уай]", "[зед]"
];

// Функция для смены контента
function changeContent(content) {
  blocks.forEach((block, i) => block.textContent = content[i]);
}

// Переключение контента при изменении состояния тумблера
if (toggleSwitch) {
  toggleSwitch.addEventListener('change', () => {
    changeContent(toggleSwitch.checked ? newContent : originalContent);
  });
}

// Изначально отображаем оригинальный контент
changeContent(originalContent);

// === Проигрывание звуков ===
const gender = localStorage.getItem('gender');
const audioFolder = gender === 'boy' ? "src/audiomen" : "src/audiowomen";

// Функция для воспроизведения звука
function playSound(letter) {
  const audio = new Audio(`${audioFolder}/${letter.toLowerCase()}.mp3`);
  audio.play();
}

// Добавляем обработчики событий для ячеек
document.querySelectorAll('.main_grid-alphabet_cell').forEach(cell => {
  const letterBlock = cell.querySelector('.main_grid-alphabet_cell_half1_bukva');
  if (letterBlock) {
    const letter = letterBlock.textContent.trim()[0];
    cell.addEventListener('click', () => playSound(letter));
  }
});
// === Раскрытие блоков с видео ===
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".main-exercise_grid-item");

  items.forEach((item) => {
    const video = item.querySelector("video");
    const clickableCell = item.querySelector(".main-exercise_grid-item-cell");

    clickableCell.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      items.forEach((otherItem) => {
        otherItem.classList.remove("active");
        const otherVideo = otherItem.querySelector("video");
        if (otherVideo) {
          otherVideo.pause();
          otherVideo.currentTime = 0;
        }
      });

      if (!isActive) {
        item.classList.add("active");
        if (video) {
          setTimeout(() => {
            video.currentTime = 0;
            video.play().catch(err => console.warn("Не удалось запустить видео:", err));
          }, 500);
        }
      }
    });
  });

  // === Переход по кнопке "Начать" внутри упражнения
  const startButtons = document.querySelectorAll(".main-exercise_grid-item-cell-expanding-block-half-button");

if (version && links.exercises) {
  const exercises = links.exercises;
  startButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const url = exercises[index];
      if (url) {
        window.location.href = url;
      } else {
        console.warn("Для этой кнопки не задан адрес перехода");
      }
    });
  });
}
});

// Функция для случайного выбора элемента из массива
function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const questionsByGender = {
  boy: {
    easy: [
      { sentence: "He ___ to school every day.", correctAnswer: "goes", options: ["goes", "go", "going", "went"] },
      { sentence: "He ___ breakfast now.", correctAnswer: "is eating", options: ["eats", "is eating", "eat", "eating"] },
      { sentence: "He ___ a book yesterday.", correctAnswer: "read", options: ["reads", "read", "reading", "is reading"] },
      { sentence: "He ___ to the park tomorrow.", correctAnswer: "will go", options: ["go", "goes", "will go", "going"] },
      { sentence: "He ___ TV right now.", correctAnswer: "is watching", options: ["watches", "is watching", "watch", "watching"] },
      { sentence: "He ___ football every Sunday.", correctAnswer: "plays", options: ["play", "playing", "plays", "is playing"] },
      { sentence: "He ___ his homework last night.", correctAnswer: "did", options: ["does", "do", "did", "doing"] },
      { sentence: "He ___ to music now.", correctAnswer: "is listening", options: ["listens", "is listening", "listen", "listened"] },
      { sentence: "He ___ to school by bus.", correctAnswer: "goes", options: ["go", "goes", "going", "went"] },
      { sentence: "He ___ lunch at 12:00.", correctAnswer: "has", options: ["have", "has", "having", "had"] }
    ],
    medium: [
      { sentence: "He ___ to school every day.", correctAnswer: "goes", options: ["goes", "went", "will go", "is going"] },
      { sentence: "He ___ a book yesterday.", correctAnswer: "read", options: ["reads", "read", "is reading", "will read"] },
      { sentence: "He ___ to the gym tomorrow.", correctAnswer: "will go", options: ["goes", "went", "will go", "is going"] },
      { sentence: "He ___ TV right now.", correctAnswer: "is watching", options: ["watches", "watched", "is watching", "watch"] },
      { sentence: "He ___ for 2 hours when I came.", correctAnswer: "had been studying", options: ["studied", "was studying", "had been studying", "has studied"] },
      { sentence: "He ___ already ___ dinner.", correctAnswer: "has eaten", options: ["has eaten", "ate", "eats", "is eating"] },
      { sentence: "He ___ when the phone rang.", correctAnswer: "was sleeping", options: ["slept", "was sleeping", "is sleeping", "has slept"] },
      { sentence: "He ___ in this city since 2020.", correctAnswer: "has lived", options: ["lives", "lived", "has lived", "had lived"] },
      { sentence: "He ___ a new car by next year.", correctAnswer: "will have bought", options: ["bought", "buys", "has bought", "will have bought"] },
      { sentence: "He ___ a lot of movies last month.", correctAnswer: "watched", options: ["watched", "watches", "has watched", "was watching"] }
    ],
    hard: [
      { sentence: "By the time you arrive, he ___ the project.", correctAnswer: "will have finished", options: ["will finish", "will have finished", "is finishing", "has finished"] },
      { sentence: "He ___ at the library for three hours before she called.", correctAnswer: "had been studying", options: ["studied", "was studying", "had been studying", "has been studying"] },
      { sentence: "If he ___ harder, he would have passed the exam.", correctAnswer: "had studied", options: ["studied", "had studied", "would study", "has studied"] },
      { sentence: "He wishes he ___ to the party last night.", correctAnswer: "had gone", options: ["went", "had gone", "would go", "has gone"] },
      { sentence: "By next month, he ___ at this company for five years.", correctAnswer: "will have been working", options: ["will work", "will have worked", "will have been working", "has been working"] },
      { sentence: "He ___ to have finished his homework by now.", correctAnswer: "is supposed", options: ["supposes", "is supposed", "was supposed", "has supposed"] },
      { sentence: "Hardly ___ the house when it started to rain.", correctAnswer: "had he left", options: ["he had left", "had he left", "he left", "has he left"] },
      { sentence: "Not only ___ late, but he also forgot his presentation.", correctAnswer: "was he", options: ["he was", "was he", "he is", "is he"] },
      { sentence: "He suggested that she ___ a doctor.", correctAnswer: "see", options: ["sees", "saw", "see", "would see"] },
      { sentence: "He demanded that the report ___ immediately.", correctAnswer: "be submitted", options: ["is submitted", "was submitted", "be submitted", "would be submitted"] }
    ]
  },
  girl: {
    easy: [
      { sentence: "She ___ breakfast every morning.", correctAnswer: "eats", options: ["eat", "eats", "eating", "ate"] },
      { sentence: "She ___ a book now.", correctAnswer: "is reading", options: ["reads", "is reading", "read", "reading"] },
      { sentence: "She ___ to school yesterday.", correctAnswer: "went", options: ["goes", "went", "go", "going"] },
      { sentence: "She ___ to the party tomorrow.", correctAnswer: "will go", options: ["go", "goes", "will go", "going"] },
      { sentence: "She ___ TV at the moment.", correctAnswer: "is watching", options: ["watches", "is watching", "watch", "watched"] },
      { sentence: "She ___ piano every Saturday.", correctAnswer: "plays", options: ["play", "plays", "playing", "played"] },
      { sentence: "She ___ her homework last night.", correctAnswer: "did", options: ["does", "did", "do", "doing"] },
      { sentence: "She ___ to music now.", correctAnswer: "is listening", options: ["listens", "is listening", "listen", "listened"] },
      { sentence: "She ___ to school by car.", correctAnswer: "goes", options: ["go", "goes", "going", "went"] },
      { sentence: "She ___ dinner at 7:00.", correctAnswer: "has", options: ["have", "has", "having", "had"] }
    ],
    medium: [
      { sentence: "She ___ to the party tonight.", correctAnswer: "is going", options: ["goes", "went", "is going", "has gone"] },
      { sentence: "She ___ a letter yesterday.", correctAnswer: "wrote", options: ["writes", "wrote", "is writing", "has written"] },
      { sentence: "She ___ already ___ the report.", correctAnswer: "has finished", options: ["finished", "has finished", "finishes", "is finishing"] },
      { sentence: "She ___ when I saw her.", correctAnswer: "was crying", options: ["cried", "was crying", "is crying", "has cried"] },
      { sentence: "She ___ to the USA next year.", correctAnswer: "will travel", options: ["travels", "traveled", "will travel", "is traveling"] },
      { sentence: "She ___ breakfast at the moment.", correctAnswer: "is having", options: ["has", "had", "is having", "has had"] },
      { sentence: "She ___ that book before.", correctAnswer: "has read", options: ["read", "has read", "is reading", "reads"] },
      { sentence: "She ___ at this company since 2021.", correctAnswer: "has worked", options: ["worked", "has worked", "is working", "works"] },
      { sentence: "She ___ for 3 hours when the lights went out.", correctAnswer: "had been reading", options: ["read", "was reading", "had been reading", "has read"] },
      { sentence: "She ___ the meeting by 5 PM.", correctAnswer: "will have finished", options: ["finishes", "has finished", "will have finished", "is finishing"] }
    ],
    hard: [
      { sentence: "By the time you call, she ___ the presentation.", correctAnswer: "will have prepared", options: ["will prepare", "will have prepared", "is preparing", "has prepared"] },
      { sentence: "She ___ at the cafe for two hours before he arrived.", correctAnswer: "had been waiting", options: ["waited", "was waiting", "had been waiting", "has been waiting"] },
      { sentence: "If she ___ harder, she would have won the competition.", correctAnswer: "had trained", options: ["trained", "had trained", "would train", "has trained"] },
      { sentence: "She wishes she ___ to the concert last weekend.", correctAnswer: "had gone", options: ["went", "had gone", "would go", "has gone"] },
      { sentence: "By next June, she ___ at this university for four years.", correctAnswer: "will have been studying", options: ["will study", "will have studied", "will have been studying", "has been studying"] },
      { sentence: "She ___ to have submitted her application by yesterday.", correctAnswer: "was supposed", options: ["supposes", "is supposed", "was supposed", "has supposed"] },
      { sentence: "Hardly ___ the store when it started to snow.", correctAnswer: "had she left", options: ["she had left", "had she left", "she left", "has she left"] },
      { sentence: "Not only ___ talented, but she also works extremely hard.", correctAnswer: "is she", options: ["she is", "is she", "she was", "was she"] },
      { sentence: "She insisted that he ___ the truth.", correctAnswer: "tell", options: ["tells", "told", "tell", "would tell"] },
      { sentence: "She recommended that the proposal ___ immediately.", correctAnswer: "be approved", options: ["is approved", "was approved", "be approved", "would be approved"] }
    ]
  }
};

const audioQuestionsByGender = {
  boy: {
    easy: [
      { sentence: "He likes to play football.", missing: "football", options: ["football", "basketball", "tennis", "soccer"] },
      { sentence: "He has a blue bike.", missing: "blue", options: ["red", "green", "blue", "yellow"] },
      { sentence: "He is reading a book.", missing: "reading", options: ["writing", "reading", "drawing", "playing"] },
      { sentence: "He likes to eat pizza.", missing: "pizza", options: ["burger", "pizza", "pasta", "salad"] },
      { sentence: "He plays with his dog.", missing: "dog", options: ["cat", "dog", "bird", "fish"] }
    ],
    medium: [
      { sentence: "He is playing football with his friends.", missing: "football", options: ["football", "basketball", "hockey", "tennis"] },
      { sentence: "He is fixing his bike in the garage.", missing: "fixing", options: ["riding", "driving", "fixing", "painting"] },
      { sentence: "They are watching a football match on TV.", missing: "football", options: ["basketball", "football", "baseball", "hockey"] },
      { sentence: "He is playing video games with his brother.", missing: "playing", options: ["watching", "playing", "reading", "drawing"] },
      { sentence: "He built a model of a car.", missing: "built", options: ["bought", "made", "built", "stole"] },
      { sentence: "He loves to play with toy cars.", missing: "cars", options: ["blocks", "cars", "dolls", "books"] },
      { sentence: "He is building a robot for his school project.", missing: "building", options: ["drawing", "writing", "building", "painting"] },
      { sentence: "He enjoys playing with action figures.", missing: "figures", options: ["toys", "books", "figures", "cards"] },
      { sentence: "He is practicing basketball after school.", missing: "basketball", options: ["football", "basketball", "baseball", "tennis"] },
      { sentence: "He is reading a comic book.", missing: "comic", options: ["comic", "novel", "poem", "guide"] }
    ],
    hard: [
      { sentence: "He has been practicing football for three consecutive hours.", missing: "consecutive", options: ["consecutive", "different", "separate", "various"] },
      { sentence: "He was repairing his bicycle when the thunderstorm began.", missing: "thunderstorm", options: ["rain", "snow", "thunderstorm", "fog"] },
      { sentence: "They had been discussing the controversial match before the coach arrived.", missing: "controversial", options: ["exciting", "boring", "controversial", "ordinary"] },
      { sentence: "He contemplated playing various video games but chose to study instead.", missing: "contemplated", options: ["considered", "contemplated", "decided", "planned"] },
      { sentence: "He meticulously constructed a detailed model of an ancient castle.", missing: "meticulously", options: ["carefully", "meticulously", "quickly", "easily"] },
      { sentence: "He enthusiastically participated in the robotics competition last weekend.", missing: "enthusiastically", options: ["reluctantly", "enthusiastically", "carefully", "nervously"] },
      { sentence: "He has demonstrated exceptional ability in mathematics and physics.", missing: "exceptional", options: ["average", "poor", "exceptional", "moderate"] },
      { sentence: "He was simultaneously playing chess and solving complex equations.", missing: "simultaneously", options: ["previously", "eventually", "simultaneously", "gradually"] },
      { sentence: "He had acknowledged the significance of regular practice before the tournament.", missing: "significance", options: ["importance", "significance", "difficulty", "simplicity"] },
      { sentence: "He was predominantly interested in scientific literature rather than fiction.", missing: "predominantly", options: ["slightly", "rarely", "predominantly", "never"] }
    ]
  },
  girl: {
    easy: [
      { sentence: "She likes to draw pictures.", missing: "draw", options: ["read", "draw", "write", "sing"] },
      { sentence: "She has a red dress.", missing: "red", options: ["blue", "green", "red", "yellow"] },
      { sentence: "She is playing with her doll.", missing: "doll", options: ["book", "ball", "doll", "cat"] },
      { sentence: "She likes to eat ice cream.", missing: "ice cream", options: ["cake", "candy", "chocolate", "ice cream"] },
      { sentence: "She plays with her cat.", missing: "cat", options: ["dog", "cat", "bird", "fish"] }
    ],
    medium: [
      { sentence: "She is baking cookies in the kitchen.", missing: "baking", options: ["painting", "baking", "writing", "singing"] },
      { sentence: "She loves to play with her dolls.", missing: "dolls", options: ["cars", "dolls", "blocks", "action figures"] },
      { sentence: "She is practicing ballet in the studio.", missing: "ballet", options: ["football", "ballet", "swimming", "tennis"] },
      { sentence: "She is drawing a picture of flowers.", missing: "drawing", options: ["singing", "drawing", "playing", "reading"] },
      { sentence: "She is decorating her room with new furniture.", missing: "decorating", options: ["painting", "decorating", "playing", "cleaning"] },
      { sentence: "She loves to play with her teddy bear.", missing: "teddy bear", options: ["doll", "teddy bear", "robot", "car"] },
      { sentence: "She is playing with her friends in the park.", missing: "playing", options: ["sleeping", "playing", "reading", "working"] },
      { sentence: "She enjoys dressing up in beautiful dresses.", missing: "dresses", options: ["clothes", "dresses", "shoes", "hats"] },
      { sentence: "She is reading a book about fairy tales.", missing: "book", options: ["magazine", "book", "newspaper", "guide"] },
      { sentence: "She is planting flowers in the garden.", missing: "planting", options: ["reading", "cooking", "planting", "drawing"] }
    ],
    hard: [
      { sentence: "She has been meticulously decorating the elaborate wedding cake since morning.", missing: "meticulously", options: ["quickly", "sloppily", "meticulously", "occasionally"] },
      { sentence: "She was choreographing an innovative ballet routine when the music stopped.", missing: "choreographing", options: ["watching", "practicing", "choreographing", "recording"] },
      { sentence: "They had been discussing the controversial art exhibition before the curator arrived.", missing: "controversial", options: ["popular", "interesting", "controversial", "boring"] },
      { sentence: "She contemplated various career options but ultimately chose medicine.", missing: "contemplated", options: ["ignored", "contemplated", "rejected", "accepted"] },
      { sentence: "She diligently practiced the intricate piano concerto for months.", missing: "intricate", options: ["simple", "intricate", "boring", "famous"] },
      { sentence: "She enthusiastically participated in the international science fair last spring.", missing: "enthusiastically", options: ["reluctantly", "enthusiastically", "nervously", "secretly"] },
      { sentence: "She has demonstrated extraordinary talent in literature and languages.", missing: "extraordinary", options: ["minimal", "average", "extraordinary", "basic"] },
      { sentence: "She was simultaneously managing her studies and volunteer work at the hospital.", missing: "simultaneously", options: ["rarely", "previously", "simultaneously", "occasionally"] },
      { sentence: "She had acknowledged the importance of perseverance before embarking on the project.", missing: "perseverance", options: ["talent", "luck", "money", "perseverance"] },
      { sentence: "She was predominantly interested in classical music rather than contemporary genres.", missing: "predominantly", options: ["never", "rarely", "occasionally", "predominantly"] }
    ]
  }
};

const imageQuestionsByGender = {
  boy: {
    easy: [
      { emoji: '🍎', options: ['Apple', 'Banana', 'Orange', 'Grape'], correct: 0 },
      { emoji: '🐶', options: ['Cat', 'Dog', 'Mouse', 'Bird'], correct: 1 },
      { emoji: '🚗', options: ['Car', 'Bus', 'Train', 'Bike'], correct: 0 },
      { emoji: '🏀', options: ['Football', 'Basketball', 'Tennis', 'Golf'], correct: 1 },
      { emoji: '🍕', options: ['Pizza', 'Burger', 'Sandwich', 'Pasta'], correct: 0 }
    ],
    medium: [
      { emoji: '🍎', options: ['Apple', 'Banana', 'Cat', 'Dog'], correct: 0 },
      { emoji: '🐶', options: ['Cat', 'Dog', 'Car', 'Ball'], correct: 1 },
      { emoji: '📖', options: ['Book', 'Milk', 'Table', 'Window'], correct: 0 },
      { emoji: '🍓', options: ['Strawberry', 'Cherry', 'Peach', 'Lemon'], correct: 0 },
      { emoji: '🚗', options: ['Bus', 'Car', 'Bicycle', 'Train'], correct: 1 },
      { emoji: '🏀', options: ['Football', 'Basketball', 'Tennis', 'Baseball'], correct: 1 },
      { emoji: '🎸', options: ['Drums', 'Piano', 'Guitar', 'Flute'], correct: 2 },
      { emoji: '👨‍🍳', options: ['Doctor', 'Chef', 'Teacher', 'Artist'], correct: 1 },
      { emoji: '🍕', options: ['Burger', 'Pizza', 'Sandwich', 'Salad'], correct: 1 },
      { emoji: '🌍', options: ['Earth', 'Moon', 'Sun', 'Star'], correct: 0 }
    ],
    hard: [
      { emoji: '🧬', options: ['DNA', 'Cell', 'Bacteria', 'Virus'], correct: 0 },
      { emoji: '⚙️', options: ['Wheel', 'Gear', 'Cog', 'Machine'], correct: 1 },
      { emoji: '🔬', options: ['Telescope', 'Microscope', 'Magnifier', 'Lens'], correct: 1 },
      { emoji: '🧮', options: ['Calculator', 'Abacus', 'Counter', 'Computer'], correct: 1 },
      { emoji: '🧪', options: ['Beaker', 'Test tube', 'Flask', 'Bottle'], correct: 1 },
      { emoji: '🛰️', options: ['Rocket', 'Satellite', 'Airplane', 'Drone'], correct: 1 },
      { emoji: '🦠', options: ['Bacteria', 'Virus', 'Microbe', 'Amoeba'], correct: 2 },
      { emoji: '📊', options: ['Graph', 'Chart', 'Diagram', 'Map'], correct: 1 },
      { emoji: '📐', options: ['Ruler', 'Protractor', 'Triangle', 'Compass'], correct: 2 },
      { emoji: '🧲', options: ['Battery', 'Magnet', 'Electricity', 'Wire'], correct: 1 }
    ]
  },
  girl: {
    easy: [
      { emoji: '🍌', options: ['Banana', 'Apple', 'Orange', 'Grape'], correct: 0 },
      { emoji: '🐱', options: ['Cat', 'Dog', 'Mouse', 'Bird'], correct: 0 },
      { emoji: '🌹', options: ['Rose', 'Tulip', 'Daisy', 'Lily'], correct: 0 },
      { emoji: '🍰', options: ['Cake', 'Cookie', 'Pie', 'Cupcake'], correct: 0 },
      { emoji: '🦋', options: ['Butterfly', 'Bee', 'Dragonfly', 'Ladybug'], correct: 0 }
    ],
    medium: [
      { emoji: '🍌', options: ['Banana', 'Apple', 'Dog', 'Cat'], correct: 0 },
      { emoji: '🐱', options: ['Cat', 'Dog', 'Book', 'Milk'], correct: 0 },
      { emoji: '🧃', options: ['Juice', 'Table', 'Ball', 'Book'], correct: 0 },
      { emoji: '🌹', options: ['Rose', 'Tulip', 'Lily', 'Sunflower'], correct: 0 },
      { emoji: '📚', options: ['Books', 'Magazines', 'Newspapers', 'Notebooks'], correct: 0 },
      { emoji: '💻', options: ['Tablet', 'Computer', 'Phone', 'Camera'], correct: 1 },
      { emoji: '🎤', options: ['Microphone', 'Guitar', 'Piano', 'Drums'], correct: 0 },
      { emoji: '🖼️', options: ['Picture', 'Frame', 'Window', 'Clock'], correct: 0 },
      { emoji: '🍰', options: ['Cake', 'Cookie', 'Ice Cream', 'Candy'], correct: 0 },
      { emoji: '🎒', options: ['Bag', 'Shoes', 'Jacket', 'Hat'], correct: 0 }
    ],
    hard: [
      { emoji: '🧬', options: ['RNA', 'DNA', 'Protein', 'Enzyme'], correct: 1 },
      { emoji: '🔭', options: ['Microscope', 'Telescope', 'Periscope', 'Binoculars'], correct: 1 },
      { emoji: '🧫', options: ['Petri dish', 'Beaker', 'Test tube', 'Flask'], correct: 0 },
      { emoji: '🦠', options: ['Cell', 'Virus', 'Bacteria', 'Microbe'], correct: 2 },
      { emoji: '📐', options: ['Square', 'Triangle', 'Ruler', 'Protractor'], correct: 1 },
      { emoji: '🧩', options: ['Game', 'Toy', 'Puzzle', 'Block'], correct: 2 },
      { emoji: '🔍', options: ['Microscope', 'Magnifier', 'Lens', 'Glass'], correct: 1 },
      { emoji: '📊', options: ['Table', 'Chart', 'Graph', 'Diagram'], correct: 2 },
      { emoji: '🧪', options: ['Vial', 'Test tube', 'Bottle', 'Container'], correct: 1 },
      { emoji: '💉', options: ['Needle', 'Syringe', 'Vaccine', 'Medicine'], correct: 1 }
    ]
  }
};

const exercise4WordsByGender = {
  boy: ["apple", "banana", "cat", "dog", "elephant","car","chair","garage","close"],
  girl: ["flower", "butterfly", "kitten", "strawberry", "unicorn","dress","garden","fish"]
};

const timeQuestions = {
  easy: [
    ["It's one o'clock.", "🕐", ["🕐", "🕑", "🕒", "🕓"]],
    ["It's two o'clock.", "🕑", ["🕓", "🕑", "🕒", "🕐"]],
    ["It's three o'clock.", "🕒", ["🕑", "🕓", "🕒", "🕔"]],
    ["It's six o'clock.", "🕕", ["🕕", "🕗", "🕙", "🕛"]],
    ["It's nine o'clock.", "🕘", ["🕚", "🕙", "🕘", "🕗"]]
  ],
  medium: [
    ["It's one o'clock.", "🕐", ["🕐", "🕒", "🕘", "🕓"]],
    ["It's two o'clock.", "🕑", ["🕐", "🕑", "🕓", "🕕"]],
    ["It's three o'clock.", "🕒", ["🕓", "🕒", "🕑", "🕔"]],
    ["It's four o'clock.", "🕓", ["🕔", "🕒", "🕓", "🕚"]],
    ["It's five o'clock.", "🕔", ["🕔", "🕖", "🕘", "🕐"]],
    ["It's six o'clock.", "🕕", ["🕘", "🕕", "🕔", "🕓"]],
    ["It's seven o'clock.", "🕖", ["🕖", "🕗", "🕙", "🕕"]],
    ["It's eight o'clock.", "🕗", ["🕘", "🕗", "🕚", "🕔"]],
    ["It's nine o'clock.", "🕘", ["🕖", "🕘", "🕗", "🕙"]],
    ["It's ten o'clock.", "🕙", ["🕙", "🕛", "🕘", "🕒"]]
  ],
  hard: [
    ["It's half past one.", "🕜", ["🕝", "🕒", "🕜", "🕐"]],
    ["It's half past two.", "🕝", ["🕞", "🕝", "🕓", "🕑"]],
    ["It's half past three.", "🕞", ["🕟", "🕞", "🕠", "🕒"]],
    ["It's half past four.", "🕟", ["🕠", "🕟", "🕡", "🕓"]],
    ["It's half past five.", "🕠", ["🕡", "🕠", "🕢", "🕔"]],
    ["It's half past six.", "🕡", ["🕕", "🕡", "🕣", "🕢"]],
    ["It's half past seven.", "🕢", ["🕣", "🕢", "🕤", "🕖"]],
    ["It's half past eight.", "🕣", ["🕤", "🕣", "🕥", "🕗"]],
    ["It's half past nine.", "🕤", ["🕥", "🕤", "🕦", "🕘"]],
    ["It's half past ten.", "🕥", ["🕦", "🕥", "🕚", "🕙"]],
    ["It's half past eleven.", "🕦", ["🕛", "🕧", "🕦", "🕚"]],
    ["It's half past twelve.", "🕧", ["🕐", "🕧", "🕛", "🕦"]]
  ]
};
let correctAnswersCount = 0;
let currentQuestionIndex = 0;
let audioCurrentIndex = 0;
let audioCorrectCount = 0;
let isSpeaking = false;
let imageCurrentIndex = 0;
let imageCorrectCount = 0;
let imageAllowClick = true;
let exercise4Current = 0;
let exercise4Words = [];
let emojiClockCurrentIndex = 0;
let emojiClockCorrectCount = 0;
let emojiClockAllowClick = true;
let currentDifficulty = "medium"; // По умолчанию средний уровень
let difficultySelected = false; // Флаг для отслеживания выбора сложности

//exercise 1 -----------------------------------------------------------

function selectDifficulty(exercise, difficulty) {
  currentDifficulty = difficulty;
  difficultySelected = true;
  
  if (exercise === 1) {
    displayQuestion();
  } else if (exercise === 2) {
    displayAudioQuestion();
  } else if (exercise === 3) {
    loadNextQuestion3();
  } else if (exercise === 4) {
    // Для упражнения 4 загружаем слова соответствующей сложности
    exercise4Words = exercise4WordsByGender[version][difficulty] || exercise4WordsByGender[version]["medium"];
    const wordText = document.getElementById("exercise4-word-text");
    if (wordText) {
      wordText.textContent = `Скажи слово: ${exercise4Words[exercise4Current]}`;
      wordText.style.display = "block";
    }
  } else if (exercise === 5) {
    displayQuestion5();
  }
}

function showDifficultySelection(exercise) {
  // Отображаем заголовок в exercise-screen
  document.getElementById(`exercise${exercise}-screen`).innerHTML = `
    <h2>Выберите уровень сложности</h2>
  `;
  
  // Отображаем варианты сложности в элементах exercise-var
  document.getElementById(`exercise${exercise}-var-var1`).innerHTML = '😎Легкий';
  document.getElementById(`exercise${exercise}-var-var1`).setAttribute('onclick', `selectDifficulty(${exercise}, 'easy')`);
  
  document.getElementById(`exercise${exercise}-var-var2`).innerHTML = '🧐Средний';
  document.getElementById(`exercise${exercise}-var-var2`).setAttribute('onclick', `selectDifficulty(${exercise}, 'medium')`);
  
  document.getElementById(`exercise${exercise}-var-var3`).innerHTML = '🫡Сложный';
  document.getElementById(`exercise${exercise}-var-var3`).setAttribute('onclick', `selectDifficulty(${exercise}, 'hard')`);
  
  // Очищаем четвертый вариант или используем его для чего-то еще при необходимости
  document.getElementById(`exercise${exercise}-var-var4`).innerHTML = '';
  document.getElementById(`exercise${exercise}-var-var4`).setAttribute('onclick', '');
}

function loadNextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex >= questionsByGender[version][currentDifficulty].length || currentQuestionIndex >= 10) {
    showFinalResult();
    return;
  }

  document.getElementById("next-question-btn").classList.remove("active");
  displayQuestion();
}

function checkAnswer(selectedVar) {
  if (!difficultySelected) return; // Не реагируем на клики, если сложность не выбрана
  
  const selectedOption = document.getElementById(selectedVar).innerHTML;
  const correctAnswer = document.getElementById("exercise1-screen").getAttribute("data-correct-answer");

  const options = document.querySelectorAll('.exercise1-var');
  options.forEach(option => {
    option.classList.remove('correct', 'incorrect');
    option.style.pointerEvents = 'none';
  });

  if (selectedOption === correctAnswer) {
    document.getElementById(selectedVar).classList.add('correct');
    correctAnswersCount++;
  } else {
    document.getElementById(selectedVar).classList.add('incorrect');

    // Подсвечиваем правильный ответ
    options.forEach(option => {
      if (option.innerHTML === correctAnswer) {
        option.classList.add('correct');
      }
    });
  }

  document.getElementById("next-question-btn").classList.add("active");
}

function displayQuestion() {
  const question = questionsByGender[version][currentDifficulty][currentQuestionIndex];
  const sentenceWithBlank = question.sentence.replace("___", "<span class='blank'>___</span>");
  document.getElementById("exercise1-screen").innerHTML = sentenceWithBlank;

  const shuffledOptions = question.options.sort(() => Math.random() - 0.5);
  for (let i = 1; i <= 4; i++) {
    document.getElementById(`exercise1-var-var${i}`).innerHTML = shuffledOptions[i - 1];
    // Восстановить обработчики событий для вариантов ответа
    document.getElementById(`exercise1-var-var${i}`).setAttribute('onclick', `checkAnswer('exercise1-var-var${i}')`);
  }

  document.getElementById("exercise1-screen").setAttribute("data-correct-answer", question.correctAnswer);

  const nextButton = document.getElementById("next-question-btn");
  nextButton.classList.remove("active");

  document.querySelectorAll('.exercise1-var').forEach(option => {
    option.classList.remove('correct', 'incorrect');
    option.style.pointerEvents = 'auto';
  });

  twemoji.parse(document.getElementById("exercise1-screen"));
}

function showFinalResult() {
  const percentage = Math.round((correctAnswersCount / 10) * 100);
  const resultMessage = `Вы ответили правильно на ${correctAnswersCount} из 10 вопросов.<br>Ваш результат: ${percentage}%`;

  document.getElementById("exercise1-screen").innerHTML = `
    <div class="final-result">
      <h2>Тест завершен</h2>
      <p>${resultMessage}</p>
    </div>
  `;

  const nextButton = document.getElementById("next-question-btn");
  nextButton.classList.add("active");
  nextButton.textContent = 'Пройти снова';
  nextButton.onclick = function () {
    location.reload();
  };
}

window.onload = function () {
  if (version) {
    // Сбрасываем флаг выбора сложности
    difficultySelected = false;
    
    // Отображаем экран выбора сложности для упражнения 1
    const exercise1Screen = document.getElementById("exercise1-screen");
    if (exercise1Screen) {
      showDifficultySelection(1);
    }
    
    // Отображаем экран выбора сложности для упражнения 2
    const exercise2Screen = document.getElementById("exercise2-screen");
    if (exercise2Screen) {
      showDifficultySelection(2);
    }
    
    // Отображаем экран выбора сложности для упражнения 3
    const exercise3Screen = document.getElementById("exercise3-screen");
    if (exercise3Screen) {
      showDifficultySelection(3);
    }
    
    // Отображаем экран выбора сложности для упражнения 4
    const exercise4Screen = document.getElementById("exercise4-word-text");
    if (exercise4Screen && exercise4Screen.parentNode) {
      const exercise4Parent = exercise4Screen.parentNode;
      const exercise4Id = exercise4Parent.id || "exercise4";
      const exercise4Number = exercise4Id.replace("exercise", "");
      showDifficultySelection(exercise4Number);
    }
    
    // Отображаем экран выбора сложности для упражнения 5
    const exercise5Screen = document.getElementById("exercise5-screen");
    if (exercise5Screen) {
      showDifficultySelection(5);
    }
  } else {
    console.warn('Пол не выбран.');
  }
};

// exercise 2-------------------------------------------------------------------------
function detectBrowser() {
  const userAgent = navigator.userAgent;

  if (userAgent.includes("Chrome") && !userAgent.includes("Edg/")) return "chrome";
  if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) return "safari";
  if (userAgent.includes("Edg/")) return "edge";
  return "other";
}

function speakText(text) {
  if ('speechSynthesis' in window) {
    if (isSpeaking) {
      console.log("Озвучка уже воспроизводится — подождите.");
      return;
    }

    const onVoicesChanged = () => {
      const voices = window.speechSynthesis.getVoices();
      console.log("Доступные голоса:", voices.map(v => ({ name: v.name, lang: v.lang })));

      // Определяем платформу
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      console.log(`Платформа: ${isIOS ? 'iOS' : isMobile ? 'Mobile' : 'Desktop'}`);

      // Приоритетные списки голосов для мужской и женской версий
      const maleVoicePriority = [
        // Apple голоса (Safari, iOS, macOS) - высший приоритет для iOS
        "Daniel (Enhanced)", "Daniel",
        "Alex (Enhanced)", "Alex", 
        "Arthur (Enhanced)", "Arthur",
        "Oliver (Enhanced)", "Oliver",
        
        // Google голоса (Chrome, Android)
        "Google UK English Male",
        "Google британский английский (мужской)",
        
        // Microsoft голоса (Edge, Windows)
        "Microsoft Ryan Online (Natural) - English (United Kingdom)",
        "Microsoft George Online (Natural) - English (United Kingdom)", 
        "Microsoft Ryan - English (United Kingdom)",
        
        // Системные голоса
        "Male #1", "Male #2", "Tom"
      ];

      const femaleVoicePriority = [
        // Apple голоса (Safari, iOS, macOS) - высший приоритет для iOS
        "Moira (Enhanced)", "Moira",
        "Kate (Enhanced)", "Kate", 
        "Serena (Enhanced)", "Serena",
        "Fiona (Enhanced)", "Fiona",
        "Victoria (Enhanced)", "Victoria",
        "Samantha (Enhanced)", "Samantha",
        "Zoe (Enhanced)", "Zoe",
        "Tessa (Enhanced)", "Tessa",
        
        // Google голоса (Chrome, Android)
        "Google UK English Female",
        "Google британский английский (женский)",
        
        // Microsoft голоса (Edge, Windows)
        "Microsoft Libby Online (Natural) - English (United Kingdom)",
        "Microsoft Hazel Online (Natural) - English (United Kingdom)",
        "Microsoft Susan - English (United Kingdom)",
        
        // Системные голоса
        "Female #1", "Female #2"
      ];

      // Функция для поиска голоса по приоритету
      const findVoiceByPriority = (priorityList) => {
        for (const voiceName of priorityList) {
          const voice = voices.find(v => 
            v.name === voiceName || 
            v.name.toLowerCase().includes(voiceName.toLowerCase())
          );
          if (voice) {
            console.log(`Найден голос: ${voice.name}`);
            return voice;
          }
        }
        return null;
      };

      // Резервная функция для поиска по языку и полу
      const findFallbackVoice = (isFemale = false) => {
        let englishVoices = voices.filter(voice => 
          voice.lang.startsWith('en') || voice.lang === 'en'
        );

        if (englishVoices.length === 0) return null;

        // Специальная обработка для iOS
        if (isIOS) {
          console.log("iOS обнаружена - используем специальную логику выбора голосов");
          
          // Фильтруем голоса по полу для iOS
          const iosGenderKeywords = {
            male: ['daniel', 'alex', 'arthur', 'oliver', 'male'],
            female: ['moira', 'kate', 'victoria', 'samantha', 'serena', 'fiona', 'zoe', 'tessa', 'female']
          };

          const targetKeywords = isFemale ? iosGenderKeywords.female : iosGenderKeywords.male;
          
          // Сначала ищем Enhanced версии
          for (const voice of englishVoices) {
            const voiceName = voice.name.toLowerCase();
            if (voiceName.includes('enhanced') && 
                targetKeywords.some(keyword => voiceName.includes(keyword))) {
              console.log(`Найден Enhanced голос для iOS: ${voice.name}`);
              return voice;
            }
          }
          
          // Потом ищем обычные версии
          for (const voice of englishVoices) {
            const voiceName = voice.name.toLowerCase();
            if (targetKeywords.some(keyword => voiceName.includes(keyword))) {
              console.log(`Найден стандартный голос для iOS: ${voice.name}`);
              return voice;
            }
          }
          
          // Для iOS берем любой английский голос, кроме первого (который часто роботизированный)
          if (englishVoices.length > 1) {
            return englishVoices[1];
          }
        }
        
        // Обычная логика для других платформ
        const genderKeywords = {
          male: ['male', 'man', 'boy', 'daniel', 'alex', 'tom', 'ryan', 'george', 'oliver', 'arthur'],
          female: ['female', 'woman', 'girl', 'moira', 'kate', 'victoria', 'samantha', 'libby', 'hazel', 'susan', 'serena', 'fiona', 'zoe', 'tessa']
        };

        const targetKeywords = isFemale ? genderKeywords.female : genderKeywords.male;
        
        // Ищем голос с подходящими ключевыми словами
        for (const voice of englishVoices) {
          const voiceName = voice.name.toLowerCase();
          if (targetKeywords.some(keyword => voiceName.includes(keyword))) {
            return voice;
          }
        }

        // Если не нашли по полу, возвращаем первый доступный
        return englishVoices[0];
      };

      let selectedVoice = null;

      // Выбираем голос в зависимости от версии сайта
      if (version === 'girl') {
        selectedVoice = findVoiceByPriority(femaleVoicePriority) || 
                      findFallbackVoice(true);
      } else if (version === 'boy') {
        selectedVoice = findVoiceByPriority(maleVoicePriority) || 
                      findFallbackVoice(false);
      }

      // Если все еще не нашли голос, берем первый доступный английский
      if (!selectedVoice) {
        selectedVoice = voices.find(voice => 
          voice.lang.startsWith('en') || voice.lang === 'en'
        ) || voices[0];
        console.warn("Использован резервный голос:", selectedVoice?.name);
      }

      if (!selectedVoice) {
        console.error("Не найдено подходящих голосов");
        return;
      }

      console.log(`Выбран голос для версии "${version}": ${selectedVoice.name} (${selectedVoice.lang})`);

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = selectedVoice;
      
      // Специальные настройки для iOS
      if (isIOS) {
        utterance.lang = 'en-US'; // iOS лучше работает с en-US чем с en-GB
        utterance.rate = 1.0; // Немного медленнее для iOS
        utterance.pitch = version === 'girl' ? 1.3 : 0.9; // Более выраженная разница в тоне
        utterance.volume = 1.0;
      } else {
        utterance.lang = selectedVoice.lang || 'en-GB';
        utterance.rate = 1;
        utterance.pitch = version === 'girl' ? 1.2 : 1.0;
      }

      isSpeaking = true;

      utterance.onstart = () => {
        console.log(`Начата озвучка голосом: ${selectedVoice.name}`);
      };

      utterance.onend = () => {
        isSpeaking = false;
        console.log("Озвучка завершена");
      };

      utterance.onerror = (event) => {
        isSpeaking = false;
        console.warn("Ошибка озвучки:", event.error);
        
        // Попытка повторить с другим голосом при ошибке
        if (event.error === 'voice-unavailable') {
          console.log("Попытка использовать резервный голос...");
          const fallbackVoice = voices.find(v => v.lang.startsWith('en')) || voices[0];
          if (fallbackVoice && fallbackVoice !== selectedVoice) {
            const fallbackUtterance = new SpeechSynthesisUtterance(text);
            fallbackUtterance.voice = fallbackVoice;
            fallbackUtterance.lang = fallbackVoice.lang || 'en';
            window.speechSynthesis.speak(fallbackUtterance);
          }
        }
      };

      window.speechSynthesis.speak(utterance);
      window.speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged);
    };

    // Небольшая задержка для загрузки голосов на некоторых устройствах
    const initVoices = () => {
      if (window.speechSynthesis.getVoices().length > 0) {
        onVoicesChanged();
      } else {
        window.speechSynthesis.addEventListener('voiceschanged', onVoicesChanged);
        // Таймаут на случай, если событие не сработает
        setTimeout(() => {
          if (window.speechSynthesis.getVoices().length > 0) {
            onVoicesChanged();
          }
        }, 100);
      }
    };

    initVoices();
  } else {
    console.warn("Web Speech API не поддерживается в этом браузере");
  }
}

// Дополнительная функция для предварительной загрузки голосов
function preloadVoices() {
  if ('speechSynthesis' in window) {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    // Для iOS используем другой подход
    if (isIOS) {
      // На iOS голоса загружаются только после первого использования
      const dummy = new SpeechSynthesisUtterance('');
      dummy.volume = 0;
      dummy.rate = 10;
      window.speechSynthesis.speak(dummy);
      
      return new Promise((resolve) => {
        let attempts = 0;
        const maxAttempts = 50;
        
        const checkVoicesIOS = () => {
          const voices = window.speechSynthesis.getVoices();
          attempts++;
          
          if (voices.length > 1 || attempts >= maxAttempts) { // iOS обычно возвращает минимум 1 голос сразу
            console.log(`iOS: Загружено ${voices.length} голосов за ${attempts} попыток`);
            // Логируем доступные голоса для отладки
            voices.forEach((voice, index) => {
              console.log(`${index}: ${voice.name} (${voice.lang}) - ${voice.default ? 'default' : ''}`);
            });
            resolve(voices);
          } else {
            setTimeout(checkVoicesIOS, 100);
          }
        };
        
        // Ждем немного и начинаем проверку
        setTimeout(checkVoicesIOS, 200);
      });
    } else {
      // Обычная логика для других платформ
      window.speechSynthesis.getVoices();
      
      const dummy = new SpeechSynthesisUtterance('');
      dummy.volume = 0;
      window.speechSynthesis.speak(dummy);
      
      return new Promise((resolve) => {
        const checkVoices = () => {
          const voices = window.speechSynthesis.getVoices();
          if (voices.length > 0) {
            console.log(`Загружено ${voices.length} голосов`);
            resolve(voices);
          } else {
            setTimeout(checkVoices, 50);
          }
        };
        
        if (window.speechSynthesis.getVoices().length > 0) {
          resolve(window.speechSynthesis.getVoices());
        } else {
          window.speechSynthesis.addEventListener('voiceschanged', () => {
            resolve(window.speechSynthesis.getVoices());
          }, { once: true });
          
          setTimeout(checkVoices, 100);
        }
      });
    }
  }
}


// ВАЖНО ДЛЯ iOS

function initSpeechForIOS() {
  if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    console.log("Инициализация голосов для iOS...");
    
    // Создаем тихое высказывание для активации API
    const initUtterance = new SpeechSynthesisUtterance('');
    initUtterance.volume = 0;
    initUtterance.rate = 10;
    
    initUtterance.onend = () => {
      setTimeout(() => {
        const voices = window.speechSynthesis.getVoices();
        console.log(`После инициализации доступно ${voices.length} голосов`);
        // debugiOSVoices(); // Закомментировано, чтобы избежать тестовых звуков
      }, 500);
    };
    
    window.speechSynthesis.speak(initUtterance);
  }
}

document.addEventListener('touchstart', initSpeechForIOS, { once: true });
document.addEventListener('click', initSpeechForIOS, { once: true });

document.addEventListener('DOMContentLoaded', () => {
  if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    // Для iOS ждем взаимодействия пользователя
    console.log("iOS обнаружена. Голоса будут инициализированы при первом взаимодействии.");
  } else {
    preloadVoices().then(() => {
      console.log('Голоса готовы к использованию');
    });
  }
});

function testVoices() {
  const voices = window.speechSynthesis.getVoices();
  console.table(voices.map(v => ({
    name: v.name,
    lang: v.lang,
    gender: v.name.toLowerCase().includes('female') || 
            v.name.toLowerCase().includes('woman') ? 'female' : 
            v.name.toLowerCase().includes('male') || 
            v.name.toLowerCase().includes('man') ? 'male' : 'unknown'
  })));
}
// Отобразить текущий вопрос
function displayAudioQuestion() {
  const data = audioQuestionsByGender[version][currentDifficulty][audioCurrentIndex];
  const sentenceWithBlank = data.sentence.replace(data.missing, `<span class="blank">___</span>`);
  const fullSentence = data.sentence;

  const screen = document.getElementById("exercise2-screen");
  screen.innerHTML = `<div class="listen-area-text">${sentenceWithBlank}</div>`;

  const textElement = screen.querySelector(".listen-area-text");

  // Анимация при воспроизведении
  const playWithAnimation = () => {
    if (isSpeaking) return;
    textElement.classList.add("speaking");
    speakText(fullSentence);
    setTimeout(() => textElement.classList.remove("speaking"), fullSentence.split(" ").length * 400);
  };

  // При клике повторно проигрываем
  textElement.style.cursor = "pointer";
  textElement.onclick = playWithAnimation;

  // Автовоспроизведение при загрузке
  playWithAnimation();

  // Перемешать и отобразить варианты
  const shuffled = [...data.options].sort(() => Math.random() - 0.5);
  shuffled.forEach((option, idx) => {
    const el = document.getElementById(`exercise2-var-var${idx + 1}`);
    el.textContent = option;
    el.classList.remove('correct', 'incorrect');
    el.style.pointerEvents = 'auto';
    // Восстановить обработчики событий для вариантов ответа
    el.setAttribute('onclick', `checkAnswer2('exercise2-var-var${idx + 1}')`);
  });

  document.getElementById("next-question2-btn").classList.remove("active");

  twemoji.parse(document.getElementById("exercise2-screen"));
}

// Проверка ответа
function checkAnswer2(selectedId) {
  if (!difficultySelected) return; // Не реагируем на клики, если сложность не выбрана
  
  const selectedOption = document.getElementById(selectedId).textContent;
  const correctOption = audioQuestionsByGender[version][currentDifficulty][audioCurrentIndex].missing;

  const options = document.querySelectorAll('.exercise2-var');
  options.forEach(option => {
    option.classList.remove('correct', 'incorrect');
    option.style.pointerEvents = 'none';
  });

  if (selectedOption === correctOption) {
    document.getElementById(selectedId).classList.add('correct');
    audioCorrectCount++;
  } else {
    document.getElementById(selectedId).classList.add('incorrect');
    options.forEach(option => {
      if (option.textContent === correctOption) {
        option.classList.add('correct');
      }
    });
  }

  document.getElementById("next-question2-btn").classList.add("active");
}

// Переход к следующему вопросу
function loadNextQuestion2() {
  audioCurrentIndex++;
  if (audioCurrentIndex >= audioQuestionsByGender[version][currentDifficulty].length) {
    showFinalAudioResult();
  } else {
    displayAudioQuestion();
  }
}

// Финальный экран
function showFinalAudioResult() {
  const percent = Math.round((audioCorrectCount / audioQuestionsByGender[version][currentDifficulty].length) * 100);
  document.getElementById("exercise2-screen").innerHTML = `
    <div class="final-result">
      <h2>Тест завершён</h2>
      <p>Правильных ответов: ${audioCorrectCount} из ${audioQuestionsByGender[version][currentDifficulty].length} <br>Результат: ${percent}%</p>
    </div>
  `;

  document.getElementById("next-question2-btn").classList.add("active");
  document.getElementById("next-question2-btn").textContent = "Пройти снова";
  document.getElementById("next-question2-btn").onclick = () => location.reload();
}

//exercise 3----------------------------------------------------
function loadNextQuestion3() {
  const questions = imageQuestionsByGender[version][currentDifficulty];
  if (imageCurrentIndex >= questions.length) {
    showFinalImageResult();
    return;
  }

  const q = questions[imageCurrentIndex];
  document.getElementById('exercise3-screen').innerHTML = `<div class="emoji-display">${q.emoji}</div>`;

  q.options.forEach((opt, i) => {
    const el = document.getElementById(`exercise3-var-var${i + 1}`);
    el.textContent = opt;
    el.classList.remove('correct', 'incorrect');
    el.style.pointerEvents = 'auto';
    // Восстановить обработчики событий для вариантов ответа
    el.setAttribute('onclick', `checkAnswer3('exercise3-var-var${i + 1}')`);
  });

  document.getElementById("next-question3-btn").classList.remove("active");
  imageAllowClick = true;

  twemoji.parse(document.getElementById("exercise3-screen"));
}

function checkAnswer3(id) {
  if (!difficultySelected || !imageAllowClick) return; // Не реагируем на клики, если сложность не выбрана или уже был клик
  
  const selectedIndex = parseInt(id.slice(-1)) - 1;
  const q = imageQuestionsByGender[version][currentDifficulty][imageCurrentIndex];

  const options = document.querySelectorAll(".exercise3-var");
  options.forEach(option => option.style.pointerEvents = 'none');

  if (selectedIndex === q.correct) {
    document.getElementById(id).classList.add('correct');
    imageCorrectCount++;
  } else {
    document.getElementById(id).classList.add('incorrect');
    document.getElementById(`exercise3-var-var${q.correct + 1}`).classList.add('correct');
  }

  document.getElementById("next-question3-btn").classList.add("active");
  imageAllowClick = false;
}

function showFinalImageResult() {
  const percent = Math.round((imageCorrectCount / imageQuestionsByGender[version][currentDifficulty].length) * 100);
  document.getElementById("exercise3-screen").innerHTML = `
    <div class="final-result">
      <h2>Тест завершён</h2>
      <p>Правильных ответов: ${imageCorrectCount} из ${imageQuestionsByGender[version][currentDifficulty].length}<br>Результат: ${percent}%</p>
    </div>
  `;

  document.getElementById("next-question3-btn").classList.add("active");
  document.getElementById("next-question3-btn").textContent = "Пройти снова";
  document.getElementById("next-question3-btn").onclick = () => location.reload();
}

// Добавляем функцию для перехода к следующему вопросу при нажатии кнопки "Далее"
function nextQuestion3() {
  imageCurrentIndex++; 
  loadNextQuestion3(); 
}

//exercise 4 --------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  exercise4Words = exercise4WordsByGender[version] || exercise4WordsByGender["boy"];
  const wordText = document.getElementById("exercise4-word-text");
  if (wordText) {
      wordText.textContent = `Скажи слово: ${exercise4Words[exercise4Current]}`;
  }
});

function exercise4PlayWord() {
  const word = exercise4Words[exercise4Current];
  speakText(word); 
}

function exercise4StartListening() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";

  recognition.onresult = function (event) {
      const spoken = event.results[0][0].transcript.toLowerCase().trim();
      const expected = exercise4Words[exercise4Current];
      const feedbackEl = document.getElementById("exercise4-feedback");

      if (spoken === expected) {
          feedbackEl.textContent = `✅ Молодец! Ты сказал: ${spoken}`;
      } else {
          feedbackEl.textContent = `❌ Ты сказал: "${spoken}". Правильно: "${expected}"`;
      }
  };

  recognition.onerror = function () {
      document.getElementById("exercise4-feedback").textContent = "Ошибка распознавания. Попробуй ещё раз.";
  };

  recognition.start();
}

function exercise4NextWord() {
  exercise4Current++;
  if (exercise4Current >= exercise4Words.length) {
      exercise4Current = 0;
  }
  document.getElementById("exercise4-word-text").textContent = `Скажи слово: ${exercise4Words[exercise4Current]}`;
  document.getElementById("exercise4-feedback").textContent = "";
}

document.querySelectorAll('.main-faq-question').forEach(question => {
  question.addEventListener('click', () => {
      const item = question.closest('.main-faq-item');
      item.classList.toggle('active');
  });
});

// Функция проверки ответа в упражнении 5
function checkAnswer5(selectedId) {
  console.log("checkAnswer5 вызвана с:", selectedId); // Для отладки
  
  if (!difficultySelected || !emojiClockAllowClick) {
    console.log("Клик проигнорирован: difficultySelected =", difficultySelected, "emojiClockAllowClick =", emojiClockAllowClick);
    return;
  }
  
  emojiClockAllowClick = false;

  const selectedEmoji = document.getElementById(selectedId).innerText;
  const correct = document.getElementById("exercise5-screen").getAttribute("data-correct-answer");
  console.log("Выбрано:", selectedEmoji, "Правильный ответ:", correct);

  const options = document.querySelectorAll('.exercise5-var');
  options.forEach(option => {
    option.classList.remove('correct', 'incorrect');
    option.style.pointerEvents = 'none';
  });

  if (selectedEmoji === correct) {
    document.getElementById(selectedId).classList.add('correct');
    emojiClockCorrectCount++;
  } else {
    document.getElementById(selectedId).classList.add('incorrect');
    options.forEach(option => {
      if (option.innerText === correct) {
        option.classList.add('correct');
      }
    });
  }

  document.getElementById("next-question5-btn").classList.add("active");
}

// Функция для отображения вопроса в упражнении 5
function displayQuestion5() {
  if (!difficultySelected) return; // Не продолжаем, если сложность не выбрана
  
  const [sentence, correctAnswer, options] = timeQuestions[currentDifficulty][emojiClockCurrentIndex];
  
  // Проверка существования элемента exercise5-image
  const imageElement = document.getElementById("exercise5-image");
  if (imageElement) {
    imageElement.innerText = sentence;
  } else {
    // Если элемента нет, добавляем текст вопроса прямо в exercise5-screen
    const screenElement = document.getElementById("exercise5-screen");
    screenElement.innerHTML = `<div id="exercise5-image" class="emoji-display5">${sentence}</div>`;
  }
  
  document.getElementById("exercise5-screen").setAttribute("data-correct-answer", correctAnswer);

  const shuffled = [...options].sort(() => Math.random() - 0.5);
  for (let i = 1; i <= 4; i++) {
    const optionElement = document.getElementById(`exercise5-var-var${i}`);
    if (optionElement) {
      optionElement.innerText = shuffled[i - 1];
      // Восстанавливаем обработчики событий
      optionElement.setAttribute('onclick', `checkAnswer5('exercise5-var-var${i}')`);
    }
  }

  document.querySelectorAll('.exercise5-var').forEach(option => {
    option.classList.remove('correct', 'incorrect');
    option.style.pointerEvents = 'auto';
  });

  const nextButton = document.getElementById("next-question5-btn");
  if (nextButton) {
    nextButton.classList.remove("active");
  }
  
  emojiClockAllowClick = true;

  twemoji.parse(document.getElementById("exercise5-screen"));
}

// Функция для загрузки следующего вопроса
function loadNextQuestion5() {
  if (!difficultySelected) return; // Проверяем, выбрана ли сложность
  
  emojiClockCurrentIndex++;

  if (emojiClockCurrentIndex >= timeQuestions[currentDifficulty].length) {
    showFinalResult5();
    return;
  }

  displayQuestion5();
}

// Функция для отображения финального результата
function showFinalResult5() {
  const percent = Math.round((emojiClockCorrectCount / timeQuestions[currentDifficulty].length) * 100);
  const resultMessage = `Вы ответили правильно на ${emojiClockCorrectCount} из ${timeQuestions[currentDifficulty].length} вопросов.<br>Ваш результат: ${percent}%`;

  document.getElementById("exercise5-screen").innerHTML = `
    <div class="final-result">
      <h2>Тест завершен</h2>
      <p>${resultMessage}</p>
    </div>
  `;

  const btn = document.getElementById("next-question5-btn");
  btn.classList.add("active");
  btn.textContent = "Пройти снова";
  btn.onclick = function() {
    location.reload();
  };
}
const cells = document.querySelectorAll(".main-teory-cell");
const overlay = document.querySelector(".overlay"); // Используем querySelector для одного элемента

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        cells.forEach(c => c.classList.remove("expand"));
        cell.classList.add("expand");
        overlay.classList.add("active");
    });
});

overlay.addEventListener("click", () => {
    cells.forEach(c => c.classList.remove("expand"));
    overlay.classList.remove("active");
});

document.querySelectorAll('.main-faq-question').forEach(question => {
  question.addEventListener('click', () => {
      const item = question.closest('.main-faq-item');
      item.classList.toggle('active');
  });
});


document.addEventListener("DOMContentLoaded", function () {
  twemoji.parse(document.body, {
    folder: 'svg',
    ext: '.svg'
  });
});
