// Labs data with dummy but meaningful data
const labs = [
  {
    id: 1,
    name: "Centre for Airborne Systems (CABS)",
    city: "Bangalore",
    address: "Belur, Yemalur Post, Bangalore - 560037",
    phone: "080-25047000",
    head: "Dr. Anil Kumar Singh",
    description: "Developing advanced airborne early warning and control systems for the Indian Air Force.",
    image: "https://images.pexels.com/photos/4481324/pexels-photo-4481324.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 2,
    name: "Defence Research and Development Laboratory (DRDL)",
    city: "Hyderabad",
    address: "Kanchanbagh, Hyderabad - 500058",
    phone: "040-24342000",
    head: "Dr. Samir V. Kamat",
    description: "Premier laboratory for missile systems research and development.",
    image: "https://images.pexels.com/photos/2130611/pexels-photo-2130611.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 3,
    name: "Naval Physical and Oceanographic Laboratory (NPOL)",
    city: "Kochi",
    address: "Thrikkakara, Kochi - 682021",
    phone: "0484-2430290",
    head: "Dr. Vijay Sridhar",
    description: "Developing sonar systems and allied technologies for the Indian Navy.",
    image: "https://images.pexels.com/photos/2156881/pexels-photo-2156881.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 4,
    name: "Defence Electronics Research Laboratory (DLRL)",
    city: "Hyderabad",
    address: "Chandrayangutta, Hyderabad - 500005",
    phone: "040-24586200",
    head: "Dr. Amit Sharma",
    description: "Centre for electronic warfare systems and electronic intelligence.",
    image: "https://images.pexels.com/photos/3912981/pexels-photo-3912981.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 5,
    name: "Defence Metallurgical Research Laboratory (DMRL)",
    city: "Hyderabad",
    address: "Kanchanbagh, Hyderabad - 500058",
    phone: "040-24586401",
    head: "Dr. Shashank Chaturvedi",
    description: "Research in metallurgy and materials science for defence applications.",
    image: "https://images.pexels.com/photos/4482677/pexels-photo-4482677.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 6,
    name: "Armament Research and Development Establishment (ARDE)",
    city: "Pune",
    address: "Pashan, Pune - 411021",
    phone: "020-25865000",
    head: "Dr. Prashant Kumar",
    description: "Design and development of conventional armaments and related systems.",
    image: "https://images.pexels.com/photos/3862635/pexels-photo-3862635.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 7,
    name: "Defence Bioengineering and Electromedical Laboratory (DEBEL)",
    city: "Bangalore",
    address: "CV Raman Nagar, Bangalore - 560093",
    phone: "080-25280692",
    head: "Dr. Rajiv Kumar",
    description: "Life support systems for extreme environments and medical equipment.",
    image: "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 8,
    name: "Defence Laboratory (DL)",
    city: "Jodhpur",
    address: "Ratanada Palace, Jodhpur - 342011",
    phone: "0291-2510275",
    head: "Dr. Alok Shrivastava",
    description: "Research in desert warfare technologies and field solutions.",
    image: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 9,
    name: "Defence Research and Development Establishment (DRDE)",
    city: "Gwalior",
    address: "Jhansi Road, Gwalior - 474002",
    phone: "0751-2233012",
    head: "Dr. Manmohan Singh",
    description: "Research in chemical and biological defence technologies.",
    image: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 10,
    name: "Electronics and Radar Development Establishment (LRDE)",
    city: "Bangalore",
    address: "CV Raman Nagar, Bangalore - 560093",
    phone: "080-25254904",
    head: "Dr. Amit Gupta",
    description: "Development of radar systems and electronic warfare technologies.",
    image: "https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 11,
    name: "Gas Turbine Research Establishment (GTRE)",
    city: "Bangalore",
    address: "CV Raman Nagar, Bangalore - 560093",
    phone: "080-25241800",
    head: "Dr. Sanjay Kumar",
    description: "Development of gas turbine engines for military aircraft and UAVs.",
    image: "https://images.pexels.com/photos/3193815/pexels-photo-3193815.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 12,
    name: "High Energy Materials Research Laboratory (HEMRL)",
    city: "Pune",
    address: "Sutarwadi, Pune - 411021",
    phone: "020-25869301",
    head: "Dr. V. Natarajan",
    description: "Research in propellants, explosives, and pyrotechnic technologies.",
    image: "https://images.pexels.com/photos/2280568/pexels-photo-2280568.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 13,
    name: "Institute of Nuclear Medicine and Allied Sciences (INMAS)",
    city: "Delhi",
    address: "Timarpur, Delhi - 110054",
    phone: "011-23905139",
    head: "Dr. Tarun Sekhri",
    description: "Research in radiation sciences and applications in medicine.",
    image: "https://images.pexels.com/photos/4482445/pexels-photo-4482445.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 14,
    name: "Integrated Test Range (ITR)",
    city: "Chandipur",
    address: "Balasore, Odisha - 756025",
    phone: "06782-272144",
    head: "Dr. Binoy Kumar Das",
    description: "Testing and evaluation of missiles and weapon systems.",
    image: "https://images.pexels.com/photos/3822843/pexels-photo-3822843.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 15,
    name: "Snow and Avalanche Study Establishment (SASE)",
    city: "Chandigarh",
    address: "Sector 37, Chandigarh - 160036",
    phone: "0172-2699802",
    head: "Dr. Amreek Singh",
    description: "Research in snow and avalanche control for high-altitude operations.",
    image: "https://images.pexels.com/photos/773594/pexels-photo-773594.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 16,
    name: "Terminal Ballistics Research Laboratory (TBRL)",
    city: "Chandigarh",
    address: "Sector 30, Chandigarh - 160030",
    phone: "0172-2651824",
    head: "Dr. Manjit Singh",
    description: "Research in terminal ballistics, impact dynamics, and explosion mechanics.",
    image: "https://images.pexels.com/photos/3913025/pexels-photo-3913025.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 17,
    name: "Vehicle Research and Development Establishment (VRDE)",
    city: "Ahmednagar",
    address: "Vahannagar, Ahmednagar - 414006",
    phone: "0241-2373401",
    head: "Dr. Deepak Rao",
    description: "Research and development of military vehicles and associated technologies.",
    image: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 18,
    name: "Advanced Systems Laboratory (ASL)",
    city: "Hyderabad",
    address: "Kanchanbagh, Hyderabad - 500058",
    phone: "040-24347365",
    head: "Dr. Avinash Chander",
    description: "Development of missile systems and related technologies.",
    image: "https://images.pexels.com/photos/924676/pexels-photo-924676.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 19,
    name: "Aerial Delivery Research and Development Establishment (ADRDE)",
    city: "Agra",
    address: "Airforce Station, Agra - 282001",
    phone: "0562-2287275",
    head: "Dr. S.C. Sati",
    description: "Development of parachutes, floatation systems, and related equipment.",
    image: "https://images.pexels.com/photos/1087180/pexels-photo-1087180.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 20,
    name: "Defence Institute of Advanced Technology (DIAT)",
    city: "Pune",
    address: "Girinagar, Pune - 411025",
    phone: "020-24304025",
    head: "Dr. C.P. Ramanarayanan",
    description: "Academic and research institution offering defense technology education.",
    image: "https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=400"
  }
];

export default labs;