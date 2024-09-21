'use client'

import React, { useState, useEffect } from 'react';
import { Input, Button, Switch, Form, message, Radio, Slider } from 'antd';
import { ReloadOutlined, CopyOutlined } from '@ant-design/icons';

const KEYBOARD_LAYOUT = [
  { key: 'qwerty', label: 'QWERTY', value: 'qwerty' },
  { key: 'alphabetic', label: 'Alphabetic', value: 'alphabetic' }
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
        <h1 className="text-2xl font-bold mb-6">Password Generator</h1>
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
          <Form.Item>
            <div className="flex items-center justify-between">
              <label>Include Letters</label>
              <Switch
                checked={includeLetters}
                onChange={(checked) => setIncludeLetters(checked)}
                disabled={loading}
                size="large"
              />
            </div>
          </Form.Item>
          <Form.Item>
            <div className="flex items-center justify-between">
              <label>Include Mixed Case</label>
              <Switch
                checked={includeMixedCase}
                onChange={(checked) => setIncludeMixedCase(checked)}
                disabled={loading}
                size="large"
              />
            </div>
          </Form.Item>
          <Form.Item>
            <div className="flex items-center justify-between">
              <label>Include Punctuation</label>
              <Switch
                checked={includePunctuation}
                onChange={(checked) => setIncludePunctuation(checked)}
                disabled={loading}
                size="large"
              />
            </div>
          </Form.Item>
          <Form.Item>
            <div className="flex items-center justify-between">
              <label>Include Numbers</label>
              <Switch
                checked={includeNumbers}
                onChange={(checked) => setIncludeNumbers(checked)}
                disabled={loading}
                size="large"
              />
            </div>
          </Form.Item>
          <Form.Item label="Keyboard Layout:">
            <Radio.Group
              onChange={handleKeyboardLayoutChange}
              value={keyboardLayout}
              disabled={loading}
              className="large-radio-group"
              size="large"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {KEYBOARD_LAYOUT.map((layout) => (
                  <Radio key={layout.key} value={layout.value} className="large-radio">
                    {layout.label}
                  </Radio>
                ))}
              </div>
            </Radio.Group>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default PasswordGenerator;
