import { createSetTest } from "./appSetTest.js";


const getTests = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/quiz/testing/');
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

const json  = [{"id":13,"title":"Тест на знание основ JavaScript","slug":"test-na-znanie-osnov-javascript","questions":[{"id":9,"answers":[{"id":20,"number":1,"description":"Прикладное программное обеспечение","is_right":false,"question":9},{"id":21,"number":2,"description":"Серверные приложения","is_right":false,"question":9},{"id":22,"number":3,"description":"Можно во всех перечисленных","is_right":true,"question":9},{"id":23,"number":4,"description":"Веб-приложения","is_right":false,"question":9},{"id":24,"number":5,"description":"Мобильные приложения","is_right":false,"question":9}],"number":1,"description":"Где можно использовать JavaScript?","question_type":"choice_of_one_answer","points":1,"test":13},{"id":10,"answers":[{"id":25,"number":1,"description":"5","is_right":false,"question":10},{"id":26,"number":2,"description":"\"No\"","is_right":true,"question":10},{"id":27,"number":3,"description":"Будет ошибка","is_right":false,"question":10},{"id":28,"number":4,"description":"\"Yes\"","is_right":false,"question":10},{"id":29,"number":5,"description":"a","is_right":false,"question":10}],"number":2,"description":"Что будет записано в переменную test?","question_type":"choice_of_one_answer","points":1,"test":13},{"id":11,"answers":[{"id":30,"number":1,"description":"print(Hello);","is_right":false,"question":11},{"id":31,"number":2,"description":"write(\"Hello\");","is_right":false,"question":11},{"id":32,"number":3,"description":"documentWrite(\"Hello\");","is_right":false,"question":11},{"id":33,"number":4,"description":"prompt(\"Hello\")","is_right":false,"question":11},{"id":34,"number":5,"description":"console.log(\"Hello\");","is_right":true,"question":11}],"number":3,"description":"Где верно указан вывод данных?","question_type":"choice_of_one_answer","points":1,"test":13}]}, {"id":14,"title":"Тест 2","slug":"test-2","questions":[]}]


const app = async () => {
    //const tests = await getTests();
    const tests = json;
    const setTest = createSetTest(tests);
    document.body.append(setTest);
    
    console.log(tests);
}


app();