'use client'

import React, { useState, useEffect } from 'react';
import { Input, Button, Checkbox, Form, message, Radio, Slider } from 'antd';
import { ReloadOutlined, CopyOutlined } from '@ant-design/icons';

const KEYBOARD_LAYOUT = [
  { key: 'qwerty', text: 'QWERTY', value: 'qwerty' },
  { key: 'azerty', text: 'AZERTY', value: 'azerty' },
  { key: 'qwertz', text: 'QWERTZ', value: 'qwertz' },
  { key: 'dvorak', text: 'Dvorak', value: 'dvorak' },
  { key: 'colemak', text: 'Colemak', value: 'colemak' },
  { key: 'alphabetic', text: 'Alphabetic', value: 'alphabetic' },
];

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [includeLetters, setIncludeLetters] = useState(true);
  const [includeMixedCase, setIncludeMixedCase] = useState(false);
  const [includePunctuation, setIncludePunctuation] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [passwordLength, setPasswordLength] = useState(12);
  const [keyboardLayout, setKeyboardLayout] = useState('qwerty');

  const refreshPassword = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/password/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          includeLetters,
          includeMixedCase,
          includePunctuation,
          includeNumbers,
          passwordLength,
          keyboardLayout,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate password');
      }

      const data = await response.json();
      setPassword(data.password);
    } catch (error) {
      message.error('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    message.success('Password copied to clipboard!');
  };

  useEffect(() => {
    refreshPassword();
  }, [includeLetters, includeMixedCase, includePunctuation, includeNumbers, passwordLength, keyboardLayout]);

  const handleKeyboardLayoutChange = (e) => {
    setKeyboardLayout(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 relative">
      <div className="w-full max-w-2xl p-12 bg-white rounded shadow-md">
        <div className="w-full mb-6 flex items-center">
          <Input
            size="large"
            placeholder="Generated password..."
            value={password}
            addonAfter={
              <ReloadOutlined
                size="large"
                loading={loading}
                disabled={loading}
                onClick={refreshPassword}
              />
            }
            className="flex-grow"
            disabled={loading}
          />
          <div className="ml-4 hidden md:block">
            <Button
              size="large"
              onClick={copyToClipboard}
              disabled={loading}
              icon={<CopyOutlined />}
            >
              Copy to Clipboard
            </Button>
          </div>
          <div className="ml-4 md:hidden">
            <Button
              size="large"
              icon={<CopyOutlined />}
              onClick={copyToClipboard}
              disabled={loading}
            />
          </div>
        </div>
        <Form layout="vertical">
          <Form.Item>
            <Checkbox
              checked={includeLetters}
              onChange={(e) => setIncludeLetters(e.target.checked)}
              disabled={loading}
              size="large"
            >
              Include Letters
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Checkbox
              checked={includeMixedCase}
              onChange={(e) => setIncludeMixedCase(e.target.checked)}
              disabled={loading}
              size="large"
            >
              Include Mixed Case
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Checkbox
              checked={includePunctuation}
              onChange={(e) => setIncludePunctuation(e.target.checked)}
              disabled={loading}
              size="large"
            >
              Include Punctuation
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Checkbox
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              disabled={loading}
              size="large"
            >
              Include Numbers
            </Checkbox>
          </Form.Item>
          <Form.Item label={`Length: ${passwordLength}`}>
            <Slider
              min={4}
              max={32}
              value={passwordLength}
              onChange={(value) => setPasswordLength(value)}
              className="ml-2"
              size="large"
              disabled={loading}
            />
          </Form.Item>
          <Form.Item label="Keyboard Layout:">
            <Radio.Group
              onChange={handleKeyboardLayoutChange}
              value={keyboardLayout}
              disabled={loading}
              className="large-radio-group"
              size="large"
            >
              {KEYBOARD_LAYOUT.map((layout) => (
                <Radio key={layout.key} value={layout.value} className="large-radio">
                  {layout.text}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default PasswordGenerator;
