import React, { useState } from 'react';

const Collection_setting_dropdown = ({ classes }) => {
	const [dropdownShow, setDropdownShow] = useState(false);

	const handleDropdown = () => {
		window.addEventListener('click', (w) => {
			if (w.target.closest('.trending-dots')) {
				if (dropdownShow) {
					setDropdownShow(false);
				} else {
					setDropdownShow(true);
				}
			} else {
				setDropdownShow(false);
			}
		});
	};
	return (
		<>
			<div className={classes}>
				<button
					onClick={handleDropdown}
					className="dropdown-toggle trending-dots inline-flex h-10 w-10 items-center justify-center text-sm show"
				>
					<svg
						width="16"
						height="4"
						viewBox="0 0 16 4"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="dark:fill-jacarta-200 fill-jacarta-500"
					>
						<circle cx="2" cy="2" r="2"></circle>
						<circle cx="8" cy="2" r="2"></circle>
						<circle cx="14" cy="2" r="2"></circle>
					</svg>
				</button>

				<div
					className={
						dropdownShow
							? 'dropdown-menu-end dark:bg-jacarta-800 z-10 min-w-[200px] whitespace-nowrap rounded-xl bg-white py-4 px-2 text-left shadow-xl show text-jacarta-500 absolute top-full right-0'
							: 'dropdown-menu-end dark:bg-jacarta-800 z-10 min-w-[200px] whitespace-nowrap rounded-xl bg-white py-4 px-2 text-left shadow-xl hidden text-jacarta-500 absolute top-full right-0'
					}
				>
					<button className="dark:hover:bg-jacarta-600 font-display hover:bg-jacarta-50 block w-full rounded-xl px-5 py-2 text-left text-sm transition-colors dark:text-white">
						Wrap Collection
					</button>
				</div>
			</div>
		</>
	);
};

export default Collection_setting_dropdown;
