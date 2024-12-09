import Game from './game.js';
document.addEventListener('DOMContentLoaded', () => {
    const terminalBody = document.getElementById('terminal-body');
    const commandInput = document.getElementById('command-input');
    const game = new Game();

    commandInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const command = commandInput.value.trim();
            if (command) {
                executeCommand(command);
                commandInput.value = '';
            }
        }
    });

    function executeCommand(command) {
        const outputLine = document.createElement('div');
        outputLine.classList.add('line');
        outputLine.innerHTML = `<span class="prompt">$</span> <span class="command">${command}</span>`;
        commandInput.parentElement.insertAdjacentElement('beforebegin', outputLine);

        const resultLine = document.createElement('div');
        resultLine.classList.add('line');
        let result = processCommand(command);
        // resultLine.innerHTML = `<span class="result">${result}</span>`;
        commandInput.parentElement.insertAdjacentElement('beforebegin', resultLine);

        typeWriterEffect(resultLine, result);

        terminalBody.scrollTo(0, terminalBody.scrollHeight);
        
    }

    function processCommand(command) {
        let args = command.split(' ').map(arg => arg.trim()).filter(arg => arg);

        if (game.running) {
            switch (args[0]) {
                case 'help':
                    return 'Available commands:\nhelp\ninfo\nrestart\nend';
                case 'info':
                    return game.getCurrentStage();
                case 'restart':
                    return game.restartGame();
                case 'end':
                    game.running = false;
                    return 'Game ended';
                default:
                    return game.answer(args[0]);
            }
        }

        switch (args[0]) {
            case 'echo':
                return args.slice(1).join(' ').replace(/"/g, '');
            case 'help':
                return 'Available commands:\nhelp\necho "[TEXT]"\nstart [PASSWORD]';
            case 'start':
                return game.startGame(args[1]);
            case 'next':
                return game.getCurrentStage();
            default:
                return `Command not found: ${command}`;
        }
    }

    function typeWriterEffect(element, text, speed = 30) {
        let i = 0;
        let displayedText = '';
        function type() {
            if (i < text.length) {
                if (text.charAt(i) === '\n') {
                    displayedText += '<br>';
                } else {
                    displayedText += text.charAt(i);
                }
                element.innerHTML = `<span class="result">${displayedText}</span>`;
                i++;
                setTimeout(type, speed);
                terminalBody.scrollTo(0, terminalBody.scrollHeight);
            }
        }
        type();
    }
});