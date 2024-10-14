"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var gData_1 = require("./gData");
// Function to find a warehouse by id recursively
function findWarehouseById(id, warehouses) {
    for (var _i = 0, warehouses_1 = warehouses; _i < warehouses_1.length; _i++) {
        var warehouse = warehouses_1[_i];
        if (warehouse.id === id) {
            return warehouse; // Return if found
        }
        // Search in children if exists
        var foundInChildren = findWarehouseById(id, warehouse.children);
        if (foundInChildren) {
            return foundInChildren; // Return if found in children
        }
    }
    return null; // Return null if not found
}
// Function to update a warehouse by id recursively
function updateWarehouseById(id, updatedData, warehouses) {
    return warehouses.map(function (warehouse) {
        if (warehouse.id === id) {
            return __assign(__assign({}, warehouse), updatedData); // Update if found
        }
        // Update children if exists
        return __assign(__assign({}, warehouse), { children: updateWarehouseById(id, updatedData, warehouse.children) // Update children recursively
         });
    });
}
// // Example usage to find a warehouse
// console.log("hi there",warehouses[1].children[0])
// const foundWarehouse = findWarehouseById(97, warehouses);
// console.log('Found Warehouse:', foundWarehouse);
// // Example usage to update the warehouse with id 97
// const updatedWarehouses = updateWarehouseById(97, { name: "Updated Further Nested Warehouse" }, warehouses);
// console.log('Updated Warehouses:', JSON.stringify(updatedWarehouses, null, 2));
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
var fixFlows = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _i, godownData_1, element, flow, parent_1, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _i = 0, godownData_1 = gData_1.godownData;
                _a.label = 1;
            case 1:
                if (!(_i < godownData_1.length)) return [3 /*break*/, 8];
                element = godownData_1[_i];
                flow = [];
                _a.label = 2;
            case 2:
                _a.trys.push([2, 6, , 7]);
                if (!(element.parentGodownId != null)) return [3 /*break*/, 4];
                return [4 /*yield*/, prisma.godown.findUnique({
                        where: {
                            godown_id: element.parentGodownId,
                        },
                        select: { flow: true }, // Only select the flow field
                    })];
            case 3:
                parent_1 = _a.sent();
                // If parent flow exists, merge it with current element's name
                if (parent_1 === null || parent_1 === void 0 ? void 0 : parent_1.flow) {
                    flow = __spreadArray([], parent_1.flow, true); // Create a copy of the parent's flow
                }
                _a.label = 4;
            case 4:
                // Add the current element's name to the flow
                flow.push(element.name);
                // Update the godown with the new flow
                return [4 /*yield*/, prisma.godown.update({
                        where: {
                            godown_id: element.godown_id,
                        },
                        data: {
                            flow: flow, // Use ':' instead of '='
                        },
                    })];
            case 5:
                // Update the godown with the new flow
                _a.sent();
                return [3 /*break*/, 7];
            case 6:
                error_1 = _a.sent();
                console.error('Error updating flow for godown:', element.godown_id, error_1);
                return [3 /*break*/, 7];
            case 7:
                _i++;
                return [3 /*break*/, 1];
            case 8: return [2 /*return*/];
        }
    });
}); };
fixFlows();
