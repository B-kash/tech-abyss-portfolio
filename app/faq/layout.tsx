import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Frequently Asked Questions",
    description: "Find answers to common questions about Tech Abyss services, process, pricing, and our offices in Brussels and Nepal.",
    alternates: {
        canonical: '/faq',
    },
};

export default function FAQLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
