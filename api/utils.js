import axios from "./axios";

// Utility functions
export const getRequest = async (uri) => {
	try {
		console.log(uri)
		let response = await axios.get(uri);

		console.log(response);
		if (response.status === 200 || response.status === 201) {
			return {
				data: response.data,
				error: null
			};
		} else {
			return {
				data: null,
				error: response.data
			};
		}
	} catch (error) {
		return {
			data: null,
			error: error
		};
	}
};

export const postRequest = async (uri, data) => {
	try {
		let response = await axios.post(uri, data);

		console.log(response);
		if (response.status === 200) {
			return {
				data: response.data,
				error: null
			};
		} else {
			return {
				data: null,
				error: response.data
			};
		}
	} catch (error) {
		return {
			data: null,
			error: error
		};
	}
};

export const deleteRequest = async (uri) => {
	try {
		let response = await axios.delete(uri);

		return {
			data: response.data,
			error: null
		};
	} catch (error) {
		return {
			data: null,
			error: error
		};
	}
};

export const putRequest = async (uri, data) => {
	try {
		let response = await axios.put(uri, data);

		console.log(response);
		if (response.status === 200) {
			return {
				data: response.data,
				error: null
			};
		} else {
			return {
				data: null,
				error: response.data
			};
		}
	} catch (error) {
		return {
			data: null,
			error: error
		};
	}
};