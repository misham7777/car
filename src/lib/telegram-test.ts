import { telegramService } from './telegram';

export interface TestLeadData {
  name: string;
  city: string;
  phone: string;
  email: string;
  payoutType: 'crypto' | 'cash';
  token?: string;
  otherToken?: string;
}

export const testTelegramIntegration = async (testData?: TestLeadData) => {
  const defaultTestData: TestLeadData = {
    name: 'John Doe',
    city: 'Dubai',
    phone: '+971501234567',
    email: 'john.doe@example.com',
    payoutType: 'crypto',
    token: 'USDC'
  };

  const data = testData || defaultTestData;

  console.log('🧪 Testing Telegram integration...');
  console.log('Test data:', data);

  try {
    // Test connection first
    console.log('\n1. Testing Telegram connection...');
    const connectionTest = await telegramService.testConnection();
    
    if (connectionTest.success) {
      console.log('✅ Telegram connection successful');
    } else {
      console.log('❌ Telegram connection failed:', connectionTest.error);
      return { success: false, error: connectionTest.error };
    }

    // Test sending a lead
    console.log('\n2. Testing lead delivery...');
    const leadData = {
      name: data.name,
      city: data.city,
      phone: data.phone,
      email: data.email,
      payout: {
        type: data.payoutType,
        token: data.payoutType === 'crypto' ? data.token : undefined,
        otherToken: data.payoutType === 'crypto' && data.token === 'Other' ? data.otherToken : undefined,
      },
      source: 'test_integration',
      estimatedValue: data.payoutType === 'crypto' ? 45000 : 38000,
      timestamp: new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Dubai',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    };

    const leadResult = await telegramService.sendLead(leadData);
    
    if (leadResult.success) {
      console.log('✅ Lead delivery successful');
      return { success: true };
    } else {
      console.log('❌ Lead delivery failed:', leadResult.error);
      return { success: false, error: leadResult.error };
    }

  } catch (error) {
    console.error('❌ Test failed with error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
};

// Utility function to test the API endpoint
export const testApiEndpoint = async () => {
  console.log('🧪 Testing API endpoint...');
  
  try {
    const response = await fetch('/api/submit-valuation', {
      method: 'GET'
    });
    
    const result = await response.json();
    console.log('API Health Check Result:', result);
    
    return result;
  } catch (error) {
    console.error('❌ API test failed:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};
