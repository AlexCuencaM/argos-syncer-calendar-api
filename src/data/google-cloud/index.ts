import { Auth, google } from 'googleapis';
import {authenticate} from '@google-cloud/local-auth'
import fs from 'fs';
import path from 'path';

export const CREDENTIAL_PATH = path.join(process.cwd(), 'auth2Credential.json');
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
export const SCOPES = ['https://www.googleapis.com/auth/calendar'];
/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist():Promise<Auth.OAuth2Client|null> {
  try {
    const content = fs.readFileSync(TOKEN_PATH, 'utf8');
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials) as Auth.OAuth2Client;
  } catch (err) {
    return null;
  }
}
/**
 * Serializes credentials to a file compatible with GoogleAuth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client: Auth.OAuth2Client):Promise<void> {
  const content = fs.readFileSync(CREDENTIAL_PATH, 'utf8');
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  fs.writeFile(TOKEN_PATH, payload, 'utf8', (err) => {
    if (err) {
      console.error('Error saving credentials:', err);
    } else {
      console.log('Credentials saved to', TOKEN_PATH);
    }
  });
}

async function authorize(): Promise<Auth.OAuth2Client | null> {
  let client = await loadSavedCredentialsIfExist();
  if (!client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIAL_PATH,
  }) as Auth.OAuth2Client;
  if (client?.credentials) {
    await saveCredentials(client);
  }
  return client;
}

export default authorize;