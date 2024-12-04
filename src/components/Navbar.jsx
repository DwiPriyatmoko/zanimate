import clsx from 'clsx';
import gsap from 'gsap';
import { useWindowScroll } from 'react-use';
import { useEffect, useRef, useState } from 'react';
import { TiLocationArrow } from 'react-icons/ti';

import Button from './Button';

const navItems = ['Nexus', 'Mint', 'About', 'Features', 'Contact'];

const NavBar = () => {
	// State for toggling audio and visual indicator
	const [isAudioPlaying, setIsAudioPlaying] = useState(false);
	const [isIndicatorActive, setIsIndicatorActive] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	// Refs for audio and navigation container
	const audioElementRef = useRef(null);
	const navContainerRef = useRef(null);

	const { y: currentScrollY } = useWindowScroll();
	const [isNavVisible, setIsNavVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);

	// Toggle audio and visual indicator
	const toggleAudioIndicator = () => {
		setIsAudioPlaying((prev) => !prev);
		setIsIndicatorActive((prev) => !prev);
	};

	const handleNavClick = (e, targetId) => {
		e.preventDefault();
		const element = document.getElementById(targetId);
		if (element) {
			element.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
				inline: 'nearest',
			});
		}
	};

	// Manage audio playback
	useEffect(() => {
		const initAudio = async () => {
			if (audioElementRef.current) {
				audioElementRef.current.volume = 0.5;
				try {
					await audioElementRef.current.play();
				} catch (error) {
					console.log('Initial audio playback failed:', error);
					setIsAudioPlaying(false);
					setIsIndicatorActive(false);
				}
			}
		};

		if (isAudioPlaying) {
			initAudio();
		} else {
			audioElementRef.current?.pause();
		}
	}, [isAudioPlaying]);

	useEffect(() => {
		if (currentScrollY === 0) {
			// Topmost position: show navbar without floating-nav
			setIsNavVisible(true);
			navContainerRef.current.classList.remove('floating-nav');
		} else if (currentScrollY > lastScrollY) {
			// Scrolling down: hide navbar and apply floating-nav
			setIsNavVisible(false);
			navContainerRef.current.classList.add('floating-nav');
		} else if (currentScrollY < lastScrollY) {
			// Scrolling up: show navbar with floating-nav
			setIsNavVisible(true);
			navContainerRef.current.classList.add('floating-nav');
		}

		setLastScrollY(currentScrollY);
	}, [currentScrollY, lastScrollY]);

	useEffect(() => {
		gsap.to(navContainerRef.current, {
			y: isNavVisible ? 0 : -100,
			opacity: isNavVisible ? 1 : 0,
			duration: 0.2,
		});
	}, [isNavVisible]);

	return (
		<div
			ref={navContainerRef}
			className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
		>
			<header className="absolute top-1/2 w-full -translate-y-1/2">
				<nav className="flex size-full items-center justify-between p-4">
					{/* Logo and Product button */}
					<div className="flex items-center gap-4">
						<img src="/img/logo.png" alt="logo" className="w-12" />

						<Button
							id="product-button"
							title="Products"
							rightIcon={<TiLocationArrow />}
							containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
						/>
					</div>

					{/* Navigation Links and Audio Button */}
					<div className="flex h-full items-center">
						{/* Mobile Menu Button */}
						<button
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							className="md:hidden mr-4 p-2 z-[60]"
							aria-label="Toggle menu"
						>
							<div className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
								<span className="line" />
								<span className="line" />
								<span className="line" />
							</div>
						</button>

						{/* Desktop Navigation */}
						<div className="hidden md:block">
							{navItems.map((item, index) => (
								<a
									key={index}
									href={`#${item.toLowerCase()}`}
									className="nav-hover-btn"
									onClick={(e) => handleNavClick(e, item.toLowerCase())}
								>
									{item}
								</a>
							))}
						</div>

						{/* Mobile Navigation */}
						<div
							className={`fixed inset-0 z-50 backdrop-blur-lg transition-all duration-500 md:hidden ${
								isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
							}`}
						>
							<div className="absolute inset-0 bg-black/80" />
							<div className="fixed inset-0 flex items-center justify-center">
								<div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
								<div className="absolute top-1 w-full px-8 bg-black">
									<div className="flex flex-col items-center space-y-8">
										{navItems.map((item, index) => (
											<a
												key={index}
												href={`#${item.toLowerCase()}`}
												className="mobile-nav-link bg-black/10 w-full text-center py-4 rounded-xl"
												style={{
													transform: `translateY(${
														isMobileMenuOpen ? '0' : '20px'
													})`,
													opacity: isMobileMenuOpen ? 1 : 0,
													transition: `transform 0.4s ease ${
														index * 0.1
													}s, opacity 0.4s ease ${index * 0.1}s`,
												}}
												onClick={(e) => {
													handleNavClick(e, item.toLowerCase());
													setIsMobileMenuOpen(false);
												}}
											>
												{item}
											</a>
										))}
									</div>
								</div>
							</div>
						</div>

						<button
							onClick={toggleAudioIndicator}
							className="ml-4 flex items-center space-x-0.5 relative z-[60]"
							aria-label="Toggle audio"
						>
							<audio
								ref={audioElementRef}
								className="hidden"
								src="/audio/loop.mp3"
								loop
								preload="auto"
							/>
							{[1, 2, 3, 4].map((bar) => (
								<div
									key={bar}
									className={clsx('indicator-line', {
										active: isIndicatorActive,
									})}
									style={{
										animationDelay: `${bar * 0.1}s`,
									}}
								/>
							))}
						</button>
					</div>
				</nav>
			</header>
		</div>
	);
};

export default NavBar;
