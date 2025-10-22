const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatbotCloseBtn = document.querySelector(".close-btn");

let userMessage;
const API_KEY = "AIzaSyCG_qnZ5dTi9jW1i0G0ni0IKF4lSve-eOk";

// ====== Criação dos balões de chat ======
const createChatLi = (message, className) => {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", className);
  let chatContent =
    className === "outgoing"
      ? `<p></p>`
      : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").textContent = message;
  return chatLi;
};

// ====== Primeira mensagem do bot ======
window.addEventListener("load", () => {
  const li = createChatLi("Olá! Vamos conversar sobre lixo eletrônico. Pergunte qualquer coisa!", "incoming");
  chatbox.appendChild(li);
});

// ====== Geração de resposta ======
const generateResponse = (incomingChatLi) => {
  const messageElement = incomingChatLi.querySelector("p");

  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [{ text: userMessage }]
        }
      ],
      systemInstruction: {
        role: "system",
        parts: [
          {
            text:
              "Você é um assistente especializado em lixo eletrônico, reciclagem e sustentabilidade. " +
              "Sempre mantenha a conversa focada nesses temas, mesmo que o usuário tente falar sobre outro assunto."
          }
        ]
      }
    })
  };

  fetch(API_URL, requestOptions)
    .then((res) => res.json())
    .then((data) => {
      messageElement.textContent = data.candidates[0].content.parts[0].text;
    })
    .catch((error) => {
      console.error(error);
      messageElement.textContent = "Oops! Algo deu errado. Tente novamente.";
    })
    .finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
};

// ====== Função para enviar mensagem ======
const handleChat = () => {
  userMessage = chatInput.value.trim();
  if(!userMessage) return;
  chatInput.value = "";

  chatbox.appendChild(createChatLi(userMessage,"outgoing"));
  chatbox.scrollTo(0,chatbox.scrollHeight);

  setTimeout(() => {
    const incomingChatLi = createChatLi("Pensando...","incoming");
    chatbox.appendChild(incomingChatLi);
    chatbox.scrollTo(0,chatbox.scrollHeight);
    generateResponse(incomingChatLi);
  }, 600);
}

// ====== Eventos ======
chatInput.addEventListener("keydown",(e) => {
  if(e.key === "Enter" && !e.shiftKey){
      e.preventDefault();
      handleChat();
  }
});

sendChatBtn.addEventListener("click",handleChat);
chatbotCloseBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
