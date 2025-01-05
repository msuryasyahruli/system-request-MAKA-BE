const {
  selectAllPickupRequest,
  selectPickupRequest,
  insertPickupRequest,
  updatePickupRequest,
  deletePickupRequest,
  countData,
  findId,
  searching,
} = require("../model/pickupRequest");
const commonHelper = require("../helper/common");
const { v4: uuidv4 } = require("uuid");

const pickupRequestController = {
  getAllPickupRequest: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "id";
      const sort = req.query.sort || "ASC";
      const result = await selectAllPickupRequest(limit, offset, sortby, sort);
      const {
        rows: [count],
      } = await countData();
      const totalData = parseInt(count.count);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit: limit,
        totalData: totalData,
        totalPage: totalPage,
      };
      commonHelper.response(
        res,
        result.rows,
        200,
        "Get Data Success",
        pagination
      );
    } catch (error) {
      console.log(error);
    }
  },

  getDetailPickupRequest: async (req, res) => {
    const id = String(req.params.id);
    const { rowCount } = await findId(id);
    if (!rowCount) {
      return res.json({ message: "ID Not Found" });
    }
    selectPickupRequest(id)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, "Get Data Success");
      })
      .catch((err) => res.send(err));
  },

  createPickupRequest: async (req, res) => {
    const {
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
    } = req.body;
    const id = uuidv4();
    const data = {
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
    };
    insertPickupRequest(data)
      .then((result) =>
        commonHelper.response(res, result.rows, 201, "Create Data Successfull")
      )
      .catch((err) => res.send(err));
  },

  updatePickupRequest: async (req, res) => {
    try {
      const id = String(req.params.id);
      const {
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
      } = req.body;
      const { rowCount } = await findId(id);
      if (!rowCount) {
        res.json({ message: "ID is Not Found" });
      }
      const data = {
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
      };
      updatePickupRequest(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Update Data Successfull")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },

  deletePickupRequest: async (req, res) => {
    try {
      const id = String(req.params.id);
      const { rowCount } = await findId(id);
      if (!rowCount) {
        res.json({ message: "ID is Not Found" });
      }
      deletePickupRequest(id)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Delete Data Successfull")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },

  searching: async (req, res) => {
    const search = req.query.keyword;
    searching(search)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, "Search Data");
      })
      .catch((err) => res.send(err));
  },
};

module.exports = pickupRequestController;
