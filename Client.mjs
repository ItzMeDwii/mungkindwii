import {Client, GatewayIntentBits} from 'discord.js';
import {BehaviorSubject} from "rxjs";

const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildVoiceStates]});

const messageSubjects = new BehaviorSubject([]);

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("voiceStateUpdate", async (oldState, newState) => {
    if (newState.guild.id === '1213396580997275708' && newState.channel?.id === '1238159308575866900') {
        if (messageSubjects.getValue().filter(x => x.userId === newState.user.id).length < 1) {
            newState.guild.channels.cache.get('1213399298000027659').send(`Si <@${newState.member.id}> pengen ditarik, buruan <@&1213398360552247306>!`).then(msg => {
                messageSubjects.next([...messageSubjects.getValue(),
                    {
                        userId: newState.member.id,
                        message: msg
                    }
                ]);

                setTimeout(() => {
                    messageSubjects.getValue().filter(x => x.userId === newState.user.id).forEach((xM) => {
                        messageSubjects.next(messageSubjects.getValue().filter(x => x.userId !== newState.user.id));
                    })
                    msg.delete();
                }, 60000)
            })
        }


        // newState.channel.send(`<@${newState.member.id}> Gunakan command \`/joinvoice\` untuk join ke channel yang diinginkan.`).then(x => {
        //     messageSubjects.next([...messageSubjects.getValue(),
        //         {
        //             userId: newState.member.id,
        //             message: x
        //         }
        //     ]);
        // })

        // await newState.member.voice.setChannel(newState.guild.channels.cache.get('1213396581546463276'));
    }
})

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
    }

    if (interaction.commandName === 'joinvoice') {
        const chatChannel = interaction.guild.channels.cache.get('1238159308575866900');
        const state = interaction.member.voice;
        const channel = state.channel;

        if (!channel) {
            await interaction.reply({content: 'Join `MASUK BIAR DITARIK` dulu!', ephemeral: true});
        } else {
            // const messages = messageSubjects.getValue().filter(x => x.userId === interaction.user.id).forEach(x => {
            //     messageSubjects.next([...messageSubjects.getValue().filter(x => x.userId !== interaction.user.id)]);
            // })
            state.setChannel(interaction.guild.channels.cache.get(interaction.options.getString('channel')));
            await interaction.reply({content: 'Voice Joined!', ephemeral: true});
        }
    }
});


client.login(process.env.CLIENT_TOKEN);