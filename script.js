const minutosEl = document.querySelector('#minutes');
const secondsEl = document.querySelector('#seconds');
const milisecondsEl = document.querySelector('#miliseconds');
const startBtn = document.querySelector('#btnStart');
const stopBtn = document.querySelector('#btnStop');
const pauseBtn = document.querySelector('#btnPause');
const continuarBtn = document.querySelector('#btnContinuar');
const sets = document.querySelector('#sets');
const times = document.querySelectorAll('.time')
const startSound = new Audio('sounds/audio.mp3');

let cliques = 0;
let interval;
let minutes = 0;
let segundos = 0;
let milisegundos = 0;
let isPaused = false;
let isintervalo = false;

startBtn.addEventListener('click', startTimer)
stopBtn.addEventListener('click', reset)
pauseBtn.addEventListener('click', pausar)
continuarBtn.addEventListener('click', resume)

function startTimer(){
    if(isPaused) return;

    for(let timeLet of times){
        timeLet.style.color = "red";
    }

    interval = setInterval(() => {

        if(!isPaused){
            const inputSet = document.querySelector('#inputSet').value;
            const inputStop = document.querySelector('#inputStop').value;
            const timeSet = Number(inputSet);
            const timeStop = Number(inputStop);

            milisegundos += 10; 

            if(milisegundos === 1000){
                segundos++
                milisegundos = 0;
            }
            if(segundos === 60){
                minutes++
                segundos = 0;
            }

            if(!isintervalo && minutes == timeSet){
                startSound.play();
                startRest(timeStop);
            }else if(isintervalo && minutes == timeStop){
                startSound.play();
                reset();

                startBtn.style.display = 'block';
                stopBtn.style.display = 'none';
                pauseBtn.style.display = 'none';
                continuarBtn.style.display = 'none';
            }
        }

        minutosEl.textContent = minutes.toString().padStart(2, '0');
        secondsEl.textContent = segundos.toString().padStart(2, '0');
        milisecondsEl.textContent = milisegundos.toString().padStart(3, '0');

        startBtn.style.display = 'none';
        stopBtn.style.display = 'block';

        if(!isPaused){
            pauseBtn.style.display = 'block';
        }
    }, 10)

    cliques++

    sets.textContent = cliques.toString();
}

function startRest(){
    isintervalo = true;
    resetCounter()

    for(let timeLet of times){
        timeLet.style.color = "blue";
    }

    minutes = 0;
    segundos = 0;
}

function reset(){
    clearInterval(interval);
    interval = null;

    resetCounter();

    isPaused = false;
    isintervalo = false;

    startBtn.style.display = 'block';
    stopBtn.style.display = 'none';
    pauseBtn.style.display = 'none';
    continuarBtn.style.display = 'none';
}

function resetCounter(){
    minutes = 0;
    segundos = 0;
    milisegundos = 0;

    minutosEl.textContent = '00';
    secondsEl.textContent = '00';
    milisecondsEl.textContent = '000';
}

function pausar(){
    pauseBtn.style.display = 'none';
    isPaused = true;
    continuarBtn.style.display = 'block';
}

function resume(){
    isPaused = false;

    continuarBtn.style.display = 'none';
    pauseBtn.style.display = 'block';
}
