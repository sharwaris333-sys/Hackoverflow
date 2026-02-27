"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";

interface EventType {
    id: number;
    date: string;
    type: string;
    title: string;
    description: string;
    fullDescription: string;
    duration: string;
    location: string;
    difficulty: string;
    participants: string;
    benefits: string[];
    images: string[];
    registrationLink: string;
    isRegistrationOpen: boolean;
}

const Info = ({ label, value }: { label: string; value: string }) => (
    <div className="bg-[#111] border border-orange-500/20 rounded-2xl p-6">
        <p className="text-orange-400 text-sm mb-2 uppercase tracking-wide">
            {label}
        </p>
        <p className="text-xl font-semibold text-white">{value}</p>
    </div>
);

export default function Events() {
    const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
    const [currentImage, setCurrentImage] = useState(0);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    /* AUTO SLIDE */
    useEffect(() => {
        if (!selectedEvent) return;
        const interval = setInterval(() => {
            setCurrentImage((prev) =>
                prev === selectedEvent.images.length - 1 ? 0 : prev + 1
            );
        }, 3000);
        return () => clearInterval(interval);
    }, [selectedEvent]);

    /* LOCK SCROLL */
    useEffect(() => {
        document.body.style.overflow = previewImage ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [previewImage]);

    const handleShare = async (event: EventType) => {
        const shareUrl = window.location.href;
        try {
            if (navigator.share) {
                await navigator.share({
                    title: event.title,
                    text: event.description,
                    url: shareUrl,
                });
            } else {
                await navigator.clipboard.writeText(shareUrl);
                alert("Link copied to clipboard!");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const parseDate = (dateStr: string) => {
        const clean = dateStr.replace(/(st|nd|rd|th)/gi, "");
        return new Date(clean);
    };

    const events: EventType[] = [
        {
            id: 1,
            date: "23rd February, 2026",
            type: "Motion Graphics",
            title: "Blender Basics - Workshop",
            description: "Learn the fundamentals of 3D animation and design using Blender.",
            fullDescription: "Blender Basics is a hands-on workshop designed to introduce participants to 3D modeling, animation, and rendering.",
            duration: "3 Hours",
            location: "Engineering Reception, Pillai HOC Campus",
            difficulty: "Beginner",
            participants: "Counting...",
            benefits: [
                "3D modeling basics",
                "Animation fundamentals",
                "Rendering techniques",
                "Creative expression",
            ],
            images: [
                "/images/Events/Blender Workshop.jpeg",
                "/images/Events/Blender.jpeg",
                "/images/Events/Blender2.jpeg",
            ],
            registrationLink: "#",
            isRegistrationOpen: false,
        },
        {
            id: 6,
            date: "25 February, 2026",
            type: "Educational",
            title: "Study Aboard",
            description: "Fun technical learning event.",
            fullDescription: "Creative technical event with logical and academic challenges.",
            duration: "3 Hours",
            location: "Seminar Hall",
            difficulty: "Beginner",
            participants: "200",
            benefits: [
                "Logical reasoning",
                "Problem solving",
                "Fun learning",
            ],
            images: [
                "/images/Events/studyabroad.jpeg",
                "/images/Events/studyabroad2.jpeg",
            ],
            registrationLink: "#",
            isRegistrationOpen: false,
        },
        {
            id: 2,
            date: "2nd February, 2026",
            type: "Gaming",
            title: "Free Fire",
            description: "Battle royale competition.",
            fullDescription: "Free Fire tournament where players compete in intense matches.",
            duration: "8 Hours",
            location: "Engineering Reception",
            difficulty: "Intermediate",
            participants: "120",
            benefits: [
                "Strategic thinking",
                "Team coordination",
                "Quick decisions",
            ],
            images: [
                "/images/Events/freefire.jpeg",
                "/images/Events/freefire2.jpeg",
            ],
            registrationLink: "#",
            isRegistrationOpen: false,
        },
        {
            id: 4,
            date: "30th January, 2026",
            type: "Gaming",
            title: "Real Cricket",
            description: "Robotics Challenge competition.",
            fullDescription: "Robotics-based challenge event.",
            duration: "5 Hours",
            location: "Workshop Area",
            difficulty: "Intermediate",
            participants: "60",
            benefits: ["Hands-on robotics", "Team collaboration"],
            images: [
                "/images/Events/rcc.jpeg",
                "/images/Events/rcc2.jpeg",
            ],
            registrationLink: "#",
            isRegistrationOpen: false,
        },
        {
            id: 3,
            date: "29th January, 2026",
            type: "Gaming",
            title: "BGMI",
            description: "Battle royale tournament.",
            fullDescription: "Competitive survival gameplay event.",
            duration: "6 Hours",
            location: "Lab 1",
            difficulty: "Intermediate",
            participants: "150",
            benefits: ["Team communication", "Strategic planning"],
            images: ["/images/Events/bgmi.jpeg"],
            registrationLink: "#",
            isRegistrationOpen: false,
        },
        {
            id: 5,
            date: "2nd February, 2026",
            type: "Cultural",
            title: "Cosplay",
            description: "Creative costume and performance event.",
            fullDescription:
                "Participants dress as their favorite characters and perform on stage showcasing creativity and confidence.",
            duration: "3 Hours",
            location: "Main Auditorium",
            difficulty: "Beginner",
            participants: "160",
            benefits: [
                "Creativity showcase",
                "Stage confidence",
                "Fun cultural experience",
            ],
            images: [
                "/images/Events/Domain Expansion-Cosplay.JPG",
                "/images/Events/cosplay1.jpeg",
                "/images/Events/cosplay2.jpeg",
            ],
            registrationLink: "#",
            isRegistrationOpen: false,
        },
    ];

    const sortedEvents = [...events].sort(
        (a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime()
    );

    /* DETAIL VIEW */
    if (selectedEvent) {
        return (
            <section className="min-h-screen bg-black text-white px-6 py-32 relative">
                <div className="max-w-7xl mx-auto">
                    <button
                        onClick={() => {
                            setSelectedEvent(null);
                            setCurrentImage(0);
                        }}
                        className="mb-10 text-orange-400 hover:text-orange-500"
                    >
                        ← Back to Events
                    </button>

                    <div className="grid lg:grid-cols-2 gap-16 items-start">

                        {/* IMAGE SLIDER */}
                        <div className="relative h-[450px] w-full rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(249,115,22,0.25)]">
                            <Image
                                src={selectedEvent.images[currentImage]}
                                alt={selectedEvent.title}
                                fill
                                className="object-cover cursor-zoom-in"
                                onClick={() => setPreviewImage(selectedEvent.images[currentImage])}
                            />

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentImage((prev) =>
                                        prev === 0 ? selectedEvent.images.length - 1 : prev - 1
                                    );
                                }}
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-orange-500 w-10 h-10 rounded-full flex items-center justify-center text-white z-20"
                            >
                                ‹
                            </button>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentImage((prev) =>
                                        prev === selectedEvent.images.length - 1 ? 0 : prev + 1
                                    );
                                }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-orange-500 w-10 h-10 rounded-full flex items-center justify-center text-white z-20"
                            >
                                ›
                            </button>
                        </div>

                        {/* CONTENT */}
                        <div>
                            <h1 className="text-5xl font-bold mb-4">{selectedEvent.title}</h1>
                            <p className="text-orange-400 mb-6">📅 {selectedEvent.date}</p>
                            <p className="text-gray-400 leading-relaxed mb-10">
                                {selectedEvent.fullDescription}
                            </p>

                            <div className="grid sm:grid-cols-2 gap-6 mb-12">
                                <Info label="Duration" value={selectedEvent.duration} />
                                <Info label="Location" value={selectedEvent.location} />
                                <Info label="Difficulty" value={selectedEvent.difficulty} />
                                <Info label="Participants" value={selectedEvent.participants} />
                            </div>

                            <div className="mb-10">
                                <h3 className="text-2xl font-semibold mb-6">
                                    What You'll Learn
                                </h3>
                                <ul className="space-y-3 text-gray-300">
                                    {selectedEvent.benefits.map((item, i) => (
                                        <li key={i} className="flex gap-3">
                                            <span className="text-orange-500">✔</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex gap-6">
                                <button
                                    disabled
                                    className="px-10 py-4 rounded-xl bg-gray-700 text-gray-400 font-semibold cursor-not-allowed"
                                >
                                    REGISTRATION CLOSED
                                </button>

                                <button
                                    onClick={() => handleShare(selectedEvent)}
                                    className="px-10 py-4 rounded-xl border border-gray-600 hover:border-orange-500 transition"
                                >
                                    SHARE EVENT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* PREVIEW MODAL */}
                {previewImage && (
                    <div
                        className="fixed inset-0 bg-black/90 flex items-center justify-center z-[999]"
                        onClick={() => setPreviewImage(null)}
                    >
                        <div
                            className="relative w-[90%] max-w-6xl h-[85vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={previewImage}
                                alt="Preview"
                                fill
                                className="object-contain cursor-zoom-out"
                                onClick={() => setPreviewImage(null)}
                            />
                            <button
                                onClick={() => setPreviewImage(null)}
                                className="absolute top-4 right-4 text-white text-4xl font-bold hover:text-orange-500"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                )}
            </section>
        );
    }

    /* CARD VIEW */
    return (
        <section className="py-32 px-6 bg-black">
            <div className="max-w-7xl mx-auto">
                <SectionHeader
                    badge="Journey Ahead"
                    title="Our"
                    gradientText="Events"
                    subtitle="The final countdown..."
                />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mt-20">
                    {sortedEvents.map((event) => (
                        <div
                            key={event.id}
                            onClick={() => {
                                setSelectedEvent(event);
                                setCurrentImage(0);
                            }}
                            className="group bg-[#111] border border-orange-500/20 rounded-3xl p-6 cursor-pointer hover:-translate-y-4 transition-all"
                        >
                            <div className="relative h-44 w-full mb-6 rounded-xl overflow-hidden">
                                <Image
                                    src={event.images[0]}
                                    alt={event.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <p className="text-orange-400 text-sm mb-2">{event.date}</p>
                            <h3 className="text-2xl font-bold text-white group-hover:text-orange-400">
                                {event.title}
                            </h3>
                            <p className="text-gray-400 text-sm">{event.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}