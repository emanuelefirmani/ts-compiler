import {List} from 'immutable';

export class OpenBracket {}
export class CloseBracket {}
export class Atom {
    constructor(public name: string) {
        this.name = name;
    }
}
export type Token = OpenBracket | CloseBracket | number | Atom;

export function getOpenBracket(): OpenBracket { return new OpenBracket(); }
export function getCloseBracket(): CloseBracket { return new CloseBracket(); }
export function getAtom(name: string): Atom { return new Atom(name); }

export function tokenize(text: string): List<Token> {
    const replaced = text.replace(/\(/g, ' ( ').replace(/\)/g, ' ) ');
    const parts = replaced.split(' ').filter(x => x !== '');
    return List(parts.map(toToken));
}

function toToken(text: string): Token {
    switch (text) {
        case '(': return getOpenBracket();
        case ')': return getCloseBracket();
        default:
            if(/^\d*(\.\d+)?$/.test(text)) {
                return parseFloat(text);
            }
            if(/^[a-zA-Z]/.test(text)) {
                return getAtom(text);
            }
            throw new Error('Unexpected token: ' + text);
    }
}