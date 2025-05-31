import Image from "next/image";

export default function FooterUser() {
	return (
		<>
			<footer className='py-5 bg-[#2563EBDB] mt-10'>
				<div className='flex flex-wrap items-center justify-center gap-3'>
					<Image src='/assets/image/logo_white.svg' alt='Logo' width={134} height={24} />
					<p className='text-white text-sm '>&copy; 2025 Blog genzet. All rights reserved.</p>
				</div>
			</footer>
		</>
	);
}
