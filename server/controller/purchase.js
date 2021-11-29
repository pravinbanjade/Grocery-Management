const router = require("express").Router();
const purchaseModel = require("../models/purchaseModel");
const vendorModel = require("../models/vendorModel");
const inventoryModel = require("../models/inventoryModel");
const prepareData = require("../helpers/prepareData");
const paginate = require("../helpers/paginate");
/**
 * method : GET
 * url : /crm/purchase/paginate
 */
router.get("/paginate/:type?", async (req, res, next) => {
  let params = prepareData.find({ isReturn: false }, req);
  if (req.params.type == "return")
    params = prepareData.find({ isReturn: true }, req);
  const paginatedResult = await paginate(
    purchaseModel,
    {
      searchableField: ["invoiceNumber", "vendorName"],
      filterBy: params,
    },
    req
  );
  res.json(paginatedResult);
});
/**
 * method : POST
 * url : /crm/purchase
 */
router.post("/", async (req, res, next) => {
  req.body = prepareData.create(req.body, req);
  req.body.isCredit = false;
  req.body.paidDate = Date.now();

  /* Map each item with id */
  req.body.item.map((el) => {
    el.productName = el.productName.trim();
  });
  /* if vendor is not added already, then add */

  /* save purchase invoice and update the inventory */
  new purchaseModel(req.body).save().then(async (result) => {
    if (req.body.panNumber.trim()) {
      var vendorResult = await vendorModel.findOne(
        prepareData.find(
          {
            panNumber: req.body.panNumber.trim(),
          },
          req
        )
      );
      if (!vendorResult) {
        vendorResult = await new vendorModel(
          prepareData.create(
            {
              vendorName: req.body.vendorName,
              phoneNumber: req.body.phoneNumber.trim(),
              address: req.body.address,
              panNumber: req.body.panNumber,
            },
            req
          )
        ).save();
      }
    }
    req.body.item.forEach(async (item) => {
      let getInventory = await inventoryModel.findOne({
        productSlug: `${item.productName} ${item.mrp}`
          .toLowerCase()
          .replace(/\s+/g, "-"),
        isDisplay: true,
      });
      item.purchaseId = result._id.toString();
      item.space = "";
      item.purchasedFrom = req.body.vendorName;
      item.createdBy = req.body.createdBy;
      item.vendorId = vendorResult._id;
      item.productSlug = `${item.productName} ${item.mrp}`
        .toLowerCase()
        .replace(/\s+/g, "-");
      if (getInventory) {
        getInventory.quantity += item.quantity;
        await getInventory.save();
      } else {
        new inventoryModel(prepareData.create(item, req))
          .save()
          .then((result) => {});
      }
      item.isDisplay = false;
      new inventoryModel(prepareData.create(item), req)
        .save()
        .then((result) => {});
    });
    res.json({ error: false, message: "Purchase Created" });
  });
});
/**
 * method : GET
 * url : /crm/purchase/:id
 */
router.get("/:id", async (req, res, next) => {
  res.json(await purchaseModel.findById(req.params.id));
});
/**
 * type : PUT
 * url : crm/purchase/markAsPaid/:id
 */
router.put("/markAsPaid/:id", (req, res, next) => {
  let date = new Date(req.body.date);
  if (date.setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0)) {
    date = Date.now();
  }
  purchaseModel
    .findByIdAndUpdate(req.params.id, {
      isCredit: false,
      paidDate: new Date(date),
    })
    .then((result) => {
      res.send({ error: null, message: "success" });
    });
});
/**
 * type : PUT
 * url : crm/purchase/unmarkAsPaid/:id
 */
router.put("/unmarkAsPaid/:id", (req, res, next) => {
  purchaseModel
    .findByIdAndUpdate(req.params.id, {
      isCredit: true,
      paidDate: null,
    })
    .then((result) => {
      res.send({ error: null, message: "success" });
    });
});
/**
 * method : POST
 * url : /crm/purchase/return
 */
router.post("/return", async (req, res, next) => {
  req.body = prepareData.create(req.body, req);
  req.body.isCredit = false;
  req.body.paidDate = Date.now();
  req.body.isReturn = true;
  new purchaseModel(req.body).save().then((result) => {
    req.body.item.forEach(async (item) => {
      item.purchaseId = result._id.toString();
      item.space = "";
      item.purchasedFrom = req.body.vendorName;
      item.createdBy = req.body.createdBy;

      let inventoryData = await inventoryModel.findOne({
        productSlug: `${item.productName} ${item.mrp}`
          .toLowerCase()
          .replace(/\s+/g, "-"),
        isDisplay: true,
      });
      if (inventoryData.quantity !== 0) {
        let remainingQtyAftRet = inventoryData.quantity - item.quantity;
        inventoryData.quantity =
          remainingQtyAftRet > 0 ? remainingQtyAftRet : 0;
      }
      await inventoryData.save();
    });
    res.send(result);
  });
});
module.exports = router;
