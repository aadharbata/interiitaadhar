import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../hash";
const prisma = new PrismaClient();
const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const children = await prisma.godown.findUnique({
      where: {
        godown_id: id,
      },
      select: {
        id: true,
        godown_id: true,
        name: true,
        children: {
          select: {
            id: true,
            godown_id: true,
            name: true,
          },
        },
        Item: {
          select: {
            id: true,
            item_id: true,
            name: true,
            parentGodownId: true,
          },
        },
      },
    });
    // console.log(children?.children)
    res.status(200).send(children);
  } catch (err) {
    console.log("error in fetching godowns", err);
  }
});

router.get("/flow/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const item = await prisma.godown.findUnique({
      where: {
        godown_id: id,
      },
    });
    res.status(200).send(item?.flow);
  } catch (error) {
    console.log("Error in fetching flow of item", error);
  }
});

router.get("/root", async (req, res) => {
  try {
    const children = await prisma.godown.findMany({
      where: {
        parentGodownId: null,
      },
      select: {
        id: true,
        godown_id: true,
        name: true,
        children: {
          select: {
            id: true,
            godown_id: true,
            name: true,
          },
        },
        Item: {
          select: {
            id: true,
            item_id: true,
            name: true,
          },
        },
      },
    });
    res.send(children);
  } catch (err) {
    console.log("error in fetching the root data", err);
  }
});
export default router;