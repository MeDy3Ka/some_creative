class AbstractStorage{
    constructor(){
        this.storage = [];
    }
    insert(obj){
        this.storage.push(obj);
    }
}