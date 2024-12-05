import { useState, useRef } from 'react';
import { TiLocationArrow } from 'react-icons/ti';

// eslint-disable-next-line react/prop-types
export const BentoTilt = ({ children, className = '' }) => {
	const [transformStyle, setTransformStyle] = useState('');
	const itemRef = useRef(null);

	// mouse move event handler
	const handleMouseMove = (e) => {
		if (!itemRef.current) return;

		const { left, top, width, height } =
			itemRef.current.getBoundingClientRect();

		const relativeX = (e.clientX - left) / width;
		const relativeY = (e.clientY - top) / height;

		const tiltX = (relativeY - 0.5) * 8;
		const tiltY = (relativeX - 0.5) * -8;

		const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.98, .98, .98)`;
		setTransformStyle(newTransform);
	};

	// mouse leave event handler
	const handleMouseLeave = () => {
		setTransformStyle('');
	};

	return (
		<div
			ref={itemRef}
			className={className}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			style={{ transform: transformStyle }}
		>
			{children}
		</div>
	);
};

// eslint-disable-next-line react/prop-types
export const BentoCard = ({ src, title, description, isComingSoon }) => {
	const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
	const [hoverOpacity, setHoverOpacity] = useState(0);
	const hoverButtonRef = useRef(null);

	const handleMouseMove = (event) => {
		if (!hoverButtonRef.current) return;
		const rect = hoverButtonRef.current.getBoundingClientRect();

		setCursorPosition({
			x: event.clientX - rect.left,
			y: event.clientY - rect.top,
		});
	};

	const handleMouseEnter = () => setHoverOpacity(1);
	const handleMouseLeave = () => setHoverOpacity(0);

	return (
		<div className="relative size-full">
			<video
				src={src}
				loop
				muted
				autoPlay
				className="absolute left-0 top-0 size-full object-cover object-center"
			/>
			<div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
				<div>
					<h1 className="bento-title special-font">{title}</h1>
					{description && (
						<p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
					)}
				</div>

				{isComingSoon && (
					<div
						ref={hoverButtonRef}
						onMouseMove={handleMouseMove}
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
						className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
					>
						{/* Radial gradient hover effect */}
						<div
							className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
							style={{
								opacity: hoverOpacity,
								background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
							}}
						/>
						<TiLocationArrow className="relative z-20" />
						<p className="relative z-20 text-slate-400">coming soon</p>
					</div>
				)}
			</div>
		</div>
	);
};

const Features = () => (
	<section id="features" className="bg-black pb-52">
		<div className="container mx-auto px-3 md:px-10">
			<div className="px-5 py-32">
				<p className="font-circular-web text-lg text-blue-50">
					Into the Metagame Layer
				</p>
				<p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
					Step into an extraordinary gaming universe where virtual reality and
					real-world experiences blend seamlessly, creating an immersive
					adventure that transforms your everyday world.
				</p>
			</div>

			<BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
				<BentoCard
					src="videos/feature-1.mp4"
					title={<>Enter the Virtual Frontier</>}
					description="A gaming platform that connects your traditional and blockchain gaming experiences, with rewards for every achievement."
					isComingSoon
				/>
			</BentoTilt>

			<div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
				<BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
					<BentoCard
						src="videos/feature-2.mp4"
						title={
							<>
								z<b>ee</b>d
							</>
						}
						description="A unique digital collectibles series blending anime and gaming aesthetics - ready to evolve into something bigger."
						isComingSoon
					/>
				</BentoTilt>

				<BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
					<BentoCard
						src="videos/feature-3.mp4"
						title={
							<>
								n<b>e</b>xus
							</>
						}
						description="A playful social space where Web3 communities connect through interactive experiences."
						isComingSoon
					/>
				</BentoTilt>

				<BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
					<BentoCard
						src="videos/feature-4.mp4"
						title={
							<>
								ni<b>c</b>o
							</>
						}
						description="An AI companion that enhances your gaming experience across platforms with smart assistance."
						isComingSoon
					/>
				</BentoTilt>

				<BentoTilt className="bento-tilt_2">
					<div className="flex size-full flex-col justify-between bg-violet-300 p-5">
						<h1 className="bento-title special-font max-w-64 text-black">
							M<b>o</b>re co<b>m</b>ing s<b>o</b>on!
						</h1>

						<TiLocationArrow className="m-5 scale-[5] self-end" />
					</div>
				</BentoTilt>

				<BentoTilt className="bento-tilt_2">
					<video
						src="videos/feature-5.mp4"
						loop
						muted
						autoPlay
						className="size-full object-cover object-center"
					/>
				</BentoTilt>
			</div>
		</div>
	</section>
);

export default Features;
