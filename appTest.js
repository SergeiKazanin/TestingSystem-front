
import { repstate } from "./State.js";

const oneAnswer = 'choice_of_one_answer';
const multiAnswer = 'multiple_choice';
export class Test {
    constructor(test) {
        this.test = test;
        this.resaltAnswer = [];
        this.questionsNumber = 0;
        this.time = 60;
        this.timerOn = false;
        this.timer;
    }

    createTest() {
        const main = document.createElement('main');
        const section = document.createElement('section');
        const container = document.createElement('div');
        const description = document.createElement('h1');
        const question = document.createElement('p');
        const answers = document.createElement('div');
        const buttonNextQuestion = document.createElement('button');
        const buttonBackQuestion = document.createElement('button');
        const numberOfQuestions = document.createElement('p');
        const time = document.createElement('p');

        section.classList.add('test');
        container.classList.add('container', 'test__container');
        description.classList.add('test__description');
        question.classList.add('test__question');
        answers.classList.add('test__answers');
        buttonNextQuestion.classList.add('test_buttonNextAnswer');
        buttonBackQuestion.classList.add('test__buttonBackQuestion')
        numberOfQuestions.classList.add('test__numberOfQuestions');
        time.classList.add('test__time');

        description.textContent = `${this.test.title}`;
        if (this.questionsNumber === this.test.questions.length - 1) {
            buttonNextQuestion.textContent = 'Ответить на вопрос';
        } else {
            buttonNextQuestion.textContent = 'Следующий вопрос';
        }

        buttonBackQuestion.textContent = 'Назад';

        time.textContent = `Осталось времени до конца теста: ${this.time} мин`;

        if (this.timerOn === false) {
            this.timerOn = true;
            this.timer = setInterval(() => {
                this.time--;
                const timeClass = document.querySelector('.test__time');
                timeClass.textContent = `Осталось времени до конца теста: ${this.time} мин`;
                if (this.time === 0) {
                    clearInterval(this.timer);
                    const lengthAnswers = this.test.questions.length - this.resaltAnswer.length;

                    for (let i = this.test.questions.length - lengthAnswers; i < this.test.questions.length; i++) {
                        let answers = [];
                        for (let j = 0; j < this.test.questions[i].answers.length; j++) {
                            answers.push(false);
                        }
                        this.resaltAnswer.push({});
                        this.resaltAnswer[i].answers = answers;
                    }

                    this.createResult(this.resaltAnswer, this.test);
                }
            }, 60000)
        }

        numberOfQuestions.textContent = `Вопрос ${this.questionsNumber + 1} из ${this.test.questions.length}`;

        buttonNextQuestion.addEventListener('click', () => {
            let checkChecked;
            let ansButtons = document.getElementsByName('answer');

            checkChecked = 0;
            for (let i = 0; i < ansButtons.length; i++) {
                if (ansButtons[i].checked) {
                    checkChecked++;
                }
            }
            if (checkChecked === 0) return;
            let answers = [];
            for (let i = 0; i < ansButtons.length; i++) {
                if (ansButtons[i].checked === true) {
                    answers.push(true)
                } else {
                    answers.push(false)
                }
            }
            this.resaltAnswer.push({});
            this.resaltAnswer[this.questionsNumber].answers = answers;

            if (this.test.questions.length - 1 === this.questionsNumber) {
                this.createResult(this.resaltAnswer, this.test);
                clearInterval(this.timer);
                return;
            }

            this.nextQuestion();
        })

        buttonBackQuestion.addEventListener('click', () => {
            if (this.questionsNumber > 0) {
                this.previousQuestion();
            }
        })

        if (this.test.questions[this.questionsNumber].question_type === oneAnswer) {
            question.textContent = `${this.test.questions[this.questionsNumber].description}`;
            for (let i = 0; i < this.test.questions[this.questionsNumber].answers.length; i++) {
                const answer = document.createElement('input');
                const label = document.createElement('label');
                const ansDiv = document.createElement('div');
                ansDiv.classList.add('test_ansDiv');
                answer.setAttribute('type', 'radio');
                answer.setAttribute('name', 'answer');
                answer.setAttribute('value', `${i}`);
                answer.setAttribute('id', `anwerChoice${i}`);
                label.setAttribute('for', `anwerChoice${i}`);
                label.textContent = this.test.questions[this.questionsNumber].answers[i].description;
                ansDiv.append(answer, label);
                answers.append(ansDiv);
            }
        }
        if (this.test.questions[this.questionsNumber].question_type === multiAnswer) {
            question.textContent = `${this.test.questions[this.questionsNumber].description}`;
            for (let i = 0; i < this.test.questions[this.questionsNumber].answers.length; i++) {
                const answer = document.createElement('input');
                const label = document.createElement('label');
                const ansDiv = document.createElement('div');
                ansDiv.classList.add('test_ansDiv');
                answer.setAttribute('type', 'checkbox');
                answer.setAttribute('name', 'answer');
                answer.setAttribute('value', `${i}`);
                answer.setAttribute('id', `anwerChoice${i}`);
                label.setAttribute('for', `anwerChoice${i}`);
                label.textContent = this.test.questions[this.questionsNumber].answers[i].description;
                ansDiv.append(answer, label);
                answers.append(ansDiv);
            }
        }

        main.append(section);
        section.append(container);
        container.append(description, numberOfQuestions, time, question, answers, buttonBackQuestion, buttonNextQuestion);
        document.body.append(main);
        return main;
    }


    createResult() {
        const main = document.createElement('main');
        const section = document.createElement('section');
        const container = document.createElement('div');
        const description = document.createElement('h1');
        const result = document.createElement('p')
        const badQuestion = document.createElement('div');

        section.classList.add('result');
        container.classList.add('container', 'result__container');
        description.classList.add('result__description');
        result.classList.add('result__result');
        badQuestion.classList.add('result__badQuestion');

        description.textContent = 'Ваш результат';
        let res = 0;
        let resOut = 0;

        const badQuestionMass = [];

        for (let i = 0; i < this.resaltAnswer.length; i++) {
            res = true;
            for (let j = 0; j < this.resaltAnswer[i].answers.length; j++) {
                if (this.resaltAnswer[i].answers[j] !== this.test.questions[i].answers[j].is_right) {
                    res = false;
                }
            }

            if (res === true) {
                resOut++;
                badQuestionMass.push(false);
            } else {
                badQuestionMass.push(true);
            }
        }

        const createItemP = (text) => {
            const p = document.createElement('p');
            p.textContent = text;

            return p;
        }

        for (let i = 0; i < badQuestionMass.length; i++) {
            if (badQuestionMass[i] === true) {
                const question = document.createElement('div');
                question.classList.add('result__question');
                question.append(createItemP(this.test.questions[i].description));
                const ans = document.createElement('div');
                ans.classList.add('result__anwers');

                for (let j = 0; j < this.test.questions[i].answers.length; j++) {
                    const p = document.createElement('p');
                    p.textContent = this.test.questions[i].answers[j].description;
                    if (this.resaltAnswer[i].answers[j] === true) {
                        p.setAttribute('id', 'false');
                    }

                    if (this.test.questions[i].answers[j].is_right === true) {
                        p.setAttribute('id', 'true');
                    }
                    ans.append(p);

                }

                badQuestion.append(question, ans);
            }
        }

        result.textContent = `Правильных ответов ${Math.floor(parseFloat(resOut) / parseFloat(this.resaltAnswer.length) * 100)} %`;
        document.body.innerHTML = '';
        main.append(section);
        section.append(container);
        container.append(description, result, badQuestion);
        document.body.append(main);
        repstate(0, 0, 'Результат');
    }

    previousQuestion() {
        document.body.innerHTML = '';
        this.questionsNumber--;
        this.resaltAnswer.pop();
        this.createTest();
        repstate(0, 0, `Вопрос${this.questionsNumber + 1}`);
    }
    nextQuestion() {
        document.body.innerHTML = '';
        this.questionsNumber++;
        repstate(0, 0, `Вопрос${this.questionsNumber + 1}`);
        this.createTest();
    }
}

