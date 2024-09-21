import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { 
    passwordLength = 12, 
    includeLetters = true, 
    includeMixedCase = false, 
    includePunctuation = false, 
    includeNumbers = false 
  } = await request.json();

  const lettersSet = 'abcdefghijklmnopqrstuvwxyz';
  const mixedCaseLetters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const punctuationSet = '!@#$%^&*()_+[]{}|;:,.<>?';
  const numbersSet = '0123456789';

  let characters = '';
  if (includeLetters) {
    characters += includeMixedCase ? mixedCaseLetters : lettersSet;
  }
  if (includePunctuation) {
    characters += punctuationSet;
  }
  if (includeNumbers) {
    characters += numbersSet;
  }

  if (characters === '') {
    characters = lettersSet;
  }

  let password = '';
  for (let i = 0; i < passwordLength; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return NextResponse.json({ password }, { status: 200 });
}
