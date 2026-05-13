export type Service = { num: string; title: string; desc: string };
export type Brand = { name: string; file: string; sizeClass?: string };
export type Clip = {
	eyebrow: string;
	title: string;
	desc: string;
	href: string;
	views?: string;
};
export type TestimonialSegment = string | { highlight: string };
export type Testimonial = {
	title: string;
	paragraphs: TestimonialSegment[][];
	author: string;
	role: string;
};

export const heroImage = '/images/hero/Lightsaber_DreamHack_mirror.png';

export type PortfolioPhoto = { src: string; w: number; h: number };

export const portfolioImages: PortfolioPhoto[] = [
	{src: '/images/portfolio/Arena-2012.jpg', w: 1765, h: 2329},
	{src: '/images/portfolio/BETT_2023_Day_2-104.jpg', w: 7008, h: 4672},
	{src: '/images/portfolio/ho1EUfPO.png', w: 1366, h: 2048},
	{src: '/images/portfolio/IMG_2492-1.jpg', w: 4032, h: 3024},
	{src: '/images/portfolio/IMG_4889.jpg', w: 2316, h: 3088},
	{src: '/images/portfolio/IMG_5603.jpg', w: 3024, h: 4032},
	{src: '/images/portfolio/IMG_8078.jpg', w: 853, h: 1280},
	{src: '/images/portfolio/IMG-20220829-WA00133.jpg', w: 623, h: 650},
	{src: '/images/portfolio/IMG-20220925-WA0011.jpg', w: 2000, h: 1126},
	{src: '/images/portfolio/IMG-20220925-WA0012.jpg', w: 2000, h: 1126},
	{src: '/images/portfolio/IMG-20231015-WA0002.jpg', w: 1600, h: 1600},
	{src: '/images/portfolio/IMG-20240630-WA0005.jpg', w: 693, h: 808},
	{src: '/images/portfolio/PXL_20221120_113453554.PORTRAIT.jpg', w: 3024, h: 4032},
	{src: '/images/portfolio/PXL_20230325_145222126.jpg', w: 2464, h: 3280},
	{src: '/images/portfolio/PXL_20230903_172956625.jpg', w: 2464, h: 3280},
	{src: '/images/portfolio/PXL_20240323_211336347.jpg', w: 2464, h: 3280},
	{src: '/images/portfolio/PXL_20240324_200647759.jpg', w: 2464, h: 3280},
];

export const services: Service[] = [
	{
		num: '01',
		title: 'Stage & Event Host',
		desc: 'My favourite thing to do is get an audience excited, from tournament stages to international brand activations.',
	},
	{
		num: '02',
		title: 'Desk & TV Presenter',
		desc: "I'm as comfortable in front of the camera as on stage. I have a natural, engaging on-screen presence that translates live energy into compelling viewing.",
	},
	{
		num: '03',
		title: 'Corporate Host & Motivational Speaker',
		desc: "I've spent over a decade investigating  philosophy, the nature of the mind, and human psychology. I love helping people to reach their full potential - ask me how I can help your team gain confidence and clarity!",
	},
];

export const brands: Brand[] = [
	{name: 'Amazon', file: 'amazon.svg'},
	{name: 'Alienware', file: 'alienware.svg'},
	{name: 'DoorDash', file: 'doordash.svg'},
	{name: 'AT&T', file: 'att.svg'},
	{name: 'Shell', file: 'shell.svg'},
	{name: 'Red Bull', file: 'red-bull.svg'},
	{name: 'MSI', file: 'msi.svg'},
	{name: 'ASUS', file: 'asus.svg'},
	{name: 'Twitch', file: 'twitch.svg'},
	{name: 'ZENNI', file: 'zenni.svg'},
	{name: 'Nike', file: 'nike.svg'},
	{name: 'DHL', file: 'dhl.svg'},
	{name: 'OMEN', file: 'omen.svg', sizeClass: 'max-h-12'},
	{name: 'Razer', file: 'razer.svg'},
	{name: 'KICK', file: 'kick.png', sizeClass: 'max-h-7'},
	{name: 'Lamborghini', file: 'lamborghini.svg', sizeClass: 'max-h-12'},
	{name: 'Anthros', file: 'anthros.webp'},
	{name: 'Dreamhack', file: 'dreamhack.svg'},
];

export const testimonials: Testimonial[] = [
	{
		title: 'Elliot possesses a stage presence that is truly rare',
		paragraphs: [
			[
				"Elliot's ability to captivate an audience is truly remarkable. His humor, attention to detail, and infectious energy transformed our event into an unforgettable experience. One of his many strengths is his ",
				{highlight: 'seamless integration of ad reads and key call-outs'},
				', which he delivers in a manner that is both natural and genuinely humorous.',
			],
			[
				'He effortlessly connected with the diverse audience, creating an atmosphere that was both inviting and exciting. Elliot possesses a stage presence that is truly rare — ',
				{highlight: 'he has the "it" factor that cannot be taught.'},
				' Alienware was delighted with his work, and we are already planning to collaborate with him for future events.',
			],
		],
		author: 'Javier Davalos',
		role: 'Head of Community Engagement & Research, Alienware',
	},
	{
		title: 'His energy and willingness are unbeatable.',
		paragraphs: [
			[
				'The main skill I appreciate from Elliot is his ',
				{highlight: "flexibility to take on anything it's thrown at him during a show"},
				', from small adjustments for a sponsored segment, to scrapping or adding full segments to a show just hours before we go live. We have collaborated in an immense array of style of shows, from serious interviews to esports events, hosting trivias and activities with casual attendees or professional players.',
			],
			[
				{
					highlight:
						'His energy and willingness to make the show as good as possible are unbeatable',
				},
				' and are extremely valuable on day-long live shows.',
			],
		],
		author: 'Manuel Gutierrez',
		role: 'Program Activation Manager, Twitch',
	},
	{
		title: 'He elevates a show just by being himself.',
		paragraphs: [
			[
				"Elliot is a one-of-a-kind host and human being. His stage presence and ability to connect with an audience is special, but it's ",
				{highlight: 'how he acts off-stage that makes him a truly great host'},
				'. Elliot brings the same zeal and humor that you see while he is at home under the stage lights, even when the cameras are off or rehearsal has just begun. He is the perfect liaison between the audience and production team.',
			],
			[
				'I cannot understate what a pleasure it is to work alongside Elliot and ',
				{highlight: 'the ability he has to elevate a show just by being himself'},
				'. He just has a personality made for show business and has been integral in the success of every show that we have worked together.',
			],
		],
		author: 'Blake "MrBepic" Phillips',
		role: 'Host & Caster',
	},
];

export const clips: Clip[] = [
	{
		eyebrow: 'Gameshow',
		title: 'Gameshow hosting — viral moment',
		desc: 'Stage presence that translates beyond the live event — this clip accumulated nearly 5 million views on YouTube alone.',
		href: 'https://www.youtube.com/watch?v=T2JHt-pQhro',
		views: '~5M views',
	},
	{
		eyebrow: 'Audience engagement',
		title: 'Crowd hype — PAX Arena giveaway',
		desc: 'My producer asked mid-show if I could draw a bigger crowd from around the venue. Check out my ability to energise an audience.',
		href: 'https://www.twitch.tv/paxarena/v/2456096149?sr=a&t=24250s',
	},
	{
		eyebrow: 'Celebrity segment',
		title: 'Xavier Woods, Kenny Omega & Khleo Thomas',
		desc: 'Working live with WWE’s Xavier Woods, AEW’s Kenny Omega, and actor Khleo Thomas — a masterclass in keeping big names comfortable on stage.',
		href: 'https://www.twitch.tv/videos/2455360550?t=1h47m32s',
	},
	{
		eyebrow: 'Brand integration',
		title: 'TwitchCon LAN — Philips OneBlade',
		desc: 'I pride myself on rolling with anything. Here’s a clip of me getting shaved live on stage as part of a brand partnership.',
		href: 'https://www.twitch.tv/videos/2474139131?t=6h0m44s',
	},
];
