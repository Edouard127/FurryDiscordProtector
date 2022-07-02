import { EmbedBuilder } from 'discord.js';

const error = (msg: string) => new EmbedBuilder()
  .setTitle('Error')
  .addFields(
	  	[
		  	{ 
			  name: 'Info', 
			  value: `${msg}` 
			}
		]
	)
  .setColor(0xed4245);

const success = (msg: string) => new EmbedBuilder()
  .setTitle('Success')
  .addFields(
		[
			{ 
			name: 'Info', 
			value: `${msg}` 
	  	}
	  ]
	)
  .setColor(0x57f287);

const embedUtils = {
  error,
  success,
};

export default embedUtils;