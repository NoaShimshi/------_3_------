
class FXMLHttpRequest {
    constructor() {
        this.fResponseType = null;
        this.fUrl = null;
        this.fType = null;
        this.fResponse = null;
        this.fData = null;
        this.fOonload = null;
    }
    set ResponseType(responseType)
    {
       this.fResponseType=responseType;
    }
    get type()
    {
        return this.fType;
    }
    get url()
    {
        return this.fUrl;
    }
    get data()
    {
         return this.fData;
    }
    fOpen(type, url) {
        this.fUrl = url;
        this.fType = type;
    }
    fSend(data = null) {
        this.fData = data;
       this.fResponse= netWork(this);
    }
}