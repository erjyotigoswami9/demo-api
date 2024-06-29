
const roleMiddleWare_writer = (req,res,next)=>{
    try {
        let role = req.user.role ;
        if(role=="writer"){
            next() ;
        }else{
            res.status(200).send({msg:"you are not writer"}) ;
        }
    } catch (error) {
        console.log(error) ;
        res.status(400).send({error}) ;
    }
}


const roleMiddleWare_reader = (req,res,next)=>{
    try {
        let role = req.user.role ;
        if(role=="reader"|| role=="writer"){
            next() ;
        }else{
            res.status(200).send({msg:"you are not reader or writer"}) ;
        }
    } catch (error) {
        console.log(error) ;
        res.status(400).send({error}) ;
    }
}

module.exports = {roleMiddleWare_reader, roleMiddleWare_writer} ;