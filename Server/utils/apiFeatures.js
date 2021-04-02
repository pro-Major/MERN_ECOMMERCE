class APIFeatures {
    constructor(query,queryString) {
        this.query = query; 
        this.queryString = queryString;

    }
    search() {
        const keyword = this.queryString.keyword ?  {   // if that exist ? then name will work
                name : {
                    $regex : this.queryString.keyword,
                    $options : 'i' ///typing i will make it case insensitive

                }
        } : {}
        console.log(keyword);
        this.query = this.query.find({ ...keyword });
        return this;
    }

}
module.exports = APIFeatures;