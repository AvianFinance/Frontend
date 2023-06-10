import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Image from "next/image";
import Link from "next/link";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Likes from "../likes";
import Auctions_dropdown from "../dropdown/Auctions_dropdown";
import { useDispatch, useSelector } from "react-redux";
import { listbuyModalShow, listrentModalShow, listinstallmentModalShow, isloading } from "../../redux/counterSlice";
import {
	useAccount,
} from 'wagmi'
import CircularProgress from '@mui/material/CircularProgress';

const Collected = (collectedNFT) => {
  const { sortedtrendingCategoryItemData, isloading } = useSelector(
    (state) => state.counter
  );
  console.log(collectedNFT.collectedNFT)
  const dispatch = useDispatch();
  const { address, isConnected } = useAccount()
  const [islisting, setIslisting] = useState(false)

  useEffect(() => {
		console.log("state refreshed")
	}, [isloading]);

  let filtered
 
  if(collectedNFT.filterVal == 1){
    filtered = collectedNFT.collectedNFT.filter((item) => {
        return item.tokenUriRes.token === "ERC721";
    });
  }
  else if(collectedNFT.filterVal === 2){
    filtered = collectedNFT.collectedNFT.filter((item) => {
      return item.tokenUriRes.token === "ERC4907";
    });
  }
  else{
    filtered = collectedNFT.collectedNFT.map((item) => {
        return item;
    });
  }

  if(collectedNFT){

      return (
        <div>
          <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4">
          {filtered.map((item, index) => {
            const id = index
            let image
            let title
            let tokentype
            let inst_listed_status 
            let	rent_listed_status
            let	sell_listed_status 
            let owner
            let user
            if(item.tokenUriRes){
              image = item.tokenUriRes.image 
              title = item.tokenUriRes.name
              tokentype = item.tokenUriRes.token,
              inst_listed_status = item.tokenUriRes.inst_listed_status,
              rent_listed_status = item.tokenUriRes.rent_listed_status,
              sell_listed_status = item.tokenUriRes.sell_listed_status,
              owner = item.tokenUriRes.owner
              user = item.tokenUriRes.user
            } else {
              image = "https://res.cloudinary.com/isuruieee/image/upload/v1676888531/125451487-not-available-stamp-seal-watermark-with-distress-style-blue-vector-rubber-print-of-not-available_alfwie.webp"
              title = "Unknown"
              inst_listed_status = true,
              rent_listed_status = true,
              sell_listed_status = true
            }
            
            const itemLink = item.token_address + '&' + item.token_id
            return (
              <article key={id}>
                <div className="dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2.5xl block border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg">
                  <figure className="relative">
                    <Link href={`/item/${itemLink}`}>
                      <a>
                        <img
                          src={image}
                          alt="item 5"
                          className="w-full h-[230px] rounded-[0.625rem] object-cover"
                        />
                      </a>
                    </Link>
  
                    {/* <Likes like={likes} /> */}
  
                    {/* <div className="absolute left-3 -bottom-3">
                      <div className="flex -space-x-2">
                        <Link href={`/item/${itemLink}`}>
                          <a>
                            <Tippy content={<span>creator: {creator.name}</span>}>
                              <img
                                src={creator.image}
                                alt="creator"
                                className="dark:border-jacarta-600 hover:border-accent dark:hover:border-accent h-6 w-6 rounded-full border-2 border-white"
                              />
                            </Tippy>
                          </a>
                        </Link>
                        <Link href={`/item/${itemLink}`}>
                          <a>
                            <Tippy content={<span>creator: {owner.name}</span>}>
                              <img
                                src={owner.image}
                                alt="owner"
                                layout="fill"
                                className="dark:border-jacarta-600 hover:border-accent dark:hover:border-accent h-6 w-6 rounded-full border-2 border-white"
                              />
                            </Tippy>
                          </a>
                        </Link>
                      </div>
                    </div> */}
                  </figure>
                  <div className="mt-7 flex items-center justify-between">
                    <Link href={`/item/${itemLink}`}>
                      <a>
                        <span className="font-display text-jacarta-700 hover:text-accent text-base dark:text-white">
                          {title}
                        </span>
                      </a>
                    </Link>
                    {/* <Link href={`/item/${itemLink}`}>
                      <a className="group flex items-center">
                        <svg className="icon icon-history group-hover:fill-accent dark:fill-jacarta-200 fill-jacarta-500 mr-1 mb-[3px] h-4 w-4">
                          <use xlinkHref="/icons.svg#icon-history"></use>
                        </svg>
                        <span className="group-hover:text-accent font-display dark:text-jacarta-200 text-sm font-semibold">
                          View History
                        </span>
                      </a>
                    </Link> */}
                    {/* auction dropdown  */}
                    {/* <Auctions_dropdown classes="dark:hover:bg-jacarta-600 dropup hover:bg-jacarta-100 rounded-full" /> */}
                  </div>
                  {/* <div className="mt-2 text-sm">
                    <span className="dark:text-jacarta-200 text-jacarta-700 mr-1">
                      {price}
                    </span>
                    <span className="dark:text-jacarta-300 text-jacarta-500">
                      {bidCount}/{bidLimit}
                    </span>
                  </div> */}
                  {(!sell_listed_status && !rent_listed_status && !inst_listed_status && owner===address) ? 
                    <div className="flex items-center justify-between">
                      <button
                        className="text-accent font-display text-sm font-semibold"
                        onClick={() => {
                          dispatch(listbuyModalShow(item))
                        }}
                      >
                        Sell Now
                      </button>
                    </div> : null
                  }
                  {(!sell_listed_status && !rent_listed_status && !inst_listed_status && owner===address && user===address) ? 
                    <div className="flex items-center justify-between">
                      {tokentype ==="ERC4907" ? <button
                        className="text-accent font-display text-sm font-semibold"
                        onClick={() => {
                          dispatch(listrentModalShow(item))
                        }}
                      >
                        Upright Rental
                      </button> : null}
                    </div> : null
                  }
                  {(!sell_listed_status && !rent_listed_status && !inst_listed_status && owner===address && user===address) ? 
                    <div className="flex items-center justify-between">
                      {tokentype ==="ERC4907" ? <button
                        className="text-accent font-display text-sm font-semibold"
                        onClick={() => {
                          dispatch(listinstallmentModalShow(item))
                        }}
                      >
                        Installment Rental
                      </button> : null}
                    </div> : null
                  }            
                </div>
              </article>
            );
          })}
          </div>
          <div className={isloading ? 'modal fade show block' : 'modal fade'}>
            <div className="modal-dialog max-w-xxl">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="addPropertiesLabel">
                    Waiting for NFT Listing
                  </h5>
                </div>
                  <div className='modal-body p-6'>
                  <div className="flex justify-center items-center">
                    <CircularProgress/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      ); 

      
  } else {
    return (
      <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4">
        {sortedtrendingCategoryItemData.map((item) => {
          const {
            id,
            image,
            title,
            price,
            bidLimit,
            bidCount,
            likes,
            creator,
            owner,
          } = item;
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
                  <Link href={`/item/${itemLink}`}>
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
                      <Link href={`/item/${itemLink}`}>
                        <a>
                          <Tippy content={<span>creator: {creator.name}</span>}>
                            <img
                              src={creator.image}
                              alt="creator"
                              className="dark:border-jacarta-600 hover:border-accent dark:hover:border-accent h-6 w-6 rounded-full border-2 border-white"
                            />
                          </Tippy>
                        </a>
                      </Link>
                      <Link href={`/item/${itemLink}`}>
                        <a>
                          <Tippy content={<span>creator: {owner.name}</span>}>
                            <img
                              src={owner.image}
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
                  <Link href={`/item/${itemLink}`}>
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
                    {price}
                  </span>
                  <span className="dark:text-jacarta-300 text-jacarta-500">
                    {bidCount}/{bidLimit}
                  </span>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <button
                    className="text-accent font-display text-sm font-semibold"
                    onClick={() => dispatch(listbuyModalShow())}
                  >
                    List now
                  </button>
                  <Link href={`/item/${itemLink}`}>
                    <a className="group flex items-center">
                      <svg className="icon icon-history group-hover:fill-accent dark:fill-jacarta-200 fill-jacarta-500 mr-1 mb-[3px] h-4 w-4">
                        <use xlinkHref="/icons.svg#icon-history"></use>
                      </svg>
                      <span className="group-hover:text-accent font-display dark:text-jacarta-200 text-sm font-semibold">
                        View History
                      </span>
                    </a>
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    );
  }
};

export default Collected;
