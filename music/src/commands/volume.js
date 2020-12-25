
module.exports.run = async (client, message, args, db, logger, embed) => {
    const user = message.author
    const data = await db.getUser(message.author.id)
    if(data === undefined){
        let error = await embed.reg_plz(message)
        message.channel.send(error)
        logger.info(`[${user.username}#${user.discriminator} (${user.id})] 볼륨 명령어 | 미등록 회원`)
    }else{
        const serverQueue = client.musicManager.queue.get(message.guild.id);
        if (!serverQueue){
            message.channel.send("아무것도 재생중이지 않아요")
            logger.info(`[${user.username}#${user.discriminator} (${user.id})] 볼륨 명령어 | 조건 불충분`)
            return
        }
        if (!args[0]) {
            message.channel.send(embed.msgbox(message.author, `현재 볼륨: **${serverQueue.volume}%**`))
            logger.info(`[${user.username}#${user.discriminator} (${user.id})] 볼륨 명령어 | 성공`)
        } else {
            const value = args[0];
            if (isNaN(value))
            {
                message.channel.send(embed.rand_alert(message.author, "볼륨은 숫자로만 입력해주세요"))
                logger.info(`[${user.username}#${user.discriminator} (${user.id})] 볼륨 명령어 | 숫자가 아님`)
                return
            } 
            if(value <= 100 && -1 < value){
                serverQueue.setVolume(value/5)
                message.channel.send(`볼륨 설정 : **${value}%**`)
                logger.info(`[${user.username}#${user.discriminator} (${user.id})] 볼륨 명령어 | 성공`)
            }else{
                message.channel.send('볼륨값은 0~100으로만 설정해주세요')
                logger.info(`[${user.username}#${user.discriminator} (${user.id})] 볼륨 명령어 | 범위 초과`)
            }

        }
    }
}


module.exports.help = {
    name : "소리",
    aliases: ['볼륨','volume','v']
}


