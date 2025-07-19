import {
  ApplicationCommandOptionType,
  type CommandInteraction,
  type GuildChannel,
  type User,
} from 'discord.js';
import { Discord, Slash, SlashOption } from 'discordx';
import { 
  createErrorEmbed, 
  createTicketClosingEmbed, 
  createUserAddedEmbed, 
  createUserRemovedEmbed 
} from '../helper/ticket_embeds.js';
import { TicketRepository } from '../repository/ticket_repository.js';
import { closeTicket } from '../service/ticket_service.js';

@Discord()
export class TicketManage {
  
  @Slash({ 
    description: 'Add a user to the current ticket', 
    name: 'add' 
  })
  async addUser(
    @SlashOption({
      description: 'User to add to the ticket',
      name: 'user',
      required: true,
      type: ApplicationCommandOptionType.User,
    })
    user: User,
    interaction: CommandInteraction
  ): Promise<void> {
    
    if (!interaction.guild || !interaction.channel) {
      await interaction.reply({
        embeds: [createErrorEmbed()],
        ephemeral: true,
      });
      return;
    }

    const ticket = await TicketRepository.getByChannelId(interaction.channel.id);
    if (!ticket) {
      await interaction.reply({
        content: '❌ This command can only be used in ticket channels.',
        ephemeral: true,
      });
      return;
    }

    try {
      const channel = interaction.channel as GuildChannel;
      
      await channel.permissionOverwrites.edit(user.id, {
        ViewChannel: true,
        SendMessages: true,
        ReadMessageHistory: true,
      });

      await interaction.reply({
        embeds: [createUserAddedEmbed(user.id, interaction.user.id)],
        ephemeral: false,
      });
    } catch (error) {
      console.error('Error adding user to ticket:', error);
      await interaction.reply({
        embeds: [createErrorEmbed()],
        ephemeral: true,
      });
    }
  }

  @Slash({ 
    description: 'Remove a user from the current ticket', 
    name: 'remove' 
  })
  async removeUser(
    @SlashOption({
      description: 'User to remove from the ticket',
      name: 'user',
      required: true,
      type: ApplicationCommandOptionType.User,
    })
    user: User,
    interaction: CommandInteraction
  ): Promise<void> {
    
    if (!interaction.guild || !interaction.channel) {
      await interaction.reply({
        embeds: [createErrorEmbed()],
        ephemeral: true,
      });
      return;
    }

    const ticket = await TicketRepository.getByChannelId(interaction.channel.id);
    if (!ticket) {
      await interaction.reply({
        content: '❌ This command can only be used in ticket channels.',
        ephemeral: true,
      });
      return;
    }

    if (user.id === ticket.creator) {
      await interaction.reply({
        content: '❌ Cannot remove the ticket creator from their own ticket.',
        ephemeral: true,
      });
      return;
    }

    try {
      const channel = interaction.channel as GuildChannel;
      
      await channel.permissionOverwrites.delete(user.id);

      await interaction.reply({
        embeds: [createUserRemovedEmbed(user.id, interaction.user.id)],
        ephemeral: false,
      });
    } catch (error) {
      console.error('Error removing user from ticket:', error);
      await interaction.reply({
        embeds: [createErrorEmbed()],
        ephemeral: true,
      });
    }
  }

  @Slash({ 
    description: 'Close the current ticket', 
    name: 'close' 
  })
  async closeTicketCommand(interaction: CommandInteraction): Promise<void> {
    
    if (!interaction.guild || !interaction.channel) {
      await interaction.reply({
        embeds: [createErrorEmbed()],
        ephemeral: true,
      });
      return;
    }

    const ticket = await TicketRepository.getByChannelId(interaction.channel.id);
    if (!ticket) {
      await interaction.reply({
        content: '❌ This command can only be used in ticket channels.',
        ephemeral: true,
      });
      return;
    }

    try {
      await interaction.reply({
        embeds: [createTicketClosingEmbed(interaction.user.id)],
        ephemeral: false,
      });

      await closeTicket(interaction);
    } catch (error) {
      console.error('Error closing ticket:', error);
      await interaction.followUp({
        embeds: [createErrorEmbed()],
        ephemeral: true,
      });
    }
  }
} 