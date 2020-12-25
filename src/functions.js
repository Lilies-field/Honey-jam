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
    if(month == 2 && date == 29){
        month = month + 1
        date = 1 
        return `${year}/${month}/${date}`
    }
    if(date <= 30){
        if(thirty.indexOf(month) > -1){
            month = month + 1
            date = 1
            if(month > 12) {
                month = 1
            }
            return `${year}/${month}/${date}`
        }else if(thirtyone.indexOf(month) > -1){
            date = date + 1
            return `${year}/${month}/${date}`
        }
    } 
}
 
function get_timeLeft(ms){
    let days = Math.floor(ms / 86400000);
    let hours = Math.floor(ms / 3600000) % 24
    let minutes = Math.floor(ms / 60000) % 60
    let seconds = Math.floor(ms / 1000) % 60
    let show = `\`${days}일 ${hours}시간 ${minutes}분 ${seconds}초\``
    return show
}
module.exports = {
    get_time:get_time,
    get_date:get_date,
    get_timeLeft:get_timeLeft
}
    