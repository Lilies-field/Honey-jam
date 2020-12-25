const num = /^\d+$/
const func = require('../../../src/functions')

module.exports.run = async (client, message, args, db, logger, embed) => {
    const serverQueue = client.musicManager.queue.get(message.guild.id)
    const user = message.author
    const data = await db.getUser(message.author.id)
    if(data === undefined){
        let error = await embed.reg_plz(message)
        message.channel.send(error)
    }else{
        if (!message.member.voice.channel){
            message.channel.send("먼저 음성채널에 들어가 주세요")
        }else{
            if(args.length < 1){
                message.channel.send("알람 시간을 입력해주세요")
                return
            }else{
                let time = func.get_time()
                if(args[0].length <= 9){
                    
                    new Date(Date.parse('2020/12/25 05:13:43+0900')).getTime() / 1000
                }
                if(new Date(Date.parse('2020/12/25 05:13:43+0900')).getTime() / 1000 == NaN){
                    message.channel.send("시간 형식을 확인해주세요`n1. 2020/12/25 05:13:43\n2. 05:13:43(자동으로 내일로 설정)")
                }
            }
            let song
            song = await client.musicManager.getSongs(`ytsearch: ⏰😲 [기상패턴 N타입] 스탠포드 수면 연구소장이 추천하는 기상 방법! 꼭 "재생목록"으로 만들어 이용하세요! (알람 3회)`)    
            setTimeout(function(){
                client.musicManager.handleVideo(message, message.member.voice.channel, song[0])
            }, 2000)
        }
    }
}


module.exports.help = {
    name : "낮잠가이드",
    aliases: ['낮잠']
}

