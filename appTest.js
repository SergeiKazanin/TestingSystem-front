const oneAnswer = 'choice_of_one_answer';
const multiAnswer = 'multiple_choice';


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
    question.textContent = `${test.questions[0].description}`;
    buttonNextQuestion.textContent = 'Следующий вопрос';

    let questionsNumber = 0;
    numberOfQuestions.textContent = `Вопрос ${questionsNumber + 1} из ${test.questions.length}`;

    const createAnswer = (questionsNumber) => {
        if (test.questions[questionsNumber].question_type == oneAnswer) {
            for (let i = 0; i < test.questions[questionsNumber].answers.length; i++) {
                const answer = document.createElement('input');
                answer.setAttribute('type', 'radio');
                answer.setAttribute('name', 'answer');
                answer.setAttribute('value', `${i}`);

               // <input type="radio" id="contactChoice1"
               // name="contact" value="email">
                //<label for="contactChoice1">Email</label>
                //answer.textContent = test.questions[0].answers[i].description;
                answers.append(answer,test.questions[0].answers[i].description,);
            }
        }
    }

    function fun1() {
        var rad = document.getElementsByName('answer');
        for (var i = 0; i < rad.length; i++) {
            if (rad[i].checked) {
                alert('Выбран ' + i + ' radiobutton');
            }
        }
    }

    createAnswer(questionsNumber);

    main.append(section);
    section.append(container);
    container.append(description, numberOfQuestions, question, answers, buttonNextQuestion);

    return main;
}