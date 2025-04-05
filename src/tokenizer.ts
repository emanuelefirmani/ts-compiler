import {List} from 'immutable';

export type OpenBracket = {};
export type ClosedBracket = {};
export type Variable = { name: string };
export type Token = OpenBracket | ClosedBracket | number | Variable;

export function getOpenBracket(): OpenBracket { return {}; }
export function getClosedBracket(): ClosedBracket { return {}; }
export function getVariable(name: string): Variable { return {name: name}; }

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
                return getVariable(text);
            }
            throw new Error('Unexpected token: ' + text);
    }
}