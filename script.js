// === TinyEng Script ===

// Определяем текущую версию по URL
const currentPath = window.location.pathname;
const version = currentPath.includes('boy') ? 'boy' :
                currentPath.includes('girl') ? 'girl' : null;

// Ссылки по версиям
const links = {
  boy: {
    cell1: 'exerciseboy.html',
    cell2: 'lessonsboy.html',
    cell3: 'alphabetboy.html',
    cell4: 'faqboy.html',
  },
  girl: {
    cell1: 'exercisegirl.html',
    cell2: 'lessonsgirl.html',
    cell3: 'alphabetgirl.html',
    cell4: 'faqgirl.html',
  }
};

// Назначение переходов по клику
function setLink(id, link) {
  const elem = document.getElementById(id);
  if (elem) {
    elem.style.cursor = 'pointer';
    elem.addEventListener('click', () => {
      window.location.href = link;
    });
  }
}

// Устанавливаем переходы по плиткам
if (version && links[version]) {
  ['cell1', 'cell2', 'cell3', 'cell4'].forEach(cell => {
    setLink(`main-grid_${cell}`, links[version][cell]);
  });
} else {
  console.warn('Версия сайта не определена');
}

// Устанавливаем переходы в футере
const footerLinks = document.querySelectorAll('.footer_nav_link');
if (footerLinks.length === 4 && version && links[version]) {
  footerLinks[0].href = links[version].cell1;
  footerLinks[1].href = links[version].cell3;
  footerLinks[2].href = links[version].cell2;
  footerLinks[3].href = links[version].cell4;
}

// Анимация при наведении на выбор пола
const boyBlock = document.getElementById('boy');
const girlBlock = document.getElementById('girl');

if (boyBlock) {
  boyBlock.addEventListener('click', () => window.location.href = "mainboy.html");
  boyBlock.addEventListener('mouseenter', () => document.body.classList.add('boy-hover'));
  boyBlock.addEventListener('mouseleave', () => document.body.classList.remove('boy-hover'));
}

if (girlBlock) {
  girlBlock.addEventListener('click', () => window.location.href = "maingirl.html");
  girlBlock.addEventListener('mouseenter', () => document.body.classList.add('girl-hover'));
  girlBlock.addEventListener('mouseleave', () => document.body.classList.remove('girl-hover'));
}

// === Алфавит: переключение произношения ===
const toggleSwitch = document.getElementById('toggle-switch');
const blocks = document.querySelectorAll('.main_grid-alphabet_cell_half1_trans');

const originalContent = [
  "[ei]", "[bi]", "[si]", "[di]", "[i]", "[ef]", "[dʒi]", "[eich]", "[ai]", "[dʒei]",
  "[kei]", "[el]", "[em]", "[en]", "[ou]", "[pi]", "[kju]", "[ɑː]", "[es]", "[ti]",
  "[juː]", "[vi]", "[double-u]", "[eks]", "[wai]", "[zed]"
];

const newContent = [
  "эй", "би", "си", "ди", "и", "эф", "джи", "эйч", "ай", "джей",
  "кей", "эл", "эм", "эн", "ау", "пи", "кью", "ар", "эс", "ти",
  "ю", "ви", "дабл-ю", "экс", "уай", "зед"
];

function changeContent(content) {
  blocks.forEach((block, index) => {
    block.textContent = content[index];
  });
}

// Инициализация состояния
if (toggleSwitch) {
  toggleSwitch.addEventListener('change', () => {
    changeContent(toggleSwitch.checked ? newContent : originalContent);
  });
}
changeContent(originalContent);

// === Проигрывание звуков ===
let audioFolder = "src/audio";
if (currentPath.includes("alphabetboy")) {
  audioFolder = "src/audiomen";
} else if (currentPath.includes("alphabetgirl")) {
  audioFolder = "src/audiowomen";
}

function playSound(letter) {
  const audio = new Audio(`${audioFolder}/${letter.toLowerCase()}.mp3`);
  audio.play();
}

document.querySelectorAll('.main_grid-alphabet_cell').forEach(cell => {
  const letterBlock = cell.querySelector('.main_grid-alphabet_cell_half1_bukva');
  if (letterBlock) {
    const letter = letterBlock.textContent.trim()[0];
    cell.addEventListener('click', () => playSound(letter));
  }
});
