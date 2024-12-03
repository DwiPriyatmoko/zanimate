import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

// register ScrollTrigger from gsap
import { ScrollTrigger } from 'gsap/all';
import AnimatedTitle from './AnimatedTitle';
gsap.registerPlugin(ScrollTrigger);

const About = () => {
	useGSAP(() => {
		const clipAnimation = gsap.timeline({
			scrollTrigger: {
				trigger: '#clip',
				start: 'center center',
				end: '+=800 center',
				scrub: 0.5,
				pin: true,
				pinSpacing: true,
			},
		});

		clipAnimation.to('#clip', {
			width: '100vw',
			height: '100vh',
			borderRadius: 0,
		});
	});

	return (
		<div id="about" className="min-h-screen">
			<div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
				<h2 className="fot-general text-sm uppercase md:text-[10px]">
					Welcome to Zanimate
				</h2>
				<AnimatedTitle
					title="Disc<b>o</b>ver the world's <br /> l<b>a</b>rgest collection of
			ZANIMATE"
					containerClass="mt-5 !text-black text-center"
				/>

				<div className="about-subtext">
					<p>
						The ZANIMATE is a game that allows you to play with your friends and
						family in a virtual reality environment.
					</p>
					<p>ZANIMATE unites the digital world with real life.</p>
				</div>
			</div>
			<div className="h-dvh w-screen" id="clip">
				<div className="mask-clip-path about-image">
					<img
						src="img/about.webp"
						alt="Background"
						className="absolute top-0 left-0 size-full object-cover"
					/>
				</div>
			</div>
		</div>
	);
};

export default About;
