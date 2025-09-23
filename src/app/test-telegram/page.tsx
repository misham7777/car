"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { testTelegramIntegration, testApiEndpoint } from '@/lib/telegram-test';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function TestTelegramPage() {
  const [isTesting, setIsTesting] = useState(false);
  const [testResults, setTestResults] = useState<{
    connection?: { success: boolean; error?: string };
    api?: { status?: string; success?: boolean; telegram?: unknown; error?: string };
    lead?: { success: boolean; error?: string };
  }>({});

  const runConnectionTest = async () => {
    setIsTesting(true);
    try {
      const result = await testApiEndpoint();
      setTestResults(prev => ({ ...prev, api: result }));
    } catch (error) {
      setTestResults(prev => ({ 
        ...prev, 
        api: { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
      }));
    } finally {
      setIsTesting(false);
    }
  };

  const runLeadTest = async () => {
    setIsTesting(true);
    try {
      const result = await testTelegramIntegration();
      setTestResults(prev => ({ ...prev, lead: result }));
    } catch (error) {
      setTestResults(prev => ({ 
        ...prev, 
        lead: { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
      }));
    } finally {
      setIsTesting(false);
    }
  };

  const runFullTest = async () => {
    setIsTesting(true);
    setTestResults({});
    
    try {
      // Test API endpoint first
      const apiResult = await testApiEndpoint();
      setTestResults(prev => ({ ...prev, api: apiResult }));
      
      // Test Telegram integration
      const telegramResult = await testTelegramIntegration();
      setTestResults(prev => ({ ...prev, lead: telegramResult }));
      
    } catch (error) {
      console.error('Full test failed:', error);
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="min-h-screen bg-carbon p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-asphalt border-trim-silver/20">
          <CardHeader>
            <CardTitle className="text-2xl text-pearl">Telegram Integration Test</CardTitle>
            <p className="text-slate-400">
              Test the Telegram lead delivery functionality
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Environment Status */}
            <div className="space-y-2">
              <h3 className="text-lg text-pearl">Environment Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  {process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  <span className="text-slate-400">Bot Token</span>
                </div>
                <div className="flex items-center gap-2">
                  {process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  <span className="text-slate-400">Chat ID</span>
                </div>
              </div>
            </div>

            {/* Test Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={runConnectionTest}
                disabled={isTesting}
                variant="outline"
              >
                {isTesting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                Test API Endpoint
              </Button>
              
              <Button 
                onClick={runLeadTest}
                disabled={isTesting}
                variant="outline"
              >
                {isTesting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                Test Telegram Delivery
              </Button>
              
              <Button 
                onClick={runFullTest}
                disabled={isTesting}
                className="bg-taillight-red hover:bg-taillight-red/90"
              >
                {isTesting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                Run Full Test
              </Button>
            </div>

            {/* Test Results */}
            {Object.keys(testResults).length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg text-pearl">Test Results</h3>
                
                {testResults.api && (
                  <div className="p-4 rounded-lg bg-carbon border border-trim-silver/20">
                    <div className="flex items-center gap-2 mb-2">
                      {(testResults.api.status === 'ok' || testResults.api.success) ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                      <span className="text-pearl font-medium">API Endpoint Test</span>
                    </div>
                    <pre className="text-sm text-slate-400 overflow-auto">
                      {JSON.stringify(testResults.api, null, 2)}
                    </pre>
                  </div>
                )}

                {testResults.lead && (
                  <div className="p-4 rounded-lg bg-carbon border border-trim-silver/20">
                    <div className="flex items-center gap-2 mb-2">
                      {testResults.lead.success ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                      <span className="text-pearl font-medium">Telegram Delivery Test</span>
                    </div>
                    {testResults.lead.success ? (
                      <p className="text-green-500 text-sm">✅ Lead sent successfully to Telegram!</p>
                    ) : (
                      <p className="text-red-500 text-sm">❌ {testResults.lead.error}</p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Setup Instructions */}
            <div className="p-4 rounded-lg bg-carbon border border-trim-silver/20">
              <h3 className="text-pearl font-medium mb-2">Setup Instructions</h3>
              <div className="text-sm text-slate-400 space-y-2">
                <p>1. Create a Telegram bot by messaging @BotFather</p>
                <p>2. Get your chat ID by messaging @userinfobot</p>
                <p>3. Create a <code className="bg-slate-800 px-1 rounded">.env.local</code> file with:</p>
                <pre className="bg-slate-800 p-2 rounded text-xs mt-2">
{`TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
TELEGRAM_TEST_MODE=false`}
                </pre>
                <p>4. Restart your development server</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
