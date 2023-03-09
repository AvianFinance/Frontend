import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closePropatiesModal } from '../../redux/counterSlice';
import Collection_dropdown2 from "../../components/dropdown/collection_dropdown2";
import { useSigner, useAccount } from 'wagmi'
import { ethers } from "ethers";

import AVFXGeneral from "../../contracts/AVFXGeneral.sol/AVFXGeneral.json"
import AVFXRent from "../../contracts/AVFXRent.sol/AVFXRent.json"
import { createcollection } from "../../api/mint"

const Proparties_modal = () => {
	const { propartiesModalValue } = useSelector((state) => state.counter);
	const dispatch = useDispatch();
	const { data: signer, isError, isLoading } = useSigner()
	const { address, isConnected } = useAccount()

	const [dropdown, setDropdown] = useState(false);
	const [activeItem, setActiveItem] = useState(null);
	const [Name, setName] = useState({value: "", errorVal:""});
	const [Symbol, setSymbol] = useState({value: "", errorVal:""});
	const handleDropdown = () => {
		window.addEventListener('click', (w) => {
			if (w.target.closest('.dropdown-toggle')) {
				if (dropdown) {
					setDropdown(false);
				} else {
					setDropdown(true);
				}
			} else {
				setDropdown(false);
			}
		});
	};

	const handleChange = (e, item) => {
		switch(item) {
			case "Name":
				setName({value: e.target.value, errorVal:""})
				break;
			case "Symbol":
				setSymbol({value: e.target.value, errorVal:""})
				break;
			default:
			  console.log(item)
		}
		let obj
	};

	const saveData = (data) => {
		createcollection(data)
			.then((response) => {
				console.log(response)
			})
	}

	const submit = async (e) => {
		let token
		let token_name = Name.value
		let token_symbol = Symbol.value

		if(activeItem=="ERC721"){
			token = new ethers.ContractFactory(AVFXGeneral.abi, AVFXGeneral.bytecode, signer)
		} else {
			token = new ethers.ContractFactory(AVFXRent.abi, AVFXRent.bytecode, signer)
		}

		const NFT = await token.deploy(token_name, token_symbol)

		try{
			await NFT.deployed()

			console.log(NFT.address)

			let obj = {
				"address" : NFT.address,
				"name" : Name.value,
				"symbol" : Symbol.value,
				"tokenType" : activeItem,
				"createdBy" : address
			}
			console.log(obj)

			saveData(obj)
		} catch {
			console.log("errorrr")
		}
	};

	return (
		<div>
			<div className={propartiesModalValue ? 'modal fade show block' : 'modal fade'}>
				<div className="modal-dialog max-w-2xl">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="addPropertiesLabel">
								Add Collection
							</h5>
							<button
								type="button"
								className="btn-close"
								onClick={() => dispatch(closePropatiesModal())}
							>
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
							<p className="dark:text-jacarta-300 mb-8">
								Add a new collection if you want. Buwahahaaaaa
							</p>

							<div className="relative my-3 flex items-center">
								{/* <button className="dark:bg-jacarta-700 dark:border-jacarta-600 hover:bg-jacarta-100 border-jacarta-100 bg-jacarta-50 flex h-12 w-12 shrink-0 items-center justify-center self-end rounded-l-lg border border-r-0">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										width="24"
										height="24"
										className="fill-jacarta-500 dark:fill-jacarta-300 h-6 w-6"
									>
										<path fill="none" d="M0 0h24v24H0z"></path>
										<path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"></path>
									</svg>
								</button> */}

								<div className="flex-1">
									<label className="font-display text-jacarta-700 mb-3 block text-base font-semibold dark:text-white">
										Name
									</label>
									<input
										type="text"
										className="dark:bg-jacarta-700 px-4 dark:border-jacarta-600 focus:ring-accent border-jacarta-100 dark:placeholder-jacarta-300 h-12 w-full border border-r-0 focus:ring-inset dark:text-white"
										placeholder="Name for the collection"
										onChange={(e) => handleChange(e, "Name")}
										value={Name.value}
									/>
								</div>
							</div>

							<div className="relative my-3 flex items-center">

								<div className="flex-1">
									<label className="font-display text-jacarta-700 mb-3 block text-base font-semibold dark:text-white">
										Symbol
									</label>
									<input
										type="text"
										className="dark:bg-jacarta-700 px-4 dark:border-jacarta-600 focus:ring-accent border-jacarta-100 dark:placeholder-jacarta-300 h-12 w-full border border-r-0 focus:ring-inset dark:text-white"
										placeholder="Symbol for the collection"
										onChange={(e) => handleChange(e, "Symbol")}
										value={Symbol.value}
									/>
								</div>
							</div>

							<div className="relative my-3 flex items-center">

								<div className="flex-1">
									<label className="font-display text-jacarta-700 mb-3 block text-base font-semibold dark:text-white">
										Token Type
									</label>
									<div>
										<div
											className={
												dropdown
													? 'overlay h-[100vh] dropdown-toggle w-[100vw] fixed top-0 left-0 opacity-0 show bg-red z-40 cursor-default'
													: 'overlay h-[100vh] w-[100vw] fixed top-0 left-0 opacity-0 hidden bg-red z-40 cursor-default'
											}
											onClick={() => handleDropdown()}
										></div>
										<div
											className="dark:bg-jacarta-700 dropdown-toggle border-jacarta-100 dark:border-jacarta-600 dark:text-jacarta-300 flex items-center justify-between rounded-lg border bg-white py-3 px-3 show z-50 relative"
											onClick={() => handleDropdown()}
										>
											<span className="">{activeItem ? activeItem : "Select collection"}</span>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												width="24"
												height="24"
												className="fill-jacarta-500 h-4 w-4 dark:fill-white"
											>
												<path fill="none" d="M0 0h24v24H0z" />
												<path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z" />
											</svg>
										</div>
										<div
											className={
												dropdown
													? 'absolute dark:bg-jacarta-800 whitespace-nowrap w-full rounded-xl bg-white py-4 px-2 text-left shadow-xl show z-50'
													: 'absolute dark:bg-jacarta-800 whitespace-nowrap w-full rounded-xl bg-white py-4 px-2 text-left shadow-xl hidden z-50'
											}
										>
											<ul className="scrollbar-custom flex max-h-48 flex-col overflow-y-auto">
												<li key="ERC721">
													<button
														href="#"
														className="dropdown-item font-display dark:hover:bg-jacarta-600 hover:bg-jacarta-50 flex w-full items-center justify-between rounded-xl px-5 py-2 text-left text-sm transition-colors dark:text-white"
														onClick={() => setActiveItem("ERC721")}
													>
														ERC 721
													</button>
												</li>
												<li key="ERC4907">
													<button
														href="#"
														className="dropdown-item font-display dark:hover:bg-jacarta-600 hover:bg-jacarta-50 flex w-full items-center justify-between rounded-xl px-5 py-2 text-left text-sm transition-colors dark:text-white"
														onClick={() => setActiveItem("ERC4907")}
													>
														ERC 4907
													</button>
												</li>
											</ul>
										</div>	
									</div>			
								</div>
							</div>

							{/* <button className="hover:bg-accent border-accent text-accent mt-2 rounded-full border-2 py-2 px-8 text-center text-sm font-semibold transition-all hover:text-white">
								Add More
							</button> */}
						</div>
						{/* <!-- end body --> */}

						<div className="modal-footer">
							<div className="flex items-center justify-center space-x-4">
								<button
									type="button"
									className="bg-accent shadow-accent-volume hover:bg-accent-dark rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
									onClick={submit}
								>
									Create
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Proparties_modal;
