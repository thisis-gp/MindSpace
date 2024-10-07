import {
  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  benefitIcon4,
  benefitImage2,
  chromecast,
  disc02,
  discordBlack,
  facebook,
  file02,
  homeSmile,
  instagram,
  notification2,
  notification3,
  notification4,
  plusSquare,
  recording01,
  recording03,
  roadmap1,
  roadmap2,
  roadmap3,
  roadmap4,
  searchMd,
  sliders04,
  telegram,
  twitter,
  yourlogo,
  tycl,
} from "../assets";

export const navigation = [
  {
    id: "0",
    title: "Features",
    url: "#features",
  },
  {
    id: "1",
    title: "Pricing",
    url: "#pricing",
  },
  {
    id: "2",
    title: "How to use",
    url: "#how-to-use",
  },
  {
    id: "3",
    title: "Roadmap",
    url: "#roadmap",
  },
  {
    id: "4",
    title: "New account",
    url: "#signup",
    onlyMobile: true,
  },
  {
    id: "5",
    title: "Sign in",
    url: "/login",
    onlyMobile: true,
  },
];

export const heroIcons = [homeSmile, file02, searchMd, plusSquare];

export const notificationImages = [notification4, notification3, notification2];

export const companyLogos = [yourlogo, tycl, yourlogo, tycl, yourlogo];

export const brainwaveServices = [
  "Photo generating",
  "Photo enhance",
  "Seamless Integration",
];

export const brainwaveServicesIcons = [
  recording03,
  recording01,
  disc02,
  chromecast,
  sliders04,
];

export const roadmap = [
  {
    id: "0",
    title: "AI-Powered Chat",
    text: "Enabling students to communicate with AI for emotional and mental health support in a conversational manner.",
    date: "May 2023",
    status: "done",
    imageUrl: roadmap1,
    colorful: true,
  },
  {
    id: "1",
    title: "Mood Tracking",
    text: "Introducing mood tracking functionality to allow users to track their emotional states over time.",
    date: "June 2023",
    status: "progress",
    imageUrl: roadmap2,
  },
  {
    id: "2",
    title: "Personalized Guidance",
    text: "Providing students with personalized mental health guidance based on their interactions and mood.",
    date: "August 2023",
    status: "done",
    imageUrl: roadmap3,
  },
  {
    id: "3",
    title: "Resource Integration",
    text: "Integrating with external mental health resources, offering links to professional help and additional reading.",
    date: "November 2023",
    status: "progress",
    imageUrl: roadmap4,
  },
];

export const collabText =
  "MindSpace is dedicated to providing seamless, AI-driven support to help students navigate their mental health journey.";

export const collabContent = [
  {
    id: "0",
    title: "AI Emotional Support",
    text: collabText,
  },
  {
    id: "1",
    title: "Personalized Insights",
  },
  {
    id: "2",
    title: "Seamless Integration with Resources",
  },
];

export const pricing = [
  {
    id: "0",
    title: "Student",
    description: "Basic AI support, emotional health tracking",
    price: "Free",
    features: [
      "AI-powered emotional support",
      "Mood tracking and journaling",
      "Access to basic mental health resources",
    ],
  },
  {
    id: "1",
    title: "Premium",
    description: "Advanced support, personalized guidance",
    price: "499",
    features: [
      "Personalized emotional health insights",
      "Access to premium resources",
      "Priority support from mental health experts",
    ],
  },
  {
    id: "2",
    title: "Institutional",
    description: "Custom AI integration, advanced analytics",
    price: null,
    features: [
      "Custom AI chatbot for institutions",
      "Advanced emotional health analytics for staff",
      "Tailored mental health resources",
    ],
  },
];

export const benefits = [
  {
    id: "1",
    title: "24/7 Support",
    text: "Receive round-the-clock support for your emotional health needs.",
    backgroundUrl: "./src/assets/benefits/card-4.svg",
    iconUrl: benefitIcon4,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "2",
    title: "Track Your Emotions",
    text: "Track your emotions over time and gain insights into your mental health.",
    backgroundUrl: "./src/assets/benefits/card-5.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
  },
  {
    id: "3",
    title: "Accessible Anywhere",
    text: "Access your AI-powered emotional support anytime, anywhere.",
    backgroundUrl: "./src/assets/benefits/card-6.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
  },
];

export const socials = [
  {
    id: "0",
    title: "Discord",
    iconUrl: discordBlack,
    url: "#",
  },
  {
    id: "1",
    title: "Twitter",
    iconUrl: twitter,
    url: "#",
  },
  {
    id: "2",
    title: "Instagram",
    iconUrl: instagram,
    url: "#",
  },
  {
    id: "3",
    title: "Telegram",
    iconUrl: telegram,
    url: "#",
  },
  {
    id: "4",
    title: "Facebook",
    iconUrl: facebook,
    url: "#",
  },
];

export const termsContent = `
  # Terms and Conditions

  Welcome to MindSpace, an open-source project that provides mental health and emotional support. By using this service, you agree to comply with the following terms and conditions. If you do not agree with these terms, please do not use this service.

  1. **Use of Services**: MindSpace is provided "as is" for personal, non-commercial use. The content, tools, and features are provided for informational and support purposes only and do not constitute professional mental health advice. You are responsible for your use of the service and agree not to misuse the service in any way.
  2. **User Accounts**: By signing in, you agree to provide accurate and up-to-date information. You are responsible for maintaining the security of your account and for all activities under your account.
  3. **Privacy**: We value your privacy. We collect user data to provide emotional and mental health support. Please see our Privacy Policy for more details.
  4. **Intellectual Property**: MindSpace is an open-source project licensed under GPL v3. Contributions to the project are welcome, and contributors agree that their submissions are made under this license.
  5. **Disclaimer**: MindSpace is an open-source project and provided without warranties of any kind, either express or implied. We do not guarantee that the service will be error-free or uninterrupted.
  6. **Termination**: We reserve the right to suspend or terminate your access to MindSpace if you violate these terms.
  7. **Changes to the Terms**: We reserve the right to update these terms at any time. Your continued use of the service after any changes indicates your acceptance of the new terms.

  For more details, please contact am400718@gmail.com.
`;

export const privacyContent = `
  ## Privacy Policy

  MindSpace takes your privacy seriously. This Privacy Policy outlines what personal information we collect, how we use it, and how we protect it.

  ### Information We Collect
  1. **Personal Data**: We collect personal data such as your name, email, and Google account information when you sign in.
  2. **Usage Data**: We collect data on your usage of the MindSpace platform, such as interactions with our AI services and mood tracking information.
  
  ### How We Use Your Data
  - **Personalization**: We use your data to personalize the AI responses and to improve your emotional support experience.
  - **Analytics**: We analyze usage data to improve our services and ensure their effectiveness in providing mental health support.
  
  ### Data Security
  We take reasonable steps to protect your data from unauthorized access or disclosure. However, no method of electronic storage is 100% secure.

  ### Your Rights
  You have the right to request access to, modification, or deletion of your personal data. Please contact us if you have any concerns about your data privacy.

  For more details, email am400718@gmail.com.
`;
