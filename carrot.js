//이벤트 위임으로 성능 높이기

/* Dom */
const section = document.querySelector('.field');
const imgStartOrStop = document.querySelectorAll('.playChild');
const timer = document.querySelector('.timer');
const pause = document.querySelector('.pause');
const h2OfPause = pause.querySelector('h2');
const body = document.querySelector('body');
const play = document.querySelector('.play');
const carrot = document.querySelector('.carrotNum p');
const replay = document.querySelector('.replay');
const paddingTop = document.querySelector('.paddingTop');
const bg = new Audio('sound/bg.mp3');
const carrotBg = new Audio('sound/carrot_pull.mp3');
const gameWinBg = new Audio('sound/game_win.mp3');
const bugBg = new Audio('sound/bug_pull.mp3');
const alertBg = new Audio('sound/alert.wav');

/* 전역변수 */
let count = 10;
let carrotNum = 10;
let countDownInterval;
let isEnded = false;

replay.addEventListener('click',()=>{
    ReplayGame();
});

/* Music */
function backgroundMusicStart(){
    bg.play();
}

function backgroundMusicStop(){
    bg.pause();
}

function carrotPull(){
    carrotBg.play();
}

function bugPull(){
    bugBg.play();
}

function alertSound(){
    alertBg.play();
}

function gameWinSound(){
    gameWinBg.play();
}

function countDown(){
    timer.textContent = `0:${count}`;
    count-=1;
    countDownInterval = setInterval(()=>{
        if(count === -1){
            gamePause();
            return;
        }
        timer.textContent = `0:${count}`;
        count-=1;
    },1000);
}

function initCarrrot(){
    carrot.textContent = carrotNum;
}

function carrotCount(carrotChangeCount){
    carrot.textContent = carrotChangeCount;
}

function createCarrot(){
    for(let i=0; i<10; i++){
        const carrot = document.createElement('img');
        carrot.setAttribute('src','img/carrot.png');
        carrot.setAttribute('class','carrot');
        carrot.style.top = `${createRandomHeight()}px`;
        carrot.style.left = `${createRandomWidth()}px`
        carrot.addEventListener('click',()=>{
            if(!isEnded){
                carrotPull();
                section.removeChild(carrot);
                carrotCount(carrotNum-=1);
                if(carrotNum===0){
                    gameWin();
                    return;
                }
            }
        })
        section.appendChild(carrot);
    }
}

function createBug(){
    for(let i=0; i<20; i++){
        const bug = document.createElement('img');
        bug.setAttribute('src','img/bug.png');
        bug.setAttribute('class','bug');
        bug.setAttribute('width','70px');
        bug.style.top = `${createRandomHeight()}px`;
        bug.style.left = `${createRandomWidth()}px`
        bug.addEventListener('click',()=>{
            if(!isEnded){
                bugPull();
                backgroundMusicStop();
                clearInterval(countDownInterval);
                gameOver();
                return;
            }
        })
        section.appendChild(bug);
    }
}

function createRandomWidth(){
    let width = Math.floor(Math.random()*window.innerWidth);
    if(width>window.innerWidth-100){
       width = Math.floor(Math.random()*window.innerWidth-100);
    }
    return width;
}

function createRandomHeight(){
    let height = Math.floor(Math.random()*window.innerHeight)+490;
    if(height>window.innerHeight-100){
        height = Math.floor(Math.random()*((window.innerHeight-100)-490))+490;
    }
    return height;
}

function gameOver(){
    isEnded = true;
    alertSound();
    backgroundMusicStop();
    clearInterval(countDownInterval);
    pause.classList.remove('display-none');
    h2OfPause.textContent='YOU LOST';
    play.style.display = 'none';
    paddingTop.style.paddingTop = '90px';
    return;
}

function gamePause(){
    isEnded = true;
    alertSound();
    backgroundMusicStop();
    pause.classList.remove('display-none');
    clearInterval(countDownInterval);
    h2OfPause.textContent='Replay';
    play.style.display = 'none';
    paddingTop.style.paddingTop = '90px';
    return;
}

function gameWin(){
    isEnded = true;
    backgroundMusicStop();
    gameWinSound();
    pause.classList.remove('display-none');
    h2OfPause.textContent='YOU WON';
    clearInterval(countDownInterval);
    play.style.display = 'none';
    paddingTop.style.paddingTop = '90px';
    return;
}

function startGame(){
    play.addEventListener('click',()=>{
        
        // 스탑일때와 스타드일때를 구분..
        if(play.classList[1]==='start'){
            // 시간초가 다 지났을 때 바꿀 것들.
            
            play.classList.remove('start')
            play.classList.add('stop');
            gamePause();
        }
        else{
            section.innerHTML='';
            initCarrrot();
            countDown();
            backgroundMusicStart();

            if(play.classList[1]==='stop'){
                play.classList.remove('stop')
            }
            play.classList.add('start');
            console.log(play.classList);
            imgStartOrStop[0].classList.add('display-none');
            imgStartOrStop[1].classList.remove('display-none'); 
            createCarrot();
            createBug();
        }
    });
}

function replay_init(){
    isEnded = false;
    section.innerHTML='';
    pause.classList.add('display-none');
    play.style.display = 'inline-block';
    paddingTop.style.paddingTop = '0px';
    count = 10;
    carrotNum = 10;
    play.classList.remove('stop')
    play.classList.add('start');
}

function ReplayGame(){

    replay_init();
    initCarrrot();
    countDown();
    backgroundMusicStart();

    createCarrot();
    createBug();
}


window.addEventListener('load',startGame());
