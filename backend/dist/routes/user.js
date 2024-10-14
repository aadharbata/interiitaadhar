"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var client_1 = require("@prisma/client");
var hash_1 = require("../hash");
var zod_1 = require("zod");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var JWT_SECRET = "__RANDOM__@@";
// Initialize Prisma Client
var prisma = new client_1.PrismaClient();
// Define schemas for signup and signin
var signupSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    email: zod_1.z.string().email({ message: "Must be a valid email" }),
    password: zod_1.z.string(),
});
var signinSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Must be a valid email" }),
    password: zod_1.z.string(),
});
// Create a new Express router
var router = express_1.default.Router();
// POST /signup route
router.post("/signup", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, success, error, _b, name, email, password, existingUser, hashedPassword, user, token, error_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = signupSchema.safeParse(req.body), success = _a.success, error = _a.error;
                if (!success) {
                    return [2 /*return*/, res.status(400).json({
                            message: "Invalid inputs",
                            errors: error.errors,
                        })];
                }
                _b = req.body, name = _b.name, email = _b.email, password = _b.password;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 5, , 6]);
                return [4 /*yield*/, prisma.user.findUnique({
                        where: { email: email },
                    })];
            case 2:
                existingUser = _c.sent();
                if (existingUser) {
                    return [2 /*return*/, res.status(400).json({
                            message: "Email already taken",
                        })];
                }
                return [4 /*yield*/, (0, hash_1.hashPassword)(password)];
            case 3:
                hashedPassword = _c.sent();
                return [4 /*yield*/, prisma.user.create({
                        data: {
                            name: name,
                            email: email,
                            password: hashedPassword,
                        },
                    })];
            case 4:
                user = _c.sent();
                token = jsonwebtoken_1.default.sign({ id: user.id }, JWT_SECRET);
                return [2 /*return*/, res.status(200).json({
                        message: "User created successfully",
                        token: token
                    })];
            case 5:
                error_1 = _c.sent();
                console.error(error_1);
                return [2 /*return*/, res.status(500).json({
                        message: "An error occurred while signing up",
                    })];
            case 6: return [2 /*return*/];
        }
    });
}); });
// POST /signin route
router.post("/signin", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, success, error, _b, email, password, user, storedHash, isPasswordValid, token, error_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = signinSchema.safeParse(req.body), success = _a.success, error = _a.error;
                if (!success) {
                    return [2 /*return*/, res.status(400).json({
                            message: "Invalid inputs",
                            errors: error.errors,
                        })];
                }
                _b = req.body, email = _b.email, password = _b.password;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 4, , 5]);
                return [4 /*yield*/, prisma.user.findUnique({
                        where: { email: email },
                    })];
            case 2:
                user = _c.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ error: "User not found" })];
                }
                storedHash = user.password;
                return [4 /*yield*/, (0, hash_1.verifyPassword)(storedHash, password)];
            case 3:
                isPasswordValid = _c.sent();
                if (!isPasswordValid) {
                    return [2 /*return*/, res.status(403).json({ error: "Password is incorrect" })];
                }
                token = jsonwebtoken_1.default.sign({ id: user.id }, JWT_SECRET);
                return [2 /*return*/, res.status(200).json({
                        message: "User signed in successfully",
                        token: token
                    })];
            case 4:
                error_2 = _c.sent();
                console.error(error_2);
                return [2 /*return*/, res.status(500).json({
                        message: "An error occurred while signing in",
                    })];
            case 5: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
