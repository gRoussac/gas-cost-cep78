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
var casper_sdk_1 = require("casper-sdk");
var fs = require('fs').promises;
var http = require('http');
var node_address = 'http://127.0.0.1:11101';
var sdk = new casper_sdk_1.SDK(node_address);
var chain_name = 'casper-net-1';
var private_key = "-----BEGIN PRIVATE KEY-----\nMC4CAQAwBQYDK2VwBCIEIDvOJ4uk5ce6QgyZNcbs0z6gISoilgNmO0JYELCF8vTo\n  -----END PRIVATE KEY-----";
var public_key = (0, casper_sdk_1.privateToPublicKey)(private_key);
var account_hash = new casper_sdk_1.PublicKey(public_key).toAccountHash().toFormattedString();
var private_key_user = "-----BEGIN PRIVATE KEY-----\nMC4CAQAwBQYDK2VwBCIEIJjKwXTU3s5Xm9d/sMOTHyLoI1DHTmxXfUXdLu84D+VS\n  -----END PRIVATE KEY-----";
var public_key_user = (0, casper_sdk_1.privateToPublicKey)(private_key_user);
var account_hash_user = new casper_sdk_1.PublicKey(public_key_user).toAccountHash().toFormattedString();
var sleep = function (ms) { return new Promise(function (r) { return setTimeout(r, ms); }); };
var install = function () { return __awaiter(void 0, void 0, void 0, function () {
    function loadFile() {
        return __awaiter(this, void 0, void 0, function () {
            var fileBuffer, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fs.readFile(__dirname + '/wasm/cep78.wasm')];
                    case 1:
                        fileBuffer = _a.sent();
                        return [2 /*return*/, fileBuffer.buffer]; // Returns an ArrayBuffer
                    case 2:
                        error_1 = _a.sent();
                        throw new Error('Error reading file: ' + error_1.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    var deploy_params, session_params, payment_amount, buffer, wasm, wasmBuffer, install_result, install_result_as_json;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                deploy_params = new casper_sdk_1.DeployStrParams(chain_name, public_key, private_key);
                session_params = new casper_sdk_1.SessionStrParams();
                session_params.session_args_json = JSON.stringify([
                    { "name": "collection_name", "type": "String", "value": "enhanced-nft-1" },
                    { "name": "collection_symbol", "type": "String", "value": "ENFT-1" },
                    { "name": "total_token_supply", "type": "U64", "value": 10000 },
                    { "name": "ownership_mode", "type": "U8", "value": 2 },
                    { "name": "nft_kind", "type": "U8", "value": 1 },
                    { "name": "allow_minting", "type": "Bool", "value": true },
                    { "name": "owner_reverse_lookup_mode", "type": "U8", "value": 0 },
                    { "name": "nft_metadata_kind", "type": "U8", "value": 2 },
                    { "name": "identifier_mode", "type": "U8", "value": 0 },
                    { "name": "metadata_mutability", "type": "U8", "value": 1 },
                    { "name": "events_mode", "type": "U8", "value": 1 }
                ]);
                payment_amount = '450000000000';
                return [4 /*yield*/, loadFile()];
            case 1:
                buffer = _a.sent();
                wasm = buffer && new Uint8Array(buffer);
                wasmBuffer = wasm === null || wasm === void 0 ? void 0 : wasm.buffer;
                if (!wasmBuffer) {
                    console.error('Failed to read wasm file.');
                    return [2 /*return*/];
                }
                session_params.session_bytes = casper_sdk_1.Bytes.fromUint8Array(wasm);
                return [4 /*yield*/, sdk.install(deploy_params, session_params, payment_amount)];
            case 2:
                install_result = _a.sent();
                install_result_as_json = install_result.toJson();
                // console.log(install_result_as_json.deploy_hash);
                return [2 /*return*/, install_result_as_json.deploy_hash];
        }
    });
}); };
var mint = function (contract_hash, token_index) { return __awaiter(void 0, void 0, void 0, function () {
    var token_owner, entry_point, payment_amount, deploy_params, session_params, call_entrypoint_result, call_entrypoint_result_as_json;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token_owner = account_hash;
                entry_point = 'mint';
                payment_amount = '2000000000';
                deploy_params = new casper_sdk_1.DeployStrParams(chain_name, public_key, private_key);
                session_params = new casper_sdk_1.SessionStrParams();
                session_params.session_hash = contract_hash;
                session_params.session_entry_point = entry_point;
                session_params.session_args_simple = ["token_meta_data:String='test_meta_data".concat(token_index, "'"), "token_owner:Key='".concat(token_owner, "'")];
                return [4 /*yield*/, sdk.call_entrypoint(deploy_params, session_params, payment_amount)];
            case 1:
                call_entrypoint_result = _a.sent();
                call_entrypoint_result_as_json = call_entrypoint_result.toJson();
                // console.log(call_entrypoint_result_as_json.deploy_hash);
                return [2 /*return*/, call_entrypoint_result_as_json.deploy_hash];
        }
    });
}); };
var transfer = function (contract_hash, token_index) { return __awaiter(void 0, void 0, void 0, function () {
    var source_key, target_key, entry_point, payment_amount, deploy_params, session_params, call_entrypoint_result, call_entrypoint_result_as_json;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                source_key = account_hash;
                target_key = account_hash_user;
                entry_point = 'transfer';
                payment_amount = '2000000000';
                deploy_params = new casper_sdk_1.DeployStrParams(chain_name, public_key, private_key);
                session_params = new casper_sdk_1.SessionStrParams();
                session_params.session_hash = contract_hash;
                session_params.session_entry_point = entry_point;
                session_params.session_args_simple = ["token_id:U64='".concat(token_index - 1, "'"), "source_key:Key='".concat(source_key, "'"), "target_key:Key='".concat(target_key, "'")];
                return [4 /*yield*/, sdk.call_entrypoint(deploy_params, session_params, payment_amount)];
            case 1:
                call_entrypoint_result = _a.sent();
                call_entrypoint_result_as_json = call_entrypoint_result.toJson();
                // console.log(call_entrypoint_result_as_json.deploy_hash);
                return [2 /*return*/, call_entrypoint_result_as_json.deploy_hash];
        }
    });
}); };
var approve = function (contract_hash, token_index) { return __awaiter(void 0, void 0, void 0, function () {
    var spender, entry_point, payment_amount, deploy_params, session_params, call_entrypoint_result, call_entrypoint_result_as_json;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                spender = account_hash_user;
                entry_point = 'approve';
                payment_amount = '2000000000';
                deploy_params = new casper_sdk_1.DeployStrParams(chain_name, public_key, private_key);
                session_params = new casper_sdk_1.SessionStrParams();
                session_params.session_hash = contract_hash;
                session_params.session_entry_point = entry_point;
                session_params.session_args_simple = ["token_id:U64='".concat(token_index - 1, "'"), "spender:Key='".concat(spender, "'")];
                return [4 /*yield*/, sdk.call_entrypoint(deploy_params, session_params, payment_amount)];
            case 1:
                call_entrypoint_result = _a.sent();
                call_entrypoint_result_as_json = call_entrypoint_result.toJson();
                // console.log(call_entrypoint_result_as_json.deploy_hash);
                return [2 /*return*/, call_entrypoint_result_as_json.deploy_hash];
        }
    });
}); };
var set_token_metadata = function (contract_hash, token_index) { return __awaiter(void 0, void 0, void 0, function () {
    var entry_point, payment_amount, deploy_params, session_params, call_entrypoint_result, call_entrypoint_result_as_json;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                entry_point = 'set_token_metadata';
                payment_amount = '2000000000';
                deploy_params = new casper_sdk_1.DeployStrParams(chain_name, public_key, private_key);
                session_params = new casper_sdk_1.SessionStrParams();
                session_params.session_hash = contract_hash;
                session_params.session_entry_point = entry_point;
                session_params.session_args_simple = ["token_id:U64='".concat(token_index - 1, "'"), "token_meta_data:String='new_meta_data_update".concat(token_index, "'"),];
                return [4 /*yield*/, sdk.call_entrypoint(deploy_params, session_params, payment_amount)];
            case 1:
                call_entrypoint_result = _a.sent();
                call_entrypoint_result_as_json = call_entrypoint_result.toJson();
                // console.log(call_entrypoint_result_as_json.deploy_hash);
                return [2 /*return*/, call_entrypoint_result_as_json.deploy_hash];
        }
    });
}); };
var getDeploy = function (deploy_hash) { return __awaiter(void 0, void 0, void 0, function () {
    var finalized_approvals, get_deploy_options, info_get_deploy, cost;
    var _a, _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                finalized_approvals = true;
                get_deploy_options = sdk.get_deploy_options({
                    deploy_hash: new casper_sdk_1.DeployHash(deploy_hash).toJson(),
                    finalized_approvals: finalized_approvals,
                });
                return [4 /*yield*/, sdk.get_deploy(get_deploy_options)];
            case 1:
                info_get_deploy = _e.sent();
                cost = (_d = (_c = (_b = (_a = info_get_deploy.toJson()) === null || _a === void 0 ? void 0 : _a.execution_results[0]) === null || _b === void 0 ? void 0 : _b.result) === null || _c === void 0 ? void 0 : _c.Success) === null || _d === void 0 ? void 0 : _d.cost;
                return [2 /*return*/, (0, casper_sdk_1.motesToCSPR)(cost)];
        }
    });
}); };
var queryGlobalState = function (key_as_string, path_as_string) { return __awaiter(void 0, void 0, void 0, function () {
    var query_global_state_options, query_global_state;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query_global_state_options = sdk.query_global_state_options({
                    key_as_string: key_as_string,
                    path_as_string: path_as_string,
                });
                return [4 /*yield*/, sdk.query_global_state(query_global_state_options)];
            case 1:
                query_global_state = (_a.sent()).toJson();
                return [2 /*return*/, query_global_state['stored_value']];
        }
    });
}); };
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var deploy_hash, cost, contract_hash;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, install()];
            case 1:
                deploy_hash = _d.sent();
                return [4 /*yield*/, sleep(15000)];
            case 2:
                _d.sent();
                return [4 /*yield*/, getDeploy(deploy_hash)];
            case 3:
                cost = _d.sent();
                console.log('cost install', cost);
                return [4 /*yield*/, queryGlobalState(account_hash)];
            case 4:
                contract_hash = (_c = (_b = (_a = (_d.sent())) === null || _a === void 0 ? void 0 : _a.Account) === null || _b === void 0 ? void 0 : _b.named_keys[0]) === null || _c === void 0 ? void 0 : _c.key;
                return [4 /*yield*/, mint(contract_hash, 1)];
            case 5:
                deploy_hash = _d.sent();
                return [4 /*yield*/, sleep(10000)];
            case 6:
                _d.sent();
                return [4 /*yield*/, getDeploy(deploy_hash)];
            case 7:
                cost = _d.sent();
                console.log('cost mint1', cost);
                return [4 /*yield*/, mint(contract_hash, 2)];
            case 8:
                deploy_hash = _d.sent();
                return [4 /*yield*/, sleep(10000)];
            case 9:
                _d.sent();
                return [4 /*yield*/, getDeploy(deploy_hash)];
            case 10:
                cost = _d.sent();
                console.log('cost mint2', cost);
                return [4 /*yield*/, mint(contract_hash, 3)];
            case 11:
                deploy_hash = _d.sent();
                return [4 /*yield*/, sleep(10000)];
            case 12:
                _d.sent();
                return [4 /*yield*/, getDeploy(deploy_hash)];
            case 13:
                cost = _d.sent();
                console.log('cost mint3', cost);
                return [4 /*yield*/, transfer(contract_hash, 1)];
            case 14:
                deploy_hash = _d.sent();
                return [4 /*yield*/, sleep(10000)];
            case 15:
                _d.sent();
                return [4 /*yield*/, getDeploy(deploy_hash)];
            case 16:
                cost = _d.sent();
                console.log('cost transfer', cost);
                return [4 /*yield*/, approve(contract_hash, 2)];
            case 17:
                deploy_hash = _d.sent();
                return [4 /*yield*/, sleep(10000)];
            case 18:
                _d.sent();
                return [4 /*yield*/, getDeploy(deploy_hash)];
            case 19:
                cost = _d.sent();
                console.log('cost approve', cost);
                return [4 /*yield*/, set_token_metadata(contract_hash, 3)];
            case 20:
                deploy_hash = _d.sent();
                return [4 /*yield*/, sleep(10000)];
            case 21:
                _d.sent();
                return [4 /*yield*/, getDeploy(deploy_hash)];
            case 22:
                cost = _d.sent();
                console.log('cost set_token_metadata', cost);
                return [2 /*return*/];
        }
    });
}); };
main();
