const Simec = require("../models/simec.model.js");

exports.groupedBy = (req, res) => {
  
  console.log('queries');
  console.log(req.query);

  Simec.getGroupedBy(req.query, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    else res.send(data);
  });
};

exports.count = (req, res) => {
  
  console.log('queries');
  console.log(req.query);

  Simec.getCount(req.query, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    else res.send(data);
  });
};


