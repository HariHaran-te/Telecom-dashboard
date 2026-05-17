/* =========================================================
   data.js — Centralized mock data for the Telecom Dashboard
   ========================================================= */

const DB = {

  /* ---- Operators ---- */
  operators: [
    {
      id: 'airtel',
      name: 'Airtel',
      fullName: 'Bharti Airtel Limited',
      color: '#e8102a',
      logo: 'fa-solid fa-signal',
      downloadSpeed: 45.2,
      uploadSpeed: 12.6,
      latency: 28,
      packetLoss: 0.32,
      availability: 99.89,
      avgSpeed: 45.2,
      activeSites: 42150,
      growingSites: 1247,
      downloadDelta: 3.2,
      uploadDelta: 1.1,
      callQuality: 4.5,
    },
    {
      id: 'jio',
      name: 'Jio',
      fullName: 'Reliance Jio Infocomm Limited',
      color: '#0073e6',
      logo: 'fa-solid fa-wifi',
      downloadSpeed: 52.1,
      uploadSpeed: 16.7,
      latency: 24,
      packetLoss: 0.28,
      availability: 99.73,
      avgSpeed: 52.1,
      activeSites: 38972,
      growingSites: 980,
      downloadDelta: 5.1,
      uploadDelta: 2.3,
      callQuality: 4.7,
    },
    {
      id: 'bsnl',
      name: 'BSNL',
      fullName: 'Bharat Sanchar Nigam Limited',
      color: '#ff8c00',
      logo: 'fa-solid fa-tower-broadcast',
      downloadSpeed: 16.7,
      uploadSpeed: 5.2,
      latency: 45,
      packetLoss: 0.05,
      availability: 98.92,
      avgSpeed: 16.7,
      activeSites: 22365,
      growingSites: 312,
      downloadDelta: -1.2,
      uploadDelta: 0.4,
      callQuality: 3.9,
    },
    {
      id: 'vodafone',
      name: 'Vodafone',
      fullName: 'Vodafone Idea Limited',
      color: '#38d9a9',
      logo: 'fa-solid fa-circle-nodes',
      downloadSpeed: 37.3,
      uploadSpeed: 11.3,
      latency: 31,
      packetLoss: 0.41,
      availability: 99.48,
      avgSpeed: 37.8,
      activeSites: 21893,
      growingSites: 540,
      downloadDelta: 2.0,
      uploadDelta: 1.5,
      callQuality: 4.2,
    },
  ],

  /* ---- Dashboard KPIs ---- */
  kpis: {
    totalSites: 125430,
    totalSitesDelta: 2.15,
    avgAvailability: 99.82,
    avgAvailabilityDelta: 0.12,
    trafficVolume: '28.4 TB',
    trafficVolumeDelta: 5.7,
    activeAlerts: 247,
    activeAlertsDelta: -12,
    callQuality: 4.5,
    callQualityDelta: 0.2,
  },

  /* ---- 7-day availability trend (%) ---- */
  availabilityTrend: {
    labels: ['May 20', 'May 21', 'May 22', 'May 23', 'May 24', 'May 25', 'May 26'],
    airtel:   [99.8, 99.7, 99.9, 99.85, 99.92, 99.89, 99.9],
    jio:      [99.5, 99.6, 99.7, 99.65, 99.78, 99.73, 99.8],
    bsnl:     [98.5, 98.7, 98.6, 98.9, 98.92, 98.88, 98.95],
    vodafone: [99.2, 99.3, 99.1, 99.4, 99.48, 99.45, 99.5],
  },

  /* ---- 7-day traffic volume (TB) ---- */
  trafficTrend: {
    labels: ['May 20', 'May 21', 'May 22', 'May 23', 'May 24', 'May 25', 'May 26'],
    airtel:   [1.1, 1.2, 1.3, 1.1, 1.4, 1.3, 1.5],
    jio:      [1.3, 1.4, 1.2, 1.5, 1.6, 1.4, 1.8],
    bsnl:     [0.4, 0.5, 0.4, 0.5, 0.5, 0.4, 0.5],
    vodafone: [0.8, 0.9, 0.8, 1.0, 0.9, 0.8, 1.0],
  },

  /* ---- Top Regions per operator ---- */
  regions: {
    airtel: [
      { state: 'Maharashtra', sites: 8420, avail: '99.92%', speed: '47.3 Mbps', growing: 142 },
      { state: 'Karnataka',   sites: 5420, avail: '99.87%', speed: '45.2 Mbps', growing: 98 },
      { state: 'Karnataka',   sites: 3090, avail: '99.91%', speed: '43.1 Mbps', growing: 63 },
      { state: 'Tamil Nadu',  sites: 4120, avail: '99.81%', speed: '44.8 Mbps', growing: 87 },
    ],
    jio: [
      { state: 'Delhi',         sites: 6120, avail: '99.85%', speed: '55.2 Mbps', growing: 110 },
      { state: 'Uttar Pradesh', sites: 5800, avail: '99.70%', speed: '49.8 Mbps', growing: 95 },
      { state: 'Gujarat',       sites: 3980, avail: '99.78%', speed: '53.4 Mbps', growing: 72 },
      { state: 'Rajasthan',     sites: 3540, avail: '99.65%', speed: '48.5 Mbps', growing: 58 },
    ],
    bsnl: [
      { state: 'Madhya Pradesh', sites: 4200, avail: '98.95%', speed: '18.2 Mbps', growing: 41 },
      { state: 'Punjab',         sites: 3100, avail: '98.88%', speed: '16.8 Mbps', growing: 30 },
      { state: 'Haryana',        sites: 2800, avail: '98.82%', speed: '15.6 Mbps', growing: 22 },
      { state: 'Bihar',          sites: 2400, avail: '98.75%', speed: '14.2 Mbps', growing: 18 },
    ],
    vodafone: [
      { state: 'Maharashtra', sites: 5100, avail: '99.52%', speed: '39.5 Mbps', growing: 78 },
      { state: 'Tamil Nadu',  sites: 4200, avail: '99.48%', speed: '38.2 Mbps', growing: 65 },
      { state: 'Andhra Pradesh', sites: 3600, avail: '99.44%', speed: '36.8 Mbps', growing: 52 },
      { state: 'Kerala',      sites: 2800, avail: '99.40%', speed: '35.4 Mbps', growing: 44 },
    ],
  },

  /* ---- Alerts ---- */
  alerts: [
    { id: 1, time: '2 min ago',   operator: 'airtel',   alert: 'High Packet Loss', location: 'Mumbai',    status: 'new',           statusLabel: 'New' },
    { id: 2, time: '15 min ago',  operator: 'jio',      alert: 'Site Down',        location: 'Bangalore',  status: 'acknowledged',  statusLabel: 'Acknowledged' },
    { id: 3, time: '1 hour ago',  operator: 'bsnl',     alert: 'High Latency',     location: 'Delhi',      status: 'in-progress',   statusLabel: 'In Progress' },
    { id: 4, time: '2 hours ago', operator: 'vodafone', alert: 'Low Battery',      location: 'Chennai',    status: 'resolved',      statusLabel: 'Resolved' },
    { id: 5, time: '3 hours ago', operator: 'airtel',   alert: 'Power Failure',    location: 'Kolkata',    status: 'new',           statusLabel: 'New' },
    { id: 6, time: '4 hours ago', operator: 'jio',      alert: 'High Packet Loss', location: 'Hyderabad',  status: 'acknowledged',  statusLabel: 'Acknowledged' },
    { id: 7, time: '5 hours ago', operator: 'bsnl',     alert: 'Site Down',        location: 'Ahmedabad',  status: 'resolved',      statusLabel: 'Resolved' },
    { id: 8, time: '6 hours ago', operator: 'vodafone', alert: 'High Latency',     location: 'Pune',       status: 'in-progress',   statusLabel: 'In Progress' },
  ],

  alertSummary: { critical: 58, major: 119, minor: 70, total: 247 },

  /* ---- Network Map Sites (grouped by City) ---- */
  mapSites: [
    // --- Tamil Nadu ---
    { lat: 13.083, lng: 80.270, city: 'Chennai' },
    { lat: 11.016, lng: 76.955, city: 'Coimbatore' },
    { lat: 9.925, lng: 78.119, city: 'Madurai' },
    { lat: 10.790, lng: 78.704, city: 'Tiruchirappalli' },
    { lat: 11.667, lng: 78.150, city: 'Salem' },
    { lat: 8.713, lng: 77.756, city: 'Tirunelveli' },
    { lat: 11.341, lng: 77.717, city: 'Erode' },
    { lat: 12.916, lng: 79.132, city: 'Vellore' },
    { lat: 8.764, lng: 78.134, city: 'Thoothukudi' },
    { lat: 11.108, lng: 77.341, city: 'Tiruppur' },
    
    // --- Karnataka ---
    { lat: 12.972, lng: 77.594, city: 'Bangalore' },
    { lat: 12.295, lng: 76.639, city: 'Mysuru' },
    { lat: 15.364, lng: 75.124, city: 'Hubli' },
    { lat: 12.914, lng: 74.856, city: 'Mangaluru' },
    { lat: 15.849, lng: 74.497, city: 'Belgaum' },
    
    // --- Kerala ---
    { lat: 9.931, lng: 76.267, city: 'Kochi' },
    { lat: 8.524, lng: 76.936, city: 'Thiruvananthapuram' },
    { lat: 11.258, lng: 75.780, city: 'Kozhikode' },
    { lat: 10.527, lng: 76.214, city: 'Thrissur' },
    { lat: 8.893, lng: 76.614, city: 'Kollam' },

    // --- Andhra Pradesh & Telangana ---
    { lat: 17.385, lng: 78.487, city: 'Hyderabad' },
    { lat: 17.686, lng: 83.218, city: 'Visakhapatnam' },
    { lat: 16.506, lng: 80.648, city: 'Vijayawada' },
    { lat: 15.828, lng: 78.037, city: 'Kurnool' },
    { lat: 17.968, lng: 79.586, city: 'Warangal' },
    { lat: 13.628, lng: 79.419, city: 'Tirupati' },

    // --- Maharashtra ---
    { lat: 19.076, lng: 72.877, city: 'Mumbai' },
    { lat: 18.520, lng: 73.856, city: 'Pune' },
    { lat: 21.146, lng: 79.088, city: 'Nagpur' },
    { lat: 19.997, lng: 73.789, city: 'Nashik' },
    { lat: 19.876, lng: 75.343, city: 'Aurangabad' },
    { lat: 16.705, lng: 74.243, city: 'Kolhapur' },

    // --- Gujarat ---
    { lat: 23.022, lng: 72.571, city: 'Ahmedabad' },
    { lat: 21.170, lng: 72.831, city: 'Surat' },
    { lat: 22.307, lng: 73.181, city: 'Vadodara' },
    { lat: 22.303, lng: 70.802, city: 'Rajkot' },
    { lat: 23.215, lng: 72.636, city: 'Gandhinagar' },

    // --- North India ---
    { lat: 28.704, lng: 77.102, city: 'Delhi' },
    { lat: 26.846, lng: 80.946, city: 'Lucknow' },
    { lat: 26.449, lng: 80.331, city: 'Kanpur' },
    { lat: 27.176, lng: 78.008, city: 'Agra' },
    { lat: 25.317, lng: 82.973, city: 'Varanasi' },
    { lat: 30.733, lng: 76.779, city: 'Chandigarh' },
    { lat: 31.326, lng: 75.576, city: 'Jalandhar' },
    { lat: 31.634, lng: 74.872, city: 'Amritsar' },
    { lat: 30.901, lng: 75.857, city: 'Ludhiana' },
    { lat: 34.083, lng: 74.797, city: 'Srinagar' },
    { lat: 32.726, lng: 74.857, city: 'Jammu' },
    { lat: 30.316, lng: 78.032, city: 'Dehradun' },
    { lat: 31.104, lng: 77.173, city: 'Shimla' },

    // --- East India ---
    { lat: 22.572, lng: 88.363, city: 'Kolkata' },
    { lat: 20.296, lng: 85.824, city: 'Bhubaneswar' },
    { lat: 25.594, lng: 85.137, city: 'Patna' },
    { lat: 23.344, lng: 85.309, city: 'Ranchi' },
    { lat: 22.804, lng: 86.202, city: 'Jamshedpur' },
    { lat: 26.144, lng: 91.736, city: 'Guwahati' },
    { lat: 27.331, lng: 88.613, city: 'Gangtok' },
    { lat: 23.831, lng: 91.278, city: 'Agartala' },
    { lat: 24.817, lng: 93.936, city: 'Imphal' },
    { lat: 25.578, lng: 91.893, city: 'Shillong' },
    { lat: 26.158, lng: 94.562, city: 'Kohima' },
    { lat: 23.727, lng: 92.717, city: 'Aizawl' },
    { lat: 27.084, lng: 93.605, city: 'Itanagar' },

    // --- Central & West ---
    { lat: 26.912, lng: 75.787, city: 'Jaipur' },
    { lat: 26.238, lng: 73.024, city: 'Jodhpur' },
    { lat: 24.585, lng: 73.712, city: 'Udaipur' },
    { lat: 23.259, lng: 77.412, city: 'Bhopal' },
    { lat: 22.719, lng: 75.857, city: 'Indore' },
    { lat: 21.251, lng: 81.629, city: 'Raipur' },
    { lat: 15.490, lng: 73.827, city: 'Panaji' },

    // --- UTs & Others ---
    { lat: 11.941, lng: 79.808, city: 'Puducherry' },
    { lat: 11.623, lng: 92.726, city: 'Port Blair' },
    { lat: 10.566, lng: 72.641, city: 'Kavaratti' },
    { lat: 34.152, lng: 77.577, city: 'Leh' },

    // --- Additional TN & South ---
    { lat: 10.367, lng: 77.980, city: 'Dindigul' },
    { lat: 10.787, lng: 79.137, city: 'Thanjavur' },
    { lat: 10.960, lng: 78.076, city: 'Karur' },
    { lat: 11.410, lng: 76.699, city: 'Ooty' },
    { lat: 12.834, lng: 79.703, city: 'Kanchipuram' },
    { lat: 10.961, lng: 79.388, city: 'Kumbakonam' },
    { lat: 11.127, lng: 78.627, city: 'Namakkal' },
    { lat: 12.522, lng: 78.213, city: 'Krishnagiri' },
    { lat: 10.138, lng: 77.478, city: 'Theni' },
    { lat: 9.453, lng: 77.802, city: 'Sivakasi' },
    { lat: 11.748, lng: 79.771, city: 'Cuddalore' },
    { lat: 9.200, lng: 79.312, city: 'Rameswaram' },
    { lat: 12.740, lng: 77.825, city: 'Hosur' },
    { lat: 8.483, lng: 76.916, city: 'Neyyattinkara' },
    { lat: 11.874, lng: 75.370, city: 'Kannur' },
    { lat: 9.591, lng: 76.522, city: 'Kottayam' },
    { lat: 12.455, lng: 75.000, city: 'Kasaragod' },
    { lat: 15.317, lng: 75.713, city: 'Gadag' },
    { lat: 13.340, lng: 74.742, city: 'Udupi' },

    // --- Additional North & East ---
    { lat: 26.218, lng: 78.182, city: 'Gwalior' },
    { lat: 23.181, lng: 79.986, city: 'Jabalpur' },
    { lat: 26.760, lng: 83.373, city: 'Gorakhpur' },
    { lat: 28.210, lng: 79.412, city: 'Bareilly' },
    { lat: 28.984, lng: 77.706, city: 'Meerut' },
    { lat: 29.945, lng: 78.164, city: 'Haridwar' },
    { lat: 32.243, lng: 77.189, city: 'Manali' },
    { lat: 24.808, lng: 92.750, city: 'Silchar' },
    { lat: 27.472, lng: 94.912, city: 'Dibrugarh' },
    { lat: 22.057, lng: 82.155, city: 'Bilaspur' },
    { lat: 21.170, lng: 72.831, city: 'Surat' },
    { lat: 18.012, lng: 79.589, city: 'Hanamkonda' },
    { lat: 15.139, lng: 76.921, city: 'Ballari' },
    { lat: 14.442, lng: 79.986, city: 'Nellore' },
    { lat: 16.989, lng: 82.247, city: 'Kakinada' },

    // --- Hyper-local Expansion ---
    { lat: 10.066, lng: 78.783, city: 'Karaikudi' },
    { lat: 10.662, lng: 77.006, city: 'Pollachi' },
    { lat: 10.765, lng: 79.842, city: 'Nagapattinam' },
    { lat: 12.227, lng: 79.070, city: 'Tiruvannamalai' },
    { lat: 12.121, lng: 78.158, city: 'Dharmapuri' },
    { lat: 10.379, lng: 78.820, city: 'Pudukkottai' },
    { lat: 11.138, lng: 79.074, city: 'Ariyalur' },
    { lat: 11.233, lng: 78.868, city: 'Perambalur' },
    { lat: 9.850, lng: 78.483, city: 'Sivagangai' },
    { lat: 9.363, lng: 78.839, city: 'Ramanathapuram' },
    { lat: 9.587, lng: 77.951, city: 'Virudhunagar' },
    { lat: 8.959, lng: 77.315, city: 'Tenkasi' },
    { lat: 8.088, lng: 77.538, city: 'Kanyakumari' },
    { lat: 11.583, lng: 76.483, city: 'Gudalur' },
    { lat: 11.605, lng: 76.082, city: 'Kalpetta' },
    { lat: 9.851, lng: 76.971, city: 'Painavu' },
    { lat: 9.264, lng: 76.787, city: 'Pathanamthitta' },
    { lat: 9.498, lng: 76.338, city: 'Alappuzha' },
    { lat: 11.072, lng: 76.074, city: 'Malappuram' },
    { lat: 13.929, lng: 75.568, city: 'Shimoga' },
    { lat: 14.464, lng: 75.921, city: 'Davanagere' },
    { lat: 16.830, lng: 75.710, city: 'Vijayapura' },
    { lat: 17.329, lng: 76.834, city: 'Kalaburagi' },
    { lat: 17.910, lng: 77.519, city: 'Bidar' },
    { lat: 16.212, lng: 77.341, city: 'Raichur' },
    { lat: 15.342, lng: 76.155, city: 'Koppal' },
    { lat: 14.796, lng: 75.399, city: 'Haveri' },
    { lat: 11.926, lng: 76.941, city: 'Chamarajanagar' },
    { lat: 13.316, lng: 75.772, city: 'Chikmagalur' },
    { lat: 13.006, lng: 76.102, city: 'Hassan' },
    { lat: 12.522, lng: 76.895, city: 'Mandya' },
    { lat: 12.723, lng: 77.275, city: 'Ramanagara' },
    { lat: 13.339, lng: 77.113, city: 'Tumakuru' },
    { lat: 13.435, lng: 77.728, city: 'Chikkaballapur' },
    { lat: 13.136, lng: 78.129, city: 'Kolar' },
    { lat: 26.115, lng: 85.390, city: 'Muzaffarpur' },
    { lat: 24.791, lng: 85.000, city: 'Gaya' },
    { lat: 25.242, lng: 87.014, city: 'Bhagalpur' },
    { lat: 26.152, lng: 85.897, city: 'Darbhanga' },
    { lat: 25.779, lng: 87.475, city: 'Purnia' },
    { lat: 25.560, lng: 84.667, city: 'Arrah' },
    { lat: 25.416, lng: 86.128, city: 'Begusarai' },
    { lat: 25.374, lng: 86.473, city: 'Munger' },
    { lat: 25.545, lng: 87.572, city: 'Katihar' },
    { lat: 25.883, lng: 86.600, city: 'Saharsa' },
    { lat: 25.722, lng: 85.213, city: 'Hajipur' },
    { lat: 24.020, lng: 84.070, city: 'Daltonganj' },
    { lat: 23.669, lng: 86.151, city: 'Bokaro' },
    { lat: 23.795, lng: 86.430, city: 'Dhanbad' },

    // --- Northern & Central Density (UP, MP, Rajasthan, etc.) ---
    { lat: 27.204, lng: 77.497, city: 'Bharatpur' },
    { lat: 28.148, lng: 77.332, city: 'Palwal' },
    { lat: 29.059, lng: 76.085, city: 'Bhiwani' },
    { lat: 29.969, lng: 76.816, city: 'Kurukshetra' },
    { lat: 30.129, lng: 77.267, city: 'Yamunanagar' },
    { lat: 30.375, lng: 76.782, city: 'Ambala' },
    { lat: 30.118, lng: 74.298, city: 'Abohar' },
    { lat: 30.211, lng: 74.945, city: 'Bathinda' },
    { lat: 30.523, lng: 75.895, city: 'Khanna' },
    { lat: 31.972, lng: 75.867, city: 'Hoshiarpur' },
    { lat: 32.268, lng: 75.643, city: 'Pathankot' },
    { lat: 31.644, lng: 76.273, city: 'Una' },
    { lat: 31.708, lng: 76.527, city: 'Hamirpur' },
    { lat: 32.223, lng: 76.323, city: 'Dharamshala' },
    { lat: 29.854, lng: 77.888, city: 'Roorkee' },
    { lat: 29.472, lng: 77.708, city: 'Muzaffarnagar' },
    { lat: 28.628, lng: 79.810, city: 'Pilibhit' },
    { lat: 27.915, lng: 78.074, city: 'Aligarh' },
    { lat: 27.492, lng: 77.673, city: 'Mathura' },
    { lat: 27.151, lng: 77.939, city: 'Firozabad' },
    { lat: 26.608, lng: 77.287, city: 'Etawah' },
    { lat: 26.471, lng: 79.195, city: 'Orai' },
    { lat: 25.448, lng: 78.569, city: 'Jhansi' },
    { lat: 24.846, lng: 79.587, city: 'Chhatarpur' },
    { lat: 24.576, lng: 80.832, city: 'Satna' },
    { lat: 24.536, lng: 81.303, city: 'Rewa' },
    { lat: 23.512, lng: 80.395, city: 'Katni' },
    { lat: 22.967, lng: 76.050, city: 'Dewas' },
    { lat: 23.176, lng: 75.788, city: 'Ujjain' },
    { lat: 23.521, lng: 74.856, city: 'Ratlam' },
    { lat: 24.192, lng: 78.182, city: 'Bina' },
    { lat: 24.471, lng: 77.295, city: 'Guna' },
    { lat: 25.438, lng: 81.846, city: 'Prayagraj' },
    { lat: 25.746, lng: 82.684, city: 'Jaunpur' },
    { lat: 26.113, lng: 82.146, city: 'Sultanpur' },
    { lat: 26.785, lng: 82.199, city: 'Ayodhya' },
    { lat: 27.359, lng: 82.131, city: 'Balrampur' },
    { lat: 26.751, lng: 81.111, city: 'Barabanki' },
    { lat: 27.133, lng: 80.895, city: 'Sitapur' },
    { lat: 27.945, lng: 80.623, city: 'Lakhimpur' },
    { lat: 27.375, lng: 80.126, city: 'Hardoi' },
    { lat: 27.013, lng: 79.913, city: 'Kannauj' },
    { lat: 26.376, lng: 84.442, city: 'Siwan' },
    { lat: 25.856, lng: 84.727, city: 'Chapra' },
    { lat: 25.136, lng: 85.513, city: 'Bihar Sharif' },
    { lat: 24.923, lng: 84.015, city: 'Sasaram' },
    { lat: 24.795, lng: 83.267, city: 'Robertsganj' },
    { lat: 24.195, lng: 82.667, city: 'Singrauli' },
    { lat: 23.232, lng: 82.427, city: 'Baikunthpur' },
    { lat: 22.076, lng: 82.140, city: 'Bilaspur' },
    { lat: 21.916, lng: 82.783, city: 'Janjgir' },
    { lat: 21.897, lng: 83.388, city: 'Raigarh' },
    { lat: 21.191, lng: 81.282, city: 'Durg' },
    { lat: 20.354, lng: 82.483, city: 'Mahasamund' },
  ].map(city => {
    // Generate all 4 network statuses for this city
    return {
      ...city,
      networks: [
        { id: 'airtel',   name: 'Airtel',   tech: '5G', status: Math.random() > 0.15 ? 'normal' : 'warning' },
        { id: 'jio',      name: 'Jio',      tech: '5G', status: Math.random() > 0.1 ? 'normal' : 'warning' },
        { id: 'vodafone', name: 'Vodafone', tech: '4G', status: Math.random() > 0.2 ? 'normal' : 'critical' },
        { id: 'bsnl',     name: 'BSNL',     tech: '3G', status: 'normal' },
      ]
    };
  }),

  /* ---- Settings defaults ---- */
  settings: {
    refreshInterval: '5 Minutes',
    emailNotifications: true,
    smsNotifications: false,
    autoReports: true,
    timezone: 'Asia/Kolkata (UTC+05:30)',
    thresholds: {
      packetLoss: 5,
      latency: 50,
      siteDown: 5,
      lowBattery: 20,
    },
  },

  /* ---- Users ---- */
  users: [
    { email: 'admin@telecom.com',    role: 'Administrator', lastLogin: 'May 28, 2024 10:30 AM', status: 'active' },
    { email: 'manager@telecom.com',  role: 'Manager',       lastLogin: 'May 26, 2024 08:15 AM', status: 'active' },
    { email: 'operator@telecom.com', role: 'Operator',      lastLogin: 'May 25, 2024 04:45 PM', status: 'active' },
    { email: 'viewer@telecom.com',   role: 'Viewer',        lastLogin: 'May 24, 2024 11:20 AM', status: 'inactive' },
  ],

  /* ---- Reports list ---- */
  reports: [
    { id: 'net-perf',   title: 'Network Performance', desc: 'Daily, weekly, monthly performance metrics',   formats: ['PDF', 'Excel'], icon: 'fa-chart-line' },
    { id: 'op-comp',    title: 'Operator Comparison',  desc: 'Compare performance across all operators',    formats: ['PDF', 'Excel'], icon: 'fa-scale-balanced' },
    { id: 'coverage',   title: 'Coverage Analysis',    desc: 'Coverage maps and signal strength analysis',  formats: ['PDF', 'Excel'], icon: 'fa-map' },
    { id: 'qos',        title: 'QoS Report',           desc: 'Quality of Service metrics deep-dive',        formats: ['PDF'],          icon: 'fa-gauge' },
    { id: 'alert-sum',  title: 'Alert Summary',        desc: 'Alerts and incidents summary',                formats: ['PDF', 'Excel'], icon: 'fa-bell' },
    { id: 'exec-sum',   title: 'Executive Summary',    desc: 'High-level dashboard for leadership',         formats: ['PDF', 'Excel'], icon: 'fa-briefcase' },
  ],

  /* ---- Helper: get operator by id ---- */
  getOperator(id) {
    return this.operators.find(o => o.id === id) || null;
  },

  /* ---- Simulation Logic ---- */
  simulateFluctuations() {
    // 1. Update Operators
    this.operators.forEach(op => {
      // Fluctuate availability slightly (98% - 100%)
      const avChange = (Math.random() - 0.5) * 0.1;
      op.availability = Math.min(100, Math.max(98, +(op.availability + avChange).toFixed(2)));
      
      // Fluctuate speed slightly (+/- 5%)
      const speedChange = op.avgSpeed * (Math.random() - 0.5) * 0.05;
      op.avgSpeed = +(op.avgSpeed + speedChange).toFixed(1);
      op.downloadSpeed = op.avgSpeed;
      
      // Fluctuate call quality (3.0 - 5.0)
      const cqChange = (Math.random() - 0.5) * 0.1;
      op.callQuality = Math.min(5, Math.max(3, +(op.callQuality + cqChange).toFixed(1)));

      // Fluctuate active sites
      const siteChange = Math.floor((Math.random() - 0.5) * 10);
      op.activeSites += siteChange;
    });

    // 2. Update KPIs
    const k = this.kpis;
    k.totalSites += Math.floor((Math.random() - 0.4) * 20); // Mostly growing
    
    const avgAv = this.operators.reduce((sum, op) => sum + op.availability, 0) / this.operators.length;
    k.avgAvailability = +avgAv.toFixed(2);

    const avgCQ = this.operators.reduce((sum, op) => sum + op.callQuality, 0) / this.operators.length;
    k.callQuality = +avgCQ.toFixed(1);
    
    // Fluctuate traffic (25-35 TB range)
    const currentTraffic = parseFloat(k.trafficVolume);
    const trafficChange = (Math.random() - 0.5) * 0.5;
    k.trafficVolume = (currentTraffic + trafficChange).toFixed(1) + ' TB';
    
    // Fluctuate active alerts
    k.activeAlerts += Math.floor((Math.random() - 0.5) * 5);
    if (k.activeAlerts < 100) k.activeAlerts = 100;

    // Randomly update alert statuses in simulation
    if (Math.random() > 0.7 && this.alerts.length > 0) {
      const randomAlert = this.alerts[Math.floor(Math.random() * this.alerts.length)];
      if (randomAlert.status === 'new') {
        randomAlert.status = 'acknowledged';
        randomAlert.statusLabel = 'Acknowledged';
      } else if (randomAlert.status === 'acknowledged') {
        randomAlert.status = 'resolved';
        randomAlert.statusLabel = 'Resolved';
      }
    }
  }
};
