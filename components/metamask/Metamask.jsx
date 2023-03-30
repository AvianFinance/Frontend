import React, {useEffect} from 'react';
import { useMetaMask } from 'metamask-react';
import { useDispatch } from 'react-redux';
import { walletModalShow } from '../../redux/counterSlice';
import Image from 'next/image';
import { ethers } from "ethers";
import {
	useSigner,
	useAccount,
	useConnect,
	useDisconnect,
} from 'wagmi'
import { useSelector } from 'react-redux';
import { isMounted } from "../../scripts/isMounted"

import AvianSellMarket from "../../contracts/ASEProxy.sol/ASE_Proxy.json"
import AvianRentMarket from "../../contracts/AREProxy.sol/ARE_Proxy.json"
import RimeRent from "../../contracts/AVFXRent.sol/AVFXRent.json"
import RimeToken from "../../contracts/AVFXGeneral.sol/AVFXGeneral.json"
import AIE_Proxy from "../../contracts/AIEProxy.sol/AIE_Proxy.json"

import { selxchange_token, rexchange_token, iexchange_token, rime_token, rime_rent }  from "../../utils/contracts";
import { registerUser } from "../../api/user"
import { showToast, buyModalHide, buylistModalHide, rentlistModalHide, installmentModalHide, setisloading } from '../../redux/counterSlice';

const Metamask_comp_text = () => {
	const mountedcontent = isMounted
	const { address, isConnected } = useAccount()
	const { connect, connectors, error, isLoading, pendingConnector } =
		useConnect()
	const { disconnect } = useDisconnect()

	useEffect(() => {
		registerUser(address)
			.then((response) => {
				console.log(response)
			})
	}, [address]);

	if (isConnected) {
		return ( mountedcontent ?
			<button
				className="js-wallet bg-accent shadow-accent-volume hover:bg-accent-dark block w-full rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
				onClick={disconnect}
			>
				Disconnect
			</button> : null
		)
	  }

	if (!isConnected) {
		return ( mountedcontent ?
			connectors.map((connector) => (
				<button
					disabled={!connector.ready}
					key={connector.id}
					onClick={async () => {
						// register({ connector })
						await connect({ connector })
						// console.log(address)
						// register(address)
						// 	.then((response) => {
						// 	console.log(response)
						// 	})
					}}
					className="js-wallet bg-accent shadow-accent-volume hover:bg-accent-dark block w-full rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
				>
					Connect
				</button>
				)) : null
		)
	}
};

const Metamask_comp_login = () => {
	const mountedcontent = isMounted
	const { address, isConnected } = useAccount()
	const { connect, connectors, error, isLoading, pendingConnector } =
		useConnect()
	const { disconnect } = useDisconnect()

	useEffect(() => {
		registerUser(address)
			.then((response) => {
				console.log(response)
			})
	}, [address]);

	if (isConnected) {
		return ( mountedcontent ? 
			<button
				className="js-wallet bg-accent shadow-accent-volume hover:bg-accent-dark block w-full rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
				onClick={disconnect}
			>
				Disconnect
			</button> : null
		)
	  }

	if (!isConnected) {
		return (
			connectors.map((connector) => ( mountedcontent ? 
				<button
					disabled={!connector.ready}
					key={connector.id}
					onClick={async () => {
						// register({ connector })
						await connect({ connector })
						// console.log(address)
						// register(address)
						// 	.then((response) => {
						// 	console.log(response)
						// 	})
					}}
				>
					Connect 
				</button> : null
				))
		)
	}
	// const { status, connect, account, chainId, ethereum } = useMetaMask();

	// if (status === 'initializing')
	// 	return (
	// 		<button className="js-wallet bg-accent hover:bg-accent-dark mb-4 flex w-full items-center justify-center rounded-full border-2 border-transparent py-4 px-8 text-center font-semibold text-white transition-all">
	// 			<Image
	// 				src="/images/wallets/metamask_24.svg"
	// 				className="mr-2.5 inline-block h-6 w-6"
	// 				alt=""
	// 				height={24}
	// 				width={24}
	// 			/>
	// 			<span className="ml-2.5">Metamask initializing</span>
	// 		</button>
	// 	);

	// if (status === 'unavailable')
	// 	return (
	// 		<button className="js-wallet bg-accent hover:bg-accent-dark mb-4 flex w-full items-center justify-center rounded-full border-2 border-transparent py-4 px-8 text-center font-semibold text-white transition-all">
	// 			<Image
	// 				src="/images/wallets/metamask_24.svg"
	// 				className="mr-2.5 inline-block h-6 w-6"
	// 				alt=""
	// 				height={24}
	// 				width={24}
	// 			/>
	// 			<span className="ml-2.5">unavailable</span>
	// 		</button>
	// 	);

	// if (status === 'notConnected')
	// 	return (
	// 		<button
	// 			className="js-wallet bg-accent hover:bg-accent-dark mb-4 flex w-full items-center justify-center rounded-full border-2 border-transparent py-4 px-8 text-center font-semibold text-white transition-all"
	// 			onClick={connect}
	// 		>
	// 			<Image
	// 				src="/images/wallets/metamask_24.svg"
	// 				className="inline-block h-6 w-6"
	// 				alt=""
	// 				height={24}
	// 				width={24}
	// 			/>
	// 			<span className="ml-2.5">Sign in with Metamask</span>
	// 		</button>
	// 	);

	// if (status === 'connecting')
	// 	return (
	// 		<button className="js-wallet bg-accent hover:bg-accent-dark mb-4 flex w-full items-center justify-center rounded-full border-2 border-transparent py-4 px-8 text-center font-semibold text-white transition-all">
	// 			<Image
	// 				src="/images/wallets/metamask_24.svg"
	// 				className="mr-2.5 inline-block h-6 w-6"
	// 				alt=""
	// 				height={24}
	// 				width={24}
	// 			/>
	// 			<span className="ml-2.5">Metamask connecting</span>
	// 		</button>
	// 	);

	// if (status === 'connected')
	// 	return (
	// 		<button className="js-wallet bg-accent hover:bg-accent-dark mb-4 flex w-full items-center justify-center rounded-full border-2 border-transparent py-4 px-8 text-center font-semibold text-white transition-all">
	// 			<Image
	// 				src="/images/wallets/metamask_24.svg"
	// 				className=" inline-block h-6 w-6"
	// 				alt=""
	// 				height={24}
	// 				width={24}
	// 			/>
	// 			<span className="ml-2.5">Sign in with Metamask</span>
	// 		</button>
	// 	);
};

const ListInstallment = (priceforday, listinstallmentcontent) => {
	const { data: signer, isError } = useSigner()
	const { address, connector, isConnected } = useAccount()
	const { connect, connectors, error, isLoading, pendingConnector } =
		useConnect()
	const { disconnect } = useDisconnect()
	const dispatch = useDispatch();
	const provider = new ethers.providers.JsonRpcProvider("https://api.avax-test.network/ext/bc/C/rpc")
	

	const listNFTrentalINS = async () => {
		dispatch(installmentModalHide())
		// console.log(priceforday)
		try{
			const mplace_contract = new ethers.Contract( // We will use this to interact with the AuctionManager
				iexchange_token,
				AIE_Proxy.abi,
				signer
			);
			

			const token_contract = new ethers.Contract( // We will use this to interact with the AuctionManager
				priceforday.listinstallmentcontent.token_address,
				RimeRent.abi,
				signer
			);
			// console.log("entereddd")
			// console.log(priceforday.listinstallmentcontent)
			// console.log(priceforday.listinstallmentcontent.token_id)
			// console.log(priceforday.priceforday)
			let tokenId = priceforday.listinstallmentcontent.token_id
			// let price = (priceforday.priceforday * Math.pow(10, 18)).toString()
			const unitPrice = ethers.utils.parseEther(priceforday.priceforday.toString())

			console.log("Approving Marketplace as operator of NFT...")
			const approvalTx = await token_contract.approve(mplace_contract.address, tokenId)
			await approvalTx.wait(1)

			const mintedBy = await token_contract.ownerOf(tokenId)
			const listingFee = (await mplace_contract.getListingFee()).toString();

			console.log("Listing NFT...")
			const tx = await mplace_contract.listInsBasedNFT(token_contract.address, tokenId, unitPrice, {
				value: listingFee,
			})

			console.log("listed")
			dispatch(showToast(["success","NFT Listed!"]))
		}
		catch(error){
			dispatch(showToast(["error",error]))
		}	
	}

	if (isConnected) {
		return ( 
			<button
				className="js-wallet bg-accent shadow-accent-volume hover:bg-accent-dark block w-full rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
				onClick={listNFTrentalINS}
				type="button"
			>
				List Rental
			</button>
		)
	  }

	if (!isConnected) {
		return (
			connectors.map((connector) => ( 
				<button
					disabled={!connector.ready}
					key={connector.id}
					onClick={async() => {
						// register({ connector })
						await connect({ connector })
						// console.log(address)
						// register(address)
						// 	.then((response) => {
						// 	console.log(response)
						// 	})
					}}
				>
					Connect 
				</button> 
				))
		)
	}
}

const ListSell = (priceforday, listcontent) => {
	const { data: signer, isError } = useSigner()
	const { address, connector, isConnected } = useAccount()
	const { connect, connectors, error, isLoading, pendingConnector } =
		useConnect()
	const { disconnect } = useDisconnect()
	const dispatch = useDispatch();
	const provider = new ethers.providers.JsonRpcProvider("https://api.avax-test.network/ext/bc/C/rpc")
	
	const listNFTsell = async () => {
		dispatch(buylistModalHide())
		try {
			const _marketplace = new ethers.Contract( // We will use this to interact with the AuctionManager
				selxchange_token,
				AvianSellMarket.abi,
				signer
			);
			let nftContracts
			if(priceforday.listcontent.tokenUriRes.amplace_token==="ERC721"){
				nftContracts = new ethers.Contract( // We will use this to interact with the AuctionManager
					priceforday.listcontent.token_address,
					RimeToken.abi,
					signer
				);
			} else {
				nftContracts = new ethers.Contract( // We will use this to interact with the AuctionManager
					priceforday.listcontent.token_address,
					RimeRent.abi,
					signer
				);	
			}
			

			console.log(priceforday.listcontent.tokenUriRes.amplace_token)

			let tokenID = priceforday.listcontent.token_id
			console.log("Approving Marketplace as operator of NFT...")

			const approvalTx = await nftContracts.approve(_marketplace.address, tokenID)
			await approvalTx.wait(1)

			let price = (priceforday.priceforday * Math.pow(10, 18)).toString()

			const tx = await _marketplace.listItem(nftContracts.address, tokenID , price)

			console.log("listed")
			dispatch(showToast(["success","NFT Listed!"]))
		} catch(error){
			dispatch(showToast(["error",error]))
		}	
	}

	if (isConnected) {
		return ( 
			<button
				className="js-wallet bg-accent shadow-accent-volume hover:bg-accent-dark block w-full rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
				onClick={listNFTsell}
				type="button"
			>
				List Sell
			</button>
		)
	  }

	if (!isConnected) {
		return (
			connectors.map((connector) => ( 
				<button
					disabled={!connector.ready}
					key={connector.id}
					onClick={async() => {
						// register({ connector })
						await connect({ connector })
						// console.log(address)
						// register(address)
						// 	.then((response) => {
						// 	console.log(response)
						// 	})
					}}
				>
					Connect 
				</button> 
				))
		)
	}
};

const ListRentals = (priceforday, listrentalcontent, numofDays) => {
	const { data: signer, isError } = useSigner()
	const { address, connector, isConnected } = useAccount()
	const { connect, connectors, error, isLoading, pendingConnector } =
		useConnect()
	const { disconnect } = useDisconnect()
	const dispatch = useDispatch();
	const provider = new ethers.providers.JsonRpcProvider("https://api.avax-test.network/ext/bc/C/rpc")
	const _marketplace = new ethers.Contract( // We will use this to interact with the AuctionManager
        rexchange_token,
        AvianRentMarket.abi,
        signer
    );

    const nftrentalsContracts = new ethers.Contract( // We will use this to interact with the AuctionManager
		priceforday.listrentalcontent.token_address,
        RimeRent.abi,
        signer
    );

	const listNFTrental = async () => {
		dispatch(rentlistModalHide())
		try{
			// console.log(priceforday.listrentalcontent)
			let tokenID = priceforday.listrentalcontent.token_id
			let n_days = priceforday.numofDays

			let price = (priceforday.priceforday * Math.pow(10, 18)).toString()

			const approvalTx = await nftrentalsContracts.approve(_marketplace.address,  tokenID)
			await approvalTx.wait(1)

			const listingFee = (await _marketplace.getListingFee()).toString();
			// let sDate = Math.floor(Date.now()/1000) + (60*60);
			// let eDate = sDate + (n_days*24*60*60);

			console.log("Listing NFT...")
			const tx = await _marketplace.listNFT(nftrentalsContracts.address, tokenID, price,{
				value: listingFee,
			})

			console.log("listed")
			dispatch(showToast(["success","NFT Listed!"]))
		} catch(error){
			dispatch(showToast(["error",error]))
		}	
	}

	if (isConnected) {
		return ( 
			<button
				className="js-wallet bg-accent shadow-accent-volume hover:bg-accent-dark block w-full rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
				onClick={listNFTrental}
				type="button"
			>
				List Rental
			</button>
		)
	  }

	if (!isConnected) {
		return (
			connectors.map((connector) => ( 
				<button
					disabled={!connector.ready}
					key={connector.id}
					onClick={async() => {
						// register({ connector })
						await connect({ connector })
						// console.log(address)
						// register(address)
						// 	.then((response) => {
						// 	console.log(response)
						// 	})
					}}
				>
					Connect 
				</button> 
				))
		)
	}

};

const PayRental = (payload, numofDays) => {
	// console.log(payload.payload)
	// console.log(payload.numofDays)

	const { data: signer, isError } = useSigner()
	const { address, connector, isConnected } = useAccount()
	const { connect, connectors, error, isLoading, pendingConnector } =
		useConnect()
	const { disconnect } = useDisconnect()
	const dispatch = useDispatch();
	const provider = new ethers.providers.JsonRpcProvider("https://api.avax-test.network/ext/bc/C/rpc")
	const { exploretype } = useSelector((state) => state.counter);

	const _marketplace = new ethers.Contract( // We will use this to interact with the AuctionManager
        rexchange_token,
        AvianRentMarket.abi,
        signer
    );

	const ins_mplace_contract = new ethers.Contract(iexchange_token, AIE_Proxy.abi, signer)
	
	const buyNFT = async () => {
		dispatch(setisloading())
		if(exploretype==="buy"){
			try {
				const tx =  await _marketplace.buyItem(payload.payload.coll_addr, payload.payload.token_id.toString(), {
					value: parseInt((payload.payload.price.hex), 16).toString(),
				})
	
				// console.log(tx)
	
				const provider = new ethers.providers.WebSocketProvider(`wss://api.avax-test.network/ext/bc/C/ws`);
	
				const mplace_contract = new ethers.Contract(selxchange_token, AvianSellMarket.abi, provider)
			
				console.log("listening.........")
			
				mplace_contract.on("ItemBought", (buyer, nftAddress, tokenId, price)=>{
			
					let transferEvent ={
						buyer: buyer,
						nftAddress: nftAddress,
						tokenId: tokenId,
						price: price,
					}
	
					console.log("Bought")
			
				})
				dispatch(buyModalHide())
				dispatch(showToast(["success","NFT Bought!"]))
			} catch(error){
				dispatch(buyModalHide())
				dispatch(showToast(["error",error]))
			}	

		} else {
			// console.log(ethers.utils.parseEther((parseInt((payload.payload.pricePerDay.hex), 16) * payload.numofDays).toString()))
			// console.log((parseInt((payload.payload.pricePerDay.hex), 16) * payload.numofDays).toString())
			// console.log(payload.payload.coll_addr)
			// console.log(payload.payload.token_id.toString())
			// console.log(parseInt((payload.payload.pricePerDay.hex), 16) * Math.pow(10, -18) * payload.numofDays)
			// console.log(ethers.utils.parseEther((parseInt((payload.payload.pricePerDay.hex), 16) * Math.pow(10, -18) * payload.numofDays).toString()))
			if(payload.payload.type=="UPRIGHT"){
				try{
					const tx =  await _marketplace.rentNFT(payload.payload.coll_addr, payload.payload.token_id.toString(),  payload.numofDays, {
						value: ethers.utils.parseEther(payload.payload.pricePerDay.hex ? (parseInt((payload.payload.pricePerDay.hex), 16) * Math.pow(10, -18) * payload.numofDays).toString() : (parseInt((payload.payload.pricePerDay._hex), 16) * Math.pow(10, -18) * payload.numofDays).toString()),
					})
	
					const provider = new ethers.providers.WebSocketProvider(`wss://api.avax-test.network/ext/bc/C/ws`);
	
					// const _marketplace = new ethers.Contract(amplace_token, AvianMarket.abi, provider)
				
					// console.log("listening.........")
				
					// _marketplace.on("ItemBought", (buyer, nftAddress, tokenId, price)=>{
				
					// 	let transferEvent ={
					// 		buyer: buyer,
					// 		nftAddress: nftAddress,
					// 		tokenId: tokenId,
					// 		price: price,
					// 	}
	
					// 	console.log("Bought")
				
					// })	
					dispatch(buyModalHide())		
					dispatch(showToast(["success","NFT Rented!"]))
				} catch(error){
					console.log(error)
					dispatch(buyModalHide())
					dispatch(showToast(["error",error]))
				}
			} else {
				
				try {
					console.log(payload.payload)
					console.log(payload.payload.token_id.toString())
					console.log(payload.numofDays.toString())
					let tokencontract = new ethers.Contract( // We will use this to interact with the AuctionManager
						payload.payload.coll_addr,
						RimeRent.abi,
						provider
					);
					const firstIns = (await ins_mplace_contract.getNftInstallment(tokencontract.address, payload.payload.token_id.toString(), payload.numofDays.toString()));
					console.log(firstIns)
					console.log("Renting NFT...")
					const tx = await ins_mplace_contract.rentINSNFT(tokencontract.address, payload.payload.token_id.toString(), payload.numofDays.toString(),{
						value: firstIns,
					})

					await tx.wait(1)
					console.log("NFT rented and first ins paid")
					dispatch(buyModalHide())
					dispatch(showToast(["success","NFT Rented!"]))
				} catch(error){
					console.log(error)
					dispatch(buyModalHide())
					dispatch(showToast(["error","Renting Failed"]))
				}
				
			}
							
		}
		dispatch(setisloading())
	}

	useEffect(() => {
		registerUser(address)
			.then((response) => {
				console.log(response)
			})
	}, [address]);

	if (isConnected) {
		return ( 
			<button
				className="js-wallet bg-accent shadow-accent-volume hover:bg-accent-dark block w-full rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
				onClick={buyNFT}
				type="button"
			>
				Confirm Checkout
			</button>
		)
	  }

	if (!isConnected) {
		return (
			connectors.map((connector) => ( 
				<button
					disabled={!connector.ready}
					key={connector.id}
					onClick={async() => {
						// register({ connector })
						await connect({ connector })
						// console.log(address)
						// register(address)
						// 	.then((response) => {
						// 	console.log(response)
						// 	})
					}}
				>
					Connect 
				</button> 
				))
		)
	}
};

const Confirm_checkout = (payload) => {
	const { data: signer, isError } = useSigner()
	const { address, connector, isConnected } = useAccount()
	const { connect, connectors, error, isLoading, pendingConnector } =
		useConnect()
	const { disconnect } = useDisconnect()
	const dispatch = useDispatch();
	const provider = new ethers.providers.JsonRpcProvider("https://api.avax-test.network/ext/bc/C/rpc")
	const { exploretype } = useSelector((state) => state.counter);
	console.log(payload)
	const _marketplace = new ethers.Contract( // We will use this to interact with the AuctionManager
        rexchange_token,
        AvianRentMarket.abi,
        signer
    );
	
	const buyNFT = async () => {
		dispatch(buyModalHide())
		if(exploretype==="buy"){
			try{
				const mplace_contract = new ethers.Contract(selxchange_token, AvianSellMarket.abi, signer)

				const tx =  await mplace_contract.buyItem(payload.payload.coll_addr, payload.payload.token_id.toString(), {
					value: (payload.payload.price.hex) ? parseInt((payload.payload.price.hex), 16).toString(): parseInt((payload.payload.price._hex), 16).toString(),
				})
				// console.log(parseInt((payload.payload.price.hex), 16).toString())
				const provider = new ethers.providers.WebSocketProvider(`wss://api.avax-test.network/ext/bc/C/ws`);
	
				
			
				console.log("listening.........")
			
				mplace_contract.on("ItemBought", (buyer, nftAddress, tokenId, price)=>{
			
					let transferEvent ={
						buyer: buyer,
						nftAddress: nftAddress,
						tokenId: tokenId,
						price: price,
					}
	
					console.log("Bought")
			
				})
				dispatch(showToast(["success","NFT Bought!"]))
			} catch(error){
				dispatch(showToast(["error",error]))
			}	
		} else {
			// console.log(ethers.utils.parseEther((parseInt((payload.payload.pricePerDay.hex), 16) * payload.numofDays).toString()))
			// console.log((parseInt((payload.payload.pricePerDay.hex), 16) * payload.numofDays).toString())
			try {
				const tx =  await _marketplace.buyItem(payload.payload.coll_addr, payload.payload.token_id.toString(), {
					value: ethers.utils.parseEther((parseInt((payload.payload.pricePerDay.hex), 16) * Math.pow(10, -18) * payload.numofDays).toString()),
				})
				dispatch(showToast(["success","NFT Bought!"]))
			} catch(error){
				dispatch(showToast(["error",error]))
			}			
		}
	}

	useEffect(() => {
		registerUser(address)
			.then((response) => {
				console.log(response)
			})
	}, [address]);

	if (isConnected) {
		return ( 
			<button
				className="js-wallet bg-accent shadow-accent-volume hover:bg-accent-dark block w-full rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
				onClick={buyNFT}
				type="button"
			>
				Confirm Checkout
			</button>
		)
	  }

	if (!isConnected) {
		return (
			connectors.map((connector) => ( 
				<button
					disabled={!connector.ready}
					key={connector.id}
					onClick={async() => {
						// register({ connector })
						await connect({ connector })
						// console.log(address)
						// register(address)
						// 	.then((response) => {
						// 	console.log(response)
						// 	})
					}}
				>
					Connect 
				</button> 
				))
		)
	}
};

const Metamask_comp_icon = ({ prop }) => {
	const mountedcontent = isMounted
	const { address, isConnected } = useAccount()
	const { connect, connectors, error, isLoading, pendingConnector } =
		useConnect()
	const { disconnect } = useDisconnect()

	useEffect(() => {
		registerUser(address)
			.then((response) => {
				console.log(response)
			})
	}, [address]);

	if (isConnected) {
		return ( mountedcontent ?
				<button
					className={
						prop.asPath === '/home/home_3'
							? 'js-wallet border-jacarta-100  focus:bg-accent group hover:bg-accent flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent border-transparent bg-white/[.15]'
							: 'js-wallet border-jacarta-100 hover:bg-accent focus:bg-accent group dark:hover:bg-accent flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15]'
					}
					onClick={disconnect}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						width="24"
						height="24"
						className={
							prop.asPath === '/home/home_3'
								? ' h-4 w-4 transition-colors group-hover:fill-white group-focus:fill-white fill-white'
								: 'fill-jacarta-700 h-4 w-4 transition-colors group-hover:fill-white group-focus:fill-white dark:fill-white'
						}
					>
						<path fill="none" d="M0 0h24v24H0z"></path>
						<path d="M22 6h-7a6 6 0 1 0 0 12h7v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2zm-7 2h8v8h-8a4 4 0 1 1 0-8zm0 3v2h3v-2h-3z"></path>
					</svg>
				</button> : null
		)
	  }

	if (!isConnected) {
		return (
			connectors.map((connector) => (
				<button
					disabled={!connector.ready}
					key={connector.id}
					onClick={async() => {
						// register({ connector })
						await connect({ connector })
						// console.log(address)
						// register(address)
						// 	.then((response) => {
						// 	console.log(response)
						// 	})
					}}
					className={
						prop.asPath === '/home/home_3'
							? 'js-wallet border-jacarta-100  focus:bg-accent group hover:bg-accent flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent border-transparent bg-white/[.15]'
							: 'js-wallet border-jacarta-100 hover:bg-accent focus:bg-accent group dark:hover:bg-accent flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15]'
					}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						width="24"
						height="24"
						className={
							prop.asPath === '/home/home_3'
								? ' h-4 w-4 transition-colors group-hover:fill-white group-focus:fill-white fill-white'
								: 'fill-jacarta-700 h-4 w-4 transition-colors group-hover:fill-white group-focus:fill-white dark:fill-white'
						}
					>
						<path fill="none" d="M0 0h24v24H0z"></path>
						<path d="M22 6h-7a6 6 0 1 0 0 12h7v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2zm-7 2h8v8h-8a4 4 0 1 1 0-8zm0 3v2h3v-2h-3z"></path>
					</svg>
				</button>
				))
		)
	}

	// if (status === 'initializing')
	// 	return (
	// 		<div>
	// 			<button
	// 				className={
	// 					prop.asPath === '/home/home_3'
	// 						? 'js-wallet border-jacarta-100  focus:bg-accent group hover:bg-accent flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent border-transparent bg-white/[.15]'
	// 						: 'js-wallet border-jacarta-100 hover:bg-accent focus:bg-accent group dark:hover:bg-accent flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15]'
	// 				}
	// 				// onClick={() => dispatch(walletModalShow())}
	// 			>
	// 				<svg
	// 					xmlns="http://www.w3.org/2000/svg"
	// 					viewBox="0 0 24 24"
	// 					width="24"
	// 					height="24"
	// 					className={
	// 						prop.asPath === '/home/home_3'
	// 							? ' h-4 w-4 transition-colors group-hover:fill-white group-focus:fill-white fill-white'
	// 							: 'fill-jacarta-700 h-4 w-4 transition-colors group-hover:fill-white group-focus:fill-white dark:fill-white'
	// 					}
	// 				>
	// 					<path fill="none" d="M0 0h24v24H0z"></path>
	// 					<path d="M22 6h-7a6 6 0 1 0 0 12h7v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2zm-7 2h8v8h-8a4 4 0 1 1 0-8zm0 3v2h3v-2h-3z"></path>
	// 				</svg>
	// 			</button>
	// 		</div>
	// 	);

	// if (status === 'unavailable')
	// 	return (
	// 		<div>
	// 			<button
	// 				className={
	// 					prop.asPath === '/home/home_3'
	// 						? 'js-wallet border-jacarta-100  focus:bg-accent group hover:bg-accent flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent border-transparent bg-white/[.15]'
	// 						: 'js-wallet border-jacarta-100 hover:bg-accent focus:bg-accent group dark:hover:bg-accent flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15]'
	// 				}
	// 				// onClick={() => dispatch(walletModalShow())}
	// 			>
	// 				<svg
	// 					xmlns="http://www.w3.org/2000/svg"
	// 					viewBox="0 0 24 24"
	// 					width="24"
	// 					height="24"
	// 					className={
	// 						prop.asPath === '/home/home_3'
	// 							? ' h-4 w-4 transition-colors group-hover:fill-white group-focus:fill-white fill-white'
	// 							: 'fill-jacarta-700 h-4 w-4 transition-colors group-hover:fill-white group-focus:fill-white dark:fill-white'
	// 					}
	// 				>
	// 					<path fill="none" d="M0 0h24v24H0z"></path>
	// 					<path d="M22 6h-7a6 6 0 1 0 0 12h7v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2zm-7 2h8v8h-8a4 4 0 1 1 0-8zm0 3v2h3v-2h-3z"></path>
	// 				</svg>
	// 			</button>
	// 		</div>
	// 	);

	// if (status === 'notConnected')
	// 	return (
	// 		<button
	// 			className={
	// 				prop.asPath === '/home/home_3'
	// 					? 'js-wallet border-jacarta-100  focus:bg-accent group hover:bg-accent flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent border-transparent bg-white/[.15]'
	// 					: 'js-wallet border-jacarta-100 hover:bg-accent focus:bg-accent group dark:hover:bg-accent flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15]'
	// 			}
	// 			// onClick={() => dispatch(walletModalShow())}
	// 			onClick={connect}
	// 		>
	// 			<svg
	// 				xmlns="http://www.w3.org/2000/svg"
	// 				viewBox="0 0 24 24"
	// 				width="24"
	// 				height="24"
	// 				className={
	// 					prop.asPath === '/home/home_3'
	// 						? ' h-4 w-4 transition-colors group-hover:fill-white group-focus:fill-white fill-white'
	// 						: 'fill-jacarta-700 h-4 w-4 transition-colors group-hover:fill-white group-focus:fill-white dark:fill-white'
	// 				}
	// 			>
	// 				<path fill="none" d="M0 0h24v24H0z"></path>
	// 				<path d="M22 6h-7a6 6 0 1 0 0 12h7v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2zm-7 2h8v8h-8a4 4 0 1 1 0-8zm0 3v2h3v-2h-3z"></path>
	// 			</svg>
	// 		</button>
	// 	);

	// if (status === 'connecting')
	// 	return (
	// 		<div>
	// 			<button
	// 				className={
	// 					prop.asPath === '/home/home_3'
	// 						? 'js-wallet border-jacarta-100  focus:bg-accent group hover:bg-accent flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent border-transparent bg-white/[.15]'
	// 						: 'js-wallet border-jacarta-100 hover:bg-accent focus:bg-accent group dark:hover:bg-accent flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15]'
	// 				}
	// 				// onClick={() => dispatch(walletModalShow())}
	// 			>
	// 				<svg
	// 					xmlns="http://www.w3.org/2000/svg"
	// 					viewBox="0 0 24 24"
	// 					width="24"
	// 					height="24"
	// 					className={
	// 						prop.asPath === '/home/home_3'
	// 							? ' h-4 w-4 transition-colors group-hover:fill-white group-focus:fill-white fill-white'
	// 							: 'fill-jacarta-700 h-4 w-4 transition-colors group-hover:fill-white group-focus:fill-white dark:fill-white'
	// 					}
	// 				>
	// 					<path fill="none" d="M0 0h24v24H0z"></path>
	// 					<path d="M22 6h-7a6 6 0 1 0 0 12h7v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2zm-7 2h8v8h-8a4 4 0 1 1 0-8zm0 3v2h3v-2h-3z"></path>
	// 				</svg>
	// 			</button>
	// 		</div>
	// 	);

	// if (status === 'connected')
	// 	return (
	// 		<div>
	// 			<button
	// 				className={
	// 					prop.asPath === '/home/home_3'
	// 						? 'js-wallet border-jacarta-100  focus:bg-accent group hover:bg-accent flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent border-transparent bg-white/[.15]'
	// 						: 'js-wallet border-jacarta-100 hover:bg-accent focus:bg-accent group dark:hover:bg-accent flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15]'
	// 				}
	// 				onClick={() => dispatch(walletModalShow())}
	// 			>
	// 				<svg
	// 					xmlns="http://www.w3.org/2000/svg"
	// 					viewBox="0 0 24 24"
	// 					width="24"
	// 					height="24"
	// 					className={
	// 						prop.asPath === '/home/home_3'
	// 							? ' h-4 w-4 transition-colors group-hover:fill-white group-focus:fill-white fill-white'
	// 							: 'fill-jacarta-700 h-4 w-4 transition-colors group-hover:fill-white group-focus:fill-white dark:fill-white'
	// 					}
	// 				>
	// 					<path fill="none" d="M0 0h24v24H0z"></path>
	// 					<path d="M22 6h-7a6 6 0 1 0 0 12h7v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2zm-7 2h8v8h-8a4 4 0 1 1 0-8zm0 3v2h3v-2h-3z"></path>
	// 				</svg>
	// 			</button>
	// 		</div>
	// 	);
};

export { Metamask_comp_text, Metamask_comp_icon, Metamask_comp_login, Confirm_checkout, PayRental, ListSell, ListRentals, ListInstallment };
