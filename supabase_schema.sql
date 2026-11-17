-- ============================================================================
-- SKEMA DATABASE SUPABASE (POSTGRESQL) - e-FWA BKK KELAS II MERAUKE
-- Jalankan script ini di Supabase Dashboard -> SQL Editor -> New Query
-- ============================================================================

-- 1. Tabel Data Pegawai
CREATE TABLE IF NOT EXISTS public.employees (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  nip TEXT UNIQUE NOT NULL,
  position TEXT NOT NULL DEFAULT '',
  unit TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT 'Pegawai',
  pin TEXT NOT NULL DEFAULT '',
  auth_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  is_permanent BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Tabel Penugasan, Absensi, & Verifikasi FWA
CREATE TABLE IF NOT EXISTS public.fwa_records (
  id TEXT PRIMARY KEY,
  employee_id TEXT NOT NULL REFERENCES public.employees(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  fwa_type TEXT NOT NULL,
  location_category TEXT NOT NULL DEFAULT '',
  location_detail TEXT NOT NULL DEFAULT '',
  check_in TEXT DEFAULT '',
  check_out TEXT DEFAULT '',
  response_time TEXT DEFAULT '< 15 Menit (Sangat Cepat / On-Call)',
  activity_summary TEXT DEFAULT '',
  report_link TEXT DEFAULT '',
  photo_check_in_url TEXT DEFAULT '',
  photo_check_out_url TEXT DEFAULT '',
  gps_check_in TEXT DEFAULT '',
  gps_check_out TEXT DEFAULT '',
  assignment_status TEXT NOT NULL DEFAULT 'Diajukan',
  verification_status TEXT NOT NULL DEFAULT 'Menunggu Verifikasi',
  supervisor_note TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT unique_employee_fwa_date UNIQUE (employee_id, date)
);

-- Indeks untuk mempercepat filter bulanan & per pegawai
CREATE INDEX IF NOT EXISTS idx_fwa_records_date ON public.fwa_records (date DESC);
CREATE INDEX IF NOT EXISTS idx_fwa_records_employee_id ON public.fwa_records (employee_id);

-- 3. Aktifkan Row Level Security (RLS) & Fungsi Helper Auth
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fwa_records ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.get_login_directory()
RETURNS TABLE (
  id TEXT,
  name TEXT,
  nip TEXT,
  "position" TEXT,
  unit TEXT,
  role TEXT,
  is_permanent BOOLEAN
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT e.id, e.name, e.nip, e.position, e.unit, e.role, e.is_permanent
  FROM public.employees e
  ORDER BY e.id ASC;
$$;

GRANT EXECUTE ON FUNCTION public.get_login_directory() TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.is_atasan_or_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.employees e
    WHERE e.auth_user_id = auth.uid()
      AND (
        e.role ILIKE '%atasan%'
        OR e.role ILIKE '%kepala%'
        OR e.role ILIKE '%admin%'
        OR e.role ILIKE '%katimker%'
      )
  );
$$;

GRANT EXECUTE ON FUNCTION public.is_atasan_or_admin() TO authenticated;

-- Kebijakan akses berbasis Supabase Auth (hanya pengguna terautentikasi)
DROP POLICY IF EXISTS "Allow public read employees" ON public.employees;
DROP POLICY IF EXISTS "Allow public write employees" ON public.employees;
DROP POLICY IF EXISTS "Authenticated read employees" ON public.employees;
CREATE POLICY "Authenticated read employees" ON public.employees
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Authenticated insert employees" ON public.employees;
CREATE POLICY "Authenticated insert employees" ON public.employees
  FOR INSERT TO authenticated WITH CHECK (public.is_atasan_or_admin());

DROP POLICY IF EXISTS "Authenticated update employees" ON public.employees;
CREATE POLICY "Authenticated update employees" ON public.employees
  FOR UPDATE TO authenticated
  USING (public.is_atasan_or_admin() OR auth_user_id = auth.uid())
  WITH CHECK (public.is_atasan_or_admin() OR auth_user_id = auth.uid());

DROP POLICY IF EXISTS "Authenticated delete employees" ON public.employees;
CREATE POLICY "Authenticated delete employees" ON public.employees
  FOR DELETE TO authenticated USING (public.is_atasan_or_admin());

DROP POLICY IF EXISTS "Allow public read fwa_records" ON public.fwa_records;
DROP POLICY IF EXISTS "Allow public write fwa_records" ON public.fwa_records;
DROP POLICY IF EXISTS "Authenticated read fwa_records" ON public.fwa_records;
CREATE POLICY "Authenticated read fwa_records" ON public.fwa_records
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Authenticated insert fwa_records" ON public.fwa_records;
CREATE POLICY "Authenticated insert fwa_records" ON public.fwa_records
  FOR INSERT TO authenticated
  WITH CHECK (
    public.is_atasan_or_admin()
    OR employee_id IN (SELECT id FROM public.employees WHERE auth_user_id = auth.uid())
  );

DROP POLICY IF EXISTS "Authenticated update fwa_records" ON public.fwa_records;
CREATE POLICY "Authenticated update fwa_records" ON public.fwa_records
  FOR UPDATE TO authenticated
  USING (
    public.is_atasan_or_admin()
    OR employee_id IN (SELECT id FROM public.employees WHERE auth_user_id = auth.uid())
  )
  WITH CHECK (
    public.is_atasan_or_admin()
    OR employee_id IN (SELECT id FROM public.employees WHERE auth_user_id = auth.uid())
  );

DROP POLICY IF EXISTS "Authenticated delete fwa_records" ON public.fwa_records;
CREATE POLICY "Authenticated delete fwa_records" ON public.fwa_records
  FOR DELETE TO authenticated
  USING (
    public.is_atasan_or_admin()
    OR employee_id IN (SELECT id FROM public.employees WHERE auth_user_id = auth.uid())
  );

-- 4. Bucket Storage PRIVAT untuk Foto Geotagging Absen Masuk & Pulang (akses via Signed URLs)
INSERT INTO storage.buckets (id, name, public)
VALUES ('fwa-photos', 'fwa-photos', false)
ON CONFLICT (id) DO UPDATE SET public = false;

DROP POLICY IF EXISTS "Public read fwa-photos" ON storage.objects;
DROP POLICY IF EXISTS "Public upload fwa-photos" ON storage.objects;
DROP POLICY IF EXISTS "Public update fwa-photos" ON storage.objects;
DROP POLICY IF EXISTS "Public delete fwa-photos" ON storage.objects;

DROP POLICY IF EXISTS "Authenticated read fwa-photos" ON storage.objects;
CREATE POLICY "Authenticated read fwa-photos" ON storage.objects
  FOR SELECT TO authenticated USING (bucket_id = 'fwa-photos');

DROP POLICY IF EXISTS "Authenticated upload fwa-photos" ON storage.objects;
CREATE POLICY "Authenticated upload fwa-photos" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'fwa-photos');

DROP POLICY IF EXISTS "Authenticated update fwa-photos" ON storage.objects;
CREATE POLICY "Authenticated update fwa-photos" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'fwa-photos');

DROP POLICY IF EXISTS "Authenticated delete fwa-photos" ON storage.objects;
CREATE POLICY "Authenticated delete fwa-photos" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'fwa-photos');
