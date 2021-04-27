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
        this.query = this.query.find({ ...keyword });
        return this;
    }
    pagination(resPerPage) {
        const currentPage = Number(this.queryString.page) || 1; 
        const skip = resPerPage * (currentPage - 1);

        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
    }
}
module.exports = APIFeatures;