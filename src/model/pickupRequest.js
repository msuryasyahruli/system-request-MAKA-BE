const Pool = require("../config/db");

const selectAllPickupRequest = (limit, offset, sortby, sort) => {
  return Pool.query(
    `SELECT * FROM pickup_requests ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
  );
};

const selectPickupRequest = (id) => {
  return Pool.query(`SELECT * FROM pickup_requests WHERE id='${id}'`);
};

const insertPickupRequest = (data) => {
  const {
    id,
    po_number,
    part_name,
    quantity,
    dimensi_part,
    weight,
    pickup_address,
    destination_address,
    pickup_date,
    supplier_name,
    requester_name,
    import_documents,
    shipping_options,
  } = data;
  return Pool.query(
    `INSERT INTO pickup_requests(
      id,
      po_number,
      part_name,
      quantity,
      dimensi_part,
      weight,
      pickup_address,
      destination_address,
      pickup_date,
      supplier_name,
      requester_name,
      import_documents,
      shipping_options
    ) VALUES (
     '${id}',
     '${po_number}',
     '${part_name}',
     '${quantity}',
     '${dimensi_part}',
     '${weight}',
     '${pickup_address}',
     '${destination_address}',
     '${pickup_date}',
     '${supplier_name}',
     '${requester_name}',
     '${import_documents}',
     '${shipping_options}'
     )`
  );
};

const updatePickupRequest = (data) => {
  const {
    id,
    po_number,
    part_name,
    quantity,
    dimensi_part,
    weight,
    pickup_address,
    destination_address,
    pickup_date,
    supplier_name,
    requester_name,
    import_documents,
    shipping_options,
  } = data;
  return Pool.query(
    `UPDATE pickup_requests SET 
    po_number = '${po_number}',
    part_name = '${part_name}',
    quantity = '${quantity}',
    dimensi_part = '${dimensi_part}',
    weight = '${weight}',
    pickup_address = '${pickup_address}',
    destination_address = '${destination_address}',
    pickup_date = '${pickup_date}',
    supplier_name = '${supplier_name}',
    requester_name = '${requester_name}',
    import_documents = '${import_documents}',
    shipping_options = '${shipping_options}' 
    WHERE id='${id}'`
  );
};

const deletePickupRequest = (id) => {
  return Pool.query(`DELETE FROM pickup_requests WHERE id='${id}'`);
};

const countData = () => {
  return Pool.query("SELECT COUNT(*) FROM pickup_requests");
};

const findId = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT id FROM pickup_requests WHERE id='${id}'`,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    )
  );
};

const searching = (part_name) => {
  return Pool.query(
    `SELECT * FROM pickup_requests WHERE part_name ILIKE '%${part_name}%'`
  );
};

module.exports = {
  selectAllPickupRequest,
  selectPickupRequest,
  insertPickupRequest,
  updatePickupRequest,
  deletePickupRequest,
  countData,
  findId,
  searching,
};
