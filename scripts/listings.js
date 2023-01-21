import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import {
    useAccount,
    useConnect,
    useDisconnect,
    useEnsAvatar,
    useEnsName,
    useSigner,
    useProvider,
} from "wagmi";

import AvianMarket from "../contracts/AvianMarket.sol/AvianMarket.json"
import RimeRent from "../contracts/RimeRent.sol/RimeRent.json"
import RimeToken from "../contracts/RimeToken.sol/RimeToken.json"

import { amplace_token, rime_token, rime_rent }  from "../utils/contracts";

const getItems = async (address) => {
    // const { address } = useAccount()
    // const provider = useProvider()
    // console.log(provider.connection.url)
    const provider = new ethers.providers.JsonRpcProvider("https://api.avax-test.network/ext/bc/C/rpc")

    const _marketplace = new ethers.Contract( // We will use this to interact with the AuctionManager
        amplace_token,
        AvianMarket.abi,
        provider
    );

    const nftrentalsContracts = new ethers.Contract( // We will use this to interact with the AuctionManager
        rime_rent,
        RimeRent.abi,
        provider
    );

    const nftContracts = new ethers.Contract( // We will use this to interact with the AuctionManager
        rime_token,
        RimeToken.abi,
        provider
    );
    
    let items = await _marketplace.getSellListings(); // Get the tokens owned by the user

    const listingsExtendedTransformed = {};
    const collections = []
    
    let nfts = await Promise.all(
        items.map(async listing => {
          const {
            nftContract: nftContractAddress,
            pricePerDay: pricePerDayStr,
            startDateUNIX: startDateUnixStr,
            endDateUNIX: endDateUnixStr,
            expires: expiresStr,
            tokenId,
            owner,
            user
          } = listing;

          if (!collections.includes(nftContractAddress)){
            collections.push(nftContractAddress)
          }

          let tokenUri = ""

          if (nftContractAddress === "0xA5e80F4980878b7C2c23D6fA002358A47d0060a3"){
            tokenUri = await nftrentalsContracts.tokenURI(parseInt(tokenId.toString()));
          } else {
            tokenUri = await nftContracts.tokenURI(parseInt(tokenId.toString()));
          }


          let tokenUriRes;
          try {
            tokenUriRes = await (await fetch(tokenUri)).json();
          } catch (err) {
            console.error("Bad uri");
          }

          // const noUser = parseInt(user) !== 0;
          const pricePerDay = parseInt(pricePerDayStr);
          const startDateUnix = parseInt(startDateUnixStr);
          const endDateUnix = parseInt(endDateUnixStr);
          const duration = endDateUnix - startDateUnix;
          const expires = parseInt(expiresStr);
          const isOwner = owner === address;
          const isUser = user === address;
          const transformedData = {
            pricePerDay,
            startDateUnix,
            endDateUnix,
            duration,
            expires,
            user
          };
          const listingExtended = {
            ...listing,
            ...transformedData,
            nftContractAddress,
            tokenUri,
            tokenUriRes,
            isOwner,
            isUser
          };
          [
            ...Array(8).keys(),
            "nftContract",
            "startDateUNIX",
            "endDateUNIX",
          ].forEach(i => void delete listingExtended[i]);

          if (listingsExtendedTransformed[nftContractAddress]) {
            listingsExtendedTransformed[nftContractAddress][parseInt(tokenId, 16)] = transformedData;
          } else {
            listingsExtendedTransformed[nftContractAddress] = { [parseInt(tokenId, 16)]: transformedData };
          }

          return listingExtended;
        })
    );
    console.log(nfts)
    return nfts;
}

let nftListings = []


const getnftListingsFunc = async () => {
    nftListings = await  getItems()
    return nftListings;
} 

// module.exports = {
//     getnftListingsFunc
// }

export default getnftListingsFunc;