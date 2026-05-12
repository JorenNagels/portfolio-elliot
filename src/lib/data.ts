export type Service = { num: string; title: string; desc: string };
export type Brand = { name: string; file: string };
export type Clip = {
  eyebrow: string;
  title: string;
  desc: string;
  href: string;
  views?: string;
};

export const heroImage = '/images/hero/Lightsaber_DreamHack_mirror.png';

export const portfolioImages: string[] = [
  '/images/portfolio/Arena-201.jpg',
  '/images/portfolio/Arena-2012.jpg',
  '/images/portfolio/BETT_2023_Day_2-104.jpg',
  '/images/portfolio/ho1EUfPO.png',
  '/images/portfolio/IMG_2492-1.jpg',
  '/images/portfolio/IMG_4889.jpg',
  '/images/portfolio/IMG_5603.jpg',
  '/images/portfolio/IMG_8078.jpg',
  '/images/portfolio/IMG-20220829-WA00133.jpg',
  '/images/portfolio/IMG-20220925-WA0011.jpg',
  '/images/portfolio/IMG-20220925-WA0012.jpg',
  '/images/portfolio/IMG-20231015-WA0002.jpg',
  '/images/portfolio/IMG-20240630-WA0005.jpg',
  '/images/portfolio/PXL_20221120_113453554.PORTRAIT.jpg',
  '/images/portfolio/PXL_20230325_145222126.jpg',
  '/images/portfolio/PXL_20230903_172956625.jpg',
  '/images/portfolio/PXL_20240323_211336347.jpg',
  '/images/portfolio/PXL_20240324_200647759.jpg',
];

export const services: Service[] = [
  {
    num: '01',
    title: 'Stage & Event Host',
    desc: 'From live tournament stages to international brand activations — I bring the energy your event deserves and keep every moment moving.',
  },
  {
    num: '02',
    title: 'Desk & TV Presenter',
    desc: 'Comfortable in front of the camera and in the broadcast booth. Natural, engaging on-screen presence that translates live energy into compelling viewing.',
  },
  {
    num: '03',
    title: 'Corporate Host',
    desc: 'Your brand values are safe on my stage. Seamless ad reads, polished messaging, and the crowd engagement that makes sponsors come back year after year.',
  },
];

export const brands: Brand[] = [
  { name: 'Amazon', file: 'amazon.svg' },
  { name: 'Nike', file: 'nike.svg' },
  { name: 'DoorDash', file: 'doordash.svg' },
  { name: 'AT&T', file: 'att.svg' },
  { name: 'Shell', file: 'shell.svg' },
  { name: 'Twitch', file: 'twitch.svg' },
  { name: 'Alienware', file: 'alienware.svg' },
  { name: 'MSI', file: 'msi.svg' },
  { name: 'ASUS', file: 'asus.svg' },
  { name: 'OMEN', file: 'omen.svg' },
  { name: 'Razer', file: 'razer.svg' },
  { name: 'Anthros', file: 'anthros.svg' },
  { name: 'Dreamhack', file: 'dreamhack.svg' },
];

export const clips: Clip[] = [
  {
    eyebrow: 'YouTube · Gameshow',
    title: 'Gameshow hosting — viral moment',
    desc: 'Stage presence that translates beyond the live event — this clip accumulated nearly 5 million views on YouTube alone.',
    href: 'https://www.youtube.com/watch?v=T2JHt-pQhro',
    views: '~5M views',
  },
  {
    eyebrow: 'Twitch · TwitchCon LAN Stage',
    title: 'Crowd hype — PAX Arena giveaway',
    desc: 'Producer asked mid-show if I could draw a bigger crowd from around the venue. Here’s what happened.',
    href: 'https://www.twitch.tv/paxarena/v/2456096149?sr=a&t=24250s',
  },
  {
    eyebrow: 'Twitch · Celebrity segment',
    title: 'Xavier Woods, Kenny Omega & Khleo Thomas',
    desc: 'Working live with WWE’s Xavier Woods, AEW’s Kenny Omega, and actor Khleo Thomas — a masterclass in keeping big names comfortable on stage.',
    href: 'https://www.twitch.tv/videos/2455360550?t=1h47m32s',
  },
  {
    eyebrow: 'Twitch · Brand integration',
    title: 'TwitchCon LAN — Philips OneBlade',
    desc: 'I pride myself on rolling with anything. Here’s a clip of me getting shaved live on stage as part of a brand partnership.',
    href: 'https://www.twitch.tv/videos/2474139131?t=6h0m44s',
  },
];
