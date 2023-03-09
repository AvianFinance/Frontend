import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Feature_collections_data from '../../data/Feature_collections_data';
import { useSelector, useDispatch } from 'react-redux';
import { buyModalHide } from "../../redux/counterSlice";

const Explore_collection_item = ({itemFor, collections}) => {
	const { sortedCollectionData, exploretype } = useSelector((state) => state.counter);
	console.log("data are---------------------------------", sortedCollectionData)
	const [itemData, setItemData] = useState([]);
	const dispatch = useDispatch();
	useEffect(() => {
		console.log("first useeffect")
		if (itemFor === 'userPage') {
			setItemData(collections);
		} else {
			setItemData(collections);
		}
	}, [sortedCollectionData, itemFor]);

	useEffect(() => {
		console.log("second useeffect")
		dispatch(buyModalHide())
		console.log("loading nft data")
		console.log(collections)
		console.log(exploretype)
		setItemData(collections);
	},[exploretype, collections]);
	console.log(itemData)
	if(itemData.length>0){
		return (
			<>
				{itemData.map((item) => {
					const id = item._id
					const bigImage = item.tokens[0]
					const subImage1 = item.tokens[1]
					const subImage2 = item.tokens[2]
					const subImage3 = item.tokens[3]
					const userImage = "/images/avatars/owner_5.png"
					const title = item.name
					const itemsCount = item.count
					const userName = "NFT stars"
					return (
						<article key={id}>
							<div className="dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2xl border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg">
								<Link href={"/collection/"+id.toString()}>
									<a className="flex space-x-[0.625rem]">
										{item.tokens.length>=1 ? <span className="w-[74.5%]">
											<img
												src={bigImage}
												alt="item 1"
												className="h-80 w-full rounded-[0.625rem] object-cover"
												loading="lazy"
											/>
										</span> : <span className="w-[100%]">
											<img
												src="https://res.cloudinary.com/isuruieee/image/upload/v1676888531/125451487-not-available-stamp-seal-watermark-with-distress-style-blue-vector-rubber-print-of-not-available_alfwie.webp"
												alt="item 1"
												className="h-full w-full rounded-[0.625rem] object-cover"
												loading="lazy"
											/>
										</span>}
										{item.tokens.length>=4 ? <span className="flex w-1/3 flex-col space-y-[0.625rem]">
											<img
												src={subImage1}
												alt="item 1"
												className="h-full rounded-[0.625rem] object-cover"
												loading="lazy"
											/>
											<img
												src={subImage2}
												alt="item 1"
												className="h-full  rounded-[0.625rem] object-cover"
												loading="lazy"
											/>
											<img
												src={subImage3}
												alt="item 1"
												className="h-full rounded-[0.625rem] object-cover"
												loading="lazy"
											/>
										</span> : null }
									</a>
								</Link>
		
								<Link href={"/collection/"+id.toString()}>
									<a className="font-display hover:text-accent dark:hover:text-accent text-jacarta-700 mt-4 block text-base dark:text-white">
										{title}
									</a>
								</Link>
		
								<div className="mt-2 flex items-center justify-between text-sm font-medium tracking-tight">
									<div className="flex flex-wrap items-center">
										<Link href="/user/avatar_6">
											<a className="mr-2 shrink-0">
												<img src={userImage} alt="owner" className="h-5 w-5 rounded-full" />
											</a>
										</Link>
										<span className="dark:text-jacarta-400 mr-1">by</span>
										<Link href="/user/avatar_6">
											<a className="text-accent">
												<span>{userName}</span>
											</a>
										</Link>
									</div>
									<span className="dark:text-jacarta-300 text-sm">{itemsCount} Items</span>
								</div>
							</div>
						</article>
					);
				})}
			</>
		);
	} else {
		return (
			<>
				{itemData.map((item) => {
					const {
						id,
						bigImage,
						subImage1,
						subImage2,
						subImage3,
						userImage,
						title,
						itemsCount,
						userName,
					} = item;
					return (
						<article key={id}>
							<div className="dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2xl border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg">
								<Link href="/collection/avatar_1">
									<a className="flex space-x-[0.625rem]">
										<span className="w-[74.5%]">
											<img
												src={bigImage}
												alt="item 1"
												className="h-full w-full rounded-[0.625rem] object-cover"
												loading="lazy"
											/>
										</span>
										<span className="flex w-1/3 flex-col space-y-[0.625rem]">
											<img
												src={subImage1}
												alt="item 1"
												className="h-full rounded-[0.625rem] object-cover"
												loading="lazy"
											/>
											<img
												src={subImage2}
												alt="item 1"
												className="h-full rounded-[0.625rem] object-cover"
												loading="lazy"
											/>
											<img
												src={subImage3}
												alt="item 1"
												className="h-full rounded-[0.625rem] object-cover"
												loading="lazy"
											/>
										</span>
									</a>
								</Link>
	
								<Link href="/collection/avatar_1">
									<a className="font-display hover:text-accent dark:hover:text-accent text-jacarta-700 mt-4 block text-base dark:text-white">
										{title}
									</a>
								</Link>
	
								<div className="mt-2 flex items-center justify-between text-sm font-medium tracking-tight">
									<div className="flex flex-wrap items-center">
										<Link href="/user/avatar_6">
											<a className="mr-2 shrink-0">
												<img src={userImage} alt="owner" className="h-5 w-5 rounded-full" />
											</a>
										</Link>
										<span className="dark:text-jacarta-400 mr-1">by</span>
										<Link href="/user/avatar_6">
											<a className="text-accent">
												<span>{userName}</span>
											</a>
										</Link>
									</div>
									<span className="dark:text-jacarta-300 text-sm">{itemsCount} Items</span>
								</div>
							</div>
						</article>
					);
				})}
			</>
		);
	}
};

export default Explore_collection_item;
