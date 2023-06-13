import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { items_data } from '../../data/items_data';
import Auctions_dropdown from '../../components/dropdown/Auctions_dropdown';
import Link from 'next/link';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Items_Countdown_timer from '../../components/items_countdown_timer';
import { ItemsTabs } from '../../components/component';
import More_items from './more_items';
import Likes from '../../components/likes';
import Meta from '../../components/Meta';
import { useDispatch } from 'react-redux';
import { buyModalShow, listbuyModalShow, listrentModalShow, listinstallmentModalShow, showToast, setisLoading, isloading } from '../../redux/counterSlice';
import {
	useSigner,
	useAccount,
	useConnect,
	useDisconnect,
} from 'wagmi'
import { ethers } from "ethers";
import { getNFTDetails, getNFTactivities } from "../../api/nft";
import { isMounted } from "../../scripts/isMounted"
import RimeRent from "../../contracts/AVFXRent.sol/AVFXRent.json"
import AIE_Proxy from "../../contracts/AIEProxy.sol/AIE_Proxy.json"
import { iexchange_token }  from "../../utils/contracts";
import AvianRentMarket from "../../contracts/ERC4907.sol/ERC4907.json"
import CircularProgress from '@mui/material/CircularProgress';

const Item = () => {
	const mounted = isMounted()
	const dispatch = useDispatch();
	const router = useRouter();
	const { address } = useAccount()
	const pid = router.query.item;

	const [imageModal, setImageModal] = useState(false);
	const [ nftdata, setnftdata ] = useState()
	const [ collection, setcollection ] = useState()
	const [ listing, setlisting ] = useState(null)
	const [ activities, setactivities] = useState()
	const { data: signer, isError } = useSigner()
	const provider = new ethers.providers.JsonRpcProvider("https://api.avax-test.network/ext/bc/C/rpc")
	let _marketplace = null
	const [expirytime, setexprytime] = useState(null)
	const [isLoading, setisLoading] = useState(false)
	let next_installement

	useEffect(() => {
		if(pid){
			let address = pid.split("&")[0]
			let tokenId = pid.split("&")[1]
			getNFTDetails(address,tokenId)
				.then(async (res) => {
					if(res.data){
						
						console.log(res.data)
						if(res.data){
							if(res.data.nft.token_type === "ERC4907"){
								_marketplace = new ethers.Contract( // We will use this to interact with the AuctionManager
									res.data.nft.coll_addr,
									AvianRentMarket.abi,
									provider
								);
								console.log(_marketplace)
								let expiration= await _marketplace.userExpires(res.data.nft.token_id)
								expirytime = parseInt((expiration._hex), 16)
								setexprytime(expirytime)
	
							}
							setnftdata(res.data.nft)
							setcollection(res.data.collection)
							setlisting(res.data.listing ? res.data.listing[0] : null)
						}
						
						
					} else {
						console.log("error in fetching nft details")
					}
				})
			getNFTactivities(address,tokenId)
				.then((res) => {
					if (res.data){
						setactivities(res.data)
					} else{
						console.log("error in getNFTactivities")
					}
					
				})
		}	
	}, [pid, expirytime, isloading])

	const calInstallment = async () => {
		if(nftdata){
			let mplace_contract = new ethers.Contract(iexchange_token, AIE_Proxy.abi, signer)
			let tokencontract = new ethers.Contract( // We will use this to interact with the AuctionManager
				nftdata.coll_addr,
				RimeRent.abi,
				provider
			);
			next_installement = (await mplace_contract.getNftInstallment(tokencontract.address, nftdata.token_id, 1));
			console.log("next_installement", next_installement.toString())
			console.log("next_installement", next_installement ** Math.pow(10, -18))
		}
		
	}

	const buyNFT = async () => {
		setisLoading(true)
		try {
			let mplace_contract = new ethers.Contract(iexchange_token, AIE_Proxy.abi, signer)
			let tokencontract = new ethers.Contract( // We will use this to interact with the AuctionManager
				nftdata.coll_addr,
				RimeRent.abi,
				provider
			);

			await mplace_contract.payNFTIns(tokencontract.address, nftdata.token_id,{
				value: next_installement.toString(),
			})

			let expiration= await _marketplace.userExpires(res.data.nft.token_id)
			expirytime = parseInt((expiration._hex), 16)
			setexprytime(expirytime)
			
			dispatch(showToast(["success","Installment Paid!"]))
		} catch(error){
			console.log(error.reason)
			dispatch(showToast(["error",error.reason]))
		}	
		setisLoading(false)
		window.location.reload(false);
	}

	let image 
	let title
	let id 
	let likes 
	let text 
	let creatorImage 
	let ownerImage 
	let creatorname 
	let ownerName
	let price 
	let auction_timer
	let tokentype
	let rent_listed_status
	let sell_listed_status
	let inst_listed_status
	let owner
	let user
	
	if(nftdata){
		image = nftdata.uri
		title = nftdata.name
		id = nftdata._id
		likes = 100
		text = nftdata.desc
		creatorImage = nftdata.desc
		ownerImage = "/images/avatars/avatar_1.jpg"
		creatorname = "/images/avatars/avatar_7.jpg"
		ownerName = "Wow Fans"
		price = 100
		auction_timer = nftdata.expiry ? parseInt((nftdata.expiry._hex), 16) : '636234213'
		tokentype = nftdata.token_type
		rent_listed_status = nftdata.rent_listed_status
		sell_listed_status = nftdata.sell_listed_status
		inst_listed_status = nftdata.inst_listed_status
		owner = nftdata.owner
		user = nftdata.user
	}

	if(inst_listed_status === false && typeof(listing) != "undefined" && listing.inst_status === "PAYING"){
		calInstallment()
	}

	if(nftdata){
		let item
		if(rent_listed_status){
			item = {
				uri : nftdata.uri,
				name : nftdata.name,
				pricePerDay :listing.pricePerDay,
				coll_addr: nftdata.coll_addr,
				token_id: nftdata.token_id,
				type: listing.type
			}
		} else if(inst_listed_status) {
			item = {
				uri : nftdata.uri,
				name : nftdata.name,
				pricePerDay :listing.pricePerDay,
				coll_addr: nftdata.coll_addr,
				token_id: nftdata.token_id,
				type: listing.type
			}
		} else if(sell_listed_status) {
			item = {
				uri : nftdata.uri,
				name : nftdata.name,
				price : listing.price,
				coll_addr: nftdata.coll_addr,
				token_id: nftdata.token_id,
				type: listing.type
			}
		} else if (inst_listed_status===false && typeof(listing) != "undefined"){
			item = {
				uri : nftdata.uri,
				name : nftdata.name,
				pricePerDay :listing.pricePerDay,
				coll_addr: nftdata.coll_addr,
				token_id: nftdata.token_id,
				type: listing.type
			}
		} else {
			item = {
				tokenUriRes : {
					description : nftdata.desc,
					image : nftdata.uri,
					name : nftdata.name,
					token: nftdata.token_type
				},
				token_address : nftdata.coll_addr,
				token_id : nftdata.token_id
			}
		}
		if(!isLoading){
			return (
				<>
					<Meta title={`NFT Details || Xhibiter | NFT Marketplace Next.js Template`} />
					{/*  <!-- Item --> */}
					<section className="relative lg:mt-24 lg:pt-24 lg:pb-24 mt-24 pt-12 pb-24">
						<picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
							<img src={image} alt="gradient" className="h-full" />
						</picture>
						<div className="container">
		
										<div className="md:flex md:flex-wrap" key={id}>
											{/* <!-- Image --> */}
											<figure className="mb-8 md:w-2/5 md:flex-shrink-0 md:flex-grow-0 md:basis-auto lg:w-1/2 w-full">
												<button className=" w-full" onClick={() => setImageModal(true)}>
													<img src={nftdata.uri} alt={title}  className="rounded-2xl cursor-pointer  w-full h-96" />
												</button>
		
												{/* <!-- Modal --> */}
												<div className={imageModal ? 'modal fade show block' : 'modal fade'}>
													<div className="modal-dialog !my-0 flex h-full max-w-4xl items-center justify-center">
														<img src={image} alt={title} className="h-80 w-full rounded-[0.625rem] object-cover" />
													</div>
		
													<button
														type="button"
														className="btn-close absolute top-6 right-6"
														onClick={() => setImageModal(false)}
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															viewBox="0 0 24 24"
															width="24"
															height="24"
															className="h-6 w-6 fill-white"
														>
															<path fill="none" d="M0 0h24v24H0z" />
															<path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
														</svg>
													</button>
												</div>
												{/* <!-- end modal --> */}
											</figure>
		
											{/* <!-- Details --> */}
											<div className="md:w-3/5 md:basis-auto md:pl-8 lg:w-1/2 lg:pl-[3.75rem]">
												{/* <!-- Collection / Likes / Actions --> */}
												<div className="mb-3 flex">
													{/* <!-- Collection --> */}
													<div className="flex items-center">
														<Link href="#">
															<a className="text-accent mr-2 text-sm font-bold">{collection.name}</a>
														</Link>
														{/* <Tippy content={<span>ETH</span>}>
																<span className="-ml-1">
																	<svg className="icon mr-1 h-4 w-4">
																		<use xlinkHref="/icons.svg#icon-ETH"></use>
																	</svg>
																</span>
															</Tippy> */}
															<span className="text-green text-sm font-medium tracking-tight">
																{collection.tokenType}
															</span>
													</div>
		
													{/* <!-- Likes / Actions --> */}
													
												</div>
		
												{/* <h1 className="font-display text-jacarta-700 mb-4 text-4xl font-semibold dark:text-white">
													{nftdata.name}
												</h1> */}
		
												{/* <div className="mb-8 flex items-center space-x-4 whitespace-nowrap">
													<div className="flex items-center">
														<Tippy content={<span>ETH</span>}>
															<span className="-ml-1">
																<svg className="icon mr-1 h-4 w-4">
																	<use xlinkHref="/icons.svg#icon-ETH"></use>
																</svg>
															</span>
														</Tippy>
														<span className="text-green text-sm font-medium tracking-tight">
															{price} ETH
														</span>
													</div>
													<span className="dark:text-jacarta-300 text-jacarta-400 text-sm">
														Highest bid
													</span>
													<span className="dark:text-jacarta-300 text-jacarta-400 text-sm">
														1/1 available
													</span>
												</div>  */}
		
												{/* <p className="dark:text-jacarta-300 mb-10">{text}</p> */}
		
												{/* <!-- Creator / Owner --> */}
												{/*  */}
		
												{/* <!-- Bid --> */}
												<div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 rounded-2lg border bg-white p-8">
													<div className="mb-8 sm:flex sm:flex-wrap">
														{/* <!-- Highest bid --> */}
														<div className="sm:w-1/2 sm:pr-4 lg:pr-8">
															<h1 className="font-display text-jacarta-700 mb-4 text-4xl font-semibold dark:text-white">
																{title}
															</h1>							
														</div>
	
														{tokentype==="ERC4907" ? 
														<>
															{(rent_listed_status === false && typeof(nftdata.expiry) !== "undefined" && typeof(listing) === "undefined") ?  <div className="dark:border-jacarta-600 sm:border-jacarta-100 mt-4 sm:mt-0 sm:w-1/2 sm:border-l sm:pl-4 lg:pl-8">													
																<span className="js-countdown-ends-label text-jacarta-400 dark:text-jacarta-300 text-sm">
																	Rental expires in
																</span>
																<Items_Countdown_timer time={expirytime ? expirytime.toString() : null} />
															</div> : null}
			
															{/* <!-- Countdown --> */}
															{(inst_listed_status === false && typeof(listing) !== "undefined" && listing.inst_status === "PAYING") ?  <div className="dark:border-jacarta-600 sm:border-jacarta-100 mt-4 sm:mt-0 sm:w-1/2 sm:border-l sm:pl-4 lg:pl-8">
																<span className="js-countdown-ends-label text-jacarta-400 dark:text-jacarta-300 text-sm">
																	Installment due in
																</span>
																<Items_Countdown_timer time={expirytime ? expirytime.toString() : null} />
															</div> : null}
														</> : null}
														
													</div>
													<p className="dark:text-jacarta-300 mb-10">{text}</p>
	
													<div className="grid grid-cols-2 gap-[1.875rem]">
													<div className="mb-4 flex">
															<figure className="mr-4 shrink-0">
																<Link href={"/user/"+nftdata.owner.toString()}>
																	<a className="relative block">
																		<img
																			src={nftdata.ownerProfileImage}
																			alt={nftdata.ownerName}
																			className="rounded-2lg h-12 w-12"
																			loading="lazy"
																		/>
																		<div
																			className="dark:border-jacarta-600 bg-green absolute -right-3 top-[60%] flex h-6 w-6 items-center justify-center rounded-full border-2 border-white"
																			data-tippy-content="Verified Collection"
																		>
																			<Tippy content={<span>Verified Collection</span>}>
																				<svg className="icon h-[.875rem] w-[.875rem] fill-white">
																					<use xlinkHref="/icons.svg#icon-right-sign"></use>
																				</svg>
																			</Tippy>
																		</div>
																	</a>
																</Link>
															</figure>
															<div className="flex flex-col justify-center">
																<span className="text-jacarta-400 block text-sm dark:text-white">
																	Owned by
																</span>
																<Link href={"/user/"+nftdata.owner.toString()}>
																	<a className="text-accent block">
																		<span className="text-sm font-bold">{nftdata.ownerName}</span>
																	</a>
																</Link>
															</div>
														</div>
			
														<div className="mb-4 flex">
															<figure className="mr-4 shrink-0">
																<Link href={"/user/"+collection.createdBy.toString()}>
																	<a className="relative block">
																		<img
																			src={collection.creatorProfileImage}
																			alt={collection.creatorName}
																			className="rounded-2lg h-12 w-12"
																			loading="lazy"
																		/>
																		<div
																			className="dark:border-jacarta-600 bg-green absolute -right-3 top-[60%] flex h-6 w-6 items-center justify-center rounded-full border-2 border-white"
																			data-tippy-content="Verified Collection"
																		>
																			<Tippy content={<span>Verified Collection</span>}>
																				<svg className="icon h-[.875rem] w-[.875rem] fill-white">
																					<use xlinkHref="/icons.svg#icon-right-sign"></use>
																				</svg>
																			</Tippy>
																		</div>
																	</a>
																</Link>
															</figure>
															<div className="flex flex-col justify-center">
																<span className="text-jacarta-400 block text-sm dark:text-white">
																	Created by
																</span>
																<Link href={"/user/"+collection.createdBy.toString()}>
																	<a className="text-accent block">
																		<span className="text-sm font-bold">{collection.creatorName}</span>
																	</a>
																</Link>
															</div>
														</div>
													</div>
		
													{(inst_listed_status === false && typeof(listing) != "undefined" && listing.inst_status === "PAYING") && user===address ? <Link href="#">
														<button
															className="bg-accent shadow-accent-volume hover:bg-accent-dark inline-block w-full rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
															onClick={buyNFT}
															disabled={isLoading}
														>
															Pay Next Installment {(next_installement ** Math.pow(10, -18))} AVAX 
														</button>
													</Link> : null}
	
													{/* {(inst_listed_status === true && owner !== address) ? <Link href="#">
														<button
															className="bg-accent shadow-accent-volume hover:bg-accent-dark inline-block w-full rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
															onClick={() => dispatch(buyModalShow(item))}
														>
															Installment Rental
														</button>
													</Link> : null}
	
													{(rent_listed_status === true && owner !== address) ? <Link href="#">
														<button
															className="bg-accent shadow-accent-volume hover:bg-accent-dark inline-block w-full rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
															onClick={() => dispatch(buyModalShow(item))}
														>
															Upright Rental
														</button>
													</Link> : null}
	
													{( sell_listed_status === true && owner !== address) ? <Link href="#">
														<button
															className="bg-accent shadow-accent-volume hover:bg-accent-dark inline-block w-full rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
															onClick={() => dispatch(buyModalShow(item))}
														>
															Buy
														</button>
													</Link> : null}
	
													{(sell_listed_status === false && rent_listed_status === false && inst_listed_status === false && owner === address ) ? <>
														{tokentype === " ERC721" ? 
														<>
															<button
																className="bg-accent shadow-accent-volume hover:bg-accent-dark inline-block w-full rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
																onClick={() => dispatch(listrentModalShow(item))}
															>
																List as Upright
															</button>
															<button
																className="bg-accent shadow-accent-volume hover:bg-accent-dark inline-block w-full rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
																onClick={() => dispatch(listinstallmentModalShow(item))}
															>
																List as Installment
															</button> 
														</>: 
														<button
															className="bg-accent shadow-accent-volume hover:bg-accent-dark inline-block w-full rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
															onClick={() => dispatch(listbuyModalShow(item))}
														>
															List as sell
														</button>}
													</> : null} */}
	
													{/* {(tokentype === "721" && sell_listed_status === true && owner === address ) ? <Link href="#">
														<button
															className="bg-accent shadow-accent-volume hover:bg-accent-dark inline-block w-full rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
															onClick={() => dispatch(bidsModalShow())}
														>
															List as sell
														</button>
													</Link> : null} */}
												</div>
												{/* <!-- end bid --> */}
											</div>
											{/* <!-- end details --> */}
										</div>
	
							{nftdata ? <ItemsTabs nftdata={nftdata} activities={activities}/> : null }
						</div>
					</section>
					{/* <!-- end item --> */}
	{/* 	
					<More_items address={collection._id}/> */}
				</>
			);
		} else{
			return(<div>
                <div className='modal fade show block'>
                    <div className="modal-dialog max-w-xxl">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="addPropertiesLabel">
                                    Waiting for payment...
                                </h5>
                            </div>
                            <div className='modal-body p-6'>
                                <div className="flex justify-center items-center">
                                    <CircularProgress />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
		}
		
	} else{
		return (
			<>
				<Meta title={`${pid} || Xhibiter | NFT Marketplace Next.js Template`} />
				{/*  <!-- Item --> */}
				<section className="relative lg:mt-24 lg:pt-24 lg:pb-24 mt-24 pt-12 pb-24">
					<picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
						<img src="/images/gradient_light.jpg" alt="gradient" className="h-full" />
					</picture>
					<div className="container">
						{/* <!-- Item --> */}
						{items_data
							.filter((item) => item.id === pid)
							.map((item) => {
								const {
									image,
									title,
									id,
									likes,
									text,
									creatorImage,
									ownerImage,
									creatorname,
									ownerName,
									price,
									auction_timer,
								} = item;
	
								return (
									<div className="md:flex md:flex-wrap" key={id}>
										{/* <!-- Image --> */}
										<figure className="mb-8 md:w-2/5 md:flex-shrink-0 md:flex-grow-0 md:basis-auto lg:w-1/2 w-full">
											<button className=" w-full" onClick={() => setImageModal(true)}>
												<img src={image} alt={title} className="rounded-2xl cursor-pointer  w-full" />
											</button>
	
											{/* <!-- Modal --> */}
											<div className={imageModal ? 'modal fade show block' : 'modal fade'}>
												<div className="modal-dialog !my-0 flex h-full max-w-4xl items-center justify-center">
													<img src={image} alt={title} className="h-full rounded-2xl" />
												</div>
	
												<button
													type="button"
													className="btn-close absolute top-6 right-6"
													onClick={() => setImageModal(false)}
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 24 24"
														width="24"
														height="24"
														className="h-6 w-6 fill-white"
													>
														<path fill="none" d="M0 0h24v24H0z" />
														<path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
													</svg>
												</button>
											</div>
											{/* <!-- end modal --> */}
										</figure>
	
										{/* <!-- Details --> */}
										<div className="md:w-3/5 md:basis-auto md:pl-8 lg:w-1/2 lg:pl-[3.75rem]">
											{/* <!-- Collection / Likes / Actions --> */}
											<div className="mb-3 flex">
												{/* <!-- Collection --> */}
												<div className="flex items-center">
													<Link href="#">
														<a className="text-accent mr-2 text-sm font-bold">CryptoGuysNFT</a>
													</Link>
													<span
														className="dark:border-jacarta-600 bg-green inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white"
														data-tippy-content="Verified Collection"
													>
														<Tippy content={<span>Verified Collection</span>}>
															<svg className="icon h-[.875rem] w-[.875rem] fill-white">
																<use xlinkHref="/icons.svg#icon-right-sign"></use>
															</svg>
														</Tippy>
													</span>
												</div>
	
												{/* <!-- Likes / Actions --> */}
												
											</div>
	
											<h1 className="font-display text-jacarta-700 mb-4 text-4xl font-semibold dark:text-white">
												{title}
											</h1>
	
											<div className="mb-8 flex items-center space-x-4 whitespace-nowrap">
												<div className="flex items-center">
													<Tippy content={<span>ETH</span>}>
														<span className="-ml-1">
															<svg className="icon mr-1 h-4 w-4">
																<use xlinkHref="/icons.svg#icon-ETH"></use>
															</svg>
														</span>
													</Tippy>
													<span className="text-green text-sm font-medium tracking-tight">
														{price} ETH
													</span>
												</div>
												<span className="dark:text-jacarta-300 text-jacarta-400 text-sm">
													Highest bid
												</span>
												<span className="dark:text-jacarta-300 text-jacarta-400 text-sm">
													1/1 available
												</span>
											</div>
	
											<p className="dark:text-jacarta-300 mb-10">{text}</p>
	
											{/* <!-- Creator / Owner --> */}
											<div className="mb-8 flex flex-wrap">
												<div className="mr-8 mb-4 flex">
													<figure className="mr-4 shrink-0">
														<Link href="/user/avatar_6">
															<a className="relative block">
																<img
																	src={creatorImage}
																	alt={creatorname}
																	className="rounded-2lg h-12 w-12"
																	loading="lazy"
																/>
																<div
																	className="dark:border-jacarta-600 bg-green absolute -right-3 top-[60%] flex h-6 w-6 items-center justify-center rounded-full border-2 border-white"
																	data-tippy-content="Verified Collection"
																>
																	<Tippy content={<span>Verified Collection</span>}>
																		<svg className="icon h-[.875rem] w-[.875rem] fill-white">
																			<use xlinkHref="/icons.svg#icon-right-sign"></use>
																		</svg>
																	</Tippy>
																</div>
															</a>
														</Link>
													</figure>
													<div className="flex flex-col justify-center">
														<span className="text-jacarta-400 block text-sm dark:text-white">
															Creator <strong>10% royalties</strong>
														</span>
														<Link href="/user/avatar_6">
															<a className="text-accent block">
																<span className="text-sm font-bold">{creatorname}</span>
															</a>
														</Link>
													</div>
												</div>
	
												<div className="mb-4 flex">
													<figure className="mr-4 shrink-0">
														<Link href="/user/avatar_6">
															<a className="relative block">
																<img
																	src={ownerImage}
																	alt={ownerName}
																	className="rounded-2lg h-12 w-12"
																	loading="lazy"
																/>
																<div
																	className="dark:border-jacarta-600 bg-green absolute -right-3 top-[60%] flex h-6 w-6 items-center justify-center rounded-full border-2 border-white"
																	data-tippy-content="Verified Collection"
																>
																	<Tippy content={<span>Verified Collection</span>}>
																		<svg className="icon h-[.875rem] w-[.875rem] fill-white">
																			<use xlinkHref="/icons.svg#icon-right-sign"></use>
																		</svg>
																	</Tippy>
																</div>
															</a>
														</Link>
													</figure>
													<div className="flex flex-col justify-center">
														<span className="text-jacarta-400 block text-sm dark:text-white">
															Owned by
														</span>
														<Link href="/user/avatar_6">
															<a className="text-accent block">
																<span className="text-sm font-bold">{ownerName}</span>
															</a>
														</Link>
													</div>
												</div>
											</div>
	
											{/* <!-- Bid --> */}
											<div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 rounded-2lg border bg-white p-8">
												<div className="mb-8 sm:flex sm:flex-wrap">
													{/* <!-- Highest bid --> */}
													<div className="sm:w-1/2 sm:pr-4 lg:pr-8">
														<div className="block overflow-hidden text-ellipsis whitespace-nowrap">
															<span className="dark:text-jacarta-300 text-jacarta-400 text-sm">
																Highest bid by{' '}
															</span>
															<Link href="/user/avatar_6">
																<a className="text-accent text-sm font-bold">
																	0x695d2ef170ce69e794707eeef9497af2de25df82
																</a>
															</Link>
														</div>
														<div className="mt-3 flex">
															<figure className="mr-4 shrink-0">
																<Link href="#">
																	<a className="relative block">
																		<img
																			src="/images/avatars/avatar_4.jpg"
																			alt="avatar"
																			className="rounded-2lg h-12 w-12"
																			loading="lazy"
																		/>
																	</a>
																</Link>
															</figure>
															<div>
																<div className="flex items-center whitespace-nowrap">
																	<Tippy content={<span>ETH</span>}>
																		<span className="-ml-1">
																			<svg className="icon mr-1 h-4 w-4">
																				<use xlinkHref="/icons.svg#icon-ETH"></use>
																			</svg>
																		</span>
																	</Tippy>
																	<span className="text-green text-lg font-medium leading-tight tracking-tight">
																		{price} ETH
																	</span>
																</div>
																<span className="dark:text-jacarta-300 text-jacarta-400 text-sm">
																	~10,864.10
																</span>
															</div>
														</div>
													</div>
	
													{/* <!-- Countdown --> */}
													<div className="dark:border-jacarta-600 sm:border-jacarta-100 mt-4 sm:mt-0 sm:w-1/2 sm:border-l sm:pl-4 lg:pl-8">
														<span className="js-countdown-ends-label text-jacarta-400 dark:text-jacarta-300 text-sm">
															Auction ends in
														</span>
														<Items_Countdown_timer time={+auction_timer} />
													</div>
												</div>
	
												<Link href="#">
													<button
														className="bg-accent shadow-accent-volume hover:bg-accent-dark inline-block w-full rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
														onClick={() => dispatch(bidsModalShow())}
													>
														Place Bid
													</button>
												</Link>
											</div>
											{/* <!-- end bid --> */}
										</div>
										{/* <!-- end details --> */}
									</div>
								);
							})}
						{nftdata ? <ItemsTabs nftdata={nftdata}/> : null }
					</div>
				</section>
				{/* <!-- end item --> */}
{/* 	
				<More_items /> */}
			</>
		);
	}
	
};

export default Item;
