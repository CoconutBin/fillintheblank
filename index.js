let config = await fetch(`./config.json`).then(response => response.json())
let madlib = await fetch(`./prompts/madlib${Math.ceil(Math.random()*5)}.txt`).then(response => response.text())

let customMadLib = document.getElementById("selfmade")
let normalMadLib = document.getElementById("premade")
let selfMade = document.getElementById("selfmadelabel")
let madLibDiv = document.getElementById("madlibconfig")
let inputMadLib = document.getElementById("custommadlib")

customMadLib.addEventListener('change', () => {
    selfMade.style.display = selfMade.style.display = 'block'
})

normalMadLib.addEventListener('change', () => {
    selfMade.style.display = selfMade.style.display = 'none'
})

madLibDiv.addEventListener('submit', (event) => {
    event.preventDefault()
    if(inputMadLib.value != ''){
        madlib = inputMadLib.value
    }
    let partsOfSpeech = [
        ... madlib.split(' ')
        .map(x => x.replace(/[^${\w}]/gi, '')) 
        .filter(madlib => madlib.match(/\${.{0,}/gi))
    ]
    partsOfSpeech = partsOfSpeech.map(x => x.slice(2, -1).replaceAll('_', ' '))
    
    let answerArray = []
    for(let partOfSpeech of partsOfSpeech){
        answerArray.push(prompt(`Give me a ${partOfSpeech}`))
    }
    for(let i in partsOfSpeech){
        madlib = madlib.replace(`\${${partsOfSpeech[i].replaceAll(" ", "_")}}`, answerArray[i] == ''||answerArray[i] == null? config.wordBank[Math.floor(Math.random()*config.wordBank.length)]:answerArray[i])
    }
    
    console.log(madlib)
    document.getElementById('finishedmadlib').innerHTML = madlib
})












