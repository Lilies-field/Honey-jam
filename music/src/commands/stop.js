
module.exports.run = async (client, message, args, db, logger, embed) => {
    const user = message.author
    const data = await db.getUser(message.author.id)
    if(data === undefined){
        let error = await embed.reg_plz(message)
        message.channel.send(error)
        logger.info(`[${user.username}#${user.discriminator} (${user.id})] 정지 명령어 | 미등록 회원`)
    }else{
        const serverQueue = client.musicManager.queue.get(message.guild.id);
        if (!serverQueue){
            message.channel.send("아무것도 재생중이지 않아요")
            logger.info(`[${user.username}#${user.discriminator} (${user.id})] 정지 명령어 | 조건불충분`)
            return
        }
        serverQueue.destroy()
        logger.info(`[${user.username}#${user.discriminator} (${user.id})] 정지 명령어 | 성공`)
    }
}


module.exports.help = {
    name : "멈춰",
    aliases: ['정지','stop']
}
