class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    let keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword, //this to search the given word in mongodb
            $options: "i", //tthis to make that case sensitive
          },
        }
      : {};
    this.query.find({ ...keyword });
    return this;
  }
  filter() {
    const queryStrCopy = { ...this.queryStr }; //this give the full details of the product but we need only catogery section so we need this
    //before
    //console.log(queryStrCopy);
    //{ keyword: 'ptron', catagory: 'Accesories' }
    // removing fields from query
    const removeFields = ["keyword", "limit", "page"];
    removeFields.forEach((fields) => delete queryStrCopy[fields]);
    let queryStr = JSON.stringify(queryStrCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)/g, (match) => `$${match}`);
    // console.log(queryStr);
    // {"price":{"$lt":"500","$gt":"1000"}}
    //after
    //console.log(queryStrCopy);
    //{ catagory: 'Accesories' }

    this.query.find(JSON.parse(queryStr));
    return this;
    //this function it should be case sensitive
  }
  paginate(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resPerPage * currentPage - 1;
    this.query.limit(resPerPage).skip(skip);
    return this;
  }
}

module.exports = APIFeatures;
