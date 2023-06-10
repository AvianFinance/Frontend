import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Activity_item from '../collectrions/Activity_item';
import Image from 'next/image';
import { useSelector } from "react-redux";
import Feature_collections_data from '../../data/Feature_collections_data';
import Trending_categories_items from '../usercollections/trending_categories_items';

import 'react-tabs/style/react-tabs.css';
import Explore_collection_item from '../collectrions/explore_collection_item_buy';
import { isloading } from "../../redux/counterSlice";
import Explore_collection_item_user from '../collectrions/explore_collection_item_user';
import {
	useAccount,
} from 'wagmi'

import { isMounted } from "../../scripts/isMounted"
import usernfts from "../../scripts/usernfts"
import { getcollected, getowned, getcollections, getListed, getLended, getRented} from "../../api/profile"

const User_items = (user_address) => {
	const mountedcontent = isMounted
	const { isloading } = useSelector(
		(state) => state.counter
	  );
	const { address, isConnected } = useAccount()
	const [collectedNFT, setCollectedNFT] = useState([])
	const [ownednft, setOwnedNFT] = useState([])
	const [collections, setcollections] = useState([])
	const [lended, setlended] = useState([])
	const [rented, setrented] = useState([])
	const [listed, setlisted] = useState([])
	// console.log(user_address.user_address)
	useEffect(() => {
		console.log(user_address.user_address)
		getListed(user_address.user_address)
			.then((response) => {
				console.log("listed",response)
				let listednfts = []
				if(response.data){
					response.data.map((data) => listednfts.push( {
						tokenUriRes : {
							description : data.desc,
							image : data.uri,
							name : data.name,
							token: data.token_type
						},
						token_address : data.coll_addr,
						token_id : data.token_id,
						sell_listed_status: data.sell_listed_status,
						rent_listed_status: data.rent_listed_status,
						inst_listed_status: data.inst_listed_status
					}))
				}
				setlisted(listednfts)
			})
		getLended(user_address.user_address)
			.then((response) => {
				console.log("lended", response)
				let collectednfts = []
				if(response.data){
					response.data.map((data) => collectednfts.push( {
						tokenUriRes : {
							description : data.desc,
							image : data.uri,
							name : data.name,
							token: data.token_type,
							inst_listed_status: data.inst_listed_status,
							rent_listed_status: data.rent_listed_status,
							sell_listed_status: data.sell_listed_status
						},
						token_address : data.coll_addr,
						token_id : data.token_id
					}))
				}
				setlended(collectednfts)
			})
		getRented(user_address.user_address)
			.then((response) => {
				console.log("rented", response)
				let collectednfts = []
				if(response.data){
					response.data.map((data) => collectednfts.push( {
						tokenUriRes : {
							description : data.desc,
							image : data.uri,
							name : data.name,
							token: data.token_type,
							inst_listed_status: data.inst_listed_status,
							rent_listed_status: data.rent_listed_status,
							sell_listed_status: data.sell_listed_status
						},
						token_address : data.coll_addr,
						token_id : data.token_id
					}))
				}
				setrented(collectednfts)
			})
	
		getcollected(user_address.user_address)
			.then((response) => {
				console.log("collected", response)
				let collectednfts = []
				if(response.data){
					response.data.map((data) => collectednfts.push( {
						tokenUriRes : {
							description : data.desc,
							image : data.uri,
							name : data.name,
							token: data.token_type,
							inst_listed_status: data.inst_listed_status,
							rent_listed_status: data.rent_listed_status,
							sell_listed_status: data.sell_listed_status,
							owner : data.owner,
							user: data.user
						},
						token_address : data.coll_addr,
						token_id : data.token_id
					}))
				}
				setCollectedNFT(collectednfts)
			})
		getowned(user_address.user_address)
			.then((response) => {
				console.log("owned", response)
				let ownednfts =[]
				if(response.data){
					response.data.map((data) => ownednfts.push( {
						tokenUriRes : {
							description : data.desc,
							image : data.uri,
							name : data.name,
							token: data.token_type,
							inst_listed_status: data.inst_listed_status,
							rent_listed_status: data.rent_listed_status,
							sell_listed_status: data.sell_listed_status
						},
						token_address : data.coll_addr,
						token_id : data.token_id
					}))
				}
				setOwnedNFT(ownednfts)
			})
		getcollections(user_address.user_address)
			.then((response) => {
				// console.log(response)
				setcollections(response.data)
			})
	}, [user_address]);

	const [itemActive, setItemActive] = useState(1);
	const tabItem = [
		{
			id: 1,
			text: 'Listed',
			icon: 'on-sale',
		},
		{
			id: 2,
			text: 'Collected',
			icon: 'owned',
		},
		{
			id: 3,
			text: 'Created',
			icon: 'created',
		},
		{
			id: 4,
			text: 'Rented',
			icon: 'created',
		},
		{
			id: 5,
			text: 'Lended',
			icon: 'created',
		},
		{
			id: 6,
			text: 'collections',
			icon: 'listing',
		},
		{
			id: 7,
			text: 'Activity',
			icon: 'activity',
		},
	];
	// console.log(collectedNFT)
	if(collectedNFT.length>0){
		return (
			<>
				<section className="relative py-24">
					<picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
						{/* <img src="img/gradient_light.jpg" alt="gradient" className="h-full w-full" /> */}
						<Image
							src="/images/gradient_light.jpg"
							alt="gradient"
							className="h-full w-full"
							layout="fill"
						/>
					</picture>
					<div className="container">
						{/* <!-- Tabs Nav --> */}
						<Tabs className="tabs">
							<TabList className="nav nav-tabs scrollbar-custom mb-12 flex items-center justify-start overflow-x-auto overflow-y-hidden border-b border-jacarta-100 pb-px dark:border-jacarta-600 md:justify-center">
								{tabItem.map(({ id, text, icon }) => {
									return (
										<Tab
											className="nav-item"
											role="presentation"
											key={id}
											onClick={() => setItemActive(id)}
										>
											<button
												className={
													itemActive === id
														? 'nav-link hover:text-jacarta-700 text-jacarta-400 relative flex items-center whitespace-nowrap py-3 px-6 dark:hover:text-white active'
														: 'nav-link hover:text-jacarta-700 text-jacarta-400 relative flex items-center whitespace-nowrap py-3 px-6 dark:hover:text-white'
												}
											>
												<svg className="icon mr-1 h-5 w-5 fill-current">
													<use xlinkHref={`/icons.svg#icon-${icon}`}></use>
												</svg>
												<span className="font-display text-base font-medium">{text}</span>
											</button>
										</Tab>
									);
								})}
							</TabList>
	
							{/* Listed */}
							<TabPanel>
								<div>
									{/* <!-- Filter --> */}
									{/* <Trending_categories_items filterName="Listed" collectedNFT = {listed}/> */}
									<Trending_categories_items filterName="Listed" collectedNFT={listed}/>
								</div>
							</TabPanel>
	
							{/* Collected */}
							<TabPanel>
								<div>
									{/* <!-- Filter --> */}
									<Trending_categories_items filterName="Collected" collectedNFT={collectedNFT}/>
								</div>
							</TabPanel>
	
							{/* Created */}
							<TabPanel>
								<div>
									{/* <!-- Filter --> */}
									<Trending_categories_items filterName="Created" collectedNFT={ownednft}/>
								</div>
							</TabPanel>
	
							{/* Rented */}
							<TabPanel>
								<div>
									{/* <!-- Filter --> */}
									<Trending_categories_items filterName="Rented" collectedNFT={rented}/>
								</div>
							</TabPanel>
	
							{/* Lended */}
							<TabPanel>
								<div>
									{/* <!-- Filter --> */}
									<Trending_categories_items filterName="Lended" collectedNFT={lended}/>
								</div>
							</TabPanel>
	
							{/* Collections  */}
							<TabPanel>
								{/* <!-- Grid --> */}
								<div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-3 lg:grid-cols-4">
									<Explore_collection_item_user itemFor="userPage" collections={collections}/>
								</div>
							</TabPanel>
	
							{/* Activity */}
							<TabPanel>
								<div>
									<Activity_item address={user_address.user_address}/>
								</div>
							</TabPanel>
	
						</Tabs>
					</div>
				</section>
			</>
		);
	} 
};

export default User_items;
