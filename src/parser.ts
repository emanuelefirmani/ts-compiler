import {List} from 'immutable';
import {Token, OpenBracket, CloseBracket, Atom} from "./tokenizer";

export type Expression = { method: string, parameters: List<Node> };
export type Node = number | Expression;
type FoldItem = { accumulator: List<Node>, rest: List<Token> };

export function parse(tokens: List<Token>): List<Node> {
    const item = parseRecursive({ accumulator: List<Node>(), rest: tokens});
    return item.accumulator;
}

function parseRecursive(item: FoldItem): FoldItem {
    let newItem = item;

    while(newItem.rest.size > 0)
    {
        const token = newItem.rest.first();
        const newRest = newItem.rest.skip(1);

        if(typeof token === 'number') {
            const newAccumulator = newItem.accumulator.push(token);
            newItem = {accumulator: newAccumulator, rest: newRest};
        }
        else if(token instanceof OpenBracket){
            const method = newRest.first();
            if(!(method instanceof Atom)) {
                throw new Error(`An expression must start with atom, but found: ${JSON.stringify(token)}`);
            }
            const restAfterMethod = newRest.skip(1);
            const subExpression= parseRecursive({accumulator: List(), rest: restAfterMethod});
            const expression: Expression = {method: method.name, parameters: subExpression.accumulator};
            newItem = {accumulator: newItem.accumulator.push(expression), rest: subExpression.rest};
        }
        else if(token instanceof CloseBracket){
            return {accumulator: newItem.accumulator, rest: newRest};
        }
        else
            throw new RangeError(`Unexpected token ${JSON.stringify(token)}`);
    }

    return newItem;
}