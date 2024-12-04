import { FaDiscord, FaTwitter, FaYoutube } from 'react-icons/fa';
import { RxNotionLogo } from 'react-icons/rx';

const socialLinks = [
	{ href: 'https://discord.com', icon: <FaDiscord /> },
	{ href: 'https://twitter.com', icon: <FaTwitter /> },
	{ href: 'https://youtube.com', icon: <FaYoutube /> },
	{ href: 'https://www.notion.so', icon: <RxNotionLogo /> },
];

const Footer = () => {
	return (
		<footer className="w-screen bg-[#e3681c] py-4 text-black">
			<div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
				<p className="text-center text-sm font-light md:text-left">
					©Zanimate 2024. All rights reserved
				</p>

				<div className="flex justify-center gap-4  md:justify-start">
					{socialLinks.map((link, index) => (
						<a
							key={index}
							href={link.href}
							target="_blank"
							rel="noopener noreferrer"
							className="text-black transition-colors duration-500 ease-in-out hover:text-white"
						>
							{link.icon}
						</a>
					))}
				</div>

				<a
					href="#privacy-policy"
					className="text-center text-sm font-light hover:underline md:text-right"
				>
					Privacy Policy
				</a>
			</div>
		</footer>
	);
};

export default Footer;
