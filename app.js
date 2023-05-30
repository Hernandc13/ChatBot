const responseObj = {
  "hello": "Hey ! How are you doing ?",
  "hey": "Hey! What's Up",
  "today": new Date().toDateString(),
  "time": new Date().toLocaleTimeString(),
  "como te llamas":hola,
};

const fetchResponse=(userInput)=>{
  return new Promise((res,reject)=>{
      try {
          setTimeout(()=>{
              res(responseObj[userInput]);
          },1200);
      } catch (error) {
         reject(error);
      }
  });
};
const chatBotService={
  getBotResponse(userInput){
      return fetchResponse(userInput);
  },
};
export default chatBotService;

const chatBody = document.querySelector(".chat-body");
const txtInput = document.querySelector("#txtInput");
const send = document.querySelector(".send");
const loadingEle=document.querySelector(".loading");
const chatHeader=document.querySelector(".chat-header");
const container =document.querySelector(".container");
send.addEventListener("click", () => renderUserMessage());

txtInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    renderUserMessage();
  }
});
chatHeader.addEventListener("click",()=>{
  container.classList.toggle("collapse");
});

const renderUserMessage = () => {
  const userInput = txtInput.value;
  renderMessageEle(userInput, "user");
  txtInput.value = "";
  toggleLoading(false);
  setTimeout(() => {
    renderChatbotResponse(userInput);
  }, 800);
};

const renderChatbotResponse = (userInput) => {
  const res = getChatbotResponse(userInput);
};

const renderMessageEle = (txt, type) => {
  let className = "user-message";

  const messageEle = document.createElement("div");
  const txtNode = document.createTextNode(txt);
  messageEle.classList.add(className);
  messageEle.append(txtNode);
  chatBody.append(messageEle);

  if (type !== "user") {
    className = "chatbot-message";
    messageEle.classList.add(className);
    const botResponseContainer=document.createElement("div");
    botResponseContainer.classList.add("bot-response-container");
    const botImg=document.createElement("img");
    botImg.classList.add("imgbot");
    botImg.setAttribute("src","https://www.subitus.com/wp-content/uploads/2019/07/isotipo_subitus_blanco_fondotrans_150x150-01-150x150.png");
    botResponseContainer.append(botImg);
    botResponseContainer.append(messageEle);
    chatBody.append(botResponseContainer);
  }else{
    messageEle.classList.add(className);
    chatBody.append(messageEle);
  }
};

const getChatbotResponse = (userInput) => {
  chatBotService
  .getBotResponse(userInput)
  .then((response)=>{
    if(response!=undefined){
      renderMessageEle(response);
      setScrollPosition();
      toggleLoading(true);
    }else{
      renderMessageEle("Lo lamento no tengo respuesta para tu pregunta, pero seguire aprendiendo...");
      setScrollPosition();
      toggleLoading(true);
    }
  })
  .catch(error=>{
    toggleLoading(true);
  });
};

const setScrollPosition = () => {
  if (chatBody.scrollHeight > 0) {
    chatBody.scrollTop = chatBody.scrollHeight;
  }
};

const toggleLoading=(show)=>loadingEle.classList.toggle("hide",show);