import * as Request from 'request-promise'

export class CrudApi {
    constructor(){

    }
    async exec(options){
        try {
            return await Request(options)
        } catch(err) {
            
        }
    }
    async getList(){
        const options = {
            uri: "server/book",
            method: "GET",
            qs: {
                
            },
            
        }
        return await this.exec(options)
    }
    async getItem(){

    }
    async delete(){

    }
    async deleteAll(){

    }
    async update(){

    }
    
}