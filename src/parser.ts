import {List} from 'immutable';
import {Token, OpenBracket, CloseBracket, Atom} from "./tokenizer";

export type Expression = { method: string, arguments: List<Node> };
export type Node = number | Expression;
type FoldItem = { accumulator: List<Node>, rest: List<Token> };

export function parse(tokens: List<Token>): List<Node> {
    const item = parse2({ accumulator: List<Node>(), rest: tokens});
    return item.accumulator;
}

function parse2(item: FoldItem): FoldItem {
    if(item.rest.size === 0)
        return item;

    const token = item.rest.first();
    const newRest = item.rest.skip(1);

    if(typeof token === 'number') {
        const newAccumulator = item.accumulator.push(token);
        return {accumulator: newAccumulator, rest: newRest};
    }
    if(token instanceof OpenBracket){
        const method = newRest.first();
        if(!(method instanceof Atom)) {
            throw new Error(`An expression must start with atom, but found: ${JSON.stringify(token)}`);
        }
        const restAfterMethod = newRest.skip(1);
        const subExpression= parse2({accumulator: List(), rest: restAfterMethod});
        const args = subExpression.accumulator;
        const expression: Expression = {method: method.name, arguments: args};
        return {accumulator: item.accumulator.push(expression), rest: subExpression.rest};
    }
    if(token instanceof CloseBracket){
        return {accumulator: item.accumulator, rest: newRest};
    }

    throw new RangeError(`Unexpected token ${JSON.stringify(token)}`);
}