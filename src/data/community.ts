export interface Community {
  id: number;
  name: string;
  official: boolean;
  description: string;
  link: string;
}

export const communityData: Community[] = [
  {
    id: 1,
    name: "Rockstar Games",
    official: true,
    description:
      "The official home of Rockstar Games on Discord! Chat about your favorite Rockstar Games titles, connect with other players, and keep up with announcements.",
    link: "https://discord.com/invite/rockstargames",
  },
  {
    id: 2,
    name: "Grand Theft Auto VI",
    official: false,
    description:
      "The #1 and original Discord Community for the upcoming Grand Theft Auto VI (GTA 6) by Rockstar Games. In association with r/GTA6.",
    link: "https://discord.gg/gta-vi",
  },
];
