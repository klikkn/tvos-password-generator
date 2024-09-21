'use client'

import React, { useState, useEffect } from 'react';
import { Input, Button, Checkbox, Form, Message } from 'semantic-ui-react';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [includeLetters, setIncludeLetters] = useState(true);
  const [includeMixedCase, setIncludeMixedCase] = useState(false);
  const [includePunctuation, setIncludePunctuation] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [passwordLength, setPasswordLength] = useState(12);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState('');

  const refreshPassword = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/password', {
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
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to generate password');
      }
  
      const data = await response.json();
      setPassword(data.password);
    } catch (error) {
      setNotification('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setNotification('Password copied to clipboard!');
    setTimeout(() => setNotification(''), 3000); // Clear notification after 3 seconds
  };

  useEffect(() => {
    refreshPassword();
  }, []);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 relative">
      {notification && (
        <div className="absolute top-0 left-0 right-0 p-4">
          <Message
            positive={notification.startsWith('Password copied')}
            negative={notification.startsWith('Error')}
            onDismiss={() => setNotification('')}
          >
            {notification}
          </Message>
        </div>
      )}
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl p-8 bg-white rounded shadow-md">
        <div className="w-full mb-4 flex items-center">
          <Input
            placeholder="Generated password..."
            value={password}
            action={{
              color: 'teal',
              icon: 'refresh',
              onClick: refreshPassword,
              loading: loading,
              disabled: loading
            }}
            className="flex-grow"
            loading={loading}
            disabled={loading}
          />
          <div className="ml-2 hidden md:block">
            <Button onClick={copyToClipboard} disabled={loading}>
              Copy to Clipboard
            </Button>
          </div>
          <div className="ml-2 md:hidden">
            <Button icon="copy" onClick={copyToClipboard} disabled={loading} />
          </div>
        </div>
        <Form>
          <Form.Field>
            <Checkbox
              label="Include Letters"
              checked={includeLetters}
              onChange={(e, { checked }) => setIncludeLetters(checked)}
              disabled={loading}
            />
          </Form.Field>
          <Form.Field>
            <Checkbox
              label="Include Mixed Case"
              checked={includeMixedCase}
              onChange={(e, { checked }) => setIncludeMixedCase(checked)}
              disabled={loading}
            />
          </Form.Field>
          <Form.Field>
            <Checkbox
              label="Include Punctuation"
              checked={includePunctuation}
              onChange={(e, { checked }) => setIncludePunctuation(checked)}
              disabled={loading}
            />
          </Form.Field>
          <Form.Field>
            <Checkbox
              label="Include Numbers"
              checked={includeNumbers}
              onChange={(e, { checked }) => setIncludeNumbers(checked)}
              disabled={loading}
            />
          </Form.Field>
          <Form.Field>
            <label>Length:</label>
            <Input
              type="number"
              value={passwordLength}
              onChange={(e) => setPasswordLength(e.target.value)}
              className="ml-2"
              disabled={loading}
            />
          </Form.Field>
        </Form>
      </div>
    </div>
  );
};

export default PasswordGenerator;