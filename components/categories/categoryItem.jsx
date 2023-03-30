import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Likes from "../likes";
import Auctions_dropdown from "../dropdown/Auctions_dropdown";
import { useDispatch, useSelector } from "react-redux";
import { buyModalShow } from "../../redux/counterSlice";
import {
	useAccount,
} from 'wagmi'

const CategoryItem = (collection) => {
  const { sortedtrendingCategoryItemData } = useSelector(
    (state) => state.counter
  );
  const dispatch = useDispatch();
  const { exploretype } = useSelector((state) => state.counter);
  const [type, settype] = useState();
  const [nftitems, setItems] = useState([]);
  const [filterVal, setFilterVal] = useState(0);
  const [filtered, setfiltered] = useState([])
  const { address } = useAccount()

  const handleItemFilter = (text) => {
    if (text === "Upright") {
      setfiltered(nftitems.upright)
    } else {
      setfiltered(nftitems.inst)
    }
  };
  
  // console.log(exploretype)
  useEffect(() => {
		// console.log(collection)
    // console.log(exploretype)
    // console.log(collection.collection.collection)
    settype(exploretype)
    if(exploretype=="rent"){
      setItems(collection.collection.collection)
      setfiltered(collection.collection.collection.upright)
    } else{
      setItems(collection.collection.collection)
      setfiltered(collection.collection.collection)
    }
	}, [collection, exploretype]);

  console.log(filtered)
  if(filtered.length>0){
    console.log(filtered)
    return (
      <div>
          {exploretype=="rent" ? 
          <div className="mb-8 flex flex-wrap items-start justify-between">
              <ul className="flex flex-wrap items-center">
                {[{id: 1, svg: "art", text: "Upright",}, {id: 3,svg: "domain",text: "Installment",}].map(({ id, svg, text }) => {
                  if (text === "all") {
                    return (
                      <li
                        className="my-1 mr-2.5"
                        key={id}
                        onClick={() => {
                          handleItemFilter(text);
                          setFilterVal(id);
                        }}
                      >
                        <button
                          className={
                            filterVal === id
                              ? " group bg-accent font-display flex h-9 items-center justify-center rounded-lg px-4 text-sm font-semibold transition-colors border-transparent text-white capitalize"
                              : "dark:border-jacarta-600 dark:bg-jacarta-900 dark:hover:bg-accent group hover:bg-accent border-jacarta-100 font-display text-jacarta-500 flex h-9 items-center rounded-lg border bg-white px-4 text-sm font-semibold transition-colors hover:border-transparent hover:text-white dark:text-white dark:hover:border-transparent dark:hover:text-white capitalize"
                          }
                        >
                          {text}
                        </button>
                      </li>
                    );
                  } else {
                    return (
                      <li
                        className="my-1 mr-2.5"
                        key={id}
                        onClick={() => {
                          handleItemFilter(text);
                          setFilterVal(id);
                        }}
                      >
                        <button
                          className={
                            filterVal === id
                              ? "dark:border-jacarta-600 bg-accent group border-jacarta-100 font-display flex h-9 items-center rounded-lg border px-4 text-sm font-semibold transition-colors border-transparent dark:border-transparent text-white"
                              : "dark:border-jacarta-600 dark:bg-jacarta-900 dark:hover:bg-accent group hover:bg-accent border-jacarta-100 font-display text-jacarta-500 flex h-9 items-center rounded-lg border bg-white px-4 text-sm font-semibold transition-colors hover:border-transparent hover:text-white dark:text-white dark:hover:border-transparent dark:hover:text-white"
                          }
                        >
                          <svg
                            className={
                              filterVal === id
                                ? "icon mr-1 h-4 w-4 transition-colors fill-white"
                                : "icon fill-jacarta-700 dark:fill-jacarta-100 mr-1 h-4 w-4 transition-colors group-hover:fill-white"
                            }
                          >
                            <use xlinkHref={`/icons.svg#icon-${svg}`}></use>
                          </svg>
                          <span>{text}</span>
                        </button>
                      </li>
                    );
                  }
                })}
              </ul>
          </div> : null }
          <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4">
        {filtered.map((item) => {
          // console.log(item)
          const id = item._id
          const image = item.uri
          const title = item.name
          let price = 0
          // console.log(item)
          if(type === "buy" && item.price !== null) {
            price = parseFloat((item.price.hex) * Math.pow(10, -18), 16).toString()
          } 
          if(type === "rent" && item.pricePerDay !== null) {
            price = parseFloat((item.pricePerDay.hex) * Math.pow(10, -18), 16).toString()
          }
          const likes = 100
          const creator = "Wow Fans"
          const owner = "NFT Star"
          const itemLink = image
            .split("/")
            .slice(-1)
            .toString()
            .replace(".jpg", "")
            .replace(".gif", "");
          return (
            <article key={id}>
              <div className="dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2.5xl block border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg">
                <figure className="relative">
                  <Link href={`/item/${item.coll_addr}&${item.token_id}`}>
                    <a>
                      <img
                        src={image}
                        alt="item 5"
                        className="w-full h-[230px] rounded-[0.625rem] object-cover"
                      />
                    </a>
                  </Link>
  
                  <Likes like={likes} />
  
                  <div className="absolute left-3 -bottom-3">
                    <div className="flex -space-x-2">
                      <Link href={`/item/${item.coll_addr}&${item.token_id}`}>
                        <a>
                          <Tippy content={<span>creator: {creator}</span>}>
                            <img
                              src='/images/avatars/avatar_1.jpg'
                              alt="creator"
                              className="dark:border-jacarta-600 hover:border-accent dark:hover:border-accent h-6 w-6 rounded-full border-2 border-white"
                            />
                          </Tippy>
                        </a>
                      </Link>
                      <Link href={`/item/${item.coll_addr}&${item.token_id}`}>
                        <a>
                          <Tippy content={<span>creator: {owner}</span>}>
                            <img
                              src="/images/avatars/avatar_2.jpg"
                              alt="owner"
                              layout="fill"
                              className="dark:border-jacarta-600 hover:border-accent dark:hover:border-accent h-6 w-6 rounded-full border-2 border-white"
                            />
                          </Tippy>
                        </a>
                      </Link>
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
  
                  {/* auction dropdown  */}
                  <Auctions_dropdown classes="dark:hover:bg-jacarta-600 dropup hover:bg-jacarta-100 rounded-full" />
                </div>
                <div className="mt-2 text-sm">
                  <span className="dark:text-jacarta-200 text-jacarta-700 mr-1">
                    {price} AVAX
                  </span>
                </div>
  
                {(address !== item.owner && address !== item.user ) ? <div className="mt-8 flex items-center justify-between">
                  <button
                    className="text-accent font-display text-sm font-semibold"
                    onClick={() => dispatch(buyModalShow(item))}
                  >
                    {type === "rent" ? "Rent Now" : "Buy Now"}
                  </button>
                  <Link href={`/item/${item.coll_addr}&${item.token_id}`}>
                    <a className="group flex items-center">
                      <svg className="icon icon-history group-hover:fill-accent dark:fill-jacarta-200 fill-jacarta-500 mr-1 mb-[3px] h-4 w-4">
                        <use xlinkHref="/icons.svg#icon-history"></use>
                      </svg>
                      <span className="group-hover:text-accent font-display dark:text-jacarta-200 text-sm font-semibold">
                        View History
                      </span>
                    </a>
                  </Link>
                </div> : null}
              </div>
            </article>
          );
        })}
          </div>
      </div>
      
    );
  } else {
    console.log("hiii")
  }
  
};

export default CategoryItem;
