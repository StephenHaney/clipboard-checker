import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export const ClipboardDebugger = () => {
  const [clipboardData, setClipboardData] = useState<Array<{ format: string; content: string }>>([]);

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();

    // Get all available formats
    const formats = e.clipboardData.types;
    const newData = [];

    // Collect data for each format
    formats.forEach((format) => {
      try {
        const content = e.clipboardData.getData(format);
        newData.push({
          format,
          content,
        });
      } catch (error) {
        newData.push({
          format,
          content: `Error reading format: ${error}`,
        });
      }
    });

    // Get files if any
    const fileList = Array.from(e.clipboardData.files);
    if (fileList.length > 0) {
      newData.push({
        format: 'Files',
        content: fileList.map((file) => `${file.name} (${file.type}) - ${(file.size / 1024).toFixed(2)} KB`).join('\n'),
      });
    }

    setClipboardData(newData);
  };

  return (
    <Card className="w-full max-w-[1200px] mx-auto">
      <CardHeader>
        <CardTitle>Clipboard Debugger</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <textarea
            className="w-full h-64 p-2 border rounded resize-y min-h-[8rem]"
            placeholder="Paste content here..."
            onPaste={handlePaste}
          />

          <div className="space-y-6">
            {clipboardData.map((item, index) => (
              <div key={index}>
                <h3 className="text-lg font-medium mb-2">Format: {item.format}</h3>
                <pre
                  className="p-4 bg-gray-100 rounded overflow-auto min-h-[3rem] max-h-[32rem] whitespace-pre-wrap break-words"
                  style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', width: '100%' }}
                >
                  {item.content || 'No content'}
                </pre>
              </div>
            ))}
            {clipboardData.length === 0 && (
              <div className="text-gray-500">Paste content above to see all clipboard contents</div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
