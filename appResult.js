
export const createResult = (resaltAnswer, test) => {
    const main = document.createElement('main');
    const section = document.createElement('section');
    const container = document.createElement('div');
    const description = document.createElement('h1');
    const result = document.createElement('p')

    section.classList.add('result');
    container.classList.add('container', 'result__container');
    description.classList.add('result__description');
    result.classList.add('resalt_resalt');

    description.textContent = 'Ваш результат';
    let res = 0;
    let resOut =0;
    let trueAnswer;

    for (let i = 0; i < resaltAnswer.length; i++) {
        trueAnswer = 0;
        res = 0;
        for (let k = 0; k < test.questions[i].answers.length; k++) {
            if (test.questions[i].answers[k].is_right === true) {
                trueAnswer++;
            }
        }

        for (let j = 0; j < resaltAnswer[i].answers.length; j++) {
            if (resaltAnswer[i].answers[j] === test.questions[i].answers[j].is_right && test.questions[i].answers[j].is_right === true) {
                res++;
            }
        }

        if (res === trueAnswer) resOut++;
    }

    result.textContent = `Правильных ответов ${parseFloat(resOut) / parseFloat(resaltAnswer.length) * 100} %`;

    main.append(section);
    section.append(container);
    container.append(description, result);
    document.body.append(main);

}