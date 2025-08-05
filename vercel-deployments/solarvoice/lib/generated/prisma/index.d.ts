
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model agent_feedback
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 */
export type agent_feedback = $Result.DefaultSelection<Prisma.$agent_feedbackPayload>
/**
 * Model agent_languages
 * 
 */
export type agent_languages = $Result.DefaultSelection<Prisma.$agent_languagesPayload>
/**
 * Model agent_performance_metrics
 * 
 */
export type agent_performance_metrics = $Result.DefaultSelection<Prisma.$agent_performance_metricsPayload>
/**
 * Model agent_usage_events
 * 
 */
export type agent_usage_events = $Result.DefaultSelection<Prisma.$agent_usage_eventsPayload>
/**
 * Model agents
 * 
 */
export type agents = $Result.DefaultSelection<Prisma.$agentsPayload>
/**
 * Model agents_custom
 * 
 */
export type agents_custom = $Result.DefaultSelection<Prisma.$agents_customPayload>
/**
 * Model contractor_context
 * 
 */
export type contractor_context = $Result.DefaultSelection<Prisma.$contractor_contextPayload>
/**
 * Model rentals
 * 
 */
export type rentals = $Result.DefaultSelection<Prisma.$rentalsPayload>
/**
 * Model subscriptions
 * 
 */
export type subscriptions = $Result.DefaultSelection<Prisma.$subscriptionsPayload>
/**
 * Model system_health_metrics
 * 
 */
export type system_health_metrics = $Result.DefaultSelection<Prisma.$system_health_metricsPayload>
/**
 * Model user_interactions
 * 
 */
export type user_interactions = $Result.DefaultSelection<Prisma.$user_interactionsPayload>
/**
 * Model voice_samples
 * 
 */
export type voice_samples = $Result.DefaultSelection<Prisma.$voice_samplesPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Agent_feedbacks
 * const agent_feedbacks = await prisma.agent_feedback.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Agent_feedbacks
   * const agent_feedbacks = await prisma.agent_feedback.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.agent_feedback`: Exposes CRUD operations for the **agent_feedback** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Agent_feedbacks
    * const agent_feedbacks = await prisma.agent_feedback.findMany()
    * ```
    */
  get agent_feedback(): Prisma.agent_feedbackDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.agent_languages`: Exposes CRUD operations for the **agent_languages** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Agent_languages
    * const agent_languages = await prisma.agent_languages.findMany()
    * ```
    */
  get agent_languages(): Prisma.agent_languagesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.agent_performance_metrics`: Exposes CRUD operations for the **agent_performance_metrics** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Agent_performance_metrics
    * const agent_performance_metrics = await prisma.agent_performance_metrics.findMany()
    * ```
    */
  get agent_performance_metrics(): Prisma.agent_performance_metricsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.agent_usage_events`: Exposes CRUD operations for the **agent_usage_events** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Agent_usage_events
    * const agent_usage_events = await prisma.agent_usage_events.findMany()
    * ```
    */
  get agent_usage_events(): Prisma.agent_usage_eventsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.agents`: Exposes CRUD operations for the **agents** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Agents
    * const agents = await prisma.agents.findMany()
    * ```
    */
  get agents(): Prisma.agentsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.agents_custom`: Exposes CRUD operations for the **agents_custom** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Agents_customs
    * const agents_customs = await prisma.agents_custom.findMany()
    * ```
    */
  get agents_custom(): Prisma.agents_customDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.contractor_context`: Exposes CRUD operations for the **contractor_context** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Contractor_contexts
    * const contractor_contexts = await prisma.contractor_context.findMany()
    * ```
    */
  get contractor_context(): Prisma.contractor_contextDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.rentals`: Exposes CRUD operations for the **rentals** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Rentals
    * const rentals = await prisma.rentals.findMany()
    * ```
    */
  get rentals(): Prisma.rentalsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subscriptions`: Exposes CRUD operations for the **subscriptions** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Subscriptions
    * const subscriptions = await prisma.subscriptions.findMany()
    * ```
    */
  get subscriptions(): Prisma.subscriptionsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.system_health_metrics`: Exposes CRUD operations for the **system_health_metrics** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more System_health_metrics
    * const system_health_metrics = await prisma.system_health_metrics.findMany()
    * ```
    */
  get system_health_metrics(): Prisma.system_health_metricsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user_interactions`: Exposes CRUD operations for the **user_interactions** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more User_interactions
    * const user_interactions = await prisma.user_interactions.findMany()
    * ```
    */
  get user_interactions(): Prisma.user_interactionsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.voice_samples`: Exposes CRUD operations for the **voice_samples** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Voice_samples
    * const voice_samples = await prisma.voice_samples.findMany()
    * ```
    */
  get voice_samples(): Prisma.voice_samplesDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.13.0
   * Query Engine version: 361e86d0ea4987e9f53a565309b3eed797a6bcbd
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    agent_feedback: 'agent_feedback',
    agent_languages: 'agent_languages',
    agent_performance_metrics: 'agent_performance_metrics',
    agent_usage_events: 'agent_usage_events',
    agents: 'agents',
    agents_custom: 'agents_custom',
    contractor_context: 'contractor_context',
    rentals: 'rentals',
    subscriptions: 'subscriptions',
    system_health_metrics: 'system_health_metrics',
    user_interactions: 'user_interactions',
    voice_samples: 'voice_samples'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "agent_feedback" | "agent_languages" | "agent_performance_metrics" | "agent_usage_events" | "agents" | "agents_custom" | "contractor_context" | "rentals" | "subscriptions" | "system_health_metrics" | "user_interactions" | "voice_samples"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      agent_feedback: {
        payload: Prisma.$agent_feedbackPayload<ExtArgs>
        fields: Prisma.agent_feedbackFieldRefs
        operations: {
          findUnique: {
            args: Prisma.agent_feedbackFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_feedbackPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.agent_feedbackFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_feedbackPayload>
          }
          findFirst: {
            args: Prisma.agent_feedbackFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_feedbackPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.agent_feedbackFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_feedbackPayload>
          }
          findMany: {
            args: Prisma.agent_feedbackFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_feedbackPayload>[]
          }
          create: {
            args: Prisma.agent_feedbackCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_feedbackPayload>
          }
          createMany: {
            args: Prisma.agent_feedbackCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.agent_feedbackCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_feedbackPayload>[]
          }
          delete: {
            args: Prisma.agent_feedbackDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_feedbackPayload>
          }
          update: {
            args: Prisma.agent_feedbackUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_feedbackPayload>
          }
          deleteMany: {
            args: Prisma.agent_feedbackDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.agent_feedbackUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.agent_feedbackUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_feedbackPayload>[]
          }
          upsert: {
            args: Prisma.agent_feedbackUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_feedbackPayload>
          }
          aggregate: {
            args: Prisma.Agent_feedbackAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAgent_feedback>
          }
          groupBy: {
            args: Prisma.agent_feedbackGroupByArgs<ExtArgs>
            result: $Utils.Optional<Agent_feedbackGroupByOutputType>[]
          }
          count: {
            args: Prisma.agent_feedbackCountArgs<ExtArgs>
            result: $Utils.Optional<Agent_feedbackCountAggregateOutputType> | number
          }
        }
      }
      agent_languages: {
        payload: Prisma.$agent_languagesPayload<ExtArgs>
        fields: Prisma.agent_languagesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.agent_languagesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_languagesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.agent_languagesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_languagesPayload>
          }
          findFirst: {
            args: Prisma.agent_languagesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_languagesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.agent_languagesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_languagesPayload>
          }
          findMany: {
            args: Prisma.agent_languagesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_languagesPayload>[]
          }
          create: {
            args: Prisma.agent_languagesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_languagesPayload>
          }
          createMany: {
            args: Prisma.agent_languagesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.agent_languagesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_languagesPayload>[]
          }
          delete: {
            args: Prisma.agent_languagesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_languagesPayload>
          }
          update: {
            args: Prisma.agent_languagesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_languagesPayload>
          }
          deleteMany: {
            args: Prisma.agent_languagesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.agent_languagesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.agent_languagesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_languagesPayload>[]
          }
          upsert: {
            args: Prisma.agent_languagesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_languagesPayload>
          }
          aggregate: {
            args: Prisma.Agent_languagesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAgent_languages>
          }
          groupBy: {
            args: Prisma.agent_languagesGroupByArgs<ExtArgs>
            result: $Utils.Optional<Agent_languagesGroupByOutputType>[]
          }
          count: {
            args: Prisma.agent_languagesCountArgs<ExtArgs>
            result: $Utils.Optional<Agent_languagesCountAggregateOutputType> | number
          }
        }
      }
      agent_performance_metrics: {
        payload: Prisma.$agent_performance_metricsPayload<ExtArgs>
        fields: Prisma.agent_performance_metricsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.agent_performance_metricsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_performance_metricsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.agent_performance_metricsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_performance_metricsPayload>
          }
          findFirst: {
            args: Prisma.agent_performance_metricsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_performance_metricsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.agent_performance_metricsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_performance_metricsPayload>
          }
          findMany: {
            args: Prisma.agent_performance_metricsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_performance_metricsPayload>[]
          }
          create: {
            args: Prisma.agent_performance_metricsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_performance_metricsPayload>
          }
          createMany: {
            args: Prisma.agent_performance_metricsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.agent_performance_metricsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_performance_metricsPayload>[]
          }
          delete: {
            args: Prisma.agent_performance_metricsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_performance_metricsPayload>
          }
          update: {
            args: Prisma.agent_performance_metricsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_performance_metricsPayload>
          }
          deleteMany: {
            args: Prisma.agent_performance_metricsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.agent_performance_metricsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.agent_performance_metricsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_performance_metricsPayload>[]
          }
          upsert: {
            args: Prisma.agent_performance_metricsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_performance_metricsPayload>
          }
          aggregate: {
            args: Prisma.Agent_performance_metricsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAgent_performance_metrics>
          }
          groupBy: {
            args: Prisma.agent_performance_metricsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Agent_performance_metricsGroupByOutputType>[]
          }
          count: {
            args: Prisma.agent_performance_metricsCountArgs<ExtArgs>
            result: $Utils.Optional<Agent_performance_metricsCountAggregateOutputType> | number
          }
        }
      }
      agent_usage_events: {
        payload: Prisma.$agent_usage_eventsPayload<ExtArgs>
        fields: Prisma.agent_usage_eventsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.agent_usage_eventsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_usage_eventsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.agent_usage_eventsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_usage_eventsPayload>
          }
          findFirst: {
            args: Prisma.agent_usage_eventsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_usage_eventsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.agent_usage_eventsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_usage_eventsPayload>
          }
          findMany: {
            args: Prisma.agent_usage_eventsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_usage_eventsPayload>[]
          }
          create: {
            args: Prisma.agent_usage_eventsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_usage_eventsPayload>
          }
          createMany: {
            args: Prisma.agent_usage_eventsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.agent_usage_eventsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_usage_eventsPayload>[]
          }
          delete: {
            args: Prisma.agent_usage_eventsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_usage_eventsPayload>
          }
          update: {
            args: Prisma.agent_usage_eventsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_usage_eventsPayload>
          }
          deleteMany: {
            args: Prisma.agent_usage_eventsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.agent_usage_eventsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.agent_usage_eventsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_usage_eventsPayload>[]
          }
          upsert: {
            args: Prisma.agent_usage_eventsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_usage_eventsPayload>
          }
          aggregate: {
            args: Prisma.Agent_usage_eventsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAgent_usage_events>
          }
          groupBy: {
            args: Prisma.agent_usage_eventsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Agent_usage_eventsGroupByOutputType>[]
          }
          count: {
            args: Prisma.agent_usage_eventsCountArgs<ExtArgs>
            result: $Utils.Optional<Agent_usage_eventsCountAggregateOutputType> | number
          }
        }
      }
      agents: {
        payload: Prisma.$agentsPayload<ExtArgs>
        fields: Prisma.agentsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.agentsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agentsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.agentsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agentsPayload>
          }
          findFirst: {
            args: Prisma.agentsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agentsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.agentsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agentsPayload>
          }
          findMany: {
            args: Prisma.agentsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agentsPayload>[]
          }
          create: {
            args: Prisma.agentsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agentsPayload>
          }
          createMany: {
            args: Prisma.agentsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.agentsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agentsPayload>[]
          }
          delete: {
            args: Prisma.agentsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agentsPayload>
          }
          update: {
            args: Prisma.agentsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agentsPayload>
          }
          deleteMany: {
            args: Prisma.agentsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.agentsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.agentsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agentsPayload>[]
          }
          upsert: {
            args: Prisma.agentsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agentsPayload>
          }
          aggregate: {
            args: Prisma.AgentsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAgents>
          }
          groupBy: {
            args: Prisma.agentsGroupByArgs<ExtArgs>
            result: $Utils.Optional<AgentsGroupByOutputType>[]
          }
          count: {
            args: Prisma.agentsCountArgs<ExtArgs>
            result: $Utils.Optional<AgentsCountAggregateOutputType> | number
          }
        }
      }
      agents_custom: {
        payload: Prisma.$agents_customPayload<ExtArgs>
        fields: Prisma.agents_customFieldRefs
        operations: {
          findUnique: {
            args: Prisma.agents_customFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agents_customPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.agents_customFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agents_customPayload>
          }
          findFirst: {
            args: Prisma.agents_customFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agents_customPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.agents_customFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agents_customPayload>
          }
          findMany: {
            args: Prisma.agents_customFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agents_customPayload>[]
          }
          create: {
            args: Prisma.agents_customCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agents_customPayload>
          }
          createMany: {
            args: Prisma.agents_customCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.agents_customCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agents_customPayload>[]
          }
          delete: {
            args: Prisma.agents_customDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agents_customPayload>
          }
          update: {
            args: Prisma.agents_customUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agents_customPayload>
          }
          deleteMany: {
            args: Prisma.agents_customDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.agents_customUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.agents_customUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agents_customPayload>[]
          }
          upsert: {
            args: Prisma.agents_customUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agents_customPayload>
          }
          aggregate: {
            args: Prisma.Agents_customAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAgents_custom>
          }
          groupBy: {
            args: Prisma.agents_customGroupByArgs<ExtArgs>
            result: $Utils.Optional<Agents_customGroupByOutputType>[]
          }
          count: {
            args: Prisma.agents_customCountArgs<ExtArgs>
            result: $Utils.Optional<Agents_customCountAggregateOutputType> | number
          }
        }
      }
      contractor_context: {
        payload: Prisma.$contractor_contextPayload<ExtArgs>
        fields: Prisma.contractor_contextFieldRefs
        operations: {
          findUnique: {
            args: Prisma.contractor_contextFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$contractor_contextPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.contractor_contextFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$contractor_contextPayload>
          }
          findFirst: {
            args: Prisma.contractor_contextFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$contractor_contextPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.contractor_contextFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$contractor_contextPayload>
          }
          findMany: {
            args: Prisma.contractor_contextFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$contractor_contextPayload>[]
          }
          create: {
            args: Prisma.contractor_contextCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$contractor_contextPayload>
          }
          createMany: {
            args: Prisma.contractor_contextCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.contractor_contextCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$contractor_contextPayload>[]
          }
          delete: {
            args: Prisma.contractor_contextDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$contractor_contextPayload>
          }
          update: {
            args: Prisma.contractor_contextUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$contractor_contextPayload>
          }
          deleteMany: {
            args: Prisma.contractor_contextDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.contractor_contextUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.contractor_contextUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$contractor_contextPayload>[]
          }
          upsert: {
            args: Prisma.contractor_contextUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$contractor_contextPayload>
          }
          aggregate: {
            args: Prisma.Contractor_contextAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContractor_context>
          }
          groupBy: {
            args: Prisma.contractor_contextGroupByArgs<ExtArgs>
            result: $Utils.Optional<Contractor_contextGroupByOutputType>[]
          }
          count: {
            args: Prisma.contractor_contextCountArgs<ExtArgs>
            result: $Utils.Optional<Contractor_contextCountAggregateOutputType> | number
          }
        }
      }
      rentals: {
        payload: Prisma.$rentalsPayload<ExtArgs>
        fields: Prisma.rentalsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.rentalsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rentalsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.rentalsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rentalsPayload>
          }
          findFirst: {
            args: Prisma.rentalsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rentalsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.rentalsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rentalsPayload>
          }
          findMany: {
            args: Prisma.rentalsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rentalsPayload>[]
          }
          create: {
            args: Prisma.rentalsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rentalsPayload>
          }
          createMany: {
            args: Prisma.rentalsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.rentalsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rentalsPayload>[]
          }
          delete: {
            args: Prisma.rentalsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rentalsPayload>
          }
          update: {
            args: Prisma.rentalsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rentalsPayload>
          }
          deleteMany: {
            args: Prisma.rentalsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.rentalsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.rentalsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rentalsPayload>[]
          }
          upsert: {
            args: Prisma.rentalsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rentalsPayload>
          }
          aggregate: {
            args: Prisma.RentalsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRentals>
          }
          groupBy: {
            args: Prisma.rentalsGroupByArgs<ExtArgs>
            result: $Utils.Optional<RentalsGroupByOutputType>[]
          }
          count: {
            args: Prisma.rentalsCountArgs<ExtArgs>
            result: $Utils.Optional<RentalsCountAggregateOutputType> | number
          }
        }
      }
      subscriptions: {
        payload: Prisma.$subscriptionsPayload<ExtArgs>
        fields: Prisma.subscriptionsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.subscriptionsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriptionsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.subscriptionsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriptionsPayload>
          }
          findFirst: {
            args: Prisma.subscriptionsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriptionsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.subscriptionsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriptionsPayload>
          }
          findMany: {
            args: Prisma.subscriptionsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriptionsPayload>[]
          }
          create: {
            args: Prisma.subscriptionsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriptionsPayload>
          }
          createMany: {
            args: Prisma.subscriptionsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.subscriptionsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriptionsPayload>[]
          }
          delete: {
            args: Prisma.subscriptionsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriptionsPayload>
          }
          update: {
            args: Prisma.subscriptionsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriptionsPayload>
          }
          deleteMany: {
            args: Prisma.subscriptionsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.subscriptionsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.subscriptionsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriptionsPayload>[]
          }
          upsert: {
            args: Prisma.subscriptionsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriptionsPayload>
          }
          aggregate: {
            args: Prisma.SubscriptionsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubscriptions>
          }
          groupBy: {
            args: Prisma.subscriptionsGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionsGroupByOutputType>[]
          }
          count: {
            args: Prisma.subscriptionsCountArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionsCountAggregateOutputType> | number
          }
        }
      }
      system_health_metrics: {
        payload: Prisma.$system_health_metricsPayload<ExtArgs>
        fields: Prisma.system_health_metricsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.system_health_metricsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$system_health_metricsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.system_health_metricsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$system_health_metricsPayload>
          }
          findFirst: {
            args: Prisma.system_health_metricsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$system_health_metricsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.system_health_metricsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$system_health_metricsPayload>
          }
          findMany: {
            args: Prisma.system_health_metricsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$system_health_metricsPayload>[]
          }
          create: {
            args: Prisma.system_health_metricsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$system_health_metricsPayload>
          }
          createMany: {
            args: Prisma.system_health_metricsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.system_health_metricsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$system_health_metricsPayload>[]
          }
          delete: {
            args: Prisma.system_health_metricsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$system_health_metricsPayload>
          }
          update: {
            args: Prisma.system_health_metricsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$system_health_metricsPayload>
          }
          deleteMany: {
            args: Prisma.system_health_metricsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.system_health_metricsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.system_health_metricsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$system_health_metricsPayload>[]
          }
          upsert: {
            args: Prisma.system_health_metricsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$system_health_metricsPayload>
          }
          aggregate: {
            args: Prisma.System_health_metricsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSystem_health_metrics>
          }
          groupBy: {
            args: Prisma.system_health_metricsGroupByArgs<ExtArgs>
            result: $Utils.Optional<System_health_metricsGroupByOutputType>[]
          }
          count: {
            args: Prisma.system_health_metricsCountArgs<ExtArgs>
            result: $Utils.Optional<System_health_metricsCountAggregateOutputType> | number
          }
        }
      }
      user_interactions: {
        payload: Prisma.$user_interactionsPayload<ExtArgs>
        fields: Prisma.user_interactionsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.user_interactionsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_interactionsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.user_interactionsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_interactionsPayload>
          }
          findFirst: {
            args: Prisma.user_interactionsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_interactionsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.user_interactionsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_interactionsPayload>
          }
          findMany: {
            args: Prisma.user_interactionsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_interactionsPayload>[]
          }
          create: {
            args: Prisma.user_interactionsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_interactionsPayload>
          }
          createMany: {
            args: Prisma.user_interactionsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.user_interactionsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_interactionsPayload>[]
          }
          delete: {
            args: Prisma.user_interactionsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_interactionsPayload>
          }
          update: {
            args: Prisma.user_interactionsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_interactionsPayload>
          }
          deleteMany: {
            args: Prisma.user_interactionsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.user_interactionsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.user_interactionsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_interactionsPayload>[]
          }
          upsert: {
            args: Prisma.user_interactionsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_interactionsPayload>
          }
          aggregate: {
            args: Prisma.User_interactionsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser_interactions>
          }
          groupBy: {
            args: Prisma.user_interactionsGroupByArgs<ExtArgs>
            result: $Utils.Optional<User_interactionsGroupByOutputType>[]
          }
          count: {
            args: Prisma.user_interactionsCountArgs<ExtArgs>
            result: $Utils.Optional<User_interactionsCountAggregateOutputType> | number
          }
        }
      }
      voice_samples: {
        payload: Prisma.$voice_samplesPayload<ExtArgs>
        fields: Prisma.voice_samplesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.voice_samplesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$voice_samplesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.voice_samplesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$voice_samplesPayload>
          }
          findFirst: {
            args: Prisma.voice_samplesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$voice_samplesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.voice_samplesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$voice_samplesPayload>
          }
          findMany: {
            args: Prisma.voice_samplesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$voice_samplesPayload>[]
          }
          create: {
            args: Prisma.voice_samplesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$voice_samplesPayload>
          }
          createMany: {
            args: Prisma.voice_samplesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.voice_samplesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$voice_samplesPayload>[]
          }
          delete: {
            args: Prisma.voice_samplesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$voice_samplesPayload>
          }
          update: {
            args: Prisma.voice_samplesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$voice_samplesPayload>
          }
          deleteMany: {
            args: Prisma.voice_samplesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.voice_samplesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.voice_samplesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$voice_samplesPayload>[]
          }
          upsert: {
            args: Prisma.voice_samplesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$voice_samplesPayload>
          }
          aggregate: {
            args: Prisma.Voice_samplesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVoice_samples>
          }
          groupBy: {
            args: Prisma.voice_samplesGroupByArgs<ExtArgs>
            result: $Utils.Optional<Voice_samplesGroupByOutputType>[]
          }
          count: {
            args: Prisma.voice_samplesCountArgs<ExtArgs>
            result: $Utils.Optional<Voice_samplesCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    agent_feedback?: agent_feedbackOmit
    agent_languages?: agent_languagesOmit
    agent_performance_metrics?: agent_performance_metricsOmit
    agent_usage_events?: agent_usage_eventsOmit
    agents?: agentsOmit
    agents_custom?: agents_customOmit
    contractor_context?: contractor_contextOmit
    rentals?: rentalsOmit
    subscriptions?: subscriptionsOmit
    system_health_metrics?: system_health_metricsOmit
    user_interactions?: user_interactionsOmit
    voice_samples?: voice_samplesOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type AgentsCountOutputType
   */

  export type AgentsCountOutputType = {
    rentals: number
    user_interactions: number
    voice_samples: number
  }

  export type AgentsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rentals?: boolean | AgentsCountOutputTypeCountRentalsArgs
    user_interactions?: boolean | AgentsCountOutputTypeCountUser_interactionsArgs
    voice_samples?: boolean | AgentsCountOutputTypeCountVoice_samplesArgs
  }

  // Custom InputTypes
  /**
   * AgentsCountOutputType without action
   */
  export type AgentsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentsCountOutputType
     */
    select?: AgentsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AgentsCountOutputType without action
   */
  export type AgentsCountOutputTypeCountRentalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: rentalsWhereInput
  }

  /**
   * AgentsCountOutputType without action
   */
  export type AgentsCountOutputTypeCountUser_interactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: user_interactionsWhereInput
  }

  /**
   * AgentsCountOutputType without action
   */
  export type AgentsCountOutputTypeCountVoice_samplesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: voice_samplesWhereInput
  }


  /**
   * Count Type Agents_customCountOutputType
   */

  export type Agents_customCountOutputType = {
    agent_feedback: number
    agent_languages: number
    agent_performance_metrics: number
    agent_usage_events: number
  }

  export type Agents_customCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent_feedback?: boolean | Agents_customCountOutputTypeCountAgent_feedbackArgs
    agent_languages?: boolean | Agents_customCountOutputTypeCountAgent_languagesArgs
    agent_performance_metrics?: boolean | Agents_customCountOutputTypeCountAgent_performance_metricsArgs
    agent_usage_events?: boolean | Agents_customCountOutputTypeCountAgent_usage_eventsArgs
  }

  // Custom InputTypes
  /**
   * Agents_customCountOutputType without action
   */
  export type Agents_customCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agents_customCountOutputType
     */
    select?: Agents_customCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Agents_customCountOutputType without action
   */
  export type Agents_customCountOutputTypeCountAgent_feedbackArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: agent_feedbackWhereInput
  }

  /**
   * Agents_customCountOutputType without action
   */
  export type Agents_customCountOutputTypeCountAgent_languagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: agent_languagesWhereInput
  }

  /**
   * Agents_customCountOutputType without action
   */
  export type Agents_customCountOutputTypeCountAgent_performance_metricsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: agent_performance_metricsWhereInput
  }

  /**
   * Agents_customCountOutputType without action
   */
  export type Agents_customCountOutputTypeCountAgent_usage_eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: agent_usage_eventsWhereInput
  }


  /**
   * Models
   */

  /**
   * Model agent_feedback
   */

  export type AggregateAgent_feedback = {
    _count: Agent_feedbackCountAggregateOutputType | null
    _avg: Agent_feedbackAvgAggregateOutputType | null
    _sum: Agent_feedbackSumAggregateOutputType | null
    _min: Agent_feedbackMinAggregateOutputType | null
    _max: Agent_feedbackMaxAggregateOutputType | null
  }

  export type Agent_feedbackAvgAggregateOutputType = {
    id: number | null
    agent_id: number | null
    rating: number | null
  }

  export type Agent_feedbackSumAggregateOutputType = {
    id: number | null
    agent_id: number | null
    rating: number | null
  }

  export type Agent_feedbackMinAggregateOutputType = {
    id: number | null
    agent_id: number | null
    rating: number | null
    feedback_text: string | null
    language_used: string | null
    user_session_id: string | null
    created_at: Date | null
  }

  export type Agent_feedbackMaxAggregateOutputType = {
    id: number | null
    agent_id: number | null
    rating: number | null
    feedback_text: string | null
    language_used: string | null
    user_session_id: string | null
    created_at: Date | null
  }

  export type Agent_feedbackCountAggregateOutputType = {
    id: number
    agent_id: number
    rating: number
    feedback_text: number
    language_used: number
    user_session_id: number
    created_at: number
    _all: number
  }


  export type Agent_feedbackAvgAggregateInputType = {
    id?: true
    agent_id?: true
    rating?: true
  }

  export type Agent_feedbackSumAggregateInputType = {
    id?: true
    agent_id?: true
    rating?: true
  }

  export type Agent_feedbackMinAggregateInputType = {
    id?: true
    agent_id?: true
    rating?: true
    feedback_text?: true
    language_used?: true
    user_session_id?: true
    created_at?: true
  }

  export type Agent_feedbackMaxAggregateInputType = {
    id?: true
    agent_id?: true
    rating?: true
    feedback_text?: true
    language_used?: true
    user_session_id?: true
    created_at?: true
  }

  export type Agent_feedbackCountAggregateInputType = {
    id?: true
    agent_id?: true
    rating?: true
    feedback_text?: true
    language_used?: true
    user_session_id?: true
    created_at?: true
    _all?: true
  }

  export type Agent_feedbackAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which agent_feedback to aggregate.
     */
    where?: agent_feedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of agent_feedbacks to fetch.
     */
    orderBy?: agent_feedbackOrderByWithRelationInput | agent_feedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: agent_feedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` agent_feedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` agent_feedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned agent_feedbacks
    **/
    _count?: true | Agent_feedbackCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Agent_feedbackAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Agent_feedbackSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Agent_feedbackMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Agent_feedbackMaxAggregateInputType
  }

  export type GetAgent_feedbackAggregateType<T extends Agent_feedbackAggregateArgs> = {
        [P in keyof T & keyof AggregateAgent_feedback]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAgent_feedback[P]>
      : GetScalarType<T[P], AggregateAgent_feedback[P]>
  }




  export type agent_feedbackGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: agent_feedbackWhereInput
    orderBy?: agent_feedbackOrderByWithAggregationInput | agent_feedbackOrderByWithAggregationInput[]
    by: Agent_feedbackScalarFieldEnum[] | Agent_feedbackScalarFieldEnum
    having?: agent_feedbackScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Agent_feedbackCountAggregateInputType | true
    _avg?: Agent_feedbackAvgAggregateInputType
    _sum?: Agent_feedbackSumAggregateInputType
    _min?: Agent_feedbackMinAggregateInputType
    _max?: Agent_feedbackMaxAggregateInputType
  }

  export type Agent_feedbackGroupByOutputType = {
    id: number
    agent_id: number | null
    rating: number | null
    feedback_text: string | null
    language_used: string | null
    user_session_id: string | null
    created_at: Date | null
    _count: Agent_feedbackCountAggregateOutputType | null
    _avg: Agent_feedbackAvgAggregateOutputType | null
    _sum: Agent_feedbackSumAggregateOutputType | null
    _min: Agent_feedbackMinAggregateOutputType | null
    _max: Agent_feedbackMaxAggregateOutputType | null
  }

  type GetAgent_feedbackGroupByPayload<T extends agent_feedbackGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Agent_feedbackGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Agent_feedbackGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Agent_feedbackGroupByOutputType[P]>
            : GetScalarType<T[P], Agent_feedbackGroupByOutputType[P]>
        }
      >
    >


  export type agent_feedbackSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agent_id?: boolean
    rating?: boolean
    feedback_text?: boolean
    language_used?: boolean
    user_session_id?: boolean
    created_at?: boolean
    agents_custom?: boolean | agent_feedback$agents_customArgs<ExtArgs>
  }, ExtArgs["result"]["agent_feedback"]>

  export type agent_feedbackSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agent_id?: boolean
    rating?: boolean
    feedback_text?: boolean
    language_used?: boolean
    user_session_id?: boolean
    created_at?: boolean
    agents_custom?: boolean | agent_feedback$agents_customArgs<ExtArgs>
  }, ExtArgs["result"]["agent_feedback"]>

  export type agent_feedbackSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agent_id?: boolean
    rating?: boolean
    feedback_text?: boolean
    language_used?: boolean
    user_session_id?: boolean
    created_at?: boolean
    agents_custom?: boolean | agent_feedback$agents_customArgs<ExtArgs>
  }, ExtArgs["result"]["agent_feedback"]>

  export type agent_feedbackSelectScalar = {
    id?: boolean
    agent_id?: boolean
    rating?: boolean
    feedback_text?: boolean
    language_used?: boolean
    user_session_id?: boolean
    created_at?: boolean
  }

  export type agent_feedbackOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "agent_id" | "rating" | "feedback_text" | "language_used" | "user_session_id" | "created_at", ExtArgs["result"]["agent_feedback"]>
  export type agent_feedbackInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agents_custom?: boolean | agent_feedback$agents_customArgs<ExtArgs>
  }
  export type agent_feedbackIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agents_custom?: boolean | agent_feedback$agents_customArgs<ExtArgs>
  }
  export type agent_feedbackIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agents_custom?: boolean | agent_feedback$agents_customArgs<ExtArgs>
  }

  export type $agent_feedbackPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "agent_feedback"
    objects: {
      agents_custom: Prisma.$agents_customPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      agent_id: number | null
      rating: number | null
      feedback_text: string | null
      language_used: string | null
      user_session_id: string | null
      created_at: Date | null
    }, ExtArgs["result"]["agent_feedback"]>
    composites: {}
  }

  type agent_feedbackGetPayload<S extends boolean | null | undefined | agent_feedbackDefaultArgs> = $Result.GetResult<Prisma.$agent_feedbackPayload, S>

  type agent_feedbackCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<agent_feedbackFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Agent_feedbackCountAggregateInputType | true
    }

  export interface agent_feedbackDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['agent_feedback'], meta: { name: 'agent_feedback' } }
    /**
     * Find zero or one Agent_feedback that matches the filter.
     * @param {agent_feedbackFindUniqueArgs} args - Arguments to find a Agent_feedback
     * @example
     * // Get one Agent_feedback
     * const agent_feedback = await prisma.agent_feedback.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends agent_feedbackFindUniqueArgs>(args: SelectSubset<T, agent_feedbackFindUniqueArgs<ExtArgs>>): Prisma__agent_feedbackClient<$Result.GetResult<Prisma.$agent_feedbackPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Agent_feedback that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {agent_feedbackFindUniqueOrThrowArgs} args - Arguments to find a Agent_feedback
     * @example
     * // Get one Agent_feedback
     * const agent_feedback = await prisma.agent_feedback.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends agent_feedbackFindUniqueOrThrowArgs>(args: SelectSubset<T, agent_feedbackFindUniqueOrThrowArgs<ExtArgs>>): Prisma__agent_feedbackClient<$Result.GetResult<Prisma.$agent_feedbackPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Agent_feedback that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agent_feedbackFindFirstArgs} args - Arguments to find a Agent_feedback
     * @example
     * // Get one Agent_feedback
     * const agent_feedback = await prisma.agent_feedback.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends agent_feedbackFindFirstArgs>(args?: SelectSubset<T, agent_feedbackFindFirstArgs<ExtArgs>>): Prisma__agent_feedbackClient<$Result.GetResult<Prisma.$agent_feedbackPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Agent_feedback that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agent_feedbackFindFirstOrThrowArgs} args - Arguments to find a Agent_feedback
     * @example
     * // Get one Agent_feedback
     * const agent_feedback = await prisma.agent_feedback.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends agent_feedbackFindFirstOrThrowArgs>(args?: SelectSubset<T, agent_feedbackFindFirstOrThrowArgs<ExtArgs>>): Prisma__agent_feedbackClient<$Result.GetResult<Prisma.$agent_feedbackPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Agent_feedbacks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agent_feedbackFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Agent_feedbacks
     * const agent_feedbacks = await prisma.agent_feedback.findMany()
     * 
     * // Get first 10 Agent_feedbacks
     * const agent_feedbacks = await prisma.agent_feedback.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const agent_feedbackWithIdOnly = await prisma.agent_feedback.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends agent_feedbackFindManyArgs>(args?: SelectSubset<T, agent_feedbackFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$agent_feedbackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Agent_feedback.
     * @param {agent_feedbackCreateArgs} args - Arguments to create a Agent_feedback.
     * @example
     * // Create one Agent_feedback
     * const Agent_feedback = await prisma.agent_feedback.create({
     *   data: {
     *     // ... data to create a Agent_feedback
     *   }
     * })
     * 
     */
    create<T extends agent_feedbackCreateArgs>(args: SelectSubset<T, agent_feedbackCreateArgs<ExtArgs>>): Prisma__agent_feedbackClient<$Result.GetResult<Prisma.$agent_feedbackPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Agent_feedbacks.
     * @param {agent_feedbackCreateManyArgs} args - Arguments to create many Agent_feedbacks.
     * @example
     * // Create many Agent_feedbacks
     * const agent_feedback = await prisma.agent_feedback.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends agent_feedbackCreateManyArgs>(args?: SelectSubset<T, agent_feedbackCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Agent_feedbacks and returns the data saved in the database.
     * @param {agent_feedbackCreateManyAndReturnArgs} args - Arguments to create many Agent_feedbacks.
     * @example
     * // Create many Agent_feedbacks
     * const agent_feedback = await prisma.agent_feedback.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Agent_feedbacks and only return the `id`
     * const agent_feedbackWithIdOnly = await prisma.agent_feedback.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends agent_feedbackCreateManyAndReturnArgs>(args?: SelectSubset<T, agent_feedbackCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$agent_feedbackPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Agent_feedback.
     * @param {agent_feedbackDeleteArgs} args - Arguments to delete one Agent_feedback.
     * @example
     * // Delete one Agent_feedback
     * const Agent_feedback = await prisma.agent_feedback.delete({
     *   where: {
     *     // ... filter to delete one Agent_feedback
     *   }
     * })
     * 
     */
    delete<T extends agent_feedbackDeleteArgs>(args: SelectSubset<T, agent_feedbackDeleteArgs<ExtArgs>>): Prisma__agent_feedbackClient<$Result.GetResult<Prisma.$agent_feedbackPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Agent_feedback.
     * @param {agent_feedbackUpdateArgs} args - Arguments to update one Agent_feedback.
     * @example
     * // Update one Agent_feedback
     * const agent_feedback = await prisma.agent_feedback.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends agent_feedbackUpdateArgs>(args: SelectSubset<T, agent_feedbackUpdateArgs<ExtArgs>>): Prisma__agent_feedbackClient<$Result.GetResult<Prisma.$agent_feedbackPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Agent_feedbacks.
     * @param {agent_feedbackDeleteManyArgs} args - Arguments to filter Agent_feedbacks to delete.
     * @example
     * // Delete a few Agent_feedbacks
     * const { count } = await prisma.agent_feedback.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends agent_feedbackDeleteManyArgs>(args?: SelectSubset<T, agent_feedbackDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Agent_feedbacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agent_feedbackUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Agent_feedbacks
     * const agent_feedback = await prisma.agent_feedback.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends agent_feedbackUpdateManyArgs>(args: SelectSubset<T, agent_feedbackUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Agent_feedbacks and returns the data updated in the database.
     * @param {agent_feedbackUpdateManyAndReturnArgs} args - Arguments to update many Agent_feedbacks.
     * @example
     * // Update many Agent_feedbacks
     * const agent_feedback = await prisma.agent_feedback.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Agent_feedbacks and only return the `id`
     * const agent_feedbackWithIdOnly = await prisma.agent_feedback.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends agent_feedbackUpdateManyAndReturnArgs>(args: SelectSubset<T, agent_feedbackUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$agent_feedbackPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Agent_feedback.
     * @param {agent_feedbackUpsertArgs} args - Arguments to update or create a Agent_feedback.
     * @example
     * // Update or create a Agent_feedback
     * const agent_feedback = await prisma.agent_feedback.upsert({
     *   create: {
     *     // ... data to create a Agent_feedback
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Agent_feedback we want to update
     *   }
     * })
     */
    upsert<T extends agent_feedbackUpsertArgs>(args: SelectSubset<T, agent_feedbackUpsertArgs<ExtArgs>>): Prisma__agent_feedbackClient<$Result.GetResult<Prisma.$agent_feedbackPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Agent_feedbacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agent_feedbackCountArgs} args - Arguments to filter Agent_feedbacks to count.
     * @example
     * // Count the number of Agent_feedbacks
     * const count = await prisma.agent_feedback.count({
     *   where: {
     *     // ... the filter for the Agent_feedbacks we want to count
     *   }
     * })
    **/
    count<T extends agent_feedbackCountArgs>(
      args?: Subset<T, agent_feedbackCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Agent_feedbackCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Agent_feedback.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Agent_feedbackAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Agent_feedbackAggregateArgs>(args: Subset<T, Agent_feedbackAggregateArgs>): Prisma.PrismaPromise<GetAgent_feedbackAggregateType<T>>

    /**
     * Group by Agent_feedback.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agent_feedbackGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends agent_feedbackGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: agent_feedbackGroupByArgs['orderBy'] }
        : { orderBy?: agent_feedbackGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, agent_feedbackGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAgent_feedbackGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the agent_feedback model
   */
  readonly fields: agent_feedbackFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for agent_feedback.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__agent_feedbackClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    agents_custom<T extends agent_feedback$agents_customArgs<ExtArgs> = {}>(args?: Subset<T, agent_feedback$agents_customArgs<ExtArgs>>): Prisma__agents_customClient<$Result.GetResult<Prisma.$agents_customPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the agent_feedback model
   */
  interface agent_feedbackFieldRefs {
    readonly id: FieldRef<"agent_feedback", 'Int'>
    readonly agent_id: FieldRef<"agent_feedback", 'Int'>
    readonly rating: FieldRef<"agent_feedback", 'Int'>
    readonly feedback_text: FieldRef<"agent_feedback", 'String'>
    readonly language_used: FieldRef<"agent_feedback", 'String'>
    readonly user_session_id: FieldRef<"agent_feedback", 'String'>
    readonly created_at: FieldRef<"agent_feedback", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * agent_feedback findUnique
   */
  export type agent_feedbackFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_feedback
     */
    select?: agent_feedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_feedback
     */
    omit?: agent_feedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_feedbackInclude<ExtArgs> | null
    /**
     * Filter, which agent_feedback to fetch.
     */
    where: agent_feedbackWhereUniqueInput
  }

  /**
   * agent_feedback findUniqueOrThrow
   */
  export type agent_feedbackFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_feedback
     */
    select?: agent_feedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_feedback
     */
    omit?: agent_feedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_feedbackInclude<ExtArgs> | null
    /**
     * Filter, which agent_feedback to fetch.
     */
    where: agent_feedbackWhereUniqueInput
  }

  /**
   * agent_feedback findFirst
   */
  export type agent_feedbackFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_feedback
     */
    select?: agent_feedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_feedback
     */
    omit?: agent_feedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_feedbackInclude<ExtArgs> | null
    /**
     * Filter, which agent_feedback to fetch.
     */
    where?: agent_feedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of agent_feedbacks to fetch.
     */
    orderBy?: agent_feedbackOrderByWithRelationInput | agent_feedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for agent_feedbacks.
     */
    cursor?: agent_feedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` agent_feedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` agent_feedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of agent_feedbacks.
     */
    distinct?: Agent_feedbackScalarFieldEnum | Agent_feedbackScalarFieldEnum[]
  }

  /**
   * agent_feedback findFirstOrThrow
   */
  export type agent_feedbackFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_feedback
     */
    select?: agent_feedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_feedback
     */
    omit?: agent_feedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_feedbackInclude<ExtArgs> | null
    /**
     * Filter, which agent_feedback to fetch.
     */
    where?: agent_feedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of agent_feedbacks to fetch.
     */
    orderBy?: agent_feedbackOrderByWithRelationInput | agent_feedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for agent_feedbacks.
     */
    cursor?: agent_feedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` agent_feedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` agent_feedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of agent_feedbacks.
     */
    distinct?: Agent_feedbackScalarFieldEnum | Agent_feedbackScalarFieldEnum[]
  }

  /**
   * agent_feedback findMany
   */
  export type agent_feedbackFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_feedback
     */
    select?: agent_feedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_feedback
     */
    omit?: agent_feedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_feedbackInclude<ExtArgs> | null
    /**
     * Filter, which agent_feedbacks to fetch.
     */
    where?: agent_feedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of agent_feedbacks to fetch.
     */
    orderBy?: agent_feedbackOrderByWithRelationInput | agent_feedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing agent_feedbacks.
     */
    cursor?: agent_feedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` agent_feedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` agent_feedbacks.
     */
    skip?: number
    distinct?: Agent_feedbackScalarFieldEnum | Agent_feedbackScalarFieldEnum[]
  }

  /**
   * agent_feedback create
   */
  export type agent_feedbackCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_feedback
     */
    select?: agent_feedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_feedback
     */
    omit?: agent_feedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_feedbackInclude<ExtArgs> | null
    /**
     * The data needed to create a agent_feedback.
     */
    data?: XOR<agent_feedbackCreateInput, agent_feedbackUncheckedCreateInput>
  }

  /**
   * agent_feedback createMany
   */
  export type agent_feedbackCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many agent_feedbacks.
     */
    data: agent_feedbackCreateManyInput | agent_feedbackCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * agent_feedback createManyAndReturn
   */
  export type agent_feedbackCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_feedback
     */
    select?: agent_feedbackSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the agent_feedback
     */
    omit?: agent_feedbackOmit<ExtArgs> | null
    /**
     * The data used to create many agent_feedbacks.
     */
    data: agent_feedbackCreateManyInput | agent_feedbackCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_feedbackIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * agent_feedback update
   */
  export type agent_feedbackUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_feedback
     */
    select?: agent_feedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_feedback
     */
    omit?: agent_feedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_feedbackInclude<ExtArgs> | null
    /**
     * The data needed to update a agent_feedback.
     */
    data: XOR<agent_feedbackUpdateInput, agent_feedbackUncheckedUpdateInput>
    /**
     * Choose, which agent_feedback to update.
     */
    where: agent_feedbackWhereUniqueInput
  }

  /**
   * agent_feedback updateMany
   */
  export type agent_feedbackUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update agent_feedbacks.
     */
    data: XOR<agent_feedbackUpdateManyMutationInput, agent_feedbackUncheckedUpdateManyInput>
    /**
     * Filter which agent_feedbacks to update
     */
    where?: agent_feedbackWhereInput
    /**
     * Limit how many agent_feedbacks to update.
     */
    limit?: number
  }

  /**
   * agent_feedback updateManyAndReturn
   */
  export type agent_feedbackUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_feedback
     */
    select?: agent_feedbackSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the agent_feedback
     */
    omit?: agent_feedbackOmit<ExtArgs> | null
    /**
     * The data used to update agent_feedbacks.
     */
    data: XOR<agent_feedbackUpdateManyMutationInput, agent_feedbackUncheckedUpdateManyInput>
    /**
     * Filter which agent_feedbacks to update
     */
    where?: agent_feedbackWhereInput
    /**
     * Limit how many agent_feedbacks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_feedbackIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * agent_feedback upsert
   */
  export type agent_feedbackUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_feedback
     */
    select?: agent_feedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_feedback
     */
    omit?: agent_feedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_feedbackInclude<ExtArgs> | null
    /**
     * The filter to search for the agent_feedback to update in case it exists.
     */
    where: agent_feedbackWhereUniqueInput
    /**
     * In case the agent_feedback found by the `where` argument doesn't exist, create a new agent_feedback with this data.
     */
    create: XOR<agent_feedbackCreateInput, agent_feedbackUncheckedCreateInput>
    /**
     * In case the agent_feedback was found with the provided `where` argument, update it with this data.
     */
    update: XOR<agent_feedbackUpdateInput, agent_feedbackUncheckedUpdateInput>
  }

  /**
   * agent_feedback delete
   */
  export type agent_feedbackDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_feedback
     */
    select?: agent_feedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_feedback
     */
    omit?: agent_feedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_feedbackInclude<ExtArgs> | null
    /**
     * Filter which agent_feedback to delete.
     */
    where: agent_feedbackWhereUniqueInput
  }

  /**
   * agent_feedback deleteMany
   */
  export type agent_feedbackDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which agent_feedbacks to delete
     */
    where?: agent_feedbackWhereInput
    /**
     * Limit how many agent_feedbacks to delete.
     */
    limit?: number
  }

  /**
   * agent_feedback.agents_custom
   */
  export type agent_feedback$agents_customArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agents_custom
     */
    select?: agents_customSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agents_custom
     */
    omit?: agents_customOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agents_customInclude<ExtArgs> | null
    where?: agents_customWhereInput
  }

  /**
   * agent_feedback without action
   */
  export type agent_feedbackDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_feedback
     */
    select?: agent_feedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_feedback
     */
    omit?: agent_feedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_feedbackInclude<ExtArgs> | null
  }


  /**
   * Model agent_languages
   */

  export type AggregateAgent_languages = {
    _count: Agent_languagesCountAggregateOutputType | null
    _avg: Agent_languagesAvgAggregateOutputType | null
    _sum: Agent_languagesSumAggregateOutputType | null
    _min: Agent_languagesMinAggregateOutputType | null
    _max: Agent_languagesMaxAggregateOutputType | null
  }

  export type Agent_languagesAvgAggregateOutputType = {
    id: number | null
    agent_id: number | null
  }

  export type Agent_languagesSumAggregateOutputType = {
    id: number | null
    agent_id: number | null
  }

  export type Agent_languagesMinAggregateOutputType = {
    id: number | null
    agent_id: number | null
    language_code: string | null
    personality_translation: string | null
    voice_id: string | null
    is_primary: boolean | null
    created_at: Date | null
  }

  export type Agent_languagesMaxAggregateOutputType = {
    id: number | null
    agent_id: number | null
    language_code: string | null
    personality_translation: string | null
    voice_id: string | null
    is_primary: boolean | null
    created_at: Date | null
  }

  export type Agent_languagesCountAggregateOutputType = {
    id: number
    agent_id: number
    language_code: number
    personality_translation: number
    voice_id: number
    voice_settings: number
    is_primary: number
    created_at: number
    _all: number
  }


  export type Agent_languagesAvgAggregateInputType = {
    id?: true
    agent_id?: true
  }

  export type Agent_languagesSumAggregateInputType = {
    id?: true
    agent_id?: true
  }

  export type Agent_languagesMinAggregateInputType = {
    id?: true
    agent_id?: true
    language_code?: true
    personality_translation?: true
    voice_id?: true
    is_primary?: true
    created_at?: true
  }

  export type Agent_languagesMaxAggregateInputType = {
    id?: true
    agent_id?: true
    language_code?: true
    personality_translation?: true
    voice_id?: true
    is_primary?: true
    created_at?: true
  }

  export type Agent_languagesCountAggregateInputType = {
    id?: true
    agent_id?: true
    language_code?: true
    personality_translation?: true
    voice_id?: true
    voice_settings?: true
    is_primary?: true
    created_at?: true
    _all?: true
  }

  export type Agent_languagesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which agent_languages to aggregate.
     */
    where?: agent_languagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of agent_languages to fetch.
     */
    orderBy?: agent_languagesOrderByWithRelationInput | agent_languagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: agent_languagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` agent_languages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` agent_languages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned agent_languages
    **/
    _count?: true | Agent_languagesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Agent_languagesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Agent_languagesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Agent_languagesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Agent_languagesMaxAggregateInputType
  }

  export type GetAgent_languagesAggregateType<T extends Agent_languagesAggregateArgs> = {
        [P in keyof T & keyof AggregateAgent_languages]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAgent_languages[P]>
      : GetScalarType<T[P], AggregateAgent_languages[P]>
  }




  export type agent_languagesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: agent_languagesWhereInput
    orderBy?: agent_languagesOrderByWithAggregationInput | agent_languagesOrderByWithAggregationInput[]
    by: Agent_languagesScalarFieldEnum[] | Agent_languagesScalarFieldEnum
    having?: agent_languagesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Agent_languagesCountAggregateInputType | true
    _avg?: Agent_languagesAvgAggregateInputType
    _sum?: Agent_languagesSumAggregateInputType
    _min?: Agent_languagesMinAggregateInputType
    _max?: Agent_languagesMaxAggregateInputType
  }

  export type Agent_languagesGroupByOutputType = {
    id: number
    agent_id: number | null
    language_code: string
    personality_translation: string | null
    voice_id: string | null
    voice_settings: JsonValue | null
    is_primary: boolean | null
    created_at: Date | null
    _count: Agent_languagesCountAggregateOutputType | null
    _avg: Agent_languagesAvgAggregateOutputType | null
    _sum: Agent_languagesSumAggregateOutputType | null
    _min: Agent_languagesMinAggregateOutputType | null
    _max: Agent_languagesMaxAggregateOutputType | null
  }

  type GetAgent_languagesGroupByPayload<T extends agent_languagesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Agent_languagesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Agent_languagesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Agent_languagesGroupByOutputType[P]>
            : GetScalarType<T[P], Agent_languagesGroupByOutputType[P]>
        }
      >
    >


  export type agent_languagesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agent_id?: boolean
    language_code?: boolean
    personality_translation?: boolean
    voice_id?: boolean
    voice_settings?: boolean
    is_primary?: boolean
    created_at?: boolean
    agents_custom?: boolean | agent_languages$agents_customArgs<ExtArgs>
  }, ExtArgs["result"]["agent_languages"]>

  export type agent_languagesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agent_id?: boolean
    language_code?: boolean
    personality_translation?: boolean
    voice_id?: boolean
    voice_settings?: boolean
    is_primary?: boolean
    created_at?: boolean
    agents_custom?: boolean | agent_languages$agents_customArgs<ExtArgs>
  }, ExtArgs["result"]["agent_languages"]>

  export type agent_languagesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agent_id?: boolean
    language_code?: boolean
    personality_translation?: boolean
    voice_id?: boolean
    voice_settings?: boolean
    is_primary?: boolean
    created_at?: boolean
    agents_custom?: boolean | agent_languages$agents_customArgs<ExtArgs>
  }, ExtArgs["result"]["agent_languages"]>

  export type agent_languagesSelectScalar = {
    id?: boolean
    agent_id?: boolean
    language_code?: boolean
    personality_translation?: boolean
    voice_id?: boolean
    voice_settings?: boolean
    is_primary?: boolean
    created_at?: boolean
  }

  export type agent_languagesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "agent_id" | "language_code" | "personality_translation" | "voice_id" | "voice_settings" | "is_primary" | "created_at", ExtArgs["result"]["agent_languages"]>
  export type agent_languagesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agents_custom?: boolean | agent_languages$agents_customArgs<ExtArgs>
  }
  export type agent_languagesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agents_custom?: boolean | agent_languages$agents_customArgs<ExtArgs>
  }
  export type agent_languagesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agents_custom?: boolean | agent_languages$agents_customArgs<ExtArgs>
  }

  export type $agent_languagesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "agent_languages"
    objects: {
      agents_custom: Prisma.$agents_customPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      agent_id: number | null
      language_code: string
      personality_translation: string | null
      voice_id: string | null
      voice_settings: Prisma.JsonValue | null
      is_primary: boolean | null
      created_at: Date | null
    }, ExtArgs["result"]["agent_languages"]>
    composites: {}
  }

  type agent_languagesGetPayload<S extends boolean | null | undefined | agent_languagesDefaultArgs> = $Result.GetResult<Prisma.$agent_languagesPayload, S>

  type agent_languagesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<agent_languagesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Agent_languagesCountAggregateInputType | true
    }

  export interface agent_languagesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['agent_languages'], meta: { name: 'agent_languages' } }
    /**
     * Find zero or one Agent_languages that matches the filter.
     * @param {agent_languagesFindUniqueArgs} args - Arguments to find a Agent_languages
     * @example
     * // Get one Agent_languages
     * const agent_languages = await prisma.agent_languages.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends agent_languagesFindUniqueArgs>(args: SelectSubset<T, agent_languagesFindUniqueArgs<ExtArgs>>): Prisma__agent_languagesClient<$Result.GetResult<Prisma.$agent_languagesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Agent_languages that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {agent_languagesFindUniqueOrThrowArgs} args - Arguments to find a Agent_languages
     * @example
     * // Get one Agent_languages
     * const agent_languages = await prisma.agent_languages.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends agent_languagesFindUniqueOrThrowArgs>(args: SelectSubset<T, agent_languagesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__agent_languagesClient<$Result.GetResult<Prisma.$agent_languagesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Agent_languages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agent_languagesFindFirstArgs} args - Arguments to find a Agent_languages
     * @example
     * // Get one Agent_languages
     * const agent_languages = await prisma.agent_languages.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends agent_languagesFindFirstArgs>(args?: SelectSubset<T, agent_languagesFindFirstArgs<ExtArgs>>): Prisma__agent_languagesClient<$Result.GetResult<Prisma.$agent_languagesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Agent_languages that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agent_languagesFindFirstOrThrowArgs} args - Arguments to find a Agent_languages
     * @example
     * // Get one Agent_languages
     * const agent_languages = await prisma.agent_languages.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends agent_languagesFindFirstOrThrowArgs>(args?: SelectSubset<T, agent_languagesFindFirstOrThrowArgs<ExtArgs>>): Prisma__agent_languagesClient<$Result.GetResult<Prisma.$agent_languagesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Agent_languages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agent_languagesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Agent_languages
     * const agent_languages = await prisma.agent_languages.findMany()
     * 
     * // Get first 10 Agent_languages
     * const agent_languages = await prisma.agent_languages.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const agent_languagesWithIdOnly = await prisma.agent_languages.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends agent_languagesFindManyArgs>(args?: SelectSubset<T, agent_languagesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$agent_languagesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Agent_languages.
     * @param {agent_languagesCreateArgs} args - Arguments to create a Agent_languages.
     * @example
     * // Create one Agent_languages
     * const Agent_languages = await prisma.agent_languages.create({
     *   data: {
     *     // ... data to create a Agent_languages
     *   }
     * })
     * 
     */
    create<T extends agent_languagesCreateArgs>(args: SelectSubset<T, agent_languagesCreateArgs<ExtArgs>>): Prisma__agent_languagesClient<$Result.GetResult<Prisma.$agent_languagesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Agent_languages.
     * @param {agent_languagesCreateManyArgs} args - Arguments to create many Agent_languages.
     * @example
     * // Create many Agent_languages
     * const agent_languages = await prisma.agent_languages.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends agent_languagesCreateManyArgs>(args?: SelectSubset<T, agent_languagesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Agent_languages and returns the data saved in the database.
     * @param {agent_languagesCreateManyAndReturnArgs} args - Arguments to create many Agent_languages.
     * @example
     * // Create many Agent_languages
     * const agent_languages = await prisma.agent_languages.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Agent_languages and only return the `id`
     * const agent_languagesWithIdOnly = await prisma.agent_languages.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends agent_languagesCreateManyAndReturnArgs>(args?: SelectSubset<T, agent_languagesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$agent_languagesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Agent_languages.
     * @param {agent_languagesDeleteArgs} args - Arguments to delete one Agent_languages.
     * @example
     * // Delete one Agent_languages
     * const Agent_languages = await prisma.agent_languages.delete({
     *   where: {
     *     // ... filter to delete one Agent_languages
     *   }
     * })
     * 
     */
    delete<T extends agent_languagesDeleteArgs>(args: SelectSubset<T, agent_languagesDeleteArgs<ExtArgs>>): Prisma__agent_languagesClient<$Result.GetResult<Prisma.$agent_languagesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Agent_languages.
     * @param {agent_languagesUpdateArgs} args - Arguments to update one Agent_languages.
     * @example
     * // Update one Agent_languages
     * const agent_languages = await prisma.agent_languages.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends agent_languagesUpdateArgs>(args: SelectSubset<T, agent_languagesUpdateArgs<ExtArgs>>): Prisma__agent_languagesClient<$Result.GetResult<Prisma.$agent_languagesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Agent_languages.
     * @param {agent_languagesDeleteManyArgs} args - Arguments to filter Agent_languages to delete.
     * @example
     * // Delete a few Agent_languages
     * const { count } = await prisma.agent_languages.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends agent_languagesDeleteManyArgs>(args?: SelectSubset<T, agent_languagesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Agent_languages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agent_languagesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Agent_languages
     * const agent_languages = await prisma.agent_languages.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends agent_languagesUpdateManyArgs>(args: SelectSubset<T, agent_languagesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Agent_languages and returns the data updated in the database.
     * @param {agent_languagesUpdateManyAndReturnArgs} args - Arguments to update many Agent_languages.
     * @example
     * // Update many Agent_languages
     * const agent_languages = await prisma.agent_languages.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Agent_languages and only return the `id`
     * const agent_languagesWithIdOnly = await prisma.agent_languages.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends agent_languagesUpdateManyAndReturnArgs>(args: SelectSubset<T, agent_languagesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$agent_languagesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Agent_languages.
     * @param {agent_languagesUpsertArgs} args - Arguments to update or create a Agent_languages.
     * @example
     * // Update or create a Agent_languages
     * const agent_languages = await prisma.agent_languages.upsert({
     *   create: {
     *     // ... data to create a Agent_languages
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Agent_languages we want to update
     *   }
     * })
     */
    upsert<T extends agent_languagesUpsertArgs>(args: SelectSubset<T, agent_languagesUpsertArgs<ExtArgs>>): Prisma__agent_languagesClient<$Result.GetResult<Prisma.$agent_languagesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Agent_languages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agent_languagesCountArgs} args - Arguments to filter Agent_languages to count.
     * @example
     * // Count the number of Agent_languages
     * const count = await prisma.agent_languages.count({
     *   where: {
     *     // ... the filter for the Agent_languages we want to count
     *   }
     * })
    **/
    count<T extends agent_languagesCountArgs>(
      args?: Subset<T, agent_languagesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Agent_languagesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Agent_languages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Agent_languagesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Agent_languagesAggregateArgs>(args: Subset<T, Agent_languagesAggregateArgs>): Prisma.PrismaPromise<GetAgent_languagesAggregateType<T>>

    /**
     * Group by Agent_languages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agent_languagesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends agent_languagesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: agent_languagesGroupByArgs['orderBy'] }
        : { orderBy?: agent_languagesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, agent_languagesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAgent_languagesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the agent_languages model
   */
  readonly fields: agent_languagesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for agent_languages.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__agent_languagesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    agents_custom<T extends agent_languages$agents_customArgs<ExtArgs> = {}>(args?: Subset<T, agent_languages$agents_customArgs<ExtArgs>>): Prisma__agents_customClient<$Result.GetResult<Prisma.$agents_customPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the agent_languages model
   */
  interface agent_languagesFieldRefs {
    readonly id: FieldRef<"agent_languages", 'Int'>
    readonly agent_id: FieldRef<"agent_languages", 'Int'>
    readonly language_code: FieldRef<"agent_languages", 'String'>
    readonly personality_translation: FieldRef<"agent_languages", 'String'>
    readonly voice_id: FieldRef<"agent_languages", 'String'>
    readonly voice_settings: FieldRef<"agent_languages", 'Json'>
    readonly is_primary: FieldRef<"agent_languages", 'Boolean'>
    readonly created_at: FieldRef<"agent_languages", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * agent_languages findUnique
   */
  export type agent_languagesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_languages
     */
    select?: agent_languagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_languages
     */
    omit?: agent_languagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_languagesInclude<ExtArgs> | null
    /**
     * Filter, which agent_languages to fetch.
     */
    where: agent_languagesWhereUniqueInput
  }

  /**
   * agent_languages findUniqueOrThrow
   */
  export type agent_languagesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_languages
     */
    select?: agent_languagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_languages
     */
    omit?: agent_languagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_languagesInclude<ExtArgs> | null
    /**
     * Filter, which agent_languages to fetch.
     */
    where: agent_languagesWhereUniqueInput
  }

  /**
   * agent_languages findFirst
   */
  export type agent_languagesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_languages
     */
    select?: agent_languagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_languages
     */
    omit?: agent_languagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_languagesInclude<ExtArgs> | null
    /**
     * Filter, which agent_languages to fetch.
     */
    where?: agent_languagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of agent_languages to fetch.
     */
    orderBy?: agent_languagesOrderByWithRelationInput | agent_languagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for agent_languages.
     */
    cursor?: agent_languagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` agent_languages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` agent_languages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of agent_languages.
     */
    distinct?: Agent_languagesScalarFieldEnum | Agent_languagesScalarFieldEnum[]
  }

  /**
   * agent_languages findFirstOrThrow
   */
  export type agent_languagesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_languages
     */
    select?: agent_languagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_languages
     */
    omit?: agent_languagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_languagesInclude<ExtArgs> | null
    /**
     * Filter, which agent_languages to fetch.
     */
    where?: agent_languagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of agent_languages to fetch.
     */
    orderBy?: agent_languagesOrderByWithRelationInput | agent_languagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for agent_languages.
     */
    cursor?: agent_languagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` agent_languages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` agent_languages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of agent_languages.
     */
    distinct?: Agent_languagesScalarFieldEnum | Agent_languagesScalarFieldEnum[]
  }

  /**
   * agent_languages findMany
   */
  export type agent_languagesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_languages
     */
    select?: agent_languagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_languages
     */
    omit?: agent_languagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_languagesInclude<ExtArgs> | null
    /**
     * Filter, which agent_languages to fetch.
     */
    where?: agent_languagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of agent_languages to fetch.
     */
    orderBy?: agent_languagesOrderByWithRelationInput | agent_languagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing agent_languages.
     */
    cursor?: agent_languagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` agent_languages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` agent_languages.
     */
    skip?: number
    distinct?: Agent_languagesScalarFieldEnum | Agent_languagesScalarFieldEnum[]
  }

  /**
   * agent_languages create
   */
  export type agent_languagesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_languages
     */
    select?: agent_languagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_languages
     */
    omit?: agent_languagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_languagesInclude<ExtArgs> | null
    /**
     * The data needed to create a agent_languages.
     */
    data: XOR<agent_languagesCreateInput, agent_languagesUncheckedCreateInput>
  }

  /**
   * agent_languages createMany
   */
  export type agent_languagesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many agent_languages.
     */
    data: agent_languagesCreateManyInput | agent_languagesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * agent_languages createManyAndReturn
   */
  export type agent_languagesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_languages
     */
    select?: agent_languagesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the agent_languages
     */
    omit?: agent_languagesOmit<ExtArgs> | null
    /**
     * The data used to create many agent_languages.
     */
    data: agent_languagesCreateManyInput | agent_languagesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_languagesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * agent_languages update
   */
  export type agent_languagesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_languages
     */
    select?: agent_languagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_languages
     */
    omit?: agent_languagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_languagesInclude<ExtArgs> | null
    /**
     * The data needed to update a agent_languages.
     */
    data: XOR<agent_languagesUpdateInput, agent_languagesUncheckedUpdateInput>
    /**
     * Choose, which agent_languages to update.
     */
    where: agent_languagesWhereUniqueInput
  }

  /**
   * agent_languages updateMany
   */
  export type agent_languagesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update agent_languages.
     */
    data: XOR<agent_languagesUpdateManyMutationInput, agent_languagesUncheckedUpdateManyInput>
    /**
     * Filter which agent_languages to update
     */
    where?: agent_languagesWhereInput
    /**
     * Limit how many agent_languages to update.
     */
    limit?: number
  }

  /**
   * agent_languages updateManyAndReturn
   */
  export type agent_languagesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_languages
     */
    select?: agent_languagesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the agent_languages
     */
    omit?: agent_languagesOmit<ExtArgs> | null
    /**
     * The data used to update agent_languages.
     */
    data: XOR<agent_languagesUpdateManyMutationInput, agent_languagesUncheckedUpdateManyInput>
    /**
     * Filter which agent_languages to update
     */
    where?: agent_languagesWhereInput
    /**
     * Limit how many agent_languages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_languagesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * agent_languages upsert
   */
  export type agent_languagesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_languages
     */
    select?: agent_languagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_languages
     */
    omit?: agent_languagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_languagesInclude<ExtArgs> | null
    /**
     * The filter to search for the agent_languages to update in case it exists.
     */
    where: agent_languagesWhereUniqueInput
    /**
     * In case the agent_languages found by the `where` argument doesn't exist, create a new agent_languages with this data.
     */
    create: XOR<agent_languagesCreateInput, agent_languagesUncheckedCreateInput>
    /**
     * In case the agent_languages was found with the provided `where` argument, update it with this data.
     */
    update: XOR<agent_languagesUpdateInput, agent_languagesUncheckedUpdateInput>
  }

  /**
   * agent_languages delete
   */
  export type agent_languagesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_languages
     */
    select?: agent_languagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_languages
     */
    omit?: agent_languagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_languagesInclude<ExtArgs> | null
    /**
     * Filter which agent_languages to delete.
     */
    where: agent_languagesWhereUniqueInput
  }

  /**
   * agent_languages deleteMany
   */
  export type agent_languagesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which agent_languages to delete
     */
    where?: agent_languagesWhereInput
    /**
     * Limit how many agent_languages to delete.
     */
    limit?: number
  }

  /**
   * agent_languages.agents_custom
   */
  export type agent_languages$agents_customArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agents_custom
     */
    select?: agents_customSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agents_custom
     */
    omit?: agents_customOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agents_customInclude<ExtArgs> | null
    where?: agents_customWhereInput
  }

  /**
   * agent_languages without action
   */
  export type agent_languagesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_languages
     */
    select?: agent_languagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_languages
     */
    omit?: agent_languagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_languagesInclude<ExtArgs> | null
  }


  /**
   * Model agent_performance_metrics
   */

  export type AggregateAgent_performance_metrics = {
    _count: Agent_performance_metricsCountAggregateOutputType | null
    _avg: Agent_performance_metricsAvgAggregateOutputType | null
    _sum: Agent_performance_metricsSumAggregateOutputType | null
    _min: Agent_performance_metricsMinAggregateOutputType | null
    _max: Agent_performance_metricsMaxAggregateOutputType | null
  }

  export type Agent_performance_metricsAvgAggregateOutputType = {
    id: number | null
    agent_id: number | null
    total_interactions: number | null
    successful_interactions: number | null
    avg_response_time_ms: number | null
    voice_generation_count: number | null
    error_count: number | null
  }

  export type Agent_performance_metricsSumAggregateOutputType = {
    id: number | null
    agent_id: number | null
    total_interactions: number | null
    successful_interactions: number | null
    avg_response_time_ms: number | null
    voice_generation_count: number | null
    error_count: number | null
  }

  export type Agent_performance_metricsMinAggregateOutputType = {
    id: number | null
    agent_id: number | null
    metric_date: Date | null
    total_interactions: number | null
    successful_interactions: number | null
    avg_response_time_ms: number | null
    voice_generation_count: number | null
    error_count: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Agent_performance_metricsMaxAggregateOutputType = {
    id: number | null
    agent_id: number | null
    metric_date: Date | null
    total_interactions: number | null
    successful_interactions: number | null
    avg_response_time_ms: number | null
    voice_generation_count: number | null
    error_count: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Agent_performance_metricsCountAggregateOutputType = {
    id: number
    agent_id: number
    metric_date: number
    total_interactions: number
    successful_interactions: number
    avg_response_time_ms: number
    voice_generation_count: number
    error_count: number
    language_breakdown: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type Agent_performance_metricsAvgAggregateInputType = {
    id?: true
    agent_id?: true
    total_interactions?: true
    successful_interactions?: true
    avg_response_time_ms?: true
    voice_generation_count?: true
    error_count?: true
  }

  export type Agent_performance_metricsSumAggregateInputType = {
    id?: true
    agent_id?: true
    total_interactions?: true
    successful_interactions?: true
    avg_response_time_ms?: true
    voice_generation_count?: true
    error_count?: true
  }

  export type Agent_performance_metricsMinAggregateInputType = {
    id?: true
    agent_id?: true
    metric_date?: true
    total_interactions?: true
    successful_interactions?: true
    avg_response_time_ms?: true
    voice_generation_count?: true
    error_count?: true
    created_at?: true
    updated_at?: true
  }

  export type Agent_performance_metricsMaxAggregateInputType = {
    id?: true
    agent_id?: true
    metric_date?: true
    total_interactions?: true
    successful_interactions?: true
    avg_response_time_ms?: true
    voice_generation_count?: true
    error_count?: true
    created_at?: true
    updated_at?: true
  }

  export type Agent_performance_metricsCountAggregateInputType = {
    id?: true
    agent_id?: true
    metric_date?: true
    total_interactions?: true
    successful_interactions?: true
    avg_response_time_ms?: true
    voice_generation_count?: true
    error_count?: true
    language_breakdown?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type Agent_performance_metricsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which agent_performance_metrics to aggregate.
     */
    where?: agent_performance_metricsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of agent_performance_metrics to fetch.
     */
    orderBy?: agent_performance_metricsOrderByWithRelationInput | agent_performance_metricsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: agent_performance_metricsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` agent_performance_metrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` agent_performance_metrics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned agent_performance_metrics
    **/
    _count?: true | Agent_performance_metricsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Agent_performance_metricsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Agent_performance_metricsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Agent_performance_metricsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Agent_performance_metricsMaxAggregateInputType
  }

  export type GetAgent_performance_metricsAggregateType<T extends Agent_performance_metricsAggregateArgs> = {
        [P in keyof T & keyof AggregateAgent_performance_metrics]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAgent_performance_metrics[P]>
      : GetScalarType<T[P], AggregateAgent_performance_metrics[P]>
  }




  export type agent_performance_metricsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: agent_performance_metricsWhereInput
    orderBy?: agent_performance_metricsOrderByWithAggregationInput | agent_performance_metricsOrderByWithAggregationInput[]
    by: Agent_performance_metricsScalarFieldEnum[] | Agent_performance_metricsScalarFieldEnum
    having?: agent_performance_metricsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Agent_performance_metricsCountAggregateInputType | true
    _avg?: Agent_performance_metricsAvgAggregateInputType
    _sum?: Agent_performance_metricsSumAggregateInputType
    _min?: Agent_performance_metricsMinAggregateInputType
    _max?: Agent_performance_metricsMaxAggregateInputType
  }

  export type Agent_performance_metricsGroupByOutputType = {
    id: number
    agent_id: number | null
    metric_date: Date | null
    total_interactions: number | null
    successful_interactions: number | null
    avg_response_time_ms: number | null
    voice_generation_count: number | null
    error_count: number | null
    language_breakdown: JsonValue | null
    created_at: Date | null
    updated_at: Date | null
    _count: Agent_performance_metricsCountAggregateOutputType | null
    _avg: Agent_performance_metricsAvgAggregateOutputType | null
    _sum: Agent_performance_metricsSumAggregateOutputType | null
    _min: Agent_performance_metricsMinAggregateOutputType | null
    _max: Agent_performance_metricsMaxAggregateOutputType | null
  }

  type GetAgent_performance_metricsGroupByPayload<T extends agent_performance_metricsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Agent_performance_metricsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Agent_performance_metricsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Agent_performance_metricsGroupByOutputType[P]>
            : GetScalarType<T[P], Agent_performance_metricsGroupByOutputType[P]>
        }
      >
    >


  export type agent_performance_metricsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agent_id?: boolean
    metric_date?: boolean
    total_interactions?: boolean
    successful_interactions?: boolean
    avg_response_time_ms?: boolean
    voice_generation_count?: boolean
    error_count?: boolean
    language_breakdown?: boolean
    created_at?: boolean
    updated_at?: boolean
    agents_custom?: boolean | agent_performance_metrics$agents_customArgs<ExtArgs>
  }, ExtArgs["result"]["agent_performance_metrics"]>

  export type agent_performance_metricsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agent_id?: boolean
    metric_date?: boolean
    total_interactions?: boolean
    successful_interactions?: boolean
    avg_response_time_ms?: boolean
    voice_generation_count?: boolean
    error_count?: boolean
    language_breakdown?: boolean
    created_at?: boolean
    updated_at?: boolean
    agents_custom?: boolean | agent_performance_metrics$agents_customArgs<ExtArgs>
  }, ExtArgs["result"]["agent_performance_metrics"]>

  export type agent_performance_metricsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agent_id?: boolean
    metric_date?: boolean
    total_interactions?: boolean
    successful_interactions?: boolean
    avg_response_time_ms?: boolean
    voice_generation_count?: boolean
    error_count?: boolean
    language_breakdown?: boolean
    created_at?: boolean
    updated_at?: boolean
    agents_custom?: boolean | agent_performance_metrics$agents_customArgs<ExtArgs>
  }, ExtArgs["result"]["agent_performance_metrics"]>

  export type agent_performance_metricsSelectScalar = {
    id?: boolean
    agent_id?: boolean
    metric_date?: boolean
    total_interactions?: boolean
    successful_interactions?: boolean
    avg_response_time_ms?: boolean
    voice_generation_count?: boolean
    error_count?: boolean
    language_breakdown?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type agent_performance_metricsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "agent_id" | "metric_date" | "total_interactions" | "successful_interactions" | "avg_response_time_ms" | "voice_generation_count" | "error_count" | "language_breakdown" | "created_at" | "updated_at", ExtArgs["result"]["agent_performance_metrics"]>
  export type agent_performance_metricsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agents_custom?: boolean | agent_performance_metrics$agents_customArgs<ExtArgs>
  }
  export type agent_performance_metricsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agents_custom?: boolean | agent_performance_metrics$agents_customArgs<ExtArgs>
  }
  export type agent_performance_metricsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agents_custom?: boolean | agent_performance_metrics$agents_customArgs<ExtArgs>
  }

  export type $agent_performance_metricsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "agent_performance_metrics"
    objects: {
      agents_custom: Prisma.$agents_customPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      agent_id: number | null
      metric_date: Date | null
      total_interactions: number | null
      successful_interactions: number | null
      avg_response_time_ms: number | null
      voice_generation_count: number | null
      error_count: number | null
      language_breakdown: Prisma.JsonValue | null
      created_at: Date | null
      updated_at: Date | null
    }, ExtArgs["result"]["agent_performance_metrics"]>
    composites: {}
  }

  type agent_performance_metricsGetPayload<S extends boolean | null | undefined | agent_performance_metricsDefaultArgs> = $Result.GetResult<Prisma.$agent_performance_metricsPayload, S>

  type agent_performance_metricsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<agent_performance_metricsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Agent_performance_metricsCountAggregateInputType | true
    }

  export interface agent_performance_metricsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['agent_performance_metrics'], meta: { name: 'agent_performance_metrics' } }
    /**
     * Find zero or one Agent_performance_metrics that matches the filter.
     * @param {agent_performance_metricsFindUniqueArgs} args - Arguments to find a Agent_performance_metrics
     * @example
     * // Get one Agent_performance_metrics
     * const agent_performance_metrics = await prisma.agent_performance_metrics.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends agent_performance_metricsFindUniqueArgs>(args: SelectSubset<T, agent_performance_metricsFindUniqueArgs<ExtArgs>>): Prisma__agent_performance_metricsClient<$Result.GetResult<Prisma.$agent_performance_metricsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Agent_performance_metrics that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {agent_performance_metricsFindUniqueOrThrowArgs} args - Arguments to find a Agent_performance_metrics
     * @example
     * // Get one Agent_performance_metrics
     * const agent_performance_metrics = await prisma.agent_performance_metrics.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends agent_performance_metricsFindUniqueOrThrowArgs>(args: SelectSubset<T, agent_performance_metricsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__agent_performance_metricsClient<$Result.GetResult<Prisma.$agent_performance_metricsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Agent_performance_metrics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agent_performance_metricsFindFirstArgs} args - Arguments to find a Agent_performance_metrics
     * @example
     * // Get one Agent_performance_metrics
     * const agent_performance_metrics = await prisma.agent_performance_metrics.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends agent_performance_metricsFindFirstArgs>(args?: SelectSubset<T, agent_performance_metricsFindFirstArgs<ExtArgs>>): Prisma__agent_performance_metricsClient<$Result.GetResult<Prisma.$agent_performance_metricsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Agent_performance_metrics that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agent_performance_metricsFindFirstOrThrowArgs} args - Arguments to find a Agent_performance_metrics
     * @example
     * // Get one Agent_performance_metrics
     * const agent_performance_metrics = await prisma.agent_performance_metrics.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends agent_performance_metricsFindFirstOrThrowArgs>(args?: SelectSubset<T, agent_performance_metricsFindFirstOrThrowArgs<ExtArgs>>): Prisma__agent_performance_metricsClient<$Result.GetResult<Prisma.$agent_performance_metricsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Agent_performance_metrics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agent_performance_metricsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Agent_performance_metrics
     * const agent_performance_metrics = await prisma.agent_performance_metrics.findMany()
     * 
     * // Get first 10 Agent_performance_metrics
     * const agent_performance_metrics = await prisma.agent_performance_metrics.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const agent_performance_metricsWithIdOnly = await prisma.agent_performance_metrics.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends agent_performance_metricsFindManyArgs>(args?: SelectSubset<T, agent_performance_metricsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$agent_performance_metricsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Agent_performance_metrics.
     * @param {agent_performance_metricsCreateArgs} args - Arguments to create a Agent_performance_metrics.
     * @example
     * // Create one Agent_performance_metrics
     * const Agent_performance_metrics = await prisma.agent_performance_metrics.create({
     *   data: {
     *     // ... data to create a Agent_performance_metrics
     *   }
     * })
     * 
     */
    create<T extends agent_performance_metricsCreateArgs>(args: SelectSubset<T, agent_performance_metricsCreateArgs<ExtArgs>>): Prisma__agent_performance_metricsClient<$Result.GetResult<Prisma.$agent_performance_metricsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Agent_performance_metrics.
     * @param {agent_performance_metricsCreateManyArgs} args - Arguments to create many Agent_performance_metrics.
     * @example
     * // Create many Agent_performance_metrics
     * const agent_performance_metrics = await prisma.agent_performance_metrics.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends agent_performance_metricsCreateManyArgs>(args?: SelectSubset<T, agent_performance_metricsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Agent_performance_metrics and returns the data saved in the database.
     * @param {agent_performance_metricsCreateManyAndReturnArgs} args - Arguments to create many Agent_performance_metrics.
     * @example
     * // Create many Agent_performance_metrics
     * const agent_performance_metrics = await prisma.agent_performance_metrics.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Agent_performance_metrics and only return the `id`
     * const agent_performance_metricsWithIdOnly = await prisma.agent_performance_metrics.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends agent_performance_metricsCreateManyAndReturnArgs>(args?: SelectSubset<T, agent_performance_metricsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$agent_performance_metricsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Agent_performance_metrics.
     * @param {agent_performance_metricsDeleteArgs} args - Arguments to delete one Agent_performance_metrics.
     * @example
     * // Delete one Agent_performance_metrics
     * const Agent_performance_metrics = await prisma.agent_performance_metrics.delete({
     *   where: {
     *     // ... filter to delete one Agent_performance_metrics
     *   }
     * })
     * 
     */
    delete<T extends agent_performance_metricsDeleteArgs>(args: SelectSubset<T, agent_performance_metricsDeleteArgs<ExtArgs>>): Prisma__agent_performance_metricsClient<$Result.GetResult<Prisma.$agent_performance_metricsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Agent_performance_metrics.
     * @param {agent_performance_metricsUpdateArgs} args - Arguments to update one Agent_performance_metrics.
     * @example
     * // Update one Agent_performance_metrics
     * const agent_performance_metrics = await prisma.agent_performance_metrics.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends agent_performance_metricsUpdateArgs>(args: SelectSubset<T, agent_performance_metricsUpdateArgs<ExtArgs>>): Prisma__agent_performance_metricsClient<$Result.GetResult<Prisma.$agent_performance_metricsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Agent_performance_metrics.
     * @param {agent_performance_metricsDeleteManyArgs} args - Arguments to filter Agent_performance_metrics to delete.
     * @example
     * // Delete a few Agent_performance_metrics
     * const { count } = await prisma.agent_performance_metrics.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends agent_performance_metricsDeleteManyArgs>(args?: SelectSubset<T, agent_performance_metricsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Agent_performance_metrics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agent_performance_metricsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Agent_performance_metrics
     * const agent_performance_metrics = await prisma.agent_performance_metrics.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends agent_performance_metricsUpdateManyArgs>(args: SelectSubset<T, agent_performance_metricsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Agent_performance_metrics and returns the data updated in the database.
     * @param {agent_performance_metricsUpdateManyAndReturnArgs} args - Arguments to update many Agent_performance_metrics.
     * @example
     * // Update many Agent_performance_metrics
     * const agent_performance_metrics = await prisma.agent_performance_metrics.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Agent_performance_metrics and only return the `id`
     * const agent_performance_metricsWithIdOnly = await prisma.agent_performance_metrics.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends agent_performance_metricsUpdateManyAndReturnArgs>(args: SelectSubset<T, agent_performance_metricsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$agent_performance_metricsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Agent_performance_metrics.
     * @param {agent_performance_metricsUpsertArgs} args - Arguments to update or create a Agent_performance_metrics.
     * @example
     * // Update or create a Agent_performance_metrics
     * const agent_performance_metrics = await prisma.agent_performance_metrics.upsert({
     *   create: {
     *     // ... data to create a Agent_performance_metrics
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Agent_performance_metrics we want to update
     *   }
     * })
     */
    upsert<T extends agent_performance_metricsUpsertArgs>(args: SelectSubset<T, agent_performance_metricsUpsertArgs<ExtArgs>>): Prisma__agent_performance_metricsClient<$Result.GetResult<Prisma.$agent_performance_metricsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Agent_performance_metrics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agent_performance_metricsCountArgs} args - Arguments to filter Agent_performance_metrics to count.
     * @example
     * // Count the number of Agent_performance_metrics
     * const count = await prisma.agent_performance_metrics.count({
     *   where: {
     *     // ... the filter for the Agent_performance_metrics we want to count
     *   }
     * })
    **/
    count<T extends agent_performance_metricsCountArgs>(
      args?: Subset<T, agent_performance_metricsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Agent_performance_metricsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Agent_performance_metrics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Agent_performance_metricsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Agent_performance_metricsAggregateArgs>(args: Subset<T, Agent_performance_metricsAggregateArgs>): Prisma.PrismaPromise<GetAgent_performance_metricsAggregateType<T>>

    /**
     * Group by Agent_performance_metrics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agent_performance_metricsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends agent_performance_metricsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: agent_performance_metricsGroupByArgs['orderBy'] }
        : { orderBy?: agent_performance_metricsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, agent_performance_metricsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAgent_performance_metricsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the agent_performance_metrics model
   */
  readonly fields: agent_performance_metricsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for agent_performance_metrics.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__agent_performance_metricsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    agents_custom<T extends agent_performance_metrics$agents_customArgs<ExtArgs> = {}>(args?: Subset<T, agent_performance_metrics$agents_customArgs<ExtArgs>>): Prisma__agents_customClient<$Result.GetResult<Prisma.$agents_customPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the agent_performance_metrics model
   */
  interface agent_performance_metricsFieldRefs {
    readonly id: FieldRef<"agent_performance_metrics", 'Int'>
    readonly agent_id: FieldRef<"agent_performance_metrics", 'Int'>
    readonly metric_date: FieldRef<"agent_performance_metrics", 'DateTime'>
    readonly total_interactions: FieldRef<"agent_performance_metrics", 'Int'>
    readonly successful_interactions: FieldRef<"agent_performance_metrics", 'Int'>
    readonly avg_response_time_ms: FieldRef<"agent_performance_metrics", 'Int'>
    readonly voice_generation_count: FieldRef<"agent_performance_metrics", 'Int'>
    readonly error_count: FieldRef<"agent_performance_metrics", 'Int'>
    readonly language_breakdown: FieldRef<"agent_performance_metrics", 'Json'>
    readonly created_at: FieldRef<"agent_performance_metrics", 'DateTime'>
    readonly updated_at: FieldRef<"agent_performance_metrics", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * agent_performance_metrics findUnique
   */
  export type agent_performance_metricsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_performance_metrics
     */
    select?: agent_performance_metricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_performance_metrics
     */
    omit?: agent_performance_metricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_performance_metricsInclude<ExtArgs> | null
    /**
     * Filter, which agent_performance_metrics to fetch.
     */
    where: agent_performance_metricsWhereUniqueInput
  }

  /**
   * agent_performance_metrics findUniqueOrThrow
   */
  export type agent_performance_metricsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_performance_metrics
     */
    select?: agent_performance_metricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_performance_metrics
     */
    omit?: agent_performance_metricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_performance_metricsInclude<ExtArgs> | null
    /**
     * Filter, which agent_performance_metrics to fetch.
     */
    where: agent_performance_metricsWhereUniqueInput
  }

  /**
   * agent_performance_metrics findFirst
   */
  export type agent_performance_metricsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_performance_metrics
     */
    select?: agent_performance_metricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_performance_metrics
     */
    omit?: agent_performance_metricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_performance_metricsInclude<ExtArgs> | null
    /**
     * Filter, which agent_performance_metrics to fetch.
     */
    where?: agent_performance_metricsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of agent_performance_metrics to fetch.
     */
    orderBy?: agent_performance_metricsOrderByWithRelationInput | agent_performance_metricsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for agent_performance_metrics.
     */
    cursor?: agent_performance_metricsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` agent_performance_metrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` agent_performance_metrics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of agent_performance_metrics.
     */
    distinct?: Agent_performance_metricsScalarFieldEnum | Agent_performance_metricsScalarFieldEnum[]
  }

  /**
   * agent_performance_metrics findFirstOrThrow
   */
  export type agent_performance_metricsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_performance_metrics
     */
    select?: agent_performance_metricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_performance_metrics
     */
    omit?: agent_performance_metricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_performance_metricsInclude<ExtArgs> | null
    /**
     * Filter, which agent_performance_metrics to fetch.
     */
    where?: agent_performance_metricsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of agent_performance_metrics to fetch.
     */
    orderBy?: agent_performance_metricsOrderByWithRelationInput | agent_performance_metricsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for agent_performance_metrics.
     */
    cursor?: agent_performance_metricsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` agent_performance_metrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` agent_performance_metrics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of agent_performance_metrics.
     */
    distinct?: Agent_performance_metricsScalarFieldEnum | Agent_performance_metricsScalarFieldEnum[]
  }

  /**
   * agent_performance_metrics findMany
   */
  export type agent_performance_metricsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_performance_metrics
     */
    select?: agent_performance_metricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_performance_metrics
     */
    omit?: agent_performance_metricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_performance_metricsInclude<ExtArgs> | null
    /**
     * Filter, which agent_performance_metrics to fetch.
     */
    where?: agent_performance_metricsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of agent_performance_metrics to fetch.
     */
    orderBy?: agent_performance_metricsOrderByWithRelationInput | agent_performance_metricsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing agent_performance_metrics.
     */
    cursor?: agent_performance_metricsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` agent_performance_metrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` agent_performance_metrics.
     */
    skip?: number
    distinct?: Agent_performance_metricsScalarFieldEnum | Agent_performance_metricsScalarFieldEnum[]
  }

  /**
   * agent_performance_metrics create
   */
  export type agent_performance_metricsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_performance_metrics
     */
    select?: agent_performance_metricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_performance_metrics
     */
    omit?: agent_performance_metricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_performance_metricsInclude<ExtArgs> | null
    /**
     * The data needed to create a agent_performance_metrics.
     */
    data?: XOR<agent_performance_metricsCreateInput, agent_performance_metricsUncheckedCreateInput>
  }

  /**
   * agent_performance_metrics createMany
   */
  export type agent_performance_metricsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many agent_performance_metrics.
     */
    data: agent_performance_metricsCreateManyInput | agent_performance_metricsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * agent_performance_metrics createManyAndReturn
   */
  export type agent_performance_metricsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_performance_metrics
     */
    select?: agent_performance_metricsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the agent_performance_metrics
     */
    omit?: agent_performance_metricsOmit<ExtArgs> | null
    /**
     * The data used to create many agent_performance_metrics.
     */
    data: agent_performance_metricsCreateManyInput | agent_performance_metricsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_performance_metricsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * agent_performance_metrics update
   */
  export type agent_performance_metricsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_performance_metrics
     */
    select?: agent_performance_metricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_performance_metrics
     */
    omit?: agent_performance_metricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_performance_metricsInclude<ExtArgs> | null
    /**
     * The data needed to update a agent_performance_metrics.
     */
    data: XOR<agent_performance_metricsUpdateInput, agent_performance_metricsUncheckedUpdateInput>
    /**
     * Choose, which agent_performance_metrics to update.
     */
    where: agent_performance_metricsWhereUniqueInput
  }

  /**
   * agent_performance_metrics updateMany
   */
  export type agent_performance_metricsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update agent_performance_metrics.
     */
    data: XOR<agent_performance_metricsUpdateManyMutationInput, agent_performance_metricsUncheckedUpdateManyInput>
    /**
     * Filter which agent_performance_metrics to update
     */
    where?: agent_performance_metricsWhereInput
    /**
     * Limit how many agent_performance_metrics to update.
     */
    limit?: number
  }

  /**
   * agent_performance_metrics updateManyAndReturn
   */
  export type agent_performance_metricsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_performance_metrics
     */
    select?: agent_performance_metricsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the agent_performance_metrics
     */
    omit?: agent_performance_metricsOmit<ExtArgs> | null
    /**
     * The data used to update agent_performance_metrics.
     */
    data: XOR<agent_performance_metricsUpdateManyMutationInput, agent_performance_metricsUncheckedUpdateManyInput>
    /**
     * Filter which agent_performance_metrics to update
     */
    where?: agent_performance_metricsWhereInput
    /**
     * Limit how many agent_performance_metrics to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_performance_metricsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * agent_performance_metrics upsert
   */
  export type agent_performance_metricsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_performance_metrics
     */
    select?: agent_performance_metricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_performance_metrics
     */
    omit?: agent_performance_metricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_performance_metricsInclude<ExtArgs> | null
    /**
     * The filter to search for the agent_performance_metrics to update in case it exists.
     */
    where: agent_performance_metricsWhereUniqueInput
    /**
     * In case the agent_performance_metrics found by the `where` argument doesn't exist, create a new agent_performance_metrics with this data.
     */
    create: XOR<agent_performance_metricsCreateInput, agent_performance_metricsUncheckedCreateInput>
    /**
     * In case the agent_performance_metrics was found with the provided `where` argument, update it with this data.
     */
    update: XOR<agent_performance_metricsUpdateInput, agent_performance_metricsUncheckedUpdateInput>
  }

  /**
   * agent_performance_metrics delete
   */
  export type agent_performance_metricsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_performance_metrics
     */
    select?: agent_performance_metricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_performance_metrics
     */
    omit?: agent_performance_metricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_performance_metricsInclude<ExtArgs> | null
    /**
     * Filter which agent_performance_metrics to delete.
     */
    where: agent_performance_metricsWhereUniqueInput
  }

  /**
   * agent_performance_metrics deleteMany
   */
  export type agent_performance_metricsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which agent_performance_metrics to delete
     */
    where?: agent_performance_metricsWhereInput
    /**
     * Limit how many agent_performance_metrics to delete.
     */
    limit?: number
  }

  /**
   * agent_performance_metrics.agents_custom
   */
  export type agent_performance_metrics$agents_customArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agents_custom
     */
    select?: agents_customSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agents_custom
     */
    omit?: agents_customOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agents_customInclude<ExtArgs> | null
    where?: agents_customWhereInput
  }

  /**
   * agent_performance_metrics without action
   */
  export type agent_performance_metricsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_performance_metrics
     */
    select?: agent_performance_metricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_performance_metrics
     */
    omit?: agent_performance_metricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_performance_metricsInclude<ExtArgs> | null
  }


  /**
   * Model agent_usage_events
   */

  export type AggregateAgent_usage_events = {
    _count: Agent_usage_eventsCountAggregateOutputType | null
    _avg: Agent_usage_eventsAvgAggregateOutputType | null
    _sum: Agent_usage_eventsSumAggregateOutputType | null
    _min: Agent_usage_eventsMinAggregateOutputType | null
    _max: Agent_usage_eventsMaxAggregateOutputType | null
  }

  export type Agent_usage_eventsAvgAggregateOutputType = {
    id: number | null
    agent_id: number | null
  }

  export type Agent_usage_eventsSumAggregateOutputType = {
    id: number | null
    agent_id: number | null
  }

  export type Agent_usage_eventsMinAggregateOutputType = {
    id: number | null
    agent_id: number | null
    event_type: string | null
    user_session_id: string | null
    ip_address: string | null
    user_agent: string | null
    language_used: string | null
    created_at: Date | null
  }

  export type Agent_usage_eventsMaxAggregateOutputType = {
    id: number | null
    agent_id: number | null
    event_type: string | null
    user_session_id: string | null
    ip_address: string | null
    user_agent: string | null
    language_used: string | null
    created_at: Date | null
  }

  export type Agent_usage_eventsCountAggregateOutputType = {
    id: number
    agent_id: number
    event_type: number
    event_data: number
    user_session_id: number
    ip_address: number
    user_agent: number
    language_used: number
    created_at: number
    _all: number
  }


  export type Agent_usage_eventsAvgAggregateInputType = {
    id?: true
    agent_id?: true
  }

  export type Agent_usage_eventsSumAggregateInputType = {
    id?: true
    agent_id?: true
  }

  export type Agent_usage_eventsMinAggregateInputType = {
    id?: true
    agent_id?: true
    event_type?: true
    user_session_id?: true
    ip_address?: true
    user_agent?: true
    language_used?: true
    created_at?: true
  }

  export type Agent_usage_eventsMaxAggregateInputType = {
    id?: true
    agent_id?: true
    event_type?: true
    user_session_id?: true
    ip_address?: true
    user_agent?: true
    language_used?: true
    created_at?: true
  }

  export type Agent_usage_eventsCountAggregateInputType = {
    id?: true
    agent_id?: true
    event_type?: true
    event_data?: true
    user_session_id?: true
    ip_address?: true
    user_agent?: true
    language_used?: true
    created_at?: true
    _all?: true
  }

  export type Agent_usage_eventsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which agent_usage_events to aggregate.
     */
    where?: agent_usage_eventsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of agent_usage_events to fetch.
     */
    orderBy?: agent_usage_eventsOrderByWithRelationInput | agent_usage_eventsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: agent_usage_eventsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` agent_usage_events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` agent_usage_events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned agent_usage_events
    **/
    _count?: true | Agent_usage_eventsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Agent_usage_eventsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Agent_usage_eventsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Agent_usage_eventsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Agent_usage_eventsMaxAggregateInputType
  }

  export type GetAgent_usage_eventsAggregateType<T extends Agent_usage_eventsAggregateArgs> = {
        [P in keyof T & keyof AggregateAgent_usage_events]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAgent_usage_events[P]>
      : GetScalarType<T[P], AggregateAgent_usage_events[P]>
  }




  export type agent_usage_eventsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: agent_usage_eventsWhereInput
    orderBy?: agent_usage_eventsOrderByWithAggregationInput | agent_usage_eventsOrderByWithAggregationInput[]
    by: Agent_usage_eventsScalarFieldEnum[] | Agent_usage_eventsScalarFieldEnum
    having?: agent_usage_eventsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Agent_usage_eventsCountAggregateInputType | true
    _avg?: Agent_usage_eventsAvgAggregateInputType
    _sum?: Agent_usage_eventsSumAggregateInputType
    _min?: Agent_usage_eventsMinAggregateInputType
    _max?: Agent_usage_eventsMaxAggregateInputType
  }

  export type Agent_usage_eventsGroupByOutputType = {
    id: number
    agent_id: number | null
    event_type: string
    event_data: JsonValue | null
    user_session_id: string | null
    ip_address: string | null
    user_agent: string | null
    language_used: string | null
    created_at: Date | null
    _count: Agent_usage_eventsCountAggregateOutputType | null
    _avg: Agent_usage_eventsAvgAggregateOutputType | null
    _sum: Agent_usage_eventsSumAggregateOutputType | null
    _min: Agent_usage_eventsMinAggregateOutputType | null
    _max: Agent_usage_eventsMaxAggregateOutputType | null
  }

  type GetAgent_usage_eventsGroupByPayload<T extends agent_usage_eventsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Agent_usage_eventsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Agent_usage_eventsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Agent_usage_eventsGroupByOutputType[P]>
            : GetScalarType<T[P], Agent_usage_eventsGroupByOutputType[P]>
        }
      >
    >


  export type agent_usage_eventsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agent_id?: boolean
    event_type?: boolean
    event_data?: boolean
    user_session_id?: boolean
    ip_address?: boolean
    user_agent?: boolean
    language_used?: boolean
    created_at?: boolean
    agents_custom?: boolean | agent_usage_events$agents_customArgs<ExtArgs>
  }, ExtArgs["result"]["agent_usage_events"]>

  export type agent_usage_eventsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agent_id?: boolean
    event_type?: boolean
    event_data?: boolean
    user_session_id?: boolean
    ip_address?: boolean
    user_agent?: boolean
    language_used?: boolean
    created_at?: boolean
    agents_custom?: boolean | agent_usage_events$agents_customArgs<ExtArgs>
  }, ExtArgs["result"]["agent_usage_events"]>

  export type agent_usage_eventsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agent_id?: boolean
    event_type?: boolean
    event_data?: boolean
    user_session_id?: boolean
    ip_address?: boolean
    user_agent?: boolean
    language_used?: boolean
    created_at?: boolean
    agents_custom?: boolean | agent_usage_events$agents_customArgs<ExtArgs>
  }, ExtArgs["result"]["agent_usage_events"]>

  export type agent_usage_eventsSelectScalar = {
    id?: boolean
    agent_id?: boolean
    event_type?: boolean
    event_data?: boolean
    user_session_id?: boolean
    ip_address?: boolean
    user_agent?: boolean
    language_used?: boolean
    created_at?: boolean
  }

  export type agent_usage_eventsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "agent_id" | "event_type" | "event_data" | "user_session_id" | "ip_address" | "user_agent" | "language_used" | "created_at", ExtArgs["result"]["agent_usage_events"]>
  export type agent_usage_eventsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agents_custom?: boolean | agent_usage_events$agents_customArgs<ExtArgs>
  }
  export type agent_usage_eventsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agents_custom?: boolean | agent_usage_events$agents_customArgs<ExtArgs>
  }
  export type agent_usage_eventsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agents_custom?: boolean | agent_usage_events$agents_customArgs<ExtArgs>
  }

  export type $agent_usage_eventsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "agent_usage_events"
    objects: {
      agents_custom: Prisma.$agents_customPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      agent_id: number | null
      event_type: string
      event_data: Prisma.JsonValue | null
      user_session_id: string | null
      ip_address: string | null
      user_agent: string | null
      language_used: string | null
      created_at: Date | null
    }, ExtArgs["result"]["agent_usage_events"]>
    composites: {}
  }

  type agent_usage_eventsGetPayload<S extends boolean | null | undefined | agent_usage_eventsDefaultArgs> = $Result.GetResult<Prisma.$agent_usage_eventsPayload, S>

  type agent_usage_eventsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<agent_usage_eventsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Agent_usage_eventsCountAggregateInputType | true
    }

  export interface agent_usage_eventsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['agent_usage_events'], meta: { name: 'agent_usage_events' } }
    /**
     * Find zero or one Agent_usage_events that matches the filter.
     * @param {agent_usage_eventsFindUniqueArgs} args - Arguments to find a Agent_usage_events
     * @example
     * // Get one Agent_usage_events
     * const agent_usage_events = await prisma.agent_usage_events.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends agent_usage_eventsFindUniqueArgs>(args: SelectSubset<T, agent_usage_eventsFindUniqueArgs<ExtArgs>>): Prisma__agent_usage_eventsClient<$Result.GetResult<Prisma.$agent_usage_eventsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Agent_usage_events that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {agent_usage_eventsFindUniqueOrThrowArgs} args - Arguments to find a Agent_usage_events
     * @example
     * // Get one Agent_usage_events
     * const agent_usage_events = await prisma.agent_usage_events.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends agent_usage_eventsFindUniqueOrThrowArgs>(args: SelectSubset<T, agent_usage_eventsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__agent_usage_eventsClient<$Result.GetResult<Prisma.$agent_usage_eventsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Agent_usage_events that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agent_usage_eventsFindFirstArgs} args - Arguments to find a Agent_usage_events
     * @example
     * // Get one Agent_usage_events
     * const agent_usage_events = await prisma.agent_usage_events.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends agent_usage_eventsFindFirstArgs>(args?: SelectSubset<T, agent_usage_eventsFindFirstArgs<ExtArgs>>): Prisma__agent_usage_eventsClient<$Result.GetResult<Prisma.$agent_usage_eventsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Agent_usage_events that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agent_usage_eventsFindFirstOrThrowArgs} args - Arguments to find a Agent_usage_events
     * @example
     * // Get one Agent_usage_events
     * const agent_usage_events = await prisma.agent_usage_events.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends agent_usage_eventsFindFirstOrThrowArgs>(args?: SelectSubset<T, agent_usage_eventsFindFirstOrThrowArgs<ExtArgs>>): Prisma__agent_usage_eventsClient<$Result.GetResult<Prisma.$agent_usage_eventsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Agent_usage_events that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agent_usage_eventsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Agent_usage_events
     * const agent_usage_events = await prisma.agent_usage_events.findMany()
     * 
     * // Get first 10 Agent_usage_events
     * const agent_usage_events = await prisma.agent_usage_events.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const agent_usage_eventsWithIdOnly = await prisma.agent_usage_events.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends agent_usage_eventsFindManyArgs>(args?: SelectSubset<T, agent_usage_eventsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$agent_usage_eventsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Agent_usage_events.
     * @param {agent_usage_eventsCreateArgs} args - Arguments to create a Agent_usage_events.
     * @example
     * // Create one Agent_usage_events
     * const Agent_usage_events = await prisma.agent_usage_events.create({
     *   data: {
     *     // ... data to create a Agent_usage_events
     *   }
     * })
     * 
     */
    create<T extends agent_usage_eventsCreateArgs>(args: SelectSubset<T, agent_usage_eventsCreateArgs<ExtArgs>>): Prisma__agent_usage_eventsClient<$Result.GetResult<Prisma.$agent_usage_eventsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Agent_usage_events.
     * @param {agent_usage_eventsCreateManyArgs} args - Arguments to create many Agent_usage_events.
     * @example
     * // Create many Agent_usage_events
     * const agent_usage_events = await prisma.agent_usage_events.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends agent_usage_eventsCreateManyArgs>(args?: SelectSubset<T, agent_usage_eventsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Agent_usage_events and returns the data saved in the database.
     * @param {agent_usage_eventsCreateManyAndReturnArgs} args - Arguments to create many Agent_usage_events.
     * @example
     * // Create many Agent_usage_events
     * const agent_usage_events = await prisma.agent_usage_events.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Agent_usage_events and only return the `id`
     * const agent_usage_eventsWithIdOnly = await prisma.agent_usage_events.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends agent_usage_eventsCreateManyAndReturnArgs>(args?: SelectSubset<T, agent_usage_eventsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$agent_usage_eventsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Agent_usage_events.
     * @param {agent_usage_eventsDeleteArgs} args - Arguments to delete one Agent_usage_events.
     * @example
     * // Delete one Agent_usage_events
     * const Agent_usage_events = await prisma.agent_usage_events.delete({
     *   where: {
     *     // ... filter to delete one Agent_usage_events
     *   }
     * })
     * 
     */
    delete<T extends agent_usage_eventsDeleteArgs>(args: SelectSubset<T, agent_usage_eventsDeleteArgs<ExtArgs>>): Prisma__agent_usage_eventsClient<$Result.GetResult<Prisma.$agent_usage_eventsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Agent_usage_events.
     * @param {agent_usage_eventsUpdateArgs} args - Arguments to update one Agent_usage_events.
     * @example
     * // Update one Agent_usage_events
     * const agent_usage_events = await prisma.agent_usage_events.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends agent_usage_eventsUpdateArgs>(args: SelectSubset<T, agent_usage_eventsUpdateArgs<ExtArgs>>): Prisma__agent_usage_eventsClient<$Result.GetResult<Prisma.$agent_usage_eventsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Agent_usage_events.
     * @param {agent_usage_eventsDeleteManyArgs} args - Arguments to filter Agent_usage_events to delete.
     * @example
     * // Delete a few Agent_usage_events
     * const { count } = await prisma.agent_usage_events.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends agent_usage_eventsDeleteManyArgs>(args?: SelectSubset<T, agent_usage_eventsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Agent_usage_events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agent_usage_eventsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Agent_usage_events
     * const agent_usage_events = await prisma.agent_usage_events.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends agent_usage_eventsUpdateManyArgs>(args: SelectSubset<T, agent_usage_eventsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Agent_usage_events and returns the data updated in the database.
     * @param {agent_usage_eventsUpdateManyAndReturnArgs} args - Arguments to update many Agent_usage_events.
     * @example
     * // Update many Agent_usage_events
     * const agent_usage_events = await prisma.agent_usage_events.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Agent_usage_events and only return the `id`
     * const agent_usage_eventsWithIdOnly = await prisma.agent_usage_events.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends agent_usage_eventsUpdateManyAndReturnArgs>(args: SelectSubset<T, agent_usage_eventsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$agent_usage_eventsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Agent_usage_events.
     * @param {agent_usage_eventsUpsertArgs} args - Arguments to update or create a Agent_usage_events.
     * @example
     * // Update or create a Agent_usage_events
     * const agent_usage_events = await prisma.agent_usage_events.upsert({
     *   create: {
     *     // ... data to create a Agent_usage_events
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Agent_usage_events we want to update
     *   }
     * })
     */
    upsert<T extends agent_usage_eventsUpsertArgs>(args: SelectSubset<T, agent_usage_eventsUpsertArgs<ExtArgs>>): Prisma__agent_usage_eventsClient<$Result.GetResult<Prisma.$agent_usage_eventsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Agent_usage_events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agent_usage_eventsCountArgs} args - Arguments to filter Agent_usage_events to count.
     * @example
     * // Count the number of Agent_usage_events
     * const count = await prisma.agent_usage_events.count({
     *   where: {
     *     // ... the filter for the Agent_usage_events we want to count
     *   }
     * })
    **/
    count<T extends agent_usage_eventsCountArgs>(
      args?: Subset<T, agent_usage_eventsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Agent_usage_eventsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Agent_usage_events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Agent_usage_eventsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Agent_usage_eventsAggregateArgs>(args: Subset<T, Agent_usage_eventsAggregateArgs>): Prisma.PrismaPromise<GetAgent_usage_eventsAggregateType<T>>

    /**
     * Group by Agent_usage_events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agent_usage_eventsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends agent_usage_eventsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: agent_usage_eventsGroupByArgs['orderBy'] }
        : { orderBy?: agent_usage_eventsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, agent_usage_eventsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAgent_usage_eventsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the agent_usage_events model
   */
  readonly fields: agent_usage_eventsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for agent_usage_events.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__agent_usage_eventsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    agents_custom<T extends agent_usage_events$agents_customArgs<ExtArgs> = {}>(args?: Subset<T, agent_usage_events$agents_customArgs<ExtArgs>>): Prisma__agents_customClient<$Result.GetResult<Prisma.$agents_customPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the agent_usage_events model
   */
  interface agent_usage_eventsFieldRefs {
    readonly id: FieldRef<"agent_usage_events", 'Int'>
    readonly agent_id: FieldRef<"agent_usage_events", 'Int'>
    readonly event_type: FieldRef<"agent_usage_events", 'String'>
    readonly event_data: FieldRef<"agent_usage_events", 'Json'>
    readonly user_session_id: FieldRef<"agent_usage_events", 'String'>
    readonly ip_address: FieldRef<"agent_usage_events", 'String'>
    readonly user_agent: FieldRef<"agent_usage_events", 'String'>
    readonly language_used: FieldRef<"agent_usage_events", 'String'>
    readonly created_at: FieldRef<"agent_usage_events", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * agent_usage_events findUnique
   */
  export type agent_usage_eventsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_usage_events
     */
    select?: agent_usage_eventsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_usage_events
     */
    omit?: agent_usage_eventsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_usage_eventsInclude<ExtArgs> | null
    /**
     * Filter, which agent_usage_events to fetch.
     */
    where: agent_usage_eventsWhereUniqueInput
  }

  /**
   * agent_usage_events findUniqueOrThrow
   */
  export type agent_usage_eventsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_usage_events
     */
    select?: agent_usage_eventsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_usage_events
     */
    omit?: agent_usage_eventsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_usage_eventsInclude<ExtArgs> | null
    /**
     * Filter, which agent_usage_events to fetch.
     */
    where: agent_usage_eventsWhereUniqueInput
  }

  /**
   * agent_usage_events findFirst
   */
  export type agent_usage_eventsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_usage_events
     */
    select?: agent_usage_eventsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_usage_events
     */
    omit?: agent_usage_eventsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_usage_eventsInclude<ExtArgs> | null
    /**
     * Filter, which agent_usage_events to fetch.
     */
    where?: agent_usage_eventsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of agent_usage_events to fetch.
     */
    orderBy?: agent_usage_eventsOrderByWithRelationInput | agent_usage_eventsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for agent_usage_events.
     */
    cursor?: agent_usage_eventsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` agent_usage_events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` agent_usage_events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of agent_usage_events.
     */
    distinct?: Agent_usage_eventsScalarFieldEnum | Agent_usage_eventsScalarFieldEnum[]
  }

  /**
   * agent_usage_events findFirstOrThrow
   */
  export type agent_usage_eventsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_usage_events
     */
    select?: agent_usage_eventsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_usage_events
     */
    omit?: agent_usage_eventsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_usage_eventsInclude<ExtArgs> | null
    /**
     * Filter, which agent_usage_events to fetch.
     */
    where?: agent_usage_eventsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of agent_usage_events to fetch.
     */
    orderBy?: agent_usage_eventsOrderByWithRelationInput | agent_usage_eventsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for agent_usage_events.
     */
    cursor?: agent_usage_eventsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` agent_usage_events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` agent_usage_events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of agent_usage_events.
     */
    distinct?: Agent_usage_eventsScalarFieldEnum | Agent_usage_eventsScalarFieldEnum[]
  }

  /**
   * agent_usage_events findMany
   */
  export type agent_usage_eventsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_usage_events
     */
    select?: agent_usage_eventsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_usage_events
     */
    omit?: agent_usage_eventsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_usage_eventsInclude<ExtArgs> | null
    /**
     * Filter, which agent_usage_events to fetch.
     */
    where?: agent_usage_eventsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of agent_usage_events to fetch.
     */
    orderBy?: agent_usage_eventsOrderByWithRelationInput | agent_usage_eventsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing agent_usage_events.
     */
    cursor?: agent_usage_eventsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` agent_usage_events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` agent_usage_events.
     */
    skip?: number
    distinct?: Agent_usage_eventsScalarFieldEnum | Agent_usage_eventsScalarFieldEnum[]
  }

  /**
   * agent_usage_events create
   */
  export type agent_usage_eventsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_usage_events
     */
    select?: agent_usage_eventsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_usage_events
     */
    omit?: agent_usage_eventsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_usage_eventsInclude<ExtArgs> | null
    /**
     * The data needed to create a agent_usage_events.
     */
    data: XOR<agent_usage_eventsCreateInput, agent_usage_eventsUncheckedCreateInput>
  }

  /**
   * agent_usage_events createMany
   */
  export type agent_usage_eventsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many agent_usage_events.
     */
    data: agent_usage_eventsCreateManyInput | agent_usage_eventsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * agent_usage_events createManyAndReturn
   */
  export type agent_usage_eventsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_usage_events
     */
    select?: agent_usage_eventsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the agent_usage_events
     */
    omit?: agent_usage_eventsOmit<ExtArgs> | null
    /**
     * The data used to create many agent_usage_events.
     */
    data: agent_usage_eventsCreateManyInput | agent_usage_eventsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_usage_eventsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * agent_usage_events update
   */
  export type agent_usage_eventsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_usage_events
     */
    select?: agent_usage_eventsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_usage_events
     */
    omit?: agent_usage_eventsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_usage_eventsInclude<ExtArgs> | null
    /**
     * The data needed to update a agent_usage_events.
     */
    data: XOR<agent_usage_eventsUpdateInput, agent_usage_eventsUncheckedUpdateInput>
    /**
     * Choose, which agent_usage_events to update.
     */
    where: agent_usage_eventsWhereUniqueInput
  }

  /**
   * agent_usage_events updateMany
   */
  export type agent_usage_eventsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update agent_usage_events.
     */
    data: XOR<agent_usage_eventsUpdateManyMutationInput, agent_usage_eventsUncheckedUpdateManyInput>
    /**
     * Filter which agent_usage_events to update
     */
    where?: agent_usage_eventsWhereInput
    /**
     * Limit how many agent_usage_events to update.
     */
    limit?: number
  }

  /**
   * agent_usage_events updateManyAndReturn
   */
  export type agent_usage_eventsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_usage_events
     */
    select?: agent_usage_eventsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the agent_usage_events
     */
    omit?: agent_usage_eventsOmit<ExtArgs> | null
    /**
     * The data used to update agent_usage_events.
     */
    data: XOR<agent_usage_eventsUpdateManyMutationInput, agent_usage_eventsUncheckedUpdateManyInput>
    /**
     * Filter which agent_usage_events to update
     */
    where?: agent_usage_eventsWhereInput
    /**
     * Limit how many agent_usage_events to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_usage_eventsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * agent_usage_events upsert
   */
  export type agent_usage_eventsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_usage_events
     */
    select?: agent_usage_eventsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_usage_events
     */
    omit?: agent_usage_eventsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_usage_eventsInclude<ExtArgs> | null
    /**
     * The filter to search for the agent_usage_events to update in case it exists.
     */
    where: agent_usage_eventsWhereUniqueInput
    /**
     * In case the agent_usage_events found by the `where` argument doesn't exist, create a new agent_usage_events with this data.
     */
    create: XOR<agent_usage_eventsCreateInput, agent_usage_eventsUncheckedCreateInput>
    /**
     * In case the agent_usage_events was found with the provided `where` argument, update it with this data.
     */
    update: XOR<agent_usage_eventsUpdateInput, agent_usage_eventsUncheckedUpdateInput>
  }

  /**
   * agent_usage_events delete
   */
  export type agent_usage_eventsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_usage_events
     */
    select?: agent_usage_eventsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_usage_events
     */
    omit?: agent_usage_eventsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_usage_eventsInclude<ExtArgs> | null
    /**
     * Filter which agent_usage_events to delete.
     */
    where: agent_usage_eventsWhereUniqueInput
  }

  /**
   * agent_usage_events deleteMany
   */
  export type agent_usage_eventsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which agent_usage_events to delete
     */
    where?: agent_usage_eventsWhereInput
    /**
     * Limit how many agent_usage_events to delete.
     */
    limit?: number
  }

  /**
   * agent_usage_events.agents_custom
   */
  export type agent_usage_events$agents_customArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agents_custom
     */
    select?: agents_customSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agents_custom
     */
    omit?: agents_customOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agents_customInclude<ExtArgs> | null
    where?: agents_customWhereInput
  }

  /**
   * agent_usage_events without action
   */
  export type agent_usage_eventsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_usage_events
     */
    select?: agent_usage_eventsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_usage_events
     */
    omit?: agent_usage_eventsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_usage_eventsInclude<ExtArgs> | null
  }


  /**
   * Model agents
   */

  export type AggregateAgents = {
    _count: AgentsCountAggregateOutputType | null
    _avg: AgentsAvgAggregateOutputType | null
    _sum: AgentsSumAggregateOutputType | null
    _min: AgentsMinAggregateOutputType | null
    _max: AgentsMaxAggregateOutputType | null
  }

  export type AgentsAvgAggregateOutputType = {
    id: number | null
    pricing_half_day: Decimal | null
    pricing_full_day: Decimal | null
    pricing_per_minute: Decimal | null
    ai_optimization_score: Decimal | null
    rating: Decimal | null
    reviews: number | null
    stages: number | null
  }

  export type AgentsSumAggregateOutputType = {
    id: number | null
    pricing_half_day: Decimal | null
    pricing_full_day: Decimal | null
    pricing_per_minute: Decimal | null
    ai_optimization_score: Decimal | null
    rating: Decimal | null
    reviews: number | null
    stages: number | null
  }

  export type AgentsMinAggregateOutputType = {
    id: number | null
    name: string | null
    company: string | null
    category: string | null
    description: string | null
    personality: string | null
    pricing_half_day: Decimal | null
    pricing_full_day: Decimal | null
    pricing_per_minute: Decimal | null
    elevenlabs_voice_id: string | null
    voice_sample_url: string | null
    gemini_personality_prompt: string | null
    ai_optimization_score: Decimal | null
    success_rate: string | null
    avg_call_time: string | null
    rating: Decimal | null
    reviews: number | null
    stages: number | null
    demo_available: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type AgentsMaxAggregateOutputType = {
    id: number | null
    name: string | null
    company: string | null
    category: string | null
    description: string | null
    personality: string | null
    pricing_half_day: Decimal | null
    pricing_full_day: Decimal | null
    pricing_per_minute: Decimal | null
    elevenlabs_voice_id: string | null
    voice_sample_url: string | null
    gemini_personality_prompt: string | null
    ai_optimization_score: Decimal | null
    success_rate: string | null
    avg_call_time: string | null
    rating: Decimal | null
    reviews: number | null
    stages: number | null
    demo_available: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type AgentsCountAggregateOutputType = {
    id: number
    name: number
    company: number
    category: number
    description: number
    personality: number
    pricing_half_day: number
    pricing_full_day: number
    pricing_per_minute: number
    elevenlabs_voice_id: number
    voice_sample_url: number
    voice_characteristics: number
    context7_profile: number
    environmental_suitability: number
    performance_by_context: number
    gemini_personality_prompt: number
    ai_optimization_score: number
    success_rate: number
    avg_call_time: number
    rating: number
    reviews: number
    integrations: number
    industries: number
    stages: number
    demo_available: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type AgentsAvgAggregateInputType = {
    id?: true
    pricing_half_day?: true
    pricing_full_day?: true
    pricing_per_minute?: true
    ai_optimization_score?: true
    rating?: true
    reviews?: true
    stages?: true
  }

  export type AgentsSumAggregateInputType = {
    id?: true
    pricing_half_day?: true
    pricing_full_day?: true
    pricing_per_minute?: true
    ai_optimization_score?: true
    rating?: true
    reviews?: true
    stages?: true
  }

  export type AgentsMinAggregateInputType = {
    id?: true
    name?: true
    company?: true
    category?: true
    description?: true
    personality?: true
    pricing_half_day?: true
    pricing_full_day?: true
    pricing_per_minute?: true
    elevenlabs_voice_id?: true
    voice_sample_url?: true
    gemini_personality_prompt?: true
    ai_optimization_score?: true
    success_rate?: true
    avg_call_time?: true
    rating?: true
    reviews?: true
    stages?: true
    demo_available?: true
    created_at?: true
    updated_at?: true
  }

  export type AgentsMaxAggregateInputType = {
    id?: true
    name?: true
    company?: true
    category?: true
    description?: true
    personality?: true
    pricing_half_day?: true
    pricing_full_day?: true
    pricing_per_minute?: true
    elevenlabs_voice_id?: true
    voice_sample_url?: true
    gemini_personality_prompt?: true
    ai_optimization_score?: true
    success_rate?: true
    avg_call_time?: true
    rating?: true
    reviews?: true
    stages?: true
    demo_available?: true
    created_at?: true
    updated_at?: true
  }

  export type AgentsCountAggregateInputType = {
    id?: true
    name?: true
    company?: true
    category?: true
    description?: true
    personality?: true
    pricing_half_day?: true
    pricing_full_day?: true
    pricing_per_minute?: true
    elevenlabs_voice_id?: true
    voice_sample_url?: true
    voice_characteristics?: true
    context7_profile?: true
    environmental_suitability?: true
    performance_by_context?: true
    gemini_personality_prompt?: true
    ai_optimization_score?: true
    success_rate?: true
    avg_call_time?: true
    rating?: true
    reviews?: true
    integrations?: true
    industries?: true
    stages?: true
    demo_available?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type AgentsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which agents to aggregate.
     */
    where?: agentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of agents to fetch.
     */
    orderBy?: agentsOrderByWithRelationInput | agentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: agentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` agents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` agents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned agents
    **/
    _count?: true | AgentsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AgentsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AgentsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AgentsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AgentsMaxAggregateInputType
  }

  export type GetAgentsAggregateType<T extends AgentsAggregateArgs> = {
        [P in keyof T & keyof AggregateAgents]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAgents[P]>
      : GetScalarType<T[P], AggregateAgents[P]>
  }




  export type agentsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: agentsWhereInput
    orderBy?: agentsOrderByWithAggregationInput | agentsOrderByWithAggregationInput[]
    by: AgentsScalarFieldEnum[] | AgentsScalarFieldEnum
    having?: agentsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AgentsCountAggregateInputType | true
    _avg?: AgentsAvgAggregateInputType
    _sum?: AgentsSumAggregateInputType
    _min?: AgentsMinAggregateInputType
    _max?: AgentsMaxAggregateInputType
  }

  export type AgentsGroupByOutputType = {
    id: number
    name: string
    company: string | null
    category: string | null
    description: string | null
    personality: string | null
    pricing_half_day: Decimal | null
    pricing_full_day: Decimal | null
    pricing_per_minute: Decimal | null
    elevenlabs_voice_id: string | null
    voice_sample_url: string | null
    voice_characteristics: JsonValue | null
    context7_profile: JsonValue | null
    environmental_suitability: JsonValue | null
    performance_by_context: JsonValue | null
    gemini_personality_prompt: string | null
    ai_optimization_score: Decimal | null
    success_rate: string | null
    avg_call_time: string | null
    rating: Decimal | null
    reviews: number | null
    integrations: string[]
    industries: string[]
    stages: number | null
    demo_available: boolean | null
    created_at: Date | null
    updated_at: Date | null
    _count: AgentsCountAggregateOutputType | null
    _avg: AgentsAvgAggregateOutputType | null
    _sum: AgentsSumAggregateOutputType | null
    _min: AgentsMinAggregateOutputType | null
    _max: AgentsMaxAggregateOutputType | null
  }

  type GetAgentsGroupByPayload<T extends agentsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AgentsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AgentsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AgentsGroupByOutputType[P]>
            : GetScalarType<T[P], AgentsGroupByOutputType[P]>
        }
      >
    >


  export type agentsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    company?: boolean
    category?: boolean
    description?: boolean
    personality?: boolean
    pricing_half_day?: boolean
    pricing_full_day?: boolean
    pricing_per_minute?: boolean
    elevenlabs_voice_id?: boolean
    voice_sample_url?: boolean
    voice_characteristics?: boolean
    context7_profile?: boolean
    environmental_suitability?: boolean
    performance_by_context?: boolean
    gemini_personality_prompt?: boolean
    ai_optimization_score?: boolean
    success_rate?: boolean
    avg_call_time?: boolean
    rating?: boolean
    reviews?: boolean
    integrations?: boolean
    industries?: boolean
    stages?: boolean
    demo_available?: boolean
    created_at?: boolean
    updated_at?: boolean
    rentals?: boolean | agents$rentalsArgs<ExtArgs>
    user_interactions?: boolean | agents$user_interactionsArgs<ExtArgs>
    voice_samples?: boolean | agents$voice_samplesArgs<ExtArgs>
    _count?: boolean | AgentsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agents"]>

  export type agentsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    company?: boolean
    category?: boolean
    description?: boolean
    personality?: boolean
    pricing_half_day?: boolean
    pricing_full_day?: boolean
    pricing_per_minute?: boolean
    elevenlabs_voice_id?: boolean
    voice_sample_url?: boolean
    voice_characteristics?: boolean
    context7_profile?: boolean
    environmental_suitability?: boolean
    performance_by_context?: boolean
    gemini_personality_prompt?: boolean
    ai_optimization_score?: boolean
    success_rate?: boolean
    avg_call_time?: boolean
    rating?: boolean
    reviews?: boolean
    integrations?: boolean
    industries?: boolean
    stages?: boolean
    demo_available?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["agents"]>

  export type agentsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    company?: boolean
    category?: boolean
    description?: boolean
    personality?: boolean
    pricing_half_day?: boolean
    pricing_full_day?: boolean
    pricing_per_minute?: boolean
    elevenlabs_voice_id?: boolean
    voice_sample_url?: boolean
    voice_characteristics?: boolean
    context7_profile?: boolean
    environmental_suitability?: boolean
    performance_by_context?: boolean
    gemini_personality_prompt?: boolean
    ai_optimization_score?: boolean
    success_rate?: boolean
    avg_call_time?: boolean
    rating?: boolean
    reviews?: boolean
    integrations?: boolean
    industries?: boolean
    stages?: boolean
    demo_available?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["agents"]>

  export type agentsSelectScalar = {
    id?: boolean
    name?: boolean
    company?: boolean
    category?: boolean
    description?: boolean
    personality?: boolean
    pricing_half_day?: boolean
    pricing_full_day?: boolean
    pricing_per_minute?: boolean
    elevenlabs_voice_id?: boolean
    voice_sample_url?: boolean
    voice_characteristics?: boolean
    context7_profile?: boolean
    environmental_suitability?: boolean
    performance_by_context?: boolean
    gemini_personality_prompt?: boolean
    ai_optimization_score?: boolean
    success_rate?: boolean
    avg_call_time?: boolean
    rating?: boolean
    reviews?: boolean
    integrations?: boolean
    industries?: boolean
    stages?: boolean
    demo_available?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type agentsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "company" | "category" | "description" | "personality" | "pricing_half_day" | "pricing_full_day" | "pricing_per_minute" | "elevenlabs_voice_id" | "voice_sample_url" | "voice_characteristics" | "context7_profile" | "environmental_suitability" | "performance_by_context" | "gemini_personality_prompt" | "ai_optimization_score" | "success_rate" | "avg_call_time" | "rating" | "reviews" | "integrations" | "industries" | "stages" | "demo_available" | "created_at" | "updated_at", ExtArgs["result"]["agents"]>
  export type agentsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rentals?: boolean | agents$rentalsArgs<ExtArgs>
    user_interactions?: boolean | agents$user_interactionsArgs<ExtArgs>
    voice_samples?: boolean | agents$voice_samplesArgs<ExtArgs>
    _count?: boolean | AgentsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type agentsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type agentsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $agentsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "agents"
    objects: {
      rentals: Prisma.$rentalsPayload<ExtArgs>[]
      user_interactions: Prisma.$user_interactionsPayload<ExtArgs>[]
      voice_samples: Prisma.$voice_samplesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      company: string | null
      category: string | null
      description: string | null
      personality: string | null
      pricing_half_day: Prisma.Decimal | null
      pricing_full_day: Prisma.Decimal | null
      pricing_per_minute: Prisma.Decimal | null
      elevenlabs_voice_id: string | null
      voice_sample_url: string | null
      voice_characteristics: Prisma.JsonValue | null
      context7_profile: Prisma.JsonValue | null
      environmental_suitability: Prisma.JsonValue | null
      performance_by_context: Prisma.JsonValue | null
      gemini_personality_prompt: string | null
      ai_optimization_score: Prisma.Decimal | null
      success_rate: string | null
      avg_call_time: string | null
      rating: Prisma.Decimal | null
      reviews: number | null
      integrations: string[]
      industries: string[]
      stages: number | null
      demo_available: boolean | null
      created_at: Date | null
      updated_at: Date | null
    }, ExtArgs["result"]["agents"]>
    composites: {}
  }

  type agentsGetPayload<S extends boolean | null | undefined | agentsDefaultArgs> = $Result.GetResult<Prisma.$agentsPayload, S>

  type agentsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<agentsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AgentsCountAggregateInputType | true
    }

  export interface agentsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['agents'], meta: { name: 'agents' } }
    /**
     * Find zero or one Agents that matches the filter.
     * @param {agentsFindUniqueArgs} args - Arguments to find a Agents
     * @example
     * // Get one Agents
     * const agents = await prisma.agents.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends agentsFindUniqueArgs>(args: SelectSubset<T, agentsFindUniqueArgs<ExtArgs>>): Prisma__agentsClient<$Result.GetResult<Prisma.$agentsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Agents that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {agentsFindUniqueOrThrowArgs} args - Arguments to find a Agents
     * @example
     * // Get one Agents
     * const agents = await prisma.agents.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends agentsFindUniqueOrThrowArgs>(args: SelectSubset<T, agentsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__agentsClient<$Result.GetResult<Prisma.$agentsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Agents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agentsFindFirstArgs} args - Arguments to find a Agents
     * @example
     * // Get one Agents
     * const agents = await prisma.agents.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends agentsFindFirstArgs>(args?: SelectSubset<T, agentsFindFirstArgs<ExtArgs>>): Prisma__agentsClient<$Result.GetResult<Prisma.$agentsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Agents that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agentsFindFirstOrThrowArgs} args - Arguments to find a Agents
     * @example
     * // Get one Agents
     * const agents = await prisma.agents.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends agentsFindFirstOrThrowArgs>(args?: SelectSubset<T, agentsFindFirstOrThrowArgs<ExtArgs>>): Prisma__agentsClient<$Result.GetResult<Prisma.$agentsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Agents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agentsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Agents
     * const agents = await prisma.agents.findMany()
     * 
     * // Get first 10 Agents
     * const agents = await prisma.agents.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const agentsWithIdOnly = await prisma.agents.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends agentsFindManyArgs>(args?: SelectSubset<T, agentsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$agentsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Agents.
     * @param {agentsCreateArgs} args - Arguments to create a Agents.
     * @example
     * // Create one Agents
     * const Agents = await prisma.agents.create({
     *   data: {
     *     // ... data to create a Agents
     *   }
     * })
     * 
     */
    create<T extends agentsCreateArgs>(args: SelectSubset<T, agentsCreateArgs<ExtArgs>>): Prisma__agentsClient<$Result.GetResult<Prisma.$agentsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Agents.
     * @param {agentsCreateManyArgs} args - Arguments to create many Agents.
     * @example
     * // Create many Agents
     * const agents = await prisma.agents.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends agentsCreateManyArgs>(args?: SelectSubset<T, agentsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Agents and returns the data saved in the database.
     * @param {agentsCreateManyAndReturnArgs} args - Arguments to create many Agents.
     * @example
     * // Create many Agents
     * const agents = await prisma.agents.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Agents and only return the `id`
     * const agentsWithIdOnly = await prisma.agents.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends agentsCreateManyAndReturnArgs>(args?: SelectSubset<T, agentsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$agentsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Agents.
     * @param {agentsDeleteArgs} args - Arguments to delete one Agents.
     * @example
     * // Delete one Agents
     * const Agents = await prisma.agents.delete({
     *   where: {
     *     // ... filter to delete one Agents
     *   }
     * })
     * 
     */
    delete<T extends agentsDeleteArgs>(args: SelectSubset<T, agentsDeleteArgs<ExtArgs>>): Prisma__agentsClient<$Result.GetResult<Prisma.$agentsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Agents.
     * @param {agentsUpdateArgs} args - Arguments to update one Agents.
     * @example
     * // Update one Agents
     * const agents = await prisma.agents.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends agentsUpdateArgs>(args: SelectSubset<T, agentsUpdateArgs<ExtArgs>>): Prisma__agentsClient<$Result.GetResult<Prisma.$agentsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Agents.
     * @param {agentsDeleteManyArgs} args - Arguments to filter Agents to delete.
     * @example
     * // Delete a few Agents
     * const { count } = await prisma.agents.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends agentsDeleteManyArgs>(args?: SelectSubset<T, agentsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Agents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agentsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Agents
     * const agents = await prisma.agents.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends agentsUpdateManyArgs>(args: SelectSubset<T, agentsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Agents and returns the data updated in the database.
     * @param {agentsUpdateManyAndReturnArgs} args - Arguments to update many Agents.
     * @example
     * // Update many Agents
     * const agents = await prisma.agents.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Agents and only return the `id`
     * const agentsWithIdOnly = await prisma.agents.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends agentsUpdateManyAndReturnArgs>(args: SelectSubset<T, agentsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$agentsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Agents.
     * @param {agentsUpsertArgs} args - Arguments to update or create a Agents.
     * @example
     * // Update or create a Agents
     * const agents = await prisma.agents.upsert({
     *   create: {
     *     // ... data to create a Agents
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Agents we want to update
     *   }
     * })
     */
    upsert<T extends agentsUpsertArgs>(args: SelectSubset<T, agentsUpsertArgs<ExtArgs>>): Prisma__agentsClient<$Result.GetResult<Prisma.$agentsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Agents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agentsCountArgs} args - Arguments to filter Agents to count.
     * @example
     * // Count the number of Agents
     * const count = await prisma.agents.count({
     *   where: {
     *     // ... the filter for the Agents we want to count
     *   }
     * })
    **/
    count<T extends agentsCountArgs>(
      args?: Subset<T, agentsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AgentsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Agents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AgentsAggregateArgs>(args: Subset<T, AgentsAggregateArgs>): Prisma.PrismaPromise<GetAgentsAggregateType<T>>

    /**
     * Group by Agents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agentsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends agentsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: agentsGroupByArgs['orderBy'] }
        : { orderBy?: agentsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, agentsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAgentsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the agents model
   */
  readonly fields: agentsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for agents.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__agentsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    rentals<T extends agents$rentalsArgs<ExtArgs> = {}>(args?: Subset<T, agents$rentalsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$rentalsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    user_interactions<T extends agents$user_interactionsArgs<ExtArgs> = {}>(args?: Subset<T, agents$user_interactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_interactionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    voice_samples<T extends agents$voice_samplesArgs<ExtArgs> = {}>(args?: Subset<T, agents$voice_samplesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$voice_samplesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the agents model
   */
  interface agentsFieldRefs {
    readonly id: FieldRef<"agents", 'Int'>
    readonly name: FieldRef<"agents", 'String'>
    readonly company: FieldRef<"agents", 'String'>
    readonly category: FieldRef<"agents", 'String'>
    readonly description: FieldRef<"agents", 'String'>
    readonly personality: FieldRef<"agents", 'String'>
    readonly pricing_half_day: FieldRef<"agents", 'Decimal'>
    readonly pricing_full_day: FieldRef<"agents", 'Decimal'>
    readonly pricing_per_minute: FieldRef<"agents", 'Decimal'>
    readonly elevenlabs_voice_id: FieldRef<"agents", 'String'>
    readonly voice_sample_url: FieldRef<"agents", 'String'>
    readonly voice_characteristics: FieldRef<"agents", 'Json'>
    readonly context7_profile: FieldRef<"agents", 'Json'>
    readonly environmental_suitability: FieldRef<"agents", 'Json'>
    readonly performance_by_context: FieldRef<"agents", 'Json'>
    readonly gemini_personality_prompt: FieldRef<"agents", 'String'>
    readonly ai_optimization_score: FieldRef<"agents", 'Decimal'>
    readonly success_rate: FieldRef<"agents", 'String'>
    readonly avg_call_time: FieldRef<"agents", 'String'>
    readonly rating: FieldRef<"agents", 'Decimal'>
    readonly reviews: FieldRef<"agents", 'Int'>
    readonly integrations: FieldRef<"agents", 'String[]'>
    readonly industries: FieldRef<"agents", 'String[]'>
    readonly stages: FieldRef<"agents", 'Int'>
    readonly demo_available: FieldRef<"agents", 'Boolean'>
    readonly created_at: FieldRef<"agents", 'DateTime'>
    readonly updated_at: FieldRef<"agents", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * agents findUnique
   */
  export type agentsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agents
     */
    select?: agentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agents
     */
    omit?: agentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agentsInclude<ExtArgs> | null
    /**
     * Filter, which agents to fetch.
     */
    where: agentsWhereUniqueInput
  }

  /**
   * agents findUniqueOrThrow
   */
  export type agentsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agents
     */
    select?: agentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agents
     */
    omit?: agentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agentsInclude<ExtArgs> | null
    /**
     * Filter, which agents to fetch.
     */
    where: agentsWhereUniqueInput
  }

  /**
   * agents findFirst
   */
  export type agentsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agents
     */
    select?: agentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agents
     */
    omit?: agentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agentsInclude<ExtArgs> | null
    /**
     * Filter, which agents to fetch.
     */
    where?: agentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of agents to fetch.
     */
    orderBy?: agentsOrderByWithRelationInput | agentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for agents.
     */
    cursor?: agentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` agents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` agents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of agents.
     */
    distinct?: AgentsScalarFieldEnum | AgentsScalarFieldEnum[]
  }

  /**
   * agents findFirstOrThrow
   */
  export type agentsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agents
     */
    select?: agentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agents
     */
    omit?: agentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agentsInclude<ExtArgs> | null
    /**
     * Filter, which agents to fetch.
     */
    where?: agentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of agents to fetch.
     */
    orderBy?: agentsOrderByWithRelationInput | agentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for agents.
     */
    cursor?: agentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` agents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` agents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of agents.
     */
    distinct?: AgentsScalarFieldEnum | AgentsScalarFieldEnum[]
  }

  /**
   * agents findMany
   */
  export type agentsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agents
     */
    select?: agentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agents
     */
    omit?: agentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agentsInclude<ExtArgs> | null
    /**
     * Filter, which agents to fetch.
     */
    where?: agentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of agents to fetch.
     */
    orderBy?: agentsOrderByWithRelationInput | agentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing agents.
     */
    cursor?: agentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` agents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` agents.
     */
    skip?: number
    distinct?: AgentsScalarFieldEnum | AgentsScalarFieldEnum[]
  }

  /**
   * agents create
   */
  export type agentsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agents
     */
    select?: agentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agents
     */
    omit?: agentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agentsInclude<ExtArgs> | null
    /**
     * The data needed to create a agents.
     */
    data: XOR<agentsCreateInput, agentsUncheckedCreateInput>
  }

  /**
   * agents createMany
   */
  export type agentsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many agents.
     */
    data: agentsCreateManyInput | agentsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * agents createManyAndReturn
   */
  export type agentsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agents
     */
    select?: agentsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the agents
     */
    omit?: agentsOmit<ExtArgs> | null
    /**
     * The data used to create many agents.
     */
    data: agentsCreateManyInput | agentsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * agents update
   */
  export type agentsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agents
     */
    select?: agentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agents
     */
    omit?: agentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agentsInclude<ExtArgs> | null
    /**
     * The data needed to update a agents.
     */
    data: XOR<agentsUpdateInput, agentsUncheckedUpdateInput>
    /**
     * Choose, which agents to update.
     */
    where: agentsWhereUniqueInput
  }

  /**
   * agents updateMany
   */
  export type agentsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update agents.
     */
    data: XOR<agentsUpdateManyMutationInput, agentsUncheckedUpdateManyInput>
    /**
     * Filter which agents to update
     */
    where?: agentsWhereInput
    /**
     * Limit how many agents to update.
     */
    limit?: number
  }

  /**
   * agents updateManyAndReturn
   */
  export type agentsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agents
     */
    select?: agentsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the agents
     */
    omit?: agentsOmit<ExtArgs> | null
    /**
     * The data used to update agents.
     */
    data: XOR<agentsUpdateManyMutationInput, agentsUncheckedUpdateManyInput>
    /**
     * Filter which agents to update
     */
    where?: agentsWhereInput
    /**
     * Limit how many agents to update.
     */
    limit?: number
  }

  /**
   * agents upsert
   */
  export type agentsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agents
     */
    select?: agentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agents
     */
    omit?: agentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agentsInclude<ExtArgs> | null
    /**
     * The filter to search for the agents to update in case it exists.
     */
    where: agentsWhereUniqueInput
    /**
     * In case the agents found by the `where` argument doesn't exist, create a new agents with this data.
     */
    create: XOR<agentsCreateInput, agentsUncheckedCreateInput>
    /**
     * In case the agents was found with the provided `where` argument, update it with this data.
     */
    update: XOR<agentsUpdateInput, agentsUncheckedUpdateInput>
  }

  /**
   * agents delete
   */
  export type agentsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agents
     */
    select?: agentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agents
     */
    omit?: agentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agentsInclude<ExtArgs> | null
    /**
     * Filter which agents to delete.
     */
    where: agentsWhereUniqueInput
  }

  /**
   * agents deleteMany
   */
  export type agentsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which agents to delete
     */
    where?: agentsWhereInput
    /**
     * Limit how many agents to delete.
     */
    limit?: number
  }

  /**
   * agents.rentals
   */
  export type agents$rentalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rentals
     */
    select?: rentalsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the rentals
     */
    omit?: rentalsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rentalsInclude<ExtArgs> | null
    where?: rentalsWhereInput
    orderBy?: rentalsOrderByWithRelationInput | rentalsOrderByWithRelationInput[]
    cursor?: rentalsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RentalsScalarFieldEnum | RentalsScalarFieldEnum[]
  }

  /**
   * agents.user_interactions
   */
  export type agents$user_interactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_interactions
     */
    select?: user_interactionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_interactions
     */
    omit?: user_interactionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_interactionsInclude<ExtArgs> | null
    where?: user_interactionsWhereInput
    orderBy?: user_interactionsOrderByWithRelationInput | user_interactionsOrderByWithRelationInput[]
    cursor?: user_interactionsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: User_interactionsScalarFieldEnum | User_interactionsScalarFieldEnum[]
  }

  /**
   * agents.voice_samples
   */
  export type agents$voice_samplesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the voice_samples
     */
    select?: voice_samplesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the voice_samples
     */
    omit?: voice_samplesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: voice_samplesInclude<ExtArgs> | null
    where?: voice_samplesWhereInput
    orderBy?: voice_samplesOrderByWithRelationInput | voice_samplesOrderByWithRelationInput[]
    cursor?: voice_samplesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Voice_samplesScalarFieldEnum | Voice_samplesScalarFieldEnum[]
  }

  /**
   * agents without action
   */
  export type agentsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agents
     */
    select?: agentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agents
     */
    omit?: agentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agentsInclude<ExtArgs> | null
  }


  /**
   * Model agents_custom
   */

  export type AggregateAgents_custom = {
    _count: Agents_customCountAggregateOutputType | null
    _avg: Agents_customAvgAggregateOutputType | null
    _sum: Agents_customSumAggregateOutputType | null
    _min: Agents_customMinAggregateOutputType | null
    _max: Agents_customMaxAggregateOutputType | null
  }

  export type Agents_customAvgAggregateOutputType = {
    id: number | null
  }

  export type Agents_customSumAggregateOutputType = {
    id: number | null
  }

  export type Agents_customMinAggregateOutputType = {
    id: number | null
    user_id: string | null
    name: string | null
    template_id: string | null
    personality: string | null
    voice_id: string | null
    environment_setting: string | null
    status: string | null
    demo_available: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Agents_customMaxAggregateOutputType = {
    id: number | null
    user_id: string | null
    name: string | null
    template_id: string | null
    personality: string | null
    voice_id: string | null
    environment_setting: string | null
    status: string | null
    demo_available: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Agents_customCountAggregateOutputType = {
    id: number
    user_id: number
    name: number
    template_id: number
    personality: number
    voice_id: number
    voice_settings: number
    environment_setting: number
    integrations: number
    pricing: number
    status: number
    demo_available: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type Agents_customAvgAggregateInputType = {
    id?: true
  }

  export type Agents_customSumAggregateInputType = {
    id?: true
  }

  export type Agents_customMinAggregateInputType = {
    id?: true
    user_id?: true
    name?: true
    template_id?: true
    personality?: true
    voice_id?: true
    environment_setting?: true
    status?: true
    demo_available?: true
    created_at?: true
    updated_at?: true
  }

  export type Agents_customMaxAggregateInputType = {
    id?: true
    user_id?: true
    name?: true
    template_id?: true
    personality?: true
    voice_id?: true
    environment_setting?: true
    status?: true
    demo_available?: true
    created_at?: true
    updated_at?: true
  }

  export type Agents_customCountAggregateInputType = {
    id?: true
    user_id?: true
    name?: true
    template_id?: true
    personality?: true
    voice_id?: true
    voice_settings?: true
    environment_setting?: true
    integrations?: true
    pricing?: true
    status?: true
    demo_available?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type Agents_customAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which agents_custom to aggregate.
     */
    where?: agents_customWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of agents_customs to fetch.
     */
    orderBy?: agents_customOrderByWithRelationInput | agents_customOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: agents_customWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` agents_customs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` agents_customs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned agents_customs
    **/
    _count?: true | Agents_customCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Agents_customAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Agents_customSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Agents_customMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Agents_customMaxAggregateInputType
  }

  export type GetAgents_customAggregateType<T extends Agents_customAggregateArgs> = {
        [P in keyof T & keyof AggregateAgents_custom]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAgents_custom[P]>
      : GetScalarType<T[P], AggregateAgents_custom[P]>
  }




  export type agents_customGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: agents_customWhereInput
    orderBy?: agents_customOrderByWithAggregationInput | agents_customOrderByWithAggregationInput[]
    by: Agents_customScalarFieldEnum[] | Agents_customScalarFieldEnum
    having?: agents_customScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Agents_customCountAggregateInputType | true
    _avg?: Agents_customAvgAggregateInputType
    _sum?: Agents_customSumAggregateInputType
    _min?: Agents_customMinAggregateInputType
    _max?: Agents_customMaxAggregateInputType
  }

  export type Agents_customGroupByOutputType = {
    id: number
    user_id: string | null
    name: string
    template_id: string
    personality: string
    voice_id: string
    voice_settings: JsonValue | null
    environment_setting: string | null
    integrations: JsonValue | null
    pricing: JsonValue | null
    status: string | null
    demo_available: boolean | null
    created_at: Date | null
    updated_at: Date | null
    _count: Agents_customCountAggregateOutputType | null
    _avg: Agents_customAvgAggregateOutputType | null
    _sum: Agents_customSumAggregateOutputType | null
    _min: Agents_customMinAggregateOutputType | null
    _max: Agents_customMaxAggregateOutputType | null
  }

  type GetAgents_customGroupByPayload<T extends agents_customGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Agents_customGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Agents_customGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Agents_customGroupByOutputType[P]>
            : GetScalarType<T[P], Agents_customGroupByOutputType[P]>
        }
      >
    >


  export type agents_customSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    name?: boolean
    template_id?: boolean
    personality?: boolean
    voice_id?: boolean
    voice_settings?: boolean
    environment_setting?: boolean
    integrations?: boolean
    pricing?: boolean
    status?: boolean
    demo_available?: boolean
    created_at?: boolean
    updated_at?: boolean
    agent_feedback?: boolean | agents_custom$agent_feedbackArgs<ExtArgs>
    agent_languages?: boolean | agents_custom$agent_languagesArgs<ExtArgs>
    agent_performance_metrics?: boolean | agents_custom$agent_performance_metricsArgs<ExtArgs>
    agent_usage_events?: boolean | agents_custom$agent_usage_eventsArgs<ExtArgs>
    _count?: boolean | Agents_customCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agents_custom"]>

  export type agents_customSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    name?: boolean
    template_id?: boolean
    personality?: boolean
    voice_id?: boolean
    voice_settings?: boolean
    environment_setting?: boolean
    integrations?: boolean
    pricing?: boolean
    status?: boolean
    demo_available?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["agents_custom"]>

  export type agents_customSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    name?: boolean
    template_id?: boolean
    personality?: boolean
    voice_id?: boolean
    voice_settings?: boolean
    environment_setting?: boolean
    integrations?: boolean
    pricing?: boolean
    status?: boolean
    demo_available?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["agents_custom"]>

  export type agents_customSelectScalar = {
    id?: boolean
    user_id?: boolean
    name?: boolean
    template_id?: boolean
    personality?: boolean
    voice_id?: boolean
    voice_settings?: boolean
    environment_setting?: boolean
    integrations?: boolean
    pricing?: boolean
    status?: boolean
    demo_available?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type agents_customOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "name" | "template_id" | "personality" | "voice_id" | "voice_settings" | "environment_setting" | "integrations" | "pricing" | "status" | "demo_available" | "created_at" | "updated_at", ExtArgs["result"]["agents_custom"]>
  export type agents_customInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent_feedback?: boolean | agents_custom$agent_feedbackArgs<ExtArgs>
    agent_languages?: boolean | agents_custom$agent_languagesArgs<ExtArgs>
    agent_performance_metrics?: boolean | agents_custom$agent_performance_metricsArgs<ExtArgs>
    agent_usage_events?: boolean | agents_custom$agent_usage_eventsArgs<ExtArgs>
    _count?: boolean | Agents_customCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type agents_customIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type agents_customIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $agents_customPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "agents_custom"
    objects: {
      agent_feedback: Prisma.$agent_feedbackPayload<ExtArgs>[]
      agent_languages: Prisma.$agent_languagesPayload<ExtArgs>[]
      agent_performance_metrics: Prisma.$agent_performance_metricsPayload<ExtArgs>[]
      agent_usage_events: Prisma.$agent_usage_eventsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      user_id: string | null
      name: string
      template_id: string
      personality: string
      voice_id: string
      voice_settings: Prisma.JsonValue | null
      environment_setting: string | null
      integrations: Prisma.JsonValue | null
      pricing: Prisma.JsonValue | null
      status: string | null
      demo_available: boolean | null
      created_at: Date | null
      updated_at: Date | null
    }, ExtArgs["result"]["agents_custom"]>
    composites: {}
  }

  type agents_customGetPayload<S extends boolean | null | undefined | agents_customDefaultArgs> = $Result.GetResult<Prisma.$agents_customPayload, S>

  type agents_customCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<agents_customFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Agents_customCountAggregateInputType | true
    }

  export interface agents_customDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['agents_custom'], meta: { name: 'agents_custom' } }
    /**
     * Find zero or one Agents_custom that matches the filter.
     * @param {agents_customFindUniqueArgs} args - Arguments to find a Agents_custom
     * @example
     * // Get one Agents_custom
     * const agents_custom = await prisma.agents_custom.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends agents_customFindUniqueArgs>(args: SelectSubset<T, agents_customFindUniqueArgs<ExtArgs>>): Prisma__agents_customClient<$Result.GetResult<Prisma.$agents_customPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Agents_custom that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {agents_customFindUniqueOrThrowArgs} args - Arguments to find a Agents_custom
     * @example
     * // Get one Agents_custom
     * const agents_custom = await prisma.agents_custom.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends agents_customFindUniqueOrThrowArgs>(args: SelectSubset<T, agents_customFindUniqueOrThrowArgs<ExtArgs>>): Prisma__agents_customClient<$Result.GetResult<Prisma.$agents_customPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Agents_custom that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agents_customFindFirstArgs} args - Arguments to find a Agents_custom
     * @example
     * // Get one Agents_custom
     * const agents_custom = await prisma.agents_custom.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends agents_customFindFirstArgs>(args?: SelectSubset<T, agents_customFindFirstArgs<ExtArgs>>): Prisma__agents_customClient<$Result.GetResult<Prisma.$agents_customPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Agents_custom that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agents_customFindFirstOrThrowArgs} args - Arguments to find a Agents_custom
     * @example
     * // Get one Agents_custom
     * const agents_custom = await prisma.agents_custom.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends agents_customFindFirstOrThrowArgs>(args?: SelectSubset<T, agents_customFindFirstOrThrowArgs<ExtArgs>>): Prisma__agents_customClient<$Result.GetResult<Prisma.$agents_customPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Agents_customs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agents_customFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Agents_customs
     * const agents_customs = await prisma.agents_custom.findMany()
     * 
     * // Get first 10 Agents_customs
     * const agents_customs = await prisma.agents_custom.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const agents_customWithIdOnly = await prisma.agents_custom.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends agents_customFindManyArgs>(args?: SelectSubset<T, agents_customFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$agents_customPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Agents_custom.
     * @param {agents_customCreateArgs} args - Arguments to create a Agents_custom.
     * @example
     * // Create one Agents_custom
     * const Agents_custom = await prisma.agents_custom.create({
     *   data: {
     *     // ... data to create a Agents_custom
     *   }
     * })
     * 
     */
    create<T extends agents_customCreateArgs>(args: SelectSubset<T, agents_customCreateArgs<ExtArgs>>): Prisma__agents_customClient<$Result.GetResult<Prisma.$agents_customPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Agents_customs.
     * @param {agents_customCreateManyArgs} args - Arguments to create many Agents_customs.
     * @example
     * // Create many Agents_customs
     * const agents_custom = await prisma.agents_custom.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends agents_customCreateManyArgs>(args?: SelectSubset<T, agents_customCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Agents_customs and returns the data saved in the database.
     * @param {agents_customCreateManyAndReturnArgs} args - Arguments to create many Agents_customs.
     * @example
     * // Create many Agents_customs
     * const agents_custom = await prisma.agents_custom.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Agents_customs and only return the `id`
     * const agents_customWithIdOnly = await prisma.agents_custom.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends agents_customCreateManyAndReturnArgs>(args?: SelectSubset<T, agents_customCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$agents_customPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Agents_custom.
     * @param {agents_customDeleteArgs} args - Arguments to delete one Agents_custom.
     * @example
     * // Delete one Agents_custom
     * const Agents_custom = await prisma.agents_custom.delete({
     *   where: {
     *     // ... filter to delete one Agents_custom
     *   }
     * })
     * 
     */
    delete<T extends agents_customDeleteArgs>(args: SelectSubset<T, agents_customDeleteArgs<ExtArgs>>): Prisma__agents_customClient<$Result.GetResult<Prisma.$agents_customPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Agents_custom.
     * @param {agents_customUpdateArgs} args - Arguments to update one Agents_custom.
     * @example
     * // Update one Agents_custom
     * const agents_custom = await prisma.agents_custom.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends agents_customUpdateArgs>(args: SelectSubset<T, agents_customUpdateArgs<ExtArgs>>): Prisma__agents_customClient<$Result.GetResult<Prisma.$agents_customPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Agents_customs.
     * @param {agents_customDeleteManyArgs} args - Arguments to filter Agents_customs to delete.
     * @example
     * // Delete a few Agents_customs
     * const { count } = await prisma.agents_custom.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends agents_customDeleteManyArgs>(args?: SelectSubset<T, agents_customDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Agents_customs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agents_customUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Agents_customs
     * const agents_custom = await prisma.agents_custom.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends agents_customUpdateManyArgs>(args: SelectSubset<T, agents_customUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Agents_customs and returns the data updated in the database.
     * @param {agents_customUpdateManyAndReturnArgs} args - Arguments to update many Agents_customs.
     * @example
     * // Update many Agents_customs
     * const agents_custom = await prisma.agents_custom.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Agents_customs and only return the `id`
     * const agents_customWithIdOnly = await prisma.agents_custom.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends agents_customUpdateManyAndReturnArgs>(args: SelectSubset<T, agents_customUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$agents_customPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Agents_custom.
     * @param {agents_customUpsertArgs} args - Arguments to update or create a Agents_custom.
     * @example
     * // Update or create a Agents_custom
     * const agents_custom = await prisma.agents_custom.upsert({
     *   create: {
     *     // ... data to create a Agents_custom
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Agents_custom we want to update
     *   }
     * })
     */
    upsert<T extends agents_customUpsertArgs>(args: SelectSubset<T, agents_customUpsertArgs<ExtArgs>>): Prisma__agents_customClient<$Result.GetResult<Prisma.$agents_customPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Agents_customs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agents_customCountArgs} args - Arguments to filter Agents_customs to count.
     * @example
     * // Count the number of Agents_customs
     * const count = await prisma.agents_custom.count({
     *   where: {
     *     // ... the filter for the Agents_customs we want to count
     *   }
     * })
    **/
    count<T extends agents_customCountArgs>(
      args?: Subset<T, agents_customCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Agents_customCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Agents_custom.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Agents_customAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Agents_customAggregateArgs>(args: Subset<T, Agents_customAggregateArgs>): Prisma.PrismaPromise<GetAgents_customAggregateType<T>>

    /**
     * Group by Agents_custom.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agents_customGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends agents_customGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: agents_customGroupByArgs['orderBy'] }
        : { orderBy?: agents_customGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, agents_customGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAgents_customGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the agents_custom model
   */
  readonly fields: agents_customFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for agents_custom.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__agents_customClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    agent_feedback<T extends agents_custom$agent_feedbackArgs<ExtArgs> = {}>(args?: Subset<T, agents_custom$agent_feedbackArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$agent_feedbackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    agent_languages<T extends agents_custom$agent_languagesArgs<ExtArgs> = {}>(args?: Subset<T, agents_custom$agent_languagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$agent_languagesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    agent_performance_metrics<T extends agents_custom$agent_performance_metricsArgs<ExtArgs> = {}>(args?: Subset<T, agents_custom$agent_performance_metricsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$agent_performance_metricsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    agent_usage_events<T extends agents_custom$agent_usage_eventsArgs<ExtArgs> = {}>(args?: Subset<T, agents_custom$agent_usage_eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$agent_usage_eventsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the agents_custom model
   */
  interface agents_customFieldRefs {
    readonly id: FieldRef<"agents_custom", 'Int'>
    readonly user_id: FieldRef<"agents_custom", 'String'>
    readonly name: FieldRef<"agents_custom", 'String'>
    readonly template_id: FieldRef<"agents_custom", 'String'>
    readonly personality: FieldRef<"agents_custom", 'String'>
    readonly voice_id: FieldRef<"agents_custom", 'String'>
    readonly voice_settings: FieldRef<"agents_custom", 'Json'>
    readonly environment_setting: FieldRef<"agents_custom", 'String'>
    readonly integrations: FieldRef<"agents_custom", 'Json'>
    readonly pricing: FieldRef<"agents_custom", 'Json'>
    readonly status: FieldRef<"agents_custom", 'String'>
    readonly demo_available: FieldRef<"agents_custom", 'Boolean'>
    readonly created_at: FieldRef<"agents_custom", 'DateTime'>
    readonly updated_at: FieldRef<"agents_custom", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * agents_custom findUnique
   */
  export type agents_customFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agents_custom
     */
    select?: agents_customSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agents_custom
     */
    omit?: agents_customOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agents_customInclude<ExtArgs> | null
    /**
     * Filter, which agents_custom to fetch.
     */
    where: agents_customWhereUniqueInput
  }

  /**
   * agents_custom findUniqueOrThrow
   */
  export type agents_customFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agents_custom
     */
    select?: agents_customSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agents_custom
     */
    omit?: agents_customOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agents_customInclude<ExtArgs> | null
    /**
     * Filter, which agents_custom to fetch.
     */
    where: agents_customWhereUniqueInput
  }

  /**
   * agents_custom findFirst
   */
  export type agents_customFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agents_custom
     */
    select?: agents_customSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agents_custom
     */
    omit?: agents_customOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agents_customInclude<ExtArgs> | null
    /**
     * Filter, which agents_custom to fetch.
     */
    where?: agents_customWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of agents_customs to fetch.
     */
    orderBy?: agents_customOrderByWithRelationInput | agents_customOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for agents_customs.
     */
    cursor?: agents_customWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` agents_customs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` agents_customs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of agents_customs.
     */
    distinct?: Agents_customScalarFieldEnum | Agents_customScalarFieldEnum[]
  }

  /**
   * agents_custom findFirstOrThrow
   */
  export type agents_customFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agents_custom
     */
    select?: agents_customSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agents_custom
     */
    omit?: agents_customOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agents_customInclude<ExtArgs> | null
    /**
     * Filter, which agents_custom to fetch.
     */
    where?: agents_customWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of agents_customs to fetch.
     */
    orderBy?: agents_customOrderByWithRelationInput | agents_customOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for agents_customs.
     */
    cursor?: agents_customWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` agents_customs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` agents_customs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of agents_customs.
     */
    distinct?: Agents_customScalarFieldEnum | Agents_customScalarFieldEnum[]
  }

  /**
   * agents_custom findMany
   */
  export type agents_customFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agents_custom
     */
    select?: agents_customSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agents_custom
     */
    omit?: agents_customOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agents_customInclude<ExtArgs> | null
    /**
     * Filter, which agents_customs to fetch.
     */
    where?: agents_customWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of agents_customs to fetch.
     */
    orderBy?: agents_customOrderByWithRelationInput | agents_customOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing agents_customs.
     */
    cursor?: agents_customWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` agents_customs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` agents_customs.
     */
    skip?: number
    distinct?: Agents_customScalarFieldEnum | Agents_customScalarFieldEnum[]
  }

  /**
   * agents_custom create
   */
  export type agents_customCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agents_custom
     */
    select?: agents_customSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agents_custom
     */
    omit?: agents_customOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agents_customInclude<ExtArgs> | null
    /**
     * The data needed to create a agents_custom.
     */
    data: XOR<agents_customCreateInput, agents_customUncheckedCreateInput>
  }

  /**
   * agents_custom createMany
   */
  export type agents_customCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many agents_customs.
     */
    data: agents_customCreateManyInput | agents_customCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * agents_custom createManyAndReturn
   */
  export type agents_customCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agents_custom
     */
    select?: agents_customSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the agents_custom
     */
    omit?: agents_customOmit<ExtArgs> | null
    /**
     * The data used to create many agents_customs.
     */
    data: agents_customCreateManyInput | agents_customCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * agents_custom update
   */
  export type agents_customUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agents_custom
     */
    select?: agents_customSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agents_custom
     */
    omit?: agents_customOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agents_customInclude<ExtArgs> | null
    /**
     * The data needed to update a agents_custom.
     */
    data: XOR<agents_customUpdateInput, agents_customUncheckedUpdateInput>
    /**
     * Choose, which agents_custom to update.
     */
    where: agents_customWhereUniqueInput
  }

  /**
   * agents_custom updateMany
   */
  export type agents_customUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update agents_customs.
     */
    data: XOR<agents_customUpdateManyMutationInput, agents_customUncheckedUpdateManyInput>
    /**
     * Filter which agents_customs to update
     */
    where?: agents_customWhereInput
    /**
     * Limit how many agents_customs to update.
     */
    limit?: number
  }

  /**
   * agents_custom updateManyAndReturn
   */
  export type agents_customUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agents_custom
     */
    select?: agents_customSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the agents_custom
     */
    omit?: agents_customOmit<ExtArgs> | null
    /**
     * The data used to update agents_customs.
     */
    data: XOR<agents_customUpdateManyMutationInput, agents_customUncheckedUpdateManyInput>
    /**
     * Filter which agents_customs to update
     */
    where?: agents_customWhereInput
    /**
     * Limit how many agents_customs to update.
     */
    limit?: number
  }

  /**
   * agents_custom upsert
   */
  export type agents_customUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agents_custom
     */
    select?: agents_customSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agents_custom
     */
    omit?: agents_customOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agents_customInclude<ExtArgs> | null
    /**
     * The filter to search for the agents_custom to update in case it exists.
     */
    where: agents_customWhereUniqueInput
    /**
     * In case the agents_custom found by the `where` argument doesn't exist, create a new agents_custom with this data.
     */
    create: XOR<agents_customCreateInput, agents_customUncheckedCreateInput>
    /**
     * In case the agents_custom was found with the provided `where` argument, update it with this data.
     */
    update: XOR<agents_customUpdateInput, agents_customUncheckedUpdateInput>
  }

  /**
   * agents_custom delete
   */
  export type agents_customDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agents_custom
     */
    select?: agents_customSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agents_custom
     */
    omit?: agents_customOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agents_customInclude<ExtArgs> | null
    /**
     * Filter which agents_custom to delete.
     */
    where: agents_customWhereUniqueInput
  }

  /**
   * agents_custom deleteMany
   */
  export type agents_customDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which agents_customs to delete
     */
    where?: agents_customWhereInput
    /**
     * Limit how many agents_customs to delete.
     */
    limit?: number
  }

  /**
   * agents_custom.agent_feedback
   */
  export type agents_custom$agent_feedbackArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_feedback
     */
    select?: agent_feedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_feedback
     */
    omit?: agent_feedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_feedbackInclude<ExtArgs> | null
    where?: agent_feedbackWhereInput
    orderBy?: agent_feedbackOrderByWithRelationInput | agent_feedbackOrderByWithRelationInput[]
    cursor?: agent_feedbackWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Agent_feedbackScalarFieldEnum | Agent_feedbackScalarFieldEnum[]
  }

  /**
   * agents_custom.agent_languages
   */
  export type agents_custom$agent_languagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_languages
     */
    select?: agent_languagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_languages
     */
    omit?: agent_languagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_languagesInclude<ExtArgs> | null
    where?: agent_languagesWhereInput
    orderBy?: agent_languagesOrderByWithRelationInput | agent_languagesOrderByWithRelationInput[]
    cursor?: agent_languagesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Agent_languagesScalarFieldEnum | Agent_languagesScalarFieldEnum[]
  }

  /**
   * agents_custom.agent_performance_metrics
   */
  export type agents_custom$agent_performance_metricsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_performance_metrics
     */
    select?: agent_performance_metricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_performance_metrics
     */
    omit?: agent_performance_metricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_performance_metricsInclude<ExtArgs> | null
    where?: agent_performance_metricsWhereInput
    orderBy?: agent_performance_metricsOrderByWithRelationInput | agent_performance_metricsOrderByWithRelationInput[]
    cursor?: agent_performance_metricsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Agent_performance_metricsScalarFieldEnum | Agent_performance_metricsScalarFieldEnum[]
  }

  /**
   * agents_custom.agent_usage_events
   */
  export type agents_custom$agent_usage_eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_usage_events
     */
    select?: agent_usage_eventsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_usage_events
     */
    omit?: agent_usage_eventsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_usage_eventsInclude<ExtArgs> | null
    where?: agent_usage_eventsWhereInput
    orderBy?: agent_usage_eventsOrderByWithRelationInput | agent_usage_eventsOrderByWithRelationInput[]
    cursor?: agent_usage_eventsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Agent_usage_eventsScalarFieldEnum | Agent_usage_eventsScalarFieldEnum[]
  }

  /**
   * agents_custom without action
   */
  export type agents_customDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agents_custom
     */
    select?: agents_customSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agents_custom
     */
    omit?: agents_customOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agents_customInclude<ExtArgs> | null
  }


  /**
   * Model contractor_context
   */

  export type AggregateContractor_context = {
    _count: Contractor_contextCountAggregateOutputType | null
    _avg: Contractor_contextAvgAggregateOutputType | null
    _sum: Contractor_contextSumAggregateOutputType | null
    _min: Contractor_contextMinAggregateOutputType | null
    _max: Contractor_contextMaxAggregateOutputType | null
  }

  export type Contractor_contextAvgAggregateOutputType = {
    id: number | null
    years_experience: number | null
    roi_requirements: Decimal | null
    context_confidence_score: Decimal | null
  }

  export type Contractor_contextSumAggregateOutputType = {
    id: number | null
    years_experience: number | null
    roi_requirements: Decimal | null
    context_confidence_score: Decimal | null
  }

  export type Contractor_contextMinAggregateOutputType = {
    id: number | null
    user_email: string | null
    user_name: string | null
    expertise_level: string | null
    primary_trade: string | null
    company_size: string | null
    years_experience: number | null
    noise_tolerance: string | null
    geographic_region: string | null
    timezone: string | null
    urgency_patterns: string | null
    primary_device: string | null
    network_quality: string | null
    technical_comfort_level: string | null
    voice_quality_requirements: string | null
    budget_range: string | null
    roi_requirements: Decimal | null
    rental_frequency: string | null
    payment_preferences: string | null
    cost_sensitivity: string | null
    communication_style: string | null
    client_interaction_style: string | null
    decision_making_style: string | null
    learning_preferences: string | null
    context_confidence_score: Decimal | null
    last_context_update: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Contractor_contextMaxAggregateOutputType = {
    id: number | null
    user_email: string | null
    user_name: string | null
    expertise_level: string | null
    primary_trade: string | null
    company_size: string | null
    years_experience: number | null
    noise_tolerance: string | null
    geographic_region: string | null
    timezone: string | null
    urgency_patterns: string | null
    primary_device: string | null
    network_quality: string | null
    technical_comfort_level: string | null
    voice_quality_requirements: string | null
    budget_range: string | null
    roi_requirements: Decimal | null
    rental_frequency: string | null
    payment_preferences: string | null
    cost_sensitivity: string | null
    communication_style: string | null
    client_interaction_style: string | null
    decision_making_style: string | null
    learning_preferences: string | null
    context_confidence_score: Decimal | null
    last_context_update: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Contractor_contextCountAggregateOutputType = {
    id: number
    user_email: number
    user_name: number
    expertise_level: number
    primary_trade: number
    company_size: number
    years_experience: number
    specializations: number
    typical_job_sites: number
    noise_tolerance: number
    safety_requirements: number
    geographic_region: number
    climate_considerations: number
    preferred_call_times: number
    timezone: number
    project_phases: number
    seasonal_patterns: number
    urgency_patterns: number
    primary_device: number
    network_quality: number
    preferred_integrations: number
    technical_comfort_level: number
    voice_quality_requirements: number
    budget_range: number
    roi_requirements: number
    rental_frequency: number
    payment_preferences: number
    cost_sensitivity: number
    communication_style: number
    team_structure: number
    client_interaction_style: number
    decision_making_style: number
    cultural_considerations: number
    success_metrics: number
    preferred_agent_types: number
    optimization_preferences: number
    learning_preferences: number
    feedback_patterns: number
    context_confidence_score: number
    last_context_update: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type Contractor_contextAvgAggregateInputType = {
    id?: true
    years_experience?: true
    roi_requirements?: true
    context_confidence_score?: true
  }

  export type Contractor_contextSumAggregateInputType = {
    id?: true
    years_experience?: true
    roi_requirements?: true
    context_confidence_score?: true
  }

  export type Contractor_contextMinAggregateInputType = {
    id?: true
    user_email?: true
    user_name?: true
    expertise_level?: true
    primary_trade?: true
    company_size?: true
    years_experience?: true
    noise_tolerance?: true
    geographic_region?: true
    timezone?: true
    urgency_patterns?: true
    primary_device?: true
    network_quality?: true
    technical_comfort_level?: true
    voice_quality_requirements?: true
    budget_range?: true
    roi_requirements?: true
    rental_frequency?: true
    payment_preferences?: true
    cost_sensitivity?: true
    communication_style?: true
    client_interaction_style?: true
    decision_making_style?: true
    learning_preferences?: true
    context_confidence_score?: true
    last_context_update?: true
    created_at?: true
    updated_at?: true
  }

  export type Contractor_contextMaxAggregateInputType = {
    id?: true
    user_email?: true
    user_name?: true
    expertise_level?: true
    primary_trade?: true
    company_size?: true
    years_experience?: true
    noise_tolerance?: true
    geographic_region?: true
    timezone?: true
    urgency_patterns?: true
    primary_device?: true
    network_quality?: true
    technical_comfort_level?: true
    voice_quality_requirements?: true
    budget_range?: true
    roi_requirements?: true
    rental_frequency?: true
    payment_preferences?: true
    cost_sensitivity?: true
    communication_style?: true
    client_interaction_style?: true
    decision_making_style?: true
    learning_preferences?: true
    context_confidence_score?: true
    last_context_update?: true
    created_at?: true
    updated_at?: true
  }

  export type Contractor_contextCountAggregateInputType = {
    id?: true
    user_email?: true
    user_name?: true
    expertise_level?: true
    primary_trade?: true
    company_size?: true
    years_experience?: true
    specializations?: true
    typical_job_sites?: true
    noise_tolerance?: true
    safety_requirements?: true
    geographic_region?: true
    climate_considerations?: true
    preferred_call_times?: true
    timezone?: true
    project_phases?: true
    seasonal_patterns?: true
    urgency_patterns?: true
    primary_device?: true
    network_quality?: true
    preferred_integrations?: true
    technical_comfort_level?: true
    voice_quality_requirements?: true
    budget_range?: true
    roi_requirements?: true
    rental_frequency?: true
    payment_preferences?: true
    cost_sensitivity?: true
    communication_style?: true
    team_structure?: true
    client_interaction_style?: true
    decision_making_style?: true
    cultural_considerations?: true
    success_metrics?: true
    preferred_agent_types?: true
    optimization_preferences?: true
    learning_preferences?: true
    feedback_patterns?: true
    context_confidence_score?: true
    last_context_update?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type Contractor_contextAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which contractor_context to aggregate.
     */
    where?: contractor_contextWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of contractor_contexts to fetch.
     */
    orderBy?: contractor_contextOrderByWithRelationInput | contractor_contextOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: contractor_contextWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` contractor_contexts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` contractor_contexts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned contractor_contexts
    **/
    _count?: true | Contractor_contextCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Contractor_contextAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Contractor_contextSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Contractor_contextMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Contractor_contextMaxAggregateInputType
  }

  export type GetContractor_contextAggregateType<T extends Contractor_contextAggregateArgs> = {
        [P in keyof T & keyof AggregateContractor_context]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContractor_context[P]>
      : GetScalarType<T[P], AggregateContractor_context[P]>
  }




  export type contractor_contextGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: contractor_contextWhereInput
    orderBy?: contractor_contextOrderByWithAggregationInput | contractor_contextOrderByWithAggregationInput[]
    by: Contractor_contextScalarFieldEnum[] | Contractor_contextScalarFieldEnum
    having?: contractor_contextScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Contractor_contextCountAggregateInputType | true
    _avg?: Contractor_contextAvgAggregateInputType
    _sum?: Contractor_contextSumAggregateInputType
    _min?: Contractor_contextMinAggregateInputType
    _max?: Contractor_contextMaxAggregateInputType
  }

  export type Contractor_contextGroupByOutputType = {
    id: number
    user_email: string
    user_name: string | null
    expertise_level: string | null
    primary_trade: string | null
    company_size: string | null
    years_experience: number | null
    specializations: string[]
    typical_job_sites: JsonValue | null
    noise_tolerance: string | null
    safety_requirements: JsonValue | null
    geographic_region: string | null
    climate_considerations: JsonValue | null
    preferred_call_times: JsonValue | null
    timezone: string | null
    project_phases: JsonValue | null
    seasonal_patterns: JsonValue | null
    urgency_patterns: string | null
    primary_device: string | null
    network_quality: string | null
    preferred_integrations: string[]
    technical_comfort_level: string | null
    voice_quality_requirements: string | null
    budget_range: string | null
    roi_requirements: Decimal | null
    rental_frequency: string | null
    payment_preferences: string | null
    cost_sensitivity: string | null
    communication_style: string | null
    team_structure: JsonValue | null
    client_interaction_style: string | null
    decision_making_style: string | null
    cultural_considerations: JsonValue | null
    success_metrics: JsonValue | null
    preferred_agent_types: string[]
    optimization_preferences: JsonValue | null
    learning_preferences: string | null
    feedback_patterns: JsonValue | null
    context_confidence_score: Decimal | null
    last_context_update: Date | null
    created_at: Date | null
    updated_at: Date | null
    _count: Contractor_contextCountAggregateOutputType | null
    _avg: Contractor_contextAvgAggregateOutputType | null
    _sum: Contractor_contextSumAggregateOutputType | null
    _min: Contractor_contextMinAggregateOutputType | null
    _max: Contractor_contextMaxAggregateOutputType | null
  }

  type GetContractor_contextGroupByPayload<T extends contractor_contextGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Contractor_contextGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Contractor_contextGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Contractor_contextGroupByOutputType[P]>
            : GetScalarType<T[P], Contractor_contextGroupByOutputType[P]>
        }
      >
    >


  export type contractor_contextSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_email?: boolean
    user_name?: boolean
    expertise_level?: boolean
    primary_trade?: boolean
    company_size?: boolean
    years_experience?: boolean
    specializations?: boolean
    typical_job_sites?: boolean
    noise_tolerance?: boolean
    safety_requirements?: boolean
    geographic_region?: boolean
    climate_considerations?: boolean
    preferred_call_times?: boolean
    timezone?: boolean
    project_phases?: boolean
    seasonal_patterns?: boolean
    urgency_patterns?: boolean
    primary_device?: boolean
    network_quality?: boolean
    preferred_integrations?: boolean
    technical_comfort_level?: boolean
    voice_quality_requirements?: boolean
    budget_range?: boolean
    roi_requirements?: boolean
    rental_frequency?: boolean
    payment_preferences?: boolean
    cost_sensitivity?: boolean
    communication_style?: boolean
    team_structure?: boolean
    client_interaction_style?: boolean
    decision_making_style?: boolean
    cultural_considerations?: boolean
    success_metrics?: boolean
    preferred_agent_types?: boolean
    optimization_preferences?: boolean
    learning_preferences?: boolean
    feedback_patterns?: boolean
    context_confidence_score?: boolean
    last_context_update?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["contractor_context"]>

  export type contractor_contextSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_email?: boolean
    user_name?: boolean
    expertise_level?: boolean
    primary_trade?: boolean
    company_size?: boolean
    years_experience?: boolean
    specializations?: boolean
    typical_job_sites?: boolean
    noise_tolerance?: boolean
    safety_requirements?: boolean
    geographic_region?: boolean
    climate_considerations?: boolean
    preferred_call_times?: boolean
    timezone?: boolean
    project_phases?: boolean
    seasonal_patterns?: boolean
    urgency_patterns?: boolean
    primary_device?: boolean
    network_quality?: boolean
    preferred_integrations?: boolean
    technical_comfort_level?: boolean
    voice_quality_requirements?: boolean
    budget_range?: boolean
    roi_requirements?: boolean
    rental_frequency?: boolean
    payment_preferences?: boolean
    cost_sensitivity?: boolean
    communication_style?: boolean
    team_structure?: boolean
    client_interaction_style?: boolean
    decision_making_style?: boolean
    cultural_considerations?: boolean
    success_metrics?: boolean
    preferred_agent_types?: boolean
    optimization_preferences?: boolean
    learning_preferences?: boolean
    feedback_patterns?: boolean
    context_confidence_score?: boolean
    last_context_update?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["contractor_context"]>

  export type contractor_contextSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_email?: boolean
    user_name?: boolean
    expertise_level?: boolean
    primary_trade?: boolean
    company_size?: boolean
    years_experience?: boolean
    specializations?: boolean
    typical_job_sites?: boolean
    noise_tolerance?: boolean
    safety_requirements?: boolean
    geographic_region?: boolean
    climate_considerations?: boolean
    preferred_call_times?: boolean
    timezone?: boolean
    project_phases?: boolean
    seasonal_patterns?: boolean
    urgency_patterns?: boolean
    primary_device?: boolean
    network_quality?: boolean
    preferred_integrations?: boolean
    technical_comfort_level?: boolean
    voice_quality_requirements?: boolean
    budget_range?: boolean
    roi_requirements?: boolean
    rental_frequency?: boolean
    payment_preferences?: boolean
    cost_sensitivity?: boolean
    communication_style?: boolean
    team_structure?: boolean
    client_interaction_style?: boolean
    decision_making_style?: boolean
    cultural_considerations?: boolean
    success_metrics?: boolean
    preferred_agent_types?: boolean
    optimization_preferences?: boolean
    learning_preferences?: boolean
    feedback_patterns?: boolean
    context_confidence_score?: boolean
    last_context_update?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["contractor_context"]>

  export type contractor_contextSelectScalar = {
    id?: boolean
    user_email?: boolean
    user_name?: boolean
    expertise_level?: boolean
    primary_trade?: boolean
    company_size?: boolean
    years_experience?: boolean
    specializations?: boolean
    typical_job_sites?: boolean
    noise_tolerance?: boolean
    safety_requirements?: boolean
    geographic_region?: boolean
    climate_considerations?: boolean
    preferred_call_times?: boolean
    timezone?: boolean
    project_phases?: boolean
    seasonal_patterns?: boolean
    urgency_patterns?: boolean
    primary_device?: boolean
    network_quality?: boolean
    preferred_integrations?: boolean
    technical_comfort_level?: boolean
    voice_quality_requirements?: boolean
    budget_range?: boolean
    roi_requirements?: boolean
    rental_frequency?: boolean
    payment_preferences?: boolean
    cost_sensitivity?: boolean
    communication_style?: boolean
    team_structure?: boolean
    client_interaction_style?: boolean
    decision_making_style?: boolean
    cultural_considerations?: boolean
    success_metrics?: boolean
    preferred_agent_types?: boolean
    optimization_preferences?: boolean
    learning_preferences?: boolean
    feedback_patterns?: boolean
    context_confidence_score?: boolean
    last_context_update?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type contractor_contextOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_email" | "user_name" | "expertise_level" | "primary_trade" | "company_size" | "years_experience" | "specializations" | "typical_job_sites" | "noise_tolerance" | "safety_requirements" | "geographic_region" | "climate_considerations" | "preferred_call_times" | "timezone" | "project_phases" | "seasonal_patterns" | "urgency_patterns" | "primary_device" | "network_quality" | "preferred_integrations" | "technical_comfort_level" | "voice_quality_requirements" | "budget_range" | "roi_requirements" | "rental_frequency" | "payment_preferences" | "cost_sensitivity" | "communication_style" | "team_structure" | "client_interaction_style" | "decision_making_style" | "cultural_considerations" | "success_metrics" | "preferred_agent_types" | "optimization_preferences" | "learning_preferences" | "feedback_patterns" | "context_confidence_score" | "last_context_update" | "created_at" | "updated_at", ExtArgs["result"]["contractor_context"]>

  export type $contractor_contextPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "contractor_context"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      user_email: string
      user_name: string | null
      expertise_level: string | null
      primary_trade: string | null
      company_size: string | null
      years_experience: number | null
      specializations: string[]
      typical_job_sites: Prisma.JsonValue | null
      noise_tolerance: string | null
      safety_requirements: Prisma.JsonValue | null
      geographic_region: string | null
      climate_considerations: Prisma.JsonValue | null
      preferred_call_times: Prisma.JsonValue | null
      timezone: string | null
      project_phases: Prisma.JsonValue | null
      seasonal_patterns: Prisma.JsonValue | null
      urgency_patterns: string | null
      primary_device: string | null
      network_quality: string | null
      preferred_integrations: string[]
      technical_comfort_level: string | null
      voice_quality_requirements: string | null
      budget_range: string | null
      roi_requirements: Prisma.Decimal | null
      rental_frequency: string | null
      payment_preferences: string | null
      cost_sensitivity: string | null
      communication_style: string | null
      team_structure: Prisma.JsonValue | null
      client_interaction_style: string | null
      decision_making_style: string | null
      cultural_considerations: Prisma.JsonValue | null
      success_metrics: Prisma.JsonValue | null
      preferred_agent_types: string[]
      optimization_preferences: Prisma.JsonValue | null
      learning_preferences: string | null
      feedback_patterns: Prisma.JsonValue | null
      context_confidence_score: Prisma.Decimal | null
      last_context_update: Date | null
      created_at: Date | null
      updated_at: Date | null
    }, ExtArgs["result"]["contractor_context"]>
    composites: {}
  }

  type contractor_contextGetPayload<S extends boolean | null | undefined | contractor_contextDefaultArgs> = $Result.GetResult<Prisma.$contractor_contextPayload, S>

  type contractor_contextCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<contractor_contextFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Contractor_contextCountAggregateInputType | true
    }

  export interface contractor_contextDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['contractor_context'], meta: { name: 'contractor_context' } }
    /**
     * Find zero or one Contractor_context that matches the filter.
     * @param {contractor_contextFindUniqueArgs} args - Arguments to find a Contractor_context
     * @example
     * // Get one Contractor_context
     * const contractor_context = await prisma.contractor_context.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends contractor_contextFindUniqueArgs>(args: SelectSubset<T, contractor_contextFindUniqueArgs<ExtArgs>>): Prisma__contractor_contextClient<$Result.GetResult<Prisma.$contractor_contextPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Contractor_context that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {contractor_contextFindUniqueOrThrowArgs} args - Arguments to find a Contractor_context
     * @example
     * // Get one Contractor_context
     * const contractor_context = await prisma.contractor_context.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends contractor_contextFindUniqueOrThrowArgs>(args: SelectSubset<T, contractor_contextFindUniqueOrThrowArgs<ExtArgs>>): Prisma__contractor_contextClient<$Result.GetResult<Prisma.$contractor_contextPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Contractor_context that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {contractor_contextFindFirstArgs} args - Arguments to find a Contractor_context
     * @example
     * // Get one Contractor_context
     * const contractor_context = await prisma.contractor_context.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends contractor_contextFindFirstArgs>(args?: SelectSubset<T, contractor_contextFindFirstArgs<ExtArgs>>): Prisma__contractor_contextClient<$Result.GetResult<Prisma.$contractor_contextPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Contractor_context that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {contractor_contextFindFirstOrThrowArgs} args - Arguments to find a Contractor_context
     * @example
     * // Get one Contractor_context
     * const contractor_context = await prisma.contractor_context.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends contractor_contextFindFirstOrThrowArgs>(args?: SelectSubset<T, contractor_contextFindFirstOrThrowArgs<ExtArgs>>): Prisma__contractor_contextClient<$Result.GetResult<Prisma.$contractor_contextPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Contractor_contexts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {contractor_contextFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Contractor_contexts
     * const contractor_contexts = await prisma.contractor_context.findMany()
     * 
     * // Get first 10 Contractor_contexts
     * const contractor_contexts = await prisma.contractor_context.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contractor_contextWithIdOnly = await prisma.contractor_context.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends contractor_contextFindManyArgs>(args?: SelectSubset<T, contractor_contextFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$contractor_contextPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Contractor_context.
     * @param {contractor_contextCreateArgs} args - Arguments to create a Contractor_context.
     * @example
     * // Create one Contractor_context
     * const Contractor_context = await prisma.contractor_context.create({
     *   data: {
     *     // ... data to create a Contractor_context
     *   }
     * })
     * 
     */
    create<T extends contractor_contextCreateArgs>(args: SelectSubset<T, contractor_contextCreateArgs<ExtArgs>>): Prisma__contractor_contextClient<$Result.GetResult<Prisma.$contractor_contextPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Contractor_contexts.
     * @param {contractor_contextCreateManyArgs} args - Arguments to create many Contractor_contexts.
     * @example
     * // Create many Contractor_contexts
     * const contractor_context = await prisma.contractor_context.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends contractor_contextCreateManyArgs>(args?: SelectSubset<T, contractor_contextCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Contractor_contexts and returns the data saved in the database.
     * @param {contractor_contextCreateManyAndReturnArgs} args - Arguments to create many Contractor_contexts.
     * @example
     * // Create many Contractor_contexts
     * const contractor_context = await prisma.contractor_context.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Contractor_contexts and only return the `id`
     * const contractor_contextWithIdOnly = await prisma.contractor_context.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends contractor_contextCreateManyAndReturnArgs>(args?: SelectSubset<T, contractor_contextCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$contractor_contextPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Contractor_context.
     * @param {contractor_contextDeleteArgs} args - Arguments to delete one Contractor_context.
     * @example
     * // Delete one Contractor_context
     * const Contractor_context = await prisma.contractor_context.delete({
     *   where: {
     *     // ... filter to delete one Contractor_context
     *   }
     * })
     * 
     */
    delete<T extends contractor_contextDeleteArgs>(args: SelectSubset<T, contractor_contextDeleteArgs<ExtArgs>>): Prisma__contractor_contextClient<$Result.GetResult<Prisma.$contractor_contextPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Contractor_context.
     * @param {contractor_contextUpdateArgs} args - Arguments to update one Contractor_context.
     * @example
     * // Update one Contractor_context
     * const contractor_context = await prisma.contractor_context.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends contractor_contextUpdateArgs>(args: SelectSubset<T, contractor_contextUpdateArgs<ExtArgs>>): Prisma__contractor_contextClient<$Result.GetResult<Prisma.$contractor_contextPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Contractor_contexts.
     * @param {contractor_contextDeleteManyArgs} args - Arguments to filter Contractor_contexts to delete.
     * @example
     * // Delete a few Contractor_contexts
     * const { count } = await prisma.contractor_context.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends contractor_contextDeleteManyArgs>(args?: SelectSubset<T, contractor_contextDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Contractor_contexts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {contractor_contextUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Contractor_contexts
     * const contractor_context = await prisma.contractor_context.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends contractor_contextUpdateManyArgs>(args: SelectSubset<T, contractor_contextUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Contractor_contexts and returns the data updated in the database.
     * @param {contractor_contextUpdateManyAndReturnArgs} args - Arguments to update many Contractor_contexts.
     * @example
     * // Update many Contractor_contexts
     * const contractor_context = await prisma.contractor_context.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Contractor_contexts and only return the `id`
     * const contractor_contextWithIdOnly = await prisma.contractor_context.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends contractor_contextUpdateManyAndReturnArgs>(args: SelectSubset<T, contractor_contextUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$contractor_contextPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Contractor_context.
     * @param {contractor_contextUpsertArgs} args - Arguments to update or create a Contractor_context.
     * @example
     * // Update or create a Contractor_context
     * const contractor_context = await prisma.contractor_context.upsert({
     *   create: {
     *     // ... data to create a Contractor_context
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Contractor_context we want to update
     *   }
     * })
     */
    upsert<T extends contractor_contextUpsertArgs>(args: SelectSubset<T, contractor_contextUpsertArgs<ExtArgs>>): Prisma__contractor_contextClient<$Result.GetResult<Prisma.$contractor_contextPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Contractor_contexts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {contractor_contextCountArgs} args - Arguments to filter Contractor_contexts to count.
     * @example
     * // Count the number of Contractor_contexts
     * const count = await prisma.contractor_context.count({
     *   where: {
     *     // ... the filter for the Contractor_contexts we want to count
     *   }
     * })
    **/
    count<T extends contractor_contextCountArgs>(
      args?: Subset<T, contractor_contextCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Contractor_contextCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Contractor_context.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Contractor_contextAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Contractor_contextAggregateArgs>(args: Subset<T, Contractor_contextAggregateArgs>): Prisma.PrismaPromise<GetContractor_contextAggregateType<T>>

    /**
     * Group by Contractor_context.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {contractor_contextGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends contractor_contextGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: contractor_contextGroupByArgs['orderBy'] }
        : { orderBy?: contractor_contextGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, contractor_contextGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContractor_contextGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the contractor_context model
   */
  readonly fields: contractor_contextFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for contractor_context.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__contractor_contextClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the contractor_context model
   */
  interface contractor_contextFieldRefs {
    readonly id: FieldRef<"contractor_context", 'Int'>
    readonly user_email: FieldRef<"contractor_context", 'String'>
    readonly user_name: FieldRef<"contractor_context", 'String'>
    readonly expertise_level: FieldRef<"contractor_context", 'String'>
    readonly primary_trade: FieldRef<"contractor_context", 'String'>
    readonly company_size: FieldRef<"contractor_context", 'String'>
    readonly years_experience: FieldRef<"contractor_context", 'Int'>
    readonly specializations: FieldRef<"contractor_context", 'String[]'>
    readonly typical_job_sites: FieldRef<"contractor_context", 'Json'>
    readonly noise_tolerance: FieldRef<"contractor_context", 'String'>
    readonly safety_requirements: FieldRef<"contractor_context", 'Json'>
    readonly geographic_region: FieldRef<"contractor_context", 'String'>
    readonly climate_considerations: FieldRef<"contractor_context", 'Json'>
    readonly preferred_call_times: FieldRef<"contractor_context", 'Json'>
    readonly timezone: FieldRef<"contractor_context", 'String'>
    readonly project_phases: FieldRef<"contractor_context", 'Json'>
    readonly seasonal_patterns: FieldRef<"contractor_context", 'Json'>
    readonly urgency_patterns: FieldRef<"contractor_context", 'String'>
    readonly primary_device: FieldRef<"contractor_context", 'String'>
    readonly network_quality: FieldRef<"contractor_context", 'String'>
    readonly preferred_integrations: FieldRef<"contractor_context", 'String[]'>
    readonly technical_comfort_level: FieldRef<"contractor_context", 'String'>
    readonly voice_quality_requirements: FieldRef<"contractor_context", 'String'>
    readonly budget_range: FieldRef<"contractor_context", 'String'>
    readonly roi_requirements: FieldRef<"contractor_context", 'Decimal'>
    readonly rental_frequency: FieldRef<"contractor_context", 'String'>
    readonly payment_preferences: FieldRef<"contractor_context", 'String'>
    readonly cost_sensitivity: FieldRef<"contractor_context", 'String'>
    readonly communication_style: FieldRef<"contractor_context", 'String'>
    readonly team_structure: FieldRef<"contractor_context", 'Json'>
    readonly client_interaction_style: FieldRef<"contractor_context", 'String'>
    readonly decision_making_style: FieldRef<"contractor_context", 'String'>
    readonly cultural_considerations: FieldRef<"contractor_context", 'Json'>
    readonly success_metrics: FieldRef<"contractor_context", 'Json'>
    readonly preferred_agent_types: FieldRef<"contractor_context", 'String[]'>
    readonly optimization_preferences: FieldRef<"contractor_context", 'Json'>
    readonly learning_preferences: FieldRef<"contractor_context", 'String'>
    readonly feedback_patterns: FieldRef<"contractor_context", 'Json'>
    readonly context_confidence_score: FieldRef<"contractor_context", 'Decimal'>
    readonly last_context_update: FieldRef<"contractor_context", 'DateTime'>
    readonly created_at: FieldRef<"contractor_context", 'DateTime'>
    readonly updated_at: FieldRef<"contractor_context", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * contractor_context findUnique
   */
  export type contractor_contextFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the contractor_context
     */
    select?: contractor_contextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the contractor_context
     */
    omit?: contractor_contextOmit<ExtArgs> | null
    /**
     * Filter, which contractor_context to fetch.
     */
    where: contractor_contextWhereUniqueInput
  }

  /**
   * contractor_context findUniqueOrThrow
   */
  export type contractor_contextFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the contractor_context
     */
    select?: contractor_contextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the contractor_context
     */
    omit?: contractor_contextOmit<ExtArgs> | null
    /**
     * Filter, which contractor_context to fetch.
     */
    where: contractor_contextWhereUniqueInput
  }

  /**
   * contractor_context findFirst
   */
  export type contractor_contextFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the contractor_context
     */
    select?: contractor_contextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the contractor_context
     */
    omit?: contractor_contextOmit<ExtArgs> | null
    /**
     * Filter, which contractor_context to fetch.
     */
    where?: contractor_contextWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of contractor_contexts to fetch.
     */
    orderBy?: contractor_contextOrderByWithRelationInput | contractor_contextOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for contractor_contexts.
     */
    cursor?: contractor_contextWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` contractor_contexts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` contractor_contexts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of contractor_contexts.
     */
    distinct?: Contractor_contextScalarFieldEnum | Contractor_contextScalarFieldEnum[]
  }

  /**
   * contractor_context findFirstOrThrow
   */
  export type contractor_contextFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the contractor_context
     */
    select?: contractor_contextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the contractor_context
     */
    omit?: contractor_contextOmit<ExtArgs> | null
    /**
     * Filter, which contractor_context to fetch.
     */
    where?: contractor_contextWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of contractor_contexts to fetch.
     */
    orderBy?: contractor_contextOrderByWithRelationInput | contractor_contextOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for contractor_contexts.
     */
    cursor?: contractor_contextWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` contractor_contexts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` contractor_contexts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of contractor_contexts.
     */
    distinct?: Contractor_contextScalarFieldEnum | Contractor_contextScalarFieldEnum[]
  }

  /**
   * contractor_context findMany
   */
  export type contractor_contextFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the contractor_context
     */
    select?: contractor_contextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the contractor_context
     */
    omit?: contractor_contextOmit<ExtArgs> | null
    /**
     * Filter, which contractor_contexts to fetch.
     */
    where?: contractor_contextWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of contractor_contexts to fetch.
     */
    orderBy?: contractor_contextOrderByWithRelationInput | contractor_contextOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing contractor_contexts.
     */
    cursor?: contractor_contextWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` contractor_contexts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` contractor_contexts.
     */
    skip?: number
    distinct?: Contractor_contextScalarFieldEnum | Contractor_contextScalarFieldEnum[]
  }

  /**
   * contractor_context create
   */
  export type contractor_contextCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the contractor_context
     */
    select?: contractor_contextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the contractor_context
     */
    omit?: contractor_contextOmit<ExtArgs> | null
    /**
     * The data needed to create a contractor_context.
     */
    data: XOR<contractor_contextCreateInput, contractor_contextUncheckedCreateInput>
  }

  /**
   * contractor_context createMany
   */
  export type contractor_contextCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many contractor_contexts.
     */
    data: contractor_contextCreateManyInput | contractor_contextCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * contractor_context createManyAndReturn
   */
  export type contractor_contextCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the contractor_context
     */
    select?: contractor_contextSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the contractor_context
     */
    omit?: contractor_contextOmit<ExtArgs> | null
    /**
     * The data used to create many contractor_contexts.
     */
    data: contractor_contextCreateManyInput | contractor_contextCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * contractor_context update
   */
  export type contractor_contextUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the contractor_context
     */
    select?: contractor_contextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the contractor_context
     */
    omit?: contractor_contextOmit<ExtArgs> | null
    /**
     * The data needed to update a contractor_context.
     */
    data: XOR<contractor_contextUpdateInput, contractor_contextUncheckedUpdateInput>
    /**
     * Choose, which contractor_context to update.
     */
    where: contractor_contextWhereUniqueInput
  }

  /**
   * contractor_context updateMany
   */
  export type contractor_contextUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update contractor_contexts.
     */
    data: XOR<contractor_contextUpdateManyMutationInput, contractor_contextUncheckedUpdateManyInput>
    /**
     * Filter which contractor_contexts to update
     */
    where?: contractor_contextWhereInput
    /**
     * Limit how many contractor_contexts to update.
     */
    limit?: number
  }

  /**
   * contractor_context updateManyAndReturn
   */
  export type contractor_contextUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the contractor_context
     */
    select?: contractor_contextSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the contractor_context
     */
    omit?: contractor_contextOmit<ExtArgs> | null
    /**
     * The data used to update contractor_contexts.
     */
    data: XOR<contractor_contextUpdateManyMutationInput, contractor_contextUncheckedUpdateManyInput>
    /**
     * Filter which contractor_contexts to update
     */
    where?: contractor_contextWhereInput
    /**
     * Limit how many contractor_contexts to update.
     */
    limit?: number
  }

  /**
   * contractor_context upsert
   */
  export type contractor_contextUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the contractor_context
     */
    select?: contractor_contextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the contractor_context
     */
    omit?: contractor_contextOmit<ExtArgs> | null
    /**
     * The filter to search for the contractor_context to update in case it exists.
     */
    where: contractor_contextWhereUniqueInput
    /**
     * In case the contractor_context found by the `where` argument doesn't exist, create a new contractor_context with this data.
     */
    create: XOR<contractor_contextCreateInput, contractor_contextUncheckedCreateInput>
    /**
     * In case the contractor_context was found with the provided `where` argument, update it with this data.
     */
    update: XOR<contractor_contextUpdateInput, contractor_contextUncheckedUpdateInput>
  }

  /**
   * contractor_context delete
   */
  export type contractor_contextDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the contractor_context
     */
    select?: contractor_contextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the contractor_context
     */
    omit?: contractor_contextOmit<ExtArgs> | null
    /**
     * Filter which contractor_context to delete.
     */
    where: contractor_contextWhereUniqueInput
  }

  /**
   * contractor_context deleteMany
   */
  export type contractor_contextDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which contractor_contexts to delete
     */
    where?: contractor_contextWhereInput
    /**
     * Limit how many contractor_contexts to delete.
     */
    limit?: number
  }

  /**
   * contractor_context without action
   */
  export type contractor_contextDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the contractor_context
     */
    select?: contractor_contextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the contractor_context
     */
    omit?: contractor_contextOmit<ExtArgs> | null
  }


  /**
   * Model rentals
   */

  export type AggregateRentals = {
    _count: RentalsCountAggregateOutputType | null
    _avg: RentalsAvgAggregateOutputType | null
    _sum: RentalsSumAggregateOutputType | null
    _min: RentalsMinAggregateOutputType | null
    _max: RentalsMaxAggregateOutputType | null
  }

  export type RentalsAvgAggregateOutputType = {
    id: number | null
    agent_id: number | null
    duration_hours: number | null
    base_price: Decimal | null
    context_adjustment: Decimal | null
    discount_percent: Decimal | null
    total_price: Decimal | null
    satisfaction_score: Decimal | null
    context_match_accuracy: Decimal | null
  }

  export type RentalsSumAggregateOutputType = {
    id: number | null
    agent_id: number | null
    duration_hours: number | null
    base_price: Decimal | null
    context_adjustment: Decimal | null
    discount_percent: Decimal | null
    total_price: Decimal | null
    satisfaction_score: Decimal | null
    context_match_accuracy: Decimal | null
  }

  export type RentalsMinAggregateOutputType = {
    id: number | null
    agent_id: number | null
    user_email: string | null
    user_name: string | null
    rental_type: string | null
    start_date: Date | null
    end_date: Date | null
    duration_hours: number | null
    base_price: Decimal | null
    context_adjustment: Decimal | null
    discount_percent: Decimal | null
    total_price: Decimal | null
    retell_phone_number: string | null
    stripe_payment_intent_id: string | null
    status: string | null
    satisfaction_score: Decimal | null
    context_match_accuracy: Decimal | null
    created_at: Date | null
    completed_at: Date | null
  }

  export type RentalsMaxAggregateOutputType = {
    id: number | null
    agent_id: number | null
    user_email: string | null
    user_name: string | null
    rental_type: string | null
    start_date: Date | null
    end_date: Date | null
    duration_hours: number | null
    base_price: Decimal | null
    context_adjustment: Decimal | null
    discount_percent: Decimal | null
    total_price: Decimal | null
    retell_phone_number: string | null
    stripe_payment_intent_id: string | null
    status: string | null
    satisfaction_score: Decimal | null
    context_match_accuracy: Decimal | null
    created_at: Date | null
    completed_at: Date | null
  }

  export type RentalsCountAggregateOutputType = {
    id: number
    agent_id: number
    user_email: number
    user_name: number
    rental_type: number
    start_date: number
    end_date: number
    duration_hours: number
    base_price: number
    context_adjustment: number
    discount_percent: number
    total_price: number
    retell_phone_number: number
    elevenlabs_voice_config: number
    gemini_customizations: number
    context_snapshot: number
    environmental_conditions: number
    performance_metrics: number
    stripe_payment_intent_id: number
    status: number
    satisfaction_score: number
    context_match_accuracy: number
    optimization_suggestions: number
    created_at: number
    completed_at: number
    _all: number
  }


  export type RentalsAvgAggregateInputType = {
    id?: true
    agent_id?: true
    duration_hours?: true
    base_price?: true
    context_adjustment?: true
    discount_percent?: true
    total_price?: true
    satisfaction_score?: true
    context_match_accuracy?: true
  }

  export type RentalsSumAggregateInputType = {
    id?: true
    agent_id?: true
    duration_hours?: true
    base_price?: true
    context_adjustment?: true
    discount_percent?: true
    total_price?: true
    satisfaction_score?: true
    context_match_accuracy?: true
  }

  export type RentalsMinAggregateInputType = {
    id?: true
    agent_id?: true
    user_email?: true
    user_name?: true
    rental_type?: true
    start_date?: true
    end_date?: true
    duration_hours?: true
    base_price?: true
    context_adjustment?: true
    discount_percent?: true
    total_price?: true
    retell_phone_number?: true
    stripe_payment_intent_id?: true
    status?: true
    satisfaction_score?: true
    context_match_accuracy?: true
    created_at?: true
    completed_at?: true
  }

  export type RentalsMaxAggregateInputType = {
    id?: true
    agent_id?: true
    user_email?: true
    user_name?: true
    rental_type?: true
    start_date?: true
    end_date?: true
    duration_hours?: true
    base_price?: true
    context_adjustment?: true
    discount_percent?: true
    total_price?: true
    retell_phone_number?: true
    stripe_payment_intent_id?: true
    status?: true
    satisfaction_score?: true
    context_match_accuracy?: true
    created_at?: true
    completed_at?: true
  }

  export type RentalsCountAggregateInputType = {
    id?: true
    agent_id?: true
    user_email?: true
    user_name?: true
    rental_type?: true
    start_date?: true
    end_date?: true
    duration_hours?: true
    base_price?: true
    context_adjustment?: true
    discount_percent?: true
    total_price?: true
    retell_phone_number?: true
    elevenlabs_voice_config?: true
    gemini_customizations?: true
    context_snapshot?: true
    environmental_conditions?: true
    performance_metrics?: true
    stripe_payment_intent_id?: true
    status?: true
    satisfaction_score?: true
    context_match_accuracy?: true
    optimization_suggestions?: true
    created_at?: true
    completed_at?: true
    _all?: true
  }

  export type RentalsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which rentals to aggregate.
     */
    where?: rentalsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of rentals to fetch.
     */
    orderBy?: rentalsOrderByWithRelationInput | rentalsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: rentalsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` rentals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` rentals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned rentals
    **/
    _count?: true | RentalsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RentalsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RentalsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RentalsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RentalsMaxAggregateInputType
  }

  export type GetRentalsAggregateType<T extends RentalsAggregateArgs> = {
        [P in keyof T & keyof AggregateRentals]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRentals[P]>
      : GetScalarType<T[P], AggregateRentals[P]>
  }




  export type rentalsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: rentalsWhereInput
    orderBy?: rentalsOrderByWithAggregationInput | rentalsOrderByWithAggregationInput[]
    by: RentalsScalarFieldEnum[] | RentalsScalarFieldEnum
    having?: rentalsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RentalsCountAggregateInputType | true
    _avg?: RentalsAvgAggregateInputType
    _sum?: RentalsSumAggregateInputType
    _min?: RentalsMinAggregateInputType
    _max?: RentalsMaxAggregateInputType
  }

  export type RentalsGroupByOutputType = {
    id: number
    agent_id: number | null
    user_email: string
    user_name: string | null
    rental_type: string | null
    start_date: Date | null
    end_date: Date | null
    duration_hours: number | null
    base_price: Decimal | null
    context_adjustment: Decimal | null
    discount_percent: Decimal | null
    total_price: Decimal | null
    retell_phone_number: string | null
    elevenlabs_voice_config: JsonValue | null
    gemini_customizations: JsonValue | null
    context_snapshot: JsonValue | null
    environmental_conditions: JsonValue | null
    performance_metrics: JsonValue | null
    stripe_payment_intent_id: string | null
    status: string | null
    satisfaction_score: Decimal | null
    context_match_accuracy: Decimal | null
    optimization_suggestions: JsonValue | null
    created_at: Date | null
    completed_at: Date | null
    _count: RentalsCountAggregateOutputType | null
    _avg: RentalsAvgAggregateOutputType | null
    _sum: RentalsSumAggregateOutputType | null
    _min: RentalsMinAggregateOutputType | null
    _max: RentalsMaxAggregateOutputType | null
  }

  type GetRentalsGroupByPayload<T extends rentalsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RentalsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RentalsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RentalsGroupByOutputType[P]>
            : GetScalarType<T[P], RentalsGroupByOutputType[P]>
        }
      >
    >


  export type rentalsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agent_id?: boolean
    user_email?: boolean
    user_name?: boolean
    rental_type?: boolean
    start_date?: boolean
    end_date?: boolean
    duration_hours?: boolean
    base_price?: boolean
    context_adjustment?: boolean
    discount_percent?: boolean
    total_price?: boolean
    retell_phone_number?: boolean
    elevenlabs_voice_config?: boolean
    gemini_customizations?: boolean
    context_snapshot?: boolean
    environmental_conditions?: boolean
    performance_metrics?: boolean
    stripe_payment_intent_id?: boolean
    status?: boolean
    satisfaction_score?: boolean
    context_match_accuracy?: boolean
    optimization_suggestions?: boolean
    created_at?: boolean
    completed_at?: boolean
    agents?: boolean | rentals$agentsArgs<ExtArgs>
  }, ExtArgs["result"]["rentals"]>

  export type rentalsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agent_id?: boolean
    user_email?: boolean
    user_name?: boolean
    rental_type?: boolean
    start_date?: boolean
    end_date?: boolean
    duration_hours?: boolean
    base_price?: boolean
    context_adjustment?: boolean
    discount_percent?: boolean
    total_price?: boolean
    retell_phone_number?: boolean
    elevenlabs_voice_config?: boolean
    gemini_customizations?: boolean
    context_snapshot?: boolean
    environmental_conditions?: boolean
    performance_metrics?: boolean
    stripe_payment_intent_id?: boolean
    status?: boolean
    satisfaction_score?: boolean
    context_match_accuracy?: boolean
    optimization_suggestions?: boolean
    created_at?: boolean
    completed_at?: boolean
    agents?: boolean | rentals$agentsArgs<ExtArgs>
  }, ExtArgs["result"]["rentals"]>

  export type rentalsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agent_id?: boolean
    user_email?: boolean
    user_name?: boolean
    rental_type?: boolean
    start_date?: boolean
    end_date?: boolean
    duration_hours?: boolean
    base_price?: boolean
    context_adjustment?: boolean
    discount_percent?: boolean
    total_price?: boolean
    retell_phone_number?: boolean
    elevenlabs_voice_config?: boolean
    gemini_customizations?: boolean
    context_snapshot?: boolean
    environmental_conditions?: boolean
    performance_metrics?: boolean
    stripe_payment_intent_id?: boolean
    status?: boolean
    satisfaction_score?: boolean
    context_match_accuracy?: boolean
    optimization_suggestions?: boolean
    created_at?: boolean
    completed_at?: boolean
    agents?: boolean | rentals$agentsArgs<ExtArgs>
  }, ExtArgs["result"]["rentals"]>

  export type rentalsSelectScalar = {
    id?: boolean
    agent_id?: boolean
    user_email?: boolean
    user_name?: boolean
    rental_type?: boolean
    start_date?: boolean
    end_date?: boolean
    duration_hours?: boolean
    base_price?: boolean
    context_adjustment?: boolean
    discount_percent?: boolean
    total_price?: boolean
    retell_phone_number?: boolean
    elevenlabs_voice_config?: boolean
    gemini_customizations?: boolean
    context_snapshot?: boolean
    environmental_conditions?: boolean
    performance_metrics?: boolean
    stripe_payment_intent_id?: boolean
    status?: boolean
    satisfaction_score?: boolean
    context_match_accuracy?: boolean
    optimization_suggestions?: boolean
    created_at?: boolean
    completed_at?: boolean
  }

  export type rentalsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "agent_id" | "user_email" | "user_name" | "rental_type" | "start_date" | "end_date" | "duration_hours" | "base_price" | "context_adjustment" | "discount_percent" | "total_price" | "retell_phone_number" | "elevenlabs_voice_config" | "gemini_customizations" | "context_snapshot" | "environmental_conditions" | "performance_metrics" | "stripe_payment_intent_id" | "status" | "satisfaction_score" | "context_match_accuracy" | "optimization_suggestions" | "created_at" | "completed_at", ExtArgs["result"]["rentals"]>
  export type rentalsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agents?: boolean | rentals$agentsArgs<ExtArgs>
  }
  export type rentalsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agents?: boolean | rentals$agentsArgs<ExtArgs>
  }
  export type rentalsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agents?: boolean | rentals$agentsArgs<ExtArgs>
  }

  export type $rentalsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "rentals"
    objects: {
      agents: Prisma.$agentsPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      agent_id: number | null
      user_email: string
      user_name: string | null
      rental_type: string | null
      start_date: Date | null
      end_date: Date | null
      duration_hours: number | null
      base_price: Prisma.Decimal | null
      context_adjustment: Prisma.Decimal | null
      discount_percent: Prisma.Decimal | null
      total_price: Prisma.Decimal | null
      retell_phone_number: string | null
      elevenlabs_voice_config: Prisma.JsonValue | null
      gemini_customizations: Prisma.JsonValue | null
      context_snapshot: Prisma.JsonValue | null
      environmental_conditions: Prisma.JsonValue | null
      performance_metrics: Prisma.JsonValue | null
      stripe_payment_intent_id: string | null
      status: string | null
      satisfaction_score: Prisma.Decimal | null
      context_match_accuracy: Prisma.Decimal | null
      optimization_suggestions: Prisma.JsonValue | null
      created_at: Date | null
      completed_at: Date | null
    }, ExtArgs["result"]["rentals"]>
    composites: {}
  }

  type rentalsGetPayload<S extends boolean | null | undefined | rentalsDefaultArgs> = $Result.GetResult<Prisma.$rentalsPayload, S>

  type rentalsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<rentalsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RentalsCountAggregateInputType | true
    }

  export interface rentalsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['rentals'], meta: { name: 'rentals' } }
    /**
     * Find zero or one Rentals that matches the filter.
     * @param {rentalsFindUniqueArgs} args - Arguments to find a Rentals
     * @example
     * // Get one Rentals
     * const rentals = await prisma.rentals.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends rentalsFindUniqueArgs>(args: SelectSubset<T, rentalsFindUniqueArgs<ExtArgs>>): Prisma__rentalsClient<$Result.GetResult<Prisma.$rentalsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Rentals that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {rentalsFindUniqueOrThrowArgs} args - Arguments to find a Rentals
     * @example
     * // Get one Rentals
     * const rentals = await prisma.rentals.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends rentalsFindUniqueOrThrowArgs>(args: SelectSubset<T, rentalsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__rentalsClient<$Result.GetResult<Prisma.$rentalsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Rentals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rentalsFindFirstArgs} args - Arguments to find a Rentals
     * @example
     * // Get one Rentals
     * const rentals = await prisma.rentals.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends rentalsFindFirstArgs>(args?: SelectSubset<T, rentalsFindFirstArgs<ExtArgs>>): Prisma__rentalsClient<$Result.GetResult<Prisma.$rentalsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Rentals that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rentalsFindFirstOrThrowArgs} args - Arguments to find a Rentals
     * @example
     * // Get one Rentals
     * const rentals = await prisma.rentals.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends rentalsFindFirstOrThrowArgs>(args?: SelectSubset<T, rentalsFindFirstOrThrowArgs<ExtArgs>>): Prisma__rentalsClient<$Result.GetResult<Prisma.$rentalsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Rentals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rentalsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Rentals
     * const rentals = await prisma.rentals.findMany()
     * 
     * // Get first 10 Rentals
     * const rentals = await prisma.rentals.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rentalsWithIdOnly = await prisma.rentals.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends rentalsFindManyArgs>(args?: SelectSubset<T, rentalsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$rentalsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Rentals.
     * @param {rentalsCreateArgs} args - Arguments to create a Rentals.
     * @example
     * // Create one Rentals
     * const Rentals = await prisma.rentals.create({
     *   data: {
     *     // ... data to create a Rentals
     *   }
     * })
     * 
     */
    create<T extends rentalsCreateArgs>(args: SelectSubset<T, rentalsCreateArgs<ExtArgs>>): Prisma__rentalsClient<$Result.GetResult<Prisma.$rentalsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Rentals.
     * @param {rentalsCreateManyArgs} args - Arguments to create many Rentals.
     * @example
     * // Create many Rentals
     * const rentals = await prisma.rentals.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends rentalsCreateManyArgs>(args?: SelectSubset<T, rentalsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Rentals and returns the data saved in the database.
     * @param {rentalsCreateManyAndReturnArgs} args - Arguments to create many Rentals.
     * @example
     * // Create many Rentals
     * const rentals = await prisma.rentals.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Rentals and only return the `id`
     * const rentalsWithIdOnly = await prisma.rentals.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends rentalsCreateManyAndReturnArgs>(args?: SelectSubset<T, rentalsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$rentalsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Rentals.
     * @param {rentalsDeleteArgs} args - Arguments to delete one Rentals.
     * @example
     * // Delete one Rentals
     * const Rentals = await prisma.rentals.delete({
     *   where: {
     *     // ... filter to delete one Rentals
     *   }
     * })
     * 
     */
    delete<T extends rentalsDeleteArgs>(args: SelectSubset<T, rentalsDeleteArgs<ExtArgs>>): Prisma__rentalsClient<$Result.GetResult<Prisma.$rentalsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Rentals.
     * @param {rentalsUpdateArgs} args - Arguments to update one Rentals.
     * @example
     * // Update one Rentals
     * const rentals = await prisma.rentals.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends rentalsUpdateArgs>(args: SelectSubset<T, rentalsUpdateArgs<ExtArgs>>): Prisma__rentalsClient<$Result.GetResult<Prisma.$rentalsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Rentals.
     * @param {rentalsDeleteManyArgs} args - Arguments to filter Rentals to delete.
     * @example
     * // Delete a few Rentals
     * const { count } = await prisma.rentals.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends rentalsDeleteManyArgs>(args?: SelectSubset<T, rentalsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rentals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rentalsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Rentals
     * const rentals = await prisma.rentals.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends rentalsUpdateManyArgs>(args: SelectSubset<T, rentalsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rentals and returns the data updated in the database.
     * @param {rentalsUpdateManyAndReturnArgs} args - Arguments to update many Rentals.
     * @example
     * // Update many Rentals
     * const rentals = await prisma.rentals.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Rentals and only return the `id`
     * const rentalsWithIdOnly = await prisma.rentals.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends rentalsUpdateManyAndReturnArgs>(args: SelectSubset<T, rentalsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$rentalsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Rentals.
     * @param {rentalsUpsertArgs} args - Arguments to update or create a Rentals.
     * @example
     * // Update or create a Rentals
     * const rentals = await prisma.rentals.upsert({
     *   create: {
     *     // ... data to create a Rentals
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Rentals we want to update
     *   }
     * })
     */
    upsert<T extends rentalsUpsertArgs>(args: SelectSubset<T, rentalsUpsertArgs<ExtArgs>>): Prisma__rentalsClient<$Result.GetResult<Prisma.$rentalsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Rentals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rentalsCountArgs} args - Arguments to filter Rentals to count.
     * @example
     * // Count the number of Rentals
     * const count = await prisma.rentals.count({
     *   where: {
     *     // ... the filter for the Rentals we want to count
     *   }
     * })
    **/
    count<T extends rentalsCountArgs>(
      args?: Subset<T, rentalsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RentalsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Rentals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RentalsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RentalsAggregateArgs>(args: Subset<T, RentalsAggregateArgs>): Prisma.PrismaPromise<GetRentalsAggregateType<T>>

    /**
     * Group by Rentals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rentalsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends rentalsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: rentalsGroupByArgs['orderBy'] }
        : { orderBy?: rentalsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, rentalsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRentalsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the rentals model
   */
  readonly fields: rentalsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for rentals.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__rentalsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    agents<T extends rentals$agentsArgs<ExtArgs> = {}>(args?: Subset<T, rentals$agentsArgs<ExtArgs>>): Prisma__agentsClient<$Result.GetResult<Prisma.$agentsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the rentals model
   */
  interface rentalsFieldRefs {
    readonly id: FieldRef<"rentals", 'Int'>
    readonly agent_id: FieldRef<"rentals", 'Int'>
    readonly user_email: FieldRef<"rentals", 'String'>
    readonly user_name: FieldRef<"rentals", 'String'>
    readonly rental_type: FieldRef<"rentals", 'String'>
    readonly start_date: FieldRef<"rentals", 'DateTime'>
    readonly end_date: FieldRef<"rentals", 'DateTime'>
    readonly duration_hours: FieldRef<"rentals", 'Int'>
    readonly base_price: FieldRef<"rentals", 'Decimal'>
    readonly context_adjustment: FieldRef<"rentals", 'Decimal'>
    readonly discount_percent: FieldRef<"rentals", 'Decimal'>
    readonly total_price: FieldRef<"rentals", 'Decimal'>
    readonly retell_phone_number: FieldRef<"rentals", 'String'>
    readonly elevenlabs_voice_config: FieldRef<"rentals", 'Json'>
    readonly gemini_customizations: FieldRef<"rentals", 'Json'>
    readonly context_snapshot: FieldRef<"rentals", 'Json'>
    readonly environmental_conditions: FieldRef<"rentals", 'Json'>
    readonly performance_metrics: FieldRef<"rentals", 'Json'>
    readonly stripe_payment_intent_id: FieldRef<"rentals", 'String'>
    readonly status: FieldRef<"rentals", 'String'>
    readonly satisfaction_score: FieldRef<"rentals", 'Decimal'>
    readonly context_match_accuracy: FieldRef<"rentals", 'Decimal'>
    readonly optimization_suggestions: FieldRef<"rentals", 'Json'>
    readonly created_at: FieldRef<"rentals", 'DateTime'>
    readonly completed_at: FieldRef<"rentals", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * rentals findUnique
   */
  export type rentalsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rentals
     */
    select?: rentalsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the rentals
     */
    omit?: rentalsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rentalsInclude<ExtArgs> | null
    /**
     * Filter, which rentals to fetch.
     */
    where: rentalsWhereUniqueInput
  }

  /**
   * rentals findUniqueOrThrow
   */
  export type rentalsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rentals
     */
    select?: rentalsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the rentals
     */
    omit?: rentalsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rentalsInclude<ExtArgs> | null
    /**
     * Filter, which rentals to fetch.
     */
    where: rentalsWhereUniqueInput
  }

  /**
   * rentals findFirst
   */
  export type rentalsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rentals
     */
    select?: rentalsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the rentals
     */
    omit?: rentalsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rentalsInclude<ExtArgs> | null
    /**
     * Filter, which rentals to fetch.
     */
    where?: rentalsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of rentals to fetch.
     */
    orderBy?: rentalsOrderByWithRelationInput | rentalsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for rentals.
     */
    cursor?: rentalsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` rentals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` rentals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of rentals.
     */
    distinct?: RentalsScalarFieldEnum | RentalsScalarFieldEnum[]
  }

  /**
   * rentals findFirstOrThrow
   */
  export type rentalsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rentals
     */
    select?: rentalsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the rentals
     */
    omit?: rentalsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rentalsInclude<ExtArgs> | null
    /**
     * Filter, which rentals to fetch.
     */
    where?: rentalsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of rentals to fetch.
     */
    orderBy?: rentalsOrderByWithRelationInput | rentalsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for rentals.
     */
    cursor?: rentalsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` rentals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` rentals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of rentals.
     */
    distinct?: RentalsScalarFieldEnum | RentalsScalarFieldEnum[]
  }

  /**
   * rentals findMany
   */
  export type rentalsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rentals
     */
    select?: rentalsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the rentals
     */
    omit?: rentalsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rentalsInclude<ExtArgs> | null
    /**
     * Filter, which rentals to fetch.
     */
    where?: rentalsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of rentals to fetch.
     */
    orderBy?: rentalsOrderByWithRelationInput | rentalsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing rentals.
     */
    cursor?: rentalsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` rentals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` rentals.
     */
    skip?: number
    distinct?: RentalsScalarFieldEnum | RentalsScalarFieldEnum[]
  }

  /**
   * rentals create
   */
  export type rentalsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rentals
     */
    select?: rentalsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the rentals
     */
    omit?: rentalsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rentalsInclude<ExtArgs> | null
    /**
     * The data needed to create a rentals.
     */
    data: XOR<rentalsCreateInput, rentalsUncheckedCreateInput>
  }

  /**
   * rentals createMany
   */
  export type rentalsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many rentals.
     */
    data: rentalsCreateManyInput | rentalsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * rentals createManyAndReturn
   */
  export type rentalsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rentals
     */
    select?: rentalsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the rentals
     */
    omit?: rentalsOmit<ExtArgs> | null
    /**
     * The data used to create many rentals.
     */
    data: rentalsCreateManyInput | rentalsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rentalsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * rentals update
   */
  export type rentalsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rentals
     */
    select?: rentalsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the rentals
     */
    omit?: rentalsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rentalsInclude<ExtArgs> | null
    /**
     * The data needed to update a rentals.
     */
    data: XOR<rentalsUpdateInput, rentalsUncheckedUpdateInput>
    /**
     * Choose, which rentals to update.
     */
    where: rentalsWhereUniqueInput
  }

  /**
   * rentals updateMany
   */
  export type rentalsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update rentals.
     */
    data: XOR<rentalsUpdateManyMutationInput, rentalsUncheckedUpdateManyInput>
    /**
     * Filter which rentals to update
     */
    where?: rentalsWhereInput
    /**
     * Limit how many rentals to update.
     */
    limit?: number
  }

  /**
   * rentals updateManyAndReturn
   */
  export type rentalsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rentals
     */
    select?: rentalsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the rentals
     */
    omit?: rentalsOmit<ExtArgs> | null
    /**
     * The data used to update rentals.
     */
    data: XOR<rentalsUpdateManyMutationInput, rentalsUncheckedUpdateManyInput>
    /**
     * Filter which rentals to update
     */
    where?: rentalsWhereInput
    /**
     * Limit how many rentals to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rentalsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * rentals upsert
   */
  export type rentalsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rentals
     */
    select?: rentalsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the rentals
     */
    omit?: rentalsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rentalsInclude<ExtArgs> | null
    /**
     * The filter to search for the rentals to update in case it exists.
     */
    where: rentalsWhereUniqueInput
    /**
     * In case the rentals found by the `where` argument doesn't exist, create a new rentals with this data.
     */
    create: XOR<rentalsCreateInput, rentalsUncheckedCreateInput>
    /**
     * In case the rentals was found with the provided `where` argument, update it with this data.
     */
    update: XOR<rentalsUpdateInput, rentalsUncheckedUpdateInput>
  }

  /**
   * rentals delete
   */
  export type rentalsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rentals
     */
    select?: rentalsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the rentals
     */
    omit?: rentalsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rentalsInclude<ExtArgs> | null
    /**
     * Filter which rentals to delete.
     */
    where: rentalsWhereUniqueInput
  }

  /**
   * rentals deleteMany
   */
  export type rentalsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which rentals to delete
     */
    where?: rentalsWhereInput
    /**
     * Limit how many rentals to delete.
     */
    limit?: number
  }

  /**
   * rentals.agents
   */
  export type rentals$agentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agents
     */
    select?: agentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agents
     */
    omit?: agentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agentsInclude<ExtArgs> | null
    where?: agentsWhereInput
  }

  /**
   * rentals without action
   */
  export type rentalsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rentals
     */
    select?: rentalsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the rentals
     */
    omit?: rentalsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rentalsInclude<ExtArgs> | null
  }


  /**
   * Model subscriptions
   */

  export type AggregateSubscriptions = {
    _count: SubscriptionsCountAggregateOutputType | null
    _avg: SubscriptionsAvgAggregateOutputType | null
    _sum: SubscriptionsSumAggregateOutputType | null
    _min: SubscriptionsMinAggregateOutputType | null
    _max: SubscriptionsMaxAggregateOutputType | null
  }

  export type SubscriptionsAvgAggregateOutputType = {
    id: number | null
    monthly_price: Decimal | null
    annual_price: Decimal | null
    discount_percent: Decimal | null
    agent_limit: number | null
    context_match_score: Decimal | null
  }

  export type SubscriptionsSumAggregateOutputType = {
    id: number | null
    monthly_price: Decimal | null
    annual_price: Decimal | null
    discount_percent: Decimal | null
    agent_limit: number | null
    context_match_score: Decimal | null
  }

  export type SubscriptionsMinAggregateOutputType = {
    id: number | null
    user_email: string | null
    plan_name: string | null
    billing_period: string | null
    monthly_price: Decimal | null
    annual_price: Decimal | null
    discount_percent: Decimal | null
    agent_limit: number | null
    recommended_based_on_context: boolean | null
    context_match_score: Decimal | null
    stripe_subscription_id: string | null
    status: string | null
    created_at: Date | null
    expires_at: Date | null
    next_billing_date: Date | null
  }

  export type SubscriptionsMaxAggregateOutputType = {
    id: number | null
    user_email: string | null
    plan_name: string | null
    billing_period: string | null
    monthly_price: Decimal | null
    annual_price: Decimal | null
    discount_percent: Decimal | null
    agent_limit: number | null
    recommended_based_on_context: boolean | null
    context_match_score: Decimal | null
    stripe_subscription_id: string | null
    status: string | null
    created_at: Date | null
    expires_at: Date | null
    next_billing_date: Date | null
  }

  export type SubscriptionsCountAggregateOutputType = {
    id: number
    user_email: number
    plan_name: number
    billing_period: number
    monthly_price: number
    annual_price: number
    discount_percent: number
    context_based_discounts: number
    agent_limit: number
    features: number
    recommended_based_on_context: number
    context_match_score: number
    stripe_subscription_id: number
    status: number
    created_at: number
    expires_at: number
    next_billing_date: number
    _all: number
  }


  export type SubscriptionsAvgAggregateInputType = {
    id?: true
    monthly_price?: true
    annual_price?: true
    discount_percent?: true
    agent_limit?: true
    context_match_score?: true
  }

  export type SubscriptionsSumAggregateInputType = {
    id?: true
    monthly_price?: true
    annual_price?: true
    discount_percent?: true
    agent_limit?: true
    context_match_score?: true
  }

  export type SubscriptionsMinAggregateInputType = {
    id?: true
    user_email?: true
    plan_name?: true
    billing_period?: true
    monthly_price?: true
    annual_price?: true
    discount_percent?: true
    agent_limit?: true
    recommended_based_on_context?: true
    context_match_score?: true
    stripe_subscription_id?: true
    status?: true
    created_at?: true
    expires_at?: true
    next_billing_date?: true
  }

  export type SubscriptionsMaxAggregateInputType = {
    id?: true
    user_email?: true
    plan_name?: true
    billing_period?: true
    monthly_price?: true
    annual_price?: true
    discount_percent?: true
    agent_limit?: true
    recommended_based_on_context?: true
    context_match_score?: true
    stripe_subscription_id?: true
    status?: true
    created_at?: true
    expires_at?: true
    next_billing_date?: true
  }

  export type SubscriptionsCountAggregateInputType = {
    id?: true
    user_email?: true
    plan_name?: true
    billing_period?: true
    monthly_price?: true
    annual_price?: true
    discount_percent?: true
    context_based_discounts?: true
    agent_limit?: true
    features?: true
    recommended_based_on_context?: true
    context_match_score?: true
    stripe_subscription_id?: true
    status?: true
    created_at?: true
    expires_at?: true
    next_billing_date?: true
    _all?: true
  }

  export type SubscriptionsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which subscriptions to aggregate.
     */
    where?: subscriptionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of subscriptions to fetch.
     */
    orderBy?: subscriptionsOrderByWithRelationInput | subscriptionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: subscriptionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned subscriptions
    **/
    _count?: true | SubscriptionsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SubscriptionsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SubscriptionsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubscriptionsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubscriptionsMaxAggregateInputType
  }

  export type GetSubscriptionsAggregateType<T extends SubscriptionsAggregateArgs> = {
        [P in keyof T & keyof AggregateSubscriptions]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubscriptions[P]>
      : GetScalarType<T[P], AggregateSubscriptions[P]>
  }




  export type subscriptionsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: subscriptionsWhereInput
    orderBy?: subscriptionsOrderByWithAggregationInput | subscriptionsOrderByWithAggregationInput[]
    by: SubscriptionsScalarFieldEnum[] | SubscriptionsScalarFieldEnum
    having?: subscriptionsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubscriptionsCountAggregateInputType | true
    _avg?: SubscriptionsAvgAggregateInputType
    _sum?: SubscriptionsSumAggregateInputType
    _min?: SubscriptionsMinAggregateInputType
    _max?: SubscriptionsMaxAggregateInputType
  }

  export type SubscriptionsGroupByOutputType = {
    id: number
    user_email: string
    plan_name: string | null
    billing_period: string | null
    monthly_price: Decimal | null
    annual_price: Decimal | null
    discount_percent: Decimal | null
    context_based_discounts: JsonValue | null
    agent_limit: number | null
    features: JsonValue | null
    recommended_based_on_context: boolean | null
    context_match_score: Decimal | null
    stripe_subscription_id: string | null
    status: string | null
    created_at: Date | null
    expires_at: Date | null
    next_billing_date: Date | null
    _count: SubscriptionsCountAggregateOutputType | null
    _avg: SubscriptionsAvgAggregateOutputType | null
    _sum: SubscriptionsSumAggregateOutputType | null
    _min: SubscriptionsMinAggregateOutputType | null
    _max: SubscriptionsMaxAggregateOutputType | null
  }

  type GetSubscriptionsGroupByPayload<T extends subscriptionsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubscriptionsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubscriptionsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubscriptionsGroupByOutputType[P]>
            : GetScalarType<T[P], SubscriptionsGroupByOutputType[P]>
        }
      >
    >


  export type subscriptionsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_email?: boolean
    plan_name?: boolean
    billing_period?: boolean
    monthly_price?: boolean
    annual_price?: boolean
    discount_percent?: boolean
    context_based_discounts?: boolean
    agent_limit?: boolean
    features?: boolean
    recommended_based_on_context?: boolean
    context_match_score?: boolean
    stripe_subscription_id?: boolean
    status?: boolean
    created_at?: boolean
    expires_at?: boolean
    next_billing_date?: boolean
  }, ExtArgs["result"]["subscriptions"]>

  export type subscriptionsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_email?: boolean
    plan_name?: boolean
    billing_period?: boolean
    monthly_price?: boolean
    annual_price?: boolean
    discount_percent?: boolean
    context_based_discounts?: boolean
    agent_limit?: boolean
    features?: boolean
    recommended_based_on_context?: boolean
    context_match_score?: boolean
    stripe_subscription_id?: boolean
    status?: boolean
    created_at?: boolean
    expires_at?: boolean
    next_billing_date?: boolean
  }, ExtArgs["result"]["subscriptions"]>

  export type subscriptionsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_email?: boolean
    plan_name?: boolean
    billing_period?: boolean
    monthly_price?: boolean
    annual_price?: boolean
    discount_percent?: boolean
    context_based_discounts?: boolean
    agent_limit?: boolean
    features?: boolean
    recommended_based_on_context?: boolean
    context_match_score?: boolean
    stripe_subscription_id?: boolean
    status?: boolean
    created_at?: boolean
    expires_at?: boolean
    next_billing_date?: boolean
  }, ExtArgs["result"]["subscriptions"]>

  export type subscriptionsSelectScalar = {
    id?: boolean
    user_email?: boolean
    plan_name?: boolean
    billing_period?: boolean
    monthly_price?: boolean
    annual_price?: boolean
    discount_percent?: boolean
    context_based_discounts?: boolean
    agent_limit?: boolean
    features?: boolean
    recommended_based_on_context?: boolean
    context_match_score?: boolean
    stripe_subscription_id?: boolean
    status?: boolean
    created_at?: boolean
    expires_at?: boolean
    next_billing_date?: boolean
  }

  export type subscriptionsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_email" | "plan_name" | "billing_period" | "monthly_price" | "annual_price" | "discount_percent" | "context_based_discounts" | "agent_limit" | "features" | "recommended_based_on_context" | "context_match_score" | "stripe_subscription_id" | "status" | "created_at" | "expires_at" | "next_billing_date", ExtArgs["result"]["subscriptions"]>

  export type $subscriptionsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "subscriptions"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      user_email: string
      plan_name: string | null
      billing_period: string | null
      monthly_price: Prisma.Decimal | null
      annual_price: Prisma.Decimal | null
      discount_percent: Prisma.Decimal | null
      context_based_discounts: Prisma.JsonValue | null
      agent_limit: number | null
      features: Prisma.JsonValue | null
      recommended_based_on_context: boolean | null
      context_match_score: Prisma.Decimal | null
      stripe_subscription_id: string | null
      status: string | null
      created_at: Date | null
      expires_at: Date | null
      next_billing_date: Date | null
    }, ExtArgs["result"]["subscriptions"]>
    composites: {}
  }

  type subscriptionsGetPayload<S extends boolean | null | undefined | subscriptionsDefaultArgs> = $Result.GetResult<Prisma.$subscriptionsPayload, S>

  type subscriptionsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<subscriptionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubscriptionsCountAggregateInputType | true
    }

  export interface subscriptionsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['subscriptions'], meta: { name: 'subscriptions' } }
    /**
     * Find zero or one Subscriptions that matches the filter.
     * @param {subscriptionsFindUniqueArgs} args - Arguments to find a Subscriptions
     * @example
     * // Get one Subscriptions
     * const subscriptions = await prisma.subscriptions.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends subscriptionsFindUniqueArgs>(args: SelectSubset<T, subscriptionsFindUniqueArgs<ExtArgs>>): Prisma__subscriptionsClient<$Result.GetResult<Prisma.$subscriptionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Subscriptions that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {subscriptionsFindUniqueOrThrowArgs} args - Arguments to find a Subscriptions
     * @example
     * // Get one Subscriptions
     * const subscriptions = await prisma.subscriptions.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends subscriptionsFindUniqueOrThrowArgs>(args: SelectSubset<T, subscriptionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__subscriptionsClient<$Result.GetResult<Prisma.$subscriptionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subscriptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {subscriptionsFindFirstArgs} args - Arguments to find a Subscriptions
     * @example
     * // Get one Subscriptions
     * const subscriptions = await prisma.subscriptions.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends subscriptionsFindFirstArgs>(args?: SelectSubset<T, subscriptionsFindFirstArgs<ExtArgs>>): Prisma__subscriptionsClient<$Result.GetResult<Prisma.$subscriptionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subscriptions that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {subscriptionsFindFirstOrThrowArgs} args - Arguments to find a Subscriptions
     * @example
     * // Get one Subscriptions
     * const subscriptions = await prisma.subscriptions.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends subscriptionsFindFirstOrThrowArgs>(args?: SelectSubset<T, subscriptionsFindFirstOrThrowArgs<ExtArgs>>): Prisma__subscriptionsClient<$Result.GetResult<Prisma.$subscriptionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Subscriptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {subscriptionsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Subscriptions
     * const subscriptions = await prisma.subscriptions.findMany()
     * 
     * // Get first 10 Subscriptions
     * const subscriptions = await prisma.subscriptions.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subscriptionsWithIdOnly = await prisma.subscriptions.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends subscriptionsFindManyArgs>(args?: SelectSubset<T, subscriptionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$subscriptionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Subscriptions.
     * @param {subscriptionsCreateArgs} args - Arguments to create a Subscriptions.
     * @example
     * // Create one Subscriptions
     * const Subscriptions = await prisma.subscriptions.create({
     *   data: {
     *     // ... data to create a Subscriptions
     *   }
     * })
     * 
     */
    create<T extends subscriptionsCreateArgs>(args: SelectSubset<T, subscriptionsCreateArgs<ExtArgs>>): Prisma__subscriptionsClient<$Result.GetResult<Prisma.$subscriptionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Subscriptions.
     * @param {subscriptionsCreateManyArgs} args - Arguments to create many Subscriptions.
     * @example
     * // Create many Subscriptions
     * const subscriptions = await prisma.subscriptions.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends subscriptionsCreateManyArgs>(args?: SelectSubset<T, subscriptionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Subscriptions and returns the data saved in the database.
     * @param {subscriptionsCreateManyAndReturnArgs} args - Arguments to create many Subscriptions.
     * @example
     * // Create many Subscriptions
     * const subscriptions = await prisma.subscriptions.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Subscriptions and only return the `id`
     * const subscriptionsWithIdOnly = await prisma.subscriptions.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends subscriptionsCreateManyAndReturnArgs>(args?: SelectSubset<T, subscriptionsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$subscriptionsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Subscriptions.
     * @param {subscriptionsDeleteArgs} args - Arguments to delete one Subscriptions.
     * @example
     * // Delete one Subscriptions
     * const Subscriptions = await prisma.subscriptions.delete({
     *   where: {
     *     // ... filter to delete one Subscriptions
     *   }
     * })
     * 
     */
    delete<T extends subscriptionsDeleteArgs>(args: SelectSubset<T, subscriptionsDeleteArgs<ExtArgs>>): Prisma__subscriptionsClient<$Result.GetResult<Prisma.$subscriptionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Subscriptions.
     * @param {subscriptionsUpdateArgs} args - Arguments to update one Subscriptions.
     * @example
     * // Update one Subscriptions
     * const subscriptions = await prisma.subscriptions.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends subscriptionsUpdateArgs>(args: SelectSubset<T, subscriptionsUpdateArgs<ExtArgs>>): Prisma__subscriptionsClient<$Result.GetResult<Prisma.$subscriptionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Subscriptions.
     * @param {subscriptionsDeleteManyArgs} args - Arguments to filter Subscriptions to delete.
     * @example
     * // Delete a few Subscriptions
     * const { count } = await prisma.subscriptions.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends subscriptionsDeleteManyArgs>(args?: SelectSubset<T, subscriptionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {subscriptionsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Subscriptions
     * const subscriptions = await prisma.subscriptions.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends subscriptionsUpdateManyArgs>(args: SelectSubset<T, subscriptionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subscriptions and returns the data updated in the database.
     * @param {subscriptionsUpdateManyAndReturnArgs} args - Arguments to update many Subscriptions.
     * @example
     * // Update many Subscriptions
     * const subscriptions = await prisma.subscriptions.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Subscriptions and only return the `id`
     * const subscriptionsWithIdOnly = await prisma.subscriptions.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends subscriptionsUpdateManyAndReturnArgs>(args: SelectSubset<T, subscriptionsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$subscriptionsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Subscriptions.
     * @param {subscriptionsUpsertArgs} args - Arguments to update or create a Subscriptions.
     * @example
     * // Update or create a Subscriptions
     * const subscriptions = await prisma.subscriptions.upsert({
     *   create: {
     *     // ... data to create a Subscriptions
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Subscriptions we want to update
     *   }
     * })
     */
    upsert<T extends subscriptionsUpsertArgs>(args: SelectSubset<T, subscriptionsUpsertArgs<ExtArgs>>): Prisma__subscriptionsClient<$Result.GetResult<Prisma.$subscriptionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {subscriptionsCountArgs} args - Arguments to filter Subscriptions to count.
     * @example
     * // Count the number of Subscriptions
     * const count = await prisma.subscriptions.count({
     *   where: {
     *     // ... the filter for the Subscriptions we want to count
     *   }
     * })
    **/
    count<T extends subscriptionsCountArgs>(
      args?: Subset<T, subscriptionsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubscriptionsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubscriptionsAggregateArgs>(args: Subset<T, SubscriptionsAggregateArgs>): Prisma.PrismaPromise<GetSubscriptionsAggregateType<T>>

    /**
     * Group by Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {subscriptionsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends subscriptionsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: subscriptionsGroupByArgs['orderBy'] }
        : { orderBy?: subscriptionsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, subscriptionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubscriptionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the subscriptions model
   */
  readonly fields: subscriptionsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for subscriptions.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__subscriptionsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the subscriptions model
   */
  interface subscriptionsFieldRefs {
    readonly id: FieldRef<"subscriptions", 'Int'>
    readonly user_email: FieldRef<"subscriptions", 'String'>
    readonly plan_name: FieldRef<"subscriptions", 'String'>
    readonly billing_period: FieldRef<"subscriptions", 'String'>
    readonly monthly_price: FieldRef<"subscriptions", 'Decimal'>
    readonly annual_price: FieldRef<"subscriptions", 'Decimal'>
    readonly discount_percent: FieldRef<"subscriptions", 'Decimal'>
    readonly context_based_discounts: FieldRef<"subscriptions", 'Json'>
    readonly agent_limit: FieldRef<"subscriptions", 'Int'>
    readonly features: FieldRef<"subscriptions", 'Json'>
    readonly recommended_based_on_context: FieldRef<"subscriptions", 'Boolean'>
    readonly context_match_score: FieldRef<"subscriptions", 'Decimal'>
    readonly stripe_subscription_id: FieldRef<"subscriptions", 'String'>
    readonly status: FieldRef<"subscriptions", 'String'>
    readonly created_at: FieldRef<"subscriptions", 'DateTime'>
    readonly expires_at: FieldRef<"subscriptions", 'DateTime'>
    readonly next_billing_date: FieldRef<"subscriptions", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * subscriptions findUnique
   */
  export type subscriptionsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriptions
     */
    select?: subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriptions
     */
    omit?: subscriptionsOmit<ExtArgs> | null
    /**
     * Filter, which subscriptions to fetch.
     */
    where: subscriptionsWhereUniqueInput
  }

  /**
   * subscriptions findUniqueOrThrow
   */
  export type subscriptionsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriptions
     */
    select?: subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriptions
     */
    omit?: subscriptionsOmit<ExtArgs> | null
    /**
     * Filter, which subscriptions to fetch.
     */
    where: subscriptionsWhereUniqueInput
  }

  /**
   * subscriptions findFirst
   */
  export type subscriptionsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriptions
     */
    select?: subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriptions
     */
    omit?: subscriptionsOmit<ExtArgs> | null
    /**
     * Filter, which subscriptions to fetch.
     */
    where?: subscriptionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of subscriptions to fetch.
     */
    orderBy?: subscriptionsOrderByWithRelationInput | subscriptionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for subscriptions.
     */
    cursor?: subscriptionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of subscriptions.
     */
    distinct?: SubscriptionsScalarFieldEnum | SubscriptionsScalarFieldEnum[]
  }

  /**
   * subscriptions findFirstOrThrow
   */
  export type subscriptionsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriptions
     */
    select?: subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriptions
     */
    omit?: subscriptionsOmit<ExtArgs> | null
    /**
     * Filter, which subscriptions to fetch.
     */
    where?: subscriptionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of subscriptions to fetch.
     */
    orderBy?: subscriptionsOrderByWithRelationInput | subscriptionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for subscriptions.
     */
    cursor?: subscriptionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of subscriptions.
     */
    distinct?: SubscriptionsScalarFieldEnum | SubscriptionsScalarFieldEnum[]
  }

  /**
   * subscriptions findMany
   */
  export type subscriptionsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriptions
     */
    select?: subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriptions
     */
    omit?: subscriptionsOmit<ExtArgs> | null
    /**
     * Filter, which subscriptions to fetch.
     */
    where?: subscriptionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of subscriptions to fetch.
     */
    orderBy?: subscriptionsOrderByWithRelationInput | subscriptionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing subscriptions.
     */
    cursor?: subscriptionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` subscriptions.
     */
    skip?: number
    distinct?: SubscriptionsScalarFieldEnum | SubscriptionsScalarFieldEnum[]
  }

  /**
   * subscriptions create
   */
  export type subscriptionsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriptions
     */
    select?: subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriptions
     */
    omit?: subscriptionsOmit<ExtArgs> | null
    /**
     * The data needed to create a subscriptions.
     */
    data: XOR<subscriptionsCreateInput, subscriptionsUncheckedCreateInput>
  }

  /**
   * subscriptions createMany
   */
  export type subscriptionsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many subscriptions.
     */
    data: subscriptionsCreateManyInput | subscriptionsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * subscriptions createManyAndReturn
   */
  export type subscriptionsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriptions
     */
    select?: subscriptionsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the subscriptions
     */
    omit?: subscriptionsOmit<ExtArgs> | null
    /**
     * The data used to create many subscriptions.
     */
    data: subscriptionsCreateManyInput | subscriptionsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * subscriptions update
   */
  export type subscriptionsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriptions
     */
    select?: subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriptions
     */
    omit?: subscriptionsOmit<ExtArgs> | null
    /**
     * The data needed to update a subscriptions.
     */
    data: XOR<subscriptionsUpdateInput, subscriptionsUncheckedUpdateInput>
    /**
     * Choose, which subscriptions to update.
     */
    where: subscriptionsWhereUniqueInput
  }

  /**
   * subscriptions updateMany
   */
  export type subscriptionsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update subscriptions.
     */
    data: XOR<subscriptionsUpdateManyMutationInput, subscriptionsUncheckedUpdateManyInput>
    /**
     * Filter which subscriptions to update
     */
    where?: subscriptionsWhereInput
    /**
     * Limit how many subscriptions to update.
     */
    limit?: number
  }

  /**
   * subscriptions updateManyAndReturn
   */
  export type subscriptionsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriptions
     */
    select?: subscriptionsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the subscriptions
     */
    omit?: subscriptionsOmit<ExtArgs> | null
    /**
     * The data used to update subscriptions.
     */
    data: XOR<subscriptionsUpdateManyMutationInput, subscriptionsUncheckedUpdateManyInput>
    /**
     * Filter which subscriptions to update
     */
    where?: subscriptionsWhereInput
    /**
     * Limit how many subscriptions to update.
     */
    limit?: number
  }

  /**
   * subscriptions upsert
   */
  export type subscriptionsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriptions
     */
    select?: subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriptions
     */
    omit?: subscriptionsOmit<ExtArgs> | null
    /**
     * The filter to search for the subscriptions to update in case it exists.
     */
    where: subscriptionsWhereUniqueInput
    /**
     * In case the subscriptions found by the `where` argument doesn't exist, create a new subscriptions with this data.
     */
    create: XOR<subscriptionsCreateInput, subscriptionsUncheckedCreateInput>
    /**
     * In case the subscriptions was found with the provided `where` argument, update it with this data.
     */
    update: XOR<subscriptionsUpdateInput, subscriptionsUncheckedUpdateInput>
  }

  /**
   * subscriptions delete
   */
  export type subscriptionsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriptions
     */
    select?: subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriptions
     */
    omit?: subscriptionsOmit<ExtArgs> | null
    /**
     * Filter which subscriptions to delete.
     */
    where: subscriptionsWhereUniqueInput
  }

  /**
   * subscriptions deleteMany
   */
  export type subscriptionsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which subscriptions to delete
     */
    where?: subscriptionsWhereInput
    /**
     * Limit how many subscriptions to delete.
     */
    limit?: number
  }

  /**
   * subscriptions without action
   */
  export type subscriptionsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriptions
     */
    select?: subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriptions
     */
    omit?: subscriptionsOmit<ExtArgs> | null
  }


  /**
   * Model system_health_metrics
   */

  export type AggregateSystem_health_metrics = {
    _count: System_health_metricsCountAggregateOutputType | null
    _avg: System_health_metricsAvgAggregateOutputType | null
    _sum: System_health_metricsSumAggregateOutputType | null
    _min: System_health_metricsMinAggregateOutputType | null
    _max: System_health_metricsMaxAggregateOutputType | null
  }

  export type System_health_metricsAvgAggregateOutputType = {
    id: number | null
    api_uptime_percentage: Decimal | null
    avg_api_response_time_ms: number | null
    voice_api_success_rate: Decimal | null
    database_connection_pool_usage: Decimal | null
    error_rate_percentage: Decimal | null
  }

  export type System_health_metricsSumAggregateOutputType = {
    id: number | null
    api_uptime_percentage: Decimal | null
    avg_api_response_time_ms: number | null
    voice_api_success_rate: Decimal | null
    database_connection_pool_usage: Decimal | null
    error_rate_percentage: Decimal | null
  }

  export type System_health_metricsMinAggregateOutputType = {
    id: number | null
    metric_date: Date | null
    api_uptime_percentage: Decimal | null
    avg_api_response_time_ms: number | null
    voice_api_success_rate: Decimal | null
    database_connection_pool_usage: Decimal | null
    error_rate_percentage: Decimal | null
    created_at: Date | null
  }

  export type System_health_metricsMaxAggregateOutputType = {
    id: number | null
    metric_date: Date | null
    api_uptime_percentage: Decimal | null
    avg_api_response_time_ms: number | null
    voice_api_success_rate: Decimal | null
    database_connection_pool_usage: Decimal | null
    error_rate_percentage: Decimal | null
    created_at: Date | null
  }

  export type System_health_metricsCountAggregateOutputType = {
    id: number
    metric_date: number
    api_uptime_percentage: number
    avg_api_response_time_ms: number
    voice_api_success_rate: number
    database_connection_pool_usage: number
    error_rate_percentage: number
    created_at: number
    _all: number
  }


  export type System_health_metricsAvgAggregateInputType = {
    id?: true
    api_uptime_percentage?: true
    avg_api_response_time_ms?: true
    voice_api_success_rate?: true
    database_connection_pool_usage?: true
    error_rate_percentage?: true
  }

  export type System_health_metricsSumAggregateInputType = {
    id?: true
    api_uptime_percentage?: true
    avg_api_response_time_ms?: true
    voice_api_success_rate?: true
    database_connection_pool_usage?: true
    error_rate_percentage?: true
  }

  export type System_health_metricsMinAggregateInputType = {
    id?: true
    metric_date?: true
    api_uptime_percentage?: true
    avg_api_response_time_ms?: true
    voice_api_success_rate?: true
    database_connection_pool_usage?: true
    error_rate_percentage?: true
    created_at?: true
  }

  export type System_health_metricsMaxAggregateInputType = {
    id?: true
    metric_date?: true
    api_uptime_percentage?: true
    avg_api_response_time_ms?: true
    voice_api_success_rate?: true
    database_connection_pool_usage?: true
    error_rate_percentage?: true
    created_at?: true
  }

  export type System_health_metricsCountAggregateInputType = {
    id?: true
    metric_date?: true
    api_uptime_percentage?: true
    avg_api_response_time_ms?: true
    voice_api_success_rate?: true
    database_connection_pool_usage?: true
    error_rate_percentage?: true
    created_at?: true
    _all?: true
  }

  export type System_health_metricsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which system_health_metrics to aggregate.
     */
    where?: system_health_metricsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of system_health_metrics to fetch.
     */
    orderBy?: system_health_metricsOrderByWithRelationInput | system_health_metricsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: system_health_metricsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` system_health_metrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` system_health_metrics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned system_health_metrics
    **/
    _count?: true | System_health_metricsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: System_health_metricsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: System_health_metricsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: System_health_metricsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: System_health_metricsMaxAggregateInputType
  }

  export type GetSystem_health_metricsAggregateType<T extends System_health_metricsAggregateArgs> = {
        [P in keyof T & keyof AggregateSystem_health_metrics]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSystem_health_metrics[P]>
      : GetScalarType<T[P], AggregateSystem_health_metrics[P]>
  }




  export type system_health_metricsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: system_health_metricsWhereInput
    orderBy?: system_health_metricsOrderByWithAggregationInput | system_health_metricsOrderByWithAggregationInput[]
    by: System_health_metricsScalarFieldEnum[] | System_health_metricsScalarFieldEnum
    having?: system_health_metricsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: System_health_metricsCountAggregateInputType | true
    _avg?: System_health_metricsAvgAggregateInputType
    _sum?: System_health_metricsSumAggregateInputType
    _min?: System_health_metricsMinAggregateInputType
    _max?: System_health_metricsMaxAggregateInputType
  }

  export type System_health_metricsGroupByOutputType = {
    id: number
    metric_date: Date | null
    api_uptime_percentage: Decimal | null
    avg_api_response_time_ms: number | null
    voice_api_success_rate: Decimal | null
    database_connection_pool_usage: Decimal | null
    error_rate_percentage: Decimal | null
    created_at: Date | null
    _count: System_health_metricsCountAggregateOutputType | null
    _avg: System_health_metricsAvgAggregateOutputType | null
    _sum: System_health_metricsSumAggregateOutputType | null
    _min: System_health_metricsMinAggregateOutputType | null
    _max: System_health_metricsMaxAggregateOutputType | null
  }

  type GetSystem_health_metricsGroupByPayload<T extends system_health_metricsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<System_health_metricsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof System_health_metricsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], System_health_metricsGroupByOutputType[P]>
            : GetScalarType<T[P], System_health_metricsGroupByOutputType[P]>
        }
      >
    >


  export type system_health_metricsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    metric_date?: boolean
    api_uptime_percentage?: boolean
    avg_api_response_time_ms?: boolean
    voice_api_success_rate?: boolean
    database_connection_pool_usage?: boolean
    error_rate_percentage?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["system_health_metrics"]>

  export type system_health_metricsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    metric_date?: boolean
    api_uptime_percentage?: boolean
    avg_api_response_time_ms?: boolean
    voice_api_success_rate?: boolean
    database_connection_pool_usage?: boolean
    error_rate_percentage?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["system_health_metrics"]>

  export type system_health_metricsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    metric_date?: boolean
    api_uptime_percentage?: boolean
    avg_api_response_time_ms?: boolean
    voice_api_success_rate?: boolean
    database_connection_pool_usage?: boolean
    error_rate_percentage?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["system_health_metrics"]>

  export type system_health_metricsSelectScalar = {
    id?: boolean
    metric_date?: boolean
    api_uptime_percentage?: boolean
    avg_api_response_time_ms?: boolean
    voice_api_success_rate?: boolean
    database_connection_pool_usage?: boolean
    error_rate_percentage?: boolean
    created_at?: boolean
  }

  export type system_health_metricsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "metric_date" | "api_uptime_percentage" | "avg_api_response_time_ms" | "voice_api_success_rate" | "database_connection_pool_usage" | "error_rate_percentage" | "created_at", ExtArgs["result"]["system_health_metrics"]>

  export type $system_health_metricsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "system_health_metrics"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      metric_date: Date | null
      api_uptime_percentage: Prisma.Decimal | null
      avg_api_response_time_ms: number | null
      voice_api_success_rate: Prisma.Decimal | null
      database_connection_pool_usage: Prisma.Decimal | null
      error_rate_percentage: Prisma.Decimal | null
      created_at: Date | null
    }, ExtArgs["result"]["system_health_metrics"]>
    composites: {}
  }

  type system_health_metricsGetPayload<S extends boolean | null | undefined | system_health_metricsDefaultArgs> = $Result.GetResult<Prisma.$system_health_metricsPayload, S>

  type system_health_metricsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<system_health_metricsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: System_health_metricsCountAggregateInputType | true
    }

  export interface system_health_metricsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['system_health_metrics'], meta: { name: 'system_health_metrics' } }
    /**
     * Find zero or one System_health_metrics that matches the filter.
     * @param {system_health_metricsFindUniqueArgs} args - Arguments to find a System_health_metrics
     * @example
     * // Get one System_health_metrics
     * const system_health_metrics = await prisma.system_health_metrics.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends system_health_metricsFindUniqueArgs>(args: SelectSubset<T, system_health_metricsFindUniqueArgs<ExtArgs>>): Prisma__system_health_metricsClient<$Result.GetResult<Prisma.$system_health_metricsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one System_health_metrics that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {system_health_metricsFindUniqueOrThrowArgs} args - Arguments to find a System_health_metrics
     * @example
     * // Get one System_health_metrics
     * const system_health_metrics = await prisma.system_health_metrics.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends system_health_metricsFindUniqueOrThrowArgs>(args: SelectSubset<T, system_health_metricsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__system_health_metricsClient<$Result.GetResult<Prisma.$system_health_metricsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first System_health_metrics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {system_health_metricsFindFirstArgs} args - Arguments to find a System_health_metrics
     * @example
     * // Get one System_health_metrics
     * const system_health_metrics = await prisma.system_health_metrics.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends system_health_metricsFindFirstArgs>(args?: SelectSubset<T, system_health_metricsFindFirstArgs<ExtArgs>>): Prisma__system_health_metricsClient<$Result.GetResult<Prisma.$system_health_metricsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first System_health_metrics that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {system_health_metricsFindFirstOrThrowArgs} args - Arguments to find a System_health_metrics
     * @example
     * // Get one System_health_metrics
     * const system_health_metrics = await prisma.system_health_metrics.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends system_health_metricsFindFirstOrThrowArgs>(args?: SelectSubset<T, system_health_metricsFindFirstOrThrowArgs<ExtArgs>>): Prisma__system_health_metricsClient<$Result.GetResult<Prisma.$system_health_metricsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more System_health_metrics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {system_health_metricsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all System_health_metrics
     * const system_health_metrics = await prisma.system_health_metrics.findMany()
     * 
     * // Get first 10 System_health_metrics
     * const system_health_metrics = await prisma.system_health_metrics.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const system_health_metricsWithIdOnly = await prisma.system_health_metrics.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends system_health_metricsFindManyArgs>(args?: SelectSubset<T, system_health_metricsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$system_health_metricsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a System_health_metrics.
     * @param {system_health_metricsCreateArgs} args - Arguments to create a System_health_metrics.
     * @example
     * // Create one System_health_metrics
     * const System_health_metrics = await prisma.system_health_metrics.create({
     *   data: {
     *     // ... data to create a System_health_metrics
     *   }
     * })
     * 
     */
    create<T extends system_health_metricsCreateArgs>(args: SelectSubset<T, system_health_metricsCreateArgs<ExtArgs>>): Prisma__system_health_metricsClient<$Result.GetResult<Prisma.$system_health_metricsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many System_health_metrics.
     * @param {system_health_metricsCreateManyArgs} args - Arguments to create many System_health_metrics.
     * @example
     * // Create many System_health_metrics
     * const system_health_metrics = await prisma.system_health_metrics.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends system_health_metricsCreateManyArgs>(args?: SelectSubset<T, system_health_metricsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many System_health_metrics and returns the data saved in the database.
     * @param {system_health_metricsCreateManyAndReturnArgs} args - Arguments to create many System_health_metrics.
     * @example
     * // Create many System_health_metrics
     * const system_health_metrics = await prisma.system_health_metrics.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many System_health_metrics and only return the `id`
     * const system_health_metricsWithIdOnly = await prisma.system_health_metrics.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends system_health_metricsCreateManyAndReturnArgs>(args?: SelectSubset<T, system_health_metricsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$system_health_metricsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a System_health_metrics.
     * @param {system_health_metricsDeleteArgs} args - Arguments to delete one System_health_metrics.
     * @example
     * // Delete one System_health_metrics
     * const System_health_metrics = await prisma.system_health_metrics.delete({
     *   where: {
     *     // ... filter to delete one System_health_metrics
     *   }
     * })
     * 
     */
    delete<T extends system_health_metricsDeleteArgs>(args: SelectSubset<T, system_health_metricsDeleteArgs<ExtArgs>>): Prisma__system_health_metricsClient<$Result.GetResult<Prisma.$system_health_metricsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one System_health_metrics.
     * @param {system_health_metricsUpdateArgs} args - Arguments to update one System_health_metrics.
     * @example
     * // Update one System_health_metrics
     * const system_health_metrics = await prisma.system_health_metrics.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends system_health_metricsUpdateArgs>(args: SelectSubset<T, system_health_metricsUpdateArgs<ExtArgs>>): Prisma__system_health_metricsClient<$Result.GetResult<Prisma.$system_health_metricsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more System_health_metrics.
     * @param {system_health_metricsDeleteManyArgs} args - Arguments to filter System_health_metrics to delete.
     * @example
     * // Delete a few System_health_metrics
     * const { count } = await prisma.system_health_metrics.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends system_health_metricsDeleteManyArgs>(args?: SelectSubset<T, system_health_metricsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more System_health_metrics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {system_health_metricsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many System_health_metrics
     * const system_health_metrics = await prisma.system_health_metrics.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends system_health_metricsUpdateManyArgs>(args: SelectSubset<T, system_health_metricsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more System_health_metrics and returns the data updated in the database.
     * @param {system_health_metricsUpdateManyAndReturnArgs} args - Arguments to update many System_health_metrics.
     * @example
     * // Update many System_health_metrics
     * const system_health_metrics = await prisma.system_health_metrics.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more System_health_metrics and only return the `id`
     * const system_health_metricsWithIdOnly = await prisma.system_health_metrics.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends system_health_metricsUpdateManyAndReturnArgs>(args: SelectSubset<T, system_health_metricsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$system_health_metricsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one System_health_metrics.
     * @param {system_health_metricsUpsertArgs} args - Arguments to update or create a System_health_metrics.
     * @example
     * // Update or create a System_health_metrics
     * const system_health_metrics = await prisma.system_health_metrics.upsert({
     *   create: {
     *     // ... data to create a System_health_metrics
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the System_health_metrics we want to update
     *   }
     * })
     */
    upsert<T extends system_health_metricsUpsertArgs>(args: SelectSubset<T, system_health_metricsUpsertArgs<ExtArgs>>): Prisma__system_health_metricsClient<$Result.GetResult<Prisma.$system_health_metricsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of System_health_metrics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {system_health_metricsCountArgs} args - Arguments to filter System_health_metrics to count.
     * @example
     * // Count the number of System_health_metrics
     * const count = await prisma.system_health_metrics.count({
     *   where: {
     *     // ... the filter for the System_health_metrics we want to count
     *   }
     * })
    **/
    count<T extends system_health_metricsCountArgs>(
      args?: Subset<T, system_health_metricsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], System_health_metricsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a System_health_metrics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {System_health_metricsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends System_health_metricsAggregateArgs>(args: Subset<T, System_health_metricsAggregateArgs>): Prisma.PrismaPromise<GetSystem_health_metricsAggregateType<T>>

    /**
     * Group by System_health_metrics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {system_health_metricsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends system_health_metricsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: system_health_metricsGroupByArgs['orderBy'] }
        : { orderBy?: system_health_metricsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, system_health_metricsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSystem_health_metricsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the system_health_metrics model
   */
  readonly fields: system_health_metricsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for system_health_metrics.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__system_health_metricsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the system_health_metrics model
   */
  interface system_health_metricsFieldRefs {
    readonly id: FieldRef<"system_health_metrics", 'Int'>
    readonly metric_date: FieldRef<"system_health_metrics", 'DateTime'>
    readonly api_uptime_percentage: FieldRef<"system_health_metrics", 'Decimal'>
    readonly avg_api_response_time_ms: FieldRef<"system_health_metrics", 'Int'>
    readonly voice_api_success_rate: FieldRef<"system_health_metrics", 'Decimal'>
    readonly database_connection_pool_usage: FieldRef<"system_health_metrics", 'Decimal'>
    readonly error_rate_percentage: FieldRef<"system_health_metrics", 'Decimal'>
    readonly created_at: FieldRef<"system_health_metrics", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * system_health_metrics findUnique
   */
  export type system_health_metricsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the system_health_metrics
     */
    select?: system_health_metricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the system_health_metrics
     */
    omit?: system_health_metricsOmit<ExtArgs> | null
    /**
     * Filter, which system_health_metrics to fetch.
     */
    where: system_health_metricsWhereUniqueInput
  }

  /**
   * system_health_metrics findUniqueOrThrow
   */
  export type system_health_metricsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the system_health_metrics
     */
    select?: system_health_metricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the system_health_metrics
     */
    omit?: system_health_metricsOmit<ExtArgs> | null
    /**
     * Filter, which system_health_metrics to fetch.
     */
    where: system_health_metricsWhereUniqueInput
  }

  /**
   * system_health_metrics findFirst
   */
  export type system_health_metricsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the system_health_metrics
     */
    select?: system_health_metricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the system_health_metrics
     */
    omit?: system_health_metricsOmit<ExtArgs> | null
    /**
     * Filter, which system_health_metrics to fetch.
     */
    where?: system_health_metricsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of system_health_metrics to fetch.
     */
    orderBy?: system_health_metricsOrderByWithRelationInput | system_health_metricsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for system_health_metrics.
     */
    cursor?: system_health_metricsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` system_health_metrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` system_health_metrics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of system_health_metrics.
     */
    distinct?: System_health_metricsScalarFieldEnum | System_health_metricsScalarFieldEnum[]
  }

  /**
   * system_health_metrics findFirstOrThrow
   */
  export type system_health_metricsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the system_health_metrics
     */
    select?: system_health_metricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the system_health_metrics
     */
    omit?: system_health_metricsOmit<ExtArgs> | null
    /**
     * Filter, which system_health_metrics to fetch.
     */
    where?: system_health_metricsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of system_health_metrics to fetch.
     */
    orderBy?: system_health_metricsOrderByWithRelationInput | system_health_metricsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for system_health_metrics.
     */
    cursor?: system_health_metricsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` system_health_metrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` system_health_metrics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of system_health_metrics.
     */
    distinct?: System_health_metricsScalarFieldEnum | System_health_metricsScalarFieldEnum[]
  }

  /**
   * system_health_metrics findMany
   */
  export type system_health_metricsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the system_health_metrics
     */
    select?: system_health_metricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the system_health_metrics
     */
    omit?: system_health_metricsOmit<ExtArgs> | null
    /**
     * Filter, which system_health_metrics to fetch.
     */
    where?: system_health_metricsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of system_health_metrics to fetch.
     */
    orderBy?: system_health_metricsOrderByWithRelationInput | system_health_metricsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing system_health_metrics.
     */
    cursor?: system_health_metricsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` system_health_metrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` system_health_metrics.
     */
    skip?: number
    distinct?: System_health_metricsScalarFieldEnum | System_health_metricsScalarFieldEnum[]
  }

  /**
   * system_health_metrics create
   */
  export type system_health_metricsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the system_health_metrics
     */
    select?: system_health_metricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the system_health_metrics
     */
    omit?: system_health_metricsOmit<ExtArgs> | null
    /**
     * The data needed to create a system_health_metrics.
     */
    data?: XOR<system_health_metricsCreateInput, system_health_metricsUncheckedCreateInput>
  }

  /**
   * system_health_metrics createMany
   */
  export type system_health_metricsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many system_health_metrics.
     */
    data: system_health_metricsCreateManyInput | system_health_metricsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * system_health_metrics createManyAndReturn
   */
  export type system_health_metricsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the system_health_metrics
     */
    select?: system_health_metricsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the system_health_metrics
     */
    omit?: system_health_metricsOmit<ExtArgs> | null
    /**
     * The data used to create many system_health_metrics.
     */
    data: system_health_metricsCreateManyInput | system_health_metricsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * system_health_metrics update
   */
  export type system_health_metricsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the system_health_metrics
     */
    select?: system_health_metricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the system_health_metrics
     */
    omit?: system_health_metricsOmit<ExtArgs> | null
    /**
     * The data needed to update a system_health_metrics.
     */
    data: XOR<system_health_metricsUpdateInput, system_health_metricsUncheckedUpdateInput>
    /**
     * Choose, which system_health_metrics to update.
     */
    where: system_health_metricsWhereUniqueInput
  }

  /**
   * system_health_metrics updateMany
   */
  export type system_health_metricsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update system_health_metrics.
     */
    data: XOR<system_health_metricsUpdateManyMutationInput, system_health_metricsUncheckedUpdateManyInput>
    /**
     * Filter which system_health_metrics to update
     */
    where?: system_health_metricsWhereInput
    /**
     * Limit how many system_health_metrics to update.
     */
    limit?: number
  }

  /**
   * system_health_metrics updateManyAndReturn
   */
  export type system_health_metricsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the system_health_metrics
     */
    select?: system_health_metricsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the system_health_metrics
     */
    omit?: system_health_metricsOmit<ExtArgs> | null
    /**
     * The data used to update system_health_metrics.
     */
    data: XOR<system_health_metricsUpdateManyMutationInput, system_health_metricsUncheckedUpdateManyInput>
    /**
     * Filter which system_health_metrics to update
     */
    where?: system_health_metricsWhereInput
    /**
     * Limit how many system_health_metrics to update.
     */
    limit?: number
  }

  /**
   * system_health_metrics upsert
   */
  export type system_health_metricsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the system_health_metrics
     */
    select?: system_health_metricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the system_health_metrics
     */
    omit?: system_health_metricsOmit<ExtArgs> | null
    /**
     * The filter to search for the system_health_metrics to update in case it exists.
     */
    where: system_health_metricsWhereUniqueInput
    /**
     * In case the system_health_metrics found by the `where` argument doesn't exist, create a new system_health_metrics with this data.
     */
    create: XOR<system_health_metricsCreateInput, system_health_metricsUncheckedCreateInput>
    /**
     * In case the system_health_metrics was found with the provided `where` argument, update it with this data.
     */
    update: XOR<system_health_metricsUpdateInput, system_health_metricsUncheckedUpdateInput>
  }

  /**
   * system_health_metrics delete
   */
  export type system_health_metricsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the system_health_metrics
     */
    select?: system_health_metricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the system_health_metrics
     */
    omit?: system_health_metricsOmit<ExtArgs> | null
    /**
     * Filter which system_health_metrics to delete.
     */
    where: system_health_metricsWhereUniqueInput
  }

  /**
   * system_health_metrics deleteMany
   */
  export type system_health_metricsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which system_health_metrics to delete
     */
    where?: system_health_metricsWhereInput
    /**
     * Limit how many system_health_metrics to delete.
     */
    limit?: number
  }

  /**
   * system_health_metrics without action
   */
  export type system_health_metricsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the system_health_metrics
     */
    select?: system_health_metricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the system_health_metrics
     */
    omit?: system_health_metricsOmit<ExtArgs> | null
  }


  /**
   * Model user_interactions
   */

  export type AggregateUser_interactions = {
    _count: User_interactionsCountAggregateOutputType | null
    _avg: User_interactionsAvgAggregateOutputType | null
    _sum: User_interactionsSumAggregateOutputType | null
    _min: User_interactionsMinAggregateOutputType | null
    _max: User_interactionsMaxAggregateOutputType | null
  }

  export type User_interactionsAvgAggregateOutputType = {
    id: number | null
    agent_id: number | null
    user_satisfaction: Decimal | null
    context_relevance: Decimal | null
  }

  export type User_interactionsSumAggregateOutputType = {
    id: number | null
    agent_id: number | null
    user_satisfaction: Decimal | null
    context_relevance: Decimal | null
  }

  export type User_interactionsMinAggregateOutputType = {
    id: number | null
    user_email: string | null
    agent_id: number | null
    action: string | null
    user_satisfaction: Decimal | null
    context_relevance: Decimal | null
    created_at: Date | null
  }

  export type User_interactionsMaxAggregateOutputType = {
    id: number | null
    user_email: string | null
    agent_id: number | null
    action: string | null
    user_satisfaction: Decimal | null
    context_relevance: Decimal | null
    created_at: Date | null
  }

  export type User_interactionsCountAggregateOutputType = {
    id: number
    user_email: number
    agent_id: number
    action: number
    metadata: number
    context_at_interaction: number
    device_context: number
    environmental_context: number
    user_satisfaction: number
    context_relevance: number
    optimization_data: number
    created_at: number
    _all: number
  }


  export type User_interactionsAvgAggregateInputType = {
    id?: true
    agent_id?: true
    user_satisfaction?: true
    context_relevance?: true
  }

  export type User_interactionsSumAggregateInputType = {
    id?: true
    agent_id?: true
    user_satisfaction?: true
    context_relevance?: true
  }

  export type User_interactionsMinAggregateInputType = {
    id?: true
    user_email?: true
    agent_id?: true
    action?: true
    user_satisfaction?: true
    context_relevance?: true
    created_at?: true
  }

  export type User_interactionsMaxAggregateInputType = {
    id?: true
    user_email?: true
    agent_id?: true
    action?: true
    user_satisfaction?: true
    context_relevance?: true
    created_at?: true
  }

  export type User_interactionsCountAggregateInputType = {
    id?: true
    user_email?: true
    agent_id?: true
    action?: true
    metadata?: true
    context_at_interaction?: true
    device_context?: true
    environmental_context?: true
    user_satisfaction?: true
    context_relevance?: true
    optimization_data?: true
    created_at?: true
    _all?: true
  }

  export type User_interactionsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user_interactions to aggregate.
     */
    where?: user_interactionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_interactions to fetch.
     */
    orderBy?: user_interactionsOrderByWithRelationInput | user_interactionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: user_interactionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_interactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_interactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned user_interactions
    **/
    _count?: true | User_interactionsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: User_interactionsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: User_interactionsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: User_interactionsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: User_interactionsMaxAggregateInputType
  }

  export type GetUser_interactionsAggregateType<T extends User_interactionsAggregateArgs> = {
        [P in keyof T & keyof AggregateUser_interactions]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser_interactions[P]>
      : GetScalarType<T[P], AggregateUser_interactions[P]>
  }




  export type user_interactionsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: user_interactionsWhereInput
    orderBy?: user_interactionsOrderByWithAggregationInput | user_interactionsOrderByWithAggregationInput[]
    by: User_interactionsScalarFieldEnum[] | User_interactionsScalarFieldEnum
    having?: user_interactionsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: User_interactionsCountAggregateInputType | true
    _avg?: User_interactionsAvgAggregateInputType
    _sum?: User_interactionsSumAggregateInputType
    _min?: User_interactionsMinAggregateInputType
    _max?: User_interactionsMaxAggregateInputType
  }

  export type User_interactionsGroupByOutputType = {
    id: number
    user_email: string | null
    agent_id: number | null
    action: string | null
    metadata: JsonValue | null
    context_at_interaction: JsonValue | null
    device_context: JsonValue | null
    environmental_context: JsonValue | null
    user_satisfaction: Decimal | null
    context_relevance: Decimal | null
    optimization_data: JsonValue | null
    created_at: Date | null
    _count: User_interactionsCountAggregateOutputType | null
    _avg: User_interactionsAvgAggregateOutputType | null
    _sum: User_interactionsSumAggregateOutputType | null
    _min: User_interactionsMinAggregateOutputType | null
    _max: User_interactionsMaxAggregateOutputType | null
  }

  type GetUser_interactionsGroupByPayload<T extends user_interactionsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<User_interactionsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof User_interactionsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], User_interactionsGroupByOutputType[P]>
            : GetScalarType<T[P], User_interactionsGroupByOutputType[P]>
        }
      >
    >


  export type user_interactionsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_email?: boolean
    agent_id?: boolean
    action?: boolean
    metadata?: boolean
    context_at_interaction?: boolean
    device_context?: boolean
    environmental_context?: boolean
    user_satisfaction?: boolean
    context_relevance?: boolean
    optimization_data?: boolean
    created_at?: boolean
    agents?: boolean | user_interactions$agentsArgs<ExtArgs>
  }, ExtArgs["result"]["user_interactions"]>

  export type user_interactionsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_email?: boolean
    agent_id?: boolean
    action?: boolean
    metadata?: boolean
    context_at_interaction?: boolean
    device_context?: boolean
    environmental_context?: boolean
    user_satisfaction?: boolean
    context_relevance?: boolean
    optimization_data?: boolean
    created_at?: boolean
    agents?: boolean | user_interactions$agentsArgs<ExtArgs>
  }, ExtArgs["result"]["user_interactions"]>

  export type user_interactionsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_email?: boolean
    agent_id?: boolean
    action?: boolean
    metadata?: boolean
    context_at_interaction?: boolean
    device_context?: boolean
    environmental_context?: boolean
    user_satisfaction?: boolean
    context_relevance?: boolean
    optimization_data?: boolean
    created_at?: boolean
    agents?: boolean | user_interactions$agentsArgs<ExtArgs>
  }, ExtArgs["result"]["user_interactions"]>

  export type user_interactionsSelectScalar = {
    id?: boolean
    user_email?: boolean
    agent_id?: boolean
    action?: boolean
    metadata?: boolean
    context_at_interaction?: boolean
    device_context?: boolean
    environmental_context?: boolean
    user_satisfaction?: boolean
    context_relevance?: boolean
    optimization_data?: boolean
    created_at?: boolean
  }

  export type user_interactionsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_email" | "agent_id" | "action" | "metadata" | "context_at_interaction" | "device_context" | "environmental_context" | "user_satisfaction" | "context_relevance" | "optimization_data" | "created_at", ExtArgs["result"]["user_interactions"]>
  export type user_interactionsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agents?: boolean | user_interactions$agentsArgs<ExtArgs>
  }
  export type user_interactionsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agents?: boolean | user_interactions$agentsArgs<ExtArgs>
  }
  export type user_interactionsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agents?: boolean | user_interactions$agentsArgs<ExtArgs>
  }

  export type $user_interactionsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "user_interactions"
    objects: {
      agents: Prisma.$agentsPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      user_email: string | null
      agent_id: number | null
      action: string | null
      metadata: Prisma.JsonValue | null
      context_at_interaction: Prisma.JsonValue | null
      device_context: Prisma.JsonValue | null
      environmental_context: Prisma.JsonValue | null
      user_satisfaction: Prisma.Decimal | null
      context_relevance: Prisma.Decimal | null
      optimization_data: Prisma.JsonValue | null
      created_at: Date | null
    }, ExtArgs["result"]["user_interactions"]>
    composites: {}
  }

  type user_interactionsGetPayload<S extends boolean | null | undefined | user_interactionsDefaultArgs> = $Result.GetResult<Prisma.$user_interactionsPayload, S>

  type user_interactionsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<user_interactionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: User_interactionsCountAggregateInputType | true
    }

  export interface user_interactionsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['user_interactions'], meta: { name: 'user_interactions' } }
    /**
     * Find zero or one User_interactions that matches the filter.
     * @param {user_interactionsFindUniqueArgs} args - Arguments to find a User_interactions
     * @example
     * // Get one User_interactions
     * const user_interactions = await prisma.user_interactions.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends user_interactionsFindUniqueArgs>(args: SelectSubset<T, user_interactionsFindUniqueArgs<ExtArgs>>): Prisma__user_interactionsClient<$Result.GetResult<Prisma.$user_interactionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User_interactions that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {user_interactionsFindUniqueOrThrowArgs} args - Arguments to find a User_interactions
     * @example
     * // Get one User_interactions
     * const user_interactions = await prisma.user_interactions.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends user_interactionsFindUniqueOrThrowArgs>(args: SelectSubset<T, user_interactionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__user_interactionsClient<$Result.GetResult<Prisma.$user_interactionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User_interactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_interactionsFindFirstArgs} args - Arguments to find a User_interactions
     * @example
     * // Get one User_interactions
     * const user_interactions = await prisma.user_interactions.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends user_interactionsFindFirstArgs>(args?: SelectSubset<T, user_interactionsFindFirstArgs<ExtArgs>>): Prisma__user_interactionsClient<$Result.GetResult<Prisma.$user_interactionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User_interactions that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_interactionsFindFirstOrThrowArgs} args - Arguments to find a User_interactions
     * @example
     * // Get one User_interactions
     * const user_interactions = await prisma.user_interactions.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends user_interactionsFindFirstOrThrowArgs>(args?: SelectSubset<T, user_interactionsFindFirstOrThrowArgs<ExtArgs>>): Prisma__user_interactionsClient<$Result.GetResult<Prisma.$user_interactionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more User_interactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_interactionsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all User_interactions
     * const user_interactions = await prisma.user_interactions.findMany()
     * 
     * // Get first 10 User_interactions
     * const user_interactions = await prisma.user_interactions.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const user_interactionsWithIdOnly = await prisma.user_interactions.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends user_interactionsFindManyArgs>(args?: SelectSubset<T, user_interactionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_interactionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User_interactions.
     * @param {user_interactionsCreateArgs} args - Arguments to create a User_interactions.
     * @example
     * // Create one User_interactions
     * const User_interactions = await prisma.user_interactions.create({
     *   data: {
     *     // ... data to create a User_interactions
     *   }
     * })
     * 
     */
    create<T extends user_interactionsCreateArgs>(args: SelectSubset<T, user_interactionsCreateArgs<ExtArgs>>): Prisma__user_interactionsClient<$Result.GetResult<Prisma.$user_interactionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many User_interactions.
     * @param {user_interactionsCreateManyArgs} args - Arguments to create many User_interactions.
     * @example
     * // Create many User_interactions
     * const user_interactions = await prisma.user_interactions.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends user_interactionsCreateManyArgs>(args?: SelectSubset<T, user_interactionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many User_interactions and returns the data saved in the database.
     * @param {user_interactionsCreateManyAndReturnArgs} args - Arguments to create many User_interactions.
     * @example
     * // Create many User_interactions
     * const user_interactions = await prisma.user_interactions.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many User_interactions and only return the `id`
     * const user_interactionsWithIdOnly = await prisma.user_interactions.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends user_interactionsCreateManyAndReturnArgs>(args?: SelectSubset<T, user_interactionsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_interactionsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User_interactions.
     * @param {user_interactionsDeleteArgs} args - Arguments to delete one User_interactions.
     * @example
     * // Delete one User_interactions
     * const User_interactions = await prisma.user_interactions.delete({
     *   where: {
     *     // ... filter to delete one User_interactions
     *   }
     * })
     * 
     */
    delete<T extends user_interactionsDeleteArgs>(args: SelectSubset<T, user_interactionsDeleteArgs<ExtArgs>>): Prisma__user_interactionsClient<$Result.GetResult<Prisma.$user_interactionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User_interactions.
     * @param {user_interactionsUpdateArgs} args - Arguments to update one User_interactions.
     * @example
     * // Update one User_interactions
     * const user_interactions = await prisma.user_interactions.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends user_interactionsUpdateArgs>(args: SelectSubset<T, user_interactionsUpdateArgs<ExtArgs>>): Prisma__user_interactionsClient<$Result.GetResult<Prisma.$user_interactionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more User_interactions.
     * @param {user_interactionsDeleteManyArgs} args - Arguments to filter User_interactions to delete.
     * @example
     * // Delete a few User_interactions
     * const { count } = await prisma.user_interactions.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends user_interactionsDeleteManyArgs>(args?: SelectSubset<T, user_interactionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more User_interactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_interactionsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many User_interactions
     * const user_interactions = await prisma.user_interactions.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends user_interactionsUpdateManyArgs>(args: SelectSubset<T, user_interactionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more User_interactions and returns the data updated in the database.
     * @param {user_interactionsUpdateManyAndReturnArgs} args - Arguments to update many User_interactions.
     * @example
     * // Update many User_interactions
     * const user_interactions = await prisma.user_interactions.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more User_interactions and only return the `id`
     * const user_interactionsWithIdOnly = await prisma.user_interactions.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends user_interactionsUpdateManyAndReturnArgs>(args: SelectSubset<T, user_interactionsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_interactionsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User_interactions.
     * @param {user_interactionsUpsertArgs} args - Arguments to update or create a User_interactions.
     * @example
     * // Update or create a User_interactions
     * const user_interactions = await prisma.user_interactions.upsert({
     *   create: {
     *     // ... data to create a User_interactions
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User_interactions we want to update
     *   }
     * })
     */
    upsert<T extends user_interactionsUpsertArgs>(args: SelectSubset<T, user_interactionsUpsertArgs<ExtArgs>>): Prisma__user_interactionsClient<$Result.GetResult<Prisma.$user_interactionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of User_interactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_interactionsCountArgs} args - Arguments to filter User_interactions to count.
     * @example
     * // Count the number of User_interactions
     * const count = await prisma.user_interactions.count({
     *   where: {
     *     // ... the filter for the User_interactions we want to count
     *   }
     * })
    **/
    count<T extends user_interactionsCountArgs>(
      args?: Subset<T, user_interactionsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], User_interactionsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User_interactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {User_interactionsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends User_interactionsAggregateArgs>(args: Subset<T, User_interactionsAggregateArgs>): Prisma.PrismaPromise<GetUser_interactionsAggregateType<T>>

    /**
     * Group by User_interactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_interactionsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends user_interactionsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: user_interactionsGroupByArgs['orderBy'] }
        : { orderBy?: user_interactionsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, user_interactionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUser_interactionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the user_interactions model
   */
  readonly fields: user_interactionsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for user_interactions.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__user_interactionsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    agents<T extends user_interactions$agentsArgs<ExtArgs> = {}>(args?: Subset<T, user_interactions$agentsArgs<ExtArgs>>): Prisma__agentsClient<$Result.GetResult<Prisma.$agentsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the user_interactions model
   */
  interface user_interactionsFieldRefs {
    readonly id: FieldRef<"user_interactions", 'Int'>
    readonly user_email: FieldRef<"user_interactions", 'String'>
    readonly agent_id: FieldRef<"user_interactions", 'Int'>
    readonly action: FieldRef<"user_interactions", 'String'>
    readonly metadata: FieldRef<"user_interactions", 'Json'>
    readonly context_at_interaction: FieldRef<"user_interactions", 'Json'>
    readonly device_context: FieldRef<"user_interactions", 'Json'>
    readonly environmental_context: FieldRef<"user_interactions", 'Json'>
    readonly user_satisfaction: FieldRef<"user_interactions", 'Decimal'>
    readonly context_relevance: FieldRef<"user_interactions", 'Decimal'>
    readonly optimization_data: FieldRef<"user_interactions", 'Json'>
    readonly created_at: FieldRef<"user_interactions", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * user_interactions findUnique
   */
  export type user_interactionsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_interactions
     */
    select?: user_interactionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_interactions
     */
    omit?: user_interactionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_interactionsInclude<ExtArgs> | null
    /**
     * Filter, which user_interactions to fetch.
     */
    where: user_interactionsWhereUniqueInput
  }

  /**
   * user_interactions findUniqueOrThrow
   */
  export type user_interactionsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_interactions
     */
    select?: user_interactionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_interactions
     */
    omit?: user_interactionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_interactionsInclude<ExtArgs> | null
    /**
     * Filter, which user_interactions to fetch.
     */
    where: user_interactionsWhereUniqueInput
  }

  /**
   * user_interactions findFirst
   */
  export type user_interactionsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_interactions
     */
    select?: user_interactionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_interactions
     */
    omit?: user_interactionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_interactionsInclude<ExtArgs> | null
    /**
     * Filter, which user_interactions to fetch.
     */
    where?: user_interactionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_interactions to fetch.
     */
    orderBy?: user_interactionsOrderByWithRelationInput | user_interactionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for user_interactions.
     */
    cursor?: user_interactionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_interactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_interactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of user_interactions.
     */
    distinct?: User_interactionsScalarFieldEnum | User_interactionsScalarFieldEnum[]
  }

  /**
   * user_interactions findFirstOrThrow
   */
  export type user_interactionsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_interactions
     */
    select?: user_interactionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_interactions
     */
    omit?: user_interactionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_interactionsInclude<ExtArgs> | null
    /**
     * Filter, which user_interactions to fetch.
     */
    where?: user_interactionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_interactions to fetch.
     */
    orderBy?: user_interactionsOrderByWithRelationInput | user_interactionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for user_interactions.
     */
    cursor?: user_interactionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_interactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_interactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of user_interactions.
     */
    distinct?: User_interactionsScalarFieldEnum | User_interactionsScalarFieldEnum[]
  }

  /**
   * user_interactions findMany
   */
  export type user_interactionsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_interactions
     */
    select?: user_interactionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_interactions
     */
    omit?: user_interactionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_interactionsInclude<ExtArgs> | null
    /**
     * Filter, which user_interactions to fetch.
     */
    where?: user_interactionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_interactions to fetch.
     */
    orderBy?: user_interactionsOrderByWithRelationInput | user_interactionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing user_interactions.
     */
    cursor?: user_interactionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_interactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_interactions.
     */
    skip?: number
    distinct?: User_interactionsScalarFieldEnum | User_interactionsScalarFieldEnum[]
  }

  /**
   * user_interactions create
   */
  export type user_interactionsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_interactions
     */
    select?: user_interactionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_interactions
     */
    omit?: user_interactionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_interactionsInclude<ExtArgs> | null
    /**
     * The data needed to create a user_interactions.
     */
    data?: XOR<user_interactionsCreateInput, user_interactionsUncheckedCreateInput>
  }

  /**
   * user_interactions createMany
   */
  export type user_interactionsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many user_interactions.
     */
    data: user_interactionsCreateManyInput | user_interactionsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * user_interactions createManyAndReturn
   */
  export type user_interactionsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_interactions
     */
    select?: user_interactionsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the user_interactions
     */
    omit?: user_interactionsOmit<ExtArgs> | null
    /**
     * The data used to create many user_interactions.
     */
    data: user_interactionsCreateManyInput | user_interactionsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_interactionsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * user_interactions update
   */
  export type user_interactionsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_interactions
     */
    select?: user_interactionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_interactions
     */
    omit?: user_interactionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_interactionsInclude<ExtArgs> | null
    /**
     * The data needed to update a user_interactions.
     */
    data: XOR<user_interactionsUpdateInput, user_interactionsUncheckedUpdateInput>
    /**
     * Choose, which user_interactions to update.
     */
    where: user_interactionsWhereUniqueInput
  }

  /**
   * user_interactions updateMany
   */
  export type user_interactionsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update user_interactions.
     */
    data: XOR<user_interactionsUpdateManyMutationInput, user_interactionsUncheckedUpdateManyInput>
    /**
     * Filter which user_interactions to update
     */
    where?: user_interactionsWhereInput
    /**
     * Limit how many user_interactions to update.
     */
    limit?: number
  }

  /**
   * user_interactions updateManyAndReturn
   */
  export type user_interactionsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_interactions
     */
    select?: user_interactionsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the user_interactions
     */
    omit?: user_interactionsOmit<ExtArgs> | null
    /**
     * The data used to update user_interactions.
     */
    data: XOR<user_interactionsUpdateManyMutationInput, user_interactionsUncheckedUpdateManyInput>
    /**
     * Filter which user_interactions to update
     */
    where?: user_interactionsWhereInput
    /**
     * Limit how many user_interactions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_interactionsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * user_interactions upsert
   */
  export type user_interactionsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_interactions
     */
    select?: user_interactionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_interactions
     */
    omit?: user_interactionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_interactionsInclude<ExtArgs> | null
    /**
     * The filter to search for the user_interactions to update in case it exists.
     */
    where: user_interactionsWhereUniqueInput
    /**
     * In case the user_interactions found by the `where` argument doesn't exist, create a new user_interactions with this data.
     */
    create: XOR<user_interactionsCreateInput, user_interactionsUncheckedCreateInput>
    /**
     * In case the user_interactions was found with the provided `where` argument, update it with this data.
     */
    update: XOR<user_interactionsUpdateInput, user_interactionsUncheckedUpdateInput>
  }

  /**
   * user_interactions delete
   */
  export type user_interactionsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_interactions
     */
    select?: user_interactionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_interactions
     */
    omit?: user_interactionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_interactionsInclude<ExtArgs> | null
    /**
     * Filter which user_interactions to delete.
     */
    where: user_interactionsWhereUniqueInput
  }

  /**
   * user_interactions deleteMany
   */
  export type user_interactionsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user_interactions to delete
     */
    where?: user_interactionsWhereInput
    /**
     * Limit how many user_interactions to delete.
     */
    limit?: number
  }

  /**
   * user_interactions.agents
   */
  export type user_interactions$agentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agents
     */
    select?: agentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agents
     */
    omit?: agentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agentsInclude<ExtArgs> | null
    where?: agentsWhereInput
  }

  /**
   * user_interactions without action
   */
  export type user_interactionsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_interactions
     */
    select?: user_interactionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_interactions
     */
    omit?: user_interactionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_interactionsInclude<ExtArgs> | null
  }


  /**
   * Model voice_samples
   */

  export type AggregateVoice_samples = {
    _count: Voice_samplesCountAggregateOutputType | null
    _avg: Voice_samplesAvgAggregateOutputType | null
    _sum: Voice_samplesSumAggregateOutputType | null
    _min: Voice_samplesMinAggregateOutputType | null
    _max: Voice_samplesMaxAggregateOutputType | null
  }

  export type Voice_samplesAvgAggregateOutputType = {
    id: number | null
    agent_id: number | null
    duration_seconds: number | null
  }

  export type Voice_samplesSumAggregateOutputType = {
    id: number | null
    agent_id: number | null
    duration_seconds: number | null
  }

  export type Voice_samplesMinAggregateOutputType = {
    id: number | null
    agent_id: number | null
    sample_text: string | null
    elevenlabs_audio_url: string | null
    duration_seconds: number | null
    created_at: Date | null
  }

  export type Voice_samplesMaxAggregateOutputType = {
    id: number | null
    agent_id: number | null
    sample_text: string | null
    elevenlabs_audio_url: string | null
    duration_seconds: number | null
    created_at: Date | null
  }

  export type Voice_samplesCountAggregateOutputType = {
    id: number
    agent_id: number
    sample_text: number
    elevenlabs_audio_url: number
    duration_seconds: number
    environmental_variants: number
    noise_optimization: number
    device_optimization: number
    created_at: number
    _all: number
  }


  export type Voice_samplesAvgAggregateInputType = {
    id?: true
    agent_id?: true
    duration_seconds?: true
  }

  export type Voice_samplesSumAggregateInputType = {
    id?: true
    agent_id?: true
    duration_seconds?: true
  }

  export type Voice_samplesMinAggregateInputType = {
    id?: true
    agent_id?: true
    sample_text?: true
    elevenlabs_audio_url?: true
    duration_seconds?: true
    created_at?: true
  }

  export type Voice_samplesMaxAggregateInputType = {
    id?: true
    agent_id?: true
    sample_text?: true
    elevenlabs_audio_url?: true
    duration_seconds?: true
    created_at?: true
  }

  export type Voice_samplesCountAggregateInputType = {
    id?: true
    agent_id?: true
    sample_text?: true
    elevenlabs_audio_url?: true
    duration_seconds?: true
    environmental_variants?: true
    noise_optimization?: true
    device_optimization?: true
    created_at?: true
    _all?: true
  }

  export type Voice_samplesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which voice_samples to aggregate.
     */
    where?: voice_samplesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of voice_samples to fetch.
     */
    orderBy?: voice_samplesOrderByWithRelationInput | voice_samplesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: voice_samplesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` voice_samples from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` voice_samples.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned voice_samples
    **/
    _count?: true | Voice_samplesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Voice_samplesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Voice_samplesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Voice_samplesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Voice_samplesMaxAggregateInputType
  }

  export type GetVoice_samplesAggregateType<T extends Voice_samplesAggregateArgs> = {
        [P in keyof T & keyof AggregateVoice_samples]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVoice_samples[P]>
      : GetScalarType<T[P], AggregateVoice_samples[P]>
  }




  export type voice_samplesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: voice_samplesWhereInput
    orderBy?: voice_samplesOrderByWithAggregationInput | voice_samplesOrderByWithAggregationInput[]
    by: Voice_samplesScalarFieldEnum[] | Voice_samplesScalarFieldEnum
    having?: voice_samplesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Voice_samplesCountAggregateInputType | true
    _avg?: Voice_samplesAvgAggregateInputType
    _sum?: Voice_samplesSumAggregateInputType
    _min?: Voice_samplesMinAggregateInputType
    _max?: Voice_samplesMaxAggregateInputType
  }

  export type Voice_samplesGroupByOutputType = {
    id: number
    agent_id: number | null
    sample_text: string | null
    elevenlabs_audio_url: string | null
    duration_seconds: number | null
    environmental_variants: JsonValue | null
    noise_optimization: JsonValue | null
    device_optimization: JsonValue | null
    created_at: Date | null
    _count: Voice_samplesCountAggregateOutputType | null
    _avg: Voice_samplesAvgAggregateOutputType | null
    _sum: Voice_samplesSumAggregateOutputType | null
    _min: Voice_samplesMinAggregateOutputType | null
    _max: Voice_samplesMaxAggregateOutputType | null
  }

  type GetVoice_samplesGroupByPayload<T extends voice_samplesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Voice_samplesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Voice_samplesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Voice_samplesGroupByOutputType[P]>
            : GetScalarType<T[P], Voice_samplesGroupByOutputType[P]>
        }
      >
    >


  export type voice_samplesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agent_id?: boolean
    sample_text?: boolean
    elevenlabs_audio_url?: boolean
    duration_seconds?: boolean
    environmental_variants?: boolean
    noise_optimization?: boolean
    device_optimization?: boolean
    created_at?: boolean
    agents?: boolean | voice_samples$agentsArgs<ExtArgs>
  }, ExtArgs["result"]["voice_samples"]>

  export type voice_samplesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agent_id?: boolean
    sample_text?: boolean
    elevenlabs_audio_url?: boolean
    duration_seconds?: boolean
    environmental_variants?: boolean
    noise_optimization?: boolean
    device_optimization?: boolean
    created_at?: boolean
    agents?: boolean | voice_samples$agentsArgs<ExtArgs>
  }, ExtArgs["result"]["voice_samples"]>

  export type voice_samplesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agent_id?: boolean
    sample_text?: boolean
    elevenlabs_audio_url?: boolean
    duration_seconds?: boolean
    environmental_variants?: boolean
    noise_optimization?: boolean
    device_optimization?: boolean
    created_at?: boolean
    agents?: boolean | voice_samples$agentsArgs<ExtArgs>
  }, ExtArgs["result"]["voice_samples"]>

  export type voice_samplesSelectScalar = {
    id?: boolean
    agent_id?: boolean
    sample_text?: boolean
    elevenlabs_audio_url?: boolean
    duration_seconds?: boolean
    environmental_variants?: boolean
    noise_optimization?: boolean
    device_optimization?: boolean
    created_at?: boolean
  }

  export type voice_samplesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "agent_id" | "sample_text" | "elevenlabs_audio_url" | "duration_seconds" | "environmental_variants" | "noise_optimization" | "device_optimization" | "created_at", ExtArgs["result"]["voice_samples"]>
  export type voice_samplesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agents?: boolean | voice_samples$agentsArgs<ExtArgs>
  }
  export type voice_samplesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agents?: boolean | voice_samples$agentsArgs<ExtArgs>
  }
  export type voice_samplesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agents?: boolean | voice_samples$agentsArgs<ExtArgs>
  }

  export type $voice_samplesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "voice_samples"
    objects: {
      agents: Prisma.$agentsPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      agent_id: number | null
      sample_text: string | null
      elevenlabs_audio_url: string | null
      duration_seconds: number | null
      environmental_variants: Prisma.JsonValue | null
      noise_optimization: Prisma.JsonValue | null
      device_optimization: Prisma.JsonValue | null
      created_at: Date | null
    }, ExtArgs["result"]["voice_samples"]>
    composites: {}
  }

  type voice_samplesGetPayload<S extends boolean | null | undefined | voice_samplesDefaultArgs> = $Result.GetResult<Prisma.$voice_samplesPayload, S>

  type voice_samplesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<voice_samplesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Voice_samplesCountAggregateInputType | true
    }

  export interface voice_samplesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['voice_samples'], meta: { name: 'voice_samples' } }
    /**
     * Find zero or one Voice_samples that matches the filter.
     * @param {voice_samplesFindUniqueArgs} args - Arguments to find a Voice_samples
     * @example
     * // Get one Voice_samples
     * const voice_samples = await prisma.voice_samples.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends voice_samplesFindUniqueArgs>(args: SelectSubset<T, voice_samplesFindUniqueArgs<ExtArgs>>): Prisma__voice_samplesClient<$Result.GetResult<Prisma.$voice_samplesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Voice_samples that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {voice_samplesFindUniqueOrThrowArgs} args - Arguments to find a Voice_samples
     * @example
     * // Get one Voice_samples
     * const voice_samples = await prisma.voice_samples.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends voice_samplesFindUniqueOrThrowArgs>(args: SelectSubset<T, voice_samplesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__voice_samplesClient<$Result.GetResult<Prisma.$voice_samplesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Voice_samples that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {voice_samplesFindFirstArgs} args - Arguments to find a Voice_samples
     * @example
     * // Get one Voice_samples
     * const voice_samples = await prisma.voice_samples.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends voice_samplesFindFirstArgs>(args?: SelectSubset<T, voice_samplesFindFirstArgs<ExtArgs>>): Prisma__voice_samplesClient<$Result.GetResult<Prisma.$voice_samplesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Voice_samples that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {voice_samplesFindFirstOrThrowArgs} args - Arguments to find a Voice_samples
     * @example
     * // Get one Voice_samples
     * const voice_samples = await prisma.voice_samples.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends voice_samplesFindFirstOrThrowArgs>(args?: SelectSubset<T, voice_samplesFindFirstOrThrowArgs<ExtArgs>>): Prisma__voice_samplesClient<$Result.GetResult<Prisma.$voice_samplesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Voice_samples that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {voice_samplesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Voice_samples
     * const voice_samples = await prisma.voice_samples.findMany()
     * 
     * // Get first 10 Voice_samples
     * const voice_samples = await prisma.voice_samples.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const voice_samplesWithIdOnly = await prisma.voice_samples.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends voice_samplesFindManyArgs>(args?: SelectSubset<T, voice_samplesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$voice_samplesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Voice_samples.
     * @param {voice_samplesCreateArgs} args - Arguments to create a Voice_samples.
     * @example
     * // Create one Voice_samples
     * const Voice_samples = await prisma.voice_samples.create({
     *   data: {
     *     // ... data to create a Voice_samples
     *   }
     * })
     * 
     */
    create<T extends voice_samplesCreateArgs>(args: SelectSubset<T, voice_samplesCreateArgs<ExtArgs>>): Prisma__voice_samplesClient<$Result.GetResult<Prisma.$voice_samplesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Voice_samples.
     * @param {voice_samplesCreateManyArgs} args - Arguments to create many Voice_samples.
     * @example
     * // Create many Voice_samples
     * const voice_samples = await prisma.voice_samples.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends voice_samplesCreateManyArgs>(args?: SelectSubset<T, voice_samplesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Voice_samples and returns the data saved in the database.
     * @param {voice_samplesCreateManyAndReturnArgs} args - Arguments to create many Voice_samples.
     * @example
     * // Create many Voice_samples
     * const voice_samples = await prisma.voice_samples.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Voice_samples and only return the `id`
     * const voice_samplesWithIdOnly = await prisma.voice_samples.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends voice_samplesCreateManyAndReturnArgs>(args?: SelectSubset<T, voice_samplesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$voice_samplesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Voice_samples.
     * @param {voice_samplesDeleteArgs} args - Arguments to delete one Voice_samples.
     * @example
     * // Delete one Voice_samples
     * const Voice_samples = await prisma.voice_samples.delete({
     *   where: {
     *     // ... filter to delete one Voice_samples
     *   }
     * })
     * 
     */
    delete<T extends voice_samplesDeleteArgs>(args: SelectSubset<T, voice_samplesDeleteArgs<ExtArgs>>): Prisma__voice_samplesClient<$Result.GetResult<Prisma.$voice_samplesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Voice_samples.
     * @param {voice_samplesUpdateArgs} args - Arguments to update one Voice_samples.
     * @example
     * // Update one Voice_samples
     * const voice_samples = await prisma.voice_samples.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends voice_samplesUpdateArgs>(args: SelectSubset<T, voice_samplesUpdateArgs<ExtArgs>>): Prisma__voice_samplesClient<$Result.GetResult<Prisma.$voice_samplesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Voice_samples.
     * @param {voice_samplesDeleteManyArgs} args - Arguments to filter Voice_samples to delete.
     * @example
     * // Delete a few Voice_samples
     * const { count } = await prisma.voice_samples.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends voice_samplesDeleteManyArgs>(args?: SelectSubset<T, voice_samplesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Voice_samples.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {voice_samplesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Voice_samples
     * const voice_samples = await prisma.voice_samples.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends voice_samplesUpdateManyArgs>(args: SelectSubset<T, voice_samplesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Voice_samples and returns the data updated in the database.
     * @param {voice_samplesUpdateManyAndReturnArgs} args - Arguments to update many Voice_samples.
     * @example
     * // Update many Voice_samples
     * const voice_samples = await prisma.voice_samples.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Voice_samples and only return the `id`
     * const voice_samplesWithIdOnly = await prisma.voice_samples.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends voice_samplesUpdateManyAndReturnArgs>(args: SelectSubset<T, voice_samplesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$voice_samplesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Voice_samples.
     * @param {voice_samplesUpsertArgs} args - Arguments to update or create a Voice_samples.
     * @example
     * // Update or create a Voice_samples
     * const voice_samples = await prisma.voice_samples.upsert({
     *   create: {
     *     // ... data to create a Voice_samples
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Voice_samples we want to update
     *   }
     * })
     */
    upsert<T extends voice_samplesUpsertArgs>(args: SelectSubset<T, voice_samplesUpsertArgs<ExtArgs>>): Prisma__voice_samplesClient<$Result.GetResult<Prisma.$voice_samplesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Voice_samples.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {voice_samplesCountArgs} args - Arguments to filter Voice_samples to count.
     * @example
     * // Count the number of Voice_samples
     * const count = await prisma.voice_samples.count({
     *   where: {
     *     // ... the filter for the Voice_samples we want to count
     *   }
     * })
    **/
    count<T extends voice_samplesCountArgs>(
      args?: Subset<T, voice_samplesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Voice_samplesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Voice_samples.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Voice_samplesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Voice_samplesAggregateArgs>(args: Subset<T, Voice_samplesAggregateArgs>): Prisma.PrismaPromise<GetVoice_samplesAggregateType<T>>

    /**
     * Group by Voice_samples.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {voice_samplesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends voice_samplesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: voice_samplesGroupByArgs['orderBy'] }
        : { orderBy?: voice_samplesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, voice_samplesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVoice_samplesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the voice_samples model
   */
  readonly fields: voice_samplesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for voice_samples.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__voice_samplesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    agents<T extends voice_samples$agentsArgs<ExtArgs> = {}>(args?: Subset<T, voice_samples$agentsArgs<ExtArgs>>): Prisma__agentsClient<$Result.GetResult<Prisma.$agentsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the voice_samples model
   */
  interface voice_samplesFieldRefs {
    readonly id: FieldRef<"voice_samples", 'Int'>
    readonly agent_id: FieldRef<"voice_samples", 'Int'>
    readonly sample_text: FieldRef<"voice_samples", 'String'>
    readonly elevenlabs_audio_url: FieldRef<"voice_samples", 'String'>
    readonly duration_seconds: FieldRef<"voice_samples", 'Int'>
    readonly environmental_variants: FieldRef<"voice_samples", 'Json'>
    readonly noise_optimization: FieldRef<"voice_samples", 'Json'>
    readonly device_optimization: FieldRef<"voice_samples", 'Json'>
    readonly created_at: FieldRef<"voice_samples", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * voice_samples findUnique
   */
  export type voice_samplesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the voice_samples
     */
    select?: voice_samplesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the voice_samples
     */
    omit?: voice_samplesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: voice_samplesInclude<ExtArgs> | null
    /**
     * Filter, which voice_samples to fetch.
     */
    where: voice_samplesWhereUniqueInput
  }

  /**
   * voice_samples findUniqueOrThrow
   */
  export type voice_samplesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the voice_samples
     */
    select?: voice_samplesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the voice_samples
     */
    omit?: voice_samplesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: voice_samplesInclude<ExtArgs> | null
    /**
     * Filter, which voice_samples to fetch.
     */
    where: voice_samplesWhereUniqueInput
  }

  /**
   * voice_samples findFirst
   */
  export type voice_samplesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the voice_samples
     */
    select?: voice_samplesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the voice_samples
     */
    omit?: voice_samplesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: voice_samplesInclude<ExtArgs> | null
    /**
     * Filter, which voice_samples to fetch.
     */
    where?: voice_samplesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of voice_samples to fetch.
     */
    orderBy?: voice_samplesOrderByWithRelationInput | voice_samplesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for voice_samples.
     */
    cursor?: voice_samplesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` voice_samples from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` voice_samples.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of voice_samples.
     */
    distinct?: Voice_samplesScalarFieldEnum | Voice_samplesScalarFieldEnum[]
  }

  /**
   * voice_samples findFirstOrThrow
   */
  export type voice_samplesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the voice_samples
     */
    select?: voice_samplesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the voice_samples
     */
    omit?: voice_samplesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: voice_samplesInclude<ExtArgs> | null
    /**
     * Filter, which voice_samples to fetch.
     */
    where?: voice_samplesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of voice_samples to fetch.
     */
    orderBy?: voice_samplesOrderByWithRelationInput | voice_samplesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for voice_samples.
     */
    cursor?: voice_samplesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` voice_samples from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` voice_samples.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of voice_samples.
     */
    distinct?: Voice_samplesScalarFieldEnum | Voice_samplesScalarFieldEnum[]
  }

  /**
   * voice_samples findMany
   */
  export type voice_samplesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the voice_samples
     */
    select?: voice_samplesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the voice_samples
     */
    omit?: voice_samplesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: voice_samplesInclude<ExtArgs> | null
    /**
     * Filter, which voice_samples to fetch.
     */
    where?: voice_samplesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of voice_samples to fetch.
     */
    orderBy?: voice_samplesOrderByWithRelationInput | voice_samplesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing voice_samples.
     */
    cursor?: voice_samplesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` voice_samples from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` voice_samples.
     */
    skip?: number
    distinct?: Voice_samplesScalarFieldEnum | Voice_samplesScalarFieldEnum[]
  }

  /**
   * voice_samples create
   */
  export type voice_samplesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the voice_samples
     */
    select?: voice_samplesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the voice_samples
     */
    omit?: voice_samplesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: voice_samplesInclude<ExtArgs> | null
    /**
     * The data needed to create a voice_samples.
     */
    data?: XOR<voice_samplesCreateInput, voice_samplesUncheckedCreateInput>
  }

  /**
   * voice_samples createMany
   */
  export type voice_samplesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many voice_samples.
     */
    data: voice_samplesCreateManyInput | voice_samplesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * voice_samples createManyAndReturn
   */
  export type voice_samplesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the voice_samples
     */
    select?: voice_samplesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the voice_samples
     */
    omit?: voice_samplesOmit<ExtArgs> | null
    /**
     * The data used to create many voice_samples.
     */
    data: voice_samplesCreateManyInput | voice_samplesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: voice_samplesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * voice_samples update
   */
  export type voice_samplesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the voice_samples
     */
    select?: voice_samplesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the voice_samples
     */
    omit?: voice_samplesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: voice_samplesInclude<ExtArgs> | null
    /**
     * The data needed to update a voice_samples.
     */
    data: XOR<voice_samplesUpdateInput, voice_samplesUncheckedUpdateInput>
    /**
     * Choose, which voice_samples to update.
     */
    where: voice_samplesWhereUniqueInput
  }

  /**
   * voice_samples updateMany
   */
  export type voice_samplesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update voice_samples.
     */
    data: XOR<voice_samplesUpdateManyMutationInput, voice_samplesUncheckedUpdateManyInput>
    /**
     * Filter which voice_samples to update
     */
    where?: voice_samplesWhereInput
    /**
     * Limit how many voice_samples to update.
     */
    limit?: number
  }

  /**
   * voice_samples updateManyAndReturn
   */
  export type voice_samplesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the voice_samples
     */
    select?: voice_samplesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the voice_samples
     */
    omit?: voice_samplesOmit<ExtArgs> | null
    /**
     * The data used to update voice_samples.
     */
    data: XOR<voice_samplesUpdateManyMutationInput, voice_samplesUncheckedUpdateManyInput>
    /**
     * Filter which voice_samples to update
     */
    where?: voice_samplesWhereInput
    /**
     * Limit how many voice_samples to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: voice_samplesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * voice_samples upsert
   */
  export type voice_samplesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the voice_samples
     */
    select?: voice_samplesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the voice_samples
     */
    omit?: voice_samplesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: voice_samplesInclude<ExtArgs> | null
    /**
     * The filter to search for the voice_samples to update in case it exists.
     */
    where: voice_samplesWhereUniqueInput
    /**
     * In case the voice_samples found by the `where` argument doesn't exist, create a new voice_samples with this data.
     */
    create: XOR<voice_samplesCreateInput, voice_samplesUncheckedCreateInput>
    /**
     * In case the voice_samples was found with the provided `where` argument, update it with this data.
     */
    update: XOR<voice_samplesUpdateInput, voice_samplesUncheckedUpdateInput>
  }

  /**
   * voice_samples delete
   */
  export type voice_samplesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the voice_samples
     */
    select?: voice_samplesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the voice_samples
     */
    omit?: voice_samplesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: voice_samplesInclude<ExtArgs> | null
    /**
     * Filter which voice_samples to delete.
     */
    where: voice_samplesWhereUniqueInput
  }

  /**
   * voice_samples deleteMany
   */
  export type voice_samplesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which voice_samples to delete
     */
    where?: voice_samplesWhereInput
    /**
     * Limit how many voice_samples to delete.
     */
    limit?: number
  }

  /**
   * voice_samples.agents
   */
  export type voice_samples$agentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agents
     */
    select?: agentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agents
     */
    omit?: agentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agentsInclude<ExtArgs> | null
    where?: agentsWhereInput
  }

  /**
   * voice_samples without action
   */
  export type voice_samplesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the voice_samples
     */
    select?: voice_samplesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the voice_samples
     */
    omit?: voice_samplesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: voice_samplesInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const Agent_feedbackScalarFieldEnum: {
    id: 'id',
    agent_id: 'agent_id',
    rating: 'rating',
    feedback_text: 'feedback_text',
    language_used: 'language_used',
    user_session_id: 'user_session_id',
    created_at: 'created_at'
  };

  export type Agent_feedbackScalarFieldEnum = (typeof Agent_feedbackScalarFieldEnum)[keyof typeof Agent_feedbackScalarFieldEnum]


  export const Agent_languagesScalarFieldEnum: {
    id: 'id',
    agent_id: 'agent_id',
    language_code: 'language_code',
    personality_translation: 'personality_translation',
    voice_id: 'voice_id',
    voice_settings: 'voice_settings',
    is_primary: 'is_primary',
    created_at: 'created_at'
  };

  export type Agent_languagesScalarFieldEnum = (typeof Agent_languagesScalarFieldEnum)[keyof typeof Agent_languagesScalarFieldEnum]


  export const Agent_performance_metricsScalarFieldEnum: {
    id: 'id',
    agent_id: 'agent_id',
    metric_date: 'metric_date',
    total_interactions: 'total_interactions',
    successful_interactions: 'successful_interactions',
    avg_response_time_ms: 'avg_response_time_ms',
    voice_generation_count: 'voice_generation_count',
    error_count: 'error_count',
    language_breakdown: 'language_breakdown',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type Agent_performance_metricsScalarFieldEnum = (typeof Agent_performance_metricsScalarFieldEnum)[keyof typeof Agent_performance_metricsScalarFieldEnum]


  export const Agent_usage_eventsScalarFieldEnum: {
    id: 'id',
    agent_id: 'agent_id',
    event_type: 'event_type',
    event_data: 'event_data',
    user_session_id: 'user_session_id',
    ip_address: 'ip_address',
    user_agent: 'user_agent',
    language_used: 'language_used',
    created_at: 'created_at'
  };

  export type Agent_usage_eventsScalarFieldEnum = (typeof Agent_usage_eventsScalarFieldEnum)[keyof typeof Agent_usage_eventsScalarFieldEnum]


  export const AgentsScalarFieldEnum: {
    id: 'id',
    name: 'name',
    company: 'company',
    category: 'category',
    description: 'description',
    personality: 'personality',
    pricing_half_day: 'pricing_half_day',
    pricing_full_day: 'pricing_full_day',
    pricing_per_minute: 'pricing_per_minute',
    elevenlabs_voice_id: 'elevenlabs_voice_id',
    voice_sample_url: 'voice_sample_url',
    voice_characteristics: 'voice_characteristics',
    context7_profile: 'context7_profile',
    environmental_suitability: 'environmental_suitability',
    performance_by_context: 'performance_by_context',
    gemini_personality_prompt: 'gemini_personality_prompt',
    ai_optimization_score: 'ai_optimization_score',
    success_rate: 'success_rate',
    avg_call_time: 'avg_call_time',
    rating: 'rating',
    reviews: 'reviews',
    integrations: 'integrations',
    industries: 'industries',
    stages: 'stages',
    demo_available: 'demo_available',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type AgentsScalarFieldEnum = (typeof AgentsScalarFieldEnum)[keyof typeof AgentsScalarFieldEnum]


  export const Agents_customScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    name: 'name',
    template_id: 'template_id',
    personality: 'personality',
    voice_id: 'voice_id',
    voice_settings: 'voice_settings',
    environment_setting: 'environment_setting',
    integrations: 'integrations',
    pricing: 'pricing',
    status: 'status',
    demo_available: 'demo_available',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type Agents_customScalarFieldEnum = (typeof Agents_customScalarFieldEnum)[keyof typeof Agents_customScalarFieldEnum]


  export const Contractor_contextScalarFieldEnum: {
    id: 'id',
    user_email: 'user_email',
    user_name: 'user_name',
    expertise_level: 'expertise_level',
    primary_trade: 'primary_trade',
    company_size: 'company_size',
    years_experience: 'years_experience',
    specializations: 'specializations',
    typical_job_sites: 'typical_job_sites',
    noise_tolerance: 'noise_tolerance',
    safety_requirements: 'safety_requirements',
    geographic_region: 'geographic_region',
    climate_considerations: 'climate_considerations',
    preferred_call_times: 'preferred_call_times',
    timezone: 'timezone',
    project_phases: 'project_phases',
    seasonal_patterns: 'seasonal_patterns',
    urgency_patterns: 'urgency_patterns',
    primary_device: 'primary_device',
    network_quality: 'network_quality',
    preferred_integrations: 'preferred_integrations',
    technical_comfort_level: 'technical_comfort_level',
    voice_quality_requirements: 'voice_quality_requirements',
    budget_range: 'budget_range',
    roi_requirements: 'roi_requirements',
    rental_frequency: 'rental_frequency',
    payment_preferences: 'payment_preferences',
    cost_sensitivity: 'cost_sensitivity',
    communication_style: 'communication_style',
    team_structure: 'team_structure',
    client_interaction_style: 'client_interaction_style',
    decision_making_style: 'decision_making_style',
    cultural_considerations: 'cultural_considerations',
    success_metrics: 'success_metrics',
    preferred_agent_types: 'preferred_agent_types',
    optimization_preferences: 'optimization_preferences',
    learning_preferences: 'learning_preferences',
    feedback_patterns: 'feedback_patterns',
    context_confidence_score: 'context_confidence_score',
    last_context_update: 'last_context_update',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type Contractor_contextScalarFieldEnum = (typeof Contractor_contextScalarFieldEnum)[keyof typeof Contractor_contextScalarFieldEnum]


  export const RentalsScalarFieldEnum: {
    id: 'id',
    agent_id: 'agent_id',
    user_email: 'user_email',
    user_name: 'user_name',
    rental_type: 'rental_type',
    start_date: 'start_date',
    end_date: 'end_date',
    duration_hours: 'duration_hours',
    base_price: 'base_price',
    context_adjustment: 'context_adjustment',
    discount_percent: 'discount_percent',
    total_price: 'total_price',
    retell_phone_number: 'retell_phone_number',
    elevenlabs_voice_config: 'elevenlabs_voice_config',
    gemini_customizations: 'gemini_customizations',
    context_snapshot: 'context_snapshot',
    environmental_conditions: 'environmental_conditions',
    performance_metrics: 'performance_metrics',
    stripe_payment_intent_id: 'stripe_payment_intent_id',
    status: 'status',
    satisfaction_score: 'satisfaction_score',
    context_match_accuracy: 'context_match_accuracy',
    optimization_suggestions: 'optimization_suggestions',
    created_at: 'created_at',
    completed_at: 'completed_at'
  };

  export type RentalsScalarFieldEnum = (typeof RentalsScalarFieldEnum)[keyof typeof RentalsScalarFieldEnum]


  export const SubscriptionsScalarFieldEnum: {
    id: 'id',
    user_email: 'user_email',
    plan_name: 'plan_name',
    billing_period: 'billing_period',
    monthly_price: 'monthly_price',
    annual_price: 'annual_price',
    discount_percent: 'discount_percent',
    context_based_discounts: 'context_based_discounts',
    agent_limit: 'agent_limit',
    features: 'features',
    recommended_based_on_context: 'recommended_based_on_context',
    context_match_score: 'context_match_score',
    stripe_subscription_id: 'stripe_subscription_id',
    status: 'status',
    created_at: 'created_at',
    expires_at: 'expires_at',
    next_billing_date: 'next_billing_date'
  };

  export type SubscriptionsScalarFieldEnum = (typeof SubscriptionsScalarFieldEnum)[keyof typeof SubscriptionsScalarFieldEnum]


  export const System_health_metricsScalarFieldEnum: {
    id: 'id',
    metric_date: 'metric_date',
    api_uptime_percentage: 'api_uptime_percentage',
    avg_api_response_time_ms: 'avg_api_response_time_ms',
    voice_api_success_rate: 'voice_api_success_rate',
    database_connection_pool_usage: 'database_connection_pool_usage',
    error_rate_percentage: 'error_rate_percentage',
    created_at: 'created_at'
  };

  export type System_health_metricsScalarFieldEnum = (typeof System_health_metricsScalarFieldEnum)[keyof typeof System_health_metricsScalarFieldEnum]


  export const User_interactionsScalarFieldEnum: {
    id: 'id',
    user_email: 'user_email',
    agent_id: 'agent_id',
    action: 'action',
    metadata: 'metadata',
    context_at_interaction: 'context_at_interaction',
    device_context: 'device_context',
    environmental_context: 'environmental_context',
    user_satisfaction: 'user_satisfaction',
    context_relevance: 'context_relevance',
    optimization_data: 'optimization_data',
    created_at: 'created_at'
  };

  export type User_interactionsScalarFieldEnum = (typeof User_interactionsScalarFieldEnum)[keyof typeof User_interactionsScalarFieldEnum]


  export const Voice_samplesScalarFieldEnum: {
    id: 'id',
    agent_id: 'agent_id',
    sample_text: 'sample_text',
    elevenlabs_audio_url: 'elevenlabs_audio_url',
    duration_seconds: 'duration_seconds',
    environmental_variants: 'environmental_variants',
    noise_optimization: 'noise_optimization',
    device_optimization: 'device_optimization',
    created_at: 'created_at'
  };

  export type Voice_samplesScalarFieldEnum = (typeof Voice_samplesScalarFieldEnum)[keyof typeof Voice_samplesScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type agent_feedbackWhereInput = {
    AND?: agent_feedbackWhereInput | agent_feedbackWhereInput[]
    OR?: agent_feedbackWhereInput[]
    NOT?: agent_feedbackWhereInput | agent_feedbackWhereInput[]
    id?: IntFilter<"agent_feedback"> | number
    agent_id?: IntNullableFilter<"agent_feedback"> | number | null
    rating?: IntNullableFilter<"agent_feedback"> | number | null
    feedback_text?: StringNullableFilter<"agent_feedback"> | string | null
    language_used?: StringNullableFilter<"agent_feedback"> | string | null
    user_session_id?: StringNullableFilter<"agent_feedback"> | string | null
    created_at?: DateTimeNullableFilter<"agent_feedback"> | Date | string | null
    agents_custom?: XOR<Agents_customNullableScalarRelationFilter, agents_customWhereInput> | null
  }

  export type agent_feedbackOrderByWithRelationInput = {
    id?: SortOrder
    agent_id?: SortOrderInput | SortOrder
    rating?: SortOrderInput | SortOrder
    feedback_text?: SortOrderInput | SortOrder
    language_used?: SortOrderInput | SortOrder
    user_session_id?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    agents_custom?: agents_customOrderByWithRelationInput
  }

  export type agent_feedbackWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: agent_feedbackWhereInput | agent_feedbackWhereInput[]
    OR?: agent_feedbackWhereInput[]
    NOT?: agent_feedbackWhereInput | agent_feedbackWhereInput[]
    agent_id?: IntNullableFilter<"agent_feedback"> | number | null
    rating?: IntNullableFilter<"agent_feedback"> | number | null
    feedback_text?: StringNullableFilter<"agent_feedback"> | string | null
    language_used?: StringNullableFilter<"agent_feedback"> | string | null
    user_session_id?: StringNullableFilter<"agent_feedback"> | string | null
    created_at?: DateTimeNullableFilter<"agent_feedback"> | Date | string | null
    agents_custom?: XOR<Agents_customNullableScalarRelationFilter, agents_customWhereInput> | null
  }, "id">

  export type agent_feedbackOrderByWithAggregationInput = {
    id?: SortOrder
    agent_id?: SortOrderInput | SortOrder
    rating?: SortOrderInput | SortOrder
    feedback_text?: SortOrderInput | SortOrder
    language_used?: SortOrderInput | SortOrder
    user_session_id?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: agent_feedbackCountOrderByAggregateInput
    _avg?: agent_feedbackAvgOrderByAggregateInput
    _max?: agent_feedbackMaxOrderByAggregateInput
    _min?: agent_feedbackMinOrderByAggregateInput
    _sum?: agent_feedbackSumOrderByAggregateInput
  }

  export type agent_feedbackScalarWhereWithAggregatesInput = {
    AND?: agent_feedbackScalarWhereWithAggregatesInput | agent_feedbackScalarWhereWithAggregatesInput[]
    OR?: agent_feedbackScalarWhereWithAggregatesInput[]
    NOT?: agent_feedbackScalarWhereWithAggregatesInput | agent_feedbackScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"agent_feedback"> | number
    agent_id?: IntNullableWithAggregatesFilter<"agent_feedback"> | number | null
    rating?: IntNullableWithAggregatesFilter<"agent_feedback"> | number | null
    feedback_text?: StringNullableWithAggregatesFilter<"agent_feedback"> | string | null
    language_used?: StringNullableWithAggregatesFilter<"agent_feedback"> | string | null
    user_session_id?: StringNullableWithAggregatesFilter<"agent_feedback"> | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"agent_feedback"> | Date | string | null
  }

  export type agent_languagesWhereInput = {
    AND?: agent_languagesWhereInput | agent_languagesWhereInput[]
    OR?: agent_languagesWhereInput[]
    NOT?: agent_languagesWhereInput | agent_languagesWhereInput[]
    id?: IntFilter<"agent_languages"> | number
    agent_id?: IntNullableFilter<"agent_languages"> | number | null
    language_code?: StringFilter<"agent_languages"> | string
    personality_translation?: StringNullableFilter<"agent_languages"> | string | null
    voice_id?: StringNullableFilter<"agent_languages"> | string | null
    voice_settings?: JsonNullableFilter<"agent_languages">
    is_primary?: BoolNullableFilter<"agent_languages"> | boolean | null
    created_at?: DateTimeNullableFilter<"agent_languages"> | Date | string | null
    agents_custom?: XOR<Agents_customNullableScalarRelationFilter, agents_customWhereInput> | null
  }

  export type agent_languagesOrderByWithRelationInput = {
    id?: SortOrder
    agent_id?: SortOrderInput | SortOrder
    language_code?: SortOrder
    personality_translation?: SortOrderInput | SortOrder
    voice_id?: SortOrderInput | SortOrder
    voice_settings?: SortOrderInput | SortOrder
    is_primary?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    agents_custom?: agents_customOrderByWithRelationInput
  }

  export type agent_languagesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: agent_languagesWhereInput | agent_languagesWhereInput[]
    OR?: agent_languagesWhereInput[]
    NOT?: agent_languagesWhereInput | agent_languagesWhereInput[]
    agent_id?: IntNullableFilter<"agent_languages"> | number | null
    language_code?: StringFilter<"agent_languages"> | string
    personality_translation?: StringNullableFilter<"agent_languages"> | string | null
    voice_id?: StringNullableFilter<"agent_languages"> | string | null
    voice_settings?: JsonNullableFilter<"agent_languages">
    is_primary?: BoolNullableFilter<"agent_languages"> | boolean | null
    created_at?: DateTimeNullableFilter<"agent_languages"> | Date | string | null
    agents_custom?: XOR<Agents_customNullableScalarRelationFilter, agents_customWhereInput> | null
  }, "id">

  export type agent_languagesOrderByWithAggregationInput = {
    id?: SortOrder
    agent_id?: SortOrderInput | SortOrder
    language_code?: SortOrder
    personality_translation?: SortOrderInput | SortOrder
    voice_id?: SortOrderInput | SortOrder
    voice_settings?: SortOrderInput | SortOrder
    is_primary?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: agent_languagesCountOrderByAggregateInput
    _avg?: agent_languagesAvgOrderByAggregateInput
    _max?: agent_languagesMaxOrderByAggregateInput
    _min?: agent_languagesMinOrderByAggregateInput
    _sum?: agent_languagesSumOrderByAggregateInput
  }

  export type agent_languagesScalarWhereWithAggregatesInput = {
    AND?: agent_languagesScalarWhereWithAggregatesInput | agent_languagesScalarWhereWithAggregatesInput[]
    OR?: agent_languagesScalarWhereWithAggregatesInput[]
    NOT?: agent_languagesScalarWhereWithAggregatesInput | agent_languagesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"agent_languages"> | number
    agent_id?: IntNullableWithAggregatesFilter<"agent_languages"> | number | null
    language_code?: StringWithAggregatesFilter<"agent_languages"> | string
    personality_translation?: StringNullableWithAggregatesFilter<"agent_languages"> | string | null
    voice_id?: StringNullableWithAggregatesFilter<"agent_languages"> | string | null
    voice_settings?: JsonNullableWithAggregatesFilter<"agent_languages">
    is_primary?: BoolNullableWithAggregatesFilter<"agent_languages"> | boolean | null
    created_at?: DateTimeNullableWithAggregatesFilter<"agent_languages"> | Date | string | null
  }

  export type agent_performance_metricsWhereInput = {
    AND?: agent_performance_metricsWhereInput | agent_performance_metricsWhereInput[]
    OR?: agent_performance_metricsWhereInput[]
    NOT?: agent_performance_metricsWhereInput | agent_performance_metricsWhereInput[]
    id?: IntFilter<"agent_performance_metrics"> | number
    agent_id?: IntNullableFilter<"agent_performance_metrics"> | number | null
    metric_date?: DateTimeNullableFilter<"agent_performance_metrics"> | Date | string | null
    total_interactions?: IntNullableFilter<"agent_performance_metrics"> | number | null
    successful_interactions?: IntNullableFilter<"agent_performance_metrics"> | number | null
    avg_response_time_ms?: IntNullableFilter<"agent_performance_metrics"> | number | null
    voice_generation_count?: IntNullableFilter<"agent_performance_metrics"> | number | null
    error_count?: IntNullableFilter<"agent_performance_metrics"> | number | null
    language_breakdown?: JsonNullableFilter<"agent_performance_metrics">
    created_at?: DateTimeNullableFilter<"agent_performance_metrics"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"agent_performance_metrics"> | Date | string | null
    agents_custom?: XOR<Agents_customNullableScalarRelationFilter, agents_customWhereInput> | null
  }

  export type agent_performance_metricsOrderByWithRelationInput = {
    id?: SortOrder
    agent_id?: SortOrderInput | SortOrder
    metric_date?: SortOrderInput | SortOrder
    total_interactions?: SortOrderInput | SortOrder
    successful_interactions?: SortOrderInput | SortOrder
    avg_response_time_ms?: SortOrderInput | SortOrder
    voice_generation_count?: SortOrderInput | SortOrder
    error_count?: SortOrderInput | SortOrder
    language_breakdown?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    agents_custom?: agents_customOrderByWithRelationInput
  }

  export type agent_performance_metricsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    agent_id_metric_date?: agent_performance_metricsAgent_idMetric_dateCompoundUniqueInput
    AND?: agent_performance_metricsWhereInput | agent_performance_metricsWhereInput[]
    OR?: agent_performance_metricsWhereInput[]
    NOT?: agent_performance_metricsWhereInput | agent_performance_metricsWhereInput[]
    agent_id?: IntNullableFilter<"agent_performance_metrics"> | number | null
    metric_date?: DateTimeNullableFilter<"agent_performance_metrics"> | Date | string | null
    total_interactions?: IntNullableFilter<"agent_performance_metrics"> | number | null
    successful_interactions?: IntNullableFilter<"agent_performance_metrics"> | number | null
    avg_response_time_ms?: IntNullableFilter<"agent_performance_metrics"> | number | null
    voice_generation_count?: IntNullableFilter<"agent_performance_metrics"> | number | null
    error_count?: IntNullableFilter<"agent_performance_metrics"> | number | null
    language_breakdown?: JsonNullableFilter<"agent_performance_metrics">
    created_at?: DateTimeNullableFilter<"agent_performance_metrics"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"agent_performance_metrics"> | Date | string | null
    agents_custom?: XOR<Agents_customNullableScalarRelationFilter, agents_customWhereInput> | null
  }, "id" | "agent_id_metric_date">

  export type agent_performance_metricsOrderByWithAggregationInput = {
    id?: SortOrder
    agent_id?: SortOrderInput | SortOrder
    metric_date?: SortOrderInput | SortOrder
    total_interactions?: SortOrderInput | SortOrder
    successful_interactions?: SortOrderInput | SortOrder
    avg_response_time_ms?: SortOrderInput | SortOrder
    voice_generation_count?: SortOrderInput | SortOrder
    error_count?: SortOrderInput | SortOrder
    language_breakdown?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    _count?: agent_performance_metricsCountOrderByAggregateInput
    _avg?: agent_performance_metricsAvgOrderByAggregateInput
    _max?: agent_performance_metricsMaxOrderByAggregateInput
    _min?: agent_performance_metricsMinOrderByAggregateInput
    _sum?: agent_performance_metricsSumOrderByAggregateInput
  }

  export type agent_performance_metricsScalarWhereWithAggregatesInput = {
    AND?: agent_performance_metricsScalarWhereWithAggregatesInput | agent_performance_metricsScalarWhereWithAggregatesInput[]
    OR?: agent_performance_metricsScalarWhereWithAggregatesInput[]
    NOT?: agent_performance_metricsScalarWhereWithAggregatesInput | agent_performance_metricsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"agent_performance_metrics"> | number
    agent_id?: IntNullableWithAggregatesFilter<"agent_performance_metrics"> | number | null
    metric_date?: DateTimeNullableWithAggregatesFilter<"agent_performance_metrics"> | Date | string | null
    total_interactions?: IntNullableWithAggregatesFilter<"agent_performance_metrics"> | number | null
    successful_interactions?: IntNullableWithAggregatesFilter<"agent_performance_metrics"> | number | null
    avg_response_time_ms?: IntNullableWithAggregatesFilter<"agent_performance_metrics"> | number | null
    voice_generation_count?: IntNullableWithAggregatesFilter<"agent_performance_metrics"> | number | null
    error_count?: IntNullableWithAggregatesFilter<"agent_performance_metrics"> | number | null
    language_breakdown?: JsonNullableWithAggregatesFilter<"agent_performance_metrics">
    created_at?: DateTimeNullableWithAggregatesFilter<"agent_performance_metrics"> | Date | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"agent_performance_metrics"> | Date | string | null
  }

  export type agent_usage_eventsWhereInput = {
    AND?: agent_usage_eventsWhereInput | agent_usage_eventsWhereInput[]
    OR?: agent_usage_eventsWhereInput[]
    NOT?: agent_usage_eventsWhereInput | agent_usage_eventsWhereInput[]
    id?: IntFilter<"agent_usage_events"> | number
    agent_id?: IntNullableFilter<"agent_usage_events"> | number | null
    event_type?: StringFilter<"agent_usage_events"> | string
    event_data?: JsonNullableFilter<"agent_usage_events">
    user_session_id?: StringNullableFilter<"agent_usage_events"> | string | null
    ip_address?: StringNullableFilter<"agent_usage_events"> | string | null
    user_agent?: StringNullableFilter<"agent_usage_events"> | string | null
    language_used?: StringNullableFilter<"agent_usage_events"> | string | null
    created_at?: DateTimeNullableFilter<"agent_usage_events"> | Date | string | null
    agents_custom?: XOR<Agents_customNullableScalarRelationFilter, agents_customWhereInput> | null
  }

  export type agent_usage_eventsOrderByWithRelationInput = {
    id?: SortOrder
    agent_id?: SortOrderInput | SortOrder
    event_type?: SortOrder
    event_data?: SortOrderInput | SortOrder
    user_session_id?: SortOrderInput | SortOrder
    ip_address?: SortOrderInput | SortOrder
    user_agent?: SortOrderInput | SortOrder
    language_used?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    agents_custom?: agents_customOrderByWithRelationInput
  }

  export type agent_usage_eventsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: agent_usage_eventsWhereInput | agent_usage_eventsWhereInput[]
    OR?: agent_usage_eventsWhereInput[]
    NOT?: agent_usage_eventsWhereInput | agent_usage_eventsWhereInput[]
    agent_id?: IntNullableFilter<"agent_usage_events"> | number | null
    event_type?: StringFilter<"agent_usage_events"> | string
    event_data?: JsonNullableFilter<"agent_usage_events">
    user_session_id?: StringNullableFilter<"agent_usage_events"> | string | null
    ip_address?: StringNullableFilter<"agent_usage_events"> | string | null
    user_agent?: StringNullableFilter<"agent_usage_events"> | string | null
    language_used?: StringNullableFilter<"agent_usage_events"> | string | null
    created_at?: DateTimeNullableFilter<"agent_usage_events"> | Date | string | null
    agents_custom?: XOR<Agents_customNullableScalarRelationFilter, agents_customWhereInput> | null
  }, "id">

  export type agent_usage_eventsOrderByWithAggregationInput = {
    id?: SortOrder
    agent_id?: SortOrderInput | SortOrder
    event_type?: SortOrder
    event_data?: SortOrderInput | SortOrder
    user_session_id?: SortOrderInput | SortOrder
    ip_address?: SortOrderInput | SortOrder
    user_agent?: SortOrderInput | SortOrder
    language_used?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: agent_usage_eventsCountOrderByAggregateInput
    _avg?: agent_usage_eventsAvgOrderByAggregateInput
    _max?: agent_usage_eventsMaxOrderByAggregateInput
    _min?: agent_usage_eventsMinOrderByAggregateInput
    _sum?: agent_usage_eventsSumOrderByAggregateInput
  }

  export type agent_usage_eventsScalarWhereWithAggregatesInput = {
    AND?: agent_usage_eventsScalarWhereWithAggregatesInput | agent_usage_eventsScalarWhereWithAggregatesInput[]
    OR?: agent_usage_eventsScalarWhereWithAggregatesInput[]
    NOT?: agent_usage_eventsScalarWhereWithAggregatesInput | agent_usage_eventsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"agent_usage_events"> | number
    agent_id?: IntNullableWithAggregatesFilter<"agent_usage_events"> | number | null
    event_type?: StringWithAggregatesFilter<"agent_usage_events"> | string
    event_data?: JsonNullableWithAggregatesFilter<"agent_usage_events">
    user_session_id?: StringNullableWithAggregatesFilter<"agent_usage_events"> | string | null
    ip_address?: StringNullableWithAggregatesFilter<"agent_usage_events"> | string | null
    user_agent?: StringNullableWithAggregatesFilter<"agent_usage_events"> | string | null
    language_used?: StringNullableWithAggregatesFilter<"agent_usage_events"> | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"agent_usage_events"> | Date | string | null
  }

  export type agentsWhereInput = {
    AND?: agentsWhereInput | agentsWhereInput[]
    OR?: agentsWhereInput[]
    NOT?: agentsWhereInput | agentsWhereInput[]
    id?: IntFilter<"agents"> | number
    name?: StringFilter<"agents"> | string
    company?: StringNullableFilter<"agents"> | string | null
    category?: StringNullableFilter<"agents"> | string | null
    description?: StringNullableFilter<"agents"> | string | null
    personality?: StringNullableFilter<"agents"> | string | null
    pricing_half_day?: DecimalNullableFilter<"agents"> | Decimal | DecimalJsLike | number | string | null
    pricing_full_day?: DecimalNullableFilter<"agents"> | Decimal | DecimalJsLike | number | string | null
    pricing_per_minute?: DecimalNullableFilter<"agents"> | Decimal | DecimalJsLike | number | string | null
    elevenlabs_voice_id?: StringNullableFilter<"agents"> | string | null
    voice_sample_url?: StringNullableFilter<"agents"> | string | null
    voice_characteristics?: JsonNullableFilter<"agents">
    context7_profile?: JsonNullableFilter<"agents">
    environmental_suitability?: JsonNullableFilter<"agents">
    performance_by_context?: JsonNullableFilter<"agents">
    gemini_personality_prompt?: StringNullableFilter<"agents"> | string | null
    ai_optimization_score?: DecimalNullableFilter<"agents"> | Decimal | DecimalJsLike | number | string | null
    success_rate?: StringNullableFilter<"agents"> | string | null
    avg_call_time?: StringNullableFilter<"agents"> | string | null
    rating?: DecimalNullableFilter<"agents"> | Decimal | DecimalJsLike | number | string | null
    reviews?: IntNullableFilter<"agents"> | number | null
    integrations?: StringNullableListFilter<"agents">
    industries?: StringNullableListFilter<"agents">
    stages?: IntNullableFilter<"agents"> | number | null
    demo_available?: BoolNullableFilter<"agents"> | boolean | null
    created_at?: DateTimeNullableFilter<"agents"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"agents"> | Date | string | null
    rentals?: RentalsListRelationFilter
    user_interactions?: User_interactionsListRelationFilter
    voice_samples?: Voice_samplesListRelationFilter
  }

  export type agentsOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    company?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    personality?: SortOrderInput | SortOrder
    pricing_half_day?: SortOrderInput | SortOrder
    pricing_full_day?: SortOrderInput | SortOrder
    pricing_per_minute?: SortOrderInput | SortOrder
    elevenlabs_voice_id?: SortOrderInput | SortOrder
    voice_sample_url?: SortOrderInput | SortOrder
    voice_characteristics?: SortOrderInput | SortOrder
    context7_profile?: SortOrderInput | SortOrder
    environmental_suitability?: SortOrderInput | SortOrder
    performance_by_context?: SortOrderInput | SortOrder
    gemini_personality_prompt?: SortOrderInput | SortOrder
    ai_optimization_score?: SortOrderInput | SortOrder
    success_rate?: SortOrderInput | SortOrder
    avg_call_time?: SortOrderInput | SortOrder
    rating?: SortOrderInput | SortOrder
    reviews?: SortOrderInput | SortOrder
    integrations?: SortOrder
    industries?: SortOrder
    stages?: SortOrderInput | SortOrder
    demo_available?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    rentals?: rentalsOrderByRelationAggregateInput
    user_interactions?: user_interactionsOrderByRelationAggregateInput
    voice_samples?: voice_samplesOrderByRelationAggregateInput
  }

  export type agentsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: agentsWhereInput | agentsWhereInput[]
    OR?: agentsWhereInput[]
    NOT?: agentsWhereInput | agentsWhereInput[]
    name?: StringFilter<"agents"> | string
    company?: StringNullableFilter<"agents"> | string | null
    category?: StringNullableFilter<"agents"> | string | null
    description?: StringNullableFilter<"agents"> | string | null
    personality?: StringNullableFilter<"agents"> | string | null
    pricing_half_day?: DecimalNullableFilter<"agents"> | Decimal | DecimalJsLike | number | string | null
    pricing_full_day?: DecimalNullableFilter<"agents"> | Decimal | DecimalJsLike | number | string | null
    pricing_per_minute?: DecimalNullableFilter<"agents"> | Decimal | DecimalJsLike | number | string | null
    elevenlabs_voice_id?: StringNullableFilter<"agents"> | string | null
    voice_sample_url?: StringNullableFilter<"agents"> | string | null
    voice_characteristics?: JsonNullableFilter<"agents">
    context7_profile?: JsonNullableFilter<"agents">
    environmental_suitability?: JsonNullableFilter<"agents">
    performance_by_context?: JsonNullableFilter<"agents">
    gemini_personality_prompt?: StringNullableFilter<"agents"> | string | null
    ai_optimization_score?: DecimalNullableFilter<"agents"> | Decimal | DecimalJsLike | number | string | null
    success_rate?: StringNullableFilter<"agents"> | string | null
    avg_call_time?: StringNullableFilter<"agents"> | string | null
    rating?: DecimalNullableFilter<"agents"> | Decimal | DecimalJsLike | number | string | null
    reviews?: IntNullableFilter<"agents"> | number | null
    integrations?: StringNullableListFilter<"agents">
    industries?: StringNullableListFilter<"agents">
    stages?: IntNullableFilter<"agents"> | number | null
    demo_available?: BoolNullableFilter<"agents"> | boolean | null
    created_at?: DateTimeNullableFilter<"agents"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"agents"> | Date | string | null
    rentals?: RentalsListRelationFilter
    user_interactions?: User_interactionsListRelationFilter
    voice_samples?: Voice_samplesListRelationFilter
  }, "id">

  export type agentsOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    company?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    personality?: SortOrderInput | SortOrder
    pricing_half_day?: SortOrderInput | SortOrder
    pricing_full_day?: SortOrderInput | SortOrder
    pricing_per_minute?: SortOrderInput | SortOrder
    elevenlabs_voice_id?: SortOrderInput | SortOrder
    voice_sample_url?: SortOrderInput | SortOrder
    voice_characteristics?: SortOrderInput | SortOrder
    context7_profile?: SortOrderInput | SortOrder
    environmental_suitability?: SortOrderInput | SortOrder
    performance_by_context?: SortOrderInput | SortOrder
    gemini_personality_prompt?: SortOrderInput | SortOrder
    ai_optimization_score?: SortOrderInput | SortOrder
    success_rate?: SortOrderInput | SortOrder
    avg_call_time?: SortOrderInput | SortOrder
    rating?: SortOrderInput | SortOrder
    reviews?: SortOrderInput | SortOrder
    integrations?: SortOrder
    industries?: SortOrder
    stages?: SortOrderInput | SortOrder
    demo_available?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    _count?: agentsCountOrderByAggregateInput
    _avg?: agentsAvgOrderByAggregateInput
    _max?: agentsMaxOrderByAggregateInput
    _min?: agentsMinOrderByAggregateInput
    _sum?: agentsSumOrderByAggregateInput
  }

  export type agentsScalarWhereWithAggregatesInput = {
    AND?: agentsScalarWhereWithAggregatesInput | agentsScalarWhereWithAggregatesInput[]
    OR?: agentsScalarWhereWithAggregatesInput[]
    NOT?: agentsScalarWhereWithAggregatesInput | agentsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"agents"> | number
    name?: StringWithAggregatesFilter<"agents"> | string
    company?: StringNullableWithAggregatesFilter<"agents"> | string | null
    category?: StringNullableWithAggregatesFilter<"agents"> | string | null
    description?: StringNullableWithAggregatesFilter<"agents"> | string | null
    personality?: StringNullableWithAggregatesFilter<"agents"> | string | null
    pricing_half_day?: DecimalNullableWithAggregatesFilter<"agents"> | Decimal | DecimalJsLike | number | string | null
    pricing_full_day?: DecimalNullableWithAggregatesFilter<"agents"> | Decimal | DecimalJsLike | number | string | null
    pricing_per_minute?: DecimalNullableWithAggregatesFilter<"agents"> | Decimal | DecimalJsLike | number | string | null
    elevenlabs_voice_id?: StringNullableWithAggregatesFilter<"agents"> | string | null
    voice_sample_url?: StringNullableWithAggregatesFilter<"agents"> | string | null
    voice_characteristics?: JsonNullableWithAggregatesFilter<"agents">
    context7_profile?: JsonNullableWithAggregatesFilter<"agents">
    environmental_suitability?: JsonNullableWithAggregatesFilter<"agents">
    performance_by_context?: JsonNullableWithAggregatesFilter<"agents">
    gemini_personality_prompt?: StringNullableWithAggregatesFilter<"agents"> | string | null
    ai_optimization_score?: DecimalNullableWithAggregatesFilter<"agents"> | Decimal | DecimalJsLike | number | string | null
    success_rate?: StringNullableWithAggregatesFilter<"agents"> | string | null
    avg_call_time?: StringNullableWithAggregatesFilter<"agents"> | string | null
    rating?: DecimalNullableWithAggregatesFilter<"agents"> | Decimal | DecimalJsLike | number | string | null
    reviews?: IntNullableWithAggregatesFilter<"agents"> | number | null
    integrations?: StringNullableListFilter<"agents">
    industries?: StringNullableListFilter<"agents">
    stages?: IntNullableWithAggregatesFilter<"agents"> | number | null
    demo_available?: BoolNullableWithAggregatesFilter<"agents"> | boolean | null
    created_at?: DateTimeNullableWithAggregatesFilter<"agents"> | Date | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"agents"> | Date | string | null
  }

  export type agents_customWhereInput = {
    AND?: agents_customWhereInput | agents_customWhereInput[]
    OR?: agents_customWhereInput[]
    NOT?: agents_customWhereInput | agents_customWhereInput[]
    id?: IntFilter<"agents_custom"> | number
    user_id?: UuidNullableFilter<"agents_custom"> | string | null
    name?: StringFilter<"agents_custom"> | string
    template_id?: StringFilter<"agents_custom"> | string
    personality?: StringFilter<"agents_custom"> | string
    voice_id?: StringFilter<"agents_custom"> | string
    voice_settings?: JsonNullableFilter<"agents_custom">
    environment_setting?: StringNullableFilter<"agents_custom"> | string | null
    integrations?: JsonNullableFilter<"agents_custom">
    pricing?: JsonNullableFilter<"agents_custom">
    status?: StringNullableFilter<"agents_custom"> | string | null
    demo_available?: BoolNullableFilter<"agents_custom"> | boolean | null
    created_at?: DateTimeNullableFilter<"agents_custom"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"agents_custom"> | Date | string | null
    agent_feedback?: Agent_feedbackListRelationFilter
    agent_languages?: Agent_languagesListRelationFilter
    agent_performance_metrics?: Agent_performance_metricsListRelationFilter
    agent_usage_events?: Agent_usage_eventsListRelationFilter
  }

  export type agents_customOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrderInput | SortOrder
    name?: SortOrder
    template_id?: SortOrder
    personality?: SortOrder
    voice_id?: SortOrder
    voice_settings?: SortOrderInput | SortOrder
    environment_setting?: SortOrderInput | SortOrder
    integrations?: SortOrderInput | SortOrder
    pricing?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    demo_available?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    agent_feedback?: agent_feedbackOrderByRelationAggregateInput
    agent_languages?: agent_languagesOrderByRelationAggregateInput
    agent_performance_metrics?: agent_performance_metricsOrderByRelationAggregateInput
    agent_usage_events?: agent_usage_eventsOrderByRelationAggregateInput
  }

  export type agents_customWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: agents_customWhereInput | agents_customWhereInput[]
    OR?: agents_customWhereInput[]
    NOT?: agents_customWhereInput | agents_customWhereInput[]
    user_id?: UuidNullableFilter<"agents_custom"> | string | null
    name?: StringFilter<"agents_custom"> | string
    template_id?: StringFilter<"agents_custom"> | string
    personality?: StringFilter<"agents_custom"> | string
    voice_id?: StringFilter<"agents_custom"> | string
    voice_settings?: JsonNullableFilter<"agents_custom">
    environment_setting?: StringNullableFilter<"agents_custom"> | string | null
    integrations?: JsonNullableFilter<"agents_custom">
    pricing?: JsonNullableFilter<"agents_custom">
    status?: StringNullableFilter<"agents_custom"> | string | null
    demo_available?: BoolNullableFilter<"agents_custom"> | boolean | null
    created_at?: DateTimeNullableFilter<"agents_custom"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"agents_custom"> | Date | string | null
    agent_feedback?: Agent_feedbackListRelationFilter
    agent_languages?: Agent_languagesListRelationFilter
    agent_performance_metrics?: Agent_performance_metricsListRelationFilter
    agent_usage_events?: Agent_usage_eventsListRelationFilter
  }, "id">

  export type agents_customOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrderInput | SortOrder
    name?: SortOrder
    template_id?: SortOrder
    personality?: SortOrder
    voice_id?: SortOrder
    voice_settings?: SortOrderInput | SortOrder
    environment_setting?: SortOrderInput | SortOrder
    integrations?: SortOrderInput | SortOrder
    pricing?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    demo_available?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    _count?: agents_customCountOrderByAggregateInput
    _avg?: agents_customAvgOrderByAggregateInput
    _max?: agents_customMaxOrderByAggregateInput
    _min?: agents_customMinOrderByAggregateInput
    _sum?: agents_customSumOrderByAggregateInput
  }

  export type agents_customScalarWhereWithAggregatesInput = {
    AND?: agents_customScalarWhereWithAggregatesInput | agents_customScalarWhereWithAggregatesInput[]
    OR?: agents_customScalarWhereWithAggregatesInput[]
    NOT?: agents_customScalarWhereWithAggregatesInput | agents_customScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"agents_custom"> | number
    user_id?: UuidNullableWithAggregatesFilter<"agents_custom"> | string | null
    name?: StringWithAggregatesFilter<"agents_custom"> | string
    template_id?: StringWithAggregatesFilter<"agents_custom"> | string
    personality?: StringWithAggregatesFilter<"agents_custom"> | string
    voice_id?: StringWithAggregatesFilter<"agents_custom"> | string
    voice_settings?: JsonNullableWithAggregatesFilter<"agents_custom">
    environment_setting?: StringNullableWithAggregatesFilter<"agents_custom"> | string | null
    integrations?: JsonNullableWithAggregatesFilter<"agents_custom">
    pricing?: JsonNullableWithAggregatesFilter<"agents_custom">
    status?: StringNullableWithAggregatesFilter<"agents_custom"> | string | null
    demo_available?: BoolNullableWithAggregatesFilter<"agents_custom"> | boolean | null
    created_at?: DateTimeNullableWithAggregatesFilter<"agents_custom"> | Date | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"agents_custom"> | Date | string | null
  }

  export type contractor_contextWhereInput = {
    AND?: contractor_contextWhereInput | contractor_contextWhereInput[]
    OR?: contractor_contextWhereInput[]
    NOT?: contractor_contextWhereInput | contractor_contextWhereInput[]
    id?: IntFilter<"contractor_context"> | number
    user_email?: StringFilter<"contractor_context"> | string
    user_name?: StringNullableFilter<"contractor_context"> | string | null
    expertise_level?: StringNullableFilter<"contractor_context"> | string | null
    primary_trade?: StringNullableFilter<"contractor_context"> | string | null
    company_size?: StringNullableFilter<"contractor_context"> | string | null
    years_experience?: IntNullableFilter<"contractor_context"> | number | null
    specializations?: StringNullableListFilter<"contractor_context">
    typical_job_sites?: JsonNullableFilter<"contractor_context">
    noise_tolerance?: StringNullableFilter<"contractor_context"> | string | null
    safety_requirements?: JsonNullableFilter<"contractor_context">
    geographic_region?: StringNullableFilter<"contractor_context"> | string | null
    climate_considerations?: JsonNullableFilter<"contractor_context">
    preferred_call_times?: JsonNullableFilter<"contractor_context">
    timezone?: StringNullableFilter<"contractor_context"> | string | null
    project_phases?: JsonNullableFilter<"contractor_context">
    seasonal_patterns?: JsonNullableFilter<"contractor_context">
    urgency_patterns?: StringNullableFilter<"contractor_context"> | string | null
    primary_device?: StringNullableFilter<"contractor_context"> | string | null
    network_quality?: StringNullableFilter<"contractor_context"> | string | null
    preferred_integrations?: StringNullableListFilter<"contractor_context">
    technical_comfort_level?: StringNullableFilter<"contractor_context"> | string | null
    voice_quality_requirements?: StringNullableFilter<"contractor_context"> | string | null
    budget_range?: StringNullableFilter<"contractor_context"> | string | null
    roi_requirements?: DecimalNullableFilter<"contractor_context"> | Decimal | DecimalJsLike | number | string | null
    rental_frequency?: StringNullableFilter<"contractor_context"> | string | null
    payment_preferences?: StringNullableFilter<"contractor_context"> | string | null
    cost_sensitivity?: StringNullableFilter<"contractor_context"> | string | null
    communication_style?: StringNullableFilter<"contractor_context"> | string | null
    team_structure?: JsonNullableFilter<"contractor_context">
    client_interaction_style?: StringNullableFilter<"contractor_context"> | string | null
    decision_making_style?: StringNullableFilter<"contractor_context"> | string | null
    cultural_considerations?: JsonNullableFilter<"contractor_context">
    success_metrics?: JsonNullableFilter<"contractor_context">
    preferred_agent_types?: StringNullableListFilter<"contractor_context">
    optimization_preferences?: JsonNullableFilter<"contractor_context">
    learning_preferences?: StringNullableFilter<"contractor_context"> | string | null
    feedback_patterns?: JsonNullableFilter<"contractor_context">
    context_confidence_score?: DecimalNullableFilter<"contractor_context"> | Decimal | DecimalJsLike | number | string | null
    last_context_update?: DateTimeNullableFilter<"contractor_context"> | Date | string | null
    created_at?: DateTimeNullableFilter<"contractor_context"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"contractor_context"> | Date | string | null
  }

  export type contractor_contextOrderByWithRelationInput = {
    id?: SortOrder
    user_email?: SortOrder
    user_name?: SortOrderInput | SortOrder
    expertise_level?: SortOrderInput | SortOrder
    primary_trade?: SortOrderInput | SortOrder
    company_size?: SortOrderInput | SortOrder
    years_experience?: SortOrderInput | SortOrder
    specializations?: SortOrder
    typical_job_sites?: SortOrderInput | SortOrder
    noise_tolerance?: SortOrderInput | SortOrder
    safety_requirements?: SortOrderInput | SortOrder
    geographic_region?: SortOrderInput | SortOrder
    climate_considerations?: SortOrderInput | SortOrder
    preferred_call_times?: SortOrderInput | SortOrder
    timezone?: SortOrderInput | SortOrder
    project_phases?: SortOrderInput | SortOrder
    seasonal_patterns?: SortOrderInput | SortOrder
    urgency_patterns?: SortOrderInput | SortOrder
    primary_device?: SortOrderInput | SortOrder
    network_quality?: SortOrderInput | SortOrder
    preferred_integrations?: SortOrder
    technical_comfort_level?: SortOrderInput | SortOrder
    voice_quality_requirements?: SortOrderInput | SortOrder
    budget_range?: SortOrderInput | SortOrder
    roi_requirements?: SortOrderInput | SortOrder
    rental_frequency?: SortOrderInput | SortOrder
    payment_preferences?: SortOrderInput | SortOrder
    cost_sensitivity?: SortOrderInput | SortOrder
    communication_style?: SortOrderInput | SortOrder
    team_structure?: SortOrderInput | SortOrder
    client_interaction_style?: SortOrderInput | SortOrder
    decision_making_style?: SortOrderInput | SortOrder
    cultural_considerations?: SortOrderInput | SortOrder
    success_metrics?: SortOrderInput | SortOrder
    preferred_agent_types?: SortOrder
    optimization_preferences?: SortOrderInput | SortOrder
    learning_preferences?: SortOrderInput | SortOrder
    feedback_patterns?: SortOrderInput | SortOrder
    context_confidence_score?: SortOrderInput | SortOrder
    last_context_update?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
  }

  export type contractor_contextWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: contractor_contextWhereInput | contractor_contextWhereInput[]
    OR?: contractor_contextWhereInput[]
    NOT?: contractor_contextWhereInput | contractor_contextWhereInput[]
    user_email?: StringFilter<"contractor_context"> | string
    user_name?: StringNullableFilter<"contractor_context"> | string | null
    expertise_level?: StringNullableFilter<"contractor_context"> | string | null
    primary_trade?: StringNullableFilter<"contractor_context"> | string | null
    company_size?: StringNullableFilter<"contractor_context"> | string | null
    years_experience?: IntNullableFilter<"contractor_context"> | number | null
    specializations?: StringNullableListFilter<"contractor_context">
    typical_job_sites?: JsonNullableFilter<"contractor_context">
    noise_tolerance?: StringNullableFilter<"contractor_context"> | string | null
    safety_requirements?: JsonNullableFilter<"contractor_context">
    geographic_region?: StringNullableFilter<"contractor_context"> | string | null
    climate_considerations?: JsonNullableFilter<"contractor_context">
    preferred_call_times?: JsonNullableFilter<"contractor_context">
    timezone?: StringNullableFilter<"contractor_context"> | string | null
    project_phases?: JsonNullableFilter<"contractor_context">
    seasonal_patterns?: JsonNullableFilter<"contractor_context">
    urgency_patterns?: StringNullableFilter<"contractor_context"> | string | null
    primary_device?: StringNullableFilter<"contractor_context"> | string | null
    network_quality?: StringNullableFilter<"contractor_context"> | string | null
    preferred_integrations?: StringNullableListFilter<"contractor_context">
    technical_comfort_level?: StringNullableFilter<"contractor_context"> | string | null
    voice_quality_requirements?: StringNullableFilter<"contractor_context"> | string | null
    budget_range?: StringNullableFilter<"contractor_context"> | string | null
    roi_requirements?: DecimalNullableFilter<"contractor_context"> | Decimal | DecimalJsLike | number | string | null
    rental_frequency?: StringNullableFilter<"contractor_context"> | string | null
    payment_preferences?: StringNullableFilter<"contractor_context"> | string | null
    cost_sensitivity?: StringNullableFilter<"contractor_context"> | string | null
    communication_style?: StringNullableFilter<"contractor_context"> | string | null
    team_structure?: JsonNullableFilter<"contractor_context">
    client_interaction_style?: StringNullableFilter<"contractor_context"> | string | null
    decision_making_style?: StringNullableFilter<"contractor_context"> | string | null
    cultural_considerations?: JsonNullableFilter<"contractor_context">
    success_metrics?: JsonNullableFilter<"contractor_context">
    preferred_agent_types?: StringNullableListFilter<"contractor_context">
    optimization_preferences?: JsonNullableFilter<"contractor_context">
    learning_preferences?: StringNullableFilter<"contractor_context"> | string | null
    feedback_patterns?: JsonNullableFilter<"contractor_context">
    context_confidence_score?: DecimalNullableFilter<"contractor_context"> | Decimal | DecimalJsLike | number | string | null
    last_context_update?: DateTimeNullableFilter<"contractor_context"> | Date | string | null
    created_at?: DateTimeNullableFilter<"contractor_context"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"contractor_context"> | Date | string | null
  }, "id">

  export type contractor_contextOrderByWithAggregationInput = {
    id?: SortOrder
    user_email?: SortOrder
    user_name?: SortOrderInput | SortOrder
    expertise_level?: SortOrderInput | SortOrder
    primary_trade?: SortOrderInput | SortOrder
    company_size?: SortOrderInput | SortOrder
    years_experience?: SortOrderInput | SortOrder
    specializations?: SortOrder
    typical_job_sites?: SortOrderInput | SortOrder
    noise_tolerance?: SortOrderInput | SortOrder
    safety_requirements?: SortOrderInput | SortOrder
    geographic_region?: SortOrderInput | SortOrder
    climate_considerations?: SortOrderInput | SortOrder
    preferred_call_times?: SortOrderInput | SortOrder
    timezone?: SortOrderInput | SortOrder
    project_phases?: SortOrderInput | SortOrder
    seasonal_patterns?: SortOrderInput | SortOrder
    urgency_patterns?: SortOrderInput | SortOrder
    primary_device?: SortOrderInput | SortOrder
    network_quality?: SortOrderInput | SortOrder
    preferred_integrations?: SortOrder
    technical_comfort_level?: SortOrderInput | SortOrder
    voice_quality_requirements?: SortOrderInput | SortOrder
    budget_range?: SortOrderInput | SortOrder
    roi_requirements?: SortOrderInput | SortOrder
    rental_frequency?: SortOrderInput | SortOrder
    payment_preferences?: SortOrderInput | SortOrder
    cost_sensitivity?: SortOrderInput | SortOrder
    communication_style?: SortOrderInput | SortOrder
    team_structure?: SortOrderInput | SortOrder
    client_interaction_style?: SortOrderInput | SortOrder
    decision_making_style?: SortOrderInput | SortOrder
    cultural_considerations?: SortOrderInput | SortOrder
    success_metrics?: SortOrderInput | SortOrder
    preferred_agent_types?: SortOrder
    optimization_preferences?: SortOrderInput | SortOrder
    learning_preferences?: SortOrderInput | SortOrder
    feedback_patterns?: SortOrderInput | SortOrder
    context_confidence_score?: SortOrderInput | SortOrder
    last_context_update?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    _count?: contractor_contextCountOrderByAggregateInput
    _avg?: contractor_contextAvgOrderByAggregateInput
    _max?: contractor_contextMaxOrderByAggregateInput
    _min?: contractor_contextMinOrderByAggregateInput
    _sum?: contractor_contextSumOrderByAggregateInput
  }

  export type contractor_contextScalarWhereWithAggregatesInput = {
    AND?: contractor_contextScalarWhereWithAggregatesInput | contractor_contextScalarWhereWithAggregatesInput[]
    OR?: contractor_contextScalarWhereWithAggregatesInput[]
    NOT?: contractor_contextScalarWhereWithAggregatesInput | contractor_contextScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"contractor_context"> | number
    user_email?: StringWithAggregatesFilter<"contractor_context"> | string
    user_name?: StringNullableWithAggregatesFilter<"contractor_context"> | string | null
    expertise_level?: StringNullableWithAggregatesFilter<"contractor_context"> | string | null
    primary_trade?: StringNullableWithAggregatesFilter<"contractor_context"> | string | null
    company_size?: StringNullableWithAggregatesFilter<"contractor_context"> | string | null
    years_experience?: IntNullableWithAggregatesFilter<"contractor_context"> | number | null
    specializations?: StringNullableListFilter<"contractor_context">
    typical_job_sites?: JsonNullableWithAggregatesFilter<"contractor_context">
    noise_tolerance?: StringNullableWithAggregatesFilter<"contractor_context"> | string | null
    safety_requirements?: JsonNullableWithAggregatesFilter<"contractor_context">
    geographic_region?: StringNullableWithAggregatesFilter<"contractor_context"> | string | null
    climate_considerations?: JsonNullableWithAggregatesFilter<"contractor_context">
    preferred_call_times?: JsonNullableWithAggregatesFilter<"contractor_context">
    timezone?: StringNullableWithAggregatesFilter<"contractor_context"> | string | null
    project_phases?: JsonNullableWithAggregatesFilter<"contractor_context">
    seasonal_patterns?: JsonNullableWithAggregatesFilter<"contractor_context">
    urgency_patterns?: StringNullableWithAggregatesFilter<"contractor_context"> | string | null
    primary_device?: StringNullableWithAggregatesFilter<"contractor_context"> | string | null
    network_quality?: StringNullableWithAggregatesFilter<"contractor_context"> | string | null
    preferred_integrations?: StringNullableListFilter<"contractor_context">
    technical_comfort_level?: StringNullableWithAggregatesFilter<"contractor_context"> | string | null
    voice_quality_requirements?: StringNullableWithAggregatesFilter<"contractor_context"> | string | null
    budget_range?: StringNullableWithAggregatesFilter<"contractor_context"> | string | null
    roi_requirements?: DecimalNullableWithAggregatesFilter<"contractor_context"> | Decimal | DecimalJsLike | number | string | null
    rental_frequency?: StringNullableWithAggregatesFilter<"contractor_context"> | string | null
    payment_preferences?: StringNullableWithAggregatesFilter<"contractor_context"> | string | null
    cost_sensitivity?: StringNullableWithAggregatesFilter<"contractor_context"> | string | null
    communication_style?: StringNullableWithAggregatesFilter<"contractor_context"> | string | null
    team_structure?: JsonNullableWithAggregatesFilter<"contractor_context">
    client_interaction_style?: StringNullableWithAggregatesFilter<"contractor_context"> | string | null
    decision_making_style?: StringNullableWithAggregatesFilter<"contractor_context"> | string | null
    cultural_considerations?: JsonNullableWithAggregatesFilter<"contractor_context">
    success_metrics?: JsonNullableWithAggregatesFilter<"contractor_context">
    preferred_agent_types?: StringNullableListFilter<"contractor_context">
    optimization_preferences?: JsonNullableWithAggregatesFilter<"contractor_context">
    learning_preferences?: StringNullableWithAggregatesFilter<"contractor_context"> | string | null
    feedback_patterns?: JsonNullableWithAggregatesFilter<"contractor_context">
    context_confidence_score?: DecimalNullableWithAggregatesFilter<"contractor_context"> | Decimal | DecimalJsLike | number | string | null
    last_context_update?: DateTimeNullableWithAggregatesFilter<"contractor_context"> | Date | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"contractor_context"> | Date | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"contractor_context"> | Date | string | null
  }

  export type rentalsWhereInput = {
    AND?: rentalsWhereInput | rentalsWhereInput[]
    OR?: rentalsWhereInput[]
    NOT?: rentalsWhereInput | rentalsWhereInput[]
    id?: IntFilter<"rentals"> | number
    agent_id?: IntNullableFilter<"rentals"> | number | null
    user_email?: StringFilter<"rentals"> | string
    user_name?: StringNullableFilter<"rentals"> | string | null
    rental_type?: StringNullableFilter<"rentals"> | string | null
    start_date?: DateTimeNullableFilter<"rentals"> | Date | string | null
    end_date?: DateTimeNullableFilter<"rentals"> | Date | string | null
    duration_hours?: IntNullableFilter<"rentals"> | number | null
    base_price?: DecimalNullableFilter<"rentals"> | Decimal | DecimalJsLike | number | string | null
    context_adjustment?: DecimalNullableFilter<"rentals"> | Decimal | DecimalJsLike | number | string | null
    discount_percent?: DecimalNullableFilter<"rentals"> | Decimal | DecimalJsLike | number | string | null
    total_price?: DecimalNullableFilter<"rentals"> | Decimal | DecimalJsLike | number | string | null
    retell_phone_number?: StringNullableFilter<"rentals"> | string | null
    elevenlabs_voice_config?: JsonNullableFilter<"rentals">
    gemini_customizations?: JsonNullableFilter<"rentals">
    context_snapshot?: JsonNullableFilter<"rentals">
    environmental_conditions?: JsonNullableFilter<"rentals">
    performance_metrics?: JsonNullableFilter<"rentals">
    stripe_payment_intent_id?: StringNullableFilter<"rentals"> | string | null
    status?: StringNullableFilter<"rentals"> | string | null
    satisfaction_score?: DecimalNullableFilter<"rentals"> | Decimal | DecimalJsLike | number | string | null
    context_match_accuracy?: DecimalNullableFilter<"rentals"> | Decimal | DecimalJsLike | number | string | null
    optimization_suggestions?: JsonNullableFilter<"rentals">
    created_at?: DateTimeNullableFilter<"rentals"> | Date | string | null
    completed_at?: DateTimeNullableFilter<"rentals"> | Date | string | null
    agents?: XOR<AgentsNullableScalarRelationFilter, agentsWhereInput> | null
  }

  export type rentalsOrderByWithRelationInput = {
    id?: SortOrder
    agent_id?: SortOrderInput | SortOrder
    user_email?: SortOrder
    user_name?: SortOrderInput | SortOrder
    rental_type?: SortOrderInput | SortOrder
    start_date?: SortOrderInput | SortOrder
    end_date?: SortOrderInput | SortOrder
    duration_hours?: SortOrderInput | SortOrder
    base_price?: SortOrderInput | SortOrder
    context_adjustment?: SortOrderInput | SortOrder
    discount_percent?: SortOrderInput | SortOrder
    total_price?: SortOrderInput | SortOrder
    retell_phone_number?: SortOrderInput | SortOrder
    elevenlabs_voice_config?: SortOrderInput | SortOrder
    gemini_customizations?: SortOrderInput | SortOrder
    context_snapshot?: SortOrderInput | SortOrder
    environmental_conditions?: SortOrderInput | SortOrder
    performance_metrics?: SortOrderInput | SortOrder
    stripe_payment_intent_id?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    satisfaction_score?: SortOrderInput | SortOrder
    context_match_accuracy?: SortOrderInput | SortOrder
    optimization_suggestions?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    completed_at?: SortOrderInput | SortOrder
    agents?: agentsOrderByWithRelationInput
  }

  export type rentalsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: rentalsWhereInput | rentalsWhereInput[]
    OR?: rentalsWhereInput[]
    NOT?: rentalsWhereInput | rentalsWhereInput[]
    agent_id?: IntNullableFilter<"rentals"> | number | null
    user_email?: StringFilter<"rentals"> | string
    user_name?: StringNullableFilter<"rentals"> | string | null
    rental_type?: StringNullableFilter<"rentals"> | string | null
    start_date?: DateTimeNullableFilter<"rentals"> | Date | string | null
    end_date?: DateTimeNullableFilter<"rentals"> | Date | string | null
    duration_hours?: IntNullableFilter<"rentals"> | number | null
    base_price?: DecimalNullableFilter<"rentals"> | Decimal | DecimalJsLike | number | string | null
    context_adjustment?: DecimalNullableFilter<"rentals"> | Decimal | DecimalJsLike | number | string | null
    discount_percent?: DecimalNullableFilter<"rentals"> | Decimal | DecimalJsLike | number | string | null
    total_price?: DecimalNullableFilter<"rentals"> | Decimal | DecimalJsLike | number | string | null
    retell_phone_number?: StringNullableFilter<"rentals"> | string | null
    elevenlabs_voice_config?: JsonNullableFilter<"rentals">
    gemini_customizations?: JsonNullableFilter<"rentals">
    context_snapshot?: JsonNullableFilter<"rentals">
    environmental_conditions?: JsonNullableFilter<"rentals">
    performance_metrics?: JsonNullableFilter<"rentals">
    stripe_payment_intent_id?: StringNullableFilter<"rentals"> | string | null
    status?: StringNullableFilter<"rentals"> | string | null
    satisfaction_score?: DecimalNullableFilter<"rentals"> | Decimal | DecimalJsLike | number | string | null
    context_match_accuracy?: DecimalNullableFilter<"rentals"> | Decimal | DecimalJsLike | number | string | null
    optimization_suggestions?: JsonNullableFilter<"rentals">
    created_at?: DateTimeNullableFilter<"rentals"> | Date | string | null
    completed_at?: DateTimeNullableFilter<"rentals"> | Date | string | null
    agents?: XOR<AgentsNullableScalarRelationFilter, agentsWhereInput> | null
  }, "id">

  export type rentalsOrderByWithAggregationInput = {
    id?: SortOrder
    agent_id?: SortOrderInput | SortOrder
    user_email?: SortOrder
    user_name?: SortOrderInput | SortOrder
    rental_type?: SortOrderInput | SortOrder
    start_date?: SortOrderInput | SortOrder
    end_date?: SortOrderInput | SortOrder
    duration_hours?: SortOrderInput | SortOrder
    base_price?: SortOrderInput | SortOrder
    context_adjustment?: SortOrderInput | SortOrder
    discount_percent?: SortOrderInput | SortOrder
    total_price?: SortOrderInput | SortOrder
    retell_phone_number?: SortOrderInput | SortOrder
    elevenlabs_voice_config?: SortOrderInput | SortOrder
    gemini_customizations?: SortOrderInput | SortOrder
    context_snapshot?: SortOrderInput | SortOrder
    environmental_conditions?: SortOrderInput | SortOrder
    performance_metrics?: SortOrderInput | SortOrder
    stripe_payment_intent_id?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    satisfaction_score?: SortOrderInput | SortOrder
    context_match_accuracy?: SortOrderInput | SortOrder
    optimization_suggestions?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    completed_at?: SortOrderInput | SortOrder
    _count?: rentalsCountOrderByAggregateInput
    _avg?: rentalsAvgOrderByAggregateInput
    _max?: rentalsMaxOrderByAggregateInput
    _min?: rentalsMinOrderByAggregateInput
    _sum?: rentalsSumOrderByAggregateInput
  }

  export type rentalsScalarWhereWithAggregatesInput = {
    AND?: rentalsScalarWhereWithAggregatesInput | rentalsScalarWhereWithAggregatesInput[]
    OR?: rentalsScalarWhereWithAggregatesInput[]
    NOT?: rentalsScalarWhereWithAggregatesInput | rentalsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"rentals"> | number
    agent_id?: IntNullableWithAggregatesFilter<"rentals"> | number | null
    user_email?: StringWithAggregatesFilter<"rentals"> | string
    user_name?: StringNullableWithAggregatesFilter<"rentals"> | string | null
    rental_type?: StringNullableWithAggregatesFilter<"rentals"> | string | null
    start_date?: DateTimeNullableWithAggregatesFilter<"rentals"> | Date | string | null
    end_date?: DateTimeNullableWithAggregatesFilter<"rentals"> | Date | string | null
    duration_hours?: IntNullableWithAggregatesFilter<"rentals"> | number | null
    base_price?: DecimalNullableWithAggregatesFilter<"rentals"> | Decimal | DecimalJsLike | number | string | null
    context_adjustment?: DecimalNullableWithAggregatesFilter<"rentals"> | Decimal | DecimalJsLike | number | string | null
    discount_percent?: DecimalNullableWithAggregatesFilter<"rentals"> | Decimal | DecimalJsLike | number | string | null
    total_price?: DecimalNullableWithAggregatesFilter<"rentals"> | Decimal | DecimalJsLike | number | string | null
    retell_phone_number?: StringNullableWithAggregatesFilter<"rentals"> | string | null
    elevenlabs_voice_config?: JsonNullableWithAggregatesFilter<"rentals">
    gemini_customizations?: JsonNullableWithAggregatesFilter<"rentals">
    context_snapshot?: JsonNullableWithAggregatesFilter<"rentals">
    environmental_conditions?: JsonNullableWithAggregatesFilter<"rentals">
    performance_metrics?: JsonNullableWithAggregatesFilter<"rentals">
    stripe_payment_intent_id?: StringNullableWithAggregatesFilter<"rentals"> | string | null
    status?: StringNullableWithAggregatesFilter<"rentals"> | string | null
    satisfaction_score?: DecimalNullableWithAggregatesFilter<"rentals"> | Decimal | DecimalJsLike | number | string | null
    context_match_accuracy?: DecimalNullableWithAggregatesFilter<"rentals"> | Decimal | DecimalJsLike | number | string | null
    optimization_suggestions?: JsonNullableWithAggregatesFilter<"rentals">
    created_at?: DateTimeNullableWithAggregatesFilter<"rentals"> | Date | string | null
    completed_at?: DateTimeNullableWithAggregatesFilter<"rentals"> | Date | string | null
  }

  export type subscriptionsWhereInput = {
    AND?: subscriptionsWhereInput | subscriptionsWhereInput[]
    OR?: subscriptionsWhereInput[]
    NOT?: subscriptionsWhereInput | subscriptionsWhereInput[]
    id?: IntFilter<"subscriptions"> | number
    user_email?: StringFilter<"subscriptions"> | string
    plan_name?: StringNullableFilter<"subscriptions"> | string | null
    billing_period?: StringNullableFilter<"subscriptions"> | string | null
    monthly_price?: DecimalNullableFilter<"subscriptions"> | Decimal | DecimalJsLike | number | string | null
    annual_price?: DecimalNullableFilter<"subscriptions"> | Decimal | DecimalJsLike | number | string | null
    discount_percent?: DecimalNullableFilter<"subscriptions"> | Decimal | DecimalJsLike | number | string | null
    context_based_discounts?: JsonNullableFilter<"subscriptions">
    agent_limit?: IntNullableFilter<"subscriptions"> | number | null
    features?: JsonNullableFilter<"subscriptions">
    recommended_based_on_context?: BoolNullableFilter<"subscriptions"> | boolean | null
    context_match_score?: DecimalNullableFilter<"subscriptions"> | Decimal | DecimalJsLike | number | string | null
    stripe_subscription_id?: StringNullableFilter<"subscriptions"> | string | null
    status?: StringNullableFilter<"subscriptions"> | string | null
    created_at?: DateTimeNullableFilter<"subscriptions"> | Date | string | null
    expires_at?: DateTimeNullableFilter<"subscriptions"> | Date | string | null
    next_billing_date?: DateTimeNullableFilter<"subscriptions"> | Date | string | null
  }

  export type subscriptionsOrderByWithRelationInput = {
    id?: SortOrder
    user_email?: SortOrder
    plan_name?: SortOrderInput | SortOrder
    billing_period?: SortOrderInput | SortOrder
    monthly_price?: SortOrderInput | SortOrder
    annual_price?: SortOrderInput | SortOrder
    discount_percent?: SortOrderInput | SortOrder
    context_based_discounts?: SortOrderInput | SortOrder
    agent_limit?: SortOrderInput | SortOrder
    features?: SortOrderInput | SortOrder
    recommended_based_on_context?: SortOrderInput | SortOrder
    context_match_score?: SortOrderInput | SortOrder
    stripe_subscription_id?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    next_billing_date?: SortOrderInput | SortOrder
  }

  export type subscriptionsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: subscriptionsWhereInput | subscriptionsWhereInput[]
    OR?: subscriptionsWhereInput[]
    NOT?: subscriptionsWhereInput | subscriptionsWhereInput[]
    user_email?: StringFilter<"subscriptions"> | string
    plan_name?: StringNullableFilter<"subscriptions"> | string | null
    billing_period?: StringNullableFilter<"subscriptions"> | string | null
    monthly_price?: DecimalNullableFilter<"subscriptions"> | Decimal | DecimalJsLike | number | string | null
    annual_price?: DecimalNullableFilter<"subscriptions"> | Decimal | DecimalJsLike | number | string | null
    discount_percent?: DecimalNullableFilter<"subscriptions"> | Decimal | DecimalJsLike | number | string | null
    context_based_discounts?: JsonNullableFilter<"subscriptions">
    agent_limit?: IntNullableFilter<"subscriptions"> | number | null
    features?: JsonNullableFilter<"subscriptions">
    recommended_based_on_context?: BoolNullableFilter<"subscriptions"> | boolean | null
    context_match_score?: DecimalNullableFilter<"subscriptions"> | Decimal | DecimalJsLike | number | string | null
    stripe_subscription_id?: StringNullableFilter<"subscriptions"> | string | null
    status?: StringNullableFilter<"subscriptions"> | string | null
    created_at?: DateTimeNullableFilter<"subscriptions"> | Date | string | null
    expires_at?: DateTimeNullableFilter<"subscriptions"> | Date | string | null
    next_billing_date?: DateTimeNullableFilter<"subscriptions"> | Date | string | null
  }, "id">

  export type subscriptionsOrderByWithAggregationInput = {
    id?: SortOrder
    user_email?: SortOrder
    plan_name?: SortOrderInput | SortOrder
    billing_period?: SortOrderInput | SortOrder
    monthly_price?: SortOrderInput | SortOrder
    annual_price?: SortOrderInput | SortOrder
    discount_percent?: SortOrderInput | SortOrder
    context_based_discounts?: SortOrderInput | SortOrder
    agent_limit?: SortOrderInput | SortOrder
    features?: SortOrderInput | SortOrder
    recommended_based_on_context?: SortOrderInput | SortOrder
    context_match_score?: SortOrderInput | SortOrder
    stripe_subscription_id?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    next_billing_date?: SortOrderInput | SortOrder
    _count?: subscriptionsCountOrderByAggregateInput
    _avg?: subscriptionsAvgOrderByAggregateInput
    _max?: subscriptionsMaxOrderByAggregateInput
    _min?: subscriptionsMinOrderByAggregateInput
    _sum?: subscriptionsSumOrderByAggregateInput
  }

  export type subscriptionsScalarWhereWithAggregatesInput = {
    AND?: subscriptionsScalarWhereWithAggregatesInput | subscriptionsScalarWhereWithAggregatesInput[]
    OR?: subscriptionsScalarWhereWithAggregatesInput[]
    NOT?: subscriptionsScalarWhereWithAggregatesInput | subscriptionsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"subscriptions"> | number
    user_email?: StringWithAggregatesFilter<"subscriptions"> | string
    plan_name?: StringNullableWithAggregatesFilter<"subscriptions"> | string | null
    billing_period?: StringNullableWithAggregatesFilter<"subscriptions"> | string | null
    monthly_price?: DecimalNullableWithAggregatesFilter<"subscriptions"> | Decimal | DecimalJsLike | number | string | null
    annual_price?: DecimalNullableWithAggregatesFilter<"subscriptions"> | Decimal | DecimalJsLike | number | string | null
    discount_percent?: DecimalNullableWithAggregatesFilter<"subscriptions"> | Decimal | DecimalJsLike | number | string | null
    context_based_discounts?: JsonNullableWithAggregatesFilter<"subscriptions">
    agent_limit?: IntNullableWithAggregatesFilter<"subscriptions"> | number | null
    features?: JsonNullableWithAggregatesFilter<"subscriptions">
    recommended_based_on_context?: BoolNullableWithAggregatesFilter<"subscriptions"> | boolean | null
    context_match_score?: DecimalNullableWithAggregatesFilter<"subscriptions"> | Decimal | DecimalJsLike | number | string | null
    stripe_subscription_id?: StringNullableWithAggregatesFilter<"subscriptions"> | string | null
    status?: StringNullableWithAggregatesFilter<"subscriptions"> | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"subscriptions"> | Date | string | null
    expires_at?: DateTimeNullableWithAggregatesFilter<"subscriptions"> | Date | string | null
    next_billing_date?: DateTimeNullableWithAggregatesFilter<"subscriptions"> | Date | string | null
  }

  export type system_health_metricsWhereInput = {
    AND?: system_health_metricsWhereInput | system_health_metricsWhereInput[]
    OR?: system_health_metricsWhereInput[]
    NOT?: system_health_metricsWhereInput | system_health_metricsWhereInput[]
    id?: IntFilter<"system_health_metrics"> | number
    metric_date?: DateTimeNullableFilter<"system_health_metrics"> | Date | string | null
    api_uptime_percentage?: DecimalNullableFilter<"system_health_metrics"> | Decimal | DecimalJsLike | number | string | null
    avg_api_response_time_ms?: IntNullableFilter<"system_health_metrics"> | number | null
    voice_api_success_rate?: DecimalNullableFilter<"system_health_metrics"> | Decimal | DecimalJsLike | number | string | null
    database_connection_pool_usage?: DecimalNullableFilter<"system_health_metrics"> | Decimal | DecimalJsLike | number | string | null
    error_rate_percentage?: DecimalNullableFilter<"system_health_metrics"> | Decimal | DecimalJsLike | number | string | null
    created_at?: DateTimeNullableFilter<"system_health_metrics"> | Date | string | null
  }

  export type system_health_metricsOrderByWithRelationInput = {
    id?: SortOrder
    metric_date?: SortOrderInput | SortOrder
    api_uptime_percentage?: SortOrderInput | SortOrder
    avg_api_response_time_ms?: SortOrderInput | SortOrder
    voice_api_success_rate?: SortOrderInput | SortOrder
    database_connection_pool_usage?: SortOrderInput | SortOrder
    error_rate_percentage?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
  }

  export type system_health_metricsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    metric_date?: Date | string
    AND?: system_health_metricsWhereInput | system_health_metricsWhereInput[]
    OR?: system_health_metricsWhereInput[]
    NOT?: system_health_metricsWhereInput | system_health_metricsWhereInput[]
    api_uptime_percentage?: DecimalNullableFilter<"system_health_metrics"> | Decimal | DecimalJsLike | number | string | null
    avg_api_response_time_ms?: IntNullableFilter<"system_health_metrics"> | number | null
    voice_api_success_rate?: DecimalNullableFilter<"system_health_metrics"> | Decimal | DecimalJsLike | number | string | null
    database_connection_pool_usage?: DecimalNullableFilter<"system_health_metrics"> | Decimal | DecimalJsLike | number | string | null
    error_rate_percentage?: DecimalNullableFilter<"system_health_metrics"> | Decimal | DecimalJsLike | number | string | null
    created_at?: DateTimeNullableFilter<"system_health_metrics"> | Date | string | null
  }, "id" | "metric_date">

  export type system_health_metricsOrderByWithAggregationInput = {
    id?: SortOrder
    metric_date?: SortOrderInput | SortOrder
    api_uptime_percentage?: SortOrderInput | SortOrder
    avg_api_response_time_ms?: SortOrderInput | SortOrder
    voice_api_success_rate?: SortOrderInput | SortOrder
    database_connection_pool_usage?: SortOrderInput | SortOrder
    error_rate_percentage?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: system_health_metricsCountOrderByAggregateInput
    _avg?: system_health_metricsAvgOrderByAggregateInput
    _max?: system_health_metricsMaxOrderByAggregateInput
    _min?: system_health_metricsMinOrderByAggregateInput
    _sum?: system_health_metricsSumOrderByAggregateInput
  }

  export type system_health_metricsScalarWhereWithAggregatesInput = {
    AND?: system_health_metricsScalarWhereWithAggregatesInput | system_health_metricsScalarWhereWithAggregatesInput[]
    OR?: system_health_metricsScalarWhereWithAggregatesInput[]
    NOT?: system_health_metricsScalarWhereWithAggregatesInput | system_health_metricsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"system_health_metrics"> | number
    metric_date?: DateTimeNullableWithAggregatesFilter<"system_health_metrics"> | Date | string | null
    api_uptime_percentage?: DecimalNullableWithAggregatesFilter<"system_health_metrics"> | Decimal | DecimalJsLike | number | string | null
    avg_api_response_time_ms?: IntNullableWithAggregatesFilter<"system_health_metrics"> | number | null
    voice_api_success_rate?: DecimalNullableWithAggregatesFilter<"system_health_metrics"> | Decimal | DecimalJsLike | number | string | null
    database_connection_pool_usage?: DecimalNullableWithAggregatesFilter<"system_health_metrics"> | Decimal | DecimalJsLike | number | string | null
    error_rate_percentage?: DecimalNullableWithAggregatesFilter<"system_health_metrics"> | Decimal | DecimalJsLike | number | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"system_health_metrics"> | Date | string | null
  }

  export type user_interactionsWhereInput = {
    AND?: user_interactionsWhereInput | user_interactionsWhereInput[]
    OR?: user_interactionsWhereInput[]
    NOT?: user_interactionsWhereInput | user_interactionsWhereInput[]
    id?: IntFilter<"user_interactions"> | number
    user_email?: StringNullableFilter<"user_interactions"> | string | null
    agent_id?: IntNullableFilter<"user_interactions"> | number | null
    action?: StringNullableFilter<"user_interactions"> | string | null
    metadata?: JsonNullableFilter<"user_interactions">
    context_at_interaction?: JsonNullableFilter<"user_interactions">
    device_context?: JsonNullableFilter<"user_interactions">
    environmental_context?: JsonNullableFilter<"user_interactions">
    user_satisfaction?: DecimalNullableFilter<"user_interactions"> | Decimal | DecimalJsLike | number | string | null
    context_relevance?: DecimalNullableFilter<"user_interactions"> | Decimal | DecimalJsLike | number | string | null
    optimization_data?: JsonNullableFilter<"user_interactions">
    created_at?: DateTimeNullableFilter<"user_interactions"> | Date | string | null
    agents?: XOR<AgentsNullableScalarRelationFilter, agentsWhereInput> | null
  }

  export type user_interactionsOrderByWithRelationInput = {
    id?: SortOrder
    user_email?: SortOrderInput | SortOrder
    agent_id?: SortOrderInput | SortOrder
    action?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    context_at_interaction?: SortOrderInput | SortOrder
    device_context?: SortOrderInput | SortOrder
    environmental_context?: SortOrderInput | SortOrder
    user_satisfaction?: SortOrderInput | SortOrder
    context_relevance?: SortOrderInput | SortOrder
    optimization_data?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    agents?: agentsOrderByWithRelationInput
  }

  export type user_interactionsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: user_interactionsWhereInput | user_interactionsWhereInput[]
    OR?: user_interactionsWhereInput[]
    NOT?: user_interactionsWhereInput | user_interactionsWhereInput[]
    user_email?: StringNullableFilter<"user_interactions"> | string | null
    agent_id?: IntNullableFilter<"user_interactions"> | number | null
    action?: StringNullableFilter<"user_interactions"> | string | null
    metadata?: JsonNullableFilter<"user_interactions">
    context_at_interaction?: JsonNullableFilter<"user_interactions">
    device_context?: JsonNullableFilter<"user_interactions">
    environmental_context?: JsonNullableFilter<"user_interactions">
    user_satisfaction?: DecimalNullableFilter<"user_interactions"> | Decimal | DecimalJsLike | number | string | null
    context_relevance?: DecimalNullableFilter<"user_interactions"> | Decimal | DecimalJsLike | number | string | null
    optimization_data?: JsonNullableFilter<"user_interactions">
    created_at?: DateTimeNullableFilter<"user_interactions"> | Date | string | null
    agents?: XOR<AgentsNullableScalarRelationFilter, agentsWhereInput> | null
  }, "id">

  export type user_interactionsOrderByWithAggregationInput = {
    id?: SortOrder
    user_email?: SortOrderInput | SortOrder
    agent_id?: SortOrderInput | SortOrder
    action?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    context_at_interaction?: SortOrderInput | SortOrder
    device_context?: SortOrderInput | SortOrder
    environmental_context?: SortOrderInput | SortOrder
    user_satisfaction?: SortOrderInput | SortOrder
    context_relevance?: SortOrderInput | SortOrder
    optimization_data?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: user_interactionsCountOrderByAggregateInput
    _avg?: user_interactionsAvgOrderByAggregateInput
    _max?: user_interactionsMaxOrderByAggregateInput
    _min?: user_interactionsMinOrderByAggregateInput
    _sum?: user_interactionsSumOrderByAggregateInput
  }

  export type user_interactionsScalarWhereWithAggregatesInput = {
    AND?: user_interactionsScalarWhereWithAggregatesInput | user_interactionsScalarWhereWithAggregatesInput[]
    OR?: user_interactionsScalarWhereWithAggregatesInput[]
    NOT?: user_interactionsScalarWhereWithAggregatesInput | user_interactionsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"user_interactions"> | number
    user_email?: StringNullableWithAggregatesFilter<"user_interactions"> | string | null
    agent_id?: IntNullableWithAggregatesFilter<"user_interactions"> | number | null
    action?: StringNullableWithAggregatesFilter<"user_interactions"> | string | null
    metadata?: JsonNullableWithAggregatesFilter<"user_interactions">
    context_at_interaction?: JsonNullableWithAggregatesFilter<"user_interactions">
    device_context?: JsonNullableWithAggregatesFilter<"user_interactions">
    environmental_context?: JsonNullableWithAggregatesFilter<"user_interactions">
    user_satisfaction?: DecimalNullableWithAggregatesFilter<"user_interactions"> | Decimal | DecimalJsLike | number | string | null
    context_relevance?: DecimalNullableWithAggregatesFilter<"user_interactions"> | Decimal | DecimalJsLike | number | string | null
    optimization_data?: JsonNullableWithAggregatesFilter<"user_interactions">
    created_at?: DateTimeNullableWithAggregatesFilter<"user_interactions"> | Date | string | null
  }

  export type voice_samplesWhereInput = {
    AND?: voice_samplesWhereInput | voice_samplesWhereInput[]
    OR?: voice_samplesWhereInput[]
    NOT?: voice_samplesWhereInput | voice_samplesWhereInput[]
    id?: IntFilter<"voice_samples"> | number
    agent_id?: IntNullableFilter<"voice_samples"> | number | null
    sample_text?: StringNullableFilter<"voice_samples"> | string | null
    elevenlabs_audio_url?: StringNullableFilter<"voice_samples"> | string | null
    duration_seconds?: IntNullableFilter<"voice_samples"> | number | null
    environmental_variants?: JsonNullableFilter<"voice_samples">
    noise_optimization?: JsonNullableFilter<"voice_samples">
    device_optimization?: JsonNullableFilter<"voice_samples">
    created_at?: DateTimeNullableFilter<"voice_samples"> | Date | string | null
    agents?: XOR<AgentsNullableScalarRelationFilter, agentsWhereInput> | null
  }

  export type voice_samplesOrderByWithRelationInput = {
    id?: SortOrder
    agent_id?: SortOrderInput | SortOrder
    sample_text?: SortOrderInput | SortOrder
    elevenlabs_audio_url?: SortOrderInput | SortOrder
    duration_seconds?: SortOrderInput | SortOrder
    environmental_variants?: SortOrderInput | SortOrder
    noise_optimization?: SortOrderInput | SortOrder
    device_optimization?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    agents?: agentsOrderByWithRelationInput
  }

  export type voice_samplesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: voice_samplesWhereInput | voice_samplesWhereInput[]
    OR?: voice_samplesWhereInput[]
    NOT?: voice_samplesWhereInput | voice_samplesWhereInput[]
    agent_id?: IntNullableFilter<"voice_samples"> | number | null
    sample_text?: StringNullableFilter<"voice_samples"> | string | null
    elevenlabs_audio_url?: StringNullableFilter<"voice_samples"> | string | null
    duration_seconds?: IntNullableFilter<"voice_samples"> | number | null
    environmental_variants?: JsonNullableFilter<"voice_samples">
    noise_optimization?: JsonNullableFilter<"voice_samples">
    device_optimization?: JsonNullableFilter<"voice_samples">
    created_at?: DateTimeNullableFilter<"voice_samples"> | Date | string | null
    agents?: XOR<AgentsNullableScalarRelationFilter, agentsWhereInput> | null
  }, "id">

  export type voice_samplesOrderByWithAggregationInput = {
    id?: SortOrder
    agent_id?: SortOrderInput | SortOrder
    sample_text?: SortOrderInput | SortOrder
    elevenlabs_audio_url?: SortOrderInput | SortOrder
    duration_seconds?: SortOrderInput | SortOrder
    environmental_variants?: SortOrderInput | SortOrder
    noise_optimization?: SortOrderInput | SortOrder
    device_optimization?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: voice_samplesCountOrderByAggregateInput
    _avg?: voice_samplesAvgOrderByAggregateInput
    _max?: voice_samplesMaxOrderByAggregateInput
    _min?: voice_samplesMinOrderByAggregateInput
    _sum?: voice_samplesSumOrderByAggregateInput
  }

  export type voice_samplesScalarWhereWithAggregatesInput = {
    AND?: voice_samplesScalarWhereWithAggregatesInput | voice_samplesScalarWhereWithAggregatesInput[]
    OR?: voice_samplesScalarWhereWithAggregatesInput[]
    NOT?: voice_samplesScalarWhereWithAggregatesInput | voice_samplesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"voice_samples"> | number
    agent_id?: IntNullableWithAggregatesFilter<"voice_samples"> | number | null
    sample_text?: StringNullableWithAggregatesFilter<"voice_samples"> | string | null
    elevenlabs_audio_url?: StringNullableWithAggregatesFilter<"voice_samples"> | string | null
    duration_seconds?: IntNullableWithAggregatesFilter<"voice_samples"> | number | null
    environmental_variants?: JsonNullableWithAggregatesFilter<"voice_samples">
    noise_optimization?: JsonNullableWithAggregatesFilter<"voice_samples">
    device_optimization?: JsonNullableWithAggregatesFilter<"voice_samples">
    created_at?: DateTimeNullableWithAggregatesFilter<"voice_samples"> | Date | string | null
  }

  export type agent_feedbackCreateInput = {
    rating?: number | null
    feedback_text?: string | null
    language_used?: string | null
    user_session_id?: string | null
    created_at?: Date | string | null
    agents_custom?: agents_customCreateNestedOneWithoutAgent_feedbackInput
  }

  export type agent_feedbackUncheckedCreateInput = {
    id?: number
    agent_id?: number | null
    rating?: number | null
    feedback_text?: string | null
    language_used?: string | null
    user_session_id?: string | null
    created_at?: Date | string | null
  }

  export type agent_feedbackUpdateInput = {
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    feedback_text?: NullableStringFieldUpdateOperationsInput | string | null
    language_used?: NullableStringFieldUpdateOperationsInput | string | null
    user_session_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agents_custom?: agents_customUpdateOneWithoutAgent_feedbackNestedInput
  }

  export type agent_feedbackUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    agent_id?: NullableIntFieldUpdateOperationsInput | number | null
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    feedback_text?: NullableStringFieldUpdateOperationsInput | string | null
    language_used?: NullableStringFieldUpdateOperationsInput | string | null
    user_session_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type agent_feedbackCreateManyInput = {
    id?: number
    agent_id?: number | null
    rating?: number | null
    feedback_text?: string | null
    language_used?: string | null
    user_session_id?: string | null
    created_at?: Date | string | null
  }

  export type agent_feedbackUpdateManyMutationInput = {
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    feedback_text?: NullableStringFieldUpdateOperationsInput | string | null
    language_used?: NullableStringFieldUpdateOperationsInput | string | null
    user_session_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type agent_feedbackUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    agent_id?: NullableIntFieldUpdateOperationsInput | number | null
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    feedback_text?: NullableStringFieldUpdateOperationsInput | string | null
    language_used?: NullableStringFieldUpdateOperationsInput | string | null
    user_session_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type agent_languagesCreateInput = {
    language_code: string
    personality_translation?: string | null
    voice_id?: string | null
    voice_settings?: NullableJsonNullValueInput | InputJsonValue
    is_primary?: boolean | null
    created_at?: Date | string | null
    agents_custom?: agents_customCreateNestedOneWithoutAgent_languagesInput
  }

  export type agent_languagesUncheckedCreateInput = {
    id?: number
    agent_id?: number | null
    language_code: string
    personality_translation?: string | null
    voice_id?: string | null
    voice_settings?: NullableJsonNullValueInput | InputJsonValue
    is_primary?: boolean | null
    created_at?: Date | string | null
  }

  export type agent_languagesUpdateInput = {
    language_code?: StringFieldUpdateOperationsInput | string
    personality_translation?: NullableStringFieldUpdateOperationsInput | string | null
    voice_id?: NullableStringFieldUpdateOperationsInput | string | null
    voice_settings?: NullableJsonNullValueInput | InputJsonValue
    is_primary?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agents_custom?: agents_customUpdateOneWithoutAgent_languagesNestedInput
  }

  export type agent_languagesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    agent_id?: NullableIntFieldUpdateOperationsInput | number | null
    language_code?: StringFieldUpdateOperationsInput | string
    personality_translation?: NullableStringFieldUpdateOperationsInput | string | null
    voice_id?: NullableStringFieldUpdateOperationsInput | string | null
    voice_settings?: NullableJsonNullValueInput | InputJsonValue
    is_primary?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type agent_languagesCreateManyInput = {
    id?: number
    agent_id?: number | null
    language_code: string
    personality_translation?: string | null
    voice_id?: string | null
    voice_settings?: NullableJsonNullValueInput | InputJsonValue
    is_primary?: boolean | null
    created_at?: Date | string | null
  }

  export type agent_languagesUpdateManyMutationInput = {
    language_code?: StringFieldUpdateOperationsInput | string
    personality_translation?: NullableStringFieldUpdateOperationsInput | string | null
    voice_id?: NullableStringFieldUpdateOperationsInput | string | null
    voice_settings?: NullableJsonNullValueInput | InputJsonValue
    is_primary?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type agent_languagesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    agent_id?: NullableIntFieldUpdateOperationsInput | number | null
    language_code?: StringFieldUpdateOperationsInput | string
    personality_translation?: NullableStringFieldUpdateOperationsInput | string | null
    voice_id?: NullableStringFieldUpdateOperationsInput | string | null
    voice_settings?: NullableJsonNullValueInput | InputJsonValue
    is_primary?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type agent_performance_metricsCreateInput = {
    metric_date?: Date | string | null
    total_interactions?: number | null
    successful_interactions?: number | null
    avg_response_time_ms?: number | null
    voice_generation_count?: number | null
    error_count?: number | null
    language_breakdown?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string | null
    updated_at?: Date | string | null
    agents_custom?: agents_customCreateNestedOneWithoutAgent_performance_metricsInput
  }

  export type agent_performance_metricsUncheckedCreateInput = {
    id?: number
    agent_id?: number | null
    metric_date?: Date | string | null
    total_interactions?: number | null
    successful_interactions?: number | null
    avg_response_time_ms?: number | null
    voice_generation_count?: number | null
    error_count?: number | null
    language_breakdown?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type agent_performance_metricsUpdateInput = {
    metric_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    total_interactions?: NullableIntFieldUpdateOperationsInput | number | null
    successful_interactions?: NullableIntFieldUpdateOperationsInput | number | null
    avg_response_time_ms?: NullableIntFieldUpdateOperationsInput | number | null
    voice_generation_count?: NullableIntFieldUpdateOperationsInput | number | null
    error_count?: NullableIntFieldUpdateOperationsInput | number | null
    language_breakdown?: NullableJsonNullValueInput | InputJsonValue
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agents_custom?: agents_customUpdateOneWithoutAgent_performance_metricsNestedInput
  }

  export type agent_performance_metricsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    agent_id?: NullableIntFieldUpdateOperationsInput | number | null
    metric_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    total_interactions?: NullableIntFieldUpdateOperationsInput | number | null
    successful_interactions?: NullableIntFieldUpdateOperationsInput | number | null
    avg_response_time_ms?: NullableIntFieldUpdateOperationsInput | number | null
    voice_generation_count?: NullableIntFieldUpdateOperationsInput | number | null
    error_count?: NullableIntFieldUpdateOperationsInput | number | null
    language_breakdown?: NullableJsonNullValueInput | InputJsonValue
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type agent_performance_metricsCreateManyInput = {
    id?: number
    agent_id?: number | null
    metric_date?: Date | string | null
    total_interactions?: number | null
    successful_interactions?: number | null
    avg_response_time_ms?: number | null
    voice_generation_count?: number | null
    error_count?: number | null
    language_breakdown?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type agent_performance_metricsUpdateManyMutationInput = {
    metric_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    total_interactions?: NullableIntFieldUpdateOperationsInput | number | null
    successful_interactions?: NullableIntFieldUpdateOperationsInput | number | null
    avg_response_time_ms?: NullableIntFieldUpdateOperationsInput | number | null
    voice_generation_count?: NullableIntFieldUpdateOperationsInput | number | null
    error_count?: NullableIntFieldUpdateOperationsInput | number | null
    language_breakdown?: NullableJsonNullValueInput | InputJsonValue
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type agent_performance_metricsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    agent_id?: NullableIntFieldUpdateOperationsInput | number | null
    metric_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    total_interactions?: NullableIntFieldUpdateOperationsInput | number | null
    successful_interactions?: NullableIntFieldUpdateOperationsInput | number | null
    avg_response_time_ms?: NullableIntFieldUpdateOperationsInput | number | null
    voice_generation_count?: NullableIntFieldUpdateOperationsInput | number | null
    error_count?: NullableIntFieldUpdateOperationsInput | number | null
    language_breakdown?: NullableJsonNullValueInput | InputJsonValue
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type agent_usage_eventsCreateInput = {
    event_type: string
    event_data?: NullableJsonNullValueInput | InputJsonValue
    user_session_id?: string | null
    ip_address?: string | null
    user_agent?: string | null
    language_used?: string | null
    created_at?: Date | string | null
    agents_custom?: agents_customCreateNestedOneWithoutAgent_usage_eventsInput
  }

  export type agent_usage_eventsUncheckedCreateInput = {
    id?: number
    agent_id?: number | null
    event_type: string
    event_data?: NullableJsonNullValueInput | InputJsonValue
    user_session_id?: string | null
    ip_address?: string | null
    user_agent?: string | null
    language_used?: string | null
    created_at?: Date | string | null
  }

  export type agent_usage_eventsUpdateInput = {
    event_type?: StringFieldUpdateOperationsInput | string
    event_data?: NullableJsonNullValueInput | InputJsonValue
    user_session_id?: NullableStringFieldUpdateOperationsInput | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    language_used?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agents_custom?: agents_customUpdateOneWithoutAgent_usage_eventsNestedInput
  }

  export type agent_usage_eventsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    agent_id?: NullableIntFieldUpdateOperationsInput | number | null
    event_type?: StringFieldUpdateOperationsInput | string
    event_data?: NullableJsonNullValueInput | InputJsonValue
    user_session_id?: NullableStringFieldUpdateOperationsInput | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    language_used?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type agent_usage_eventsCreateManyInput = {
    id?: number
    agent_id?: number | null
    event_type: string
    event_data?: NullableJsonNullValueInput | InputJsonValue
    user_session_id?: string | null
    ip_address?: string | null
    user_agent?: string | null
    language_used?: string | null
    created_at?: Date | string | null
  }

  export type agent_usage_eventsUpdateManyMutationInput = {
    event_type?: StringFieldUpdateOperationsInput | string
    event_data?: NullableJsonNullValueInput | InputJsonValue
    user_session_id?: NullableStringFieldUpdateOperationsInput | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    language_used?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type agent_usage_eventsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    agent_id?: NullableIntFieldUpdateOperationsInput | number | null
    event_type?: StringFieldUpdateOperationsInput | string
    event_data?: NullableJsonNullValueInput | InputJsonValue
    user_session_id?: NullableStringFieldUpdateOperationsInput | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    language_used?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type agentsCreateInput = {
    name: string
    company?: string | null
    category?: string | null
    description?: string | null
    personality?: string | null
    pricing_half_day?: Decimal | DecimalJsLike | number | string | null
    pricing_full_day?: Decimal | DecimalJsLike | number | string | null
    pricing_per_minute?: Decimal | DecimalJsLike | number | string | null
    elevenlabs_voice_id?: string | null
    voice_sample_url?: string | null
    voice_characteristics?: NullableJsonNullValueInput | InputJsonValue
    context7_profile?: NullableJsonNullValueInput | InputJsonValue
    environmental_suitability?: NullableJsonNullValueInput | InputJsonValue
    performance_by_context?: NullableJsonNullValueInput | InputJsonValue
    gemini_personality_prompt?: string | null
    ai_optimization_score?: Decimal | DecimalJsLike | number | string | null
    success_rate?: string | null
    avg_call_time?: string | null
    rating?: Decimal | DecimalJsLike | number | string | null
    reviews?: number | null
    integrations?: agentsCreateintegrationsInput | string[]
    industries?: agentsCreateindustriesInput | string[]
    stages?: number | null
    demo_available?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    rentals?: rentalsCreateNestedManyWithoutAgentsInput
    user_interactions?: user_interactionsCreateNestedManyWithoutAgentsInput
    voice_samples?: voice_samplesCreateNestedManyWithoutAgentsInput
  }

  export type agentsUncheckedCreateInput = {
    id?: number
    name: string
    company?: string | null
    category?: string | null
    description?: string | null
    personality?: string | null
    pricing_half_day?: Decimal | DecimalJsLike | number | string | null
    pricing_full_day?: Decimal | DecimalJsLike | number | string | null
    pricing_per_minute?: Decimal | DecimalJsLike | number | string | null
    elevenlabs_voice_id?: string | null
    voice_sample_url?: string | null
    voice_characteristics?: NullableJsonNullValueInput | InputJsonValue
    context7_profile?: NullableJsonNullValueInput | InputJsonValue
    environmental_suitability?: NullableJsonNullValueInput | InputJsonValue
    performance_by_context?: NullableJsonNullValueInput | InputJsonValue
    gemini_personality_prompt?: string | null
    ai_optimization_score?: Decimal | DecimalJsLike | number | string | null
    success_rate?: string | null
    avg_call_time?: string | null
    rating?: Decimal | DecimalJsLike | number | string | null
    reviews?: number | null
    integrations?: agentsCreateintegrationsInput | string[]
    industries?: agentsCreateindustriesInput | string[]
    stages?: number | null
    demo_available?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    rentals?: rentalsUncheckedCreateNestedManyWithoutAgentsInput
    user_interactions?: user_interactionsUncheckedCreateNestedManyWithoutAgentsInput
    voice_samples?: voice_samplesUncheckedCreateNestedManyWithoutAgentsInput
  }

  export type agentsUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    personality?: NullableStringFieldUpdateOperationsInput | string | null
    pricing_half_day?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    pricing_full_day?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    pricing_per_minute?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    elevenlabs_voice_id?: NullableStringFieldUpdateOperationsInput | string | null
    voice_sample_url?: NullableStringFieldUpdateOperationsInput | string | null
    voice_characteristics?: NullableJsonNullValueInput | InputJsonValue
    context7_profile?: NullableJsonNullValueInput | InputJsonValue
    environmental_suitability?: NullableJsonNullValueInput | InputJsonValue
    performance_by_context?: NullableJsonNullValueInput | InputJsonValue
    gemini_personality_prompt?: NullableStringFieldUpdateOperationsInput | string | null
    ai_optimization_score?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    success_rate?: NullableStringFieldUpdateOperationsInput | string | null
    avg_call_time?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    reviews?: NullableIntFieldUpdateOperationsInput | number | null
    integrations?: agentsUpdateintegrationsInput | string[]
    industries?: agentsUpdateindustriesInput | string[]
    stages?: NullableIntFieldUpdateOperationsInput | number | null
    demo_available?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rentals?: rentalsUpdateManyWithoutAgentsNestedInput
    user_interactions?: user_interactionsUpdateManyWithoutAgentsNestedInput
    voice_samples?: voice_samplesUpdateManyWithoutAgentsNestedInput
  }

  export type agentsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    personality?: NullableStringFieldUpdateOperationsInput | string | null
    pricing_half_day?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    pricing_full_day?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    pricing_per_minute?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    elevenlabs_voice_id?: NullableStringFieldUpdateOperationsInput | string | null
    voice_sample_url?: NullableStringFieldUpdateOperationsInput | string | null
    voice_characteristics?: NullableJsonNullValueInput | InputJsonValue
    context7_profile?: NullableJsonNullValueInput | InputJsonValue
    environmental_suitability?: NullableJsonNullValueInput | InputJsonValue
    performance_by_context?: NullableJsonNullValueInput | InputJsonValue
    gemini_personality_prompt?: NullableStringFieldUpdateOperationsInput | string | null
    ai_optimization_score?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    success_rate?: NullableStringFieldUpdateOperationsInput | string | null
    avg_call_time?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    reviews?: NullableIntFieldUpdateOperationsInput | number | null
    integrations?: agentsUpdateintegrationsInput | string[]
    industries?: agentsUpdateindustriesInput | string[]
    stages?: NullableIntFieldUpdateOperationsInput | number | null
    demo_available?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rentals?: rentalsUncheckedUpdateManyWithoutAgentsNestedInput
    user_interactions?: user_interactionsUncheckedUpdateManyWithoutAgentsNestedInput
    voice_samples?: voice_samplesUncheckedUpdateManyWithoutAgentsNestedInput
  }

  export type agentsCreateManyInput = {
    id?: number
    name: string
    company?: string | null
    category?: string | null
    description?: string | null
    personality?: string | null
    pricing_half_day?: Decimal | DecimalJsLike | number | string | null
    pricing_full_day?: Decimal | DecimalJsLike | number | string | null
    pricing_per_minute?: Decimal | DecimalJsLike | number | string | null
    elevenlabs_voice_id?: string | null
    voice_sample_url?: string | null
    voice_characteristics?: NullableJsonNullValueInput | InputJsonValue
    context7_profile?: NullableJsonNullValueInput | InputJsonValue
    environmental_suitability?: NullableJsonNullValueInput | InputJsonValue
    performance_by_context?: NullableJsonNullValueInput | InputJsonValue
    gemini_personality_prompt?: string | null
    ai_optimization_score?: Decimal | DecimalJsLike | number | string | null
    success_rate?: string | null
    avg_call_time?: string | null
    rating?: Decimal | DecimalJsLike | number | string | null
    reviews?: number | null
    integrations?: agentsCreateintegrationsInput | string[]
    industries?: agentsCreateindustriesInput | string[]
    stages?: number | null
    demo_available?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type agentsUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    personality?: NullableStringFieldUpdateOperationsInput | string | null
    pricing_half_day?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    pricing_full_day?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    pricing_per_minute?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    elevenlabs_voice_id?: NullableStringFieldUpdateOperationsInput | string | null
    voice_sample_url?: NullableStringFieldUpdateOperationsInput | string | null
    voice_characteristics?: NullableJsonNullValueInput | InputJsonValue
    context7_profile?: NullableJsonNullValueInput | InputJsonValue
    environmental_suitability?: NullableJsonNullValueInput | InputJsonValue
    performance_by_context?: NullableJsonNullValueInput | InputJsonValue
    gemini_personality_prompt?: NullableStringFieldUpdateOperationsInput | string | null
    ai_optimization_score?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    success_rate?: NullableStringFieldUpdateOperationsInput | string | null
    avg_call_time?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    reviews?: NullableIntFieldUpdateOperationsInput | number | null
    integrations?: agentsUpdateintegrationsInput | string[]
    industries?: agentsUpdateindustriesInput | string[]
    stages?: NullableIntFieldUpdateOperationsInput | number | null
    demo_available?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type agentsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    personality?: NullableStringFieldUpdateOperationsInput | string | null
    pricing_half_day?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    pricing_full_day?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    pricing_per_minute?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    elevenlabs_voice_id?: NullableStringFieldUpdateOperationsInput | string | null
    voice_sample_url?: NullableStringFieldUpdateOperationsInput | string | null
    voice_characteristics?: NullableJsonNullValueInput | InputJsonValue
    context7_profile?: NullableJsonNullValueInput | InputJsonValue
    environmental_suitability?: NullableJsonNullValueInput | InputJsonValue
    performance_by_context?: NullableJsonNullValueInput | InputJsonValue
    gemini_personality_prompt?: NullableStringFieldUpdateOperationsInput | string | null
    ai_optimization_score?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    success_rate?: NullableStringFieldUpdateOperationsInput | string | null
    avg_call_time?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    reviews?: NullableIntFieldUpdateOperationsInput | number | null
    integrations?: agentsUpdateintegrationsInput | string[]
    industries?: agentsUpdateindustriesInput | string[]
    stages?: NullableIntFieldUpdateOperationsInput | number | null
    demo_available?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type agents_customCreateInput = {
    user_id?: string | null
    name: string
    template_id: string
    personality: string
    voice_id: string
    voice_settings?: NullableJsonNullValueInput | InputJsonValue
    environment_setting?: string | null
    integrations?: NullableJsonNullValueInput | InputJsonValue
    pricing?: NullableJsonNullValueInput | InputJsonValue
    status?: string | null
    demo_available?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    agent_feedback?: agent_feedbackCreateNestedManyWithoutAgents_customInput
    agent_languages?: agent_languagesCreateNestedManyWithoutAgents_customInput
    agent_performance_metrics?: agent_performance_metricsCreateNestedManyWithoutAgents_customInput
    agent_usage_events?: agent_usage_eventsCreateNestedManyWithoutAgents_customInput
  }

  export type agents_customUncheckedCreateInput = {
    id?: number
    user_id?: string | null
    name: string
    template_id: string
    personality: string
    voice_id: string
    voice_settings?: NullableJsonNullValueInput | InputJsonValue
    environment_setting?: string | null
    integrations?: NullableJsonNullValueInput | InputJsonValue
    pricing?: NullableJsonNullValueInput | InputJsonValue
    status?: string | null
    demo_available?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    agent_feedback?: agent_feedbackUncheckedCreateNestedManyWithoutAgents_customInput
    agent_languages?: agent_languagesUncheckedCreateNestedManyWithoutAgents_customInput
    agent_performance_metrics?: agent_performance_metricsUncheckedCreateNestedManyWithoutAgents_customInput
    agent_usage_events?: agent_usage_eventsUncheckedCreateNestedManyWithoutAgents_customInput
  }

  export type agents_customUpdateInput = {
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    template_id?: StringFieldUpdateOperationsInput | string
    personality?: StringFieldUpdateOperationsInput | string
    voice_id?: StringFieldUpdateOperationsInput | string
    voice_settings?: NullableJsonNullValueInput | InputJsonValue
    environment_setting?: NullableStringFieldUpdateOperationsInput | string | null
    integrations?: NullableJsonNullValueInput | InputJsonValue
    pricing?: NullableJsonNullValueInput | InputJsonValue
    status?: NullableStringFieldUpdateOperationsInput | string | null
    demo_available?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agent_feedback?: agent_feedbackUpdateManyWithoutAgents_customNestedInput
    agent_languages?: agent_languagesUpdateManyWithoutAgents_customNestedInput
    agent_performance_metrics?: agent_performance_metricsUpdateManyWithoutAgents_customNestedInput
    agent_usage_events?: agent_usage_eventsUpdateManyWithoutAgents_customNestedInput
  }

  export type agents_customUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    template_id?: StringFieldUpdateOperationsInput | string
    personality?: StringFieldUpdateOperationsInput | string
    voice_id?: StringFieldUpdateOperationsInput | string
    voice_settings?: NullableJsonNullValueInput | InputJsonValue
    environment_setting?: NullableStringFieldUpdateOperationsInput | string | null
    integrations?: NullableJsonNullValueInput | InputJsonValue
    pricing?: NullableJsonNullValueInput | InputJsonValue
    status?: NullableStringFieldUpdateOperationsInput | string | null
    demo_available?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agent_feedback?: agent_feedbackUncheckedUpdateManyWithoutAgents_customNestedInput
    agent_languages?: agent_languagesUncheckedUpdateManyWithoutAgents_customNestedInput
    agent_performance_metrics?: agent_performance_metricsUncheckedUpdateManyWithoutAgents_customNestedInput
    agent_usage_events?: agent_usage_eventsUncheckedUpdateManyWithoutAgents_customNestedInput
  }

  export type agents_customCreateManyInput = {
    id?: number
    user_id?: string | null
    name: string
    template_id: string
    personality: string
    voice_id: string
    voice_settings?: NullableJsonNullValueInput | InputJsonValue
    environment_setting?: string | null
    integrations?: NullableJsonNullValueInput | InputJsonValue
    pricing?: NullableJsonNullValueInput | InputJsonValue
    status?: string | null
    demo_available?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type agents_customUpdateManyMutationInput = {
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    template_id?: StringFieldUpdateOperationsInput | string
    personality?: StringFieldUpdateOperationsInput | string
    voice_id?: StringFieldUpdateOperationsInput | string
    voice_settings?: NullableJsonNullValueInput | InputJsonValue
    environment_setting?: NullableStringFieldUpdateOperationsInput | string | null
    integrations?: NullableJsonNullValueInput | InputJsonValue
    pricing?: NullableJsonNullValueInput | InputJsonValue
    status?: NullableStringFieldUpdateOperationsInput | string | null
    demo_available?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type agents_customUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    template_id?: StringFieldUpdateOperationsInput | string
    personality?: StringFieldUpdateOperationsInput | string
    voice_id?: StringFieldUpdateOperationsInput | string
    voice_settings?: NullableJsonNullValueInput | InputJsonValue
    environment_setting?: NullableStringFieldUpdateOperationsInput | string | null
    integrations?: NullableJsonNullValueInput | InputJsonValue
    pricing?: NullableJsonNullValueInput | InputJsonValue
    status?: NullableStringFieldUpdateOperationsInput | string | null
    demo_available?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type contractor_contextCreateInput = {
    user_email: string
    user_name?: string | null
    expertise_level?: string | null
    primary_trade?: string | null
    company_size?: string | null
    years_experience?: number | null
    specializations?: contractor_contextCreatespecializationsInput | string[]
    typical_job_sites?: NullableJsonNullValueInput | InputJsonValue
    noise_tolerance?: string | null
    safety_requirements?: NullableJsonNullValueInput | InputJsonValue
    geographic_region?: string | null
    climate_considerations?: NullableJsonNullValueInput | InputJsonValue
    preferred_call_times?: NullableJsonNullValueInput | InputJsonValue
    timezone?: string | null
    project_phases?: NullableJsonNullValueInput | InputJsonValue
    seasonal_patterns?: NullableJsonNullValueInput | InputJsonValue
    urgency_patterns?: string | null
    primary_device?: string | null
    network_quality?: string | null
    preferred_integrations?: contractor_contextCreatepreferred_integrationsInput | string[]
    technical_comfort_level?: string | null
    voice_quality_requirements?: string | null
    budget_range?: string | null
    roi_requirements?: Decimal | DecimalJsLike | number | string | null
    rental_frequency?: string | null
    payment_preferences?: string | null
    cost_sensitivity?: string | null
    communication_style?: string | null
    team_structure?: NullableJsonNullValueInput | InputJsonValue
    client_interaction_style?: string | null
    decision_making_style?: string | null
    cultural_considerations?: NullableJsonNullValueInput | InputJsonValue
    success_metrics?: NullableJsonNullValueInput | InputJsonValue
    preferred_agent_types?: contractor_contextCreatepreferred_agent_typesInput | string[]
    optimization_preferences?: NullableJsonNullValueInput | InputJsonValue
    learning_preferences?: string | null
    feedback_patterns?: NullableJsonNullValueInput | InputJsonValue
    context_confidence_score?: Decimal | DecimalJsLike | number | string | null
    last_context_update?: Date | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type contractor_contextUncheckedCreateInput = {
    id?: number
    user_email: string
    user_name?: string | null
    expertise_level?: string | null
    primary_trade?: string | null
    company_size?: string | null
    years_experience?: number | null
    specializations?: contractor_contextCreatespecializationsInput | string[]
    typical_job_sites?: NullableJsonNullValueInput | InputJsonValue
    noise_tolerance?: string | null
    safety_requirements?: NullableJsonNullValueInput | InputJsonValue
    geographic_region?: string | null
    climate_considerations?: NullableJsonNullValueInput | InputJsonValue
    preferred_call_times?: NullableJsonNullValueInput | InputJsonValue
    timezone?: string | null
    project_phases?: NullableJsonNullValueInput | InputJsonValue
    seasonal_patterns?: NullableJsonNullValueInput | InputJsonValue
    urgency_patterns?: string | null
    primary_device?: string | null
    network_quality?: string | null
    preferred_integrations?: contractor_contextCreatepreferred_integrationsInput | string[]
    technical_comfort_level?: string | null
    voice_quality_requirements?: string | null
    budget_range?: string | null
    roi_requirements?: Decimal | DecimalJsLike | number | string | null
    rental_frequency?: string | null
    payment_preferences?: string | null
    cost_sensitivity?: string | null
    communication_style?: string | null
    team_structure?: NullableJsonNullValueInput | InputJsonValue
    client_interaction_style?: string | null
    decision_making_style?: string | null
    cultural_considerations?: NullableJsonNullValueInput | InputJsonValue
    success_metrics?: NullableJsonNullValueInput | InputJsonValue
    preferred_agent_types?: contractor_contextCreatepreferred_agent_typesInput | string[]
    optimization_preferences?: NullableJsonNullValueInput | InputJsonValue
    learning_preferences?: string | null
    feedback_patterns?: NullableJsonNullValueInput | InputJsonValue
    context_confidence_score?: Decimal | DecimalJsLike | number | string | null
    last_context_update?: Date | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type contractor_contextUpdateInput = {
    user_email?: StringFieldUpdateOperationsInput | string
    user_name?: NullableStringFieldUpdateOperationsInput | string | null
    expertise_level?: NullableStringFieldUpdateOperationsInput | string | null
    primary_trade?: NullableStringFieldUpdateOperationsInput | string | null
    company_size?: NullableStringFieldUpdateOperationsInput | string | null
    years_experience?: NullableIntFieldUpdateOperationsInput | number | null
    specializations?: contractor_contextUpdatespecializationsInput | string[]
    typical_job_sites?: NullableJsonNullValueInput | InputJsonValue
    noise_tolerance?: NullableStringFieldUpdateOperationsInput | string | null
    safety_requirements?: NullableJsonNullValueInput | InputJsonValue
    geographic_region?: NullableStringFieldUpdateOperationsInput | string | null
    climate_considerations?: NullableJsonNullValueInput | InputJsonValue
    preferred_call_times?: NullableJsonNullValueInput | InputJsonValue
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    project_phases?: NullableJsonNullValueInput | InputJsonValue
    seasonal_patterns?: NullableJsonNullValueInput | InputJsonValue
    urgency_patterns?: NullableStringFieldUpdateOperationsInput | string | null
    primary_device?: NullableStringFieldUpdateOperationsInput | string | null
    network_quality?: NullableStringFieldUpdateOperationsInput | string | null
    preferred_integrations?: contractor_contextUpdatepreferred_integrationsInput | string[]
    technical_comfort_level?: NullableStringFieldUpdateOperationsInput | string | null
    voice_quality_requirements?: NullableStringFieldUpdateOperationsInput | string | null
    budget_range?: NullableStringFieldUpdateOperationsInput | string | null
    roi_requirements?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    rental_frequency?: NullableStringFieldUpdateOperationsInput | string | null
    payment_preferences?: NullableStringFieldUpdateOperationsInput | string | null
    cost_sensitivity?: NullableStringFieldUpdateOperationsInput | string | null
    communication_style?: NullableStringFieldUpdateOperationsInput | string | null
    team_structure?: NullableJsonNullValueInput | InputJsonValue
    client_interaction_style?: NullableStringFieldUpdateOperationsInput | string | null
    decision_making_style?: NullableStringFieldUpdateOperationsInput | string | null
    cultural_considerations?: NullableJsonNullValueInput | InputJsonValue
    success_metrics?: NullableJsonNullValueInput | InputJsonValue
    preferred_agent_types?: contractor_contextUpdatepreferred_agent_typesInput | string[]
    optimization_preferences?: NullableJsonNullValueInput | InputJsonValue
    learning_preferences?: NullableStringFieldUpdateOperationsInput | string | null
    feedback_patterns?: NullableJsonNullValueInput | InputJsonValue
    context_confidence_score?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    last_context_update?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type contractor_contextUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_email?: StringFieldUpdateOperationsInput | string
    user_name?: NullableStringFieldUpdateOperationsInput | string | null
    expertise_level?: NullableStringFieldUpdateOperationsInput | string | null
    primary_trade?: NullableStringFieldUpdateOperationsInput | string | null
    company_size?: NullableStringFieldUpdateOperationsInput | string | null
    years_experience?: NullableIntFieldUpdateOperationsInput | number | null
    specializations?: contractor_contextUpdatespecializationsInput | string[]
    typical_job_sites?: NullableJsonNullValueInput | InputJsonValue
    noise_tolerance?: NullableStringFieldUpdateOperationsInput | string | null
    safety_requirements?: NullableJsonNullValueInput | InputJsonValue
    geographic_region?: NullableStringFieldUpdateOperationsInput | string | null
    climate_considerations?: NullableJsonNullValueInput | InputJsonValue
    preferred_call_times?: NullableJsonNullValueInput | InputJsonValue
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    project_phases?: NullableJsonNullValueInput | InputJsonValue
    seasonal_patterns?: NullableJsonNullValueInput | InputJsonValue
    urgency_patterns?: NullableStringFieldUpdateOperationsInput | string | null
    primary_device?: NullableStringFieldUpdateOperationsInput | string | null
    network_quality?: NullableStringFieldUpdateOperationsInput | string | null
    preferred_integrations?: contractor_contextUpdatepreferred_integrationsInput | string[]
    technical_comfort_level?: NullableStringFieldUpdateOperationsInput | string | null
    voice_quality_requirements?: NullableStringFieldUpdateOperationsInput | string | null
    budget_range?: NullableStringFieldUpdateOperationsInput | string | null
    roi_requirements?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    rental_frequency?: NullableStringFieldUpdateOperationsInput | string | null
    payment_preferences?: NullableStringFieldUpdateOperationsInput | string | null
    cost_sensitivity?: NullableStringFieldUpdateOperationsInput | string | null
    communication_style?: NullableStringFieldUpdateOperationsInput | string | null
    team_structure?: NullableJsonNullValueInput | InputJsonValue
    client_interaction_style?: NullableStringFieldUpdateOperationsInput | string | null
    decision_making_style?: NullableStringFieldUpdateOperationsInput | string | null
    cultural_considerations?: NullableJsonNullValueInput | InputJsonValue
    success_metrics?: NullableJsonNullValueInput | InputJsonValue
    preferred_agent_types?: contractor_contextUpdatepreferred_agent_typesInput | string[]
    optimization_preferences?: NullableJsonNullValueInput | InputJsonValue
    learning_preferences?: NullableStringFieldUpdateOperationsInput | string | null
    feedback_patterns?: NullableJsonNullValueInput | InputJsonValue
    context_confidence_score?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    last_context_update?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type contractor_contextCreateManyInput = {
    id?: number
    user_email: string
    user_name?: string | null
    expertise_level?: string | null
    primary_trade?: string | null
    company_size?: string | null
    years_experience?: number | null
    specializations?: contractor_contextCreatespecializationsInput | string[]
    typical_job_sites?: NullableJsonNullValueInput | InputJsonValue
    noise_tolerance?: string | null
    safety_requirements?: NullableJsonNullValueInput | InputJsonValue
    geographic_region?: string | null
    climate_considerations?: NullableJsonNullValueInput | InputJsonValue
    preferred_call_times?: NullableJsonNullValueInput | InputJsonValue
    timezone?: string | null
    project_phases?: NullableJsonNullValueInput | InputJsonValue
    seasonal_patterns?: NullableJsonNullValueInput | InputJsonValue
    urgency_patterns?: string | null
    primary_device?: string | null
    network_quality?: string | null
    preferred_integrations?: contractor_contextCreatepreferred_integrationsInput | string[]
    technical_comfort_level?: string | null
    voice_quality_requirements?: string | null
    budget_range?: string | null
    roi_requirements?: Decimal | DecimalJsLike | number | string | null
    rental_frequency?: string | null
    payment_preferences?: string | null
    cost_sensitivity?: string | null
    communication_style?: string | null
    team_structure?: NullableJsonNullValueInput | InputJsonValue
    client_interaction_style?: string | null
    decision_making_style?: string | null
    cultural_considerations?: NullableJsonNullValueInput | InputJsonValue
    success_metrics?: NullableJsonNullValueInput | InputJsonValue
    preferred_agent_types?: contractor_contextCreatepreferred_agent_typesInput | string[]
    optimization_preferences?: NullableJsonNullValueInput | InputJsonValue
    learning_preferences?: string | null
    feedback_patterns?: NullableJsonNullValueInput | InputJsonValue
    context_confidence_score?: Decimal | DecimalJsLike | number | string | null
    last_context_update?: Date | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type contractor_contextUpdateManyMutationInput = {
    user_email?: StringFieldUpdateOperationsInput | string
    user_name?: NullableStringFieldUpdateOperationsInput | string | null
    expertise_level?: NullableStringFieldUpdateOperationsInput | string | null
    primary_trade?: NullableStringFieldUpdateOperationsInput | string | null
    company_size?: NullableStringFieldUpdateOperationsInput | string | null
    years_experience?: NullableIntFieldUpdateOperationsInput | number | null
    specializations?: contractor_contextUpdatespecializationsInput | string[]
    typical_job_sites?: NullableJsonNullValueInput | InputJsonValue
    noise_tolerance?: NullableStringFieldUpdateOperationsInput | string | null
    safety_requirements?: NullableJsonNullValueInput | InputJsonValue
    geographic_region?: NullableStringFieldUpdateOperationsInput | string | null
    climate_considerations?: NullableJsonNullValueInput | InputJsonValue
    preferred_call_times?: NullableJsonNullValueInput | InputJsonValue
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    project_phases?: NullableJsonNullValueInput | InputJsonValue
    seasonal_patterns?: NullableJsonNullValueInput | InputJsonValue
    urgency_patterns?: NullableStringFieldUpdateOperationsInput | string | null
    primary_device?: NullableStringFieldUpdateOperationsInput | string | null
    network_quality?: NullableStringFieldUpdateOperationsInput | string | null
    preferred_integrations?: contractor_contextUpdatepreferred_integrationsInput | string[]
    technical_comfort_level?: NullableStringFieldUpdateOperationsInput | string | null
    voice_quality_requirements?: NullableStringFieldUpdateOperationsInput | string | null
    budget_range?: NullableStringFieldUpdateOperationsInput | string | null
    roi_requirements?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    rental_frequency?: NullableStringFieldUpdateOperationsInput | string | null
    payment_preferences?: NullableStringFieldUpdateOperationsInput | string | null
    cost_sensitivity?: NullableStringFieldUpdateOperationsInput | string | null
    communication_style?: NullableStringFieldUpdateOperationsInput | string | null
    team_structure?: NullableJsonNullValueInput | InputJsonValue
    client_interaction_style?: NullableStringFieldUpdateOperationsInput | string | null
    decision_making_style?: NullableStringFieldUpdateOperationsInput | string | null
    cultural_considerations?: NullableJsonNullValueInput | InputJsonValue
    success_metrics?: NullableJsonNullValueInput | InputJsonValue
    preferred_agent_types?: contractor_contextUpdatepreferred_agent_typesInput | string[]
    optimization_preferences?: NullableJsonNullValueInput | InputJsonValue
    learning_preferences?: NullableStringFieldUpdateOperationsInput | string | null
    feedback_patterns?: NullableJsonNullValueInput | InputJsonValue
    context_confidence_score?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    last_context_update?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type contractor_contextUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_email?: StringFieldUpdateOperationsInput | string
    user_name?: NullableStringFieldUpdateOperationsInput | string | null
    expertise_level?: NullableStringFieldUpdateOperationsInput | string | null
    primary_trade?: NullableStringFieldUpdateOperationsInput | string | null
    company_size?: NullableStringFieldUpdateOperationsInput | string | null
    years_experience?: NullableIntFieldUpdateOperationsInput | number | null
    specializations?: contractor_contextUpdatespecializationsInput | string[]
    typical_job_sites?: NullableJsonNullValueInput | InputJsonValue
    noise_tolerance?: NullableStringFieldUpdateOperationsInput | string | null
    safety_requirements?: NullableJsonNullValueInput | InputJsonValue
    geographic_region?: NullableStringFieldUpdateOperationsInput | string | null
    climate_considerations?: NullableJsonNullValueInput | InputJsonValue
    preferred_call_times?: NullableJsonNullValueInput | InputJsonValue
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    project_phases?: NullableJsonNullValueInput | InputJsonValue
    seasonal_patterns?: NullableJsonNullValueInput | InputJsonValue
    urgency_patterns?: NullableStringFieldUpdateOperationsInput | string | null
    primary_device?: NullableStringFieldUpdateOperationsInput | string | null
    network_quality?: NullableStringFieldUpdateOperationsInput | string | null
    preferred_integrations?: contractor_contextUpdatepreferred_integrationsInput | string[]
    technical_comfort_level?: NullableStringFieldUpdateOperationsInput | string | null
    voice_quality_requirements?: NullableStringFieldUpdateOperationsInput | string | null
    budget_range?: NullableStringFieldUpdateOperationsInput | string | null
    roi_requirements?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    rental_frequency?: NullableStringFieldUpdateOperationsInput | string | null
    payment_preferences?: NullableStringFieldUpdateOperationsInput | string | null
    cost_sensitivity?: NullableStringFieldUpdateOperationsInput | string | null
    communication_style?: NullableStringFieldUpdateOperationsInput | string | null
    team_structure?: NullableJsonNullValueInput | InputJsonValue
    client_interaction_style?: NullableStringFieldUpdateOperationsInput | string | null
    decision_making_style?: NullableStringFieldUpdateOperationsInput | string | null
    cultural_considerations?: NullableJsonNullValueInput | InputJsonValue
    success_metrics?: NullableJsonNullValueInput | InputJsonValue
    preferred_agent_types?: contractor_contextUpdatepreferred_agent_typesInput | string[]
    optimization_preferences?: NullableJsonNullValueInput | InputJsonValue
    learning_preferences?: NullableStringFieldUpdateOperationsInput | string | null
    feedback_patterns?: NullableJsonNullValueInput | InputJsonValue
    context_confidence_score?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    last_context_update?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type rentalsCreateInput = {
    user_email: string
    user_name?: string | null
    rental_type?: string | null
    start_date?: Date | string | null
    end_date?: Date | string | null
    duration_hours?: number | null
    base_price?: Decimal | DecimalJsLike | number | string | null
    context_adjustment?: Decimal | DecimalJsLike | number | string | null
    discount_percent?: Decimal | DecimalJsLike | number | string | null
    total_price?: Decimal | DecimalJsLike | number | string | null
    retell_phone_number?: string | null
    elevenlabs_voice_config?: NullableJsonNullValueInput | InputJsonValue
    gemini_customizations?: NullableJsonNullValueInput | InputJsonValue
    context_snapshot?: NullableJsonNullValueInput | InputJsonValue
    environmental_conditions?: NullableJsonNullValueInput | InputJsonValue
    performance_metrics?: NullableJsonNullValueInput | InputJsonValue
    stripe_payment_intent_id?: string | null
    status?: string | null
    satisfaction_score?: Decimal | DecimalJsLike | number | string | null
    context_match_accuracy?: Decimal | DecimalJsLike | number | string | null
    optimization_suggestions?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string | null
    completed_at?: Date | string | null
    agents?: agentsCreateNestedOneWithoutRentalsInput
  }

  export type rentalsUncheckedCreateInput = {
    id?: number
    agent_id?: number | null
    user_email: string
    user_name?: string | null
    rental_type?: string | null
    start_date?: Date | string | null
    end_date?: Date | string | null
    duration_hours?: number | null
    base_price?: Decimal | DecimalJsLike | number | string | null
    context_adjustment?: Decimal | DecimalJsLike | number | string | null
    discount_percent?: Decimal | DecimalJsLike | number | string | null
    total_price?: Decimal | DecimalJsLike | number | string | null
    retell_phone_number?: string | null
    elevenlabs_voice_config?: NullableJsonNullValueInput | InputJsonValue
    gemini_customizations?: NullableJsonNullValueInput | InputJsonValue
    context_snapshot?: NullableJsonNullValueInput | InputJsonValue
    environmental_conditions?: NullableJsonNullValueInput | InputJsonValue
    performance_metrics?: NullableJsonNullValueInput | InputJsonValue
    stripe_payment_intent_id?: string | null
    status?: string | null
    satisfaction_score?: Decimal | DecimalJsLike | number | string | null
    context_match_accuracy?: Decimal | DecimalJsLike | number | string | null
    optimization_suggestions?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string | null
    completed_at?: Date | string | null
  }

  export type rentalsUpdateInput = {
    user_email?: StringFieldUpdateOperationsInput | string
    user_name?: NullableStringFieldUpdateOperationsInput | string | null
    rental_type?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration_hours?: NullableIntFieldUpdateOperationsInput | number | null
    base_price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    context_adjustment?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    discount_percent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    total_price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    retell_phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    elevenlabs_voice_config?: NullableJsonNullValueInput | InputJsonValue
    gemini_customizations?: NullableJsonNullValueInput | InputJsonValue
    context_snapshot?: NullableJsonNullValueInput | InputJsonValue
    environmental_conditions?: NullableJsonNullValueInput | InputJsonValue
    performance_metrics?: NullableJsonNullValueInput | InputJsonValue
    stripe_payment_intent_id?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    satisfaction_score?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    context_match_accuracy?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    optimization_suggestions?: NullableJsonNullValueInput | InputJsonValue
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agents?: agentsUpdateOneWithoutRentalsNestedInput
  }

  export type rentalsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    agent_id?: NullableIntFieldUpdateOperationsInput | number | null
    user_email?: StringFieldUpdateOperationsInput | string
    user_name?: NullableStringFieldUpdateOperationsInput | string | null
    rental_type?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration_hours?: NullableIntFieldUpdateOperationsInput | number | null
    base_price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    context_adjustment?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    discount_percent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    total_price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    retell_phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    elevenlabs_voice_config?: NullableJsonNullValueInput | InputJsonValue
    gemini_customizations?: NullableJsonNullValueInput | InputJsonValue
    context_snapshot?: NullableJsonNullValueInput | InputJsonValue
    environmental_conditions?: NullableJsonNullValueInput | InputJsonValue
    performance_metrics?: NullableJsonNullValueInput | InputJsonValue
    stripe_payment_intent_id?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    satisfaction_score?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    context_match_accuracy?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    optimization_suggestions?: NullableJsonNullValueInput | InputJsonValue
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type rentalsCreateManyInput = {
    id?: number
    agent_id?: number | null
    user_email: string
    user_name?: string | null
    rental_type?: string | null
    start_date?: Date | string | null
    end_date?: Date | string | null
    duration_hours?: number | null
    base_price?: Decimal | DecimalJsLike | number | string | null
    context_adjustment?: Decimal | DecimalJsLike | number | string | null
    discount_percent?: Decimal | DecimalJsLike | number | string | null
    total_price?: Decimal | DecimalJsLike | number | string | null
    retell_phone_number?: string | null
    elevenlabs_voice_config?: NullableJsonNullValueInput | InputJsonValue
    gemini_customizations?: NullableJsonNullValueInput | InputJsonValue
    context_snapshot?: NullableJsonNullValueInput | InputJsonValue
    environmental_conditions?: NullableJsonNullValueInput | InputJsonValue
    performance_metrics?: NullableJsonNullValueInput | InputJsonValue
    stripe_payment_intent_id?: string | null
    status?: string | null
    satisfaction_score?: Decimal | DecimalJsLike | number | string | null
    context_match_accuracy?: Decimal | DecimalJsLike | number | string | null
    optimization_suggestions?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string | null
    completed_at?: Date | string | null
  }

  export type rentalsUpdateManyMutationInput = {
    user_email?: StringFieldUpdateOperationsInput | string
    user_name?: NullableStringFieldUpdateOperationsInput | string | null
    rental_type?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration_hours?: NullableIntFieldUpdateOperationsInput | number | null
    base_price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    context_adjustment?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    discount_percent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    total_price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    retell_phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    elevenlabs_voice_config?: NullableJsonNullValueInput | InputJsonValue
    gemini_customizations?: NullableJsonNullValueInput | InputJsonValue
    context_snapshot?: NullableJsonNullValueInput | InputJsonValue
    environmental_conditions?: NullableJsonNullValueInput | InputJsonValue
    performance_metrics?: NullableJsonNullValueInput | InputJsonValue
    stripe_payment_intent_id?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    satisfaction_score?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    context_match_accuracy?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    optimization_suggestions?: NullableJsonNullValueInput | InputJsonValue
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type rentalsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    agent_id?: NullableIntFieldUpdateOperationsInput | number | null
    user_email?: StringFieldUpdateOperationsInput | string
    user_name?: NullableStringFieldUpdateOperationsInput | string | null
    rental_type?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration_hours?: NullableIntFieldUpdateOperationsInput | number | null
    base_price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    context_adjustment?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    discount_percent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    total_price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    retell_phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    elevenlabs_voice_config?: NullableJsonNullValueInput | InputJsonValue
    gemini_customizations?: NullableJsonNullValueInput | InputJsonValue
    context_snapshot?: NullableJsonNullValueInput | InputJsonValue
    environmental_conditions?: NullableJsonNullValueInput | InputJsonValue
    performance_metrics?: NullableJsonNullValueInput | InputJsonValue
    stripe_payment_intent_id?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    satisfaction_score?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    context_match_accuracy?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    optimization_suggestions?: NullableJsonNullValueInput | InputJsonValue
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type subscriptionsCreateInput = {
    user_email: string
    plan_name?: string | null
    billing_period?: string | null
    monthly_price?: Decimal | DecimalJsLike | number | string | null
    annual_price?: Decimal | DecimalJsLike | number | string | null
    discount_percent?: Decimal | DecimalJsLike | number | string | null
    context_based_discounts?: NullableJsonNullValueInput | InputJsonValue
    agent_limit?: number | null
    features?: NullableJsonNullValueInput | InputJsonValue
    recommended_based_on_context?: boolean | null
    context_match_score?: Decimal | DecimalJsLike | number | string | null
    stripe_subscription_id?: string | null
    status?: string | null
    created_at?: Date | string | null
    expires_at?: Date | string | null
    next_billing_date?: Date | string | null
  }

  export type subscriptionsUncheckedCreateInput = {
    id?: number
    user_email: string
    plan_name?: string | null
    billing_period?: string | null
    monthly_price?: Decimal | DecimalJsLike | number | string | null
    annual_price?: Decimal | DecimalJsLike | number | string | null
    discount_percent?: Decimal | DecimalJsLike | number | string | null
    context_based_discounts?: NullableJsonNullValueInput | InputJsonValue
    agent_limit?: number | null
    features?: NullableJsonNullValueInput | InputJsonValue
    recommended_based_on_context?: boolean | null
    context_match_score?: Decimal | DecimalJsLike | number | string | null
    stripe_subscription_id?: string | null
    status?: string | null
    created_at?: Date | string | null
    expires_at?: Date | string | null
    next_billing_date?: Date | string | null
  }

  export type subscriptionsUpdateInput = {
    user_email?: StringFieldUpdateOperationsInput | string
    plan_name?: NullableStringFieldUpdateOperationsInput | string | null
    billing_period?: NullableStringFieldUpdateOperationsInput | string | null
    monthly_price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    annual_price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    discount_percent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    context_based_discounts?: NullableJsonNullValueInput | InputJsonValue
    agent_limit?: NullableIntFieldUpdateOperationsInput | number | null
    features?: NullableJsonNullValueInput | InputJsonValue
    recommended_based_on_context?: NullableBoolFieldUpdateOperationsInput | boolean | null
    context_match_score?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    stripe_subscription_id?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    next_billing_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type subscriptionsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_email?: StringFieldUpdateOperationsInput | string
    plan_name?: NullableStringFieldUpdateOperationsInput | string | null
    billing_period?: NullableStringFieldUpdateOperationsInput | string | null
    monthly_price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    annual_price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    discount_percent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    context_based_discounts?: NullableJsonNullValueInput | InputJsonValue
    agent_limit?: NullableIntFieldUpdateOperationsInput | number | null
    features?: NullableJsonNullValueInput | InputJsonValue
    recommended_based_on_context?: NullableBoolFieldUpdateOperationsInput | boolean | null
    context_match_score?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    stripe_subscription_id?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    next_billing_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type subscriptionsCreateManyInput = {
    id?: number
    user_email: string
    plan_name?: string | null
    billing_period?: string | null
    monthly_price?: Decimal | DecimalJsLike | number | string | null
    annual_price?: Decimal | DecimalJsLike | number | string | null
    discount_percent?: Decimal | DecimalJsLike | number | string | null
    context_based_discounts?: NullableJsonNullValueInput | InputJsonValue
    agent_limit?: number | null
    features?: NullableJsonNullValueInput | InputJsonValue
    recommended_based_on_context?: boolean | null
    context_match_score?: Decimal | DecimalJsLike | number | string | null
    stripe_subscription_id?: string | null
    status?: string | null
    created_at?: Date | string | null
    expires_at?: Date | string | null
    next_billing_date?: Date | string | null
  }

  export type subscriptionsUpdateManyMutationInput = {
    user_email?: StringFieldUpdateOperationsInput | string
    plan_name?: NullableStringFieldUpdateOperationsInput | string | null
    billing_period?: NullableStringFieldUpdateOperationsInput | string | null
    monthly_price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    annual_price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    discount_percent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    context_based_discounts?: NullableJsonNullValueInput | InputJsonValue
    agent_limit?: NullableIntFieldUpdateOperationsInput | number | null
    features?: NullableJsonNullValueInput | InputJsonValue
    recommended_based_on_context?: NullableBoolFieldUpdateOperationsInput | boolean | null
    context_match_score?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    stripe_subscription_id?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    next_billing_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type subscriptionsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_email?: StringFieldUpdateOperationsInput | string
    plan_name?: NullableStringFieldUpdateOperationsInput | string | null
    billing_period?: NullableStringFieldUpdateOperationsInput | string | null
    monthly_price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    annual_price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    discount_percent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    context_based_discounts?: NullableJsonNullValueInput | InputJsonValue
    agent_limit?: NullableIntFieldUpdateOperationsInput | number | null
    features?: NullableJsonNullValueInput | InputJsonValue
    recommended_based_on_context?: NullableBoolFieldUpdateOperationsInput | boolean | null
    context_match_score?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    stripe_subscription_id?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    next_billing_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type system_health_metricsCreateInput = {
    metric_date?: Date | string | null
    api_uptime_percentage?: Decimal | DecimalJsLike | number | string | null
    avg_api_response_time_ms?: number | null
    voice_api_success_rate?: Decimal | DecimalJsLike | number | string | null
    database_connection_pool_usage?: Decimal | DecimalJsLike | number | string | null
    error_rate_percentage?: Decimal | DecimalJsLike | number | string | null
    created_at?: Date | string | null
  }

  export type system_health_metricsUncheckedCreateInput = {
    id?: number
    metric_date?: Date | string | null
    api_uptime_percentage?: Decimal | DecimalJsLike | number | string | null
    avg_api_response_time_ms?: number | null
    voice_api_success_rate?: Decimal | DecimalJsLike | number | string | null
    database_connection_pool_usage?: Decimal | DecimalJsLike | number | string | null
    error_rate_percentage?: Decimal | DecimalJsLike | number | string | null
    created_at?: Date | string | null
  }

  export type system_health_metricsUpdateInput = {
    metric_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    api_uptime_percentage?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    avg_api_response_time_ms?: NullableIntFieldUpdateOperationsInput | number | null
    voice_api_success_rate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    database_connection_pool_usage?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    error_rate_percentage?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type system_health_metricsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    metric_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    api_uptime_percentage?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    avg_api_response_time_ms?: NullableIntFieldUpdateOperationsInput | number | null
    voice_api_success_rate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    database_connection_pool_usage?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    error_rate_percentage?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type system_health_metricsCreateManyInput = {
    id?: number
    metric_date?: Date | string | null
    api_uptime_percentage?: Decimal | DecimalJsLike | number | string | null
    avg_api_response_time_ms?: number | null
    voice_api_success_rate?: Decimal | DecimalJsLike | number | string | null
    database_connection_pool_usage?: Decimal | DecimalJsLike | number | string | null
    error_rate_percentage?: Decimal | DecimalJsLike | number | string | null
    created_at?: Date | string | null
  }

  export type system_health_metricsUpdateManyMutationInput = {
    metric_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    api_uptime_percentage?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    avg_api_response_time_ms?: NullableIntFieldUpdateOperationsInput | number | null
    voice_api_success_rate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    database_connection_pool_usage?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    error_rate_percentage?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type system_health_metricsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    metric_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    api_uptime_percentage?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    avg_api_response_time_ms?: NullableIntFieldUpdateOperationsInput | number | null
    voice_api_success_rate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    database_connection_pool_usage?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    error_rate_percentage?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type user_interactionsCreateInput = {
    user_email?: string | null
    action?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    context_at_interaction?: NullableJsonNullValueInput | InputJsonValue
    device_context?: NullableJsonNullValueInput | InputJsonValue
    environmental_context?: NullableJsonNullValueInput | InputJsonValue
    user_satisfaction?: Decimal | DecimalJsLike | number | string | null
    context_relevance?: Decimal | DecimalJsLike | number | string | null
    optimization_data?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string | null
    agents?: agentsCreateNestedOneWithoutUser_interactionsInput
  }

  export type user_interactionsUncheckedCreateInput = {
    id?: number
    user_email?: string | null
    agent_id?: number | null
    action?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    context_at_interaction?: NullableJsonNullValueInput | InputJsonValue
    device_context?: NullableJsonNullValueInput | InputJsonValue
    environmental_context?: NullableJsonNullValueInput | InputJsonValue
    user_satisfaction?: Decimal | DecimalJsLike | number | string | null
    context_relevance?: Decimal | DecimalJsLike | number | string | null
    optimization_data?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string | null
  }

  export type user_interactionsUpdateInput = {
    user_email?: NullableStringFieldUpdateOperationsInput | string | null
    action?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    context_at_interaction?: NullableJsonNullValueInput | InputJsonValue
    device_context?: NullableJsonNullValueInput | InputJsonValue
    environmental_context?: NullableJsonNullValueInput | InputJsonValue
    user_satisfaction?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    context_relevance?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    optimization_data?: NullableJsonNullValueInput | InputJsonValue
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agents?: agentsUpdateOneWithoutUser_interactionsNestedInput
  }

  export type user_interactionsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_email?: NullableStringFieldUpdateOperationsInput | string | null
    agent_id?: NullableIntFieldUpdateOperationsInput | number | null
    action?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    context_at_interaction?: NullableJsonNullValueInput | InputJsonValue
    device_context?: NullableJsonNullValueInput | InputJsonValue
    environmental_context?: NullableJsonNullValueInput | InputJsonValue
    user_satisfaction?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    context_relevance?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    optimization_data?: NullableJsonNullValueInput | InputJsonValue
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type user_interactionsCreateManyInput = {
    id?: number
    user_email?: string | null
    agent_id?: number | null
    action?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    context_at_interaction?: NullableJsonNullValueInput | InputJsonValue
    device_context?: NullableJsonNullValueInput | InputJsonValue
    environmental_context?: NullableJsonNullValueInput | InputJsonValue
    user_satisfaction?: Decimal | DecimalJsLike | number | string | null
    context_relevance?: Decimal | DecimalJsLike | number | string | null
    optimization_data?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string | null
  }

  export type user_interactionsUpdateManyMutationInput = {
    user_email?: NullableStringFieldUpdateOperationsInput | string | null
    action?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    context_at_interaction?: NullableJsonNullValueInput | InputJsonValue
    device_context?: NullableJsonNullValueInput | InputJsonValue
    environmental_context?: NullableJsonNullValueInput | InputJsonValue
    user_satisfaction?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    context_relevance?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    optimization_data?: NullableJsonNullValueInput | InputJsonValue
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type user_interactionsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_email?: NullableStringFieldUpdateOperationsInput | string | null
    agent_id?: NullableIntFieldUpdateOperationsInput | number | null
    action?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    context_at_interaction?: NullableJsonNullValueInput | InputJsonValue
    device_context?: NullableJsonNullValueInput | InputJsonValue
    environmental_context?: NullableJsonNullValueInput | InputJsonValue
    user_satisfaction?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    context_relevance?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    optimization_data?: NullableJsonNullValueInput | InputJsonValue
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type voice_samplesCreateInput = {
    sample_text?: string | null
    elevenlabs_audio_url?: string | null
    duration_seconds?: number | null
    environmental_variants?: NullableJsonNullValueInput | InputJsonValue
    noise_optimization?: NullableJsonNullValueInput | InputJsonValue
    device_optimization?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string | null
    agents?: agentsCreateNestedOneWithoutVoice_samplesInput
  }

  export type voice_samplesUncheckedCreateInput = {
    id?: number
    agent_id?: number | null
    sample_text?: string | null
    elevenlabs_audio_url?: string | null
    duration_seconds?: number | null
    environmental_variants?: NullableJsonNullValueInput | InputJsonValue
    noise_optimization?: NullableJsonNullValueInput | InputJsonValue
    device_optimization?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string | null
  }

  export type voice_samplesUpdateInput = {
    sample_text?: NullableStringFieldUpdateOperationsInput | string | null
    elevenlabs_audio_url?: NullableStringFieldUpdateOperationsInput | string | null
    duration_seconds?: NullableIntFieldUpdateOperationsInput | number | null
    environmental_variants?: NullableJsonNullValueInput | InputJsonValue
    noise_optimization?: NullableJsonNullValueInput | InputJsonValue
    device_optimization?: NullableJsonNullValueInput | InputJsonValue
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agents?: agentsUpdateOneWithoutVoice_samplesNestedInput
  }

  export type voice_samplesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    agent_id?: NullableIntFieldUpdateOperationsInput | number | null
    sample_text?: NullableStringFieldUpdateOperationsInput | string | null
    elevenlabs_audio_url?: NullableStringFieldUpdateOperationsInput | string | null
    duration_seconds?: NullableIntFieldUpdateOperationsInput | number | null
    environmental_variants?: NullableJsonNullValueInput | InputJsonValue
    noise_optimization?: NullableJsonNullValueInput | InputJsonValue
    device_optimization?: NullableJsonNullValueInput | InputJsonValue
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type voice_samplesCreateManyInput = {
    id?: number
    agent_id?: number | null
    sample_text?: string | null
    elevenlabs_audio_url?: string | null
    duration_seconds?: number | null
    environmental_variants?: NullableJsonNullValueInput | InputJsonValue
    noise_optimization?: NullableJsonNullValueInput | InputJsonValue
    device_optimization?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string | null
  }

  export type voice_samplesUpdateManyMutationInput = {
    sample_text?: NullableStringFieldUpdateOperationsInput | string | null
    elevenlabs_audio_url?: NullableStringFieldUpdateOperationsInput | string | null
    duration_seconds?: NullableIntFieldUpdateOperationsInput | number | null
    environmental_variants?: NullableJsonNullValueInput | InputJsonValue
    noise_optimization?: NullableJsonNullValueInput | InputJsonValue
    device_optimization?: NullableJsonNullValueInput | InputJsonValue
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type voice_samplesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    agent_id?: NullableIntFieldUpdateOperationsInput | number | null
    sample_text?: NullableStringFieldUpdateOperationsInput | string | null
    elevenlabs_audio_url?: NullableStringFieldUpdateOperationsInput | string | null
    duration_seconds?: NullableIntFieldUpdateOperationsInput | number | null
    environmental_variants?: NullableJsonNullValueInput | InputJsonValue
    noise_optimization?: NullableJsonNullValueInput | InputJsonValue
    device_optimization?: NullableJsonNullValueInput | InputJsonValue
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type Agents_customNullableScalarRelationFilter = {
    is?: agents_customWhereInput | null
    isNot?: agents_customWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type agent_feedbackCountOrderByAggregateInput = {
    id?: SortOrder
    agent_id?: SortOrder
    rating?: SortOrder
    feedback_text?: SortOrder
    language_used?: SortOrder
    user_session_id?: SortOrder
    created_at?: SortOrder
  }

  export type agent_feedbackAvgOrderByAggregateInput = {
    id?: SortOrder
    agent_id?: SortOrder
    rating?: SortOrder
  }

  export type agent_feedbackMaxOrderByAggregateInput = {
    id?: SortOrder
    agent_id?: SortOrder
    rating?: SortOrder
    feedback_text?: SortOrder
    language_used?: SortOrder
    user_session_id?: SortOrder
    created_at?: SortOrder
  }

  export type agent_feedbackMinOrderByAggregateInput = {
    id?: SortOrder
    agent_id?: SortOrder
    rating?: SortOrder
    feedback_text?: SortOrder
    language_used?: SortOrder
    user_session_id?: SortOrder
    created_at?: SortOrder
  }

  export type agent_feedbackSumOrderByAggregateInput = {
    id?: SortOrder
    agent_id?: SortOrder
    rating?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type agent_languagesCountOrderByAggregateInput = {
    id?: SortOrder
    agent_id?: SortOrder
    language_code?: SortOrder
    personality_translation?: SortOrder
    voice_id?: SortOrder
    voice_settings?: SortOrder
    is_primary?: SortOrder
    created_at?: SortOrder
  }

  export type agent_languagesAvgOrderByAggregateInput = {
    id?: SortOrder
    agent_id?: SortOrder
  }

  export type agent_languagesMaxOrderByAggregateInput = {
    id?: SortOrder
    agent_id?: SortOrder
    language_code?: SortOrder
    personality_translation?: SortOrder
    voice_id?: SortOrder
    is_primary?: SortOrder
    created_at?: SortOrder
  }

  export type agent_languagesMinOrderByAggregateInput = {
    id?: SortOrder
    agent_id?: SortOrder
    language_code?: SortOrder
    personality_translation?: SortOrder
    voice_id?: SortOrder
    is_primary?: SortOrder
    created_at?: SortOrder
  }

  export type agent_languagesSumOrderByAggregateInput = {
    id?: SortOrder
    agent_id?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type agent_performance_metricsAgent_idMetric_dateCompoundUniqueInput = {
    agent_id: number
    metric_date: Date | string
  }

  export type agent_performance_metricsCountOrderByAggregateInput = {
    id?: SortOrder
    agent_id?: SortOrder
    metric_date?: SortOrder
    total_interactions?: SortOrder
    successful_interactions?: SortOrder
    avg_response_time_ms?: SortOrder
    voice_generation_count?: SortOrder
    error_count?: SortOrder
    language_breakdown?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type agent_performance_metricsAvgOrderByAggregateInput = {
    id?: SortOrder
    agent_id?: SortOrder
    total_interactions?: SortOrder
    successful_interactions?: SortOrder
    avg_response_time_ms?: SortOrder
    voice_generation_count?: SortOrder
    error_count?: SortOrder
  }

  export type agent_performance_metricsMaxOrderByAggregateInput = {
    id?: SortOrder
    agent_id?: SortOrder
    metric_date?: SortOrder
    total_interactions?: SortOrder
    successful_interactions?: SortOrder
    avg_response_time_ms?: SortOrder
    voice_generation_count?: SortOrder
    error_count?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type agent_performance_metricsMinOrderByAggregateInput = {
    id?: SortOrder
    agent_id?: SortOrder
    metric_date?: SortOrder
    total_interactions?: SortOrder
    successful_interactions?: SortOrder
    avg_response_time_ms?: SortOrder
    voice_generation_count?: SortOrder
    error_count?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type agent_performance_metricsSumOrderByAggregateInput = {
    id?: SortOrder
    agent_id?: SortOrder
    total_interactions?: SortOrder
    successful_interactions?: SortOrder
    avg_response_time_ms?: SortOrder
    voice_generation_count?: SortOrder
    error_count?: SortOrder
  }

  export type agent_usage_eventsCountOrderByAggregateInput = {
    id?: SortOrder
    agent_id?: SortOrder
    event_type?: SortOrder
    event_data?: SortOrder
    user_session_id?: SortOrder
    ip_address?: SortOrder
    user_agent?: SortOrder
    language_used?: SortOrder
    created_at?: SortOrder
  }

  export type agent_usage_eventsAvgOrderByAggregateInput = {
    id?: SortOrder
    agent_id?: SortOrder
  }

  export type agent_usage_eventsMaxOrderByAggregateInput = {
    id?: SortOrder
    agent_id?: SortOrder
    event_type?: SortOrder
    user_session_id?: SortOrder
    ip_address?: SortOrder
    user_agent?: SortOrder
    language_used?: SortOrder
    created_at?: SortOrder
  }

  export type agent_usage_eventsMinOrderByAggregateInput = {
    id?: SortOrder
    agent_id?: SortOrder
    event_type?: SortOrder
    user_session_id?: SortOrder
    ip_address?: SortOrder
    user_agent?: SortOrder
    language_used?: SortOrder
    created_at?: SortOrder
  }

  export type agent_usage_eventsSumOrderByAggregateInput = {
    id?: SortOrder
    agent_id?: SortOrder
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type RentalsListRelationFilter = {
    every?: rentalsWhereInput
    some?: rentalsWhereInput
    none?: rentalsWhereInput
  }

  export type User_interactionsListRelationFilter = {
    every?: user_interactionsWhereInput
    some?: user_interactionsWhereInput
    none?: user_interactionsWhereInput
  }

  export type Voice_samplesListRelationFilter = {
    every?: voice_samplesWhereInput
    some?: voice_samplesWhereInput
    none?: voice_samplesWhereInput
  }

  export type rentalsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type user_interactionsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type voice_samplesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type agentsCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    company?: SortOrder
    category?: SortOrder
    description?: SortOrder
    personality?: SortOrder
    pricing_half_day?: SortOrder
    pricing_full_day?: SortOrder
    pricing_per_minute?: SortOrder
    elevenlabs_voice_id?: SortOrder
    voice_sample_url?: SortOrder
    voice_characteristics?: SortOrder
    context7_profile?: SortOrder
    environmental_suitability?: SortOrder
    performance_by_context?: SortOrder
    gemini_personality_prompt?: SortOrder
    ai_optimization_score?: SortOrder
    success_rate?: SortOrder
    avg_call_time?: SortOrder
    rating?: SortOrder
    reviews?: SortOrder
    integrations?: SortOrder
    industries?: SortOrder
    stages?: SortOrder
    demo_available?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type agentsAvgOrderByAggregateInput = {
    id?: SortOrder
    pricing_half_day?: SortOrder
    pricing_full_day?: SortOrder
    pricing_per_minute?: SortOrder
    ai_optimization_score?: SortOrder
    rating?: SortOrder
    reviews?: SortOrder
    stages?: SortOrder
  }

  export type agentsMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    company?: SortOrder
    category?: SortOrder
    description?: SortOrder
    personality?: SortOrder
    pricing_half_day?: SortOrder
    pricing_full_day?: SortOrder
    pricing_per_minute?: SortOrder
    elevenlabs_voice_id?: SortOrder
    voice_sample_url?: SortOrder
    gemini_personality_prompt?: SortOrder
    ai_optimization_score?: SortOrder
    success_rate?: SortOrder
    avg_call_time?: SortOrder
    rating?: SortOrder
    reviews?: SortOrder
    stages?: SortOrder
    demo_available?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type agentsMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    company?: SortOrder
    category?: SortOrder
    description?: SortOrder
    personality?: SortOrder
    pricing_half_day?: SortOrder
    pricing_full_day?: SortOrder
    pricing_per_minute?: SortOrder
    elevenlabs_voice_id?: SortOrder
    voice_sample_url?: SortOrder
    gemini_personality_prompt?: SortOrder
    ai_optimization_score?: SortOrder
    success_rate?: SortOrder
    avg_call_time?: SortOrder
    rating?: SortOrder
    reviews?: SortOrder
    stages?: SortOrder
    demo_available?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type agentsSumOrderByAggregateInput = {
    id?: SortOrder
    pricing_half_day?: SortOrder
    pricing_full_day?: SortOrder
    pricing_per_minute?: SortOrder
    ai_optimization_score?: SortOrder
    rating?: SortOrder
    reviews?: SortOrder
    stages?: SortOrder
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type Agent_feedbackListRelationFilter = {
    every?: agent_feedbackWhereInput
    some?: agent_feedbackWhereInput
    none?: agent_feedbackWhereInput
  }

  export type Agent_languagesListRelationFilter = {
    every?: agent_languagesWhereInput
    some?: agent_languagesWhereInput
    none?: agent_languagesWhereInput
  }

  export type Agent_performance_metricsListRelationFilter = {
    every?: agent_performance_metricsWhereInput
    some?: agent_performance_metricsWhereInput
    none?: agent_performance_metricsWhereInput
  }

  export type Agent_usage_eventsListRelationFilter = {
    every?: agent_usage_eventsWhereInput
    some?: agent_usage_eventsWhereInput
    none?: agent_usage_eventsWhereInput
  }

  export type agent_feedbackOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type agent_languagesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type agent_performance_metricsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type agent_usage_eventsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type agents_customCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    name?: SortOrder
    template_id?: SortOrder
    personality?: SortOrder
    voice_id?: SortOrder
    voice_settings?: SortOrder
    environment_setting?: SortOrder
    integrations?: SortOrder
    pricing?: SortOrder
    status?: SortOrder
    demo_available?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type agents_customAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type agents_customMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    name?: SortOrder
    template_id?: SortOrder
    personality?: SortOrder
    voice_id?: SortOrder
    environment_setting?: SortOrder
    status?: SortOrder
    demo_available?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type agents_customMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    name?: SortOrder
    template_id?: SortOrder
    personality?: SortOrder
    voice_id?: SortOrder
    environment_setting?: SortOrder
    status?: SortOrder
    demo_available?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type agents_customSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type contractor_contextCountOrderByAggregateInput = {
    id?: SortOrder
    user_email?: SortOrder
    user_name?: SortOrder
    expertise_level?: SortOrder
    primary_trade?: SortOrder
    company_size?: SortOrder
    years_experience?: SortOrder
    specializations?: SortOrder
    typical_job_sites?: SortOrder
    noise_tolerance?: SortOrder
    safety_requirements?: SortOrder
    geographic_region?: SortOrder
    climate_considerations?: SortOrder
    preferred_call_times?: SortOrder
    timezone?: SortOrder
    project_phases?: SortOrder
    seasonal_patterns?: SortOrder
    urgency_patterns?: SortOrder
    primary_device?: SortOrder
    network_quality?: SortOrder
    preferred_integrations?: SortOrder
    technical_comfort_level?: SortOrder
    voice_quality_requirements?: SortOrder
    budget_range?: SortOrder
    roi_requirements?: SortOrder
    rental_frequency?: SortOrder
    payment_preferences?: SortOrder
    cost_sensitivity?: SortOrder
    communication_style?: SortOrder
    team_structure?: SortOrder
    client_interaction_style?: SortOrder
    decision_making_style?: SortOrder
    cultural_considerations?: SortOrder
    success_metrics?: SortOrder
    preferred_agent_types?: SortOrder
    optimization_preferences?: SortOrder
    learning_preferences?: SortOrder
    feedback_patterns?: SortOrder
    context_confidence_score?: SortOrder
    last_context_update?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type contractor_contextAvgOrderByAggregateInput = {
    id?: SortOrder
    years_experience?: SortOrder
    roi_requirements?: SortOrder
    context_confidence_score?: SortOrder
  }

  export type contractor_contextMaxOrderByAggregateInput = {
    id?: SortOrder
    user_email?: SortOrder
    user_name?: SortOrder
    expertise_level?: SortOrder
    primary_trade?: SortOrder
    company_size?: SortOrder
    years_experience?: SortOrder
    noise_tolerance?: SortOrder
    geographic_region?: SortOrder
    timezone?: SortOrder
    urgency_patterns?: SortOrder
    primary_device?: SortOrder
    network_quality?: SortOrder
    technical_comfort_level?: SortOrder
    voice_quality_requirements?: SortOrder
    budget_range?: SortOrder
    roi_requirements?: SortOrder
    rental_frequency?: SortOrder
    payment_preferences?: SortOrder
    cost_sensitivity?: SortOrder
    communication_style?: SortOrder
    client_interaction_style?: SortOrder
    decision_making_style?: SortOrder
    learning_preferences?: SortOrder
    context_confidence_score?: SortOrder
    last_context_update?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type contractor_contextMinOrderByAggregateInput = {
    id?: SortOrder
    user_email?: SortOrder
    user_name?: SortOrder
    expertise_level?: SortOrder
    primary_trade?: SortOrder
    company_size?: SortOrder
    years_experience?: SortOrder
    noise_tolerance?: SortOrder
    geographic_region?: SortOrder
    timezone?: SortOrder
    urgency_patterns?: SortOrder
    primary_device?: SortOrder
    network_quality?: SortOrder
    technical_comfort_level?: SortOrder
    voice_quality_requirements?: SortOrder
    budget_range?: SortOrder
    roi_requirements?: SortOrder
    rental_frequency?: SortOrder
    payment_preferences?: SortOrder
    cost_sensitivity?: SortOrder
    communication_style?: SortOrder
    client_interaction_style?: SortOrder
    decision_making_style?: SortOrder
    learning_preferences?: SortOrder
    context_confidence_score?: SortOrder
    last_context_update?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type contractor_contextSumOrderByAggregateInput = {
    id?: SortOrder
    years_experience?: SortOrder
    roi_requirements?: SortOrder
    context_confidence_score?: SortOrder
  }

  export type AgentsNullableScalarRelationFilter = {
    is?: agentsWhereInput | null
    isNot?: agentsWhereInput | null
  }

  export type rentalsCountOrderByAggregateInput = {
    id?: SortOrder
    agent_id?: SortOrder
    user_email?: SortOrder
    user_name?: SortOrder
    rental_type?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    duration_hours?: SortOrder
    base_price?: SortOrder
    context_adjustment?: SortOrder
    discount_percent?: SortOrder
    total_price?: SortOrder
    retell_phone_number?: SortOrder
    elevenlabs_voice_config?: SortOrder
    gemini_customizations?: SortOrder
    context_snapshot?: SortOrder
    environmental_conditions?: SortOrder
    performance_metrics?: SortOrder
    stripe_payment_intent_id?: SortOrder
    status?: SortOrder
    satisfaction_score?: SortOrder
    context_match_accuracy?: SortOrder
    optimization_suggestions?: SortOrder
    created_at?: SortOrder
    completed_at?: SortOrder
  }

  export type rentalsAvgOrderByAggregateInput = {
    id?: SortOrder
    agent_id?: SortOrder
    duration_hours?: SortOrder
    base_price?: SortOrder
    context_adjustment?: SortOrder
    discount_percent?: SortOrder
    total_price?: SortOrder
    satisfaction_score?: SortOrder
    context_match_accuracy?: SortOrder
  }

  export type rentalsMaxOrderByAggregateInput = {
    id?: SortOrder
    agent_id?: SortOrder
    user_email?: SortOrder
    user_name?: SortOrder
    rental_type?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    duration_hours?: SortOrder
    base_price?: SortOrder
    context_adjustment?: SortOrder
    discount_percent?: SortOrder
    total_price?: SortOrder
    retell_phone_number?: SortOrder
    stripe_payment_intent_id?: SortOrder
    status?: SortOrder
    satisfaction_score?: SortOrder
    context_match_accuracy?: SortOrder
    created_at?: SortOrder
    completed_at?: SortOrder
  }

  export type rentalsMinOrderByAggregateInput = {
    id?: SortOrder
    agent_id?: SortOrder
    user_email?: SortOrder
    user_name?: SortOrder
    rental_type?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    duration_hours?: SortOrder
    base_price?: SortOrder
    context_adjustment?: SortOrder
    discount_percent?: SortOrder
    total_price?: SortOrder
    retell_phone_number?: SortOrder
    stripe_payment_intent_id?: SortOrder
    status?: SortOrder
    satisfaction_score?: SortOrder
    context_match_accuracy?: SortOrder
    created_at?: SortOrder
    completed_at?: SortOrder
  }

  export type rentalsSumOrderByAggregateInput = {
    id?: SortOrder
    agent_id?: SortOrder
    duration_hours?: SortOrder
    base_price?: SortOrder
    context_adjustment?: SortOrder
    discount_percent?: SortOrder
    total_price?: SortOrder
    satisfaction_score?: SortOrder
    context_match_accuracy?: SortOrder
  }

  export type subscriptionsCountOrderByAggregateInput = {
    id?: SortOrder
    user_email?: SortOrder
    plan_name?: SortOrder
    billing_period?: SortOrder
    monthly_price?: SortOrder
    annual_price?: SortOrder
    discount_percent?: SortOrder
    context_based_discounts?: SortOrder
    agent_limit?: SortOrder
    features?: SortOrder
    recommended_based_on_context?: SortOrder
    context_match_score?: SortOrder
    stripe_subscription_id?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    expires_at?: SortOrder
    next_billing_date?: SortOrder
  }

  export type subscriptionsAvgOrderByAggregateInput = {
    id?: SortOrder
    monthly_price?: SortOrder
    annual_price?: SortOrder
    discount_percent?: SortOrder
    agent_limit?: SortOrder
    context_match_score?: SortOrder
  }

  export type subscriptionsMaxOrderByAggregateInput = {
    id?: SortOrder
    user_email?: SortOrder
    plan_name?: SortOrder
    billing_period?: SortOrder
    monthly_price?: SortOrder
    annual_price?: SortOrder
    discount_percent?: SortOrder
    agent_limit?: SortOrder
    recommended_based_on_context?: SortOrder
    context_match_score?: SortOrder
    stripe_subscription_id?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    expires_at?: SortOrder
    next_billing_date?: SortOrder
  }

  export type subscriptionsMinOrderByAggregateInput = {
    id?: SortOrder
    user_email?: SortOrder
    plan_name?: SortOrder
    billing_period?: SortOrder
    monthly_price?: SortOrder
    annual_price?: SortOrder
    discount_percent?: SortOrder
    agent_limit?: SortOrder
    recommended_based_on_context?: SortOrder
    context_match_score?: SortOrder
    stripe_subscription_id?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    expires_at?: SortOrder
    next_billing_date?: SortOrder
  }

  export type subscriptionsSumOrderByAggregateInput = {
    id?: SortOrder
    monthly_price?: SortOrder
    annual_price?: SortOrder
    discount_percent?: SortOrder
    agent_limit?: SortOrder
    context_match_score?: SortOrder
  }

  export type system_health_metricsCountOrderByAggregateInput = {
    id?: SortOrder
    metric_date?: SortOrder
    api_uptime_percentage?: SortOrder
    avg_api_response_time_ms?: SortOrder
    voice_api_success_rate?: SortOrder
    database_connection_pool_usage?: SortOrder
    error_rate_percentage?: SortOrder
    created_at?: SortOrder
  }

  export type system_health_metricsAvgOrderByAggregateInput = {
    id?: SortOrder
    api_uptime_percentage?: SortOrder
    avg_api_response_time_ms?: SortOrder
    voice_api_success_rate?: SortOrder
    database_connection_pool_usage?: SortOrder
    error_rate_percentage?: SortOrder
  }

  export type system_health_metricsMaxOrderByAggregateInput = {
    id?: SortOrder
    metric_date?: SortOrder
    api_uptime_percentage?: SortOrder
    avg_api_response_time_ms?: SortOrder
    voice_api_success_rate?: SortOrder
    database_connection_pool_usage?: SortOrder
    error_rate_percentage?: SortOrder
    created_at?: SortOrder
  }

  export type system_health_metricsMinOrderByAggregateInput = {
    id?: SortOrder
    metric_date?: SortOrder
    api_uptime_percentage?: SortOrder
    avg_api_response_time_ms?: SortOrder
    voice_api_success_rate?: SortOrder
    database_connection_pool_usage?: SortOrder
    error_rate_percentage?: SortOrder
    created_at?: SortOrder
  }

  export type system_health_metricsSumOrderByAggregateInput = {
    id?: SortOrder
    api_uptime_percentage?: SortOrder
    avg_api_response_time_ms?: SortOrder
    voice_api_success_rate?: SortOrder
    database_connection_pool_usage?: SortOrder
    error_rate_percentage?: SortOrder
  }

  export type user_interactionsCountOrderByAggregateInput = {
    id?: SortOrder
    user_email?: SortOrder
    agent_id?: SortOrder
    action?: SortOrder
    metadata?: SortOrder
    context_at_interaction?: SortOrder
    device_context?: SortOrder
    environmental_context?: SortOrder
    user_satisfaction?: SortOrder
    context_relevance?: SortOrder
    optimization_data?: SortOrder
    created_at?: SortOrder
  }

  export type user_interactionsAvgOrderByAggregateInput = {
    id?: SortOrder
    agent_id?: SortOrder
    user_satisfaction?: SortOrder
    context_relevance?: SortOrder
  }

  export type user_interactionsMaxOrderByAggregateInput = {
    id?: SortOrder
    user_email?: SortOrder
    agent_id?: SortOrder
    action?: SortOrder
    user_satisfaction?: SortOrder
    context_relevance?: SortOrder
    created_at?: SortOrder
  }

  export type user_interactionsMinOrderByAggregateInput = {
    id?: SortOrder
    user_email?: SortOrder
    agent_id?: SortOrder
    action?: SortOrder
    user_satisfaction?: SortOrder
    context_relevance?: SortOrder
    created_at?: SortOrder
  }

  export type user_interactionsSumOrderByAggregateInput = {
    id?: SortOrder
    agent_id?: SortOrder
    user_satisfaction?: SortOrder
    context_relevance?: SortOrder
  }

  export type voice_samplesCountOrderByAggregateInput = {
    id?: SortOrder
    agent_id?: SortOrder
    sample_text?: SortOrder
    elevenlabs_audio_url?: SortOrder
    duration_seconds?: SortOrder
    environmental_variants?: SortOrder
    noise_optimization?: SortOrder
    device_optimization?: SortOrder
    created_at?: SortOrder
  }

  export type voice_samplesAvgOrderByAggregateInput = {
    id?: SortOrder
    agent_id?: SortOrder
    duration_seconds?: SortOrder
  }

  export type voice_samplesMaxOrderByAggregateInput = {
    id?: SortOrder
    agent_id?: SortOrder
    sample_text?: SortOrder
    elevenlabs_audio_url?: SortOrder
    duration_seconds?: SortOrder
    created_at?: SortOrder
  }

  export type voice_samplesMinOrderByAggregateInput = {
    id?: SortOrder
    agent_id?: SortOrder
    sample_text?: SortOrder
    elevenlabs_audio_url?: SortOrder
    duration_seconds?: SortOrder
    created_at?: SortOrder
  }

  export type voice_samplesSumOrderByAggregateInput = {
    id?: SortOrder
    agent_id?: SortOrder
    duration_seconds?: SortOrder
  }

  export type agents_customCreateNestedOneWithoutAgent_feedbackInput = {
    create?: XOR<agents_customCreateWithoutAgent_feedbackInput, agents_customUncheckedCreateWithoutAgent_feedbackInput>
    connectOrCreate?: agents_customCreateOrConnectWithoutAgent_feedbackInput
    connect?: agents_customWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type agents_customUpdateOneWithoutAgent_feedbackNestedInput = {
    create?: XOR<agents_customCreateWithoutAgent_feedbackInput, agents_customUncheckedCreateWithoutAgent_feedbackInput>
    connectOrCreate?: agents_customCreateOrConnectWithoutAgent_feedbackInput
    upsert?: agents_customUpsertWithoutAgent_feedbackInput
    disconnect?: agents_customWhereInput | boolean
    delete?: agents_customWhereInput | boolean
    connect?: agents_customWhereUniqueInput
    update?: XOR<XOR<agents_customUpdateToOneWithWhereWithoutAgent_feedbackInput, agents_customUpdateWithoutAgent_feedbackInput>, agents_customUncheckedUpdateWithoutAgent_feedbackInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type agents_customCreateNestedOneWithoutAgent_languagesInput = {
    create?: XOR<agents_customCreateWithoutAgent_languagesInput, agents_customUncheckedCreateWithoutAgent_languagesInput>
    connectOrCreate?: agents_customCreateOrConnectWithoutAgent_languagesInput
    connect?: agents_customWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type agents_customUpdateOneWithoutAgent_languagesNestedInput = {
    create?: XOR<agents_customCreateWithoutAgent_languagesInput, agents_customUncheckedCreateWithoutAgent_languagesInput>
    connectOrCreate?: agents_customCreateOrConnectWithoutAgent_languagesInput
    upsert?: agents_customUpsertWithoutAgent_languagesInput
    disconnect?: agents_customWhereInput | boolean
    delete?: agents_customWhereInput | boolean
    connect?: agents_customWhereUniqueInput
    update?: XOR<XOR<agents_customUpdateToOneWithWhereWithoutAgent_languagesInput, agents_customUpdateWithoutAgent_languagesInput>, agents_customUncheckedUpdateWithoutAgent_languagesInput>
  }

  export type agents_customCreateNestedOneWithoutAgent_performance_metricsInput = {
    create?: XOR<agents_customCreateWithoutAgent_performance_metricsInput, agents_customUncheckedCreateWithoutAgent_performance_metricsInput>
    connectOrCreate?: agents_customCreateOrConnectWithoutAgent_performance_metricsInput
    connect?: agents_customWhereUniqueInput
  }

  export type agents_customUpdateOneWithoutAgent_performance_metricsNestedInput = {
    create?: XOR<agents_customCreateWithoutAgent_performance_metricsInput, agents_customUncheckedCreateWithoutAgent_performance_metricsInput>
    connectOrCreate?: agents_customCreateOrConnectWithoutAgent_performance_metricsInput
    upsert?: agents_customUpsertWithoutAgent_performance_metricsInput
    disconnect?: agents_customWhereInput | boolean
    delete?: agents_customWhereInput | boolean
    connect?: agents_customWhereUniqueInput
    update?: XOR<XOR<agents_customUpdateToOneWithWhereWithoutAgent_performance_metricsInput, agents_customUpdateWithoutAgent_performance_metricsInput>, agents_customUncheckedUpdateWithoutAgent_performance_metricsInput>
  }

  export type agents_customCreateNestedOneWithoutAgent_usage_eventsInput = {
    create?: XOR<agents_customCreateWithoutAgent_usage_eventsInput, agents_customUncheckedCreateWithoutAgent_usage_eventsInput>
    connectOrCreate?: agents_customCreateOrConnectWithoutAgent_usage_eventsInput
    connect?: agents_customWhereUniqueInput
  }

  export type agents_customUpdateOneWithoutAgent_usage_eventsNestedInput = {
    create?: XOR<agents_customCreateWithoutAgent_usage_eventsInput, agents_customUncheckedCreateWithoutAgent_usage_eventsInput>
    connectOrCreate?: agents_customCreateOrConnectWithoutAgent_usage_eventsInput
    upsert?: agents_customUpsertWithoutAgent_usage_eventsInput
    disconnect?: agents_customWhereInput | boolean
    delete?: agents_customWhereInput | boolean
    connect?: agents_customWhereUniqueInput
    update?: XOR<XOR<agents_customUpdateToOneWithWhereWithoutAgent_usage_eventsInput, agents_customUpdateWithoutAgent_usage_eventsInput>, agents_customUncheckedUpdateWithoutAgent_usage_eventsInput>
  }

  export type agentsCreateintegrationsInput = {
    set: string[]
  }

  export type agentsCreateindustriesInput = {
    set: string[]
  }

  export type rentalsCreateNestedManyWithoutAgentsInput = {
    create?: XOR<rentalsCreateWithoutAgentsInput, rentalsUncheckedCreateWithoutAgentsInput> | rentalsCreateWithoutAgentsInput[] | rentalsUncheckedCreateWithoutAgentsInput[]
    connectOrCreate?: rentalsCreateOrConnectWithoutAgentsInput | rentalsCreateOrConnectWithoutAgentsInput[]
    createMany?: rentalsCreateManyAgentsInputEnvelope
    connect?: rentalsWhereUniqueInput | rentalsWhereUniqueInput[]
  }

  export type user_interactionsCreateNestedManyWithoutAgentsInput = {
    create?: XOR<user_interactionsCreateWithoutAgentsInput, user_interactionsUncheckedCreateWithoutAgentsInput> | user_interactionsCreateWithoutAgentsInput[] | user_interactionsUncheckedCreateWithoutAgentsInput[]
    connectOrCreate?: user_interactionsCreateOrConnectWithoutAgentsInput | user_interactionsCreateOrConnectWithoutAgentsInput[]
    createMany?: user_interactionsCreateManyAgentsInputEnvelope
    connect?: user_interactionsWhereUniqueInput | user_interactionsWhereUniqueInput[]
  }

  export type voice_samplesCreateNestedManyWithoutAgentsInput = {
    create?: XOR<voice_samplesCreateWithoutAgentsInput, voice_samplesUncheckedCreateWithoutAgentsInput> | voice_samplesCreateWithoutAgentsInput[] | voice_samplesUncheckedCreateWithoutAgentsInput[]
    connectOrCreate?: voice_samplesCreateOrConnectWithoutAgentsInput | voice_samplesCreateOrConnectWithoutAgentsInput[]
    createMany?: voice_samplesCreateManyAgentsInputEnvelope
    connect?: voice_samplesWhereUniqueInput | voice_samplesWhereUniqueInput[]
  }

  export type rentalsUncheckedCreateNestedManyWithoutAgentsInput = {
    create?: XOR<rentalsCreateWithoutAgentsInput, rentalsUncheckedCreateWithoutAgentsInput> | rentalsCreateWithoutAgentsInput[] | rentalsUncheckedCreateWithoutAgentsInput[]
    connectOrCreate?: rentalsCreateOrConnectWithoutAgentsInput | rentalsCreateOrConnectWithoutAgentsInput[]
    createMany?: rentalsCreateManyAgentsInputEnvelope
    connect?: rentalsWhereUniqueInput | rentalsWhereUniqueInput[]
  }

  export type user_interactionsUncheckedCreateNestedManyWithoutAgentsInput = {
    create?: XOR<user_interactionsCreateWithoutAgentsInput, user_interactionsUncheckedCreateWithoutAgentsInput> | user_interactionsCreateWithoutAgentsInput[] | user_interactionsUncheckedCreateWithoutAgentsInput[]
    connectOrCreate?: user_interactionsCreateOrConnectWithoutAgentsInput | user_interactionsCreateOrConnectWithoutAgentsInput[]
    createMany?: user_interactionsCreateManyAgentsInputEnvelope
    connect?: user_interactionsWhereUniqueInput | user_interactionsWhereUniqueInput[]
  }

  export type voice_samplesUncheckedCreateNestedManyWithoutAgentsInput = {
    create?: XOR<voice_samplesCreateWithoutAgentsInput, voice_samplesUncheckedCreateWithoutAgentsInput> | voice_samplesCreateWithoutAgentsInput[] | voice_samplesUncheckedCreateWithoutAgentsInput[]
    connectOrCreate?: voice_samplesCreateOrConnectWithoutAgentsInput | voice_samplesCreateOrConnectWithoutAgentsInput[]
    createMany?: voice_samplesCreateManyAgentsInputEnvelope
    connect?: voice_samplesWhereUniqueInput | voice_samplesWhereUniqueInput[]
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type agentsUpdateintegrationsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type agentsUpdateindustriesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type rentalsUpdateManyWithoutAgentsNestedInput = {
    create?: XOR<rentalsCreateWithoutAgentsInput, rentalsUncheckedCreateWithoutAgentsInput> | rentalsCreateWithoutAgentsInput[] | rentalsUncheckedCreateWithoutAgentsInput[]
    connectOrCreate?: rentalsCreateOrConnectWithoutAgentsInput | rentalsCreateOrConnectWithoutAgentsInput[]
    upsert?: rentalsUpsertWithWhereUniqueWithoutAgentsInput | rentalsUpsertWithWhereUniqueWithoutAgentsInput[]
    createMany?: rentalsCreateManyAgentsInputEnvelope
    set?: rentalsWhereUniqueInput | rentalsWhereUniqueInput[]
    disconnect?: rentalsWhereUniqueInput | rentalsWhereUniqueInput[]
    delete?: rentalsWhereUniqueInput | rentalsWhereUniqueInput[]
    connect?: rentalsWhereUniqueInput | rentalsWhereUniqueInput[]
    update?: rentalsUpdateWithWhereUniqueWithoutAgentsInput | rentalsUpdateWithWhereUniqueWithoutAgentsInput[]
    updateMany?: rentalsUpdateManyWithWhereWithoutAgentsInput | rentalsUpdateManyWithWhereWithoutAgentsInput[]
    deleteMany?: rentalsScalarWhereInput | rentalsScalarWhereInput[]
  }

  export type user_interactionsUpdateManyWithoutAgentsNestedInput = {
    create?: XOR<user_interactionsCreateWithoutAgentsInput, user_interactionsUncheckedCreateWithoutAgentsInput> | user_interactionsCreateWithoutAgentsInput[] | user_interactionsUncheckedCreateWithoutAgentsInput[]
    connectOrCreate?: user_interactionsCreateOrConnectWithoutAgentsInput | user_interactionsCreateOrConnectWithoutAgentsInput[]
    upsert?: user_interactionsUpsertWithWhereUniqueWithoutAgentsInput | user_interactionsUpsertWithWhereUniqueWithoutAgentsInput[]
    createMany?: user_interactionsCreateManyAgentsInputEnvelope
    set?: user_interactionsWhereUniqueInput | user_interactionsWhereUniqueInput[]
    disconnect?: user_interactionsWhereUniqueInput | user_interactionsWhereUniqueInput[]
    delete?: user_interactionsWhereUniqueInput | user_interactionsWhereUniqueInput[]
    connect?: user_interactionsWhereUniqueInput | user_interactionsWhereUniqueInput[]
    update?: user_interactionsUpdateWithWhereUniqueWithoutAgentsInput | user_interactionsUpdateWithWhereUniqueWithoutAgentsInput[]
    updateMany?: user_interactionsUpdateManyWithWhereWithoutAgentsInput | user_interactionsUpdateManyWithWhereWithoutAgentsInput[]
    deleteMany?: user_interactionsScalarWhereInput | user_interactionsScalarWhereInput[]
  }

  export type voice_samplesUpdateManyWithoutAgentsNestedInput = {
    create?: XOR<voice_samplesCreateWithoutAgentsInput, voice_samplesUncheckedCreateWithoutAgentsInput> | voice_samplesCreateWithoutAgentsInput[] | voice_samplesUncheckedCreateWithoutAgentsInput[]
    connectOrCreate?: voice_samplesCreateOrConnectWithoutAgentsInput | voice_samplesCreateOrConnectWithoutAgentsInput[]
    upsert?: voice_samplesUpsertWithWhereUniqueWithoutAgentsInput | voice_samplesUpsertWithWhereUniqueWithoutAgentsInput[]
    createMany?: voice_samplesCreateManyAgentsInputEnvelope
    set?: voice_samplesWhereUniqueInput | voice_samplesWhereUniqueInput[]
    disconnect?: voice_samplesWhereUniqueInput | voice_samplesWhereUniqueInput[]
    delete?: voice_samplesWhereUniqueInput | voice_samplesWhereUniqueInput[]
    connect?: voice_samplesWhereUniqueInput | voice_samplesWhereUniqueInput[]
    update?: voice_samplesUpdateWithWhereUniqueWithoutAgentsInput | voice_samplesUpdateWithWhereUniqueWithoutAgentsInput[]
    updateMany?: voice_samplesUpdateManyWithWhereWithoutAgentsInput | voice_samplesUpdateManyWithWhereWithoutAgentsInput[]
    deleteMany?: voice_samplesScalarWhereInput | voice_samplesScalarWhereInput[]
  }

  export type rentalsUncheckedUpdateManyWithoutAgentsNestedInput = {
    create?: XOR<rentalsCreateWithoutAgentsInput, rentalsUncheckedCreateWithoutAgentsInput> | rentalsCreateWithoutAgentsInput[] | rentalsUncheckedCreateWithoutAgentsInput[]
    connectOrCreate?: rentalsCreateOrConnectWithoutAgentsInput | rentalsCreateOrConnectWithoutAgentsInput[]
    upsert?: rentalsUpsertWithWhereUniqueWithoutAgentsInput | rentalsUpsertWithWhereUniqueWithoutAgentsInput[]
    createMany?: rentalsCreateManyAgentsInputEnvelope
    set?: rentalsWhereUniqueInput | rentalsWhereUniqueInput[]
    disconnect?: rentalsWhereUniqueInput | rentalsWhereUniqueInput[]
    delete?: rentalsWhereUniqueInput | rentalsWhereUniqueInput[]
    connect?: rentalsWhereUniqueInput | rentalsWhereUniqueInput[]
    update?: rentalsUpdateWithWhereUniqueWithoutAgentsInput | rentalsUpdateWithWhereUniqueWithoutAgentsInput[]
    updateMany?: rentalsUpdateManyWithWhereWithoutAgentsInput | rentalsUpdateManyWithWhereWithoutAgentsInput[]
    deleteMany?: rentalsScalarWhereInput | rentalsScalarWhereInput[]
  }

  export type user_interactionsUncheckedUpdateManyWithoutAgentsNestedInput = {
    create?: XOR<user_interactionsCreateWithoutAgentsInput, user_interactionsUncheckedCreateWithoutAgentsInput> | user_interactionsCreateWithoutAgentsInput[] | user_interactionsUncheckedCreateWithoutAgentsInput[]
    connectOrCreate?: user_interactionsCreateOrConnectWithoutAgentsInput | user_interactionsCreateOrConnectWithoutAgentsInput[]
    upsert?: user_interactionsUpsertWithWhereUniqueWithoutAgentsInput | user_interactionsUpsertWithWhereUniqueWithoutAgentsInput[]
    createMany?: user_interactionsCreateManyAgentsInputEnvelope
    set?: user_interactionsWhereUniqueInput | user_interactionsWhereUniqueInput[]
    disconnect?: user_interactionsWhereUniqueInput | user_interactionsWhereUniqueInput[]
    delete?: user_interactionsWhereUniqueInput | user_interactionsWhereUniqueInput[]
    connect?: user_interactionsWhereUniqueInput | user_interactionsWhereUniqueInput[]
    update?: user_interactionsUpdateWithWhereUniqueWithoutAgentsInput | user_interactionsUpdateWithWhereUniqueWithoutAgentsInput[]
    updateMany?: user_interactionsUpdateManyWithWhereWithoutAgentsInput | user_interactionsUpdateManyWithWhereWithoutAgentsInput[]
    deleteMany?: user_interactionsScalarWhereInput | user_interactionsScalarWhereInput[]
  }

  export type voice_samplesUncheckedUpdateManyWithoutAgentsNestedInput = {
    create?: XOR<voice_samplesCreateWithoutAgentsInput, voice_samplesUncheckedCreateWithoutAgentsInput> | voice_samplesCreateWithoutAgentsInput[] | voice_samplesUncheckedCreateWithoutAgentsInput[]
    connectOrCreate?: voice_samplesCreateOrConnectWithoutAgentsInput | voice_samplesCreateOrConnectWithoutAgentsInput[]
    upsert?: voice_samplesUpsertWithWhereUniqueWithoutAgentsInput | voice_samplesUpsertWithWhereUniqueWithoutAgentsInput[]
    createMany?: voice_samplesCreateManyAgentsInputEnvelope
    set?: voice_samplesWhereUniqueInput | voice_samplesWhereUniqueInput[]
    disconnect?: voice_samplesWhereUniqueInput | voice_samplesWhereUniqueInput[]
    delete?: voice_samplesWhereUniqueInput | voice_samplesWhereUniqueInput[]
    connect?: voice_samplesWhereUniqueInput | voice_samplesWhereUniqueInput[]
    update?: voice_samplesUpdateWithWhereUniqueWithoutAgentsInput | voice_samplesUpdateWithWhereUniqueWithoutAgentsInput[]
    updateMany?: voice_samplesUpdateManyWithWhereWithoutAgentsInput | voice_samplesUpdateManyWithWhereWithoutAgentsInput[]
    deleteMany?: voice_samplesScalarWhereInput | voice_samplesScalarWhereInput[]
  }

  export type agent_feedbackCreateNestedManyWithoutAgents_customInput = {
    create?: XOR<agent_feedbackCreateWithoutAgents_customInput, agent_feedbackUncheckedCreateWithoutAgents_customInput> | agent_feedbackCreateWithoutAgents_customInput[] | agent_feedbackUncheckedCreateWithoutAgents_customInput[]
    connectOrCreate?: agent_feedbackCreateOrConnectWithoutAgents_customInput | agent_feedbackCreateOrConnectWithoutAgents_customInput[]
    createMany?: agent_feedbackCreateManyAgents_customInputEnvelope
    connect?: agent_feedbackWhereUniqueInput | agent_feedbackWhereUniqueInput[]
  }

  export type agent_languagesCreateNestedManyWithoutAgents_customInput = {
    create?: XOR<agent_languagesCreateWithoutAgents_customInput, agent_languagesUncheckedCreateWithoutAgents_customInput> | agent_languagesCreateWithoutAgents_customInput[] | agent_languagesUncheckedCreateWithoutAgents_customInput[]
    connectOrCreate?: agent_languagesCreateOrConnectWithoutAgents_customInput | agent_languagesCreateOrConnectWithoutAgents_customInput[]
    createMany?: agent_languagesCreateManyAgents_customInputEnvelope
    connect?: agent_languagesWhereUniqueInput | agent_languagesWhereUniqueInput[]
  }

  export type agent_performance_metricsCreateNestedManyWithoutAgents_customInput = {
    create?: XOR<agent_performance_metricsCreateWithoutAgents_customInput, agent_performance_metricsUncheckedCreateWithoutAgents_customInput> | agent_performance_metricsCreateWithoutAgents_customInput[] | agent_performance_metricsUncheckedCreateWithoutAgents_customInput[]
    connectOrCreate?: agent_performance_metricsCreateOrConnectWithoutAgents_customInput | agent_performance_metricsCreateOrConnectWithoutAgents_customInput[]
    createMany?: agent_performance_metricsCreateManyAgents_customInputEnvelope
    connect?: agent_performance_metricsWhereUniqueInput | agent_performance_metricsWhereUniqueInput[]
  }

  export type agent_usage_eventsCreateNestedManyWithoutAgents_customInput = {
    create?: XOR<agent_usage_eventsCreateWithoutAgents_customInput, agent_usage_eventsUncheckedCreateWithoutAgents_customInput> | agent_usage_eventsCreateWithoutAgents_customInput[] | agent_usage_eventsUncheckedCreateWithoutAgents_customInput[]
    connectOrCreate?: agent_usage_eventsCreateOrConnectWithoutAgents_customInput | agent_usage_eventsCreateOrConnectWithoutAgents_customInput[]
    createMany?: agent_usage_eventsCreateManyAgents_customInputEnvelope
    connect?: agent_usage_eventsWhereUniqueInput | agent_usage_eventsWhereUniqueInput[]
  }

  export type agent_feedbackUncheckedCreateNestedManyWithoutAgents_customInput = {
    create?: XOR<agent_feedbackCreateWithoutAgents_customInput, agent_feedbackUncheckedCreateWithoutAgents_customInput> | agent_feedbackCreateWithoutAgents_customInput[] | agent_feedbackUncheckedCreateWithoutAgents_customInput[]
    connectOrCreate?: agent_feedbackCreateOrConnectWithoutAgents_customInput | agent_feedbackCreateOrConnectWithoutAgents_customInput[]
    createMany?: agent_feedbackCreateManyAgents_customInputEnvelope
    connect?: agent_feedbackWhereUniqueInput | agent_feedbackWhereUniqueInput[]
  }

  export type agent_languagesUncheckedCreateNestedManyWithoutAgents_customInput = {
    create?: XOR<agent_languagesCreateWithoutAgents_customInput, agent_languagesUncheckedCreateWithoutAgents_customInput> | agent_languagesCreateWithoutAgents_customInput[] | agent_languagesUncheckedCreateWithoutAgents_customInput[]
    connectOrCreate?: agent_languagesCreateOrConnectWithoutAgents_customInput | agent_languagesCreateOrConnectWithoutAgents_customInput[]
    createMany?: agent_languagesCreateManyAgents_customInputEnvelope
    connect?: agent_languagesWhereUniqueInput | agent_languagesWhereUniqueInput[]
  }

  export type agent_performance_metricsUncheckedCreateNestedManyWithoutAgents_customInput = {
    create?: XOR<agent_performance_metricsCreateWithoutAgents_customInput, agent_performance_metricsUncheckedCreateWithoutAgents_customInput> | agent_performance_metricsCreateWithoutAgents_customInput[] | agent_performance_metricsUncheckedCreateWithoutAgents_customInput[]
    connectOrCreate?: agent_performance_metricsCreateOrConnectWithoutAgents_customInput | agent_performance_metricsCreateOrConnectWithoutAgents_customInput[]
    createMany?: agent_performance_metricsCreateManyAgents_customInputEnvelope
    connect?: agent_performance_metricsWhereUniqueInput | agent_performance_metricsWhereUniqueInput[]
  }

  export type agent_usage_eventsUncheckedCreateNestedManyWithoutAgents_customInput = {
    create?: XOR<agent_usage_eventsCreateWithoutAgents_customInput, agent_usage_eventsUncheckedCreateWithoutAgents_customInput> | agent_usage_eventsCreateWithoutAgents_customInput[] | agent_usage_eventsUncheckedCreateWithoutAgents_customInput[]
    connectOrCreate?: agent_usage_eventsCreateOrConnectWithoutAgents_customInput | agent_usage_eventsCreateOrConnectWithoutAgents_customInput[]
    createMany?: agent_usage_eventsCreateManyAgents_customInputEnvelope
    connect?: agent_usage_eventsWhereUniqueInput | agent_usage_eventsWhereUniqueInput[]
  }

  export type agent_feedbackUpdateManyWithoutAgents_customNestedInput = {
    create?: XOR<agent_feedbackCreateWithoutAgents_customInput, agent_feedbackUncheckedCreateWithoutAgents_customInput> | agent_feedbackCreateWithoutAgents_customInput[] | agent_feedbackUncheckedCreateWithoutAgents_customInput[]
    connectOrCreate?: agent_feedbackCreateOrConnectWithoutAgents_customInput | agent_feedbackCreateOrConnectWithoutAgents_customInput[]
    upsert?: agent_feedbackUpsertWithWhereUniqueWithoutAgents_customInput | agent_feedbackUpsertWithWhereUniqueWithoutAgents_customInput[]
    createMany?: agent_feedbackCreateManyAgents_customInputEnvelope
    set?: agent_feedbackWhereUniqueInput | agent_feedbackWhereUniqueInput[]
    disconnect?: agent_feedbackWhereUniqueInput | agent_feedbackWhereUniqueInput[]
    delete?: agent_feedbackWhereUniqueInput | agent_feedbackWhereUniqueInput[]
    connect?: agent_feedbackWhereUniqueInput | agent_feedbackWhereUniqueInput[]
    update?: agent_feedbackUpdateWithWhereUniqueWithoutAgents_customInput | agent_feedbackUpdateWithWhereUniqueWithoutAgents_customInput[]
    updateMany?: agent_feedbackUpdateManyWithWhereWithoutAgents_customInput | agent_feedbackUpdateManyWithWhereWithoutAgents_customInput[]
    deleteMany?: agent_feedbackScalarWhereInput | agent_feedbackScalarWhereInput[]
  }

  export type agent_languagesUpdateManyWithoutAgents_customNestedInput = {
    create?: XOR<agent_languagesCreateWithoutAgents_customInput, agent_languagesUncheckedCreateWithoutAgents_customInput> | agent_languagesCreateWithoutAgents_customInput[] | agent_languagesUncheckedCreateWithoutAgents_customInput[]
    connectOrCreate?: agent_languagesCreateOrConnectWithoutAgents_customInput | agent_languagesCreateOrConnectWithoutAgents_customInput[]
    upsert?: agent_languagesUpsertWithWhereUniqueWithoutAgents_customInput | agent_languagesUpsertWithWhereUniqueWithoutAgents_customInput[]
    createMany?: agent_languagesCreateManyAgents_customInputEnvelope
    set?: agent_languagesWhereUniqueInput | agent_languagesWhereUniqueInput[]
    disconnect?: agent_languagesWhereUniqueInput | agent_languagesWhereUniqueInput[]
    delete?: agent_languagesWhereUniqueInput | agent_languagesWhereUniqueInput[]
    connect?: agent_languagesWhereUniqueInput | agent_languagesWhereUniqueInput[]
    update?: agent_languagesUpdateWithWhereUniqueWithoutAgents_customInput | agent_languagesUpdateWithWhereUniqueWithoutAgents_customInput[]
    updateMany?: agent_languagesUpdateManyWithWhereWithoutAgents_customInput | agent_languagesUpdateManyWithWhereWithoutAgents_customInput[]
    deleteMany?: agent_languagesScalarWhereInput | agent_languagesScalarWhereInput[]
  }

  export type agent_performance_metricsUpdateManyWithoutAgents_customNestedInput = {
    create?: XOR<agent_performance_metricsCreateWithoutAgents_customInput, agent_performance_metricsUncheckedCreateWithoutAgents_customInput> | agent_performance_metricsCreateWithoutAgents_customInput[] | agent_performance_metricsUncheckedCreateWithoutAgents_customInput[]
    connectOrCreate?: agent_performance_metricsCreateOrConnectWithoutAgents_customInput | agent_performance_metricsCreateOrConnectWithoutAgents_customInput[]
    upsert?: agent_performance_metricsUpsertWithWhereUniqueWithoutAgents_customInput | agent_performance_metricsUpsertWithWhereUniqueWithoutAgents_customInput[]
    createMany?: agent_performance_metricsCreateManyAgents_customInputEnvelope
    set?: agent_performance_metricsWhereUniqueInput | agent_performance_metricsWhereUniqueInput[]
    disconnect?: agent_performance_metricsWhereUniqueInput | agent_performance_metricsWhereUniqueInput[]
    delete?: agent_performance_metricsWhereUniqueInput | agent_performance_metricsWhereUniqueInput[]
    connect?: agent_performance_metricsWhereUniqueInput | agent_performance_metricsWhereUniqueInput[]
    update?: agent_performance_metricsUpdateWithWhereUniqueWithoutAgents_customInput | agent_performance_metricsUpdateWithWhereUniqueWithoutAgents_customInput[]
    updateMany?: agent_performance_metricsUpdateManyWithWhereWithoutAgents_customInput | agent_performance_metricsUpdateManyWithWhereWithoutAgents_customInput[]
    deleteMany?: agent_performance_metricsScalarWhereInput | agent_performance_metricsScalarWhereInput[]
  }

  export type agent_usage_eventsUpdateManyWithoutAgents_customNestedInput = {
    create?: XOR<agent_usage_eventsCreateWithoutAgents_customInput, agent_usage_eventsUncheckedCreateWithoutAgents_customInput> | agent_usage_eventsCreateWithoutAgents_customInput[] | agent_usage_eventsUncheckedCreateWithoutAgents_customInput[]
    connectOrCreate?: agent_usage_eventsCreateOrConnectWithoutAgents_customInput | agent_usage_eventsCreateOrConnectWithoutAgents_customInput[]
    upsert?: agent_usage_eventsUpsertWithWhereUniqueWithoutAgents_customInput | agent_usage_eventsUpsertWithWhereUniqueWithoutAgents_customInput[]
    createMany?: agent_usage_eventsCreateManyAgents_customInputEnvelope
    set?: agent_usage_eventsWhereUniqueInput | agent_usage_eventsWhereUniqueInput[]
    disconnect?: agent_usage_eventsWhereUniqueInput | agent_usage_eventsWhereUniqueInput[]
    delete?: agent_usage_eventsWhereUniqueInput | agent_usage_eventsWhereUniqueInput[]
    connect?: agent_usage_eventsWhereUniqueInput | agent_usage_eventsWhereUniqueInput[]
    update?: agent_usage_eventsUpdateWithWhereUniqueWithoutAgents_customInput | agent_usage_eventsUpdateWithWhereUniqueWithoutAgents_customInput[]
    updateMany?: agent_usage_eventsUpdateManyWithWhereWithoutAgents_customInput | agent_usage_eventsUpdateManyWithWhereWithoutAgents_customInput[]
    deleteMany?: agent_usage_eventsScalarWhereInput | agent_usage_eventsScalarWhereInput[]
  }

  export type agent_feedbackUncheckedUpdateManyWithoutAgents_customNestedInput = {
    create?: XOR<agent_feedbackCreateWithoutAgents_customInput, agent_feedbackUncheckedCreateWithoutAgents_customInput> | agent_feedbackCreateWithoutAgents_customInput[] | agent_feedbackUncheckedCreateWithoutAgents_customInput[]
    connectOrCreate?: agent_feedbackCreateOrConnectWithoutAgents_customInput | agent_feedbackCreateOrConnectWithoutAgents_customInput[]
    upsert?: agent_feedbackUpsertWithWhereUniqueWithoutAgents_customInput | agent_feedbackUpsertWithWhereUniqueWithoutAgents_customInput[]
    createMany?: agent_feedbackCreateManyAgents_customInputEnvelope
    set?: agent_feedbackWhereUniqueInput | agent_feedbackWhereUniqueInput[]
    disconnect?: agent_feedbackWhereUniqueInput | agent_feedbackWhereUniqueInput[]
    delete?: agent_feedbackWhereUniqueInput | agent_feedbackWhereUniqueInput[]
    connect?: agent_feedbackWhereUniqueInput | agent_feedbackWhereUniqueInput[]
    update?: agent_feedbackUpdateWithWhereUniqueWithoutAgents_customInput | agent_feedbackUpdateWithWhereUniqueWithoutAgents_customInput[]
    updateMany?: agent_feedbackUpdateManyWithWhereWithoutAgents_customInput | agent_feedbackUpdateManyWithWhereWithoutAgents_customInput[]
    deleteMany?: agent_feedbackScalarWhereInput | agent_feedbackScalarWhereInput[]
  }

  export type agent_languagesUncheckedUpdateManyWithoutAgents_customNestedInput = {
    create?: XOR<agent_languagesCreateWithoutAgents_customInput, agent_languagesUncheckedCreateWithoutAgents_customInput> | agent_languagesCreateWithoutAgents_customInput[] | agent_languagesUncheckedCreateWithoutAgents_customInput[]
    connectOrCreate?: agent_languagesCreateOrConnectWithoutAgents_customInput | agent_languagesCreateOrConnectWithoutAgents_customInput[]
    upsert?: agent_languagesUpsertWithWhereUniqueWithoutAgents_customInput | agent_languagesUpsertWithWhereUniqueWithoutAgents_customInput[]
    createMany?: agent_languagesCreateManyAgents_customInputEnvelope
    set?: agent_languagesWhereUniqueInput | agent_languagesWhereUniqueInput[]
    disconnect?: agent_languagesWhereUniqueInput | agent_languagesWhereUniqueInput[]
    delete?: agent_languagesWhereUniqueInput | agent_languagesWhereUniqueInput[]
    connect?: agent_languagesWhereUniqueInput | agent_languagesWhereUniqueInput[]
    update?: agent_languagesUpdateWithWhereUniqueWithoutAgents_customInput | agent_languagesUpdateWithWhereUniqueWithoutAgents_customInput[]
    updateMany?: agent_languagesUpdateManyWithWhereWithoutAgents_customInput | agent_languagesUpdateManyWithWhereWithoutAgents_customInput[]
    deleteMany?: agent_languagesScalarWhereInput | agent_languagesScalarWhereInput[]
  }

  export type agent_performance_metricsUncheckedUpdateManyWithoutAgents_customNestedInput = {
    create?: XOR<agent_performance_metricsCreateWithoutAgents_customInput, agent_performance_metricsUncheckedCreateWithoutAgents_customInput> | agent_performance_metricsCreateWithoutAgents_customInput[] | agent_performance_metricsUncheckedCreateWithoutAgents_customInput[]
    connectOrCreate?: agent_performance_metricsCreateOrConnectWithoutAgents_customInput | agent_performance_metricsCreateOrConnectWithoutAgents_customInput[]
    upsert?: agent_performance_metricsUpsertWithWhereUniqueWithoutAgents_customInput | agent_performance_metricsUpsertWithWhereUniqueWithoutAgents_customInput[]
    createMany?: agent_performance_metricsCreateManyAgents_customInputEnvelope
    set?: agent_performance_metricsWhereUniqueInput | agent_performance_metricsWhereUniqueInput[]
    disconnect?: agent_performance_metricsWhereUniqueInput | agent_performance_metricsWhereUniqueInput[]
    delete?: agent_performance_metricsWhereUniqueInput | agent_performance_metricsWhereUniqueInput[]
    connect?: agent_performance_metricsWhereUniqueInput | agent_performance_metricsWhereUniqueInput[]
    update?: agent_performance_metricsUpdateWithWhereUniqueWithoutAgents_customInput | agent_performance_metricsUpdateWithWhereUniqueWithoutAgents_customInput[]
    updateMany?: agent_performance_metricsUpdateManyWithWhereWithoutAgents_customInput | agent_performance_metricsUpdateManyWithWhereWithoutAgents_customInput[]
    deleteMany?: agent_performance_metricsScalarWhereInput | agent_performance_metricsScalarWhereInput[]
  }

  export type agent_usage_eventsUncheckedUpdateManyWithoutAgents_customNestedInput = {
    create?: XOR<agent_usage_eventsCreateWithoutAgents_customInput, agent_usage_eventsUncheckedCreateWithoutAgents_customInput> | agent_usage_eventsCreateWithoutAgents_customInput[] | agent_usage_eventsUncheckedCreateWithoutAgents_customInput[]
    connectOrCreate?: agent_usage_eventsCreateOrConnectWithoutAgents_customInput | agent_usage_eventsCreateOrConnectWithoutAgents_customInput[]
    upsert?: agent_usage_eventsUpsertWithWhereUniqueWithoutAgents_customInput | agent_usage_eventsUpsertWithWhereUniqueWithoutAgents_customInput[]
    createMany?: agent_usage_eventsCreateManyAgents_customInputEnvelope
    set?: agent_usage_eventsWhereUniqueInput | agent_usage_eventsWhereUniqueInput[]
    disconnect?: agent_usage_eventsWhereUniqueInput | agent_usage_eventsWhereUniqueInput[]
    delete?: agent_usage_eventsWhereUniqueInput | agent_usage_eventsWhereUniqueInput[]
    connect?: agent_usage_eventsWhereUniqueInput | agent_usage_eventsWhereUniqueInput[]
    update?: agent_usage_eventsUpdateWithWhereUniqueWithoutAgents_customInput | agent_usage_eventsUpdateWithWhereUniqueWithoutAgents_customInput[]
    updateMany?: agent_usage_eventsUpdateManyWithWhereWithoutAgents_customInput | agent_usage_eventsUpdateManyWithWhereWithoutAgents_customInput[]
    deleteMany?: agent_usage_eventsScalarWhereInput | agent_usage_eventsScalarWhereInput[]
  }

  export type contractor_contextCreatespecializationsInput = {
    set: string[]
  }

  export type contractor_contextCreatepreferred_integrationsInput = {
    set: string[]
  }

  export type contractor_contextCreatepreferred_agent_typesInput = {
    set: string[]
  }

  export type contractor_contextUpdatespecializationsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type contractor_contextUpdatepreferred_integrationsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type contractor_contextUpdatepreferred_agent_typesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type agentsCreateNestedOneWithoutRentalsInput = {
    create?: XOR<agentsCreateWithoutRentalsInput, agentsUncheckedCreateWithoutRentalsInput>
    connectOrCreate?: agentsCreateOrConnectWithoutRentalsInput
    connect?: agentsWhereUniqueInput
  }

  export type agentsUpdateOneWithoutRentalsNestedInput = {
    create?: XOR<agentsCreateWithoutRentalsInput, agentsUncheckedCreateWithoutRentalsInput>
    connectOrCreate?: agentsCreateOrConnectWithoutRentalsInput
    upsert?: agentsUpsertWithoutRentalsInput
    disconnect?: agentsWhereInput | boolean
    delete?: agentsWhereInput | boolean
    connect?: agentsWhereUniqueInput
    update?: XOR<XOR<agentsUpdateToOneWithWhereWithoutRentalsInput, agentsUpdateWithoutRentalsInput>, agentsUncheckedUpdateWithoutRentalsInput>
  }

  export type agentsCreateNestedOneWithoutUser_interactionsInput = {
    create?: XOR<agentsCreateWithoutUser_interactionsInput, agentsUncheckedCreateWithoutUser_interactionsInput>
    connectOrCreate?: agentsCreateOrConnectWithoutUser_interactionsInput
    connect?: agentsWhereUniqueInput
  }

  export type agentsUpdateOneWithoutUser_interactionsNestedInput = {
    create?: XOR<agentsCreateWithoutUser_interactionsInput, agentsUncheckedCreateWithoutUser_interactionsInput>
    connectOrCreate?: agentsCreateOrConnectWithoutUser_interactionsInput
    upsert?: agentsUpsertWithoutUser_interactionsInput
    disconnect?: agentsWhereInput | boolean
    delete?: agentsWhereInput | boolean
    connect?: agentsWhereUniqueInput
    update?: XOR<XOR<agentsUpdateToOneWithWhereWithoutUser_interactionsInput, agentsUpdateWithoutUser_interactionsInput>, agentsUncheckedUpdateWithoutUser_interactionsInput>
  }

  export type agentsCreateNestedOneWithoutVoice_samplesInput = {
    create?: XOR<agentsCreateWithoutVoice_samplesInput, agentsUncheckedCreateWithoutVoice_samplesInput>
    connectOrCreate?: agentsCreateOrConnectWithoutVoice_samplesInput
    connect?: agentsWhereUniqueInput
  }

  export type agentsUpdateOneWithoutVoice_samplesNestedInput = {
    create?: XOR<agentsCreateWithoutVoice_samplesInput, agentsUncheckedCreateWithoutVoice_samplesInput>
    connectOrCreate?: agentsCreateOrConnectWithoutVoice_samplesInput
    upsert?: agentsUpsertWithoutVoice_samplesInput
    disconnect?: agentsWhereInput | boolean
    delete?: agentsWhereInput | boolean
    connect?: agentsWhereUniqueInput
    update?: XOR<XOR<agentsUpdateToOneWithWhereWithoutVoice_samplesInput, agentsUpdateWithoutVoice_samplesInput>, agentsUncheckedUpdateWithoutVoice_samplesInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type agents_customCreateWithoutAgent_feedbackInput = {
    user_id?: string | null
    name: string
    template_id: string
    personality: string
    voice_id: string
    voice_settings?: NullableJsonNullValueInput | InputJsonValue
    environment_setting?: string | null
    integrations?: NullableJsonNullValueInput | InputJsonValue
    pricing?: NullableJsonNullValueInput | InputJsonValue
    status?: string | null
    demo_available?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    agent_languages?: agent_languagesCreateNestedManyWithoutAgents_customInput
    agent_performance_metrics?: agent_performance_metricsCreateNestedManyWithoutAgents_customInput
    agent_usage_events?: agent_usage_eventsCreateNestedManyWithoutAgents_customInput
  }

  export type agents_customUncheckedCreateWithoutAgent_feedbackInput = {
    id?: number
    user_id?: string | null
    name: string
    template_id: string
    personality: string
    voice_id: string
    voice_settings?: NullableJsonNullValueInput | InputJsonValue
    environment_setting?: string | null
    integrations?: NullableJsonNullValueInput | InputJsonValue
    pricing?: NullableJsonNullValueInput | InputJsonValue
    status?: string | null
    demo_available?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    agent_languages?: agent_languagesUncheckedCreateNestedManyWithoutAgents_customInput
    agent_performance_metrics?: agent_performance_metricsUncheckedCreateNestedManyWithoutAgents_customInput
    agent_usage_events?: agent_usage_eventsUncheckedCreateNestedManyWithoutAgents_customInput
  }

  export type agents_customCreateOrConnectWithoutAgent_feedbackInput = {
    where: agents_customWhereUniqueInput
    create: XOR<agents_customCreateWithoutAgent_feedbackInput, agents_customUncheckedCreateWithoutAgent_feedbackInput>
  }

  export type agents_customUpsertWithoutAgent_feedbackInput = {
    update: XOR<agents_customUpdateWithoutAgent_feedbackInput, agents_customUncheckedUpdateWithoutAgent_feedbackInput>
    create: XOR<agents_customCreateWithoutAgent_feedbackInput, agents_customUncheckedCreateWithoutAgent_feedbackInput>
    where?: agents_customWhereInput
  }

  export type agents_customUpdateToOneWithWhereWithoutAgent_feedbackInput = {
    where?: agents_customWhereInput
    data: XOR<agents_customUpdateWithoutAgent_feedbackInput, agents_customUncheckedUpdateWithoutAgent_feedbackInput>
  }

  export type agents_customUpdateWithoutAgent_feedbackInput = {
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    template_id?: StringFieldUpdateOperationsInput | string
    personality?: StringFieldUpdateOperationsInput | string
    voice_id?: StringFieldUpdateOperationsInput | string
    voice_settings?: NullableJsonNullValueInput | InputJsonValue
    environment_setting?: NullableStringFieldUpdateOperationsInput | string | null
    integrations?: NullableJsonNullValueInput | InputJsonValue
    pricing?: NullableJsonNullValueInput | InputJsonValue
    status?: NullableStringFieldUpdateOperationsInput | string | null
    demo_available?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agent_languages?: agent_languagesUpdateManyWithoutAgents_customNestedInput
    agent_performance_metrics?: agent_performance_metricsUpdateManyWithoutAgents_customNestedInput
    agent_usage_events?: agent_usage_eventsUpdateManyWithoutAgents_customNestedInput
  }

  export type agents_customUncheckedUpdateWithoutAgent_feedbackInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    template_id?: StringFieldUpdateOperationsInput | string
    personality?: StringFieldUpdateOperationsInput | string
    voice_id?: StringFieldUpdateOperationsInput | string
    voice_settings?: NullableJsonNullValueInput | InputJsonValue
    environment_setting?: NullableStringFieldUpdateOperationsInput | string | null
    integrations?: NullableJsonNullValueInput | InputJsonValue
    pricing?: NullableJsonNullValueInput | InputJsonValue
    status?: NullableStringFieldUpdateOperationsInput | string | null
    demo_available?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agent_languages?: agent_languagesUncheckedUpdateManyWithoutAgents_customNestedInput
    agent_performance_metrics?: agent_performance_metricsUncheckedUpdateManyWithoutAgents_customNestedInput
    agent_usage_events?: agent_usage_eventsUncheckedUpdateManyWithoutAgents_customNestedInput
  }

  export type agents_customCreateWithoutAgent_languagesInput = {
    user_id?: string | null
    name: string
    template_id: string
    personality: string
    voice_id: string
    voice_settings?: NullableJsonNullValueInput | InputJsonValue
    environment_setting?: string | null
    integrations?: NullableJsonNullValueInput | InputJsonValue
    pricing?: NullableJsonNullValueInput | InputJsonValue
    status?: string | null
    demo_available?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    agent_feedback?: agent_feedbackCreateNestedManyWithoutAgents_customInput
    agent_performance_metrics?: agent_performance_metricsCreateNestedManyWithoutAgents_customInput
    agent_usage_events?: agent_usage_eventsCreateNestedManyWithoutAgents_customInput
  }

  export type agents_customUncheckedCreateWithoutAgent_languagesInput = {
    id?: number
    user_id?: string | null
    name: string
    template_id: string
    personality: string
    voice_id: string
    voice_settings?: NullableJsonNullValueInput | InputJsonValue
    environment_setting?: string | null
    integrations?: NullableJsonNullValueInput | InputJsonValue
    pricing?: NullableJsonNullValueInput | InputJsonValue
    status?: string | null
    demo_available?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    agent_feedback?: agent_feedbackUncheckedCreateNestedManyWithoutAgents_customInput
    agent_performance_metrics?: agent_performance_metricsUncheckedCreateNestedManyWithoutAgents_customInput
    agent_usage_events?: agent_usage_eventsUncheckedCreateNestedManyWithoutAgents_customInput
  }

  export type agents_customCreateOrConnectWithoutAgent_languagesInput = {
    where: agents_customWhereUniqueInput
    create: XOR<agents_customCreateWithoutAgent_languagesInput, agents_customUncheckedCreateWithoutAgent_languagesInput>
  }

  export type agents_customUpsertWithoutAgent_languagesInput = {
    update: XOR<agents_customUpdateWithoutAgent_languagesInput, agents_customUncheckedUpdateWithoutAgent_languagesInput>
    create: XOR<agents_customCreateWithoutAgent_languagesInput, agents_customUncheckedCreateWithoutAgent_languagesInput>
    where?: agents_customWhereInput
  }

  export type agents_customUpdateToOneWithWhereWithoutAgent_languagesInput = {
    where?: agents_customWhereInput
    data: XOR<agents_customUpdateWithoutAgent_languagesInput, agents_customUncheckedUpdateWithoutAgent_languagesInput>
  }

  export type agents_customUpdateWithoutAgent_languagesInput = {
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    template_id?: StringFieldUpdateOperationsInput | string
    personality?: StringFieldUpdateOperationsInput | string
    voice_id?: StringFieldUpdateOperationsInput | string
    voice_settings?: NullableJsonNullValueInput | InputJsonValue
    environment_setting?: NullableStringFieldUpdateOperationsInput | string | null
    integrations?: NullableJsonNullValueInput | InputJsonValue
    pricing?: NullableJsonNullValueInput | InputJsonValue
    status?: NullableStringFieldUpdateOperationsInput | string | null
    demo_available?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agent_feedback?: agent_feedbackUpdateManyWithoutAgents_customNestedInput
    agent_performance_metrics?: agent_performance_metricsUpdateManyWithoutAgents_customNestedInput
    agent_usage_events?: agent_usage_eventsUpdateManyWithoutAgents_customNestedInput
  }

  export type agents_customUncheckedUpdateWithoutAgent_languagesInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    template_id?: StringFieldUpdateOperationsInput | string
    personality?: StringFieldUpdateOperationsInput | string
    voice_id?: StringFieldUpdateOperationsInput | string
    voice_settings?: NullableJsonNullValueInput | InputJsonValue
    environment_setting?: NullableStringFieldUpdateOperationsInput | string | null
    integrations?: NullableJsonNullValueInput | InputJsonValue
    pricing?: NullableJsonNullValueInput | InputJsonValue
    status?: NullableStringFieldUpdateOperationsInput | string | null
    demo_available?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agent_feedback?: agent_feedbackUncheckedUpdateManyWithoutAgents_customNestedInput
    agent_performance_metrics?: agent_performance_metricsUncheckedUpdateManyWithoutAgents_customNestedInput
    agent_usage_events?: agent_usage_eventsUncheckedUpdateManyWithoutAgents_customNestedInput
  }

  export type agents_customCreateWithoutAgent_performance_metricsInput = {
    user_id?: string | null
    name: string
    template_id: string
    personality: string
    voice_id: string
    voice_settings?: NullableJsonNullValueInput | InputJsonValue
    environment_setting?: string | null
    integrations?: NullableJsonNullValueInput | InputJsonValue
    pricing?: NullableJsonNullValueInput | InputJsonValue
    status?: string | null
    demo_available?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    agent_feedback?: agent_feedbackCreateNestedManyWithoutAgents_customInput
    agent_languages?: agent_languagesCreateNestedManyWithoutAgents_customInput
    agent_usage_events?: agent_usage_eventsCreateNestedManyWithoutAgents_customInput
  }

  export type agents_customUncheckedCreateWithoutAgent_performance_metricsInput = {
    id?: number
    user_id?: string | null
    name: string
    template_id: string
    personality: string
    voice_id: string
    voice_settings?: NullableJsonNullValueInput | InputJsonValue
    environment_setting?: string | null
    integrations?: NullableJsonNullValueInput | InputJsonValue
    pricing?: NullableJsonNullValueInput | InputJsonValue
    status?: string | null
    demo_available?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    agent_feedback?: agent_feedbackUncheckedCreateNestedManyWithoutAgents_customInput
    agent_languages?: agent_languagesUncheckedCreateNestedManyWithoutAgents_customInput
    agent_usage_events?: agent_usage_eventsUncheckedCreateNestedManyWithoutAgents_customInput
  }

  export type agents_customCreateOrConnectWithoutAgent_performance_metricsInput = {
    where: agents_customWhereUniqueInput
    create: XOR<agents_customCreateWithoutAgent_performance_metricsInput, agents_customUncheckedCreateWithoutAgent_performance_metricsInput>
  }

  export type agents_customUpsertWithoutAgent_performance_metricsInput = {
    update: XOR<agents_customUpdateWithoutAgent_performance_metricsInput, agents_customUncheckedUpdateWithoutAgent_performance_metricsInput>
    create: XOR<agents_customCreateWithoutAgent_performance_metricsInput, agents_customUncheckedCreateWithoutAgent_performance_metricsInput>
    where?: agents_customWhereInput
  }

  export type agents_customUpdateToOneWithWhereWithoutAgent_performance_metricsInput = {
    where?: agents_customWhereInput
    data: XOR<agents_customUpdateWithoutAgent_performance_metricsInput, agents_customUncheckedUpdateWithoutAgent_performance_metricsInput>
  }

  export type agents_customUpdateWithoutAgent_performance_metricsInput = {
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    template_id?: StringFieldUpdateOperationsInput | string
    personality?: StringFieldUpdateOperationsInput | string
    voice_id?: StringFieldUpdateOperationsInput | string
    voice_settings?: NullableJsonNullValueInput | InputJsonValue
    environment_setting?: NullableStringFieldUpdateOperationsInput | string | null
    integrations?: NullableJsonNullValueInput | InputJsonValue
    pricing?: NullableJsonNullValueInput | InputJsonValue
    status?: NullableStringFieldUpdateOperationsInput | string | null
    demo_available?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agent_feedback?: agent_feedbackUpdateManyWithoutAgents_customNestedInput
    agent_languages?: agent_languagesUpdateManyWithoutAgents_customNestedInput
    agent_usage_events?: agent_usage_eventsUpdateManyWithoutAgents_customNestedInput
  }

  export type agents_customUncheckedUpdateWithoutAgent_performance_metricsInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    template_id?: StringFieldUpdateOperationsInput | string
    personality?: StringFieldUpdateOperationsInput | string
    voice_id?: StringFieldUpdateOperationsInput | string
    voice_settings?: NullableJsonNullValueInput | InputJsonValue
    environment_setting?: NullableStringFieldUpdateOperationsInput | string | null
    integrations?: NullableJsonNullValueInput | InputJsonValue
    pricing?: NullableJsonNullValueInput | InputJsonValue
    status?: NullableStringFieldUpdateOperationsInput | string | null
    demo_available?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agent_feedback?: agent_feedbackUncheckedUpdateManyWithoutAgents_customNestedInput
    agent_languages?: agent_languagesUncheckedUpdateManyWithoutAgents_customNestedInput
    agent_usage_events?: agent_usage_eventsUncheckedUpdateManyWithoutAgents_customNestedInput
  }

  export type agents_customCreateWithoutAgent_usage_eventsInput = {
    user_id?: string | null
    name: string
    template_id: string
    personality: string
    voice_id: string
    voice_settings?: NullableJsonNullValueInput | InputJsonValue
    environment_setting?: string | null
    integrations?: NullableJsonNullValueInput | InputJsonValue
    pricing?: NullableJsonNullValueInput | InputJsonValue
    status?: string | null
    demo_available?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    agent_feedback?: agent_feedbackCreateNestedManyWithoutAgents_customInput
    agent_languages?: agent_languagesCreateNestedManyWithoutAgents_customInput
    agent_performance_metrics?: agent_performance_metricsCreateNestedManyWithoutAgents_customInput
  }

  export type agents_customUncheckedCreateWithoutAgent_usage_eventsInput = {
    id?: number
    user_id?: string | null
    name: string
    template_id: string
    personality: string
    voice_id: string
    voice_settings?: NullableJsonNullValueInput | InputJsonValue
    environment_setting?: string | null
    integrations?: NullableJsonNullValueInput | InputJsonValue
    pricing?: NullableJsonNullValueInput | InputJsonValue
    status?: string | null
    demo_available?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    agent_feedback?: agent_feedbackUncheckedCreateNestedManyWithoutAgents_customInput
    agent_languages?: agent_languagesUncheckedCreateNestedManyWithoutAgents_customInput
    agent_performance_metrics?: agent_performance_metricsUncheckedCreateNestedManyWithoutAgents_customInput
  }

  export type agents_customCreateOrConnectWithoutAgent_usage_eventsInput = {
    where: agents_customWhereUniqueInput
    create: XOR<agents_customCreateWithoutAgent_usage_eventsInput, agents_customUncheckedCreateWithoutAgent_usage_eventsInput>
  }

  export type agents_customUpsertWithoutAgent_usage_eventsInput = {
    update: XOR<agents_customUpdateWithoutAgent_usage_eventsInput, agents_customUncheckedUpdateWithoutAgent_usage_eventsInput>
    create: XOR<agents_customCreateWithoutAgent_usage_eventsInput, agents_customUncheckedCreateWithoutAgent_usage_eventsInput>
    where?: agents_customWhereInput
  }

  export type agents_customUpdateToOneWithWhereWithoutAgent_usage_eventsInput = {
    where?: agents_customWhereInput
    data: XOR<agents_customUpdateWithoutAgent_usage_eventsInput, agents_customUncheckedUpdateWithoutAgent_usage_eventsInput>
  }

  export type agents_customUpdateWithoutAgent_usage_eventsInput = {
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    template_id?: StringFieldUpdateOperationsInput | string
    personality?: StringFieldUpdateOperationsInput | string
    voice_id?: StringFieldUpdateOperationsInput | string
    voice_settings?: NullableJsonNullValueInput | InputJsonValue
    environment_setting?: NullableStringFieldUpdateOperationsInput | string | null
    integrations?: NullableJsonNullValueInput | InputJsonValue
    pricing?: NullableJsonNullValueInput | InputJsonValue
    status?: NullableStringFieldUpdateOperationsInput | string | null
    demo_available?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agent_feedback?: agent_feedbackUpdateManyWithoutAgents_customNestedInput
    agent_languages?: agent_languagesUpdateManyWithoutAgents_customNestedInput
    agent_performance_metrics?: agent_performance_metricsUpdateManyWithoutAgents_customNestedInput
  }

  export type agents_customUncheckedUpdateWithoutAgent_usage_eventsInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    template_id?: StringFieldUpdateOperationsInput | string
    personality?: StringFieldUpdateOperationsInput | string
    voice_id?: StringFieldUpdateOperationsInput | string
    voice_settings?: NullableJsonNullValueInput | InputJsonValue
    environment_setting?: NullableStringFieldUpdateOperationsInput | string | null
    integrations?: NullableJsonNullValueInput | InputJsonValue
    pricing?: NullableJsonNullValueInput | InputJsonValue
    status?: NullableStringFieldUpdateOperationsInput | string | null
    demo_available?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agent_feedback?: agent_feedbackUncheckedUpdateManyWithoutAgents_customNestedInput
    agent_languages?: agent_languagesUncheckedUpdateManyWithoutAgents_customNestedInput
    agent_performance_metrics?: agent_performance_metricsUncheckedUpdateManyWithoutAgents_customNestedInput
  }

  export type rentalsCreateWithoutAgentsInput = {
    user_email: string
    user_name?: string | null
    rental_type?: string | null
    start_date?: Date | string | null
    end_date?: Date | string | null
    duration_hours?: number | null
    base_price?: Decimal | DecimalJsLike | number | string | null
    context_adjustment?: Decimal | DecimalJsLike | number | string | null
    discount_percent?: Decimal | DecimalJsLike | number | string | null
    total_price?: Decimal | DecimalJsLike | number | string | null
    retell_phone_number?: string | null
    elevenlabs_voice_config?: NullableJsonNullValueInput | InputJsonValue
    gemini_customizations?: NullableJsonNullValueInput | InputJsonValue
    context_snapshot?: NullableJsonNullValueInput | InputJsonValue
    environmental_conditions?: NullableJsonNullValueInput | InputJsonValue
    performance_metrics?: NullableJsonNullValueInput | InputJsonValue
    stripe_payment_intent_id?: string | null
    status?: string | null
    satisfaction_score?: Decimal | DecimalJsLike | number | string | null
    context_match_accuracy?: Decimal | DecimalJsLike | number | string | null
    optimization_suggestions?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string | null
    completed_at?: Date | string | null
  }

  export type rentalsUncheckedCreateWithoutAgentsInput = {
    id?: number
    user_email: string
    user_name?: string | null
    rental_type?: string | null
    start_date?: Date | string | null
    end_date?: Date | string | null
    duration_hours?: number | null
    base_price?: Decimal | DecimalJsLike | number | string | null
    context_adjustment?: Decimal | DecimalJsLike | number | string | null
    discount_percent?: Decimal | DecimalJsLike | number | string | null
    total_price?: Decimal | DecimalJsLike | number | string | null
    retell_phone_number?: string | null
    elevenlabs_voice_config?: NullableJsonNullValueInput | InputJsonValue
    gemini_customizations?: NullableJsonNullValueInput | InputJsonValue
    context_snapshot?: NullableJsonNullValueInput | InputJsonValue
    environmental_conditions?: NullableJsonNullValueInput | InputJsonValue
    performance_metrics?: NullableJsonNullValueInput | InputJsonValue
    stripe_payment_intent_id?: string | null
    status?: string | null
    satisfaction_score?: Decimal | DecimalJsLike | number | string | null
    context_match_accuracy?: Decimal | DecimalJsLike | number | string | null
    optimization_suggestions?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string | null
    completed_at?: Date | string | null
  }

  export type rentalsCreateOrConnectWithoutAgentsInput = {
    where: rentalsWhereUniqueInput
    create: XOR<rentalsCreateWithoutAgentsInput, rentalsUncheckedCreateWithoutAgentsInput>
  }

  export type rentalsCreateManyAgentsInputEnvelope = {
    data: rentalsCreateManyAgentsInput | rentalsCreateManyAgentsInput[]
    skipDuplicates?: boolean
  }

  export type user_interactionsCreateWithoutAgentsInput = {
    user_email?: string | null
    action?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    context_at_interaction?: NullableJsonNullValueInput | InputJsonValue
    device_context?: NullableJsonNullValueInput | InputJsonValue
    environmental_context?: NullableJsonNullValueInput | InputJsonValue
    user_satisfaction?: Decimal | DecimalJsLike | number | string | null
    context_relevance?: Decimal | DecimalJsLike | number | string | null
    optimization_data?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string | null
  }

  export type user_interactionsUncheckedCreateWithoutAgentsInput = {
    id?: number
    user_email?: string | null
    action?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    context_at_interaction?: NullableJsonNullValueInput | InputJsonValue
    device_context?: NullableJsonNullValueInput | InputJsonValue
    environmental_context?: NullableJsonNullValueInput | InputJsonValue
    user_satisfaction?: Decimal | DecimalJsLike | number | string | null
    context_relevance?: Decimal | DecimalJsLike | number | string | null
    optimization_data?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string | null
  }

  export type user_interactionsCreateOrConnectWithoutAgentsInput = {
    where: user_interactionsWhereUniqueInput
    create: XOR<user_interactionsCreateWithoutAgentsInput, user_interactionsUncheckedCreateWithoutAgentsInput>
  }

  export type user_interactionsCreateManyAgentsInputEnvelope = {
    data: user_interactionsCreateManyAgentsInput | user_interactionsCreateManyAgentsInput[]
    skipDuplicates?: boolean
  }

  export type voice_samplesCreateWithoutAgentsInput = {
    sample_text?: string | null
    elevenlabs_audio_url?: string | null
    duration_seconds?: number | null
    environmental_variants?: NullableJsonNullValueInput | InputJsonValue
    noise_optimization?: NullableJsonNullValueInput | InputJsonValue
    device_optimization?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string | null
  }

  export type voice_samplesUncheckedCreateWithoutAgentsInput = {
    id?: number
    sample_text?: string | null
    elevenlabs_audio_url?: string | null
    duration_seconds?: number | null
    environmental_variants?: NullableJsonNullValueInput | InputJsonValue
    noise_optimization?: NullableJsonNullValueInput | InputJsonValue
    device_optimization?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string | null
  }

  export type voice_samplesCreateOrConnectWithoutAgentsInput = {
    where: voice_samplesWhereUniqueInput
    create: XOR<voice_samplesCreateWithoutAgentsInput, voice_samplesUncheckedCreateWithoutAgentsInput>
  }

  export type voice_samplesCreateManyAgentsInputEnvelope = {
    data: voice_samplesCreateManyAgentsInput | voice_samplesCreateManyAgentsInput[]
    skipDuplicates?: boolean
  }

  export type rentalsUpsertWithWhereUniqueWithoutAgentsInput = {
    where: rentalsWhereUniqueInput
    update: XOR<rentalsUpdateWithoutAgentsInput, rentalsUncheckedUpdateWithoutAgentsInput>
    create: XOR<rentalsCreateWithoutAgentsInput, rentalsUncheckedCreateWithoutAgentsInput>
  }

  export type rentalsUpdateWithWhereUniqueWithoutAgentsInput = {
    where: rentalsWhereUniqueInput
    data: XOR<rentalsUpdateWithoutAgentsInput, rentalsUncheckedUpdateWithoutAgentsInput>
  }

  export type rentalsUpdateManyWithWhereWithoutAgentsInput = {
    where: rentalsScalarWhereInput
    data: XOR<rentalsUpdateManyMutationInput, rentalsUncheckedUpdateManyWithoutAgentsInput>
  }

  export type rentalsScalarWhereInput = {
    AND?: rentalsScalarWhereInput | rentalsScalarWhereInput[]
    OR?: rentalsScalarWhereInput[]
    NOT?: rentalsScalarWhereInput | rentalsScalarWhereInput[]
    id?: IntFilter<"rentals"> | number
    agent_id?: IntNullableFilter<"rentals"> | number | null
    user_email?: StringFilter<"rentals"> | string
    user_name?: StringNullableFilter<"rentals"> | string | null
    rental_type?: StringNullableFilter<"rentals"> | string | null
    start_date?: DateTimeNullableFilter<"rentals"> | Date | string | null
    end_date?: DateTimeNullableFilter<"rentals"> | Date | string | null
    duration_hours?: IntNullableFilter<"rentals"> | number | null
    base_price?: DecimalNullableFilter<"rentals"> | Decimal | DecimalJsLike | number | string | null
    context_adjustment?: DecimalNullableFilter<"rentals"> | Decimal | DecimalJsLike | number | string | null
    discount_percent?: DecimalNullableFilter<"rentals"> | Decimal | DecimalJsLike | number | string | null
    total_price?: DecimalNullableFilter<"rentals"> | Decimal | DecimalJsLike | number | string | null
    retell_phone_number?: StringNullableFilter<"rentals"> | string | null
    elevenlabs_voice_config?: JsonNullableFilter<"rentals">
    gemini_customizations?: JsonNullableFilter<"rentals">
    context_snapshot?: JsonNullableFilter<"rentals">
    environmental_conditions?: JsonNullableFilter<"rentals">
    performance_metrics?: JsonNullableFilter<"rentals">
    stripe_payment_intent_id?: StringNullableFilter<"rentals"> | string | null
    status?: StringNullableFilter<"rentals"> | string | null
    satisfaction_score?: DecimalNullableFilter<"rentals"> | Decimal | DecimalJsLike | number | string | null
    context_match_accuracy?: DecimalNullableFilter<"rentals"> | Decimal | DecimalJsLike | number | string | null
    optimization_suggestions?: JsonNullableFilter<"rentals">
    created_at?: DateTimeNullableFilter<"rentals"> | Date | string | null
    completed_at?: DateTimeNullableFilter<"rentals"> | Date | string | null
  }

  export type user_interactionsUpsertWithWhereUniqueWithoutAgentsInput = {
    where: user_interactionsWhereUniqueInput
    update: XOR<user_interactionsUpdateWithoutAgentsInput, user_interactionsUncheckedUpdateWithoutAgentsInput>
    create: XOR<user_interactionsCreateWithoutAgentsInput, user_interactionsUncheckedCreateWithoutAgentsInput>
  }

  export type user_interactionsUpdateWithWhereUniqueWithoutAgentsInput = {
    where: user_interactionsWhereUniqueInput
    data: XOR<user_interactionsUpdateWithoutAgentsInput, user_interactionsUncheckedUpdateWithoutAgentsInput>
  }

  export type user_interactionsUpdateManyWithWhereWithoutAgentsInput = {
    where: user_interactionsScalarWhereInput
    data: XOR<user_interactionsUpdateManyMutationInput, user_interactionsUncheckedUpdateManyWithoutAgentsInput>
  }

  export type user_interactionsScalarWhereInput = {
    AND?: user_interactionsScalarWhereInput | user_interactionsScalarWhereInput[]
    OR?: user_interactionsScalarWhereInput[]
    NOT?: user_interactionsScalarWhereInput | user_interactionsScalarWhereInput[]
    id?: IntFilter<"user_interactions"> | number
    user_email?: StringNullableFilter<"user_interactions"> | string | null
    agent_id?: IntNullableFilter<"user_interactions"> | number | null
    action?: StringNullableFilter<"user_interactions"> | string | null
    metadata?: JsonNullableFilter<"user_interactions">
    context_at_interaction?: JsonNullableFilter<"user_interactions">
    device_context?: JsonNullableFilter<"user_interactions">
    environmental_context?: JsonNullableFilter<"user_interactions">
    user_satisfaction?: DecimalNullableFilter<"user_interactions"> | Decimal | DecimalJsLike | number | string | null
    context_relevance?: DecimalNullableFilter<"user_interactions"> | Decimal | DecimalJsLike | number | string | null
    optimization_data?: JsonNullableFilter<"user_interactions">
    created_at?: DateTimeNullableFilter<"user_interactions"> | Date | string | null
  }

  export type voice_samplesUpsertWithWhereUniqueWithoutAgentsInput = {
    where: voice_samplesWhereUniqueInput
    update: XOR<voice_samplesUpdateWithoutAgentsInput, voice_samplesUncheckedUpdateWithoutAgentsInput>
    create: XOR<voice_samplesCreateWithoutAgentsInput, voice_samplesUncheckedCreateWithoutAgentsInput>
  }

  export type voice_samplesUpdateWithWhereUniqueWithoutAgentsInput = {
    where: voice_samplesWhereUniqueInput
    data: XOR<voice_samplesUpdateWithoutAgentsInput, voice_samplesUncheckedUpdateWithoutAgentsInput>
  }

  export type voice_samplesUpdateManyWithWhereWithoutAgentsInput = {
    where: voice_samplesScalarWhereInput
    data: XOR<voice_samplesUpdateManyMutationInput, voice_samplesUncheckedUpdateManyWithoutAgentsInput>
  }

  export type voice_samplesScalarWhereInput = {
    AND?: voice_samplesScalarWhereInput | voice_samplesScalarWhereInput[]
    OR?: voice_samplesScalarWhereInput[]
    NOT?: voice_samplesScalarWhereInput | voice_samplesScalarWhereInput[]
    id?: IntFilter<"voice_samples"> | number
    agent_id?: IntNullableFilter<"voice_samples"> | number | null
    sample_text?: StringNullableFilter<"voice_samples"> | string | null
    elevenlabs_audio_url?: StringNullableFilter<"voice_samples"> | string | null
    duration_seconds?: IntNullableFilter<"voice_samples"> | number | null
    environmental_variants?: JsonNullableFilter<"voice_samples">
    noise_optimization?: JsonNullableFilter<"voice_samples">
    device_optimization?: JsonNullableFilter<"voice_samples">
    created_at?: DateTimeNullableFilter<"voice_samples"> | Date | string | null
  }

  export type agent_feedbackCreateWithoutAgents_customInput = {
    rating?: number | null
    feedback_text?: string | null
    language_used?: string | null
    user_session_id?: string | null
    created_at?: Date | string | null
  }

  export type agent_feedbackUncheckedCreateWithoutAgents_customInput = {
    id?: number
    rating?: number | null
    feedback_text?: string | null
    language_used?: string | null
    user_session_id?: string | null
    created_at?: Date | string | null
  }

  export type agent_feedbackCreateOrConnectWithoutAgents_customInput = {
    where: agent_feedbackWhereUniqueInput
    create: XOR<agent_feedbackCreateWithoutAgents_customInput, agent_feedbackUncheckedCreateWithoutAgents_customInput>
  }

  export type agent_feedbackCreateManyAgents_customInputEnvelope = {
    data: agent_feedbackCreateManyAgents_customInput | agent_feedbackCreateManyAgents_customInput[]
    skipDuplicates?: boolean
  }

  export type agent_languagesCreateWithoutAgents_customInput = {
    language_code: string
    personality_translation?: string | null
    voice_id?: string | null
    voice_settings?: NullableJsonNullValueInput | InputJsonValue
    is_primary?: boolean | null
    created_at?: Date | string | null
  }

  export type agent_languagesUncheckedCreateWithoutAgents_customInput = {
    id?: number
    language_code: string
    personality_translation?: string | null
    voice_id?: string | null
    voice_settings?: NullableJsonNullValueInput | InputJsonValue
    is_primary?: boolean | null
    created_at?: Date | string | null
  }

  export type agent_languagesCreateOrConnectWithoutAgents_customInput = {
    where: agent_languagesWhereUniqueInput
    create: XOR<agent_languagesCreateWithoutAgents_customInput, agent_languagesUncheckedCreateWithoutAgents_customInput>
  }

  export type agent_languagesCreateManyAgents_customInputEnvelope = {
    data: agent_languagesCreateManyAgents_customInput | agent_languagesCreateManyAgents_customInput[]
    skipDuplicates?: boolean
  }

  export type agent_performance_metricsCreateWithoutAgents_customInput = {
    metric_date?: Date | string | null
    total_interactions?: number | null
    successful_interactions?: number | null
    avg_response_time_ms?: number | null
    voice_generation_count?: number | null
    error_count?: number | null
    language_breakdown?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type agent_performance_metricsUncheckedCreateWithoutAgents_customInput = {
    id?: number
    metric_date?: Date | string | null
    total_interactions?: number | null
    successful_interactions?: number | null
    avg_response_time_ms?: number | null
    voice_generation_count?: number | null
    error_count?: number | null
    language_breakdown?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type agent_performance_metricsCreateOrConnectWithoutAgents_customInput = {
    where: agent_performance_metricsWhereUniqueInput
    create: XOR<agent_performance_metricsCreateWithoutAgents_customInput, agent_performance_metricsUncheckedCreateWithoutAgents_customInput>
  }

  export type agent_performance_metricsCreateManyAgents_customInputEnvelope = {
    data: agent_performance_metricsCreateManyAgents_customInput | agent_performance_metricsCreateManyAgents_customInput[]
    skipDuplicates?: boolean
  }

  export type agent_usage_eventsCreateWithoutAgents_customInput = {
    event_type: string
    event_data?: NullableJsonNullValueInput | InputJsonValue
    user_session_id?: string | null
    ip_address?: string | null
    user_agent?: string | null
    language_used?: string | null
    created_at?: Date | string | null
  }

  export type agent_usage_eventsUncheckedCreateWithoutAgents_customInput = {
    id?: number
    event_type: string
    event_data?: NullableJsonNullValueInput | InputJsonValue
    user_session_id?: string | null
    ip_address?: string | null
    user_agent?: string | null
    language_used?: string | null
    created_at?: Date | string | null
  }

  export type agent_usage_eventsCreateOrConnectWithoutAgents_customInput = {
    where: agent_usage_eventsWhereUniqueInput
    create: XOR<agent_usage_eventsCreateWithoutAgents_customInput, agent_usage_eventsUncheckedCreateWithoutAgents_customInput>
  }

  export type agent_usage_eventsCreateManyAgents_customInputEnvelope = {
    data: agent_usage_eventsCreateManyAgents_customInput | agent_usage_eventsCreateManyAgents_customInput[]
    skipDuplicates?: boolean
  }

  export type agent_feedbackUpsertWithWhereUniqueWithoutAgents_customInput = {
    where: agent_feedbackWhereUniqueInput
    update: XOR<agent_feedbackUpdateWithoutAgents_customInput, agent_feedbackUncheckedUpdateWithoutAgents_customInput>
    create: XOR<agent_feedbackCreateWithoutAgents_customInput, agent_feedbackUncheckedCreateWithoutAgents_customInput>
  }

  export type agent_feedbackUpdateWithWhereUniqueWithoutAgents_customInput = {
    where: agent_feedbackWhereUniqueInput
    data: XOR<agent_feedbackUpdateWithoutAgents_customInput, agent_feedbackUncheckedUpdateWithoutAgents_customInput>
  }

  export type agent_feedbackUpdateManyWithWhereWithoutAgents_customInput = {
    where: agent_feedbackScalarWhereInput
    data: XOR<agent_feedbackUpdateManyMutationInput, agent_feedbackUncheckedUpdateManyWithoutAgents_customInput>
  }

  export type agent_feedbackScalarWhereInput = {
    AND?: agent_feedbackScalarWhereInput | agent_feedbackScalarWhereInput[]
    OR?: agent_feedbackScalarWhereInput[]
    NOT?: agent_feedbackScalarWhereInput | agent_feedbackScalarWhereInput[]
    id?: IntFilter<"agent_feedback"> | number
    agent_id?: IntNullableFilter<"agent_feedback"> | number | null
    rating?: IntNullableFilter<"agent_feedback"> | number | null
    feedback_text?: StringNullableFilter<"agent_feedback"> | string | null
    language_used?: StringNullableFilter<"agent_feedback"> | string | null
    user_session_id?: StringNullableFilter<"agent_feedback"> | string | null
    created_at?: DateTimeNullableFilter<"agent_feedback"> | Date | string | null
  }

  export type agent_languagesUpsertWithWhereUniqueWithoutAgents_customInput = {
    where: agent_languagesWhereUniqueInput
    update: XOR<agent_languagesUpdateWithoutAgents_customInput, agent_languagesUncheckedUpdateWithoutAgents_customInput>
    create: XOR<agent_languagesCreateWithoutAgents_customInput, agent_languagesUncheckedCreateWithoutAgents_customInput>
  }

  export type agent_languagesUpdateWithWhereUniqueWithoutAgents_customInput = {
    where: agent_languagesWhereUniqueInput
    data: XOR<agent_languagesUpdateWithoutAgents_customInput, agent_languagesUncheckedUpdateWithoutAgents_customInput>
  }

  export type agent_languagesUpdateManyWithWhereWithoutAgents_customInput = {
    where: agent_languagesScalarWhereInput
    data: XOR<agent_languagesUpdateManyMutationInput, agent_languagesUncheckedUpdateManyWithoutAgents_customInput>
  }

  export type agent_languagesScalarWhereInput = {
    AND?: agent_languagesScalarWhereInput | agent_languagesScalarWhereInput[]
    OR?: agent_languagesScalarWhereInput[]
    NOT?: agent_languagesScalarWhereInput | agent_languagesScalarWhereInput[]
    id?: IntFilter<"agent_languages"> | number
    agent_id?: IntNullableFilter<"agent_languages"> | number | null
    language_code?: StringFilter<"agent_languages"> | string
    personality_translation?: StringNullableFilter<"agent_languages"> | string | null
    voice_id?: StringNullableFilter<"agent_languages"> | string | null
    voice_settings?: JsonNullableFilter<"agent_languages">
    is_primary?: BoolNullableFilter<"agent_languages"> | boolean | null
    created_at?: DateTimeNullableFilter<"agent_languages"> | Date | string | null
  }

  export type agent_performance_metricsUpsertWithWhereUniqueWithoutAgents_customInput = {
    where: agent_performance_metricsWhereUniqueInput
    update: XOR<agent_performance_metricsUpdateWithoutAgents_customInput, agent_performance_metricsUncheckedUpdateWithoutAgents_customInput>
    create: XOR<agent_performance_metricsCreateWithoutAgents_customInput, agent_performance_metricsUncheckedCreateWithoutAgents_customInput>
  }

  export type agent_performance_metricsUpdateWithWhereUniqueWithoutAgents_customInput = {
    where: agent_performance_metricsWhereUniqueInput
    data: XOR<agent_performance_metricsUpdateWithoutAgents_customInput, agent_performance_metricsUncheckedUpdateWithoutAgents_customInput>
  }

  export type agent_performance_metricsUpdateManyWithWhereWithoutAgents_customInput = {
    where: agent_performance_metricsScalarWhereInput
    data: XOR<agent_performance_metricsUpdateManyMutationInput, agent_performance_metricsUncheckedUpdateManyWithoutAgents_customInput>
  }

  export type agent_performance_metricsScalarWhereInput = {
    AND?: agent_performance_metricsScalarWhereInput | agent_performance_metricsScalarWhereInput[]
    OR?: agent_performance_metricsScalarWhereInput[]
    NOT?: agent_performance_metricsScalarWhereInput | agent_performance_metricsScalarWhereInput[]
    id?: IntFilter<"agent_performance_metrics"> | number
    agent_id?: IntNullableFilter<"agent_performance_metrics"> | number | null
    metric_date?: DateTimeNullableFilter<"agent_performance_metrics"> | Date | string | null
    total_interactions?: IntNullableFilter<"agent_performance_metrics"> | number | null
    successful_interactions?: IntNullableFilter<"agent_performance_metrics"> | number | null
    avg_response_time_ms?: IntNullableFilter<"agent_performance_metrics"> | number | null
    voice_generation_count?: IntNullableFilter<"agent_performance_metrics"> | number | null
    error_count?: IntNullableFilter<"agent_performance_metrics"> | number | null
    language_breakdown?: JsonNullableFilter<"agent_performance_metrics">
    created_at?: DateTimeNullableFilter<"agent_performance_metrics"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"agent_performance_metrics"> | Date | string | null
  }

  export type agent_usage_eventsUpsertWithWhereUniqueWithoutAgents_customInput = {
    where: agent_usage_eventsWhereUniqueInput
    update: XOR<agent_usage_eventsUpdateWithoutAgents_customInput, agent_usage_eventsUncheckedUpdateWithoutAgents_customInput>
    create: XOR<agent_usage_eventsCreateWithoutAgents_customInput, agent_usage_eventsUncheckedCreateWithoutAgents_customInput>
  }

  export type agent_usage_eventsUpdateWithWhereUniqueWithoutAgents_customInput = {
    where: agent_usage_eventsWhereUniqueInput
    data: XOR<agent_usage_eventsUpdateWithoutAgents_customInput, agent_usage_eventsUncheckedUpdateWithoutAgents_customInput>
  }

  export type agent_usage_eventsUpdateManyWithWhereWithoutAgents_customInput = {
    where: agent_usage_eventsScalarWhereInput
    data: XOR<agent_usage_eventsUpdateManyMutationInput, agent_usage_eventsUncheckedUpdateManyWithoutAgents_customInput>
  }

  export type agent_usage_eventsScalarWhereInput = {
    AND?: agent_usage_eventsScalarWhereInput | agent_usage_eventsScalarWhereInput[]
    OR?: agent_usage_eventsScalarWhereInput[]
    NOT?: agent_usage_eventsScalarWhereInput | agent_usage_eventsScalarWhereInput[]
    id?: IntFilter<"agent_usage_events"> | number
    agent_id?: IntNullableFilter<"agent_usage_events"> | number | null
    event_type?: StringFilter<"agent_usage_events"> | string
    event_data?: JsonNullableFilter<"agent_usage_events">
    user_session_id?: StringNullableFilter<"agent_usage_events"> | string | null
    ip_address?: StringNullableFilter<"agent_usage_events"> | string | null
    user_agent?: StringNullableFilter<"agent_usage_events"> | string | null
    language_used?: StringNullableFilter<"agent_usage_events"> | string | null
    created_at?: DateTimeNullableFilter<"agent_usage_events"> | Date | string | null
  }

  export type agentsCreateWithoutRentalsInput = {
    name: string
    company?: string | null
    category?: string | null
    description?: string | null
    personality?: string | null
    pricing_half_day?: Decimal | DecimalJsLike | number | string | null
    pricing_full_day?: Decimal | DecimalJsLike | number | string | null
    pricing_per_minute?: Decimal | DecimalJsLike | number | string | null
    elevenlabs_voice_id?: string | null
    voice_sample_url?: string | null
    voice_characteristics?: NullableJsonNullValueInput | InputJsonValue
    context7_profile?: NullableJsonNullValueInput | InputJsonValue
    environmental_suitability?: NullableJsonNullValueInput | InputJsonValue
    performance_by_context?: NullableJsonNullValueInput | InputJsonValue
    gemini_personality_prompt?: string | null
    ai_optimization_score?: Decimal | DecimalJsLike | number | string | null
    success_rate?: string | null
    avg_call_time?: string | null
    rating?: Decimal | DecimalJsLike | number | string | null
    reviews?: number | null
    integrations?: agentsCreateintegrationsInput | string[]
    industries?: agentsCreateindustriesInput | string[]
    stages?: number | null
    demo_available?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    user_interactions?: user_interactionsCreateNestedManyWithoutAgentsInput
    voice_samples?: voice_samplesCreateNestedManyWithoutAgentsInput
  }

  export type agentsUncheckedCreateWithoutRentalsInput = {
    id?: number
    name: string
    company?: string | null
    category?: string | null
    description?: string | null
    personality?: string | null
    pricing_half_day?: Decimal | DecimalJsLike | number | string | null
    pricing_full_day?: Decimal | DecimalJsLike | number | string | null
    pricing_per_minute?: Decimal | DecimalJsLike | number | string | null
    elevenlabs_voice_id?: string | null
    voice_sample_url?: string | null
    voice_characteristics?: NullableJsonNullValueInput | InputJsonValue
    context7_profile?: NullableJsonNullValueInput | InputJsonValue
    environmental_suitability?: NullableJsonNullValueInput | InputJsonValue
    performance_by_context?: NullableJsonNullValueInput | InputJsonValue
    gemini_personality_prompt?: string | null
    ai_optimization_score?: Decimal | DecimalJsLike | number | string | null
    success_rate?: string | null
    avg_call_time?: string | null
    rating?: Decimal | DecimalJsLike | number | string | null
    reviews?: number | null
    integrations?: agentsCreateintegrationsInput | string[]
    industries?: agentsCreateindustriesInput | string[]
    stages?: number | null
    demo_available?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    user_interactions?: user_interactionsUncheckedCreateNestedManyWithoutAgentsInput
    voice_samples?: voice_samplesUncheckedCreateNestedManyWithoutAgentsInput
  }

  export type agentsCreateOrConnectWithoutRentalsInput = {
    where: agentsWhereUniqueInput
    create: XOR<agentsCreateWithoutRentalsInput, agentsUncheckedCreateWithoutRentalsInput>
  }

  export type agentsUpsertWithoutRentalsInput = {
    update: XOR<agentsUpdateWithoutRentalsInput, agentsUncheckedUpdateWithoutRentalsInput>
    create: XOR<agentsCreateWithoutRentalsInput, agentsUncheckedCreateWithoutRentalsInput>
    where?: agentsWhereInput
  }

  export type agentsUpdateToOneWithWhereWithoutRentalsInput = {
    where?: agentsWhereInput
    data: XOR<agentsUpdateWithoutRentalsInput, agentsUncheckedUpdateWithoutRentalsInput>
  }

  export type agentsUpdateWithoutRentalsInput = {
    name?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    personality?: NullableStringFieldUpdateOperationsInput | string | null
    pricing_half_day?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    pricing_full_day?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    pricing_per_minute?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    elevenlabs_voice_id?: NullableStringFieldUpdateOperationsInput | string | null
    voice_sample_url?: NullableStringFieldUpdateOperationsInput | string | null
    voice_characteristics?: NullableJsonNullValueInput | InputJsonValue
    context7_profile?: NullableJsonNullValueInput | InputJsonValue
    environmental_suitability?: NullableJsonNullValueInput | InputJsonValue
    performance_by_context?: NullableJsonNullValueInput | InputJsonValue
    gemini_personality_prompt?: NullableStringFieldUpdateOperationsInput | string | null
    ai_optimization_score?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    success_rate?: NullableStringFieldUpdateOperationsInput | string | null
    avg_call_time?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    reviews?: NullableIntFieldUpdateOperationsInput | number | null
    integrations?: agentsUpdateintegrationsInput | string[]
    industries?: agentsUpdateindustriesInput | string[]
    stages?: NullableIntFieldUpdateOperationsInput | number | null
    demo_available?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user_interactions?: user_interactionsUpdateManyWithoutAgentsNestedInput
    voice_samples?: voice_samplesUpdateManyWithoutAgentsNestedInput
  }

  export type agentsUncheckedUpdateWithoutRentalsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    personality?: NullableStringFieldUpdateOperationsInput | string | null
    pricing_half_day?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    pricing_full_day?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    pricing_per_minute?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    elevenlabs_voice_id?: NullableStringFieldUpdateOperationsInput | string | null
    voice_sample_url?: NullableStringFieldUpdateOperationsInput | string | null
    voice_characteristics?: NullableJsonNullValueInput | InputJsonValue
    context7_profile?: NullableJsonNullValueInput | InputJsonValue
    environmental_suitability?: NullableJsonNullValueInput | InputJsonValue
    performance_by_context?: NullableJsonNullValueInput | InputJsonValue
    gemini_personality_prompt?: NullableStringFieldUpdateOperationsInput | string | null
    ai_optimization_score?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    success_rate?: NullableStringFieldUpdateOperationsInput | string | null
    avg_call_time?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    reviews?: NullableIntFieldUpdateOperationsInput | number | null
    integrations?: agentsUpdateintegrationsInput | string[]
    industries?: agentsUpdateindustriesInput | string[]
    stages?: NullableIntFieldUpdateOperationsInput | number | null
    demo_available?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user_interactions?: user_interactionsUncheckedUpdateManyWithoutAgentsNestedInput
    voice_samples?: voice_samplesUncheckedUpdateManyWithoutAgentsNestedInput
  }

  export type agentsCreateWithoutUser_interactionsInput = {
    name: string
    company?: string | null
    category?: string | null
    description?: string | null
    personality?: string | null
    pricing_half_day?: Decimal | DecimalJsLike | number | string | null
    pricing_full_day?: Decimal | DecimalJsLike | number | string | null
    pricing_per_minute?: Decimal | DecimalJsLike | number | string | null
    elevenlabs_voice_id?: string | null
    voice_sample_url?: string | null
    voice_characteristics?: NullableJsonNullValueInput | InputJsonValue
    context7_profile?: NullableJsonNullValueInput | InputJsonValue
    environmental_suitability?: NullableJsonNullValueInput | InputJsonValue
    performance_by_context?: NullableJsonNullValueInput | InputJsonValue
    gemini_personality_prompt?: string | null
    ai_optimization_score?: Decimal | DecimalJsLike | number | string | null
    success_rate?: string | null
    avg_call_time?: string | null
    rating?: Decimal | DecimalJsLike | number | string | null
    reviews?: number | null
    integrations?: agentsCreateintegrationsInput | string[]
    industries?: agentsCreateindustriesInput | string[]
    stages?: number | null
    demo_available?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    rentals?: rentalsCreateNestedManyWithoutAgentsInput
    voice_samples?: voice_samplesCreateNestedManyWithoutAgentsInput
  }

  export type agentsUncheckedCreateWithoutUser_interactionsInput = {
    id?: number
    name: string
    company?: string | null
    category?: string | null
    description?: string | null
    personality?: string | null
    pricing_half_day?: Decimal | DecimalJsLike | number | string | null
    pricing_full_day?: Decimal | DecimalJsLike | number | string | null
    pricing_per_minute?: Decimal | DecimalJsLike | number | string | null
    elevenlabs_voice_id?: string | null
    voice_sample_url?: string | null
    voice_characteristics?: NullableJsonNullValueInput | InputJsonValue
    context7_profile?: NullableJsonNullValueInput | InputJsonValue
    environmental_suitability?: NullableJsonNullValueInput | InputJsonValue
    performance_by_context?: NullableJsonNullValueInput | InputJsonValue
    gemini_personality_prompt?: string | null
    ai_optimization_score?: Decimal | DecimalJsLike | number | string | null
    success_rate?: string | null
    avg_call_time?: string | null
    rating?: Decimal | DecimalJsLike | number | string | null
    reviews?: number | null
    integrations?: agentsCreateintegrationsInput | string[]
    industries?: agentsCreateindustriesInput | string[]
    stages?: number | null
    demo_available?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    rentals?: rentalsUncheckedCreateNestedManyWithoutAgentsInput
    voice_samples?: voice_samplesUncheckedCreateNestedManyWithoutAgentsInput
  }

  export type agentsCreateOrConnectWithoutUser_interactionsInput = {
    where: agentsWhereUniqueInput
    create: XOR<agentsCreateWithoutUser_interactionsInput, agentsUncheckedCreateWithoutUser_interactionsInput>
  }

  export type agentsUpsertWithoutUser_interactionsInput = {
    update: XOR<agentsUpdateWithoutUser_interactionsInput, agentsUncheckedUpdateWithoutUser_interactionsInput>
    create: XOR<agentsCreateWithoutUser_interactionsInput, agentsUncheckedCreateWithoutUser_interactionsInput>
    where?: agentsWhereInput
  }

  export type agentsUpdateToOneWithWhereWithoutUser_interactionsInput = {
    where?: agentsWhereInput
    data: XOR<agentsUpdateWithoutUser_interactionsInput, agentsUncheckedUpdateWithoutUser_interactionsInput>
  }

  export type agentsUpdateWithoutUser_interactionsInput = {
    name?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    personality?: NullableStringFieldUpdateOperationsInput | string | null
    pricing_half_day?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    pricing_full_day?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    pricing_per_minute?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    elevenlabs_voice_id?: NullableStringFieldUpdateOperationsInput | string | null
    voice_sample_url?: NullableStringFieldUpdateOperationsInput | string | null
    voice_characteristics?: NullableJsonNullValueInput | InputJsonValue
    context7_profile?: NullableJsonNullValueInput | InputJsonValue
    environmental_suitability?: NullableJsonNullValueInput | InputJsonValue
    performance_by_context?: NullableJsonNullValueInput | InputJsonValue
    gemini_personality_prompt?: NullableStringFieldUpdateOperationsInput | string | null
    ai_optimization_score?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    success_rate?: NullableStringFieldUpdateOperationsInput | string | null
    avg_call_time?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    reviews?: NullableIntFieldUpdateOperationsInput | number | null
    integrations?: agentsUpdateintegrationsInput | string[]
    industries?: agentsUpdateindustriesInput | string[]
    stages?: NullableIntFieldUpdateOperationsInput | number | null
    demo_available?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rentals?: rentalsUpdateManyWithoutAgentsNestedInput
    voice_samples?: voice_samplesUpdateManyWithoutAgentsNestedInput
  }

  export type agentsUncheckedUpdateWithoutUser_interactionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    personality?: NullableStringFieldUpdateOperationsInput | string | null
    pricing_half_day?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    pricing_full_day?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    pricing_per_minute?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    elevenlabs_voice_id?: NullableStringFieldUpdateOperationsInput | string | null
    voice_sample_url?: NullableStringFieldUpdateOperationsInput | string | null
    voice_characteristics?: NullableJsonNullValueInput | InputJsonValue
    context7_profile?: NullableJsonNullValueInput | InputJsonValue
    environmental_suitability?: NullableJsonNullValueInput | InputJsonValue
    performance_by_context?: NullableJsonNullValueInput | InputJsonValue
    gemini_personality_prompt?: NullableStringFieldUpdateOperationsInput | string | null
    ai_optimization_score?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    success_rate?: NullableStringFieldUpdateOperationsInput | string | null
    avg_call_time?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    reviews?: NullableIntFieldUpdateOperationsInput | number | null
    integrations?: agentsUpdateintegrationsInput | string[]
    industries?: agentsUpdateindustriesInput | string[]
    stages?: NullableIntFieldUpdateOperationsInput | number | null
    demo_available?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rentals?: rentalsUncheckedUpdateManyWithoutAgentsNestedInput
    voice_samples?: voice_samplesUncheckedUpdateManyWithoutAgentsNestedInput
  }

  export type agentsCreateWithoutVoice_samplesInput = {
    name: string
    company?: string | null
    category?: string | null
    description?: string | null
    personality?: string | null
    pricing_half_day?: Decimal | DecimalJsLike | number | string | null
    pricing_full_day?: Decimal | DecimalJsLike | number | string | null
    pricing_per_minute?: Decimal | DecimalJsLike | number | string | null
    elevenlabs_voice_id?: string | null
    voice_sample_url?: string | null
    voice_characteristics?: NullableJsonNullValueInput | InputJsonValue
    context7_profile?: NullableJsonNullValueInput | InputJsonValue
    environmental_suitability?: NullableJsonNullValueInput | InputJsonValue
    performance_by_context?: NullableJsonNullValueInput | InputJsonValue
    gemini_personality_prompt?: string | null
    ai_optimization_score?: Decimal | DecimalJsLike | number | string | null
    success_rate?: string | null
    avg_call_time?: string | null
    rating?: Decimal | DecimalJsLike | number | string | null
    reviews?: number | null
    integrations?: agentsCreateintegrationsInput | string[]
    industries?: agentsCreateindustriesInput | string[]
    stages?: number | null
    demo_available?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    rentals?: rentalsCreateNestedManyWithoutAgentsInput
    user_interactions?: user_interactionsCreateNestedManyWithoutAgentsInput
  }

  export type agentsUncheckedCreateWithoutVoice_samplesInput = {
    id?: number
    name: string
    company?: string | null
    category?: string | null
    description?: string | null
    personality?: string | null
    pricing_half_day?: Decimal | DecimalJsLike | number | string | null
    pricing_full_day?: Decimal | DecimalJsLike | number | string | null
    pricing_per_minute?: Decimal | DecimalJsLike | number | string | null
    elevenlabs_voice_id?: string | null
    voice_sample_url?: string | null
    voice_characteristics?: NullableJsonNullValueInput | InputJsonValue
    context7_profile?: NullableJsonNullValueInput | InputJsonValue
    environmental_suitability?: NullableJsonNullValueInput | InputJsonValue
    performance_by_context?: NullableJsonNullValueInput | InputJsonValue
    gemini_personality_prompt?: string | null
    ai_optimization_score?: Decimal | DecimalJsLike | number | string | null
    success_rate?: string | null
    avg_call_time?: string | null
    rating?: Decimal | DecimalJsLike | number | string | null
    reviews?: number | null
    integrations?: agentsCreateintegrationsInput | string[]
    industries?: agentsCreateindustriesInput | string[]
    stages?: number | null
    demo_available?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    rentals?: rentalsUncheckedCreateNestedManyWithoutAgentsInput
    user_interactions?: user_interactionsUncheckedCreateNestedManyWithoutAgentsInput
  }

  export type agentsCreateOrConnectWithoutVoice_samplesInput = {
    where: agentsWhereUniqueInput
    create: XOR<agentsCreateWithoutVoice_samplesInput, agentsUncheckedCreateWithoutVoice_samplesInput>
  }

  export type agentsUpsertWithoutVoice_samplesInput = {
    update: XOR<agentsUpdateWithoutVoice_samplesInput, agentsUncheckedUpdateWithoutVoice_samplesInput>
    create: XOR<agentsCreateWithoutVoice_samplesInput, agentsUncheckedCreateWithoutVoice_samplesInput>
    where?: agentsWhereInput
  }

  export type agentsUpdateToOneWithWhereWithoutVoice_samplesInput = {
    where?: agentsWhereInput
    data: XOR<agentsUpdateWithoutVoice_samplesInput, agentsUncheckedUpdateWithoutVoice_samplesInput>
  }

  export type agentsUpdateWithoutVoice_samplesInput = {
    name?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    personality?: NullableStringFieldUpdateOperationsInput | string | null
    pricing_half_day?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    pricing_full_day?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    pricing_per_minute?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    elevenlabs_voice_id?: NullableStringFieldUpdateOperationsInput | string | null
    voice_sample_url?: NullableStringFieldUpdateOperationsInput | string | null
    voice_characteristics?: NullableJsonNullValueInput | InputJsonValue
    context7_profile?: NullableJsonNullValueInput | InputJsonValue
    environmental_suitability?: NullableJsonNullValueInput | InputJsonValue
    performance_by_context?: NullableJsonNullValueInput | InputJsonValue
    gemini_personality_prompt?: NullableStringFieldUpdateOperationsInput | string | null
    ai_optimization_score?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    success_rate?: NullableStringFieldUpdateOperationsInput | string | null
    avg_call_time?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    reviews?: NullableIntFieldUpdateOperationsInput | number | null
    integrations?: agentsUpdateintegrationsInput | string[]
    industries?: agentsUpdateindustriesInput | string[]
    stages?: NullableIntFieldUpdateOperationsInput | number | null
    demo_available?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rentals?: rentalsUpdateManyWithoutAgentsNestedInput
    user_interactions?: user_interactionsUpdateManyWithoutAgentsNestedInput
  }

  export type agentsUncheckedUpdateWithoutVoice_samplesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    personality?: NullableStringFieldUpdateOperationsInput | string | null
    pricing_half_day?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    pricing_full_day?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    pricing_per_minute?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    elevenlabs_voice_id?: NullableStringFieldUpdateOperationsInput | string | null
    voice_sample_url?: NullableStringFieldUpdateOperationsInput | string | null
    voice_characteristics?: NullableJsonNullValueInput | InputJsonValue
    context7_profile?: NullableJsonNullValueInput | InputJsonValue
    environmental_suitability?: NullableJsonNullValueInput | InputJsonValue
    performance_by_context?: NullableJsonNullValueInput | InputJsonValue
    gemini_personality_prompt?: NullableStringFieldUpdateOperationsInput | string | null
    ai_optimization_score?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    success_rate?: NullableStringFieldUpdateOperationsInput | string | null
    avg_call_time?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    reviews?: NullableIntFieldUpdateOperationsInput | number | null
    integrations?: agentsUpdateintegrationsInput | string[]
    industries?: agentsUpdateindustriesInput | string[]
    stages?: NullableIntFieldUpdateOperationsInput | number | null
    demo_available?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rentals?: rentalsUncheckedUpdateManyWithoutAgentsNestedInput
    user_interactions?: user_interactionsUncheckedUpdateManyWithoutAgentsNestedInput
  }

  export type rentalsCreateManyAgentsInput = {
    id?: number
    user_email: string
    user_name?: string | null
    rental_type?: string | null
    start_date?: Date | string | null
    end_date?: Date | string | null
    duration_hours?: number | null
    base_price?: Decimal | DecimalJsLike | number | string | null
    context_adjustment?: Decimal | DecimalJsLike | number | string | null
    discount_percent?: Decimal | DecimalJsLike | number | string | null
    total_price?: Decimal | DecimalJsLike | number | string | null
    retell_phone_number?: string | null
    elevenlabs_voice_config?: NullableJsonNullValueInput | InputJsonValue
    gemini_customizations?: NullableJsonNullValueInput | InputJsonValue
    context_snapshot?: NullableJsonNullValueInput | InputJsonValue
    environmental_conditions?: NullableJsonNullValueInput | InputJsonValue
    performance_metrics?: NullableJsonNullValueInput | InputJsonValue
    stripe_payment_intent_id?: string | null
    status?: string | null
    satisfaction_score?: Decimal | DecimalJsLike | number | string | null
    context_match_accuracy?: Decimal | DecimalJsLike | number | string | null
    optimization_suggestions?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string | null
    completed_at?: Date | string | null
  }

  export type user_interactionsCreateManyAgentsInput = {
    id?: number
    user_email?: string | null
    action?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    context_at_interaction?: NullableJsonNullValueInput | InputJsonValue
    device_context?: NullableJsonNullValueInput | InputJsonValue
    environmental_context?: NullableJsonNullValueInput | InputJsonValue
    user_satisfaction?: Decimal | DecimalJsLike | number | string | null
    context_relevance?: Decimal | DecimalJsLike | number | string | null
    optimization_data?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string | null
  }

  export type voice_samplesCreateManyAgentsInput = {
    id?: number
    sample_text?: string | null
    elevenlabs_audio_url?: string | null
    duration_seconds?: number | null
    environmental_variants?: NullableJsonNullValueInput | InputJsonValue
    noise_optimization?: NullableJsonNullValueInput | InputJsonValue
    device_optimization?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string | null
  }

  export type rentalsUpdateWithoutAgentsInput = {
    user_email?: StringFieldUpdateOperationsInput | string
    user_name?: NullableStringFieldUpdateOperationsInput | string | null
    rental_type?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration_hours?: NullableIntFieldUpdateOperationsInput | number | null
    base_price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    context_adjustment?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    discount_percent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    total_price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    retell_phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    elevenlabs_voice_config?: NullableJsonNullValueInput | InputJsonValue
    gemini_customizations?: NullableJsonNullValueInput | InputJsonValue
    context_snapshot?: NullableJsonNullValueInput | InputJsonValue
    environmental_conditions?: NullableJsonNullValueInput | InputJsonValue
    performance_metrics?: NullableJsonNullValueInput | InputJsonValue
    stripe_payment_intent_id?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    satisfaction_score?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    context_match_accuracy?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    optimization_suggestions?: NullableJsonNullValueInput | InputJsonValue
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type rentalsUncheckedUpdateWithoutAgentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_email?: StringFieldUpdateOperationsInput | string
    user_name?: NullableStringFieldUpdateOperationsInput | string | null
    rental_type?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration_hours?: NullableIntFieldUpdateOperationsInput | number | null
    base_price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    context_adjustment?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    discount_percent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    total_price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    retell_phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    elevenlabs_voice_config?: NullableJsonNullValueInput | InputJsonValue
    gemini_customizations?: NullableJsonNullValueInput | InputJsonValue
    context_snapshot?: NullableJsonNullValueInput | InputJsonValue
    environmental_conditions?: NullableJsonNullValueInput | InputJsonValue
    performance_metrics?: NullableJsonNullValueInput | InputJsonValue
    stripe_payment_intent_id?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    satisfaction_score?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    context_match_accuracy?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    optimization_suggestions?: NullableJsonNullValueInput | InputJsonValue
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type rentalsUncheckedUpdateManyWithoutAgentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_email?: StringFieldUpdateOperationsInput | string
    user_name?: NullableStringFieldUpdateOperationsInput | string | null
    rental_type?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration_hours?: NullableIntFieldUpdateOperationsInput | number | null
    base_price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    context_adjustment?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    discount_percent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    total_price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    retell_phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    elevenlabs_voice_config?: NullableJsonNullValueInput | InputJsonValue
    gemini_customizations?: NullableJsonNullValueInput | InputJsonValue
    context_snapshot?: NullableJsonNullValueInput | InputJsonValue
    environmental_conditions?: NullableJsonNullValueInput | InputJsonValue
    performance_metrics?: NullableJsonNullValueInput | InputJsonValue
    stripe_payment_intent_id?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    satisfaction_score?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    context_match_accuracy?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    optimization_suggestions?: NullableJsonNullValueInput | InputJsonValue
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type user_interactionsUpdateWithoutAgentsInput = {
    user_email?: NullableStringFieldUpdateOperationsInput | string | null
    action?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    context_at_interaction?: NullableJsonNullValueInput | InputJsonValue
    device_context?: NullableJsonNullValueInput | InputJsonValue
    environmental_context?: NullableJsonNullValueInput | InputJsonValue
    user_satisfaction?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    context_relevance?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    optimization_data?: NullableJsonNullValueInput | InputJsonValue
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type user_interactionsUncheckedUpdateWithoutAgentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_email?: NullableStringFieldUpdateOperationsInput | string | null
    action?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    context_at_interaction?: NullableJsonNullValueInput | InputJsonValue
    device_context?: NullableJsonNullValueInput | InputJsonValue
    environmental_context?: NullableJsonNullValueInput | InputJsonValue
    user_satisfaction?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    context_relevance?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    optimization_data?: NullableJsonNullValueInput | InputJsonValue
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type user_interactionsUncheckedUpdateManyWithoutAgentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_email?: NullableStringFieldUpdateOperationsInput | string | null
    action?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    context_at_interaction?: NullableJsonNullValueInput | InputJsonValue
    device_context?: NullableJsonNullValueInput | InputJsonValue
    environmental_context?: NullableJsonNullValueInput | InputJsonValue
    user_satisfaction?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    context_relevance?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    optimization_data?: NullableJsonNullValueInput | InputJsonValue
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type voice_samplesUpdateWithoutAgentsInput = {
    sample_text?: NullableStringFieldUpdateOperationsInput | string | null
    elevenlabs_audio_url?: NullableStringFieldUpdateOperationsInput | string | null
    duration_seconds?: NullableIntFieldUpdateOperationsInput | number | null
    environmental_variants?: NullableJsonNullValueInput | InputJsonValue
    noise_optimization?: NullableJsonNullValueInput | InputJsonValue
    device_optimization?: NullableJsonNullValueInput | InputJsonValue
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type voice_samplesUncheckedUpdateWithoutAgentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    sample_text?: NullableStringFieldUpdateOperationsInput | string | null
    elevenlabs_audio_url?: NullableStringFieldUpdateOperationsInput | string | null
    duration_seconds?: NullableIntFieldUpdateOperationsInput | number | null
    environmental_variants?: NullableJsonNullValueInput | InputJsonValue
    noise_optimization?: NullableJsonNullValueInput | InputJsonValue
    device_optimization?: NullableJsonNullValueInput | InputJsonValue
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type voice_samplesUncheckedUpdateManyWithoutAgentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    sample_text?: NullableStringFieldUpdateOperationsInput | string | null
    elevenlabs_audio_url?: NullableStringFieldUpdateOperationsInput | string | null
    duration_seconds?: NullableIntFieldUpdateOperationsInput | number | null
    environmental_variants?: NullableJsonNullValueInput | InputJsonValue
    noise_optimization?: NullableJsonNullValueInput | InputJsonValue
    device_optimization?: NullableJsonNullValueInput | InputJsonValue
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type agent_feedbackCreateManyAgents_customInput = {
    id?: number
    rating?: number | null
    feedback_text?: string | null
    language_used?: string | null
    user_session_id?: string | null
    created_at?: Date | string | null
  }

  export type agent_languagesCreateManyAgents_customInput = {
    id?: number
    language_code: string
    personality_translation?: string | null
    voice_id?: string | null
    voice_settings?: NullableJsonNullValueInput | InputJsonValue
    is_primary?: boolean | null
    created_at?: Date | string | null
  }

  export type agent_performance_metricsCreateManyAgents_customInput = {
    id?: number
    metric_date?: Date | string | null
    total_interactions?: number | null
    successful_interactions?: number | null
    avg_response_time_ms?: number | null
    voice_generation_count?: number | null
    error_count?: number | null
    language_breakdown?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type agent_usage_eventsCreateManyAgents_customInput = {
    id?: number
    event_type: string
    event_data?: NullableJsonNullValueInput | InputJsonValue
    user_session_id?: string | null
    ip_address?: string | null
    user_agent?: string | null
    language_used?: string | null
    created_at?: Date | string | null
  }

  export type agent_feedbackUpdateWithoutAgents_customInput = {
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    feedback_text?: NullableStringFieldUpdateOperationsInput | string | null
    language_used?: NullableStringFieldUpdateOperationsInput | string | null
    user_session_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type agent_feedbackUncheckedUpdateWithoutAgents_customInput = {
    id?: IntFieldUpdateOperationsInput | number
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    feedback_text?: NullableStringFieldUpdateOperationsInput | string | null
    language_used?: NullableStringFieldUpdateOperationsInput | string | null
    user_session_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type agent_feedbackUncheckedUpdateManyWithoutAgents_customInput = {
    id?: IntFieldUpdateOperationsInput | number
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    feedback_text?: NullableStringFieldUpdateOperationsInput | string | null
    language_used?: NullableStringFieldUpdateOperationsInput | string | null
    user_session_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type agent_languagesUpdateWithoutAgents_customInput = {
    language_code?: StringFieldUpdateOperationsInput | string
    personality_translation?: NullableStringFieldUpdateOperationsInput | string | null
    voice_id?: NullableStringFieldUpdateOperationsInput | string | null
    voice_settings?: NullableJsonNullValueInput | InputJsonValue
    is_primary?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type agent_languagesUncheckedUpdateWithoutAgents_customInput = {
    id?: IntFieldUpdateOperationsInput | number
    language_code?: StringFieldUpdateOperationsInput | string
    personality_translation?: NullableStringFieldUpdateOperationsInput | string | null
    voice_id?: NullableStringFieldUpdateOperationsInput | string | null
    voice_settings?: NullableJsonNullValueInput | InputJsonValue
    is_primary?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type agent_languagesUncheckedUpdateManyWithoutAgents_customInput = {
    id?: IntFieldUpdateOperationsInput | number
    language_code?: StringFieldUpdateOperationsInput | string
    personality_translation?: NullableStringFieldUpdateOperationsInput | string | null
    voice_id?: NullableStringFieldUpdateOperationsInput | string | null
    voice_settings?: NullableJsonNullValueInput | InputJsonValue
    is_primary?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type agent_performance_metricsUpdateWithoutAgents_customInput = {
    metric_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    total_interactions?: NullableIntFieldUpdateOperationsInput | number | null
    successful_interactions?: NullableIntFieldUpdateOperationsInput | number | null
    avg_response_time_ms?: NullableIntFieldUpdateOperationsInput | number | null
    voice_generation_count?: NullableIntFieldUpdateOperationsInput | number | null
    error_count?: NullableIntFieldUpdateOperationsInput | number | null
    language_breakdown?: NullableJsonNullValueInput | InputJsonValue
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type agent_performance_metricsUncheckedUpdateWithoutAgents_customInput = {
    id?: IntFieldUpdateOperationsInput | number
    metric_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    total_interactions?: NullableIntFieldUpdateOperationsInput | number | null
    successful_interactions?: NullableIntFieldUpdateOperationsInput | number | null
    avg_response_time_ms?: NullableIntFieldUpdateOperationsInput | number | null
    voice_generation_count?: NullableIntFieldUpdateOperationsInput | number | null
    error_count?: NullableIntFieldUpdateOperationsInput | number | null
    language_breakdown?: NullableJsonNullValueInput | InputJsonValue
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type agent_performance_metricsUncheckedUpdateManyWithoutAgents_customInput = {
    id?: IntFieldUpdateOperationsInput | number
    metric_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    total_interactions?: NullableIntFieldUpdateOperationsInput | number | null
    successful_interactions?: NullableIntFieldUpdateOperationsInput | number | null
    avg_response_time_ms?: NullableIntFieldUpdateOperationsInput | number | null
    voice_generation_count?: NullableIntFieldUpdateOperationsInput | number | null
    error_count?: NullableIntFieldUpdateOperationsInput | number | null
    language_breakdown?: NullableJsonNullValueInput | InputJsonValue
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type agent_usage_eventsUpdateWithoutAgents_customInput = {
    event_type?: StringFieldUpdateOperationsInput | string
    event_data?: NullableJsonNullValueInput | InputJsonValue
    user_session_id?: NullableStringFieldUpdateOperationsInput | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    language_used?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type agent_usage_eventsUncheckedUpdateWithoutAgents_customInput = {
    id?: IntFieldUpdateOperationsInput | number
    event_type?: StringFieldUpdateOperationsInput | string
    event_data?: NullableJsonNullValueInput | InputJsonValue
    user_session_id?: NullableStringFieldUpdateOperationsInput | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    language_used?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type agent_usage_eventsUncheckedUpdateManyWithoutAgents_customInput = {
    id?: IntFieldUpdateOperationsInput | number
    event_type?: StringFieldUpdateOperationsInput | string
    event_data?: NullableJsonNullValueInput | InputJsonValue
    user_session_id?: NullableStringFieldUpdateOperationsInput | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    language_used?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}