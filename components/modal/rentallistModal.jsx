import Link from 'next/link';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { rentlistModalHide } from '../../redux/counterSlice';
import { ListRentals } from '../metamask/Metamask';

const BuyModal = () => {
	const { listrentmodal, listrentalcontent } = useSelector((state) => state.counter);
	const dispatch = useDispatch();
	const [numofDays, setnumofDays] = useState(0)
	const [priceforday, setPriceForDay] = useState()

	console.log(listrentalcontent)
	console.log(listrentmodal)

	if(listrentalcontent){
		return (
			<div>
				{/* <!-- Buy Now Modal --> */}
				<div className={listrentmodal ? 'modal fade show block' : 'modal fade'}>
					<div className="modal-dialog max-w-2xl">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="buyNowModalLabel">
									Complete Listing
								</h5>
								<button type="button" className="btn-close" onClick={() => dispatch(rentlistModalHide())}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										width="24"
										height="24"
										className="fill-jacarta-700 h-6 w-6 dark:fill-white"
									>
										<path fill="none" d="M0 0h24v24H0z" />
										<path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
									</svg>
								</button>
							</div>
	
							{/* <!-- Body --> */}
							<div className="modal-body p-6">
	
								<div className="dark:border-jacarta-600 border-jacarta-100 relative flex items-center border-t border-b py-4">
									<figure className="mr-5 self-start">
										<img
											src={listrentalcontent ? listrentalcontent.tokenUriRes.image : "Unknown"}
											alt="avatar 2"
											className="rounded-2lg object-contain h-48 w-96"
											loading="lazy"
											maxwidth = "150px"
											maxheight = "150px"
										/>
									</figure>
	
									{/* <div className="ml-auto">
										<span className="mb-1 flex items-center whitespace-nowrap">
											<span data-tippy-content="ETH">
												<svg className="h-4 w-4">
													<use xlinkHref="/icons.svg#icon-ETH"></use>
												</svg>
											</span>
											<span className="dark:text-jacarta-100 text-sm font-medium tracking-tight">
												{collectionsdata !== null ? parseInt((collectionsdata.price.hex), 16) * Math.pow(10, -18): null }
											</span>
										</span>
										<div className="dark:text-jacarta-300 text-right text-sm">{collectionsdata !== null ? parseInt((collectionsdata.price.hex) , 16) * Math.pow(10, -18) : null }</div>
									</div> */}
								</div>

								<div className="mb-2 flex items-center justify-between">
									<span className="font-display text-jacarta-700 text-sm font-semibold dark:text-white">
										Name
									</span>
									<span className="font-display text-jacarta-700 text-sm font-semibold dark:text-white">
										{listrentalcontent ? listrentalcontent.tokenUriRes.name : "Unknown"}
									</span>
								</div>
	
								{/* <!-- Total --> */}
								<div className="relative my-3 flex items-center">

									<div className="flex-1">
										<label className="font-display text-jacarta-700 mb-3 block text-base font-semibold dark:text-white">
											Number of Days to rent
										</label>
										<input
											type="text"
											className="dark:bg-jacarta-700 px-4 dark:border-jacarta-600 focus:ring-accent border-jacarta-100 dark:placeholder-jacarta-300 h-12 w-full border border-r-0 focus:ring-inset dark:text-white"
											placeholder="Symbol for the collection"
											onChange={(e) => setnumofDays(e.target.value)}
											value={numofDays}
										/>
									</div>
								</div>

								<div className="relative my-3 flex items-center">

									<div className="flex-1">
										<label className="font-display text-jacarta-700 mb-3 block text-base font-semibold dark:text-white">
											Price for Rental
										</label>
										<input
											type="text"
											className="dark:bg-jacarta-700 px-4 dark:border-jacarta-600 focus:ring-accent border-jacarta-100 dark:placeholder-jacarta-300 h-12 w-full border border-r-0 focus:ring-inset dark:text-white"
											placeholder="Symbol for the collection"
											onChange={(e) => setPriceForDay(e.target.value)}
											value={priceforday}
										/>
									</div>
								</div>
								{/* <div className="dark:border-jacarta-600 border-jacarta-100 mb-2 flex items-center justify-between border-b py-2.5">
									<span className="font-display text-jacarta-700 hover:text-accent font-semibold dark:text-white">
										Total
									</span>
									<div className="ml-auto">
										<span className="flex items-center whitespace-nowrap">
											<span data-tippy-content="ETH">
												<svg className="h-4 w-4">
													<use xlinkHref="/icons.svg#icon-ETH"></use>
												</svg>
											</span>
											<span className="text-green font-medium tracking-tight">{collectionsdata !== null ? parseInt((collectionsdata.price.hex), 16) * Math.pow(10, -18) : null }</span>
										</span>
										<div className="dark:text-jacarta-300 text-right">{collectionsdata !== null ? parseInt((collectionsdata.price.hex) , 16) * Math.pow(10, -18) : null }</div>
									</div>
								</div> */}
	
								{/* <!-- Terms --> */}
								<div className="mt-4 flex items-center space-x-2">
									<input
										type="checkbox"
										id="buyNowTerms"
										className="checked:bg-accent dark:bg-jacarta-600 text-accent border-jacarta-200 focus:ring-accent/20 dark:border-jacarta-500 h-5 w-5 self-start rounded focus:ring-offset-0"
									/>
									<label htmlFor="buyNowTerms" className="dark:text-jacarta-200 text-sm">
										By checking this box, I agree to {"Xhibiter's"}{' '}
										<Link href="/tarms">
											<a className="text-accent">Terms of Service</a>
										</Link>
									</label>
								</div>
							</div>
							{/* <!-- end body --> */}
	
							<div className="modal-footer">
								<div className="flex items-center justify-center space-x-4">
									<ListRentals priceforday={priceforday} listrentalcontent={listrentalcontent? listrentalcontent :null} numofDays={numofDays}/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
		
	
};

export default BuyModal;
