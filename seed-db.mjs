import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const applicantsData = [
  {
    fullName: "Samuel Atef",
    phone: "+201205003144",
    email: "Sasashika14@gmail.com",
    jobTitle: "Engineering",
    platform: "fb",
    isOrganic: 0
  },
  {
    fullName: "Kareem Ibrahim Abdelhalim Kase",
    phone: "+201007351537",
    email: "k_kaseem@hotmail.com",
    jobTitle: "HVAC Maintenance Manager",
    platform: "ig",
    isOrganic: 0
  },
  {
    fullName: "Ahmed Refaie",
    phone: "+201283352319",
    email: "refaievitic_15@hotmail.com",
    jobTitle: "Sr Project Engineer",
    platform: "ig",
    isOrganic: 0
  },
  {
    fullName: "Amr",
    phone: "+201001283888",
    email: "amrelbnna@gmail.com",
    jobTitle: "Mechanical Engineer",
    platform: "ig",
    isOrganic: 0
  },
  {
    fullName: "Shreif Abid",
    phone: "+201117729505",
    email: "shryfabd66@gmail.com",
    jobTitle: "Refrigeration Technician",
    platform: "ig",
    isOrganic: 0
  },
  {
    fullName: "Mohamed Sameh",
    phone: "+201555672057",
    email: "Medosamo02@gmail.com",
    jobTitle: "Not Specified",
    platform: "ig",
    isOrganic: 0
  },
  {
    fullName: "محمد حسين أبو سريع",
    phone: "+201014849881",
    email: "engmechamohammed@gmail.com",
    jobTitle: "HVAC Maintenance Engineer",
    platform: "fb",
    isOrganic: 0
  },
  {
    fullName: "Abdelrahman Abdelbaset",
    phone: "+201090955362",
    email: "abdelrahmanabdelbaset1@gmail.com",
    jobTitle: "Mechanical Engineer",
    platform: "ig",
    isOrganic: 0
  },
  {
    fullName: "Ahmed S. Azab",
    phone: "+201158878148",
    email: "mech.ahmed.azab@gmail.com",
    jobTitle: "HVAC Design Engineer",
    platform: "ig",
    isOrganic: 0
  },
  {
    fullName: "Ahmed Magdy",
    phone: "+201111595592",
    email: "mego1591989@gmail.com",
    jobTitle: "Administrative Supervisor",
    platform: "organic",
    isOrganic: 1
  }
];

async function seedDatabase() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  
  try {
    console.log('Seeding database with applicant data...');
    
    for (const applicant of applicantsData) {
      const query = `
        INSERT INTO applicants (fullName, phone, email, jobTitle, platform, isOrganic, status)
        VALUES (?, ?, ?, ?, ?, ?, 'pending')
      `;
      
      await connection.execute(query, [
        applicant.fullName,
        applicant.phone,
        applicant.email,
        applicant.jobTitle,
        applicant.platform,
        applicant.isOrganic
      ]);
    }
    
    console.log('✓ Successfully seeded database with 10 applicants');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await connection.end();
  }
}

seedDatabase();
