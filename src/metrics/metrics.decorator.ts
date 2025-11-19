import { applyDecorators, SetMetadata } from '@nestjs/common';
import { METRICS_META } from './metrics.constants';
import { IMetricsMeta } from './metrics.interface';

/**
 * @param {string} name опциональный параметр. Задает имя для метрики. Если не задать имя вручную, то будет сгенерировано имя по схеме `<имя_класса>/<имя_метода>`
 * Не может быть использовано для контроллеров (из доклада мы уже можем сделать вывод почему)
 */
export function Metrics(name?: string): MethodDecorator {
  return applyDecorators(SetMetadata<typeof METRICS_META, IMetricsMeta>(METRICS_META, { name }));
}
