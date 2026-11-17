// ============================================================================
// SUPABASE BACKEND & STORAGE ADAPTER - e-FWA BKK KELAS II MERAUKE
// Mendukung mode Cloud (Supabase Free Tier) & fallback otomatis LocalStorage
// ============================================================================

const SUPABASE_CONFIG_STORAGE_KEY = 'efwa_supabase_config_v1';
const SUPABASE_PHOTO_BUCKET = 'fwa-photos';

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
  return {
    id: emp.id,
    name: emp.name,
    nip: emp.nip,
    position: emp.position || '',
    unit: emp.unit || '',
    role: emp.role || 'Pegawai',
    pin: emp.pin || '123456',
    is_permanent: Boolean(emp.isPermanent),
    updated_at: new Date().toISOString()
  };
}

function mapEmployeeFromDb(row) {
  return {
    id: row.id,
    name: row.name,
    nip: row.nip,
    position: row.position || '',
    unit: row.unit || '',
    role: row.role || 'Pegawai',
    pin: row.pin || '',
    isPermanent: Boolean(row.is_permanent)
  };
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
    photo_check_in_url: rec.photoCheckIn || '',
    photo_check_out_url: rec.photoCheckOut || '',
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

async function fetchAllFromSupabase() {
  if (!isSupabaseEnabled()) return null;
  try {
    const [empRes, recRes] = await Promise.all([
      supabaseClient.from('employees').select('*').order('id', { ascending: true }),
      supabaseClient.from('fwa_records').select('*').order('date', { ascending: false })
    ]);
    if (empRes.error) throw empRes.error;
    if (recRes.error) throw recRes.error;
    return {
      employees: (empRes.data || []).map(mapEmployeeFromDb),
      records: (recRes.data || []).map(mapRecordFromDb)
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

async function deleteFwaRecordFromSupabase(recId) {
  if (!isSupabaseEnabled()) return false;
  try {
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
    const filePath = `${recordId}/${safeMode}_${Date.now()}.jpg`;
    const { error: uploadError } = await supabaseClient.storage
      .from(SUPABASE_PHOTO_BUCKET)
      .upload(filePath, blob, {
        contentType: 'image/jpeg',
        upsert: true
      });
    if (uploadError) throw uploadError;
    const { data: pubData } = supabaseClient.storage
      .from(SUPABASE_PHOTO_BUCKET)
      .getPublicUrl(filePath);
    return (pubData && pubData.publicUrl) ? pubData.publicUrl : dataUrl;
  } catch (err) {
    console.warn('Gagal unggah foto ke Supabase Storage, menggunakan data lokal:', err);
    return dataUrl;
  }
}
