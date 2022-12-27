import { createResult } from "./appResult.js";

const oneAnswer = 'choice_of_one_answer';
const multiAnswer = 'multiple_choice';
const resaltAnswer = [];
let trueAnswerOne = 0;
let trueAnswerMulti = [];
let questionsNumber = 0;

export const createTest = (test) => {
    const main = document.createElement('main');
    const section = document.createElement('section');
    const container = document.createElement('div');
    const description = document.createElement('h1');
    const question = document.createElement('p');
    const answers = document.createElement('div');
    const buttonNextQuestion = document.createElement('button');
    const numberOfQuestions = document.createElement('p');
    const radioButtons = document.createElement('div');

    section.classList.add('test');
    container.classList.add('container', 'test__container');
    description.classList.add('test__description');
    question.classList.add('test__question');
    answers.classList.add('test__answers');
    buttonNextQuestion.classList.add('test_buttonNextAnswer');
    numberOfQuestions.classList.add('test__numberOfQuestions');
    radioButtons.classList.add('test__radioButtons');


    const createItemP = (text) => {
        const p = document.createElement('p');
        p.textContent = text;

        return p;
    }

    description.textContent = `${test.title}`;
    if (questionsNumber === test.questions.length - 1) {
        buttonNextQuestion.textContent = 'Ответить на последний вопрос и завершить тест';
    } else {
        buttonNextQuestion.textContent = 'Следующий вопрос';
    }


    numberOfQuestions.textContent = `Вопрос ${questionsNumber + 1} из ${test.questions.length}`;

    const createAnswer = (questionsNumber) => {
        if (test.questions[questionsNumber].question_type === oneAnswer) {
            question.textContent = `${test.questions[questionsNumber].description}`;
            for (let i = 0; i < test.questions[questionsNumber].answers.length; i++) {
                const answer = document.createElement('input');
                const label = document.createElement('label');
                answer.setAttribute('type', 'radio');
                answer.setAttribute('name', 'answer');
                answer.setAttribute('value', `${i}`);
                answer.setAttribute('id', `anwerChoice${i}`);
                label.setAttribute('for', `anwerChoice${i}`);
                label.textContent = test.questions[questionsNumber].answers[i].description;
                answers.append(answer, label);
            }
        }
        if (test.questions[questionsNumber].question_type === multiAnswer) {
            question.textContent = `${test.questions[questionsNumber].description}`;
            for (let i = 0; i < test.questions[questionsNumber].answers.length; i++) {
                const answer = document.createElement('input');
                const label = document.createElement('label');
                answer.setAttribute('type', 'checkbox');
                answer.setAttribute('name', 'answer');
                answer.setAttribute('value', `${i}`);
                answer.setAttribute('id', `anwerChoice${i}`);
                label.setAttribute('for', `anwerChoice${i}`);
                label.textContent = test.questions[questionsNumber].answers[i].description;
                answers.append(answer, label);
            }
        }

    }

    buttonNextQuestion.addEventListener('click', () => {
        let checkChecked;
        if (test.questions[questionsNumber].question_type === oneAnswer) {
            let rad = document.getElementsByName('answer');
            for (let i = 0; i < test.questions[questionsNumber].answers.length; i++) {
                if (test.questions[questionsNumber].answers[i].is_right === true) {
                    trueAnswerOne = i;
                }
            }
            checkChecked = 0;
            for (let i = 0; i < rad.length; i++) {
                if (rad[i].checked) {
                    checkChecked++;
                    if (trueAnswerOne === i) {
                        resaltAnswer.push(1);
                    } else {
                        resaltAnswer.push(0);
                    }
                }
            }
            if (checkChecked === 0) return;
        }

        if (test.questions[questionsNumber].question_type === multiAnswer) {
            let rad = document.getElementsByName('answer');
            trueAnswerMulti.splice(0);
            for (let i = 0; i < test.questions[questionsNumber].answers.length; i++) {
                if (test.questions[questionsNumber].answers[i].is_right === true) {
                    trueAnswerMulti.push(i);
                }
            }
            let namberInc = 0;

            checkChecked = 0;
            for (let i = 0; i < rad.length; i++) {
                if (rad[i].checked) {
                    checkChecked++;
                    if (trueAnswerMulti.includes(i)) {
                        namberInc++;
                    }
                }
            }
            if (checkChecked === 0) return;

            if (namberInc === trueAnswerMulti.length) {
                resaltAnswer.push(1);
            } else {
                resaltAnswer.push(0);
            }
        }
        document.body.innerHTML = '';

        if (test.questions.length - 1 === questionsNumber) {
            console.log(resaltAnswer);
            createResult(resaltAnswer);
            return;
        }
        questionsNumber++;
        createTest(test);
    })

    createAnswer(questionsNumber);

    main.append(section);
    section.append(container);
    container.append(description, numberOfQuestions, question, answers, buttonNextQuestion);
    document.body.append(main);
    return main;
}

