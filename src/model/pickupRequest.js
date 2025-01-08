const Pool = require("../config/db");

const selectAllPickupRequest = (limit, offset, sortby, sort, search) => {
  return Pool.query(
    `SELECT * FROM pickup_requests WHERE part_name ILIKE '%${search}%' ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
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
    total_cbm,
    pickup_address,
    destination_address,
    pickup_date,
    supplier_name,
    requester_name,
    import_documents,
    shipping_options,
    shipment_status
  } = data;
  return Pool.query(
    `INSERT INTO pickup_requests(
      id,
      po_number,
      part_name,
      quantity,
      dimensi_part,
      weight,
      total_cbm,
      pickup_address,
      destination_address,
      pickup_date,
      supplier_name,
      requester_name,
      import_documents,
      shipping_options,
      shipment_status
    ) VALUES (
     '${id}',
     '${po_number}',
     '${part_name}',
     '${quantity}',
     '${dimensi_part}',
     '${weight}',
     '${total_cbm}',
     '${pickup_address}',
     '${destination_address}',
     '${pickup_date}',
     '${supplier_name}',
     '${requester_name}',
     '${import_documents}',
     '${shipping_options}',
     '${shipment_status}'
     )`
  );
};

const updatePickupRequest = (data) => {
  const {
    id,
    shipment_status,
  } = data;
  return Pool.query(
    `UPDATE pickup_requests SET 
    shipment_status = '${shipment_status}' 
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

const findDoc = (doc) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT import_documents FROM pickup_requests WHERE import_documents='${doc}'`,
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

module.exports = {
  selectAllPickupRequest,
  selectPickupRequest,
  insertPickupRequest,
  updatePickupRequest,
  deletePickupRequest,
  countData,
  findId,
  findDoc,
};
