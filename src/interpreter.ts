import {Expression, Node} from "./parser";

export function interpret(tree: Node): number {
    if (typeof tree === 'number') {
        return tree;
    }

    const expr = tree as Expression;
    const p1 = interpret(expr.parameters.get(0)!);
    const p2 = interpret(expr.parameters.get(1)!);

    if(expr.method == "+") {
        return p1 + p2;
    }
    if(expr.method == "-") {
        return p1 - p2;
    }
    return NaN;
}