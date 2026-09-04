import type { Metadata } from 'next';
import Link from 'next/link';

import { ContactChannels } from '@/components/sections/ContactChannels';
import { LeadForm } from '@/components/sections/LeadForm';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { JsonLd } from '@/components/ui/JsonLd';
import { Value } from '@/components/ui/Value';
import { contacts, partnershipContact, requisites, responseTime } from '@/content/site';
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata('contacts');

/**
 * Контакты (ТЗ 4.6).
 *
 * Карта (FR-C3) не подключена сознательно: публичного офиса у проекта нет,
 * а карта ради строки адреса тянет сторонние скрипты и куки — то есть бьёт
 * и по Performance, и по требованию 8.5 не грузить третьи стороны без
 * согласия. Появится офис — появится и карта, с ленивой загрузкой по клику.
 */
export default function ContactsPage() {
  return (
    <>
      <section className="pt-10 pb-16 md:pt-14 md:pb-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Форма — первое, что видно: это основное целевое действие. */}
            <div className="lg:col-span-7">
              <h1 className="text-4xl max-w-[16ch] text-balance text-ink">
                Оставить заявку
              </h1>
              <p className="mt-5 max-w-measure text-xl text-ink-muted">
                Форма для покупателей, клиник и партнёров. Выберите тему обращения —
                так запрос быстрее попадёт к нужному человеку. {responseTime.full}
              </p>

              <Card tone="raised" padding="lg" className="mt-9">
                <LeadForm variant="full" />
              </Card>
            </div>

            <div className="lg:col-span-5">
              <h2 className="text-2xl text-ink">Прямая связь</h2>
              <p className="mt-3 text-ink-muted">
                Если удобнее написать напрямую — вот все каналы.
              </p>

              <div className="mt-6">
                <ContactChannels channels={contacts} />
              </div>

              {/* FR-C4 */}
              <h2 className="mt-12 text-2xl text-ink">{partnershipContact.label}</h2>
              <p className="mt-3 text-ink-muted">
                Отдельный адрес для клиник, дистрибьюторов и поставок — минуя общую
                очередь обращений.
              </p>

              <div className="mt-6">
                <ContactChannels channels={[partnershipContact]} />
              </div>

              {/* Реквизиты кратко: остальное — на странице юридических данных. */}
              <div className="mt-12 rounded-xl bg-sunken px-5 py-5">
                <h2 className="text-sm font-semibold text-ink">Изготовитель</h2>
                <p className="mt-2 text-ink">{requisites.legalName}</p>
                <p className="mt-1 text-sm text-ink-muted">
                  ИНН <Value value={requisites.inn} /> · ОГРН{' '}
                  <Value value={requisites.ogrn} />
                </p>
                <p className="mt-3 text-sm">
                  <Link href="/legal" className="link">
                    Полные реквизиты и данные маркировки
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <JsonLd data={breadcrumbJsonLd('contacts')} />
    </>
  );
}
