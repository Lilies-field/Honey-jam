const Discord = require('discord.js')
const color = require('./color')

function reg_plz(user){
    const embed = new Discord.MessageEmbed()
    .setColor(color.sucess)
    .setTitle('이용자 가입이 필요해요')
    .setDescription(`\`&가입\` 으로 가입을 해주세요`)
    .setTimestamp()
    .setFooter(`${user.username}#${user.discriminator}`, user.displayAvatarURL())
    return embed
}

function reg_already(user){
    const embed = new Discord.MessageEmbed()
    .setColor(color.error)
    .setTitle('가입 불가!')
    .setDescription(`이미 가입하셨네요!`)
    .setTimestamp()
    .setFooter(`${user.username}#${user.discriminator}`, user.displayAvatarURL())
    return embed
}

function reg_info(user){
    const embed = new Discord.MessageEmbed()
    .setColor(color.sucess)
    .setTitle('가입되셨습니다!')
    .setDescription(`축하드려요(?)`)
    .setTimestamp()
    .setFooter(`${user.username}#${user.discriminator}`, user.displayAvatarURL())
    return embed
}

module.exports = {
    reg_plz:reg_plz,
    reg_already:reg_already,
    reg_info:reg_info

}