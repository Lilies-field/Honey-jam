function get_time(){
    let today = new Date()
    let hours = today.getHours()
    let minutes = today.getMinutes()
    let seconds = today.getSeconds()
    return { 
        hours:hours,
        minutes:minutes,
        seconds:seconds
    } 
} 

function get_date(){
    let today = new Date()
    let year = today.getFullYear()
    let month = today.getMonth() + 1
    let date = today.getDate()
    let thirty = [4,6,9,11]
    let thirtyone = [1,3,5,7,8,10,12]
    if(thirty.indexOf(month))
    return `${year}/${month}/${date}`
}
module.exports = {
    get_time:get_time
}
    