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
            message.channel.send(embed.sleep_guide(message.author)).then(() => {
                message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
                    .then(collected => {
                        if(1 <= collected.first().content && collected.first().content <= 7){
                            (async () => {
                                let dataa = collected.first().content
                                if(dataa == 1) song = await client.musicManager.getSongs(`ytsearch: ⛅️⏰ (3시간 후 알람有) 야근/밤샘/교대근무자를 위한 3시간 파워 숙면가이드, PMR 기법 응용 & 지우개 명상 [BSM Level 1 - 신체 이완 및 입면 유도]`)
                                if(dataa == 2) song = await client.musicManager.getSongs(`ytsearch: 🏅📝 적게 자도 숙면하세요! 4시간30분 수면 관리 가이드, 장시간 브레인 파워냅 for 수험생, 공시생 (알람 3회 有) [BSM Level 1 - 숙면 유도 및 수면 관리]`)    
                                if(dataa == 3) song = await client.musicManager.getSongs(`ytsearch: 🏅📝 기적의 두뇌 효율 만드는 6시간 수면 관리 가이드, 장시간 파워 숙면 for 수험생, 공시생 (알람 3회 有) [BSM Level 1 - 숙면 유도 및 수면 관리]`)    
                                if(dataa == 4) song = await client.musicManager.getSongs(`ytsearch: 😴🎯 중요한 시험이나 면접을 앞둔 사람들을 위한 66일 잠재의식 변화 & 4시간반 수면관리 가이드, 이미지트레이닝과 긍정확언(셀프토크) 기법 [BSM Level 3 - 목표 달성]`) 
                                if(dataa == 5) song = await client.musicManager.getSongs(`ytsearch: 🌜😴 최적의 꿀잠습관 만들기 7시간 30분 수면 관리 가이드, 중력 수면 명상 버전 (알람 3회 有) [BSM Level 1 - 숙면 유도 및 수면 관리]`)    
                                if(dataa == 6) song = await client.musicManager.getSongs(`ytsearch: 😴🌈 숙면과 함께 자신감을 높이고 희망적인 내일을 만드는 7시간 30분 자기암시 수면명상 & 수면 관리 가이드 (알람 3회 有) [BSM Level 3 - 잠재의식 긍정화]`) 
                                if(dataa == 7) song = await client.musicManager.getSongs(`ytsearch: ✨😴 다음날 최상의 컨디션! 9시간 숙면 & 수면 관리 가이드, 아우토겐 트레이닝 수면 명상 버전 (알람 2회 有) [BSM Level 1 - 수면 관리 및 자율신경 안정]`)  
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
    name : "수면가이드",
    aliases: ['숙면가이드']
}

