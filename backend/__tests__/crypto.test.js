//backend/__tests__/crypto.test.js
const { encrypt, decrypt } = require("../utils/cryptoUtil");

test("AES encrypt-decrypt works correctly", () => {
  const original = "123456789012";

  const encrypted = encrypt(original);
  expect(encrypted).not.toBe(original);

  const decrypted = decrypt(encrypted);
  expect(decrypted).toBe(original);
});
