import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Terms & Conditions",
    description: "Read the Terms and Conditions for using Tech Abyss services and website.",
    alternates: {
        canonical: '/terms',
    },
};

export default function TermsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
