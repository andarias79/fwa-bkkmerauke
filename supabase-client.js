// ============================================================================
// SUPABASE BACKEND & STORAGE ADAPTER - e-FWA BKK KELAS II MERAUKE
// Mendukung mode Cloud (Supabase Free Tier) & fallback otomatis LocalStorage
// ============================================================================

const SUPABASE_CONFIG_STORAGE_KEY = 'efwa_supabase_config_v1';
const SUPABASE_PHOTO_BUCKET = 'fwa-photos';
const SUPABASE_AUTH_EMAIL_DOMAIN = 'efwa-merauke.app';
const SIGNED_URL_TTL_SECONDS = 3600;
const signedPhotoUrlCache = new Map();

// Konfigurasi default proyek Supabase e-FWA BKK Kelas II Merauke
window.EFWA_SUPABASE_DEFAULT_CONFIG = {
  url: 'https://bspecqeltqwjwoecmehc.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzcGVjcWVsdHF3andvZWNtZWhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ4MzEyNjUsImV4cCI6MjExMDQwNzI2NX0._xUNp_bDBF1MAReUvZFyJdPfrdp9SiPM_-zRMNaSq6U'
};

let supabaseClient = null;
let supabaseConnected = false;

function getSavedSupabaseConfig() {
  try {
    const raw = localStorage.getItem(SUPABASE_CONFIG_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.url && parsed.anonKey) {
        return { url: parsed.url.trim(), anonKey: parsed.anonKey.trim() };
      }
    }
  } catch (e) {
    // Ignore parse error
  }
  const def = window.EFWA_SUPABASE_DEFAULT_CONFIG || {};
  if (def.url && def.anonKey) {
    return { url: def.url.trim(), anonKey: def.anonKey.trim() };
  }
  return { url: '', anonKey: '' };
}

function initSupabaseClient() {
  const cfg = getSavedSupabaseConfig();
  if (!cfg.url || !cfg.anonKey || !window.supabase || typeof window.supabase.createClient !== 'function') {
    supabaseClient = null;
    supabaseConnected = false;
    updateSupabaseStatusBadge(false);
    return false;
  }
  try {
    supabaseClient = window.supabase.createClient(cfg.url, cfg.anonKey);
    supabaseConnected = true;
    updateSupabaseStatusBadge(true);
    return true;
  } catch (e) {
    supabaseClient = null;
    supabaseConnected = false;
    updateSupabaseStatusBadge(false);
    return false;
  }
}

function isSupabaseEnabled() {
  return Boolean(supabaseClient && supabaseConnected);
}

function updateSupabaseStatusBadge(connected) {
  const badge = document.getElementById('supabaseSyncBadge');
  if (!badge) return;
  if (connected) {
    badge.className = 'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-lime-200 border border-lime-300/30 cursor-pointer hover:bg-emerald-500/30 transition';
    badge.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-lime-400"></span> Cloud Supabase: Aktif';
  } else {
    badge.className = 'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-200 border border-amber-300/30 cursor-pointer hover:bg-amber-500/30 transition';
    badge.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-amber-300"></span> Mode Lokal (Offline)';
  }
}

function mapEmployeeToDb(emp) {
  const row = {
    id: emp.id,
    name: emp.name,
    nip: emp.nip,
    position: emp.position || '',
    unit: emp.unit || '',
    role: emp.role || 'Pegawai',
    pin: '',
    is_permanent: Boolean(emp.isPermanent),
    updated_at: new Date().toISOString()
  };
  if (emp.authUserId) {
    row.auth_user_id = emp.authUserId;
  }
  return row;
}

function mapEmployeeFromDb(row) {
  return {
    id: row.id,
    name: row.name,
    nip: row.nip,
    position: row.position || '',
    unit: row.unit || '',
    role: row.role || 'Pegawai',
    pin: '',
    authUserId: row.auth_user_id || '',
    isPermanent: Boolean(row.is_permanent)
  };
}

function extractStoragePath(val) {
  if (!val || typeof val !== 'string') return '';
  if (val.startsWith('data:image')) return '';
  const marker = `/${SUPABASE_PHOTO_BUCKET}/`;
  const idx = val.indexOf(marker);
  if (idx !== -1) {
    return val.slice(idx + marker.length).split('?')[0];
  }
  if (val.startsWith('http://') || val.startsWith('https://')) {
    return '';
  }
  return val.split('?')[0];
}

function getPhotoDisplayUrl(storedVal) {
  if (!storedVal || typeof storedVal !== 'string') return '';
  if (storedVal.startsWith('data:image')) return storedVal;
  const path = extractStoragePath(storedVal);
  if (path && signedPhotoUrlCache.has(path)) {
    const entry = signedPhotoUrlCache.get(path);
    if (entry && entry.expiresAt > Date.now()) {
      return entry.url;
    }
  }
  if (storedVal.startsWith('http://') || storedVal.startsWith('https://')) {
    return storedVal;
  }
  return '';
}

function mapRecordToDb(rec) {
  return {
    id: rec.id,
    employee_id: rec.employeeId,
    date: rec.date,
    fwa_type: rec.fwaType,
    location_category: rec.locationCategory || '',
    location_detail: rec.locationDetail || '',
    check_in: rec.checkIn || '',
    check_out: rec.checkOut || '',
    response_time: rec.responseTime || '< 15 Menit (Sangat Cepat / On-Call)',
    activity_summary: rec.activitySummary || '',
    report_link: rec.reportLink || '',
    photo_check_in_url: extractStoragePath(rec.photoCheckIn),
    photo_check_out_url: extractStoragePath(rec.photoCheckOut),
    gps_check_in: rec.gpsCheckIn || '',
    gps_check_out: rec.gpsCheckOut || '',
    assignment_status: rec.assignmentStatus || 'Diajukan',
    verification_status: rec.verificationStatus || 'Menunggu Verifikasi',
    supervisor_note: rec.supervisorNote || '',
    updated_at: new Date().toISOString()
  };
}

function mapRecordFromDb(row) {
  return {
    id: row.id,
    employeeId: row.employee_id,
    date: row.date,
    fwaType: row.fwa_type,
    locationCategory: row.location_category || '',
    locationDetail: row.location_detail || '',
    checkIn: row.check_in || '',
    checkOut: row.check_out || '',
    responseTime: row.response_time || '< 15 Menit (Sangat Cepat / On-Call)',
    activitySummary: row.activity_summary || '',
    reportLink: row.report_link || '',
    photoCheckIn: row.photo_check_in_url || '',
    photoCheckOut: row.photo_check_out_url || '',
    gpsCheckIn: row.gps_check_in || '',
    gpsCheckOut: row.gps_check_out || '',
    assignmentStatus: row.assignment_status || 'Diajukan',
    verificationStatus: row.verification_status || 'Menunggu Verifikasi',
    supervisorNote: row.supervisor_note || ''
  };
}

function nipToAuthEmail(nip) {
  return `${String(nip || '').trim()}@${SUPABASE_AUTH_EMAIL_DOMAIN}`;
}

async function getSupabaseAuthSession() {
  if (!isSupabaseEnabled()) return null;
  try {
    const { data, error } = await supabaseClient.auth.getSession();
    if (error) throw error;
    return data ? data.session : null;
  } catch (err) {
    console.warn('Gagal memeriksa sesi Supabase Auth:', err);
    return null;
  }
}

async function signInWithSupabaseAuth(nip, pin) {
  if (!isSupabaseEnabled()) return { success: false, offline: true, error: 'Supabase tidak aktif' };
  try {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: nipToAuthEmail(nip),
      password: String(pin || '').trim()
    });
    if (error) return { success: false, offline: false, error: error.message };
    return { success: true, session: data.session, user: data.user };
  } catch (err) {
    return { success: false, offline: false, error: err.message || 'Gagal autentikasi' };
  }
}

async function signOutSupabaseAuth() {
  if (!isSupabaseEnabled()) return;
  try {
    await supabaseClient.auth.signOut();
  } catch (err) {
    console.warn('Supabase signOut error:', err);
  }
}

async function updateSupabaseAuthPassword(newPin) {
  if (!isSupabaseEnabled()) return { success: false, error: 'Supabase tidak aktif' };
  try {
    const { error } = await supabaseClient.auth.updateUser({
      password: String(newPin || '').trim()
    });
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message || 'Gagal memperbarui PIN Auth' };
  }
}

async function provisionSupabaseAuthUser(nip, pin, name) {
  if (!isSupabaseEnabled()) return { success: false, userId: '' };
  const cfg = getSavedSupabaseConfig();
  if (!cfg.url || !cfg.anonKey || !window.supabase) return { success: false, userId: '' };
  try {
    const tempClient = window.supabase.createClient(cfg.url, cfg.anonKey, {
      auth: { persistSession: false, autoRefreshToken: false }
    });
    const { data, error } = await tempClient.auth.signUp({
      email: nipToAuthEmail(nip),
      password: String(pin || '123456').trim(),
      options: { data: { name: name || '', nip: String(nip || '').trim() } }
    });
    if (error) throw error;
    return { success: true, userId: data?.user?.id || '' };
  } catch (err) {
    console.warn('Gagal membuat akun Supabase Auth pegawai baru:', err);
    return { success: false, userId: '' };
  }
}

async function fetchLoginDirectoryFromSupabase() {
  if (!isSupabaseEnabled()) return null;
  try {
    const { data, error } = await supabaseClient.rpc('get_login_directory');
    if (error) throw error;
    return (data || []).map(mapEmployeeFromDb);
  } catch (err) {
    console.warn('Gagal memuat direktori login Supabase:', err);
    return null;
  }
}

async function resolveSignedUrlsForRecords(records) {
  if (!isSupabaseEnabled() || !Array.isArray(records) || records.length === 0) return;
  const now = Date.now();
  const pathsSet = new Set();
  records.forEach((rec) => {
    [rec.photoCheckIn, rec.photoCheckOut].forEach((val) => {
      const p = extractStoragePath(val);
      if (p) {
        const cached = signedPhotoUrlCache.get(p);
        if (!cached || cached.expiresAt <= now + 60000) {
          pathsSet.add(p);
        }
      }
    });
  });

  const paths = Array.from(pathsSet);
  if (paths.length === 0) return;

  try {
    const { data, error } = await supabaseClient.storage
      .from(SUPABASE_PHOTO_BUCKET)
      .createSignedUrls(paths, SIGNED_URL_TTL_SECONDS);
    if (error) throw error;
    const expiresAt = Date.now() + (SIGNED_URL_TTL_SECONDS - 120) * 1000;
    (data || []).forEach((item) => {
      if (item && item.path && item.signedUrl) {
        signedPhotoUrlCache.set(item.path, { url: item.signedUrl, expiresAt });
      }
    });
  } catch (err) {
    console.warn('Gagal membuat Signed URL foto privat:', err);
  }
}

async function fetchAllFromSupabase() {
  if (!isSupabaseEnabled()) return null;
  try {
    const session = await getSupabaseAuthSession();
    if (!session) return null;

    const [empRes, recRes] = await Promise.all([
      supabaseClient.from('employees').select('id, name, nip, position, unit, role, is_permanent, auth_user_id').order('id', { ascending: true }),
      supabaseClient.from('fwa_records').select('*').order('date', { ascending: false })
    ]);
    if (empRes.error) throw empRes.error;
    if (recRes.error) throw recRes.error;

    const mappedRecords = (recRes.data || []).map(mapRecordFromDb);
    await resolveSignedUrlsForRecords(mappedRecords);

    return {
      employees: (empRes.data || []).map(mapEmployeeFromDb),
      records: mappedRecords
    };
  } catch (err) {
    console.error('Supabase fetchAll error:', err);
    updateSupabaseStatusBadge(false);
    return null;
  }
}

async function upsertEmployeeToSupabase(emp) {
  if (!isSupabaseEnabled()) return false;
  try {
    const { error } = await supabaseClient
      .from('employees')
      .upsert(mapEmployeeToDb(emp), { onConflict: 'id' });
    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Supabase upsertEmployee error:', err);
    return false;
  }
}

async function upsertEmployeesBulkToSupabase(empList) {
  if (!isSupabaseEnabled() || !Array.isArray(empList) || empList.length === 0) return false;
  try {
    const payload = empList.map(mapEmployeeToDb);
    const { error } = await supabaseClient
      .from('employees')
      .upsert(payload, { onConflict: 'id' });
    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Supabase bulk upsert employees error:', err);
    return false;
  }
}

async function deleteEmployeeFromSupabase(empId) {
  if (!isSupabaseEnabled()) return false;
  try {
    const { error } = await supabaseClient.from('employees').delete().eq('id', empId);
    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Supabase deleteEmployee error:', err);
    return false;
  }
}

async function upsertFwaRecordToSupabase(rec) {
  if (!isSupabaseEnabled()) return false;
  try {
    const { error } = await supabaseClient
      .from('fwa_records')
      .upsert(mapRecordToDb(rec), { onConflict: 'id' });
    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Supabase upsertFwaRecord error:', err);
    return false;
  }
}

async function upsertFwaRecordsBulkToSupabase(recList) {
  if (!isSupabaseEnabled() || !Array.isArray(recList) || recList.length === 0) return false;
  try {
    const payload = recList.map(mapRecordToDb);
    const { error } = await supabaseClient
      .from('fwa_records')
      .upsert(payload, { onConflict: 'id' });
    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Supabase bulk upsert records error:', err);
    return false;
  }
}

async function deletePhotosFromSupabase(recId) {
  if (!isSupabaseEnabled() || !recId) return false;
  try {
    const { error } = await supabaseClient.storage
      .from(SUPABASE_PHOTO_BUCKET)
      .remove([`${recId}/in.jpg`, `${recId}/out.jpg`]);
    if (error) throw error;
    return true;
  } catch (err) {
    console.warn('Gagal menghapus file foto dari Supabase Storage:', err);
    return false;
  }
}

async function deleteFwaRecordFromSupabase(recId) {
  if (!isSupabaseEnabled()) return false;
  try {
    await deletePhotosFromSupabase(recId);
    const { error } = await supabaseClient.from('fwa_records').delete().eq('id', recId);
    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Supabase deleteFwaRecord error:', err);
    return false;
  }
}

function dataUrlToBlob(dataUrl) {
  const parts = dataUrl.split(',');
  const mimeMatch = parts[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : 'image/jpeg';
  const binary = atob(parts[1]);
  const arr = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    arr[i] = binary.charCodeAt(i);
  }
  return new Blob([arr], { type: mime });
}

async function uploadPhotoToSupabase(recordId, mode, dataUrl) {
  if (!isSupabaseEnabled() || !dataUrl || !dataUrl.startsWith('data:image')) {
    return dataUrl;
  }
  try {
    const blob = dataUrlToBlob(dataUrl);
    const safeMode = mode === 'OUT' ? 'out' : 'in';
    const filePath = `${recordId}/${safeMode}.jpg`;
    const { error: uploadError } = await supabaseClient.storage
      .from(SUPABASE_PHOTO_BUCKET)
      .upload(filePath, blob, {
        contentType: 'image/jpeg',
        upsert: true
      });
    if (uploadError) throw uploadError;

    const { data: signedData, error: signError } = await supabaseClient.storage
      .from(SUPABASE_PHOTO_BUCKET)
      .createSignedUrl(filePath, SIGNED_URL_TTL_SECONDS);
    if (!signError && signedData && signedData.signedUrl) {
      signedPhotoUrlCache.set(filePath, {
        url: signedData.signedUrl,
        expiresAt: Date.now() + (SIGNED_URL_TTL_SECONDS - 120) * 1000
      });
    }
    return filePath;
  } catch (err) {
    console.warn('Gagal unggah foto ke Supabase Storage, menggunakan data lokal:', err);
    return dataUrl;
  }
}
