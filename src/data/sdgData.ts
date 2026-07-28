import type { SDGGoal } from '../types/game';

export const SDG_DATA: SDGGoal[] = [
  {
    sdgNumber: 1,
    title: "No Poverty",
    color: "#E5243B",
    shortDesc: "End poverty in all its forms everywhere.",
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
    questions: [
      {
        id: "q1_1",
        question: "What is the primary target of SDG 1: No Poverty by the year 2030?",
        options: [
          "Ensure high-income salaries for corporate executives",
          "Eradicate extreme poverty for all people everywhere",
          "Double the cost of living worldwide",
          "Eliminate all public education funding"
        ],
        answerIndex: 1,
        explanation: "SDG 1 targets eradicating extreme poverty (people living on less than $2.15/day) worldwide by 2030."
      },
      {
        id: "q1_2",
        question: "Which of the following helps protect families from falling into poverty during emergencies?",
        options: [
          "Buying luxury sports cars",
          "Increasing plastic waste",
          "Social safety nets like health insurance & social security",
          "Relying on high-interest debt"
        ],
        answerIndex: 2,
        explanation: "Social protection systems provide essential safety nets during health crises or natural disasters."
      },
      {
        id: "q1_3",
        question: "Why does climate change make ending poverty more difficult?",
        options: [
          "Extreme weather destroys crops, homes, and livelihoods",
          "Climate change increases bank account savings",
          "It makes solar energy more expensive",
          "It eliminates all natural disasters"
        ],
        answerIndex: 0,
        explanation: "Floods, droughts, and storms hit vulnerable and low-income communities hardest."
      },
      {
        id: "q1_4",
        question: "Giving equal financial access and micro-loans to women entrepreneurs helps to...",
        options: [
          "Reduce local food production",
          "Close down small local markets",
          "Increase gender inequality",
          "Lift whole families and communities out of poverty"
        ],
        answerIndex: 3,
        explanation: "When women gain financial independence, they reinvest in their family's health and education."
      },
      {
        id: "q1_5",
        question: "What basic necessity is most essential for helping children break the cycle of poverty?",
        options: [
          "Having a smartphone at age two",
          "Access to free, quality education",
          "Living in a high-rise tower",
          "Wearing brand-name designer clothes"
        ],
        answerIndex: 1,
        explanation: "Education empowers youth with literacy and skills needed for decent, well-paying jobs."
      }
    ]
  },
  {
    sdgNumber: 2,
    title: "Zero Hunger",
    color: "#DDA63A",
    shortDesc: "End hunger, achieve food security and improved nutrition.",
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 0 0-10 10c0 4.5 3 8.3 7 9.5V14h-2v-2h2v-2h-2V8h2.2A4 4 0 0 1 12 4a4 4 0 0 1 2.8 4H17v2h-2v2h2v2h-2v7.5c4-1.2 7-5 7-9.5A10 10 0 0 0 12 2z"/></svg>`,
    questions: [
      {
        id: "q2_1",
        question: "What is the core goal of SDG 2: Zero Hunger?",
        options: [
          "Promote sugary fast-food diets globally",
          "Ban all family farming practices",
          "Ensure everyone has access to safe, nutritious food all year round",
          "Increase food price inflation"
        ],
        answerIndex: 2,
        explanation: "SDG 2 aims to end hunger and ensure all people have access to sufficient, healthy food."
      },
      {
        id: "q2_2",
        question: "What farming approach helps grow food without damaging natural soil and water?",
        options: [
          "Sustainable and regenerative agriculture",
          "Over-using synthetic chemical pesticides",
          "Clearing rainforests for monoculture crops",
          "Paving over fertile farmland with concrete"
        ],
        answerIndex: 0,
        explanation: "Sustainable farming practices protect soil health, conserve water, and boost crop resilience."
      },
      {
        id: "q2_3",
        question: "Approximately how much of all food produced globally is lost or wasted each year?",
        options: [
          "Less than 1 percent",
          "About one-third (approx. 30%)",
          "Exactly 90 percent",
          "Fifty percent of water crops"
        ],
        answerIndex: 1,
        explanation: "The UN FAO estimates that nearly 1/3 of global food is wasted between harvest and kitchen tables."
      },
      {
        id: "q2_4",
        question: "What can everyday households do to help reduce food waste?",
        options: [
          "Throw away fresh groceries every 2 days",
          "Buy triple the food needed for meals",
          "Avoid eating fresh fruits and vegetables",
          "Plan meals ahead and store leftover food properly"
        ],
        answerIndex: 3,
        explanation: "Simple habits like meal planning, composting, and eating leftovers prevent food waste."
      },
      {
        id: "q2_5",
        question: "Why is seed diversity important for global food security?",
        options: [
          "It makes all vegetables taste identical",
          "It protects crops against pests, plant diseases, and weather shifts",
          "It prevents farmers from planting crops",
          "It requires more artificial fertilizer"
        ],
        answerIndex: 1,
        explanation: "Preserving diverse seed varieties ensures farms can adapt to changing climate conditions."
      }
    ]
  },
  {
    sdgNumber: 3,
    title: "Good Health and Well-being",
    color: "#4C9F38",
    shortDesc: "Ensure healthy lives and promote well-being for all at all ages.",
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 9v6M9 12h6"/></svg>`,
    questions: [
      {
        id: "q3_1",
        question: "What does 'Universal Health Coverage' (UHC) mean under SDG 3?",
        options: [
          "Only city dwellers receive free hospital care",
          "Citizens must pay high cash fees before seeing a doctor",
          "All people receive necessary health services without financial hardship",
          "Medical care is limited to emergency surgery only"
        ],
        answerIndex: 2,
        explanation: "Universal Health Coverage guarantees access to essential care without bankrupting individuals."
      },
      {
        id: "q3_2",
        question: "Which public health measure has saved millions of children from preventable diseases?",
        options: [
          "Childhood vaccination and immunization programs",
          "Drinking carbonated soft drinks",
          "Staying indoors without sunlight",
          "Eating processed junk foods"
        ],
        answerIndex: 0,
        explanation: "Vaccines safely prevent deadly diseases like polio, measles, and diphtheria worldwide."
      },
      {
        id: "q3_3",
        question: "What is a major cause of global premature deaths linked to environmental health?",
        options: [
          "Drinking filtered spring water",
          "Air pollution from fossil fuels and smoke",
          "Exercising outdoors daily",
          "Eating fresh organic vegetables"
        ],
        answerIndex: 1,
        explanation: "Indoor and outdoor air pollution causes over 7 million premature deaths every year."
      },
      {
        id: "q3_4",
        question: "How does mental health awareness contribute to SDG 3?",
        options: [
          "It increases pharmaceutical prices",
          "It discourages physical activity",
          "It limits access to community support",
          "It promotes overall well-being and reduces stigma around seeking help"
        ],
        answerIndex: 3,
        explanation: "Mental health is an integral part of human well-being and quality of life at all ages."
      },
      {
        id: "q3_5",
        question: "What simple personal habit helps prevent the spread of infectious diseases?",
        options: [
          "Rubbing eyes after touching surfaces",
          "Washing hands regularly with clean water and soap",
          "Sharing unwashed eating utensils",
          "Avoiding all physical exercise"
        ],
        answerIndex: 1,
        explanation: "Handwashing with soap is one of the most effective ways to stop disease transmission."
      }
    ]
  },
  {
    sdgNumber: 4,
    title: "Quality Education",
    color: "#C5192D",
    shortDesc: "Ensure inclusive and equitable quality education for all.",
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
    questions: [
      {
        id: "q4_1",
        question: "What target does SDG 4 set for primary and secondary education by 2030?",
        options: [
          "Charge tuition fees for primary schools",
          "Ensure free, equitable, and quality schooling for all girls and boys",
          "Limit school attendance to boys only",
          "Abolish all secondary schools"
        ],
        answerIndex: 1,
        explanation: "Target 4.1 guarantees free, high-quality primary and secondary education for every child."
      },
      {
        id: "q4_2",
        question: "What does 'inclusive education' mean?",
        options: [
          "Education restricted only to high-income families",
          "Private tutoring for top-scoring students only",
          "Schools accessible to all learners regardless of gender, disability, or background",
          "Excluding rural students from universities"
        ],
        answerIndex: 2,
        explanation: "Inclusive education removes barriers so that every learner has equal access to learning."
      },
      {
        id: "q4_3",
        question: "Why is digital literacy important in modern education?",
        options: [
          "It enables students to access information, learn skills, and connect globally",
          "It forces children to play video games all day",
          "It replaces all teachers with automated robots",
          "It stops students from reading books"
        ],
        answerIndex: 0,
        explanation: "Digital literacy equips youth with technology skills essential for modern careers."
      },
      {
        id: "q4_4",
        question: "What facility is essential for keeping girls in school in developing regions?",
        options: [
          "Air-conditioned luxury lounges",
          "Personal tablet computers for infants",
          "Swimming pools on school campus",
          "Clean, safe, and separate sanitation facilities (toilets)"
        ],
        answerIndex: 3,
        explanation: "Decent toilets and clean water dramatically increase school attendance, especially for girls."
      },
      {
        id: "q4_5",
        question: "What does 'Lifelong Learning' mean?",
        options: [
          "Schooling that ends at age 12",
          "Continuous learning opportunities for people of all ages throughout their lives",
          "Learning only during university studies",
          "Studying only for mandatory exams"
        ],
        answerIndex: 1,
        explanation: "Lifelong learning empowers youth and adults to adapt and acquire new skills anytime."
      }
    ]
  },
  {
    sdgNumber: 5,
    title: "Gender Equality",
    color: "#FF3A21",
    shortDesc: "Achieve gender equality and empower all women and girls.",
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="6"/><path d="M12 15v7M9 19h6"/></svg>`,
    questions: [
      {
        id: "q5_1",
        question: "What is a central goal of SDG 5 regarding discrimination and violence?",
        options: [
          "End all forms of discrimination and harmful practices against women & girls",
          "Limit women from holding political office",
          "Pay women lower wages for equal work",
          "Restrict girls from attending high school"
        ],
        answerIndex: 0,
        explanation: "Target 5.1 & 5.2 aim to end all discrimination, violence, and harmful traditions against women."
      },
      {
        id: "q5_2",
        question: "What is 'unpaid care work', which women perform three times more than men?",
        options: [
          "Working as a corporate executive",
          "Cooking, cleaning, and caring for children or elders without pay",
          "Professional paid engineering",
          "Volunteering at a paid concert"
        ],
        answerIndex: 1,
        explanation: "Recognizing and sharing unpaid care work frees up time for women's education and careers."
      },
      {
        id: "q5_3",
        question: "Equal participation in political decision-making means...",
        options: [
          "Only men serving as political leaders",
          "Banning women from voting in elections",
          "Women having equal representation in parliaments, government, and boards",
          "Separate parliaments based on income"
        ],
        answerIndex: 2,
        explanation: "Equal representation leads to fairer policies that benefit the whole of society."
      },
      {
        id: "q5_4",
        question: "Giving women equal rights to land ownership and financial assets helps to...",
        options: [
          "Decrease economic growth",
          "Increase unemployment rates",
          "Limit community prosperity",
          "Boost agricultural output and reduce household poverty"
        ],
        answerIndex: 3,
        explanation: "When women own land and business assets, local economies grow faster and more sustainably."
      },
      {
        id: "q5_5",
        question: "Which tool is highlighted in Target 5.b to help empower women globally?",
        options: [
          "Single-use plastic packaging",
          "Information and Communication Technology (ICT & mobile devices)",
          "Fossil fuel powered generators",
          "Coal burning stoves"
        ],
        answerIndex: 1,
        explanation: "Access to internet and mobile technology opens up education, banking, and jobs for women."
      }
    ]
  },
  {
    sdgNumber: 6,
    title: "Clean Water and Sanitation",
    color: "#26BDE2",
    shortDesc: "Ensure availability and sustainable management of water for all.",
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`,
    questions: [
      {
        id: "q6_1",
        question: "What does SDG 6 target for drinking water by 2030?",
        options: [
          "Selling expensive bottled water in all cities",
          "Universal and equitable access to safe and affordable drinking water",
          "Restricting clean water to factories only",
          "Charging fees for river access"
        ],
        answerIndex: 1,
        explanation: "Clean drinking water is a fundamental human right essential for health and life."
      },
      {
        id: "q6_2",
        question: "Why is proper wastewater treatment important for towns and cities?",
        options: [
          "It makes water extra salty",
          "It increases chemical waste in lakes",
          "It removes harmful pollutants before water returns to rivers and oceans",
          "It evaporates all freshwater supplies"
        ],
        answerIndex: 2,
        explanation: "Treating wastewater prevents river pollution and enables safe water reuse for agriculture."
      },
      {
        id: "q6_3",
        question: "Which natural ecosystems act as natural water filters and reservoirs?",
        options: [
          "Wetlands, forests, lakes, and rivers",
          "Concrete parking lots",
          "Asphalt roadways",
          "Plastic landfills"
        ],
        answerIndex: 0,
        explanation: "Protecting wetlands and forests ensures clean, natural water filtration and flood protection."
      },
      {
        id: "q6_4",
        question: "What simple action saves gallons of clean water in daily home routines?",
        options: [
          "Leaving hoses running all afternoon",
          "Washing one shirt at a time in full laundry loads",
          "Taking hour-long showers daily",
          "Turning off the tap while brushing teeth"
        ],
        answerIndex: 3,
        explanation: "Turning off the tap while brushing teeth saves up to 8 gallons of clean water per day!"
      },
      {
        id: "q6_5",
        question: "What is 'water stress'?",
        options: [
          "When water freezes into ice in winter",
          "When demand for clean water exceeds the available natural supply",
          "When water boils at high temperatures",
          "When ocean waves grow very tall"
        ],
        answerIndex: 1,
        explanation: "Water stress occurs when clean water supplies are insufficient to meet community needs."
      }
    ]
  },
  {
    sdgNumber: 7,
    title: "Affordable and Clean Energy",
    color: "#FCC30B",
    shortDesc: "Ensure access to affordable, reliable, sustainable energy for all.",
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`,
    questions: [
      {
        id: "q7_1",
        question: "Which of the following is a clean, renewable energy source?",
        options: [
          "Coal burning power plants",
          "Solar, Wind, and Hydroelectric power",
          "Single-use diesel fuel",
          "Heavy crude oil combustion"
        ],
        answerIndex: 1,
        explanation: "Solar and wind generate clean electricity without emitting greenhouse gases during operation."
      },
      {
        id: "q7_2",
        question: "What does 'energy efficiency' mean?",
        options: [
          "Leaving lights turned on in empty rooms",
          "Using old inefficient incandescent lightbulbs",
          "Wasting electricity during peak hours",
          "Using less energy to perform the exact same task"
        ],
        answerIndex: 3,
        explanation: "Using energy-efficient technology (like LED lights) cuts energy waste and lowers carbon emissions."
      },
      {
        id: "q7_3",
        question: "Clean cooking solutions replace traditional indoor wood and charcoal stoves to prevent...",
        options: [
          "Harmful indoor air pollution and respiratory illnesses",
          "Excessive solar power generation",
          "Cold winter temperatures",
          "Outdoor garden growth"
        ],
        answerIndex: 0,
        explanation: "Clean cooking stoves prevent indoor smoke pollution, saving millions of lives annually."
      },
      {
        id: "q7_4",
        question: "Why are solar panels becoming popular worldwide for SDG 7?",
        options: [
          "Solar panels require coal to operate",
          "Solar energy works only at night",
          "Solar energy is abundant, clean, and increasingly affordable",
          "Solar panels emit smoke during daytime"
        ],
        answerIndex: 2,
        explanation: "Solar energy costs have fallen dramatically, making clean power accessible to millions."
      },
      {
        id: "q7_5",
        question: "How can individuals contribute to energy conservation at home?",
        options: [
          "Leaving air conditioning running with open windows",
          "Switching off unused lights and electronics",
          "Using incandescent bulbs instead of LEDs",
          "Keeping televisions turned on all night"
        ],
        answerIndex: 1,
        explanation: "Turning off unused appliances saves energy and reduces household electricity bills."
      }
    ]
  },
  {
    sdgNumber: 8,
    title: "Decent Work and Economic Growth",
    color: "#A21942",
    shortDesc: "Promote sustained, inclusive economic growth and decent work for all.",
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>`,
    questions: [
      {
        id: "q8_1",
        question: "What defines 'decent work' according to the UN International Labour Organization?",
        options: [
          "Working 18 hours daily without rest breaks",
          "Unpaid mandatory overtime work",
          "Fair pay, safe workplace conditions, and equal opportunities",
          "Jobs without health or safety protections"
        ],
        answerIndex: 2,
        explanation: "Decent work delivers fair income, workplace security, personal growth, and equal treatment."
      },
      {
        id: "q8_2",
        question: "Target 8.7 calls for immediate international action to eradicate...",
        options: [
          "Child labor, forced labor, and human trafficking",
          "Flexible working hours and remote work",
          "Workplace health and safety standards",
          "Minimum wage protection laws"
        ],
        answerIndex: 0,
        explanation: "SDG 8 targets ending child labor, modern slavery, and forced labor in all forms."
      },
      {
        id: "q8_3",
        question: "What does 'sustainable economic growth' protect against?",
        options: [
          "New job creation",
          "Environmental destruction and resource overexploitation",
          "Technological innovation",
          "Fair wages for workers"
        ],
        answerIndex: 1,
        explanation: "Sustainable growth increases human prosperity without destroying ecosystems or overusing resources."
      },
      {
        id: "q8_4",
        question: "How does supporting micro and small enterprises benefit local communities?",
        options: [
          "It increases corporate monopoly power",
          "It forces small shops to close down",
          "It reduces local employment",
          "It creates local jobs, fosters innovation, and strengthens local trade"
        ],
        answerIndex: 3,
        explanation: "Small businesses account for over 60% of employment in many developing nations."
      },
      {
        id: "q8_5",
        question: "Sustainable eco-tourism contributes to SDG 8 by...",
        options: [
          "Importing all goods and workers from abroad",
          "Creating jobs while protecting local culture and ecosystems",
          "Dumping plastic waste on coral reefs",
          "Privatizing public parks exclusively"
        ],
        answerIndex: 1,
        explanation: "Eco-tourism generates local livelihoods while preserving natural heritage and wildlife."
      }
    ]
  },
  {
    sdgNumber: 9,
    title: "Industry, Innovation and Infrastructure",
    color: "#FD6925",
    shortDesc: "Build resilient infrastructure, foster innovation and sustainable industry.",
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="8" rx="1"/><path d="M17 14v7M7 14v7M2 14h20"/></svg>`,
    questions: [
      {
        id: "q9_1",
        question: "Why is 'resilient infrastructure' (bridges, roads, internet, clean power) vital?",
        options: [
          "It requires constant rebuilding every few weeks",
          "It serves only high-income urban districts",
          "It withstands natural disasters and supports community livelihoods",
          "It uses non-recyclable materials"
        ],
        answerIndex: 2,
        explanation: "Resilient infrastructure keeps communities connected and functioning during extreme weather events."
      },
      {
        id: "q9_2",
        question: "How does affordable internet access empower small businesses in rural areas?",
        options: [
          "It connects them to customers, digital payments, and market information",
          "It forces them to close physical stores",
          "It increases electricity bills without benefits",
          "It restricts trade to local streets"
        ],
        answerIndex: 0,
        explanation: "Internet connectivity allows small entrepreneurs to reach global markets and grow."
      },
      {
        id: "q9_3",
        question: "What characterizes 'green manufacturing' under SDG 9?",
        options: [
          "Dumping industrial chemical waste in rivers",
          "Using clean energy, recycling materials, and cutting factory emissions",
          "Increasing air pollution from smoke stacks",
          "Using single-use plastic packaging exclusively"
        ],
        answerIndex: 1,
        explanation: "Green manufacturing upgrades industrial processes to be clean, energy-efficient, and sustainable."
      },
      {
        id: "q9_4",
        question: "Investments in scientific Research & Development (R&D) lead to...",
        options: [
          "A decrease in scientific knowledge",
          "Higher industrial waste output",
          "Fewer educational opportunities",
          "Breakthrough green technologies, medical treatments, and clean systems"
        ],
        answerIndex: 3,
        explanation: "R&D fosters innovation needed to solve climate, energy, and health challenges."
      },
      {
        id: "q9_5",
        question: "Why is public transportation infrastructure important for sustainable cities?",
        options: [
          "It cuts traffic congestion, air pollution, and carbon emissions",
          "It increases car traffic on roads",
          "It uses more fuel per passenger than individual cars",
          "It prevents people from commuting"
        ],
        answerIndex: 0,
        explanation: "Efficient public transit provides affordable mobility while slashing urban air pollution."
      }
    ]
  },
  {
    sdgNumber: 10,
    title: "Reduced Inequalities",
    color: "#DD1367",
    shortDesc: "Reduce inequality within and among countries.",
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 9h14M5 15h14"/></svg>`,
    questions: [
      {
        id: "q10_1",
        question: "What is a primary goal of SDG 10: Reduced Inequalities?",
        options: [
          "Increase economic gaps between rich and poor",
          "Ensure equal opportunity and reduce inequalities of outcome for all people",
          "Limit voting rights to property owners",
          "Tax low-income workers at higher rates"
        ],
        answerIndex: 1,
        explanation: "SDG 10 focuses on empowering marginalized groups and ensuring fair opportunities for everyone."
      },
      {
        id: "q10_2",
        question: "How do social safety nets and minimum wage laws help reduce inequality?",
        options: [
          "They increase unemployment rates",
          "They eliminate public healthcare funding",
          "They protect vulnerable families and ensure workers earn living wages",
          "They benefit only corporate monopolies"
        ],
        answerIndex: 2,
        explanation: "Fair wages and social protections help close the gap between income groups."
      },
      {
        id: "q10_3",
        question: "Eliminating discriminatory laws and practices ensures social inclusion for...",
        options: [
          "Everyone regardless of age, sex, disability, race, ethnicity, or religion",
          "Only high-income citizens",
          "Only government officials",
          "Only residents in capital cities"
        ],
        answerIndex: 0,
        explanation: "Target 10.2 ensures no one is excluded or discriminated against based on identity or background."
      },
      {
        id: "q10_4",
        question: "What are 'remittances' sent by migrant workers to their home families?",
        options: [
          "International trade fines",
          "Diplomatic import taxes",
          "Industrial equipment shipments",
          "Money sent home to support family food, housing, and schooling"
        ],
        answerIndex: 3,
        explanation: "Target 10.c aims to lower transfer costs of migrant worker remittances so families receive more."
      },
      {
        id: "q10_5",
        question: "Why is global cooperation important for reducing inequality between countries?",
        options: [
          "It prevents international travel",
          "It helps developing nations access trade, technology, and fair financing",
          "It increases foreign debt burdens",
          "It stops global scientific collaboration"
        ],
        answerIndex: 1,
        explanation: "International partnerships help poorer nations build infrastructure, healthcare, and schools."
      }
    ]
  },
  {
    sdgNumber: 11,
    title: "Sustainable Cities and Communities",
    color: "#FD9D24",
    shortDesc: "Make cities inclusive, safe, resilient and sustainable.",
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M5 21V7l8-4 8 4v14M9 18h6M9 14h6M9 10h6"/></svg>`,
    questions: [
      {
        id: "q11_1",
        question: "What is a major priority for SDG 11 regarding urban housing?",
        options: [
          "Demolish all affordable apartments",
          "Build exclusive gated mansions in public parks",
          "Ensure access to safe, affordable housing and basic services for all",
          "Ban public residential housing"
        ],
        answerIndex: 2,
        explanation: "SDG 11 targets safe, adequate, and affordable housing for all city residents."
      },
      {
        id: "q11_2",
        question: "Why are urban green spaces (parks, gardens, trees) essential in cities?",
        options: [
          "They cool urban air, clean pollution, and boost mental health",
          "They increase traffic congestion",
          "They block pedestrian walkways",
          "They replace public school buildings"
        ],
        answerIndex: 0,
        explanation: "City parks filter air pollution, lower temperatures during heatwaves, and provide recreational spaces."
      },
      {
        id: "q11_3",
        question: "How can cities reduce their environmental impact per person?",
        options: [
          "Dump untreated trash into rivers",
          "Improve municipal waste recycling and expand clean public transit",
          "Burn garbage openly in neighborhoods",
          "Remove all street trees and gardens"
        ],
        answerIndex: 1,
        explanation: "Recycling waste and using public transit significantly cuts municipal carbon footprints."
      },
      {
        id: "q11_4",
        question: "What does 'disaster-resilient city design' mean?",
        options: [
          "Building roads out of wood",
          "Removing emergency warning systems",
          "Constructing cities below sea level without dikes",
          "Buildings and drainage built to withstand floods, storms, and earthquakes"
        ],
        answerIndex: 3,
        explanation: "Resilient infrastructure protects urban lives and infrastructure during natural disasters."
      },
      {
        id: "q11_5",
        question: "Protecting cultural and natural heritage in cities includes preserving...",
        options: [
          "Historical sites, traditional architecture, and urban biodiversity",
          "Commercial billboard displays",
          "Landfill disposal sites",
          "High-speed highway interchanges"
        ],
        answerIndex: 0,
        explanation: "Target 11.4 focuses on safeguarding local history, arts, and cultural monuments for future generations."
      }
    ]
  },
  {
    sdgNumber: 12,
    title: "Responsible Consumption and Production",
    color: "#BF8B2E",
    shortDesc: "Ensure sustainable consumption and production patterns.",
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>`,
    questions: [
      {
        id: "q12_1",
        question: "What are the key 3 R's of responsible consumption?",
        options: [
          "Replace, Repurchase, and Remove",
          "Reduce, Reuse, and Recycle",
          "Refill, Reject, and Run",
          "Relocate, Rebuild, and Rent"
        ],
        answerIndex: 1,
        explanation: "Reducing consumption, reusing items, and recycling materials keeps waste out of landfills."
      },
      {
        id: "q12_2",
        question: "What is a 'Circular Economy'?",
        options: [
          "Buying new single-use plastic products daily",
          "Throwing away electronics after 6 months",
          "An economic model designed to eliminate waste by reusing & recycling materials indefinitely",
          "Incinerating all packaging in open fires"
        ],
        answerIndex: 2,
        explanation: "In a circular economy, products are designed from the start to be repaired, reused, or recycled."
      },
      {
        id: "q12_3",
        question: "How can consumers reduce single-use plastic waste?",
        options: [
          "Using reusable shopping bags, water bottles, and metal straws",
          "Buying bottled water for every meal",
          "Using disposable plastic cutlery daily",
          "Wrapping fruits in double plastic layers"
        ],
        answerIndex: 0,
        explanation: "Switching to durable reusable items drastically cuts ocean plastic pollution."
      },
      {
        id: "q12_4",
        question: "What target does SDG 12 set for global food waste by 2030?",
        options: [
          "Double the amount of food thrown away",
          "Export food waste to polar ice caps",
          "Stop grocery selling worldwide",
          "Halve per capita food waste at retail and consumer levels"
        ],
        answerIndex: 3,
        explanation: "Target 12.3 aims to halve global food waste to conserve land, water, and labor resources."
      },
      {
        id: "q12_5",
        question: "Why is proper disposal of electronic waste (e-waste) essential?",
        options: [
          "It makes computers run slower",
          "It recovers valuable metals and prevents toxic lead/mercury pollution",
          "It increases household trash volume",
          "It prevents phone battery charging"
        ],
        answerIndex: 1,
        explanation: "Recycling old phones and laptops reclaims gold, silver, and copper while keeping toxins out of soil."
      }
    ]
  },
  {
    sdgNumber: 13,
    title: "Climate Action",
    color: "#3F7E44",
    shortDesc: "Take urgent action to combat climate change and its impacts.",
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
    questions: [
      {
        id: "q13_1",
        question: "What is the main goal of SDG 13: Climate Action?",
        options: [
          "Conserve marine life in open oceans",
          "Take urgent action to combat climate change and cut global emissions",
          "Ensure clean drinking water in cities",
          "Promote international banking growth"
        ],
        answerIndex: 1,
        explanation: "SDG 13 focuses on climate mitigation, adaptation, renewable energy transition, and education."
      },
      {
        id: "q13_2",
        question: "What international treaty committed countries to limit global warming well below 2°C?",
        options: [
          "The Geneva Convention",
          "The Kyoto Protocol",
          "The Paris Agreement",
          "The Montreal Protocol"
        ],
        answerIndex: 2,
        explanation: "The Paris Agreement (2015) targets limiting global temperature rise to 1.5°C above pre-industrial levels."
      },
      {
        id: "q13_3",
        question: "What is the difference between climate 'mitigation' and 'adaptation'?",
        options: [
          "Mitigation reduces carbon emissions; Adaptation prepares for climate impacts",
          "Mitigation is for oceans; Adaptation is for forests",
          "Mitigation uses plastics; Adaptation uses metals",
          "There is no difference between them"
        ],
        answerIndex: 0,
        explanation: "Mitigation tackles causes (cutting carbon); Adaptation tackles effects (sea walls, drought crops)."
      },
      {
        id: "q13_4",
        question: "How do forests help combat climate change?",
        options: [
          "Trees emit greenhouse gases during daytime",
          "Forests increase global temperatures",
          "Trees prevent rainfall from reaching soil",
          "Trees absorb CO2 from the atmosphere and store it as carbon"
        ],
        answerIndex: 3,
        explanation: "Forests act as major natural carbon sinks, capturing billions of tons of atmospheric CO2."
      },
      {
        id: "q13_5",
        question: "What does reaching 'Net Zero' carbon emissions mean?",
        options: [
          "Balancing emissions created with an equal amount of carbon removed from air",
          "Cutting energy production to zero watts",
          "Banning all industrial manufacturing",
          "Planting one tree per continent"
        ],
        answerIndex: 0,
        explanation: "Net zero means any remaining carbon emissions are fully absorbed by natural sinks or technology."
      }
    ]
  },
  {
    sdgNumber: 14,
    title: "Life Below Water",
    color: "#0A97D9",
    shortDesc: "Conserve and sustainably use the oceans and marine resources.",
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-3 7-3 7 3 7 3-3 3-7 3-7-3-7-3Z"/><path d="M12 9v6"/></svg>`,
    questions: [
      {
        id: "q14_1",
        question: "What major pollutant in oceans does SDG 14 aim to significantly reduce?",
        options: [
          "Natural sea salt minerals",
          "Plastic waste and land-based marine debris",
          "Sunlight penetrating surface water",
          "Clean rainwater runoff"
        ],
        answerIndex: 1,
        explanation: "Target 14.1 targets stopping plastic trash and toxic nutrient pollution from washing into oceans."
      },
      {
        id: "q14_2",
        question: "What causes ocean acidification?",
        options: [
          "Oil spills from cargo ships",
          "Melting polar glaciers",
          "Oceans absorbing excess atmospheric carbon dioxide (CO2)",
          "Overfishing tuna populations"
        ],
        answerIndex: 2,
        explanation: "Oceans absorb 30% of human carbon emissions, turning water more acidic and harming coral & shellfish."
      },
      {
        id: "q14_3",
        question: "Why are coral reefs called the 'rainforests of the sea'?",
        options: [
          "They support 25% of all marine life despite covering under 1% of ocean floor",
          "Rain falls heavily over reef structures",
          "They are made of green underwater trees",
          "They produce fresh drinking water"
        ],
        answerIndex: 0,
        explanation: "Coral reefs provide essential nurseries for marine biodiversity and protect shorelines from storms."
      },
      {
        id: "q14_4",
        question: "What is overfishing?",
        options: [
          "Fishing with hand rods in lakes",
          "Recreational catch-and-release fishing",
          "Farming salmon in inland ponds",
          "Catching fish faster than fish populations can naturally reproduce"
        ],
        answerIndex: 3,
        explanation: "Overfishing depletes fish stocks, threatening ocean ecosystems and coastal community food supplies."
      },
      {
        id: "q14_5",
        question: "What are Marine Protected Areas (MPAs)?",
        options: [
          "Private ocean resorts for luxury yachts",
          "Ocean zones where human activity and fishing are regulated to conserve wildlife",
          "Offshore oil drilling sites",
          "Underwater military bases"
        ],
        answerIndex: 1,
        explanation: "MPAs safeguard critical marine habitats, allowing fish stocks and coral reefs to recover."
      }
    ]
  },
  {
    sdgNumber: 15,
    title: "Life on Land",
    color: "#56C02B",
    shortDesc: "Protect, restore and promote sustainable use of terrestrial ecosystems.",
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 2 7l10 5 10-5-10-5Z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/></svg>`,
    questions: [
      {
        id: "q15_1",
        question: "What is 'deforestation', which SDG 15 works to halt and reverse?",
        options: [
          "Planting young tree saplings in parks",
          "Pruning dead branches from garden trees",
          "Clearing and cutting down natural forests for non-forest land use",
          "Natural leaf fall during autumn"
        ],
        answerIndex: 2,
        explanation: "Deforestation destroys wildlife habitats, drives animal extinction, and releases stored carbon."
      },
      {
        id: "q15_2",
        question: "What is 'desertification'?",
        options: [
          "Land degradation in drylands resulting from climate variations and unsustainable farming",
          "Eating dessert after dinner",
          "Flooding coastal plains",
          "Building outdoor ice skating rinks"
        ],
        answerIndex: 0,
        explanation: "Target 15.3 targets combating desertification and restoring degraded soil affected by drought."
      },
      {
        id: "q15_3",
        question: "Why is biodiversity (variety of living plants and animals) vital for ecosystems?",
        options: [
          "It makes all animals look identical",
          "It maintains healthy food webs, pollinates crops, and keeps ecosystems stable",
          "It reduces forest growth",
          "It increases soil erosion"
        ],
        answerIndex: 1,
        explanation: "Biodiversity ensures nature can provide clean air, fertile soil, crop pollination, and medicines."
      },
      {
        id: "q15_4",
        question: "Why is poaching and illegal wildlife trade harmful?",
        options: [
          "It increases animal populations",
          "It protects national parks",
          "It cleans up wilderness hiking trails",
          "It pushes endangered species toward extinction and destabilizes ecosystems"
        ],
        answerIndex: 3,
        explanation: "Poaching threatens iconic wildlife like elephants, rhinos, and tigers, threatening biodiversity."
      },
      {
        id: "q15_5",
        question: "What simple action helps protect local biodiversity in backyard gardens?",
        options: [
          "Planting native flowers and trees that support local bees and birds",
          "Spraying heavy chemical weedkillers daily",
          "Paving over all lawn grass with asphalt",
          "Removing all flowering plants"
        ],
        answerIndex: 0,
        explanation: "Native plants provide food and shelter for local pollinators like bees, butterflies, and birds."
      }
    ]
  },
  {
    sdgNumber: 16,
    title: "Peace, Justice and Strong Institutions",
    color: "#00689D",
    shortDesc: "Promote peaceful societies, access to justice, and effective institutions.",
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 15 2 5-2-1-2 1 2-5Z"/><path d="M12 3v12"/><path d="m5 8 7-5 7 5"/></svg>`,
    questions: [
      {
        id: "q16_1",
        question: "What is a cornerstone principle of SDG 16 for ensuring a fair society?",
        options: [
          "Laws applied only to non-citizens",
          "The Rule of Law and equal access to justice for all citizens",
          "Secret trials without legal representation",
          "Changing public laws daily without notice"
        ],
        answerIndex: 1,
        explanation: "Target 16.3 promotes the rule of law and guarantees equal access to justice for everyone."
      },
      {
        id: "q16_2",
        question: "How does corruption and bribery harm sustainable development?",
        options: [
          "It builds faster railway lines",
          "It lowers tax rates for citizens",
          "It diverts public funds away from schools, hospitals, and infrastructure",
          "It increases government transparency"
        ],
        answerIndex: 2,
        explanation: "Corruption steals public resources meant for healthcare, clean water, and education."
      },
      {
        id: "q16_3",
        question: "Why is legal identity (such as birth registration) essential for every child?",
        options: [
          "It grants legal recognition to access healthcare, education, and voting rights",
          "It prevents children from traveling",
          "It increases social media followers",
          "It mandates early employment"
        ],
        answerIndex: 0,
        explanation: "Target 16.9 seeks to provide legal identity for all, including free birth registration."
      },
      {
        id: "q16_4",
        question: "Public access to accurate information and press freedom helps to...",
        options: [
          "Hide government spending receipts",
          "Restrict public town halls",
          "Increase administrative secrecy",
          "Hold institutions accountable and protect human rights"
        ],
        answerIndex: 3,
        explanation: "Target 16.10 protects freedom of information and fundamental human rights."
      },
      {
        id: "q16_5",
        question: "What defines an 'effective and transparent institution'?",
        options: [
          "An agency that operates in secret",
          "An institution that serves public interest fairly and publishes open reports",
          "A business that pays zero taxes",
          "A court that bans public attendance"
        ],
        answerIndex: 1,
        explanation: "Transparent institutions earn public trust by delivering reliable services and open budgets."
      }
    ]
  },
  {
    sdgNumber: 17,
    title: "Partnerships for the Goals",
    color: "#19486A",
    shortDesc: "Strengthen the global partnership for sustainable development.",
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    questions: [
      {
        id: "q17_1",
        question: "Why are cross-sector partnerships (Governments, Businesses, Communities) essential for SDGs?",
        options: [
          "Partnerships slow down project work",
          "No single group can achieve all 17 goals alone; sharing resources and expertise is key",
          "They eliminate national laws",
          "They increase commercial conflicts"
        ],
        answerIndex: 1,
        explanation: "SDG 17 recognizes that uniting governments, civil society, and businesses is required to solve global challenges."
      },
      {
        id: "q17_2",
        question: "How does technology sharing benefit developing nations?",
        options: [
          "It forces reliance on expensive imports",
          "It decreases local university research",
          "It accelerates adoption of green energy, digital health, and clean farming tools",
          "It halts domestic innovation"
        ],
        answerIndex: 2,
        explanation: "Sharing technology and knowledge allows communities to adopt green innovations rapidly."
      },
      {
        id: "q17_3",
        question: "Why is reliable data collection (Target 17.18) crucial for tracking SDG progress?",
        options: [
          "It creates extra paperwork without purpose",
          "It delays emergency health responses",
          "It replaces scientific research",
          "It helps governments identify marginalized groups and make smart policy decisions"
        ],
        answerIndex: 3,
        explanation: "Quality data ensures development programs reach the people who need support most."
      },
      {
        id: "q17_4",
        question: "What role can youth and volunteers play in SDG 17 partnerships?",
        options: [
          "Lead local sustainability projects, raise community awareness, and advocate action",
          "Wait for adults to solve all climate issues",
          "Avoid community volunteering",
          "Ignore local environmental causes"
        ],
        answerIndex: 0,
        explanation: "Youth action and community volunteering drive grassroots progress on all 17 goals."
      },
      {
        id: "q17_5",
        question: "What is the ultimate vision of the 17 UN Sustainable Development Goals?",
        options: [
          "Economic growth for wealthy nations only",
          "A peaceful, healthy, fair, and prosperous world for everyone by 2030",
          "Commercial space travel expansion",
          "Increasing fossil fuel mining globally"
        ],
        answerIndex: 1,
        explanation: "The 17 SDGs form a global blueprint to leave no one behind and protect our shared planet."
      }
    ]
  }
];

export const getSdgByNumber = (sdgNum: number): SDGGoal | undefined => {
  return SDG_DATA.find(s => s.sdgNumber === sdgNum);
};
