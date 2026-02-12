import type { Metadata } from 'next';
import PageTransition from '@/Components/shared/PageTransition';
import AboutCEO from '@/Components/landing/AboutCEO';

export const metadata: Metadata = {
    title: "About CEO | Bikash Chapagain",
    description: "Learn more about Bikash Chapagain, CEO of Tech Abyss and Full-Stack Developer with expertise in React, Node.js, and scalable systems.",
    alternates: {
        canonical: '/about',
    },
};

export default function AboutPage() {
    return (
        <PageTransition>
            <div className="pt-24 min-h-screen">
                <AboutCEO />
            </div>
        </PageTransition>
    );
}
