document.addEventListener('DOMContentLoaded', () => {
    const statusElement = document.getElementById('bot-status');
    const responseElement = document.getElementById('response');
    const commandForm = document.getElementById('command-form');

    fetch('http://localhost:3000/status')
        .then(response => response.json())
        .then(data => {
            statusElement.textContent = data.status;
        });

    commandForm.addEventListener('submit', event => {
        event.preventDefault();
        const commandInput = document.getElementById('command-input');
        const command = commandInput.value.trim();

        fetch('http://localhost:3000/command', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ command })
        })
            .then(response => response.json())
            .then(data => {
                responseElement.textContent = data.response;
            });

        commandInput.value = '';
    });
});
