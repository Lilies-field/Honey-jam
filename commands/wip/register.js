module.exports.run = async (client,message,args,logger,db,embed) => {
    const user = message.author
    const data = await db.getUser(message.author.id)
    if(data === undefined){
        message.channel.send(embed.reg_info(user))
        db.register(user.id)
        logger.info(`[${user.username}#${user.discriminator} (${user.id})] 가입 | 성공`)
    }else{
        message.channel.send(embed.reg_already(user))
        logger.info(`[${user.username}#${user.discriminator} (${user.id})] 가입 | 이미가입됨`)
    }
}


module.exports.help = {
    name : "가입",
    aliases: ['등록']
}