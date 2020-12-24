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

module.exports = {
    get_time:get_time
}
    