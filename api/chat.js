async function sendMessage() {
    const inputField = document.getElementById('userInput');
    const messageContainer = document.getElementById('chatMessages');
    const userText = inputField.value.trim();

    if (!userText) return;

    messageContainer.innerHTML += `<div class="message user-msg">${userText}</div>`;
    inputField.value = '';
    messageContainer.scrollTop = messageContainer.scrollHeight;

    const loadingId = 'loading_' + Date.now();
    messageContainer.innerHTML += `<div class="message ai-msg" id="${loadingId}">AI đang suy nghĩ...</div>`;
    messageContainer.scrollTop = messageContainer.scrollHeight;

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userText })
        });

        const data = await response.json();
        document.getElementById(loadingId).remove();
        messageContainer.innerHTML += `<div class="message ai-msg">${data.reply || data.error}</div>`;
    } catch (error) {
        document.getElementById(loadingId).remove();
        messageContainer.innerHTML += `<div class="message ai-msg">Lỗi kết nối tới server!</div>`;
    }

    messageContainer.scrollTop = messageContainer.scrollHeight;
}
