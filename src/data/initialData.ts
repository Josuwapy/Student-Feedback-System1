import { Course, EvaluationCriteria, FeedbackSubmission, CampusDepartment } from '../types';

export const EVALUATION_CRITERIA: EvaluationCriteria[] = [
  {
    id: 'teaching_quality',
    label: 'Teaching Quality & Engagement',
    shortLabel: 'Teaching',
    description: 'Effectiveness of lectures, clarity of technical concepts, and classroom engagement.',
    iconName: 'GraduationCap'
  },
  {
    id: 'course_content',
    label: 'Course Content & Lab Modules',
    shortLabel: 'Curriculum',
    description: 'Relevance, hands-on programming/skills exercises, and syllabus clarity.',
    iconName: 'BookOpen'
  },
  {
    id: 'workload_pace',
    label: 'Pacing & Project Deadlines',
    shortLabel: 'Pacing',
    description: 'Lecture pacing and manageable submission schedules for capstone and projects.',
    iconName: 'Clock'
  },
  {
    id: 'fairness_assessment',
    label: 'Fairness of Assessments & Rubrics',
    shortLabel: 'Grading',
    description: 'Clear grading criteria, objective practical exams, and prompt evaluation feedback.',
    iconName: 'CheckCircle'
  },
  {
    id: 'instructor_support',
    label: 'Faculty Support & Consultations',
    shortLabel: 'Support',
    description: 'Consultation availability, mentoring, and support during hands-on lab sessions.',
    iconName: 'MessageSquare'
  }
];

export const CAMPUS_DEPARTMENTS: CampusDepartment[] = [
  {
    id: 'it_network',
    name: 'College IT & Computer Lab Services',
    category: 'facilities',
    head: 'Engr. Jayson Baluyos, MIT',
    email: 'it-support@philcountryville.com',
    description: 'Campus Wi-Fi connectivity, programming laboratory workstations, student portal, and local network servers.',
    icon: 'Wifi',
    color: 'blue'
  },
  {
    id: 'facilities_maintenance',
    name: 'Campus Physical Plant & Facilities',
    category: 'facilities',
    head: 'Engr. Christopher Morales',
    email: 'facilities@philcountryville.com',
    description: 'Lecture halls, laboratory air conditioning units, restrooms, clean water stations, and electrical generators.',
    icon: 'Building2',
    color: 'amber'
  },
  {
    id: 'registrar_office',
    name: 'Office of the College Registrar',
    category: 'services',
    head: 'Mrs. Evelyn Torres-Del Rosario',
    email: 'registrar@philcountryville.com',
    description: 'Enrollment processing, Transcript of Records (TOR), certificates of matriculation, grades clearance, and student IDs.',
    icon: 'FileText',
    color: 'indigo'
  },
  {
    id: 'accounting_cashier',
    name: 'Finance & Cashier Office',
    category: 'services',
    head: 'Mrs. Michelle Gonzales, CPA',
    email: 'finance@philcountryville.com',
    description: 'Tuition fees, assessment breakdown, CHED UniFAST & TES scholarship processing, payment windows, and receipts.',
    icon: 'CreditCard',
    color: 'emerald'
  },
  {
    id: 'student_affairs',
    name: 'Office of Student Affairs & Services (OSAS)',
    category: 'activities',
    head: 'Prof. Reynaldo D. Macas',
    email: 'osas@philcountryville.com',
    description: 'Supreme Student Government (SSG), college intramurals, student orgs, foundation day events, and campus activities.',
    icon: 'Users',
    color: 'purple'
  },
  {
    id: 'criminology_dept',
    name: 'College of Criminology & Public Safety',
    category: 'academics',
    head: 'Dean Salvador "Buddy" Perez, RCrim',
    email: 'criminology@philcountryville.com',
    description: 'Forensics laboratory, firing simulation room, defense tactics gym, and criminology internship programs.',
    icon: 'ShieldCheck',
    color: 'slate'
  },
  {
    id: 'health_services',
    name: 'TCC College Clinic & Health Services',
    category: 'services',
    head: 'Dr. Maria Fatima Alcantara, MD',
    email: 'clinic@philcountryville.com',
    description: 'Student medical consultations, first-aid treatment during activities, dental screening, and medical clearances.',
    icon: 'HeartPulse',
    color: 'rose'
  },
  {
    id: 'library_services',
    name: 'TCC Main College Library',
    category: 'services',
    head: 'Mrs. Cheryl Ann Mendoza, RL',
    email: 'library@philcountryville.com',
    description: 'Circulation books, reference materials, e-library research terminals, and quiet study areas.',
    icon: 'BookOpen',
    color: 'teal'
  },
  {
    id: 'academic_affairs',
    name: 'Office of the Vice President for Academic Affairs',
    category: 'academics',
    head: 'Dr. Armando C. Rodriguez, EdD',
    email: 'vpaa@philcountryville.com',
    description: 'Curriculum standards, faculty instruction quality, CHED compliance, and academic policy governance.',
    icon: 'GraduationCap',
    color: 'cyan'
  }
];

export const COURSES: Course[] = [
  {
    id: 'it-101',
    code: 'IT 101',
    name: 'Introduction to Information Technology & Computing',
    department: 'Information Technology',
    instructor: 'Prof. Jonathan D. Magbanua, MIT',
    instructorTitle: 'BSIT Program Head',
    term: '1st Semester 2024-2025',
    credits: 3,
    enrolledStudents: 135,
    color: 'emerald'
  },
  {
    id: 'it-210',
    code: 'IT 210',
    name: 'Object-Oriented Programming (Java & OOP)',
    department: 'Information Technology',
    instructor: 'Engr. Jayson Baluyos, MIT',
    instructorTitle: 'Assistant Professor & Lab Director',
    term: '1st Semester 2024-2025',
    credits: 3,
    enrolledStudents: 92,
    color: 'indigo'
  },
  {
    id: 'it-315',
    code: 'IT 315',
    name: 'Web Systems & Technologies (Full-Stack Dev)',
    department: 'Information Technology',
    instructor: 'Mr. Kenneth Paul Entrina',
    instructorTitle: 'Senior IT Lecturer',
    term: '1st Semester 2024-2025',
    credits: 3,
    enrolledStudents: 78,
    color: 'cyan'
  },
  {
    id: 'crim-101',
    code: 'CRIM 101',
    name: 'Introduction to Philippine Criminal Justice System',
    department: 'Criminology',
    instructor: 'Atty. Victorino S. Salcedo, RCrim',
    instructorTitle: 'Associate Professor',
    term: '1st Semester 2024-2025',
    credits: 3,
    enrolledStudents: 160,
    color: 'slate'
  },
  {
    id: 'ba-201',
    code: 'BA 201',
    name: 'Principles of Business Management & Marketing',
    department: 'Business Administration',
    instructor: 'Prof. Rowena C. Villanueva, MBA',
    instructorTitle: 'BSBA Department Chair',
    term: '1st Semester 2024-2025',
    credits: 3,
    enrolledStudents: 110,
    color: 'amber'
  },
  {
    id: 'act-105',
    code: 'ACT 105',
    name: 'Database Management Systems & SQL',
    department: 'Associate in Computer Tech',
    instructor: 'Ms. Maricar T. Soriano',
    instructorTitle: 'Instructor',
    term: '1st Semester 2024-2025',
    credits: 3,
    enrolledStudents: 65,
    color: 'blue'
  }
];

export const FEEDBACK_TAGS: string[] = [
  'Clear Explanations',
  'Engaging Lectures',
  'Helpful Lab Sessions',
  'Practical Coding Exercises',
  'Patient Consultation',
  'Fair Grading & Rubrics',
  'Wi-Fi & Connectivity',
  'Cashier & Window Queues',
  'Library Resources',
  'Intramural Sports',
  'Air Conditioning Comfort',
  'Prompt Portal Updates'
];

export const INITIAL_FEEDBACKS: FeedbackSubmission[] = [
  {
    id: 'fb-001',
    courseId: 'it-315',
    ticketNumber: 'TCC-2024-1001',
    category: 'academics',
    feedbackNature: 'evaluation',
    title: 'Hands-on web technologies labs and excellent practical project mentoring',
    department: 'College of Information Technology',
    targetEntity: 'IT 315 - Web Systems & Technologies',
    location: 'TCC Main Computer Lab 2',
    priority: 'low',
    timestamp: '2024-11-20T14:32:00Z',
    isAnonymous: false,
    studentName: 'Joshua Entrina',
    studentEmail: 'joshuaentrina9@gmail.com',
    studentId: 'TCC-2022-0418',
    term: '1st Semester 2024-2025',
    ratings: {
      teaching_quality: 5,
      course_content: 5,
      workload_pace: 4,
      fairness_assessment: 5,
      instructor_support: 5
    },
    overallRating: 5,
    recommendation: 'yes',
    strengths: 'Sir Kenneth explains client-server web architecture and responsive CSS thoroughly. The actual building of real database-connected student portals gave us tangible industry skills.',
    areasForImprovement: 'Would love an extra 30 minutes of open lab time on Fridays to test our server deployments before submission deadlines.',
    additionalComments: 'One of the best IT subjects at Torres Capitol College this semester! High recommendation for BSIT students.',
    selectedTags: ['Clear Explanations', 'Engaging Lectures', 'Practical Coding Exercises', 'Helpful Lab Sessions'],
    attendanceRate: 'always',
    difficulty: 'moderate',
    status: 'reviewed',
    facultyNotes: 'Noted Joshua. We have coordinated with IT Lab custodian to keep Lab 2 open until 5:30 PM on Fridays for project consultations.',
    helpfulCount: 28
  },
  {
    id: 'fb-002',
    courseId: 'it-210',
    ticketNumber: 'TCC-2024-1002',
    category: 'academics',
    feedbackNature: 'evaluation',
    title: 'Solid Java OOP foundations and structured object hierarchy demos',
    department: 'College of Information Technology',
    targetEntity: 'IT 210 - Object-Oriented Programming',
    location: 'Computer Lab 1',
    priority: 'low',
    timestamp: '2024-11-18T10:15:00Z',
    isAnonymous: false,
    studentName: 'Alyssa Mae Salcedo',
    studentEmail: 'asalcedo@philcountryville.com',
    studentId: 'TCC-2023-0199',
    term: '1st Semester 2024-2025',
    ratings: {
      teaching_quality: 5,
      course_content: 5,
      workload_pace: 4,
      fairness_assessment: 4,
      instructor_support: 5
    },
    overallRating: 5,
    recommendation: 'yes',
    strengths: 'Engr. Jayson Baluyos takes the time to explain inheritance and polymorphism until every student grasps it. The laboratory coding exercises are well designed.',
    areasForImprovement: 'Some older desktop PCs in Lab 1 take a while to launch the Java IDE.',
    additionalComments: 'Very supportive professor who answers questions on our class group chat even on weekends.',
    selectedTags: ['Clear Explanations', 'Patient Consultation', 'Helpful Lab Sessions'],
    attendanceRate: 'always',
    difficulty: 'challenging',
    status: 'reviewed',
    facultyNotes: 'Lab 1 workstation RAM upgrades approved for next semester.',
    helpfulCount: 16
  },
  {
    id: 'fb-003',
    courseId: 'crim-101',
    ticketNumber: 'TCC-2024-1003',
    category: 'academics',
    feedbackNature: 'evaluation',
    title: 'Realistic courtroom scenarios and Philippine criminal justice insights',
    department: 'College of Criminology & Public Safety',
    targetEntity: 'CRIM 101 - Introduction to Criminal Justice',
    location: 'Criminology Amphitheater Room 3',
    priority: 'low',
    timestamp: '2024-11-19T16:45:00Z',
    isAnonymous: true,
    term: '1st Semester 2024-2025',
    ratings: {
      teaching_quality: 5,
      course_content: 5,
      workload_pace: 4,
      fairness_assessment: 5,
      instructor_support: 4
    },
    overallRating: 5,
    recommendation: 'yes',
    strengths: 'Atty. Salcedo brings real Philippine courtroom cases and law enforcement procedures to life. Strict on discipline but very inspiring for future law enforcement officers.',
    areasForImprovement: 'A printed case-study digest syllabus would help us prepare ahead of time.',
    additionalComments: 'Proud criminology student here at Torres Capitol College!',
    selectedTags: ['Clear Explanations', 'Engaging Lectures', 'Fair Grading & Rubrics'],
    attendanceRate: 'always',
    difficulty: 'challenging',
    status: 'reviewed',
    facultyNotes: 'Case digest handbook will be made available at the college photocopy center.',
    helpfulCount: 22
  },
  {
    id: 'fb-srv-01',
    courseId: '',
    ticketNumber: 'TCC-2024-8192',
    category: 'services',
    feedbackNature: 'concern',
    title: 'Long student queue at Cashier Window during prelims exam permit clearance week',
    department: 'Finance & Cashier Office',
    targetEntity: 'Cashier Main Payment Windows',
    location: 'TCC Administration Building Ground Floor',
    priority: 'high',
    assignedTo: 'Mrs. Michelle Gonzales, CPA (Finance Head)',
    timestamp: '2024-11-21T09:15:00Z',
    isAnonymous: false,
    studentName: 'Mark Lester Dimaculangan',
    studentEmail: 'mdimaculangan@philcountryville.com',
    studentId: 'TCC-2022-0881',
    term: '1st Semester 2024-2025',
    ratings: {
      teaching_quality: 3,
      course_content: 2,
      workload_pace: 2,
      fairness_assessment: 3,
      instructor_support: 3
    },
    overallRating: 2,
    recommendation: 'maybe',
    strengths: 'Cashier tellers are polite and handle each transaction carefully once you reach the counter.',
    areasForImprovement: 'During exam permit clearance week, the line extends out to the campus lobby hallway. Students wait over an hour in line while balancing class schedules.',
    additionalComments: 'Could Torres Capitol College implement GCash / Maya digital payment options or an express cashier window for pure permit validation?',
    selectedTags: ['Cashier & Window Queues', 'Prompt Portal Updates'],
    attendanceRate: 'regular',
    difficulty: 'moderate',
    status: 'in_progress',
    timeline: [
      {
        id: 'tl-1',
        timestamp: '2024-11-21T09:15:00Z',
        title: 'Concern Submitted',
        description: 'Student submitted formal concern regarding cashier queues during examination permit validation week.',
        actor: 'Mark Lester Dimaculangan (BSBA Student)',
        type: 'submission'
      },
      {
        id: 'tl-2',
        timestamp: '2024-11-21T11:00:00Z',
        title: 'Ticket Triaged & Assigned',
        description: 'Assigned to Finance & Cashier Office for urgent workflow review and teller scheduling.',
        actor: 'TCC Admin Resolution Desk',
        type: 'assignment'
      },
      {
        id: 'tl-3',
        timestamp: '2024-11-22T08:30:00Z',
        title: 'Action in Progress',
        description: 'Second payment window opened. Accounting is testing official TCC GCash/Maya QR payments for faster permit clearance.',
        actor: 'Mrs. Michelle Gonzales, CPA',
        type: 'status_change'
      }
    ],
    facultyNotes: 'Finance is coordinating with IT to deploy automated student clearance status on the philcountryville.com student portal.',
    helpfulCount: 47
  },
  {
    id: 'fb-fac-01',
    courseId: '',
    ticketNumber: 'TCC-2024-7401',
    category: 'facilities',
    feedbackNature: 'concern',
    title: 'Campus Wi-Fi connectivity dropouts in TCC Main Library and Study Area',
    department: 'College IT & Computer Lab Services',
    targetEntity: 'Campus Wi-Fi - Access Point TCC-LIB-2F',
    location: 'TCC Main Library 2nd Floor Study Area',
    priority: 'urgent',
    assignedTo: 'Engr. Jayson Baluyos, MIT (Head of IT Services)',
    timestamp: '2024-11-19T11:20:00Z',
    isAnonymous: true,
    term: '1st Semester 2024-2025',
    ratings: {
      teaching_quality: 1,
      course_content: 2,
      workload_pace: 2,
      fairness_assessment: 2,
      instructor_support: 2
    },
    overallRating: 2,
    recommendation: 'no',
    strengths: 'Library tables, books, and study atmosphere are quiet and well-maintained by our librarian Mrs. Mendoza.',
    areasForImprovement: 'The Wi-Fi access point frequently disconnects every 15 minutes, making online research, capstone paper writing, and checking portals frustrating.',
    additionalComments: 'BSIT and Criminology students studying for research defense experienced dropped connections.',
    selectedTags: ['Wi-Fi & Connectivity', 'Library Resources'],
    attendanceRate: 'always',
    difficulty: 'challenging',
    status: 'resolved',
    adminResponse: {
      resolvedAt: '2024-11-20T16:00:00Z',
      resolvedBy: 'Engr. Jayson Baluyos (TCC IT Services)',
      actionTaken: 'Replaced faulty router access point on the Library 2nd floor with high-capacity dual-band Gigabit Wi-Fi 6 AP. Rebalanced bandwidth allocation to prioritize academic research portals. Tested at 95 Mbps steady speed with zero packet dropouts.',
      officialNotes: 'Work order #TCC-IT-2024-88 completed. Library Wi-Fi connection verified with Chief Librarian.'
    },
    timeline: [
      {
        id: 'tl-1',
        timestamp: '2024-11-19T11:20:00Z',
        title: 'Issue Reported',
        description: 'Student submitted priority concern regarding library wireless connectivity dropouts.',
        actor: 'Anonymous TCC Student',
        type: 'submission'
      },
      {
        id: 'tl-2',
        timestamp: '2024-11-19T13:45:00Z',
        title: 'Work Order Dispatched',
        description: 'IT technicians inspected access point signal strength and Ethernet switch cabling.',
        actor: 'TCC Admin Resolution Desk',
        type: 'assignment'
      },
      {
        id: 'tl-3',
        timestamp: '2024-11-20T16:00:00Z',
        title: 'Issue Successfully Resolved',
        description: 'Dual-band Wi-Fi 6 access point installed and speed-tested across all study carrels.',
        actor: 'Engr. Jayson Baluyos',
        type: 'resolution'
      }
    ],
    helpfulCount: 56
  },
  {
    id: 'fb-fac-02',
    courseId: '',
    ticketNumber: 'TCC-2024-6910',
    category: 'facilities',
    feedbackNature: 'concern',
    title: 'Air conditioning unit in Computer Laboratory 1 blowing warm air during afternoon classes',
    department: 'Campus Physical Plant & Facilities',
    targetEntity: 'Computer Science & IT Laboratory 1',
    location: 'TCC IT Building Room 102',
    priority: 'high',
    assignedTo: 'Engr. Christopher Morales (Facilities Head)',
    timestamp: '2024-11-18T14:10:00Z',
    isAnonymous: false,
    studentName: 'Rica Mae Fernandez',
    studentEmail: 'rfernandez@philcountryville.com',
    studentId: 'TCC-2023-0512',
    term: '1st Semester 2024-2025',
    ratings: {
      teaching_quality: 3,
      course_content: 3,
      workload_pace: 3,
      fairness_assessment: 3,
      instructor_support: 3
    },
    overallRating: 2,
    recommendation: 'maybe',
    strengths: 'Laboratory computers and programming software tools are up to date and responsive.',
    areasForImprovement: 'The 2-horsepower split-type AC in the back corner was blowing warm air. With 45 students and workstations running in the afternoon, room temperature rose above 32°C.',
    additionalComments: 'Heat affects computer hardware and makes concentration difficult during 3-hour laboratory hands-on exams.',
    selectedTags: ['Air Conditioning Comfort', 'Helpful Lab Sessions'],
    attendanceRate: 'always',
    difficulty: 'moderate',
    status: 'resolved',
    adminResponse: {
      resolvedAt: '2024-11-19T15:00:00Z',
      resolvedBy: 'TCC Physical Plant & HVAC Unit',
      actionTaken: 'Cleaned clogged dust filters, flushed condensation drainage lines, and recharged eco-friendly refrigerant. Thermostat calibrated to 20°C with even airflow verified across all lab rows.',
      officialNotes: 'Scheduled preventive bi-monthly air conditioner servicing for all campus computer laboratories.'
    },
    timeline: [
      {
        id: 'tl-1',
        timestamp: '2024-11-18T14:10:00Z',
        title: 'Concern Submitted',
        description: 'Computer lab AC failure reported by student.',
        actor: 'Rica Mae Fernandez (BSIT 2nd Year)',
        type: 'submission'
      },
      {
        id: 'tl-2',
        timestamp: '2024-11-19T15:00:00Z',
        title: 'Maintenance Completed',
        description: 'HVAC repair crew serviced blower and topped up refrigerant.',
        actor: 'Engr. Christopher Morales',
        type: 'resolution'
      }
    ],
    helpfulCount: 34
  },
  {
    id: 'fb-act-01',
    courseId: '',
    ticketNumber: 'TCC-2024-5520',
    category: 'activities',
    feedbackNature: 'recommendation',
    title: 'Extend TCC College Intramural Basketball & Volleyball court scheduling to evening hours',
    department: 'Office of Student Affairs & Services (OSAS)',
    targetEntity: 'Torres Capitol College Covered Court & Gymnasium',
    location: 'TCC Campus Gymnasium',
    priority: 'medium',
    assignedTo: 'Prof. Reynaldo D. Macas (OSAS Director)',
    timestamp: '2024-11-17T18:00:00Z',
    isAnonymous: false,
    studentName: 'Christian Jay Navarro',
    studentEmail: 'cnavarro@philcountryville.com',
    studentId: 'TCC-2021-0112',
    term: '1st Semester 2024-2025',
    ratings: {
      teaching_quality: 4,
      course_content: 4,
      workload_pace: 4,
      fairness_assessment: 4,
      instructor_support: 4
    },
    overallRating: 4,
    recommendation: 'yes',
    strengths: 'The Intramurals opening parade, dance competition, and college spirit across IT, Criminology, and Business Administration were lively and fantastic.',
    areasForImprovement: 'Games scheduled between 12 PM and 2 PM conflict with core major laboratory classes. Opening the covered court with LED floodlights until 8:00 PM would let all students watch and participate safely.',
    additionalComments: 'Endorsed by the Supreme Student Government (SSG) athletic committee.',
    selectedTags: ['Intramural Sports'],
    attendanceRate: 'always',
    difficulty: 'easy',
    status: 'in_progress',
    timeline: [
      {
        id: 'tl-1',
        timestamp: '2024-11-17T18:00:00Z',
        title: 'Recommendation Submitted',
        description: 'Student proposed court schedule adjustments and evening LED lighting for intramural tournament brackets.',
        actor: 'Christian Jay Navarro (SSG Sports Coordinator)',
        type: 'submission'
      },
      {
        id: 'tl-2',
        timestamp: '2024-11-18T10:30:00Z',
        title: 'Under Review by OSAS & Security',
        description: 'OSAS meeting with Campus Security and Physical Plant to arrange court lighting and evening guard duty.',
        actor: 'Prof. Reynaldo D. Macas',
        type: 'assignment'
      }
    ],
    helpfulCount: 51
  },
  {
    id: 'fb-srv-02',
    courseId: '',
    ticketNumber: 'TCC-2024-4311',
    category: 'services',
    feedbackNature: 'recommendation',
    title: 'Online appointment scheduling for College Registrar document clearances and TOR release',
    department: 'Office of the College Registrar',
    targetEntity: 'Registrar Document Clearance Window',
    location: 'TCC Main Building 1st Floor',
    priority: 'medium',
    assignedTo: 'Mrs. Evelyn Torres-Del Rosario (College Registrar)',
    timestamp: '2024-11-16T13:40:00Z',
    isAnonymous: true,
    term: '1st Semester 2024-2025',
    ratings: {
      teaching_quality: 4,
      course_content: 3,
      workload_pace: 3,
      fairness_assessment: 4,
      instructor_support: 4
    },
    overallRating: 4,
    recommendation: 'yes',
    strengths: 'Registrar staff are meticulous, accommodating, and very helpful when answering graduation requirements inquiries.',
    areasForImprovement: 'During graduation and board exam application seasons, walk-in students crowd the registrar lobby. An online appointment slot system on philcountryville.com would eliminate long queues.',
    additionalComments: 'This would make Torres Capitol College registrar services faster and more modern.',
    selectedTags: ['Prompt Portal Updates', 'Clear Explanations'],
    attendanceRate: 'regular',
    difficulty: 'moderate',
    status: 'pending',
    helpfulCount: 39
  },
  {
    id: 'fb-srv-03',
    courseId: '',
    ticketNumber: 'TCC-2024-3801',
    category: 'services',
    feedbackNature: 'commendation',
    title: 'Commendation to TCC College Clinic staff for rapid first-aid care during Criminology obstacle drills',
    department: 'TCC College Clinic & Health Services',
    targetEntity: 'Emergency Care & First Aid Unit',
    location: 'TCC Clinic Medical Bay',
    priority: 'low',
    assignedTo: 'Dr. Maria Fatima Alcantara, MD (College Physician)',
    timestamp: '2024-11-15T15:30:00Z',
    isAnonymous: false,
    studentName: 'Daniel Keith Tan',
    studentEmail: 'dtan@philcountryville.com',
    studentId: 'TCC-2022-0943',
    term: '1st Semester 2024-2025',
    ratings: {
      teaching_quality: 5,
      course_content: 5,
      workload_pace: 5,
      fairness_assessment: 5,
      instructor_support: 5
    },
    overallRating: 5,
    recommendation: 'yes',
    strengths: 'Dr. Alcantara and Nurse Karen treated my sprained wrist immediately with an ice pack, antiseptic wrap, and gentle care during our tactical exercises. They also checked up on me the following day.',
    areasForImprovement: 'None! The clinic is clean, well stocked with emergency medications, and very welcoming.',
    additionalComments: 'Salute to our dedicated healthcare team at Torres Capitol College!',
    selectedTags: ['Patient Consultation'],
    attendanceRate: 'always',
    difficulty: 'easy',
    status: 'resolved',
    adminResponse: {
      resolvedAt: '2024-11-16T09:00:00Z',
      resolvedBy: 'Dr. Maria Fatima Alcantara, MD',
      actionTaken: 'Commendation shared with the clinic medical team and forwarded to the Office of the President. Additional sports medicine bandages and first-aid kits prepared for outdoor activities.',
      officialNotes: 'Thank you Daniel for appreciating our health services personnel.'
    },
    helpfulCount: 33
  }
];
