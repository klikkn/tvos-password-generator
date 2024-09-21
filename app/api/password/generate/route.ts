import { NextResponse } from 'next/server'
import { generatePassword } from './password-generate-algorithm';

export async function POST(request: Request) {
  const {
    passwordLength = 12,
    includeLetters = true,
    includeMixedCase = false,
    includePunctuation = false,
    includeNumbers = false,
  } = await request.json();

  const password = generatePassword({
    passwordLength,
    includeLetters,
    includeMixedCase,
    includePunctuation,
    includeNumbers,
  } as any);

  return NextResponse.json({ password }, { status: 200 });
}

const alphabeticBy6 = [
  'abcdef',
  'ghijkl',
  'mnopqr',
  'stuvwx',
  'yz1234',
  '567890'
];

const alphabeticBy13 = [
  'abcdefghijklm',
  'nopqrstuvwxyz'
];

const qwerty = [
  'qwertyuiop[]\\',
  'asdfghjkl;\'',
  'zxcvbnm,./'
];

const qwertyWithNumbers = [
  '1234567890',
  'qwertyuiop[]\\',
  'asdfghjkl;\'',
  'zxcvbnm,./'
];

