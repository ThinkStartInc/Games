const gameData = [
  {
    category: 'Origins',
    clues: [
      { value: 200, question: 'Which Canadian city is Drake from?', answer: 'Toronto, Ontario.' },
      { value: 400, question: 'Which teen drama did Drake act on before his music career?', answer: 'Degrassi: The Next Generation.' },
      { value: 600, question: 'Drake’s stage name comes from his middle name. What is it?', answer: 'Drake.' },
      { value: 800, question: 'Before he was known as a rapper, Drake first gained fame as a what?', answer: 'Actor.' },
      { value: 1000, question: 'Drake is a citizen of which country?', answer: 'Canada.' }
    ]
  },
  {
    category: 'Breakout Projects',
    clues: [
      { value: 200, question: 'Which mixtape featuring “Best I Ever Had” put Drake on the map?', answer: 'So Far Gone.' },
      { value: 400, question: 'What is Drake’s debut studio album?', answer: 'Thank Me Later.' },
      { value: 600, question: 'Which 2013 album includes “Hold On, We’re Going Home”?', answer: 'Nothing Was the Same.' },
      { value: 800, question: 'Which album includes “One Dance” and “Hotline Bling”?', answer: 'Views.' },
      { value: 1000, question: 'Which double album is split into two sides, “A” and “B”?', answer: 'Scorpion.' }
    ]
  },
  {
    category: 'Signature Songs',
    clues: [
      { value: 200, question: 'Finish the title: “Started From the ____.”', answer: 'Bottom.' },
      { value: 400, question: 'Which Drake single invites you to “call me on my cell phone”?', answer: 'Hotline Bling.' },
      { value: 600, question: 'Which 2018 hit opens with “I only love my bed and my momma”?', answer: 'God’s Plan.' },
      { value: 800, question: 'Which global dancehall-leaning hit is built around the hook “One dance”?', answer: 'One Dance.' },
      { value: 1000, question: 'Which track helped popularize the phrase “YOLO”?', answer: 'The Motto.' }
    ]
  },
  {
    category: 'Collaborations',
    clues: [
      { value: 200, question: 'Which joint album did Drake release with Future?', answer: 'What a Time to Be Alive.' },
      { value: 400, question: 'Which joint album did Drake release with 21 Savage?', answer: 'Her Loss.' },
      { value: 600, question: 'Which Drake song with Rihanna is also the title track of his 2011 album?', answer: 'Take Care.' },
      { value: 800, question: 'Which Future collaboration includes the line “Life is good, you know what I mean”?', answer: 'Life Is Good.' },
      { value: 1000, question: 'Which label led by Lil Wayne signed Drake early in his career?', answer: 'Young Money Entertainment.' }
    ]
  },
  {
    category: 'OVO & Toronto',
    clues: [
      { value: 200, question: 'What does OVO stand for?', answer: 'October’s Very Own.' },
      { value: 400, question: 'What is the name of Drake’s annual Toronto music festival?', answer: 'OVO Fest.' },
      { value: 600, question: 'Which NBA team is Drake a global ambassador for?', answer: 'The Toronto Raptors.' },
      { value: 800, question: 'What nickname for Toronto did Drake help popularize?', answer: 'The 6 (The Six).' },
      { value: 1000, question: 'The owl logo is associated with which Drake brand and label?', answer: 'OVO (October’s Very Own).' }
    ]
  }
];

const boardEl = document.getElementById('board');
const scoreValue = document.getElementById('scoreValue');
const plusScore = document.getElementById('plusScore');
const minusScore = document.getElementById('minusScore');
const shuffleBoard = document.getElementById('shuffleBoard');
const resetBoard = document.getElementById('resetBoard');

const modal = document.getElementById('clueModal');
const closeModal = document.getElementById('closeModal');
const modalCategory = document.getElementById('modalCategory');
const modalValue = document.getElementById('modalValue');
const modalQuestion = document.getElementById('modalQuestion');
const modalAnswer = document.getElementById('modalAnswer');
const revealAnswer = document.getElementById('revealAnswer');
const markCorrect = document.getElementById('markCorrect');
const markWrong = document.getElementById('markWrong');

let boardData = structuredClone(gameData);
let score = 0;
let activeClue = null;

function updateScore(delta) {
  score += delta;
  scoreValue.textContent = score;
}

function renderBoard(data) {
  boardEl.innerHTML = '';

  data.forEach((category) => {
    const categoryCell = document.createElement('div');
    categoryCell.className = 'category';
    categoryCell.textContent = category.category;
    boardEl.appendChild(categoryCell);
  });

  for (let row = 0; row < 5; row += 1) {
    data.forEach((category, colIndex) => {
      const clue = category.clues[row];
      const clueButton = document.createElement('button');
      clueButton.className = 'clue';
      clueButton.type = 'button';
      clueButton.dataset.category = category.category;
      clueButton.dataset.row = row;
      clueButton.dataset.col = colIndex;

      if (clue.used) {
        clueButton.classList.add('used');
        clueButton.innerHTML = 'Played <span>tap to skip</span>';
      } else {
        clueButton.textContent = `$${clue.value}`;
      }

      clueButton.addEventListener('click', () => handleClueClick(clue, category.category));
      boardEl.appendChild(clueButton);
    });
  }
}

function handleClueClick(clue, category) {
  if (clue.used) {
    return;
  }

  activeClue = clue;
  modalCategory.textContent = category;
  modalValue.textContent = `$${clue.value}`;
  modalQuestion.textContent = clue.question;
  modalAnswer.textContent = clue.answer;
  modalAnswer.classList.remove('show');
  revealAnswer.textContent = 'Show answer';
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  closeModal.focus();
}

function closeClueModal() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  activeClue = null;
}

function markClueUsed() {
  if (!activeClue) {
    return;
  }
  activeClue.used = true;
  renderBoard(boardData);
  closeClueModal();
}

revealAnswer.addEventListener('click', () => {
  modalAnswer.classList.toggle('show');
  revealAnswer.textContent = modalAnswer.classList.contains('show') ? 'Hide answer' : 'Show answer';
});

markCorrect.addEventListener('click', () => {
  if (!activeClue) return;
  updateScore(activeClue.value);
  markClueUsed();
});

markWrong.addEventListener('click', () => {
  if (!activeClue) return;
  updateScore(-activeClue.value);
  markClueUsed();
});

closeModal.addEventListener('click', closeClueModal);
modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeClueModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('is-open')) {
    closeClueModal();
  }
});

plusScore.addEventListener('click', () => updateScore(200));
minusScore.addEventListener('click', () => updateScore(-200));

shuffleBoard.addEventListener('click', () => {
  boardData = boardData
    .map((category) => ({ ...category, clues: [...category.clues] }))
    .sort(() => Math.random() - 0.5);
  renderBoard(boardData);
});

resetBoard.addEventListener('click', () => {
  boardData = structuredClone(gameData);
  score = 0;
  scoreValue.textContent = score;
  renderBoard(boardData);
});

renderBoard(boardData);
