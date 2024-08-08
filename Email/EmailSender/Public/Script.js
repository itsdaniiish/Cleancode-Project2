document.getElementById('emailForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    fetch('http://localhost:3100/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from,
        to,
        subject,
        text: message
      })
    })
    .then(response => response.json())
    .then(data => {
      document.getElementById('responseMessage').textContent = data.message;
    })
    .catch(error => {
      document.getElementById('responseMessage').textContent = 'An error occurred: ' + error.message;
    });
  });
  