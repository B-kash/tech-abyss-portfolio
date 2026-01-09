export interface DialogLine {
  text: string;
  speaker?: string;
}

export interface Dialog {
  id: string;
  lines: DialogLine[];
  unlocksZone?: string;
}

export const dialogs: Record<string, Dialog> = {
  guide: {
    id: 'guide',
    lines: [
      { speaker: 'Guide', text: 'Welcome to the Tech Abyss! This is an interactive portfolio experience.' },
      { speaker: 'Guide', text: 'CONTROLS:\n• Use WASD or Arrow Keys to move your character\n• Press E or Space to interact with NPCs and doors\n• Press ESC to close dialogs and overlays' },
      { speaker: 'Guide', text: 'HOW TO PLAY:\n• Talk to NPCs to learn about different areas\n• Each NPC can unlock new zones for you\n• Locked buildings appear gray - find the right NPC to unlock them\n• Unlocked buildings will teleport you to special content areas' },
      { speaker: 'Guide', text: 'YOUR MISSION:\n• Find the Engineer NPC to unlock the Projects Lab\n• Find the Contact NPC to unlock the Contact Office\n• Explore all the areas to see portfolio content!' },
      { speaker: 'Guide', text: 'Let me unlock the About House for you now... You can enter it to learn more about the developer!' },
    ],
    unlocksZone: 'about',
  },
  guide_repeat: {
    id: 'guide_repeat',
    lines: [
      { speaker: 'Guide', text: 'Explore the world and talk to others!' },
      { speaker: 'Guide', text: 'Each NPC can unlock new areas for you.' },
    ],
  },
  engineer: {
    id: 'engineer',
    lines: [
      { speaker: 'Engineer', text: 'Hello there! I see you\'re exploring the Tech Abyss.' },
      { speaker: 'Engineer', text: 'I work on interesting software projects and applications. Would you like to see what I\'ve built?' },
      { speaker: 'Engineer', text: 'I\'ll unlock the Projects Lab for you! You can access it through the green door nearby. Inside, you\'ll find details about various projects I\'ve worked on.' },
    ],
    unlocksZone: 'projects',
  },
  engineer_repeat: {
    id: 'engineer_repeat',
    lines: [
      { speaker: 'Engineer', text: 'Check out the Projects Lab to see my work!' },
    ],
  },
  writer: {
    id: 'writer',
    lines: [
      { speaker: 'Writer', text: 'Greetings, traveler! Welcome to the Blog Library area.' },
      { speaker: 'Writer', text: 'I document my thoughts, experiences, and technical insights in blog posts. These writings cover topics like game development, web technologies, and creative coding.' },
      { speaker: 'Writer', text: 'Let me grant you access to the Blog Library! Look for the green door - it will take you to a collection of my written works and articles.' },
    ],
    unlocksZone: 'blog',
  },
  writer_repeat: {
    id: 'writer_repeat',
    lines: [
      { speaker: 'Writer', text: 'The Blog Library contains all my writings. Enjoy!' },
    ],
  },
  contact: {
    id: 'contact',
    lines: [
      { speaker: 'Contact', text: 'Hello! I\'m here to help you get in touch.' },
      { speaker: 'Contact', text: 'Interested in collaborating? Have a project in mind? Or just want to say hello?' },
      { speaker: 'Contact', text: 'I\'ll unlock my contact information for you! Look for the contact building nearby.' },
    ],
    unlocksZone: 'contact',
  },
  contact_repeat: {
    id: 'contact_repeat',
    lines: [
      { speaker: 'Contact', text: 'Feel free to reach out anytime! Check the Contact building for my details.' },
    ],
  },
};

export function getDialog(npcId: string, hasUnlocked: boolean): Dialog {
  const baseId = npcId;
  const repeatId = `${baseId}_repeat`;
  
  if (hasUnlocked && dialogs[repeatId]) {
    return dialogs[repeatId];
  }
  
  return dialogs[baseId] ?? dialogs.guide_repeat;
}