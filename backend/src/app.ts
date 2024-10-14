// interface Warehouse {
//     id: number;
//     godown_id: string;
//     name: string;
//     children: Warehouse[];
//     Item: any[]; // You can replace `any` with a more specific type if needed
//     flow: String[];
//   }

//   import { godownData } from "./gData";

//   // Function to find a warehouse by id recursively
//   function findWarehouseById(id: number, warehouses: Warehouse[]): Warehouse | null {
//     for (const warehouse of warehouses) {
//       if (warehouse.id === id) {
//         return warehouse; // Return if found
//       }
//       // Search in children if exists
//       const foundInChildren = findWarehouseById(id, warehouse.children);
//       if (foundInChildren) {
//         return foundInChildren; // Return if found in children
//       }
//     }
//     return null; // Return null if not found
//   }

//   // Function to update a warehouse by id recursively
//   function updateWarehouseById(id: number, updatedData: Partial<Warehouse>, warehouses: Warehouse[]): Warehouse[] {
//     return warehouses.map(warehouse => {
//       if (warehouse.id === id) {
//         return { ...warehouse, ...updatedData }; // Update if found
//       }
//       // Update children if exists
//       return {
//         ...warehouse,
//         children: updateWarehouseById(id, updatedData, warehouse.children) // Update children recursively
//       };
//     });
//   }

//   // // Example usage to find a warehouse
//   // console.log("hi there",warehouses[1].children[0])
//   // const foundWarehouse = findWarehouseById(97, warehouses);
//   // console.log('Found Warehouse:', foundWarehouse);

//   // // Example usage to update the warehouse with id 97
//   // const updatedWarehouses = updateWarehouseById(97, { name: "Updated Further Nested Warehouse" }, warehouses);
//   // console.log('Updated Warehouses:', JSON.stringify(updatedWarehouses, null, 2));
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
// const fixFlows = async () => {
//   for (const element of godownData) {
//     let flow: string[] = []; // Initialize flow as an empty array
//     try {
//       // Check if there's a parent godown
//       if (element.parentGodownId != null) {
//         const parent = await prisma.godown.findUnique({
//           where: {
//             godown_id: element.parentGodownId,
//           },
//           select: { flow: true }, // Only select the flow field
//         });

//         // If parent flow exists, merge it with current element's name
//         if (parent?.flow) {
//           flow = [...parent.flow]; // Create a copy of the parent's flow
//         }
//       }

//       // Add the current element's name to the flow
//       flow.push(element.name);

//       // Update the godown with the new flow
//       await prisma.godown.update({
//         where: {
//           godown_id: element.godown_id,
//         },
//         data: {
//           flow: flow, // Use ':' instead of '='
//         },
//       });
//     } catch (error) {
//       console.error('Error updating flow for godown:', element.godown_id, error);
//     }
//   }
// };
// fixFlows();