
export const createResult = (resaltAnswer, test) => {
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
    let trueAnswer;

    const badQuestionMass = [];

    for (let i = 0; i < resaltAnswer.length; i++) {
        res = true;
        for (let j = 0; j < resaltAnswer[i].answers.length; j++) {
            if (resaltAnswer[i].answers[j] !== test.questions[i].answers[j].is_right) {
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
            question.append(createItemP(test.questions[i].description));
            const ans = document.createElement('div');
            ans.classList.add('result__anwers');

            for (let j = 0; j < test.questions[i].answers.length; j++) {
                const p = document.createElement('p');
                p.textContent = test.questions[i].answers[j].description;
                if(resaltAnswer[i].answers[j] === true){
                    p.setAttribute('id', 'false');
                }

                if (test.questions[i].answers[j].is_right === true) {
                    p.setAttribute('id', 'true');
                }
                ans.append(p);

            }

            badQuestion.append(question, ans);
        }
    }


    result.textContent = `Правильных ответов ${parseFloat(resOut) / parseFloat(resaltAnswer.length) * 100} %`;

    main.append(section);
    section.append(container);
    container.append(description, result, badQuestion);
    document.body.append(main);

}

