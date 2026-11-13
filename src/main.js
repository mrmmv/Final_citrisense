import { 
  createIcons, 
  Wifi, 
  Signal, 
  BatteryCharging, 
  CloudSun, 
  RotateCw, 
  LayoutGrid, 
  Sparkles, 
  Sprout, 
  CloudRain, 
  Sliders, 
  Settings, 
  Aperture, 
  CheckCircle, 
  Upload, 
  PlayCircle, 
  Sun, 
  Droplets, 
  Layers, 
  Orbit, 
  Camera, 
  Check, 
  LogOut, 
  CloudUpload, 
  UserPlus, 
  LogIn, 
  Globe, 
  Cpu, 
  MapPin,
  Loader,
  BookOpen,
  ShieldCheck,
  RefreshCw,
  HelpCircle,
  Clock,
  Repeat,
  Calendar,
  Cloud,
  History,
  Trash2,
  Trash,
  FileText,
  AlertCircle,
  Inbox,
  Eye,
  ChevronDown,
  ChevronRight,
  X
} from 'lucide';

import { 
  auth, 
  db, 
  signOut, 
  onAuthStateChanged, 
  collection, 
  addDoc, 
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  getDocs,
  onSnapshot,
  serverTimestamp 
} from './firebase.js';
import { create3DTurntable } from './threeTurntable.js';
import { create3DBackground } from './threeBackground.js';

let threeTurntableRig = null;
let threeBg = null;
let isReceivingRemoteSync = false;

const appIcons = {
  Wifi, 
  Signal, 
  BatteryCharging, 
  CloudSun, 
  RotateCw, 
  LayoutGrid, 
  Sparkles, 
  Sprout, 
  CloudRain, 
  Sliders, 
  Settings, 
  Aperture, 
  CheckCircle, 
  Upload, 
  PlayCircle, 
  Sun, 
  Droplets, 
  Layers, 
  Orbit, 
  Camera, 
  Check, 
  LogOut, 
  CloudUpload, 
  UserPlus, 
  LogIn, 
  Globe, 
  Cpu, 
  MapPin,
  Loader,
  BookOpen,
  ShieldCheck,
  RefreshCw,
  HelpCircle,
  Clock,
  Repeat,
  Calendar,
  Cloud,
  History,
  Trash2,
  Trash,
  FileText,
  AlertCircle,
  Inbox,
  Eye,
  ChevronDown,
  ChevronRight,
  X
};

function renderIcons() {
  createIcons({ icons: appIcons });
}

// Translations Dictionary (Bilingual English & Filipino)
const TRANSLATIONS = {
  en: {
    'header-subtitle': 'Handheld Gun Bio-AI & Foliar Agronomy',
    'gun-header-title': 'Gun Foliar Scanner',
    'btn-pull-gun-trigger': 'PULL TRIGGER / CAPTURE FROM GUN',
    'btn-upload-photo': 'Upload Photo',
    'lbl-align-target': 'ALIGN LEAF / FRUIT TARGET',
    'lbl-no-frame': 'No Foliar Frame Captured',
    'lbl-severity': 'DISEASE SEVERITY:',
    'lbl-immediate-action': 'Immediate Action',
    'lbl-pruning-guide': 'Pruning & Sanitation Guide',
    'lbl-organic-treatment': 'Severity-Based Treatment',
    'lbl-monitoring-schedule': 'Monitoring Schedule',
    'status-no-scan': 'No Scan Performed',
    'desc-no-scan': 'Point gun scanner at Calamansi foliage or upload a photo to evaluate disease pathology.',
    'settings-btn': 'Settings',
    'btn-logout': 'Logout',
    'btn-save-cloud': 'Save Scan to Firestore Cloud',
    'tab-scan': 'Scan',
    'tab-agronomy': 'Agronomy',
    'tab-manual': 'Manual',
    'w-label-temp': 'Weather',
    'w-label-hum': 'Humidity',
    'w-label-rain': 'Rainfall',
    'w-label-soil': 'Soil Moisture',
    'turntable-header': 'Gun Foliar Targeting',
    'btn-start-scan': 'Capture Foliar Target',
    'btn-presets': 'Presets',
    'preset-healthy': 'Healthy Tree',
    'preset-canker': 'Citrus Canker',
    'preset-chlorosis': 'Nutrient Deficiency',
    'preset-mixed': 'Fruit Scab & Scale',
    'quadrant-header': 'Target Viewfinder',
    'btn-gemini-analyze': 'Gemini AI',
    'side-1': 'Target Frame',
    'side-2': 'Angle West',
    'side-3': 'Angle East',
    'side-4': 'Angle South',
    'gemini-report-title': 'Gemini AI Diagnostic Report',
    'leaf-analysis-title': 'Leaves Condition',
    'fruit-analysis-title': 'Fruit Condition',
    'organic-card-title': 'Organic Calamansi Care Guide',
    'organic-note': '💡 <strong>AI Note:</strong> Gemini AI detects nutrient needs visually! No commercial NPK fertilizer required.',
    'weather-logic-title': 'Weather & Irrigation Logic',
    'w-rain-title': 'Rainfall Advisory',
    'w-rain-desc': 'Rain expected this afternoon (35% probability). Hold organic sprays for 48 hours.',
    'w-irr-title': 'Irrigation Volume',
    'w-irr-desc': 'Apply 5 Liters of drip irrigation per tree early morning.',
    'modal-title': 'System Settings',
    'modal-save': 'Save Settings',

    // Mobile Manual Translations
    'manual-hero-title': 'KILATIS System Manual',
    'manual-hero-desc': 'Handheld Gun Bio-AI foliar diagnostic scanner with precision disease severity rating and climate-smart organic care for Calamansi citrus.',
    'manual-badge-status': 'Active',
    'manual-feat-heading': 'System Features',
    'feat1-title': 'Bio-Optic Gun Scanner',
    'feat1-desc': '1-touch optical trigger capture with LED illumination hood for instant foliar inspection.',
    'feat2-title': 'Gemini Multimodal AI Vision',
    'feat2-desc': 'Calculates precise disease severity (Mild, Moderate, Severe) and detects Canker, Scab, Melanose, Chlorosis, and Leaf Miner.',
    'feat3-title': 'Live Weather & Rain Advisories',
    'feat3-desc': 'Real-time Open-Meteo forecasting with automatic spray delay warnings before rain.',
    'feat4-title': '100% Home DIY Organic Care',
    'feat4-desc': 'Zero-cost recipes using spent coffee grounds, crushed eggshells, and banana peel tea.',
    'feat6-title': 'Real-Time Cloud Auto-Sync',
    'feat6-desc': 'Bi-directional Firestore synchronization connecting Mobile App and Handheld Gun Scanner.',
    'manual-steps-heading': 'Operating Guide',
    'step1-title': 'Position Gun & Power On',
    'step1-desc': 'Hold the gun scanner facing the Calamansi foliage or fruit clusters and turn on power switch.',
    'tip-label': 'Tip:',
    'step1-tip': 'Ensure optical hood is held 10–20cm from the leaf surface.',
    'step2-title': 'Aim and Center Foliar Target',
    'step2-desc': 'Center the symptomatic leaf or fruit inside the reticle crosshair.',
    'step3-title': 'Pull Trigger / Capture Image',
    'step3-desc': 'Press the gun trigger button on the handle or tap "PULL TRIGGER" in the mobile app.',
    'step4-title': 'Inspect Disease & Severity Meter',
    'step4-desc': 'Gemini AI calculates overall Health Score and rates severity as Mild, Moderate, or Severe.',
    'step5-title': 'Follow Severity-Tailored Actions',
    'step5-desc': 'Review immediate intervention, sanitized pruning guide, and customized organic remedies.',
    'step6-title': 'Apply Irrigation & Sync Live',
    'step6-desc': 'Apply smart drip irrigation and monitor live orchard health on your Android phone.',
    'manual-faq-heading': 'FAQ & Care',
    'faq1-q': 'Best time to scout and scan?',
    'faq1-a': 'Early morning (7:00 AM) or late afternoon (5:00 PM) for diffuse natural sunlight.',
    'faq2-q': 'What to do if rain is forecasted?',
    'faq2-a': 'Hold organic sprays for 48 hours to prevent wash-off loss.',
    'faq4-q': 'How to maintain the gun scanner?',
    'faq4-a': 'Keep the lens clean with a microfiber cloth and ensure 4x18650 battery cells are charged.',

    // Automatic Scanning Settings (EN)
    'auto-scan-title': 'Automatic Scanning',
    'auto-scan-desc': 'Scouting trigger synchronized via Cloud Firestore.',
    'mode-daily-time': 'Daily Time',
    'mode-interval': 'Interval',
    'label-scan-time': 'Scan Execution Time:',
    'label-scan-interval': 'Repeat Every:',
    'label-auto-ai': 'Auto-Run Gemini AI Diagnosis',
    'auto-scan-off': 'Auto-Scan: OFF',
    'auto-scan-daily-at': 'Auto: Daily at',
    'auto-scan-every': 'Auto: Every',
    'hours-abbr': 'hrs',
    'next-scan-disabled': 'Next scan: Disabled',
    'next-scan-scheduled-at': 'Next scan: Scheduled daily at',
    'next-scan-interval-every': 'Next scan: Runs every',

    // History Translations (EN)
    'tab-history': 'History',
    'history-title': 'Diagnostic History',
    'history-subtitle': 'Cloud-archived foliar scans and Gemini AI severity reports.',
    'history-empty-title': 'No Saved Reports',
    'history-empty-desc': 'Perform a scan or tap "Save Scan to Firestore Cloud" to view archived reports here.',
    'history-delete-btn': 'Delete',
    'history-delete-confirm': 'Are you sure you want to delete this scan report from Firestore Cloud?',
    'history-reports-count': 'Reports',

    // Brand Hub Menu (EN)
    'brand-hub-title': 'KILATIS Navigation Hub',
    'brand-hub-sub': 'Quick Screen & Feature Access',
    'menu-desc-scan': 'Live gun foliar camera & Gemini AI pathology with severity rating',
    'menu-desc-history': 'Cloud-saved scans, timestamps, & delete records',
    'menu-desc-agronomy': 'Natural DIY fertilizers, spray delays & irrigation logic',
    'menu-desc-manual': 'How KILATIS Gun works, hardware specs & operating guide',
    'menu-desc-presets': 'Healthy, Canker, Scab, Melanose, Chlorosis, & Scale',
    'menu-desc-settings': 'Auto-scan times, interval triggers, and device sync'
  },
  fil: {
    'header-subtitle': 'Hawak-kamay na Gun Bio-AI sa Calamansi',
    'gun-header-title': 'Gun Scanner sa Calamansi',
    'btn-pull-gun-trigger': 'IPUTOK ANG GATILYO / KUHA SA SCANNER',
    'btn-upload-photo': 'Mag-upload ng Kuha',
    'lbl-align-target': 'ITAPAT SA DAHON O BUNGA',
    'lbl-no-frame': 'Walang Nakuhang Larawan',
    'lbl-severity': 'LALÂ NG SAKIT (SEVERITY):',
    'lbl-immediate-action': 'Agad na Hakbang',
    'lbl-pruning-guide': 'Paghahawi at Kalinisan',
    'lbl-organic-treatment': 'Gamot Ayon sa Lalâ',
    'lbl-monitoring-schedule': 'Araw ng Pagsusuri',
    'status-no-scan': 'Walang Pagsusuri',
    'desc-no-scan': 'Itutok ang gun scanner sa dahon ng Calamansi o mag-upload ng larawan upang masuri.',
    'settings-btn': 'Mga Setting',
    'btn-logout': 'Mag-logout',
    'btn-save-cloud': 'I-save sa Firestore Cloud',
    'tab-scan': 'Suriin',
    'tab-history': 'Kasaysayan',
    'tab-agronomy': 'Agronomya',
    'tab-manual': 'Patnubay',
    'w-label-temp': 'Panahon',
    'w-label-hum': 'Humidity',
    'w-label-rain': 'Ulat Ulan',
    'w-label-soil': 'Basa ng Lupa',
    'turntable-header': 'Pagtutok ng Scanner',
    'btn-start-scan': 'Kumuha ng Larawan',
    'btn-presets': 'Halimbawa',
    'preset-healthy': 'Malusog na Puno',
    'preset-canker': 'Kanser sa Sitrus',
    'preset-chlorosis': 'Kulang sa Sustansya',
    'preset-mixed': 'Kurikong at Peste',
    'quadrant-header': 'Kuhang Larawan',
    'btn-gemini-analyze': 'Gemini AI',
    'side-1': 'Kuhang Frame',
    'side-2': 'Kanluran',
    'side-3': 'Silangan',
    'side-4': 'Timog',
    'gemini-report-title': 'Ulat ng Gemini AI',
    'leaf-analysis-title': 'Kalagayan ng Dahon',
    'fruit-analysis-title': 'Kalagayan ng Bunga',
    'organic-card-title': 'Organikong Pag-aalaga ng Calamansi',
    'organic-note': '💡 <strong>Paalala ng AI:</strong> Nakikita ng Gemini AI ang kailangan ng halaman sa kulay ng dahon! Hindi kailangan ng kemikal.',
    'weather-logic-title': 'Gabay sa Panahon at Pagdidilig',
    'w-rain-title': 'Paalala sa Ulan',
    'w-rain-desc': 'May ulan ngayong hapon (35% tsansa). Ipagpaliban muna ang pag-spray ng 48 oras.',
    'w-irr-title': 'Dami ng Tubig',
    'w-irr-desc': 'Magdilig ng 5 Litro ng tubig kada puno tuwing umaga.',
    'modal-title': 'Mga Setting',
    'modal-save': 'I-save ang Setting',

    // Mobile Manual Translations (Filipino)
    'manual-hero-title': 'Patnubay sa KILATIS Gun',
    'manual-hero-desc': 'Hawak-kamay na bio-optic scanner na may pagsusuri sa lalâ ng sakit at organikong lunas para sa tanim na Calamansi.',
    'manual-badge-status': 'Aktibo',
    'manual-feat-heading': 'Mga Katangian',
    'feat1-title': 'Bio-Optic Gun Scanner',
    'feat1-desc': 'Isang pindot sa gatilyo upang kunan ang apektadong dahon gamit ang may ilaw na hood.',
    'feat2-title': 'Gemini Multimodal AI Vision',
    'feat2-desc': 'Tinitimbang ang lalâ ng sakit (Mababaw, Katamtaman, Malubha) para sa Kanser, Kurikong, at Peste.',
    'feat3-title': 'Live na Panahon at Ulan',
    'feat3-desc': 'Ulat mula sa Open-Meteo na may paalala bago mag-spray kapag may ulan.',
    'feat4-title': '100% Likas na Organikong Lunas',
    'feat4-desc': 'Libreng sangkap gamit ang kape, balat ng itlog, at pinakuluang saging.',
    'feat6-title': 'Awtomatikong Cloud Sync',
    'feat6-desc': 'Sabay-sabay na konektado ang Mobile App at Gun Scanner gamit ang Firestore.',
    'manual-steps-heading': 'Patnubay sa Paggamit',
    'step1-title': 'Ihanda ang Gun Scanner at Buksan',
    'step1-desc': 'Hawakan ang gun scanner na nakatutok sa mga dahon o bunga ng Calamansi.',
    'tip-label': 'Payo:',
    'step1-tip': 'Panatilihin ang 10–20 sentimetrong layo sa pagitan ng nguso at dahon.',
    'step2-title': 'Itapat sa Gitna ng Reticle',
    'step2-desc': 'Igitna ang may sakit na dahon o bunga sa reticle crosshair.',
    'step3-title': 'Pindutin ang Gatilyo (Trigger)',
    'step3-desc': 'Pindutin ang trigger button sa hawakan o pindutin sa mobile app.',
    'step4-title': 'Tingnan ang Lalâ ng Sakit (Severity)',
    'step4-desc': 'Awtomatikong kukuwentahin ng Gemini AI ang Health Score at lalâ (Mababaw, Katamtaman, Malubha).',
    'step5-title': 'Sundin ang Payong Hakbang',
    'step5-desc': 'Basahin ang tamang paraan ng paghahawi ng sanga at likas na pamatay-sakit.',
    'step6-title': 'Magdilig at Bantayan sa Mobile',
    'step6-desc': 'Magdilig ng tamang sukat at bantayan ang kalusugan ng taniman sa cellphone.',
    'manual-faq-heading': 'Mga Tanong at Alaga',
    'faq1-q': 'Kailan dapat mag-scan?',
    'faq1-a': 'Maaga sa umaga (7:00 AM) o bandang hapon (5:00 PM) para banayad ang araw.',
    'faq2-q': 'Paano kapag uulan?',
    'faq2-a': 'Ipagpaliban ang pag-spray nang 48 oras upang hindi mahugasan.',
    'faq4-q': 'Paano aalagaan ang gun scanner?',
    'faq4-a': 'Linisin ang lens gamit ang malambot na tela at siguraduhing may karga ang 4x18650 baterya.',

    // Automatic Scanning Settings (FIL)
    'auto-scan-title': 'Awtomatikong Pagsusuri',
    'auto-scan-desc': 'Pagsusuri na konektado sa Cloud Firestore.',
    'mode-daily-time': 'Oras sa Bawat Araw',
    'mode-interval': 'Pana-panahon',
    'label-scan-time': 'Oras ng Pagsasagawa:',
    'label-scan-interval': 'Ulitin Tuwing:',
    'label-auto-ai': 'Awtomatikong Suriin gamit ang Gemini AI',
    'auto-scan-off': 'Auto-Scan: NAKAPATAY',
    'auto-scan-daily-at': 'Auto: Araw-araw sa',
    'auto-scan-every': 'Auto: Tuwing',
    'hours-abbr': 'oras',
    'next-scan-disabled': 'Susunod na scan: Naka-off',
    'next-scan-scheduled-at': 'Susunod na scan: Araw-araw tuwing',
    'next-scan-interval-every': 'Susunod na scan: Tuwing',

    // History Translations (FIL)
    'history-title': 'Kasaysayan ng mga Pagsusuri',
    'history-subtitle': 'Naka-save na mga ulat at foliar scan sa Cloud Firestore.',
    'history-empty-title': 'Walang Naka-save na Ulat',
    'history-empty-desc': 'Magsagawa ng scan o pindutin ang "I-save sa Firestore Cloud" upang makita ang mga ulat dito.',
    'history-delete-btn': 'Burahin',
    'history-delete-confirm': 'Sigurado ka bang nais mong burahin ang ulat na ito sa Firestore Cloud?',
    'history-reports-count': 'Mga Ulat',

    // Brand Hub Menu (FIL)
    'brand-hub-title': 'Navigasyon ng KILATIS',
    'brand-hub-sub': 'Mabilisang Paglipat ng Menu at Gamit',
    'menu-desc-scan': 'Live gun foliar camera at Gemini AI na pagsusuri na may severity meter',
    'menu-desc-history': 'Naka-save na mga scan, oras, at pagbura ng ulat',
    'menu-desc-agronomy': 'Likas na pataba, paalala sa ulan, at tamang tubig',
    'menu-desc-manual': 'Paano gamitin ang Gun, mga piyesa, at gabay sa paggamot',
    'menu-desc-presets': 'Halimbawa ng Malusog, Kanser, Kurikong, at Peste',
    'menu-desc-settings': 'Oras ng auto-scan, agwat ng oras, at device sync'
  }
};

const PRESETS = {
  healthy: {
    score: 94,
    severity: 'None',
    severityStage: 'Optimal: Clean glossy cuticle with zero lesions',
    percent: 0,
    statusText: { en: 'Vibrant & Healthy', fil: 'Napakamalusog at Maganda' },
    summary: {
      en: 'Foliar surface exhibits excellent chlorophyll levels, uniform rind glossiness, and no sign of pest or fungal infection.',
      fil: 'Maganda ang kulay ng mga dahon, makinis ang bunga, at walang nakikitang peste o sugat.'
    },
    img0: '/calamansi_healthy.png',
    leafStatus: { en: 'Healthy', fil: 'Malusog' },
    leafTag: 'tag-healthy',
    leafFindings: {
      en: ['Normal dark green glossy leaf surfaces.', 'Zero chlorosis, yellowing, or vein corking.'],
      fil: ['Makintab at kulay berde ang mga dahon.', 'Walang paninilaw sa gitna ng mga dahon.']
    },
    fruitStatus: { en: 'Optimal', fil: 'Pinakamaganda' },
    fruitTag: 'tag-healthy',
    fruitFindings: {
      en: ['Smooth peel with fully developed juice vesicles.', 'Zero melanose, scab, or thrip scars.'],
      fil: ['Makinis ang balat at juicy ang loob ng bunga.', 'Walang sugat ng kurikong o gasgas.']
    },
    severityRecommendations: {
      immediateAction: {
        en: 'Maintain baseline preventative scouting protocol.',
        fil: 'Panatilihin ang karaniwang pag-aalaga at pagmamasid.'
      },
      pruningGuide: {
        en: 'Standard structural shaping only during dry season.',
        fil: 'Karaniwang pag-aayos lamang ng hugis ng puno tuwing tag-araw.'
      },
      treatment: {
        en: 'Enrich topsoil with crushed eggshells (calcium boost) and banana peel tea.',
        fil: 'Maglagay ng pinulbos na balat ng itlog para sa ugat at balat ng saging.'
      },
      monitoringSchedule: {
        en: 'Routine bi-weekly monitoring.',
        fil: 'Karaniwang pagsusuri kada 2 linggo.'
      }
    },
    organicRecs: [
      { icon: "☕", title: { en: "Used Coffee Grounds", fil: "Pinagkapan ng Kape" }, sub: { en: "Green Leaves & Growth", fil: "Luntiang Dahon at Paglaki" }, desc: { en: "Mix 2 tbsp of dried coffee grounds into topsoil every 2 weeks.", fil: "Maghalo ng 2 kutsarang tuyong kape sa lupa kada 2 linggo." } },
      { icon: "🥚", title: { en: "Crushed Eggshells", fil: "Binudburang Balat ng Itlog" }, sub: { en: "Strong Roots & Flowering", fil: "Matibay na Ugat at Bulaklak" }, desc: { en: "Boil and crush eggshells into powder. Mix 2 tbsp powder with 1L water.", fil: "Pakuluan at durugin ang balat ng itlog. Ihalo sa 1L tubig." } },
      { icon: "🍌", title: { en: "Banana Peel Tea", fil: "Pinakuluang Balat ng Saging" }, sub: { en: "Juicy Calamansi Fruit", fil: "Makatás at Malaking Bunga" }, desc: { en: "Chop 3 banana peels and soak in 1L water for 3 days to boost juice.", fil: "Hiwain ang 3 balat ng saging at ibabad sa 1L tubig nang 3 araw." } }
    ]
  },
  canker: {
    score: 38,
    severity: 'Severe',
    severityStage: 'Stage 3: Advanced necrotic lesions with chlorotic halos',
    percent: 72,
    statusText: { en: 'Severe Citrus Canker Infection', fil: 'Malubhang Kanser sa Sitrus' },
    summary: {
      en: 'Critical detection of raised corky brown lesions with yellow halos on leaves and twigs. High risk of orchard epidemic.',
      fil: 'Nakitang may maitim at magaspang na sugat sa mga dahon at sanga. Malubhang impeksiyon ng bakterya.'
    },
    img0: '/calamansi_canker.png',
    leafStatus: { en: 'Canker Lesions', fil: 'May Sugat na Kanser' },
    leafTag: 'tag-danger',
    leafFindings: {
      en: ['Raised, corky brown lesions with oily margins on leaves.', 'Chlorotic yellow halos surrounding necrotic spots.'],
      fil: ['Magaspang at maitim na sugat sa dahon.', 'May paninilaw sa paligid ng sugat.']
    },
    fruitStatus: { en: 'Lesions Present', fil: 'May Sugat ang Bunga' },
    fruitTag: 'tag-danger',
    fruitFindings: {
      en: ['Crater-like dark scabs on Calamansi fruit peel.', 'Premature fruit drop imminent.'],
      fil: ['Parang sugat sa balat ng bunga.', 'Maaaring malaglag ang bunga nang maaga.']
    },
    severityRecommendations: {
      immediateAction: {
        en: 'Strictly isolate this branch. Halt overhead sprinkler irrigation to stop bacterial splash spread.',
        fil: 'Ibukod ang apektadong sanga. Huwag basain mula sa itaas upang hindi kumalat ang bakterya.'
      },
      pruningGuide: {
        en: 'Prune twigs 15cm below lowest lesion. Disinfect shears with 70% alcohol between cuts. Bag and burn clippings.',
        fil: 'Gupitin ang sanga 15 sentimetro sa ibaba ng sugat gamit ang gunting na binabad sa 70% alcohol. Sunugin o ibaon ang naputol.'
      },
      treatment: {
        en: 'Spray organic copper soap or concentrated garlic-neem bactericide thoroughly on dry leaves.',
        fil: 'Mag-spray ng organikong sabong-tanso o pinakuluang bawang at neem oil sa tuyong dahon.'
      },
      monitoringSchedule: {
        en: 'Re-scan infected quadrant in 3 days. Inspect all trees within 5 meters.',
        fil: 'Muling suriin makalipas ang 3 araw. Tingnan ang mga katabing puno sa loob ng 5 metro.'
      }
    },
    organicRecs: [
      { icon: "🧄", title: { en: "Garlic & Neem Spray", fil: "Spray ng Bawang at Neem" }, sub: { en: "Antibacterial Shield", fil: "Pampatay ng Bakterya" }, desc: { en: "Boil crushed garlic and neem oil. Spray to halt bacterial canker spread.", fil: "Pakuluan ang bawang at neem oil. I-spray sa dahon para pigilan ang bakterya." } },
      { icon: "✂️", title: { en: "Sanitary Pruning", fil: "Paghahawi ng Sanga" }, sub: { en: "Isolate Infection", fil: "Pang-iwas Hawa" }, desc: { en: "Prune infected twigs 15cm below lesions and burn cut leaves.", fil: "Gupitin ang sanga 15cm sa ibaba ng sugat at ibaon ang naputol na dahon." } }
    ]
  },
  chlorosis: {
    score: 72,
    severity: 'Mild',
    severityStage: 'Stage 1: Incipient interveinal yellowing (<20% coverage)',
    percent: 18,
    statusText: { en: 'Mild Micronutrient Deficiency', fil: 'Mababaw na Kulang sa Sustansya' },
    summary: {
      en: 'Interveinal yellowing detected on young upper leaves, indicating early Zinc & Iron deficiency in soil.',
      fil: 'Naninilaw ang dahon ngunit berde ang ugat. Kulang sa Iron at Zinc ang halaman.'
    },
    img0: '/calamansi_healthy.png',
    leafStatus: { en: 'Early Chlorosis', fil: 'Naninilaw na Dahon' },
    leafTag: 'tag-warning',
    leafFindings: {
      en: ['Interveinal yellowing with green main veins on young leaves.', 'Leaf size mildly reduced.'],
      fil: ['Naninilaw ang pagitan ng dahon.', 'Maliit ang mga bagong sibol na dahon.']
    },
    fruitStatus: { en: 'Vigor Preserved', fil: 'Normal ang Bunga' },
    fruitTag: 'tag-healthy',
    fruitFindings: {
      en: ['Fruit development steady.', 'Peel color is light green.'],
      fil: ['Maayos ang paglaki ng bunga.', 'Maputla nang kaunti ang balat.']
    },
    severityRecommendations: {
      immediateAction: {
        en: 'Lightly aerify topsoil around dripline to enhance root respiration and mineral absorption.',
        fil: 'Bungkalin nang marahan ang lupa 30cm ang layo sa puno upang makahinga ang ugat.'
      },
      pruningGuide: {
        en: 'No heavy pruning required. Pinch off dead terminal tips only.',
        fil: 'Hindi kailangang magputol ng malalaking sanga. Alisin lamang ang mga tuyong dulo.'
      },
      treatment: {
        en: 'Apply 2 tbsp spent coffee grounds and drench soil with rusty iron nail tea.',
        fil: 'Maglagay ng 2 kutsarang tuyong kape sa lupa at idilig ang tubig na may lumang pako.'
      },
      monitoringSchedule: {
        en: 'Re-scan new flushes in 10-14 days for chlorophyll recovery.',
        fil: 'Tingnan kung naging berde ang mga bagong dahon makalipas ang 10-14 araw.'
      }
    },
    organicRecs: [
      { icon: "📌", title: { en: "Ferrous Iron Water", fil: "Tubig na may Iron sa Pako" }, sub: { en: "Iron Boost", fil: "Pampabalik ng Berde" }, desc: { en: "Soak clean iron nails in water for 3 days. Drench soil to restore green color.", fil: "Ibabad ang pako sa tubig nang 3 araw. Idilig sa lupa upang bumalik ang luntiang dahon." } },
      { icon: "☕", title: { en: "Coffee Grounds", fil: "Pinagkapan ng Kape" }, sub: { en: "Acidify Soil", fil: "Pampataba ng Lupa" }, desc: { en: "Mix dried coffee grounds into topsoil to unlock trace minerals.", fil: "Magbaon ng kape sa lupa upang mabilis na ma-absorb ng ugat ang sustansya." } }
    ]
  },
  mixed: {
    score: 62,
    severity: 'Moderate',
    severityStage: 'Stage 2: Moderate pustules & scale colonies (20-40%)',
    percent: 35,
    statusText: { en: 'Moderate Fruit Scab & Scale', fil: 'Katamtamang Kurikong at Peste' },
    summary: {
      en: 'Foliar pustules consistent with Elsinoë fawcettii alongside localized scale colonies on fruit clusters.',
      fil: 'May mga bukol ng kurikong at maliliit na kuto o scale sa balat ng bunga.'
    },
    img0: '/calamansi_canker.png',
    leafStatus: { en: 'Scab Pustules', fil: 'May Bukol ng Kurikong' },
    leafTag: 'tag-warning',
    leafFindings: {
      en: ['Warty conical pustules on young foliage.', 'Canopy center needs better ventilation.'],
      fil: ['May mga bukol sa murang dahon.', 'Kulang sa hangin ang gitna ng puno.']
    },
    fruitStatus: { en: 'Scale Insects', fil: 'May Peste ang Balat' },
    fruitTag: 'tag-warning',
    fruitFindings: {
      en: ['Small scale insects clinging to fruit peel.', 'Juice yield intact.'],
      fil: ['May kumakapit na maliit na insekto sa balat.', 'Mapapakinabangan pa ang katas.']
    },
    severityRecommendations: {
      immediateAction: {
        en: 'Prune congested inner water shoots to allow sunlight penetration and airflow.',
        fil: 'Hawiin ang maliliit na sanga sa gitna upang mahanginan at masikatan ng araw.'
      },
      pruningGuide: {
        en: 'Cut moderately deformed leaf clusters. Clean tools with diluted vinegar/soap.',
        fil: 'Putulin ang mga dahong may maraming bukol gamit ang malinis na gunting.'
      },
      treatment: {
        en: 'Spray soapy neem emulsion (1 tsp dish soap + 5ml neem oil in 1L water) early morning.',
        fil: 'Maghalo ng 1 kutsaritang sabon at neem oil sa 1L tubig. I-spray tuwing umaga.'
      },
      monitoringSchedule: {
        en: 'Re-evaluate in 7 days after application.',
        fil: 'Suriin muli pagkaraan ng 7 araw matapos mag-spray.'
      }
    },
    organicRecs: [
      { icon: "🧼", title: { en: "Soapy Neem Emulsion", fil: "Sabon at Neem Spray" }, sub: { en: "Pest Deterrent", fil: "Pampataboy ng Insekto" }, desc: { en: "Mix 1 tsp dish soap + 5ml neem oil in 1L water. Spray on fruit clusters.", fil: "Maghalo ng sabon at neem oil sa 1L tubig. I-spray sa bunga para matanggal ang kuto." } }
    ]
  }
};

const state = {
  currentUser: null,
  lang: localStorage.getItem('calamansi_android_lang') || 'en',
  activeScreen: 'scan',
  activeAngleIndex: 0,
  isScanning: false,
  rpiName: localStorage.getItem('calamansi_rpi_name') || 'RPi Gun Scanner 1',
  location: localStorage.getItem('calamansi_location') || 'Manila, Philippines',
  activePreset: '',
  targetImage: '',
  
  // Automatic Scanning Schedule Settings (Firestore Synced)
  autoScanEnabled: localStorage.getItem('calamansi_auto_scan_enabled') === 'true',
  autoScanMode: localStorage.getItem('calamansi_auto_scan_mode') || 'time',
  autoScanTime: localStorage.getItem('calamansi_auto_scan_time') || '07:00',
  autoScanIntervalHours: parseInt(localStorage.getItem('calamansi_auto_scan_interval') || '6', 10),
  autoAnalyzeEnabled: localStorage.getItem('calamansi_auto_analyze_enabled') !== 'false',
  lastAutoScanIso: localStorage.getItem('calamansi_last_auto_scan_iso') || '',

  weather: {
    temp: '29.4°C',
    humidity: '78% RH',
    rainChance: '35%',
    soilMoisture: 62,
    condition: 'Partly Cloudy'
  },

  quadrants: [
    { angle: 0, img: '' },
    { angle: 90, img: '' },
    { angle: 180, img: '' },
    { angle: 270, img: '' }
  ],

  analysis: {
    isCalamansi: true,
    diseaseIdentified: 'Healthy Foliage',
    healthScore: 0,
    severity: 'None',
    severityStage: 'No active infection detected',
    severityPercent: 0,
    statusText: { en: 'No Scan Performed', fil: 'Walang Pagsusuri' },
    summaryText: {
      en: 'Point gun scanner at Calamansi foliage or upload a photo to evaluate disease pathology.',
      fil: 'Itutok ang scanner sa dahon ng Calamansi o mag-upload ng larawan upang masuri.'
    },
    severityRecommendations: {
      immediateAction: {
        en: 'Pull trigger to inspect target foliage.',
        fil: 'Pindutin ang gatilyo upang suriin ang dahon.'
      },
      pruningGuide: {
        en: 'Standard preventative canopy maintenance.',
        fil: 'Karaniwang pag-aayos ng sanga.'
      },
      treatment: {
        en: 'Zero-cost organic soil and leaf care.',
        fil: 'Likas na pataba at gamot.'
      },
      monitoringSchedule: {
        en: 'Routine bi-weekly observation.',
        fil: 'Pagsusuri kada 2 linggo.'
      }
    },
    leafStatus: { en: 'Awaiting Scan', fil: 'Naghihintay ng Scan' },
    leafTagClass: 'tag-dimmed',
    leafFindings: {
      en: ['No leaf scan data available yet.'],
      fil: ['Wala pang datos sa pagsusuri ng dahon.']
    },
    fruitStatus: { en: 'Awaiting Scan', fil: 'Naghihintay ng Scan' },
    fruitTagClass: 'tag-dimmed',
    fruitFindings: {
      en: ['No fruit scan data available yet.'],
      fil: ['Wala pang datos sa pagsusuri ng bunga.']
    },
    treatment: {
      type: 'none',
      title: { en: 'Awaiting Scan', fil: 'Naghihintay ng Scan' },
      desc: { en: 'Perform a scan to generate customized care and treatment advice.', fil: 'Magsagawa ng scan upang makita ang payo sa pag-aalaga.' }
    },
    organicRecs: []
  }
};

document.addEventListener('DOMContentLoaded', () => {
  renderIcons();
  initAndroidClock();
  initBrandMenu();
  initAngleSelector();
  initPresets();
  initAuth();
  initWeather();
  init3DViews();
  initUploads();
  initActions();
  initAutoScanScheduler();
  initHistoryListener();
  applyLanguage(state.lang);
});

// Update Android Simulated Status Bar Clock
function initAndroidClock() {
  const clockEl = document.getElementById('status-clock');
  const updateTime = () => {
    if (!clockEl) return;
    const now = new Date();
    clockEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  updateTime();
  setInterval(updateTime, 30000);
}

// KILATIS Brand Logo Menu Hub (Android)
function initBrandMenu() {
  const brandBtn = document.getElementById('app-brand-btn');
  const overlay = document.getElementById('brand-menu-overlay');
  const sheet = document.getElementById('brand-menu-sheet');
  const closeBtn = document.getElementById('brand-menu-close-btn');
  const menuItems = document.querySelectorAll('.brand-menu-item');
  const langEnBtn = document.getElementById('brand-lang-en-btn');
  const langFilBtn = document.getElementById('brand-lang-fil-btn');
  const logoutBtn = document.getElementById('brand-menu-logout-btn');

  const openMenu = () => {
    if (overlay && sheet) {
      overlay.classList.add('active');
      sheet.classList.add('active');
      brandBtn?.classList.add('active');
      menuItems.forEach(item => {
        item.classList.toggle('active', item.dataset.screen === state.activeScreen);
      });
      if (langEnBtn && langFilBtn) {
        langEnBtn.classList.toggle('active', state.lang === 'en');
        langFilBtn.classList.toggle('active', state.lang === 'fil');
      }
    }
  };

  const closeMenu = () => {
    if (overlay && sheet) {
      overlay.classList.remove('active');
      sheet.classList.remove('active');
      brandBtn?.classList.remove('active');
    }
  };

  if (brandBtn) {
    brandBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (overlay?.classList.contains('active')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeMenu();
    });
  }

  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeMenu();
      }
    });
  }

  menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      const screenTarget = item.dataset.screen;
      switchScreen(screenTarget);
      closeMenu();
    });
  });

  if (langEnBtn) {
    langEnBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      switchLanguage('en');
      langEnBtn.classList.add('active');
      langFilBtn?.classList.remove('active');
    });
  }

  if (langFilBtn) {
    langFilBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      switchLanguage('fil');
      langFilBtn.classList.add('active');
      langEnBtn?.classList.remove('active');
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      signOut(auth).then(() => {
        window.location.replace('/login.html');
      });
    });
  }
}

function switchScreen(screenTarget) {
  state.activeScreen = screenTarget;
  document.querySelectorAll('.brand-menu-item').forEach(m => {
    m.classList.toggle('active', m.dataset.screen === screenTarget);
  });
  document.querySelectorAll('.mobile-screen').forEach(s => {
    s.classList.toggle('active', s.id === `screen-${screenTarget}`);
  });
}

// 3D Turntable & Canvas
function init3DViews() {
  try {
    threeBg = create3DBackground('bg-3d-canvas');
    threeTurntableRig = create3DTurntable('turntable-3d-container');
  } catch (e) {
    console.warn('3D initialization:', e);
  }
}

// Angle Selector Pill Buttons
// Gun-Style Foliar Trigger & Viewfinder Controls
function initAngleSelector() {
  const gunTriggerBtn = document.getElementById('start-gun-trigger-btn');
  if (gunTriggerBtn) gunTriggerBtn.addEventListener('click', runGunTriggerCapture);

  // Backward compatibility for any remaining 360 buttons
  const legacyScanBtn = document.getElementById('start-360-scan-btn');
  if (legacyScanBtn) legacyScanBtn.addEventListener('click', runGunTriggerCapture);

  const analyzeBtn = document.getElementById('analyze-gemini-btn');
  if (analyzeBtn) analyzeBtn.addEventListener('click', runGeminiAnalysis);
}

async function runGunTriggerCapture() {
  if (state.isScanning) return;
  state.isScanning = true;

  // Reset preset chip styling so fresh capture is evaluated
  state.activePreset = '';
  document.querySelectorAll('.preset-chip').forEach(c => c.classList.remove('active'));

  const btn = document.getElementById('start-gun-trigger-btn') || document.getElementById('start-360-scan-btn');
  const badge = document.getElementById('gun-status-badge') || document.getElementById('motor-status-badge');
  const isFil = state.lang === 'fil';

  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<i data-lucide="loader" class="spin"></i> ${isFil ? 'Kumukuha ng Larawan...' : 'Triggering Gun...'}`;
    renderIcons();
  }
  if (badge) {
    badge.textContent = isFil ? 'Kinukunan ang Dahon' : 'Optical Capture Active';
    badge.className = 'badge-tag tag-warning';
  }

  const commandTimestamp = Date.now();

  // 1. Send real-time gun capture command to Cloud Firestore
  try {
    const syncDocRef = doc(db, 'system_sync', 'latest_scan');
    await setDoc(syncDocRef, {
      command: 'gun_capture',
      commandTimestamp: commandTimestamp,
      isScanning: true,
      activePreset: '',
      source: 'android'
    }, { merge: true });
  } catch (err) {
    console.warn('[KILATIS Mobile] Firestore command notice:', err);
  }

  // 2. Direct LAN trigger if RPi is on same Wi-Fi
  let directLanResult = null;
  try {
    const lanRes = await fetch('http://192.168.0.115:5000/api/gun/trigger', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lang: state.lang })
    });
    if (lanRes.ok) {
      directLanResult = await lanRes.json();
    }
  } catch (e) {}

  if (directLanResult && directLanResult.image) {
    setGunCapturedImage(directLanResult.image);
    if (directLanResult.diagnosis) {
      state.analysis = Object.assign({}, state.analysis, directLanResult.diagnosis);
    }
    state.isScanning = false;
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `<i data-lucide="crosshair"></i> <span data-i18n="btn-pull-gun-trigger">${isFil ? 'GATILYO / KUHA SA SCANNER' : 'PULL TRIGGER / CAPTURE FROM GUN'}</span>`;
      renderIcons();
    }
    if (badge) {
      badge.textContent = isFil ? 'Nakuha ang Larawan' : 'Gun Captured (1-Shot)';
      badge.className = 'badge-tag tag-healthy';
    }
    renderReportUI();
    syncToFirestore('android');
    return;
  }

  // Simulation / Cloud Trigger Animation (1.5 seconds)
  setTimeout(() => {
    state.isScanning = false;
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `<i data-lucide="crosshair"></i> <span data-i18n="btn-pull-gun-trigger">${isFil ? 'GATILYO / KUHA SA SCANNER' : 'PULL TRIGGER / CAPTURE FROM GUN'}</span>`;
      renderIcons();
    }
    if (badge) {
      badge.textContent = isFil ? 'Handa ang Scanner' : 'Gun Armed (1-Shot)';
      badge.className = 'badge-tag tag-healthy';
    }

    // If no target image is loaded yet, load realistic field capture
    if (!state.targetImage) {
      setGunCapturedImage('/calamansi_canker.png');
    }
    runGeminiAnalysis();
    syncToFirestore('android');
  }, 1600);
}

function setGunCapturedImage(imageSrc) {
  state.targetImage = imageSrc;
  const targetImg = document.getElementById('gun-target-img');
  const placeholder = document.getElementById('gun-placeholder-box');
  if (targetImg) {
    targetImg.src = imageSrc;
    targetImg.style.display = 'block';
  }
  if (placeholder) placeholder.style.display = 'none';

  // Also sync first quadrant for backward compatibility
  if (state.quadrants && state.quadrants[0]) {
    state.quadrants[0].img = imageSrc;
  }
}

// Photo Upload Triggering
function initUploads() {
  window.triggerSingleUpload = function() {
    const input = document.getElementById('single-foliar-upload');
    if (input) input.click();
  };

  const singleInput = document.getElementById('single-foliar-upload');
  if (singleInput) {
    singleInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setGunCapturedImage(event.target.result);
          state.activePreset = '';
          document.querySelectorAll('.preset-chip').forEach(c => c.classList.remove('active'));
          runGeminiAnalysis();
          syncToFirestore('android');
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Legacy upload function
  window.triggerUpload = function(angle) {
    window.triggerSingleUpload();
  };
}

// Preset Picker
function initPresets() {
  const chips = document.querySelectorAll('.preset-chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      state.activePreset = chip.dataset.preset;
      applyPresetData(PRESETS[state.activePreset]);
      syncToFirestore('android');
    });
  });

  const triggerBtn = document.getElementById('preset-analyze-trigger-btn');
  if (triggerBtn) {
    triggerBtn.addEventListener('click', () => {
      switchScreen('scan');
      runGeminiAnalysis();
    });
  }
}

function applyPresetData(preset) {
  if (!preset) return;
  setGunCapturedImage(preset.img0 || '/calamansi_healthy.png');

  state.analysis.isCalamansi = true;
  state.analysis.healthScore = preset.score;
  state.analysis.severity = preset.severity || 'None';
  state.analysis.severityStage = preset.severityStage || '';
  state.analysis.severityPercent = preset.percent !== undefined ? preset.percent : 0;
  state.analysis.statusText = preset.statusText;
  state.analysis.summaryText = preset.summary;
  state.analysis.leafStatus = preset.leafStatus;
  state.analysis.leafTagClass = preset.leafTag;
  state.analysis.leafFindings = preset.leafFindings;
  state.analysis.fruitStatus = preset.fruitStatus;
  state.analysis.fruitTagClass = preset.fruitTag;
  state.analysis.fruitFindings = preset.fruitFindings;
  if (preset.severityRecommendations) state.analysis.severityRecommendations = preset.severityRecommendations;
  if (preset.organicRecs) state.analysis.organicRecs = preset.organicRecs;

  renderReportUI();
}

function renderReportUI() {
  const isFil = state.lang === 'fil';
  const a = state.analysis;
  const score = a.healthScore !== undefined ? a.healthScore : 0;

  // 1. Health Score Radial Ring
  const scoreEl = document.getElementById('health-score-val');
  if (scoreEl) scoreEl.textContent = `${score}%`;
  
  const circle = document.getElementById('health-score-circle');
  const scoreContainer = document.getElementById('health-score-container');
  if (circle) {
    if (score === 0) {
      circle.style.strokeDashoffset = 201;
      circle.style.stroke = 'rgba(255, 255, 255, 0.2)';
      if (scoreContainer) scoreContainer.className = 'health-score-container no-scan';
    } else {
      const offset = 201 - (201 * score) / 100;
      circle.style.strokeDashoffset = offset;
      circle.style.stroke = score >= 80 ? '#10b981' : (score >= 55 ? '#f59e0b' : '#ef4444');
      if (scoreContainer) scoreContainer.className = 'health-score-container';
    }
  }

  const headingEl = document.getElementById('health-status-heading');
  if (headingEl) {
    headingEl.textContent = typeof a.statusText === 'object' ? (a.statusText[state.lang] || a.statusText.en) : a.statusText;
  }

  const descEl = document.getElementById('health-summary-desc');
  if (descEl) {
    descEl.textContent = typeof a.summaryText === 'object' ? (a.summaryText[state.lang] || a.summaryText.en) : a.summaryText;
  }

  // 2. Disease Severity Meter & Progression
  const sevBadge = document.getElementById('mobile-severity-badge');
  const sevFill = document.getElementById('mobile-severity-fill');
  const sevStage = document.getElementById('mobile-severity-stage');
  const sevPercent = document.getElementById('mobile-severity-percent');
  const tierMild = document.getElementById('tier-lbl-mild');
  const tierMod = document.getElementById('tier-lbl-moderate');
  const tierSev = document.getElementById('tier-lbl-severe');

  const severity = (a.severity || 'None').toLowerCase();
  const percent = a.severityPercent !== undefined ? a.severityPercent : (a.affectedAreaPercentage || 0);

  if (sevBadge) {
    sevBadge.className = 'severity-badge-tag';
    if (tierMild) tierMild.style.color = 'rgba(255, 255, 255, 0.4)';
    if (tierMod) tierMod.style.color = 'rgba(255, 255, 255, 0.4)';
    if (tierSev) tierSev.style.color = 'rgba(255, 255, 255, 0.4)';

    if (severity === 'severe') {
      sevBadge.classList.add('sev-tag-severe');
      sevBadge.textContent = isFil ? 'MALUBHA / LALÂ (STAGE 3)' : 'SEVERE (STAGE 3)';
      if (sevFill) sevFill.style.width = `${Math.max(68, percent)}%`;
      if (tierSev) tierSev.style.color = '#fff';
      if (sevStage) sevStage.textContent = a.severityStage || (isFil ? 'Nekrotikong pinsala sa sanga (>40%)' : 'Necrotic foliage coverage (>40%)');
    } else if (severity === 'moderate') {
      sevBadge.classList.add('sev-tag-moderate');
      sevBadge.textContent = isFil ? 'KATAMTAMAN (STAGE 2)' : 'MODERATE (STAGE 2)';
      if (sevFill) sevFill.style.width = `${Math.max(35, percent)}%`;
      if (tierMod) tierMod.style.color = '#fff';
      if (sevStage) sevStage.textContent = a.severityStage || (isFil ? 'Kumakalat na sugat (20-40%)' : 'Disseminated lesions (20-40%)');
    } else if (severity === 'mild') {
      sevBadge.classList.add('sev-tag-mild');
      sevBadge.textContent = isFil ? 'MABABAW / MAAGA (STAGE 1)' : 'MILD (STAGE 1)';
      if (sevFill) sevFill.style.width = `${Math.max(15, percent)}%`;
      if (tierMild) tierMild.style.color = '#fff';
      if (sevStage) sevStage.textContent = a.severityStage || (isFil ? 'Nagsisimulang mga patak (<20%)' : 'Incipient foliar spots (<20%)');
    } else {
      sevBadge.classList.add('sev-tag-healthy');
      sevBadge.textContent = isFil ? 'WALANG SAKIT / LUNTIAN' : 'NONE / HEALTHY';
      if (sevFill) sevFill.style.width = '0%';
      if (sevStage) sevStage.textContent = a.severityStage || (isFil ? 'Luntiang kloropil, walang impeksiyon' : 'Glossy chlorophyll, no infection');
    }
  }
  if (sevPercent) sevPercent.textContent = `${percent}% Foliar Area`;

  // 3. Severity-Tailored Action & Treatment Protocol
  const getRecTxt = (obj) => {
    if (!obj) return '';
    if (typeof obj === 'object') return obj[state.lang] || obj.en || '';
    return obj;
  };

  const recs = a.severityRecommendations || {};
  const immEl = document.getElementById('mobile-immediate-text');
  if (immEl) immEl.textContent = getRecTxt(recs.immediateAction) || (isFil ? 'Bantayan ang apektadong sanga.' : 'Inspect target branch.');

  const prnEl = document.getElementById('mobile-pruning-text');
  if (prnEl) prnEl.textContent = getRecTxt(recs.pruningGuide) || (isFil ? 'Sanitize ang gunting bago at pagkatapos magputol.' : 'Sanitize cutting tools with 70% alcohol.');

  const trtEl = document.getElementById('mobile-treatment-text');
  if (trtEl) trtEl.textContent = getRecTxt(recs.treatment) || (isFil ? 'Maglagay ng likas na pataba o spray.' : 'Apply organic foliar treatment.');

  const schEl = document.getElementById('mobile-monitoring-text');
  if (schEl) schEl.textContent = getRecTxt(recs.monitoringSchedule) || (isFil ? 'Suriin muli makalipas ang ilang araw.' : 'Re-evaluate in 3–7 days.');

  // 4. Leaf Breakdown
  const leafTag = document.getElementById('leaf-status-tag');
  if (leafTag) {
    leafTag.textContent = typeof a.leafStatus === 'object' ? (a.leafStatus[state.lang] || a.leafStatus.en) : a.leafStatus;
    leafTag.className = `badge-tag ${a.leafTagClass || (score === 0 ? 'tag-dimmed' : 'tag-healthy')}`;
  }

  const leafList = document.getElementById('leaf-findings-list');
  if (leafList) {
    const leafArr = a.leafFindings ? (a.leafFindings[state.lang] || a.leafFindings.en || a.leafFindings) : [];
    if (Array.isArray(leafArr)) {
      const isWarnOrBad = a.leafTagClass === 'tag-danger' || a.leafTagClass === 'tag-warning' || score < 60;
      const iconName = isWarnOrBad ? 'alert-triangle' : (score === 0 ? 'info' : 'check-circle');
      const iconStyle = isWarnOrBad ? 'style="color:var(--accent-red,#ef4444);"' : (score === 0 ? 'style="color:var(--text-muted);"' : 'style="color:var(--accent-green,#10b981);"');
      leafList.innerHTML = leafArr.map(f => `<li><i data-lucide="${iconName}" ${iconStyle}></i> ${f}</li>`).join('');
    }
  }

  // 5. Fruit Breakdown
  const fruitTag = document.getElementById('fruit-status-tag');
  if (fruitTag) {
    fruitTag.textContent = typeof a.fruitStatus === 'object' ? (a.fruitStatus[state.lang] || a.fruitStatus.en) : a.fruitStatus;
    fruitTag.className = `badge-tag ${a.fruitTagClass || (score === 0 ? 'tag-dimmed' : 'tag-healthy')}`;
  }

  const fruitList = document.getElementById('fruit-findings-list');
  if (fruitList) {
    const fruitArr = a.fruitFindings ? (a.fruitFindings[state.lang] || a.fruitFindings.en || a.fruitFindings) : [];
    if (Array.isArray(fruitArr)) {
      const isWarnOrBad = a.fruitTagClass === 'tag-danger' || a.fruitTagClass === 'tag-warning' || score < 60;
      const iconName = isWarnOrBad ? 'alert-triangle' : (score === 0 ? 'info' : 'check-circle');
      const iconStyle = isWarnOrBad ? 'style="color:var(--accent-red,#ef4444);"' : (score === 0 ? 'style="color:var(--text-muted);"' : 'style="color:var(--accent-green,#10b981);"');
      fruitList.innerHTML = fruitArr.map(f => `<li><i data-lucide="${iconName}" ${iconStyle}></i> ${f}</li>`).join('');
    }
  }

  // 6. Organic Care Recipes
  const recContainer = document.getElementById('organic-recipes-container');
  if (recContainer) {
    if (a.organicRecs && Array.isArray(a.organicRecs) && a.organicRecs.length > 0) {
      recContainer.innerHTML = a.organicRecs.map((r) => `
        <div class="recipe-card-item">
          <div class="recipe-emoji-icon">${r.icon || '🌱'}</div>
          <div class="recipe-body">
            <h4>${typeof r.title === 'object' ? (r.title[state.lang] || r.title.en) : r.title}</h4>
            <div class="recipe-sub">${typeof r.sub === 'object' ? (r.sub[state.lang] || r.sub.en) : r.sub}</div>
            <p>${typeof r.desc === 'object' ? (r.desc[state.lang] || r.desc.en) : r.desc}</p>
          </div>
        </div>
      `).join('');
    } else if (a.isCalamansi === false || a.healthScore === 0) {
      const isFilMsg = state.lang === 'fil';
      recContainer.innerHTML = `
        <div class="recipe-card-item" style="border-left: 3px solid var(--accent-red, #ef4444);">
          <div class="recipe-emoji-icon">🍋</div>
          <div class="recipe-body">
            <h4>${isFilMsg ? 'Itutok sa Puno ng Calamansi' : 'Aim Camera at Calamansi Tree'}</h4>
            <div class="recipe-sub">${isFilMsg ? 'Kailangan ang Tamang Halaman' : 'Calamansi Target Required'}</div>
            <p>${isFilMsg ? 'Mangyaring itutok ang scanner sa dahon, sanga, o bunga ng Calamansi upang makabuo ng angkop na organikong pataba at lunas.' : 'Please aim the gun scanner or upload images of Calamansi citrus foliage, fruit, or orchard soil to generate tailored organic recipes.'}</p>
          </div>
        </div>
      `;
    }
  }

  renderIcons();
}

let isAnalyzingGemini = false;
let lastSavedReportSignature = '';
let lastSavedReportTimestamp = 0;

function safeParseGeminiJSON(rawText) {
  if (!rawText) return null;
  let text = rawText.replace(/```(?:json)?/gi, '').replace(/```/g, '').trim();
  const firstBrace = text.indexOf('{');
  const lastBrace = text.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    text = text.substring(firstBrace, lastBrace + 1);
  }
  try {
    return JSON.parse(text);
  } catch (err1) {
    try {
      const repaired = text.replace(/,\s*([\}\]])/g, '$1');
      return JSON.parse(repaired);
    } catch (err2) {
      console.warn('[Gemini AI Android] JSON parse recovery note:', err2);
      return null;
    }
  }
}

// Helper to compress base64 data URL to prevent payload too large errors
function compressBase64Image(dataUrl, maxDimension = 1024, quality = 0.8) {
  return new Promise((resolve) => {
    if (!dataUrl || typeof dataUrl !== 'string' || !dataUrl.startsWith('data:image/')) {
      return resolve(dataUrl);
    }
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      let { width, height } = img;
      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      const compressed = canvas.toDataURL('image/jpeg', quality);
      resolve(compressed);
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

// Helper to convert any image path (blob, local relative, or data URL) to compressed base64 inlineData
async function ensureImageBase64(imgSrc) {
  if (!imgSrc || typeof imgSrc !== 'string' || imgSrc.trim() === '') return null;
  if (imgSrc.startsWith('data:image/')) {
    return await compressBase64Image(imgSrc, 1024, 0.8);
  }
  try {
    const res = await fetch(imgSrc);
    if (!res.ok) return null;
    const blob = await res.blob();
    const rawDataUrl = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
    return await compressBase64Image(rawDataUrl, 1024, 0.8);
  } catch (e) {
    return null;
  }
}

async function runGeminiAnalysis() {
  if (isAnalyzingGemini) {
    console.log('[Gemini AI Android] Analysis already in progress. Skipping duplicate execution.');
    return;
  }
  isAnalyzingGemini = true;

  const btn = document.getElementById('analyze-gemini-btn');
  const isFil = state.lang === 'fil';

  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<i data-lucide="loader" class="spin"></i> <span>${isFil ? 'Sinusuri...' : 'Analyzing...'}</span>`;
    renderIcons();
  }

  // Ensure target image buffer is resolved
  if (!state.targetImage) {
    const gunImgEl = document.getElementById('gun-target-img');
    if (gunImgEl && gunImgEl.src && !gunImgEl.src.includes('placeholder') && gunImgEl.src !== window.location.href) {
      state.targetImage = gunImgEl.src;
    } else if (state.quadrants && state.quadrants.some(q => q.img && q.img.trim() !== '')) {
      const firstValid = state.quadrants.find(q => q.img && q.img.trim() !== '');
      if (firstValid) state.targetImage = firstValid.img;
    }
  }

  const hasImages = Boolean(state.targetImage && state.targetImage.trim() !== '') || state.quadrants.some(q => q.img && q.img.trim() !== '');

  // If actual images are loaded (from live gun scan or photo upload), strictly reset preset mode
  if (hasImages) {
    state.activePreset = '';
    document.querySelectorAll('.preset-chip').forEach(c => c.classList.remove('active'));
  }

  if (!hasImages && !state.activePreset) {
    state.analysis.isCalamansi = false;
    state.analysis.healthScore = 0;
    state.analysis.statusText = { en: 'No Target Image Captured', fil: 'Walang Larawang Nakunan' };
    state.analysis.summaryText = {
      en: 'Please capture a single leaf photo using the Kilatis Gun trigger or upload a Calamansi leaf photo before running Gemini AI analysis.',
      fil: 'Mangyaring kumuha muna gamit ang Kilatis Gun trigger o mag-upload ng larawan ng dahon ng Calamansi bago magsuri.'
    };
    state.analysis.severity = 'None';
    state.analysis.severityPercent = 0;
    state.analysis.severityStage = 'Awaiting Leaf Target';
    state.analysis.severityRecommendations = {
      immediateAction: { en: 'Aim the gun scanner at a live Calamansi leaf.', fil: 'Itutok ang scanner sa buhay na dahon ng Calamansi.' },
      pruningGuide: { en: 'No pruning required.', fil: 'Walang kailangang putulin.' },
      treatment: { en: 'Trigger capture when aimed at Calamansi canopy.', fil: 'Pindutin ang trigger kapag nakatutok na sa puno ng Calamansi.' },
      monitoringSchedule: { en: 'Ready for scanning.', fil: 'Handa para sa pagsusuri.' }
    };
    state.analysis.leafStatus = { en: 'Awaiting Target', fil: 'Naghihintay' };
    state.analysis.leafTagClass = 'tag-warning';
    state.analysis.leafFindings = {
      en: ['No image uploaded or captured in the gun viewfinder.'],
      fil: ['Walang larawang nailagay o nakunan sa gun viewfinder.']
    };
    state.analysis.fruitStatus = { en: 'Awaiting Target', fil: 'Naghihintay' };
    state.analysis.fruitTagClass = 'tag-warning';
    state.analysis.fruitFindings = {
      en: ['No image uploaded or captured.'],
      fil: ['Walang larawang nailagay o nakunan.']
    };
    state.analysis.treatment = {
      type: 'warn',
      title: { en: 'Target Required', fil: 'Kailangan ang Kuha' },
      desc: { en: 'Point the handheld gun scanner at a Calamansi leaf or upload a photo.', fil: 'Itutok ang handheld scanner sa dahon ng Calamansi o mag-upload ng larawan.' }
    };
    state.analysis.organicRecs = [];
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `<i data-lucide="sparkles"></i> <span>Gemini AI</span>`;
      renderIcons();
    }
    isAnalyzingGemini = false;
    renderReportUI();
    return;
  }

  const GEMINI_API_KEY = await resolveGeminiApiKey();

  if (!GEMINI_API_KEY) {
    state.analysis.isCalamansi = false;
    state.analysis.healthScore = 0;
    state.analysis.statusText = { en: 'Missing Gemini API Key', fil: 'Walang Gemini API Key' };
    state.analysis.summaryText = {
      en: 'No Gemini API key found in Cloud Firestore (system_config/gemini -> apiKey). Add your Google AI Studio key (AQ.... or AIza...) in Firebase Console.',
      fil: 'Walang nahanap na Gemini API key sa Cloud Firestore (system_config/gemini -> apiKey). Ilagay ang iyong Google AI Studio key (AQ.... o AIza...) sa Firebase Console.'
    };
    state.analysis.severity = 'None';
    state.analysis.severityPercent = 0;
    state.analysis.severityStage = 'Missing API Key';
    state.analysis.leafStatus = { en: 'API Key Missing', fil: 'Walang API Key' };
    state.analysis.leafTagClass = 'tag-warning';
    state.analysis.fruitStatus = { en: 'Awaiting AI', fil: 'Naghihintay' };
    state.analysis.fruitTagClass = 'tag-warning';
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `<i data-lucide="sparkles"></i> <span>Gemini AI</span>`;
      renderIcons();
    }
    isAnalyzingGemini = false;
    renderReportUI();
    return;
  }

  try {
    const promptText = `You are an expert precision plant pathologist and computer vision agronomist specializing strictly in Philippine Calamansi (Citrus microcarpa / Citrofortunella microcarpa) citrus trees, foliar canopies, and citrus fruits.

MANDATORY TARGET VALIDATION RULE:
First, inspect the provided image carefully. You must verify whether the image shows genuine Calamansi citrus tree components (leaves, twigs, fruits, flowers, tree canopy) or orchard soil surrounding a citrus tree.
- IF the image DOES NOT contain a Calamansi citrus tree or its orchard environment (e.g. human face/body, room interior, animal, household items, electronics, furniture, vehicle, random indoor objects, or an unrelated non-citrus plant):
  1. Set "isCalamansi": false.
  2. Set "healthScore": 0.
  3. Set "statusText": { "en": "Invalid Target (Not Calamansi / Soil)", "fil": "Hindi Calamansi o Lupa (Maling Kuha)" }.
  4. Set "summaryText": { "en": "The captured frame does not contain a Calamansi (Citrus microcarpa) citrus tree, leaf, or fruit. Diagnostic evaluation is strictly calibrated for Calamansi to prevent false readings. Please aim the handheld scanner at a Calamansi tree.", "fil": "Ang nakunan o na-upload na larawan ay hindi kinikilalang puno o dahon ng Calamansi. Ang pagsusuri ay para lamang sa Calamansi. Mangyaring itutok ang scanner sa puno ng Calamansi." }.
  5. Set "severity": "None", "affectedAreaPercentage": 0, "severityStage": "Non-Citrus Target".
  6. Set "severityRecommendations": {
       "immediateAction": { "en": "Aim optical scanner at Calamansi foliage.", "fil": "Itutok ang scanner sa dahon ng Calamansi." },
       "pruningGuide": { "en": "No pruning required.", "fil": "Walang kailangang putulin." },
       "treatment": { "en": "Point lens at Calamansi canopy and capture again.", "fil": "Itutok ang lente sa puno ng Calamansi at kumuha muli." },
       "monitoringSchedule": { "en": "Trigger capture when aimed at Calamansi.", "fil": "Pindutin ang trigger kapag nakatutok na sa Calamansi." }
     }.
  7. Set "leafStatus": { "en": "Non-Citrus Target", "fil": "Hindi Calamansi" }, "leafTagClass": "tag-danger", "leafFindings": { "en": ["Target in frame is not identified as Calamansi foliage."], "fil": ["Ang bagay sa larawan ay hindi dahon ng Calamansi."] }.
  8. Set "fruitStatus": { "en": "No Citrus Detected", "fil": "Walang Calamansi" }, "fruitTagClass": "tag-danger", "fruitFindings": { "en": ["No Citrus microcarpa fruit detected."], "fil": ["Walang nakitang bunga ng Calamansi."] }.
  9. Set "treatment": { "type": "bad", "title": { "en": "Aim at Calamansi Tree", "fil": "Itutok sa Calamansi" }, "desc": { "en": "Please point the optical scanner at a live Calamansi citrus tree or upload leaf photos to receive disease diagnostics.", "fil": "Itutok ang camera sa totoong puno ng Calamansi upang makakuha ng tamang gamot at alaga." } }.
  10. Set "organicRecs": [].

- IF the image DOES contain a Calamansi citrus tree (foliage, fruits, or orchard soil):
  1. Set "isCalamansi": true.
  2. Inspect the single foliar capture in combination with current environmental telemetry (${state.location}, Temp: ${state.weather.temp}°C, Humidity: ${state.weather.humidity}%, Rain Chance: ${state.weather.rainChance}%).
  3. Diagnose for:
     - Citrus Canker (Xanthomonas citri - raised corky lesions with oily yellow halos)
     - Citrus Scab (Elsinoë fawcettii - raised wart-like pustules, distorted leaf blades)
     - Citrus Greening / Huanglongbing (Candidatus Liberibacter asiaticus - asymmetric blotchy mottle chlorosis, zinc-deficiency-like veins)
     - Melanose (Diaporthe citri - sandpaper-like dark brown raised pustules)
     - Chlorosis / Micronutrient Deficiency (interveinal yellowing, stunted lamina)
     - Citrus Leaf Miner (Phyllocnistis citrella - silvery serpentine mines, curled foliar margins)
     - Scale Insects / Sooty Mold (black superficial fungal soot, sap-feeding scale insects)
     - Healthy / Vibrant Canopy (glossy dark green foliage, intact cuticle, no lesions)
  4. Compute an accurate healthScore (1-100).
  5. Assign exact disease severity:
     - "severity": Must be exactly one of: "None" (if healthy), "Mild", "Moderate", "Severe".
       * "Mild" (Stage 1): Incipient stage, <20% foliar leaf surface affected, minor isolated spots, no defoliation or twig dieback.
       * "Moderate" (Stage 2): Intermediate stage, 20-40% foliar surface affected, coalescing pustules, visible chlorosis, early twig involvement.
       * "Severe" (Stage 3): Advanced/critical stage, >40% foliar surface affected, extensive corky necrosis, defoliation, branch dieback, fruit scab drop.
     - "affectedAreaPercentage": Integer between 0 and 100 representing foliar surface damage.
     - "severityStage": Descriptive stage title (e.g. "Early Foliar Pustules (<20%)", "Active Disseminated Lesions (20-40%)", "Critical Corky Dieback (>40%)", or "Vibrant Healthy Foliage").
  6. Generate SEVERITY-TAILORED RECOMMENDATIONS strictly calibrated to the assigned severity level:
     - "severityRecommendations": {
         "immediateAction": { "en": "Specific urgent action for this severity level", "fil": "Tiyak na agarang aksyon para sa antas na ito" },
         "pruningGuide": { "en": "Pruning instruction calibrated to this severity level", "fil": "Gabay sa pagputol na angkop sa antas na ito" },
         "treatment": { "en": "Chemical or organic spray dosage and recipe calibrated to this severity level", "fil": "Gamot o timpla ng spray na angkop sa antas na ito" },
         "monitoringSchedule": { "en": "Follow-up monitoring timeline calibrated to this severity level", "fil": "Iskedyul ng pagsubaybay na angkop sa antas na ito" }
       }
  7. Provide 2-3 DIY zero-cost organic care recipes (e.g. neem oil spray, wood ash + soap spray, fermented plant juice, compost tea) in "organicRecs".
  8. Provide weather-based advisory ("weatherAdvisory").

Respond ONLY in valid JSON format with this exact structure:
{
  "isCalamansi": true,
  "healthScore": 75,
  "statusText": { "en": "Citrus Scab Detected (Mild)", "fil": "May Kurikong ang Calamansi (Mababaw)" },
  "summaryText": { "en": "Incipient corky pustules detected on foliar lamina with 14% canopy involvement.", "fil": "Nagsisimulang mga sugat ng kurikong ang nakita sa dahon na may 14% apektadong bahagi." },
  "severity": "Mild",
  "affectedAreaPercentage": 14,
  "severityStage": "Early Foliar Pustules (<20%)",
  "severityRecommendations": {
    "immediateAction": {
      "en": "Isolate affected shoot and avoid overhead sprinkler watering to halt fungal spore spread.",
      "fil": "Ihiwalay ang apektadong sanga at iwasan ang pagdidilig mula sa itaas upang hindi kumalat ang amag."
    },
    "pruningGuide": {
      "en": "Prune out 2-3 isolated symptomatic leaves using shears sanitized with 70% alcohol.",
      "fil": "Gupitin ang 2-3 apektadong dahon gamit ang gunting na nilinis ng 70% alkohol."
    },
    "treatment": {
      "en": "Apply organic neem oil solution (5ml/L) or copper hydroxide bio-spray at dusk.",
      "fil": "Mag-spray ng neem oil (5ml bawat litro ng tubig) o copper spray sa dapit-hapon."
    },
    "monitoringSchedule": {
      "en": "Re-evaluate with gun scanner in 7 days to verify lesion containment.",
      "fil": "Suriin muli gamit ang gun scanner makalipas ang 7 araw upang matiyak na napigilan ang sakit."
    }
  },
  "leafStatus": { "en": "Mild Lesions", "fil": "Bahagyang Pinsala" },
  "leafTagClass": "tag-warning",
  "leafFindings": {
    "en": ["Scattered raised corky pustules on upper lamina.", "No significant defoliation observed."],
    "fil": ["May maliliit na bukol sa ibabaw ng dahon.", "Wala pang nalalagas na mga dahon."]
  },
  "fruitStatus": { "en": "Unaffected", "fil": "Ligtas ang Bunga" },
  "fruitTagClass": "tag-healthy",
  "fruitFindings": {
    "en": ["Fruit surface remains clear and intact."],
    "fil": ["Makinis at ligtas ang mga bunga."]
  },
  "treatment": {
    "type": "warn",
    "title": { "en": "Mild Scab Containment", "fil": "Pagpigil sa Kurikong" },
    "desc": { "en": "Apply preventative bio-fungicide and monitor shoot growth.", "fil": "Mag-spray ng bio-fungicide at bantayan ang bagong sibol." }
  },
  "organicRecs": [
    {
      "icon": "🌿",
      "title": { "en": "Neem Leaf Extract Spray", "fil": "Katas ng Dahon ng Neem" },
      "sub": { "en": "Antifungal Foliar Spray", "fil": "Pansugpo sa Amag" },
      "desc": { "en": "Boil 100g neem leaves in 1L water, strain, mix with 1 tsp mild liquid soap, spray bi-weekly.", "fil": "Pakuluan ang 100g dahon ng neem sa 1L tubig, palamigin, lagyan ng 1 kutsaritang sabon at i-spray tuwing 2 linggo." }
    }
  ],
  "weatherAdvisory": {
    "rainDesc": { "en": "High humidity increases fungal pressure. Keep canopy well aerated.", "fil": "Mataas ang halumigmig. Panatilihing mahangin ang loob ng puno." },
    "irrigationDesc": { "en": "Drip irrigate at base early morning.", "fil": "Magdilig sa ugat lamang tuwing umaga." }
  }
}
Note: leafTagClass and fruitTagClass must be one of: 'tag-healthy', 'tag-warning', or 'tag-danger'. treatment.type must be one of: 'good', 'warn', or 'bad'.`;

    const parts = [{ text: promptText }];
    
    // Add single gun target image or available images to prompt
    const imagesToProcess = [];
    if (state.targetImage && state.targetImage.trim() !== '') {
      imagesToProcess.push(state.targetImage);
    } else {
      for (const q of state.quadrants) {
        if (q.img && q.img.trim() !== '') {
          imagesToProcess.push(q.img);
        }
      }
    }

    for (const imgUrl of imagesToProcess) {
      const b64 = await ensureImageBase64(imgUrl);
      if (b64 && b64.startsWith('data:image/')) {
        const mimeType = b64.split(';')[0].split(':')[1];
        const base64Data = b64.split(',')[1];
        parts.push({
          inlineData: { mimeType, data: base64Data }
        });
      }
    }

    let rawText = null;
    let lastApiError = '';

    // Supported Google Gemini Flash vision models in priority order
    const candidateModels = [
      'gemini-flash-lite-latest',
      'gemini-3-flash-preview',
      'gemini-flash-latest',
      'gemma-4-31b-it',
      'gemini-2.5-flash'
    ];

    // Direct Google Generative Language API (no website/VPS proxy needed; supports AQ. & AIza keys via x-goog-api-key header)
    for (const model of candidateModels) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'x-goog-api-key': GEMINI_API_KEY
          },
          body: JSON.stringify({
            contents: [{ parts }],
            generationConfig: {
              responseMimeType: 'application/json'
            }
          })
        });

        if (response.ok) {
          const data = await response.json();
          const outParts = data?.candidates?.[0]?.content?.parts || [];
          const nonThoughtParts = outParts.filter(p => p?.text && !p.thought);
          const candidateText = nonThoughtParts.length > 0
            ? nonThoughtParts[nonThoughtParts.length - 1].text
            : (outParts[0]?.text || '');
          if (candidateText) {
            rawText = candidateText;
            console.log(`[Gemini AI Android] Successfully analyzed with model: ${model}`);
            break;
          }
        } else {
          const errBody = await response.text();
          lastApiError = `HTTP ${response.status} (${model}): ${errBody.slice(0, 160)}`;
          console.warn(`[Gemini AI Android] ${lastApiError}`);
        }
      } catch (err1) {
        lastApiError = err1?.message || 'Network error';
        console.warn(`[Gemini AI Android] Request error (${model}):`, lastApiError);
      }
    }

    if (rawText) {
      const parsed = safeParseGeminiJSON(rawText);
      if (parsed) {
        if (parsed.isCalamansi === false || parsed.healthScore === 0) {
          state.analysis.isCalamansi = false;
          state.analysis.healthScore = 0;
          state.analysis.statusText = parsed.statusText || { en: 'Invalid Target (Not Calamansi / Soil)', fil: 'Hindi Calamansi o Lupa (Maling Kuha)' };
          state.analysis.summaryText = parsed.summaryText || { en: 'The captured frame does not contain a recognized Calamansi citrus tree or foliage. Disease diagnostics aborted.', fil: 'Ang larawan ay hindi kinikilalang puno o dahon ng Calamansi. Itinigil ang pagsusuri.' };
          state.analysis.severity = 'None';
          state.analysis.severityPercent = 0;
          state.analysis.severityStage = 'Non-Citrus Target';
          state.analysis.severityRecommendations = {
            immediateAction: { en: 'Aim scanner at Calamansi foliage.', fil: 'Itutok ang scanner sa dahon ng Calamansi.' },
            pruningGuide: { en: 'No pruning required for non-citrus object.', fil: 'Walang kailangang putulin.' },
            treatment: { en: 'Point lens at Calamansi canopy and capture again.', fil: 'Itutok ang lente sa puno ng Calamansi at kumuha muli.' },
            monitoringSchedule: { en: 'Trigger capture when aimed at Calamansi.', fil: 'Pindutin ang trigger kapag nakatutok na sa Calamansi.' }
          };
          state.analysis.leafStatus = parsed.leafStatus || { en: 'Non-Citrus Target', fil: 'Hindi Calamansi' };
          state.analysis.leafTagClass = parsed.leafTagClass || 'tag-danger';
          state.analysis.leafFindings = parsed.leafFindings || {
            en: ['Target in frame is not identified as Calamansi foliage.', 'Diagnostic evaluation halted.'],
            fil: ['Ang bagay sa larawan ay hindi dahon ng Calamansi.', 'Itinigil ang pagsusuri.']
          };
          state.analysis.fruitStatus = parsed.fruitStatus || { en: 'No Citrus Detected', fil: 'Walang Calamansi' };
          state.analysis.fruitTagClass = parsed.fruitTagClass || 'tag-danger';
          state.analysis.fruitFindings = parsed.fruitFindings || {
            en: ['No Calamansi fruit detected.', 'Non-citrus target.'],
            fil: ['Walang nakitang bunga ng Calamansi.', 'Maling bagay ang nasa larawan.']
          };
          state.analysis.treatment = parsed.treatment || {
            type: 'bad',
            title: { en: 'Aim at Calamansi Tree', fil: 'Itutok sa Calamansi' },
            desc: { en: 'Please point the optical sensor at a live Calamansi citrus tree to receive AI plant health evaluation.', fil: 'Itutok ang camera sa totoong puno ng Calamansi upang masuri ang kalusugan nito.' }
          };
          state.analysis.organicRecs = [];
        } else {
          state.analysis.isCalamansi = true;
          if (parsed.healthScore !== undefined) state.analysis.healthScore = parsed.healthScore;
          if (parsed.statusText) state.analysis.statusText = parsed.statusText;
          if (parsed.summaryText) state.analysis.summaryText = parsed.summaryText;
          if (parsed.leafStatus) state.analysis.leafStatus = parsed.leafStatus;
          if (parsed.leafTagClass) state.analysis.leafTagClass = parsed.leafTagClass;
          if (parsed.leafFindings) state.analysis.leafFindings = parsed.leafFindings;
          if (parsed.fruitStatus) state.analysis.fruitStatus = parsed.fruitStatus;
          if (parsed.fruitTagClass) state.analysis.fruitTagClass = parsed.fruitTagClass;
          if (parsed.fruitFindings) state.analysis.fruitFindings = parsed.fruitFindings;
          if (parsed.treatment) state.analysis.treatment = parsed.treatment;
          if (parsed.organicRecs && Array.isArray(parsed.organicRecs)) state.analysis.organicRecs = parsed.organicRecs;

          // Severity & Severity-Tailored recommendations
          state.analysis.severity = parsed.severity || (parsed.healthScore >= 80 ? 'None' : (parsed.healthScore >= 55 ? 'Mild' : (parsed.healthScore >= 35 ? 'Moderate' : 'Severe')));
          state.analysis.severityPercent = parsed.affectedAreaPercentage !== undefined ? parsed.affectedAreaPercentage : (parsed.severityPercent !== undefined ? parsed.severityPercent : Math.max(0, 100 - state.analysis.healthScore));
          state.analysis.severityStage = parsed.severityStage || `${state.analysis.severity} foliar coverage`;
          if (parsed.severityRecommendations) {
            state.analysis.severityRecommendations = parsed.severityRecommendations;
          }
        }
      }
    } else {
      // ONLY apply sample preset fallback if user explicitly requested a preset AND has no live images
      if (!hasImages && state.activePreset && PRESETS[state.activePreset]) {
        const p = PRESETS[state.activePreset];
        state.analysis.isCalamansi = true;
        state.analysis.healthScore = p.score;
        state.analysis.statusText = p.statusText;
        state.analysis.summaryText = p.summary;
        state.analysis.severity = p.severity || 'Mild';
        state.analysis.severityPercent = p.severityPercent || 15;
        state.analysis.severityStage = p.severityStage || 'Stage 1';
        state.analysis.severityRecommendations = p.severityRecommendations || null;
        state.analysis.leafStatus = p.leafStatus;
        state.analysis.leafTagClass = p.leafTag;
        state.analysis.leafFindings = p.leafFindings;
        state.analysis.fruitStatus = p.fruitStatus;
        state.analysis.fruitTagClass = p.fruitTag;
        state.analysis.fruitFindings = p.fruitFindings;
        if (p.treatment) state.analysis.treatment = p.treatment;
        if (p.organicRecs) state.analysis.organicRecs = p.organicRecs;
      } else {
        state.analysis.isCalamansi = false;
        state.analysis.healthScore = 0;
        state.analysis.statusText = { en: 'AI Connection Error (Check API Key)', fil: 'Hindi Makakonekta sa AI (Suriin ang API Key)' };
        state.analysis.summaryText = {
          en: `Could not connect to Google Gemini Vision AI. Verify your key in Cloud Firestore (system_config/gemini -> apiKey) and internet connection.${lastApiError ? ' Detail: ' + lastApiError : ''}`,
          fil: `Hindi makakonekta sa Google Gemini AI. Pakisuri ang iyong Gemini API key sa Cloud Firestore (system_config/gemini -> apiKey) at koneksyon sa internet.${lastApiError ? ' Detalye: ' + lastApiError : ''}`
        };
        state.analysis.severity = 'None';
        state.analysis.severityPercent = 0;
        state.analysis.severityStage = 'Connection Failed';
        state.analysis.leafStatus = { en: 'Connection Failed', fil: 'Walang Koneksyon' };
        state.analysis.leafTagClass = 'tag-warning';
        state.analysis.leafFindings = {
          en: ['Could not reach Google Gemini Generative AI endpoints.', 'Verify that your Google AI Studio key (AQ.... or AIza...) in Firestore system_config/gemini is active and not revoked.'],
          fil: ['Hindi maabot ang Google Gemini AI.', 'Tiyaking aktibo ang iyong Google AI Studio key (AQ.... o AIza...) sa Firestore system_config/gemini.']
        };
        state.analysis.fruitStatus = { en: 'Awaiting AI', fil: 'Naghihintay' };
        state.analysis.fruitTagClass = 'tag-warning';
        state.analysis.fruitFindings = {
          en: ['No AI diagnostic response received.'],
          fil: ['Walang natanggap na sagot mula sa AI.']
        };
        state.analysis.treatment = {
          type: 'warn',
          title: { en: 'Check Gemini API Key in Firestore', fil: 'Suriin ang Gemini API Key sa Firestore' },
          desc: { en: 'Generate a key in Google AI Studio (https://aistudio.google.com/app/apikey) and save it to Firestore collection system_config -> document gemini -> field apiKey.', fil: 'Kumuha ng API key sa Google AI Studio (https://aistudio.google.com/app/apikey) at ilagay sa Firestore system_config -> gemini -> apiKey.' }
        };
        state.analysis.organicRecs = [];
      }
    }
  } catch (e) {
    console.warn('[Gemini AI Android] Notice:', e);
    if (!hasImages && state.activePreset && PRESETS[state.activePreset]) {
      const p = PRESETS[state.activePreset];
      state.analysis.isCalamansi = true;
      state.analysis.healthScore = p.score;
      state.analysis.statusText = p.statusText;
      state.analysis.summaryText = p.summary;
      state.analysis.severity = p.severity || 'Mild';
      state.analysis.severityPercent = p.severityPercent || 15;
      state.analysis.severityStage = p.severityStage || 'Stage 1';
      state.analysis.severityRecommendations = p.severityRecommendations || null;
    } else {
      state.analysis.isCalamansi = false;
      state.analysis.healthScore = 0;
      state.analysis.statusText = { en: 'AI Service Error', fil: 'Error sa Koneksyon ng AI' };
      state.analysis.summaryText = { en: 'An error occurred while connecting to Gemini AI. Check your internet connection and API key.', fil: 'Nagkaroon ng problema sa pagkonekta sa Gemini AI. Pakisuri ang internet at API key.' };
      state.analysis.severity = 'None';
      state.analysis.severityPercent = 0;
      state.analysis.severityStage = 'Service Error';
      state.analysis.leafStatus = { en: 'Service Error', fil: 'May Problema' };
      state.analysis.leafTagClass = 'tag-warning';
      state.analysis.leafFindings = {
        en: ['Error communicating with AI service.'],
        fil: ['Nagka-error sa pakikipag-ugnayan sa AI.']
      };
      state.analysis.fruitStatus = { en: 'Service Error', fil: 'May Problema' };
      state.analysis.fruitTagClass = 'tag-warning';
      state.analysis.treatment = {
        type: 'warn',
        title: { en: 'Retry Gemini Analysis', fil: 'Subukang Muli ang AI' },
        desc: { en: 'Check your network connection and click Analyze with Gemini AI to retry.', fil: 'Suriin ang koneksyon at i-click muli ang Suriin Gamit ang Gemini AI.' }
      };
      state.analysis.organicRecs = [];
    }
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `<i data-lucide="sparkles"></i> <span>${isFil ? 'Gemini AI' : 'Gemini AI'}</span>`;
      renderIcons();
    }
    isAnalyzingGemini = false;
  }

  // Update UI and trigger radial score animation
  renderReportUI();
  syncToFirestore('android');

  // Smoothly scroll down to the Diagnostic Report Card
  const reportCardEl = document.getElementById('health-score-container');
  if (reportCardEl) {
    reportCardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // Automatically archive single unique Gemini AI diagnostic scan into Firestore 'scans' collection ONLY when genuine Calamansi and healthScore > 0
  if (state.analysis && state.analysis.isCalamansi === true && typeof state.analysis.healthScore === 'number' && state.analysis.healthScore > 0) {
    try {
      const activeImg = state.targetImage || (state.quadrants && state.quadrants[0]?.img) || '';
      const imgSignature = activeImg.slice(0, 80);
      const signature = `${state.analysis.healthScore}_${state.analysis.severity}_${imgSignature}`;
      const now = Date.now();

      if (signature !== lastSavedReportSignature || (now - lastSavedReportTimestamp) >= 45000) {
        lastSavedReportSignature = signature;
        lastSavedReportTimestamp = now;

        const p = PRESETS[state.activePreset];
        const scanDocId = generateScanDocId([{ img: activeImg }], now);
        await setDoc(doc(db, 'scans', scanDocId), {
          userEmail: state.currentUser ? state.currentUser.email : 'farmer@kilatis.ai',
          rpiName: state.rpiName || 'Kilatis Gun Scanner',
          location: state.location || 'Mindoro, Philippines',
          weather: state.weather,
          preset: state.activePreset || 'gun_ai_scan',
          healthScore: state.analysis.healthScore,
          severity: state.analysis.severity || 'None',
          severityPercent: state.analysis.severityPercent !== undefined ? state.analysis.severityPercent : 0,
          severityStage: state.analysis.severityStage || '',
          severityRecommendations: state.analysis.severityRecommendations || null,
          statusText: state.analysis.statusText || (p?.statusText || 'Healthy'),
          summaryText: state.analysis.summaryText || (p?.summary || ''),
          leafStatus: state.analysis.leafStatus || 'Optimal',
          leafTagClass: state.analysis.leafTagClass || 'tag-healthy',
          leafFindings: state.analysis.leafFindings || [],
          fruitStatus: state.analysis.fruitStatus || 'Optimal',
          fruitTagClass: state.analysis.fruitTagClass || 'tag-healthy',
          fruitFindings: state.analysis.fruitFindings || [],
          treatment: state.analysis.treatment || null,
          organicRecs: state.analysis.organicRecs || [],
          image: activeImg,
          quadrants: state.quadrants.map(q => ({ angle: q.angle, img: q.img })),
          timestamp: serverTimestamp()
        }, { merge: true });
        console.log('[Gemini AI Android] Archived unique diagnostic scan to Firestore scans collection:', scanDocId);
      }
    } catch (archiveErr) {
      console.warn('[Gemini AI Android] Firestore history archive notice:', archiveErr);
    }
  }
}

function generateScanDocId(quadrants, timestampMs = Date.now()) {
  let str = '';
  if (Array.isArray(quadrants)) {
    quadrants.forEach(q => {
      if (q && q.img) {
        str += q.img.slice(20, 80);
      }
    });
  }
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  const positiveHash = Math.abs(hash).toString(36);
  const bucket = Math.floor(timestampMs / (90 * 1000));
  return `scan_${bucket}_${positiveHash}`;
}

// Geocoding helper using Open-Meteo Geocoding API
async function geocodeLocation(locationName) {
  if (!locationName || !locationName.trim()) {
    return { lat: 14.5995, lon: 120.9842, city: 'Manila' };
  }
  const cleanName = locationName.split(',')[0].trim();
  try {
    const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cleanName)}&count=1&language=en&format=json`);
    if (geoRes.ok) {
      const geoData = await geoRes.json();
      if (geoData && geoData.results && geoData.results.length > 0) {
        return {
          lat: geoData.results[0].latitude,
          lon: geoData.results[0].longitude,
          city: geoData.results[0].name || cleanName
        };
      }
    }
  } catch (err) {
    console.warn('Geocoding search notice:', err);
  }
  return { lat: 14.5995, lon: 120.9842, city: locationName };
}

// Weather Integration via Open-Meteo API
async function initWeather() {
  const topWeatherBtn = document.getElementById('top-weather-btn');
  if (topWeatherBtn) {
    topWeatherBtn.addEventListener('click', () => {
      fetchLiveWeather('android');
    });
  }

  // Initial fetch on app start
  fetchLiveWeather('auto');

  // Automatic periodic weather refresh every 5 minutes
  setInterval(() => {
    fetchLiveWeather('auto');
  }, 5 * 60 * 1000);
}

async function fetchLiveWeather(triggerSource = 'auto') {
  const topWeatherBtn = document.getElementById('top-weather-btn');
  if (topWeatherBtn) {
    topWeatherBtn.classList.add('loading-spin');
    const icon = topWeatherBtn.querySelector('i, svg');
    if (icon) icon.classList.add('spin');
  }

  try {
    const coords = await geocodeLocation(state.location);
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code&hourly=precipitation_probability,soil_moisture_0_to_1cm&timezone=auto&forecast_days=2`);

    if (res.ok) {
      const data = await res.json();
      if (data && data.current) {
        const currTemp = Math.round(data.current.temperature_2m * 10) / 10;
        const currHum = Math.round(data.current.relative_humidity_2m);
        const currRainMm = data.current.precipitation || 0;
        const code = data.current.weather_code || 0;

        let rainChance = 20;
        if (data.hourly && data.hourly.time && data.hourly.precipitation_probability) {
          const nowIso = new Date().toISOString().substring(0, 13);
          const hourIdx = data.hourly.time.findIndex(t => t.startsWith(nowIso));
          if (hourIdx !== -1 && data.hourly.precipitation_probability[hourIdx] !== undefined) {
            rainChance = data.hourly.precipitation_probability[hourIdx];
          } else {
            rainChance = data.hourly.precipitation_probability[0] || (currRainMm > 0 ? 85 : 25);
          }
        } else if (currRainMm > 0) {
          rainChance = 85;
        }

        let soilMoist = 60;
        if (data.hourly && data.hourly.soil_moisture_0_to_1cm && data.hourly.soil_moisture_0_to_1cm[0]) {
          soilMoist = Math.round(data.hourly.soil_moisture_0_to_1cm[0] * 100);
        } else {
          soilMoist = Math.min(95, Math.max(35, Math.round(55 + (currRainMm * 15) + (currHum * 0.1) - ((currTemp - 25) * 1.2))));
        }

        let condEn = 'Partly Cloudy';
        let condFil = 'Katamtamang Ulap';

        if (code === 0) {
          condEn = 'Clear Tropical Sun';
          condFil = 'Maliwanag na Kalangitan';
        } else if (code <= 3) {
          condEn = 'Partly Cloudy';
          condFil = 'Katamtamang Ulap';
        } else if (code >= 45 && code <= 48) {
          condEn = 'Foggy / Hazy';
          condFil = 'Mahamog / Maulap';
        } else if (code >= 51 && code <= 55) {
          condEn = 'Light Drizzle';
          condFil = 'Ambon / Mahinang Ulan';
        } else if (code >= 61 && code <= 65) {
          condEn = 'Rain Showers';
          condFil = 'May Ulan';
        } else if (code >= 80 && code <= 82) {
          condEn = 'Heavy Downpour';
          condFil = 'Malakas na Ulan';
        } else if (code >= 95) {
          condEn = 'Thunderstorm';
          condFil = 'Bagyo / Kidlat';
        } else {
          condEn = 'Cloudy Overhead';
          condFil = 'Maulap';
        }

        state.weather = {
          temp: currTemp,
          humidity: currHum,
          rainChance: rainChance,
          rainMm: currRainMm,
          soilMoisture: soilMoist,
          weatherCode: code,
          condition: { en: condEn, fil: condFil }
        };

        updateDynamicWeatherAdvisories();
        renderWeatherUI();

        if (triggerSource !== 'remote_sync') {
          syncToFirestore('android');
        }
      }
    }
  } catch (err) {
    console.warn('Android weather fetch notice:', err);
  } finally {
    if (topWeatherBtn) {
      setTimeout(() => {
        topWeatherBtn.classList.remove('loading-spin');
        const icon = topWeatherBtn.querySelector('i, svg');
        if (icon) icon.classList.remove('spin');
      }, 600);
    }
  }
}

function updateDynamicWeatherAdvisories() {
  const w = state.weather;
  const temp = typeof w.temp === 'number' ? w.temp : parseFloat(w.temp) || 29;
  const hum = typeof w.humidity === 'number' ? w.humidity : parseInt(w.humidity) || 75;
  const rain = typeof w.rainChance === 'number' ? w.rainChance : parseInt(w.rainChance) || 30;
  const soil = typeof w.soilMoisture === 'number' ? w.soilMoisture : parseInt(w.soilMoisture) || 60;

  // 1. Dynamic Sun & Evapotranspiration
  TRANSLATIONS.en['w-sun-desc'] = `Solar UV index active at ${temp}°C (${hum}% RH). Transpiration & sap flow rates are optimal for citrus leaf nutrient uptake.`;
  TRANSLATIONS.fil['w-sun-desc'] = `Sikat ng araw sa init na ${temp}°C (${hum}% RH). Angkop ang singaw ng halaman sa pag-absorb ng organikong sustansya.`;

  // 2. Dynamic Rainfall & Spray Delay Advisory
  if (rain >= 60 || (w.rainMm && w.rainMm > 0.5) || (w.weatherCode && w.weatherCode >= 51)) {
    TRANSLATIONS.en['w-rain-desc'] = `High rain probability detected (${rain}% / ${w.rainMm || 0}mm). Hold all foliar and organic neem sprays for 48 hours to prevent wash-off loss.`;
    TRANSLATIONS.fil['w-rain-desc'] = `Mataas ang tsansa ng ulan (${rain}% / ${w.rainMm || 0}mm). Ipagpaliban muna ang pag-spray ng neem oil o organikong lunas ng 48 oras upang hindi maanod.`;
  } else if (rain >= 30) {
    TRANSLATIONS.en['w-rain-desc'] = `Moderate rain probability (${rain}% chance). If applying foliar spray, do so early to ensure at least 4 hours of dry foliage.`;
    TRANSLATIONS.fil['w-rain-desc'] = `Katamtamang ulan (${rain}% tsansa). Mag-spray lamang sa umaga upang magkaroon ng 4 na oras na tuyong dahon bago umulan.`;
  } else {
    TRANSLATIONS.en['w-rain-desc'] = `Clear & dry forecast (${rain}% rain chance). Safe window for foliar spraying, pruning, and organic pest prevention.`;
    TRANSLATIONS.fil['w-rain-desc'] = `Maliwanag ang panahon (${rain}% tsansa ng ulan). Ligtas at magandang panahon para mag-spray ng organikong lunas at maghawi ng sanga.`;
  }

  // 3. Dynamic Irrigation Volume Recommendation
  if (soil > 75 || rain >= 70 || (w.rainMm && w.rainMm > 2)) {
    TRANSLATIONS.en['w-irr-desc'] = `Soil moisture is high (${soil}%). Suspend drip irrigation today to avoid root waterlogging and fungal collar rot.`;
    TRANSLATIONS.fil['w-irr-desc'] = `Basa ang lupa (${soil}%). Itigil muna ang pagdidilig ngayong araw upang maiwasan ang pagkabulok ng ugat ng Calamansi.`;
  } else if (temp >= 32 && rain < 30) {
    TRANSLATIONS.en['w-irr-desc'] = `High temperature (${temp}°C). Apply 7 to 8 Liters of drip irrigation per tree early morning (6:00 AM) to prevent leaf wilting.`;
    TRANSLATIONS.fil['w-irr-desc'] = `Mataas ang init (${temp}°C). Magdilig ng 7 hanggang 8 Litro kada puno maaga sa umaga (6:00 AM) upang hindi malanta ang mga dahon.`;
  } else if (soil < 45) {
    TRANSLATIONS.en['w-irr-desc'] = `Soil moisture is dry (${soil}%). Apply 6 Liters of deep root irrigation to replenish the root zone.`;
    TRANSLATIONS.fil['w-irr-desc'] = `Medyo tuyo ang lupa (${soil}%). Magdilig ng 6 na Litro ng tubig sa paligid ng puno para sa ugat.`;
  } else {
    TRANSLATIONS.en['w-irr-desc'] = `Apply 4 to 5 Liters of drip irrigation per tree early morning. Soil moisture (${soil}%) is in the healthy zone.`;
    TRANSLATIONS.fil['w-irr-desc'] = `Magdilig ng 4 hanggang 5 Litro ng tubig kada puno tuwing umaga. Malusog at sapat ang basa ng lupa (${soil}%).`;
  }
}

function renderWeatherUI() {
  const isFil = state.lang === 'fil';
  const w = state.weather;
  const temp = typeof w.temp === 'number' ? w.temp : parseFloat(w.temp) || 29;
  const hum = typeof w.humidity === 'number' ? w.humidity : parseInt(w.humidity) || 75;
  const rain = typeof w.rainChance === 'number' ? w.rainChance : parseInt(w.rainChance) || 30;
  const soil = typeof w.soilMoisture === 'number' ? w.soilMoisture : parseInt(w.soilMoisture) || 60;

  const tempEl = document.getElementById('w-temp');
  const humEl = document.getElementById('w-humidity');
  const rainEl = document.getElementById('w-rain');
  const soilEl = document.getElementById('w-soil');
  const rainAdvEl = document.getElementById('rain-advisory-text');
  const irrEl = document.getElementById('irrigation-text');

  if (tempEl) tempEl.textContent = `${temp}°C`;
  if (humEl) humEl.textContent = `${hum}% RH`;
  if (rainEl) {
    rainEl.textContent = `${rain}% ${isFil ? 'Tsansa' : 'Chance'}`;
  }
  if (soilEl) {
    const soilLabel = soil > 75 ? (isFil ? `${soil}% Basa` : `${soil}% Wet`) : (soil < 45 ? (isFil ? `${soil}% Tuyo` : `${soil}% Dry`) : (isFil ? `${soil}% Tamang Basa` : `${soil}% Optimal`));
    soilEl.textContent = soilLabel;
  }

  if (rainAdvEl) rainAdvEl.textContent = TRANSLATIONS[state.lang]['w-rain-desc'];
  if (irrEl) irrEl.textContent = TRANSLATIONS[state.lang]['w-irr-desc'];
}

// Real-Time Bi-Directional Auto-Sync
async function syncToFirestore(source = 'android') {
  if (isReceivingRemoteSync) return;
  try {
    const syncDocRef = doc(db, 'system_sync', 'latest_scan');
    const a = state.analysis;
    const p = PRESETS[state.activePreset];
    const activeImg = state.targetImage || (state.quadrants && state.quadrants[0]?.img) || '';
    const syncPayload = {
      healthScore: a?.healthScore !== undefined ? a.healthScore : 0,
      severity: a?.severity || 'None',
      severityPercent: a?.severityPercent !== undefined ? a.severityPercent : (a?.affectedAreaPercentage || 0),
      severityStage: a?.severityStage || '',
      severityRecommendations: a?.severityRecommendations || null,
      statusText: a?.statusText || { en: 'No Scan Performed', fil: 'Walang Pagsusuri' },
      summaryText: a?.summaryText || { en: 'No scan data available yet. Use the Kilatis Gun scanner or upload a photo to run Gemini AI analysis.', fil: 'Wala pang datos ng scan. Gamitin ang Kilatis Gun scanner o mag-upload ng larawan upang masuri ng Gemini AI.' },
      leafStatus: a?.leafStatus || { en: 'Awaiting Scan', fil: 'Naghihintay ng Scan' },
      leafTagClass: a?.leafTagClass || (a?.healthScore === 0 ? 'tag-dimmed' : 'tag-healthy'),
      leafFindings: a?.leafFindings || { en: ['No leaf scan data available yet.'], fil: ['Wala pang datos sa pagsusuri ng dahon.'] },
      fruitStatus: a?.fruitStatus || { en: 'Awaiting Scan', fil: 'Naghihintay ng Scan' },
      fruitTagClass: a?.fruitTagClass || (a?.healthScore === 0 ? 'tag-dimmed' : 'tag-healthy'),
      fruitFindings: a?.fruitFindings || { en: ['No fruit scan data available yet.'], fil: ['Wala pang datos sa pagsusuri ng bunga.'] },
      treatment: a?.treatment || null,
      organicRecs: a?.organicRecs || [],
      activePreset: state.activePreset,
      image: activeImg,
      targetImage: state.targetImage || '',
      location: state.location,
      rpiName: state.rpiName,
      weather: state.weather,
      quadrants: [
        { angle: 0, img: activeImg || (state.activePreset && p ? p.img0 : '') },
        { angle: 90, img: state.quadrants[1]?.img || (state.activePreset && p ? p.img90 : '') },
        { angle: 180, img: state.quadrants[2]?.img || (state.activePreset && p ? p.img180 : '') },
        { angle: 270, img: state.quadrants[3]?.img || (state.activePreset && p ? p.img270 : '') }
      ],
      source: source,
      updatedAt: serverTimestamp(),
      updatedAtIso: new Date().toISOString()
    };
    await setDoc(syncDocRef, syncPayload, { merge: true });
    console.log('[Auto-Sync] Android successfully pushed state to Cloud Firestore.');
  } catch (err) {
    console.warn('[Auto-Sync] Android Firestore push notice:', err);
  }
}

function applyScanDataToState(data, saveToCache = true) {
  if (!data) return;

  if (data.location && data.location !== state.location) {
    state.location = data.location;
    localStorage.setItem('calamansi_location', data.location);
    const locEl = document.getElementById('cfg-location');
    if (locEl) locEl.value = data.location;
    fetchLiveWeather('remote_sync');
  }

  if (data.weather) {
    state.weather = data.weather;
    updateDynamicWeatherAdvisories();
    renderWeatherUI();
  }

  if (data.autoScanEnabled !== undefined) {
    state.autoScanEnabled = data.autoScanEnabled;
    localStorage.setItem('calamansi_auto_scan_enabled', data.autoScanEnabled);
    const toggle = document.getElementById('cfg-auto-scan-toggle');
    if (toggle) toggle.checked = data.autoScanEnabled;
    const container = document.getElementById('auto-scan-options-container');
    if (container) container.style.display = data.autoScanEnabled ? 'block' : 'none';
  }
  if (data.autoScanMode) {
    state.autoScanMode = data.autoScanMode;
    localStorage.setItem('calamansi_auto_scan_mode', data.autoScanMode);
    const timeBtn = document.getElementById('mode-time-btn');
    const intBtn = document.getElementById('mode-interval-btn');
    const timeBox = document.getElementById('sched-time-box');
    const intBox = document.getElementById('sched-interval-box');
    if (timeBtn && intBtn && timeBox && intBox) {
      timeBtn.classList.toggle('active', data.autoScanMode === 'time');
      intBtn.classList.toggle('active', data.autoScanMode === 'interval');
      timeBox.style.display = data.autoScanMode === 'time' ? 'block' : 'none';
      intBox.style.display = data.autoScanMode === 'interval' ? 'block' : 'none';
    }
  }
  if (data.autoScanTime) {
    state.autoScanTime = data.autoScanTime;
    localStorage.setItem('calamansi_auto_scan_time', data.autoScanTime);
    const timeInput = document.getElementById('cfg-auto-scan-time');
    if (timeInput) timeInput.value = data.autoScanTime;
  }
  if (data.autoScanIntervalHours) {
    state.autoScanIntervalHours = data.autoScanIntervalHours;
    localStorage.setItem('calamansi_auto_scan_interval', data.autoScanIntervalHours);
    const intSelect = document.getElementById('cfg-auto-scan-interval');
    if (intSelect) intSelect.value = String(data.autoScanIntervalHours);
  }
  if (data.autoAnalyzeEnabled !== undefined) {
    state.autoAnalyzeEnabled = data.autoAnalyzeEnabled;
    localStorage.setItem('calamansi_auto_analyze_enabled', data.autoAnalyzeEnabled);
    const aiToggle = document.getElementById('cfg-auto-ai-toggle');
    if (aiToggle) aiToggle.checked = data.autoAnalyzeEnabled;
  }
  if (data.lastAutoScanIso) {
    state.lastAutoScanIso = data.lastAutoScanIso;
    localStorage.setItem('calamansi_last_auto_scan_iso', data.lastAutoScanIso);
  }
  updateAutoScanUI();

  if (data.activePreset && PRESETS[data.activePreset]) {
    state.activePreset = data.activePreset;
    document.querySelectorAll('.preset-chip').forEach(c => {
      c.classList.toggle('active', c.dataset.preset === data.activePreset);
    });
  }

  if (data.activeAngleIndex !== undefined) {
    state.activeAngleIndex = data.activeAngleIndex;
    const angle = [0, 90, 180, 270][state.activeAngleIndex] || 0;
    if (threeTurntableRig) threeTurntableRig.setAngleDegrees(angle);
    document.querySelectorAll('.angle-pill-btn').forEach((b, i) => b.classList.toggle('active', i === state.activeAngleIndex));
    document.querySelectorAll('.quadrant-mobile-box').forEach((b, i) => b.classList.toggle('active', i === state.activeAngleIndex));
    const badge = document.getElementById('motor-status-badge');
    if (badge) badge.textContent = `Position: ${angle}°`;
  }

  // Gun viewfinder image mapping
  const incomingSingleImage = data.image || data.targetImage;
  if (incomingSingleImage && typeof incomingSingleImage === 'string' && incomingSingleImage.trim() !== '') {
    state.targetImage = incomingSingleImage;
    const gunImg = document.getElementById('gun-target-img');
    const gunPh = document.getElementById('gun-placeholder-box') || document.getElementById('gun-viewfinder-placeholder');
    if (gunImg) {
      gunImg.src = incomingSingleImage;
      gunImg.style.display = 'block';
    }
    if (gunPh) gunPh.style.display = 'none';
  }

  if (data.quadrants && Array.isArray(data.quadrants)) {
    [0, 90, 180, 270].forEach((ang, idx) => {
      const q = data.quadrants[idx];
      if (q && q.img) {
        state.quadrants[idx].img = q.img;
        const imgEl = document.getElementById(`img-${ang}`);
        const placeholder = document.getElementById(`placeholder-${ang}`);
        if (imgEl) {
          imgEl.src = q.img;
          imgEl.style.display = 'block';
        }
        if (placeholder) placeholder.style.display = 'none';
        if (!state.targetImage && idx === 0) {
          state.targetImage = q.img;
          const gunImg = document.getElementById('gun-target-img');
          const gunPh = document.getElementById('gun-placeholder-box') || document.getElementById('gun-viewfinder-placeholder');
          if (gunImg) {
            gunImg.src = q.img;
            gunImg.style.display = 'block';
          }
          if (gunPh) gunPh.style.display = 'none';
        }
      }
    });
  }

  if (data.healthScore !== undefined && data.healthScore !== null) {
    state.analysis.healthScore = data.healthScore;
    state.analysis.isCalamansi = data.healthScore > 0;
    const scoreVal = document.getElementById('health-score-val');
    if (scoreVal) scoreVal.textContent = `${data.healthScore}%`;
    const circle = document.getElementById('health-score-circle');
    const scoreContainer = document.getElementById('health-score-container');
    if (circle) {
      if (data.healthScore === 0) {
        circle.style.strokeDashoffset = 201;
        circle.style.stroke = 'rgba(255, 255, 255, 0.2)';
        if (scoreContainer) scoreContainer.className = 'health-score-container no-scan';
      } else {
        const offset = 201 - (201 * data.healthScore) / 100;
        circle.style.strokeDashoffset = offset;
        circle.style.stroke = data.healthScore >= 80 ? '#10b981' : (data.healthScore >= 55 ? '#f59e0b' : '#ef4444');
        if (scoreContainer) scoreContainer.className = 'health-score-container';
      }
    }
  }

  // Disease severity & severity recommendations mapping
  if (data.severity !== undefined) {
    state.analysis.severity = data.severity;
  }
  if (data.severityPercent !== undefined) {
    state.analysis.severityPercent = data.severityPercent;
  } else if (data.affectedAreaPercentage !== undefined) {
    state.analysis.severityPercent = data.affectedAreaPercentage;
  }
  if (data.severityStage) {
    state.analysis.severityStage = data.severityStage;
  }
  if (data.severityRecommendations) {
    state.analysis.severityRecommendations = data.severityRecommendations;
  }

  if (data.statusText) {
    state.analysis.statusText = data.statusText;
    const statusEl = document.getElementById('health-status-heading');
    if (statusEl) {
      statusEl.textContent = typeof data.statusText === 'object' ? (data.statusText[state.lang] || data.statusText.en) : data.statusText;
    }
  } else if (data.disease) {
    state.analysis.diseaseIdentified = data.disease;
    state.analysis.statusText = { en: data.disease, fil: data.disease };
    const statusEl = document.getElementById('health-status-heading');
    if (statusEl) statusEl.textContent = data.disease;
  }
  if (data.summaryText) {
    state.analysis.summaryText = data.summaryText;
    const sumEl = document.getElementById('health-summary-desc');
    if (sumEl) {
      sumEl.textContent = typeof data.summaryText === 'object' ? (data.summaryText[state.lang] || data.summaryText.en) : data.summaryText;
    }
  }

  if (data.leafStatus) {
    state.analysis.leafStatus = data.leafStatus;
    const leafTag = document.getElementById('leaf-status-tag');
    if (leafTag) {
      leafTag.textContent = typeof data.leafStatus === 'object' ? (data.leafStatus[state.lang] || data.leafStatus.en) : data.leafStatus;
      leafTag.className = `badge-tag ${data.leafTagClass || (data.healthScore === 0 ? 'tag-dimmed' : 'tag-healthy')}`;
    }
  }

  if (data.leafFindings) {
    state.analysis.leafFindings = data.leafFindings;
    const leafList = document.getElementById('leaf-findings-list');
    const leafArr = typeof data.leafFindings === 'object' && !Array.isArray(data.leafFindings) 
      ? (data.leafFindings[state.lang] || data.leafFindings.en || [])
      : (Array.isArray(data.leafFindings) ? data.leafFindings : []);
    if (leafList && leafArr.length > 0) {
      const iconName = data.healthScore === 0 ? 'info' : 'check-circle';
      const iconStyle = data.healthScore === 0 ? 'style="color:var(--text-muted);"' : '';
      leafList.innerHTML = leafArr.map(f => `<li><i data-lucide="${iconName}" ${iconStyle}></i> ${f}</li>`).join('');
    }
  }

  if (data.fruitStatus) {
    state.analysis.fruitStatus = data.fruitStatus;
    const fruitTag = document.getElementById('fruit-status-tag');
    if (fruitTag) {
      fruitTag.textContent = typeof data.fruitStatus === 'object' ? (data.fruitStatus[state.lang] || data.fruitStatus.en) : data.fruitStatus;
      fruitTag.className = `badge-tag ${data.fruitTagClass || (data.healthScore === 0 ? 'tag-dimmed' : 'tag-healthy')}`;
    }
  }

  if (data.fruitFindings) {
    state.analysis.fruitFindings = data.fruitFindings;
    const fruitList = document.getElementById('fruit-findings-list');
    const fruitArr = typeof data.fruitFindings === 'object' && !Array.isArray(data.fruitFindings) 
      ? (data.fruitFindings[state.lang] || data.fruitFindings.en || [])
      : (Array.isArray(data.fruitFindings) ? data.fruitFindings : []);
    if (fruitList && fruitArr.length > 0) {
      const iconName = data.healthScore === 0 ? 'info' : 'check-circle';
      const iconStyle = data.healthScore === 0 ? 'style="color:var(--text-muted);"' : '';
      fruitList.innerHTML = fruitArr.map(f => `<li><i data-lucide="${iconName}" ${iconStyle}></i> ${f}</li>`).join('');
    }
  }

  if (data.treatment) {
    state.analysis.treatment = data.treatment;
  }

  if (data.organicRecs && Array.isArray(data.organicRecs) && data.organicRecs.length > 0) {
    state.analysis.organicRecs = data.organicRecs;
    const recContainer = document.getElementById('organic-recipes-container');
    if (recContainer) {
      recContainer.innerHTML = data.organicRecs.map(r => `
        <div class="recipe-card-item">
          <div class="recipe-emoji-icon">${r.icon || '🌱'}</div>
          <div class="recipe-body">
            <h4>${typeof r.title === 'object' ? (r.title[state.lang] || r.title.en) : r.title}</h4>
            <div class="recipe-sub">${typeof r.sub === 'object' ? (r.sub[state.lang] || r.sub.en) : r.sub}</div>
            <p>${typeof r.desc === 'object' ? (r.desc[state.lang] || r.desc.en) : r.desc}</p>
          </div>
        </div>
      `).join('');
    }
  }

  renderReportUI();

  if (saveToCache && (data.healthScore > 0 || incomingSingleImage || (data.quadrants && data.quadrants.some(q => q && q.img)))) {
    try {
      localStorage.setItem('kilatis_cached_latest_scan', JSON.stringify({
        healthScore: data.healthScore,
        severity: state.analysis.severity,
        severityPercent: state.analysis.severityPercent,
        severityStage: state.analysis.severityStage,
        severityRecommendations: state.analysis.severityRecommendations,
        statusText: data.statusText,
        summaryText: data.summaryText,
        leafStatus: data.leafStatus,
        leafTagClass: data.leafTagClass,
        leafFindings: data.leafFindings,
        fruitStatus: data.fruitStatus,
        fruitTagClass: data.fruitTagClass,
        fruitFindings: data.fruitFindings,
        treatment: data.treatment,
        organicRecs: data.organicRecs,
        activePreset: data.activePreset,
        targetImage: state.targetImage,
        image: incomingSingleImage,
        quadrants: data.quadrants
      }));
    } catch(e) {
      console.warn('Local storage cache write notice:', e);
    }
  }

  renderIcons();
}

function loadCachedScanFromStorage() {
  try {
    const raw = localStorage.getItem('kilatis_cached_latest_scan');
    if (raw) {
      const data = JSON.parse(raw);
      if (data && (data.healthScore > 0 || data.image || data.targetImage || (data.quadrants && data.quadrants.some(q => q && q.img)))) {
        console.log('[Startup] Loaded cached recent scan from LocalStorage instantly.');
        applyScanDataToState(data, false);
      }
    }
  } catch (err) {
    console.warn('[Startup] Cache parse notice:', err);
  }
}

async function loadLatestScanFromCloud() {
  try {
    const scansQuery = query(collection(db, 'scans'), orderBy('timestamp', 'desc'), limit(1));
    const querySnap = await getDocs(scansQuery);
    if (!querySnap.empty) {
      const latestScan = querySnap.docs[0].data();
      console.log('[Cloud Startup] Loaded latest scan from Cloud Firestore scans collection:', latestScan);
      applyScanDataToState(latestScan, true);
    }
  } catch (err) {
    console.warn('[Cloud Startup] Fetch latest scan notice:', err);
  }
}

function initRealtimeSync() {
  try {
    const syncDocRef = doc(db, 'system_sync', 'latest_scan');
    onSnapshot(syncDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const hasIncomingImages = Boolean(data.image || data.targetImage) || (data.quadrants && Array.isArray(data.quadrants) && data.quadrants.some(q => q && q.img && q.img.trim() !== ''));
        const hasIncomingScore = data.healthScore !== undefined && data.healthScore !== null && data.healthScore > 0;

        // Sync whenever incoming data has valid scan data or source is remote
        if (data.source !== 'android' || (state.analysis.healthScore === 0 && hasIncomingScore)) {
          isReceivingRemoteSync = true;
          console.log('[Auto-Sync Android] Applied real-time sync:', data);
          applyScanDataToState(data, true);
          setTimeout(() => { isReceivingRemoteSync = false; }, 500);
        }

        // If system_sync document has no images and no healthScore, fallback to loading the most recent archived scan from 'scans'
        if (!hasIncomingImages && !hasIncomingScore && !state.targetImage && (!state.quadrants || state.quadrants.every(q => !q || !q.img || q.img.trim() === ''))) {
          loadLatestScanFromCloud();
        }
      } else {
        // If system_sync document is empty, fallback to the latest scan from scans collection
        loadLatestScanFromCloud();
      }
    }, (err) => {
      console.warn('[Auto-Sync Android] Firestore listener error:', err);
      loadLatestScanFromCloud();
    });
  } catch (e) {
    console.warn('[Auto-Sync Android] Listener error:', e);
    loadLatestScanFromCloud();
  }
}

// Actions & Settings
function initActions() {
  const geminiBtn = document.getElementById('analyze-gemini-btn');
  if (geminiBtn) geminiBtn.addEventListener('click', runGeminiAnalysis);

  const langEnBtn = document.getElementById('lang-en-btn');
  const langFilBtn = document.getElementById('lang-fil-btn');

  if (langEnBtn) langEnBtn.addEventListener('click', () => switchLanguage('en'));
  if (langFilBtn) langFilBtn.addEventListener('click', () => switchLanguage('fil'));

  // Populate settings inputs
  const rpiInputEl = document.getElementById('cfg-rpi-name');
  const locInputEl = document.getElementById('cfg-location');
  const keyInputEl = document.getElementById('cfg-gemini-key');
  if (rpiInputEl) rpiInputEl.value = state.rpiName;
  if (locInputEl) locInputEl.value = state.location;
  if (keyInputEl) keyInputEl.value = localStorage.getItem('calamansi_gemini_api_key') || import.meta.env.VITE_GEMINI_API_KEY || '';

  // Auto Scan DOM setup
  const autoScanToggle = document.getElementById('cfg-auto-scan-toggle');
  const autoScanContainer = document.getElementById('auto-scan-options-container');
  const modeTimeBtn = document.getElementById('mode-time-btn');
  const modeIntervalBtn = document.getElementById('mode-interval-btn');
  const schedTimeBox = document.getElementById('sched-time-box');
  const schedIntervalBox = document.getElementById('sched-interval-box');
  const autoScanTimeInput = document.getElementById('cfg-auto-scan-time');
  const autoScanIntervalSelect = document.getElementById('cfg-auto-scan-interval');
  const autoAiToggle = document.getElementById('cfg-auto-ai-toggle');

  if (autoScanToggle) {
    autoScanToggle.checked = state.autoScanEnabled;
    if (autoScanContainer) {
      autoScanContainer.style.display = state.autoScanEnabled ? 'block' : 'none';
    }
    autoScanToggle.addEventListener('change', (e) => {
      state.autoScanEnabled = e.target.checked;
      localStorage.setItem('calamansi_auto_scan_enabled', state.autoScanEnabled);
      if (autoScanContainer) {
        autoScanContainer.style.display = state.autoScanEnabled ? 'block' : 'none';
      }
      updateAutoScanUI();
      syncToFirestore('android');
    });
  }

  if (autoScanTimeInput) {
    autoScanTimeInput.value = state.autoScanTime;
    const handleTimeChange = (e) => {
      state.autoScanTime = e.target.value;
      localStorage.setItem('calamansi_auto_scan_time', state.autoScanTime);
      updateAutoScanUI();
      syncToFirestore('android');
    };
    autoScanTimeInput.addEventListener('change', handleTimeChange);
    autoScanTimeInput.addEventListener('input', handleTimeChange);
  }

  if (autoScanIntervalSelect) {
    autoScanIntervalSelect.value = String(state.autoScanIntervalHours);
    autoScanIntervalSelect.addEventListener('change', (e) => {
      state.autoScanIntervalHours = parseInt(e.target.value, 10);
      localStorage.setItem('calamansi_auto_scan_interval', state.autoScanIntervalHours);
      updateAutoScanUI();
      syncToFirestore('android');
    });
  }

  if (autoAiToggle) {
    autoAiToggle.checked = state.autoAnalyzeEnabled;
    autoAiToggle.addEventListener('change', (e) => {
      state.autoAnalyzeEnabled = e.target.checked;
      localStorage.setItem('calamansi_auto_analyze_enabled', state.autoAnalyzeEnabled);
      syncToFirestore('android');
    });
  }

  if (modeTimeBtn && modeIntervalBtn) {
    modeTimeBtn.addEventListener('click', () => {
      state.autoScanMode = 'time';
      localStorage.setItem('calamansi_auto_scan_mode', 'time');
      modeTimeBtn.classList.add('active');
      modeIntervalBtn.classList.remove('active');
      if (schedTimeBox) schedTimeBox.style.display = 'block';
      if (schedIntervalBox) schedIntervalBox.style.display = 'none';
      updateAutoScanUI();
      syncToFirestore('android');
    });

    modeIntervalBtn.addEventListener('click', () => {
      state.autoScanMode = 'interval';
      localStorage.setItem('calamansi_auto_scan_mode', 'interval');
      modeIntervalBtn.classList.add('active');
      modeTimeBtn.classList.remove('active');
      if (schedIntervalBox) schedIntervalBox.style.display = 'block';
      if (schedTimeBox) schedTimeBox.style.display = 'none';
      updateAutoScanUI();
      syncToFirestore('android');
    });

    // Set initial mode visibility
    if (state.autoScanMode === 'interval') {
      modeIntervalBtn.classList.add('active');
      modeTimeBtn.classList.remove('active');
      if (schedIntervalBox) schedIntervalBox.style.display = 'block';
      if (schedTimeBox) schedTimeBox.style.display = 'none';
    } else {
      modeTimeBtn.classList.add('active');
      modeIntervalBtn.classList.remove('active');
      if (schedTimeBox) schedTimeBox.style.display = 'block';
      if (schedIntervalBox) schedIntervalBox.style.display = 'none';
    }
  }

  const saveSettingsBtn = document.getElementById('save-settings-btn');
  if (saveSettingsBtn) {
    saveSettingsBtn.addEventListener('click', () => {
      const rpiInput = document.getElementById('cfg-rpi-name')?.value.trim() || 'RPi Detector 1';
      const locInput = document.getElementById('cfg-location')?.value.trim() || 'Manila, Philippines';
      const keyInput = document.getElementById('cfg-gemini-key')?.value.trim();

      localStorage.setItem('calamansi_rpi_name', rpiInput);
      localStorage.setItem('calamansi_location', locInput);
      state.rpiName = rpiInput;
      state.location = locInput;

      if (keyInput) {
        state.geminiApiKey = keyInput;
        localStorage.setItem('calamansi_gemini_api_key', keyInput);
        try {
          setDoc(doc(db, 'system_config', 'gemini'), { apiKey: keyInput, updatedAt: serverTimestamp() }, { merge: true });
          console.log('[Cloud Config Android] Gemini API Key saved to Cloud Firestore.');
        } catch (e) {
          console.warn('[Cloud Config Android] Save key error:', e);
        }
      } else if (keyInput === '') {
        state.geminiApiKey = '';
        localStorage.removeItem('calamansi_gemini_api_key');
      }

      const autoTimeEl = document.getElementById('cfg-auto-scan-time');
      if (autoTimeEl && autoTimeEl.value) {
        state.autoScanTime = autoTimeEl.value;
        localStorage.setItem('calamansi_auto_scan_time', state.autoScanTime);
      }

      const autoToggleEl = document.getElementById('cfg-auto-scan-toggle');
      if (autoToggleEl) {
        state.autoScanEnabled = autoToggleEl.checked;
        localStorage.setItem('calamansi_auto_scan_enabled', state.autoScanEnabled);
      }

      const autoIntervalEl = document.getElementById('cfg-auto-scan-interval');
      if (autoIntervalEl) {
        state.autoScanIntervalHours = parseInt(autoIntervalEl.value, 10);
        localStorage.setItem('calamansi_auto_scan_interval', state.autoScanIntervalHours);
      }

      const autoAiEl = document.getElementById('cfg-auto-ai-toggle');
      if (autoAiEl) {
        state.autoAnalyzeEnabled = autoAiEl.checked;
        localStorage.setItem('calamansi_auto_analyze_enabled', state.autoAnalyzeEnabled);
      }

      // Immediately fetch live weather for the updated location
      fetchLiveWeather('android');

      syncToFirestore('android');
      updateAutoScanUI();
      alert(state.lang === 'fil' ? `Nai-save na ang mga setting sa Cloud Firestore! (${locInput})` : `Settings saved successfully to Cloud Firestore! (${locInput})`);
    });
  }

  const firestoreBtn = document.getElementById('save-firestore-btn');
  if (firestoreBtn) {
    firestoreBtn.addEventListener('click', async () => {
      try {
        const p = PRESETS[state.activePreset];
        await addDoc(collection(db, 'scans'), {
          userEmail: state.currentUser ? state.currentUser.email : 'anonymous',
          rpiName: state.rpiName,
          location: state.location,
          weather: state.weather,
          preset: state.activePreset || 'manual_scan',
          healthScore: state.analysis?.healthScore !== undefined ? state.analysis.healthScore : (p?.score || 0),
          statusText: state.analysis?.statusText || (p?.statusText || 'No Scan Performed'),
          summaryText: state.analysis?.summaryText || (p?.summary || ''),
          leafStatus: state.analysis?.leafStatus || 'Awaiting Scan',
          leafFindings: state.analysis?.leafFindings || [],
          fruitStatus: state.analysis?.fruitStatus || 'Awaiting Scan',
          fruitFindings: state.analysis?.fruitFindings || [],
          autoScanTime: state.autoScanTime || '07:00',
          autoScanEnabled: state.autoScanEnabled,
          autoScanMode: state.autoScanMode || 'time',
          autoScanIntervalHours: state.autoScanIntervalHours || 6,
          quadrants: [
            { angle: 0, img: state.quadrants[0]?.img || (p ? p.img0 : '') },
            { angle: 90, img: state.quadrants[1]?.img || (p ? p.img90 : '') },
            { angle: 180, img: state.quadrants[2]?.img || (p ? p.img180 : '') },
            { angle: 270, img: state.quadrants[3]?.img || (p ? p.img270 : '') }
          ],
          timestamp: serverTimestamp()
        });
        alert(state.lang === 'fil' ? 'Nai-save sa Firestore Cloud (kasama ang Oras at Datos)!' : 'Successfully saved scan report, schedule time & images to Firestore!');
      } catch (err) {
        alert('Firestore Save Notice: ' + err.message);
      }
    });
  }

  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      signOut(auth).then(() => {
        window.location.replace('/login.html');
      });
    });
  }
}

function switchLanguage(lang) {
  state.lang = lang;
  localStorage.setItem('calamansi_android_lang', lang);
  applyLanguage(lang);
}

function applyLanguage(lang) {
  // Update dynamic weather text keys before applying translations
  updateDynamicWeatherAdvisories();

  const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (dict[key]) {
      el.innerHTML = dict[key];
    }
  });

  renderReportUI();
  renderWeatherUI();
  updateAutoScanUI();
  if (state.currentUser) {
    initHistoryListener();
  }
}

function initAuth() {
  onAuthStateChanged(auth, (user) => {
    state.currentUser = user;
    const emailEl = document.getElementById('user-display-email');
    const avatarEl = document.getElementById('user-avatar-initials');

    if (user) {
      if (emailEl) emailEl.textContent = user.email;
      if (avatarEl) {
        const initials = user.displayName ? user.displayName.split(' ').map(n=>n[0]).join('').toUpperCase() : user.email.substring(0,2).toUpperCase();
        avatarEl.textContent = initials;
      }
      const brandEmailEl = document.getElementById('brand-menu-user-email');
      const brandAvatarEl = document.getElementById('brand-menu-user-initials');
      if (brandEmailEl) brandEmailEl.textContent = user.email || 'Cloud User';
      if (brandAvatarEl) brandAvatarEl.textContent = avatarEl?.textContent || 'US';

      // Immediately restore last cached scan from local storage so UI is never blank
      loadCachedScanFromStorage();

      // Start Real-Time Bi-Directional Cloud Auto-Sync, Cloud Latest Scan, API Key & History Listener
      initRealtimeSync();
      initCloudApiKeyListener();
      loadLatestScanFromCloud();
      initHistoryListener();
    } else {
      // Direct user immediately to the Login Page on app launch
      window.location.replace('/login.html');
    }
  });
}

// Cloud Firestore API Key Resolver & Synchronizer (Android)
let cloudApiKeyLoaded = false;

async function resolveGeminiApiKey() {
  // Prefer the live key loaded from Cloud Firestore (allows rotation without rebuilding APK)
  if (cloudApiKeyLoaded && state.geminiApiKey && state.geminiApiKey.trim().length >= 20) {
    return state.geminiApiKey.trim();
  }

  try {
    const snap = await getDoc(doc(db, 'system_config', 'gemini'));
    if (snap.exists()) {
      const cloudKey = (snap.data()?.apiKey || '').trim();
      if (cloudKey.length >= 20) {
        cloudApiKeyLoaded = true;
        state.geminiApiKey = cloudKey;
        localStorage.setItem('calamansi_gemini_api_key', cloudKey);
        return cloudKey;
      }
    }
  } catch (err) {
    console.warn('[Cloud Config Android] On-demand API key fetch notice:', err);
  }

  return (
    state.geminiApiKey ||
    localStorage.getItem('calamansi_gemini_api_key') ||
    import.meta.env.VITE_GEMINI_API_KEY ||
    ''
  ).trim();
}

function initCloudApiKeyListener() {
  try {
    const configDocRef = doc(db, 'system_config', 'gemini');
    onSnapshot(configDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const key = (data?.apiKey || '').trim();
        if (key !== '') {
          cloudApiKeyLoaded = true;
          state.geminiApiKey = key;
          localStorage.setItem('calamansi_gemini_api_key', key);
          const keyEl = document.getElementById('cfg-gemini-key');
          if (keyEl && !keyEl.value) {
            keyEl.value = key;
          }
          console.log('[Cloud Config Android] Successfully retrieved Gemini API Key from Cloud Firestore.');
        } else {
          cloudApiKeyLoaded = false;
          state.geminiApiKey = '';
          localStorage.removeItem('calamansi_gemini_api_key');
        }
      }
    }, (err) => {
      console.warn('[Cloud Config Android] API key listener notice:', err);
    });
  } catch (e) {
    console.warn('[Cloud Config Android] Listener error:', e);
  }
}

// ========================================================================
// AUTOMATIC SCAN SCHEDULER ENGINE (FIRESTORE SYNCED - ANDROID)
// ========================================================================
let autoScanSchedulerTimer = null;
let lastTriggeredMinute = '';

function updateAutoScanUI() {
  const pill = document.getElementById('auto-scan-status-pill');
  const pillText = document.getElementById('auto-scan-pill-text');
  const previewText = document.getElementById('next-scan-preview-text');

  if (pill && pillText) {
    if (state.autoScanEnabled) {
      pill.classList.add('active');
      if (state.autoScanMode === 'time') {
        pillText.textContent = `${TRANSLATIONS[state.lang]['auto-scan-daily-at']} ${state.autoScanTime}`;
      } else {
        pillText.textContent = `${TRANSLATIONS[state.lang]['auto-scan-every']} ${state.autoScanIntervalHours}${TRANSLATIONS[state.lang]['hours-abbr']}`;
      }
    } else {
      pill.classList.remove('active');
      pillText.textContent = TRANSLATIONS[state.lang]['auto-scan-off'];
    }
  }

  if (previewText) {
    if (!state.autoScanEnabled) {
      previewText.textContent = TRANSLATIONS[state.lang]['next-scan-disabled'];
    } else if (state.autoScanMode === 'time') {
      previewText.textContent = `${TRANSLATIONS[state.lang]['next-scan-scheduled-at']} ${state.autoScanTime}`;
    } else {
      previewText.textContent = `${TRANSLATIONS[state.lang]['next-scan-interval-every']} ${state.autoScanIntervalHours} ${TRANSLATIONS[state.lang]['hours-abbr']}`;
    }
  }
}

function initAutoScanScheduler() {
  if (autoScanSchedulerTimer) clearInterval(autoScanSchedulerTimer);

  updateAutoScanUI();

  // Periodic check every 15 seconds
  autoScanSchedulerTimer = setInterval(() => {
    checkAndRunAutoScan();
  }, 15000);
}

function checkAndRunAutoScan() {
  if (!state.autoScanEnabled || state.isScanning) return;

  const now = new Date();
  const currentHours = String(now.getHours()).padStart(2, '0');
  const currentMinutes = String(now.getMinutes()).padStart(2, '0');
  const currentTimeStr = `${currentHours}:${currentMinutes}`;
  const currentMinuteKey = `${now.toDateString()}_${currentTimeStr}`;

  if (state.autoScanMode === 'time') {
    if (currentTimeStr === state.autoScanTime && lastTriggeredMinute !== currentMinuteKey) {
      lastTriggeredMinute = currentMinuteKey;
      console.log(`[Auto-Scan Scheduler] Running daily automated scan scheduled for ${currentTimeStr}`);
      triggerScheduledAutoScan();
    }
  } else if (state.autoScanMode === 'interval') {
    const lastScanMs = state.lastAutoScanIso ? new Date(state.lastAutoScanIso).getTime() : 0;
    const intervalMs = state.autoScanIntervalHours * 60 * 60 * 1000;
    if (now.getTime() - lastScanMs >= intervalMs && lastTriggeredMinute !== currentMinuteKey) {
      lastTriggeredMinute = currentMinuteKey;
      console.log(`[Auto-Scan Scheduler] Running interval automated scan (every ${state.autoScanIntervalHours}h)`);
      triggerScheduledAutoScan();
    }
  }
}

async function triggerScheduledAutoScan() {
  state.lastAutoScanIso = new Date().toISOString();
  localStorage.setItem('calamansi_last_auto_scan_iso', state.lastAutoScanIso);

  // Trigger gun foliar capture
  runGunTriggerCapture();

  // If auto Gemini diagnosis is enabled, run diagnosis after scan completes (~8.5 seconds)
  if (state.autoAnalyzeEnabled) {
    setTimeout(() => {
      runGeminiAnalysis();
    }, 9000);
  }

  updateAutoScanUI();
  syncToFirestore('android');
}

// ========================================================================
// ========================================================================
// REAL-TIME CLOUD HISTORY LISTENER & REPORT MANAGEMENT (ANDROID)
// ========================================================================
let unsubscribeHistoryListener = null;
let isAndroidHistoryDelegationAttached = false;
let pendingAndroidDeleteDocId = null;

function openAndroidDeleteModal(docId) {
  pendingAndroidDeleteDocId = docId;
  const modal = document.getElementById('delete-confirm-modal');
  if (!modal) return;
  const isFil = state.lang === 'fil';
  
  const titleEl = document.getElementById('delete-modal-title');
  const descEl = document.getElementById('delete-modal-desc');
  const cancelBtn = document.getElementById('cancel-delete-modal-btn');
  const confirmBtn = document.getElementById('confirm-delete-modal-btn');
  
  if (titleEl) titleEl.textContent = isFil ? 'Burahin ang Ulat ng Scan?' : 'Delete Scan Report?';
  if (descEl) descEl.textContent = isFil 
    ? 'Sigurado ka bang nais mong burahin ang ulat na ito sa Cloud Firestore? Hindi na ito mababawi.'
    : 'Are you sure you want to permanently delete this report from Cloud Firestore? This action cannot be undone.';
  if (cancelBtn) cancelBtn.innerHTML = `<i data-lucide="x"></i> <span>${isFil ? 'Kanselahin' : 'Cancel'}</span>`;
  if (confirmBtn) {
    confirmBtn.disabled = false;
    confirmBtn.innerHTML = `<i data-lucide="trash-2"></i> <span>${isFil ? 'Burahin' : 'Delete'}</span>`;
  }
  
  modal.style.display = 'flex';
  modal.classList.add('active');
  renderIcons();
}

function closeAndroidDeleteModal() {
  const modal = document.getElementById('delete-confirm-modal');
  if (modal) {
    modal.style.display = 'none';
    modal.classList.remove('active');
  }
  const confirmBtn = document.getElementById('confirm-delete-modal-btn');
  if (confirmBtn) {
    confirmBtn.disabled = false;
    const isFil = state.lang === 'fil';
    confirmBtn.innerHTML = `<i data-lucide="trash-2"></i> <span>${isFil ? 'Burahin' : 'Delete'}</span>`;
    renderIcons();
  }
  pendingAndroidDeleteDocId = null;
}

async function executeAndroidDeleteReport() {
  if (!pendingAndroidDeleteDocId) return;
  const docId = pendingAndroidDeleteDocId;
  const isFil = state.lang === 'fil';
  const confirmBtn = document.getElementById('confirm-delete-modal-btn');

  if (confirmBtn) {
    confirmBtn.disabled = true;
    confirmBtn.innerHTML = `<i data-lucide="loader" class="spin"></i> <span>${isFil ? 'Binubura...' : 'Deleting...'}</span>`;
    renderIcons();
  }

  const cardEl = document.getElementById(`history-card-${docId}`);
  if (cardEl) {
    cardEl.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    cardEl.style.opacity = '0.35';
    cardEl.style.pointerEvents = 'none';
    cardEl.style.transform = 'scale(0.97)';
  }

  try {
    await deleteDoc(doc(db, 'scans', docId));
    console.log('[History Android] Successfully deleted doc from Firestore:', docId);
    
    closeAndroidDeleteModal();

    if (cardEl) {
      cardEl.style.opacity = '0';
      cardEl.style.transform = 'scale(0.85) translateY(-8px)';
      cardEl.style.maxHeight = '0px';
      cardEl.style.marginBottom = '0px';
      cardEl.style.paddingTop = '0px';
      cardEl.style.paddingBottom = '0px';
      cardEl.style.overflow = 'hidden';
      setTimeout(() => cardEl.remove(), 300);
    }
  } catch (err) {
    console.error('[History Android] Delete error:', err);
    alert((isFil ? 'Hindi mabura ang ulat: ' : 'Failed to delete report: ') + (err.message || err));
    if (confirmBtn) {
      confirmBtn.disabled = false;
      confirmBtn.innerHTML = `<i data-lucide="trash-2"></i> <span>${isFil ? 'Burahin' : 'Delete'}</span>`;
      renderIcons();
    }
  }
}

window.deleteHistoryReport = openAndroidDeleteModal;
window.openAndroidDeleteModal = openAndroidDeleteModal;
window.closeAndroidDeleteModal = closeAndroidDeleteModal;
window.executeAndroidDeleteReport = executeAndroidDeleteReport;

function initHistoryListener() {
  const historyListEl = document.getElementById('history-reports-list');
  const countBadge = document.getElementById('history-count-badge');
  if (!historyListEl) return;

  // Bind modal buttons once
  const cancelBtn = document.getElementById('cancel-delete-modal-btn');
  if (cancelBtn && !cancelBtn.dataset.bound) {
    cancelBtn.dataset.bound = 'true';
    cancelBtn.addEventListener('click', closeAndroidDeleteModal);
  }

  const confirmBtn = document.getElementById('confirm-delete-modal-btn');
  if (confirmBtn && !confirmBtn.dataset.bound) {
    confirmBtn.dataset.bound = 'true';
    confirmBtn.addEventListener('click', executeAndroidDeleteReport);
  }

  const deleteModal = document.getElementById('delete-confirm-modal');
  if (deleteModal && !deleteModal.dataset.bound) {
    deleteModal.dataset.bound = 'true';
    deleteModal.addEventListener('click', (e) => {
      if (e.target === deleteModal) closeAndroidDeleteModal();
    });
  }

  if (!isAndroidHistoryDelegationAttached) {
    document.addEventListener('click', (e) => {
      const deleteBtn = e.target.closest('.btn-delete-report');
      if (!deleteBtn) return;
      const docId = deleteBtn.dataset.id || deleteBtn.getAttribute('data-id');
      if (!docId) return;
      e.preventDefault();
      e.stopPropagation();
      openAndroidDeleteModal(docId);
    });
    isAndroidHistoryDelegationAttached = true;
  }

  if (unsubscribeHistoryListener) {
    unsubscribeHistoryListener();
  }

  try {
    const scansQuery = query(collection(db, 'scans'), orderBy('timestamp', 'desc'));
    unsubscribeHistoryListener = onSnapshot(scansQuery, (snapshot) => {
      const isFil = state.lang === 'fil';

      if (snapshot.empty) {
        if (countBadge) countBadge.textContent = `0 ${isFil ? 'Mga Ulat' : 'Reports'}`;
        historyListEl.innerHTML = `
          <div class="history-empty-state">
            <div class="history-empty-icon">
              <i data-lucide="inbox"></i>
            </div>
            <h4 data-i18n="history-empty-title">${isFil ? 'Walang Naka-save na Ulat' : 'No Saved Reports'}</h4>
            <p data-i18n="history-empty-desc">${isFil ? 'Magsagawa ng scan o pindutin ang "I-save sa Firestore Cloud" upang makita ang mga ulat dito.' : 'Perform a scan or tap "Save Scan to Firestore Cloud" to view archived reports here.'}</p>
          </div>
        `;
        renderIcons();
        return;
      }

      // Deduplicate history entries
      const seenSignatures = new Set();
      const cleanDocs = [];

      snapshot.forEach(docSnap => {
        const d = docSnap.data();
        const timeMs = d.timestamp?.toMillis ? d.timestamp.toMillis() : (d.timestamp?.toDate ? d.timestamp.toDate().getTime() : 0);
        const timeBucket = Math.floor(timeMs / (90 * 1000));
        const quadSig = Array.isArray(d.quadrants) 
          ? d.quadrants.map(q => (q && q.img ? q.img.slice(20, 70) : '')).join('|')
          : '';
        const sig = `${timeBucket}_${quadSig}`;
        
        if (quadSig && seenSignatures.has(sig)) {
          return;
        }
        if (quadSig) seenSignatures.add(sig);
        cleanDocs.push({ id: docSnap.id, data: d });
      });

      if (countBadge) {
        countBadge.textContent = `${cleanDocs.length} ${isFil ? 'Mga Ulat' : 'Reports'}`;
      }

      let html = '';
      cleanDocs.forEach(({ id: docId, data: d }) => {
        let dateStr = isFil ? 'Kamakailan' : 'Recently Saved';
        if (d.timestamp && d.timestamp.toDate) {
          const dateObj = d.timestamp.toDate();
          dateStr = dateObj.toLocaleDateString(isFil ? 'fil-PH' : 'en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          });
        }

        const score = typeof d.healthScore === 'number' ? d.healthScore : 0;
        let scoreTagClass = 'tag-healthy';
        if (score === 0) scoreTagClass = 'tag-dimmed';
        else if (score < 55) scoreTagClass = 'tag-danger';
        else if (score < 80) scoreTagClass = 'tag-warning';

        const statusHeading = (typeof d.statusText === 'object' && d.statusText !== null) ? (d.statusText[state.lang] || d.statusText.en || (isFil ? 'Walang Pagsusuri' : 'No Scan Performed')) : (d.statusText || (isFil ? 'Walang Pagsusuri' : 'No Scan Performed'));
        const summaryDesc = (typeof d.summaryText === 'object' && d.summaryText !== null) ? (d.summaryText[state.lang] || d.summaryText.en || '') : (d.summaryText || '');
        const leafStr = (typeof d.leafStatus === 'object' && d.leafStatus !== null) ? (d.leafStatus[state.lang] || d.leafStatus.en || (isFil ? 'Naghihintay ng Scan' : 'Awaiting Scan')) : (d.leafStatus || (isFil ? 'Naghihintay ng Scan' : 'Awaiting Scan'));
        const fruitStr = (typeof d.fruitStatus === 'object' && d.fruitStatus !== null) ? (d.fruitStatus[state.lang] || d.fruitStatus.en || (isFil ? 'Naghihintay ng Scan' : 'Awaiting Scan')) : (d.fruitStatus || (isFil ? 'Naghihintay ng Scan' : 'Awaiting Scan'));

        // Quadrant thumbnails strip
        let quadHtml = '';
        if (d.quadrants && Array.isArray(d.quadrants) && d.quadrants.some(q => q && q.img)) {
          quadHtml = `
            <div class="history-quad-strip">
              ${d.quadrants.map(q => (q && q.img) ? `
                <div class="history-quad-thumb">
                  <img src="${q.img}" alt="${q.angle || 0}°" />
                  <span class="history-quad-tag">${q.angle || 0}°</span>
                </div>
              ` : `
                <div class="history-quad-thumb empty">
                  <i data-lucide="camera" style="width:14px; height:14px; opacity:0.4;"></i>
                  <span class="history-quad-tag">${(q && q.angle) || 0}°</span>
                </div>
              `).join('')}
            </div>
          `;
        }

        // Weather meta chip
        let weatherChip = '';
        if (d.weather) {
          const wTemp = d.weather.temp ? `${d.weather.temp}°C` : '';
          const wRain = d.weather.rainChance !== undefined ? `${d.weather.rainChance}% rain` : '';
          if (wTemp || wRain) {
            weatherChip = `<span class="history-meta-chip"><i data-lucide="cloud-sun"></i> ${wTemp} ${wRain}</span>`;
          }
        }

        // Auto Scan time chip
        let timeChip = '';
        if (d.autoScanTime) {
          timeChip = `<span class="history-meta-chip"><i data-lucide="clock"></i> Auto: ${d.autoScanTime}</span>`;
        }

        html += `
          <div class="m3-card history-card" id="history-card-${docId}">
            <div class="history-card-header">
              <div class="history-date-row">
                <i data-lucide="calendar"></i>
                <span>${dateStr}</span>
              </div>
              <div class="history-header-actions">
                ${d.severity && d.severity !== 'None' ? `<span class="badge-tag ${d.severity.toLowerCase() === 'severe' ? 'sev-tag-severe' : (d.severity.toLowerCase() === 'moderate' ? 'sev-tag-moderate' : 'sev-tag-mild')}" style="font-size:10px; font-weight:700;">${d.severity.toUpperCase()}</span>` : ''}
                <span class="badge-tag ${scoreTagClass}">${score}% Score</span>
                <button class="btn-delete-report" data-id="${docId}" onclick="window.openAndroidDeleteModal('${docId}')" type="button" title="${isFil ? 'Burahin ang Ulat' : 'Delete Report'}">
                  <i data-lucide="trash-2"></i>
                  <span>${isFil ? 'Burahin' : 'Delete'}</span>
                </button>
              </div>
            </div>

            <div class="history-meta-row">
              <span class="history-meta-chip"><i data-lucide="map-pin"></i> ${d.location || 'Mindoro, Philippines'}</span>
              ${weatherChip}
              ${timeChip}
            </div>

            <div class="history-diag-body">
              <h4 class="history-status-title">${statusHeading}</h4>
              <p class="history-summary-text">${summaryDesc}</p>
            </div>

            ${d.image ? `
              <div class="history-quad-strip">
                <div class="history-quad-thumb" style="width:70px; height:70px; border-radius:10px; overflow:hidden;">
                  <img src="${d.image}" alt="Foliar Gun Scan" style="width:100%; height:100%; object-fit:cover;" />
                  <span class="history-quad-tag">Gun Shot</span>
                </div>
              </div>
            ` : quadHtml}

            <div class="history-tags-row">
              <span class="badge-tag ${score === 0 ? 'tag-dimmed' : 'tag-healthy'}" style="font-size:10px;">
                🍃 ${leafStr}
              </span>
              <span class="badge-tag ${score === 0 ? 'tag-dimmed' : 'tag-healthy'}" style="font-size:10px;">
                🍋 ${fruitStr}
              </span>
            </div>
          </div>
        `;
      });

      historyListEl.innerHTML = html;
      renderIcons();
    }, (err) => {
      console.warn('History snapshot error:', err);
    });
  } catch (err) {
    console.warn('History listener initialization error:', err);
  }
}

