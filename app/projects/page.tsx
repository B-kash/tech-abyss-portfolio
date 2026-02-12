import type { Metadata } from 'next';
import PageTransition from '@/Components/shared/PageTransition';
import ProjectsSection from '@/Components/landing/ProjectsSection';

export const metadata: Metadata = {
    title: "Selected Projects",
    description: "Explore a collection of full-stack development projects by Tech Abyss, featuring high-performance web apps and scalable backend systems.",
    alternates: {
        canonical: '/projects',
    },
};

export default function ProjectsPage() {
    return (
        <PageTransition>
            <div className="pt-20 min-h-screen">
                <ProjectsSection />
            </div>
        </PageTransition>
    );
}
