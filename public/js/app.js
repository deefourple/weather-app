console.log("JS client side LOADED!")

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");



weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  
  messageOne.textContent = "loading...";
  messageTwo.textContent = " ";
  
  fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
    try {
      response.json().then((data) => {
        console.log('data location', data.location);
        console.log('data forecast', data.forecast);
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      });
    } catch (e) {
      messageOne.textContent = e;
    }
  });
});