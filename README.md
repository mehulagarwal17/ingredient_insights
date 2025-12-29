# 🔥 Tatva.ai - Ingredient Insights 🔥
<div align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Clerk-FF6B6B?style=for-the-badge&logo=clerk&logoColor=white" alt="Clerk" />
  <img src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white" alt="Django" />
</div>
<div align="center">
  <h3>🚀 Understand what you're eating with AI-powered ingredient analysis 🚀</h3>
  <p>Upload food labels, paste ingredients, and get instant nutrition insights with our cutting-edge AI technology</p>
</div>
---
## ✨ Features
### 🔥 Core Functionality
- **📸 Image Analysis**: Upload food label photos for instant ingredient extraction
- **📝 Text Input**: Paste ingredient lists directly for quick analysis
- **🤖 AI-Powered Insights**: Get detailed nutritional information and health recommendations
- **💬 Chat Interface**: Interactive conversations about your ingredients and nutrition
- **📊 History Tracking**: Keep track of all your previous analyses
### 🎨 Modern UI/UX
- **🌟 Animated Dots Background**: Stunning parallax effect with mouse interaction
- **💎 Glass-Morphism Design**: Modern translucent UI elements with backdrop blur
- **🌈 Neon Theme**: Cyberpunk-inspired cyan and blue gradients
- **📱 Fully Responsive**: Perfect experience on desktop, tablet, and mobile
- **🎯 Cylindrical Navbar**: Innovative floating navigation design
### 💰 Subscription System
- **💳 Flexible Pricing**: Starter ($9), Pro ($29), and Enterprise plans
- **🎁 Free Trial**: 14-day trial with no credit card required
- **📈 Tiered Features**: Progressive feature unlocking across plans
- **🏢 Enterprise Solutions**: Custom plans for teams and organizations
---
## 🛠️ Tech Stack
### Frontend
- **⚛️ Next.js 14** - React framework with App Router
- **📘 TypeScript** - Type-safe development
- **🎨 Tailwind CSS** - Utility-first styling
- **🔥 Clerk Authentication** - Secure user management
- **💫 Framer Motion** - Smooth animations
- **🎯 Lucide React** - Beautiful icon library
### Backend
- **🐍 Django** - Python web framework
- **🗄️ SQLite** - Database for chat sessions
- **🔌 Django REST Framework** - API development
- **🤖 AI Integration** - Advanced ingredient analysis
---
## 🚀 Quick Start
### Prerequisites
- Node.js 18+ 
- Python 3.8+
- npm or yarn
### Installation
1. **Clone the repository**
   ```bash
   git clone [https://github.com/mehulagarwal17/ingredient_insights.git](https://github.com/mehulagarwal17/ingredient_insights.git)
   cd ingredient_insights
Install frontend dependencies
bash
npm install
Setup backend
bash
cd chat_backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
Setup environment variables
bash
cp .env.example .env.local
# Add your Clerk API keys and other environment variables
Run the application
bash
npm run dev
Open your browser Navigate to http://localhost:3000
🎯 Usage
📸 Analyze Food Labels
Click "New Analysis"
Upload an image of your food label
Get instant AI-powered insights
📝 Input Ingredients
Click "New Analysis"
Paste your ingredient list
Receive detailed nutritional breakdown
💬 Chat with AI
After analysis, click "Continue Chat"
Ask follow-up questions about ingredients
Get personalized nutrition advice
💰 Upgrade Plan
Click the 💳 icon in navbar
Choose your perfect plan
Unlock advanced features
🏗️ Project Structure
ingredient_insights/
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/          # React components
│   │   ├── animated-dots-background.tsx
│   │   ├── subscription-page.tsx
│   │   ├── cylindrical-navbar.tsx
│   │   └── ...
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions
│   └── middleware.ts        # Next.js middleware
├── chat_backend/            # Django backend
│   ├── chatapp/             # Django app
│   └── manage.py
└── README.md
🎨 Design System
🌈 Color Palette
Primary: Cyan (#00FFFF) - Neon glow effects
Secondary: Blue (#0000FF) - Gradient accents
Background: Black (#000000) - Dark theme
Text: White (#FFFFFF) - High contrast
🎯 Typography
Headings: Modern sans-serif with gradient effects
Body: Clean, readable fonts
UI Elements: Consistent spacing and sizing
✨ Animations
Parallax Dots: Mouse-responsive background
Hover Effects: Smooth transitions on interactive elements
Loading States: Elegant skeleton screens
Micro-interactions: Button states and form feedback
🔧 Configuration
Environment Variables
env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
Django Settings
Configure database settings in chat_backend/chatbackend/settings.py
Update CORS settings for your domain
Set up AI API keys for ingredient analysis

🚀 Deployment
Frontend (Vercel)
bash
npm run build
vercel --prod
Backend (Heroku/DigitalOcean)
bash
# Deploy Django app
python manage.py collectstatic
gunicorn chatbackend.wsgi:application
🤝 Contributing
Fork the repository
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request
📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
