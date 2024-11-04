class Game {
    constructor(container) {
        this.container = container;
        this.wordElement = container.querySelector('.word');
        this.winsElement = container.querySelector('.status__wins');
        this.lossElement = container.querySelector('.status__loss');
        this.timerElement = container.querySelector('.timer');
        this.timer = null;
        this.timeLeft = 0;

        this.reset();
        this.registerEvents();
    }

    reset() {
        this.setNewWord();
        this.winsElement.textContent = 0;
        this.lossElement.textContent = 0;
        this.startTimer();
    }

    registerEvents() {
        document.addEventListener('keydown', (event) => {

            if (this.isLayoutSwitchKey(event)) {
                return;
            }

            const inputChar = event.key;
            const currentSymbol = this.currentSymbol.textContent;

            if (this.isMatchingCharacter(inputChar, currentSymbol)) {
                this.success();
            } else {
                this.fail();
            }
        });
    }

    isLayoutSwitchKey(event) {
        const layoutSwitchKeys = ['Control', 'Shift', 'Alt', 'CapsLock', 'Option', 'Meta'];
        return layoutSwitchKeys.includes(event.key);
    }

    isMatchingCharacter(inputChar, currentSymbol) {
        return inputChar.toLowerCase() === currentSymbol.toLowerCase();
    }

    success() {
        if (this.currentSymbol.classList.contains("symbol_current")) this.currentSymbol.classList.remove("symbol_current");
        this.currentSymbol.classList.add('symbol_correct');
        this.currentSymbol = this.currentSymbol.nextElementSibling;

        if (this.currentSymbol !== null) {
            this.currentSymbol.classList.add('symbol_current');
            return;
        }

        if (++this.winsElement.textContent === 10) {
            alert('Победа!');
            this.reset();
        }
        this.setNewWord();
    }

    fail() {
        if (++this.lossElement.textContent === 5) {
            alert('Вы проиграли!');
            this.reset();
        }
        this.setNewWord();
    }

    setNewWord() {
        const word = this.getWord();
        this.renderWord(word);
        this.startTimer();
    }

    getWord() {
        const words = [
            'bob',
            'awesome',
            'netology',
            'hello',
            'kitty',
            'rock',
            'youtube',
            'popcorn',
            'cinema',
            'love',
            'javascript',
            'люблю',
            'кот',
            'программирование',
            'друзья',
            'kitkat',
            'я люблю kitkat'
        ];
        const index = Math.floor(Math.random() * words.length);
        return words[index];
    }

    renderWord(word) {
        const html = [...word]
            .map((s, i) => `<span class="symbol ${i === 0 ? 'symbol_current' : ''}">${s}</span>`)
            .join('');
        
        this.wordElement.innerHTML = html;
        this.currentSymbol = this.wordElement.querySelector('.symbol_current');
        this.timeLeft = word.length;
        this.updateTimer();
    }

    startTimer() {
        if (this.timer) {
            clearInterval(this.timer);
        }
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateTimer();
            if (this.timeLeft <= 0) {
                clearInterval(this.timer);
                this.fail();
            }
        }, 1000);
    }

    updateTimer() {
        this.timerElement.textContent = this.timeLeft;
    }
}


new Game(document.getElementById('game'));