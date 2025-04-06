import {List} from 'immutable';

export type OpenBracket = {};
export type CloseBracket = {};
export type Atom = { name: string };
export type Token = OpenBracket | CloseBracket | number | Atom;

export function getOpenBracket(): OpenBracket { return {}; }
export function getCloseBracket(): CloseBracket { return {}; }
export function getAtom(name: string): Atom { return {name: name}; }

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