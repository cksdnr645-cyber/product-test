// Cute Dog Photos Collection
const dogPhotos = [
  { 
    title: "골든 리트리버", 
    description: "미소 짓는 귀여운 리트리버", 
    url: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=2024" 
  },
  { 
    title: "시바견", 
    description: "초원을 달리는 시바견", 
    url: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=2069" 
  },
  { 
    title: "포메라니안", 
    description: "솜사탕 같은 포메라니안", 
    url: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=1964" 
  },
  { 
    title: "비숑 프리제", 
    description: "깜찍한 비숑", 
    url: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=2071" 
  },
  { 
    title: "닥스훈트", 
    description: "귀여운 소시지 강아지", 
    url: "https://images.unsplash.com/photo-1612195583950-b8fd34c87093?auto=format&fit=crop&q=80&w=2070" 
  }
];

// Lotto Generation Logic
const generateButton = document.getElementById('generate-button');
const lottoNumbersContainer = document.getElementById('lotto-numbers');

function generateLottoNumbers() {
  const numbers = [];
  while (numbers.length < 6) {
    const randomNumber = Math.floor(Math.random() * 45) + 1;
    if (!numbers.includes(randomNumber)) {
      numbers.push(randomNumber);
    }
  }
  numbers.sort((a, b) => a - b);
  return numbers;
}

function displayNumbers(numbers) {
  lottoNumbersContainer.innerHTML = '';
  numbers.forEach((number, index) => {
    setTimeout(() => {
      const numberElement = document.createElement('div');
      numberElement.classList.add('lotto-number');
      numberElement.textContent = number;
      lottoNumbersContainer.appendChild(numberElement);
    }, index * 100);
  });
}

if (generateButton) {
  generateButton.addEventListener('click', () => {
    const numbers = generateLottoNumbers();
    displayNumbers(numbers);
  });
}

// Background Manager
function initBackground() {
  const overlay = document.getElementById('background-overlay');
  const info = document.getElementById('painting-info');
  const randomDog = dogPhotos[Math.floor(Math.random() * dogPhotos.length)];
  
  if (overlay) {
    overlay.style.backgroundImage = 'url("' + randomDog.url + '")';
    info.textContent = '🐶 ' + randomDog.title + ' - ' + randomDog.description;
  }
}

// Comment System (Local Memory for now, as no Firebase Config provided yet)
const commentList = document.getElementById('comment-list');
const commentNameInput = document.getElementById('comment-name');
const commentTextInput = document.getElementById('comment-text');
const submitCommentBtn = document.getElementById('submit-comment');

let comments = JSON.parse(localStorage.getItem('lotto_comments') || '[]');

function renderComments() {
  if (!commentList) return;
  commentList.innerHTML = '';
  comments.forEach(comment => {
    const item = document.createElement('div');
    item.classList.add('comment-item');
    item.innerHTML = '<span class="name">' + comment.name + '</span>' +
                    '<span class="text">' + comment.text + '</span>';
    commentList.appendChild(item);
  });
  commentList.scrollTop = commentList.scrollHeight;
}

function addComment() {
  const name = commentNameInput.value.trim();
  const text = commentTextInput.value.trim();
  
  if (!name || !text) return;
  
  const newComment = { name, text, date: new Date().toISOString() };
  comments.push(newComment);
  localStorage.setItem('lotto_comments', JSON.stringify(comments));
  
  commentNameInput.value = '';
  commentTextInput.value = '';
  renderComments();
}

if (submitCommentBtn) {
  submitCommentBtn.addEventListener('click', addComment);
  commentTextInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addComment();
  });
}

// Theme Toggle Web Component
class ThemeToggle extends HTMLElement {
  constructor() {
    super();
    this.isDark = localStorage.getItem('theme') === 'dark';
    this.render();
    this.applyTheme();
  }

  applyTheme() {
    if (this.isDark) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
  }

  toggle() {
    this.isDark = !this.isDark;
    this.applyTheme();
    this.render();
  }

  render() {
    this.innerHTML = '<div class="theme-toggle-container">' +
        '<button class="toggle-btn">' +
          (this.isDark ? '☀️ 라이트 모드' : '🌙 다크 모드') +
        '</button>' +
      '</div>';
    const btn = this.querySelector('button');
    if (btn) {
      btn.addEventListener('click', () => this.toggle());
    }
  }
}

customElements.define('theme-toggle', ThemeToggle);

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  initBackground();
  renderComments();
});
