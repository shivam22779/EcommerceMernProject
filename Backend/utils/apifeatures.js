class ApiFeatures {
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){
        const keyword = this.queryStr.keyword ? {
           name:{
            $regex: this.queryStr.keyword,
            $options: "i"
           }
        }
        : {
        }
        
        this.query = this.query.find(keyword);
        return this;
    }

    filter(){
        const queryCopy = {...this.queryStr};
        //Removing other fields and retaing only filter fields in the query
        const removedFields = ["keyword", "limit", "page"]
        removedFields.map(key=> delete queryCopy[key]);

        // Filter for price and rating
        let queryStr = JSON.stringify(queryCopy);
        // Object would be like queryStr = {price: {gte: 5}, ratings: {lt: 4}} so we need to add $gte or $lt using regex
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage * (currentPage - 1);
        this.query = this.query.find().limit(resultPerPage).skip(skip);
        return this;

    }
}
        
module.exports = ApiFeatures;
        
        
        
        


    




