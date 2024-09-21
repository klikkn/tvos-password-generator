import { NextResponse } from 'next/server'
import { generatePassword } from './password-generate-algorithm';

export async function POST(request: Request) {
  try {
    const {
      // captchaToken,
      passwordLength = 12,
      includeLetters = true,
      includeMixedCase = false,
      includePunctuation = false,
      includeNumbers = false,
    } = await request.json();

    // const captchaResponse = await fetch(
    //   `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`,
    //   {
    //     method: 'POST',
    //   }
    // );

    // const data = await captchaResponse.json();

    // if (data.success) {
      const password = generatePassword({
        passwordLength,
        includeLetters,
        includeMixedCase,
        includePunctuation,
        includeNumbers,
      } as any);

      return NextResponse.json({ password }, { status: 200 });
    // } else {
      // return NextResponse.json({ error: 'reCAPTCHA verification failed.' }, { status: 400 });
    // }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
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

