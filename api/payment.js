const router = require("./train");

router.get("/cart",(req, res)=>{
    res.send(req.rootUser);
});

router.get("/check",(req, res)=>{
    res.send(req.rootUser);
});


