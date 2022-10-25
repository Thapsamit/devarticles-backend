import jwt from 'jsonwebtoken'

//like an article
// click the like button => auth middleware(next) => like controller...
const auth = async(req,res,next)=>{
	try {
		// checking token
		const token = req.headers.authorization.split(" ")[1];
		const isCustomAuth  = token.length<500 // it is our custome token otherwise it is of googl oauth token
	    let decodedData;
	    if(token&&isCustomAuth){
	    	decodedData = jwt.verify(token,'test')
	    	req.userId = decodedData?.id;
		
	    }
	    else{
	    	//for google auth token decode
	    	decodedData = jwt.decode(token)
	    	req.userId = decodedData?.sub
			
	    }
	    next()
	} catch(e) {
		
		console.log(e);
	}
}
export default auth;