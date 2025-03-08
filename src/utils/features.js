export class ApiFeatures {
	constructor(mongooseQuery, searchQuery) {
		this.mongooseQuery = mongooseQuery;
		this.searchQuery = searchQuery;
	}
	pagination() {
		let pageNumber = this.searchQuery.page * 1 || 1;
		let pageLimit = 2;
		let skip = (pageNumber - 1) * pageLimit;
		this.pageNumber = pageNumber;
		this.mongooseQuery.skip(skip).limit(pageLimit);
		return this;
	}
	filtration() {
		const queryObj = { ...this.searchQuery };
		const excludedFields = ["sort", "page", "fields", "keyword"];
		excludedFields.forEach((el) => delete queryObj[el]);
		let queryStr = JSON.stringify(queryObj);
		queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
		this.mongooseQuery.find(JSON.parse(queryStr));
		return this;
	}

	sorting() {
		if (this.searchQuery.sort) {
			const sortBy = this.searchQuery.sort.split(",").join(" ");
			this.mongooseQuery.sort(sortBy);
		} else {
			this.mongooseQuery.sort("-createdAt");
		}

		return this;
	}

	fields() {
		if (this.searchQuery.fields) {
			const fields = this.searchQuery.fields.split(",").join(" ");
			this.mongooseQuery.select(fields);
		} else {
			this.mongooseQuery.select("-__v");
		}

		return this;
	}
	search() {
		if (this.searchQuery.keyword) {
			const keyword = this.searchQuery.keyword;
			const regex = new RegExp(keyword, "i");
			this.mongooseQuery.find({ title: regex });
		}
		return this;
	}
}