import Head from 'next/head';
import React from 'react';
import Meta from '../../components/Meta';

const Tarms = () => {
	return (
		<div>
			<Meta title="Tarms || Arctix | NFT Marketplace Next.js Template" />
			<div className="pt-[5.5rem] lg:pt-24">
				{/* <!-- TOS --> */}
				<section className="dark:bg-jacarta-800 relative py-16 md:py-24">
					<picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
						<img src="/images/gradient_light.jpg" alt="gradient" className="h-full w-full" />
					</picture>
					<div className="container">
						<h1 className="font-display text-jacarta-700 text-center text-4xl font-medium dark:text-white">
							Terms Of Service
						</h1>
						<div className="article-content mx-auto max-w-[48.125rem]">
							<h2 className="text-base">Introduction</h2>
							<p>
								Welcome to Arctix, a Non-Fungible Token (NFT) marketplace. These Terms and Conditions ("Agreement") govern your use of the Arctix website and services provided by Arctix. By accessing or using Arctix, you agree to be bound by this Agreement. Please read this Agreement carefully before using our services. If you do not agree to these terms, you may not use Arctix.
							</p>
							<p>
							<b>Acceptance of Terms</b> <br />
								By accessing or using Arctix, you acknowledge that you have read, understood, and agree to be bound by this Agreement. If you are using Arctix on behalf of an organization, you represent and warrant that you have the authority to bind the organization to this Agreement.						
							</p>

							<h2>Use of Arctix</h2>

							<p>
								<b>Eligibility</b> <br />
								You must hold Avalanche coins (AVAX) in your wallet to use Arctix. By accessing or using Arctix, you represent and warrant that you meet these eligibility requirements.
							</p>

							<p>
								<b>Account Registration</b> <br />
								To access certain features of Arctix, you may need to create an account. If you connect with MetaMask and have AVAX in your wallet, an account will be automatically created for you. By using Arctix, you agree to provide accurate, current, and complete information in your account profile. You are solely responsible for maintaining the security of your account and the confidentiality of your MetaMask wallet and any other login credentials associated with Arctix.
							</p>

							<h2>User Profiles</h2>

							<p>
								Arctix allows users to update their profiles with additional information, such as a profile picture or a bio. You agree to provide accurate, current, and complete information in your user profile. You are responsible for ensuring that the information you provide is true, not misleading, and does not infringe upon the rights of any third party. Arctix reserves the right to review and remove any content from user profiles that violates this Agreement or is otherwise inappropriate.
							</p>

							<h2>Prohibited Activities</h2>

							<p>
								You agree not to engage in any of the following activities while using Arctix:<br />
								<ul>
									<li>Violating any applicable laws or regulations;</li>
									<li>Infringing upon the intellectual property rights of others;</li>
									<li>Using Arctix for any illegal, fraudulent, or unauthorized purpose;</li>
									<li>Interfering with or disrupting the integrity or performance of Arctix or its users' experience;</li>
									<li>Collecting or harvesting any personally identifiable information from Arctix without explicit consent.</li>
								</ul>
							</p>

							<h2>Intellectual Property</h2>

							<p>Arctix and its content, including but not limited to logos, designs, and trademarks, are the property of Arctix or its licensors and are protected by intellectual property laws. You agree not to use, modify, reproduce, distribute, or create derivative works based on Arctix or its content without prior written permission from Arctix.</p>

							<h2>Intellectual Property</h2>

							<p>
								<b>Eligibility</b> <br />
								Arctix facilitates the listing and purchasing of NFTs. Sellers are responsible for accurately describing the NFTs they list, and buyers are responsible for carefully reviewing the details of NFTs before making a purchase. Arctix does not guarantee the accuracy or quality of the NFT listings or transactions conducted on its platform.
							</p>

							<h2>Intellectual Property</h2>

							<p>
								<b>Eligibility</b> <br />
								Arctix may charge fees for certain services, such as listing NFTs or facilitating transactions. You agree to pay all applicable fees and any applicable taxes associated with your use of Arctix. Fees are subject to change, and Arctix will provide notice of any changes before they take effect
							</p>
						</div>
					</div>
				</section>
				{/* <!-- end TOS --> */}
			</div>
		</div>
	);
};

export default Tarms;
