import { createSetTest } from "./appSetTest.js";


const getTests = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/quiz/testing/');
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}


const app = async () => {
    const tests = await getTests();
    const setQuestins = createSetTest(tests);
    document.body.append(setQuestins);
    console.log(tests);
}


app();