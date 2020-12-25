const num = /^\d+$/
const filter = m => num.test(m)

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
            let song
            message.channel.send(embed.nap_guide(message.author)).then(() => {
                message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
                    .then(collected => {
                        if(1 <= collected.first().content && collected.first().content <= 3){
                            (async () => {
                                let dataa = collected.first().content
                                if(dataa == 1) song = await client.musicManager.getSongs(`ytsearch: 🌞🔋 집중력 회복! 15분 파워 낮잠 숙면가이드(브레인 파워냅), 업무와 학습 효율을 높이는 낮잠용 수면 명상 [BSM Level 1 - 신체 이완 및 수면 유도]`)
                                if(dataa == 2) song = await client.musicManager.getSongs(`ytsearch: 🌞🔋 업무/학습 효율 극대화! 30분 파워 낮잠 숙면가이드(브레인 파워냅), 두뇌 컨디션이 회복되는 낮잠용 수면 명상 [BSM Level 1 - 신체 이완 및 수면 유도]`)    
                                if(dataa == 3) song = await client.musicManager.getSongs(`ytsearch: ⛅️⏰ (60분 후 알람有) 수면 부족한 날! 낮잠용 파워 숙면가이드, PMR 기법 응용 & 지우개 명상 [BSM Level 1 - 신체 이완 및 입면 유도]`)    
                                client.musicManager.handleVideo(message, message.member.voice.channel, song[0])
                            })()
                            
                        }

                    })
                    .catch(collected => {
                        message.channel.send("시간이 초과되었습니다 숫자를 입력해주세요")
                    })
            })
        }
    }
}


module.exports.help = {
    name : "낮잠가이드",
    aliases: ['낮잠']
}

