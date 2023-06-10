import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getNFTColactivities, getUserActivities } from "../../api/nft";

const Activity_item = (address) => {
	const [filterVal, setFilterVal] = useState(null);
	function onlyUnique(value, index, self) {
		return self.indexOf(value) === index;
	}
	const [data, setData] = useState([]);
	const [filterData, setfilterData] = useState(["All", "Mint", "List", "Transfer"]);
	const [alldata, setalldata] = useState([]);
	const router = useRouter();
	const fullLocation = window.location.href;
	console.log(fullLocation);
	useEffect(() => {
		if (fullLocation.includes("user")){
			console.log("user address",address.address)	
			getUserActivities(address.address)
				.then(async(res) => {
					console.log(res.data)
					setData(res.data)
					setalldata(res.data)
				})
		} else {
			console.log("collection address",address.address)
			getNFTColactivities(address.address)
				.then(async(res) => {
					setData(res.data)
					setalldata(res.data)
				})	
		}
	}, [address]);

	const [inputText, setInputText] = useState('');

	const handleFilter = (category) => {
		if (category === 'All') {
			setData(alldata);
			return;
		} else{
			setData(alldata.filter((item) => item.basicEvent === category));	
		}
	};

	// const setFilters = () => {
	// 	if(filterData){
	// 		let filters = []
	// 		data.map(async(item) => {
	// 				console.log(item.basicEvent)
	// 				await filters.push(item.basicEvent)
	// 		})
	// 		let unique = filters.filter((item, i, ar) => ar.indexOf(item) === i);
	// 		setfilterData(unique)
	// 	}
	// };

	const handleSubmit = (e) => {
		e.preventDefault();
		const newArray = alldata.filter((item) => {
			if(item.name){
				return item.name.toLowerCase().includes(inputText.toLowerCase());
			}
		});
		setData(newArray);
		setInputText('');
	};

	return (
		<>
			{/* <!-- Activity Tab --> */}
			<div className="tab-pane fade">
				{/* <!-- Records / Filter --> */}
				<div className="lg:flex">
					{/* <!-- Records --> */}
					<div className="mb-10 shrink-0 basis-8/12 space-y-5 lg:mb-0 lg:pr-10">
						{data.slice(0, 5).map((item, index) => {
							const { nftContract, uri, name, price, createdAt, basicEvent } = item;			
							let priceVal = 	parseInt((price._hex), 16) * Math.pow(10, -18)
							let createdattime = createdAt ? createdAt.split("-")[0] : null
							return (
								<Link href={`http://localhost:3000/item/${item.nftContract}&${item.tokenId}`} key={index}>
									<a className="dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2.5xl relative flex items-center border bg-white p-8 transition-shadow hover:shadow-lg">
										<figure className="mr-5 self-start">
											<img
												src={uri ? uri : "https://res.cloudinary.com/isuruieee/image/upload/v1676888531/125451487-not-available-stamp-seal-watermark-with-distress-style-blue-vector-rubber-print-of-not-available_alfwie.webp"}
												alt={name}
												height={50}
												width={50}
												objectFit="cover"
												className="rounded-2lg"
												loading="lazy"
											/>
										</figure>

										<div>
											<h3 className="font-display text-jacarta-700 mb-1 text-base font-semibold dark:text-white">
												{name}
											</h3>
											<span className="dark:text-jacarta-200 text-jacarta-500 mb-3 block text-sm">
											{basicEvent} for {priceVal} AVAX 
											</span>
											<span className="text-jacarta-300 block text-xs">{createdattime}</span>
										</div>

										<div className="dark:border-jacarta-600 border-jacarta-100 ml-auto rounded-full border p-3">
											<svg className="icon fill-jacarta-700 dark:fill-white h-6 w-6">
												{basicEvent ==="All" ? <use xlinkHref={`/icons.svg#icon-bids`}></use> : null}
												{basicEvent ==="List" ? <use xlinkHref={`/icons.svg#icon-listing`}></use> : null}
												{basicEvent ==="Mint" ? <use xlinkHref={`/icons.svg#icon-purchases`}></use> : null}
												{basicEvent ==="Transfer" ? <use xlinkHref={`/icons.svg#icon-transfer`}></use> : null}
											</svg>
										</div>
									</a>
								</Link>
							);
						})}
					</div>

					{/* <!-- Filters --> */}
					<aside className="basis-4/12 lg:pl-5">
						<form action="search" className="relative mb-12 block" onSubmit={handleSubmit}>
							<input
								type="search"
								className="text-jacarta-700 placeholder-jacarta-500 focus:ring-accent border-jacarta-100 w-full rounded-2xl border py-[0.6875rem] px-4 pl-10 dark:border-transparent dark:bg-white/[.15] dark:text-white dark:placeholder-white"
								placeholder="Search"
								value={inputText}
								onChange={(e) => setInputText(e.target.value)}
							/>
							<button
								type="submit"
								className="absolute left-0 top-0 flex h-full w-12 items-center justify-center rounded-2xl"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									width="24"
									height="24"
									className="fill-jacarta-500 h-4 w-4 dark:fill-white"
								>
									<path fill="none" d="M0 0h24v24H0z"></path>
									<path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"></path>
								</svg>
							</button>
						</form>

						<h3 className="font-display text-jacarta-500 mb-4 font-semibold dark:text-white">
							Filters
						</h3>
						<div className="flex flex-wrap">
							{filterData ? filterData.map((category, i) => {
								return (
									<button
										className={
											filterVal === i
												? 'dark:border-jacarta-600 group bg-accent border-jacarta-100 mr-2.5 mb-2.5 inline-flex items-center rounded-xl border px-4 py-3 border-transparent text-white dark:border-transparent'
												: 'dark:border-jacarta-600 dark:bg-jacarta-700 group dark:hover:bg-accent hover:bg-accent border-jacarta-100 mr-2.5 mb-2.5 inline-flex items-center rounded-xl border bg-white px-4 py-3 hover:border-transparent hover:text-white dark:text-white dark:hover:border-transparent'
										}
										key={i}
										onClick={() => {
											handleFilter(category);
											setFilterVal(i);
										}}
									>
										<svg
											className={
												filterVal === i
													? 'icon mr-2 h-4 w-4 fill-white'
													: 'icon fill-jacarta-700 mr-2 h-4 w-4 group-hover:fill-white dark:fill-white'
											}
										>
											{category ==="All" ? <use xlinkHref={`/icons.svg#icon-bids`}></use> : null}
											{category ==="List" ? <use xlinkHref={`/icons.svg#icon-listing`}></use> : null}
											{category ==="Mint" ? <use xlinkHref={`/icons.svg#icon-purchases`}></use> : null}
											{category ==="Transfer" ? <use xlinkHref={`/icons.svg#icon-transfer`}></use> : null}
										</svg>
										<span className="text-2xs font-medium capitalize">{category}</span>
									</button>
								);
							}) : null}
						</div>
					</aside>
				</div>
			</div>
		</>
	);
};

export default Activity_item;
