module.exports.run = async (client,message,args,logger,db,embed) => {
    const user = message.author
    const data = await db.getUser(message.author.id)
    if(data === undefined){
        message.channel.send(embed.reg_plz(user))
        logger.info(`[${user.username}#${user.discriminator} (${user.id})] 핑 명령어 | 미등록 회원`)
    }else{
        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 24
        let minutes = Math.floor(client.uptime / 60000) % 60
        let seconds = Math.floor(client.uptime / 1000) % 60
        let uptime = `\`${days}일 ${hours}시간 ${minutes}분 ${seconds}초\``
        const m = await message.channel.send("핑이요?")
        m.edit(`퐁! 현재핑은 ${m.createdTimestamp - message.createdTimestamp}ms입니다 디스코드 API와는 ${Math.round(client.ws.ping)}ms걸리네요 (업타임 \`${uptime}\`)`)
        logger.info(`[${user.username}#${user.discriminator} (${user.id})] 핑 명령어 | 성공`)
    }
}


module.exports.help = {
    name : "핑",
    aliases: ['ping','지연','지연시간','업타임']
}