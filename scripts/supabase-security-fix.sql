-- ============================================
-- Supabase Security & Performance Fix
-- Run this in your Supabase SQL Editor
-- ============================================

-- ============================================
-- FIX 1: Enable Row Level Security (RLS)
-- ============================================
-- This prevents anonymous/public users from accessing the orders table
-- Your app uses service_role key which bypasses RLS, so it will still work

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Create a policy that blocks all public access
-- Service role key (used by your app) bypasses RLS automatically
-- This means: anon users = blocked, service_role = allowed
CREATE POLICY "Block public access to orders"
ON public.orders
FOR ALL
USING (false)
WITH CHECK (false);

-- Optional: If you ever want to allow authenticated users to see their own orders,
-- you can add this policy instead (uncomment if needed):
-- CREATE POLICY "Users can view their own orders" 
-- ON public.orders FOR SELECT 
-- USING (auth.jwt() ->> 'email' = customer_email);


-- ============================================
-- FIX 2: Remove unused index on email column
-- ============================================
DROP INDEX IF EXISTS idx_orders_email;


-- ============================================
-- FIX 3: Remove unused index on status column
-- ============================================
DROP INDEX IF EXISTS idx_orders_status;


-- ============================================
-- Verification: Check that RLS is now enabled
-- ============================================
SELECT 
    relname as table_name,
    relrowsecurity as rls_enabled
FROM pg_class
WHERE relname = 'orders';

-- ============================================
-- Done! All three issues have been fixed.
-- ============================================
