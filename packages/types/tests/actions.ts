import { StandardJSONSchemaV1 } from '@standard-schema/spec';
import { Action, defineAction } from '../src/common/actions';
import { z } from 'zod';
import { JSONSchema7 } from 'json-schema';

const autoAction = defineAction({
    name: 'auto_action',
    description: 'automatic action',
    schema: z.object({
        agent: z.string()
    }),
    handler(data) {
        return {
            success: 'success',
        }
    },
    prompt: ''
})

const manualAction: Action<StandardJSONSchemaV1> = {
    name: 'manual_action',
    description: 'desc',
    schema: z.object(),
    handler(ctx) {
        return {
            success: 'success'
        }
    },
}

const jsonAction = defineAction<{ agents: string }, {}>({
    name: 'json_action',
    description: 'desc',
    schema: {
        type: 'object'
    },
    handler(ctx) {
        return {
            success: 'success'
        }
    },
})
