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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
exports.sendResetPasswordEmail = exports.transporter = void 0;
// lib/nodemailer.ts
var nodemailer_1 = require("nodemailer");
// Create a transporter using SMTP (you can replace with your email service provider's details)
exports.transporter = nodemailer_1.default.createTransport({
    service: 'gmail', // Use Gmail as an example, change according to your provider
    auth: {
        user: 'danishfirhan05@gmail.com', // your email (e.g., 'example@gmail.com')
        pass: 'tbmi hlls vzfj mggc', // your email password or app-specific password
    },
});
// Function to send a reset password email
var sendResetPasswordEmail = function (to, resetLink, name) { return __awaiter(void 0, void 0, void 0, function () {
    var mailOptions, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                mailOptions = {
                    from: "\"MusicRecords2U\" <".concat(process.env.EMAIL_USER, ">"), // Sender email
                    to: to, // Recipient email
                    subject: 'Password Reset Request',
                    html: "\n            <p>Hi ".concat(name, ",</p>\n            <p>We received a request to reset the password for your account. You can reset your password by clicking the link below:</p>\n            <a href=\"").concat(resetLink, "\" target=\"_blank\" rel=\"noopener noreferrer\">Reset Password</a>\n            <p>If you did not request a password reset, please ignore this email or contact our support team.</p>\n            <p>Thanks,</p>\n            <p>Your team at MusicRecords2U</p>\n        "),
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, exports.transporter.sendMail(mailOptions)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.error('Failed to send email:', error_1);
                throw new Error('Failed to send reset password email');
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.sendResetPasswordEmail = sendResetPasswordEmail;
