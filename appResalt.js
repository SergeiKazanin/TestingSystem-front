
export const createResult = (resaltAnswer) => {
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
    let resOut;
    for (let i = 0; i < resaltAnswer.length; i++) {
        if (resaltAnswer[i] === 1) {
            res++;
        }
        resOut = parseFloat(res) / parseFloat(resaltAnswer.length) * 100;
    }

    result.textContent = `Правильных ответов ${resOut} %`;


    main.append(section);
    section.append(container);
    container.append(description, result);
    document.body.append(main);

}