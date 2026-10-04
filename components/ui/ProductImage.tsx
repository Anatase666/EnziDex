import { preload } from 'react-dom';

import { packageImageAlt } from '@/content/product';
import { cn } from '@/lib/cn';
import { productImage } from '@/lib/product-image.generated';
import { assetPath } from '@/lib/seo';

type ProductImageProps = {
  /**
   * Ширина картинки на экране — по ней браузер выбирает файл из srcset.
   * Задаётся тем, кто знает раскладку: первым экраном или карточкой продукта.
   */
  sizes: string;
  /**
   * Картинка на первом экране — главный кандидат в LCP. Для неё файл
   * запрашивается заранее, до разбора разметки, и без ленивой загрузки.
   */
  priority?: boolean;
  className?: string;
};

/**
 * Изображение упаковки: пачка и туба.
 *
 * Файлы готовит scripts/build-product-image.mjs: несколько ширин WebP с
 * прозрачностью и контактными тенями. Здесь — только вывод: srcset, чтобы
 * телефон не качал файл для широкого экрана, и честные width/height, чтобы
 * браузер заранее зарезервировал место и вёрстка не прыгнула (ТЗ 8.1).
 *
 * Мягкое фиалковое свечение позади нарисовано CSS, а не вшито в картинку:
 * так оно берёт цвет из токенов и не перекрашивается вручную при смене
 * палитры.
 */
export function ProductImage({ sizes, priority = false, className }: ProductImageProps) {
  const srcSet = productImage.sources
    .map((source) => `${assetPath(source.src)} ${source.width}w`)
    .join(', ');

  // Запасной src для браузеров без srcset — средний по размеру файл.
  const fallback = productImage.sources[Math.floor(productImage.sources.length / 2)];
  const src = assetPath(fallback?.src ?? productImage.sources[0].src);

  if (priority) {
    preload(src, {
      as: 'image',
      imageSrcSet: srcSet,
      imageSizes: sizes,
      fetchPriority: 'high',
    });
  }

  return (
    <div className={cn('product-stage', className)}>
      {/* eslint-disable-next-line @next/next/no-img-element -- статический
          экспорт: оптимизатор next/image недоступен, а srcset нужен свой. */}
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        width={productImage.width}
        height={productImage.height}
        alt={packageImageAlt}
        decoding="async"
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        draggable={false}
        className="relative block h-auto w-full select-none"
      />
    </div>
  );
}
