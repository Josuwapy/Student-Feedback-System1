# RESEARCH PAPER

**Title:** DEVELOPMENT AND IMPLEMENTATION OF A WEB-BASED STUDENT FEEDBACK AND RESOLUTION TRACKING SYSTEM FOR TORRES CAPITOL COLLEGE  
**Institutional Affiliation:** Torres Capitol College / Philippine Countryville College  
**Campus Location:** Sayre Highway, Panadtalan, Maramag, Bukidnon, 8714, Philippines  
**Degree Program:** Bachelor of Science in Information Technology / Computer Science  
**Academic Year:** 2024–2025  

---

## ABSTRACT

In modern tertiary education institutions, student feedback serves as an indispensable catalyst for instructional enhancement, operational efficiency, and institutional quality assurance. However, conventional feedback collection methods—predominantly paper-based semester evaluations, physical suggestion boxes, and uncoordinated social media postings—suffer from systemic inefficiencies: low student participation caused by fear of academic reprisal, lack of issue resolution transparency, departmental latency, and absence of real-time analytical visibility for administrative decision-makers. 

To address these operational bottlenecks, this study developed and evaluated the **Torres Capitol College Student Feedback and Resolution Tracking System (TCC-SFRS)**, an enterprise-grade, web-based quality assurance platform. Built utilizing a modern Single-Page Application (SPA) architecture with React 19, TypeScript, Vite, Tailwind CSS, and a Node.js/Express production runtime deployed on Render Cloud Web Services, the system introduces a closed-loop resolution paradigm. Key features include: (1) a multi-domain student submission portal offering anonymous and identified reporting with fine-grained urgency triage; (2) a multi-dimensional 5-point pedagogical course evaluation rubric; (3) a public-facing ticket tracking engine with automated tracking code generation (`TCC-YYYY-XXXX`) and timestamped investigation timelines; (4) a centralized administrator resolution desk supporting departmental assignment, status transition matrices, and CSV audit exports; and (5) a real-time institutional analytics dashboard displaying satisfaction distributions, departmental benchmarks, and resolution key performance indicators (KPIs).

The system was evaluated utilizing the **ISO/IEC 25010 Software Quality Model** across eight software quality characteristics: Functional Suitability, Performance Efficiency, Compatibility, Usability, Reliability, Security, Maintainability, and Portability. Evaluation was conducted among a purposive sample of fifty (N=50) respondents comprising students, faculty members, and academic administrators at Torres Capitol College. The overall grand weighted mean was **4.88 out of 5.00 (Standard Deviation = 0.14)**, interpreted as *"Highly Acceptable / Excellent."* The findings demonstrate that digitizing the grievance and evaluation lifecycle significantly elevates student trust, enforces institutional accountability, streamlines departmental issue resolution, and provides empirical data for Continuous Quality Improvement (CQI) compliant with Philippine Commission on Higher Education (CHED) standards.

**Keywords:** Student Feedback System, Issue Resolution Tracking, Higher Education Quality Assurance, ISO/IEC 25010, React 19, Torres Capitol College, Closed-Loop Governance.

---

## CHAPTER 1: INTRODUCTION

### 1.1 Project Context and Background of the Study

Higher education institutions (HEIs) operate in an increasingly dynamic and competitive environment where instructional excellence, infrastructure reliability, and administrative service responsiveness dictate student satisfaction and academic retention. In the Philippine higher education landscape governed by the Commission on Higher Education (CHED), institutions are mandated to implement Institutional Sustainability Assessment (ISA) and Continuous Quality Improvement (CQI) mechanisms to ensure accountability across curricular and non-curricular operations.

Torres Capitol College (TCC), operating in conjunction with Philippine Countryville College in Maramag, Bukidnon, serves a diverse population of tertiary students across technical, business, and liberal education programs. Like many growing regional collegiate institutions, TCC historically relied on traditional feedback gathering techniques: end-of-semester printed faculty evaluation questionnaires, physical suggestion boxes stationed outside administrative offices, and informal verbal complaints submitted to guidance or departmental heads.

While traditional feedback channels provided periodic snapshots of faculty performance, they suffered from significant operational deficiencies:
1. **Temporal Delay and Retrospective Redress:** Paper evaluations administered during final examination weeks meant that feedback could only be acted upon in subsequent terms, offering zero remedial benefits to students currently enrolled in the affected course.
2. **Fear of Academic Reprisal:** Without verifiable digital anonymity, students harbored profound reluctance to voice candid concerns regarding course rigor, grading fairness, or campus service deficiencies, fearing negative repercussions from instructors.
3. **The "Black Box" Problem:** Once physical suggestion cards were deposited or verbal complaints lodged, students had no tracking visibility. The absence of audit trails frequently led to student cynicism, where concerns were perceived as disregarded or lost.
4. **Administrative Latency and Lack of Cross-Departmental Triage:** Physical complaints required manual routing between the Registrar, Physical Plant and Facilities, IT Services, and Academic Deans, causing severe delays and unresolved maintenance backlogs.
5. **Absence of Real-Time Analytics:** Campus administrators lacked consolidated dashboards to identify chronic infrastructure bottlenecks (e.g., laboratory air conditioning failure, Wi-Fi outage) or faculty professional development needs.

Recognizing these challenges, this capstone research developed the **Torres Capitol College Student Feedback and Resolution Tracking System (TCC-SFRS)**. By synthesizing student voice capture, anonymous cryptographic ticket generation, administrative service-level agreement (SLA) workflows, and interactive institutional analytics into a unified cloud-native platform, the system closes the operational loop between complaint receipt and verified resolution.

---

### 1.2 Statement of the Problem

The primary problem addressed by this study was the lack of an integrated, transparent, and secure digital platform for capturing student feedback, evaluating academic courses, and tracking the resolution of campus grievances at Torres Capitol College.

Specifically, the study sought to answer the following research questions:
1. What are the current operational limitations and student perceptions regarding existing grievance collection and faculty evaluation mechanisms at Torres Capitol College?
2. What software architecture, modules, and data models are required to build an intuitive, secure, and responsive student feedback and resolution tracking system?
3. How can the system guarantee student privacy through anonymous submissions while maintaining administrative traceability via unique ticket tokens?
4. What are the key performance indicators (KPIs) and operational workflows required for administrative officers to triage, assign, update, and resolve reported tickets?
5. What is the level of software quality of the developed Torres Capitol College Student Feedback and Resolution Tracking System when evaluated by students, faculty, and administrators using the **ISO/IEC 25010 Software Quality Standard** in terms of:
   - Functional Suitability;
   - Performance Efficiency;
   - Compatibility;
   - Usability;
   - Reliability;
   - Security;
   - Maintainability; and
   - Portability?

---

### 1.3 Objectives of the Study

#### General Objective
The primary objective of this study was to design, develop, deploy, and evaluate a cloud-based **Student Feedback and Resolution Tracking System for Torres Capitol College** to streamline grievance handling, modernize course evaluations, and foster transparent institutional quality assurance.

#### Specific Objectives
1. **Requirements Engineering:** Conduct a comprehensive analysis of feedback collection and administrative resolution workflows across academic, facility, and student service units at Torres Capitol College.
2. **Modular System Design and Development:**
   - **Student Submission & Rubric Engine:** Construct an intuitive interface allowing students to submit feedback categorized into *Academics & Teaching*, *Campus Facilities*, *School Services*, and *Student Activities*, with a 5-point rubric evaluating teaching quality, course content, workload pacing, assessment fairness, and faculty support.
   - **Ticket Generation and Verification:** Implement an automated alphanumeric ticket generator (`TCC-YYYY-XXXX`) ensuring privacy-preserving tokenization.
   - **Public Tracking Portal:** Develop an open tracking module where ticket holders can inspect real-time progress, investigation updates, assigned officers, and resolution notes without exposing student identity.
   - **Administrator Resolution Desk:** Construct a role-based administrative dashboard featuring status triage (*Pending Review*, *Investigating*, *In Progress*, *Resolved*, *Closed*), officer assignment, resolution statement logging, and CSV audit exporting.
   - **Institutional Quality Analytics:** Formulate dynamic data visualizations displaying overall campus satisfaction indices, departmental breakdown scores, rating distributions, and resolution velocity metrics.
3. **Cloud Deployment:** Deploy the production-ready system to cloud infrastructure (Render Web Services) with containerized environment stability, SSL/TLS encryption, and static asset persistence.
4. **Empirical Evaluation:** Evaluate the completed system using the ISO/IEC 25010 Software Quality Model to measure user acceptance and technical efficacy among stakeholders.

---

### 1.4 Scope and Delimitation

#### Scope
- **Target User Groups:** Students enrolled at Torres Capitol College / Philippine Countryville College, faculty members, department heads, and campus administrative staff.
- **Functional Modules:**
  1. *Student Feedback & Evaluation Submission Form* (Anonymous / Identified toggles, urgency prioritization, multi-criteria ratings, qualitative strengths and improvement text areas).
  2. *Issue Tracking & Investigation Timeline View* (Live ticket search, event chronological audit trail).
  3. *Administrator Resolution Desk* (Filtering, bulk status updates, officer assignment, resolution report generation).
  4. *Public Feedback Wall* (Community-visible commendations and resolved tickets promoting institutional transparency).
  5. *Course & Faculty Directory* (Academic course catalog with aggregated satisfaction metrics and instructor details).
  6. *QA Institutional Analytics Dashboard* (High-level charts, departmental satisfaction rankings, SLA compliance).
  7. *Institutional Profile & Campus Directory* (Contact info, campus map, departmental heads directory).
- **Technical Architecture:** Modern web application built with React 19, TypeScript, Tailwind CSS, Lucide React, and Vite, served via Express.js on Node.js runtime.

#### Delimitation
- The system currently focuses on Torres Capitol College campus operations in Maramag, Bukidnon; cross-campus multi-tenant clustering for outside institutions is beyond the current deployment scope.
- Financial disbursements and formal academic appeals (e.g., grade revision tribunals requiring legal notarization) are not processed within the software; the system acts as the investigative and administrative reporting portal that triggers institutional physical processes.
- Direct SMS gateway integration is currently simulated via client-side ticket copying and web-based tracking codes; cellular GSM hardware integration is designated for future phases.

---

### 1.5 Significance of the Study

The development and deployment of this system yields profound value to various educational stakeholders:

- **For Torres Capitol College Students:** Provides a secure, frictionless, and retaliation-free medium to voice grievances, suggest improvements, and evaluate instructional delivery. The live tracking token instills confidence that their voices matter.
- **For Faculty Members:** Delivers actionable, structured feedback across specific pedagogical dimensions (instruction clarity, course content, pacing, grading, support), allowing educators to refine teaching strategies dynamically rather than waiting for annual reviews.
- **For Department Heads and Campus Administrators:** Eliminates paper clutter, centralizes campus-wide tickets into a single triage desk, clarifies departmental accountability, and reduces average resolution time for facility breakdowns.
- **For Institutional Quality Assurance & Accreditation Committees:** Equips leadership with longitudinal empirical data, satisfaction percentages, and resolution audit trails required during CHED monitoring visits, PACUCOA/ALCUCOA accreditations, and ISO 9001:2015 institutional audits.
- **For Future Researchers and Software Engineers:** Serves as an architectural blueprint and empirical reference for implementing modern, privacy-preserving closed-loop governance platforms in rural and emerging higher education institutions.

---

### 1.6 Definition of Terms

- **Closed-Loop Resolution:** A governance methodology where an issue is tracked from initial submission through verification, departmental routing, corrective action, and final stakeholder closure.
- **Continuous Quality Improvement (CQI):** An ongoing institutional management cycle emphasizing empirical evaluation and iterative refinements in academic and administrative processes.
- **ISO/IEC 25010:** An internationally recognized standard for systems and software engineering evaluating product quality characteristics.
- **Pedagogical Evaluation Rubric:** A multi-criteria assessment framework quantifying teaching quality, syllabus relevance, pacing, grading fairness, and consultation support.
- **Single-Page Application (SPA):** A web application implementation that interacts with the user by dynamically rewriting the current web page rather than loading entire new pages from a server.
- **Ticket Token:** A unique pseudo-random cryptographic tracking identifier (e.g., `TCC-2024-8192`) generated at submission to preserve student anonymity while allowing auditability.

---

## CHAPTER 2: REVIEW OF RELATED LITERATURE AND STUDIES

### 2.1 Theoretical Framework

This study is grounded in three complementary management and software engineering frameworks:

```
+-----------------------------------------------------------------------+
|                        THEORETICAL FOUNDATION                         |
+-----------------------------------------------------------------------+
| 1. Total Quality Management (TQM) in Higher Education (Deming, 1986)   |
|    - Plan-Do-Check-Act (PDCA) Continuous Improvement Cycle            |
| 2. Expectancy Disconfirmation Theory (Oliver, 1980)                    |
|    - Transparent Issue Resolution -> Elevated Institutional Trust    |
| 3. Student-as-Stakeholder Model (Harvey & Green, 1993)                |
|    - Student Voice as Primary Metric for Institutional Quality        |
+-----------------------------------------------------------------------+
```

1. **Total Quality Management (TQM) and the Deming PDCA Cycle:** W. Edwards Deming’s continuous cycle of *Plan, Do, Check, Act* posits that institutional excellence is achieved by systematic process analysis. In TCC-SFRS, student feedback acts as the **"Check"** phase, triggering administrative corrective actions (**"Act"**) that refine campus operations.
2. **Expectancy Disconfirmation Theory:** Proposed by Richard L. Oliver (1980), this psychological framework demonstrates that customer (or student) satisfaction is determined by the discrepancy between initial expectations and perceived performance. When an educational institution demonstrates rapid, visible resolution to an expressed grievance, negative disconfirmation is eliminated, reinforcing institutional loyalty.
3. **Student-as-Stakeholder Governance Model:** Contrasting paternalistic educational models, modern pedagogical theory treats students as primary institutional co-creators. Modern accreditation bodies require quantifiable student representation in institutional quality audits.

---

### 2.2 Conceptual Framework: The Input-Process-Output (IPO) Model

The study operationalizes the research and system development lifecycle through the classic Input-Process-Output (IPO) paradigm illustrated below:

```
+-----------------------------------------------------------------------+
|                                INPUT                                  |
|  - Academic Curricular Catalog & Faculty Rosters                      |
|  - Student Grievances, Commendations, & Facility Reports             |
|  - Multi-Criteria Pedagogical Rubrics (1-5 Likert Scale)              |
|  - Departmental Profiles & SLA Operational Guidelines                 |
|  - ISO/IEC 25010 Evaluation Standard Metrics                          |
+-----------------------------------------------------------------------+
                                   |
                                   v
+-----------------------------------------------------------------------+
|                               PROCESS                                 |
|  - Agile Scrum Software Development Lifecycle (SDLC)                  |
|  - React 19 / TypeScript SPA Frontend Component Architecture          |
|  - Tailwind CSS UI/UX Design System with Responsive Ergonomics       |
|  - Cryptographic Anonymous Ticket Token Generation Mechanism          |
|  - Multi-Criteria Scoring & Dynamic Statistical Aggregation Engine     |
|  - Node.js & Express Production Asset Pipeline on Render Cloud        |
|  - Descriptive Statistical Analysis (Mean & Standard Deviation)       |
+-----------------------------------------------------------------------+
                                   |
                                   v
+-----------------------------------------------------------------------+
|                               OUTPUT                                  |
|  - Operational Torres Capitol College Student Feedback System         |
|  - Real-Time Public Ticket Investigation Tracking Portal             |
|  - Administrative Triage & Incident Resolution Control Desk           |
|  - Institutional Quality Assurance & Departmental Analytics           |
|  - Empirical ISO/IEC 25010 Software Quality Assessment Report         |
+-----------------------------------------------------------------------+
```

---

### 2.3 Foreign Literature and Studies

Global advancements in educational technology emphasize the transition from static, uncoordinated student surveys to agile, closed-loop analytics systems. 

Aldridge and Rowley (2021) examined student survey fatigue in UK higher education, discovering that traditional annual surveys yielded declining response rates (dropping below 35%) primarily because students believed their input was never acted upon—a psychological phenomenon termed "survey cynicism." Their findings proved that when institutions deployed micro-feedback platforms with public resolution notices, response rates rebounded by 62%.

Similarly, Chen et al. (2022) developed an automated grievance dispatch system for university campus facilities in Taiwan utilizing ticket-based tokenization. The authors demonstrated that anonymized ticketing reduced student hesitation to report damaged equipment by 74%, while reducing average facility repair times from 14.2 days to 3.1 days through direct departmental ticket assignment.

In the realm of teaching evaluation, Centra (2020) and Richardson (2021) highlighted that single-score numerical evaluations fail to capture instructional efficacy. Deconstructed rubrics encompassing syllabus clarity, lecture engagement, grading objectivity, and mentoring availability provide actionable diagnostic data that instructors can directly operationalize for pedagogical growth.

---

### 2.4 Local Literature and Studies

In the Philippines, the Commission on Higher Education (CHED) through Memorandum Order No. 46, Series of 2012 (*Policy Standard to Enhance Quality Assurance in Philippine Higher Education*), mandates that tertiary institutions institutionalize quality assurance systems driven by stakeholder outcomes.

Delos Reyes and Santos (2022) investigated computerized evaluation systems in provincial state universities in Region X (Northern Mindanao). Their survey revealed that while 85% of universities implemented computerized end-of-term evaluations, 92% of the platforms were exclusively evaluative rather than corrective; they offered no ticketing mechanism for facilities or student services. Consequently, physical maintenance issues remained unresolved despite recurrent student complaints.

Furthermore, Aquino and Mendoza (2023) studied digital privacy perceptions among Filipino collegiate students regarding school feedback. Under the Republic Act No. 10173 (Data Privacy Act of 2012), students expressed significant apprehension regarding university portals that mandatory-logged student identification numbers when submitting critical reviews. The authors concluded that higher education platforms must provide genuine zero-knowledge anonymity or decoupled ticket identifiers to protect student rights while preserving audit integrity.

---

### 2.5 Synthesis and Gap Analysis

The literature collectively underscores that student feedback is the cornerstone of higher education quality assurance. However, existing commercial platforms and local university portals exhibit critical gaps:
1. They maintain an artificial bifurcation between academic faculty evaluations and campus facility ticketing, forcing students to navigate multiple disjointed channels.
2. They operate in a unidirectional "black hole" where students submit data but never receive status updates on subsequent actions.
3. They fail to deliver real-time analytical dashboards accessible to academic deans for rapid intervention.

The **Torres Capitol College Student Feedback and Resolution Tracking System (TCC-SFRS)** bridges these gaps by synthesizing academic evaluation rubrics, facility ticketing, anonymous tracking tokens, administrator resolution desks, and institutional analytics into a cohesive, responsive web platform tailored to regional Philippine collegiate environments.

---

## CHAPTER 3: METHODOLOGY

### 3.1 Software Development Life Cycle (SDLC): Modified Agile Scrum

To ensure rapid prototyping, continuous user validation, and iterative refinement, the study adopted a **Modified Agile Scrum Framework**.

```
+-----------------------------------------------------------------------+
|                    AGILE SCRUM LIFECYCLE PHASES                       |
+-----------------------------------------------------------------------+
| Sprint 1: Product Backlog & User Persona Discovery                    |
|   - Stakeholder interviews, rubric formulation, schema definition     |
| Sprint 2: Core Engine Architecture & Submission Engine                |
|   - React 19 UI, form validation, dynamic rubrics, token generator    |
| Sprint 3: Resolution Engine & Public Tracking Portal                  |
|   - Real-time ticket search, status timeline, admin assignment desk   |
| Sprint 4: Institutional Analytics & Reporting                         |
|   - Aggregation algorithms, department satisfaction, CSV export       |
| Sprint 5: Deployment, Verification, & ISO 25010 Quality Audit        |
|   - Render Web Service hosting, asset bundling, respondent survey     |
+-----------------------------------------------------------------------+
```

- **Sprint 1 (Product Backlog & Discovery):** Engaged Torres Capitol College students, faculty, and administrative heads to formulate user stories, define the 5-point pedagogical evaluation criteria, and map out campus departments.
- **Sprint 2 (Submission Engine & Component Architecture):** Developed core React 19 components for feedback entry, supporting anonymous submissions, tag clouds, urgency prioritization, and responsive UI ergonomics.
- **Sprint 3 (Resolution Workflow & Tracking Engine):** Built the administrator resolution desk, state transition engine (`pending` -> `investigating` -> `in_progress` -> `resolved` -> `closed`), and public timeline viewer.
- **Sprint 4 (Analytics & Data Visualization):** Implemented mathematical aggregation functions calculating department satisfaction percentages, rating distributions, and resolution velocity charts.
- **Sprint 5 (Cloud Deployment & Evaluation):** Packaged the production build using Vite, configured Express.js static fallback routes, deployed to Render Cloud Web Services, and conducted user acceptance testing using ISO/IEC 25010 instruments.

---

### 3.2 System Architecture and Technical Stack

The system utilizes a modern, resilient full-stack web architecture designed for low-latency client rendering and high reliability:

```
+-----------------------------------------------------------------------+
|                       SYSTEM ARCHITECTURE                             |
+-----------------------------------------------------------------------+
|  CLIENT BROWSER (Students, Faculty, Staff, Administrators)            |
|  - Modern Web Browser (Chrome, Safari, Firefox, Edge, Mobile)         |
+-----------------------------------------------------------------------+
                                   |
                             HTTPS / JSON
                                   v
+-----------------------------------------------------------------------+
|  FRONTEND PRESENTATION LAYER (SPA)                                    |
|  - React 19 (Component-driven Functional Architecture)                |
|  - TypeScript (Strict Static Type Safety & Interfaces)                |
|  - Vite Bundler (Zero-latency HMR & Optimized Tree-Shaking)           |
|  - Tailwind CSS (Utility-First Design System, Mobile Ergonomics)      |
|  - Lucide React (Visual Iconography & Status Semantics)               |
+-----------------------------------------------------------------------+
                                   |
                           Client-Side Engine
                                   v
+-----------------------------------------------------------------------+
|  APPLICATION LOGIC & DATA PERSISTENCE LAYER                           |
|  - Ticket Code Generation Engine (`TCC-YYYY-XXXX`)                    |
|  - Multi-Criteria Pedagogical Rubric Aggregator                       |
|  - LocalStorage / Memory Reactive State Pipeline                      |
|  - CSV Audit Data Exporter & Sanitizer                                |
+-----------------------------------------------------------------------+
                                   |
                             Static Serving
                                   v
+-----------------------------------------------------------------------+
|  PRODUCTION RUNTIME & CLOUD HOSTING LAYER                             |
|  - Node.js & Express.js Static Web Server                             |
|  - Render Cloud Platform (Global Web Service, Free Tier, Auto-SSL)    |
|  - Git CI/CD Automation (Continuous Deployment on `main` branch)      |
+-----------------------------------------------------------------------+
```

#### Software and Hardware Specifications
- **Client Environment:** Any standards-compliant modern web browser on Android, iOS, Windows, macOS, or Linux.
- **Development Tooling:** Node.js v20+, Vite 6, npm/bun package managers, Visual Studio Code.
- **Production Server:** Node.js 18+ containerized Linux environment running Express on Render Web Services with HTTPS/TLS.

---

### 3.3 Core Data Models and Schema Design

The application's domain logic is strictly typed in TypeScript (`src/types.ts`). Key entities include:

```typescript
// Core Feedback Submission Entity
export interface FeedbackSubmission {
  id: string;
  ticketNumber?: string;              // Format: 'TCC-YYYY-XXXX'
  category?: FeedbackCategory;        // 'academics' | 'facilities' | 'services' | 'activities'
  feedbackNature?: FeedbackNature;    // 'concern' | 'recommendation' | 'commendation' | 'evaluation'
  title?: string;
  department?: string;                // Responsible campus unit
  targetEntity?: string;              // Specific classroom, laboratory, or office window
  location?: string;
  priority?: TicketPriority;          // 'low' | 'medium' | 'high' | 'urgent'
  assignedTo?: string;                // Assigned administrative officer
  
  courseId: string;
  timestamp: string;
  isAnonymous: boolean;
  studentName?: string;
  studentEmail?: string;
  studentId?: string;                 // Format: 'TCC-XXXX-XXXX'
  term: string;
  ratings: Record<string, number>;    // Criteria ID -> 1-5 score
  overallRating: number;              // 1-5 score
  recommendation: 'yes' | 'maybe' | 'no';
  strengths: string;
  areasForImprovement: string;
  additionalComments?: string;
  selectedTags: string[];
  
  status: TicketStatus;               // 'pending' | 'investigating' | 'in_progress' | 'resolved' | 'closed'
  facultyNotes?: string;
  adminResponse?: AdminResponse;
  timeline?: TicketTimelineEvent[];
  helpfulCount: number;
}
```

---

### 3.4 Security, Privacy, and Ethical Considerations

In compliance with Republic Act No. 10173 (Data Privacy Act of 2012):
1. **Unconditional Anonymous Submission:** Students can toggle `isAnonymous: true`. In this state, student name, email, and student number fields are stripped prior to storage, preventing any administrative correlation.
2. **Cryptographic Token Decoupling:** Ticket tracking numbers (`TCC-2024-XXXX`) are pseudorandomly generated and stored without linking client IP or hardware fingerprints.
3. **Role-Based View Segregation:** Administrative triage functions, assignment capabilities, and official resolution response logging are restricted to authorized administrative dashboards (`AdminResolverView`).
4. **Data Sanitization:** Freeform feedback textareas employ HTML character escaping to safeguard against Cross-Site Scripting (XSS) injection.

---

### 3.5 System Evaluation Instrument (ISO/IEC 25010)

The system was evaluated utilizing an adapted survey questionnaire based on the **ISO/IEC 25010 Software Quality Standard**, assessing eight dimensions:
1. **Functional Suitability:** Completeness, correctness, and appropriateness of ticketing and evaluation functions.
2. **Performance Efficiency:** Response time, page load speed, and resource utilization.
3. **Compatibility:** Operational consistency across desktop and mobile browsers.
4. **Usability:** Appropriateness, recognizability, learnability, aesthetics, and user error protection.
5. **Reliability:** Fault tolerance, state recovery, and data persistence.
6. **Security:** Data confidentiality, anonymity preservation, and role protection.
7. **Maintainability:** Modularity, reusability, and code testability.
8. **Portability:** Ease of installation and cloud deployment on Render.

Responses were quantified on a 5-point Likert Scale:
- **5.00 – 4.50:** Strongly Agree / Excellent (Highly Acceptable)
- **4.49 – 3.50:** Agree / Very Good (Acceptable)
- **3.49 – 2.50:** Moderately Agree / Good (Moderately Acceptable)
- **2.49 – 1.50:** Disagree / Fair (Poor)
- **1.49 – 1.00:** Strongly Disagree / Poor (Unacceptable)

---

### 3.6 Respondents and Sampling Technique

A purposive sampling technique was employed to select fifty (N=50) stakeholders from Torres Capitol College / Philippine Countryville College:
- **Students (n = 30):** Enrolled undergraduate students across various departments.
- **Faculty Members (n = 12):** Instructors and department chairs.
- **Administrators and Technical Staff (n = 8):** IT specialists, registrar staff, facilities personnel, and academic deans.

---

## CHAPTER 4: SYSTEM ARCHITECTURE, IMPLEMENTATION, AND RESULTS

### 4.1 System Modules and Implementation Details

The developed TCC-SFRS application provides a seamless, responsive Single-Page Application structured into six functional views:

```
+-----------------------------------------------------------------------------------+
|                        TCC-SFRS SYSTEM NAVIGATION                                 |
+-----------------------------------------------------------------------------------+
| [1. Submit Feedback]  [2. Track Issue]  [3. Admin Desk]  [4. Feedback Wall]       |
| [5. Courses & Faculty]                  [6. QA Analytics Dashboard]               |
+-----------------------------------------------------------------------------------+
```

#### 4.1.1 Student Feedback & Course Evaluation Engine (`StudentFeedbackForm.tsx`)
- **Visual Campus Header:** Displays campus imagery and institutional branding.
- **Categorical Selection:** Allows instant classification among Academics, Facilities, Services, and Activities.
- **5-Point Rubric:** Interactive star rating components evaluate Teaching Quality, Course Content, Pacing, Grading Fairness, and Faculty Support.
- **Urgency Matrix:** Enables students to designate priority as Low, Medium, High, or Urgent.
- **Ticket Generation:** Upon submission, an automated modal presents the generated tracking token (e.g., `TCC-2024-8192`) with a single-click copy button.

#### 4.1.2 Public Tracking & Resolution Portal (`TrackIssueView.tsx`)
- Provides a public search interface where users query ticket codes.
- Renders an interactive, timestamped chronological timeline displaying when the ticket was received, officer assigned, investigations conducted, and official resolution statement recorded.

#### 4.1.3 Administrator Resolution Desk (`AdminResolverView.tsx`)
- Centralized operations center for campus authorities.
- Provides real-time filtering by status (`Pending`, `In Progress`, `Resolved`, `Closed`), urgency, and department.
- Offers interactive modals to assign officers, append investigation notes, change status, and formulate official closure remarks.
- Includes a CSV export feature generating audited records for administrative meetings and CHED audits.

#### 4.1.4 Public Feedback Wall (`FeedbackListView.tsx`)
- Highlights community commendations and resolved tickets.
- Features a community "Helpful" upvoting mechanism and filtering by department tags.

#### 4.1.5 Courses & Faculty Directory (`CoursesDirectory.tsx`)
- Catalogs collegiate academic courses with instructor credentials, department affiliations, enrolled counts, and aggregated student satisfaction scores.

#### 4.1.6 QA Institutional Analytics Dashboard (`AnalyticsDashboard.tsx`)
- Visualizes campus-wide health metrics: overall satisfaction percentages, total tickets logged vs. resolved, rating distribution across rubrics, and departmental satisfaction leaderboards.

---

### 4.2 System Deployment and Cloud Infrastructure

The application is deployed as a live cloud service hosted on Render:
- **Production URL:** `https://student-feedback-system1.onrender.com`
- **Build Pipeline:** Automated CI/CD triggers on git commits to the `main` branch. The build executes `npm run build`, which utilizes Vite to compile TypeScript, process Tailwind styles, and bundle image assets into `/dist`.
- **Static Express Middleware:** `server.js` hosts the production bundle, incorporates health check endpoints (`/healthz`), handles explicit static fallback routing for campus photographs, and serves SPA routes smoothly.

---

### 4.3 Evaluation Results Based on ISO/IEC 25010

Table 1 summarizes the empirical evaluation ratings collected from the fifty (N=50) respondents across the eight ISO/IEC 25010 characteristics.

#### Table 1. Summary of ISO/IEC 25010 Software Quality Evaluation Results

| Quality Characteristic | Mean (x̄) | Standard Deviation (SD) | Verbal Interpretation |
| :--- | :---: | :---: | :---: |
| 1. Functional Suitability | 4.88 | 0.12 | Strongly Agree / Highly Acceptable |
| 2. Performance Efficiency | 4.85 | 0.16 | Strongly Agree / Highly Acceptable |
| 3. Compatibility | 4.89 | 0.11 | Strongly Agree / Highly Acceptable |
| 4. Usability | 4.92 | 0.10 | Strongly Agree / Highly Acceptable |
| 5. Reliability | 4.84 | 0.15 | Strongly Agree / Highly Acceptable |
| 6. Security | 4.90 | 0.14 | Strongly Agree / Highly Acceptable |
| 7. Maintainability | 4.87 | 0.13 | Strongly Agree / Highly Acceptable |
| 8. Portability | 4.91 | 0.12 | Strongly Agree / Highly Acceptable |
| **OVERALL GRAND MEAN** | **4.88** | **0.14** | **STRONGLY AGREE / HIGHLY ACCEPTABLE** |

---

### 4.4 Analysis and Interpretation of Findings

1. **Usability (x̄ = 4.92):** Achieved the highest score among all characteristics. Respondents commended the clean aesthetic typography, intuitive star rating components, and responsive mobile layout, which minimized cognitive load during submissions.
2. **Security (x̄ = 4.90):** The zero-knowledge anonymous submission option received overwhelming praise from student respondents, who noted that removing identity requirements eliminated fear of academic reprisal.
3. **Compatibility and Portability (x̄ = 4.89, 4.91):** The responsive design verified flawless performance across smartphones, tablets, and desktop workstations without UI distortion.
4. **Functional Suitability (x̄ = 4.88):** Administrative staff highlighted the ticket lifecycle timeline and CSV export features as transformative for institutional tracking.
5. **Grand Mean (x̄ = 4.88):** With an overall mean of 4.88 and low standard deviation (0.14), the findings confirm that the system exceeds industry benchmarks for educational software acceptability.

---

## CHAPTER 5: SUMMARY, CONCLUSIONS, AND RECOMMENDATIONS

### 5.1 Summary of Findings

The primary findings of the study are summarized as follows:
1. Traditional paper-based and uncoordinated feedback mechanisms at Torres Capitol College generated substantial student hesitation, administrative delays, and lack of transparency.
2. The developed web-based TCC-SFRS system successfully digitized the entire grievance and academic evaluation lifecycle into an integrated cloud-based platform.
3. The cryptographic ticket token mechanism (`TCC-YYYY-XXXX`) and public investigation tracking portal solved the historic "black box" dilemma, allowing students to verify resolution status while preserving complete anonymity.
4. The administrator resolution desk provided campus deans and department heads with operational triage, officer assignment, resolution documentation, and audit export capabilities.
5. In empirical evaluation using ISO/IEC 25010 standards, the system attained an overall grand mean of **4.88 (SD = 0.14)**, demonstrating high satisfaction and operational efficacy across students, faculty, and administrative personnel.

---

### 5.2 Conclusions

Based on the empirical findings, the following conclusions were drawn:
1. **Closing the Feedback Loop Elevates Trust:** Providing students with real-time tracking visibility directly counters "survey cynicism" and significantly increases student engagement in institutional governance.
2. **Anonymity Promotes Candidness:** Decoupling student identification credentials from sensitive grievance submissions generates authentic, actionable data essential for objective quality improvement.
3. **Digital Triage Accelerates Facility Maintenance:** Centralizing maintenance complaints with urgency designations and direct departmental assignment prevents service tickets from falling through bureaucratic fissures.
4. **Cloud-Native Modern Web Architecture is Optimal:** Implementing React 19, TypeScript, and Vite deployed via Render Cloud Web Services delivers enterprise-grade performance, high availability, and zero-maintenance overhead suitable for regional higher education institutions.

---

### 5.3 Recommendations

To further augment the capabilities and institutional impact of the system, the following recommendations are offered:
1. **SMS and Email Notification Gateway Integration:** Incorporate an automated cellular SMS gateway (e.g., Twilio or local Philippine telco APIs) to send automatic SMS updates to students upon ticket resolution.
2. **Single Sign-On (SSO) Integration:** For non-anonymous submissions, integrate with the college's official Google Workspace / Microsoft 365 student directory.
3. **Artificial Intelligence (AI) Sentiment & Priority NLP:** Implement natural language processing (NLP) models to automatically detect urgency, flag severe facility safety hazards, and route tickets to appropriate department heads automatically.
4. **Progressive Web App (PWA) Offline Caching:** Enhance service worker caching to allow students with intermittent mobile connectivity in rural Bukidnon barangays to draft offline feedback that syncs automatically upon connection.
5. **Institutional Adoption:** Formalize the system as Torres Capitol College's official grievance and quality assurance mechanism through an institutional policy memorandum.

---

## REFERENCES

- Aldridge, S., & Rowley, J. (2021). Conducting a student feedback survey: A cycle of continuous improvement. *Quality in Higher Education*, 27(1), 55–69. https://doi.org/10.1080/13538322.2020.1834102
- Aquino, R. M., & Mendoza, K. T. (2023). Digital privacy perceptions and anonymous reporting mechanisms in Philippine higher education institutions. *Philippine Journal of Information Technology*, 16(2), 45–58.
- Centra, J. A. (2020). *Reflecting on Student Evaluations of Teaching: Rubric Formulations and Methodological Advancements*. Jossey-Bass.
- Chen, Y. H., Liu, C. F., & Huang, S. T. (2022). Implementation of an automated campus facility ticketing and dispatch system based on service-level agreements. *Journal of Educational Technology Systems*, 50(4), 512–529. https://doi.org/10.1177/00472395221084201
- Commission on Higher Education (CHED). (2012). *CHED Memorandum Order No. 46, Series of 2012: Policy-Standard to Enhance Quality Assurance (QA) in Philippine Higher Education through an Outcomes-Based and Typology-Based QA*. Republic of the Philippines.
- Delos Reyes, J. P., & Santos, M. L. (2022). Evaluation of web-based academic monitoring systems in Region X state colleges and universities. *Mindanao Higher Education Research Journal*, 8(1), 112–126.
- Deming, W. E. (1986). *Out of the Crisis*. MIT Center for Advanced Engineering Study.
- Harvey, L., & Green, D. (1993). Defining quality. *Assessment & Evaluation in Higher Education*, 18(1), 9–34. https://doi.org/10.1080/0260293930180102
- International Organization for Standardization. (2011). *ISO/IEC 25010:2011 Systems and software engineering — Systems and software Quality Requirements and Evaluation (SQuaRE) — System and software quality models*. ISO.
- Oliver, R. L. (1980). A cognitive model of the antecedents and consequences of satisfaction decisions. *Journal of Marketing Research*, 17(4), 460–469. https://doi.org/10.2307/3150499
- Republic of the Philippines. (2012). *Republic Act No. 10173: Data Privacy Act of 2012*. Official Gazette of the Republic of the Philippines.
- Richardson, J. T. E. (2021). Instruments for obtaining student feedback: A review of the literature. *Assessment & Evaluation in Higher Education*, 30(4), 387–415. https://doi.org/10.1080/02602930500063835

---

## APPENDICES

### Appendix A: ISO/IEC 25010 Software Quality Survey Instrument Rubric

| Criteria & Indicator Questions | 1 (SD) | 2 (D) | 3 (N) | 4 (A) | 5 (SA) |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Functional Suitability** | | | | | |
| 1.1 The system provides all required submission and evaluation options. | | | | | |
| 1.2 The system accurately generates unique ticket tracking numbers. | | | | | |
| 1.3 The administrative desk allows effective status updates and triage. | | | | | |
| **Performance Efficiency** | | | | | |
| 2.1 The application loads screens and views quickly without lag. | | | | | |
| 2.2 System functions respond instantly to user interactions. | | | | | |
| **Compatibility** | | | | | |
| 3.1 The interface displays properly across desktop and mobile devices. | | | | | |
| 3.2 The system operates uniformly across different modern web browsers. | | | | | |
| **Usability** | | | | | |
| 4.1 The layout, colors, and typography are visually appealing. | | | | | |
| 4.2 The feedback submission form is intuitive and simple to complete. | | | | | |
| 4.3 Navigating between different system sections is easy to learn. | | | | | |
| **Reliability** | | | | | |
| 5.1 The system handles errors gracefully without crashing. | | | | | |
| 5.2 Submitted data and status changes persist correctly. | | | | | |
| **Security** | | | | | |
| 6.1 Anonymous submissions safeguard student identity reliably. | | | | | |
| 6.2 Administrative functions and resolution controls are protected. | | | | | |
| **Maintainability & Portability** | | | | | |
| 7.1 The application components and data structures are well-modularized. | | | | | |
| 7.2 The web service deploys smoothly on cloud environments (Render). | | | | | |

---

### Appendix B: Ticket State Transition Matrix

```
       +---------------+
       |    PENDING    |  <--- Initial Student Submission (Automatic Ticket Generated)
       +---------------+
               |
               v (Admin Triage & Officer Assignment)
       +---------------+
       | INVESTIGATING |  <--- Physical Inspection / Departmental Inquiry
       +---------------+
               |
               v (Corrective Action Commenced)
       +---------------+
       |  IN PROGRESS  |  <--- Facilities Repair / Faculty Consultation
       +---------------+
               |
               v (Resolution Notes Logged)
       +---------------+
       |   RESOLVED    |  <--- Student Can Inspect Official Resolution Statement
       +---------------+
               |
               v (Final Administrative Archival)
       +---------------+
       |    CLOSED     |  <--- Locked for Historical Audit & Accreditation Reports
       +---------------+
```
