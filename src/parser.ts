import {List} from 'immutable';
import {Token} from "./tokenizer";

type Node = number;
type FoldItem = { accumulator: List<Node>, rest: List<Token> };

export function parse(tokens: List<Token>): List<Node> {
    const item = parse2({ accumulator: List<Node>(), rest: tokens});
    return item.accumulator;
}

function parse2(item: FoldItem): FoldItem {
    if(item.rest.size === 0)
        return item;

    var token = item.rest.first();

    const newAccumulator = item.accumulator.push(toNode(token));
    const newRest = item.rest.skip(1);

    return {accumulator: newAccumulator, rest: newRest};
}

function toNode(token: Token | undefined): Node {
    if(typeof token === 'number') {
        return token;
    }

    throw new RangeError(`Unexpected token ${JSON.stringify(token)}`);
}