"use client";
export function isValidPassword(password: string): boolean {
  const lowerCaseRegex = /[a-z]/;
  const upperCaseRegex = /[A-Z]/;
  const numericRegex = /[0-9]/;
  const specialCharRegex = /[!@#$%^&*()_+~`|}{[\]:;?><,./-]/;

  return (
    lowerCaseRegex.test(password) &&
    upperCaseRegex.test(password) &&
    numericRegex.test(password) &&
    specialCharRegex.test(password) &&
    password.length >= 12
  );
}

export function generateStrongPassword(): string {
  const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
  const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numericChars = "0123456789";
  const specialChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
  const allChars =
    lowerCaseChars + upperCaseChars + numericChars + specialChars;
  let password = "";

  password += lowerCaseChars.charAt(
    Math.floor(Math.random() * lowerCaseChars.length)
  );
  password += upperCaseChars.charAt(
    Math.floor(Math.random() * upperCaseChars.length)
  );
  password += numericChars.charAt(
    Math.floor(Math.random() * numericChars.length)
  );
  password += specialChars.charAt(
    Math.floor(Math.random() * specialChars.length)
  );

  for (let i = password.length; i < 12; i++) {
    password += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }

  return password
    .split("")
    .sort(() => 0.5 - Math.random())
    .join(""); // Shuffle the password
}
