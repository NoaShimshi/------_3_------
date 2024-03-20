const newFServer = new Server();
function netWork(fajax)
{
    try{
        let tempArr=fajax.fUrl.split('/');
        let address=tempArr[2];
        if (address==="noaShimshi.com") {
           return newFServer.handler(fajax);
        }
    }catch(e){
        
    }
}


