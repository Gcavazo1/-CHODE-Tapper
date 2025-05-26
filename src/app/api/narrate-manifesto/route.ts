import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import { NextRequest, NextResponse } from 'next/server';
import { manifestoSummary } from '@/components/ManifestoSummary';
import { girthonomicsSummary } from '@/components/GirthonomicsSummary';
import { protos } from '@google-cloud/text-to-speech';

// Use proper enum types
const { SsmlVoiceGender, AudioEncoding } = protos.google.cloud.texttospeech.v1;

// Define available voices and a default
const AVAILABLE_VOICES: Record<string, { name: string, ssmlGender: protos.google.cloud.texttospeech.v1.SsmlVoiceGender }> = {
  'en-US-Wavenet-D': { name: 'en-US-Wavenet-D', ssmlGender: SsmlVoiceGender.MALE },
  'en-US-Neural2-J': { name: 'en-US-Neural2-J', ssmlGender: SsmlVoiceGender.MALE },
  'en-US-Wavenet-C': { name: 'en-US-Wavenet-C', ssmlGender: SsmlVoiceGender.FEMALE },
  'en-US-Neural2-F': { name: 'en-US-Neural2-F', ssmlGender: SsmlVoiceGender.FEMALE },
};
const DEFAULT_VOICE_ID = 'en-US-Wavenet-D';

// Initialize the client with credentials from environment variables
let client: TextToSpeechClient;
let initError: Error | null = null;

try {
  // Add detailed logging for debugging
  console.log('Initializing Text-to-Speech client...');
  
  // Try using GOOGLE_CLOUD_KEY_JSON environment variable (JSON content as string)
  if (process.env.GOOGLE_CLOUD_KEY_JSON) {
    console.log('Found GOOGLE_CLOUD_KEY_JSON, attempting to parse...');
    try {
      const credentials = JSON.parse(process.env.GOOGLE_CLOUD_KEY_JSON);
      client = new TextToSpeechClient({ credentials });
      console.log('Successfully initialized client with provided credentials');
    } catch (parseError) {
      console.error('Error parsing GOOGLE_CLOUD_KEY_JSON:', parseError);
      initError = parseError instanceof Error ? parseError : new Error(String(parseError));
      // Fallback to default initialization
      client = new TextToSpeechClient();
    }
  } 
  // Fall back to GOOGLE_APPLICATION_CREDENTIALS (path to credentials file)
  else {
    console.log('No GOOGLE_CLOUD_KEY_JSON found, using default credentials');
    client = new TextToSpeechClient();
  }
} catch (error) {
  console.error('Error initializing TextToSpeechClient:', error);
  initError = error instanceof Error ? error : new Error(String(error));
  // Create a dummy client that will throw a clear error when used
  client = new TextToSpeechClient();
}

// Prepare text for TTS by removing any remaining markdown-like characters
// that might interfere with speech synthesis, especially asterisks.
function prepareTextForTTS(text: string): string {
  // Since ManifestoSummary.ts is now pre-cleaned, this function can be simpler.
  // Focus on any remaining structural elements or specific problematic characters.
  let cleanedText = text;

  // Remove any remaining heading markers (though they should be gone from summary)
  cleanedText = cleanedText.replace(/^#+\s+/gm, ''); // Remove lines starting with #, ##, etc.

  // Replace ellipses with periods or remove, as TTS can sometimes pause awkwardly.
  cleanedText = cleanedText.replace(/\.\.\./g, '. '); 

  // Specific character replacements if TTS mispronounces them or if they are visual artifacts
  // Example: If a hyphen-like character isn't read well:
  cleanedText = cleanedText.replace(/−/g, '-'); // Replace en-dash or minus with hyphen-minus
  
  // Normalize multiple spaces that might result from replacements
  cleanedText = cleanedText.replace(/\s+/g, ' ').trim();

  return cleanedText;
}

export async function GET(request: NextRequest) {
  try {
    // Check if there was an initialization error
    if (initError) {
      throw new Error(`Client initialization failed: ${initError.message}`);
    }
    
    const url = new URL(request.url);
    const voiceIdFromQuery = url.searchParams.get('voiceName');
    const summaryKey = url.searchParams.get('summaryKey') || 'main';
    
    let selectedVoiceDetails = AVAILABLE_VOICES[voiceIdFromQuery || DEFAULT_VOICE_ID];
    if (!selectedVoiceDetails) {
        console.warn(`Invalid voiceId '${voiceIdFromQuery}' requested, falling back to default.`);
        selectedVoiceDetails = AVAILABLE_VOICES[DEFAULT_VOICE_ID];
    }

    console.log(`Preparing TTS request with voice: ${selectedVoiceDetails.name}`);
    
    // Select the appropriate summary based on summaryKey
    const summaryText = summaryKey === 'girthonomics' ? girthonomicsSummary : manifestoSummary;
    const narrationText = prepareTextForTTS(summaryText);
    console.log(`Narrating ${summaryKey} summary, length: ${narrationText.length} characters`);
    
    // Use the proper type for the request
    const ttsRequest: protos.google.cloud.texttospeech.v1.ISynthesizeSpeechRequest = {
      input: { text: narrationText },
      voice: { 
        languageCode: 'en-US', 
        name: selectedVoiceDetails.name,
        ssmlGender: selectedVoiceDetails.ssmlGender
      },
      audioConfig: { audioEncoding: AudioEncoding.MP3 },
    };

    console.log('Sending synthesizeSpeech request with voice:', ttsRequest.voice?.name || 'default');
    const [response] = await client.synthesizeSpeech(ttsRequest);
    console.log('Received TTS response');
    
    const audioContent = response.audioContent;

    if (!audioContent) {
      throw new Error('Failed to generate audio content');
    }

    console.log('Returning audio content, length:', audioContent.length);
    return new NextResponse(Buffer.from(audioContent as Uint8Array), {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioContent.length.toString(),
      },
    });
  } catch (error) {
    console.error('TTS API Error:', error);
    return NextResponse.json(
      { message: 'Failed to synthesize speech', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 