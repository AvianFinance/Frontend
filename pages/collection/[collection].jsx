import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { collection_item_data } from '../../data/collection_data';
import Auctions_dropdown from '../../components/dropdown/Auctions_dropdown';
import Social_dropdown from '../../components/dropdown/Social_dropdown';
import Collection_items from '../../components/collectrions/Collection_items';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import Meta from '../../components/Meta';
import { getbuycollection, getrentalcollection } from "../../api/buynft"
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import { CopyToClipboard } from 'react-copy-to-clipboard';
import CircularProgress from '@mui/material/CircularProgress';
import { isloading } from "../../redux/counterSlice";

const Collection = () => {
	const { sortedtrendingCategoryItemData, isloading } = useSelector(
		(state) => state.counter
	  );
	const [likesImage, setLikesImage] = useState(false);
	const { exploretype } = useSelector((state) => state.counter);
	const router = useRouter();
	const pid = router.query.collection;
	const [localisloading, setisLoading] = useState(false)
	const [collection, setcollection] = useState([])
	const [collectiondetails, setcollectiondetails] = useState()
	const [copied, setCopied] = useState(false);
	console.log(exploretype)

	const handleLikes = () => {
		if (!likesImage) {
			setLikesImage(true);
		} else {
			setLikesImage(false);
		}
	};

	useEffect(() => {
		if (!exploretype) {
			router.push('/')
		}
		setisLoading(true)
		if (pid && exploretype === "rent") {
			getrentalcollection(pid)
				.then((response) => {
					if(response.data){
						setcollection(response.data)
						setcollectiondetails((typeof(response.data) !== "undefined" && response.data.collection !== null) ? response.data.collection : nill)
						setisLoading(false)
					} else {
						console.log("error in getrentalcollection")
					}
				})
		}
		if (pid && exploretype === "buy") {
			getbuycollection(pid)
				.then((response) => {
					if (response.data){
						setcollectiondetails(response.data.collection)
						setcollection(response.data.token)
						setisLoading(false)
					} else{
						console.log("error in getbuycollection")
					}
				})
		}
	}, [pid, exploretype]);
	let val = collectiondetails ? collectiondetails.coverImage : "/images/gradient_dark.jpg"
	let createdat = collectiondetails ? collectiondetails.createdAt.split("-")[0] : null
	let collectionaddress = collectiondetails ? collectiondetails._id : null
	let name = collectiondetails ? collectiondetails.name : null
	return (
		<>
			<Meta title={`collection || Arctix | NFT Marketplace Next.js Template`} />

			<div className="pt-[5.5rem] lg:pt-24">
				{/* <!-- Banner --> */}
				<div className="relative h-[300px]">
					<img
						src={val}
						alt="banner"
						className='h-full w-full'
						objectFit="cover"
					/>
				</div>
				{/* <!-- end banner --> */}

				{/* <!-- Profile --> */}
				<div className="container">
					<div className="text-center">
						<h2 className="font-display text-jacarta-700 mb-2 text-4xl font-medium dark:text-white pb-5 pt-5">
							<span className=" font-display font-semibold">{exploretype === "rent" ? "Rent From      " : "Buy From    "}</span><span className="text-accent font-display font-semibold">{name ? name : null}</span>
						</h2>
						{collectionaddress ? <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100  inline-flex items-center justify-center rounded-full border bg-white py-1.5 px-4">
							<Tippy content="ETH">
								<svg className="icon h-4 w-4 mr-1">
									<use xlinkHref="/icons.svg#icon-ETH"></use>
								</svg>
							</Tippy>

							<Tippy
								hideOnClick={false}
								content={copied ? <span>copied</span> : <span>copy</span>}
							>
								<button className="js-copy-clipboard dark:text-jacarta-200 max-w-[10rem] select-none overflow-hidden text-ellipsis whitespace-nowrap">
									<CopyToClipboard text={collectionaddress} onCopy={() => setCopied(true)}>
										<span>{collectionaddress}</span>
									</CopyToClipboard>
								</button>
							</Tippy>
						</div> : null}

						{/* <p className="dark:text-jacarta-300 mx-auto mb-2 max-w-xl text-lg"></p>
								{createdat ? <span className="text-jacarta-400">Joined December {createdat}</span> : null} */}

						{/* <div className="mt-6 flex items-center justify-center space-x-2.5 relative"> */}
						{/* <div className="dark:border-jacarta-600 dark:hover:bg-jacarta-600 border-jacarta-100 hover:bg-jacarta-100 dark:bg-jacarta-700 rounded-xl border bg-white">
										<div className="js-likes relative inline-flex h-10 w-10 cursor-pointer items-center justify-center text-sm">
											<button onClick={() => handleLikes()}>
												{likesImage ? (
													<svg className="icon dark:fill-jacarta-200 fill-jacarta-500 h-4 w-4">
														<use xlinkHref="/icons.svg#icon-heart-fill"></use>
													</svg>
												) : (
													<svg className="icon dark:fill-jacarta-200 fill-jacarta-500 h-4 w-4">
														<use xlinkHref="/icons.svg#icon-heart"></use>
													</svg>
												)}
											</button>
										</div>
									</div> */}
						{/* 
									<Social_dropdown />

									<Auctions_dropdown classes="dark:border-jacarta-600 dark:hover:bg-jacarta-600 border-jacarta-100 dropdown hover:bg-jacarta-100 dark:bg-jacarta-700 rounded-xl border bg-white relative" /> */}
						{/* </div> */}
					</div>
				</div>

			</div>

			<div className={isloading ? 'modal fade show block' : 'modal fade'}>
				<div className="modal-dialog max-w-xxl">
				<div className="modal-content">
					<div className="modal-header">
					<h5 className="modal-title" id="addPropertiesLabel">
						{exploretype=="buy" ? 'Processing for NFT Buying' : 'Processing for NFT Renting'}
					</h5>
					</div>
					<div className='modal-body p-6'>
					<div className="flex justify-center items-center">
						<CircularProgress/>
					</div>
					</div>
				</div>
				</div>
			</div>

			<Collection_items collection={collection} isloading={localisloading} collectiondetails={collectiondetails} />
		</>
	);
};

export default Collection;
