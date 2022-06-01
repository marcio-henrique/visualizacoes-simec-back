module.exports = app => {
    const simecController = require("../controllers/simec.controller.js");
    var router = require("express").Router();
    router.get("/grouped-by", simecController.groupedBy);
    router.get("/count", simecController.count);
    app.use('/api/simec', router);
  };
  