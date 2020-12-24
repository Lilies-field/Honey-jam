const Discord = require('discord.js')
const config = require('./config')
const func = require('../functions')

const loggerhook = new Discord.WebhookClient(config.id, config.token)


function info(text){
    let time = func.get_time()
    console.log(`[${time.hours}:${time.minutes}:${time.seconds}] : ${text}`)
    loggerhook.send(`${config.info}[${time.hours}:${time.minutes}:${time.seconds}] : ${text}`)
}

function warn(text){
    console.log(`[${time.hours}:${time.minutes}:${time.seconds}] : ${text}`)
    loggerhook.send(`${config.warn}[${time.hours}:${time.minutes}:${time.seconds}] : ${text}`)
}

function error(text){
    console.log(`[${time.hours}:${time.minutes}:${time.seconds}] : ${text}`)
    loggerhook.send(`${config.error}[${time.hours}:${time.minutes}:${time.seconds}] : ${text}`)

}


module.exports = {
    info:info,
    warn:warn,
    error:error
}