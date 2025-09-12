import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Code, Users, User } from 'lucide-react';
import image1 from "../assets/1.jpg";

gsap.registerPlugin(useGSAP, ScrollTrigger);


const About = () => {
  const mainRef = useRef(null);
  const sectionsRef = useRef([]);

  useGSAP(() => {
    // Animate each section as it scrolls into view
    sectionsRef.current.forEach((section) => {
      gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    });

  }, { scope: mainRef });

  const addSectionRef = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div ref={mainRef} className="min-h-screen">
      
      {/* Hero Section */}
      <section ref={addSectionRef} className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold font-serif mb-4">
          About EventSphere
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-80">
          Our mission is to Simplifying college events management.
        </p>
      </section>

      {/* Our Mission Section */}
      <section ref={addSectionRef} className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center gap-12 bg-primary/5 rounded-lg shadow-lg">
        <div className="md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300">
            We built EventSphere to solve the challenges of manual event management. By providing a centralized system, we eliminate miscommunication, prevent scheduling conflicts, and boost student engagement. Our goal is to make managing and discovering college events as seamless as possible.
          </p>
        </div>
        <div className="md:w-1/2">
          {/* Example graphic or image */}
          <div className="w-full aspect-video bg-primary rounded-lg animate-pulse flex items-center justify-center text-center p-4">
            <img src={image1} alt="image" />
          </div>
        </div>
      </section>


      
    </div>
  );
};

export default About;