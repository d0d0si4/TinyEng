const version = localStorage.getItem('gender');
const savedGender = localStorage.getItem('gender');
const currentPath = window.location.pathname;
const fileName = currentPath.split('/').pop();

// Проверка: если это не index.html и пол не выбран — перенаправляем
if (fileName !== 'index.html' && !localStorage.getItem('gender')) {
  window.location.href = 'index.html';
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
  boy: [
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
  ]
  ,
  girl: [
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
  ]
};

const audioQuestionsByGender = {
  boy: [
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
  girl: [
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
  ]
};

const imageQuestionsByGender = {
  boy: [
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
  ]
  ,
  girl: [
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
  ]
};

const exercise4WordsByGender = {
  boy: ["apple", "banana", "cat", "dog", "elephant","car","chair","garage","close"],
  girl: ["flower", "butterfly", "kitten", "strawberry", "unicorn","dress","garden","fish"]
};

const timeQuestions = [
  ["It's one o'clock.", "🕐", ["🕐", "🕒", "🕘", "🕓"]],
  ["It's two o'clock.", "🕑", ["🕐", "🕑", "🕓", "🕕"]],
  ["It's three o'clock.", "🕒", ["🕓", "🕒", "🕑", "🕔"]],
  ["It's four o'clock.", "🕓", ["🕔", "🕒", "🕓", "🕚"]],
  ["It's five o'clock.", "🕔", ["🕔", "🕖", "🕘", "🕐"]],
  ["It's six o'clock.", "🕕", ["🕘", "🕕", "🕔", "🕓"]],
  ["It's seven o'clock.", "🕖", ["🕖", "🕗", "🕙", "🕕"]],
  ["It's eight o'clock.", "🕗", ["🕘", "🕗", "🕚", "🕔"]],
  ["It's nine o'clock.", "🕘", ["🕖", "🕘", "🕗", "🕙"]],
  ["It's ten o'clock.", "🕙", ["🕙", "🕛", "🕘", "🕒"]],
  ["It's eleven o'clock.", "🕚", ["🕘", "🕚", "🕐", "🕖"]],
  ["It's twelve o'clock.", "🕛", ["🕐", "🕛", "🕚", "🕙"]]
];


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

//exercise 1 -----------------------------------------------------------


function loadNextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex >= questionsByGender[version].length || currentQuestionIndex >= 10) {
    showFinalResult();
    return;
  }

  document.getElementById("next-question-btn").classList.remove("active");
  displayQuestion();
}

function checkAnswer(selectedVar) {
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
  const question = questionsByGender[version][currentQuestionIndex];
  const sentenceWithBlank = question.sentence.replace("___", "<span class='blank'>___</span>");
  document.getElementById("exercise1-screen").innerHTML = sentenceWithBlank;

  const shuffledOptions = question.options.sort(() => Math.random() - 0.5);
  for (let i = 1; i <= 4; i++) {
    document.getElementById(`exercise1-var-var${i}`).innerHTML = shuffledOptions[i - 1];
  }

  document.getElementById("exercise1-screen").setAttribute("data-correct-answer", question.correctAnswer);

  const nextButton = document.getElementById("next-question-btn");
  nextButton.classList.remove("active");

  document.querySelectorAll('.exercise1-var').forEach(option => {
    option.classList.remove('correct', 'incorrect');
    option.style.pointerEvents = 'auto';
  });
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
  nextButton.textContent = 'Перезапустить тест';
  nextButton.onclick = function () {
    location.reload();
  };
}

window.onload = function () {
  if (version) {
    // Перемешиваем грамматические вопросы
    questionsByGender[version] = questionsByGender[version].sort(() => Math.random() - 0.5);
    displayQuestion();
  } else {
    console.warn('Пол не выбран.');
  }
};
window.addEventListener("DOMContentLoaded", function () {
  displayQuestion();
});

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

    const browser = detectBrowser();

    const onVoicesChanged = () => {
      const voices = window.speechSynthesis.getVoices();
      console.log("Доступные голоса:", voices);

      let maleVoice = null;
      let femaleVoice = null;

      if (browser === "chrome") {
        maleVoice = voices.find(voice => voice.name === "Google UK English Male");
        femaleVoice = voices.find(voice => voice.name === "Google UK English Female");
      } else if (browser === "edge") {
        maleVoice = voices.find(voice => voice.name === "Microsoft Ryan Online (Natural) - English (United Kingdom)");
        femaleVoice = voices.find(voice => voice.name === "Microsoft Libby Online (Natural) - English (United Kingdom)");
      } else if (browser === "safari") {
        maleVoice = voices.find(voice => voice.name === "Daniel");
        femaleVoice = voices.find(voice => voice.name === "Moira");
      } else {
        // Под другие браузеры — выбираем первый доступный английский голос
        maleVoice = voices.find(voice => voice.lang.startsWith("en"));
        femaleVoice = voices.find(voice => voice.lang.startsWith("en"));
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-GB';
      utterance.rate = 1;
      utterance.pitch = 1.1;

      if (version === 'girl' && femaleVoice) {
        utterance.voice = femaleVoice;
      } else if (version === 'boy' && maleVoice) {
        utterance.voice = maleVoice;
      } else {
        console.warn("Голос не найден для выбранной версии:", version);
      }

      isSpeaking = true;

      utterance.onend = () => {
        isSpeaking = false;
        console.log("Озвучка завершена");
      };

      utterance.onerror = () => {
        isSpeaking = false;
        console.warn("Ошибка озвучки");
      };

      window.speechSynthesis.speak(utterance);
      window.speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged);
    };

    if (window.speechSynthesis.getVoices().length) {
      onVoicesChanged();
    } else {
      window.speechSynthesis.addEventListener('voiceschanged', onVoicesChanged);
    }
  } else {
    console.warn("Озвучка не поддерживается");
  }
}


// Отобразить текущий вопрос
function displayAudioQuestion() {
  const data = audioQuestionsByGender[version][audioCurrentIndex];
  const sentenceWithBlank = data.sentence.replace(data.missing, `<span class="blank">___</span>`);
  const fullSentence = data.sentence;

  // Вставляем предложение без динамика
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
  });

  document.getElementById("next-question2-btn").classList.remove("active");
}

// Проверка ответа
function checkAnswer2(selectedId) {
  const selectedOption = document.getElementById(selectedId).textContent;
  const correctOption = audioQuestionsByGender[version][audioCurrentIndex].missing;

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
  if (audioCurrentIndex >= audioQuestionsByGender[version].length) {
    showFinalAudioResult();
  } else {
    displayAudioQuestion();
  }
}

// Финальный экран
function showFinalAudioResult() {
  const percent = Math.round((audioCorrectCount / audioQuestionsByGender[version].length) * 100);
  document.getElementById("exercise2-screen").innerHTML = `
    <div class="final-result">
      <h2>Тест завершён</h2>
      <p>Правильных ответов: ${audioCorrectCount} из ${audioQuestionsByGender[version].length} <br>Результат: ${percent}%</p>
    </div>
  `;

  document.getElementById("next-question2-btn").classList.add("active");
  document.getElementById("next-question2-btn").textContent = "Пройти снова";
  document.getElementById("next-question2-btn").onclick = () => location.reload();
}

// Запуск при загрузке страницы
window.addEventListener("DOMContentLoaded", () => {
  if (version) {
    audioQuestionsByGender[version] = audioQuestionsByGender[version].sort(() => Math.random() - 0.5);
    displayAudioQuestion();
  } else {
    console.warn("Версия не определена");
  }
});
// Функция для случайного выбора элемента из массива
function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

//exercise 3----------------------------------------------------

function loadNextQuestion3() {
  const questions = imageQuestionsByGender[version];
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
  });

  document.getElementById("next-question3-btn").classList.remove("active");
  imageAllowClick = true;
}

function checkAnswer3(id) {
  if (!imageAllowClick) return;

  const selectedIndex = parseInt(id.slice(-1)) - 1;
  const q = imageQuestionsByGender[version][imageCurrentIndex];

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
  const percent = Math.round((imageCorrectCount / imageQuestionsByGender[version].length) * 100);
  document.getElementById("exercise3-screen").innerHTML = `
    <div class="final-result">
      <h2>Тест завершён</h2>
      <p>Правильных ответов: ${imageCorrectCount} из ${imageQuestionsByGender[version].length}<br>Результат: ${percent}%</p>
    </div>
  `;

  document.getElementById("next-question3-btn").classList.add("active");
  document.getElementById("next-question3-btn").textContent = "Пройти снова";
}

window.addEventListener("DOMContentLoaded", () => {
  if (version && imageQuestionsByGender[version]) {
    imageQuestionsByGender[version] = imageQuestionsByGender[version].sort(() => Math.random() - 0.5);
    loadNextQuestion3();
  } else {
    console.warn("Версия не определена или вопросы отсутствуют.");
  }

  document.getElementById("next-question3-btn").addEventListener("click", () => {
    if (imageCurrentIndex >= imageQuestionsByGender[version].length) {
      location.reload();
    } else {
      imageCurrentIndex++;
      loadNextQuestion3();
    }
  });
});


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
  speakText(word); // Используем общую функцию с поддержкой пола
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

//exercise 5-----------------------------------------------------------
function displayQuestion5() {
  const [sentence, correctAnswer, options] = timeQuestions[emojiClockCurrentIndex];
  document.getElementById("exercise5-image").innerText = sentence;
  document.getElementById("exercise5-screen").setAttribute("data-correct-answer", correctAnswer);

  const shuffled = options.sort(() => Math.random() - 0.5);
  for (let i = 1; i <= 4; i++) {
    document.getElementById(`exercise5-var-var${i}`).innerText = shuffled[i - 1];
  }

  document.querySelectorAll('.exercise5-var').forEach(option => {
    option.classList.remove('correct', 'incorrect');
    option.style.pointerEvents = 'auto';
  });

  document.getElementById("next-question5-btn").classList.remove("active");
  emojiClockAllowClick = true;
}

function checkAnswer5(selectedId) {
  if (!emojiClockAllowClick) return;
  emojiClockAllowClick = false;

  const selectedEmoji = document.getElementById(selectedId).innerText;
  const correct = document.getElementById("exercise5-screen").getAttribute("data-correct-answer");

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

function loadNextQuestion5() {
  emojiClockCurrentIndex++;

  if (emojiClockCurrentIndex >= timeQuestions.length) {
    showFinalResult5();
    return;
  }

  displayQuestion5();
}

function showFinalResult5() {
  const percent = Math.round((emojiClockCorrectCount / timeQuestions.length) * 100);
  const resultMessage = `You answered correctly on ${emojiClockCorrectCount} out of ${timeQuestions.length} questions.<br>Your result: ${percent}%`;

  document.getElementById("exercise5-screen").innerHTML = `
    <div class="final-result">
      <h2>Test Finished</h2>
      <p>${resultMessage}</p>
    </div>
  `;

  const btn = document.getElementById("next-question5-btn");
  btn.classList.add("active");
  btn.textContent = "Restart Test";
  btn.onclick = function () {
    location.reload();
  };
}

window.onload = function () {
  displayQuestion5();
};
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

