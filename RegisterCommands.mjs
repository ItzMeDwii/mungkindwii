import {REST, Routes, SlashCommandBuilder} from 'discord.js';

const joinVoiceCommand = new SlashCommandBuilder()
    .setName('joinvoice')
    .setDescription('Join Voice Channel')
    .addStringOption(option =>
        option.setName('channel').setDescription('The channel to join into')
            .setRequired(true)
            .addChoices(
                {name: 'Squad 1', value: '1213396581546463276'},
                {name: 'Squad 2', value: '1213396581546463277'},
                {name: 'Squad 3', value: '1233794322189647914'},
                {name: 'Crewman', value: '1213400621491814410'},
                {name: 'Dwii Test', value: '524088660757577748'},
            )
    )


const commands = [
    {
        name: 'ping',
        description: 'Replies with Pong!',
    },
    joinVoiceCommand.toJSON()
];

const rest = new REST({version: '10'}).setToken(process.env.CLIENT_TOKEN);

try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {body: commands});

    console.log('Successfully reloaded application (/) commands.');
} catch (error) {
    console.error(error);
}