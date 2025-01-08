const {
  selectAllPickupRequest,
  selectPickupRequest,
  insertPickupRequest,
  updatePickupRequest,
  deletePickupRequest,
  countData,
  findId,
  findDoc,
} = require("../model/pickupRequest");
const commonHelper = require("../helper/common");
const { v4: uuidv4 } = require("uuid");

const pickupRequestController = {
  getAllPickupRequest: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "request_date";
      const sort = req.query.sort || "desc";
      const search = req.query.search || "";
      const result = await selectAllPickupRequest(limit, offset, sortby, sort, search);
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
    try {
      const {
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
        shipping_options,
      } = req.body;

      const file = await req.file.originalname;
      const import_documents = file;

      const { rowCount } = await findDoc(import_documents);
      if (rowCount) {
        return res.json({ message: "Document already exists" });
      }

      if (
        !po_number ||
        !part_name ||
        !quantity ||
        !dimensi_part ||
        !weight ||
        !total_cbm ||
        !pickup_address ||
        !destination_address ||
        !pickup_date ||
        !supplier_name ||
        !requester_name ||
        !import_documents ||
        !shipping_options
      ) {
        return res
          .status(400)
          .json({ message: "Required fields are missing!" });
      }

      const id = uuidv4();
      const data = {
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
        shipment_status: 'Waiting for confirmation',
      };

      const result = await insertPickupRequest(data);
      commonHelper.response(res, result.rows, 201, "Create Data Successfully");
    } catch (error) {
      console.error("Error creating pickup request:", error);
      res.status(500).json({
        message: "Failed to create pickup request",
        error: error.message,
      });
    }
  },

  updatePickupRequest: async (req, res) => {
    try {
      const id = String(req.params.id);
      const {
        shipment_status,
      } = req.body;
      const { rowCount } = await findId(id);
      if (!rowCount) {
        res.json({ message: "ID is Not Found" });
      }
      const data = {
        id,
        shipment_status,
      };
      updatePickupRequest(data)
        .then((result) =>
          commonHelper.response(
            res,
            result.rows,
            200,
            "Update Data Successfull"
          )
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
          commonHelper.response(
            res,
            result.rows,
            200,
            "Delete Data Successfull"
          )
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = pickupRequestController;
