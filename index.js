let config = await fetch(`./config.json`).then(response => response.json())
let madlib = await fetch(`./prompts/madlib${Math.ceil(Math.random()*5)}.txt`).then(response => response.text())

const customMadLib = document.getElementById("selfmade")
const normalMadLib = document.getElementById("premade")
const uploadMadLib = document.getElementById("fileupload")
const selfMade = document.getElementById("selfmadelabel")
const fileUpload = document.getElementById("file")
const madLibDiv = document.getElementById("madlibconfig")
const inputMadLib = document.getElementById("custommadlib")
const errorInvalid = document.getElementById("filetypeinvalid")
const errorNone = document.getElementById("filetypenone")
const br = document.getElementById("noissue")

customMadLib.addEventListener('change', () => {
    fileUpload.style.display = 'none'
    selfMade.style.display = 'block'
})

normalMadLib.addEventListener('change', () => {
    selfMade.style.display = 'none'
    fileUpload.style.display = 'none'
})

uploadMadLib.addEventListener('change', () => {
    fileUpload.style.display = 'block'
    selfMade.style.display = 'none'
})


madLibDiv.addEventListener('submit',async (event) => {
    event.preventDefault()

    if (uploadMadLib.checked) {
        const file = fileUpload.files[0];
        if (file == undefined){
            errorNone.style.display = 'block'
            errorInvalid.style.display = 'none' 
            br.style.display = 'none'
        }
        else if (file.type == 'text/plain') {
            const text = await file.text();
            madlib = text;
            errorNone.style.display = 'none' 
            errorInvalid.style.display = 'none'
        }
        else{
            errorInvalid.style.display = 'block'
            errorNone.style.display = 'none' 
            br.style.display = 'none'
            throw new Error("Invalid file upload")
        }
        console.log(file.type)
    }
    
    if(inputMadLib.value != ''){
        madlib = inputMadLib.value
    }

    let instances = 0
    while(madlib.split('').some(x => x.match(/[${}]/))){
    madlib = main(madlib)
    instances++
    if(instances > 5) break
    }
    
    document.getElementById('finishedmadlib').innerHTML = madlib
})

/**
 * Generates a function comment for the given function body.
 *
 * @param {string} text - The input text for processing.
 * @return {string} The modified text after processing.
 */    
function main(text){
    let partsOfSpeech = [
        ... text.split(' ')
        .map(x => x.replace(/[^${\w}]/gi, '')) 
        .filter(x => x.match(/\${.{0,}/gi))
    ]
    .map(x => x.replaceAll(/\${/gi, '')
    .replaceAll(/}/gi, '')
    .replaceAll('_', ' '))


    console.log(partsOfSpeech, partsOfSpeech.length)
    
    let answerArray = []
    let instance = 0
    for(let partOfSpeech of partsOfSpeech){
        answerArray.push(prompt(`Give me a ${partOfSpeech}`))
        if(answerArray.some(x => x == null)){
            alert("Seems like an input is null, try again if this isn't intentional")
            break
        }
        instance++
        console.log(instance)
    }
    for(let i in partsOfSpeech){
        text = 
        text
        .replace(`\${${partsOfSpeech[i]
        .replaceAll(" ", "_")}}`, 
        answerArray[i] == ''||answerArray[i] == null? 
        config.wordBank[Math.floor(Math.random()*config.wordBank.length)]:answerArray[i])
    }
    console.log(text)
    return text
}










