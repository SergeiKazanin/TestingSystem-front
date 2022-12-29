import { createResult } from "./appResult.js";

const oneAnswer = 'choice_of_one_answer';
const multiAnswer = 'multiple_choice';
const resaltAnswer = [{}];

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




    description.textContent = `${test.title}`;
    if (questionsNumber === test.questions.length - 1) {
        buttonNextQuestion.textContent = 'Ответить на вопрос';
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
                const ansDiv = document.createElement('div');
                ansDiv.classList.add('test_ansDiv');
                answer.setAttribute('type', 'radio');
                answer.setAttribute('name', 'answer');
                answer.setAttribute('value', `${i}`);
                answer.setAttribute('id', `anwerChoice${i}`);
                label.setAttribute('for', `anwerChoice${i}`);
                label.textContent = test.questions[questionsNumber].answers[i].description;
                ansDiv.append(answer, label);
                answers.append(ansDiv);
            }
        }
        if (test.questions[questionsNumber].question_type === multiAnswer) {
            question.textContent = `${test.questions[questionsNumber].description}`;
            for (let i = 0; i < test.questions[questionsNumber].answers.length; i++) {
                const answer = document.createElement('input');
                const label = document.createElement('label');
                const ansDiv = document.createElement('div');
                ansDiv.classList.add('test_ansDiv');
                answer.setAttribute('type', 'checkbox');
                answer.setAttribute('name', 'answer');
                answer.setAttribute('value', `${i}`);
                answer.setAttribute('id', `anwerChoice${i}`);
                label.setAttribute('for', `anwerChoice${i}`);
                label.textContent = test.questions[questionsNumber].answers[i].description;
                ansDiv.append(answer, label);
                answers.append(ansDiv);
            }
        }

    }

    buttonNextQuestion.addEventListener('click', () => {
        let checkChecked;
        if (test.questions[questionsNumber].question_type === oneAnswer) {
            let rad = document.getElementsByName('answer');

            checkChecked = 0;
            for (let i = 0; i < rad.length; i++) {
                if (rad[i].checked) {
                    checkChecked++;
                }
            }
            if (checkChecked === 0) return;
            let answers = [];
            for (let i = 0; i < rad.length; i++) {
                if (rad[i].checked === true) {
                    answers.push(true)
                } else {
                    answers.push(false)
                }
            }
            resaltAnswer[questionsNumber].answers = answers;
        }

        if (test.questions[questionsNumber].question_type === multiAnswer) {
            let rad = document.getElementsByName('answer');

            checkChecked = 0;
            for (let i = 0; i < rad.length; i++) {
                if (rad[i].checked) {
                    checkChecked++;
                }
            }
            if (checkChecked === 0) return;
            let answers = [];
            for (let i = 0; i < rad.length; i++) {
                if (rad[i].checked === true) {
                    answers.push(true)
                } else {
                    answers.push(false)
                }
            }
            resaltAnswer[questionsNumber].answers = answers;
        }
        document.body.innerHTML = '';

        if (test.questions.length - 1 === questionsNumber) {
            createResult(resaltAnswer, test);
            return;
        }
        resaltAnswer.push({});
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

