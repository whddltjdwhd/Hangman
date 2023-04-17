const lives = document.querySelector(".showLives");
const alp = document.querySelector(".alp");

const checkAnswer = document.querySelector("#checkBtn");
const answer = document.querySelector("#answer");
const API_KEY = config.apiKey;

let ansWord = "";
let reStart = false;

//랜덤단어 생성 api를 통해 랜덤 단어를 받아와서 문제 진행.
function init() {
    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/randomword',
        headers: { 'X-Api-Key': API_KEY},
        contentType: 'application/json',
        success: function(result) {
            let word = result.word;
            console.log(word);
            deleteWord();
            showNewWord(word);  
            saveWord(word);
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });
    
}

function showNewWord(answer) {
    for(let i = 0; i < answer.length; i++) {
        const newLi = document.createElement('li');
        newLi.innerText = "*";
        alp.appendChild(newLi);
    }
}
function deleteWord() {
    alp.innerHTML = "";
}

function saveWord(answer) {
    ansWord = answer.toLowerCase();
}

//제출한 답이 맞는지 확인
checkAnswer.addEventListener("click",  doCheckAnswer);

answer.addEventListener("keydown", (e) => {
    if(e.key == "Enter") {
        doCheckAnswer();
    }
})

function doCheckAnswer() {
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
    if(!isInclude && lives.innerText-- <= 1) {
        reStart = confirm("다시 도전하시겠습니까?");
        reStartGame();
    }
        
    
    answer.value = "";
    checkEnd();
}

//게임의 끝을 판단하는 함수.
function checkEnd() {
    for(let j = 0; j < ansWord.length; j++) {
        if(alp.children[j].textContent != ansWord[j]) return;
    }
    reStart = confirm("1게임 더 하시겠습니까?");
    reStartGame();
}

function reStartGame() {
    reStart ? window.location.reload() : alert("GOOD BYE.");
}

init();