import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Feature_collections_data from '../../data/Feature_collections_data';
import { useSelector, useDispatch } from 'react-redux';
import Collection_setting_dropdown from '../dropdown/collection_setting_dropdown';
import { wrapCollectionModalShow } from "../../redux/counterSlice";


const Explore_collection_item_user = ({ itemFor, collections }) => {
    const { sortedCollectionData, exploretype } = useSelector((state) => state.counter);
    const [itemData, setItemData] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        setItemData(collections);
    }, [exploretype, collections, itemFor]);

    if (itemData !== null && typeof (itemData) != "undefined") {
        return (
            <>
                {itemData.map((item) => {
                    const id = item._id
                    const userImage = "/images/avatars/owner_5.png"
                    const title = item.name
                    const itemsCount = item.count
                    let userName = "Unknown"
                    if (item.createdUserName !== null) {
                        userName = item.createdUserName
                    }
                    if (item.createdUserImage !== null) {
                        userImage = item.createdUserImage
                    }
                    return (
                        <article key={id}>
                            <div className="dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2xl border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg">
                                <Link href={"/collection/" + id.toString()}>
                                    {typeof (item.tokens) != "undefined" ? <a className="flex space-x-[0.625rem]">
                                        {(item.tokens.length === 0) ? <span className="w-[100%]">
                                            <img
                                                src="https://res.cloudinary.com/isuruieee/image/upload/v1676888531/125451487-not-available-stamp-seal-watermark-with-distress-style-blue-vector-rubber-print-of-not-available_alfwie.webp"
                                                alt="item 1"
                                                className="h-80  w-full rounded-[0.625rem] object-cover"
                                                loading="lazy"
                                            />
                                        </span> : null}
                                        {(item.tokens.length === 1 || item.tokens.length === 2 || item.tokens.length === 3) ? <span className="w-[100%]">
                                            <img
                                                src={item.tokens[0]}
                                                alt="item 1"
                                                className="h-80 w-full rounded-[0.625rem] object-cover"
                                                loading="lazy"
                                            />
                                        </span> : <span className="w-[74.5%]">
                                            <img
                                                src={item.tokens[0]}
                                                alt="item 1"
                                                className="h-80 w-full rounded-[0.625rem] object-cover"
                                                loading="lazy"
                                            />
                                        </span>}
                                        {item.tokens.length >= 4 ? <span className="flex w-1/3 flex-col space-y-[0.625rem]">
                                            <img
                                                src={item.tokens[1]}
                                                alt="item 1"
                                                className="h-full rounded-[0.625rem] object-cover"
                                                loading="lazy"
                                            />
                                            <img
                                                src={item.tokens[2]}
                                                alt="item 1"
                                                className="h-full  rounded-[0.625rem] object-cover"
                                                loading="lazy"
                                            />
                                            <img
                                                src={item.tokens[3]}
                                                alt="item 1"
                                                className="h-full rounded-[0.625rem] object-cover"
                                                loading="lazy"
                                            />
                                        </span> : null}
                                    </a> : <a><span className="w-[100%]">
                                        <img
                                            src="https://res.cloudinary.com/isuruieee/image/upload/v1676888531/125451487-not-available-stamp-seal-watermark-with-distress-style-blue-vector-rubber-print-of-not-available_alfwie.webp"
                                            alt="item 1"
                                            className="h-80  w-full rounded-[0.625rem] object-cover"
                                            loading="lazy"
                                        />
                                    </span></a>}
                                </Link>

                                <div className="mt-2 flex items-center justify-between text-sm font-medium tracking-tight">
                                    <div className="flex flex-wrap items-center">
                                        <Link href={"/collection/" + id.toString()}>
                                            <a className="font-display hover:text-accent dark:hover:text-accent text-jacarta-700 mt-4 block text-base dark:text-white">
                                                {title}
                                            </a>
                                        </Link>
                                    </div>
                                    {/* Enable dropdown  */}
                                    {/* <div className="ml-auto flex items-stretch space-x-2 relative">
                                        <Collection_setting_dropdown classes="dark:border-jacarta-600 dark:hover:bg-jacarta-600 border-jacarta-100 dropdown hover:bg-jacarta-100 dark:bg-jacarta-700 rounded-xl border bg-white" />
                                    </div> */}
                                </div>

                                <div className="mt-2 flex items-center justify-between text-sm font-medium tracking-tight">
                                    <div className="flex flex-wrap items-center">
                                        <Link href={"/user/" + item.createdBy.toString()}>
                                            <a className="mr-2 shrink-0">
                                                <img src={userImage} alt="owner" className="h-5 w-5 rounded-full" />
                                            </a>
                                        </Link>
                                        <span className="dark:text-jacarta-400 mr-1">by</span>
                                        <Link href={"/user/" + item.createdBy.toString()}>
                                            <a className="text-accent">
                                                <span>{userName}</span>
                                            </a>
                                        </Link>
                                    </div>
                                    <span className="dark:text-jacarta-300 text-sm">{itemsCount} Items</span>
                                </div>

                                <div className="mt-8 flex items-center justify-between">
                                    <span className="dark:text-jacarta-200 text-sm">{item.tokenType}</span>
                                    {(item.tokenType === "ERC721" && !item.wrappedStatus) ?
                                        <button
                                            type="button"
                                            className="text-accent font-display text-sm font-semibold"
                                            onClick={() => dispatch(wrapCollectionModalShow(item))}
                                        >
                                            Wrap Collection
                                        </button> : null}
                                </div>
                            </div>
                        </article>
                    );
                })}
            </>
        );
    } else {
        return (
            <>
                {Feature_collections_data.map((item) => {
                    const {
                        id,
                        bigImage,
                        subImage1,
                        subImage2,
                        subImage3,
                        userImage,
                        title,
                        itemsCount,
                        userName,
                    } = item;
                    return (
                        <article key={id}>
                            <div className="dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2xl border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg">
                                <Link href="/collection/avatar_1">
                                    <a className="flex space-x-[0.625rem]">
                                        <span className="w-[74.5%]">
                                            <img
                                                src={bigImage}
                                                alt="item 1"
                                                className="h-full w-full rounded-[0.625rem] object-cover"
                                                loading="lazy"
                                            />
                                        </span>
                                        <span className="flex w-1/3 flex-col space-y-[0.625rem]">
                                            <img
                                                src={subImage1}
                                                alt="item 1"
                                                className="h-full rounded-[0.625rem] object-cover"
                                                loading="lazy"
                                            />
                                            <img
                                                src={subImage2}
                                                alt="item 1"
                                                className="h-full rounded-[0.625rem] object-cover"
                                                loading="lazy"
                                            />
                                            <img
                                                src={subImage3}
                                                alt="item 1"
                                                className="h-full rounded-[0.625rem] object-cover"
                                                loading="lazy"
                                            />
                                        </span>
                                    </a>
                                </Link>

                                <Link href="/collection/avatar_1">
                                    <a className="font-display hover:text-accent dark:hover:text-accent text-jacarta-700 mt-4 block text-base dark:text-white">
                                        {title}
                                    </a>
                                </Link>

                                <div className="mt-2 flex items-center justify-between text-sm font-medium tracking-tight">
                                    <div className="flex flex-wrap items-center">
                                        <Link href="/user/avatar_6">
                                            <a className="mr-2 shrink-0">
                                                <img src={userImage} alt="owner" className="h-5 w-5 rounded-full" />
                                            </a>
                                        </Link>
                                        <span className="dark:text-jacarta-400 mr-1">by</span>
                                        <Link href="/user/avatar_6">
                                            <a className="text-accent">
                                                <span>{userName}</span>
                                            </a>
                                        </Link>
                                    </div>
                                    <span className="dark:text-jacarta-300 text-sm">{itemsCount} Items</span>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </>
        );
    }
};

export default Explore_collection_item_user;
