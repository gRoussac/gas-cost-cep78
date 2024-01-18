import { DeployStrParams, SDK, SessionStrParams, privateToPublicKey, Bytes, DeployHash, PublicKey, motesToCSPR } from 'casper-sdk';
const fs = require('fs').promises;

const node_address = 'http://127.0.0.1:11101';
const sdk = new SDK(node_address);
const chain_name = 'casper-net-1';
const private_key = `-----BEGIN PRIVATE KEY-----
MC4CAQAwBQYDK2VwBCIEILmJzgugrlFHS+UX7Ah/UpacP8xKfiAmbgYbJCBstI+Z
  -----END PRIVATE KEY-----`;
const public_key = privateToPublicKey(private_key);
const account_hash = new PublicKey(public_key).toAccountHash().toFormattedString();

const private_key_user = `-----BEGIN PRIVATE KEY-----
MC4CAQAwBQYDK2VwBCIEIBN46qdO88VEx6amKBMyMbK0OpmkwH3QgUAzzDsnwFti
  -----END PRIVATE KEY-----`;
const public_key_user = privateToPublicKey(private_key_user);
const account_hash_user = new PublicKey(public_key_user).toAccountHash().toFormattedString();

const sleep = ms => new Promise(r => setTimeout(r, ms));

const install = async () => {
  const deploy_params = new DeployStrParams(chain_name, public_key, private_key);
  async function loadFile() {
    try {
      const fileBuffer = await fs.readFile(__dirname + '/wasm/cep78.wasm');
      return fileBuffer.buffer; // Returns an ArrayBuffer
    } catch (error) {
      throw new Error('Error reading file: ' + error.message);
    }
  }

  const session_params = new SessionStrParams();
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
  const payment_amount = '450000000000';

  const buffer = await loadFile();
  const wasm = buffer && new Uint8Array(buffer);
  const wasmBuffer = wasm?.buffer;
  if (!wasmBuffer) {
    console.error('Failed to read wasm file.');
    return;
  }

  session_params.session_bytes = Bytes.fromUint8Array(wasm);

  const install_result = await sdk.install(
    deploy_params,
    session_params,
    payment_amount
  );
  const install_result_as_json = install_result.toJson();
  // console.log(install_result_as_json.deploy_hash);
  return install_result_as_json.deploy_hash;
};

const mint = async (contract_hash: string, token_index: number) => {
  const token_owner = account_hash;
  const entry_point = 'mint';
  const payment_amount = '3000000000';

  const deploy_params = new DeployStrParams(chain_name, public_key, private_key);

  const session_params = new SessionStrParams();
  session_params.session_hash = contract_hash;
  session_params.session_entry_point = entry_point;
  session_params.session_args_simple = [`token_meta_data:String='test_meta_data${token_index}'`, `token_owner:Key='${token_owner}'`];

  const call_entrypoint_result = await sdk.call_entrypoint(
    deploy_params,
    session_params,
    payment_amount
  );
  const call_entrypoint_result_as_json = call_entrypoint_result.toJson();
  // console.log(call_entrypoint_result_as_json.deploy_hash);
  return call_entrypoint_result_as_json.deploy_hash;
};

const transfer = async (contract_hash: string, token_index: number) => {
  const source_key = account_hash;
  const target_key = account_hash_user;
  const entry_point = 'transfer';
  const payment_amount = '3000000000';

  const deploy_params = new DeployStrParams(chain_name, public_key, private_key);

  const session_params = new SessionStrParams();
  session_params.session_hash = contract_hash;
  session_params.session_entry_point = entry_point;
  session_params.session_args_simple = [`token_id:U64='${token_index - 1}'`, `source_key:Key='${source_key}'`, `target_key:Key='${target_key}'`];

  const call_entrypoint_result = await sdk.call_entrypoint(
    deploy_params,
    session_params,
    payment_amount
  );
  const call_entrypoint_result_as_json = call_entrypoint_result.toJson();
  // console.log(call_entrypoint_result_as_json.deploy_hash);
  return call_entrypoint_result_as_json.deploy_hash;
};

const approve = async (contract_hash: string, token_index: number) => {
  const spender = account_hash_user;
  const entry_point = 'approve';
  const payment_amount = '2000000000';

  const deploy_params = new DeployStrParams(chain_name, public_key, private_key);

  const session_params = new SessionStrParams();
  session_params.session_hash = contract_hash;
  session_params.session_entry_point = entry_point;
  session_params.session_args_simple = [`token_id:U64='${token_index - 1}'`, `spender:Key='${spender}'`];

  const call_entrypoint_result = await sdk.call_entrypoint(
    deploy_params,
    session_params,
    payment_amount
  );
  const call_entrypoint_result_as_json = call_entrypoint_result.toJson();
  // console.log(call_entrypoint_result_as_json.deploy_hash);
  return call_entrypoint_result_as_json.deploy_hash;
};

const set_token_metadata = async (contract_hash: string, token_index: number) => {
  const entry_point = 'set_token_metadata';
  const payment_amount = '2000000000';

  const deploy_params = new DeployStrParams(chain_name, public_key, private_key);

  const session_params = new SessionStrParams();
  session_params.session_hash = contract_hash;
  session_params.session_entry_point = entry_point;
  session_params.session_args_simple = [`token_id:U64='${token_index - 1}'`, `token_meta_data:String='new_meta_data_update${token_index}'`,];

  const call_entrypoint_result = await sdk.call_entrypoint(
    deploy_params,
    session_params,
    payment_amount
  );
  const call_entrypoint_result_as_json = call_entrypoint_result.toJson();
  // console.log(call_entrypoint_result_as_json.deploy_hash);
  return call_entrypoint_result_as_json.deploy_hash;
};

const getDeploy = async (deploy_hash: string) => {
  let finalized_approvals = true;
  let get_deploy_options = sdk.get_deploy_options({
    deploy_hash: new DeployHash(
      deploy_hash
    ).toJson(),
    finalized_approvals: finalized_approvals,
  });
  const info_get_deploy = await sdk.get_deploy(get_deploy_options);
  const cost = info_get_deploy.toJson()?.execution_results[0]?.result?.Success?.cost;
  return motesToCSPR(cost);
};

const queryGlobalState = async (key_as_string: string, path_as_string?: string) => {
  let query_global_state_options = sdk.query_global_state_options({
    key_as_string,
    path_as_string,
  });
  const query_global_state = (await sdk.query_global_state(query_global_state_options)).toJson();
  return query_global_state['stored_value'];
};

const main = async () => {
  let deploy_hash = await install();
  await sleep(15000);
  let cost = await getDeploy(deploy_hash);
  console.log('cost install', cost);

  let contract_hash = (await queryGlobalState(account_hash))?.Account?.named_keys[0]?.key;

  deploy_hash = await mint(contract_hash, 1);
  await sleep(10000);
  cost = await getDeploy(deploy_hash);
  console.log('cost mint1', cost);

  deploy_hash = await mint(contract_hash, 2);
  await sleep(10000);
  cost = await getDeploy(deploy_hash);
  console.log('cost mint2', cost);

  deploy_hash = await mint(contract_hash, 3);
  await sleep(10000);
  cost = await getDeploy(deploy_hash);
  console.log('cost mint3', cost);

  deploy_hash = await transfer(contract_hash, 1);
  await sleep(10000);
  cost = await getDeploy(deploy_hash);
  console.log('cost transfer', cost);

  deploy_hash = await approve(contract_hash, 2);
  await sleep(10000);
  cost = await getDeploy(deploy_hash);
  console.log('cost approve', cost);

  deploy_hash = await set_token_metadata(contract_hash, 3);
  await sleep(10000);
  cost = await getDeploy(deploy_hash);
  console.log('cost set_token_metadata', cost);

};

main();
