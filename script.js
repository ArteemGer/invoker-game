'use strict'
let spells = [
    { 'cold-snap': ['q', 'q', 'q'] },
    { 'ghost-walk': ['q', 'q', 'w'] },
    { 'ice-wall': ['q', 'q', 'e'] },
    { 'emp': ['w', 'w', 'w'] },
    { 'tornado': ['w', 'w', 'q'] },
    { 'alacrity': ['w', 'w', 'e'] },
    { 'sun-strike': ['e', 'e', 'e'] },
    { 'forge-spirit': ['e', 'e', 'q'] },
    { 'chaos-meteor': ['e', 'e', 'w'] },
    { 'deafening-blast': ['q', 'w', 'e'] },
]

// console.log(spells[0]);




let a = 0;
let b = 0;
let c = 0;
let d = 0;
let pressedKeys = document.querySelector('.keysP')
pressedKeys.textContent = 'Keys Pressed: ' + a;
let spellsInvoked = document.querySelector('.spellsI')
spellsInvoked.textContent = 'Spells Invoked: ' + b;
let spellsUsed = document.querySelector('.spellsU')
spellsUsed.textContent = 'Spells Used: ' + c
let stage = document.querySelector('.stage')
stage.textContent = 'Stage: ' + d
let orb1 = document.querySelector('.orb1')
let orb2 = document.querySelector('.orb2')
let orb3 = document.querySelector('.orb3')
let casts = [];
let spellToCreate;
let orbs = [];
let start = document.querySelector('.start')
let pipa = document.querySelector('.pipa')
let trueSpell = document.getElementById('trueSpell')
let spellOne = document.querySelector('.fourth')
let spellTwo = document.querySelector('.fifth')
let timer = document.querySelector('.timer')
let timerSize = 600
let lose = document.querySelector('.lose')
let more = document.querySelector('.more')
let result = document.querySelector('.result')
let timeLose = 0
let isStarted = false
document.addEventListener('keydown', spellCust)

function spellCust(e) {
    if (e.code === 'KeyD') {
        c++
        spellsUsed.textContent = 'Spells Used: ' + c
        console.log(spellOne.classList[1]);
        if (spellOne.classList[1] === trueSpell.classList[0]) {
            d++
            stage.textContent = 'Stage: ' + d
            newSpellToCreate()
        }
    }
    if (e.code === 'KeyF') {
        c++
        spellsUsed.textContent = 'Spells Used: ' + c
        console.log(spellTwo.classList[1]);
        if (spellTwo.classList[1] === trueSpell.classList[0]) {
            d++
            stage.textContent = 'Stage: ' + d
            newSpellToCreate()
        }
    }
}
document.addEventListener('keydown', logKey)

function logKey(e) {
    if (e.code === 'KeyR') {
        b++
        spellsInvoked.textContent = 'Spells Invoked: ' + b
        newSpell(orbs)
    }
    newOrb(e.code)
}

start.addEventListener('click', () => {
    if(!isStarted){
        main()
    }
    skip()
    timer.classList.remove('none')
})
function main(){
    timerGo()
    isStarted = true
}
function skip(){
    newSpellToCreate()
}

function time() {
    timeLose += 0.01
    console.log(timeLose);
}

function timerGo() {
    if (timerSize <= 0) {
        lose.classList.remove('lose')
        return
    }

    timerSize = timerSize - 1
    timer.style.width = timerSize + 'px'
    result.textContent = `Ваш результат: ${timeLose.toFixed()} сек`
    time()

    setTimeout(timerGo, 7)
}

function newSpellToCreate() {
    timerSize = 600
    let spellT = spells[Math.floor(Math.random() * spells.length)];
    start.textContent = Object.keys(spellT)[0] + '  (click to skip)'
    pipa.className = `${Object.keys(spellT)[0]}`
    console.log(spellT);
}

function newSpell(orbs) {
    let countQ = orbs.filter(i => i === 'KeyQ').length
    let countW = orbs.filter(i => i === 'KeyW').length
    let countE = orbs.filter(i => i === 'KeyE').length
    let spell
    spells.forEach((i) => {
        let spellQ = Object.values(i)[0].filter(i => i === 'q').length
        let spellW = Object.values(i)[0].filter(i => i === 'w').length
        let spellE = Object.values(i)[0].filter(i => i === 'e').length
        if (countQ === spellQ && countW === spellW && countE === spellE) {
            spell = Object.keys(i)[0]
            console.log(spell);
            casts.unshift(spell)
            casts.length = 2
            renderCasts()
            return
        }
    })
}

function renderCasts() {
    let spell1 = document.querySelector('.fourth')
    let spell2 = document.querySelector('.fifth')
    spell1.className = 'fourth ' + `${casts[0]}`
    spell2.className = 'fifth ' + `${casts[1]}`
}


function newOrb(orb) {
    if (orb === 'KeyQ' || orb === 'KeyW' || orb === 'KeyE') {
        a++
        pressedKeys.textContent = 'Keys Pressed:' + a
        orbs.unshift(orb)
        orbs.length = 3
        render(orbs)
        console.log(orbs);
    }
}

function whichOrb(orb) {
    if (orb === 'KeyQ') {
        return 'quasOrb'
    } else if (orb === 'KeyW') {
        return 'wexOrb'
    } else if (orb === 'KeyE') {
        return 'exortOrb'
    }
    return ''
}

function renderOrb(orbToRender, keyCode) {
    orbToRender.className = `${whichOrb(keyCode)}`
}

function render(orbs) {
    renderOrb(orb1, orbs[0])
    renderOrb(orb2, orbs[1])
    renderOrb(orb3, orbs[2])
}



function checkSpell(casts, spell) {
    if (spell === casts[1]) {
        return true
    }
}

more.addEventListener('click', () => {
    window.location.reload()
})
