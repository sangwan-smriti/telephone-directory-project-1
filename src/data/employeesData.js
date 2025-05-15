// Generate consistent dummy data for employees
const generateEmployees = (labId) => {
  const designations = [
    "Principal Scientist", 
    "Senior Scientist", 
    "Research Scientist", 
    "Technical Officer", 
    "Research Associate",
    "Lab Assistant",
    "Project Manager",
    "Administrative Officer",
    "Security Officer",
    "Technical Director"
  ];
  
  const cities = ["Delhi", "Mumbai", "Bangalore", "Hyderabad", "Chennai", "Pune", "Kolkata"];
  
  const generateRandomEmployee = (id, index) => {
    const firstName = ["Aakash", "Rahul", "Priya", "Neha", "Vikram", "Sunil", "Arun", "Deepak", "Kavita", "Ravi", 
                      "Amit", "Sanjay", "Meera", "Anjali", "Nitin", "Rajesh", "Pooja", "Vivek", "Shalini", "Kunal"][Math.floor(Math.random() * 20)];
    const lastName = ["Sharma", "Singh", "Patel", "Kumar", "Gupta", "Shah", "Reddy", "Joshi", "Verma", "Desai",
                     "Malhotra", "Kapoor", "Mahajan", "Agarwal", "Chatterjee", "Sethi", "Pillai", "Iyer", "Rao", "Chopra"][Math.floor(Math.random() * 20)];
    const designation = designations[Math.floor(Math.random() * designations.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    
    // Calculate join date based on index (more senior employees first)
    const currentDate = new Date();
    const joinDate = new Date(currentDate);
    joinDate.setFullYear(currentDate.getFullYear() - (20 - index));
    joinDate.setMonth(Math.floor(Math.random() * 12));
    joinDate.setDate(Math.floor(Math.random() * 28) + 1);
    
    const formattedJoinDate = joinDate.toLocaleDateString('en-GB');
    const yearsOfService = Math.floor((currentDate - joinDate) / (1000 * 60 * 60 * 24 * 365));
    
    return {
      id: id,
      name: `${firstName} ${lastName}`,
      designation: designation,
      address: `${Math.floor(Math.random() * 100) + 1}, ${["Sector", "Phase", "Block"][Math.floor(Math.random() * 3)]}-${Math.floor(Math.random() * 50) + 1}`,
      city: city,
      contact: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      joinDate: formattedJoinDate,
      servicePeriod: `${yearsOfService} years`,
      labId: labId
    };
  };
  
  const employees = [];
  for (let i = 1; i <= 10; i++) {
    employees.push(generateRandomEmployee((labId - 1) * 10 + i, i));
  }
  
  // Sort by years of service (descending)
  employees.sort((a, b) => {
    const aYears = parseInt(a.servicePeriod);
    const bYears = parseInt(b.servicePeriod);
    return bYears - aYears;
  });
  
  return employees;
};

// Create employees for all 20 labs
const allEmployees = [];
for (let labId = 1; labId <= 20; labId++) {
  const labEmployees = generateEmployees(labId);
  allEmployees.push(...labEmployees);
}

export default allEmployees;