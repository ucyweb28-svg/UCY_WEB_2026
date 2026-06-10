import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('legal');

  return {
    title: t('title'),
  };
}

export default async function MentionsLegalesPage() {
  const t = await getTranslations('legal');

  const sections = [
    { title: t('host_title'), body: t('host_body') },
    { title: t('ip_title'), body: t('ip_body') },
    { title: t('data_title'), body: t('data_body') },
    { title: t('analytics_title'), body: t('analytics_body') },
    { title: t('credits_title'), body: t('credits_body') },
  ];

  const editorLines = [
    t('editor_company'),
    t('editor_status'),
    t('editor_siret'),
    t('editor_director'),
    t('editor_address'),
    t('editor_email'),
    t('editor_site'),
  ];

  return (
    <main className="pt-28 pb-16 md:pt-36 md:pb-32" style={{ backgroundColor: '#FBF9FF' }}>
      <div className="max-w-3xl mx-auto px-6">
        <h1
          className="font-heading font-extrabold text-4xl md:text-5xl leading-tight mb-3"
          style={{ color: '#000807' }}
        >
          {t('title')}
        </h1>
        <p className="font-sans text-sm mb-12" style={{ color: 'rgba(0,8,7,0.4)' }}>
          {t('updated')}
        </p>

        <div className="flex flex-col gap-10">
          <section>
            <h2
              className="font-heading font-bold text-xl mb-3"
              style={{ color: '#000807' }}
            >
              {t('editor_title')}
            </h2>
            <div
              className="font-sans text-sm leading-relaxed flex flex-col gap-1"
              style={{ color: 'rgba(0,8,7,0.7)' }}
            >
              {editorLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </section>

          {sections.map(({ title, body }) => (
            <section key={title}>
              <h2
                className="font-heading font-bold text-xl mb-3"
                style={{ color: '#000807' }}
              >
                {title}
              </h2>
              <p
                className="font-sans text-sm leading-relaxed"
                style={{ color: 'rgba(0,8,7,0.7)' }}
              >
                {body}
              </p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
