export function generatePassword({
  passwordLength,
  includeLetters,
  includeMixedCase,
  includePunctuation,
  includeNumbers
}: {
  passwordLength: number,
  includeLetters: boolean,
  includeMixedCase: boolean,
  includePunctuation: boolean,
  includeNumbers: boolean
}): string {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const mixedCaseLetters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const punctuation = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

  let characters = '';

  if (includeLetters) {
    characters += includeMixedCase ? mixedCaseLetters : letters;
  }

  if (includeNumbers) {
    characters += numbers;
  }

  if (includePunctuation) {
    characters += punctuation;
  }

  if (characters.length === 0) {
    throw new Error('No character types selected for password generation.');
  }

  let password = '';
  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }

  return password;
}