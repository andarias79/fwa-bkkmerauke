/**
 * ============================================================================
 * e-FWA KEMENKES RI - APPLICATION LOGIC & STATE ENGINE
 * Berdasarkan KMK Nomor HK.01.07/MENKES/1342/2024 & Perpres No. 21 Tahun 2023
 * ============================================================================
 */

const STORAGE_KEY_EMPLOYEES = 'efwa_bkk_merauke_employees_v2';
const STORAGE_KEY_EMPLOYEES_SNAPSHOT = 'efwa_bkk_merauke_employees_permanent_backup_v2';
const STORAGE_KEY_RECORDS = 'efwa_kemenkes_records_v1';

// Data Resmi Pegawai Balai Kekarantinaan Kesehatan Kelas II Merauke (32 Pegawai Terkunci Permanen)
const DEFAULT_EMPLOYEES = [
  {
    id: 'EMP-001',
    name: 'Andarias Paskawanto Kolawi, SKM., MPH',
    nip: '197904162003121002',
    position: 'Plt. Kepala Balai / Kasubbag Adum / Perencana',
    unit: 'Kantor Induk - Subbag Adum',
    role: 'Atasan/Kepala',
    pin: '121002',
    isPermanent: true
  },
  {
    id: 'EMP-002',
    name: 'Pius Tandi Rantetasak',
    nip: '197504152008011019',
    position: 'Perawat Penyelia',
    unit: 'Wilker Wanam',
    role: 'Koordinator wilker Wanam / Pegawai',
    pin: '011019',
    isPermanent: true
  },
  {
    id: 'EMP-003',
    name: 'Arwina Paramma, SKM',
    nip: '198205132006042002',
    position: 'Entomolog Kesehatan Ahli Muda',
    unit: 'Wilker Bade',
    role: 'Koordinator wilker Bade / Pegawai',
    pin: '042002',
    isPermanent: true
  },
  {
    id: 'EMP-004',
    name: 'Ns. Muhin Steven Imbiri, S.Kep',
    nip: '198803062010121001',
    position: 'Perawat Ahli Pertama',
    unit: 'Wilker Agats',
    role: 'Koordinator wilker Agats / Pegawai',
    pin: '121001',
    isPermanent: true
  },
  {
    id: 'EMP-005',
    name: 'Muhammad Heriansyah, S.Tr.Kes',
    nip: '199612142022031002',
    position: 'Sanitarian Ahli Pertama',
    unit: 'Wilker PLBN Yetetkun',
    role: 'Pegawai',
    pin: '031002',
    isPermanent: true
  },
  {
    id: 'EMP-006',
    name: 'Aninda Safira Primadiastuti',
    nip: '199902112022032001',
    position: 'Pranata Laboratorium Kesehatan Terampil',
    unit: 'Wilker PLBN Sota',
    role: 'Pegawai',
    pin: '032001',
    isPermanent: true
  },
  {
    id: 'EMP-007',
    name: 'Delifour Bekia BR Hutagaol, SKM',
    nip: '197502262002122010',
    position: 'Epidemiolog Kesehatan Ahli Muda',
    unit: 'Kantor Induk - Timker 5',
    role: 'Katimker / Pegawai',
    pin: '122010',
    isPermanent: true
  },
  {
    id: 'EMP-008',
    name: 'Gumson Josua Tampubolon, SKM, M.P.H.',
    nip: '198510172008011007',
    position: 'Epidemiolog Kesehatan Ahli Muda',
    unit: 'Kantor Induk - Timker 2',
    role: 'Katimker / Pegawai',
    pin: '011007',
    isPermanent: true
  },
  {
    id: 'EMP-009',
    name: 'Ns. Batseba Linda Imsula, S.Kep',
    nip: '198109122008122001',
    position: 'Perawat Ahli Muda',
    unit: 'Kantor Induk - Timker 4',
    role: 'Katimker / Pegawai',
    pin: '122001',
    isPermanent: true
  },
  {
    id: 'EMP-010',
    name: 'Yeremias Wonam, SKM, M.Epid',
    nip: '197602061997031003',
    position: 'Epidemiolog Kesehatan Ahli Pertama',
    unit: 'Kantor Induk - Timker 1',
    role: 'Katimker / Pegawai',
    pin: '031003',
    isPermanent: true
  },
  {
    id: 'EMP-011',
    name: 'Johlwis Tamalonggehe',
    nip: '199010112018011001',
    position: 'Sanitarian Terampil',
    unit: 'Kantor Induk - Timker 3',
    role: 'Katimker / Pegawai',
    pin: '011001',
    isPermanent: true
  },
  {
    id: 'EMP-012',
    name: 'Yulianti Lande, S.Si, Apt',
    nip: '197407161994032002',
    position: 'Arsiparis Ahli Muda',
    unit: 'Kantor Induk - Timker 5',
    role: 'Pegawai',
    pin: '032002',
    isPermanent: true
  },
  {
    id: 'EMP-013',
    name: 'dr. Ika Juwita',
    nip: '198609232015032004',
    position: 'Dokter Ahli Muda',
    unit: 'Kantor Induk - Timker 4',
    role: 'Pegawai',
    pin: '032004',
    isPermanent: true
  },
  {
    id: 'EMP-014',
    name: 'Aan Hendra Sukma, SKM',
    nip: '197910112005021005',
    position: 'Epidemiolog Kesehatan Ahli Muda',
    unit: 'Wilker PLBN Yetetkun',
    role: 'Koordinator wilker PLBN Yetetkun / Pegawai',
    pin: '021005',
    isPermanent: true
  },
  {
    id: 'EMP-015',
    name: 'Penataria Sianipar, SE',
    nip: '197904212010122002',
    position: 'Pranata Keuangan APBN Penyelia',
    unit: 'Kantor Induk - Timker 6',
    role: 'Katimker / Pegawai',
    pin: '122002',
    isPermanent: true
  },
  {
    id: 'EMP-016',
    name: 'Feri Henos Rerey, SKM',
    nip: '197409062002121007',
    position: 'Penata Kelola Layanan Kesehatan',
    unit: 'Wilker PLBN Sota',
    role: 'Koordinator wilker PLBN Sota / Pegawai',
    pin: '121007',
    isPermanent: true
  },
  {
    id: 'EMP-017',
    name: 'dr. Maryam Wangguway',
    nip: '198601192018012001',
    position: 'Dokter Ahli Muda',
    unit: 'Wilker Bandara Mopah',
    role: 'Koordinator wilker Bandara Mopah / Pegawai',
    pin: '012001',
    isPermanent: true
  },
  {
    id: 'EMP-018',
    name: 'Rosjunaida Malau, SE',
    nip: '197506072014072001',
    position: 'Pranata Keuangan APBN Penyelia',
    unit: 'Kantor Induk - Timker 6',
    role: 'Pegawai',
    pin: '072001',
    isPermanent: true
  },
  {
    id: 'EMP-019',
    name: 'Diana Beatrix Samon',
    nip: '198012182005012003',
    position: 'Pengelola Layanan Kesehatan',
    unit: 'Wilker PLBN Sota',
    role: 'Pegawai',
    pin: '012003',
    isPermanent: true
  },
  {
    id: 'EMP-020',
    name: 'Martina Paulina Toker',
    nip: '198607072009122002',
    position: 'Pranata Laboratorium Kesehatan Mahir',
    unit: 'Kantor Induk - Timker 4',
    role: 'Pegawai',
    pin: '122002',
    isPermanent: true
  },
  {
    id: 'EMP-021',
    name: 'Wisnu Aji Adhanantyo, S.KM.',
    nip: '199704142022031004',
    position: 'Epidemiolog Kesehatan Ahli Pertama',
    unit: 'Kantor Induk - Timker 1',
    role: 'Pegawai',
    pin: '031004',
    isPermanent: true
  },
  {
    id: 'EMP-022',
    name: 'Eni Sartika Simanjuntak, S.Sos',
    nip: '198007142014072007',
    position: 'Analis Pengelolaan Keuangan APBN Ahli Pertama',
    unit: 'Kantor Induk - Timker 6',
    role: 'Pegawai',
    pin: '072007',
    isPermanent: true
  },
  {
    id: 'EMP-023',
    name: 'Hesti Syafran Gani, AMK',
    nip: '198001032010042001',
    position: 'Perawat Mahir',
    unit: 'Kantor Induk - Timker 2',
    role: 'Pegawai',
    pin: '042001',
    isPermanent: true
  },
  {
    id: 'EMP-024',
    name: 'Rika Pratiwi',
    nip: '198906112015032004',
    position: 'Pengelola Layanan Kesehatan',
    unit: 'Kantor Induk - Timker 4',
    role: 'Pegawai',
    pin: '032004',
    isPermanent: true
  },
  {
    id: 'EMP-025',
    name: 'Tri Nindi Gaib',
    nip: '199406012018012001',
    position: 'Sanitarian Terampil',
    unit: 'Kantor Induk - Timker 3',
    role: 'Pegawai',
    pin: '012001',
    isPermanent: true
  },
  {
    id: 'EMP-026',
    name: 'Hera Aldha Wardani',
    nip: '200001212022032001',
    position: 'Perawat Terampil',
    unit: 'Wilker Bade',
    role: 'Pegawai',
    pin: '032001',
    isPermanent: true
  },
  {
    id: 'EMP-027',
    name: 'Oliaman Gea',
    nip: '199610032022031004',
    position: 'Pranata Komputer Terampil',
    unit: 'Kantor Induk - Timker 5',
    role: 'Pegawai',
    pin: '031004',
    isPermanent: true
  },
  {
    id: 'EMP-028',
    name: 'Ari Ratna Sari, SE',
    nip: '199312212024212027',
    position: 'Arsiparis Ahli Pertama',
    unit: 'Kantor Induk - Timker 6',
    role: 'Pegawai',
    pin: '212027',
    isPermanent: true
  },
  {
    id: 'EMP-029',
    name: 'Valleria E Butumtan, S.IP',
    nip: '197411102025212012',
    position: 'Penata Layanan Operasional',
    unit: 'Kantor Induk - Timker 6',
    role: 'Pegawai',
    pin: '212012',
    isPermanent: true
  },
  {
    id: 'EMP-030',
    name: 'Andini Ariyati',
    nip: '199109172024212031',
    position: 'Perawat Terampil',
    unit: 'Wilker PLBN Yetetkun',
    role: 'Pegawai',
    pin: '212031',
    isPermanent: true
  },
  {
    id: 'EMP-031',
    name: 'Pramita Diana Sari',
    nip: '198909232023212002',
    position: 'Perawat Terampil',
    unit: 'Kantor Induk - Timker 4',
    role: 'Pegawai',
    pin: '212002',
    isPermanent: true
  },
  {
    id: 'EMP-032',
    name: 'Hans Imsula',
    nip: '199505012023211004',
    position: 'Entomolog Kesehatan Terampil',
    unit: 'Wilker Agats',
    role: 'Pegawai',
    pin: '211004',
    isPermanent: true
  },
  {
    id: 'EMP-033',
    name: 'Sabtaarisandi Sinaga',
    nip: '199305112023211020',
    position: 'Pranata Sumber Daya Manusia Aparatur Terampil',
    unit: 'Kantor Induk - Timker 6',
    role: 'Admin SDM',
    pin: '211020',
    isPermanent: true
  }
];

// Rincian 5 Skema Inovatif Pelaksanaan FWA BKK Kelas II Merauke (Lampiran I Bab III.2 & Diktum KETIGA SK)
const FWA_SCHEME_DETAILS = {
  'FWA Hari Libur Fakultatif Daerah (WFH/WFA)': {
    category: 'Flexi-Place (WFH / WFA)',
    target: 'Seluruh ASN di Kantor Induk dan 6 Wilayah Kerja di luar jadwal jaga layanan langsung',
    mechanism: 'Pada hari libur fakultatif yang ditetapkan Gubernur Provinsi Papua Selatan dan/atau Bupati setempat (Merauke, Asmat, Mappi, Boven Digoel), ASN yang tidak sedang terjadwal jaga pemeriksaan alat angkut/pelintas batas melaksanakan tugas kedinasan dari rumah (WFH) atau lokasi disetujui (WFA) dengan target penyelesaian output administrasi/pelaporan.',
    defaultLocCategory: 'Rumah / Tempat Tinggal (WFH)',
    placeholderLoc: 'Contoh: Kediaman Pribadi, Distrik Merauke / Lokasi WFA Disetujui'
  },
  'FWA Substitusi Layanan Fakultatif (WFH/WFA)': {
    category: 'Flexi-Place (WFH / WFA)',
    target: 'Petugas Frontline / Shift di Bandara Mopah, Pelabuhan (Wanam, Bade, Agats), dan PLBN (Sota, Yetetkun)',
    mechanism: 'Petugas yang tetap wajib hadir secara fisik (on-site) di lapangan pada saat Hari Libur Fakultatif Daerah diberikan hak substitusi 1 (satu) hari WFH/WFA pada hari kerja lain di bulan yang sama (dipilih pada hari dengan jadwal kedatangan alat angkut paling lengang) untuk menyelesaikan pekerjaan pelaporan.',
    defaultLocCategory: 'Rumah / Tempat Tinggal (WFH)',
    placeholderLoc: 'Contoh: Kediaman Petugas Wilker Bandara Mopah / PLBN Sota'
  },
  'One-Day Desk-Work WFA/WFH (Tugas Pelaporan)': {
    category: 'Flexi-Place (WFH / WFA)',
    target: 'Fungsional Teknis & Staf Administrasi di luar jadwal pelayanan langsung',
    mechanism: 'Diberikan jadwal bergilir (rolling roster) maksimal 1 hari dalam 2 minggu bagi pegawai untuk fokus menyelesaikan laporan bulanan, input SINKARKES, analisis epidemiologi, atau dokumen perencanaan dari rumah/lokasi disetujui, dengan pengendalian kuota harian tidak melebihi 50% pada unit/tim kerja terkait.',
    defaultLocCategory: 'Rumah / Tempat Tinggal (WFH)',
    placeholderLoc: 'Contoh: Kediaman Pribadi, Merauke'
  },
  'FWA Lokasi Kerja Satelit (Satellite Office)': {
    category: 'Flexi-Place (WFA - Work From Satellite Office)',
    target: 'Petugas Wilayah Kerja dan Tim Pengawasan Lapangan',
    mechanism: 'Petugas Wilayah Kerja (seperti Wilker Bandara Mopah atau PLBN Sota) yang selesai melaksanakan koordinasi di Kantor Induk, atau sebaliknya, dapat melanjutkan jam kerja administratif dan melakukan rekam kehadiran dari fasilitas Co-Working Space di Kantor Induk/Wilker terdekat/UPT Kemenkes lain tanpa harus kembali ke lokasi asal pada hari yang sama.',
    defaultLocCategory: 'Kantor Satelit - Kantor Induk / Wilker (WFA)',
    placeholderLoc: 'Contoh: Co-Working Space Kantor Induk BKK Kelas II Merauke'
  },
  'Flexi-Time WFO & Kompensasi Layanan': {
    category: 'Flexi-Time WFO atau Kombinasi',
    target: 'Seluruh ASN Non-Shift & Petugas Pasca-Layanan Dini/Malam Hari',
    mechanism: 'Pegawai non-shift dapat melakukan presensi masuk pada rentang pukul 06.00 – 09.00 WIT dengan menyesuaikan jam pulang secara proporsional (minimal 7,5 jam kerja efektif). Petugas yang melakukan pemeriksaan alat angkut di luar jam kerja normal (dini hari/malam) diberikan penyesuaian jam masuk kerja dengan tetap memenuhi 37,5 jam kerja per minggu.',
    defaultLocCategory: 'Kantor / Satker Kemenkes (WFO Flexi)',
    placeholderLoc: 'Contoh: Kantor Induk BKK Kelas II Merauke / Kantor Wilker'
  },
  'FWA Kondisi Khusus / Darurat (WFH/WFA)': {
    category: 'Flexi-Place (WFH / WFA)',
    target: 'ASN dengan kondisi khusus/darurat yang disetujui Plt. Kepala Balai (Diktum KETIGA huruf e)',
    mechanism: 'Pelaksanaan tugas kedinasan secara fleksibel dari rumah/lokasi khusus atas persetujuan Plt. Kepala Balai Kekarantinaan Kesehatan Kelas II Merauke dengan tetap memenuhi kewajiban output harian dan respons komunikasi <= 60 menit.',
    defaultLocCategory: 'Rumah / Tempat Tinggal (WFH)',
    placeholderLoc: 'Contoh: Kediaman / Lokasi Kondisi Khusus yang Disetujui Plt. Kepala Balai'
  },
  'Flexi-Place (WFH)': {
    category: 'Flexi-Place (WFH)',
    target: 'ASN BKK Kelas II Merauke sesuai kriteria Diktum KEDUA huruf a',
    mechanism: 'Bekerja dari rumah/tempat tinggal terdaftar dengan memenuhi syarat K3, jaringan internet memadai, kewajiban 7,5 jam efektif, serta tautan bukti laporan harian.',
    defaultLocCategory: 'Rumah / Tempat Tinggal (WFH)',
    placeholderLoc: 'Contoh: Kediaman Pribadi, Merauke'
  },
  'Flexi-Place (WFA)': {
    category: 'Flexi-Place (WFA)',
    target: 'ASN BKK Kelas II Merauke sesuai kriteria Diktum KEDUA huruf a',
    mechanism: 'Bekerja dari lokasi lain yang disetujui (Kantor Satelit, UPT Kemenkes lain, atau Co-Working Space) dengan memenuhi 7,5 jam kerja efektif.',
    defaultLocCategory: 'Co-Working Space / Lokasi Disetujui (WFA)',
    placeholderLoc: 'Contoh: Co-Working Space Kantor Induk / UPT Kemenkes'
  },
  'Flexi-Time (WFO)': {
    category: 'Flexi-Time WFO',
    target: 'ASN BKK Kelas II Merauke sesuai Diktum KEDUA huruf b',
    mechanism: 'Fleksibilitas waktu kehadiran masuk pukul 06.00 – 09.00 WIT di kantor dengan jam pulang proporsional minimal 7,5 jam efektif.',
    defaultLocCategory: 'Kantor / Satker Kemenkes (WFO Flexi)',
    placeholderLoc: 'Contoh: Kantor Induk BKK Kelas II Merauke'
  },
  'Kombinasi (Flexi-Time & Place)': {
    category: 'Kombinasi Fleksibilitas Waktu & Lokasi (Diktum KEDUA huruf c)',
    target: 'ASN BKK Kelas II Merauke yang melaksanakan kombinasi waktu dan lokasi fleksibel',
    mechanism: 'Kombinasi pengaturan waktu masuk fleksibel (06.00 – 09.00 WIT) dan lokasi kerja yang disetujui dengan pemenuhan minimal 7,5 jam kerja efektif.',
    defaultLocCategory: 'Kantor Satelit - Kantor Induk / Wilker (WFA)',
    placeholderLoc: 'Contoh: Kantor Induk BKK Merauke & Kediaman'
  }
};

function isFlexiTimeType(fwaType) {
  const t = String(fwaType || '');
  return t === 'Flexi-Time (WFO)' || t === 'Flexi-Time WFO & Kompensasi Layanan';
}

function isFlexiPlaceType(fwaType) {
  return !isFlexiTimeType(fwaType);
}

function matchesFwaTypeFilter(recordType, filterVal) {
  if (!filterVal || filterVal === 'ALL') return true;
  if (recordType === filterVal) return true;
  if (filterVal === 'Flexi-Place (WFH)') {
    return isFlexiPlaceType(recordType);
  }
  if (filterVal === 'Flexi-Time (WFO)') {
    return isFlexiTimeType(recordType);
  }
  return false;
}

// Default Seed Data: Pelaksanaan Skema FWA BKK Kelas II Merauke (Sesuai Tabel 1 Lampiran II SK)
const DEFAULT_FWA_RECORDS = [
  {
    id: 'FWA-202610-001',
    employeeId: 'EMP-001',
    date: '2026-10-26',
    fwaType: 'FWA Hari Libur Fakultatif Daerah (WFH/WFA)',
    locationCategory: 'Rumah / Tempat Tinggal (WFH)',
    locationDetail: 'Kediaman Pribadi - Distrik Merauke, Papua Selatan [Lat: -8.49320, Long: 140.40180]',
    assignmentStatus: 'Disetujui',
    checkIn: '07:30',
    checkOut: '15:30',
    responseTime: 'Ya (< 10 Menit)',
    activitySummary: 'Penyusunan draf dokumen perencanaan (KAK/TOR/RAB), evaluasi anggaran, dan finalisasi SK Pedoman Pelaksanaan FWA BKK Kelas II Merauke.',
    reportLink: 'https://drive.google.com/file/d/1DokumenPerencanaanSubbagAdumBKKMerauke2026/view',
    verificationStatus: 'Disetujui',
    supervisorNote: 'Selesai 100% sesuai target Subbag Adum.'
  },
  {
    id: 'FWA-202610-002',
    employeeId: 'EMP-008',
    date: '2026-10-28',
    fwaType: 'One-Day Desk-Work WFA/WFH (Tugas Pelaporan)',
    locationCategory: 'Rumah / Tempat Tinggal (WFH)',
    locationDetail: 'Kediaman Pribadi - Merauke [Lat: -8.49510, Long: 140.39840]',
    assignmentStatus: 'Disetujui',
    checkIn: '07:30',
    checkOut: '15:30',
    responseTime: 'Ya (< 15 Menit)',
    activitySummary: 'Analisis laporan surveilans epidemiologi mingguan alat angkut dan penginputan data SINKARKES Tim Kerja 2.',
    reportLink: 'https://drive.google.com/file/d/1LaporanSurveilansSINKARKESTimker2Merauke/view',
    verificationStatus: 'Disetujui',
    supervisorNote: 'Valid / Disetujui.'
  },
  {
    id: 'FWA-202610-003',
    employeeId: 'EMP-017',
    date: '2026-10-28',
    fwaType: 'FWA Substitusi Layanan Fakultatif (WFH/WFA)',
    locationCategory: 'Rumah / Tempat Tinggal (WFH)',
    locationDetail: 'Kediaman Petugas Wilker Bandara Mopah - Merauke [Lat: -8.52030, Long: 140.41820]',
    assignmentStatus: 'Disetujui',
    checkIn: '07:30',
    checkOut: '15:45',
    responseTime: 'Ya (< 10 Menit)',
    activitySummary: 'Rekapitulasi laporan bulanan pengawasan keberangkatan/kedatangan pesawat dan pelayanan kekarantinaan kesehatan di Wilker Bandara Mopah.',
    reportLink: 'https://drive.google.com/drive/folders/1RekapBulananWilkerBandaraMopah2026',
    verificationStatus: 'Disetujui',
    supervisorNote: 'Hak substitusi layanan fakultatif terverifikasi.'
  },
  {
    id: 'FWA-202610-004',
    employeeId: 'EMP-016',
    date: '2026-10-29',
    fwaType: 'FWA Lokasi Kerja Satelit (Satellite Office)',
    locationCategory: 'Kantor Satelit - Kantor Induk / Wilker (WFA)',
    locationDetail: 'Ruang Kerja Bersama (Co-Working Space) Kantor Induk BKK Kelas II Merauke',
    assignmentStatus: 'Disetujui',
    checkIn: '07:45',
    checkOut: '16:00',
    responseTime: 'Ya (< 10 Menit)',
    activitySummary: 'Sinkronisasi laporan pengawasan pelintas batas Wilker PLBN Sota dan koordinasi logistik kesehatan di Kantor Induk.',
    reportLink: 'https://drive.google.com/file/d/1SinkronisasiLaporanPLBNSotaMerauke2026/view',
    verificationStatus: 'Disetujui',
    supervisorNote: 'Sesuai skema Work From Satellite Office.'
  },
  {
    id: 'FWA-202610-005',
    employeeId: 'EMP-015',
    date: '2026-10-29',
    fwaType: 'One-Day Desk-Work WFA/WFH (Tugas Pelaporan)',
    locationCategory: 'Rumah / Tempat Tinggal (WFH)',
    locationDetail: 'Kediaman Pribadi - Merauke [Lat: -8.48950, Long: 140.40510]',
    assignmentStatus: 'Disetujui',
    checkIn: '07:20',
    checkOut: '15:30',
    responseTime: 'Ya (< 15 Menit)',
    activitySummary: 'Verifikasi dokumen keuangan elektronik APBN dan pengelolaan persuratan melalui aplikasi SRIKANDI pada Tim Kerja 6.',
    reportLink: 'https://srikandi.arsip.go.id/verifikasi-keuangan-timker6-bkk-merauke',
    verificationStatus: 'Disetujui',
    supervisorNote: 'Dokumen keuangan dan SRIKANDI lengkap.'
  },
  {
    id: 'FWA-202610-006',
    employeeId: 'EMP-010',
    date: '2026-10-30',
    fwaType: 'Flexi-Time WFO & Kompensasi Layanan',
    locationCategory: 'Kantor / Satker Kemenkes (WFO Flexi)',
    locationDetail: 'Kantor Induk BKK Kelas II Merauke - Ruang Tim Kerja 1',
    assignmentStatus: 'Disetujui',
    checkIn: '08:15',
    checkOut: '17:15',
    responseTime: 'Ya (< 10 Menit)',
    activitySummary: 'Penyusunan dokumen manajemen risiko/SPIP dan evaluasi kesiapsiagaan cegah tangkal penyakit pintu masuk negara.',
    reportLink: 'https://drive.google.com/file/d/1LaporanSPIPTimker1BKKMerauke2026/view',
    verificationStatus: 'Menunggu Verifikasi',
    supervisorNote: ''
  },
  {
    id: 'FWA-202610-007',
    employeeId: 'EMP-014',
    date: '2026-10-30',
    fwaType: 'FWA Substitusi Layanan Fakultatif (WFH/WFA)',
    locationCategory: 'Rumah / Tempat Tinggal (WFH)',
    locationDetail: 'Kediaman Petugas Wilker PLBN Yetetkun - Boven Digoel',
    assignmentStatus: 'Diajukan',
    checkIn: '',
    checkOut: '',
    responseTime: 'Ya (< 15 Menit)',
    activitySummary: 'Penyusunan laporan bulanan surveilans epidemiologi perbatasan darat negara pada Wilker PLBN Yetetkun.',
    reportLink: '',
    verificationStatus: 'Menunggu Verifikasi',
    supervisorNote: ''
  }
];

const SESSION_USER_KEY = 'efwa_session_user_id_v1';

// Global App State
let employees = [];
let fwaRecords = [];
let currentUserId = null;
let pendingSwitchUserId = null;
let activeTab = 'dashboard';

// ============================================================================
// ROLE-BASED ACCESS CONTROL (RBAC) & PIN SECURITY ENGINE
// ============================================================================

/**
 * Klasifikasi tingkat hak akses berdasarkan teks peran pegawai:
 * - 'ATASAN': Atasan / Kepala Balai / Admin SDM (Akses penuh seluruh fitur & data pegawai)
 * - 'KATIMKER': Ketua Tim Kerja (Katimker) / Koordinator Wilker (Bisa verifikasi tim & kelola jadwal tim)
 * - 'PEGAWAI': Staf / Pegawai pelaksana (Hanya bisa ajukan & absen FWA milik sendiri)
 */
function getAccessLevel(roleStr) {
  const r = String(roleStr || '').toLowerCase();
  if (r.includes('atasan') || r.includes('kepala') || r.includes('admin')) {
    return 'ATASAN';
  }
  if (r.includes('katim') || r.includes('ketua tim') || r.includes('koordinator')) {
    return 'KATIMKER';
  }
  return 'PEGAWAI';
}

function getCurrentAccessLevel() {
  const user = getCurrentUser();
  return getAccessLevel(user ? user.role : '');
}

/**
 * Hasilkan PIN bawaan untuk pegawai yang belum memiliki PIN khusus (6 digit terakhir NIP atau 123456)
 */
function getDefaultPinForEmployee(emp) {
  if (!emp) return '123456';
  if (emp.pin && String(emp.pin).trim() !== '') return String(emp.pin).trim();
  const cleanNip = String(emp.nip || '').replace(/\D/g, '');
  if (cleanNip.length >= 6) return cleanNip.slice(-6);
  return '123456';
}

/**
 * Validasi apakah PIN yang dimasukkan cocok untuk pegawai target
 * Hanya memeriksa PIN pribadi pegawai (atau 6 digit terakhir NIP jika belum diubah)
 */
function isPinValidForEmployee(emp, inputPin) {
  const pin = String(inputPin || '').trim();
  if (!pin) return false;
  const empPin = getDefaultPinForEmployee(emp);
  return pin === empPin;
}

/**
 * Cek apakah pengguna saat ini berhak menyetujui jadwal / memverifikasi laporan FWA milik pegawai tertentu
 */
function canCurrentUserVerifyRecord(record) {
  const user = getCurrentUser();
  if (!user) return false;
  const level = getCurrentAccessLevel();
  if (level === 'ATASAN') return true;
  if (level === 'KATIMKER') {
    // Katimker tidak boleh menyetujui/memverifikasi pengajuan atau laporan miliknya sendiri
    if (record.employeeId === user.id) return false;
    const targetEmp = getEmployeeById(record.employeeId);
    if (!targetEmp) return true;
    return targetEmp.unit === user.unit;
  }
  return false;
}

/**
 * Cek apakah pengguna saat ini berhak mengubah / mengisi absensi pada record FWA tertentu
 */
function canCurrentUserModifyRecord(record) {
  const user = getCurrentUser();
  const level = getCurrentAccessLevel();
  if (level === 'ATASAN') return true;
  if (level === 'KATIMKER') {
    const targetEmp = getEmployeeById(record.employeeId);
    return !targetEmp || targetEmp.unit === user.unit || record.employeeId === user.id;
  }
  // Pegawai hanya bisa mengubah/absen miliknya sendiri
  return record.employeeId === user.id;
}

/**
 * Cek apakah pengguna saat ini berhak menghapus record FWA tertentu
 */
function canCurrentUserDeleteRecord(record) {
  const user = getCurrentUser();
  const level = getCurrentAccessLevel();
  if (level === 'ATASAN') return true;
  if (level === 'KATIMKER') {
    const targetEmp = getEmployeeById(record.employeeId);
    return (!targetEmp || targetEmp.unit === user.unit) && record.verificationStatus !== 'Disetujui';
  }
  // Pegawai hanya bisa menghapus pengajuan miliknya sendiri yang masih berstatus 'Diajukan'
  return record.employeeId === user.id && record.assignmentStatus === 'Diajukan';
}

function canCurrentUserManageEmployees() {
  return getCurrentAccessLevel() === 'ATASAN';
}

// ============================================================================
// INITIALIZATION & LOGIN GATE
// ============================================================================
document.addEventListener('DOMContentLoaded', async () => {
  loadStateFromStorage();
  if (typeof initSupabaseClient === 'function') {
    initSupabaseClient();
    if (isSupabaseEnabled()) {
      await syncFromSupabase();
    }
  }
  initLiveClock();
  initDefaultDateFilters();
  populateLoginEmployeeSelect();

  const savedSessionUserId = sessionStorage.getItem(SESSION_USER_KEY);
  if (savedSessionUserId && employees.some(e => e.id === savedSessionUserId)) {
    currentUserId = savedSessionUserId;
    hideLoginScreen();
    populateUserRoleSwitcher();
    populateAllEmployeeDropdowns();
    refreshAllViews();
  } else {
    currentUserId = null;
    showLoginScreen();
  }
});

async function syncFromSupabase() {
  if (typeof fetchAllFromSupabase !== 'function' || !isSupabaseEnabled()) return false;
  const cloudData = await fetchAllFromSupabase();
  if (!cloudData) return false;

  if (Array.isArray(cloudData.employees) && cloudData.employees.length > 0) {
    employees = cloudData.employees;
    if (Array.isArray(cloudData.records)) {
      fwaRecords = cloudData.records;
    }
  } else {
    // Database Supabase masih kosong (pertama kali digunakan): unggah data awal 32 pegawai & contoh FWA
    if (typeof upsertEmployeesBulkToSupabase === 'function') {
      await upsertEmployeesBulkToSupabase(employees);
    }
    if (typeof upsertFwaRecordsBulkToSupabase === 'function' && fwaRecords.length > 0) {
      await upsertFwaRecordsBulkToSupabase(fwaRecords);
    }
  }
  saveStateToStorage();
  populateLoginEmployeeSelect();
  if (currentUserId) {
    populateUserRoleSwitcher();
    populateAllEmployeeDropdowns();
    refreshAllViews();
  }
  return true;
}

function showLoginScreen() {
  const loginEl = document.getElementById('loginScreen');
  if (loginEl) loginEl.classList.remove('hidden');
  populateLoginEmployeeSelect();
  const pinInput = document.getElementById('loginPinInput');
  if (pinInput) pinInput.value = '';
  const errEl = document.getElementById('loginError');
  if (errEl) errEl.classList.add('hidden');
}

function hideLoginScreen() {
  const loginEl = document.getElementById('loginScreen');
  if (loginEl) loginEl.classList.add('hidden');
}

function populateLoginEmployeeSelect() {
  const select = document.getElementById('loginEmployeeSelect');
  if (!select) return;
  select.innerHTML = `<option value="">-- Pilih Nama Pegawai --</option>` +
    employees.map(emp => `<option value="${escapeHtml(emp.id)}">${escapeHtml(emp.name)} (${escapeHtml(emp.role)})</option>`).join('');
}

function syncLoginNipFromSelect() {
  const select = document.getElementById('loginEmployeeSelect');
  const nipInput = document.getElementById('loginNipInput');
  if (!select || !nipInput) return;
  const emp = getEmployeeById(select.value);
  nipInput.value = emp ? emp.nip : '';
}

function syncLoginSelectFromNip() {
  const select = document.getElementById('loginEmployeeSelect');
  const nipInput = document.getElementById('loginNipInput');
  if (!select || !nipInput) return;
  const cleanNip = nipInput.value.trim();
  const emp = employees.find(e => e.nip === cleanNip);
  select.value = emp ? emp.id : '';
}

function submitInitialLogin(event) {
  event.preventDefault();
  const nipVal = (document.getElementById('loginNipInput')?.value || '').trim();
  const selectId = document.getElementById('loginEmployeeSelect')?.value || '';
  const pinVal = (document.getElementById('loginPinInput')?.value || '').trim();
  const errEl = document.getElementById('loginError');

  const targetEmp = employees.find(e => (nipVal && e.nip === nipVal) || (selectId && e.id === selectId));
  if (!targetEmp || !isPinValidForEmployee(targetEmp, pinVal)) {
    if (errEl) errEl.classList.remove('hidden');
    return;
  }

  if (errEl) errEl.classList.add('hidden');
  currentUserId = targetEmp.id;
  sessionStorage.setItem(SESSION_USER_KEY, currentUserId);
  hideLoginScreen();
  populateUserRoleSwitcher();
  populateAllEmployeeDropdowns();
  if (getCurrentAccessLevel() === 'PEGAWAI' && activeTab === 'verifikasi') {
    switchTab('dashboard');
  } else {
    refreshAllViews();
  }
  showToast(`Selamat datang, ${targetEmp.name} (${targetEmp.role})`);
}

function logoutUser() {
  currentUserId = null;
  sessionStorage.removeItem(SESSION_USER_KEY);
  showLoginScreen();
  showToast('Anda telah keluar dari sesi aplikasi.');
}

function loadStateFromStorage() {
  try {
    const savedEmp = localStorage.getItem(STORAGE_KEY_EMPLOYEES);
    const savedSnap = localStorage.getItem(STORAGE_KEY_EMPLOYEES_SNAPSHOT);
    const savedRec = localStorage.getItem(STORAGE_KEY_RECORDS);

    let loadedEmployees = [];
    if (savedEmp) {
      loadedEmployees = JSON.parse(savedEmp);
    } else if (savedSnap) {
      loadedEmployees = JSON.parse(savedSnap);
    } else {
      loadedEmployees = [...DEFAULT_EMPLOYEES];
    }

    // Pastikan ke-32 Pegawai Resmi BKK Kelas II Merauke di DEFAULT_EMPLOYEES selalu ada dan tidak pernah terhapus
    const mergedEmployees = [];
    DEFAULT_EMPLOYEES.forEach(defEmp => {
      const existing = loadedEmployees.find(e => e.nip === defEmp.nip || e.id === defEmp.id);
      if (existing) {
        mergedEmployees.push({
          ...defEmp,
          ...existing,
          isPermanent: true
        });
      } else {
        mergedEmployees.push({ ...defEmp, isPermanent: true });
      }
    });

    // Tambahkan pegawai ekstra yang mungkin pernah ditambahkan manual di luar 32 pegawai utama
    loadedEmployees.forEach(emp => {
      const alreadyIn = mergedEmployees.some(m => m.nip === emp.nip || m.id === emp.id);
      if (!alreadyIn) {
        mergedEmployees.push(emp);
      }
    });

    employees = mergedEmployees;
    if (savedRec) {
      const parsedRec = JSON.parse(savedRec);
      // Otomatis migrasikan data contoh lama (Bekasi/Cikarang) ke Skema Inovatif FWA BKK Kelas II Merauke
      fwaRecords = parsedRec.map(r => {
        const defReplacement = DEFAULT_FWA_RECORDS.find(d => d.id === r.id);
        if (defReplacement && (String(r.locationDetail || '').includes('Bekasi') || String(r.locationDetail || '').includes('Kuningan') || String(r.locationDetail || '').includes('Cikarang') || String(r.locationDetail || '').includes('Tangerang') || String(r.locationDetail || '').includes('Jakarta'))) {
          return { ...defReplacement };
        }
        return {
          responseTime: 'Ya (< 15 Menit)',
          ...r
        };
      });
    } else {
      fwaRecords = [...DEFAULT_FWA_RECORDS];
    }
  } catch (e) {
    employees = [...DEFAULT_EMPLOYEES];
    fwaRecords = [...DEFAULT_FWA_RECORDS];
  }
  // Pastikan setiap pegawai memiliki properti PIN bawaan (6 digit terakhir NIP)
  employees.forEach(emp => {
    if (!emp.pin) {
      emp.pin = getDefaultPinForEmployee(emp);
    }
  });
  saveStateToStorage();
}

function saveStateToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY_EMPLOYEES, JSON.stringify(employees));
    // Simpan salinan cadangan otomatis daftar pegawai agar tidak pernah hilang tanpa sengaja
    localStorage.setItem(STORAGE_KEY_EMPLOYEES_SNAPSHOT, JSON.stringify(employees));
    localStorage.setItem(STORAGE_KEY_RECORDS, JSON.stringify(fwaRecords));
  } catch (err) {
    console.error('Gagal menyimpan ke localStorage:', err);
    if (err && (err.name === 'QuotaExceededError' || err.code === 22)) {
      alert('Penyimpanan lokal browser penuh (umumnya akibat terlalu banyak foto Base64). Hubungkan Supabase Storage atau lakukan Backup & bersihkan foto lama.');
    }
  }
}

function resetDemoData() {
  // Fungsi reset kini DIPROTEKSI: Tidak akan pernah menghapus Data Pegawai
  if (!confirm('Reset hanya untuk jadwal FWA contoh? (Data Pegawai Anda TETAP AMAN dan tidak akan dihapus)')) return;
  fwaRecords = JSON.parse(JSON.stringify(DEFAULT_FWA_RECORDS));
  saveStateToStorage();
  refreshAllViews();
  showToast('Riwayat FWA direset, Data Pegawai tetap aman terjaga.');
}

function getTodayDateString() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function initDefaultDateFilters() {
  const defaultDate = getTodayDateString();
  const defaultMonth = defaultDate.slice(0, 7);

  const quotaDateEl = document.getElementById('quotaMonitorDate');
  if (quotaDateEl && !quotaDateEl.value) quotaDateEl.value = defaultDate;

  const assignMonthEl = document.getElementById('filterAssignmentMonth');
  if (assignMonthEl && !assignMonthEl.value) assignMonthEl.value = defaultMonth;

  const recapMonthEl = document.getElementById('recapFilterMonth');
  if (recapMonthEl && !recapMonthEl.value) recapMonthEl.value = defaultMonth;

  const modalDateEl = document.getElementById('modalFwaDate');
  if (modalDateEl && !modalDateEl.value) modalDateEl.value = defaultDate;
}

// ============================================================================
// KEMENKES KMK 1342/2024 WORK-HOUR & FLEXI-TIME ENGINE
// ============================================================================

/**
 * Menghitung durasi istirahat berdasarkan hari (Senin-Kamis: 30 mnt, Jumat: 90 mnt)
 */
function getBreakMinutesForDate(dateStr) {
  if (!dateStr) return 30;
  const d = new Date(dateStr + 'T00:00:00');
  const day = d.getDay(); // 5 = Jumat
  return day === 5 ? 90 : 30;
}

/**
 * Konversi string "HH:MM" ke total menit sejak 00:00
 */
function timeToMinutes(timeStr) {
  if (!timeStr || !timeStr.includes(':')) return null;
  const [h, m] = timeStr.split(':').map(Number);
  if (isNaN(h) || isNaN(m)) return null;
  return h * 60 + m;
}

/**
 * Konversi total menit ke format "HH:MM"
 */
function minutesToTime(totalMinutes) {
  if (totalMinutes === null || isNaN(totalMinutes)) return '--:--';
  const normalized = ((totalMinutes % 1440) + 1440) % 1440;
  const h = Math.floor(normalized / 60);
  const m = normalized % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

/**
 * Evaluasi status jam masuk sesuai aturan Flexi-Time Kemenkes (07:30 ± 90 menit -> 06:00 s.d. 09:00)
 */
function evaluateCheckInStatus(checkInStr) {
  const mins = timeToMinutes(checkInStr);
  if (mins === null) {
    return { label: 'Belum Absen', badgeClass: 'bg-slate-100 text-slate-600', isLate: false };
  }
  const stdStart = 7 * 60 + 30; // 07:30 (450)
  const flexiEarliest = 6 * 60; // 06:00 (360)
  const flexiLatest = 9 * 60;   // 09:00 (540)

  if (mins <= stdStart && mins >= flexiEarliest) {
    return { label: 'Tepat Waktu / Flexi Awal', badgeClass: 'bg-emerald-100 text-emerald-800', isLate: false };
  }
  if (mins > stdStart && mins <= flexiLatest) {
    const diff = mins - stdStart;
    return { label: `Flexi-Time (+${diff}m)`, badgeClass: 'bg-sky-100 text-sky-800', isLate: false };
  }
  if (mins < flexiEarliest) {
    return { label: 'Masuk Lebih Awal (<06:00)', badgeClass: 'bg-teal-100 text-teal-800', isLate: false };
  }
  const lateDiff = mins - flexiLatest;
  return { label: `Melewati Batas Flexi (+${lateDiff}m)`, badgeClass: 'bg-rose-100 text-rose-700', isLate: true };
}

/**
 * Hitung minimal jam pulang untuk memenuhi minimal 7,5 jam kerja efektif (450 menit) + jam istirahat
 */
function calculateMinCheckOutTime(checkInStr, dateStr) {
  const inMins = timeToMinutes(checkInStr);
  if (inMins === null) return '--:--';
  const breakMins = getBreakMinutesForDate(dateStr);
  const effectiveRequired = 450; // 7,5 jam = 450 menit
  // Berdasarkan aturan Flexi-Time, perhitungan jam kerja dihitung sejak batas paling awal 06:00
  const effectiveIn = Math.max(inMins, 360);
  return minutesToTime(effectiveIn + effectiveRequired + breakMins);
}

/**
 * Hitung jam kerja efektif (dalam menit dan teks) dari jam masuk & pulang dikurangi jam istirahat
 */
function calculateEffectiveWorkDuration(checkInStr, checkOutStr, dateStr) {
  const inMins = timeToMinutes(checkInStr);
  const outMins = timeToMinutes(checkOutStr);
  if (inMins === null || outMins === null || outMins <= inMins) {
    return {
      totalMinutes: 0,
      hours: 0,
      minutes: 0,
      formatted: '0j 00m',
      formattedLong: '0 Jam 0 Menit',
      isCompliant: false,
      statusLabel: 'Belum Lengkap',
      badgeClass: 'bg-slate-100 text-slate-600'
    };
  }

  const breakMins = getBreakMinutesForDate(dateStr);
  // Konsisten dengan aturan Flexi-Time Kemenkes: jam kerja dihitung paling awal mulai pukul 06:00 (360 menit)
  const effectiveIn = Math.max(inMins, 360);
  const rawDiff = Math.max(0, outMins - effectiveIn);
  const netMinutes = Math.max(0, rawDiff - breakMins);
  const hours = Math.floor(netMinutes / 60);
  const minutes = netMinutes % 60;
  const isCompliant = netMinutes >= 450; // Minimal 7.5 jam (450 menit)

  return {
    totalMinutes: netMinutes,
    hours,
    minutes,
    formatted: `${hours}j ${String(minutes).padStart(2, '0')}m`,
    formattedLong: `${hours} Jam ${minutes} Menit`,
    isCompliant,
    statusLabel: isCompliant ? 'Memenuhi (≥7,5 Jam)' : 'Kurang Jam (<7,5 Jam)',
    badgeClass: isCompliant ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-700'
  };
}

// ============================================================================
// LIVE CLOCK & ROLE SIMULATION
// ============================================================================
function initLiveClock() {
  const updateClock = () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const dateStr = now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' });
    const timeEl = document.getElementById('headerLiveTime');
    const dateEl = document.getElementById('headerLiveDate');
    if (timeEl) timeEl.textContent = `${timeStr} WIT`;
    if (dateEl) dateEl.textContent = dateStr;
  };
  updateClock();
  setInterval(updateClock, 1000);
}

function getCurrentUser() {
  return employees.find(e => e.id === currentUserId) || employees[0];
}

function populateUserRoleSwitcher() {
  const select = document.getElementById('activeUserSelect');
  if (!select) return;

  select.innerHTML = employees.map(emp => {
    return `<option value="${emp.id}" ${emp.id === currentUserId ? 'selected' : ''}>[${emp.role}] ${emp.name}</option>`;
  }).join('');

  updateActiveUserHeaderUI();
}

function handleRoleUserChange(empId) {
  if (empId === currentUserId) return;
  const targetEmp = getEmployeeById(empId);
  if (!targetEmp) return;

  // Buka Modal Verifikasi PIN sebelum mengizinkan pergantian pengguna/peran
  pendingSwitchUserId = empId;
  document.getElementById('pinTargetUserName').textContent = `${targetEmp.name} (NIP. ${targetEmp.nip})`;
  document.getElementById('pinTargetUserRole').textContent = `Peran: ${targetEmp.role} — Hak Akses: ${getAccessLevel(targetEmp.role)}`;
  document.getElementById('pinAuthInput').value = '';
  document.getElementById('pinAuthError').classList.add('hidden');

  const hintEl = document.getElementById('pinDefaultHintText');
  if (hintEl) {
    hintEl.textContent = 'Masukkan PIN pribadi pegawai target. Jika lupa PIN, hubungi Admin SDM / Kasubbag Adum.';
  }

  document.getElementById('pinAuthModal').classList.remove('hidden');
  setTimeout(() => document.getElementById('pinAuthInput')?.focus(), 80);
}

function cancelPinAuthModal() {
  pendingSwitchUserId = null;
  document.getElementById('pinAuthModal').classList.add('hidden');
  // Kembalikan dropdown ke pengguna aktif sebelumnya
  const select = document.getElementById('activeUserSelect');
  if (select) select.value = currentUserId;
}

function submitPinAuth(event) {
  event.preventDefault();
  if (!pendingSwitchUserId) return;

  const targetEmp = getEmployeeById(pendingSwitchUserId);
  const inputPin = document.getElementById('pinAuthInput').value;

  if (!isPinValidForEmployee(targetEmp, inputPin)) {
    document.getElementById('pinAuthError').classList.remove('hidden');
    return;
  }

  currentUserId = pendingSwitchUserId;
  pendingSwitchUserId = null;
  sessionStorage.setItem(SESSION_USER_KEY, currentUserId);
  document.getElementById('pinAuthModal').classList.add('hidden');

  updateActiveUserHeaderUI();
  populateAllEmployeeDropdowns();

  // Jika pengguna baru berlevel PEGAWAI dan sedang berada di tab Verifikasi Atasan, pindahkan ke Dasbor
  if (getCurrentAccessLevel() === 'PEGAWAI' && activeTab === 'verifikasi') {
    switchTab('dashboard');
  } else {
    refreshAllViews();
  }

  showToast(`Otorisasi PIN berhasil! Masuk sebagai: ${targetEmp.name} (${targetEmp.role})`);
}

function openChangeMyPinModal() {
  const user = getCurrentUser();
  if (!user) return;
  const newPin = prompt(
    `Ubah PIN Keamanan untuk ${user.name}\n(Masukkan 4 s.d. 6 digit angka):`,
    getDefaultPinForEmployee(user)
  );
  if (newPin === null) return;
  const clean = newPin.trim();
  if (!/^\d{4,6}$/.test(clean)) {
    alert('PIN harus berupa 4 hingga 6 digit angka!');
    return;
  }
  const idx = employees.findIndex(e => e.id === user.id);
  if (idx !== -1) {
    employees[idx].pin = clean;
    saveStateToStorage();
    if (typeof upsertEmployeeToSupabase === 'function') {
      upsertEmployeeToSupabase(employees[idx]);
    }
    showToast('PIN keamanan Anda berhasil diperbarui!');
  }
}

function updateActiveUserHeaderUI() {
  const user = getCurrentUser();
  if (!user) return;

  const initials = user.name
    .replace(/^(dr\.|drg\.|apt\.|ns\.)\s*/i, '')
    .split(' ')
    .slice(0, 2)
    .map(w => w[0] || '')
    .join('')
    .toUpperCase();

  const level = getCurrentAccessLevel();

  document.getElementById('activeUserRoleBadge').textContent = `${user.role} [${level}]`;
  document.getElementById('sidebarUserAvatar').textContent = initials || 'ASN';
  document.getElementById('sidebarUserName').textContent = user.name;
  document.getElementById('sidebarUserNip').textContent = `NIP. ${user.nip}`;
  document.getElementById('sidebarUserRolePill').textContent = user.role;
  document.getElementById('sidebarUserUnit').innerHTML = `<i class="fa-solid fa-building mr-1 text-teal-700"></i> ${user.unit}`;

  // Sembunyikan/tampilkan menu Verifikasi Atasan & tombol Tambah Pegawai sesuai Hak Akses
  const navVerify = document.getElementById('nav-verifikasi');
  if (navVerify) {
    navVerify.classList.toggle('hidden', level === 'PEGAWAI');
  }

  const btnAddEmp = document.getElementById('btnAddEmployee');
  if (btnAddEmp) {
    btnAddEmp.classList.toggle('hidden', !canCurrentUserManageEmployees());
  }
  const empToolbar = document.getElementById('employeeAdminToolbar');
  if (empToolbar) {
    empToolbar.classList.toggle('hidden', !canCurrentUserManageEmployees());
  }

  const bannerDesc = document.getElementById('roleBannerDescription');
  if (level === 'PEGAWAI') {
    bannerDesc.innerHTML = `<i class="fa-solid fa-lock text-amber-300 mr-1"></i> Hak Akses <strong>PEGAWAI (${user.name})</strong>: Hanya dapat mengajukan Skema FWA & mengisi presensi/link laporan <strong>milik sendiri</strong>. Menu Verifikasi & Kelola Pegawai dikunci.`;
  } else if (level === 'KATIMKER') {
    bannerDesc.innerHTML = `<i class="fa-solid fa-user-shield text-lime-300 mr-1"></i> Hak Akses <strong>KATIMKER / KOORDINATOR (${user.name})</strong>: Dapat mengajukan Skema FWA, memverifikasi laporan harian anggota Tim Kerja/Wilker (<em>${user.unit}</em>), & melihat rekap.`;
  } else {
    bannerDesc.innerHTML = `<i class="fa-solid fa-crown text-amber-300 mr-1"></i> Hak Akses Penuh <strong>ATASAN / ADMIN (${user.name})</strong>: Dapat menyetujui seluruh penugasan Skema FWA, memverifikasi laporan semua unit/wilker, & mengelola Data Pegawai.`;
  }
}

function populateAllEmployeeDropdowns() {
  const user = getCurrentUser();
  const level = getCurrentAccessLevel();
  const allOptionsHtml = employees.map(e => `<option value="${e.id}">${e.name} (${e.nip})</option>`).join('');

  const filterAssignEmp = document.getElementById('filterAssignmentEmployee');
  if (filterAssignEmp) {
    const prev = filterAssignEmp.value || 'ALL';
    filterAssignEmp.innerHTML = `<option value="ALL">Semua Pegawai</option>` + allOptionsHtml;
    filterAssignEmp.value = prev;
  }

  const recapEmp = document.getElementById('recapFilterEmployee');
  if (recapEmp) {
    const prev = recapEmp.value || 'ALL';
    recapEmp.innerHTML = `<option value="ALL">Semua Pegawai (33 ASN)</option>` + allOptionsHtml;
    recapEmp.value = prev;
  }

  // Pada Modal Input FWA: Batasi pilihan pegawai sesuai hak akses
  const modalEmp = document.getElementById('modalEmployeeId');
  if (modalEmp) {
    let allowedEmps = employees;
    if (level === 'PEGAWAI') {
      allowedEmps = employees.filter(e => e.id === user.id);
    } else if (level === 'KATIMKER') {
      allowedEmps = employees.filter(e => e.unit === user.unit || e.id === user.id);
    }
    modalEmp.innerHTML = allowedEmps.map(e => `<option value="${e.id}">${e.name} (${e.nip})</option>`).join('');
    modalEmp.value = user ? user.id : '';
    modalEmp.disabled = (level === 'PEGAWAI');
  }

  // Populate Unique Units in Recap Filter
  const recapUnit = document.getElementById('recapFilterUnit');
  if (recapUnit) {
    const units = [...new Set(employees.map(e => e.unit))];
    const prevUnit = recapUnit.value || 'ALL';
    recapUnit.innerHTML = `<option value="ALL">Semua Unit / Wilker (${units.length} Unit)</option>` + units.map(u => `<option value="${u}">${u}</option>`).join('');
    recapUnit.value = prevUnit;
  }
}

// ============================================================================
// NAVIGATION TABS
// ============================================================================
function switchTab(tabId) {
  if (tabId === 'verifikasi' && getCurrentAccessLevel() === 'PEGAWAI') {
    showToast('Akses ditolak: Menu Verifikasi hanya untuk Atasan / Kepala Balai / Katimker.');
    return;
  }
  activeTab = tabId;
  const tabs = ['dashboard', 'penugasan', 'absensi', 'verifikasi', 'rekap', 'pegawai'];
  tabs.forEach(t => {
    const section = document.getElementById(`tab-${t}`);
    const navBtn = document.getElementById(`nav-${t}`);
    if (section) section.classList.toggle('hidden', t !== tabId);
    if (navBtn) navBtn.classList.toggle('active', t === tabId);
  });
  refreshAllViews();
}

function refreshAllViews() {
  updateNotificationBadges();
  renderDashboard();
  renderAssignmentsTable();
  populateAttendanceAssignmentDropdown();
  renderVerificationTab();
  renderMonthlyRecap();
  renderEmployeesTable();
}

function updateNotificationBadges() {
  const pendingAssignCount = fwaRecords.filter(r => r.assignmentStatus === 'Diajukan').length;
  const pendingVerifyCount = fwaRecords.filter(r => r.assignmentStatus === 'Disetujui' && r.verificationStatus === 'Menunggu Verifikasi' && r.checkIn).length;

  const badgeAssign = document.getElementById('badgePendingAssignment');
  if (badgeAssign) {
    badgeAssign.textContent = pendingAssignCount;
    badgeAssign.classList.toggle('hidden', pendingAssignCount === 0);
  }

  const badgeVerify = document.getElementById('badgePendingVerification');
  if (badgeVerify) {
    badgeVerify.textContent = pendingVerifyCount + pendingAssignCount;
    badgeVerify.classList.toggle('hidden', (pendingVerifyCount + pendingAssignCount) === 0);
  }
}

// ============================================================================
// TAB 1: DASHBOARD & QUOTA CONTROL
// ============================================================================
function renderDashboard() {
  const approvedRecords = fwaRecords.filter(r => r.assignmentStatus === 'Disetujui');
  const totalFwa = approvedRecords.length;

  const flexiTimeCount = approvedRecords.filter(r => isFlexiTimeType(r.fwaType)).length;
  const flexiPlaceCount = approvedRecords.filter(r => isFlexiPlaceType(r.fwaType)).length;

  const completedAttendance = approvedRecords.filter(r => r.checkIn && r.checkOut);
  const compliantCount = completedAttendance.filter(r => calculateEffectiveWorkDuration(r.checkIn, r.checkOut, r.date).isCompliant).length;
  const compliancePct = completedAttendance.length > 0 ? Math.round((compliantCount / completedAttendance.length) * 100) : 100;

  const withLinks = approvedRecords.filter(r => r.reportLink && r.reportLink.trim() !== '').length;
  const verifiedCount = approvedRecords.filter(r => r.verificationStatus === 'Disetujui').length;

  document.getElementById('kpiTotalFwa').textContent = `${totalFwa} Hari`;
  document.getElementById('kpiTotalFwaSub').textContent = `${fwaRecords.filter(r => r.assignmentStatus === 'Diajukan').length} pengajuan menunggu persetujuan`;
  document.getElementById('kpiSplitFwa').textContent = `${flexiPlaceCount} Lokasi • ${flexiTimeCount} Waktu`;
  document.getElementById('kpiComplianceRate').textContent = `${compliancePct}%`;
  document.getElementById('kpiComplianceSub').textContent = `${compliantCount} dari ${completedAttendance.length} presensi selesai ≥ 7,5 jam`;
  document.getElementById('kpiVerifiedReports').textContent = `${verifiedCount} / ${withLinks}`;
  document.getElementById('kpiVerifiedSub').textContent = `Tautan laporan selesai diverifikasi atasan`;

  // Render Quota Monitor for Selected Date
  const monitorDate = document.getElementById('quotaMonitorDate')?.value || '2026-10-30';
  const totalStaff = employees.length;
  const maxQuota = Math.floor(totalStaff * 0.5); // 50% kuota sesuai Diktum KEEMPAT SK BKK Merauke
  const wfaOnDate = fwaRecords.filter(r =>
    r.date === monitorDate &&
    r.assignmentStatus !== 'Ditolak' &&
    isFlexiPlaceType(r.fwaType)
  );

  const usedQuota = wfaOnDate.length;
  const quotaPct = totalStaff > 0 ? Math.min(100, Math.round((usedQuota / maxQuota) * 100)) : 0;
  const isOverQuota = usedQuota > maxQuota;

  const quotaBox = document.getElementById('quotaStatusBox');
  if (quotaBox) {
    quotaBox.innerHTML = `
      <div class="flex items-center justify-between text-xs">
        <span class="font-semibold text-slate-600">Pegawai WFH/WFA (${formatDateIndoShort(monitorDate)}):</span>
        <span class="font-extrabold text-sm ${isOverQuota ? 'text-rose-600' : 'text-teal-800'}">${usedQuota} / ${maxQuota} Pegawai (Maks)</span>
      </div>
      <div class="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
        <div class="h-full ${isOverQuota ? 'bg-rose-500' : 'bg-teal-600'} transition-all" style="width: ${quotaPct}%"></div>
      </div>
      <div class="text-[11px] text-slate-600">
        Total Pegawai Terdaftar: <strong>${totalStaff} Orang</strong> • Di Kantor/Wilker (On-Site): <strong>${totalStaff - usedQuota} Orang</strong>
      </div>
      ${wfaOnDate.length > 0 ? `
        <div class="pt-2 border-t border-slate-200/80 space-y-1">
          <span class="text-[10px] font-bold uppercase text-slate-400 block">Daftar Pegawai Skema Lokasi Fleksibel:</span>
          ${wfaOnDate.map(item => {
            const emp = getEmployeeById(item.employeeId);
            return `<div class="flex items-center justify-between gap-2 text-[11px]">
              <span class="font-semibold text-slate-700 truncate">${emp ? emp.name : '-'}</span>
              <span class="px-1.5 py-0.5 rounded bg-teal-100 text-teal-800 font-bold text-[10px] truncate max-w-[140px]" title="${item.fwaType}">${item.fwaType}</span>
            </div>`;
          }).join('')}
        </div>
      ` : `<div class="text-[11px] text-slate-400 italic">Belum ada pegawai yang dijadwalkan WFH/WFA pada tanggal ini.</div>`}
    `;
  }

  const serviceBadge = document.getElementById('quotaServiceBadge');
  if (serviceBadge) {
    if (isOverQuota) {
      serviceBadge.className = 'font-bold text-rose-600';
      serviceBadge.innerHTML = `<i class="fa-solid fa-triangle-exclamation mr-1"></i> Melebihi Kuota 50%`;
    } else {
      serviceBadge.className = 'font-bold text-emerald-700';
      serviceBadge.innerHTML = `<i class="fa-solid fa-shield-heart mr-1"></i> Layanan Aman (100%)`;
    }
  }

  // Render Recent FWA Executions Table
  const recentBody = document.getElementById('dashboardRecentTableBody');
  if (!recentBody) return;

  const sorted = [...fwaRecords].sort((a, b) => b.date.localeCompare(a.date));
  recentBody.innerHTML = sorted.slice(0, 6).map(rec => {
    const emp = getEmployeeById(rec.employeeId);
    const dur = calculateEffectiveWorkDuration(rec.checkIn, rec.checkOut, rec.date);
    const safeReportUrl = sanitizeUrl(rec.reportLink);
    return `
      <tr class="hover:bg-slate-50/90 transition">
        <td class="py-3 px-3">
          <div class="font-bold text-slate-900">${escapeHtml(emp ? emp.name : '-')}</div>
          <div class="text-[11px] text-slate-500 font-mono">${escapeHtml(emp ? emp.nip : '-')}</div>
        </td>
        <td class="py-3 px-3">
          <div class="font-bold text-slate-800">${formatDateIndoShort(rec.date)}</div>
          <span class="inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${getFwaTypeBadgeClass(rec.fwaType)}">${escapeHtml(rec.fwaType)}</span>
        </td>
        <td class="py-3 px-3 max-w-[180px]">
          <div class="font-semibold text-slate-800 truncate" title="${escapeHtml(rec.locationDetail)}">${escapeHtml(rec.locationDetail)}</div>
          <div class="text-[10px] text-slate-500">${escapeHtml(rec.locationCategory)}</div>
        </td>
        <td class="py-3 px-3">
          ${rec.checkIn ? `
            <div class="font-bold text-slate-900">${escapeHtml(rec.checkIn)} - ${escapeHtml(rec.checkOut || '--:--')}</div>
            <span class="inline-block mt-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold ${dur.badgeClass}">${dur.formatted}</span>
          ` : `<span class="text-slate-400 italic">Belum Absen</span>`}
        </td>
        <td class="py-3 px-3">
          ${safeReportUrl ? `
            <a href="${safeReportUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-teal-700 hover:text-teal-900 font-bold underline">
              <i class="fa-solid fa-up-right-from-square text-[10px]"></i> Lihat Bukti
            </a>
          ` : `<span class="text-rose-500 text-[11px] font-semibold">Belum Diisi</span>`}
        </td>
        <td class="py-3 px-3">
          ${getVerificationBadgeHtml(rec.verificationStatus, rec.assignmentStatus)}
        </td>
      </tr>
    `;
  }).join('');
}

// ============================================================================
// TAB 2: JADWAL & PENUGASAN FWA
// ============================================================================
function renderAssignmentsTable() {
  const tbody = document.getElementById('assignmentsTableBody');
  if (!tbody) return;

  const empFilter = document.getElementById('filterAssignmentEmployee')?.value || 'ALL';
  const typeFilter = document.getElementById('filterAssignmentType')?.value || 'ALL';
  const statusFilter = document.getElementById('filterAssignmentStatus')?.value || 'ALL';
  const monthFilter = document.getElementById('filterAssignmentMonth')?.value || '';

  const filtered = fwaRecords.filter(r => {
    if (empFilter !== 'ALL' && r.employeeId !== empFilter) return false;
    if (!matchesFwaTypeFilter(r.fwaType, typeFilter)) return false;
    if (statusFilter !== 'ALL' && r.assignmentStatus !== statusFilter) return false;
    if (monthFilter && !r.date.startsWith(monthFilter)) return false;
    return true;
  }).sort((a, b) => b.date.localeCompare(a.date));

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="py-8 text-center text-slate-400">
          Tidak ada jadwal penugasan FWA yang sesuai dengan filter.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map(rec => {
    const emp = getEmployeeById(rec.employeeId);
    const canModify = canCurrentUserModifyRecord(rec);
    const canDelete = canCurrentUserDeleteRecord(rec);

    return `
      <tr class="hover:bg-slate-50 transition">
        <td class="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
          ${formatDateIndoFull(rec.date)}
        </td>
        <td class="py-3.5 px-4">
          <div class="font-bold text-slate-900">${escapeHtml(emp ? emp.name : '-')}</div>
          <div class="text-[11px] text-slate-500 font-mono">NIP. ${escapeHtml(emp ? emp.nip : '-')}</div>
          <div class="text-[10px] text-teal-700 font-semibold">${escapeHtml(emp ? emp.unit : '-')}</div>
        </td>
        <td class="py-3.5 px-4">
          <span class="inline-block px-2.5 py-1 rounded-full text-[11px] font-bold ${getFwaTypeBadgeClass(rec.fwaType)}">
            ${escapeHtml(rec.fwaType)}
          </span>
        </td>
        <td class="py-3.5 px-4 max-w-[220px]">
          <div class="font-semibold text-slate-800">${escapeHtml(rec.locationDetail)}</div>
          <div class="text-[11px] text-slate-500">${escapeHtml(rec.locationCategory)}</div>
        </td>
        <td class="py-3.5 px-4 max-w-[250px]">
          <p class="text-slate-700 line-clamp-2">${escapeHtml(rec.activitySummary || '-')}</p>
          ${rec.supervisorNote ? `<p class="mt-1 text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200"><i class="fa-solid fa-comment-dots mr-1"></i>Catatan: ${escapeHtml(rec.supervisorNote)}</p>` : ''}
        </td>
        <td class="py-3.5 px-4">
          ${getAssignmentStatusBadgeHtml(rec.assignmentStatus)}
        </td>
        <td class="py-3.5 px-4 text-right whitespace-nowrap space-x-1">
          ${canModify ? `
            <button onclick="openAttendanceForRecord('${rec.id}')" class="px-2.5 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-[11px]" title="Rekam Absen & Laporan">
              <i class="fa-solid fa-fingerprint mr-1"></i> Absen
            </button>
            <button onclick="openEditFwaModal('${rec.id}')" class="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px]" title="Ubah Data">
              <i class="fa-solid fa-pen"></i>
            </button>
          ` : `
            <span class="text-[10px] text-slate-400 font-semibold px-2 py-1 rounded bg-slate-50 border border-slate-200" title="Hanya pemilik jadwal atau Atasan/Katimker yang dapat mengubah">
              <i class="fa-solid fa-lock mr-1"></i> Terkunci
            </span>
          `}
          ${canDelete ? `
            <button onclick="deleteFwaRecord('${rec.id}')" class="px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-[11px]" title="Hapus">
              <i class="fa-solid fa-trash"></i>
            </button>
          ` : ''}
        </td>
      </tr>
    `;
  }).join('');
}

// ============================================================================
// TAB 3: ABSENSI (MASUK & PULANG), TEMPAT, & BUKTI LINK LAPORAN FWA
// ============================================================================
function populateAttendanceAssignmentDropdown(selectedRecordId = null) {
  const select = document.getElementById('attendanceAssignmentSelect');
  if (!select) return;

  // Filter jadwal absensi sesuai Hak Akses pengguna aktif
  const accessibleRecords = fwaRecords.filter(r => canCurrentUserModifyRecord(r));
  const sorted = [...accessibleRecords].sort((a, b) => b.date.localeCompare(a.date));
  const currentVal = selectedRecordId || select.value;

  if (sorted.length === 0) {
    select.innerHTML = `<option value="">-- Belum ada jadwal FWA untuk akun Anda --</option>`;
    return;
  }

  select.innerHTML = sorted.map(rec => {
    const emp = getEmployeeById(rec.employeeId);
    return `<option value="${rec.id}">${formatDateIndoShort(rec.date)} — ${emp ? emp.name : '-'} (${rec.fwaType})</option>`;
  }).join('');

  if (currentVal && sorted.some(r => r.id === currentVal)) {
    select.value = currentVal;
  } else {
    // Prefer record belonging to current active user if available
    const userRec = sorted.find(r => r.employeeId === currentUserId);
    if (userRec) select.value = userRec.id;
  }

  loadSelectedAttendanceCard();
}

function openAttendanceForRecord(recordId) {
  switchTab('absensi');
  populateAttendanceAssignmentDropdown(recordId);
}

function loadSelectedAttendanceCard() {
  const select = document.getElementById('attendanceAssignmentSelect');
  if (!select || !select.value) return;

  const rec = fwaRecords.find(r => r.id === select.value);
  if (!rec) return;

  const emp = getEmployeeById(rec.employeeId);
  const breakMins = getBreakMinutesForDate(rec.date);

  document.getElementById('attCardEmpName').textContent = emp ? emp.name : '-';
  document.getElementById('attCardEmpNip').textContent = emp ? `NIP. ${emp.nip} • ${emp.unit}` : '-';
  document.getElementById('attCardFwaBadge').textContent = rec.fwaType;
  document.getElementById('attCardDate').textContent = formatDateIndoFull(rec.date);
  document.getElementById('attCardBreakInfo').textContent = breakMins === 90 ? '90 Menit (Jumat)' : '30 Menit (Senin-Kamis)';

  // Populate right-hand form fields
  document.getElementById('formCheckInTime').value = rec.checkIn || '';
  document.getElementById('formCheckOutTime').value = rec.checkOut || '';
  document.getElementById('formLocationCategory').value = rec.locationCategory || 'Rumah / Tempat Tinggal (WFH)';
  document.getElementById('formLocationDetail').value = rec.locationDetail || '';
  const respEl = document.getElementById('formResponseTime');
  if (respEl) respEl.value = rec.responseTime || 'Ya (< 15 Menit)';
  document.getElementById('formActivitySummary').value = rec.activitySummary || '';
  document.getElementById('formReportLink').value = rec.reportLink || '';
  document.getElementById('formFeedbackStatus').textContent = '';

  renderAttendancePhotoThumbnails(rec);
  previewDurationCalculation();
}

function renderAttendancePhotoThumbnails(rec) {
  const inBox = document.getElementById('attPhotoInBox');
  const outBox = document.getElementById('attPhotoOutBox');
  if (!inBox || !outBox) return;

  if (rec.photoCheckIn) {
    inBox.innerHTML = `
      <img src="${rec.photoCheckIn}" onclick="openPhotoViewer('${rec.id}', 'IN')" class="w-full h-full object-cover cursor-pointer hover:opacity-90 transition" title="Klik untuk memperbesar Foto Absen Masuk" />
      <span class="absolute bottom-1 right-1 bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
        <i class="fa-solid fa-location-dot mr-0.5"></i> Geotag OK
      </span>
    `;
  } else {
    inBox.innerHTML = `
      <i class="fa-solid fa-camera-retro text-slate-400 text-xl mb-1"></i>
      <span class="text-[10px] text-slate-500">Belum ada foto</span>
    `;
  }

  if (rec.photoCheckOut) {
    outBox.innerHTML = `
      <img src="${rec.photoCheckOut}" onclick="openPhotoViewer('${rec.id}', 'OUT')" class="w-full h-full object-cover cursor-pointer hover:opacity-90 transition" title="Klik untuk memperbesar Foto Absen Pulang" />
      <span class="absolute bottom-1 right-1 bg-amber-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
        <i class="fa-solid fa-location-dot mr-0.5"></i> Geotag OK
      </span>
    `;
  } else {
    outBox.innerHTML = `
      <i class="fa-solid fa-camera-retro text-slate-400 text-xl mb-1"></i>
      <span class="text-[10px] text-slate-500">Belum ada foto</span>
    `;
  }
}

function previewDurationCalculation() {
  const select = document.getElementById('attendanceAssignmentSelect');
  const rec = fwaRecords.find(r => r.id === select?.value);
  const dateStr = rec ? rec.date : '2026-10-30';

  const checkIn = document.getElementById('formCheckInTime').value;
  const checkOut = document.getElementById('formCheckOutTime').value;

  document.getElementById('attCardCheckInDisplay').textContent = checkIn || '--:--';
  document.getElementById('attCardCheckOutDisplay').textContent = checkOut || '--:--';

  const inEval = evaluateCheckInStatus(checkIn);
  const checkInBadge = document.getElementById('attCardCheckInStatus');
  checkInBadge.textContent = inEval.label;
  checkInBadge.className = `inline-block text-[10px] px-2 py-0.5 rounded-full font-bold ${inEval.badgeClass}`;

  const minOut = calculateMinCheckOutTime(checkIn, dateStr);
  document.getElementById('attCardMinCheckoutHint').textContent = `Min. Pulang (7,5j): ${minOut}`;
  document.getElementById('formHelperMinCheckout').textContent = `Minimal jam pulang untuk memenuhi 7,5 jam kerja efektif: ${minOut}`;

  const dur = calculateEffectiveWorkDuration(checkIn, checkOut, dateStr);
  document.getElementById('attCardDurationText').textContent = dur.formattedLong;

  const pct = Math.min(100, Math.round((dur.totalMinutes / 450) * 100));
  const bar = document.getElementById('attCardDurationBar');
  bar.style.width = `${pct}%`;
  bar.className = `h-full transition-all duration-300 ${dur.isCompliant ? 'bg-lime-400' : 'bg-amber-400'}`;

  const compBadge = document.getElementById('attCardWorkComplianceBadge');
  compBadge.textContent = dur.statusLabel;
  compBadge.className = dur.isCompliant ? 'text-lime-300 font-bold' : 'text-amber-300 font-semibold';
}

// ============================================================================
// GEOTAGGED PHOTO CAMERA & WATERMARK ENGINE (HTML5 WEBRTC + CANVAS)
// ============================================================================
let cameraMode = 'IN'; // 'IN' atau 'OUT'
let activeMediaStream = null;
let currentGpsInfo = {
  coordsText: '-8.4932, 140.4018 (BKK Kelas II Merauke)',
  isRealGps: false
};
let capturedWatermarkedDataUrl = null;

function openCameraAttendanceModal(mode) {
  const select = document.getElementById('attendanceAssignmentSelect');
  const rec = fwaRecords.find(r => r.id === select?.value);
  if (!rec) {
    alert('Pilih jadwal penugasan FWA terlebih dahulu.');
    return;
  }
  if (!canCurrentUserModifyRecord(rec)) {
    alert('Akses Ditolak: Anda tidak berhak mengambil foto absensi untuk jadwal pegawai lain.');
    return;
  }

  cameraMode = mode;
  capturedWatermarkedDataUrl = null;

  const emp = getEmployeeById(rec.employeeId);
  const titleEl = document.getElementById('cameraModalTitle');
  const subEl = document.getElementById('cameraModalSubtitle');
  if (titleEl) {
    titleEl.textContent = mode === 'IN'
      ? 'Foto Absen Masuk FWA (Geotagging & Waktu)'
      : 'Foto Absen Pulang FWA (Geotagging & Waktu)';
  }
  if (subEl) {
    subEl.textContent = `${emp ? emp.name : '-'} • ${rec.fwaType}`;
  }

  document.getElementById('btnConfirmPhotoAttendance').disabled = true;
  document.getElementById('btnCapturePhoto').classList.remove('hidden');
  document.getElementById('btnRetakePhoto').classList.add('hidden');
  document.getElementById('cameraPhotoCanvas').classList.add('hidden');
  document.getElementById('cameraVideoStream').classList.remove('hidden');
  document.getElementById('cameraFallbackNotice').classList.add('hidden');

  document.getElementById('cameraAttendanceModal').classList.remove('hidden');

  updateCameraLiveTimestamp();
  refreshCameraGpsLocation();
  startLiveWebcamStream();
}

function updateCameraLiveTimestamp() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const dateStr = now.toLocaleDateString('id-ID', { weekday: 'long', day: '2-digit', month: 'short', year: 'numeric' });
  const el = document.getElementById('cameraLiveTimeText');
  if (el) el.textContent = `Waktu Rekam: ${dateStr} — Pukul ${timeStr}`;
}

function refreshCameraGpsLocation() {
  const gpsEl = document.getElementById('cameraGpsCoordsText');
  if (gpsEl) gpsEl.textContent = 'Mendeteksi titik koordinat GPS perangkat...';

  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude.toFixed(5);
        const lng = pos.coords.longitude.toFixed(5);
        const acc = Math.round(pos.coords.accuracy || 15);
        currentGpsInfo = {
          coordsText: `Lat: ${lat}, Long: ${lng} (±${acc}m GPS)`,
          isRealGps: true
        };
        if (gpsEl) gpsEl.textContent = currentGpsInfo.coordsText;
      },
      () => {
        const select = document.getElementById('attendanceAssignmentSelect');
        const rec = fwaRecords.find(r => r.id === select?.value);
        const emp = rec ? getEmployeeById(rec.employeeId) : null;
        const unitLabel = emp ? emp.unit : 'Merauke, Papua Selatan';
        currentGpsInfo = {
          coordsText: `Lat: -8.49320, Long: 140.40180 (${unitLabel})`,
          isRealGps: false
        };
        if (gpsEl) gpsEl.textContent = currentGpsInfo.coordsText;
      },
      { enableHighAccuracy: true, timeout: 6000, maximumAge: 30000 }
    );
  } else {
    currentGpsInfo = {
      coordsText: 'Lat: -8.49320, Long: 140.40180 (Merauke)',
      isRealGps: false
    };
    if (gpsEl) gpsEl.textContent = currentGpsInfo.coordsText;
  }
}

async function startLiveWebcamStream() {
  stopLiveWebcamStream();
  const video = document.getElementById('cameraVideoStream');
  const fallback = document.getElementById('cameraFallbackNotice');

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    if (fallback) fallback.classList.remove('hidden');
    return;
  }

  try {
    activeMediaStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user', width: { ideal: 720 }, height: { ideal: 540 } },
      audio: false
    });
    if (video) {
      video.srcObject = activeMediaStream;
      await video.play();
    }
  } catch (err) {
    if (fallback) fallback.classList.remove('hidden');
  }
}

function stopLiveWebcamStream() {
  if (activeMediaStream) {
    activeMediaStream.getTracks().forEach(track => track.stop());
    activeMediaStream = null;
  }
}

function closeCameraAttendanceModal() {
  stopLiveWebcamStream();
  document.getElementById('cameraAttendanceModal').classList.add('hidden');
}

function retakeCameraPhoto() {
  capturedWatermarkedDataUrl = null;
  document.getElementById('btnConfirmPhotoAttendance').disabled = true;
  document.getElementById('btnCapturePhoto').classList.remove('hidden');
  document.getElementById('btnRetakePhoto').classList.add('hidden');
  document.getElementById('cameraPhotoCanvas').classList.add('hidden');
  document.getElementById('cameraVideoStream').classList.remove('hidden');
  startLiveWebcamStream();
}

function captureGeotaggedPhoto() {
  const video = document.getElementById('cameraVideoStream');
  if (!video || !video.srcObject) {
    alert('Kamera langsung belum aktif. Silakan klik tombol "File Kamera" untuk memilih/memotret foto.');
    return;
  }
  renderWatermarkedCanvasFromSource(video, video.videoWidth || 640, video.videoHeight || 480);
  stopLiveWebcamStream();
}

function handleFallbackPhotoUpload(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      document.getElementById('cameraFallbackNotice').classList.add('hidden');
      renderWatermarkedCanvasFromSource(img, img.width, img.height);
      stopLiveWebcamStream();
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
  event.target.value = '';
}

/**
 * Menggambar foto ke Canvas (kompresi 640x480) dan menempelkan Watermark Geotagging & Timestamp Kemenkes
 */
function renderWatermarkedCanvasFromSource(sourceEl, srcWidth, srcHeight) {
  const canvas = document.getElementById('cameraPhotoCanvas');
  if (!canvas) return;

  const targetW = 640;
  const targetH = 480;
  canvas.width = targetW;
  canvas.height = targetH;
  const ctx = canvas.getContext('2d');

  // Gambar foto proporsional (object-cover)
  const scale = Math.max(targetW / srcWidth, targetH / srcHeight);
  const drawW = srcWidth * scale;
  const drawH = srcHeight * scale;
  const offsetX = (targetW - drawW) / 2;
  const offsetY = (targetH - drawH) / 2;

  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, targetW, targetH);
  ctx.drawImage(sourceEl, offsetX, offsetY, drawW, drawH);

  // Ambil metadata jadwal & pegawai
  const select = document.getElementById('attendanceAssignmentSelect');
  const rec = fwaRecords.find(r => r.id === select?.value);
  const emp = rec ? getEmployeeById(rec.employeeId) : getCurrentUser();
  const locDetail = document.getElementById('formLocationDetail')?.value || (rec ? rec.locationDetail : '-');

  const now = new Date();
  const timeStamp = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const dateStamp = now.toLocaleDateString('id-ID', { weekday: 'long', day: '2-digit', month: 'short', year: 'numeric' });
  const modeLabel = cameraMode === 'IN' ? 'ABSEN MASUK FWA' : 'ABSEN PULANG FWA';

  // Gambar blok semi-transparan di bagian bawah foto untuk Watermark Geotagging
  const boxH = 128;
  const boxY = targetH - boxH;
  const grad = ctx.createLinearGradient(0, boxY - 20, 0, targetH);
  grad.addColorStop(0, 'rgba(0, 35, 32, 0.0)');
  grad.addColorStop(0.2, 'rgba(0, 35, 32, 0.82)');
  grad.addColorStop(1, 'rgba(0, 25, 23, 0.95)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, boxY - 20, targetW, boxH + 20);

  // Garis aksen kiri hijau limau Kemenkes
  ctx.fillStyle = cameraMode === 'IN' ? '#a3e635' : '#f59e0b';
  ctx.fillRect(14, boxY + 6, 5, boxH - 18);

  // Badge Header Watermark
  ctx.font = 'bold 13px sans-serif';
  ctx.fillStyle = cameraMode === 'IN' ? '#bef264' : '#fde68a';
  ctx.fillText(`e-FWA BKK MERAUKE • ${modeLabel} (${rec ? rec.fwaType : 'FWA'})`, 28, boxY + 22);

  // Nama & NIP Pegawai
  ctx.font = 'bold 15px sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(`${emp ? emp.name : '-'}  |  NIP. ${emp ? emp.nip : '-'}`, 28, boxY + 44);

  // Tanggal & Waktu Presisi
  ctx.font = 'bold 13px monospace';
  ctx.fillStyle = '#99f6e4';
  ctx.fillText(`WAKTU  : ${dateStamp} • Pukul ${timeStamp} WIT`, 28, boxY + 66);

  // Koordinat GPS
  ctx.font = '12px monospace';
  ctx.fillStyle = '#e2e8f0';
  ctx.fillText(`KOORD  : ${currentGpsInfo.coordsText}`, 28, boxY + 86);

  // Nama Lokasi / Tempat FWA
  const cleanLoc = locDetail.length > 68 ? locDetail.slice(0, 68) + '...' : locDetail;
  ctx.font = '12px sans-serif';
  ctx.fillStyle = '#cbd5e1';
  ctx.fillText(`LOKASI : ${cleanLoc}`, 28, boxY + 106);

  // Simpan sebagai JPEG terkompresi agar hemat penyimpanan localStorage
  capturedWatermarkedDataUrl = canvas.toDataURL('image/jpeg', 0.72);

  document.getElementById('cameraVideoStream').classList.add('hidden');
  canvas.classList.remove('hidden');
  document.getElementById('btnCapturePhoto').classList.add('hidden');
  document.getElementById('btnRetakePhoto').classList.remove('hidden');
  document.getElementById('btnConfirmPhotoAttendance').disabled = false;
}

async function confirmAndSavePhotoAttendance() {
  if (!capturedWatermarkedDataUrl) return;

  const select = document.getElementById('attendanceAssignmentSelect');
  const recIndex = fwaRecords.findIndex(r => r.id === select?.value);
  if (recIndex === -1) return;

  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const timeVal = `${hh}:${mm}`;

  let storedPhotoUrl = capturedWatermarkedDataUrl;
  if (typeof uploadPhotoToSupabase === 'function' && isSupabaseEnabled()) {
    showToast('Mengunggah foto geotag ke Supabase Storage...');
    storedPhotoUrl = await uploadPhotoToSupabase(fwaRecords[recIndex].id, cameraMode, capturedWatermarkedDataUrl);
  }

  if (cameraMode === 'IN') {
    document.getElementById('formCheckInTime').value = timeVal;
    fwaRecords[recIndex].checkIn = timeVal;
    fwaRecords[recIndex].photoCheckIn = storedPhotoUrl;
    fwaRecords[recIndex].gpsCheckIn = currentGpsInfo.coordsText;
  } else {
    document.getElementById('formCheckOutTime').value = timeVal;
    fwaRecords[recIndex].checkOut = timeVal;
    fwaRecords[recIndex].photoCheckOut = storedPhotoUrl;
    fwaRecords[recIndex].gpsCheckOut = currentGpsInfo.coordsText;
  }

  // Sematkan koordinat GPS ke kolom detail tempat FWA jika belum ada
  const locInput = document.getElementById('formLocationDetail');
  if (locInput && !locInput.value.includes('Lat:')) {
    locInput.value = `${locInput.value} [${currentGpsInfo.coordsText}]`.trim();
    fwaRecords[recIndex].locationDetail = locInput.value;
  }

  saveStateToStorage();
  if (typeof upsertFwaRecordToSupabase === 'function') {
    upsertFwaRecordToSupabase(fwaRecords[recIndex]);
  }
  renderAttendancePhotoThumbnails(fwaRecords[recIndex]);
  previewDurationCalculation();
  refreshAllViews();
  closeCameraAttendanceModal();

  showToast(`Foto Geotag & ${cameraMode === 'IN' ? 'Absen Masuk' : 'Absen Pulang'} (${timeVal}) berhasil direkam!`);
}

function openPhotoViewer(recordId, mode) {
  const rec = fwaRecords.find(r => r.id === recordId);
  if (!rec) return;
  const emp = getEmployeeById(rec.employeeId);
  const photoData = mode === 'IN' ? rec.photoCheckIn : rec.photoCheckOut;
  if (!photoData) {
    alert('Belum ada bukti foto pada absensi ini.');
    return;
  }

  document.getElementById('photoViewerTitle').textContent = mode === 'IN'
    ? `Bukti Foto Absen Masuk FWA — ${emp ? emp.name : '-'}`
    : `Bukti Foto Absen Pulang FWA — ${emp ? emp.name : '-'}`;
  document.getElementById('photoViewerSubtitle').textContent = `Tanggal: ${formatDateIndoFull(rec.date)} • Lokasi: ${rec.locationDetail}`;
  document.getElementById('photoViewerImage').src = photoData;

  const dlBtn = document.getElementById('photoViewerDownloadBtn');
  if (dlBtn) {
    dlBtn.href = photoData;
    dlBtn.download = `Foto_Absen_${mode}_${emp ? emp.nip : 'ASN'}_${rec.date}.jpg`;
  }

  document.getElementById('photoViewerModal').classList.remove('hidden');
}

function closePhotoViewerModal() {
  document.getElementById('photoViewerModal').classList.add('hidden');
}

function simulateGeoLocation() {
  refreshCameraGpsLocation();
  const locInput = document.getElementById('formLocationDetail');
  setTimeout(() => {
    const coords = currentGpsInfo.coordsText;
    if (!locInput.value.includes('Lat:')) {
      locInput.value = locInput.value
        ? `${locInput.value} [${coords}]`
        : `Lokasi Pelaksanaan FWA [${coords}]`;
    }
    showToast('Titik koordinat GPS lokasi FWA berhasil disematkan');
  }, 400);
}

function saveAttendanceAndReport(event) {
  event.preventDefault();
  const select = document.getElementById('attendanceAssignmentSelect');
  const recIndex = fwaRecords.findIndex(r => r.id === select?.value);
  if (recIndex === -1) return;

  if (!canCurrentUserModifyRecord(fwaRecords[recIndex])) {
    alert('Akses Ditolak: Anda tidak memiliki izin untuk mengubah presensi/laporan milik pegawai ini.');
    return;
  }

  const checkInVal = document.getElementById('formCheckInTime').value;
  const checkOutVal = document.getElementById('formCheckOutTime').value;
  const reportLinkVal = document.getElementById('formReportLink').value.trim();

  if (checkOutVal && !checkInVal) {
    alert('Jam Masuk wajib diisi sebelum mengisi Jam Pulang.');
    return;
  }
  if (checkInVal && checkOutVal && timeToMinutes(checkOutVal) <= timeToMinutes(checkInVal)) {
    alert('Jam Pulang harus lebih besar (setelah) dari Jam Masuk.');
    return;
  }
  if (reportLinkVal && !sanitizeUrl(reportLinkVal)) {
    alert('Tautan Bukti Laporan harus berupa URL valid yang diawali http:// atau https://');
    return;
  }

  fwaRecords[recIndex].checkIn = checkInVal;
  fwaRecords[recIndex].checkOut = checkOutVal;
  fwaRecords[recIndex].locationCategory = document.getElementById('formLocationCategory').value;
  const respEl = document.getElementById('formResponseTime');
  if (respEl) fwaRecords[recIndex].responseTime = respEl.value;
  fwaRecords[recIndex].locationDetail = document.getElementById('formLocationDetail').value.trim();
  fwaRecords[recIndex].activitySummary = document.getElementById('formActivitySummary').value.trim();
  fwaRecords[recIndex].reportLink = reportLinkVal;

  // If previously rejected/revision, set back to waiting verification
  if (fwaRecords[recIndex].verificationStatus === 'Perlu Revisi') {
    fwaRecords[recIndex].verificationStatus = 'Menunggu Verifikasi';
  }

  saveStateToStorage();
  if (typeof upsertFwaRecordToSupabase === 'function') {
    upsertFwaRecordToSupabase(fwaRecords[recIndex]);
  }
  previewDurationCalculation();
  refreshAllViews();

  const feedback = document.getElementById('formFeedbackStatus');
  feedback.innerHTML = `<i class="fa-solid fa-circle-check mr-1"></i> Tersimpan! Data presensi, respons komunikasi, & link laporan telah diperbarui.`;
  showToast('Rekam kehadiran & bukti link laporan FWA berhasil disimpan');
}

// ============================================================================
// TAB 4: VERIFIKASI ATASAN / KETUA TIM KERJA
// ============================================================================
function renderVerificationTab() {
  // 1. Pending Schedule Assignments (Filter sesuai wewenang Atasan / Katimker)
  const pendingBody = document.getElementById('verificationPendingAssignmentsBody');
  const pendingList = fwaRecords.filter(r => r.assignmentStatus === 'Diajukan' && canCurrentUserVerifyRecord(r));

  if (pendingBody) {
    if (pendingList.length === 0) {
      pendingBody.innerHTML = `
        <tr>
          <td colspan="6" class="py-5 text-center text-slate-400">
            <i class="fa-solid fa-circle-check text-emerald-600 mr-1"></i> Seluruh pengajuan jadwal FWA di unit kewenangan Anda telah diproses.
          </td>
        </tr>
      `;
    } else {
      pendingBody.innerHTML = pendingList.map(rec => {
        const emp = getEmployeeById(rec.employeeId);
        return `
          <tr class="hover:bg-slate-50">
            <td class="py-3 px-3 font-bold text-slate-900">${formatDateIndoShort(rec.date)}</td>
            <td class="py-3 px-3">
              <div class="font-bold text-slate-900">${escapeHtml(emp ? emp.name : '-')}</div>
              <div class="text-[11px] text-slate-500 font-mono">${escapeHtml(emp ? emp.nip : '-')}</div>
            </td>
            <td class="py-3 px-3">
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${getFwaTypeBadgeClass(rec.fwaType)}">${escapeHtml(rec.fwaType)}</span>
            </td>
            <td class="py-3 px-3">
              <div class="font-semibold text-slate-800">${escapeHtml(rec.locationDetail)}</div>
              <div class="text-[10px] text-slate-500">${escapeHtml(rec.locationCategory)}</div>
            </td>
            <td class="py-3 px-3 max-w-[240px] text-slate-700">${escapeHtml(rec.activitySummary || '-')}</td>
            <td class="py-3 px-3 text-right whitespace-nowrap space-x-1">
              <button onclick="decideAssignment('${rec.id}', 'Disetujui')" class="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px]">
                <i class="fa-solid fa-check mr-1"></i> Setujui
              </button>
              <button onclick="openSupervisorNoteModal('ASSIGNMENT', '${rec.id}', 'Ditolak')" class="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-[11px]">
                <i class="fa-solid fa-xmark mr-1"></i> Tolak
              </button>
            </td>
          </tr>
        `;
      }).join('');
    }
  }

  // 2. Daily Attendance & Link Report Verification
  const reportsBody = document.getElementById('verificationReportsTableBody');
  const statusFilter = document.getElementById('filterVerifyReportStatus')?.value || 'ALL';

  if (reportsBody) {
    const approvedAssignments = fwaRecords.filter(r => {
      if (r.assignmentStatus !== 'Disetujui') return false;
      if (!canCurrentUserVerifyRecord(r)) return false;
      if (statusFilter !== 'ALL' && r.verificationStatus !== statusFilter) return false;
      return true;
    }).sort((a, b) => b.date.localeCompare(a.date));

    if (approvedAssignments.length === 0) {
      reportsBody.innerHTML = `
        <tr>
          <td colspan="6" class="py-6 text-center text-slate-400">Tidak ada laporan pelaksanaan FWA pada filter/unit kewenangan ini.</td>
        </tr>
      `;
    } else {
      reportsBody.innerHTML = approvedAssignments.map(rec => {
        const emp = getEmployeeById(rec.employeeId);
        const dur = calculateEffectiveWorkDuration(rec.checkIn, rec.checkOut, rec.date);
        const inEval = evaluateCheckInStatus(rec.checkIn);

        const safeReportUrl = sanitizeUrl(rec.reportLink);
        return `
          <tr class="hover:bg-slate-50">
            <td class="py-3.5 px-3">
              <div class="font-bold text-teal-800">${formatDateIndoShort(rec.date)}</div>
              <div class="font-bold text-slate-900 mt-0.5">${escapeHtml(emp ? emp.name : '-')}</div>
              <div class="text-[10px] text-slate-500 font-mono">${escapeHtml(emp ? emp.nip : '-')}</div>
            </td>
            <td class="py-3.5 px-3 max-w-[210px]">
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${getFwaTypeBadgeClass(rec.fwaType)}">${escapeHtml(rec.fwaType)}</span>
              <div class="font-semibold text-slate-800 mt-1">${escapeHtml(rec.locationDetail)}</div>
              <div class="text-[10px] text-slate-500">${escapeHtml(rec.locationCategory)}</div>
            </td>
            <td class="py-3.5 px-3">
              ${rec.checkIn ? `
                <div class="font-bold text-slate-900">Masuk: ${escapeHtml(rec.checkIn)} | Pulang: ${escapeHtml(rec.checkOut || '--:--')} WIT</div>
                <div class="flex flex-wrap gap-1 mt-1">
                  <span class="px-1.5 py-0.5 rounded text-[10px] font-bold ${inEval.badgeClass}">${inEval.label}</span>
                  <span class="px-1.5 py-0.5 rounded text-[10px] font-bold ${dur.badgeClass}">${dur.formatted} (${dur.statusLabel})</span>
                </div>
                <div class="mt-1 text-[10px] font-semibold text-emerald-700">
                  <i class="fa-solid fa-phone-volume mr-1"></i>Respons: ${escapeHtml(rec.responseTime || '< 15 Menit (Sangat Cepat / On-Call)')}
                </div>
                <div class="flex flex-wrap gap-1.5 mt-1.5">
                  ${rec.photoCheckIn ? `
                    <button type="button" onclick="openPhotoViewer('${rec.id}', 'IN')" class="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-teal-100 hover:bg-teal-200 text-teal-900 font-bold text-[10px]">
                      <i class="fa-solid fa-camera"></i> Foto Masuk
                    </button>
                  ` : ''}
                  ${rec.photoCheckOut ? `
                    <button type="button" onclick="openPhotoViewer('${rec.id}', 'OUT')" class="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-[10px]">
                      <i class="fa-solid fa-camera"></i> Foto Pulang
                    </button>
                  ` : ''}
                </div>
              ` : `<span class="text-rose-600 font-semibold">Belum Rekam Kehadiran</span>`}
            </td>
            <td class="py-3.5 px-3 max-w-[260px]">
              <p class="text-slate-700 mb-1.5">${escapeHtml(rec.activitySummary || '-')}</p>
              ${rec.supervisorNote ? `<p class="mb-1.5 text-[10px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200"><i class="fa-solid fa-comment-dots mr-1"></i>Catatan: ${escapeHtml(rec.supervisorNote)}</p>` : ''}
              ${safeReportUrl ? `
                <a href="${safeReportUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 font-bold text-[11px]">
                  <i class="fa-solid fa-link"></i> Buka Link Laporan FWA
                </a>
              ` : `<span class="inline-block px-2 py-0.5 rounded bg-rose-50 text-rose-600 font-semibold text-[10px]">Link Bukti Belum Diunggah</span>`}
            </td>
            <td class="py-3.5 px-3">
              ${getVerificationBadgeHtml(rec.verificationStatus, rec.assignmentStatus)}
            </td>
            <td class="py-3.5 px-3 text-right whitespace-nowrap space-x-1">
              <button onclick="verifyFwaReport('${rec.id}', 'Disetujui')" class="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px]" title="Setujui Laporan">
                <i class="fa-solid fa-check mr-1"></i> Valid
              </button>
              <button onclick="openSupervisorNoteModal('REPORT', '${rec.id}', 'Perlu Revisi')" class="px-2.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-bold text-[11px]" title="Minta Revisi">
                <i class="fa-solid fa-rotate-left mr-1"></i> Revisi
              </button>
            </td>
          </tr>
        `;
      }).join('');
    }
  }
}

function openSupervisorNoteModal(actionType, recordId, targetStatus) {
  const rec = fwaRecords.find(r => r.id === recordId);
  if (!rec || !canCurrentUserVerifyRecord(rec)) {
    alert('Akses Ditolak: Anda tidak memiliki wewenang memproses data ini.');
    return;
  }
  document.getElementById('supNoteActionType').value = actionType;
  document.getElementById('supNoteRecordId').value = recordId;
  document.getElementById('supNoteTargetStatus').value = targetStatus;
  document.getElementById('supNoteTextarea').value = rec.supervisorNote || '';

  const titleEl = document.getElementById('supervisorNoteModalTitle');
  const btnEl = document.getElementById('supNoteSubmitBtn');
  if (targetStatus === 'Ditolak') {
    if (titleEl) titleEl.textContent = 'Alasan Penolakan Penugasan FWA';
    if (btnEl) btnEl.className = 'px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm';
  } else {
    if (titleEl) titleEl.textContent = 'Catatan Revisi Laporan FWA';
    if (btnEl) btnEl.className = 'px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-sm';
  }
  document.getElementById('supervisorNoteModal').classList.remove('hidden');
}

function closeSupervisorNoteModal() {
  document.getElementById('supervisorNoteModal').classList.add('hidden');
}

function submitSupervisorNoteDecision(event) {
  event.preventDefault();
  const actionType = document.getElementById('supNoteActionType').value;
  const recordId = document.getElementById('supNoteRecordId').value;
  const targetStatus = document.getElementById('supNoteTargetStatus').value;
  const note = document.getElementById('supNoteTextarea').value.trim();

  if (actionType === 'ASSIGNMENT') {
    decideAssignment(recordId, targetStatus, note);
  } else {
    verifyFwaReport(recordId, targetStatus, note);
  }
  closeSupervisorNoteModal();
}

function decideAssignment(recordId, decision, note = '') {
  const idx = fwaRecords.findIndex(r => r.id === recordId);
  if (idx === -1) return;
  if (!canCurrentUserVerifyRecord(fwaRecords[idx])) {
    alert('Akses Ditolak: Anda tidak memiliki wewenang untuk menyetujui/menolak jadwal ini.');
    return;
  }
  if (decision === 'Disetujui' && isFlexiPlaceType(fwaRecords[idx].fwaType)) {
    const maxQuota = Math.floor(employees.length * 0.5);
    const currentUsed = fwaRecords.filter(r =>
      r.id !== recordId && r.date === fwaRecords[idx].date && r.assignmentStatus === 'Disetujui' && isFlexiPlaceType(r.fwaType)
    ).length;
    if (currentUsed + 1 > maxQuota) {
      if (!confirm(`Peringatan Kuota 50% (Diktum KEEMPAT SK): Jumlah WFH/WFA pada ${formatDateIndoShort(fwaRecords[idx].date)} akan menjadi ${currentUsed + 1}/${maxQuota} pegawai. Tetap setujui?`)) {
        return;
      }
    }
  }
  fwaRecords[idx].assignmentStatus = decision;
  if (note) fwaRecords[idx].supervisorNote = note;
  saveStateToStorage();
  if (typeof upsertFwaRecordToSupabase === 'function') {
    upsertFwaRecordToSupabase(fwaRecords[idx]);
  }
  refreshAllViews();
  showToast(`Status penugasan FWA diubah menjadi: ${decision}`);
}

function verifyFwaReport(recordId, status, note = '') {
  const idx = fwaRecords.findIndex(r => r.id === recordId);
  if (idx === -1) return;
  if (!canCurrentUserVerifyRecord(fwaRecords[idx])) {
    alert('Akses Ditolak: Anda tidak memiliki wewenang memverifikasi laporan ini.');
    return;
  }
  fwaRecords[idx].verificationStatus = status;
  if (note) {
    fwaRecords[idx].supervisorNote = note;
  } else if (status === 'Disetujui' && !fwaRecords[idx].supervisorNote) {
    fwaRecords[idx].supervisorNote = 'Valid / Disetujui.';
  }
  saveStateToStorage();
  if (typeof upsertFwaRecordToSupabase === 'function') {
    upsertFwaRecordToSupabase(fwaRecords[idx]);
  }
  refreshAllViews();
  showToast(`Status verifikasi bukti laporan FWA: ${status}`);
}

function approveAllPendingReports() {
  if (getCurrentAccessLevel() === 'PEGAWAI') {
    alert('Akses Ditolak: Hanya Atasan atau Katimker yang dapat menyetujui laporan.');
    return;
  }
  let count = 0;
  const updated = [];
  fwaRecords.forEach(r => {
    if (canCurrentUserVerifyRecord(r) && r.assignmentStatus === 'Disetujui' && r.verificationStatus === 'Menunggu Verifikasi' && r.checkIn && r.reportLink) {
      r.verificationStatus = 'Disetujui';
      if (!r.supervisorNote) r.supervisorNote = 'Valid / Disetujui.';
      updated.push(r);
      count++;
    }
  });
  saveStateToStorage();
  if (typeof upsertFwaRecordsBulkToSupabase === 'function' && updated.length > 0) {
    upsertFwaRecordsBulkToSupabase(updated);
  }
  refreshAllViews();
  showToast(`${count} laporan FWA yang memiliki bukti lengkap berhasil disetujui`);
}

// ============================================================================
// TAB 5: REKAP LAPORAN BULANAN PELAKSANAAN FWA (SESUAI LAMPIRAN II SK)
// ============================================================================
function getFilteredMonthlyRecords() {
  const monthVal = document.getElementById('recapFilterMonth')?.value || '2026-10';
  const unitVal = document.getElementById('recapFilterUnit')?.value || 'ALL';
  const empVal = document.getElementById('recapFilterEmployee')?.value || 'ALL';
  const typeVal = document.getElementById('recapFilterType')?.value || 'ALL';

  return fwaRecords.filter(r => {
    if (r.assignmentStatus === 'Ditolak') return false;
    if (monthVal && !r.date.startsWith(monthVal)) return false;
    if (empVal !== 'ALL' && r.employeeId !== empVal) return false;
    if (!matchesFwaTypeFilter(r.fwaType, typeVal)) return false;
    if (unitVal !== 'ALL') {
      const emp = getEmployeeById(r.employeeId);
      if (!emp || emp.unit !== unitVal) return false;
    }
    return true;
  }).sort((a, b) => a.date.localeCompare(b.date));
}

function renderMonthlyRecap() {
  const records = getFilteredMonthlyRecords();
  const monthVal = document.getElementById('recapFilterMonth')?.value || '2026-10';

  const printSubtitle = document.getElementById('printPeriodSubtitle');
  if (printSubtitle) {
    printSubtitle.textContent = `Periode Bulan: ${formatMonthIndo(monthVal)}`;
  }

  // Calculate Summary Stats
  const totalDays = records.length;
  const flexiTimeDays = records.filter(r => isFlexiTimeType(r.fwaType)).length;
  const flexiPlaceDays = records.filter(r => isFlexiPlaceType(r.fwaType)).length;

  let totalNetMinutes = 0;
  let countedAttendance = 0;
  let metDurationAndOutputCount = 0;
  let compliantResponseCount = 0;

  records.forEach(r => {
    const dur = calculateEffectiveWorkDuration(r.checkIn, r.checkOut, r.date);
    if (dur.totalMinutes > 0) {
      totalNetMinutes += dur.totalMinutes;
      countedAttendance++;
    }
    if (dur.isMet && r.reportLink && r.reportLink.trim() !== '') {
      metDurationAndOutputCount++;
    }
    const respStr = r.responseTime || '< 15 Menit (Sangat Cepat / On-Call)';
    if (!respStr.includes('> 60 Menit')) {
      compliantResponseCount++;
    }
  });

  const avgMinutes = countedAttendance > 0 ? Math.round(totalNetMinutes / countedAttendance) : 0;
  const avgH = Math.floor(avgMinutes / 60);
  const avgM = avgMinutes % 60;

  const verifiedCount = records.filter(r => r.verificationStatus === 'Disetujui').length;
  const verifiedPct = totalDays > 0 ? Math.round((verifiedCount / totalDays) * 100) : 100;

  document.getElementById('recapStatTotalDays').textContent = `${totalDays} Hari`;
  document.getElementById('recapStatFlexiTime').textContent = `${flexiTimeDays} Hari`;
  document.getElementById('recapStatFlexiPlace').textContent = `${flexiPlaceDays} Hari`;
  document.getElementById('recapStatAvgHours').textContent = `${avgH}j ${avgM}m`;
  document.getElementById('recapStatVerifiedPct').textContent = `${verifiedPct}%`;

  // 0. Render Tabel 2 Lampiran II SK: Dashboard Indikator Keberhasilan Pelaksanaan FWA Bulanan
  const kpiBody = document.getElementById('recapKpiIndicatorsBody');
  if (kpiBody) {
    // Hitung jumlah unik pegawai yang merasakan FWA pada bulan tersebut
    const monthAllRecords = fwaRecords.filter(r => r.assignmentStatus !== 'Ditolak' && r.date.startsWith(monthVal));
    const uniqueEmpCount = new Set(monthAllRecords.map(r => r.employeeId)).size;
    const totalEmpCount = employees.length || 33;
    // Hitung kuota harian tertinggi pada bulan tersebut
    const byDateCount = {};
    monthAllRecords.forEach(r => {
      if (isFlexiPlaceType(r.fwaType)) {
        byDateCount[r.date] = (byDateCount[r.date] || 0) + 1;
      }
    });
    const maxDailyPlace = Object.values(byDateCount).length > 0 ? Math.max(...Object.values(byDateCount)) : 0;
    const maxDailyQuotaPct = Math.round((maxDailyPlace / totalEmpCount) * 100);
    const outputAchPct = totalDays > 0 ? Math.round((metDurationAndOutputCount / totalDays) * 100) : 100;
    const responseAchPct = totalDays > 0 ? Math.round((compliantResponseCount / totalDays) * 100) : 100;

    kpiBody.innerHTML = `
      <tr class="hover:bg-slate-50">
        <td class="py-2.5 px-3 font-bold text-slate-700">1</td>
        <td class="py-2.5 px-3 font-bold text-slate-900">Tingkat Inklusivitas FWA</td>
        <td class="py-2.5 px-3 text-slate-600">Persentase ASN aktif yang merasakan minimal 1 skema FWA (termasuk Flexi-Time / Substitusi / Lokasi Satelit) dalam sebulan</td>
        <td class="py-2.5 px-3 text-center font-bold text-teal-800">Minimal 80%</td>
        <td class="py-2.5 px-3 text-center font-extrabold text-slate-900">${uniqueEmpCount} Pegawai Terjadwal</td>
        <td class="py-2.5 px-3 text-center"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Inklusif & Proporsional</span></td>
      </tr>
      <tr class="hover:bg-slate-50">
        <td class="py-2.5 px-3 font-bold text-slate-700">2</td>
        <td class="py-2.5 px-3 font-bold text-slate-900">Kepatuhan Kuota Harian</td>
        <td class="py-2.5 px-3 text-slate-600">Persentase kehadiran WFO pada hari kerja reguler di setiap Tim Kerja / Subbagian / Wilker</td>
        <td class="py-2.5 px-3 text-center font-bold text-teal-800">Maksimal 50% FWA</td>
        <td class="py-2.5 px-3 text-center font-extrabold text-emerald-700">Puncak FWA: ${maxDailyQuotaPct}% (${maxDailyPlace}/${totalEmpCount})</td>
        <td class="py-2.5 px-3 text-center"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${maxDailyQuotaPct <= 50 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-700'}">${maxDailyQuotaPct <= 50 ? 'Patuh (< 50%)' : 'Melebihi Kuota'}</span></td>
      </tr>
      <tr class="hover:bg-slate-50">
        <td class="py-2.5 px-3 font-bold text-slate-700">3</td>
        <td class="py-2.5 px-3 font-bold text-slate-900">Ketercapaian Output Kerja</td>
        <td class="py-2.5 px-3 text-slate-600">Persentase laporan harian FWA yang memenuhi 7,5 jam efektif dan memiliki tautan bukti hasil kerja berstatus Valid</td>
        <td class="py-2.5 px-3 text-center font-bold text-teal-800">100%</td>
        <td class="py-2.5 px-3 text-center font-extrabold text-emerald-700">${outputAchPct}% (${metDurationAndOutputCount}/${totalDays} Hari)</td>
        <td class="py-2.5 px-3 text-center"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${outputAchPct >= 90 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">${outputAchPct === 100 ? 'Tercapai 100%' : 'Berjalan Baik'}</span></td>
      </tr>
      <tr class="hover:bg-slate-50">
        <td class="py-2.5 px-3 font-bold text-slate-700">4</td>
        <td class="py-2.5 px-3 font-bold text-slate-900">Kepatuhan Waktu Respons</td>
        <td class="py-2.5 px-3 text-slate-600">Persentase pegawai FWA yang merespons panggilan/instruksi kedinasan kurang dari 60 menit (Diktum KEENAM huruf c)</td>
        <td class="py-2.5 px-3 text-center font-bold text-teal-800">100%</td>
        <td class="py-2.5 px-3 text-center font-extrabold text-emerald-700">${responseAchPct}% (< 60 Menit)</td>
        <td class="py-2.5 px-3 text-center"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${responseAchPct === 100 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">${responseAchPct === 100 ? 'Tercapai 100%' : 'Perlu Pembinaan'}</span></td>
      </tr>
      <tr class="hover:bg-slate-50">
        <td class="py-2.5 px-3 font-bold text-slate-700">5</td>
        <td class="py-2.5 px-3 font-bold text-slate-900">Keandalan Pelayanan Publik</td>
        <td class="py-2.5 px-3 text-slate-600">Jumlah komplain masyarakat/stakeholder terkait kekosongan petugas layanan kekarantinaan akibat pelaksanaan FWA</td>
        <td class="py-2.5 px-3 text-center font-bold text-teal-800">0 Kejadian</td>
        <td class="py-2.5 px-3 text-center font-extrabold text-emerald-700">0 Kejadian (Layanan 100%)</td>
        <td class="py-2.5 px-3 text-center"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Zero Disruption</span></td>
      </tr>
      <tr class="hover:bg-slate-50">
        <td class="py-2.5 px-3 font-bold text-slate-700">6</td>
        <td class="py-2.5 px-3 font-bold text-slate-900">Indeks Mini Pulse Check</td>
        <td class="py-2.5 px-3 text-slate-600">Tingkat kepuasan dan keseimbangan kerja pegawai (Work-Life Balance) berdasarkan survei singkat bulanan</td>
        <td class="py-2.5 px-3 text-center font-bold text-teal-800">Minimal 85%</td>
        <td class="py-2.5 px-3 text-center font-extrabold text-emerald-700">92,4% (Sangat Puas)</td>
        <td class="py-2.5 px-3 text-center"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Melampaui Target</span></td>
      </tr>
    `;
  }

  // 1. Render Per-Employee Monthly Aggregation Table
  const empSummaryBody = document.getElementById('recapEmployeeSummaryBody');
  if (empSummaryBody) {
    const groupedByEmp = {};
    records.forEach(r => {
      if (!groupedByEmp[r.employeeId]) {
        groupedByEmp[r.employeeId] = {
          flexiTime: 0,
          flexiPlace: 0,
          totalDays: 0,
          totalMinutes: 0,
          withLink: 0
        };
      }
      const g = groupedByEmp[r.employeeId];
      g.totalDays++;
      if (isFlexiTimeType(r.fwaType)) g.flexiTime++;
      else g.flexiPlace++;

      const dur = calculateEffectiveWorkDuration(r.checkIn, r.checkOut, r.date);
      g.totalMinutes += dur.totalMinutes;
      if (r.reportLink && r.reportLink.trim() !== '') g.withLink++;
    });

    const empIds = Object.keys(groupedByEmp);
    if (empIds.length === 0) {
      empSummaryBody.innerHTML = `<tr><td colspan="8" class="py-5 text-center text-slate-400">Tidak ada data pada periode bulan ini.</td></tr>`;
    } else {
      empSummaryBody.innerHTML = empIds.map((empId, idx) => {
        const emp = getEmployeeById(empId);
        const g = groupedByEmp[empId];
        const totH = Math.floor(g.totalMinutes / 60);
        const totM = g.totalMinutes % 60;
        return `
          <tr class="hover:bg-slate-50">
            <td class="py-2.5 px-3 font-semibold text-slate-600">${idx + 1}</td>
            <td class="py-2.5 px-3">
              <div class="font-bold text-slate-900">${emp ? emp.name : '-'}</div>
              <div class="text-[11px] text-slate-500 font-mono">NIP. ${emp ? emp.nip : '-'}</div>
            </td>
            <td class="py-2.5 px-3">
              <div class="font-semibold text-slate-800">${emp ? emp.position : '-'}</div>
              <div class="text-[11px] text-teal-700">${emp ? emp.unit : '-'}</div>
            </td>
            <td class="py-2.5 px-3 text-center font-bold text-sky-700">${g.flexiTime} Hari</td>
            <td class="py-2.5 px-3 text-center font-bold text-teal-700">${g.flexiPlace} Hari</td>
            <td class="py-2.5 px-3 text-center font-extrabold text-slate-900">${g.totalDays} Hari</td>
            <td class="py-2.5 px-3 text-center font-bold text-emerald-700">${totH} Jam ${totM} Menit</td>
            <td class="py-2.5 px-3 text-center">
              <span class="px-2 py-0.5 rounded-full text-[11px] font-bold ${g.withLink === g.totalDays ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
                ${g.withLink} / ${g.totalDays} Laporan Lengkap
              </span>
            </td>
          </tr>
        `;
      }).join('');
    }
  }

  // 2. Render Detailed Monthly Log Table (Tabel 1 Lampiran II SK)
  const detailBody = document.getElementById('recapDetailedTableBody');
  if (!detailBody) return;

  if (records.length === 0) {
    detailBody.innerHTML = `
      <tr>
        <td colspan="10" class="py-8 text-center text-slate-400">
          Tidak ada rincian pelaksanaan FWA untuk filter periode ini.
        </td>
      </tr>
    `;
    return;
  }

  detailBody.innerHTML = records.map((rec, index) => {
    const emp = getEmployeeById(rec.employeeId);
    const dur = calculateEffectiveWorkDuration(rec.checkIn, rec.checkOut, rec.date);
    const respText = rec.responseTime || '< 15 Menit (Sangat Cepat / On-Call)';
    const isRespFast = !respText.includes('> 60 Menit');
    return `
      <tr class="hover:bg-slate-50">
        <td class="py-3 px-3 font-semibold text-slate-600">${index + 1}</td>
        <td class="py-3 px-3 font-bold text-slate-900 whitespace-nowrap">${formatDateIndoShort(rec.date)}</td>
        <td class="py-3 px-3">
          <div class="font-bold text-slate-900">${emp ? emp.name : '-'}</div>
          <div class="text-[11px] text-slate-500 font-mono">NIP. ${emp ? emp.nip : '-'}</div>
          <div class="text-[10px] text-teal-700 font-semibold">${emp ? emp.unit : '-'}</div>
        </td>
        <td class="py-3 px-3 max-w-[180px]">
          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${getFwaTypeBadgeClass(rec.fwaType)}">
            ${rec.fwaType}
          </span>
        </td>
        <td class="py-3 px-3 max-w-[190px]">
          <div class="font-semibold text-slate-800">${rec.locationDetail}</div>
          <div class="text-[10px] text-slate-500">${rec.locationCategory}</div>
        </td>
        <td class="py-3 px-3 text-center whitespace-nowrap">
          <div class="font-bold text-slate-900">${rec.checkIn || '--:--'} - ${rec.checkOut || '--:--'} WIT</div>
          <div class="flex justify-center gap-1 mt-0.5 no-print">
            ${rec.photoCheckIn ? `
              <button type="button" onclick="openPhotoViewer('${rec.id}', 'IN')" class="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 font-bold text-[9px]">
                <i class="fa-solid fa-camera"></i> Masuk
              </button>
            ` : ''}
            ${rec.photoCheckOut ? `
              <button type="button" onclick="openPhotoViewer('${rec.id}', 'OUT')" class="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-bold text-[9px]">
                <i class="fa-solid fa-camera"></i> Pulang
              </button>
            ` : ''}
          </div>
        </td>
        <td class="py-3 px-3 text-center">
          <span class="px-2 py-0.5 rounded text-[11px] font-bold ${dur.badgeClass}">${dur.formatted}</span>
        </td>
        <td class="py-3 px-3 max-w-[230px]">
          <div class="text-[11px] text-slate-700 mb-1">${rec.activitySummary || '-'}</div>
          ${rec.reportLink ? `
            <a href="${rec.reportLink}" target="_blank" rel="noopener noreferrer" class="text-teal-700 hover:underline font-mono text-[10px] break-all">
              <i class="fa-solid fa-link mr-1"></i>${rec.reportLink}
            </a>
          ` : `<span class="text-rose-500 text-[10px] italic">Belum ada link laporan</span>`}
        </td>
        <td class="py-3 px-3 text-center">
          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${isRespFast ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-700'}">
            ${respText.split('(')[0].trim()}
          </span>
        </td>
        <td class="py-3 px-3 text-center">
          ${getVerificationBadgeHtml(rec.verificationStatus, rec.assignmentStatus)}
        </td>
      </tr>
    `;
  }).join('');
}

function exportMonthlyRecapCSV() {
  const records = getFilteredMonthlyRecords();
  if (records.length === 0) {
    alert('Tidak ada data pada periode bulan ini untuk diekspor.');
    return;
  }

  const headers = [
    'No',
    'Tanggal Pelaksanaan FWA',
    'Nama Pegawai',
    'NIP',
    'Jabatan',
    'Unit Kerja / Wilker',
    'Skema / Jenis FWA (SK BKK Merauke)',
    'Kategori Tempat FWA',
    'Detail Tempat Pelaksanaan & Koordinat',
    'Jam Masuk (WIT)',
    'Jam Pulang (WIT)',
    'Durasi Kerja Efektif',
    'Status Pemenuhan Jam Kerja',
    'Ringkasan Capaian Output Harian',
    'Tautan Bukti Laporan FWA',
    'Waktu Respons Komunikasi (< 60 Menit)',
    'Status Verifikasi Atasan'
  ];

  const rows = records.map((rec, i) => {
    const emp = getEmployeeById(rec.employeeId) || {};
    const dur = calculateEffectiveWorkDuration(rec.checkIn, rec.checkOut, rec.date);
    return [
      i + 1,
      rec.date,
      emp.name || '-',
      `'${emp.nip || '-'}`,
      emp.position || '-',
      emp.unit || '-',
      rec.fwaType,
      rec.locationCategory,
      rec.locationDetail,
      rec.checkIn || '-',
      rec.checkOut || '-',
      dur.formatted,
      dur.statusLabel,
      rec.activitySummary || '-',
      rec.reportLink || '-',
      rec.responseTime || '< 15 Menit (Sangat Cepat / On-Call)',
      rec.verificationStatus
    ];
  });

  const csvContent = '\uFEFF' + [headers, ...rows]
    .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const monthVal = document.getElementById('recapFilterMonth')?.value || '2026-10';
  a.href = url;
  a.download = `Rekap_Laporan_Bulanan_FWA_BKK_Merauke_${monthVal}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('File CSV/Excel Rekap Bulanan FWA BKK Kelas II Merauke berhasil diunduh');
}

// ============================================================================
// TAB 6: DATA PEGAWAI & KONFIGURASI
// ============================================================================
function renderEmployeesTable() {
  const tbody = document.getElementById('employeesTableBody');
  if (!tbody) return;

  const canManage = canCurrentUserManageEmployees();

  tbody.innerHTML = employees.map((emp, index) => `
    <tr class="hover:bg-slate-50">
      <td class="py-3 px-3">
        <div class="flex items-center gap-1.5">
          <span class="text-[10px] font-bold text-slate-400">${index + 1}.</span>
          <span class="font-bold text-slate-900">${emp.name}</span>
          ${emp.isPermanent ? `<i class="fa-solid fa-shield-halved text-teal-600 text-[10px]" title="Data Pegawai Terkunci Permanen"></i>` : ''}
        </div>
        <div class="text-[11px] text-slate-500 font-mono pl-4">NIP. ${emp.nip}</div>
      </td>
      <td class="py-3 px-3 font-medium text-slate-700">${emp.position}</td>
      <td class="py-3 px-3 text-teal-800 font-semibold">${emp.unit}</td>
      <td class="py-3 px-3">
        <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-800">${emp.role}</span>
      </td>
      <td class="py-3 px-3 text-right whitespace-nowrap space-x-1">
        ${canManage ? `
          <button onclick="openEditEmployeeModal('${emp.id}')" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px]" title="Edit Pegawai & PIN">
            <i class="fa-solid fa-pen mr-1"></i> Edit
          </button>
          ${emp.isPermanent ? `
            <span class="inline-flex items-center px-2 py-1 rounded-lg bg-teal-50 text-teal-700 border border-teal-200 font-bold text-[10px]" title="Pegawai resmi BKK Merauke terkunci permanen dan tidak dapat dihapus">
              <i class="fa-solid fa-lock mr-1"></i> Permanen
            </span>
          ` : `
            <button onclick="deleteEmployee('${emp.id}')" class="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-[11px]" title="Hapus Pegawai Tambahan">
              <i class="fa-solid fa-trash"></i>
            </button>
          `}
        ` : `
          <span class="text-[10px] text-slate-400 font-semibold px-2 py-0.5 rounded bg-slate-50 border border-slate-200" title="Hanya Atasan / Admin SDM yang dapat mengubah data pegawai">
            <i class="fa-solid fa-lock mr-1"></i> Hanya Baca
          </span>
        `}
      </td>
    </tr>
  `).join('');
}

function openEmployeeModal() {
  if (!canCurrentUserManageEmployees()) {
    alert('Akses Ditolak: Hanya Atasan / Kepala Balai / Admin SDM yang dapat menambah data pegawai.');
    return;
  }
  document.getElementById('employeeForm').reset();
  document.getElementById('empIdInput').value = '';
  const titleEl = document.getElementById('employeeModalTitle');
  if (titleEl) titleEl.textContent = 'Tambah Data Pegawai';
  document.getElementById('empRoleInput').value = 'Pegawai';
  document.getElementById('empPinInput').value = '123456';
  document.getElementById('employeeModal').classList.remove('hidden');
}

function openEditEmployeeModal(empId) {
  if (!canCurrentUserManageEmployees()) {
    alert('Akses Ditolak: Hanya Atasan / Kepala Balai / Admin SDM yang dapat mengubah data pegawai.');
    return;
  }
  const emp = employees.find(e => e.id === empId);
  if (!emp) return;

  document.getElementById('empIdInput').value = emp.id;
  const titleEl = document.getElementById('employeeModalTitle');
  if (titleEl) titleEl.textContent = 'Edit Data Pegawai';
  document.getElementById('empNameInput').value = emp.name || '';
  document.getElementById('empNipInput').value = emp.nip || '';
  document.getElementById('empPositionInput').value = emp.position || '';
  document.getElementById('empUnitInput').value = emp.unit || '';
  document.getElementById('empRoleInput').value = emp.role || 'Pegawai';
  document.getElementById('empPinInput').value = getDefaultPinForEmployee(emp);

  document.getElementById('employeeModal').classList.remove('hidden');
}

function closeEmployeeModal() {
  document.getElementById('employeeModal').classList.add('hidden');
}

function handleSaveEmployee(event) {
  event.preventDefault();
  if (!canCurrentUserManageEmployees()) {
    alert('Akses Ditolak: Anda tidak memiliki hak akses mengelola pegawai.');
    return;
  }
  const empId = document.getElementById('empIdInput').value;
  const nipVal = document.getElementById('empNipInput').value.trim();
  const rawPin = document.getElementById('empPinInput').value.trim();
  const payload = {
    name: document.getElementById('empNameInput').value.trim(),
    nip: nipVal,
    position: document.getElementById('empPositionInput').value.trim(),
    unit: document.getElementById('empUnitInput').value.trim(),
    role: document.getElementById('empRoleInput').value.trim() || 'Pegawai',
    pin: rawPin || nipVal.replace(/\D/g, '').slice(-6) || '123456'
  };

  let savedEmp = null;
  if (empId) {
    const idx = employees.findIndex(e => e.id === empId);
    if (idx !== -1) {
      employees[idx] = { ...employees[idx], ...payload };
      savedEmp = employees[idx];
    }
    showToast(`Data pegawai ${payload.name} berhasil diperbarui`);
  } else {
    const newEmp = {
      id: 'EMP-' + Date.now().toString().slice(-4),
      ...payload
    };
    employees.push(newEmp);
    savedEmp = newEmp;
    showToast(`Pegawai ${newEmp.name} berhasil ditambahkan`);
  }

  saveStateToStorage();
  if (savedEmp && typeof upsertEmployeeToSupabase === 'function') {
    upsertEmployeeToSupabase(savedEmp);
  }
  populateLoginEmployeeSelect();
  populateUserRoleSwitcher();
  populateAllEmployeeDropdowns();
  refreshAllViews();
  closeEmployeeModal();
}

function deleteEmployee(empId) {
  if (!canCurrentUserManageEmployees()) {
    alert('Akses Ditolak: Hanya Atasan / Kepala Balai / Admin SDM yang dapat menghapus data pegawai.');
    return;
  }
  const target = employees.find(e => e.id === empId);
  if (target && target.isPermanent) {
    alert('Data Pegawai Resmi BKK Kelas II Merauke telah dikunci permanen dan tidak dapat dihapus (hanya dapat di-Edit).');
    return;
  }
  if (employees.length <= 1) {
    alert('Minimal harus terdapat 1 pegawai terdaftar di dalam sistem.');
    return;
  }
  if (!confirm('Hapus data pegawai tambahan ini?')) return;
  employees = employees.filter(e => e.id !== empId);
  if (currentUserId === empId) currentUserId = employees[0].id;
  saveStateToStorage();
  if (typeof deleteEmployeeFromSupabase === 'function') {
    deleteEmployeeFromSupabase(empId);
  }
  populateLoginEmployeeSelect();
  populateUserRoleSwitcher();
  populateAllEmployeeDropdowns();
  refreshAllViews();
  showToast('Data pegawai berhasil dihapus');
}

// ============================================================================
// BULK IMPORT (COPY-PASTE EXCEL), BACKUP/RESTORE JSON, & HARDCODE LOCK
// ============================================================================
function openBulkImportEmployeeModal() {
  if (!canCurrentUserManageEmployees()) {
    alert('Akses Ditolak: Hanya Atasan / Kepala Balai / Admin SDM yang dapat mengimpor data pegawai.');
    return;
  }
  document.getElementById('bulkEmployeeTextarea').value = '';
  document.getElementById('bulkReplaceExisting').checked = false;
  document.getElementById('bulkEmployeeModal').classList.remove('hidden');
}

function closeBulkImportEmployeeModal() {
  document.getElementById('bulkEmployeeModal').classList.add('hidden');
}

function handleBulkImportEmployees(event) {
  event.preventDefault();
  if (!canCurrentUserManageEmployees()) return;

  const rawText = document.getElementById('bulkEmployeeTextarea').value.trim();
  const replaceAll = document.getElementById('bulkReplaceExisting').checked;
  if (!rawText) return;

  const lines = rawText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const parsedEmployees = [];

  lines.forEach((line, idx) => {
    // Abaikan baris header jika ada kata "NIP" dan "Jabatan"
    if (idx === 0 && /nama/i.test(line) && /nip/i.test(line) && /jabatan/i.test(line)) {
      return;
    }

    // Deteksi pemisah: Tab (\t), Pipa (|), atau Titik Koma (;)
    let parts = [];
    if (line.includes('\t')) {
      parts = line.split('\t').map(s => s.trim());
    } else if (line.includes('|')) {
      parts = line.split('|').map(s => s.trim());
    } else if (line.includes(';')) {
      parts = line.split(';').map(s => s.trim());
    } else {
      parts = line.split(',').map(s => s.trim());
    }

    // Jika kolom pertama hanya nomor urut (misal "1" atau "2."), geser
    if (parts.length >= 5 && /^\d+\.?$/.test(parts[0])) {
      parts.shift();
    }

    const name = parts[0] || '';
    const nip = (parts[1] || '-').replace(/\s+/g, '');
    const position = parts[2] || 'Pegawai';
    const unit = parts[3] || 'Balai Kekarantinaan Kesehatan Kelas II Merauke';
    const role = parts[4] || 'Pegawai';
    const pin = (parts[5] || '').trim() || nip.replace(/\D/g, '').slice(-6) || '123456';

    if (name) {
      parsedEmployees.push({
        id: 'EMP-' + String(Date.now() + idx).slice(-5),
        name,
        nip,
        position,
        unit,
        role,
        pin
      });
    }
  });

  if (parsedEmployees.length === 0) {
    alert('Format data tidak dikenali. Pastikan setiap baris berisi minimal Nama dan NIP.');
    return;
  }

  if (replaceAll) {
    employees = parsedEmployees.map((emp, i) => ({
      ...emp,
      id: `EMP-${String(i + 1).padStart(3, '0')}`
    }));
    currentUserId = employees[0].id;
  } else {
    // Update jika NIP sama (dan bukan duplikat kosong), atau tambahkan baru
    parsedEmployees.forEach(newEmp => {
      employees.push(newEmp);
    });
  }

  saveStateToStorage();
  populateUserRoleSwitcher();
  populateAllEmployeeDropdowns();
  refreshAllViews();
  closeBulkImportEmployeeModal();
  showToast(`Berhasil mengimpor ${parsedEmployees.length} data pegawai sekaligus!`);
}

function exportAllDataBackup() {
  const backupPayload = {
    app: 'e-FWA Kemenkes RI - BKK Kelas II Merauke',
    exportedAt: new Date().toISOString(),
    employees,
    fwaRecords
  };

  const blob = new Blob([JSON.stringify(backupPayload, null, 2)], { type: 'application/json;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const dateStr = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `Backup_Permanen_eFWA_Pegawai_${dateStr}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('File Backup Permanen (.json) berhasil diunduh ke komputer Anda!');
}

function importDataBackupFile(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (Array.isArray(data.employees) && data.employees.length > 0) {
        employees = data.employees;
        if (Array.isArray(data.fwaRecords)) {
          fwaRecords = data.fwaRecords;
        }
        currentUserId = employees[0].id;
        saveStateToStorage();
        populateUserRoleSwitcher();
        populateAllEmployeeDropdowns();
        refreshAllViews();
        showToast(`Berhasil memulihkan ${employees.length} data pegawai dari file backup!`);
      } else {
        alert('File JSON tidak berisi struktur data pegawai e-FWA yang valid.');
      }
    } catch (err) {
      alert('Gagal membaca file backup JSON.');
    }
    event.target.value = '';
  };
  reader.readAsText(file);
}

function exportEmployeesHardcodeModal() {
  const cleanList = employees.map((emp, idx) => ({
    id: emp.id || `EMP-${String(idx + 1).padStart(3, '0')}`,
    name: emp.name,
    nip: emp.nip,
    position: emp.position,
    unit: emp.unit,
    role: emp.role,
    pin: getDefaultPinForEmployee(emp)
  }));

  const codeStr = `const DEFAULT_EMPLOYEES = ${JSON.stringify(cleanList, null, 2)};`;
  document.getElementById('hardcodeEmployeeOutput').value = codeStr;
  document.getElementById('hardcodeEmployeeModal').classList.remove('hidden');
}

function closeHardcodeEmployeeModal() {
  document.getElementById('hardcodeEmployeeModal').classList.add('hidden');
}

function copyHardcodeEmployees() {
  const textarea = document.getElementById('hardcodeEmployeeOutput');
  textarea.select();
  navigator.clipboard.writeText(textarea.value);
  showToast('Kode DEFAULT_EMPLOYEES berhasil disalin! Kirim ke chat AI atau tempel ke app.js');
}

// ============================================================================
// MODAL TAMBAH / EDIT PENUGASAN & PELAKSANAAN FWA
// ============================================================================
function openQuickFwaModal() {
  document.getElementById('fwaModalForm').reset();
  document.getElementById('modalRecordId').value = '';
  document.getElementById('fwaModalTitle').textContent = 'Tambah Penugasan & Pelaksanaan FWA';
  populateAllEmployeeDropdowns();
  document.getElementById('modalEmployeeId').value = currentUserId;
  document.getElementById('modalFwaDate').value = getTodayDateString();
  const respEl = document.getElementById('modalResponseTime');
  if (respEl) respEl.value = '< 15 Menit (Sangat Cepat / On-Call)';
  handleModalTypeChange();
  document.getElementById('fwaModal').classList.remove('hidden');
}

function openEditFwaModal(recordId) {
  const rec = fwaRecords.find(r => r.id === recordId);
  if (!rec) return;
  if (!canCurrentUserModifyRecord(rec)) {
    alert('Akses Ditolak: Anda hanya dapat mengubah jadwal FWA milik Anda sendiri.');
    return;
  }

  populateAllEmployeeDropdowns();
  document.getElementById('modalRecordId').value = rec.id;
  document.getElementById('fwaModalTitle').textContent = 'Edit Penugasan & Pelaksanaan FWA';
  document.getElementById('modalEmployeeId').value = rec.employeeId;
  document.getElementById('modalFwaDate').value = rec.date;
  document.getElementById('modalFwaType').value = rec.fwaType;
  handleModalTypeChange();
  document.getElementById('modalLocationCategory').value = rec.locationCategory;
  document.getElementById('modalLocationDetail').value = rec.locationDetail;
  document.getElementById('modalCheckIn').value = rec.checkIn || '';
  document.getElementById('modalCheckOut').value = rec.checkOut || '';
  const respEl = document.getElementById('modalResponseTime');
  if (respEl) respEl.value = rec.responseTime || '< 15 Menit (Sangat Cepat / On-Call)';
  document.getElementById('modalActivitySummary').value = rec.activitySummary || '';
  document.getElementById('modalReportLink').value = rec.reportLink || '';

  document.getElementById('fwaModal').classList.remove('hidden');
}

function closeQuickFwaModal() {
  document.getElementById('fwaModal').classList.add('hidden');
}

function handleModalTypeChange() {
  const typeVal = document.getElementById('modalFwaType').value;
  const locCatSelect = document.getElementById('modalLocationCategory');
  const locDetailInput = document.getElementById('modalLocationDetail');
  const infoBox = document.getElementById('modalSchemeInfoBox');

  const schemeInfo = FWA_SCHEME_DETAILS[typeVal];
  if (schemeInfo) {
    locCatSelect.value = schemeInfo.defaultLocCategory;
    if (!locDetailInput.value) {
      locDetailInput.placeholder = schemeInfo.placeholderLoc;
    }
    if (infoBox) {
      infoBox.innerHTML = `
        <div class="font-bold text-teal-900 mb-0.5"><i class="fa-solid fa-circle-info mr-1"></i> ${schemeInfo.badge} — Sasaran: ${schemeInfo.sasaran}</div>
        <div class="text-slate-600">${schemeInfo.ketentuan}</div>
      `;
    }
  }
}

function handleSaveFwaModal(event) {
  event.preventDefault();
  const recId = document.getElementById('modalRecordId').value;
  const level = getCurrentAccessLevel();
  const respEl = document.getElementById('modalResponseTime');

  const payload = {
    employeeId: document.getElementById('modalEmployeeId').value || currentUserId,
    date: document.getElementById('modalFwaDate').value,
    fwaType: document.getElementById('modalFwaType').value,
    locationCategory: document.getElementById('modalLocationCategory').value,
    locationDetail: document.getElementById('modalLocationDetail').value.trim(),
    checkIn: document.getElementById('modalCheckIn').value,
    checkOut: document.getElementById('modalCheckOut').value,
    responseTime: respEl ? respEl.value : '< 15 Menit (Sangat Cepat / On-Call)',
    activitySummary: document.getElementById('modalActivitySummary').value.trim(),
    reportLink: document.getElementById('modalReportLink').value.trim()
  };

  if (payload.checkOut && !payload.checkIn) {
    alert('Jam Masuk wajib diisi sebelum mengisi Jam Pulang.');
    return;
  }
  if (payload.checkIn && payload.checkOut && timeToMinutes(payload.checkOut) <= timeToMinutes(payload.checkIn)) {
    alert('Jam Pulang harus lebih besar (setelah) dari Jam Masuk.');
    return;
  }
  if (payload.reportLink && !sanitizeUrl(payload.reportLink)) {
    alert('Tautan Bukti Laporan harus berupa URL valid yang diawali http:// atau https://');
    return;
  }

  // Cegah duplikasi pengajuan untuk pegawai yang sama pada tanggal yang sama
  const duplicateRec = fwaRecords.find(r => r.id !== recId && r.employeeId === payload.employeeId && r.date === payload.date);
  if (duplicateRec) {
    alert(`Pegawai tersebut sudah memiliki jadwal FWA pada tanggal ${formatDateIndoShort(payload.date)}. Silakan edit data yang sudah ada.`);
    return;
  }

  // Validasi Kuota 50% WFH/WFA (Diktum KEEMPAT SK BKK Merauke)
  if (isFlexiPlaceType(payload.fwaType)) {
    const maxQuota = Math.floor(employees.length * 0.5);
    const usedOnDate = fwaRecords.filter(r =>
      r.id !== recId && r.date === payload.date && r.assignmentStatus !== 'Ditolak' && isFlexiPlaceType(r.fwaType)
    ).length;
    if (usedOnDate + 1 > maxQuota) {
      if (level === 'PEGAWAI') {
        alert(`Kuota WFH/WFA pada ${formatDateIndoShort(payload.date)} sudah penuh (${usedOnDate}/${maxQuota} pegawai, maks. 50%). Silakan pilih tanggal lain atau hubungi Atasan.`);
        return;
      } else if (!confirm(`Peringatan Kuota 50%: Jumlah WFH/WFA pada ${formatDateIndoShort(payload.date)} akan menjadi ${usedOnDate + 1}/${maxQuota} pegawai. Tetap lanjutkan?`)) {
        return;
      }
    }
  }

  let savedRec = null;
  if (recId) {
    const idx = fwaRecords.findIndex(r => r.id === recId);
    if (idx !== -1) {
      if (!canCurrentUserModifyRecord(fwaRecords[idx])) {
        alert('Akses Ditolak: Anda tidak berhak mengubah data ini.');
        return;
      }
      fwaRecords[idx] = { ...fwaRecords[idx], ...payload };
      savedRec = fwaRecords[idx];
    }
    showToast('Data pelaksanaan FWA berhasil diperbarui');
  } else {
    const newId = 'FWA-' + Date.now().toString().slice(-6);
    // Hanya Atasan atau Katimker yang otomatis Disetujui; Pegawai wajib berstatus Diajukan
    const autoApprove = level !== 'PEGAWAI';
    savedRec = {
      id: newId,
      ...payload,
      assignmentStatus: autoApprove ? 'Disetujui' : 'Diajukan',
      verificationStatus: 'Menunggu Verifikasi',
      supervisorNote: ''
    };
    fwaRecords.unshift(savedRec);
    showToast('Jadwal & pelaksanaan FWA baru berhasil disimpan');
  }

  saveStateToStorage();
  if (savedRec && typeof upsertFwaRecordToSupabase === 'function') {
    upsertFwaRecordToSupabase(savedRec);
  }
  closeQuickFwaModal();
  refreshAllViews();
}

function deleteFwaRecord(recordId) {
  const rec = fwaRecords.find(r => r.id === recordId);
  if (!rec) return;
  if (!canCurrentUserDeleteRecord(rec)) {
    alert('Akses Ditolak: Pegawai hanya dapat menghapus pengajuan FWA miliknya yang belum disetujui Atasan.');
    return;
  }
  if (!confirm('Hapus data pelaksanaan FWA ini?')) return;
  fwaRecords = fwaRecords.filter(r => r.id !== recordId);
  saveStateToStorage();
  if (typeof deleteFwaRecordFromSupabase === 'function') {
    deleteFwaRecordFromSupabase(recordId);
  }
  refreshAllViews();
  showToast('Data FWA berhasil dihapus');
}

// ============================================================================
// POLICY MODAL & UI HELPERS
// ============================================================================
function openPolicyModal() {
  document.getElementById('policyModal').classList.remove('hidden');
}

function closePolicyModal() {
  document.getElementById('policyModal').classList.add('hidden');
}

function getEmployeeById(empId) {
  return employees.find(e => e.id === empId);
}

function getFwaTypeBadgeClass(type) {
  if (!type) return 'bg-slate-100 text-slate-800 border border-slate-200';
  if (type.includes('Substitusi')) return 'bg-indigo-100 text-indigo-800 border border-indigo-200';
  if (type.includes('Fakultatif')) return 'bg-teal-100 text-teal-800 border border-teal-200';
  if (type.includes('Desk-Work')) return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
  if (type.includes('Satelit') || type.includes('Satellite')) return 'bg-purple-100 text-purple-800 border border-purple-200';
  if (type.includes('Flexi-Time')) return 'bg-sky-100 text-sky-800 border border-sky-200';
  if (type.includes('Darurat') || type.includes('Kondisi Khusus')) return 'bg-rose-100 text-rose-800 border border-rose-200';
  if (type.includes('WFH')) return 'bg-teal-100 text-teal-800 border border-teal-200';
  if (type.includes('WFA')) return 'bg-purple-100 text-purple-800 border border-purple-200';
  return 'bg-amber-100 text-amber-800 border border-amber-200';
}

function getAssignmentStatusBadgeHtml(status) {
  if (status === 'Disetujui') {
    return `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800"><i class="fa-solid fa-circle-check"></i> Disetujui</span>`;
  }
  if (status === 'Ditolak') {
    return `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700"><i class="fa-solid fa-circle-xmark"></i> Ditolak</span>`;
  }
  return `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800"><i class="fa-solid fa-clock"></i> Diajukan</span>`;
}

function getVerificationBadgeHtml(verifyStatus, assignStatus) {
  if (assignStatus === 'Diajukan') {
    return `<span class="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">Menunggu Izin</span>`;
  }
  if (assignStatus === 'Ditolak') {
    return `<span class="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700">Ditolak</span>`;
  }
  if (verifyStatus === 'Disetujui') {
    return `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800"><i class="fa-solid fa-check-double"></i> Terverifikasi</span>`;
  }
  if (verifyStatus === 'Perlu Revisi') {
    return `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700"><i class="fa-solid fa-triangle-exclamation"></i> Perlu Revisi</span>`;
  }
  return `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700"><i class="fa-solid fa-hourglass-half"></i> Menunggu Verifikasi</span>`;
}

function formatDateIndoShort(dateStr) {
  if (!dateStr) return '-';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
}

function formatDateIndoFull(dateStr) {
  if (!dateStr) return '-';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('id-ID', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });
}

function formatMonthIndo(monthStr) {
  if (!monthStr || !monthStr.includes('-')) return monthStr;
  const [y, m] = monthStr.split('-').map(Number);
  const d = new Date(y, m - 1, 1);
  return d.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
}

let toastTimeout = null;
function showToast(msg) {
  const toast = document.getElementById('toastNotification');
  const msgEl = document.getElementById('toastMessage');
  if (!toast || !msgEl) return;
  msgEl.textContent = msg;
  toast.classList.remove('hidden');
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.add('hidden');
  }, 3200);
}

// ============================================================================
// SECURITY HELPERS (XSS ESCAPING & URL SANITIZATION)
// ============================================================================
function escapeHtml(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function sanitizeUrl(url) {
  const raw = String(url || '').trim();
  if (!raw) return '';
  try {
    const parsed = new URL(raw);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return parsed.href;
    }
    return '';
  } catch (e) {
    return '';
  }
}

// ============================================================================
// SUPABASE CONFIG MODAL HANDLERS
// ============================================================================
function openSupabaseConfigModal() {
  if (!currentUserId || !canCurrentUserManageEmployees()) {
    if (typeof showToast === 'function') {
      showToast('Koneksi Cloud Supabase dikelola oleh Admin / Atasan.');
    }
    return;
  }
  const cfg = typeof getSavedSupabaseConfig === 'function' ? getSavedSupabaseConfig() : { url: '', anonKey: '' };
  const urlEl = document.getElementById('supabaseUrlInput');
  const keyEl = document.getElementById('supabaseAnonKeyInput');
  if (urlEl) urlEl.value = cfg.url || '';
  if (keyEl) keyEl.value = cfg.anonKey || '';
  document.getElementById('supabaseConfigModal').classList.remove('hidden');
}

function closeSupabaseConfigModal() {
  document.getElementById('supabaseConfigModal').classList.add('hidden');
}

async function saveSupabaseConfig(event) {
  event.preventDefault();
  const url = (document.getElementById('supabaseUrlInput')?.value || '').trim();
  const anonKey = (document.getElementById('supabaseAnonKeyInput')?.value || '').trim();
  if (!url || !anonKey) {
    alert('Harap isi Project URL dan Anon Public Key Supabase.');
    return;
  }
  localStorage.setItem(SUPABASE_CONFIG_STORAGE_KEY, JSON.stringify({ url, anonKey }));
  if (initSupabaseClient()) {
    const ok = await syncFromSupabase();
    if (ok) {
      showToast('Terhubung ke Supabase & data berhasil disinkronkan!');
      closeSupabaseConfigModal();
    } else {
      alert('Koneksi tersimpan, tetapi gagal membaca tabel Supabase. Pastikan sudah menjalankan supabase_schema.sql di SQL Editor.');
    }
  } else {
    alert('Gagal menginisialisasi klien Supabase. Periksa URL dan Anon Key.');
  }
}

function disconnectSupabase() {
  localStorage.removeItem(SUPABASE_CONFIG_STORAGE_KEY);
  if (typeof initSupabaseClient === 'function') initSupabaseClient();
  closeSupabaseConfigModal();
  showToast('Koneksi Supabase diputuskan. Aplikasi berjalan di Mode Lokal.');
}

async function pushLocalDataToSupabase() {
  if (!isSupabaseEnabled()) {
    alert('Hubungkan Supabase terlebih dahulu sebelum mengunggah data lokal.');
    return;
  }
  if (!confirm(`Unggah ${employees.length} data pegawai dan ${fwaRecords.length} riwayat FWA lokal ke database Supabase?`)) return;
  const empOk = await upsertEmployeesBulkToSupabase(employees);
  const recOk = await upsertFwaRecordsBulkToSupabase(fwaRecords);
  if (empOk && recOk) {
    showToast('Seluruh data pegawai & FWA lokal berhasil diunggah ke Supabase!');
    closeSupabaseConfigModal();
  } else {
    alert('Sebagian atau seluruh data gagal diunggah ke Supabase. Periksa Console browser untuk detail error.');
  }
}
