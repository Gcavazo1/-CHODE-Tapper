import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import { NextResponse } from 'next/server';

export async function GET() {
  let status = 'unknown';
  let details = null;
  let credentials = null;
  
  try {
    // Check if we have the credentials
    if (process.env.GOOGLE_CLOUD_KEY_JSON) {
      try {
        credentials = JSON.parse(process.env.GOOGLE_CLOUD_KEY_JSON);
        // Mask the private_key for security
        if (credentials.private_key) {
          credentials = {
            ...credentials,
            private_key: credentials.private_key.substring(0, 15) + '...[REDACTED]...',
          };
        }
      } catch (e) {
        details = `Error parsing credentials: ${e instanceof Error ? e.message : String(e)}`;
        status = 'invalid_credentials_format';
      }
    } else {
      details = 'No GOOGLE_CLOUD_KEY_JSON environment variable found';
      status = 'missing_credentials';
    }
    
    // Try to initialize the client
    if (status === 'unknown' || status === 'missing_credentials') {
      let client;
      
      try {
        // Try to create a client
        if (process.env.GOOGLE_CLOUD_KEY_JSON) {
          // We only attempt to parse the JSON again here because we're in a different try/catch block
          const actualCredentials = JSON.parse(process.env.GOOGLE_CLOUD_KEY_JSON);
          client = new TextToSpeechClient({ credentials: actualCredentials });
        } else {
          client = new TextToSpeechClient();
        }
        
        // Try to make a simple API call (listVoices is a lightweight call)
        const [result] = await client.listVoices({ languageCode: 'en-US' });
        
        if (result && result.voices && result.voices.length > 0) {
          status = 'success';
          details = `Successfully connected to Google Cloud Text-to-Speech API. Found ${result.voices.length} voices for en-US.`;
        } else {
          status = 'api_error';
          details = 'Connected to API but received unexpected response format';
        }
      } catch (e) {
        status = 'api_error';
        details = `Error connecting to API: ${e instanceof Error ? e.message : String(e)}`;
      }
    }
  } catch (e) {
    status = 'unknown_error';
    details = `Unexpected error: ${e instanceof Error ? e.message : String(e)}`;
  }
  
  return NextResponse.json({
    status,
    details,
    credentials,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
} 