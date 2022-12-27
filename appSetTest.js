import { createTest } from "./appTest.js";

export const createSetTest = (tests) => {

    const main = document.createElement('main');
    const section = document.createElement('section');
    const container = document.createElement('div');
    const description = document.createElement('h1');
    const testsblock = document.createElement('div');
    const testsList = document.createElement('ul');


    section.classList.add('testsList');
    container.classList.add('container', 'testsList__container');
    description.classList.add('testsList__description');
    testsblock.classList.add('testList__block');
    testsList.classList.add('testList__list');

    const createItemList = (text) => {
        const p = document.createElement('p');
        p.textContent = text;

        return p;
    }

    description.textContent = 'Выберите тест';

    for (let i = 0; i < tests.length; i++) {
        const nameTest = document.createElement('li');
        nameTest.classList.add(`testList__nemeTest`);
        nameTest.append(createItemList(tests[i].title));
        nameTest.addEventListener('click', () => {
            document.body.innerHTML = '';
            const test = createTest(tests[i]);
            document.body.append(test);
            //console.log(i);
        })
        testsList.append(nameTest);
    }

    main.append(section);
    section.append(container);
    container.append(description, testsList);

    return main;
}