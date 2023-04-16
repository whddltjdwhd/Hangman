const lives = document.querySelector(".showLives");
const alp = document.querySelector(".alp");

const checkAnswer = document.querySelector("#checkBtn");
const userAnswer = document.querySelector("#answer");

let ansWord = "";

//랜덤단어 생성 api를 통해 랜덤 단어를 받아와서 문제 진행.
function init() {
    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/randomword',
        headers: { 'X-Api-Key': 'mUUeI/1dwsdtdtRYWOzkNg==edAnbLZj5kbMM0Xl' },
        contentType: 'application/json',
        success: function(result) {
            const word = result.word;
            console.log(word);
            removePreviousWord();
            showNewWord(word);
            saveAnswer(word);
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
        
    });
}

function showNewWord(answer) {
    for (let i = 0; i < answer.length; i++) {
        const newLi = document.createElement('li');
        newLi.innerText = "*";
        alp.appendChild(newLi);
    }
}
function removePreviousWord() {
    alp.innerHTML = "";
}

function saveAnswer(answer) {
    ansWord = answer.toLowerCase();
}

document.querySelector("#answer").addEventListener("keydown", function (e) {
    console.log(e.key)
    if(e.key == 'Enter') {
        test();
    }
})

//제출한 답이 맞는지 확인
checkAnswer.addEventListener("click", test)

function test () {
    const checkAns = userAnswer.value.toLowerCase();
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
    if(!isInclude && lives.innerText-- <= 1) alert("GAME OVER")

    userAnswer.value = "";
    checkEnd();
}

//게임의 끝을 판단하는 함수.
function checkEnd() {
    for(let j = 0; j < ansWord.length; j++) {
        if(alp.children[j].textContent != ansWord[j]) return;
    }

    alert("끝");
}

init();