# 🏥 CureConnect - Hospital Appointment Booking System

A modern, full-stack hospital appointment booking system built with Java Spring Boot and vanilla JavaScript. Book appointments with doctors in Udupi and Mangalore hospitals with a beautiful, responsive interface.

## 🌟 **Live Demo**
- **Frontend**: [https://your-username.github.io/cureconnect](https://your-username.github.io/cureconnect)
- **Backend API**: [https://cureconnect-backend.railway.app](https://cureconnect-backend.railway.app)

## ✨ **Features**

- 🎯 **Step-by-step booking wizard** - Easy 4-step appointment booking process
- 🏥 **Real hospital locations** - Udupi & Mangalore hospitals with actual addresses
- 👨‍⚕️ **Indian doctor names** - 10+ doctors with specializations and qualifications
- ⏰ **Time slot management** - 9 AM to 8 PM appointment slots
- 📱 **Responsive design** - Works perfectly on mobile and desktop
- 🎨 **Hospital theme** - Red & white medical theme with heart animations
- 📋 **Patient management** - Complete patient details with age calculation
- 💾 **Receipt download** - Downloadable appointment confirmation
- 🔍 **Doctor availability** - Real-time availability checking
- ⚡ **Real-time validation** - Instant form validation and error handling

## 🛠️ **Technology Stack**

### **Frontend**
- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with animations and gradients
- **Vanilla JavaScript** - ES6+ with async/await
- **Font Awesome** - Medical and UI icons
- **Responsive Design** - Mobile-first approach

### **Backend**
- **Java 17** - Modern Java features
- **Spring Boot 3.2.0** - REST API framework
- **Spring Data JPA** - Database ORM
- **H2 Database** - In-memory database for development
- **Maven** - Dependency management
- **Jackson** - JSON serialization

### **Architecture**
- **RESTful APIs** - Clean API design
- **MVC Pattern** - Separation of concerns
- **DTO Pattern** - Data transfer objects
- **Repository Pattern** - Data access abstraction

## 🏥 **Hospitals Available**

1. **Manipal Hospital Udupi** - Tiger Circle, Udupi, Karnataka
2. **KMC Hospital Mangalore** - Attavar, Mangalore, Karnataka
3. **Adarsh Hospital Udupi** - Court Road, Udupi, Karnataka
4. **Yenepoya Medical College Hospital** - Deralakatte, Mangalore, Karnataka
5. **Kasturba Medical College Hospital** - Lighthouse Hill, Mangalore, Karnataka
6. **Shree Devi Hospital Udupi** - Rajathadri, Udupi, Karnataka

## 👨‍⚕️ **Available Doctors**

- **Dr. Rajesh Sharma** - Cardiology (15 years experience)
- **Dr. Priya Patel** - Dermatology (12 years experience)
- **Dr. Amit Kumar** - Pediatrics (10 years experience)
- **Dr. Sunita Singh** - Orthopedics (18 years experience)
- **Dr. Vikram Gupta** - Neurology (14 years experience)
- **Dr. Kavita Reddy** - Gynecology (16 years experience)
- **Dr. Arjun Mehta** - Gastroenterology (13 years experience)
- **Dr. Deepika Joshi** - Ophthalmology (11 years experience)
- **Dr. Rohit Agarwal** - Urology (17 years experience)
- **Dr. Meera Nair** - Psychiatry (9 years experience)

## 🚀 **Quick Start**

### **Prerequisites**
- Java 17 or higher
- Maven 3.6+
- Modern web browser

### **Backend Setup**
```bash
# Clone the repository
git clone https://github.com/your-username/cureconnect.git
cd cureconnect

# Navigate to backend
cd backend

# Run the application
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### **Frontend Setup**
```bash
# Navigate to frontend
cd frontend

# Open in browser (or use a local server)
open index.html

# Or serve with Python
python3 -m http.server 3000
```

Access the frontend at `http://localhost:3000`

## 📡 **API Endpoints**

### **Patients**
- `GET /api/patients` - Get all patients
- `POST /api/patients` - Create new patient
- `GET /api/patients/{id}` - Get patient by ID

### **Doctors**
- `GET /api/doctors` - Get all doctors
- `POST /api/doctors` - Create new doctor
- `GET /api/doctors/specialization/{spec}` - Get doctors by specialization

### **Appointments**
- `GET /api/appointments` - Get all appointments
- `POST /api/appointments` - Book new appointment
- `GET /api/appointments/available-doctors` - Check doctor availability
- `PUT /api/appointments/{id}/status` - Update appointment status

## 🎯 **How to Use**

1. **Start Booking** - Click "Start Booking" on the homepage
2. **Select Date & Time** - Choose your preferred appointment slot
3. **Enter Details** - Fill in your personal information including DOB and gender
4. **Choose Hospital** - Select from 6 hospitals in Udupi & Mangalore
5. **Select Doctor** - Pick from 10+ specialized doctors
6. **Confirm Booking** - Review and confirm your appointment
7. **Download Receipt** - Get your appointment confirmation

## 🔧 **Development**

### **Project Structure**
```
cureconnect/
├── backend/                 # Spring Boot REST API
│   ├── src/main/java/
│   │   └── com/hospital/
│   │       ├── model/       # JPA Entities
│   │       ├── repository/  # Data Access Layer
│   │       ├── service/     # Business Logic
│   │       ├── controller/  # REST Controllers
│   │       └── dto/         # Data Transfer Objects
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
├── frontend/               # Vanilla JS Frontend
│   ├── index.html
│   ├── styles.css
│   └── script.js
└── README.md
```

### **Database Schema**
- **patients** - Patient information with demographics
- **doctors** - Doctor profiles with specializations
- **appointments** - Appointment bookings with status
- **medical_records** - Patient medical history

## 🌐 **Deployment**

### **Frontend (GitHub Pages)**
1. Push code to GitHub
2. Enable GitHub Pages in repository settings
3. Select source as main branch
4. Access at `https://username.github.io/repository-name`

### **Backend (Railway/Render)**
1. Connect GitHub repository
2. Select backend folder
3. Deploy with automatic builds
4. Update frontend API URL

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 **Author**

**Your Name**
- GitHub: [@your-username](https://github.com/your-username)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/your-profile)

## 🙏 **Acknowledgments**

- Font Awesome for beautiful icons
- Spring Boot team for the amazing framework
- All the hospitals in Udupi & Mangalore for inspiration

---

⭐ **Star this repository if you found it helpful!**