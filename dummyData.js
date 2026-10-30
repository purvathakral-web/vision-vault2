// Local sample data for the college project. No external API is used.
export const hackathons = [
  { id: 1, name: 'Smart India Hackathon', mode: 'Hybrid', theme: 'Government Tech', date: '2026-12-12', dateText: '12 Dec 2026', registrationDeadline: '2026-11-20', location: 'Multiple Nodal Centres', teamSize: '6 members', organization: 'Government of India', status: 'Open', prize: 'Project prizes', registrations: 120, description: 'Build solutions for real-world problems.', registrationLink: 'https://www.sih.gov.in/' },
  { id: 2, name: 'HackNITR 6.0', mode: 'In-person', theme: 'Open Innovation', date: '2026-11-28', dateText: '28 Nov 2026', registrationDeadline: '2026-11-10', location: 'NIT Rourkela', teamSize: '4 members', organization: 'NIT Rourkela', status: 'Open', prize: 'Exciting prizes', registrations: 80, description: 'A student hackathon for creative projects.', registrationLink: 'https://hacknitr.com/' },
  { id: 3, name: 'ETHIndia', mode: 'Virtual', theme: 'Web3', date: '2026-12-05', dateText: '5 Dec 2026', registrationDeadline: '2026-11-15', location: 'Online', teamSize: '4 members', organization: 'ETHGlobal', status: 'Open', prize: 'Event prizes', registrations: 100, description: 'Build applications using Web3 technologies.', registrationLink: 'https://ethindia.co/' },
  { id: 4, name: 'HealthTech Sprint', mode: 'Virtual', theme: 'HealthTech', date: '2026-11-30', dateText: '30 Nov 2026', registrationDeadline: '2026-11-15', location: 'Online', teamSize: '3 members', organization: 'Vision Vault Demo', status: 'Open', prize: 'Certificates', registrations: 35, description: 'A sample hackathon focused on health technology.', registrationLink: '' },
  { id: 5, name: 'Design Jam Bangalore', mode: 'In-person', theme: 'UI/UX', date: '2026-11-22', dateText: '22 Nov 2026', registrationDeadline: '2026-11-05', location: 'Bengaluru', teamSize: '2 members', organization: 'Vision Vault Demo', status: 'Open', prize: 'Certificates', registrations: 25, description: 'A sample design challenge.', registrationLink: '' },
  { id: 6, name: 'AI for Bharat', mode: 'Hybrid', theme: 'AI/ML', date: '2027-01-15', dateText: '15 Jan 2027', registrationDeadline: '2026-12-20', location: 'Hyderabad + Online', teamSize: '4 members', organization: 'Vision Vault Demo', status: 'Open', prize: 'Certificates', registrations: 50, description: 'A sample AI/ML innovation challenge.', registrationLink: '' },
]

export const teammates = [
  { id: 1, name: 'Ananya R. (Demo)', skills: 'React, Solidity', role: 'Frontend developer', hackathonId: 3, college: 'Chitkara University', course: 'B.E. CSE', interests: 'Web3, open innovation', linkedin: '', email: 'ananya.demo@example.com' },
  { id: 2, name: 'Rohit K. (Demo)', skills: 'Python, Machine Learning', role: 'ML engineer', hackathonId: 6, college: 'Chitkara University', course: 'B.E. CSE (AI/ML)', interests: 'AI/ML, social impact', linkedin: '', email: 'rohit.demo@example.com' },
  { id: 3, name: 'Priya S. (Demo)', skills: 'Figma, UX research', role: 'UI/UX designer', hackathonId: 2, college: 'Demo Engineering College', course: 'B.Tech CSE', interests: 'Design, open innovation', linkedin: '', email: 'priya.demo@example.com' },
]

// Example internships shown on the page. Students can add their own too.
export const sampleInternships = [
  { id: 'sample-1', title: 'Frontend Developer Intern', company_name: 'DemoTech', candidate_required_location: 'Remote', job_type: 'Internship', publication_date: '2026-10-26', salary: 'Not specified', description: 'Build and improve user interfaces with HTML, CSS, JavaScript and React.', url: 'https://example.com/frontend-internship' },
  { id: 'sample-2', title: 'AI/ML Intern', company_name: 'FutureLabs', candidate_required_location: 'Hybrid', job_type: 'Internship', publication_date: '2026-10-25', salary: 'Not specified', description: 'Explore datasets and build beginner-friendly machine learning models.', url: 'https://example.com/aiml-internship' },
  { id: 'sample-3', title: 'Python Developer Intern', company_name: 'CodeWorks', candidate_required_location: 'Remote', job_type: 'Internship', publication_date: '2026-10-24', salary: 'Not specified', description: 'Write Python scripts, fix bugs and practise basic software development.', url: 'https://example.com/python-internship' },
  { id: 'sample-4', title: 'Data Analyst Intern', company_name: 'Insight Demo', candidate_required_location: 'Remote', job_type: 'Internship', publication_date: '2026-10-23', salary: 'Not specified', description: 'Clean sample datasets and prepare simple reports using spreadsheets and SQL.', url: 'https://example.com/data-analyst-internship' },
  { id: 'sample-5', title: 'Java Developer Intern', company_name: 'ByteBridge Demo', candidate_required_location: 'On-site', job_type: 'Internship', publication_date: '2026-10-22', salary: 'Not specified', description: 'Practise Java, object-oriented programming and debugging with a mentor.', url: 'https://example.com/java-internship' },
  { id: 'sample-6', title: 'Web Development Intern', company_name: 'PixelPath Demo', candidate_required_location: 'Hybrid', job_type: 'Internship', publication_date: '2026-10-21', salary: 'Not specified', description: 'Help create responsive pages and test common user flows.', url: 'https://example.com/web-development-internship' },
  { id: 'sample-7', title: 'UI/UX Design Intern', company_name: 'DesignNest Demo', candidate_required_location: 'Remote', job_type: 'Internship', publication_date: '2026-10-20', salary: 'Not specified', description: 'Create wireframes and improve sample app screens using design feedback.', url: 'https://example.com/ui-ux-internship' },
  { id: 'sample-8', title: 'Cybersecurity Intern', company_name: 'SecureStart Demo', candidate_required_location: 'On-site', job_type: 'Internship', publication_date: '2026-10-19', salary: 'Not specified', description: 'Learn security basics and review practice scenarios in a supervised lab.', url: 'https://example.com/cybersecurity-internship' },
  { id: 'sample-9', title: 'Cloud Support Intern', company_name: 'CloudSteps Demo', candidate_required_location: 'Hybrid', job_type: 'Internship', publication_date: '2026-10-18', salary: 'Not specified', description: 'Learn cloud fundamentals and document simple troubleshooting steps.', url: 'https://example.com/cloud-support-internship' },
  { id: 'sample-10', title: 'Software Testing Intern', company_name: 'QualityLab Demo', candidate_required_location: 'Remote', job_type: 'Internship', publication_date: '2026-10-17', salary: 'Not specified', description: 'Write basic test cases, report bugs and verify fixes in a demo project.', url: 'https://example.com/software-testing-internship' },
  { id: 'sample-11', title: 'Backend Developer Intern', company_name: 'ServerSide Demo', candidate_required_location: 'Hybrid', job_type: 'Internship', publication_date: '2026-10-16', salary: 'Not specified', description: 'Practise API concepts and server-side logic using sample tasks.', url: 'https://example.com/backend-internship' },
  { id: 'sample-12', title: 'Product Research Intern', company_name: 'LaunchPad Demo', candidate_required_location: 'Remote', job_type: 'Internship', publication_date: '2026-10-15', salary: 'Not specified', description: 'Research user needs and summarise findings for a sample product team.', url: 'https://example.com/product-research-internship' },
]

export const recentActivity = [
  { id: 1, text: 'Added a new deadline', time: '2 hours ago' },
  { id: 2, text: 'Registered interest in a hackathon', time: '1 day ago' },
]

export const defaultProfile = {
  name: 'Team Vision Vault', branch: 'CSE(AI-ML)', college: 'Chitkara University',
  bio: 'Learning React and building student projects.', skills: ['React', 'JavaScript', 'Python'],
  hackathonsDone: [], github: '', linkedin: '',
}
