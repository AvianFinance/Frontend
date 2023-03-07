import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	mblMenu: false,
	dropdown: false,
	collection_activity_item_data: [],
	trendingCategoryItemData: [],
	sortedtrendingCategoryItemData: [],
	collectiondata: [],
	collectionsdata: null,
	sortedCollectionData: [],
	renkingData: [],
	filteredRenkingData: [],
	walletModal: false,
	bidsModal: false,
	buyModal: false,
	propartiesModalValue: false,
	trendingCategorySorText: '',
	exploretype: '',
	listbuymodal: false,
	listrentmodal: false,
	listcontent: null,
	listrentalcontent: null
};

export const counterSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		openMblMenu: (state) => {
			state.mblMenu = true;
		},
		closeMblMenu: (state) => {
			state.mblMenu = false;
		},
		explorecollections: (state, payload) => {
			state.mblMenu = false;
			state.exploretype = payload.payload;
		},
		openDropdown: (state) => {
			state.dropdown = true;
		},
		closeDropdown: (state) => {
			state.dropdown = false;
		},
		handle_collection_activity_item_data: (state, payload) => {
			state.collection_activity_item_data = payload.data;
		},
		walletModalShow: (state) => {
			state.walletModal = true;
		},
		walletModalhide: (state) => {
			state.walletModal = false;
		},
		bidsModalShow: (state) => {
			state.bidsModal = true;
		},
		listbuyModalShow: (state, payload) => {
			console.log(payload.payload)
			state.listbuymodal = true;
			state.listcontent = payload.payload
		},
		listrentModalShow: (state, payload) => {
			console.log(payload.payload)
			state.listrentmodal = true;
			state.listrentalcontent = payload.payload
		},
		bidsModalHide: (state) => {
			state.bidsModal = false;
		},
		buyModalShow: (state, payload) => {
			state.buyModal = true;
			state.collectionsdata = payload.payload;
		},
		buyModalHide: (state) => {
			state.buyModal = false;
			state.collectionsdata = null;
		},
		buylistModalHide: (state) => {
			state.listbuymodal = false;
			state.listcontent = null
		},
		rentlistModalHide: (state) => {
			state.listrentmodal = false;
			state.listrentalcontent = null
		},
		showPropatiesModal: (state) => {
			state.propartiesModalValue = true;
		},
		closePropatiesModal: (state) => {
			state.propartiesModalValue = false;
		},
		updateTrendingCategoryItemData: (state, action) => {
			state.trendingCategoryItemData = action.payload;
			state.sortedtrendingCategoryItemData = action.payload;
		},
		updatetrendingCategorySorText: (state, action) => {
			const sortText = action.payload;
			if (sortText === 'Price: Low to High') {
				state.sortedtrendingCategoryItemData = state.trendingCategoryItemData.sort(
					(a, b) => a.sortPrice - b.sortPrice
				);
			} else if (sortText === 'Price: high to low') {
				state.sortedtrendingCategoryItemData = state.trendingCategoryItemData.sort(
					(a, b) => b.sortPrice - a.sortPrice
				);
			} else if (sortText === 'Recently Added') {
				state.sortedtrendingCategoryItemData = state.trendingCategoryItemData.sort(
					(a, b) => a.addDate - b.addDate
				);
			} else if (sortText === 'Auction Ending Soon') {
				state.sortedtrendingCategoryItemData = state.trendingCategoryItemData.sort(
					(a, b) => b.addDate - a.addDate
				);
			} else {
				state.sortedtrendingCategoryItemData = state.trendingCategoryItemData;
			}
		},
		updateTrendingCategoryItemByInput: (state, action) => {
			const text = action.payload;
			if (text === 'Verified Only') {
				state.sortedtrendingCategoryItemData = state.trendingCategoryItemData.filter((item) => {
					return item.verified;
				});
			} else if (text === 'NFSW Only') {
				state.sortedtrendingCategoryItemData = state.trendingCategoryItemData.filter((item) => {
					return item.nfsw;
				});
			} else if (text === 'Show Lazy Minted') {
				state.sortedtrendingCategoryItemData = state.trendingCategoryItemData.filter((item) => {
					return item.lazyMinted;
				});
			} else {
				state.sortedtrendingCategoryItemData = state.trendingCategoryItemData;
			}
		},
		collectCollectionData: (state, action) => {
			const data = action.payload;
			state.collectiondata = data;
			state.sortedCollectionData = data;
		},
		updateCollectionData: (state, action) => {
			const text = action.payload;
			if (text === 'trending') {
				const tampItem = state.collectiondata.filter((item) => item.trending);
				state.sortedCollectionData = tampItem;
			}
			if (text === 'top') {
				const tampItem = state.collectiondata.filter((item) => item.top);
				state.sortedCollectionData = tampItem;
			}
			if (text === 'recent') {
				const tampItem = state.collectiondata.filter((item) => item.recent);
				state.sortedCollectionData = tampItem;
			}
			// state.sortedCollectionData = state.collectiondata;
		},
		collectRenkingData: (state, action) => {
			state.renkingData = action.payload;
			state.filteredRenkingData = action.payload;
		},
		updateRenkingData: (state, action) => {
			const text = action.payload;
			let tempItem = state.renkingData.filter((item) => item.category === text);
			if (text === 'All') {
				tempItem = state.renkingData;
			}
			state.filteredRenkingData = tempItem;
		},
		updateRenkingDataByBlockchain: (state, action) => {
			const text = action.payload;
			let tempItem = state.renkingData.filter((item) => item.blockchain === text);
			if (text === 'All') {
				tempItem = state.renkingData;
			}
			state.filteredRenkingData = tempItem;
		},
		updateRenkingDataByPostdate: (state, action) => {
			const text = action.payload;
			let tempItem = state.renkingData.filter((item) => item.postDate === text);
			if (text === 'All Time' || text === 'Last Year') {
				tempItem = state.renkingData;
			}
			state.filteredRenkingData = tempItem;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	openMblMenu,
	closeMblMenu,
	openDropdown,
	closeDropdown,
	walletModalShow,
	walletModalhide,
	bidsModalShow,
	bidsModalHide,
	buyModalShow,
	buyModalHide,
	showPropatiesModal,
	closePropatiesModal,
	updatetrendingCategorySorText,
	updateTrendingCategoryItemData,
	updateTrendingCategoryItemByInput,
	collectCollectionData,
	updateCollectionData,
	collectRenkingData,
	updateRenkingData,
	updateRenkingDataByBlockchain,
	updateRenkingDataByPostdate,
	explorecollections,
	listbuyModalShow,
	listrentModalShow,
	buylistModalHide,
	rentlistModalHide
} = counterSlice.actions;

export default counterSlice.reducer;
