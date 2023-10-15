/// <reference path="../typings/globals/jquery/index.d.ts" />
export class Quiz {
    constructor(response) {
        this.questions = response;
        this.currentQuestion = 0;
        this.totalNumOfQuestions = this.questions.length;
        this.score=0;
        this.showQuestion();
        document.getElementById('next').addEventListener('click', this.nextQuestion.bind(this));
        document.getElementById('tryBtn').addEventListener('click',this.tryAgain)
    }
    shuffle(array) {
        let currentIndex = array.length, randomIndex; //3

        // While there remain elements to shuffle.
        while (currentIndex != 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex); // 0=>0.9999999 * 3 =2.999999 
            currentIndex--; //1

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

    }
    showQuestion() {
        document.getElementById('currentQuestion').innerHTML = this.currentQuestion + 1;
        document.getElementById('totalNumberOfQuestions').innerHTML = this.totalNumOfQuestions;
        document.getElementById('question').innerHTML = this.questions[this.currentQuestion].question;
        let answers = [this.questions[this.currentQuestion].correct_answer, ...this.questions[this.currentQuestion].incorrect_answers];
        this.shuffle(answers);
        let container = ``;
        for (let i = 0; i < answers.length; i++) {
            container += ` <div class="form-check">
                                <label class="form-check-label">
                                    <input type="radio" class="form-check-input" name="answer" id="" value="${answers[i]}" >
                                    ${answers[i]}
                                </label>
                             </div>`
        }
        document.getElementById('rowAnswer').innerHTML = container;
    }
    nextQuestion() {
        let correctAnswer = this.questions[this.currentQuestion].correct_answer;
        let answerInputs = document.getElementsByName('answer');
        let userAnswerElement = Array.from(answerInputs).find(value => value.checked)
        if (userAnswerElement != undefined) {
            $('#alert').fadeOut(500);
            let userAnswer=userAnswerElement.value;
            this.checkCorrectAnswer(userAnswer, correctAnswer);
            this.currentQuestion++;
            if (this.currentQuestion < this.totalNumOfQuestions) {
                this.showQuestion();
            }
            else {
                //display screen finish
                $('#quiz').fadeOut(500);
                $('#finish').fadeIn(500);
                document.getElementById('score').innerHTML=this.score;
            }
        }
        else
        {
            //display alert
            $('#alert').fadeIn(500);
        }


    }
    checkCorrectAnswer(userAnswer, correctAnswer) {
        if (userAnswer === correctAnswer) {
            //display correct span
            $('#Correct').fadeIn(500).fadeOut(500);
            this.score++;
        }
        else {
            //display incorrect span
            $('#inCorrect').fadeIn(500).fadeOut(500);
        }
    }
    tryAgain()
    {
        $('#finish').fadeOut(500);
        $('#setting').fadeIn(500);
    }
}