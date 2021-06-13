const crosshair = document.querySelector('.cursor')
const target  = document.querySelector('.target')
const scoreText = document.querySelector('.score')
const timerText = document.querySelector('.timer')
const highscoreText = document.querySelector('.highscore')
const playbutton = document.querySelector('.menupage .playbtn')

const damage = document.querySelector('.damage')
const shoot = document.querySelector('.shoot')


var score = 0;
var timeLeft = 60;
var highscore = 0;

document.querySelector('.menupage').addEventListener('click', (e) => e.stopPropagation())

playbutton.addEventListener('click', () => {
    document.querySelector('.menupage').style.opacity = "0";
    setTimeout(() => {
        document.querySelector('.menupage').style.display = "none";
    }, 100)
    play()
})


const play = () => {
    setInterval(() => {
        timer()
    }, 1000)
}
window.onload = () => {
    if(localStorage.getItem('highscore')){
        highscore = localStorage.getItem('highscore')
        highscoreText.innerHTML = `Highscore ${highscore}`
    }
    scoreText.innerHTML = score;
    timerText.innerHTML = timeLeft;
    respawn()
}

document.addEventListener('mousemove', (e) => {
    crosshair.style.left = `${e.clientX}px`
    crosshair.style.top = `${e.clientY}px`
})

const respawn = () => {
    const top = Math.floor(Math.random() * window.innerHeight)
    const left = Math.floor(Math.random() * window.innerWidth)
    target.style.top = `${top}px`
    target.style.left = `${left}px`
}

const gameOver = () => {
    alert(`GameOver \n You Score = ${score}`)
    if(localStorage.getItem('highscore') < score){
        localStorage.setItem('highscore', score)
        highscore = score;
        highscoreText.innerHTML = `Highscore ${highscore}`
    }
    score = 0;
    timeLeft = 60+2;
    scoreText.innerHTML = score;
    timerText.innerHTML = timeLeft;

}
const timer = () => {
    if(timeLeft === 0){
        gameOver()
    }
    timeLeft -= 1;
    timerText.innerHTML = timeLeft;
}


document.addEventListener('click', ()=> {
    damage.currentTime = 0;
    damage.play()
})


target.addEventListener('click', (e) => {
    e.stopPropagation();
    shoot.currentTime = 0;
    shoot.play()
    score += 1;
    scoreText.innerHTML = score;
    respawn();
})