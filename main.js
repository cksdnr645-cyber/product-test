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
  lottoNumbersContainer.innerHTML = ''; // Clear previous numbers
  numbers.forEach(number => {
    const numberElement = document.createElement('div');
    numberElement.classList.add('lotto-number');
    numberElement.textContent = number;
    lottoNumbersContainer.appendChild(numberElement);
  });
}

if (generateButton) {
  generateButton.addEventListener('click', () => {
    const numbers = generateLottoNumbers();
    displayNumbers(numbers);
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
    this.innerHTML = `
      <div class="theme-toggle-container">
        <button class="toggle-btn">
          ${this.isDark ? '☀️ 라이트 모드' : '🌙 다크 모드'}
        </button>
      </div>
    `;
    const btn = this.querySelector('button');
    if (btn) {
      btn.addEventListener('click', () => this.toggle());
    }
  }
}

customElements.define('theme-toggle', ThemeToggle);
