import React, { useState, useEffect } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import Collection_dropdown3 from "../../components/dropdown/collection_dropdown3";
import {
  collectionDropdown2_data,
  EthereumDropdown2_data,
} from "../../data/dropdown";
import { FileUploader } from "react-drag-drop-files";
import { useRouter } from 'next/router';
import Proparties_modal from "../../components/modal/proparties_modal";
import { useSelector, useDispatch } from 'react-redux';
import { showPropatiesModal } from "../../redux/counterSlice";
import Meta from "../../components/Meta";
import FormData from "form-data";
import {
	useAccount,
  useSigner,
} from 'wagmi'
import { getCollections, mintNft, uploadIPFS } from "../../api/mint"
import axios from 'axios';
import { ethers } from "ethers";
import { showToast, propartiesModalValue } from '../../redux/counterSlice';
import CircularProgress from '@mui/material/CircularProgress';
import RimeRent from "../../contracts/AVFXRent.sol/AVFXRent.json"
import RimeToken from "../../contracts/AVFXGeneral.sol/AVFXGeneral.json"
import Error from "next/error";

const Create = () => {
  const { propartiesModalValue } = useSelector((state) => state.counter);
  const { address, isConnected } = useAccount()
  const [collections, setCollections] = useState([])
  const { data: signer, isError } = useSigner()
  const [name, setName] = useState({value:"",errorVal:""})
  const [ipfs, setIPFS] = useState({value:"",errorVal:""})
	const [description, setDescription] = useState({value:"",errorVal:""})
	const [activeItem, setActiveItem] = useState();
  const [isloading, setisLoading] = useState(true);
  const [isminting, setisminting] = useState(false);
  const router = useRouter();

  const fileTypes = [
    "JPG",
    "PNG",
    "GIF",
    "SVG",
    // "MP4",
    // "WEBM",
    // "MP3",
    // "WAV",
    // "OGG",
    // "GLB",
    // "GLTF",
  ];
  const [file, setFile] = useState("");

  const dispatch = useDispatch();

  const urltoblob = (dataURI) => {

    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    var blob = new Blob([ab], {type: mimeString});
    return blob;
  
  }

  const handleChange = async (fileImg) => {
    try {
      const formData = new FormData();
      formData.append("file", fileImg, fileImg.name);
      let url = "https://api.pinata.cloud/pinning/pinFileToIPFS"
      const resFile = await axios.post(   
          url,
          formData,
          {
            maxContentLength: "Infinity",
            headers: {
                "Content-Type": `multipart/form-data;boundary=${formData._boundary}`,
                'pinata_api_key': "47f7e9259ff696e4678d",
                'pinata_secret_api_key': "617b7e690d835deec904fbb0a5ed5ced9573e392500dccca1e23b8bf386ca455" ,

            }
          }
      );
      const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;   
      setIPFS({value: ImgHash, errorVal:""})
      dispatch(showToast(["success","Image Uploaded to IPFS"]))
    } catch (error) {
      dispatch(showToast(["error",error.message]))
    }
  };

  const getCollectionDetails = (waddress) => {
    getCollections(waddress)
      .then((response) => {
        if (response.data){
          setCollections(response.data)
        } else {
          console.log("error in getcollections")
        }
        
    })
  }

  useEffect(() => {
		getCollectionDetails(address)
	}, [isConnected, address, propartiesModalValue]);

  const handleInputChange = (e, item) => {
		switch(item) {
			case "description":
				setDescription({value: e.target.value, errorVal:""})
				break;
			case "name":
				setName({value: e.target.value, errorVal:""})
				break;
      case "ipfs":
        setIPFS({value: e.target.value, errorVal:""})
        break;
			default:
			  console.log(item)
		}
	};

  const submit = async (e) => {
    setisLoading(false)
    setisminting(true)
    try{
      if(name.value == "" | description.value == "" | ipfs.value == "" | activeItem == "") {
        dispatch(showToast(["error","Provide all the required details"]))
      } else {
        let obj ={
          nftName : name.value,
          nftDescription : description.value,
          uri : ipfs.value,
          coll_addr : activeItem
        }

        let responseipfs
        try{
          await uploadIPFS(obj)
            .then((response) => {
              if (response.error){
                console.log(response.error.response.data.message)
                dispatch(showToast(["error",response.error.response.data.message]))
                throw new Error(response.error.response.data.message)
              }
              responseipfs = response.data
            })
        } catch(error){
          dispatch(showToast(["error","uploading failed"]))
        }
        await mintToken(`https://gateway.pinata.cloud/ipfs/${responseipfs.ipfsHash.ipfsHash}`, responseipfs.token_type ,activeItem, responseipfs)
        dispatch(showToast(["success","NFT Minted!"]))
      }  
    } catch(error){
      dispatch(showToast(["error",error.reason]))
    }
    setisLoading(true)
  }

  const mintToken = async (ipfsUrl,token,contractaddress, responseipfs) => {
  
    let nft_contract

    if (token){
      nft_contract = await new ethers.Contract( // We will use this to interact with the AuctionManager
          contractaddress,
          RimeRent.abi,
          signer
      )
    } else {
      nft_contract = await new ethers.Contract( // We will use this to interact with the AuctionManager
          contractaddress,
          RimeToken.abi,
          signer
      )
    }

    const transaction = await nft_contract.mint(ipfsUrl)

    let saveNFT = {
      "coll_addr": activeItem,
      "token_id": parseInt((responseipfs.tokenCounter.hex), 16),
      "name": name.value,
      "desc": description.value,
      "uri": ipfs.value,
      "minter": address
    }

    await mintNft(saveNFT)
			.then((response) => {
				 console.log(response)
			})
    setisminting(false)
    router.push(`/user/${address}`)
    
  }
  
  if(isloading){
    return (
      <div>
        <Meta title="Create || Xhibiter | NFT Marketplace Next.js Template" />
        {/* <!-- Create --> */}
        <section className="relative py-24">
          <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
            <img
              src="/images/gradient_light.jpg"
              alt="gradient"
              className="h-full w-full"
            />
          </picture>
          <div className="container">
            <h1 className="font-display text-jacarta-700 py-16 text-center text-4xl font-medium dark:text-white">
              Create New Item
            </h1>
  
            <div className="mx-auto max-w-[48.125rem]">
              {/* <!-- File Upload --> */}
              <div className="mb-6">
                <label className="font-display text-jacarta-700 mb-2 block dark:text-white">
                  Image
                  <span className="text-red">*</span>
                </label>
  
                {file ? (
                  <p className="dark:text-jacarta-300 text-2xs mb-3">
                    successfully uploaded : {file}
                  </p>
                ) : (
                  <p className="dark:text-jacarta-300 text-2xs mb-3">
                    Drag or choose your file to upload
                  </p>
                )}
  
                {(ipfs.value.length<=3) ? <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 group relative flex max-w-md flex-col items-center justify-center rounded-lg border-2 border-dashed bg-white py-20 px-5 text-center">
                  <div className="relative z-10 cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      className="fill-jacarta-500 mb-4 inline-block dark:fill-white"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M16 13l6.964 4.062-2.973.85 2.125 3.681-1.732 1-2.125-3.68-2.223 2.15L16 13zm-2-7h2v2h5a1 1 0 0 1 1 1v4h-2v-3H10v10h4v2H9a1 1 0 0 1-1-1v-5H6v-2h2V9a1 1 0 0 1 1-1h5V6zM4 14v2H2v-2h2zm0-4v2H2v-2h2zm0-4v2H2V6h2zm0-4v2H2V2h2zm4 0v2H6V2h2zm4 0v2h-2V2h2zm4 0v2h-2V2h2z" />
                    </svg>
                    <p className="dark:text-jacarta-300 mx-auto max-w-xs text-xs">
                      JPG, PNG, GIF, SVG
                    </p>
                  </div> 
                  <div className="dark:bg-jacarta-600 bg-jacarta-50 absolute inset-4 cursor-pointer rounded opacity-0 group-hover:opacity-100 ">
                    {/* <FileUploader
                      onChange={(e) => handleChange(e.target.files[0])}
                      name="file"
                      types={fileTypes}
                      classes="file-drag"
                      maxSize={100}
                      minSize={0}
                    /> */}
                    <input
                      type="file"
                      name="myimage"
                      // ref={inputRef}
                      onChange={(e) => handleChange(e.target.files[0])}
                      style={{ display: 'block' }}
                      accept="JPG|PNG|GIF|SVG"
                      // types={fileTypes}
                    />
                  </div>
                </div> : 
                <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 group relative flex max-w-md flex-col items-center justify-center rounded-lg border-2 border-dashed bg-white py-20 px-5 text-center">
                <figure className="relative">
                      <img
                        src={ipfs.value}
                        alt="item 5"
                        className="w-full h-[230px] rounded-[0.625rem] object-cover"
                        width={50}
                        height={50}
                      />
                </figure>
                </div>
                }

              </div> 
  
              {/* IPFS LINK */}
            <div className="mb-6">
                <label
                  htmlFor="item-description"
                  className="font-display text-jacarta-700 mb-2 block dark:text-white"
                >
                  IPFS Link<span className="text-red">*</span>
                </label>
                <input
                  type="text"
                  id="item-name"
                  className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                  placeholder="IPFS Link"
                  onChange={(e) => handleInputChange(e, "ipfs")}
                  required
                  disabled
                  value={ipfs.value}
                />
            </div>

            {/* <!-- Collection --> */}
            <div className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-display text-jacarta-700 mb-2 block dark:text-white">
                      Collection<span className="text-red">*</span>
                    </label>
                    <div className="mb-3 flex items-center space-x-2">
                      <p className="dark:text-jacarta-300 text-2xs">
                        This is the collection where your item will appear.
                        <Tippy
                          theme="tomato-theme"
                          content={
                            <span>
                              Moving items to a different collection may take up to
                              30 minutes.
                            </span>
                          }
                        >
                          <span className="inline-block">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="24"
                              height="24"
                              className="dark:fill-jacarta-300 fill-jacarta-500 ml-1 -mb-[3px] h-4 w-4"
                            >
                              <path fill="none" d="M0 0h24v24H0z"></path>
                              <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM11 7h2v2h-2V7zm0 4h2v6h-2v-6z"></path>
                            </svg>
                          </span>
                        </Tippy>
                      </p> 
                    </div>
                  </div>
                  
                  <div>
                      <button
                        className="group dark:bg-jacarta-700 hover:bg-accent border-accent flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border bg-white hover:border-transparent"
                        onClick={() => dispatch(showPropatiesModal())}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          className="fill-accent group-hover:fill-white"
                        >
                          <path fill="none" d="M0 0h24v24H0z" />
                          <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" />
                        </svg>
                      </button>
                  </div>
  
                </div>
  
                {/* dropdown */}
                <div className="dropdown my-1 cursor-pointer mb-6">
                  <Collection_dropdown3
                    data={(collections !== null) ?  collections :collectionDropdown2_data}
                    // data={collectionDropdown2_data}
                    collection={true}
                    activeItem = {activeItem}
                    setActiveItem = {setActiveItem}
                  />
                </div>
              </div>
  
              {/* <!-- Name --> */}
            <div className="mb-6">
                <label
                  htmlFor="item-name"
                  className="font-display text-jacarta-700 mb-2 block dark:text-white"
                >
                  Name<span className="text-red">*</span>
                </label>
                <input
                  type="text"
                  id="item-name"
                  className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                  placeholder="Item name"
                  onChange={(e) => handleInputChange(e, "name")}
                  required
                  value={name.value}
  
                />
            </div>
  
            {/* <!-- Description --> */}
            <div className="mb-6">
                <label
                  htmlFor="item-description"
                  className="font-display text-jacarta-700 mb-2 block dark:text-white"
                >
                  Description<span className="text-red">*</span>
                </label>
                <p className="dark:text-jacarta-300 text-2xs mb-3">
                  The description will be included on the {"item's"} detail page
                  underneath its image. Markdown syntax is supported.
                </p>
                <textarea
                  id="item-description"
                  className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                  rows="4"
                  onChange={(e) => handleInputChange(e, "description")}
                  required
                  value={description.value}
                  placeholder="Provide a detailed description of your item."
                ></textarea>
            </div>
  
  
              <Proparties_modal />
  
              {/* <!-- Submit --> */}
              <button
                className="bg-accent-lighter cursor-default rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
                onClick={submit}
              >
                Create
              </button>
            </div>
          </div>
        </section>
        {/* <!-- end create --> */}
      </div>
    );
  } else {
    return (
      <div>
        <div>
        <Meta title="Create || Xhibiter | NFT Marketplace Next.js Template" />
        {/* <!-- Create --> */}
        <section className="relative py-24">
          <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
            <img
              src="/images/gradient_light.jpg"
              alt="gradient"
              className="h-full w-full"
            />
          </picture>
          <div className="container">
            <h1 className="font-display text-jacarta-700 py-16 text-center text-4xl font-medium dark:text-white">
              Create New Item
            </h1>
  
            <div className="mx-auto max-w-[48.125rem]">
              {/* <!-- File Upload --> */}
              <div className="mb-6">
                <label className="font-display text-jacarta-700 mb-2 block dark:text-white">
                  Image
                  <span className="text-red">*</span>
                </label>
  
                {file ? (
                  <p className="dark:text-jacarta-300 text-2xs mb-3">
                    successfully uploaded : {file}
                  </p>
                ) : (
                  <p className="dark:text-jacarta-300 text-2xs mb-3">
                    Drag or choose your file to upload
                  </p>
                )}
  
                {(ipfs.value.length<=3) ? <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 group relative flex max-w-md flex-col items-center justify-center rounded-lg border-2 border-dashed bg-white py-20 px-5 text-center">
                  <div className="relative z-10 cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      className="fill-jacarta-500 mb-4 inline-block dark:fill-white"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M16 13l6.964 4.062-2.973.85 2.125 3.681-1.732 1-2.125-3.68-2.223 2.15L16 13zm-2-7h2v2h5a1 1 0 0 1 1 1v4h-2v-3H10v10h4v2H9a1 1 0 0 1-1-1v-5H6v-2h2V9a1 1 0 0 1 1-1h5V6zM4 14v2H2v-2h2zm0-4v2H2v-2h2zm0-4v2H2V6h2zm0-4v2H2V2h2zm4 0v2H6V2h2zm4 0v2h-2V2h2zm4 0v2h-2V2h2z" />
                    </svg>
                    <p className="dark:text-jacarta-300 mx-auto max-w-xs text-xs">
                      JPG, PNG, GIF, SVG
                    </p>
                  </div> 
                  <div className="dark:bg-jacarta-600 bg-jacarta-50 absolute inset-4 cursor-pointer rounded opacity-0 group-hover:opacity-100 ">
                    {/* <FileUploader
                      onChange={(e) => handleChange(e.target.files[0])}
                      name="file"
                      types={fileTypes}
                      classes="file-drag"
                      maxSize={100}
                      minSize={0}
                    /> */}
                    <input
                      type="file"
                      name="myimage"
                      // ref={inputRef}
                      onChange={(e) => handleChange(e.target.files[0])}
                      style={{ display: 'block' }}
                      accept="JPG|PNG|GIF|SVG"
                      // types={fileTypes}
                    />
                  </div>
                </div> : 
                <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 group relative flex max-w-md flex-col items-center justify-center rounded-lg border-2 border-dashed bg-white py-20 px-5 text-center">
                <figure className="relative">
                      <img
                        src={ipfs.value}
                        alt="item 5"
                        className="w-full h-[230px] rounded-[0.625rem] object-cover"
                        width={50}
                        height={50}
                      />
                </figure>
                </div>
                }

              </div> 
  
              {/* IPFS LINK */}
            <div className="mb-6">
                <label
                  htmlFor="item-description"
                  className="font-display text-jacarta-700 mb-2 block dark:text-white"
                >
                  IPFS Link
                </label>
                <input
                  type="text"
                  id="item-name"
                  className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                  placeholder="IPFS Link"
                  onChange={(e) => handleInputChange(e, "ipfs")}
                  required
                  disabled
                  value={ipfs.value}
                />
            </div>

            {/* <!-- Collection --> */}
            <div className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-display text-jacarta-700 mb-2 block dark:text-white">
                      Collection
                    </label>
                    <div className="mb-3 flex items-center space-x-2">
                      <p className="dark:text-jacarta-300 text-2xs">
                        This is the collection where your item will appear.
                        <Tippy
                          theme="tomato-theme"
                          content={
                            <span>
                              Moving items to a different collection may take up to
                              30 minutes.
                            </span>
                          }
                        >
                          <span className="inline-block">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="24"
                              height="24"
                              className="dark:fill-jacarta-300 fill-jacarta-500 ml-1 -mb-[3px] h-4 w-4"
                            >
                              <path fill="none" d="M0 0h24v24H0z"></path>
                              <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM11 7h2v2h-2V7zm0 4h2v6h-2v-6z"></path>
                            </svg>
                          </span>
                        </Tippy>
                      </p> 
                    </div>
                  </div>
                  
                  <div>
                      <button
                        className="group dark:bg-jacarta-700 hover:bg-accent border-accent flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border bg-white hover:border-transparent"
                        onClick={() => dispatch(showPropatiesModal())}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          className="fill-accent group-hover:fill-white"
                        >
                          <path fill="none" d="M0 0h24v24H0z" />
                          <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" />
                        </svg>
                      </button>
                  </div>
  
                </div>
  
                {/* dropdown */}
                <div className="dropdown my-1 cursor-pointer mb-6">
                  <Collection_dropdown3
                    data={(collections !== null) ?  collections :collectionDropdown2_data}
                    // data={collectionDropdown2_data}
                    collection={true}
                    activeItem = {activeItem}
                    setActiveItem = {setActiveItem}
                  />
                </div>
              </div>
  
              {/* <!-- Name --> */}
            <div className="mb-6">
                <label
                  htmlFor="item-name"
                  className="font-display text-jacarta-700 mb-2 block dark:text-white"
                >
                  Name<span className="text-red">*</span>
                </label>
                <input
                  type="text"
                  id="item-name"
                  className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                  placeholder="Item name"
                  onChange={(e) => handleInputChange(e, "name")}
                  required
                  value={name.value}
  
                />
            </div>
  
            {/* <!-- Description --> */}
            <div className="mb-6">
                <label
                  htmlFor="item-description"
                  className="font-display text-jacarta-700 mb-2 block dark:text-white"
                >
                  Description<span className="text-red">*</span>
                </label>
                <p className="dark:text-jacarta-300 text-2xs mb-3">
                  The description will be included on the {"item's"} detail page
                  underneath its image. Markdown syntax is supported.
                </p>
                <textarea
                  id="item-description"
                  className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                  rows="4"
                  onChange={(e) => handleInputChange(e, "description")}
                  required
                  value={description.value}
                  placeholder="Provide a detailed description of your item."
                ></textarea>
            </div>
  
              
  
              <Proparties_modal />
  
              {/* <!-- Submit --> */}
              <button
                className="bg-accent-lighter cursor-default rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
                onClick={submit}
              >
                Create
              </button>
            </div>
          </div>
        </section>
        {/* <!-- end create --> */}
        </div>
        <div>
          <div className={isminting ? 'modal fade show block' : 'modal fade'}>
            <div className="modal-dialog max-w-xxl">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="addPropertiesLabel">
                    Waiting for NFT Minting
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
      </div>
			
		)
  }
  
};

export default Create;
