import React, { useEffect, useState } from "react";
import Link from "next/link";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Likes from "../likes";
import Auctions_dropdown from "../dropdown/Auctions_dropdown";
import { useDispatch, useSelector } from "react-redux";
import { depositTokenModalShow } from "../../redux/counterSlice";
import {
    useAccount,
} from 'wagmi'

const User_collection_token = ({ collection, collectiondetails }) => {
    const dispatch = useDispatch();
    const [type, settype] = useState();
    const [nftitems, setItems] = useState([]);
    const [collectionData, setcollectionData] = useState()
    const { address } = useAccount()

    useEffect(() => {
        setItems(collection)
        setcollectionData(collectiondetails)
    }, [collection]);

    return (
        <div>
            <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4">
                {nftitems.map((item) => {
                    const id = item._id
                    const image = item.uri
                    const title = item.name
                    const owner = item.ownerUserName
                    const ownerImage = item.ownerUserImage
                    const itemLink = image
                        .split("/")
                        .slice(-1)
                        .toString()
                        .replace(".jpg", "")
                        .replace(".gif", "");

                    const shouldRenderArticle = address === item.owner

                    if (!shouldRenderArticle) {
                        return null; // Skip rendering the article div
                    }

                    return (
                        <article key={id}>
                            <div className="dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2.5xl block border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg">
                                <figure className="relative">
                                    <img
                                        src={image}
                                        alt="item 5"
                                        className="w-full h-[230px] rounded-[0.625rem] object-cover"
                                    />
                                    <div className="absolute left-3 -bottom-3">
                                        <div className="flex -space-x-2">
                                            <Tippy content={<span>Owner: {owner}</span>}>
                                                <img
                                                    src={ownerImage? ownerImage : "/images/avatars/avatar_2.jpg"}
                                                    alt="owner"
                                                    layout="fill"
                                                    className="dark:border-jacarta-600 hover:border-accent dark:hover:border-accent h-6 w-6 rounded-full border-2 border-white"
                                                />
                                            </Tippy>
                                        </div>
                                    </div>
                                </figure>
                                <div className="mt-7 flex items-center justify-between">
                                    <Link href={`/item/${item.coll_addr}&${item.token_id}`}>
                                        <a>
                                            <span className="font-display text-jacarta-700 hover:text-accent text-base dark:text-white">
                                                {title}
                                            </span>
                                        </a>
                                    </Link>
                                </div>

                                {(address === item.owner && collectiondetails.tokenType === "ERC721" && collectiondetails.wrappedStatus ) ? 
                                <div className="mt-8 flex items-center justify-between">
                                    <button
                                        className="text-accent font-display text-sm font-semibold"
                                        onClick={() => {
                                            dispatch(depositTokenModalShow({nft: item , coll: collectiondetails}))
                                        }}
                                    >
                                        Deposit Token
                                    </button>
                                </div> : null}
                            </div>
                        </article>
                    );
                })}
            </div>
        </div>

    );
};

export default User_collection_token;
