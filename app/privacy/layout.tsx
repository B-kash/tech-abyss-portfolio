import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "Review the Tech Abyss Privacy Policy to understand how we collect, use, and protect your personal information.",
    alternates: {
        canonical: '/privacy',
    },
};

export default function PrivacyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
