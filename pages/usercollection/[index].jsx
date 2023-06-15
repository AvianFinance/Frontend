import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
    useAccount,
} from 'wagmi'

import Meta from '../../components/Meta';
import { getCollectionTokens } from "../../api/profile"
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import User_collection_items from '../../components/collectrions/user_collection_items';

const Usercollection = () => {
    const [likesImage, setLikesImage] = useState(false);
    const { exploretype } = useSelector((state) => state.counter);
    const { address, isConnected } = useAccount()
    const router = useRouter();
    const pid = router.query.index;
    const [isloading, setisLoading] = useState(false)
    const [collection, setcollection] = useState([])
    const [collectiondetails, setcollectiondetails] = useState()
    const [copied, setCopied] = useState(false);

    const handleLikes = () => {
        if (!likesImage) {
            setLikesImage(true);
        } else {
            setLikesImage(false);
        }
    };

    useEffect(() => {
        setisLoading(true)
        if (pid) {
            getCollectionTokens(address, pid)
                .then((response) => {
                    if(response.data){
                        setcollection(response.data.tokens)
                        setcollectiondetails(response.data.collection !== null ? response.data.collection : null)
                        setisLoading(false)
                    } else{
                        console.log("error in getCollectionTokens")
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
                <div className="container py-5">
                    <div className="text-center">
                        <h2 className="font-display text-jacarta-700 mb-2 text-4xl font-medium dark:text-white">
                            {name ? name : null}
                        </h2>
                        {collectionaddress ? <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 mb-8 inline-flex items-center justify-center rounded-full border bg-white py-1.5 px-4">
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

                        <p className="dark:text-jacarta-300 mx-auto mb-0 max-w-xl text-lg"></p>
                        {createdat ? <span className="text-jacarta-400">Created {createdat}</span> : null}
                    </div>
                </div>

            </div>

            <User_collection_items collection={collection} isloading={isloading} collectiondetails={collectiondetails} />
        </>
    );
};

export default Usercollection;
