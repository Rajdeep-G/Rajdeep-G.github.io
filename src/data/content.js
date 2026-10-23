// All site content lives here. Edit this file to update the website.

export const profile = {
  name: 'Rajdeep Ghosh',
  role: 'Ph.D. Student · Computer Science & Engineering',
  affiliation: 'IIT Kharagpur',
  photo: '/images/profile.jpg',
  cv: '/files/Rajdeep_Ghosh_CV.pdf',
  emails: ['ghoshrajdeep2000@gmail.com', 'ghoshrajdeep200025@kgpian.iitkgp.ac.in'],
  interests: [
    'Usable Security',
    'Developer-centric Security',
    'Open-Source Supply Chains',
    'Location Privacy Norms',
    'SOHO & Firmware Security',
    'Software Vulnerabilities',
  ],
  address: [
    'Room 204, 1st Floor',
    'Department of Computer Science and Engineering',
    'IIT Kharagpur, West Bengal 721302',
  ],
  socials: {
    scholar: 'https://scholar.google.co.in/citations?user=uYNvlXoAAAAJ&hl=en',
    github: 'https://github.com/Rajdeep-G',
    linkedin: 'https://www.linkedin.com/in/ghoshrajdeep2000',
    x: 'https://x.com/Rajdeep57931085',
  },
}

export const advisor = { name: 'Mainack Mondal', url: 'https://cse.iitkgp.ac.in/~mainack/' }

export const news = [
  { date: 'June 2026', text: 'Our paper on kernel lock-in in SOHO devices accepted at USENIX Security 2026.' },
  { date: 'Feb 2026', text: 'Instructor for the AI & Big Data training program for Indian Statistical Service officers.(IITKGP & MoSPI)' },
  { date: 'Feb 2026', text: 'Invited to give a lightning talk at ACM India ARCS 2026, IIT Hyderabad.' },
  { date: 'Aug 2025', text: 'Presented our npm security issue reporting paper appeared at USENIX Security 2025.' },
  { date: 'July 2025', text: 'Received Google Travel Grant (USD 2,750) for attending USENIX Security 2025 at Seattle, WA.' }
  // { date: 'Jun 2025', text: 'Started my Ph.D. at IIT Kharagpur after completing my M.Tech (CGPA 9.76, Dept. rank 3).' },
]

export const education = [
  {
    degree: 'Ph.D. (JRF), Computer Science & Engineering',
    school: 'Indian Institute of Technology, Kharagpur',
    period: '2025 – present',
    details: ['Supervisor: Prof. Mainack Mondal', 'Broad area: Developer-centric Security'],
    current: true,
  },
  {
    degree: 'M.Tech, Computer Science & Engineering',
    school: 'Indian Institute of Technology, Kharagpur',
    period: '2023 – 2025',
    score: 'CGPA 9.76 / 10',
    badge: 'Dept. Rank 3',
    images: ['/images/convo_m_1.jpg', '/images/convo_m_2.jpg'],
    details: ['Thesis: Measuring vulnerabilities in NPM packages'],
  },
  {
    degree: 'B.Tech, Computer Science & Technology',
    school: 'Indian Institute of Engineering Science & Technology, Shibpur',
    period: '2019 – 2023',
    score: 'CGPA 9.29 / 10',
    images: ['/images/convo_b_1.jpg', '/images/convo_b_2.jpg', '/images/convo_b_3.jpg', '/images/convo_b_4.jpg'],
    details: ['Thesis: Detection of Cipher Types Using Machine Learning Techniques'],
  },
  {
    degree: 'Class XII (CBSE, PCM + CS)',
    school: 'DAV Model School, IIT Kharagpur',
    period: '2019',
    score: '95.2%',
  },
  {
    degree: 'Class X (CISCE)',
    school: 'Vidyasagar Shishu Niketan, Midnapur',
    period: '2017',
    score: '95.8%',
  },
]

export const awards = [
  { title: 'Organizing Committee, ACM ASIACCS 2026', note: 'Part of the team organizing ACM AsiaCCS 2026, hosted at Bangalore, INDIA', kind: 'service', image: '/images/asiaccs26.jpg' },
  { title: 'Poster presentation', note: 'Research Scholar Day, Dept of CSE, IITKGP', kind: 'poster', image: '/images/rsday26.jpg' },
  { title: 'Lightning talk, ACM India ARCS 2026', note: 'Invited speaker, IIT Hyderabad', kind: 'talk', image: '/images/arcs26.jpg' },
  { title: 'Graduate Forum poster, IndoML 2025', note: 'Invited presenter, BITS Hyderabad', kind: 'poster', image: '/images/indoml25.jpg' },
  { title: 'Google Research Travel Grant', note: 'Received $2,750 to attend USENIX Security 2025, Seattle & present my paper', kind: 'grant', image: '/images/usenix25.jpg' },
  {
    title: 'GATE CS 2023: AIR 156',
    note: 'Score 787',
    kind: 'rank',
    url: 'https://drive.google.com/file/d/1uHAMoFyOYcbE8NzS1D9dwD9nZgzxKKlK/view?usp=drive_link',
  },
  { title: 'WBJEE 2019: AIR 237', note: 'and JEE Main 2019: AIR 9967', kind: 'rank' },
  {
    title: 'JBNSTS Junior Scholar',
    note: '2017–18 session',
    kind: 'grant',
    url: 'https://drive.google.com/file/d/1b8An-hyBRE_MPox0lV5uVKitJtZh0bPp/view?usp=drive_link',
  },
]

export const experience = [
  {
    role: 'Research Intern',
    org: 'Technology Innovation Institute (TII), Abu Dhabi',
    mode: 'Remote',
    period: 'May 2022 – Jul 2022',
    mentor: 'Mentor: Dr. S. S. Pranesh',
    points: [
      'Studied the internals of coverage-guided fuzzers and set up the AFL fuzzer.',
      'Contributed to reducing redundant crash reports in Igor (crash deduplication through root-cause clustering).',
    ],
    tags: ['Fuzzing', 'AFL', 'Systems Security'],
  },
  {
    role: 'Frontend Web Developer (Freelance)',
    org: 'Menscript, Belgium',
    mode: 'Remote',
    period: 'Sep 2020 – Feb 2021',
    url: 'https://menscript.com/',
    points: [
      'Built a fully responsive product display page for the online store.',
      'Redesigned the front end of the entire website using Vue.js and Bootstrap.',
    ],
    tags: ['Vue.js', 'Bootstrap'],
  },
  // {
  //   role: 'Summer Intern',
  //   org: 'Hollyface Overseas Recruitment & Placement Pvt. Ltd.',
  //   mode: 'Remote',
  //   period: 'Jun 2020 – Aug 2020',
  //   url: 'https://hollyface.com/',
  //   points: [
  //     'Created a new website for the company.',
  //     'Managed databases and fixed deployment issues on the old website.',
  //   ],
  //   tags: ['Web Development', 'Databases'],
  // },
]

const niloy = { name: 'Prof. Niloy Ganguly', url: 'http://www.facweb.iitkgp.ac.in/~niloy/' }
const mainack = { name: 'Prof. Mainack Mondal', url: 'https://cse.iitkgp.ac.in/~mainack/' }

export const service = [
  { role: 'Artifact Evaluation Committee Member', venue: 'ACM CCS 2026 (B)' },
  { role: 'Artifact Evaluation Committee Member', venue: 'USENIX Security 2026' },
  { role: 'Organizing Committee', venue: 'ACM ASIACCS 2026' },
  { role: 'Web Chair', venue: 'ACM ARCS 2026' },
]

export const teaching = [
  {
    title: 'Computing Lab (CS9201)',
    period: ['Autumn 2024', 'Autumn 2026'],
    role: 'Teaching Assistant',
    people: [niloy, mainack],
    text: 'Mentored 80 students with six co-TAs on data structures, algorithms, linear programming and OS concepts (system calls, semaphores, processes, threads); evaluated assignments and tests.',
  }, {
    title: 'AI-Native Software Engineering',
    period: ['August - September 2026'],
    role: 'Teaching Assistant',
    text: 'Teaching assistant for the AI-Native Software Engineering program offered by IIT Kharagpur and upGrad.',
  },
  {
    title: 'Basics of AI-ML',
    period: ['June- July 2026'],
    role: 'Teaching Assistant',
    text: 'Teaching assistant for the Basics of AI-ML course offered by IIT Kharagpur and RKM.',
  },
  {
    title: 'B2B Training Programme on Big Data Analytics / AI-ML',
    period: ['May 2026'],
    role: 'Teaching Assistant',
    text: 'Training programme for NSSTA (MoSPI, Govt. of India) covering big data analytics and AI-ML. Taught Basics of Python and Statistics using Python.',
  },
  {
    title: 'Hands-on Session: Data Visualisation',
    period: ['November 2024', 'February 2026'],
    role: 'Teaching Assistant',
    text: 'Hands-on data visualisation sessions for NSSTA, conducted by IITKGP & MoSPI .',
  },
  {
    title: 'B2B Training Programme on Advanced AI-ML',
    period: ['January 2026', 'July 2026'],
    role: 'Teaching Assistant',
    text: 'Hands-on session for Walmart associates covering topics: LLM tokenisation and embeddings, Advanced NLP Techniques, Agentic workflows, conducted by AI4ICPS, IIT Kharagpur.',
  },
  {
    title: 'Design Lab (CS69202)',
    period: ['Spring 2024', 'Spring 2025'],
    role: 'Teaching Assistant',
    people: [niloy, mainack],
    text: 'Mentored 80 students with six co-TAs on ML, deep learning, SQL, NoSQL and Lex/Yacc through tutorials, doubt sessions and practice material; evaluated assignments and tests.',
  },
]

// `topics` drive the filter buttons on the Projects page; `tags` are shown on each card.
export const projects = [
  {
    title: 'Security Issue Reporting & Resolution in npm Packages',
    where: 'IIT Kharagpur',
    period: '2024 – present',
    status: 'Ongoing',
    text: 'A large-scale study of how security issues are reported and resolved in open-source ecosystems, analysing GitHub issues from npm packages. Built ML models to detect security-related issues beyond explicitly labelled reports and identified gaps in issue classification and resolution. Ongoing work develops assistance methods that help developers resolve security issues more effectively.',
    tags: ['Usable Security', 'Mining Software Repositories', 'ML'],
    topics: ['Software Security', 'Machine Learning'],
    links: [
      { label: 'Paper', url: 'https://www.usenix.org/conference/usenixsecurity25/presentation/ghosh' },
      { label: 'Dataset', url: 'https://zenodo.org/records/15614029' },
    ],
  },
  {
    title: 'ADA: Adaptive Data Assistant',
    where: 'IIT Kharagpur',
    period: '2025 – present',
    status: 'Ongoing',
    text: 'A user-centric privacy analysis system for Google My Activity logs that detects sensitive data exposure without any data leaving the device, evaluated through a user study and an interactive visualisation framework.',
    tags: ['Privacy', 'User Study', 'Visualisation'],
    topics: ['Privacy'],
  },
  {
    title: 'Kernel Lock-In and Supply Chain Security in SOHO Devices',
    where: 'IIT Kharagpur',
    period: '2025 – 2026',
    text: 'A large-scale security analysis of 306 SOHO devices across 900+ firmware versions, uncovering Linux kernel vulnerabilities and tracing their propagation through the hardware supply chain. Identified kernel lock-in as a systemic issue and evaluated regulatory, community and vendor-level mitigations.',
    tags: ['Firmware', 'Supply Chain', 'Linux Kernel'],
    topics: ['Software Security', 'Supply Chain'],
    links: [{ label: 'Dataset', url: 'https://zenodo.org/records/20433799' }],
  },
  {
    title: 'Measuring Vulnerabilities in npm Packages',
    where: 'M.Tech thesis, IIT Kharagpur',
    period: '2024 – 2025',
    text: 'A framework that automatically detects and analyses security vulnerabilities in npm packages by combining static analysis with GitHub metadata such as issue reporting and the roles of maintainers and the community, surfacing dependency-related risks and severity patterns to help developers prioritise fixes.',
    tags: ['Static Analysis', 'JavaScript', 'Vulnerabilities'],
    topics: ['Software Security', 'Supply Chain'],
  },
  {
    title: 'Detection of Cipher Types Using ML',
    where: 'B.Tech thesis, IIEST Shibpur',
    period: '2022 – 2023',
    text: 'A sequence-to-sequence model using CNNs and Transformers that identifies the cryptosystem behind a ciphertext, reaching 96.72% accuracy on a dataset of 130K samples.',
    tags: ['Deep Learning', 'Cryptography'],
    topics: ['Machine Learning'],
    links: [{ label: 'Paper', url: 'https://link.springer.com/chapter/10.1007/978-981-99-3734-9_25' }],
  },
]

// Set `me: true` on your own name so it is highlighted.
export const publications = [
  {
    title:
      'Anchors that Don’t Lift: Understanding Supply Chain Driven Kernel Lock-In and Governance-Mediated Mitigation Strategies in SOHO Devices',
    authors: ['Ritwik Badola', 'Rajdeep Ghosh', 'Ashita Gupta', 'Chester Rebeiro', 'Mainack Mondal'],
    venue: 'USENIX Security 2026',
    year: 2026,
    tier: 'CORE A*',
    // TODO: replace with the paper's USENIX presentation page and add an arXiv link once available.
    links: [
      { label: 'PDF', url: 'https://www.usenix.org/conference/usenixsecurity26/presentation/badola' },
      { label: 'arXiv', url: 'https://arxiv.org/abs/2606.11175' },
      { label: 'Dataset', url: 'https://zenodo.org/records/20433799' },
      { label: 'Poster', url: 'https://drive.google.com/file/d/154YNXdeY3aS9QpSdqhRNVvkNMjtxR6ud/view?usp=sharing' },
    ],
  },
  {
    title:
      '“I wasn’t sure if this is indeed a security risk”: Data-driven Understanding of Security Issue Reporting in GitHub Repositories of Open Source npm Packages',
    authors: ['Rajdeep Ghosh', 'Shiladitya De', 'Mainack Mondal'],
    venue: 'USENIX Security 2025',
    year: 2025,
    tier: 'CORE A*',
    links: [
      { label: 'PDF', url: 'https://www.usenix.org/conference/usenixsecurity25/presentation/ghosh' },
      { label: 'arXiv', url: 'https://arxiv.org/abs/2506.07728' },
      { label: 'Dataset', url: 'https://zenodo.org/records/15614029' },
      { label: 'Poster', url: 'https://drive.google.com/file/d/1Fip-n8za9jdynqGA1wPBuUuAeDuWAhO9/view?usp=sharing' },
    ],
  },
  {
    title: 'Detection of Cipher Types Using Machine Learning Techniques',
    authors: [
      'Abhiroop Mukherjee',
      'Arnab Sen',
      'Krishnendu Bera',
      'Rajdeep Ghosh',
      'Swarnali Mondal',
      'Sanjana Chakravarty',
      'Subinoy Sikdar',
      'Malay Kuley',
    ],
    venue: 'CIPR 2023',
    year: 2023,
    links: [{ label: 'PDF', url: 'https://link.springer.com/chapter/10.1007/978-981-99-3734-9_25' }],
  },
]
