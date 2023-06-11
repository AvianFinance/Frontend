import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { hero_5_data } from '../../data/coverflow_data';
import { useSelector, useDispatch } from 'react-redux';
import { explorecollections } from '../../redux/counterSlice';
import {getBasicData} from '../../api/landing'

const Hero_5 = () => {
	const [basicInfo, setbasicInfo] = useState(0)
	useEffect(() => {
		getBasicData()
			.then((response) => {
				if (response.data){
					setbasicInfo(response.data)
				} else {
					console.log("error in getBasicData")
				}
				
			})
	}, []);

	const dispatch = useDispatch();
	return (
		<>
			{/* <!-- Hero --> */}
			<section className="relative py-20 md:pt-32">
				<picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
					<img src="/images/gradient.jpg" alt="gradient" className="h-full" />
				</picture>
				<picture className="pointer-events-none absolute inset-0 -z-10 hidden dark:block">
					<img src="/images/gradient_dark.jpg" alt="gradient dark" className="h-full" />
				</picture>

				<div className="h-full px-6 xl:px-20">
					<div className="grid h-full items-center gap-4 lg:grid-cols-12">
						<div className="col-span-6 flex h-full flex-col items-center justify-center py-10 md:items-start md:py-20 xl:col-span-5 xl:pl-[20%] xl:pr-[10%]">
							<div className="mb-10 w-full sm:flex sm:space-x-4">
								<div className="mb-4 flex-1 rounded-2lg bg-white p-4 text-center dark:bg-white/[.15]">
									<span className="block font-display text-3xl text-[#8DD059]">{basicInfo ? basicInfo.collections_count : '- -' }</span>
									<span className="block font-display text-sm text-jacarta-500 dark:text-white">
										Collectibles
									</span>
								</div>
								<div className="mb-4 flex-1 rounded-2lg bg-white p-4 text-center dark:bg-white/[.15]">
									<span className="block font-display text-3xl text-[#737EF2]">{basicInfo ? basicInfo.nft_count : '- -' }</span>
									<span className="block font-display text-sm text-jacarta-500 dark:text-white">
										Minted NFTs
									</span>
								</div>
								<div className="mb-4 flex-1 rounded-2lg bg-white p-4 text-center dark:bg-white/[.15]">
									<span className="block font-display text-3xl text-[#F35BC7]">{basicInfo ? basicInfo.users_count : '- -' }</span>
									<span className="block font-display text-sm text-jacarta-500 dark:text-white">
										Artists
									</span>
								</div>
							</div>
							<h2 className="mb-6 text-center font-display text-5xl text-jacarta-700 dark:text-white md:text-left lg:text-5xl xl:text-6xl">
								Buy, Rent and Sell NFT’s
							</h2>
							<p className="mb-8 text-center text-lg dark:text-jacarta-200 md:text-left">
								The {"world's"} largest digital marketplace for crypto collectibles and non-fungible
								tokens
							</p>
							<div className="flex space-x-4">
								<Link href="/create">
									<a className="w-36 rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark">
										Upload
									</a>
								</Link>
								<Link href="/collection/explore_collection">
									<a 
										className="w-36 rounded-full bg-white py-3 px-8 text-center font-semibold text-accent shadow-white-volume transition-all hover:bg-accent-dark hover:text-white hover:shadow-accent-volume"
										onClick={() => {
											dispatch(explorecollections("buy"));
											localStorage.setItem('navItemValue', 31);
										}}
									>
										Explore
									</a>
								</Link>
							</div>
						</div>

						{/* <!-- Hero images --> */}
						<div className="relative col-span-6 xl:col-span-6 xl:col-start-7">
							<img
								src="/images/hero/badge.png"
								className="absolute top-0 z-10 -ml-16 animate-spin-slow md:top-[12%]"
								alt=""
							/>
							<div className="md:flex md:space-x-6 xl:space-x-12">
								{hero_5_data.map((item, index) => {
									const { id, img, title, authorImage, authorName, subItem } = item;
									const itemLink = img
										.split('/')
										.slice(-1)
										.toString()
										.replace('_2lg.jpg', '')
										.replace('.gif', '');
									return (
										<div
											className={
												index === 0
													? 'mb-6 md:flex md:w-1/2 md:items-center'
													: 'space-y-6 md:w-1/2 xl:space-y-12'
											}
											key={id}
										>
											<article>
												<div className="block overflow-hidden rounded-2.5xl bg-white shadow-md transition-shadow hover:shadow-lg dark:bg-jacarta-700">
													<figure className="relative">
														<Link href={`#`}>
															<a>
																<img
																	src={img}
																	alt="item 1"
																	className="w-full object-cover"
																	height="437"
																	width="406"
																/>
															</a>
														</Link>
													</figure>
													<div className="p-6">
														<div className="flex">
															<Link href="#">
																<a className="shrink-0">
																	<img
																		src={authorImage}
																		alt="avatar"
																		className="mr-4 h-10 w-10 rounded-full"
																	/>
																</a>
															</Link>
															<div>
																<Link href={`#`}>
																	<a className="block">
																		<span className="font-display text-lg leading-none text-jacarta-700 hover:text-accent dark:text-white">
																			{title}
																		</span>
																	</a>
																</Link>
																<Link href="#">
																	<a className="text-2xs text-accent">{authorName}</a>
																</Link>
															</div>
														</div>
													</div>
												</div>
											</article>

											{subItem &&
												subItem.map(({ id, img, title, authorImage, authorName }) => {
													const itemLink = img
														.split('/')
														.slice(-1)
														.toString()
														.replace('.jpg', '')
														.replace('.gif', '')
														.replace('_lg', '');
													return (
														<div className="md:w-3/4" key={id}>
															<article>
																<div className="block overflow-hidden rounded-2.5xl bg-white shadow-md transition-shadow hover:shadow-lg dark:bg-jacarta-700">
																	<figure className="relative">
																		<Link href={`#`}>
																			<a>
																				<img
																					src={img}
																					alt="item 1"
																					className="w-full object-cover"
																					height="437"
																					width="406"
																				/>
																			</a>
																		</Link>
																	</figure>
																	<div className="p-6">
																		<div className="flex">
																			<Link href="#">
																				<a className="shrink-0">
																					<img
																						src={authorImage}
																						alt="avatar"
																						className="mr-4 h-10 w-10 rounded-full"
																					/>
																				</a>
																			</Link>
																			<div>
																				<Link href={`#`}>
																					<a className="block">
																						<span className="font-display text-lg leading-none text-jacarta-700 hover:text-accent dark:text-white">
																							{title}
																						</span>
																					</a>
																				</Link>
																				<Link href="#">
																					<a className="text-2xs text-accent">{authorName}</a>
																				</Link>
																			</div>
																		</div>
																	</div>
																</div>
															</article>
														</div>
													);
												})}
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* <!-- end hero --> */}
		</>
	);
};

export default Hero_5;
