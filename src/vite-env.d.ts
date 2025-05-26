/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_FIREBASE_PROJECT_ID: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly VITE_FIREBASE_APP_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// JSON module declarations
declare module "*.json" {
  const value: unknown;
  export default value;
}

// Specific type for TOEIC vocabulary
interface ToeicVocabularyItem {
  word: string;
  pronounce: string;
  meaning: string;
}

declare module "../assets/toeic/toeic_600_vocabulary.json" {
  const value: ToeicVocabularyItem[];
  export default value;
}
