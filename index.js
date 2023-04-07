const words = document.querySelector("#words");
const lives = document.querySelector(".showLives");
const showTxt = document.querySelector(".showText");
const generator = document.querySelector("#generate");
const alp = document.querySelector(".alp");

const checkAnswer = document.querySelector(".answer_container");
const answer = document.querySelector("#answer");

let saveWord = "";

generator.addEventListener("submit", (e)=>{
    e.preventDefault();
    if(alp.children.length > 0) {
        const childLen = alp.children.length;
        for(let i = 0; i < childLen; i++) {
            const lis = document.querySelector("li");
            alp.removeChild(lis);
        }
    }

    let tmpWord = words.value;

    for(let a of tmpWord) {
        const newLi = document.createElement('li');
        newLi.innerText = a;
        alp.appendChild(newLi);
    }
    // wordArr.push(words.value);
    saveWord = words.value;
    words.value = "";
})

checkAnswer.addEventListener("submit", (e) => {
    e.preventDefault();
    if(saveWord == "") alert("정답이 아직 없소..");
    else {
        if(saveWord == answer.value) {
            console.log("정답!");
        } else {
            console.log("틀렸소")
        }
    }
})
answer.addEventListener("input", (e) => {
    const h_2 = document.querySelector("h2");
    if(showTxt.childElementCount > 0) {
        showTxt.removeChild(h_2);  
        showTxt.innerHTML = `<h2>${answer.value}</h2>`; 
    }  
    // console.log(answer.value);
})