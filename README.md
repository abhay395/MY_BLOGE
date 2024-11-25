# MyBlog  

### Description  
**MyBlog** is a blogging platform where users can explore, create, and manage blogs. The project features a React.js frontend and a Node.js backend, deployed separately for scalability and efficiency.  

---

### Repository Structure  

```plaintext  
repo-name/  
├── client/        # React.js frontend application  
├── server/        # Node.js + Express.js backend application  
└── README.md      # Project documentation  
```  

---

### Features  
- **Create and Edit Blogs:** Users can create and update their blogs dynamically.  
- **Secure Authentication:** User authentication using JWT for secure access.  
- **Blog Management:** Manage blog content with options to delete or update.  
- **Responsive Design:** User-friendly layout for both mobile and desktop.  

---

### Tech Stack  

**Frontend (client):**  
- React.js  

**Backend (server):**  
- Node.js  
- Express.js  
- MongoDB (with Mongoose)  

**Tools:**  
- **Surge:** Frontend deployment.  
- **Vercel:** Backend deployment.  

---

### Setup  

1. **Clone the Repository:**  
   ```bash  
   git clone https://github.com/<your-username>/<repo-name>.git  
   cd repo-name  
   ```  

2. **Setup Backend (Server):**  
   ```bash  
   cd server  
   npm install  
   ```  
   - Add environment variables to a `.env` file in the **server** folder:  
     ```env  
     MONGO_URI=<your-mongodb-uri>  
     JWT_SECRET=<your-jwt-secret>  
     ```  
   - Start the server locally:  
     ```bash  
     npm start  
     ```  
   - **Deploy the Backend on Vercel:**  
     - Push the **server** code to GitHub.  
     - Connect the repository to **Vercel** and follow their deployment process.  
     - Note down the deployed backend URL (e.g., `https://your-backend.vercel.app`).  

3. **Setup Frontend (Client):**  
   ```bash  
   cd ../client  
   npm install  
   ```  
   - Update the API base URL in the React application to your backend URL (e.g., `https://your-backend.vercel.app`).  
   - Start the frontend locally:  
     ```bash  
     npm start  
     ```  
   - **Deploy the Frontend on Surge:**  
     - Build the project:  
       ```bash  
       npm run build  
       ```  
     - Deploy the project using Surge:  
       ```bash  
       surge ./build https://your-frontend.surge.sh  
       ```  

---

### Deployment  

| Part     | Platform   | URL                                   |  
|----------|------------|---------------------------------------|  
| Frontend | Surge      | [Frontend URL](https://your-frontend.surge.sh) |  
| Backend  | Vercel     | [Backend URL](https://your-backend.vercel.app) |  

---

### Future Enhancements  
- Add a comment system for blogs.  
- Enable user profile customization.  
- Implement blog categories and tags for better navigation.  

---

### Contributors  
- [Abhay](https://github.com/abhay395)  
---  
