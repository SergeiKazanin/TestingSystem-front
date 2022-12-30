
export const state = (currenpage, numberQues, url) => {
    const state = { 'page_id': currenpage, 'namQues': numberQues }
    const title = ''
    history.pushState(state, title, `${url}.html`)
}
export const repstate = (currenpage, numberQues, url) => {
    const state = { 'page_id': currenpage, 'namQues': numberQues }
    const title = ''
    history.replaceState(state, title, `${url}.html`)
}