const words = document.querySelector("#words");
const lives = document.querySelector(".showLives");
const showTxt = document.querySelector(".showText");
const generator = document.querySelector("#generate");
const alp = document.querySelector(".alp");

const checkAnswer = document.querySelector(".answer_container");
const answer = document.querySelector("#answer");

//답 저장
let ansWord = "";

//문제 제출 기능
generator.addEventListener("submit", (e)=>{
    e.preventDefault();
    //만약 새로 문제를 출제한다면 이전의 문자는 지움.
    if(alp.children.length > 0) {
        const childLen = alp.children.length;
        for(let j = 0; j < childLen; j++) {
            const lis = document.querySelector("li");
            alp.removeChild(lis);
        }
    }

    let tmpWord = words.value;
    //입력한 문자열 길이만큼 * 생성
    for(let a of tmpWord) {
        const newLi = document.createElement('li');
        newLi.innerText = "*";
        alp.appendChild(newLi);
    }
    // wordArr.push(words.value);
    ansWord = words.value;
    words.value = "";
})
//제출한 답이 맞는지 확인
checkAnswer.addEventListener("submit", (e) => {
    e.preventDefault();
    //답 체크 변수
    const checkAns = answer.value;
    let isInclude = false;
    let idx = 0;
    //제풀한 문자열이 답에 포함되어 있는 문자인지 확인.
    //만약 답에 해당 문자가 있다면 오픈.
    for(let i = 0; i < checkAns.length; i++) {
        for(let j = 0; j < ansWord.length; j++) {
            // if(ansWord.includes(checkAns[j], j)) {
            //     idx = ansWord.indexOf(checkAns[j]);
            //     alp.children[idx].innerText = ansWord[idx];
    
            //     isInclude = true;
            // }
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
})


//제출 폼의 내용을 동적으로 보여줌.
answer.addEventListener("input", (e) => {
    const h_2 = document.querySelector("h2");

    if(showTxt.childElementCount > 0) {
        showTxt.removeChild(h_2);  
        showTxt.innerHTML = `<h2>${answer.value}</h2>`; 
    }  
    
    // console.log(answer.value);
})
