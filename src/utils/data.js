export const hospitals = [
  {
    id: 1,
    name: "Princess Marina Hospital",
    district: "Gaborone",
    phone: "+267 355 2111",
    latitude: -24.6387,
    longitude: 25.9084,
    address: "Notwane Rd, Gaborone",
    type: "Public Hospital"
  },
  {
    id: 2,
    name: "Gaborone Private Hospital",
    district: "Gaborone",
    phone: "+267 395 2111",
    latitude: -24.6546,
    longitude: 25.9205,
    address: "Mokgadi Close, Gaborone",
    type: "Private Hospital"
  },
  {
    id: 3,
    name: "Nyangabgwe Hospital",
    district: "Francistown",
    phone: "+267 241 0000",
    latitude: -21.1702,
    longitude: 27.5078,
    address: "Francistown",
    type: "Public Hospital"
  },
  {
    id: 4,
    name: "Sbrana Psychiatric Hospital",
    district: "Lobatse",
    phone: "+267 533 0321",
    latitude: -25.2247,
    longitude: 25.6777,
    address: "Lobatse",
    type: "Specialized Hospital"
  },
  {
    id: 5,
    name: "Mahalapye Hospital",
    district: "Mahalapye",
    phone: "+267 471 0000",
    latitude: -23.1051,
    longitude: 26.8141,
    address: "Mahalapye",
    type: "Public Hospital"
  },
  {
    id: 6,
    name: "Bamalete Lutheran Hospital",
    district: "Ramotswa",
    phone: "+267 538 0301",
    latitude: -24.8711,
    longitude: 25.8694,
    address: "Ramotswa",
    type: "Mission Hospital"
  },
  {
    id: 7,
    name: "Auckland Medical Centre",
    district: "Gaborone",
    phone: "+267 390 4999",
    latitude: -24.6578,
    longitude: 25.9234,
    address: "The Square Mall, Gaborone",
    type: "Private Clinic"
  },
  {
    id: 8,
    name: "Molepolole Primary Hospital",
    district: "Kweneng",
    phone: "+267 592 0000",
    latitude: -24.4063,
    longitude: 25.4950,
    address: "Molepolole",
    type: "Public Hospital"
  },
  {
    id: 9,
    name: "Maun General Hospital",
    district: "Ngamiland",
    phone: "+267 686 0000",
    latitude: -19.9953,
    longitude: 23.4181,
    address: "Maun",
    type: "Public Hospital"
  },
  {
    id: 10,
    name: "Scottish Livingstone Hospital",
    district: "Molepolole",
    phone: "+267 592 0000",
    latitude: -24.3969,
    longitude: 25.4958,
    address: "Molepolole",
    type: "Public Hospital"
  },
  {
    id: 11,
    name: "Sekgoma Memorial Hospital",
    district: "Serowe",
    phone: "+267 463 0000",
    latitude: -22.3875,
    longitude: 26.7108,
    address: "Serowe",
    type: "Public Hospital"
  },
  {
    id: 12,
    name: "Palapye Primary Hospital",
    district: "Palapye",
    phone: "+267 492 0000",
    latitude: -22.5461,
    longitude: 27.1253,
    address: "Palapye",
    type: "Public Hospital"
  },
  {
    id: 13,
    name: "Deborah Retief Memorial Hospital",
    district: "Mochudi",
    phone: "+267 577 0000",
    latitude: -24.3775,
    longitude: 26.1508,
    address: "Mochudi",
    type: "Mission Hospital"
  }
  // Add more hospitals with coordinates as needed
];
// Announcements
export const announcements = [
  { id: 1, title: "National Health Week", summary: "Free screening across districts from 1-7 Nov." },
  { id: 2, title: "Immunisation Drive", summary: "Child immunisation schedule updates." },
  
];

// Quick Stats
export const quickStats = [
  { number: "28", label: "Public Hospitals" },
  { number: "347", label: "Health Clinics" },
  { number: "2.3M+", label: "Citizens Served" },
  { number: "24/7", label: "Emergency Coverage" }
];

// Minister's Message
export const ministersMessage = {
  name: "Hon. Dr. Edwin Dikoloti",
  title: "Minister of Health",
  message: "The Ministry of Health remains committed to ensuring accessible, quality healthcare for all Batswana. Our vision is to build a healthy and productive nation through excellence in healthcare delivery.",
  image: "/images/minister.jpg" // Optional: add image path
};

// Ministry Structure
export const ministryStructure = [
  {
    department: "Health Policy Research and Development",
    function: "Strategic direction, policy development, and stakeholder collaboration"
  },
  {
    department: "Health Services Monitoring & Evaluation", 
    function: "Quality assurance, performance monitoring, and impact analysis"
  },
  {
    department: "Health Services Management",
    function: "Clinical services, community health, and integrated care coordination"
  },
  {
    department: "District Health Management Teams",
    function: "27 District Health Management Teams nationwide"
  }
];

// Health Facility Hours
export const healthFacilityHours = [
  { type: "Referral Hospitals", hours: "24 hours" },
  { type: "District Hospitals", hours: "24 hours" },
  { type: "Primary Hospitals", hours: "24 hours" },
  { type: "Clinics & Health Posts", hours: "7:30 - 16:30 (On call after hours)" }
];

// Health Services Data
export const healthServices = [
  {
    id: 'private-health-registration',
    category: 'Professional Services',
    icon: '📋',
    title: 'Registration of Private Health Professionals',
    overview: 'This service makes provision for the licensing of private health practitioners in Botswana.',
    eligibility: 'Health professionals.',
    process: 'Visit the Ministry of Health and Wellness Headquarters, floor 9 office 9A10.',
    documents: [
      'Registration certificates from Botswana Health Professions Council',
      'Passport for non-citizens',
      'National identity card (Omang)'
    ],
    duration: 'Immediate',
    cost: 'No cost to obtain this service',
    locations: [
      'Ministry of Health and Wellness Headquarters',
      'Department of Health Services',
      'Private Practice Licensing Office - Office 9A10'
    ],
    contact: {
      phone: '3632505',
      location: 'Office 9A10, Ministry of Health Headquarters'
    }
  },
  {
    id: 'arv-program',
    category: 'HIV/AIDS Services',
    icon: '💊',
    title: 'National ARV Program',
    overview: 'Provision of free Antiretroviral (ARV) treatment to all people who are HIV positive.',
    eligibility: 'Every person (adults & children) who tests HIV positive in Botswana is eligible to start ARV treatment including non-citizens residing in Botswana.',
    process: 'Visit your nearest public health facility across the country: (Hospitals, Clinics and Health Posts) or private health facility, some of Tebelopele offices and Botswana Family Welfare Association (BOFWA) sites.',
    documents: [
      'National Identity Card (Omang)',
      'Passport for Non-citizens',
      'HIV positive test result paper'
    ],
    duration: 'Immediate, i.e. either on the same day or within seven days',
    cost: 'BWP5.00 consultation fee for citizens. P30 for non-citizens. Apart from the fees required for all medical consultations, there is no additional cost for ARV treatment.',
    locations: ['All health facilities'],
    contact: {
      phone: 'ARV program at Ministry of Health and Wellness',
      location: 'All health facilities'
    }
  },
  {
    id: 'safe-male-circumcision',
    category: 'HIV Prevention',
    icon: '⚕️',
    title: 'Safe Male Circumcision (SMC)',
    overview: 'Male circumcision is the surgical removal of the foreskin covering the head of the penis to permanently expose the glands. Safe Male Circumcision is one of the Human Immunodeficiency Viruses (HIV) prevention strategies.',
    eligibility: 'HIV negative men aged 0-49 years.',
    process: 'Visit designated health facilities. Mobile clinics in hard to reach areas.',
    documents: [
      'Birth certificate for minors',
      'Valid National Identity card (Omang)',
      'Valid Passport for non-citizens'
    ],
    duration: 'Immediate',
    cost: 'No cost',
    locations: ['Designated health facilities'],
    contact: {
      phone: '3632235',
      location: 'All Health facilities in the country'
    }
  },
  {
    id: 'hiv-testing',
    category: 'HIV/AIDS Services',
    icon: '🩺',
    title: 'National HIV Testing Services',
    overview: 'Provides HIV/AIDS and STI Counselling and Testing Services. Provides Behaviour Change Interventions and Communications (BCIC) on HIV/AIDS.',
    eligibility: 'Citizens and non-citizens of all ages.',
    process: 'Visit nearest health facilities- both public and private; as well as designated civil society organizations for HIV testing services.',
    documents: [
      'Birth certificate',
      'National Identity card (Omang) for citizens',
      'Passport for non-citizens'
    ],
    duration: 'Same day test results. Fourteen (14) working days for infants less than eighteen (18) months.',
    cost: 'Free',
    locations: ['All health facilities - both public and private'],
    contact: {
      phone: '3632313',
      location: 'Department of Health Services, HTS office 2C6'
    }
  },
  {
    id: 'yellow-fever-vaccination',
    category: 'Vaccination Services',
    icon: '💉',
    title: 'Yellow Fever Vaccination',
    overview: 'Botswana and other countries require the International Certificate of Vaccination as proof of vaccination against yellow fever before entry, particularly travelers from or those who have visited yellow fever endemic areas.',
    eligibility: 'Citizens and non-citizens.',
    process: 'Visit nearest Health facility that offer the Yellow fever vaccine.',
    documents: [
      'Valid National Identity card (Omang)',
      'Passport for non-citizens'
    ],
    duration: 'Immediate',
    cost: 'No cost for citizens. BWP 40.00 for non-citizens.',
    locations: [
      'Kgatelopele Clinic, Block 8, Gaborone - Thursdays 10:00-16:30',
      'Nkaikela Clinic, Tlokweng - Wednesdays 10:00-16:30',
      'Tlokweng Clinic, Tlokweng - Wednesdays 10:00-16:30',
      'Village Clinic, Extension 15, Gaborone - Mondays & Wednesdays 14:00-16:30',
      'Nkoyayaphiri Clinic, Mogoditshane - Tuesdays 10:00-12:00',
      'Mogoditshane Clinic, Mogoditshane - Tuesdays 10:00-12:00',
      'Botshwelelo Clinic, Francistown - Wednesdays 07:30-16:30',
      'Airstrip Clinic, Mahalapye - Fridays 07:30-16:30',
      'Letsholathebe II Memorial Hospital, Maun - Thursdays 11:00-16:30',
      'Kasane Health Post, Kasane - Wednesdays 07:30-12:45'
    ],
    contact: {
      phone: '3632448/3632882',
      location: 'Port Health Unit, Office GC 13/17'
    }
  },
  {
    id: 'blood-transfusion',
    category: 'Medical Services',
    icon: '🩸',
    title: 'Blood Transfusion',
    overview: 'Blood Transfusion Services (BTS) is a national programme that aims to support the recruitment and retention of blood donors. The donated blood is used to save lives.',
    eligibility: 'Healthy individuals aged between 16 and 65 years, weighing more than 50 kilograms.',
    process: 'Visit one of the donation centres and go through the screening process (hemoglobin, blood pressure & weight) and counselling.',
    documents: [
      'National identity card (Omang)',
      'Passport for non-citizens'
    ],
    duration: 'Immediate',
    cost: 'No cost',
    locations: [
      'Blood Donation Centre Francistown - Barclay Plaza',
      'Gaborone National Blood Transfusion Centre - Old Government Gazette Building, Main Mall',
      'Scottish Livingstone Hospital, Molepolole',
      'Mahalapye District Hospital, Mahalapye',
      'Sekgoma Memorial Hospital, Serowe',
      'Letsholathebe Memorial Hospital, Maun'
    ],
    contact: {
      phone: '3686700/3904482',
      email: 'bloodservices@gov.bw',
      website: 'www.moh.gov.bw',
      hours: '07:30 to 16:30, Monday – Friday'
    }
  },
  {
    id: 'immunization-letter',
    category: 'Child Health',
    icon: '📄',
    title: 'Immunization Letter',
    overview: 'The service is for the verification of the immunization status of citizens in Botswana by utilising the "Botswana Immunisation Schedule".',
    eligibility: 'Citizens and residents',
    process: 'Submit all supporting documents in person or via email. All email submissions require "certified copies" of the supporting documents.',
    documents: [
      'Applicable identity',
      'Child Welfare Card (CWC) or under five card or an affidavit in the absence of the card'
    ],
    duration: 'One (1) working day',
    cost: 'Free',
    locations: [
      'Ministry of Health and Wellness Headquarters - Floor 5, Office 5A17 or 5A18'
    ],
    contact: {
      phone: '3632193/3632878/3632879/3632199',
      location: 'Child Health Division – Expanded Program in Immunization',
      hours: '07:30 - 12:45 and 13:45 - 16:30, Monday to Friday'
    }
  },
  {
    id: 'corpse-conveyance',
    category: 'Administrative Services',
    icon: '⚰️',
    title: 'Conveyance of Corpse',
    overview: 'The service is for the facilitation of the release of a corpse from a health facility to next of kin/family.',
    eligibility: 'Next of kin/family members.',
    process: 'Visit Ministry of Health and Wellness Headquarters - Floor 9, Office 9A18',
    documents: [
      'Three certified copies of death certificate',
      'Three copies of non-infectious letter from the hospital',
      'Three certified copies of passport of deceased',
      'Three certified copies of passport of the accompanying person'
    ],
    duration: 'Immediate',
    cost: 'No cost',
    locations: [
      'Ministry of Health and Wellness Headquarters in Gaborone'
    ],
    contact: {
      phone: '3632424/3632027',
      location: 'Department of Health Services, Floor 9, Office 9A18',
      hours: '07:30 to 16:30, Monday to Friday'
    }
  },
  {
    id: 'oral-health',
    category: 'Dental Services',
    icon: '🦷',
    title: 'Oral Health Services',
    overview: 'The provision of Oral Health Services to the nation according to client\'s requirement. Includes Oral Examination, treatment, and Oral Health Education.',
    eligibility: 'Citizen and non-citizens.',
    process: 'Visit any health facility.',
    documents: [
      'Hospital card',
      'National Identity card (Omang) for citizens',
      'Passport for non-citizens'
    ],
    duration: 'Dependent on the procedure',
    cost: 'BWP 5.00 for citizens. BWP50.00 for non-citizens if attended by Oral Health Personnel and P80.00 if seen by a Specialist.',
    locations: ['Any health facility'],
    contact: {
      phone: '3632109',
      location: 'Oral Health Unit, Health Promotion and Education Division'
    }
  },
  {
    id: 'ambulance-services',
    category: 'Emergency Services',
    icon: '🚑',
    title: 'Emergency Medical Services (Ambulance Services)',
    overview: 'This service includes the treatment and transportation of "emergency" patients who are acutely ill or who have sustained injuries.',
    eligibility: 'Citizens and non-citizens residing in Gaborone, Mochudi, Lobatse, Mahalapye, Palapye, Phikwe, Francistown, Maun and Kasane.',
    process: 'Dial 997 and provide location, incident details, number of patients, and call back number.',
    documents: [
      'A valid National Identity card (Omang)',
      'Passport for non-citizens'
    ],
    duration: 'A minimum of 10 minutes',
    cost: 'No cost',
    locations: [
      'Gaborone, Mochudi, Lobatse, Mahalapye, Palapye, Phikwe, Francistown, Maun and Kasane'
    ],
    contact: {
      phone: '997',
      hours: '24 hours, Monday to Sunday including public holidays'
    }
  }
];

// Service Categories for filtering
export const serviceCategories = [
  { id: 'all', name: 'All Services', icon: '🏥' },
  { id: 'hiv-aids', name: 'HIV/AIDS Services', icon: '💊' },
  { id: 'emergency', name: 'Emergency Services', icon: '🚑' },
  { id: 'professional', name: 'Professional Services', icon: '📋' },
  { id: 'vaccination', name: 'Vaccination Services', icon: '💉' },
  { id: 'dental', name: 'Dental Services', icon: '🦷' },
  { id: 'child-health', name: 'Child Health', icon: '👶' },
  { id: 'medical', name: 'Medical Services', icon: '🩺' }
];

// Districts of Botswana for filtering
export const districts = [
  "All Districts",
  "Gaborone",
  "Francistown",
  "Lobatse",
  "Selibe Phikwe",
  "Jwaneng",
  "Sowa Town",
  "Southern",
  "South East",
  "Kweneng",
  "Kgatleng",
  "Central",
  "North East",
  "Ngamiland",
  "Chobe",
  "Ghanzi",
  "Kgalagadi"
];

// Facility Types
export const facilityTypes = [
  "All Types",
  "Public Hospital",
  "Private Hospital",
  "Clinic",
  "Health Post",
  "Specialized Hospital",
  "Mission Hospital"
];