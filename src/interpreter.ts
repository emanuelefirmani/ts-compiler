import {Expression, Node} from "./parser";

export function interpret(tree: Node): number {
    if (typeof tree === 'number') {
        return tree;
    }

    const expr = tree as Expression;
    const p1 = interpret(expr.parameters.get(0)!);
    const p2 = interpret(expr.parameters.get(1)!);

    return p1 + p2;
}