import {Expression, Node} from "./parser";

export function interpret(tree: Node): number {
    if(typeof tree === 'number') {
        return tree;
    }

    const expr = tree as Expression;

    return (expr.parameters.get(0) as number) + (expr.parameters.get(1) as number);
}