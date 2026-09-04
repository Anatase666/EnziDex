/**
 * Вставка структурированных данных schema.org (ТЗ 8.3).
 *
 * Объект приходит из lib/seo.ts и целиком собран нами, но «<» всё равно
 * экранируется: последовательность «</script>» внутри строкового значения
 * закрыла бы тег раньше времени и сломала страницу.
 */
export function JsonLd({ data }: { data: object }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');

  return (
    <script
      type="application/ld+json"
      // Единственное место в проекте с dangerouslySetInnerHTML: JSON-LD
      // по спецификации передаётся текстом внутри script, другого способа нет.
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
