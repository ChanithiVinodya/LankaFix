# LankaFix

## Project Title
**LankaFix – Report & Track Local Community Issues**

---

## Selected Problem

People in Sri Lanka regularly encounter local infrastructure problems — potholes and damaged roads, broken street lights, garbage dumping, water leaks, and other damaged public infrastructure — but there isn't always an easy way to report these issues or track whether they've been addressed. Affected groups include commuters, pedestrians, and residents of the local community, who currently have no simple, centralized way to flag a problem or follow up on its status.

---

## Proposed Solution

LankaFix is a simple web application that lets citizens **Report → Track → Manage** local community issues.

A user can:
- Select an issue category (e.g. Pothole, Streetlight, Garbage, Water Leak, Infrastructure)
- Enter the location and a description of the problem
- Submit the report and receive a unique Report ID
- Use that Report ID later to check the status of their report (Reported → In Progress → Resolved)
- Browse and search all reported issues in the community, and view simple stats showing overall impact

**Example flow:** A student sees a large pothole near their university → opens LankaFix → selects "Pothole" → enters location and description → submits → receives a Report ID → can track its status later.

---

## Main Features

1. **Report an Issue** — a validated form for submitting a new issue report, with a generated Report ID returned on success
2. **Track an Issue by ID** — look up a previously submitted report using its Report ID and see its current status
3. **Browse, Search & Filter Issues** — view all reported issues, search by title/location, and filter by category or status
4. **Stats Dashboard & Status Updates** — a summary panel showing issue counts by category/status, and a simple control to update an issue's status

---

## Technologies Used

- **Frontend:** React (Vite)
- **Backend:** Node.js + Express
- **Data storage:** JSON file-based storage
- **Deployment:** Frontend hosted on a static hosting platform Netlify; backend hosted on a Node-friendly platform Railway

---

## AI Tools Used

- **Claude** — used for project planning: dividing work among the four team members, defining the shared API contract and data model, designing the file/folder structure, and scaffolding the initial repository.
- **Antigravity (Gemini)** — used for implementation: generating and debugging the React and Node.js code for each member's feature.
- **ChatGPT** — used for early brainstorming of problem ideas and possible solution directions before settling on LankaFix.

Full details of individual prompts, their purpose, and how outputs were checked are recorded in the **AI Prompt Log** (included in the submission PDF, and each member's entries are added as they build their feature).

All AI-generated code was reviewed and tested by the team member responsible for that feature before being committed. No team member submitted code they could not explain.

---

## Team Members & Individual Contributions

| Name | Student ID | Feature Owned | Contribution |
|---|---|---|---|
| Bandara B.W.V.C.V. | IT24103956 | Report an Issue + Landing Page | Built the `POST /api/issues` endpoint with server-side validation, the Report form with client-side validation, the Landing page (problem explanation + CTAs), and the shared Navbar component. |
| Thevinya H.S.Y. | IT24104127 | Track an Issue by ID | Built the `GET /api/issues/:id` endpoint and the Track page, allowing users to look up a report by ID and view its current status. |
| Pathiraja P.M.H.A | IT24102716 | Browse, Search & Filter | Built the `GET /api/issues` endpoint (with search/filter query params) and the Browse page, including the responsive card grid layout. |
| Fernando Pulle I.S. | IT24103418 | Stats Dashboard & Status Updates | Built the `GET /api/stats` and `PATCH /api/issues/:id/status` endpoints, the Stats/Impact dashboard, the shared `IssueCard`/`StatusBadge` components, and seeded the sample data. |

Evidence of individual contribution is available via: Git commit history (each member committing to their own feature branch throughout the session), this README, and the team demonstration video where each member presents the feature they built.

---

## Installation Instructions

Clone the repository:
```bash
git clone https://github.com/ChanithiVinodya/LankaFix.git
cd LankaFix
```

Install backend dependencies:
```bash
cd backend
npm install
```

Install frontend dependencies:
```bash
cd ../frontend
npm install
```

Set up environment variables:
```bash
# In /backend, create a .env file:
PORT=5000

# In /frontend, create a .env file:
VITE_API_BASE_URL=http://localhost:5000
```

---

## Execution Instructions

Start the backend server (from `/backend`):
```bash
npm run dev
```
The API will run at `http://localhost:5000`.

Start the frontend (from `/frontend`, in a separate terminal):
```bash
npm run dev
```
The app will run at `http://localhost:5173` (or the port Vite assigns).

Open the frontend URL in your browser to use the application.

---

## Deployed Application Link

Front-End - https://lucky-starship-554e2c.netlify.app/
Back End - https://lankafix-fs4w-production.up.railway.app/

---

## Demonstration Video Link

> **Update:** The demonstration video link has been updated with public access enabled.

https://drive.google.com/file/d/1jj2MtUfrlGgcUrrRAvZxf2TnEFXhD0TZ/view?usp=sharing
 
---

## Repository Link

https://github.com/ChanithiVinodya/LankaFix
