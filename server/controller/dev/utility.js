const router = require("express").Router();
const axios = require("axios");
/**
 * method : GET
 * url : /crm/dev/utility/createPurchase
 */
router.get("/createPurchase", async (req, res, next) => {
  let purchaseOne = {
    invoiceNumber: "123ABX",
    vendorName: "Manav Pvt Ltd",
    phoneNumber: "987456321",
    address: "Kathmandu",
    panNumber: "00142536121",
    item: [
      {
        productName: "Wai Wai",
        manufacturer: "CG Group",
        unit: "PACK",
        packaging: "30",
        qty: "2",
        mrp: "20",
        cp: "19.5",
        mrpAmount: 1200,
        cpAmount: 1170,
        quantity: 60,
      },
      {
        productName: "Duracell AA4",
        manufacturer: "Duracell",
        unit: "9V",
        packaging: "40",
        qty: "2",
        mrp: "220",
        cp: "200",
        mrpAmount: 17600,
        cpAmount: 16000,
        quantity: 80,
      },
      {
        productName: "Bikano Salted Peanuts",
        manufacturer: "Peanut Company",
        unit: "200GM",
        packaging: "10",
        qty: "3",
        mrp: "120",
        cp: "115",
        mrpAmount: 3600,
        cpAmount: 3450,
        quantity: 30,
      },
      {
        productName: "Agraj Foods Furandana",
        manufacturer: "Snacks Foods Pvt Ltd",
        unit: "600GM",
        packaging: "20",
        qty: "10",
        mrp: "174",
        cp: "170",
        mrpAmount: 34800,
        cpAmount: 34000,
        quantity: 200,
      },
      {
        productName: "Bikano Punjabi Papad",
        manufacturer: "Papad Company Pvt Ltd",
        unit: "200GM",
        packaging: "40",
        qty: "2",
        mrp: "110",
        cp: "109",
        mrpAmount: 8800,
        cpAmount: 8720,
        quantity: 80,
      },
    ],
    grandTotal: 63340,
    netTotal: "",
    isCredit: false,
    paidDate: 1602421737617,
  };
  let purchaseTwo = {
    invoiceNumber: "1AB",
    vendorName: "Ashish Pvt Ltd",
    phoneNumber: "9864022314",
    address: "Balkot",
    panNumber: "00142536",
    item: [
      {
        productName: "Wai Wai",
        manufacturer: "CG Group",
        unit: "PACK",
        packaging: "30",
        qty: "3",
        mrp: "20",
        cp: "19.5",
        mrpAmount: 1800,
        cpAmount: 1755,
        quantity: 90,
      },
      {
        productName: "Sugar",
        manufacturer: "Everest Sugar",
        unit: "KG",
        packaging: "10",
        qty: "1",
        mrp: "80",
        cp: "79",
        mrpAmount: 800,
        cpAmount: 790,
        quantity: 10,
      },
      {
        productName: "Rahar Dal-Non Polished",
        manufacturer: "XX",
        unit: "KG",
        packaging: "20",
        qty: "2",
        mrp: "157",
        cp: "155",
        mrpAmount: 6280,
        cpAmount: 6200,
        quantity: 40,
      },
      {
        productName: "Brown Chana",
        manufacturer: "XX",
        unit: "KG",
        packaging: "20",
        qty: "2",
        mrp: "115",
        cp: "110",
        mrpAmount: 4600,
        cpAmount: 4400,
        quantity: 40,
      },
      {
        productName: "Mango Pickle",
        manufacturer: "Pickles Industries",
        unit: "380GM",
        packaging: "10",
        qty: "5",
        mrp: "135",
        cp: "130",
        mrpAmount: 6750,
        cpAmount: 6500,
        quantity: 50,
      },
    ],
    grandTotal: 19645,
    netTotal: "19000",
    isCredit: false,
    paidDate: 1602421208347,
  };
  let purchaseThree = {
    invoiceNumber: "2ABX",
    vendorName: "Upal Pvt Ltd",
    phoneNumber: "986401564",
    address: "Balkot",
    panNumber: "0142578369",
    item: [
      {
        productName: "Pampers Premium Care Diapers Medium",
        manufacturer: "Pampers Ltd",
        unit: "Pack",
        packaging: "20",
        qty: "3",
        mrp: "555",
        cp: "550",
        mrpAmount: 33300,
        cpAmount: 33000,
        quantity: 60,
      },
      {
        productName: "Mam Mam Nauturally Nutritious Baby",
        manufacturer: "Mam Mam Ltd",
        unit: "PACK",
        packaging: "10",
        qty: "4",
        mrp: "165",
        cp: "160",
        mrpAmount: 6600,
        cpAmount: 6400,
        quantity: 40,
      },
    ],
    grandTotal: 39400,
    netTotal: "39400",
    isCredit: false,
    paidDate: 1602422657164,
  };
  let headers = {
    headers: {
      Authorization: req.headers.authorization,
    },
  };
  await axios.post("http://localhost:3000/crm/purchase", purchaseOne, headers);
  await axios.post("http://localhost:3000/crm/purchase", purchaseTwo, headers);
  await axios.post(
    "http://localhost:3000/crm/purchase",
    purchaseThree,
    headers
  );
  res.json("success");
});
module.exports = router;
