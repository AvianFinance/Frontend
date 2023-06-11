import Link from 'next/link';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import { useSigner, useAccount } from 'wagmi'
import { ethers } from "ethers";

import { deposittokenModalHide, showToast } from '../../redux/counterSlice';
import { depositNFT } from '../../api/mint';
import WrapperContract from "../../contracts/RentWrapper.sol/RentWrapper.json"
import RentContract from "../../contracts/AVFXRent.sol/AVFXRent.json"

const DepositTokenModal = () => {
    const { deposittokenmodal, deposittokencontent } = useSelector((state) => state.counter);
    const dispatch = useDispatch();
    const { data: signer, isError, isLoading } = useSigner()
    const { address, isConnected } = useAccount()
    const [Name, setName] = useState({ value: "", errorVal: "" });
    const [Symbol, setSymbol] = useState({ value: "", errorVal: "" });
    const [isloading, setisloading] = useState(false);


    const saveWrapedNftData = async (data) => {
        await depositNFT(data)
            .then((response) => {
                console.log(response)
            })
    }

    const depositToken = async () => {
        const wrapper_address = deposittokencontent.coll.wrappedCollection
        const tokenId = deposittokencontent.nft.token_id

        setisloading(true)
        try {
            const wrapper_contract = new ethers.Contract(wrapper_address, WrapperContract.abi, signer)
            const base_contract_address = await wrapper_contract.generalToken()

            const token_contract = new ethers.Contract(base_contract_address, RentContract.abi, signer)

            const approvalTx = await token_contract.approve(wrapper_address, tokenId)
            await approvalTx.wait(1)
            const tx = await wrapper_contract.deposit(tokenId)

            await tx.wait(1)

            let wrappedNft = {
                "coll_addr": wrapper_address,
                "token_id" : tokenId,
                "name": deposittokencontent.nft.name,
                "desc" : deposittokencontent.nft.desc,
                "uri": deposittokencontent.nft.uri,
                "token_type": "ERC4907",
                "owner": address,
                "baseCollection": deposittokencontent.nft.coll_addr
            }
            
            saveWrapedNftData(wrappedNft)
            setisloading(false)
            dispatch(deposittokenModalHide())
            dispatch(showToast(["success", "Token Deposited Successfully"]))
        } catch (error) {
            setisloading(false)
            dispatch(deposittokenModalHide())
            dispatch(showToast(["error", error.message]))
        }
    }
    if (!isloading) {
        if (deposittokencontent) {
            return (
                <div>
                    <div className={deposittokenmodal ? 'modal fade show block' : 'modal fade'}>
                        <div className="modal-dialog min-w-[35%]">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="buyNowModalLabel">
                                        Deposit this token
                                    </h5>
                                    <button type="button" className="btn-close" onClick={() => dispatch(deposittokenModalHide())}>
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

                                    <div className="dark:border-jacarta-600 border-jacarta-100 relative flex justify-center items-center border-b py-1">
                                        <figure className="self-center">
                                            <img
                                                src={deposittokencontent.nft ? deposittokencontent.nft.uri : null}
                                                alt="CoverImage"
                                                className="rounded-2lg object-contain h-48 w-96"
                                                loading="lazy"
                                                maxwidth="120px"
                                                maxheight="120px"
                                            />
                                        </figure>
                                    </div>
                                    {/* <!-- Collection ID --> */}
                                    <div className="relative my-3 flex items-center">
                                        <div className="flex-1">
                                            <label className="font-display text-jacarta-700 mb-3 block text-base font-semibold dark:text-white">
                                                From Collection
                                            </label>
                                            <input
                                                type="text"
                                                readOnly
                                                className="dark:bg-jacarta-700 px-4 dark:border-jacarta-600 focus:ring-accent border-jacarta-100 dark:placeholder-jacarta-300 h-12 w-full border focus:ring-inset dark:text-white"
                                                value={deposittokencontent.nft ? deposittokencontent.nft.coll_addr : "Unknown"}
                                            />
                                        </div>
                                    </div>

                                    {/* <!-- To Collection ID --> */}
                                    <div className="relative my-3 flex items-center">
                                        <div className="flex-1">
                                            <label className="font-display text-jacarta-700 mb-3 block text-base font-semibold dark:text-white">
                                                To Collection
                                            </label>
                                            <input
                                                type="text"
                                                readOnly
                                                className="dark:bg-jacarta-700 px-4 dark:border-jacarta-600 focus:ring-accent border-jacarta-100 dark:placeholder-jacarta-300 h-12 w-full border focus:ring-inset dark:text-white"
                                                value={deposittokencontent.coll ? deposittokencontent.coll.wrappedCollection : "Unknown"}
                                            />
                                        </div>
                                    </div>
                                    {/* <!-- Token ID --> */}
                                    <div className="relative my-3 flex items-center">
                                        <div className="flex-1">
                                            <label className="font-display text-jacarta-700 mb-3 block text-base font-semibold dark:text-white">
                                                Token ID
                                            </label>
                                            <input
                                                type="text"
                                                readOnly
                                                className="dark:bg-jacarta-700 px-4 dark:border-jacarta-600 focus:ring-accent border-jacarta-100 dark:placeholder-jacarta-300 h-12 w-full border focus:ring-inset dark:text-white"
                                                value={deposittokencontent.nft ? deposittokencontent.nft.token_id : "Unknown"}
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
                                            onClick={depositToken}
                                        >
                                            Deposit
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
                <div className={deposittokenmodal ? 'modal fade show block' : 'modal fade'}>
                    <div className="modal-dialog max-w-xxl">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="addPropertiesLabel">
                                    Waiting for token deposit...
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


export default DepositTokenModal;
