import {
  ClassProvider,
  DynamicModule,
  ExistingProvider,
  FactoryProvider,
  ForwardReference,
  InjectionToken,
  Type,
  ValueProvider,
} from '@nestjs/common';

export interface IHandler2Options<T> {
  /**
   * Modified type of Provider<T>
   */
  handlers: (
    | Type<T>
    | ClassProvider<T>
    | ValueProvider<T>
    | FactoryProvider<T>
    | ExistingProvider<T>
  )[];
  provide: InjectionToken;
  /**
   * Optional list of imported modules that export the providers which are
   * required in this module.
   */
  imports?: Array<Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference>;
  /**
   * When "true", makes a module global-scoped.
   *
   * Once imported into any module, a global-scoped module will be visible
   * in all modules. Thereafter, modules that wish to inject a service exported
   * from a global module do not need to import the provider module.
   *
   * @default false
   */
  global?: boolean;
}
