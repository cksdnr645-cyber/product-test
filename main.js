// Masterpieces Collection
const masterpieces = [
  { 
    title: "별이 빛나는 밤 (The Starry Night)", 
    artist: "빈센트 반 고흐", 
    url: "https://images.unsplash.com/photo-1541450805268-4822a3a774ca?auto=format&fit=crop&q=80&w=2070" 
  },
  { 
    title: "진주 귀걸이를 한 소녀 (Girl with a Pearl Earring)", 
    artist: "요하네스 페르메이르", 
    url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=1945" 
  },
  { 
    title: "기억의 지속 (The Persistence of Memory)", 
    artist: "살바도르 달리", 
    url: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&q=80&w=2038" 
  },
  { 
    title: "모나리자 (Mona Lisa)", 
    artist: "레오나르도 다 빈치", 
    url: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80&w=2070" 
  },
  { 
    title: "키스 (The Kiss)", 
    artist: "구스타프 클림트", 
    url: "https://images.unsplash.com/photo-1576132704106-917ecbd0e64c?auto=format&fit=crop&q=80&w=1974" 
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
  const randomArt = masterpieces[Math.floor(Math.random() * masterpieces.length)];
  
  if (overlay) {
    overlay.style.backgroundImage = 'url("' + randomArt.url + '")';
    info.textContent = randomArt.title + ' - ' + randomArt.artist;
  }
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
document.addEventListener('DOMContentLoaded', initBackground);
