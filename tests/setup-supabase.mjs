/**
 * Create orders table in Supabase using the SQL API
 */

const SUPABASE_URL = 'https://roeoemtozvamiixehiva.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvZW9lbXRvenZhbWlpeGVoaXZhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NjIzNTM3OCwiZXhwIjoyMDgxODExMzc4fQ.-eQxBkd-ixp1W7L-yjaN6RUhpSob-td2RK7PS4JwyTw';

const CREATE_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  stripe_session_id TEXT UNIQUE NOT NULL,
  stripe_payment_intent_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  customer_email TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  birth_date TEXT,
  birth_time TEXT,
  birth_place TEXT,
  partner_name TEXT,
  partner_birth_date TEXT,
  partner_birth_time TEXT,
  partner_birth_place TEXT,
  product_key TEXT NOT NULL,
  product_name TEXT NOT NULL,
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'eur',
  country TEXT,
  country_code TEXT,
  status TEXT DEFAULT 'pending',
  horoscope_pdf_path TEXT,
  horoscope_pdf_url TEXT,
  horoscope_content TEXT,
  lang TEXT DEFAULT 'en',
  email_sent_at TIMESTAMPTZ,
  refunded_at TIMESTAMPTZ,
  refund_reason TEXT,
  stripe_refund_id TEXT
);
`;

const CREATE_INDEXES_SQL = `
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_stripe_session ON orders(stripe_session_id);
`;

async function createTable() {
    console.log('🚀 Creating orders table in Supabase...\n');

    try {
        // Execute CREATE TABLE via postgres REST
        const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': SUPABASE_SERVICE_KEY,
                'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
            },
            body: JSON.stringify({})
        });

        // Since we can't run arbitrary SQL via REST, let's try a different approach
        // Insert a test row to see if table exists, if not, inform user

        const testResponse = await fetch(`${SUPABASE_URL}/rest/v1/orders`, {
            method: 'GET',
            headers: {
                'apikey': SUPABASE_SERVICE_KEY,
                'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
            }
        });

        if (testResponse.status === 404 || testResponse.status === 400) {
            console.log('❌ Table does not exist.\n');
            console.log('📋 Please run this SQL in Supabase SQL Editor:');
            console.log('   https://supabase.com/dashboard/project/roeoemtozvamiixehiva/sql/new\n');
            console.log('='.repeat(60));
            console.log(CREATE_TABLE_SQL);
            console.log(CREATE_INDEXES_SQL);
            console.log('='.repeat(60));
            return false;
        }

        const data = await testResponse.json();
        console.log('✅ Table exists! Current orders:', data.length);
        return true;

    } catch (error) {
        console.error('Error:', error.message);
        return false;
    }
}

async function testInsert() {
    console.log('\n📝 Testing insert operation...');

    const testOrder = {
        id: 'TEST-' + Date.now(),
        stripe_session_id: 'cs_test_' + Date.now(),
        customer_email: 'test@example.com',
        customer_name: 'Test User',
        product_key: 'daily',
        product_name: 'Daily Horoscope',
        amount: 199,
        currency: 'eur',
        status: 'completed',
        lang: 'en',
        created_at: new Date().toISOString()
    };

    const response = await fetch(`${SUPABASE_URL}/rest/v1/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_SERVICE_KEY,
            'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
            'Prefer': 'return=representation'
        },
        body: JSON.stringify(testOrder)
    });

    if (response.ok) {
        const data = await response.json();
        console.log('✅ Insert successful:', data[0]?.id);

        // Clean up
        await fetch(`${SUPABASE_URL}/rest/v1/orders?id=eq.${testOrder.id}`, {
            method: 'DELETE',
            headers: {
                'apikey': SUPABASE_SERVICE_KEY,
                'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
            }
        });
        console.log('✅ Test order cleaned up');
        return true;
    } else {
        const error = await response.text();
        console.log('❌ Insert failed:', error);
        return false;
    }
}

async function main() {
    const tableExists = await createTable();
    if (tableExists) {
        await testInsert();
        console.log('\n✨ Supabase is ready!');
    }
}

main().catch(console.error);
