import express from "express";
import cors from "cors";
const app = express();
const port = 3000;
app.use(cors());

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { godownData } from "./gData";
import { itemData } from "./iData";
import userRouter from "./routes/user"
import godownRouter from "./routes/godown"
import itemRouter from "./routes/item"
app.use(express.json());

app.get("/favicon.ico", (req:any, res:any) => {
  res.status(204).end();
});
app.use('/api/user',userRouter);
app.use('/api/',godownRouter);
app.use('/api/item',itemRouter);
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
app.listen(port, () => {
  return console.log(
    `Express server is listening at http://localhost:${port} 🚀`
  );
});
