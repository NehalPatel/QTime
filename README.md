# QTime

📝 **1. System Overview**
Goal: Real-time MCQ exam where:

- Questions shown on Projector Screen
- Students answer on Mobile Devices
- Leaderboard updates in Real-time
- Managed via Admin Panel

🗂 **2. System Modules**
### 2.1 Admin Panel (Management Backend)
✅ Login/Authentication (Admin only)

✅ Manage Exams (Create, Edit, Activate/Deactivate)

✅ Manage Questions (CRUD inside Exam)

✅ View Leaderboard

✅ Start/Stop Exam Control

✅ View Responses & Reports

### 2.2 Exam Server (Real-Time Backend with Socket.io)
✅ Exam Session Manager

- Broadcast question event every 30 sec
- Accept answers via submit_answer socket event
- Calculate and update scores

✅ Real-time Leaderboard Broadcaster

- Emit leaderboard_update event on score changes

✅ Socket Room Handling

- Each exam has its own socket room

✅ Prevent Cheating

- Only registered sockets can answer
- Server-side timer logic (no client timers)

### 2.3 Projector View (Question + Leaderboard Display)
✅ Displays Current Question

✅ Displays Real-Time Leaderboard

✅ No answering functionality

✅ Auto-sync with server via sockets

### 2.4 Student Mobile View (PWA)
✅ Register/Join Exam using code or student ID

✅ Answer MCQs within given time

✅ See Live Leaderboard (Optional toggle)

✅ Timer displayed (synced from server)

✅ Responsive for mobile

### 2.5 Database Models (MongoDB Suggested)
| Collection   | Fields                                                      |
|-------------|-------------------------------------------------------------|
| Exams       | name, active, questions[], total_marks                      |
| Questions   | text, options[A,B,C,D], correct_option, exam_id             |
| Students    | name, mobile, student_id                                    |
| Responses   | student_id, question_id, selected_option, is_correct, timestamp |
| Leaderboard | student_id, exam_id, total_score                            |

🛠 **3. Tech Stack Summary**
| Part      | Technology                        |
|-----------|-----------------------------------|
| Frontend  | React.js (Projector, Mobile, Admin Panel) |
| Backend   | Node.js + Express + Socket.io     |
| Database  | MongoDB                           |
| Deployment| VPS / Render / Railway            |
| Hosting   | Self-hosted (to avoid real-time cost issues) |

🔥 **4. Real-time Flow Example**
```
[Admin Clicks Start Exam] --> [Server Starts Timer]
[Server Sends Question #1] --> [Projector & Students Receive]
[Students Submit Answer] --> [Server Validates & Updates Score]
[Leaderboard Updated] --> [Everyone Receives Updated Board]
[Next Question After 30 sec] --> [Repeat]
```

🛑 **5. Challenges to Handle**
- Prevent double-answering
- Connection lost/rejoin logic
- Server-authoritative timers
- Live leaderboard without flicker
- Stress test with 100+ connections

✅ **6. Optional Add-ons (Future)**
- Multiple Exams Handling (Parallel)
- Question Randomization per user
- Mobile App Deployment (PWA or Flutter)
- Reports & Export to Excel
- Audio/Visual Alerts on Projector

🚀 **Next Step (As Discussed)**
I’ll prepare the Real-Time Exam Flow Prototype
Starting with:

✅ Socket.io Server Basic Setup

✅ React Frontend for Projector View

✅ React Mobile Client to Join Exam & Answer