module.exports.run = async (client, message, args, db, logger, embed) => {
    const user = message.author
    const data = await db.getUser(message.author.id)
    if(data === undefined){
        let error = await embed.reg_plz(message)
        message.channel.send(error)
        logger.info(`[${user.username}#${user.discriminator} (${user.id})] 반복 명령어 | 미등록 회원`)
    }else{
        const serverQueue = client.musicManager.queue.get(message.guild.id)
        if (!serverQueue){
            message.channel.send(embed.rand_alert(message.author, "대기열이 비어있어요"))
            logger.info(`[${user.username}#${user.discriminator} (${user.id})] 반복 명령어 | 조건 불충분`)
            return
        }
        serverQueue.loop = !serverQueue.loop
        message.channel.send(embed.msgbox(message.author, `반복이 ${serverQueue.loop ? "활성화 되었어요" : "비활성화 되었어요"}`))
        logger.info(`[${user.username}#${user.discriminator} (${user.id})] 반복 명령어 | 성공`)
    }
}

module.exports.help = {
    name : "반복",
    aliases: ['루프','loop']
}
