import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import logo from "../assets/logo.png";
import image1 from "../assets/1.jpg";
import image2 from "../assets/2.jpg";
import image3 from "../assets/3.jpg";
import image4 from "../assets/4.jpg";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import Contact from "./sub-components/Contact";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Home = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [])
  
  const { user } = useAuthStore();
  const mainRef = useRef(null);
  const heroTextRef = useRef(null);
  const galleryRef = useRef(null);
  const ctaRef = useRef(null);
  const navigate = useNavigate();

  useGSAP(
    () => {
      // Hero Section Animations
      const heroTl = gsap.timeline({
        defaults: { duration: 1.2, ease: "power3.out" },
      });
      heroTl
        .from(heroTextRef.current, {
          y: 50,
          opacity: 0,
          stagger: 0.3,
        })
        .from(
          ".hero-cta-button",
          {
            scale: 0.8,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.6"
        );

      // Media Gallery Section animations
      gsap.from(galleryRef.current, {
        x: -100,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      // Call-to-action section animation
      gsap.from(ctaRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 1.5,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: mainRef }
  );

  return (
    <div ref={mainRef} className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        <div className="relative z-10 p-4">
          <div
            ref={heroTextRef}
            className="flex flex-col items-center justify-center"
          >
            <div className="p-2 rounded-md bg-black border border-muted-foreground w-20 h-20 object-contain mb-4 animate-bounce">
              <img
                src={logo}
                alt=" logo"
                className="h-full w-full object-cover"
                draggable={false}
              />
            </div>
            <h1 className="text-4xl font-serif md:text-7xl font-extrabold mb-4 ">
              EventSphere
            </h1>
            <p className="text-xl md:text-2xl font-semibold max-w-3xl mb-8">
              Seamlessly manage and participate in college events. Your gateway
              to all campus happenings.
            </p>
          </div>
          <Button onClick={() => navigate('/events')} className="hero-cta-button text-lg px-8 py-6 rounded-full font-bold shadow-lg transition-transform duration-300 hover:scale-125">
            View Events
          </Button>
        </div>
      </section>

      {/* Media Gallery Preview */}
      <section className="container mx-auto px-4 py-20 bg-primary/5 shadow-inner">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div ref={galleryRef} className="md:w-1/2">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Relive the Moments
            </h2>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6">
              Our media gallery is a visual feast of past events. Browse
              high-quality images and videos from cultural fests, technical
              competitions, and more.
            </p>
            <Button size="lg" onClick={() => navigate('/gallery')}>View Gallery</Button>
          </div>
          <div className="md:w-1/2 grid grid-cols-2 gap-4">
            {/* Replace with actual images from your project */}
            <div className="aspect-video bg-gray-300 dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
              <img
                src={image1}
                alt="Event Moment 1"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="aspect-video bg-gray-300 dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
              <img
                src={image2}
                alt="Event Moment 2"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="aspect-video bg-gray-300 dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
              <img
                src={image3}
                alt="Event Moment 3"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="aspect-video bg-gray-300 dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
              <img
                src={image4}
                alt="Event Moment 4"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section for Different Roles */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div ref={ctaRef} className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Join Our Community
          </h2>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Button
              size="lg"
              variant="default"
              className="w-full md:w-auto"
              onClick={() => {
                navigate(user ? "/events" : "/signin");
              }}
            >
              Register as Participant
            </Button>
          </div>
        </div>
      </section>
<div className="lg:hidden block ">
      <Contact/>
</div>
    </div>
  );
};

export default Home;
