/**
 * Delete Cloudflare Access Applicatoin Action for GitHub
 */

const cp = require("child_process");

const CF_API_BASE_URL = "https://api.cloudflare.com/client/v4";

const getCurrentAppId = () => {
  const params = new URLSearchParams({
    name: process.env.INPUT_NAME,
  });

  const { status, stdout } = cp.spawnSync("curl", [
    ...["--header", `Authorization: Bearer ${process.env.INPUT_TOKEN}`],
    ...["--header", "Content-Type: application/json"],
    `${CF_API_BASE_URL}/accounts/${process.env.INPUT_ACCOUNT_ID}/access/apps?${params.toString()}`,
  ]);

  if (status !== 0) {
    process.exit(status);
  }

  const { success, result, errors } = JSON.parse(stdout.toString());

  if (!success) {
    console.log(`::error ::${errors[0].message}`);
    process.exit(1);
  }

  const name = process.env.INPUT_NAME;
  const record = result.find((x) => x.name === name);

  if (!record) {
    return null
  }

  setOutput('id', record.id);
  return record.id;
};


const deleteApp = (id) => {
  const { status, stdout } = cp.spawnSync("curl", [
    ...["--silent", "--request", "DELETE"],
    ...["--header", `Authorization: Bearer ${process.env.INPUT_TOKEN}`],
    ...["--header", "Content-Type: application/json"],
    `${CF_API_BASE_URL}/accounts/${process.env.INPUT_ACCOUNT_ID}/access/apps/${id}`,
  ]);

  if (status !== 0) {
    process.exit(status);
  }

  const { success, result, errors } = JSON.parse(stdout.toString());

  if (!success) {
    console.log(`::error ::${errors[0].message}`);
    process.exit(1);
  }
};

const id = process.env.INPUT_ID || getCurrentAppId();
if (!id) {
  console.log("Tunnel doesn't exist. Nothing to delete.");
  process.exit(0);
}
deleteApp(id);


