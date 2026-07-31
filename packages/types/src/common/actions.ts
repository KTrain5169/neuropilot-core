import type { StandardJSONSchemaV1 } from '@standard-schema/spec';
import type { ActionHandlerResult, ActionValidationResult, PermissionLevel } from '@vsc-neuropilot/api-types';
import type { JSONSchema7 } from 'json-schema'

export type SchemaTypes = StandardJSONSchemaV1 | JSONSchema7 | undefined;

export type InferDataShape<TSchema extends SchemaTypes> =
    TSchema extends StandardJSONSchemaV1 ?
    StandardJSONSchemaV1.InferInput<TSchema> :
    (TSchema extends JSONSchema7 ? unknown : undefined);

export interface Action<TSchema extends SchemaTypes = JSONSchema7, TInput = InferDataShape<TSchema>> {
    name: string;
    description: string;
    schema?: TSchema;
    validators?: {
        sync?: ((ctx: ExecutionContext<TInput>) => ActionValidationResult)[];
        async?: ((ctx: ExecutionContext<TInput>) => Thenable<ActionValidationResult>)[];
    };
    preview?: (ctx: ExecutionContext<TInput>) => { dispose: () => unknown };
    handler(ctx: ExecutionContext<TInput>): ActionHandlerResult | Thenable<ActionHandlerResult>;
    defaultPermission?: PermissionLevel;
    prompt?: string | ((ctx: ExecutionContext<TInput>) => string);
}

export interface ExecutionContext<TDataShape> extends IncomingActionData {
    data: TDataShape;
}

export interface IncomingActionData {
    id: string;
    name: string;
    data: unknown;
}

/**
 * Helper function to get {@link InferDataShape automatic type inferring from action schemas}.
 * Does not do anything else at runtime.
 * 
 * If your schema is a normal JSON schema, you can also provide the shape of your data as an optional type parameter (defaults to `unknown`)
 * @example
 * const action = defineAction<{ param1: string; param2: string; }, {}>({ ... });
 */
export function defineAction<const TInput extends InferDataShape<TSchema>, const TSchema extends SchemaTypes>(action: Action<TSchema, TInput>): Action<TSchema, TInput> {
    return action;
}
