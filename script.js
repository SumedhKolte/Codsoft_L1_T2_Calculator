document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const keys = document.querySelectorAll('.key');
    const historyList = document.getElementById('history-list');
    const showHistoryButton = document.getElementById('show-history');
    const darkModeButton = document.getElementById('toggle-dark-mode');
    const deleteHistoryButton = document.getElementById('delete-history');

    let history = [];

    keys.forEach(key => {
        key.addEventListener('click', function () {
            const action = key.dataset.action;
            const value = key.dataset.value;
            const currentDisplay = display.innerText;

            switch (action) {
                case 'clear':
                    display.innerText = '0';
                    break;
                case 'delete':
                    display.innerText = currentDisplay.slice(0, -1) || '0';
                    break;
                case 'operation':
                    if (['+', '-', '*', '/'].includes(currentDisplay.slice(-1))) {
                        display.innerText = currentDisplay.slice(0, -1) + value;
                    } else {
                        display.innerText += value;
                    }
                    break;
                case 'equal':
                    try {
                        const result = eval(currentDisplay.replace('×', '*').replace('÷', '/'));
                        display.innerText = result;
                        addHistory(currentDisplay + ' = ' + result);
                    } catch {
                        display.innerText = 'Error';
                    }
                    break;
                default:
                    if (currentDisplay === '0') {
                        display.innerText = value;
                    } else {
                        display.innerText += value;
                    }
            }
        });
    });

    function addHistory(entry) {
        history.push(entry);
        if (history.length > 10) {
            history.shift();
        }
        renderHistory();
    }

    function renderHistory() {
        historyList.innerHTML = '';
        history.forEach(entry => {
            const li = document.createElement('li');
            li.innerText = entry;
            historyList.appendChild(li);
        });
    }

    showHistoryButton.addEventListener('click', function () {
        const historySection = document.getElementById('history');
        if (historySection.style.display === 'none' || !historySection.style.display) {
            historySection.style.display = 'block';
        } else {
            historySection.style.display = 'none';
        }
    });

    deleteHistoryButton.addEventListener('click', function () {
        history = [];
        renderHistory();
    });

    // Initially hide history
    document.getElementById('history').style.display = 'none';

    darkModeButton.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        darkModeButton.innerText = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
    });

    
});
