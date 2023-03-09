import React, { useEffect } from 'react';
import { trendingCategoryData } from '../../data/categories_data';
import Collection_category_filter from '../collectrions/collection_category_filter';
import CategoryItem from './categoryItem';
import { useDispatch } from 'react-redux';
import { updateTrendingCategoryItemData } from '../../redux/counterSlice';

const FilterCategoryItem = (collection) => {
	const dispatch = useDispatch();
	console.log(collection)
	useEffect(() => {
		dispatch(updateTrendingCategoryItemData(trendingCategoryData.slice(0, 8)));
	}, []);

	return (
		<div>
			{/* <!-- Filter --> */}
			<Collection_category_filter />
			<CategoryItem collection={collection}/>
		</div>
	);
};

export default FilterCategoryItem;
