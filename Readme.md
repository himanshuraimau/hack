# FreshTrack

FreshTrack is a real-time temperature and humidity monitoring system for cold chain logistics.

## Watch the Demo Video

[![Watch the Demo Video](https://via.placeholder.com/800x400?text=Click+to+Play+Demo+Video)](assets/video.webm)

> Click the image to view or download the video.

### **Key Components**  

#### **1. Authentication System**  
- **Custom Hook:** `useAuth.ts` for streamlined authentication.  
- **Token-Based Authentication:** Utilizes JWT for secure user sessions.  
- **Protected Access:** Safeguards routes and API endpoints.  

#### **2. Landing Page**  
- **Purpose:** Marketing-focused website.  
- **Features:**  
  - Hero section.  
  - Features showcase.  
  - Pricing plans.  
  - Responsive navigation for seamless access.  

#### **3. Dashboard**  
- **Purpose:** Main interface for device management.  
- **Features:**  
  - Device listing.  
  - Add/remove devices.  
  - Real-time status monitoring.  
  - Device-specific details.  

#### **4. Device Details Page**  
- **Purpose:** Detailed view for individual devices.  
- **Features:**  
  - Current temperature and humidity.  
  - Location data and product tracking.  
  - Last updated timestamp.  

#### **5. Analytics Page**  
- **Purpose:** Interactive data visualization.  
- **Features:**  
  - Temperature and humidity trends.  
  - Historical data visualization.  
  - Fallback mock data for demos.  

#### **6. Product Management**  
- **Purpose:** Track and manage temperature-sensitive products.  
- **Features:**  
  - Add/view products.  
  - Track product journey.  
  - Monitor expiry dates.  

---

### **Technical Stack**  

#### **Frontend**  
- **Framework:** Next.js 13+ with App Router.  
- **Language:** TypeScript.  
- **Styling:** TailwindCSS.  
- **Visualization:** Chart.js for charts.  
- **API Calls:** Axios.  

#### **UI Components**  
- **Custom Components:** Button, Dialog, Table.  
- **Features:** Responsive design, loading states, and error handling.  

#### **State Management**  
- **Tools:**  
  - React hooks.  
  - Jotai for global state.  
  - Local storage for persistence.  

#### **API Integration**  
- **Endpoints:** RESTful API.  
- **Features:**  
  - Real-time data fetching with polling.  
  - Error handling using toast notifications.  

---

### **Key Features**  
- Real-time temperature and humidity monitoring.  
- Historical data tracking.  
- Product management and expiry monitoring.  
- Device status tracking.  
- Interactive analytics with charts.  
- Responsive design for all devices.  
- Error handling and offline capabilities with mock data.  
- Robust user authentication system.  

---

**FreshTrack** provides businesses with a comprehensive solution to monitor and manage temperature-sensitive products throughout the supply chain, ensuring quality and compliance at every step.