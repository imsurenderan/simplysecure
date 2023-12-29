import { deriveKey } from "./handleKey";

export async function encryptFile(
  file: File,
  password: string
): Promise<ArrayBuffer> {
  const { key, salt } = await deriveKey(password);

  const fileBuffer = await file.arrayBuffer();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encryptedBuffer = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    fileBuffer
  );

  const combinedBuffer = new Uint8Array(
    salt.length + iv.length + encryptedBuffer.byteLength
  );
  combinedBuffer.set(salt, 0);
  combinedBuffer.set(iv, salt.length);
  combinedBuffer.set(new Uint8Array(encryptedBuffer), salt.length + iv.length);

  return combinedBuffer.buffer;
}

export async function decryptFile(
  combinedBuffer: ArrayBuffer,
  password: string
): Promise<ArrayBuffer> {
  const salt = new Uint8Array(combinedBuffer.slice(0, 16));
  const iv = new Uint8Array(combinedBuffer.slice(16, 28));
  const encryptedData = combinedBuffer.slice(28);

  const { key } = await deriveKey(password, salt);
  const decryptedData = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    encryptedData
  );

  return decryptedData;
}
