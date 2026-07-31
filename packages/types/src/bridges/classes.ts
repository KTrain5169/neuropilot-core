import type { Disposable } from 'vscode';
import type { JSONSchema7Type } from 'json-schema';
import type { Action, SchemaTypes } from '../common/actions';

export abstract class BridgesBase implements Disposable {
    readonly name: string;
    readonly version: string;

    constructor(name: string, version: string) {
        this.name = name
        this.version = version
    }

    protected executeAction(id: string, name: string, data: JSONSchema7Type): any /* todo: make this proper return type later */ {

    }

    abstract registerAction(action: Action<SchemaTypes>): void;
    abstract unregisterAction(action_name: string): void;
    abstract sendContext(message: string, silent?: boolean): void;
    abstract forceActions(actions: string[]): void;

    abstract dispose(): any;
}
