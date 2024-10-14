import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../hash";
const prisma = new PrismaClient();
const router = express.Router();

router.get("/:id", async (req, res) => {
    try {        
        const { id } = req.params;
        const item = await prisma.item.findUnique({
          where: {
            item_id: id,
          },
        });
        res.send(item);
    } catch (error) {
        console.log("Error in fetching flow of item", error);
    }   
});

router.get("/filter/:type", async (req, res) => {
    try {
        const { type } = req.params;
        const items = await prisma.item.findMany({
          where: {
            category: type,
          },
          select: {
            item_id: true,
            parentGodownId: true,
            name: true,
            quantity: true,
            price: true,
            brand: true,
          },
        });
        res.send(items);
        
    } catch (error) {
        console.log("Error in fetching flow of item", error);
    }
  });

export default router;