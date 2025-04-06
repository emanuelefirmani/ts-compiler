import {List} from 'immutable';
import {Token} from "./tokenizer";

type Node = number;

export function parse(tokens: List<Token>): List<Node> {
    return tokens.map(toNode);
}

function toNode(token: Token): Node {
    if(typeof token === 'number') {
        return token;
    }

    throw new RangeError(`Unexpected token ${JSON.stringify(token)}`);
}