const lives = document.querySelector(".showLives");
const alp = document.querySelector(".alp");

const makeAnswer = document.querySelector("#makeBtn");
const checkAnswer = document.querySelector("#checkBtn");
const answer = document.querySelector("#answer");

let ansWord = "";
let cnt = 0;

//랜덤단어 생성 api를 통해 랜덤 단어를 받아와서 문제 진행.
function init() {
    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/randomword',
        headers: { 'X-Api-Key': 'mUUeI/1dwsdtdtRYWOzkNg==edAnbLZj5kbMM0Xl' },
        contentType: 'application/json',
        success: function(result) {
            console.log(result.word);
            showNewWord(result.word);  
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
        
    });
    
}

function showNewWord(ans) {
    ansWord = ans;
    if(alp.children.length > 0) {
        const childLen = alp.children.length;
        for(let j = 0; j < childLen; j++) {
            const lis = document.querySelector("li");
            alp.removeChild(lis);
        }
    }
       for(let a of ans) {
        const newLi = document.createElement('li');
        newLi.innerText = "*";
        alp.appendChild(newLi);
    }
}


//제출한 답이 맞는지 확인
checkAnswer.addEventListener("click", () => {
const checkAns = answer.value;
let isInclude = false;

//제풀한 문자열이 답에 포함되어 있는 문자인지 확인.
//만약 답에 해당 문자가 있다면 오픈.
    for(let i = 0; i < checkAns.length; i++) {
        for(let j = 0; j < ansWord.length; j++) {
            if(checkAns[i] == ansWord[j]) {
                alp.children[j].innerText = ansWord[j];
                isInclude = true;
       
            }
        }
    }
    
    //해당하는 문자가 아무것도 없다면
    if(!isInclude) {
        if(lives.innerText > 1) lives.innerText--; 
        else alert("GAME OVER")
    }
    answer.value = "";
    checkEnd();
})

//게임의 끝을 판단하는 함수.
function checkEnd() {
    for(let j = 0; j < ansWord.length; j++) {
        // console.log(alp.children[j].textContent);
        if(alp.children[j].textContent == ansWord[j]) cnt++;
    }
    // console.log(cnt);
    if(cnt == ansWord.length) alert("끝");
}


init();