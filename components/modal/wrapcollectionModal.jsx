import Link from 'next/link';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { wrapCollectionModalHide, showToast } from '../../redux/counterSlice';
import { createWrapcollection } from '../../api/mint';

import { useSigner, useAccount } from 'wagmi'
import { ethers } from "ethers";
import RentWrapper from "../../contracts/RentWrapper.sol/RentWrapper.json"

const WrapCollectionModal = () => {
    const { wrapcollectionmodal, wrapcollectioncontent } = useSelector((state) => state.counter);
    const dispatch = useDispatch();
    const { data: signer, isError, isLoading } = useSigner()
    const { address, isConnected } = useAccount()
    const [Name, setName] = useState({ value: "", errorVal: "" });
    const [Symbol, setSymbol] = useState({ value: "", errorVal: "" });
    const [isloading, setisloading] = useState(false);

    console.log("Wrap collection content : ", wrapcollectioncontent)

    const handleChange = (e, item) => {
        switch (item) {
            case "Name":
                setName({ value: e.target.value, errorVal: "" })
                break;
            case "Symbol":
                setSymbol({ value: e.target.value, errorVal: "" })
                break;
            default:
                console.log(item)
        }
    };

    const saveWrapCollectionData = async (data) => {
        await createWrapcollection(data)
            .then((response) => {
                console.log(response)
            })
    }

    const deployWrapper = async (e) => {
        console.log(wrapcollectioncontent._id + " , " + Name.value + " , " + Symbol.value)
        const WrapperToken = new ethers.ContractFactory(RentWrapper.abi, RentWrapper.bytecode, signer);
        setisloading(true)
        try {
            const Wrapper = await WrapperToken.deploy(wrapcollectioncontent._id, Name.value, Symbol.value);
            await Wrapper.deployed()
            console.log("Rentable 4907 Wrapper deployed to:", Wrapper.address, "for the 721 :", wrapcollectioncontent._id);

            let wrappedCollection = {
                "address": Wrapper.address,
                "name": Name.value,
                "symbol": Symbol.value,
                "tokenType": "ERC4907",
                "createdBy": address,
                "baseCollection": wrapcollectioncontent._id
            }
            console.log("Saving wrapper : " + wrappedCollection)
            saveWrapCollectionData(wrappedCollection)
            setisloading(false)
            dispatch(wrapCollectionModalHide())
            dispatch(showToast(["success", "Wrapper ollection created successfully"]))
        } catch (error) {
            setisloading(false)
            dispatch(wrapCollectionModalHide())
            dispatch(showToast(["error", error.message]))
        }
    }
    if (!isloading) {
        if (wrapcollectioncontent) {
            return (
                <div>
                    {/* <!-- Buy Now Modal --> */}
                    <div className={wrapcollectionmodal ? 'modal fade show block' : 'modal fade'}>
                        <div className="modal-dialog min-w-[30%]">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="buyNowModalLabel">
                                        Wrap this collection
                                    </h5>
                                    <button type="button" className="btn-close" onClick={() => dispatch(wrapCollectionModalHide())}>
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
                                    {/* <!-- Collection ID --> */}
                                    <div className="relative my-3 flex items-center">
                                        <div className="flex-1">
                                            <label className="font-display text-jacarta-700 mb-3 block text-base font-semibold dark:text-white">
                                                Collection ID to wrap
                                            </label>
                                            <input
                                                type="text"
                                                readOnly
                                                className="dark:bg-jacarta-700 px-4 dark:border-jacarta-600 focus:ring-accent border-jacarta-100 dark:placeholder-jacarta-300 h-12 w-full border focus:ring-inset dark:text-white"
                                                value={wrapcollectioncontent ? wrapcollectioncontent._id : "Unknown"}
                                            />
                                        </div>
                                    </div>

                                    {/* <!-- New Token Name --> */}
                                    <div className="relative my-3 flex items-center">
                                        <div className="flex-1">
                                            <label className="font-display text-jacarta-700 mb-3 block text-base font-semibold dark:text-white">
                                                New token name
                                            </label>
                                            <input
                                                type="text"
                                                className="dark:bg-jacarta-700 px-4 dark:border-jacarta-600 focus:ring-accent border-jacarta-100 dark:placeholder-jacarta-300 h-12 w-full border border-r-0 focus:ring-inset dark:text-white"
                                                placeholder="Enter token name..."
                                                onChange={(e) => handleChange(e, "Name")}
                                                value={Name.value}
                                            />
                                        </div>
                                    </div>

                                    {/* <!-- New Token Symbol --> */}
                                    <div className="relative my-3 flex items-center">
                                        <div className="flex-1">
                                            <label className="font-display text-jacarta-700 mb-3 block text-base font-semibold dark:text-white">
                                                New token symbol
                                            </label>
                                            <input
                                                type="text"
                                                className="dark:bg-jacarta-700 px-4 dark:border-jacarta-600 focus:ring-accent border-jacarta-100 dark:placeholder-jacarta-300 h-12 w-full border border-r-0 focus:ring-inset dark:text-white"
                                                placeholder="Enter token symbol..."
                                                onChange={(e) => handleChange(e, "Symbol")}
                                                value={Symbol.value}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- end body --> */}

                                <div className="modal-footer">
                                    <div className="flex items-center justify-center space-x-4">
                                        <button
                                            type="button"
                                            className="bg-accent shadow-accent-volume hover:bg-accent-dark rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
                                            onClick={deployWrapper}
                                        >
                                            Deploy Wrapper
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        };
    } else {
        return (
            <div>
                <div className={propartiesModalValue ? 'modal fade show block' : 'modal fade'}>
                    <div className="modal-dialog max-w-xxl">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="addPropertiesLabel">
                                    Waiting for wrapper deployment...
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
            </div>
        )
    }

};


export default WrapCollectionModal;
