const sql = require("../config/db.config");

const Simec = function (simec) {};

// SELECT edital, COUNT(DISTINCT(id)) value
// FROM dados_simec ds
// WHERE formato IN ('Digital', 'Audiovisual')
// group by edital ;

Simec.getGroupedBy = (query, result) => {
  const count = query.count;
  delete query.count;

  const group = query.group;
  delete query.group;

  let sqlQuery = `SELECT ${group} title, COUNT(DISTINCT(${count})) value, '${group}' as 'group' FROM dados_simec `;

  if(Object.keys(query).length > 0) {
    sqlQuery += `WHERE `;
    i = 1;

    for (const [key, value] of Object.entries(query)) {
      if (i > 1) {
        sqlQuery += `AND `;
      }
      sqlQuery += `${key} `;
      if(Array.isArray(value)) {
        sqlQuery += `IN (${ "'" + value.join("','") + "'"}) `;
      } else if (value.includes('[')) {
        let valueArray = JSON.parse(value);
        sqlQuery += `IN (${ "'" + valueArray.join("','") + "'"}) `;
      }
      else {
        sqlQuery += `= '${value}' `;
      }
      console.log(`${key}: ${value}`);
      i++;
    }
  }

  sqlQuery += ` group by ${group}`;

  sqlQuery += ` order by value DESC`;

  console.log(sqlQuery);

  sql.query(sqlQuery, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("get grouped: ", { ...res });
    result(null, res);
  });
};

Simec.getCount = (query, result) => {
  const count = query.count;
  delete query.count;

  let sqlQuery = `SELECT ${count} title, COUNT(DISTINCT(${count})) value FROM dados_simec `;

  if(Object.keys(query).length > 0) {
    sqlQuery += `WHERE `;
    i = 1;

    for (const [key, value] of Object.entries(query)) {
      if (i > 1) {
        sqlQuery += `AND `;
      }
      sqlQuery += `${key} `;
      if(Array.isArray(value)) {
        sqlQuery += `IN (${ "'" + value.join("','") + "'"}) `;
      }else {
        sqlQuery += `= '${value}' `;
      }
      console.log(`${key}: ${value}`);
      i++;
    }
  }

  console.log(sqlQuery);

  sql.query(sqlQuery, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("get count: ", { ...res });
    result(null, res);
  });
};


module.exports = Simec;
