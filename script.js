//JS dedicado a criar a lógica de abrir e fechar o chat-bot

let chat_baloon_button = window.document.querySelector('.chat-baloon');
let chat_bot = window.document.querySelector('#chat');
let close_button = window.document.querySelector('.close_button');

// Abrir chat clicando na bolinha
chat_baloon_button.addEventListener('click', () => {
    if (chat_bot.style.display === 'none' || chat_bot.style.display === '') {
        chat_bot.style.display = 'flex';
        close_button.style.display = 'block';
        chat_baloon_button.style.display = 'none'
    } else {
        chat_bot.style.display = 'none';
        close_button.style.display = 'none';
    }
});

// Fechar chat clicando no botão de fechar
close_button.addEventListener('click', () => {
    chat_bot.style.display = 'none';
    close_button.style.display = 'none';
    chat_baloon_button.style.display = 'block'
});


//Área responsável pelo aumento dinâmico do text area
const textarea = document.querySelector('.msger-input');

textarea.addEventListener('input', () => {
    textarea.style.height = 'auto'; // reseta a altura
    const scrollHeight = textarea.scrollHeight;
    const maxHeight = parseFloat(getComputedStyle(textarea).lineHeight) * 4;

    textarea.style.overflowY = scrollHeight > maxHeight ? 'auto' : 'hidden';
    textarea.style.height = Math.min(scrollHeight, maxHeight) + 'px';
});