
#  SPICE WORLD - Wholesale Spice System

A real-world deployed web application designed for a client to manage their wholesale spice business. The system is branded as **SPICE WORLD** and built to optimize client management, order processing, invoicing, and customer interaction.


![Screenshot](https://raw.githubusercontent.com/AmjadAzward/Spice-World/main/Images/Screenshot%202025-06-18%20161107.png)

![Screenshot](https://raw.githubusercontent.com/AmjadAzward/Spice-World/main/Images/Screenshot%202025-06-18%20161121.png)

![Screenshot](https://raw.githubusercontent.com/AmjadAzward/Spice-World/main/Images/Screenshot%202025-06-18%20161139.png)

---

##  Features

-  Invoice generation with download option
-  Email notifications using **PHP Mailer**  
  - Used for **password recovery (Forgot Password)**  
  - Used for **inquiry response system**
-  Customer location access (for delivery optimization)
-  Admin and customer login system
-  User account creation, profile updates
-  Product listing, stock tracking, and order history
-  SEO-optimized for better search visibility
-  **Mobile-responsive interface**
-  Dashboard with order and client summaries

---

##  Tech Stack

- **Frontend**: HTML, CSS, JavaScript  
- **Backend**: PHP  
- **Database**: Oracle  
- **Email System**: PHP Mailer  
- **Location**: Google Maps API (Geolocation services)

---

##  Setup Instructions

###  Prerequisites

- [XAMPP](https://www.apachefriends.org/index.html) (or WAMP) for local PHP server  
- [Oracle Database](https://www.oracle.com/database/technologies/) with SQL Developer  
- [PHP Mailer](https://github.com/PHPMailer/PHPMailer)

---

1. **Clone or Download the Project**
   

2. **Place Files in Web Directory**

   * Move the project folder into:

     ```
     C:\xampp\htdocs\
     ```

3. **Start Services**

   * Open **XAMPP** and start **Apache**
   * Ensure **Oracle DB** is running and accessible

4. **Import the Database**

   * Use **Oracle SQL Developer** to run the provided `.sql` file (or create tables as per schema in your report)

5. **Configure Database and Mail**

   * In `config.php`, set your Oracle connection details:

     ```php
     $host = 'your_host';
     $port = 'your_port';
     $service_name = 'your_service_name';
     $username = 'your_db_username';
     $password = 'your_db_password';
     ```

   * In the PHP Mailer scripts, configure your SMTP:

     ```php
     $mail->Host = 'smtp.example.com';
     $mail->Username = 'your_email@example.com';
     $mail->Password = 'your_email_password';
     ```

6. **Access the Web App**
   Open your browser and navigate to:

   ```
   http://localhost/Wholesale-Spice-System/
   ```

---

##  Notes

* For **email functions**, ensure SMTP credentials are valid (use Gmail app passwords or enable access for less secure apps).
* Refer to the **project report** for complete hardware/software integration and logical flow descriptions.

---

##  License

Developed as a client project. Use is restricted to the intended client organization and not licensed for public redistribution.
