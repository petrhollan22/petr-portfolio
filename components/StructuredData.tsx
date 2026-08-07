import { siteUrl } from '@/lib/site';

export default function StructuredData({ locale }: { locale: string }) {
  const isEn = locale === 'en';

  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Petr Hollan',
    url: `${siteUrl}/${locale}`,
    image: `${siteUrl}/portret.jpg`,
    jobTitle: isEn ? 'Business Intelligence Analyst' : 'Business Intelligence Analyst',
    description: isEn
      ? 'Data and AI in retail. Chess coach and organiser of student sports events.'
      : 'Data a umělá inteligence v retailu. Trenér šachu a organizátor studentských sportovních akcí.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: isEn ? 'Prague' : 'Praha',
      addressCountry: 'CZ',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: isEn
        ? 'Prague University of Economics and Business'
        : 'Vysoká škola ekonomická v Praze',
      url: 'https://www.vse.cz/',
    },
    knowsLanguage: ['cs', 'en', 'es'],
    knowsAbout: isEn
      ? ['Data analytics', 'Artificial intelligence', 'Business intelligence', 'Chess']
      : ['Datová analytika', 'Umělá inteligence', 'Business intelligence', 'Šachy'],
    sameAs: [
      'https://cz.linkedin.com/in/petr-hollan',
      'https://www.chess.com/cs/member/pedroholly22',
      'https://ratings.fide.com/profile/360945',
      'https://www.triatlony.com/bezecke-tabulky/zavodnici/286167-hollan-petr',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
