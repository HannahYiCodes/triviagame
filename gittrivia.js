// let the user choose how many questions they want to answer
// user can pick an answer and it will display right or wrong.

// BONUS: Pick 5 random questions out of the 10. AND number each question in order.
// BONUS BONUS: Save the highest score, Go back a question, True/Total to Percentage

// cannot press button after "submit"

const apiKey = 'a8e2f0a0ad85b638125ed1b78beeb90e'
const url = 'https://opentdb.com/api.php?amount=10&category=15&type=multiple'
let allAnswers = []
let randomArray = []
let c = 0

const xhr = new XMLHttpRequest() // creates object
xhr.open('GET', url)
xhr.send() // initiates request
xhr.onload = () => {
    const jsonData = JSON.parse(xhr.responseText)

    // question iterator and options randomizer
    questionTime = () => {
        if (c < jsonData.results.length) {
            document.getElementById("main").innerHTML = `${[c+1]}. ${jsonData.results[c].question}`
        }
        allAnswers.push(jsonData.results[c].correct_answer)
        for (let j = 0; j < jsonData.results[c].incorrect_answers.length; j++) {
            allAnswers.push(jsonData.results[c].incorrect_answers[j])
        }

        while (allAnswers.length > 0) {
            randomArray.push(allAnswers.splice(Math.floor(Math.random() * allAnswers.length), 1)[0])
        }

        for (let i = 0; i < randomArray.length; i++) {
            document.getElementById('options').innerHTML += 
            `<input type='radio' value=${JSON.stringify(randomArray[i])} name='checkBoxClick' id='theCheckedBox'>
            <label name='checkBoxClick' onclick=''>${randomArray[i]}</label><br>`
        } // <for=''> attribute?
    }
    questionTime()

    // next question
    ontoTheNext = () => {
        document.getElementById('options').innerHTML = ``
        document.getElementById('rightOrWrong').innerHTML = ``
        c++
        allAnswers = []
        randomArray = []
        questionTime()
    }

    // right or wrong 
    checkAnswer = () => {
        let checktheAnswer = document.getElementsByName('checkBoxClick')
        for (let i = 0; i < checktheAnswer.length; i++) {
            if (checktheAnswer[i].checked && checktheAnswer[i].value == jsonData.results[c].correct_answer) {
                document.getElementById('rightOrWrong').innerHTML = 'You are right!'
            }
            if (checktheAnswer[i].checked && checktheAnswer[i].value != jsonData.results[c].correct_answer) {
                // console.log(`Correct answer: ${jsonData.results[c].correct_answer}`)
                // console.log(`Your input: ${checktheAnswer[i].value}`)
                document.getElementById('rightOrWrong').innerHTML = 'You are wrong!'
            }
        }
    }
}