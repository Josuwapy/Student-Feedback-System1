# Torres Capitol College — Student Feedback & Resolution System

An institutional student feedback and quality assurance system designed for **Torres Capitol College (TCC)** / **Philippine Countryville College** ([philcountryville.com](https://philcountryville.com)), Sayre Highway, Panadtalan, Maramag, Bukidnon.

This application provides a multi-role platform for students, faculty members, and campus administrators to voice issues, evaluate academic courses, submit commendations and recommendations, track issue resolution lifecycle through transparent ticket codes, and analyze institutional metrics.

---

## 🌟 Key Features

### 1. Student Submission & Evaluation Engine
- **Multi-Category Feedback**: Submit concerns across Academics & Teaching, Campus Facilities, School Services, and Student Activities.
- **Feedback Nature**: Categorize submissions as *Issue/Concern*, *Recommendation*, *Commendation*, or *Evaluation Rating*.
- **Urgency & Priority**: Set priority levels (*Low*, *Medium*, *High*, *Urgent*).
- **Course Evaluation Rubric**: 5-point evaluation across pedagogical metrics (Instruction Clarity, Engagement, Fair Grading, Availability, Course Materials).
- **100% Anonymous or Identified**: Option to submit anonymously or include student credentials (`TCC-XXXX-XXXX`) for direct administrative follow-up.
- **Unique Ticket Generation**: Generates automated tracking codes (e.g., `TCC-2024-XXXX`).

### 2. Public Tracking Portal (`TrackIssueView`)
- Real-time ticket search and investigation timeline tracking.
- Inspection of administrative updates, assigned officers, and official resolution statements.

### 3. Administrator Resolution Desk (`AdminResolverView`)
- Centralized administrative dashboard with urgency filtering and status triage (*Pending Review*, *In Progress*, *Resolved*, *Closed*).
- Officer assignment, resolution note logging, and status transitions.
- CSV export for administrative records and institutional quality audits.

### 4. Curriculum & Course Directory (`CoursesDirectory`)
- Course catalog with instructor credentials, department affiliations, average student satisfaction ratings, and recommendation percentages.
- Quick shortcut to evaluate specific courses or inspect course analytics.

### 5. Quality Assurance & Analytics Dashboard (`AnalyticsDashboard`)
- Institutional satisfaction scores, departmental breakdown, rating distributions, and trend analysis.

### 6. Institutional Overview (`SchoolInfoView`)
- Official Torres Capitol College profile, vision, mission, academic departments, campus facilities, administrative contacts, and location map details.

---

## 🛠️ Tech Stack

- **Framework**: React 19 (TypeScript)
- **Bundler & Tooling**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Data Persistence**: Local storage with realistic institutional mock dataset

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/<your-username>/torres-capitol-college-feedback.git
   cd torres-capitol-college-feedback
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000`.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🌐 Deploy to Render (render.com)

This app is configured for instant deployment on [Render](https://render.com):

### Quick Method (Static Site — 100% Free):
1. Log in to [dashboard.render.com](https://dashboard.render.com).
2. Click **New +** > **Static Site**.
3. Connect your GitHub account and select your repository.
4. Set the following fields:
   - **Name**: `tcc-student-feedback` (or your choice)
   - **Branch**: `main`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
5. Under **Redirects/Rewrites**:
   - Add rule: `/*` -> `/index.html` (Rewrite)
6. Click **Create Static Site**.

Your application will be live in 1-2 minutes with a free HTTPS `.onrender.com` URL!

---

## 🏫 Institutional Profile

- **Institution**: Torres Capitol College / Philippine Countryville College
- **Website**: [philcountryville.com](https://philcountryville.com)
- **Campus Address**: Sayre Highway, Panadtalan, Maramag, Bukidnon, 8714, Philippines
- **Inquiries**: `philippinecountryvillecollege@gmail.com`
