import React from 'react';
import { useState } from 'react';
import Logo from "./assets/logo.png"
import { TrendingUp, Eye, Mail,Target,  Loader2,
  Rocket,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Users,
  Award,
  Star,
  ChevronLeft,
  ChevronRight,
  EyeOff,
  ArrowRight,
  FileText,
  Zap,
  Quote, } from 'lucide-react';

export default function BidMintHero() {
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profileUrl: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState({ text: "", type: "" })
  const [showForm, setShowForm] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const [showHeroInput, setShowHeroInput] = useState(false)
  const [heroProfileUrl, setHeroProfileUrl] = useState("")
  const [showPopupMessage, setShowPopupMessage] = useState(false)

    const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

const submitData = async () => {
  const { name, email, profileUrl, isBeginner } = formData;

  if (!name.trim() || !email.trim() || !profileUrl.trim()) {
    setMessage({ text: "Please fill in all fields.", type: "error" });
    return;
  }

  setIsSubmitting(true);
  setMessage({ text: "", type: "" });

  let extracted = "";

  // Extract identifier (either ~ID or username)
  const idMatch = profileUrl.match(/~([a-zA-Z0-9]+)/);
  if (idMatch) {
    extracted = `~${idMatch[1]}`; // include tilde
  } else {
    const parts = profileUrl.split("/freelancers/");
    if (parts.length === 2) {
      extracted = parts[1].split("?")[0]; // extract username before query string
    }
  }

  if (!extracted || extracted.length < 3) {
    setMessage({
      text: "Invalid Upwork profile URL. Please enter a public profile URL.",
      type: "error",
    });
    setIsSubmitting(false);
    return;
  }

const encodedName = encodeURIComponent(name);
const encodedEmail = encodeURIComponent(email);
const encodedId = encodeURIComponent(extracted);
const encodedBeginner = encodeURIComponent(isBeginner); // New

const url = `https://n8n-neahkkld.us-east-1.clawcloudrun.com/webhook/f3ad7f44-c0d0-48b8-901a-c096521c7ddc/${encodedName}/${encodedEmail}/${encodedId}/${encodedBeginner}`;


  try {
    const response = await fetch(url);

    if (response.ok) {
      setMessage({
        text: "Your response has been submitted and you will be receiving an email in a while.",
        type: "success",
      });
      setFormData({ name: "", email: "", profileUrl: "" });
    } else {
      setMessage({ text: "Submission failed. Please try again.", type: "error" });
    }
  } catch (error) {
    setMessage({ text: "An error occurred. Please try again.", type: "error" });
  }

  setIsSubmitting(false);
};


  const handleHeroInputChange = (e) => {
    const value = e.target.value
    setHeroProfileUrl(value)

    // Show popup message when user starts typing or pasting
    if (value.trim() && !showPopupMessage) {
      setShowPopupMessage(true)
      // Hide popup after 5 seconds
      setTimeout(() => setShowPopupMessage(false), 5000)
    }
  }

    // Load Google Fonts
  React.useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

    const faqs = [
    {
      question: "Is BidMint free to use?",
      answer: "Yes, BidMint offers a free basic profile analysis. We also offer premium features for freelancers who want more in-depth optimization and ongoing support."
    },
    {
      question: "How long does the analysis take?",
      answer: "Your initial profile analysis takes approximately 60 seconds to complete. The comprehensive report is delivered instantly to your email."
    },
    {
      question: "Is my Upwork account information safe?",
      answer: "Absolutely. We only need your public profile URL to analyze publicly available information. We never ask for your Upwork password or access to your account."
    },
    {
      question: "How quickly will I see the results?",
      answer: "Most freelancers see increased profile views within 1-2 weeks of implementing our recommendations. Job invitations and higher conversion rates typically follow within 2-4 weeks."
    },
    {
      question: "Does this work for all Upwork categories?",
      answer: "Yes, BidMint works for all Upwork categories and skill sets. Our AI tailors recommendations based on your specific niche and the current competitive landscape in your field."
    }
  ];
  return (

    <div className="min-h-screen min-w-screen bg-gradient-to-br from-blue-50 to-blue-100" style={{ fontFamily: 'Sora, sans-serif' }}>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      {/* Navigation */}
<nav className="flex items-center justify-between px-8 py-4">
  {/* Left Section: Logo + Links */}
  <div className="flex items-center gap-8">
    {/* Logo */}
    <div className="flex items-center gap-2">
      {/* <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#9F2648' }}>
      </div> */}
                <img
    src={Logo} style={{width:"170px"}}// Replace with your actual logo path
    alt="BidMint Logo"
    // className="w-10 h-10 object-contain"
  />
      {/* <span className="text-xl font-bold text-gray-900">BidMint</span>
      <span className="text-sm text-gray-600 ml-1">Profile Optimizer</span> */}
    </div>

    {/* Navigation Links */}
    <div className="hidden md:flex items-center gap-6 ml-6">
  <a href="#feature-grid" className="!text-black !visited:text-black !hover:text-gray-900 font-medium no-underline">Features</a>
  <a href="#works" className="!text-black !visited:text-black !hover:text-gray-900 font-medium no-underline">How it works?</a>
  <a href="#testimonial" className="!text-black !visited:text-black !hover:text-gray-900 font-medium no-underline">Testimonials</a>
  <a href="#faq" className="!text-black !visited:text-black !hover:text-gray-900 font-medium no-underline">FAQ</a>
    </div>
  </div>

  {/* Right Section: CTA Button */}
  <button
    onClick={() => document.getElementById('optimize-form')?.scrollIntoView({ behavior: 'smooth' })}
    className="text-white px-6 py-2 rounded-full font-medium hover:opacity-90 transition-colors"
    style={{ backgroundColor: '#9F2648' }}
  >
    Optimize Now
  </button>
</nav>


      {/* Main Content */}
      <div className="px-8 py-16 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Optimize.
                <br />
                Get <span className="text-white px-3 py-1 rounded-lg inline-block transform -rotate-1" style={{ backgroundColor: '#9F2648' }}>noticed.</span>
                <br />
                Land jobs.
              </h1>
            </div>
            
            <p className="text-lg text-gray-600 max-w-md leading-relaxed">
              BidMint analyzes your Upwork profile and provides personalized recommendations to boost your visibility, win more clients, and increase your earnings.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
<button
  onClick={() => document.getElementById('optimize-form')?.scrollIntoView({ behavior: 'smooth' })}
  className="text-white px-8 py-3 rounded-full font-medium hover:opacity-90 transition-colors"
  style={{ backgroundColor: '#9F2648' }}
>
  Optimize Your Profile
</button>

<button
  onClick={() => document.getElementById('feature-grid')?.scrollIntoView({ behavior: 'smooth' })}
  className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-full font-medium hover:border-gray-400 hover:bg-gray-50 transition-colors"
>
  Learn How It Works
</button>

            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="flex">
                {[1, 2, 3, 4].map((star) => (
                  <span key={star} className="text-yellow-400">★</span>
                ))}
                <span className="text-gray-300">★</span>
              </div>
              <span>Based on 30+ freelancer reviews</span>
            </div>
          </div>

          {/* Right Column - Stats Cards */}
          <div className="space-y-6">
            {/* Profile Score Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#9F264820' }}>
                  <TrendingUp className="w-6 h-6" style={{ color: '#9F2648' }} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Profile Score</h3>
                  <p className="text-gray-600">+43% Improvement</p>
                </div>
              </div>
            </div>

            {/* Visibility Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#9F264820' }}>
                  <Eye className="w-6 h-6" style={{ color: '#9F2648' }} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Visibility</h3>
                  <p className="text-gray-600">2x More Profile Views</p>
                </div>
              </div>
            </div>

            {/* Projects Invite Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#9F264820' }}>
                  <Mail className="w-6 h-6" style={{ color: '#9F2648' }} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Projects Invite</h3>
                  <p className="text-gray-600">+20% Increase</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Freelancers Struggle Section */}
      <div id="works" className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Why Freelancers <span className="text-white px-3 py-1 rounded-lg inline-block" style={{ backgroundColor: '#9F2648' }}>Struggle</span> on Upwork
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Even talented freelancers face challenges getting noticed among millions of competitors.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Problems */}
            <div className="space-y-6">
              {/* Low Visibility Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#9F264820' }}>
                    <svg className="w-6 h-6" style={{ color: '#9F2648' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-2">Low Visibility</h3>
                    <p className="text-gray-600">
                      Your profile isn't appearing in search results because it lacks optimization for Upwork's algorithm.
                    </p>
                  </div>
                </div>
              </div>

              {/* Low Proposal Success Rate Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#9F264820' }}>
                    <svg className="w-6 h-6" style={{ color: '#9F2648' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-2">Low Proposal Success Rate</h3>
                    <p className="text-gray-600">
                      Your proposals aren't converting because your profile doesn't build enough trust with potential clients.
                    </p>
                  </div>
                </div>
              </div>

              {/* Undercharging for Services Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#9F264820' }}>
                    <svg className="w-6 h-6" style={{ color: '#9F2648' }} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-2">Undercharging for Services</h3>
                    <p className="text-gray-600">
                      You're not earning what you deserve because your profile doesn't effectively communicate your true value.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Solution */}
            <div className="lg:pl-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#9F2648' }}>
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">BidMint Solution</h3>
                </div>

                <p className="text-gray-600 mb-8 leading-relaxed">
                  Our AI-powered platform analyzes your existing Upwork profile, identifies critical weaknesses, and provides specific recommendations to transform your profile into a client-attracting machine.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Keyword optimization for Upwork's search algorithm</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Portfolio presentation improvements</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Strategic rate positioning</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Trust-building profile elements</span>
                  </div>
                </div>

                <div className="bg-pink-50 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#9F2648' }}>
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-medium text-gray-900">Get started in minutes</span>
                  </div>
<button
  onClick={() => document.getElementById('optimize-form')?.scrollIntoView({ behavior: 'smooth' })}
  className="text-white px-6 py-2 rounded-full font-medium hover:opacity-90 transition-colors"
  style={{ backgroundColor: '#9F2648' }}
>
  Try Now
</button>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Powerful Features Section */}
      <div className="bg-white py-16">
        <div id="feature-grid" className="max-w-7xl mx-auto px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Powerful <span className="text-white px-3 py-1 rounded-lg inline-block" style={{ backgroundColor: '#9F2648' }}>Features</span> to Boost Your Upwork Success
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our comprehensive toolkit helps you stand out from the competition and win more projects.
            </p>
          </div>

          {/* Features Grid */}
          <div  className="grid md:grid-cols-3 gap-8">
            {/* Profile Analysis Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#9F264820' }}>
                  <svg className="w-8 h-8" style={{ color: '#9F2648' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Profile Analysis</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our AI analyzes your entire Upwork profile, identifying strengths and weaknesses that affect your visibility and conversion rate.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 text-sm">Keyword optimization score</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 text-sm">Visual appeal assessment</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 text-sm">Trust signals evaluation</span>
                </div>
              </div>
            </div>

            {/* Personalized Recommendations Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#9F264820' }}>
                  <svg className="w-8 h-8" style={{ color: '#9F2648' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Personalized Recommendations</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Receive actionable, step-by-step guidance to improve your profile based on your specific skills, experience, and target market.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 text-sm">Title & overview optimization</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 text-sm">Portfolio presentation tips</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 text-sm">Skills & service positioning</span>
                </div>
              </div>
            </div>

            {/* Performance Tracking Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#9F264820' }}>
                  <svg className="w-8 h-8" style={{ color: '#9F2648' }} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Performance Tracking</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Monitor your profile's improvement over time and see how your changes impact your Upwork success metrics.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 text-sm">Profile view analytics</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 text-sm">Proposal success rate</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 text-sm">Earnings growth tracking</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Form Section */}
<div className="bg-gray-50 py-16">
  <div id="optimize-form" className="max-w-2xl mx-auto px-8">
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      {/* Form Header */}
      <div className="text-white p-6 text-center" style={{ backgroundColor: '#9F2648' }}>
        <h3 className="text-xl font-bold mb-2">Optimize your Upwork Profile Now</h3>
        <p className="text-sm opacity-90">Get personalized recommendations in minutes, completely free!</p>
      </div>

      {/* Form Content */}
      <div className="p-6">
        <form className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              id="heroName"
              type="text"
              value={formData.name}
              placeholder="John Smith"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent text-gray-900 placeholder-gray-400"
              style={{ focusRingColor: '#9F2648' }}
            />
          </div>

          {/* Email (no tooltip now) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              id="heroEmail"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent text-gray-900 placeholder-gray-400"
              style={{ focusRingColor: '#9F2648' }}
            />
          </div>

          {/* Upwork Profile URL with Tooltip */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Upwork Profile URL</label>
            <input
              type="url"
              id="heroProfileUrl"
              placeholder="https://www.upwork.com/freelancers/~01abcd2ef3g4h5i6j7k8l9"
              value={formData.profileUrl}
              onChange={(e) => {
                const value = e.target.value
                setFormData({ ...formData, profileUrl: value })
                if (value.trim() && !showPopupMessage) {
                  setShowPopupMessage(true)
                  setTimeout(() => setShowPopupMessage(false), 5000)
                }
              }}
              onPaste={(e) => {
                const value = e.clipboardData.getData("text")
                if (value.trim() && !showPopupMessage) {
                  setShowPopupMessage(true)
                  setTimeout(() => setShowPopupMessage(false), 5000)
                }
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent text-gray-900 placeholder-gray-400"
              style={{ focusRingColor: '#9F2648' }}
            />
            {/* Tooltip on URL */}
            <div className="absolute top-0 right-0 mt-1 mr-1 group">
              <svg
                className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 2a7 7 0 100 14A7 7 0 009 2zM8 6a1 1 0 112 0v2a1 1 0 01-2 0V6zm1 8a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
              <div className="hidden group-hover:block absolute right-0 mt-6 w-72 bg-yellow-50 border border-yellow-300 text-yellow-800 text-sm rounded-lg shadow-md p-3 z-10">
                Please enter your public Upwork profile URL. Private profiles will be blocked.
              </div>
            </div>

            {/* Popup below input */}
            {showPopupMessage && (
              <div className="mt-2 bg-yellow-100 border border-yellow-300 rounded-lg p-3 animate-in slide-in-from-top-2 duration-300">
                <div className="flex items-center">
                  <AlertCircle className="h-4 w-4 text-yellow-600 mr-2 flex-shrink-0" />
                  <p className="text-yellow-800 text-sm font-medium">
                    Make sure to enter your public Upwork profile URL
                  </p>
                </div>
              </div>
            )}

            {/* Beginner Toggle with Tooltip */}
            <div className="flex items-center mt-4 gap-2">
              <label htmlFor="beginnerToggle" className="text-sm text-gray-700 font-medium">Are you a beginner freelancer?</label>
              <input
                id="beginnerToggle"
                type="checkbox"
                checked={formData.isBeginner}
                onChange={(e) => setFormData({ ...formData, isBeginner: e.target.checked })}
                className="toggle-checkbox h-5 w-5 text-pink-600 border-gray-300 rounded"
              />
              <div className="relative group">
                <svg
                  className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 2a7 7 0 100 14A7 7 0 009 2zM8 6a1 1 0 112 0v2a1 1 0 01-2 0V6zm1 8a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
                <div className="hidden group-hover:block absolute left-0 mt-6 w-80 bg-yellow-50 border border-yellow-300 text-yellow-800 text-sm rounded-lg shadow-md p-3 z-10">
                  Turn this on if you're a beginner freelancer and your profile lacks client feedback or job success score. Otherwise, your report may be blocked.
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-colors flex items-center justify-center gap-2"
            style={{ backgroundColor: '#9F2648' }}
            onClick={submitData}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Report...
              </>
            ) : (
              <>
                <Target className="mr-2 h-4 w-4" />
                Optimize My Profile
              </>
            )}
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>

          <p className="text-xs text-gray-500 text-center leading-relaxed">
            By submitting, you agree to our <a href="#" className="underline hover:no-underline">Terms of Service</a> and <a href="#" className="underline hover:no-underline">Privacy Policy</a>
          </p>
        </form>
      </div>
    </div>
  </div>
</div>


      {/* Testimonials Section */}
      <div id='testimonial' className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              What Freelancers Say <span className="text-white px-3 py-1 rounded-lg inline-block" style={{ backgroundColor: '#9F2648' }}>About Us</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join hundreds of freelancers who have transformed their Upwork success
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg">
                  S
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Shajeel Afzal</h4>
                  <p className="text-sm text-gray-600">Top Rated Plus Freelancer</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>
              
              <p className="text-gray-700 text-sm leading-relaxed">
                "After using BidMint, my profile views increased by 230% in just two weeks. I've landed 3 new clients at higher rates than before."
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-lg">
                  H
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Hisham Sarwar</h4>
                  <p className="text-sm text-gray-600">Freelance Guru</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>
              
              <p className="text-gray-700 text-sm leading-relaxed">
                "It helped me identify gaps in my profile. After implementing suggestions, acceptance rate doubled and was able to raise my rates by 40%."
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-lg">
                  S
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Syeda Urooj</h4>
                  <p className="text-sm text-gray-600">Freelance UI/UX Designer</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>
              
              <p className="text-gray-700 text-sm leading-relaxed">
                "The keyword recommendations and portfolio restructuring advice were spot on. I'm now getting invited to 3-4 jobs weekly without applying."
              </p>
            </div>
          </div>
        </div>
      </div>
       <div className="bg-gray-50" style={{ fontFamily: 'Sora, sans-serif' }}>
      {/* FAQ Section */}
      <div id='faq' className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Frequently Asked <span className="text-white px-2 py-1 rounded" style={{ backgroundColor: '#9F2648' }}>Questions</span>
          </h2>
          <p className="text-gray-600">Everything you need to know about BidMint</p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {faq.question}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Upwork Success?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of freelancers who have boosted their visibility, win rates, and income with BidMint.
          </p>
<button
  onClick={() => document.getElementById('optimize-form')?.scrollIntoView({ behavior: 'smooth' })}
  className="text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 hover:opacity-90"
  style={{ backgroundColor: '#9F2648' }}
>
  Optimize My Profile Now!
</button>
        </div>
      </div>

      {/* Footer Section */}
      <div className="text-white" style={{ backgroundColor: '#9F2648' }}>
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="md:col-span-1">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-white rounded mr-2"></div>
                <span className="text-xl font-bold">BidMint</span>
              </div>
              <p className="text-sm text-pink-100 mb-4 leading-relaxed">
                Helping freelancers succeed on Upwork with AI-powered profile optimization.
              </p>
              <div className="flex space-x-3">
                <div className="w-6 h-6 bg-pink-200 rounded"></div>
                <div className="w-6 h-6 bg-pink-200 rounded"></div>
              </div>
            </div>

            {/* Product Column */}
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-pink-100">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Testimonials</a></li>
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-pink-100">
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ's</a></li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-pink-100">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-pink-300 mt-8 pt-6">
            <p className="text-sm text-pink-100 text-center">
              Made with ♡ by Mintan | © 2025 BidMint. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
    
  );
}





