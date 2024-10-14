"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1.default)();
var port = 3000;
app.use((0, cors_1.default)());
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
var user_1 = __importDefault(require("./routes/user"));
var godown_1 = __importDefault(require("./routes/godown"));
var item_1 = __importDefault(require("./routes/item"));
app.use(express_1.default.json());
app.get("/favicon.ico", function (req, res) {
    res.status(204).end();
});
app.use('/user', user_1.default);
app.use('/', godown_1.default);
app.use('/item', item_1.default);
// async function main() {
// try {
//   const newGodowns = await prisma.godown.createMany({
//     data: godownData,
//     skipDuplicates: true, // Optional: skips records that would violate unique constraints
//   });
//   console.log(`${newGodowns.count} godowns inserted.`);
// } catch (err) {
//   console.error("Error inserting godowns:", err);
// } 
//   try {
//   const newItems = await prisma.item.createMany({
//     data: itemData,
//     skipDuplicates: true, // Optional: skips records that would violate unique constraints
//   });
//   console.log(`${newItems.count} godowns inserted.`);
// } catch (err) {
//   console.error("Error inserting items:", err);
// } 
// itemData.forEach(async (element) =>{
//     try{
//         const newItem = await prisma.item.create({
//         data: {
//             item_id :element.item_id,
//             name:element.name,
//             quantity:element.quantity,
//             category:element.category,
//             price:element.price,
//             status:element.status,
//             parentGodownId:element.parentGodownId,
//             brand:element.brand,
//             attributes:element.attributes,
//             image_url:element.image_url
//         }
//         });
//         console.log(newItem);
//     }
//     catch(err){
//         console.log(element);
//         console.log("already present");
//     }
// }
// );
// }
// main();
// app.get("/root", async (req, res) => {
//   const children = await prisma.godown.findMany({
//     where: {
//       parentGodownId: null,
//     },
//     select: {
//       id: true,
//       godown_id: true,
//       name: true,
//       children: {
//         select: {
//           id: true,
//           godown_id: true,
//           name: true,
//         },
//       },
//       Item: {
//         select: {
//           id: true,
//           item_id: true,
//           name: true,
//         },
//       },
//     },
//   });
//   res.send(children);
// });
// app.get("/item/:id", async (req, res) => {
//   const { id } = req.params;
//   const item = await prisma.item.findUnique({
//     where: {
//       item_id: id,
//     },
//   });
//   res.send(item);
// });
// app.get("/flow/:id", async (req, res) => {
//   const { id } = req.params;
//   const item = await prisma.godown.findUnique({
//     where: {
//       godown_id: id,
//     },
//   });
//   res.send(item?.flow);
// });
// app.get("/filter/:type", async (req, res) => {
//   const { type } = req.params;
//   const items = await prisma.item.findMany({
//     where: {
//       category: type,
//     },
//     select: {
//       item_id: true,
//       parentGodownId: true,
//       name: true,
//       quantity: true,
//       price: true,
//       brand: true,
//     },
//   });
//   res.send(items);
// });
// app.get("/:id", async (req, res) => {
//   const { id } = req.params;
//   const children = await prisma.godown.findUnique({
//     where: {
//       godown_id: id,
//     },
//     select: {
//       id: true,
//       godown_id: true,
//       name: true,
//       children: {
//         select: {
//           id: true,
//           godown_id: true,
//           name: true,
//         },
//       },
//       Item: {
//         select: {
//           id: true,
//           item_id: true,
//           name: true,
//           parentGodownId:true
//         },
//       },
//     },
//   });
//   // console.log(children?.children)
//   res.send(children);
// });
app.listen(port, function () {
    return console.log("Express server is listening at http://localhost:".concat(port, " \uD83D\uDE80"));
});
