import { meta, shopify, starbucks, tesla } from "../assets/images";
import {
    car,
    contact,
    css,
    estate,
    express,
    git,
    github,
    html,
    javascript,
    linkedin,
    mongodb,
    nextjs,
    nodejs,
    pricewise,
    react,
    redux,
    sass,
    snapgram,
    tailwindcss,
    threads,
    typescript
} from "../assets/icons";

export const skills = [
    {
        imageUrl: css,
        name: "CSS",
        type: "Frontend",
    },
    {
        imageUrl: express,
        name: "Express",
        type: "Backend",
    },
    {
        imageUrl: git,
        name: "Git",
        type: "Version Control",
    },
    {
        imageUrl: github,
        name: "GitHub",
        type: "Version Control",
    },
    {
        imageUrl: html,
        name: "HTML",
        type: "Frontend",
    },
    {
        imageUrl: javascript,
        name: "JavaScript",
        type: "Frontend",
    },
    {
        imageUrl: mongodb,
        name: "MongoDB",
        type: "Database",
    },
    {
        imageUrl: nextjs,
        name: "Next.js",
        type: "Frontend",
    },
    {
        imageUrl: nodejs,
        name: "Node.js",
        type: "Backend",
    },
    {
        imageUrl: react,
        name: "React",
        type: "Frontend",
    },
    {
        imageUrl: redux,
        name: "Redux",
        type: "State Management",
    },
    {
        imageUrl: sass,
        name: "Sass",
        type: "Frontend",
    },
    {
        imageUrl: tailwindcss,
        name: "Tailwind CSS",
        type: "Frontend",
    },
    {
        imageUrl: typescript,
        name: "TypeScript",
        type: "Frontend",
    }
];

export const experiences = [
    {
        title: "Data Engineer",
        icon: starbucks,
        iconBg: "#accbe1",
        points: [
            "Built automated ETL pipelines using Python and SQL to process and clean large datasets.",
            "Developed dashboards in Power BI/Tableau to visualize trends from raw data.",
            "Managed cloud databases (AWS RDS, BigQuery) and optimized query performance.",
            
        ],
    },
    {
        title: "System Designer",
        icon: tesla,
        iconBg: "#fbc3bc",
        points: [
            "Architected scalable system designs for web apps, including load balancers and database sharding.",
            "Selected technology stacks based on scalability, cost, and security requirements",
            "Created technical documentation and flow diagrams for API-driven microservices.",
        ],
    },
    {
        title: "Web Developer",
        icon: shopify,
        iconBg: "#b7e4c7",
        points: [
            "Developing and maintaining web applications using React.js and other related technologies.",
            "Implementing responsive design and ensuring cross-browser compatibility.",
            "Participating in code reviews and providing constructive feedback to other developers.",
        ],
    },
    {
        title: "Blockchain Developer",
        icon: meta,
        iconBg: "#a2d2ff",
        points: [
            "Implemented IPFS for decentralized storage and optimized gas usage on contracts.",
            "Built full-stack dApps using React and ethers.js integrated with MetaMask.",
            "Designed and deployed smart contracts (Solidity) for NFT marketplaces and token sales.",
        ],
    },
];

export const socialLinks = [
    {
        name: 'Contact',
        iconUrl: contact,
        link: '/contact',
    },
    {
        name: 'GitHub',
        iconUrl: github,
        link: 'https://github.com/dinushkam',
    },
    {
        name: 'LinkedIn',
        iconUrl: linkedin,
        link: 'https://www.linkedin.com/in/dinushka-malshan-3b8521292',
    }
];

export const projects = [
    {
        iconUrl: pricewise,
        theme: 'btn-back-red',
        name: 'customer segmentation Analyzer',
        description: 'Developed a web application that tracks customer behavior and their Life Time Value (LTV) to inform marketing strategies.',
        link: 'https://github.com/dinushkam/customer_segmentation_retention.git',
    },
    {
        iconUrl: threads,
        theme: 'btn-back-green',
        name: 'Flight-tracking-System',
        description: 'Created a full-stack application for tracking flight statuses and delays.',
        link: 'https://github.com/dinushkam/Flight-tracking-System.git',
    },
    {
        iconUrl: car,
        theme: 'btn-back-blue',
        name: 'Human Resource Management System',
        description: 'Designed and built a application using c# for managing employee records, attendance, and payroll processing.',
        link: 'https://github.com/dinushkam/AdvancedHRMS.git',
    },
    {
        iconUrl: snapgram,
        theme: 'btn-back-pink',
        name: 'Blockchain-based Voting System',
        description: 'Built a complete web application that utilizes blockchain technology to ensure secure and transparent voting processes.Collabarated with a team to design the user interface and implement smart contracts for vote recording and verification.',
        link: 'https://github.com/prasindu/myDAPP.git',
    },
    {
        iconUrl: estate,
        theme: 'btn-back-black',
        name: 'Social Media Application',
        description: 'Developed a  social media web application using spring boot. Collabarate with a team.',
        link: 'https://github.com/prasindu/social-media-app.git',
    },
    /*
    {
        iconUrl: summiz,
        theme: 'btn-back-yellow',
        name: 'AI Summarizer Application',
        description: 'App that leverages AI to automatically generate concise & informative summaries from lengthy text content, or blogs.',
        link: 'https://github.com/adrianhajdin/project_ai_summarizer',
    }
        */
];

export const Certificates = [
  {
    title: "Blockchain Basics certification",
    org: "Cyfrin Updraft",
    year: "2025",
    id: "4C1ZGV1318LX",
    pdfUrl: "/certificates/BC.png",
    tag: "Gold",
  },
  {
    title: "Information Security Certificate",
    org: "FreeCodeCamp",
    year: "2025",
    id: "FCC-INFOSEC-2025",
    pdfUrl: "/certificates/IS.png",
    tag: "Ocean",
  },
];