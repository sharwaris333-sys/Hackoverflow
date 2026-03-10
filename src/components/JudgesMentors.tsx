'use client'

import Image from 'next/image'
import { Linkedin } from 'lucide-react'
import { useEffect } from 'react'

interface TeamMember {
  id: number
  name: string
  role: string
  description: string
  image: string
  socials?: {
    linkedin?: string
  }
}

export default function JudgesMentors() {

  useEffect(() => {
    const cards = document.querySelectorAll(".team-card")

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show-card")
        }
      })
    }, { threshold: 0.2 })

    cards.forEach(card => observer.observe(card))
  }, [])

  const judges: TeamMember[] = [
    {
      id: 1,
      name: 'PRASAD SAWANT',
      role: 'Judge',
      description: "Former Co-Founder, Letsupgrade Lead AI Mumbai",
      image: '/images/judges&Mentor/judges.png',
      socials: { linkedin: 'https://www.linkedin.com/in/prasadsawant' }
    },
    {
      id: 2,
      name: 'ANAND MEHTA',
      role: 'Judge',
      description: 'Senior Specialist Finops, NASDAQ AWS Community Builder',
      image: '/images/judges&Mentor/judges2.png',
      socials: { linkedin: 'https://www.linkedin.com/in/anandmehta' }
    },
    {
      id: 3,
      name: 'VIVEK YADAV',
      role: 'Judge',
      description: 'Google Developer Expert (Flutter and Dart)',
      image: '/images/judges&Mentor/judges3.png',
      socials: { linkedin: 'https://www.linkedin.com/in/viveky' }
    },
    {
      id: 4,
      name: 'NIKITA GANDHI',
      role: 'Judge',
      description: 'Technical Program Manager, Google',
      image: '/images/judges&Mentor/judges4.png',
      socials: { linkedin: 'https://www.linkedin.com/in/nikita-gandhi' }
    }
  ]

  const mentors: TeamMember[] = [
    {
      id: 1,
      name: 'Vinayak Sawant',
      role: 'Mentor',
      description: 'Technical Head Of Hackoverflow 3.0',
      image: '/images/judges&Mentor/Mentor1.jpeg',
      socials: { linkedin: 'https://www.linkedin.com/in/vinayaksawant' }
    },
    {
      id: 2,
      name: 'Vedansh Goyal',
      role: 'Mentor',
      description: 'TECHhelp4U Community Founder',
      image: '/images/judges&Mentor/Mentor2.png',
      socials: { linkedin: 'https://www.linkedin.com/in/vedansh-goyal' }
    },
    {
      id: 3,
      name: 'Swapnil Chavan',
      role: 'Mentor',
      description: 'CSI Developer Head',
      image: '/images/judges&Mentor/Mentor3.png',
      socials: { linkedin: 'https://www.linkedin.com/in/swapnil-chavan' }
    },
    {
      id: 4,
      name: 'Nirav Thakur',
      role: 'Mentor',
      description: 'Freelancer',
      image: '/images/judges&Mentor/Mentor4.png',
      socials: { linkedin: 'https://www.linkedin.com/in/niravcanv' }
    }
  ]

  const TeamCard = ({ member }: { member: TeamMember }) => (
    <div className="team-card">

      <div className="team-avatar">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="team-avatar-img"
        />
      </div>

      <h3 className="team-name">{member.name}</h3>
      <p className="team-role">{member.role}</p>
      <p className="team-bio">{member.description}</p>

      {member.socials?.linkedin && (
        <div className="team-socials">
          <a
            href={member.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <Linkedin size={18} />
          </a>
        </div>
      )}

    </div>
  )

  return (
    <>
      <style>{`

      .team-section{
        padding:120px 0;
        background:linear-gradient(135deg,#0a0a0a,#121212);
      }

      .team-container{
        max-width:1200px;
        margin:auto;
        padding:0 2rem;
      }

      /* MAIN HEADING */

      .main-heading{
        text-align:center;
        margin-bottom:80px;
      }

      .main-heading h1{
        font-size:48px;
        font-weight:800;
        letter-spacing:1px;
        background:linear-gradient(90deg,#ffffff,#f97316,#f43f5e);
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
    background-size:200%;
    animation: gradientMove 6s linear infinite;
    }

      @keyframes gradientMove{
        0%{background-position:0%}
        100%{background-position:200%}
      }

      .section-head{
        text-align:center;
        margin-bottom:3rem;
      }

    .section-title{
    font-size:48px;
    font-weight:800;
    background:linear-gradient(90deg,#ffffff,#f97316,#f43f5e);
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
    background-size:200%;
    animation: gradientMove 6s linear infinite;
    }

      .section-divider{
        width:70px;
        height:3px;
        margin:10px auto 0;
        background:linear-gradient(135deg,#e75829,#F2A03D);
        border-radius:10px;
      }

      .judges-grid,
      .mentors-grid{
        display:grid;
        grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
        gap:2rem;
        margin-bottom:80px;
      }

      /* CARD */

      .team-card{
        min-height:340px;
        display:flex;
        flex-direction:column;
        align-items:center;
        background:rgba(255,255,255,0.03);
        border:1px solid rgba(255,255,255,0.12);
        border-radius:16px;
        padding:2rem 1rem;
        transition:all .4s ease;
        opacity:0;
        transform:translateY(40px);
        position:relative;
        overflow:hidden;
      }

      .team-card.show-card{
        opacity:1;
        transform:translateY(0);
      }

      .team-card:hover{
        transform:translateY(-10px);
        border-color:#f97316;
        box-shadow:0 0 40px rgba(249,115,22,.4);
      }

      /* SPOTLIGHT EFFECT */

      .team-card::before{
        content:'';
        position:absolute;
        top:-50%;
        left:-50%;
        width:200%;
        height:200%;
        background:radial-gradient(circle,rgba(255,115,0,.15),transparent 40%);
        opacity:0;
        transition:.4s;
      }

      .team-card:hover::before{
        opacity:1;
      }

      /* AVATAR */

      .team-avatar{
        width:120px;
        height:120px;
        border-radius:50%;
        border:3px solid rgba(231,88,41,0.6);
        overflow:hidden;
        margin-bottom:1rem;
        position:relative;
      }

      .team-avatar-img{
        object-fit:cover;
      }

      .team-name{
        font-size:1.1rem;
        font-weight:600;
        color:white;
        text-align:center;
      }

      .team-role{
        font-size:.8rem;
        text-transform:uppercase;
        color:#e75829;
        margin:.4rem 0 .8rem;
        font-weight:600;
      }

      .team-bio{
        font-size:.85rem;
        color:rgba(255,255,255,.6);
        text-align:center;
        line-height:1.4;
      }

      .team-socials{
        margin-top:1rem;
      }

      .social-link{
        width:36px;
        height:36px;
        border-radius:50%;
        background:rgba(231,88,41,0.15);
        border:1px solid rgba(231,88,41,0.4);
        color:#e75829;
        display:flex;
        align-items:center;
        justify-content:center;
        transition:.3s;
      }

      .social-link:hover{
        background:linear-gradient(135deg,#e75829,#F2A03D);
        color:white;
      }

      `}</style>

      <section className="team-section">
        <div className="team-container">

          <div className="main-heading">
            <h1>Judges & Mentors</h1>
          </div>

          {/* Judges */}
          <div className="section-head">
            <h1 className="section-title">Judges</h1>
            <div className="section-divider"></div>
          </div>

          <div className="judges-grid">
            {judges.map(j => <TeamCard key={j.id} member={j} />)}
          </div>

          {/* Mentors */}
          <div className="section-head">
            <h2 className="section-title">Mentors</h2>
            <div className="section-divider"></div>
          </div>

          <div className="mentors-grid">
            {mentors.map(m => <TeamCard key={m.id} member={m} />)}
          </div>

        </div>
      </section>
    </>
  )
}