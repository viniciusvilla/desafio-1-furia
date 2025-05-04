//Veja se os comentários estão ajudando

const msgerForm = get(".msger-inputarea")
const msgerInput = get(".msger-input")
const msgerChat = get(".msger-chat")

//Essas constantes definem quem é o bot e quem é o usuário.
const bot_img = "imagens/Furia_Esports_logo.png"
const person_img = "imagens/user.png"
const bot_name = "BOT"
const person_name = "Person"

//Possiveis prompts que o usuário escreveria
const prompts = [
  /* 2 */["Tudo bem?", "Como esta?", "Você esta bem?"], 
  /* 3 */["x1 fallen", "x1 com o fallen", "duelo fallen", "desafiar fallen", "vem x1", "vem x1 seu bot", "x1"],
  /* 4 */["camisa furia", "onde comprar camisa", "camiseta furia", "loja furia", "roupa", "calça", "tênis", "sapato", "bermuda", "camisa", "loja", "camiseta"],
  /* 5 */["virar pro player", "como ser pro player", "quero ser jogador", "como entrar na furia"],
  /* 6 */["proximo jogo", "quando tem jogo", "quando furia joga", "agenda furia", "campeonato", "qual o jogo", 'camp', 'jogo'],
  /* 7 */["qual seu time", "qual time voce torce", "qual seu time favorito", "torcida"],
    ["Discord", "qual o discord", "Qual o discord", "discord"],
    ["obrigado", "valeu irmão", "vlw", "gg", "flw"]
]

//Respostas pré-programadas do bot
const replies = [
 /* 2 */["Tô bem! E você, FURIOSO? 🔥", "Na atividade! Bora?", "Melhor agora falando contigo 👊"], 
 /* 3 */["Bora! Só marcar no servidor 🔥", "X1? Já tô aquecendo! 🎯", "Desafio aceito, mas prepara o capacete! 😈", "Aqui é só flickada no HS em papai 🔥🔥"],
 /* 4 */[`Nossa loja tá te esperando! 🛒 Entra lá: <a href="https://www.furia.gg/">loja oficial</a>`, `Quer drip? Só na nossa <a href="https://www.furia.gg/">loja oficial</a> 🐆`],
 /* 5 */["Treina muito, confia no processo! 🧠", "Dedicação diária! Bora ser lenda 🔥", "Cola na base, estuda e acredita! 🚀"],
 /* 6 */[
        `Confira nossa agenda no nosso <a href="https://www.furia.gg/">site oficial</a> 🔥🔥`,
        `Próximo jogo? Em breve, fica ligado no <a href="https://www.furia.gg/">site oficial</a>  📅🐆`,
    ],
 /* 7 */["Time do coração? Só a FURIA mesmo 🔥🐆", "Eu torço pra FURIA, sempre! 🎯"],
    [`Nosso discord: <a href="https://www.furia.gg/" target="_blank">Aqui</a>`],

    ["De nada guerreiro!! 👊🔥", "Vlw tamo together 👊", "GG meu rei TMJ 👊👊"]
]

//Caso não ache uma resposta compátivel, cai no vetor de alternativas

const alternative = [
    "Não gagueja não, passa a CALL meu IGL 😆",
    "Não entendi, pode repetir?",
    "Calma minha Dragon Lore Souvenir, não entendi nada, poderia digitar novamente? 😆😆",
    "Desculpa, a Opera do cs_italy estava alta demais... poderia repetir? 😆😆"
] 

let firstMessage = true; // Flag para verificar a primeira mensagem 

msgerForm.addEventListener("submit", event => {
    event.preventDefault()
    const msgText = msgerInput.value

    if (!msgText){ //verifica se o input está vazio
        return
    } 
    msgerInput.value = ""

    addChat(person_name, person_img, "right", msgText) //Exibe a mensagem do usuário no chat-bot.

    output(msgText) //Gera a resposta do bot.
})

function output(input) {
    let product;
    let text = input.toLowerCase().replace(/[^\w\sáéíóúãõâêîôûàèùç]/gi, "").trim(); //Limpa caracteres especiais do texto do usúario

    text = text
        .replace(/ a /g, " ")
        .replace(/i feel/g, "")
        .replace(/whats/g, "what is")
        .replace(/please /g, "")
        .replace(/ please/g, "")
        .replace(/r u/g, "are you");

    //Verifica se bate com alguma frase do vetor prompts
    const foundReply = compare(prompts, replies, text);

    //Caso seja a primeira mensagem do usúario, exibir a mensagem de boas vindas.
    if (firstMessage) {
        product = `<p style="margin-bottom: 10px">
                Olá, FURIOSO! 👊 Me diga em poucas palavras o que você precisa.
                </p>

                <p style="margin-bottom: 10px">
                    Aqui vão alguns exemplos para te ajudar:
                </p>

            <ul style="margin-bottom: 10px; padding-left: 20px">
                <li>
                    <strong>Campeonato</strong> – para saber sobre nossos jogos e eventos
                </li>
                <li>
                    <strong>Roupa</strong> – para conhecer nossos produtos e a loja oficial
                </li>
                <li>
                    <strong>Discord</strong> – para acessar o servidor oficial da FURIA
                </li>
            </ul>

            <p style="margin-bottom: 10px">
                Sinta-se à vontade para digitar o que está procurando.
            </p>

            `
        firstMessage = false; // Após a primeira entrada, a flag muda
    } else if (foundReply) { //Responde com o conteúdo correspondente
        product = foundReply;
    }
    else {
        product = alternative[Math.floor(Math.random() * alternative.length)]; //Caso contrário, pega uma resposta aleatória
    }

    const delay = input.split(" ").length * 100; //Cria um pequeno delay proporcional ao tamanho da mensagem do usúario

    setTimeout(() => {
        addChat(bot_name, bot_img, "left", product);
    }, delay);
}

//Percorre cada item no vetor prompts e normaliza (pontuação, caixa alta e etc)
function compare(promptsArray, repliesArray, string) {
    let reply;
    let replyFound = false;

    for (let x = 0; x < promptsArray.length; x++) {
        for (let y = 0; y < promptsArray[x].length; y++) {

            let promptNormalized = promptsArray[x][y].toLowerCase().replace(/[^\w\sáéíóúãõâêîôûàèùç]/gi, "").trim();

            //Se achar uma resposta correspondente retorna uma resposta aleátoria de replies
            if (string.includes(promptNormalized)) {
                let replies = repliesArray[x];
                reply = replies[Math.floor(Math.random() * replies.length)];
                replyFound = true;
                break;
            }
        }
        if (replyFound) break;
    }

    return reply;
}

//Define mensagens de usuário (right) ou bot (left) e cria a div com estrutura de bolha de chat (Aquela div que está comentada no HTML)
function addChat(name, img, side, text) {
    const msgHTML = `
    <div class = "msg ${side}-msg">
        <div class = "msg-img" style = "background-image: url(${img});"></div>
        <div class = "msg-bubble">
            <div class = "msg-info">
                <div class="msg-info-name">${name}</div>
                <div class="msg-info-time">${FormDate(new Date())}</div>
            </div>

            <div class = "msg-text">${text}</div>
            
        </div>
    </div>
    `

    msgerChat.insertAdjacentHTML("beforeend", msgHTML)
    msgerChat.scrollTop += 500
}

//Atalho para document.querySelector()
function get(seLector, root = document) {
    return root.querySelector(seLector)
}

function FormDate(date) {
    const h = "0" + date.getHours()
    const m = "0" + date.getMinutes()

    return `${h.slice(-2)}:${m.slice(-2)}`
}


