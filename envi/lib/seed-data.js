"use server";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDatabase = seedDatabase;
var server_1 = require("@/lib/supabase/server");
function seedDatabase() {
    return __awaiter(this, void 0, void 0, function () {
        var supabase, users, _a, createdUsers, userError, shiftLogs, _i, createdUsers_1, user, i, dayOffset, morningUser, eveningUser, shiftLogError, accessLogs, roomNumbers, i, userIndex, user, roomNumber, action, minutesAgo, accessLogError, securityWarnings, warningError;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    supabase = (0, server_1.createServerClient)();
                    users = [
                        {
                            name: "John Smith",
                            status: "active",
                            shift_start: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
                        },
                        {
                            name: "Emily Johnson",
                            status: "in-room",
                            location: "104",
                            shift_start: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
                        },
                        {
                            name: "Michael Brown",
                            status: "active",
                            shift_start: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
                        },
                        {
                            name: "Sarah Davis",
                            status: "off-shift",
                            shift_end: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
                        },
                        {
                            name: "David Wilson",
                            status: "in-room",
                            location: "102",
                            shift_start: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
                        },
                        // Additional users
                        {
                            name: "Jennifer Lee",
                            status: "active",
                            shift_start: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
                        },
                        {
                            name: "Robert Garcia",
                            status: "in-room",
                            location: "201",
                            shift_start: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
                        },
                        {
                            name: "Lisa Martinez",
                            status: "off-shift",
                            shift_end: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
                        },
                        {
                            name: "James Taylor",
                            status: "active",
                            shift_start: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
                        },
                        {
                            name: "Patricia Anderson",
                            status: "in-room",
                            location: "301",
                            shift_start: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
                        },
                    ];
                    return [4 /*yield*/, supabase.from("users").insert(users).select()];
                case 1:
                    _a = _b.sent(), createdUsers = _a.data, userError = _a.error;
                    if (userError) {
                        console.error("Error creating users:", userError);
                        return [2 /*return*/, { success: false, error: userError }];
                    }
                    shiftLogs = [];
                    for (_i = 0, createdUsers_1 = createdUsers; _i < createdUsers_1.length; _i++) {
                        user = createdUsers_1[_i];
                        if (user.shift_start) {
                            shiftLogs.push({
                                user_id: user.id,
                                timestamp: user.shift_start,
                                action: "start",
                            });
                        }
                        if (user.shift_end) {
                            shiftLogs.push({
                                user_id: user.id,
                                timestamp: user.shift_end,
                                action: "end",
                            });
                        }
                    }
                    // Add historical shift logs for the past week
                    for (i = 1; i <= 7; i++) {
                        dayOffset = i * 24 * 60 * 60 * 1000;
                        morningUser = createdUsers[i % createdUsers.length];
                        shiftLogs.push({
                            user_id: morningUser.id,
                            timestamp: new Date(Date.now() - dayOffset + 8 * 60 * 60 * 1000).toISOString(), // 8 AM
                            action: "start",
                        });
                        shiftLogs.push({
                            user_id: morningUser.id,
                            timestamp: new Date(Date.now() - dayOffset + 16 * 60 * 60 * 1000).toISOString(), // 4 PM
                            action: "end",
                        });
                        eveningUser = createdUsers[(i + 3) % createdUsers.length];
                        shiftLogs.push({
                            user_id: eveningUser.id,
                            timestamp: new Date(Date.now() - dayOffset + 16 * 60 * 60 * 1000).toISOString(), // 4 PM
                            action: "start",
                        });
                        shiftLogs.push({
                            user_id: eveningUser.id,
                            timestamp: new Date(Date.now() - dayOffset + 24 * 60 * 60 * 1000).toISOString(), // 12 AM
                            action: "end",
                        });
                    }
                    return [4 /*yield*/, supabase.from("shift_logs").insert(shiftLogs)];
                case 2:
                    shiftLogError = (_b.sent()).error;
                    if (shiftLogError) {
                        console.error("Error creating shift logs:", shiftLogError);
                        return [2 /*return*/, { success: false, error: shiftLogError }];
                    }
                    accessLogs = [];
                    roomNumbers = ["101", "102", "103", "104", "105", "201", "202", "203", "301", "302", "303"];
                    // Generate 100 access logs instead of 40
                    for (i = 0; i < 100; i++) {
                        userIndex = Math.floor(Math.random() * createdUsers.length);
                        user = createdUsers[userIndex];
                        roomNumber = roomNumbers[Math.floor(Math.random() * roomNumbers.length)];
                        action = i % 2 === 0 ? "enter" : "exit";
                        minutesAgo = Math.floor(Math.random() * 10080) + 5 // 5 minutes to 7 days (10080 minutes)
                        ;
                        accessLogs.push({
                            user_id: user.id,
                            room_number: roomNumber,
                            timestamp: new Date(Date.now() - minutesAgo * 60000).toISOString(),
                            action: action,
                        });
                    }
                    // Sort by timestamp to ensure enter/exit pairs make sense
                    accessLogs.sort(function (a, b) { return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(); });
                    return [4 /*yield*/, supabase.from("access_logs").insert(accessLogs)];
                case 3:
                    accessLogError = (_b.sent()).error;
                    if (accessLogError) {
                        console.error("Error creating access logs:", accessLogError);
                        return [2 /*return*/, { success: false, error: accessLogError }];
                    }
                    securityWarnings = [
                        // Critical warnings - recent
                        {
                            room_number: "101",
                            timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
                            type: "unauthorized-access",
                            status: "critical",
                            description: "Door opened without valid credentials",
                        },
                        {
                            room_number: "103",
                            timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
                            type: "door-forced",
                            status: "critical",
                            description: "Door lock appears to have been forced",
                        },
                        {
                            room_number: "302",
                            timestamp: new Date(Date.now() - 25 * 60000).toISOString(),
                            type: "door-forced",
                            status: "critical",
                            description: "Multiple failed access attempts followed by forced entry",
                        },
                        // Warning level - recent
                        {
                            room_number: "102",
                            timestamp: new Date(Date.now() - 120 * 60000).toISOString(),
                            type: "unusual-hours",
                            status: "warning",
                            description: "Access attempt outside normal operating hours",
                            user_id: createdUsers[2].id,
                        },
                        {
                            room_number: "105",
                            timestamp: new Date(Date.now() - 180 * 60000).toISOString(),
                            type: "extended-access",
                            status: "warning",
                            description: "Door left open for extended period",
                        },
                        {
                            room_number: "201",
                            timestamp: new Date(Date.now() - 150 * 60000).toISOString(),
                            type: "unusual-hours",
                            status: "warning",
                            description: "Multiple access attempts at 2:30 AM",
                            user_id: createdUsers[6].id,
                        },
                        // Resolved issues
                        {
                            room_number: "104",
                            timestamp: new Date(Date.now() - 240 * 60000).toISOString(),
                            type: "unauthorized-access",
                            status: "resolved",
                            description: "Multiple failed access attempts",
                        },
                        {
                            room_number: "202",
                            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
                            type: "door-forced",
                            status: "resolved",
                            description: "Door sensor triggered alarm",
                        },
                        {
                            room_number: "301",
                            timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
                            type: "extended-access",
                            status: "resolved",
                            description: "Room accessed for over 4 hours outside maintenance window",
                            user_id: createdUsers[4].id,
                        },
                        // Historical data
                        {
                            room_number: "103",
                            timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
                            type: "unauthorized-access",
                            status: "resolved",
                            description: "Attempted access with expired credentials",
                            user_id: createdUsers[7].id,
                        },
                        {
                            room_number: "302",
                            timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago
                            type: "unusual-hours",
                            status: "resolved",
                            description: "Weekend access without prior authorization",
                            user_id: createdUsers[1].id,
                        },
                        {
                            room_number: "201",
                            timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
                            type: "door-forced",
                            status: "resolved",
                            description: "Door held open for more than 30 seconds",
                        },
                    ];
                    return [4 /*yield*/, supabase.from("security_warnings").insert(securityWarnings)];
                case 4:
                    warningError = (_b.sent()).error;
                    if (warningError) {
                        console.error("Error creating security warnings:", warningError);
                        return [2 /*return*/, { success: false, error: warningError }];
                    }
                    return [2 /*return*/, { success: true }];
            }
        });
    });
}
