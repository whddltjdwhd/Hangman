const word = document.querySelector("#word");
const lives = document.querySelector(".showLives");
const btn = document.querySelector("#btn");
const form = document.querySelector("#submit");
const list = document.querySelector(".list");

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const newLi = document.createElement('li');
    newLi.innerText = word.value;
    list.appendChild(newLi);
    console.log(word.value);

})
// console.log(word.textContent + lives.textContent);
btn.addEventListener("click", ()=>{
    
})
lives.innerHTML = "<h1>hi</h1>";
// console.log(lives);