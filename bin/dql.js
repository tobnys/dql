'use strict';
function _interopDefault(t) {
    return t && 'object' == typeof t && 'default' in t ? t.default : t;
}
function commonjsRequire() {
    throw new Error(
        'Dynamic requires are not currently supported by rollup-plugin-commonjs'
    );
}
function createCommonjsModule(t, e) {
    return (e = { exports: {} }), t(e, e.exports), e.exports;
}
function resolveVariable(t, e) {
    const r = e[t];
    if (void 0 === r) throw new Error(`Could not find variable: ${t}`);
    return r;
}
function buildOperationStringHelper(t, e, r, n, i, o, a) {
    if (r.type === Nodes.OPERATION) {
        const o = r.a,
            s = r.op,
            l = r.b,
            u = buildOperationStringHelper(t, e, o, n, i, !0, a),
            c = buildOperationStringHelper(t, null, l, n, i, !1, a);
        return {
            text: `${u.text} ${s} ${c.text}`,
            variables: [...u.variables, ...c.variables]
        };
    }
    if (r.type === Nodes.VARIABLE)
        return { text: '?', variables: [resolveVariable(r.value, n)] };
    if (r.type === Nodes.BUILT_IN) return { text: r.value, variables: [] };
    if (r.type === Nodes.QUERY_CALL) {
        const e = t.filter(t => 'QUERY' === t.type && t.name === r.name)[0];
        if (void 0 === e) throw new Error(`Could not find query '${r.name}`);
        const { variables: i } = e,
            o = {};
        return (
            i.forEach((t, e) => {
                const i = r.params[e];
                o[t] =
                    i.type === Nodes.VARIABLE
                        ? resolveVariable(i.value, n)
                        : i.value;
            }),
            { text: '?', variables: [QueryProcessor.process(t, e, o)] }
        );
    }
    return o
        ? {
              text:
                  null === e
                      ? r.value
                      : void 0 === a[r.value] ? `${e}.${r.value}` : r.alias,
              variables: []
          }
        : {
              text: '?',
              variables: [
                  null === e
                      ? r.value
                      : void 0 === a[r.value] ? `${e}.${r.value}` : r.alias
              ]
          };
}
var fs = _interopDefault(require('fs')),
    path = _interopDefault(require('path')),
    Nodes = {
        TABLE: 'TABLE',
        JOIN: 'JOIN',
        QUERY: 'QUERY',
        QUERY_CALL: 'QUERY_CALL',
        FIELD: 'FIELD',
        OPERATION: 'OPERATION',
        VARIABLE: 'VARIABLE',
        BUILT_IN: 'BUILT_IN'
    },
    commonjsGlobal =
        'undefined' != typeof window
            ? window
            : 'undefined' != typeof global
              ? global
              : 'undefined' != typeof self ? self : {},
    _parser = createCommonjsModule(function(t, e) {
        var r = (function() {
            function t() {
                this.yy = {};
            }
            var e = function(t, e, r, n) {
                    for (r = r || {}, n = t.length; n--; r[t[n]] = e);
                    return r;
                },
                r = [1, 5],
                n = [1, 12],
                i = [1, 8],
                o = [1, 11],
                a = [1, 13],
                s = [4, 5, 8, 10, 22, 23, 24, 28, 29, 31, 32, 33, 36, 38],
                l = [1, 19],
                u = [1, 26],
                c = [22, 24],
                h = [4, 10, 38],
                f = [1, 35],
                p = [22, 24, 31, 33],
                d = [1, 49],
                v = [1, 47],
                y = [1, 48],
                _ = [1, 55],
                g = [2, 3],
                m = [1, 58],
                b = [2, 4],
                k = [4, 28, 29],
                B = {
                    trace: function() {},
                    yy: {},
                    symbols_: {
                        error: 2,
                        Text: 3,
                        STRING: 4,
                        '.': 5,
                        TextString: 6,
                        Number: 7,
                        NUMBER: 8,
                        Join: 9,
                        JOIN_OP: 10,
                        Definition: 11,
                        DEFINITION: 12,
                        Root: 13,
                        DocumentList: 14,
                        Document: 15,
                        Variables: 16,
                        Block: 17,
                        QueryCall: 18,
                        Params: 19,
                        ParamList: 20,
                        Variable: 21,
                        ',': 22,
                        '(': 23,
                        ')': 24,
                        $: 25,
                        VariableList: 26,
                        BuiltInFunc: 27,
                        "'": 28,
                        '"': 29,
                        Equation: 30,
                        OPERATOR: 31,
                        '[': 32,
                        ']': 33,
                        EquationList: 34,
                        Selectors: 35,
                        '{': 36,
                        BlockContent: 37,
                        '}': 38,
                        Content: 39,
                        JoinOperation: 40,
                        TableOperation: 41,
                        $accept: 0,
                        $end: 1
                    },
                    terminals_: {
                        2: 'error',
                        4: 'STRING',
                        5: '.',
                        8: 'NUMBER',
                        10: 'JOIN_OP',
                        12: 'DEFINITION',
                        22: ',',
                        23: '(',
                        24: ')',
                        25: '$',
                        28: "'",
                        29: '"',
                        31: 'OPERATOR',
                        32: '[',
                        33: ']',
                        36: '{',
                        38: '}'
                    },
                    productions_: [
                        0,
                        [3, 1],
                        [3, 3],
                        [6, 1],
                        [6, 1],
                        [6, 2],
                        [6, 2],
                        [7, 1],
                        [9, 1],
                        [11, 1],
                        [13, 1],
                        [15, 4],
                        [15, 3],
                        [14, 2],
                        [14, 1],
                        [18, 2],
                        [20, 0],
                        [20, 1],
                        [20, 1],
                        [20, 3],
                        [20, 3],
                        [19, 3],
                        [21, 2],
                        [16, 2],
                        [16, 3],
                        [26, 1],
                        [26, 3],
                        [27, 4],
                        [27, 4],
                        [30, 1],
                        [30, 1],
                        [30, 1],
                        [30, 1],
                        [30, 1],
                        [30, 3],
                        [30, 3],
                        [30, 3],
                        [34, 1],
                        [34, 3],
                        [35, 3],
                        [17, 3],
                        [37, 1],
                        [37, 2],
                        [39, 1],
                        [39, 1],
                        [39, 1],
                        [39, 4],
                        [41, 3],
                        [41, 2],
                        [40, 4]
                    ],
                    performAction: function(t, e, r, n, i, o) {
                        var a = o.length - 1;
                        switch (i) {
                            case 1:
                            case 3:
                            case 4:
                            case 7:
                            case 8:
                            case 22:
                            case 32:
                                this.$ = o[a];
                                break;
                            case 2:
                                this.$ = o[a - 2] + '.' + o[a];
                                break;
                            case 5:
                            case 6:
                                this.$ = o[a - 1] + ' ' + o[a];
                                break;
                            case 9:
                            case 43:
                            case 44:
                                this.$ = o[a];
                                break;
                            case 10:
                                return (this.$ = o[a]);
                            case 11:
                                this.$ = {
                                    type: o[a - 3].toUpperCase(),
                                    name: o[a - 2],
                                    variables: o[a - 1],
                                    nodes: o[a]
                                };
                                break;
                            case 12:
                                this.$ = {
                                    type: o[a - 2].toUpperCase(),
                                    name: o[a - 1],
                                    variables: [],
                                    nodes: o[$01]
                                };
                                break;
                            case 13:
                            case 42:
                                (this.$ = o[a - 1]), o[a - 1].push(o[a]);
                                break;
                            case 14:
                            case 25:
                            case 37:
                            case 41:
                                this.$ = [o[a]];
                                break;
                            case 15:
                                this.$ = {
                                    type: 'QUERY_CALL',
                                    name: o[a - 1],
                                    params: o[a]
                                };
                                break;
                            case 16:
                                this.$ = [''];
                                break;
                            case 17:
                                this.$ = [{ type: 'TEXT', value: o[a] }];
                                break;
                            case 18:
                                this.$ = [{ type: 'VARIABLE', value: o[a] }];
                                break;
                            case 19:
                            case 20:
                            case 26:
                            case 38:
                                (this.$ = o[a - 2]), o[a - 2].push(o[a]);
                                break;
                            case 21:
                            case 24:
                            case 35:
                            case 36:
                            case 39:
                                this.$ = o[a - 1];
                                break;
                            case 23:
                                this.$ = [];
                                break;
                            case 27:
                                this.$ = o[a - 3] + " '" + o[a - 1] + "'";
                                break;
                            case 28:
                                this.$ = o[a - 3] + ' "' + o[a - 1] + '"';
                                break;
                            case 29:
                                this.$ = { type: 'TEXT', value: o[a] };
                                break;
                            case 30:
                                this.$ = { type: 'NUMBER', value: o[a] };
                                break;
                            case 31:
                                this.$ = { type: 'VARIABLE', value: o[a] };
                                break;
                            case 33:
                                this.$ = { type: 'BUILT_IN', value: o[a] };
                                break;
                            case 34:
                                this.$ = {
                                    type: 'OPERATION',
                                    a: o[a - 2],
                                    op: o[a - 1],
                                    b: o[a]
                                };
                                break;
                            case 40:
                                this.$ = o[a - 1];
                                break;
                            case 45:
                                this.$ = {
                                    type: 'FIELD',
                                    value: o[a],
                                    alias: null
                                };
                                break;
                            case 46:
                                this.$ = {
                                    type: 'FIELD',
                                    value: o[a - 3],
                                    alias: o[a - 1]
                                };
                                break;
                            case 47:
                                this.$ = {
                                    type: 'TABLE',
                                    name: o[a - 2].trim(),
                                    params: o[a - 1],
                                    nodes: o[a]
                                };
                                break;
                            case 48:
                                this.$ = {
                                    type: 'TABLE',
                                    name: o[a - 1].trim(),
                                    params: [],
                                    nodes: o[a]
                                };
                                break;
                            case 49:
                                this.$ = {
                                    type: 'JOIN',
                                    table: o[a - 2].trim(),
                                    on: o[a - 1],
                                    nodes: o[a]
                                };
                        }
                    },
                    table: [
                        { 11: 4, 12: r, 13: 1, 14: 2, 15: 3 },
                        { 1: [3] },
                        { 1: [2, 10], 11: 4, 12: r, 15: 6 },
                        e(n, [2, 14]),
                        { 3: 7, 4: i },
                        { 4: [2, 9] },
                        e(n, [2, 13]),
                        { 5: o, 16: 9, 17: 10, 23: n, 36: a },
                        e(s, [2, 1]),
                        { 17: 14, 36: a },
                        e(n, [2, 12]),
                        { 4: [1, 15] },
                        { 21: 18, 24: [1, 16], 25: l, 26: 17 },
                        {
                            3: 24,
                            4: i,
                            9: 25,
                            10: u,
                            37: 20,
                            39: 21,
                            40: 22,
                            41: 23
                        },
                        e(n, [2, 11]),
                        e(s, [2, 2]),
                        { 36: [2, 23] },
                        { 22: [1, 28], 24: [1, 27] },
                        e(c, [2, 25]),
                        { 3: 29, 4: i },
                        {
                            3: 24,
                            4: i,
                            9: 25,
                            10: u,
                            38: [1, 30],
                            39: 31,
                            40: 22,
                            41: 23
                        },
                        e(h, [2, 41]),
                        e(h, [2, 43]),
                        e(h, [2, 44]),
                        e(h, [2, 45], {
                            35: 33,
                            17: 34,
                            5: o,
                            23: f,
                            32: [1, 32],
                            36: a
                        }),
                        { 3: 36, 4: i },
                        { 4: [2, 8] },
                        { 36: [2, 24] },
                        { 21: 37, 25: l },
                        e(p, [2, 22], { 5: o }),
                        e([1, 4, 10, 12, 38], [2, 40]),
                        e(h, [2, 42]),
                        { 3: 38, 4: i },
                        { 17: 39, 36: a },
                        e(h, [2, 48]),
                        {
                            3: 42,
                            4: i,
                            6: 50,
                            7: 43,
                            8: d,
                            18: 45,
                            21: 44,
                            23: v,
                            25: l,
                            27: 46,
                            30: 41,
                            32: y,
                            34: 40
                        },
                        { 5: o, 23: f, 35: 51 },
                        e(c, [2, 26]),
                        { 5: o, 33: [1, 52] },
                        e(h, [2, 47]),
                        { 22: [1, 54], 24: [1, 53] },
                        e(c, [2, 37], { 31: _ }),
                        e(p, [2, 29], {
                            19: 56,
                            7: 57,
                            4: g,
                            28: g,
                            29: g,
                            5: o,
                            8: d,
                            23: m
                        }),
                        e(p, [2, 30], { 4: b, 28: b, 29: b }),
                        e(p, [2, 31]),
                        e(p, [2, 32]),
                        e(p, [2, 33]),
                        {
                            3: 42,
                            4: i,
                            6: 50,
                            7: 43,
                            8: d,
                            18: 45,
                            21: 44,
                            23: v,
                            25: l,
                            27: 46,
                            30: 59,
                            32: y
                        },
                        {
                            3: 42,
                            4: i,
                            6: 50,
                            7: 43,
                            8: d,
                            18: 45,
                            21: 44,
                            23: v,
                            25: l,
                            27: 46,
                            30: 60,
                            32: y
                        },
                        e([4, 22, 24, 28, 29, 31, 33], [2, 7]),
                        { 3: 63, 4: i, 28: [1, 61], 29: [1, 62] },
                        { 17: 64, 36: a },
                        e(h, [2, 46]),
                        { 36: [2, 39] },
                        {
                            3: 42,
                            4: i,
                            6: 50,
                            7: 43,
                            8: d,
                            18: 45,
                            21: 44,
                            23: v,
                            25: l,
                            27: 46,
                            30: 65,
                            32: y
                        },
                        {
                            3: 42,
                            4: i,
                            6: 50,
                            7: 43,
                            8: d,
                            18: 45,
                            21: 44,
                            23: v,
                            25: l,
                            27: 46,
                            30: 66,
                            32: y
                        },
                        e(p, [2, 15]),
                        e(k, [2, 5]),
                        e(c, [2, 16], { 20: 67, 3: 68, 21: 69, 4: i, 25: l }),
                        { 24: [1, 70], 31: _ },
                        { 31: _, 33: [1, 71] },
                        { 3: 73, 4: i, 6: 72, 7: 74, 8: d },
                        { 3: 73, 4: i, 6: 75, 7: 74, 8: d },
                        e(k, [2, 6], { 5: o }),
                        e(h, [2, 49]),
                        e(c, [2, 38], { 31: _ }),
                        e([22, 24, 33], [2, 34], { 31: _ }),
                        { 22: [1, 77], 24: [1, 76] },
                        e(c, [2, 17], { 5: o }),
                        e(c, [2, 18]),
                        e(p, [2, 35]),
                        e(p, [2, 36]),
                        { 3: 63, 4: i, 28: [1, 78] },
                        e(k, g, { 7: 57, 5: o, 8: d }),
                        e(k, b),
                        { 3: 63, 4: i, 29: [1, 79] },
                        e(p, [2, 21]),
                        { 3: 81, 4: i, 18: 80 },
                        e(p, [2, 27]),
                        e(p, [2, 28]),
                        e(c, [2, 19]),
                        e(c, [2, 20], { 19: 56, 5: o, 23: m })
                    ],
                    defaultActions: {
                        5: [2, 9],
                        16: [2, 23],
                        26: [2, 8],
                        27: [2, 24],
                        53: [2, 39]
                    },
                    parseError: function(t, e) {
                        if (!e.recoverable) {
                            var r = new Error(t);
                            throw ((r.hash = e), r);
                        }
                        this.trace(t);
                    },
                    parse: function(t) {
                        var e = this,
                            r = [0],
                            n = [null],
                            i = [],
                            o = this.table,
                            a = '',
                            s = 0,
                            l = 0,
                            u = 0,
                            c = i.slice.call(arguments, 1),
                            h = Object.create(this.lexer),
                            f = { yy: {} };
                        for (var p in this.yy)
                            Object.prototype.hasOwnProperty.call(this.yy, p) &&
                                (f.yy[p] = this.yy[p]);
                        h.setInput(t, f.yy),
                            (f.yy.lexer = h),
                            (f.yy.parser = this),
                            void 0 === h.yylloc && (h.yylloc = {});
                        var d = h.yylloc;
                        i.push(d);
                        var v = h.options && h.options.ranges;
                        this.parseError =
                            'function' == typeof f.yy.parseError
                                ? f.yy.parseError
                                : Object.getPrototypeOf(this).parseError;
                        for (
                            var y,
                                _,
                                g,
                                m,
                                b,
                                k,
                                B,
                                O,
                                w,
                                P = function() {
                                    var t;
                                    return (
                                        'number' != typeof (t = h.lex() || 1) &&
                                            (t = e.symbols_[t] || t),
                                        t
                                    );
                                },
                                S = {};
                            ;

                        ) {
                            if (
                                ((g = r[r.length - 1]),
                                this.defaultActions[g]
                                    ? (m = this.defaultActions[g])
                                    : ((null === y || void 0 === y) &&
                                          (y = P()),
                                      (m = o[g] && o[g][y])),
                                void 0 === m || !m.length || !m[0])
                            ) {
                                var E = '';
                                for (k in ((w = []), o[g]))
                                    this.terminals_[k] &&
                                        k > 2 &&
                                        w.push("'" + this.terminals_[k] + "'");
                                (E = h.showPosition
                                    ? 'Parse error on line ' +
                                      (s + 1) +
                                      ':\n' +
                                      h.showPosition() +
                                      '\nExpecting ' +
                                      w.join(', ') +
                                      ", got '" +
                                      (this.terminals_[y] || y) +
                                      "'"
                                    : 'Parse error on line ' +
                                      (s + 1) +
                                      ': Unexpected ' +
                                      (1 == y
                                          ? 'end of input'
                                          : "'" +
                                            (this.terminals_[y] || y) +
                                            "'")),
                                    this.parseError(E, {
                                        text: h.match,
                                        token: this.terminals_[y] || y,
                                        line: h.yylineno,
                                        loc: d,
                                        expected: w
                                    });
                            }
                            if (m[0] instanceof Array && 1 < m.length)
                                throw new Error(
                                    'Parse Error: multiple actions possible at state: ' +
                                        g +
                                        ', token: ' +
                                        y
                                );
                            switch (m[0]) {
                                case 1:
                                    r.push(y),
                                        n.push(h.yytext),
                                        i.push(h.yylloc),
                                        r.push(m[1]),
                                        (y = null),
                                        _
                                            ? ((y = _), (_ = null))
                                            : ((l = h.yyleng),
                                              (a = h.yytext),
                                              (s = h.yylineno),
                                              (d = h.yylloc),
                                              0 < u && u--);
                                    break;
                                case 2:
                                    if (
                                        ((B = this.productions_[m[1]][1]),
                                        (S.$ = n[n.length - B]),
                                        (S._$ = {
                                            first_line:
                                                i[i.length - (B || 1)]
                                                    .first_line,
                                            last_line:
                                                i[i.length - 1].last_line,
                                            first_column:
                                                i[i.length - (B || 1)]
                                                    .first_column,
                                            last_column:
                                                i[i.length - 1].last_column
                                        }),
                                        v &&
                                            (S._$.range = [
                                                i[i.length - (B || 1)].range[0],
                                                i[i.length - 1].range[1]
                                            ]),
                                        void 0 !==
                                            (b = this.performAction.apply(
                                                S,
                                                [
                                                    a,
                                                    l,
                                                    s,
                                                    f.yy,
                                                    m[1],
                                                    n,
                                                    i
                                                ].concat(c)
                                            )))
                                    )
                                        return b;
                                    B &&
                                        ((r = r.slice(0, -1 * B * 2)),
                                        (n = n.slice(0, -1 * B)),
                                        (i = i.slice(0, -1 * B))),
                                        r.push(this.productions_[m[1]][0]),
                                        n.push(S.$),
                                        i.push(S._$),
                                        (O =
                                            o[r[r.length - 2]][
                                                r[r.length - 1]
                                            ]),
                                        r.push(O);
                                    break;
                                case 3:
                                    return !0;
                            }
                        }
                        return !0;
                    }
                },
                O = {
                    EOF: 1,
                    parseError: function(t, e) {
                        if (!this.yy.parser) throw new Error(t);
                        this.yy.parser.parseError(t, e);
                    },
                    setInput: function(t, e) {
                        return (
                            (this.yy = e || this.yy || {}),
                            (this._input = t),
                            (this._more = this._backtrack = this.done = !1),
                            (this.yylineno = this.yyleng = 0),
                            (this.yytext = this.matched = this.match = ''),
                            (this.conditionStack = ['INITIAL']),
                            (this.yylloc = {
                                first_line: 1,
                                first_column: 0,
                                last_line: 1,
                                last_column: 0
                            }),
                            this.options.ranges && (this.yylloc.range = [0, 0]),
                            (this.offset = 0),
                            this
                        );
                    },
                    input: function() {
                        var t = this._input[0];
                        return (
                            (this.yytext += t),
                            this.yyleng++,
                            this.offset++,
                            (this.match += t),
                            (this.matched += t),
                            t.match(/(?:\r\n?|\n).*/g)
                                ? (this.yylineno++, this.yylloc.last_line++)
                                : this.yylloc.last_column++,
                            this.options.ranges && this.yylloc.range[1]++,
                            (this._input = this._input.slice(1)),
                            t
                        );
                    },
                    unput: function(t) {
                        var e = t.length,
                            r = t.split(/(?:\r\n?|\n)/g);
                        (this._input = t + this._input),
                            (this.yytext = this.yytext.substr(
                                0,
                                this.yytext.length - e
                            )),
                            (this.offset -= e);
                        var n = this.match.split(/(?:\r\n?|\n)/g);
                        (this.match = this.match.substr(
                            0,
                            this.match.length - 1
                        )),
                            (this.matched = this.matched.substr(
                                0,
                                this.matched.length - 1
                            )),
                            r.length - 1 && (this.yylineno -= r.length - 1);
                        var i = this.yylloc.range;
                        return (
                            (this.yylloc = {
                                first_line: this.yylloc.first_line,
                                last_line: this.yylineno + 1,
                                first_column: this.yylloc.first_column,
                                last_column: r
                                    ? (r.length === n.length
                                          ? this.yylloc.first_column
                                          : 0) +
                                      n[n.length - r.length].length -
                                      r[0].length
                                    : this.yylloc.first_column - e
                            }),
                            this.options.ranges &&
                                (this.yylloc.range = [
                                    i[0],
                                    i[0] + this.yyleng - e
                                ]),
                            (this.yyleng = this.yytext.length),
                            this
                        );
                    },
                    more: function() {
                        return (this._more = !0), this;
                    },
                    reject: function() {
                        return this.options.backtrack_lexer
                            ? ((this._backtrack = !0), this)
                            : this.parseError(
                                  'Lexical error on line ' +
                                      (this.yylineno + 1) +
                                      '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' +
                                      this.showPosition(),
                                  { text: '', token: null, line: this.yylineno }
                              );
                    },
                    less: function(t) {
                        this.unput(this.match.slice(t));
                    },
                    pastInput: function() {
                        var t = this.matched.substr(
                            0,
                            this.matched.length - this.match.length
                        );
                        return (
                            (20 < t.length ? '...' : '') +
                            t.substr(-20).replace(/\n/g, '')
                        );
                    },
                    upcomingInput: function() {
                        var t = this.match;
                        return (
                            20 > t.length &&
                                (t += this._input.substr(0, 20 - t.length)),
                            (t.substr(0, 20) + (20 < t.length ? '...' : '')
                            ).replace(/\n/g, '')
                        );
                    },
                    showPosition: function() {
                        var t = this.pastInput(),
                            e = Array(t.length + 1).join('-');
                        return t + this.upcomingInput() + '\n' + e + '^';
                    },
                    test_match: function(t, e) {
                        var r, n, i;
                        if (
                            (this.options.backtrack_lexer &&
                                ((i = {
                                    yylineno: this.yylineno,
                                    yylloc: {
                                        first_line: this.yylloc.first_line,
                                        last_line: this.last_line,
                                        first_column: this.yylloc.first_column,
                                        last_column: this.yylloc.last_column
                                    },
                                    yytext: this.yytext,
                                    match: this.match,
                                    matches: this.matches,
                                    matched: this.matched,
                                    yyleng: this.yyleng,
                                    offset: this.offset,
                                    _more: this._more,
                                    _input: this._input,
                                    yy: this.yy,
                                    conditionStack: this.conditionStack.slice(
                                        0
                                    ),
                                    done: this.done
                                }),
                                this.options.ranges &&
                                    (i.yylloc.range = this.yylloc.range.slice(
                                        0
                                    ))),
                            (n = t[0].match(/(?:\r\n?|\n).*/g)) &&
                                (this.yylineno += n.length),
                            (this.yylloc = {
                                first_line: this.yylloc.last_line,
                                last_line: this.yylineno + 1,
                                first_column: this.yylloc.last_column,
                                last_column: n
                                    ? n[n.length - 1].length -
                                      n[n.length - 1].match(/\r?\n?/)[0].length
                                    : this.yylloc.last_column + t[0].length
                            }),
                            (this.yytext += t[0]),
                            (this.match += t[0]),
                            (this.matches = t),
                            (this.yyleng = this.yytext.length),
                            this.options.ranges &&
                                (this.yylloc.range = [
                                    this.offset,
                                    (this.offset += this.yyleng)
                                ]),
                            (this._more = !1),
                            (this._backtrack = !1),
                            (this._input = this._input.slice(t[0].length)),
                            (this.matched += t[0]),
                            (r = this.performAction.call(
                                this,
                                this.yy,
                                this,
                                e,
                                this.conditionStack[
                                    this.conditionStack.length - 1
                                ]
                            )),
                            this.done && this._input && (this.done = !1),
                            r)
                        )
                            return r;
                        if (this._backtrack) {
                            for (var o in i) this[o] = i[o];
                            return !1;
                        }
                        return !1;
                    },
                    next: function() {
                        if (this.done) return this.EOF;
                        this._input || (this.done = !0);
                        var t, e, r, n;
                        this._more || ((this.yytext = ''), (this.match = ''));
                        for (
                            var i = this._currentRules(), o = 0;
                            o < i.length;
                            o++
                        )
                            if (
                                (r = this._input.match(this.rules[i[o]])) &&
                                (!e || r[0].length > e[0].length)
                            ) {
                                if (
                                    ((e = r),
                                    (n = o),
                                    this.options.backtrack_lexer)
                                ) {
                                    if (!1 !== (t = this.test_match(r, i[o])))
                                        return t;
                                    if (this._backtrack) {
                                        e = !1;
                                        continue;
                                    }
                                    return !1;
                                }
                                if (!this.options.flex) break;
                            }
                        return e
                            ? !1 !== (t = this.test_match(e, i[n])) && t
                            : '' === this._input
                              ? this.EOF
                              : this.parseError(
                                    'Lexical error on line ' +
                                        (this.yylineno + 1) +
                                        '. Unrecognized text.\n' +
                                        this.showPosition(),
                                    {
                                        text: '',
                                        token: null,
                                        line: this.yylineno
                                    }
                                );
                    },
                    lex: function() {
                        var t = this.next();
                        return t || this.lex();
                    },
                    begin: function(t) {
                        this.conditionStack.push(t);
                    },
                    popState: function() {
                        return 0 < this.conditionStack.length - 1
                            ? this.conditionStack.pop()
                            : this.conditionStack[0];
                    },
                    _currentRules: function() {
                        return this.conditionStack.length &&
                            this.conditionStack[this.conditionStack.length - 1]
                            ? this.conditions[
                                  this.conditionStack[
                                      this.conditionStack.length - 1
                                  ]
                              ].rules
                            : this.conditions.INITIAL.rules;
                    },
                    topState: function(t) {
                        return 0 <=
                            (t =
                                this.conditionStack.length -
                                1 -
                                Math.abs(t || 0))
                            ? this.conditionStack[t]
                            : 'INITIAL';
                    },
                    pushState: function(t) {
                        this.begin(t);
                    },
                    stateStackSize: function() {
                        return this.conditionStack.length;
                    },
                    options: {},
                    performAction: function(t, e, r, n) {
                        switch (r) {
                            case 0:
                                break;
                            case 1:
                                return 8;
                            case 2:
                                return 12;
                            case 3:
                                return 4;
                            case 4:
                                return 31;
                            case 5:
                                return 36;
                            case 6:
                                return 38;
                            case 7:
                                return 23;
                            case 8:
                                return 24;
                            case 9:
                                return 10;
                            case 10:
                                return 22;
                            case 11:
                                return "'";
                            case 12:
                                return '"';
                            case 13:
                                return 5;
                            case 14:
                                return 25;
                            case 15:
                                return 32;
                            case 16:
                                return 33;
                        }
                    },
                    rules: [
                        /^(?:\s+)/,
                        /^(?:\d+\b)/,
                        /^(?:query|mutation\b)/,
                        /^(?:[\w\_\d]+)/,
                        /^(?:[\!+\-*\/%&|^=><]+)/,
                        /^(?:\{)/,
                        /^(?:\})/,
                        /^(?:\()/,
                        /^(?:\))/,
                        /^(?:\.{3}\s*on)/,
                        /^(?:\,)/,
                        /^(?:\')/,
                        /^(?:\")/,
                        /^(?:\.)/,
                        /^(?:\$)/,
                        /^(?:\[)/,
                        /^(?:\])/
                    ],
                    conditions: {
                        INITIAL: {
                            rules: [
                                0,
                                1,
                                2,
                                3,
                                4,
                                5,
                                6,
                                7,
                                8,
                                9,
                                10,
                                11,
                                12,
                                13,
                                14,
                                15,
                                16
                            ],
                            inclusive: !0
                        }
                    }
                };
            return (B.lexer = O), (t.prototype = B), (B.Parser = t), new t();
        })();
        void 0 !== commonjsRequire &&
            !0 &&
            ((e.parser = r),
            (e.Parser = r.Parser),
            (e.parse = function() {
                return r.parse.apply(r, arguments);
            }),
            (e.main = function(t) {
                t[1] ||
                    (console.log('Usage: ' + t[0] + ' FILE'), process.exit(1));
                var r = fs.readFileSync(path.normalize(t[1]), 'utf8');
                return e.parser.parse(r);
            }),
            commonjsRequire.main === t && e.main(process.argv.slice(1)));
    });
class Processor {
    constructor(t) {
        this._qb = t;
    }
    process() {
        throw new Error('No process() method implemented for this class');
    }
}
var squel = createCommonjsModule(function(t, e) {
        !(function(e, r) {
            t.exports = r();
        })(0, function() {
            function t(t, e) {
                if (!t)
                    throw new ReferenceError(
                        "this hasn't been initialised - super() hasn't been called"
                    );
                return !e || ('object' != typeof e && 'function' != typeof e)
                    ? t
                    : e;
            }
            function e(t, e) {
                if ('function' != typeof e && null !== e)
                    throw new TypeError(
                        'Super expression must either be null or a function, not ' +
                            typeof e
                    );
                (t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                })),
                    e &&
                        (Object.setPrototypeOf
                            ? Object.setPrototypeOf(t, e)
                            : (t.__proto__ = e));
            }
            function r(t, e) {
                if (!(t instanceof e))
                    throw new TypeError('Cannot call a class as a function');
            }
            function n(t, e) {
                return t.length ? t + e : t;
            }
            function i(t) {
                for (
                    var e = arguments.length,
                        r = Array(e > 1 ? e - 1 : 0),
                        n = 1;
                    n < e;
                    n++
                )
                    r[n - 1] = arguments[n];
                if (t && r) {
                    var i = !0,
                        o = !1,
                        a = void 0;
                    try {
                        for (
                            var s,
                                l = function() {
                                    var e = s.value;
                                    'object' ===
                                        (void 0 === e ? 'undefined' : d(e)) &&
                                        Object.getOwnPropertyNames(
                                            e
                                        ).forEach(function(r) {
                                            t[r] = e[r];
                                        });
                                },
                                u = r[Symbol.iterator]();
                            !(i = (s = u.next()).done);
                            i = !0
                        )
                            l();
                    } catch (t) {
                        (o = !0), (a = t);
                    } finally {
                        try {
                            !i && u.return && u.return();
                        } finally {
                            if (o) throw a;
                        }
                    }
                }
                return t;
            }
            function o(t) {
                return t && t.constructor.prototype === Object.prototype;
            }
            function a(t) {
                return t && t.constructor.prototype === Array.prototype;
            }
            function s(t) {
                if (!t) return t;
                if ('function' == typeof t.clone) return t.clone();
                if (o(t) || a(t)) {
                    var e = new t.constructor();
                    return (
                        Object.getOwnPropertyNames(t).forEach(function(r) {
                            'function' != typeof t[r] && (e[r] = s(t[r]));
                        }),
                        e
                    );
                }
                return JSON.parse(JSON.stringify(t));
            }
            function l(t, e, r) {
                var n = void 0 === e ? 'undefined' : d(e);
                if ('function' !== n && 'string' !== n)
                    throw new Error(
                        'type must be a class constructor or string'
                    );
                if ('function' != typeof r)
                    throw new Error('handler must be a function');
                var i = !0,
                    o = !1,
                    a = void 0;
                try {
                    for (
                        var s, l = t[Symbol.iterator]();
                        !(i = (s = l.next()).done);
                        i = !0
                    ) {
                        var u = s.value;
                        if (u.type === e) return void (u.handler = r);
                    }
                } catch (t) {
                    (o = !0), (a = t);
                } finally {
                    try {
                        !i && l.return && l.return();
                    } finally {
                        if (o) throw a;
                    }
                }
                t.push({ type: e, handler: r });
            }
            function u(t, e, r) {
                return c(t, e) || c(t, r);
            }
            function c(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var n = e[r];
                    if (
                        (void 0 === t ? 'undefined' : d(t)) === n.type ||
                        ('string' != typeof n.type && t instanceof n.type)
                    )
                        return n.handler;
                }
            }
            function h() {
                var c =
                        arguments.length > 0 && void 0 !== arguments[0]
                            ? arguments[0]
                            : null,
                    h = {
                        isSquelBuilder: function(t) {
                            return t && !!t._toParamString;
                        }
                    },
                    v = function(t) {
                        return !h.isSquelBuilder(t) || !t.options.rawNesting;
                    };
                (h.DefaultQueryBuilderOptions = {
                    autoQuoteTableNames: !1,
                    autoQuoteFieldNames: !1,
                    autoQuoteAliasNames: !0,
                    useAsForTableAliasNames: !1,
                    nameQuoteCharacter: '`',
                    tableAliasQuoteCharacter: '`',
                    fieldAliasQuoteCharacter: '"',
                    valueHandlers: [],
                    parameterCharacter: '?',
                    numberedParameters: !1,
                    numberedParametersPrefix: '$',
                    numberedParametersStartAt: 1,
                    replaceSingleQuotes: !1,
                    singleQuoteReplacement: "''",
                    separator: ' ',
                    stringFormatter: null,
                    rawNesting: !1
                }),
                    (h.globalValueHandlers = []),
                    (h.registerValueHandler = function(t, e) {
                        l(h.globalValueHandlers, t, e);
                    }),
                    (h.Cloneable = (function() {
                        function t() {
                            r(this, t);
                        }
                        return (
                            p(t, [
                                {
                                    key: 'clone',
                                    value: function() {
                                        return i(
                                            new this.constructor(),
                                            s(i({}, this))
                                        );
                                    }
                                }
                            ]),
                            t
                        );
                    })()),
                    (h.BaseBuilder = (function(n) {
                        function o(e) {
                            r(this, o);
                            var n = t(
                                    this,
                                    (o.__proto__ || Object.getPrototypeOf(o)
                                    ).call(this)
                                ),
                                a = JSON.parse(
                                    JSON.stringify(h.DefaultQueryBuilderOptions)
                                );
                            return (
                                ['stringFormatter'].forEach(function(t) {
                                    a[t] = h.DefaultQueryBuilderOptions[t];
                                }),
                                (n.options = i({}, a, e)),
                                n
                            );
                        }
                        return (
                            e(o, h.Cloneable),
                            p(o, [
                                {
                                    key: 'registerValueHandler',
                                    value: function(t, e) {
                                        return (
                                            l(this.options.valueHandlers, t, e),
                                            this
                                        );
                                    }
                                },
                                {
                                    key: '_sanitizeExpression',
                                    value: function(t) {
                                        if (
                                            !h.isSquelBuilder(t) &&
                                            'string' != typeof t
                                        )
                                            throw new Error(
                                                'expression must be a string or builder instance'
                                            );
                                        return t;
                                    }
                                },
                                {
                                    key: '_sanitizeName',
                                    value: function(t, e) {
                                        if ('string' != typeof t)
                                            throw new Error(
                                                e + ' must be a string'
                                            );
                                        return t;
                                    }
                                },
                                {
                                    key: '_sanitizeField',
                                    value: function(t) {
                                        return (
                                            h.isSquelBuilder(t) ||
                                                (t = this._sanitizeName(
                                                    t,
                                                    'field name'
                                                )),
                                            t
                                        );
                                    }
                                },
                                {
                                    key: '_sanitizeBaseBuilder',
                                    value: function(t) {
                                        if (h.isSquelBuilder(t)) return t;
                                        throw new Error(
                                            'must be a builder instance'
                                        );
                                    }
                                },
                                {
                                    key: '_sanitizeTable',
                                    value: function(t) {
                                        if ('string' != typeof t)
                                            try {
                                                t = this._sanitizeBaseBuilder(
                                                    t
                                                );
                                            } catch (t) {
                                                throw new Error(
                                                    'table name must be a string or a builder'
                                                );
                                            }
                                        else t = this._sanitizeName(t, 'table');
                                        return t;
                                    }
                                },
                                {
                                    key: '_sanitizeTableAlias',
                                    value: function(t) {
                                        return this._sanitizeName(
                                            t,
                                            'table alias'
                                        );
                                    }
                                },
                                {
                                    key: '_sanitizeFieldAlias',
                                    value: function(t) {
                                        return this._sanitizeName(
                                            t,
                                            'field alias'
                                        );
                                    }
                                },
                                {
                                    key: '_sanitizeLimitOffset',
                                    value: function(t) {
                                        if (0 > (t = parseInt(t)) || isNaN(t))
                                            throw new Error(
                                                'limit/offset must be >= 0'
                                            );
                                        return t;
                                    }
                                },
                                {
                                    key: '_sanitizeValue',
                                    value: function(t) {
                                        var e =
                                            void 0 === t ? 'undefined' : d(t);
                                        if (null === t);
                                        else if (
                                            'string' === e ||
                                            'number' === e ||
                                            'boolean' === e
                                        );
                                        else if (h.isSquelBuilder(t));
                                        else if (
                                            !!!u(
                                                t,
                                                this.options.valueHandlers,
                                                h.globalValueHandlers
                                            )
                                        )
                                            throw new Error(
                                                'field value must be a string, number, boolean, null or one of the registered custom value types'
                                            );
                                        return t;
                                    }
                                },
                                {
                                    key: '_escapeValue',
                                    value: function(t) {
                                        return this.options.replaceSingleQuotes
                                            ? t.replace(
                                                  /\'/g,
                                                  this.options
                                                      .singleQuoteReplacement
                                              )
                                            : t;
                                    }
                                },
                                {
                                    key: '_formatTableName',
                                    value: function(t) {
                                        if (this.options.autoQuoteTableNames) {
                                            var e = this.options
                                                .nameQuoteCharacter;
                                            t = '' + e + t + e;
                                        }
                                        return t;
                                    }
                                },
                                {
                                    key: '_formatFieldAlias',
                                    value: function(t) {
                                        if (this.options.autoQuoteAliasNames) {
                                            var e = this.options
                                                .fieldAliasQuoteCharacter;
                                            t = '' + e + t + e;
                                        }
                                        return t;
                                    }
                                },
                                {
                                    key: '_formatTableAlias',
                                    value: function(t) {
                                        if (this.options.autoQuoteAliasNames) {
                                            var e = this.options
                                                .tableAliasQuoteCharacter;
                                            t = '' + e + t + e;
                                        }
                                        return this.options
                                            .useAsForTableAliasNames
                                            ? 'AS ' + t
                                            : t;
                                    }
                                },
                                {
                                    key: '_formatFieldName',
                                    value: function(t) {
                                        var e =
                                            arguments.length > 1 &&
                                            void 0 !== arguments[1]
                                                ? arguments[1]
                                                : {};
                                        if (this.options.autoQuoteFieldNames) {
                                            var r = this.options
                                                .nameQuoteCharacter;
                                            t = e.ignorePeriodsForFieldNameQuotes
                                                ? '' + r + t + r
                                                : t
                                                      .split('.')
                                                      .map(function(t) {
                                                          return '*' === t
                                                              ? t
                                                              : '' + r + t + r;
                                                      })
                                                      .join('.');
                                        }
                                        return t;
                                    }
                                },
                                {
                                    key: '_formatCustomValue',
                                    value: function(t, e, r) {
                                        var n = u(
                                            t,
                                            this.options.valueHandlers,
                                            h.globalValueHandlers
                                        );
                                        return n &&
                                            (t = n(t, e, r)) &&
                                            t.rawNesting
                                            ? {
                                                  formatted: !0,
                                                  rawNesting: !0,
                                                  value: t.value
                                              }
                                            : { formatted: !!n, value: t };
                                    }
                                },
                                {
                                    key: '_formatValueForParamArray',
                                    value: function(t) {
                                        var e = this,
                                            r =
                                                arguments.length > 1 &&
                                                void 0 !== arguments[1]
                                                    ? arguments[1]
                                                    : {};
                                        return a(t)
                                            ? t.map(function(t) {
                                                  return e._formatValueForParamArray(
                                                      t,
                                                      r
                                                  );
                                              })
                                            : this._formatCustomValue(t, !0, r)
                                                  .value;
                                    }
                                },
                                {
                                    key: '_formatValueForQueryString',
                                    value: function(t) {
                                        var e = this,
                                            r =
                                                arguments.length > 1 &&
                                                void 0 !== arguments[1]
                                                    ? arguments[1]
                                                    : {},
                                            n = this._formatCustomValue(
                                                t,
                                                !1,
                                                r
                                            ),
                                            i = n.rawNesting,
                                            o = n.formatted,
                                            s = n.value;
                                        if (o)
                                            return i
                                                ? s
                                                : this._applyNestingFormatting(
                                                      s,
                                                      v(t)
                                                  );
                                        if (a(s))
                                            (s = s.map(function(t) {
                                                return e._formatValueForQueryString(
                                                    t
                                                );
                                            })),
                                                (s = this._applyNestingFormatting(
                                                    s.join(', '),
                                                    v(s)
                                                ));
                                        else {
                                            var l =
                                                void 0 === s
                                                    ? 'undefined'
                                                    : d(s);
                                            if (null === s) s = 'NULL';
                                            else if ('boolean' === l)
                                                s = s ? 'TRUE' : 'FALSE';
                                            else if (h.isSquelBuilder(s))
                                                s = this._applyNestingFormatting(
                                                    s.toString(),
                                                    v(s)
                                                );
                                            else if ('number' !== l) {
                                                if (
                                                    'string' === l &&
                                                    this.options.stringFormatter
                                                )
                                                    return this.options.stringFormatter(
                                                        s
                                                    );
                                                s = r.dontQuote
                                                    ? '' + s
                                                    : "'" +
                                                      this._escapeValue(s) +
                                                      "'";
                                            }
                                        }
                                        return s;
                                    }
                                },
                                {
                                    key: '_applyNestingFormatting',
                                    value: function(t) {
                                        var e =
                                            !(
                                                arguments.length > 1 &&
                                                void 0 !== arguments[1]
                                            ) || arguments[1];
                                        if (
                                            t &&
                                            'string' == typeof t &&
                                            e &&
                                            !this.options.rawNesting
                                        ) {
                                            var r =
                                                '(' === t.charAt(0) &&
                                                ')' === t.charAt(t.length - 1);
                                            if (r)
                                                for (
                                                    var n = 0, i = 1;
                                                    t.length - 1 > ++n;

                                                ) {
                                                    var o = t.charAt(n);
                                                    if ('(' === o) i++;
                                                    else if (
                                                        ')' === o &&
                                                        1 > --i
                                                    ) {
                                                        r = !1;
                                                        break;
                                                    }
                                                }
                                            r || (t = '(' + t + ')');
                                        }
                                        return t;
                                    }
                                },
                                {
                                    key: '_buildString',
                                    value: function(t, e) {
                                        var r =
                                                arguments.length > 2 &&
                                                void 0 !== arguments[2]
                                                    ? arguments[2]
                                                    : {},
                                            n = r.nested,
                                            i = r.buildParameterized,
                                            o = r.formattingOptions;
                                        (e = e || []), (t = t || '');
                                        for (
                                            var s = '',
                                                l = -1,
                                                u = [],
                                                c = this.options
                                                    .parameterCharacter,
                                                f = 0;
                                            t.length > f;

                                        )
                                            if (t.substr(f, c.length) === c) {
                                                var p = e[++l];
                                                if (i)
                                                    if (h.isSquelBuilder(p)) {
                                                        var d = p._toParamString(
                                                            {
                                                                buildParameterized: i,
                                                                nested: !0
                                                            }
                                                        );
                                                        (s += d.text),
                                                            d.values.forEach(
                                                                function(t) {
                                                                    return u.push(
                                                                        t
                                                                    );
                                                                }
                                                            );
                                                    } else
                                                        a(
                                                            (p = this._formatValueForParamArray(
                                                                p,
                                                                o
                                                            ))
                                                        )
                                                            ? ((s +=
                                                                  '(' +
                                                                  p
                                                                      .map(
                                                                          function() {
                                                                              return c;
                                                                          }
                                                                      )
                                                                      .join(
                                                                          ', '
                                                                      ) +
                                                                  ')'),
                                                              p.forEach(
                                                                  function(t) {
                                                                      return u.push(
                                                                          t
                                                                      );
                                                                  }
                                                              ))
                                                            : ((s += c),
                                                              u.push(p));
                                                else
                                                    s += this._formatValueForQueryString(
                                                        p,
                                                        o
                                                    );
                                                f += c.length;
                                            } else (s += t.charAt(f)), f++;
                                        return {
                                            text: this._applyNestingFormatting(
                                                s,
                                                !!n
                                            ),
                                            values: u
                                        };
                                    }
                                },
                                {
                                    key: '_buildManyStrings',
                                    value: function(t, e) {
                                        for (
                                            var r =
                                                    arguments.length > 2 &&
                                                    void 0 !== arguments[2]
                                                        ? arguments[2]
                                                        : {},
                                                n = [],
                                                i = [],
                                                o = 0;
                                            t.length > o;
                                            ++o
                                        ) {
                                            var a = t[o],
                                                s = e[o],
                                                l = this._buildString(a, s, {
                                                    buildParameterized:
                                                        r.buildParameterized,
                                                    nested: !1
                                                }),
                                                u = l.text,
                                                c = l.values;
                                            n.push(u),
                                                c.forEach(function(t) {
                                                    return i.push(t);
                                                });
                                        }
                                        return (
                                            (n = n.join(
                                                this.options.separator
                                            )),
                                            {
                                                text: n.length
                                                    ? this._applyNestingFormatting(
                                                          n,
                                                          !!r.nested
                                                      )
                                                    : '',
                                                values: i
                                            }
                                        );
                                    }
                                },
                                {
                                    key: '_toParamString',
                                    value: function(t) {
                                        throw new Error('Not yet implemented');
                                    }
                                },
                                {
                                    key: 'toString',
                                    value: function() {
                                        var t =
                                            arguments.length > 0 &&
                                            void 0 !== arguments[0]
                                                ? arguments[0]
                                                : {};
                                        return this._toParamString(t).text;
                                    }
                                },
                                {
                                    key: 'toParam',
                                    value: function() {
                                        var t =
                                            arguments.length > 0 &&
                                            void 0 !== arguments[0]
                                                ? arguments[0]
                                                : {};
                                        return this._toParamString(
                                            i({}, t, { buildParameterized: !0 })
                                        );
                                    }
                                }
                            ]),
                            o
                        );
                    })()),
                    (h.Expression = (function(n) {
                        function i(e) {
                            r(this, i);
                            var n = t(
                                this,
                                (i.__proto__ || Object.getPrototypeOf(i)).call(
                                    this,
                                    e
                                )
                            );
                            return (n._nodes = []), n;
                        }
                        return (
                            e(i, h.BaseBuilder),
                            p(i, [
                                {
                                    key: 'and',
                                    value: function(t) {
                                        for (
                                            var e = arguments.length,
                                                r = Array(e > 1 ? e - 1 : 0),
                                                n = 1;
                                            n < e;
                                            n++
                                        )
                                            r[n - 1] = arguments[n];
                                        return (
                                            (t = this._sanitizeExpression(t)),
                                            this._nodes.push({
                                                type: 'AND',
                                                expr: t,
                                                para: r
                                            }),
                                            this
                                        );
                                    }
                                },
                                {
                                    key: 'or',
                                    value: function(t) {
                                        for (
                                            var e = arguments.length,
                                                r = Array(e > 1 ? e - 1 : 0),
                                                n = 1;
                                            n < e;
                                            n++
                                        )
                                            r[n - 1] = arguments[n];
                                        return (
                                            (t = this._sanitizeExpression(t)),
                                            this._nodes.push({
                                                type: 'OR',
                                                expr: t,
                                                para: r
                                            }),
                                            this
                                        );
                                    }
                                },
                                {
                                    key: '_toParamString',
                                    value: function() {
                                        var t =
                                                arguments.length > 0 &&
                                                void 0 !== arguments[0]
                                                    ? arguments[0]
                                                    : {},
                                            e = [],
                                            r = [],
                                            n = !0,
                                            i = !1,
                                            o = void 0;
                                        try {
                                            for (
                                                var a,
                                                    s = this._nodes[
                                                        Symbol.iterator
                                                    ]();
                                                !(n = (a = s.next()).done);
                                                n = !0
                                            ) {
                                                var l = a.value,
                                                    u = l.type,
                                                    c = l.expr,
                                                    f = l.para,
                                                    p = h.isSquelBuilder(c)
                                                        ? c._toParamString({
                                                              buildParameterized:
                                                                  t.buildParameterized,
                                                              nested: !0
                                                          })
                                                        : this._buildString(
                                                              c,
                                                              f,
                                                              {
                                                                  buildParameterized:
                                                                      t.buildParameterized
                                                              }
                                                          ),
                                                    d = p.text,
                                                    v = p.values;
                                                e.length && e.push(u),
                                                    e.push(d),
                                                    v.forEach(function(t) {
                                                        return r.push(t);
                                                    });
                                            }
                                        } catch (t) {
                                            (i = !0), (o = t);
                                        } finally {
                                            try {
                                                !n && s.return && s.return();
                                            } finally {
                                                if (i) throw o;
                                            }
                                        }
                                        return (
                                            (e = e.join(' ')),
                                            {
                                                text: this._applyNestingFormatting(
                                                    e,
                                                    !!t.nested
                                                ),
                                                values: r
                                            }
                                        );
                                    }
                                }
                            ]),
                            i
                        );
                    })()),
                    (h.Case = (function(a) {
                        function s(e) {
                            var n =
                                arguments.length > 1 && void 0 !== arguments[1]
                                    ? arguments[1]
                                    : {};
                            r(this, s);
                            var a = t(
                                this,
                                (s.__proto__ || Object.getPrototypeOf(s)).call(
                                    this,
                                    n
                                )
                            );
                            return (
                                o(e) && ((n = e), (e = null)),
                                e && (a._fieldName = a._sanitizeField(e)),
                                (a.options = i(
                                    {},
                                    h.DefaultQueryBuilderOptions,
                                    n
                                )),
                                (a._cases = []),
                                (a._elseValue = null),
                                a
                            );
                        }
                        return (
                            e(s, h.BaseBuilder),
                            p(s, [
                                {
                                    key: 'when',
                                    value: function(t) {
                                        for (
                                            var e = arguments.length,
                                                r = Array(e > 1 ? e - 1 : 0),
                                                n = 1;
                                            n < e;
                                            n++
                                        )
                                            r[n - 1] = arguments[n];
                                        return (
                                            this._cases.unshift({
                                                expression: t,
                                                values: r || []
                                            }),
                                            this
                                        );
                                    }
                                },
                                {
                                    key: 'then',
                                    value: function(t) {
                                        if (0 == this._cases.length)
                                            throw new Error(
                                                'when() needs to be called first'
                                            );
                                        return (
                                            (this._cases[0].result = t), this
                                        );
                                    }
                                },
                                {
                                    key: 'else',
                                    value: function(t) {
                                        return (this._elseValue = t), this;
                                    }
                                },
                                {
                                    key: '_toParamString',
                                    value: function() {
                                        var t =
                                                arguments.length > 0 &&
                                                void 0 !== arguments[0]
                                                    ? arguments[0]
                                                    : {},
                                            e = '',
                                            r = [],
                                            i = !0,
                                            o = !1,
                                            a = void 0;
                                        try {
                                            for (
                                                var s,
                                                    l = this._cases[
                                                        Symbol.iterator
                                                    ]();
                                                !(i = (s = l.next()).done);
                                                i = !0
                                            ) {
                                                var u = s.value,
                                                    c = u.expression,
                                                    h = u.values,
                                                    f = u.result;
                                                e = n(e, ' ');
                                                var p = this._buildString(
                                                    c,
                                                    h,
                                                    {
                                                        buildParameterized:
                                                            t.buildParameterized,
                                                        nested: !0
                                                    }
                                                );
                                                (e +=
                                                    'WHEN ' +
                                                    p.text +
                                                    ' THEN ' +
                                                    this._formatValueForQueryString(
                                                        f
                                                    )),
                                                    p.values.forEach(function(
                                                        t
                                                    ) {
                                                        return r.push(t);
                                                    });
                                            }
                                        } catch (t) {
                                            (o = !0), (a = t);
                                        } finally {
                                            try {
                                                !i && l.return && l.return();
                                            } finally {
                                                if (o) throw a;
                                            }
                                        }
                                        return (
                                            e.length
                                                ? ((e +=
                                                      ' ELSE ' +
                                                      this._formatValueForQueryString(
                                                          this._elseValue
                                                      ) +
                                                      ' END'),
                                                  this._fieldName &&
                                                      (e =
                                                          this._fieldName +
                                                          ' ' +
                                                          e),
                                                  (e = 'CASE ' + e))
                                                : (e = this._formatValueForQueryString(
                                                      this._elseValue
                                                  )),
                                            { text: e, values: r }
                                        );
                                    }
                                }
                            ]),
                            s
                        );
                    })()),
                    (h.Block = (function(n) {
                        function i(e) {
                            return (
                                r(this, i),
                                t(
                                    this,
                                    (i.__proto__ || Object.getPrototypeOf(i)
                                    ).call(this, e)
                                )
                            );
                        }
                        return (
                            e(i, h.BaseBuilder),
                            p(i, [
                                {
                                    key: 'exposedMethods',
                                    value: function() {
                                        for (var t = {}, e = this; e; )
                                            Object.getOwnPropertyNames(
                                                e
                                            ).forEach(function(r) {
                                                'constructor' === r ||
                                                    'function' != typeof e[r] ||
                                                    '_' === r.charAt(0) ||
                                                    h.Block.prototype[r] ||
                                                    (t[r] = e[r]);
                                            }),
                                                (e = Object.getPrototypeOf(e));
                                        return t;
                                    }
                                }
                            ]),
                            i
                        );
                    })()),
                    (h.StringBlock = (function(n) {
                        function i(e, n) {
                            r(this, i);
                            var o = t(
                                this,
                                (i.__proto__ || Object.getPrototypeOf(i)).call(
                                    this,
                                    e
                                )
                            );
                            return (o._str = n), o;
                        }
                        return (
                            e(i, h.Block),
                            p(i, [
                                {
                                    key: '_toParamString',
                                    value: function() {
                                        return { text: this._str, values: [] };
                                    }
                                }
                            ]),
                            i
                        );
                    })()),
                    (h.FunctionBlock = (function(n) {
                        function i(e) {
                            r(this, i);
                            var n = t(
                                this,
                                (i.__proto__ || Object.getPrototypeOf(i)).call(
                                    this,
                                    e
                                )
                            );
                            return (n._strings = []), (n._values = []), n;
                        }
                        return (
                            e(i, h.Block),
                            p(i, [
                                {
                                    key: 'function',
                                    value: function(t) {
                                        this._strings.push(t);
                                        for (
                                            var e = arguments.length,
                                                r = Array(e > 1 ? e - 1 : 0),
                                                n = 1;
                                            n < e;
                                            n++
                                        )
                                            r[n - 1] = arguments[n];
                                        this._values.push(r);
                                    }
                                },
                                {
                                    key: '_toParamString',
                                    value: function() {
                                        var t =
                                            arguments.length > 0 &&
                                            void 0 !== arguments[0]
                                                ? arguments[0]
                                                : {};
                                        return this._buildManyStrings(
                                            this._strings,
                                            this._values,
                                            t
                                        );
                                    }
                                }
                            ]),
                            i
                        );
                    })()),
                    h.registerValueHandler(h.FunctionBlock, function(t) {
                        return arguments.length > 1 &&
                            void 0 !== arguments[1] &&
                            arguments[1]
                            ? t.toParam()
                            : t.toString();
                    }),
                    (h.AbstractTableBlock = (function(i) {
                        function o(e, n) {
                            r(this, o);
                            var i = t(
                                this,
                                (o.__proto__ || Object.getPrototypeOf(o)).call(
                                    this,
                                    e
                                )
                            );
                            return (i._tables = []), i;
                        }
                        return (
                            e(o, h.Block),
                            p(o, [
                                {
                                    key: '_table',
                                    value: function(t) {
                                        var e =
                                            arguments.length > 1 &&
                                            void 0 !== arguments[1]
                                                ? arguments[1]
                                                : null;
                                        (e = e
                                            ? this._sanitizeTableAlias(e)
                                            : e),
                                            (t = this._sanitizeTable(t)),
                                            this.options.singleTable &&
                                                (this._tables = []),
                                            this._tables.push({
                                                table: t,
                                                alias: e
                                            });
                                    }
                                },
                                {
                                    key: '_hasTable',
                                    value: function() {
                                        return 0 < this._tables.length;
                                    }
                                },
                                {
                                    key: '_toParamString',
                                    value: function() {
                                        var t =
                                                arguments.length > 0 &&
                                                void 0 !== arguments[0]
                                                    ? arguments[0]
                                                    : {},
                                            e = '',
                                            r = [];
                                        if (this._hasTable()) {
                                            var i = !0,
                                                o = !1,
                                                a = void 0;
                                            try {
                                                for (
                                                    var s,
                                                        l = this._tables[
                                                            Symbol.iterator
                                                        ]();
                                                    !(i = (s = l.next()).done);
                                                    i = !0
                                                ) {
                                                    var u = s.value,
                                                        c = u.table,
                                                        f = u.alias;
                                                    e = n(e, ', ');
                                                    var p = void 0;
                                                    if (h.isSquelBuilder(c)) {
                                                        var d = c._toParamString(
                                                            {
                                                                buildParameterized:
                                                                    t.buildParameterized,
                                                                nested: !0
                                                            }
                                                        );
                                                        (p = d.text),
                                                            d.values.forEach(
                                                                function(t) {
                                                                    return r.push(
                                                                        t
                                                                    );
                                                                }
                                                            );
                                                    } else
                                                        p = this._formatTableName(
                                                            c
                                                        );
                                                    f &&
                                                        (p +=
                                                            ' ' +
                                                            this._formatTableAlias(
                                                                f
                                                            )),
                                                        (e += p);
                                                }
                                            } catch (t) {
                                                (o = !0), (a = t);
                                            } finally {
                                                try {
                                                    !i &&
                                                        l.return &&
                                                        l.return();
                                                } finally {
                                                    if (o) throw a;
                                                }
                                            }
                                            this.options.prefix &&
                                                (e =
                                                    this.options.prefix +
                                                    ' ' +
                                                    e);
                                        }
                                        return { text: e, values: r };
                                    }
                                }
                            ]),
                            o
                        );
                    })()),
                    (h.TargetTableBlock = (function(n) {
                        function i() {
                            return (
                                r(this, i),
                                t(
                                    this,
                                    (i.__proto__ || Object.getPrototypeOf(i)
                                    ).apply(this, arguments)
                                )
                            );
                        }
                        return (
                            e(i, h.AbstractTableBlock),
                            p(i, [
                                {
                                    key: 'target',
                                    value: function(t) {
                                        this._table(t);
                                    }
                                }
                            ]),
                            i
                        );
                    })()),
                    (h.UpdateTableBlock = (function(n) {
                        function i() {
                            return (
                                r(this, i),
                                t(
                                    this,
                                    (i.__proto__ || Object.getPrototypeOf(i)
                                    ).apply(this, arguments)
                                )
                            );
                        }
                        return (
                            e(i, h.AbstractTableBlock),
                            p(i, [
                                {
                                    key: 'table',
                                    value: function(t) {
                                        var e =
                                            arguments.length > 1 &&
                                            void 0 !== arguments[1]
                                                ? arguments[1]
                                                : null;
                                        this._table(t, e);
                                    }
                                },
                                {
                                    key: '_toParamString',
                                    value: function() {
                                        var t =
                                            arguments.length > 0 &&
                                            void 0 !== arguments[0]
                                                ? arguments[0]
                                                : {};
                                        if (!this._hasTable())
                                            throw new Error(
                                                'table() needs to be called'
                                            );
                                        return f(
                                            i.prototype.__proto__ ||
                                                Object.getPrototypeOf(
                                                    i.prototype
                                                ),
                                            '_toParamString',
                                            this
                                        ).call(this, t);
                                    }
                                }
                            ]),
                            i
                        );
                    })()),
                    (h.FromTableBlock = (function(n) {
                        function o(e) {
                            return (
                                r(this, o),
                                t(
                                    this,
                                    (o.__proto__ || Object.getPrototypeOf(o)
                                    ).call(this, i({}, e, { prefix: 'FROM' }))
                                )
                            );
                        }
                        return (
                            e(o, h.AbstractTableBlock),
                            p(o, [
                                {
                                    key: 'from',
                                    value: function(t) {
                                        var e =
                                            arguments.length > 1 &&
                                            void 0 !== arguments[1]
                                                ? arguments[1]
                                                : null;
                                        this._table(t, e);
                                    }
                                }
                            ]),
                            o
                        );
                    })()),
                    (h.IntoTableBlock = (function(n) {
                        function o(e) {
                            return (
                                r(this, o),
                                t(
                                    this,
                                    (o.__proto__ || Object.getPrototypeOf(o)
                                    ).call(
                                        this,
                                        i({}, e, {
                                            prefix: 'INTO',
                                            singleTable: !0
                                        })
                                    )
                                )
                            );
                        }
                        return (
                            e(o, h.AbstractTableBlock),
                            p(o, [
                                {
                                    key: 'into',
                                    value: function(t) {
                                        this._table(t);
                                    }
                                },
                                {
                                    key: '_toParamString',
                                    value: function() {
                                        var t =
                                            arguments.length > 0 &&
                                            void 0 !== arguments[0]
                                                ? arguments[0]
                                                : {};
                                        if (!this._hasTable())
                                            throw new Error(
                                                'into() needs to be called'
                                            );
                                        return f(
                                            o.prototype.__proto__ ||
                                                Object.getPrototypeOf(
                                                    o.prototype
                                                ),
                                            '_toParamString',
                                            this
                                        ).call(this, t);
                                    }
                                }
                            ]),
                            o
                        );
                    })()),
                    (h.GetFieldBlock = (function(i) {
                        function o(e) {
                            r(this, o);
                            var n = t(
                                this,
                                (o.__proto__ || Object.getPrototypeOf(o)).call(
                                    this,
                                    e
                                )
                            );
                            return (n._fields = []), n;
                        }
                        return (
                            e(o, h.Block),
                            p(o, [
                                {
                                    key: 'fields',
                                    value: function(t) {
                                        var e =
                                            arguments.length > 1 &&
                                            void 0 !== arguments[1]
                                                ? arguments[1]
                                                : {};
                                        if (a(t)) {
                                            var r = !0,
                                                n = !1,
                                                i = void 0;
                                            try {
                                                for (
                                                    var o,
                                                        s = t[
                                                            Symbol.iterator
                                                        ]();
                                                    !(r = (o = s.next()).done);
                                                    r = !0
                                                ) {
                                                    var l = o.value;
                                                    this.field(l, null, e);
                                                }
                                            } catch (t) {
                                                (n = !0), (i = t);
                                            } finally {
                                                try {
                                                    !r &&
                                                        s.return &&
                                                        s.return();
                                                } finally {
                                                    if (n) throw i;
                                                }
                                            }
                                        } else
                                            for (var u in t) {
                                                var c = t[u];
                                                this.field(u, c, e);
                                            }
                                    }
                                },
                                {
                                    key: 'field',
                                    value: function(t) {
                                        var e =
                                                arguments.length > 1 &&
                                                void 0 !== arguments[1]
                                                    ? arguments[1]
                                                    : null,
                                            r =
                                                arguments.length > 2 &&
                                                void 0 !== arguments[2]
                                                    ? arguments[2]
                                                    : {};
                                        if (
                                            ((e = e
                                                ? this._sanitizeFieldAlias(e)
                                                : e),
                                            (t = this._sanitizeField(t)),
                                            this._fields.filter(function(r) {
                                                return (
                                                    r.name === t &&
                                                    r.alias === e
                                                );
                                            }).length)
                                        )
                                            return this;
                                        this._fields.push({
                                            name: t,
                                            alias: e,
                                            options: r
                                        });
                                    }
                                },
                                {
                                    key: '_toParamString',
                                    value: function() {
                                        var t =
                                                arguments.length > 0 &&
                                                void 0 !== arguments[0]
                                                    ? arguments[0]
                                                    : {},
                                            e = t.queryBuilder,
                                            r = t.buildParameterized,
                                            i = '',
                                            o = [],
                                            a = !0,
                                            s = !1,
                                            l = void 0;
                                        try {
                                            for (
                                                var u,
                                                    c = this._fields[
                                                        Symbol.iterator
                                                    ]();
                                                !(a = (u = c.next()).done);
                                                a = !0
                                            ) {
                                                var f = u.value;
                                                i = n(i, ', ');
                                                var p = f.name,
                                                    d = f.alias,
                                                    v = f.options;
                                                if ('string' == typeof p)
                                                    i += this._formatFieldName(
                                                        p,
                                                        v
                                                    );
                                                else {
                                                    var y = p._toParamString({
                                                        nested: !0,
                                                        buildParameterized: r
                                                    });
                                                    (i += y.text),
                                                        y.values.forEach(
                                                            function(t) {
                                                                return o.push(
                                                                    t
                                                                );
                                                            }
                                                        );
                                                }
                                                d &&
                                                    (i +=
                                                        ' AS ' +
                                                        this._formatFieldAlias(
                                                            d
                                                        ));
                                            }
                                        } catch (t) {
                                            (s = !0), (l = t);
                                        } finally {
                                            try {
                                                !a && c.return && c.return();
                                            } finally {
                                                if (s) throw l;
                                            }
                                        }
                                        if (!i.length) {
                                            var _ =
                                                e &&
                                                e.getBlock(h.FromTableBlock);
                                            _ && _._hasTable() && (i = '*');
                                        }
                                        return { text: i, values: o };
                                    }
                                }
                            ]),
                            o
                        );
                    })()),
                    (h.AbstractSetFieldBlock = (function(n) {
                        function i(e) {
                            r(this, i);
                            var n = t(
                                this,
                                (i.__proto__ || Object.getPrototypeOf(i)).call(
                                    this,
                                    e
                                )
                            );
                            return n._reset(), n;
                        }
                        return (
                            e(i, h.Block),
                            p(i, [
                                {
                                    key: '_reset',
                                    value: function() {
                                        (this._fields = []),
                                            (this._values = [[]]),
                                            (this._valueOptions = [[]]);
                                    }
                                },
                                {
                                    key: '_set',
                                    value: function(t, e) {
                                        var r =
                                            arguments.length > 2 &&
                                            void 0 !== arguments[2]
                                                ? arguments[2]
                                                : {};
                                        if (this._values.length > 1)
                                            throw new Error(
                                                'Cannot set multiple rows of fields this way.'
                                            );
                                        void 0 !== e &&
                                            (e = this._sanitizeValue(e)),
                                            (t = this._sanitizeField(t));
                                        var n = this._fields.indexOf(t);
                                        -1 === n &&
                                            (this._fields.push(t),
                                            (n = this._fields.length - 1)),
                                            (this._values[0][n] = e),
                                            (this._valueOptions[0][n] = r);
                                    }
                                },
                                {
                                    key: '_setFields',
                                    value: function(t) {
                                        var e =
                                            arguments.length > 1 &&
                                            void 0 !== arguments[1]
                                                ? arguments[1]
                                                : {};
                                        if (
                                            'object' !==
                                            (void 0 === t ? 'undefined' : d(t))
                                        )
                                            throw new Error(
                                                'Expected an object but got ' +
                                                    (void 0 === t
                                                        ? 'undefined'
                                                        : d(t))
                                            );
                                        for (var r in t) this._set(r, t[r], e);
                                    }
                                },
                                {
                                    key: '_setFieldsRows',
                                    value: function(t) {
                                        var e =
                                            arguments.length > 1 &&
                                            void 0 !== arguments[1]
                                                ? arguments[1]
                                                : {};
                                        if (!a(t))
                                            throw new Error(
                                                'Expected an array of objects but got ' +
                                                    (void 0 === t
                                                        ? 'undefined'
                                                        : d(t))
                                            );
                                        this._reset();
                                        for (var r = 0; t.length > r; ++r) {
                                            var n = t[r];
                                            for (var i in n) {
                                                var o = n[i];
                                                (i = this._sanitizeField(i)),
                                                    (o = this._sanitizeValue(
                                                        o
                                                    ));
                                                var s = this._fields.indexOf(i);
                                                if (0 < r && -1 === s)
                                                    throw new Error(
                                                        'All fields in subsequent rows must match the fields in the first row'
                                                    );
                                                -1 === s &&
                                                    (this._fields.push(i),
                                                    (s =
                                                        this._fields.length -
                                                        1)),
                                                    a(this._values[r]) ||
                                                        ((this._values[r] = []),
                                                        (this._valueOptions[
                                                            r
                                                        ] = [])),
                                                    (this._values[r][s] = o),
                                                    (this._valueOptions[r][
                                                        s
                                                    ] = e);
                                            }
                                        }
                                    }
                                }
                            ]),
                            i
                        );
                    })()),
                    (h.SetFieldBlock = (function(i) {
                        function o() {
                            return (
                                r(this, o),
                                t(
                                    this,
                                    (o.__proto__ || Object.getPrototypeOf(o)
                                    ).apply(this, arguments)
                                )
                            );
                        }
                        return (
                            e(o, h.AbstractSetFieldBlock),
                            p(o, [
                                {
                                    key: 'set',
                                    value: function(t, e, r) {
                                        this._set(t, e, r);
                                    }
                                },
                                {
                                    key: 'setFields',
                                    value: function(t, e) {
                                        this._setFields(t, e);
                                    }
                                },
                                {
                                    key: '_toParamString',
                                    value: function() {
                                        var t = (arguments.length > 0 &&
                                        void 0 !== arguments[0]
                                            ? arguments[0]
                                            : {}
                                        ).buildParameterized;
                                        if (0 >= this._fields.length)
                                            throw new Error(
                                                'set() needs to be called'
                                            );
                                        for (
                                            var e = '', r = [], i = 0;
                                            i < this._fields.length;
                                            ++i
                                        ) {
                                            e = n(e, ', ');
                                            var o = this._formatFieldName(
                                                    this._fields[i]
                                                ),
                                                a = this._values[0][i];
                                            0 > o.indexOf('=') &&
                                                (o =
                                                    o +
                                                    ' = ' +
                                                    this.options
                                                        .parameterCharacter);
                                            var s = this._buildString(o, [a], {
                                                buildParameterized: t,
                                                formattingOptions: this
                                                    ._valueOptions[0][i]
                                            });
                                            (e += s.text),
                                                s.values.forEach(function(t) {
                                                    return r.push(t);
                                                });
                                        }
                                        return { text: 'SET ' + e, values: r };
                                    }
                                }
                            ]),
                            o
                        );
                    })()),
                    (h.InsertFieldValueBlock = (function(i) {
                        function o() {
                            return (
                                r(this, o),
                                t(
                                    this,
                                    (o.__proto__ || Object.getPrototypeOf(o)
                                    ).apply(this, arguments)
                                )
                            );
                        }
                        return (
                            e(o, h.AbstractSetFieldBlock),
                            p(o, [
                                {
                                    key: 'set',
                                    value: function(t, e) {
                                        var r =
                                            arguments.length > 2 &&
                                            void 0 !== arguments[2]
                                                ? arguments[2]
                                                : {};
                                        this._set(t, e, r);
                                    }
                                },
                                {
                                    key: 'setFields',
                                    value: function(t, e) {
                                        this._setFields(t, e);
                                    }
                                },
                                {
                                    key: 'setFieldsRows',
                                    value: function(t, e) {
                                        this._setFieldsRows(t, e);
                                    }
                                },
                                {
                                    key: '_toParamString',
                                    value: function() {
                                        for (
                                            var t = this,
                                                e = (arguments.length > 0 &&
                                                void 0 !== arguments[0]
                                                    ? arguments[0]
                                                    : {}
                                                ).buildParameterized,
                                                r = this._fields
                                                    .map(function(e) {
                                                        return t._formatFieldName(
                                                            e
                                                        );
                                                    })
                                                    .join(', '),
                                                i = [],
                                                o = [],
                                                a = 0;
                                            a < this._values.length;
                                            ++a
                                        ) {
                                            i[a] = '';
                                            for (
                                                var s = 0;
                                                s < this._values[a].length;
                                                ++s
                                            ) {
                                                var l = this._buildString(
                                                    this.options
                                                        .parameterCharacter,
                                                    [this._values[a][s]],
                                                    {
                                                        buildParameterized: e,
                                                        formattingOptions: this
                                                            ._valueOptions[a][s]
                                                    }
                                                );
                                                l.values.forEach(function(t) {
                                                    return o.push(t);
                                                }),
                                                    (i[a] = n(i[a], ', ')),
                                                    (i[a] += l.text);
                                            }
                                        }
                                        return {
                                            text: r.length
                                                ? '(' +
                                                  r +
                                                  ') VALUES (' +
                                                  i.join('), (') +
                                                  ')'
                                                : '',
                                            values: o
                                        };
                                    }
                                }
                            ]),
                            o
                        );
                    })()),
                    (h.InsertFieldsFromQueryBlock = (function(n) {
                        function i(e) {
                            r(this, i);
                            var n = t(
                                this,
                                (i.__proto__ || Object.getPrototypeOf(i)).call(
                                    this,
                                    e
                                )
                            );
                            return (n._fields = []), (n._query = null), n;
                        }
                        return (
                            e(i, h.Block),
                            p(i, [
                                {
                                    key: 'fromQuery',
                                    value: function(t, e) {
                                        var r = this;
                                        (this._fields = t.map(function(t) {
                                            return r._sanitizeField(t);
                                        })),
                                            (this._query = this._sanitizeBaseBuilder(
                                                e
                                            ));
                                    }
                                },
                                {
                                    key: '_toParamString',
                                    value: function() {
                                        var t =
                                                arguments.length > 0 &&
                                                void 0 !== arguments[0]
                                                    ? arguments[0]
                                                    : {},
                                            e = '',
                                            r = [];
                                        if (
                                            this._fields.length &&
                                            this._query
                                        ) {
                                            var n = this._query._toParamString({
                                                    buildParameterized:
                                                        t.buildParameterized,
                                                    nested: !0
                                                }),
                                                i = n.text,
                                                o = n.values;
                                            (e =
                                                '(' +
                                                this._fields.join(', ') +
                                                ') ' +
                                                this._applyNestingFormatting(
                                                    i
                                                )),
                                                (r = o);
                                        }
                                        return { text: e, values: r };
                                    }
                                }
                            ]),
                            i
                        );
                    })()),
                    (h.DistinctBlock = (function(n) {
                        function i() {
                            return (
                                r(this, i),
                                t(
                                    this,
                                    (i.__proto__ || Object.getPrototypeOf(i)
                                    ).apply(this, arguments)
                                )
                            );
                        }
                        return (
                            e(i, h.Block),
                            p(i, [
                                {
                                    key: 'distinct',
                                    value: function() {
                                        this._useDistinct = !0;
                                    }
                                },
                                {
                                    key: '_toParamString',
                                    value: function() {
                                        return {
                                            text: this._useDistinct
                                                ? 'DISTINCT'
                                                : '',
                                            values: []
                                        };
                                    }
                                }
                            ]),
                            i
                        );
                    })()),
                    (h.GroupByBlock = (function(n) {
                        function i(e) {
                            r(this, i);
                            var n = t(
                                this,
                                (i.__proto__ || Object.getPrototypeOf(i)).call(
                                    this,
                                    e
                                )
                            );
                            return (n._groups = []), n;
                        }
                        return (
                            e(i, h.Block),
                            p(i, [
                                {
                                    key: 'group',
                                    value: function(t) {
                                        this._groups.push(
                                            this._sanitizeField(t)
                                        );
                                    }
                                },
                                {
                                    key: '_toParamString',
                                    value: function() {
                                        return {
                                            text: this._groups.length
                                                ? 'GROUP BY ' +
                                                  this._groups.join(', ')
                                                : '',
                                            values: []
                                        };
                                    }
                                }
                            ]),
                            i
                        );
                    })()),
                    (h.AbstractVerbSingleValueBlock = (function(n) {
                        function i(e) {
                            r(this, i);
                            var n = t(
                                this,
                                (i.__proto__ || Object.getPrototypeOf(i)).call(
                                    this,
                                    e
                                )
                            );
                            return (n._value = null), n;
                        }
                        return (
                            e(i, h.Block),
                            p(i, [
                                {
                                    key: '_setValue',
                                    value: function(t) {
                                        this._value =
                                            null !== t
                                                ? this._sanitizeLimitOffset(t)
                                                : t;
                                    }
                                },
                                {
                                    key: '_toParamString',
                                    value: function() {
                                        var t =
                                                arguments.length > 0 &&
                                                void 0 !== arguments[0]
                                                    ? arguments[0]
                                                    : {},
                                            e =
                                                null !== this._value
                                                    ? this.options.verb +
                                                      ' ' +
                                                      this.options
                                                          .parameterCharacter
                                                    : '',
                                            r =
                                                null !== this._value
                                                    ? [this._value]
                                                    : [];
                                        return this._buildString(e, r, t);
                                    }
                                }
                            ]),
                            i
                        );
                    })()),
                    (h.OffsetBlock = (function(n) {
                        function o(e) {
                            return (
                                r(this, o),
                                t(
                                    this,
                                    (o.__proto__ || Object.getPrototypeOf(o)
                                    ).call(this, i({}, e, { verb: 'OFFSET' }))
                                )
                            );
                        }
                        return (
                            e(o, h.AbstractVerbSingleValueBlock),
                            p(o, [
                                {
                                    key: 'offset',
                                    value: function(t) {
                                        this._setValue(t);
                                    }
                                }
                            ]),
                            o
                        );
                    })()),
                    (h.LimitBlock = (function(n) {
                        function o(e) {
                            return (
                                r(this, o),
                                t(
                                    this,
                                    (o.__proto__ || Object.getPrototypeOf(o)
                                    ).call(this, i({}, e, { verb: 'LIMIT' }))
                                )
                            );
                        }
                        return (
                            e(o, h.AbstractVerbSingleValueBlock),
                            p(o, [
                                {
                                    key: 'limit',
                                    value: function(t) {
                                        this._setValue(t);
                                    }
                                }
                            ]),
                            o
                        );
                    })()),
                    (h.AbstractConditionBlock = (function(n) {
                        function i(e) {
                            r(this, i);
                            var n = t(
                                this,
                                (i.__proto__ || Object.getPrototypeOf(i)).call(
                                    this,
                                    e
                                )
                            );
                            return (n._conditions = []), n;
                        }
                        return (
                            e(i, h.Block),
                            p(i, [
                                {
                                    key: '_condition',
                                    value: function(t) {
                                        t = this._sanitizeExpression(t);
                                        for (
                                            var e = arguments.length,
                                                r = Array(e > 1 ? e - 1 : 0),
                                                n = 1;
                                            n < e;
                                            n++
                                        )
                                            r[n - 1] = arguments[n];
                                        this._conditions.push({
                                            expr: t,
                                            values: r || []
                                        });
                                    }
                                },
                                {
                                    key: '_toParamString',
                                    value: function() {
                                        var t =
                                                arguments.length > 0 &&
                                                void 0 !== arguments[0]
                                                    ? arguments[0]
                                                    : {},
                                            e = [],
                                            r = [],
                                            n = !0,
                                            i = !1,
                                            o = void 0;
                                        try {
                                            for (
                                                var a,
                                                    s = this._conditions[
                                                        Symbol.iterator
                                                    ]();
                                                !(n = (a = s.next()).done);
                                                n = !0
                                            ) {
                                                var l = a.value,
                                                    u = l.expr,
                                                    c = l.values,
                                                    f = h.isSquelBuilder(u)
                                                        ? u._toParamString({
                                                              buildParameterized:
                                                                  t.buildParameterized
                                                          })
                                                        : this._buildString(
                                                              u,
                                                              c,
                                                              {
                                                                  buildParameterized:
                                                                      t.buildParameterized
                                                              }
                                                          );
                                                f.text.length && e.push(f.text),
                                                    f.values.forEach(function(
                                                        t
                                                    ) {
                                                        return r.push(t);
                                                    });
                                            }
                                        } catch (t) {
                                            (i = !0), (o = t);
                                        } finally {
                                            try {
                                                !n && s.return && s.return();
                                            } finally {
                                                if (i) throw o;
                                            }
                                        }
                                        return (
                                            e.length && (e = e.join(') AND (')),
                                            {
                                                text: e.length
                                                    ? this.options.verb +
                                                      ' (' +
                                                      e +
                                                      ')'
                                                    : '',
                                                values: r
                                            }
                                        );
                                    }
                                }
                            ]),
                            i
                        );
                    })()),
                    (h.WhereBlock = (function(n) {
                        function o(e) {
                            return (
                                r(this, o),
                                t(
                                    this,
                                    (o.__proto__ || Object.getPrototypeOf(o)
                                    ).call(this, i({}, e, { verb: 'WHERE' }))
                                )
                            );
                        }
                        return (
                            e(o, h.AbstractConditionBlock),
                            p(o, [
                                {
                                    key: 'where',
                                    value: function(t) {
                                        for (
                                            var e = arguments.length,
                                                r = Array(e > 1 ? e - 1 : 0),
                                                n = 1;
                                            n < e;
                                            n++
                                        )
                                            r[n - 1] = arguments[n];
                                        this._condition.apply(
                                            this,
                                            [t].concat(r)
                                        );
                                    }
                                }
                            ]),
                            o
                        );
                    })()),
                    (h.HavingBlock = (function(n) {
                        function o(e) {
                            return (
                                r(this, o),
                                t(
                                    this,
                                    (o.__proto__ || Object.getPrototypeOf(o)
                                    ).call(this, i({}, e, { verb: 'HAVING' }))
                                )
                            );
                        }
                        return (
                            e(o, h.AbstractConditionBlock),
                            p(o, [
                                {
                                    key: 'having',
                                    value: function(t) {
                                        for (
                                            var e = arguments.length,
                                                r = Array(e > 1 ? e - 1 : 0),
                                                n = 1;
                                            n < e;
                                            n++
                                        )
                                            r[n - 1] = arguments[n];
                                        this._condition.apply(
                                            this,
                                            [t].concat(r)
                                        );
                                    }
                                }
                            ]),
                            o
                        );
                    })()),
                    (h.OrderByBlock = (function(i) {
                        function o(e) {
                            r(this, o);
                            var n = t(
                                this,
                                (o.__proto__ || Object.getPrototypeOf(o)).call(
                                    this,
                                    e
                                )
                            );
                            return (n._orders = []), n;
                        }
                        return (
                            e(o, h.Block),
                            p(o, [
                                {
                                    key: 'order',
                                    value: function(t, e) {
                                        (t = this._sanitizeField(t)),
                                            'string' != typeof e &&
                                                (void 0 === e
                                                    ? (e = 'ASC')
                                                    : null !== e &&
                                                      (e = e ? 'ASC' : 'DESC'));
                                        for (
                                            var r = arguments.length,
                                                n = Array(r > 2 ? r - 2 : 0),
                                                i = 2;
                                            i < r;
                                            i++
                                        )
                                            n[i - 2] = arguments[i];
                                        this._orders.push({
                                            field: t,
                                            dir: e,
                                            values: n || []
                                        });
                                    }
                                },
                                {
                                    key: '_toParamString',
                                    value: function() {
                                        var t =
                                                arguments.length > 0 &&
                                                void 0 !== arguments[0]
                                                    ? arguments[0]
                                                    : {},
                                            e = '',
                                            r = [],
                                            i = !0,
                                            o = !1,
                                            s = void 0;
                                        try {
                                            for (
                                                var l,
                                                    u = this._orders[
                                                        Symbol.iterator
                                                    ]();
                                                !(i = (l = u.next()).done);
                                                i = !0
                                            ) {
                                                var c = l.value,
                                                    h = c.field,
                                                    f = c.dir,
                                                    p = c.values;
                                                e = n(e, ', ');
                                                var d = this._buildString(
                                                    h,
                                                    p,
                                                    {
                                                        buildParameterized:
                                                            t.buildParameterized
                                                    }
                                                );
                                                (e += d.text),
                                                    a(d.values) &&
                                                        d.values.forEach(
                                                            function(t) {
                                                                return r.push(
                                                                    t
                                                                );
                                                            }
                                                        ),
                                                    null !== f &&
                                                        (e += ' ' + f);
                                            }
                                        } catch (t) {
                                            (o = !0), (s = t);
                                        } finally {
                                            try {
                                                !i && u.return && u.return();
                                            } finally {
                                                if (o) throw s;
                                            }
                                        }
                                        return {
                                            text: e.length
                                                ? 'ORDER BY ' + e
                                                : '',
                                            values: r
                                        };
                                    }
                                }
                            ]),
                            o
                        );
                    })()),
                    (h.JoinBlock = (function(i) {
                        function o(e) {
                            r(this, o);
                            var n = t(
                                this,
                                (o.__proto__ || Object.getPrototypeOf(o)).call(
                                    this,
                                    e
                                )
                            );
                            return (n._joins = []), n;
                        }
                        return (
                            e(o, h.Block),
                            p(o, [
                                {
                                    key: 'join',
                                    value: function(t) {
                                        var e =
                                                arguments.length > 1 &&
                                                void 0 !== arguments[1]
                                                    ? arguments[1]
                                                    : null,
                                            r =
                                                arguments.length > 2 &&
                                                void 0 !== arguments[2]
                                                    ? arguments[2]
                                                    : null,
                                            n =
                                                arguments.length > 3 &&
                                                void 0 !== arguments[3]
                                                    ? arguments[3]
                                                    : 'INNER';
                                        (t = this._sanitizeTable(t, !0)),
                                            (e = e
                                                ? this._sanitizeTableAlias(e)
                                                : e),
                                            (r = r
                                                ? this._sanitizeExpression(r)
                                                : r),
                                            this._joins.push({
                                                type: n,
                                                table: t,
                                                alias: e,
                                                condition: r
                                            });
                                    }
                                },
                                {
                                    key: 'left_join',
                                    value: function(t) {
                                        var e =
                                                arguments.length > 1 &&
                                                void 0 !== arguments[1]
                                                    ? arguments[1]
                                                    : null,
                                            r =
                                                arguments.length > 2 &&
                                                void 0 !== arguments[2]
                                                    ? arguments[2]
                                                    : null;
                                        this.join(t, e, r, 'LEFT');
                                    }
                                },
                                {
                                    key: 'right_join',
                                    value: function(t) {
                                        var e =
                                                arguments.length > 1 &&
                                                void 0 !== arguments[1]
                                                    ? arguments[1]
                                                    : null,
                                            r =
                                                arguments.length > 2 &&
                                                void 0 !== arguments[2]
                                                    ? arguments[2]
                                                    : null;
                                        this.join(t, e, r, 'RIGHT');
                                    }
                                },
                                {
                                    key: 'outer_join',
                                    value: function(t) {
                                        var e =
                                                arguments.length > 1 &&
                                                void 0 !== arguments[1]
                                                    ? arguments[1]
                                                    : null,
                                            r =
                                                arguments.length > 2 &&
                                                void 0 !== arguments[2]
                                                    ? arguments[2]
                                                    : null;
                                        this.join(t, e, r, 'OUTER');
                                    }
                                },
                                {
                                    key: 'left_outer_join',
                                    value: function(t) {
                                        var e =
                                                arguments.length > 1 &&
                                                void 0 !== arguments[1]
                                                    ? arguments[1]
                                                    : null,
                                            r =
                                                arguments.length > 2 &&
                                                void 0 !== arguments[2]
                                                    ? arguments[2]
                                                    : null;
                                        this.join(t, e, r, 'LEFT OUTER');
                                    }
                                },
                                {
                                    key: 'full_join',
                                    value: function(t) {
                                        var e =
                                                arguments.length > 1 &&
                                                void 0 !== arguments[1]
                                                    ? arguments[1]
                                                    : null,
                                            r =
                                                arguments.length > 2 &&
                                                void 0 !== arguments[2]
                                                    ? arguments[2]
                                                    : null;
                                        this.join(t, e, r, 'FULL');
                                    }
                                },
                                {
                                    key: 'cross_join',
                                    value: function(t) {
                                        var e =
                                                arguments.length > 1 &&
                                                void 0 !== arguments[1]
                                                    ? arguments[1]
                                                    : null,
                                            r =
                                                arguments.length > 2 &&
                                                void 0 !== arguments[2]
                                                    ? arguments[2]
                                                    : null;
                                        this.join(t, e, r, 'CROSS');
                                    }
                                },
                                {
                                    key: '_toParamString',
                                    value: function() {
                                        var t =
                                                arguments.length > 0 &&
                                                void 0 !== arguments[0]
                                                    ? arguments[0]
                                                    : {},
                                            e = '',
                                            r = [],
                                            i = !0,
                                            o = !1,
                                            a = void 0;
                                        try {
                                            for (
                                                var s,
                                                    l = this._joins[
                                                        Symbol.iterator
                                                    ]();
                                                !(i = (s = l.next()).done);
                                                i = !0
                                            ) {
                                                var u = s.value,
                                                    c = u.type,
                                                    f = u.table,
                                                    p = u.alias,
                                                    d = u.condition;
                                                e = n(
                                                    e,
                                                    this.options.separator
                                                );
                                                var v = void 0;
                                                if (h.isSquelBuilder(f)) {
                                                    var y = f._toParamString({
                                                        buildParameterized:
                                                            t.buildParameterized,
                                                        nested: !0
                                                    });
                                                    y.values.forEach(function(
                                                        t
                                                    ) {
                                                        return r.push(t);
                                                    }),
                                                        (v = y.text);
                                                } else
                                                    v = this._formatTableName(
                                                        f
                                                    );
                                                if (
                                                    ((e += c + ' JOIN ' + v),
                                                    p &&
                                                        (e +=
                                                            ' ' +
                                                            this._formatTableAlias(
                                                                p
                                                            )),
                                                    d)
                                                ) {
                                                    e += ' ON ';
                                                    var _ = void 0;
                                                    (_ = h.isSquelBuilder(d)
                                                        ? d._toParamString({
                                                              buildParameterized:
                                                                  t.buildParameterized
                                                          })
                                                        : this._buildString(
                                                              d,
                                                              [],
                                                              {
                                                                  buildParameterized:
                                                                      t.buildParameterized
                                                              }
                                                          )),
                                                        (e += this._applyNestingFormatting(
                                                            _.text
                                                        )),
                                                        _.values.forEach(
                                                            function(t) {
                                                                return r.push(
                                                                    t
                                                                );
                                                            }
                                                        );
                                                }
                                            }
                                        } catch (t) {
                                            (o = !0), (a = t);
                                        } finally {
                                            try {
                                                !i && l.return && l.return();
                                            } finally {
                                                if (o) throw a;
                                            }
                                        }
                                        return { text: e, values: r };
                                    }
                                }
                            ]),
                            o
                        );
                    })()),
                    (h.UnionBlock = (function(i) {
                        function o(e) {
                            r(this, o);
                            var n = t(
                                this,
                                (o.__proto__ || Object.getPrototypeOf(o)).call(
                                    this,
                                    e
                                )
                            );
                            return (n._unions = []), n;
                        }
                        return (
                            e(o, h.Block),
                            p(o, [
                                {
                                    key: 'union',
                                    value: function(t) {
                                        var e =
                                            arguments.length > 1 &&
                                            void 0 !== arguments[1]
                                                ? arguments[1]
                                                : 'UNION';
                                        (t = this._sanitizeTable(t)),
                                            this._unions.push({
                                                type: e,
                                                table: t
                                            });
                                    }
                                },
                                {
                                    key: 'union_all',
                                    value: function(t) {
                                        this.union(t, 'UNION ALL');
                                    }
                                },
                                {
                                    key: '_toParamString',
                                    value: function() {
                                        var t =
                                                arguments.length > 0 &&
                                                void 0 !== arguments[0]
                                                    ? arguments[0]
                                                    : {},
                                            e = '',
                                            r = [],
                                            i = !0,
                                            o = !1,
                                            a = void 0;
                                        try {
                                            for (
                                                var s,
                                                    l = this._unions[
                                                        Symbol.iterator
                                                    ]();
                                                !(i = (s = l.next()).done);
                                                i = !0
                                            ) {
                                                var u = s.value,
                                                    c = u.type,
                                                    f = u.table;
                                                e = n(
                                                    e,
                                                    this.options.separator
                                                );
                                                var p = void 0;
                                                if (
                                                    f instanceof h.BaseBuilder
                                                ) {
                                                    var d = f._toParamString({
                                                        buildParameterized:
                                                            t.buildParameterized,
                                                        nested: !0
                                                    });
                                                    (p = d.text),
                                                        d.values.forEach(
                                                            function(t) {
                                                                return r.push(
                                                                    t
                                                                );
                                                            }
                                                        );
                                                } else
                                                    e = this._formatTableName(
                                                        f
                                                    );
                                                e += c + ' ' + p;
                                            }
                                        } catch (t) {
                                            (o = !0), (a = t);
                                        } finally {
                                            try {
                                                !i && l.return && l.return();
                                            } finally {
                                                if (o) throw a;
                                            }
                                        }
                                        return { text: e, values: r };
                                    }
                                }
                            ]),
                            o
                        );
                    })()),
                    (h.QueryBuilder = (function(n) {
                        function o(e, n) {
                            r(this, o);
                            var i = t(
                                this,
                                (o.__proto__ || Object.getPrototypeOf(o)).call(
                                    this,
                                    e
                                )
                            );
                            i.blocks = n || [];
                            var a = !0,
                                s = !1,
                                l = void 0;
                            try {
                                for (
                                    var u, c = i.blocks[Symbol.iterator]();
                                    !(a = (u = c.next()).done);
                                    a = !0
                                ) {
                                    var h = u.value,
                                        f = h.exposedMethods();
                                    for (var p in f) {
                                        var d = f[p];
                                        if (void 0 !== i[p])
                                            throw new Error(
                                                'Builder already has a builder method called: ' +
                                                    p
                                            );
                                        !(function(t, e, r) {
                                            i[p] = function() {
                                                for (
                                                    var e = arguments.length,
                                                        n = Array(e),
                                                        o = 0;
                                                    o < e;
                                                    o++
                                                )
                                                    n[o] = arguments[o];
                                                return (
                                                    r.call.apply(
                                                        r,
                                                        [t].concat(n)
                                                    ),
                                                    i
                                                );
                                            };
                                        })(h, 0, d);
                                    }
                                }
                            } catch (t) {
                                (s = !0), (l = t);
                            } finally {
                                try {
                                    !a && c.return && c.return();
                                } finally {
                                    if (s) throw l;
                                }
                            }
                            return i;
                        }
                        return (
                            e(o, h.BaseBuilder),
                            p(o, [
                                {
                                    key: 'registerValueHandler',
                                    value: function(t, e) {
                                        var r = !0,
                                            n = !1,
                                            i = void 0;
                                        try {
                                            for (
                                                var a,
                                                    s = this.blocks[
                                                        Symbol.iterator
                                                    ]();
                                                !(r = (a = s.next()).done);
                                                r = !0
                                            )
                                                a.value.registerValueHandler(
                                                    t,
                                                    e
                                                );
                                        } catch (t) {
                                            (n = !0), (i = t);
                                        } finally {
                                            try {
                                                !r && s.return && s.return();
                                            } finally {
                                                if (n) throw i;
                                            }
                                        }
                                        return (
                                            f(
                                                o.prototype.__proto__ ||
                                                    Object.getPrototypeOf(
                                                        o.prototype
                                                    ),
                                                'registerValueHandler',
                                                this
                                            ).call(this, t, e),
                                            this
                                        );
                                    }
                                },
                                {
                                    key: 'updateOptions',
                                    value: function(t) {
                                        this.options = i({}, this.options, t);
                                        var e = !0,
                                            r = !1,
                                            n = void 0;
                                        try {
                                            for (
                                                var o,
                                                    a = this.blocks[
                                                        Symbol.iterator
                                                    ]();
                                                !(e = (o = a.next()).done);
                                                e = !0
                                            ) {
                                                var s = o.value;
                                                s.options = i({}, s.options, t);
                                            }
                                        } catch (t) {
                                            (r = !0), (n = t);
                                        } finally {
                                            try {
                                                !e && a.return && a.return();
                                            } finally {
                                                if (r) throw n;
                                            }
                                        }
                                    }
                                },
                                {
                                    key: '_toParamString',
                                    value: function() {
                                        var t = this,
                                            e =
                                                arguments.length > 0 &&
                                                void 0 !== arguments[0]
                                                    ? arguments[0]
                                                    : {};
                                        e = i({}, this.options, e);
                                        var r = this.blocks.map(function(r) {
                                                return r._toParamString({
                                                    buildParameterized:
                                                        e.buildParameterized,
                                                    queryBuilder: t
                                                });
                                            }),
                                            n = r.map(function(t) {
                                                return t.text;
                                            }),
                                            o = r.map(function(t) {
                                                return t.values;
                                            }),
                                            a = n
                                                .filter(function(t) {
                                                    return 0 < t.length;
                                                })
                                                .join(e.separator),
                                            s = [];
                                        if (
                                            (o.forEach(function(t) {
                                                return t.forEach(function(t) {
                                                    return s.push(t);
                                                });
                                            }),
                                            !e.nested && e.numberedParameters)
                                        ) {
                                            var l =
                                                    void 0 !==
                                                    e.numberedParametersStartAt
                                                        ? e.numberedParametersStartAt
                                                        : 1,
                                                u = e.parameterCharacter.replace(
                                                    /[-[\]{}()*+?.,\\^$|#\s]/g,
                                                    '\\$&'
                                                );
                                            a = a.replace(
                                                new RegExp(u, 'g'),
                                                function() {
                                                    return (
                                                        '' +
                                                        e.numberedParametersPrefix +
                                                        l++
                                                    );
                                                }
                                            );
                                        }
                                        return {
                                            text: this._applyNestingFormatting(
                                                a,
                                                !!e.nested
                                            ),
                                            values: s
                                        };
                                    }
                                },
                                {
                                    key: 'clone',
                                    value: function() {
                                        var t = this.blocks.map(function(t) {
                                            return t.clone();
                                        });
                                        return new this.constructor(
                                            this.options,
                                            t
                                        );
                                    }
                                },
                                {
                                    key: 'getBlock',
                                    value: function(t) {
                                        return this.blocks.filter(function(e) {
                                            return e instanceof t;
                                        })[0];
                                    }
                                }
                            ]),
                            o
                        );
                    })()),
                    (h.Select = (function(n) {
                        function i(e) {
                            var n =
                                arguments.length > 1 && void 0 !== arguments[1]
                                    ? arguments[1]
                                    : null;
                            return (
                                r(this, i),
                                (n = n || [
                                    new h.StringBlock(e, 'SELECT'),
                                    new h.FunctionBlock(e),
                                    new h.DistinctBlock(e),
                                    new h.GetFieldBlock(e),
                                    new h.FromTableBlock(e),
                                    new h.JoinBlock(e),
                                    new h.WhereBlock(e),
                                    new h.GroupByBlock(e),
                                    new h.HavingBlock(e),
                                    new h.OrderByBlock(e),
                                    new h.LimitBlock(e),
                                    new h.OffsetBlock(e),
                                    new h.UnionBlock(e)
                                ]),
                                t(
                                    this,
                                    (i.__proto__ || Object.getPrototypeOf(i)
                                    ).call(this, e, n)
                                )
                            );
                        }
                        return e(i, h.QueryBuilder), i;
                    })()),
                    (h.Update = (function(n) {
                        function i(e) {
                            var n =
                                arguments.length > 1 && void 0 !== arguments[1]
                                    ? arguments[1]
                                    : null;
                            return (
                                r(this, i),
                                (n = n || [
                                    new h.StringBlock(e, 'UPDATE'),
                                    new h.UpdateTableBlock(e),
                                    new h.SetFieldBlock(e),
                                    new h.WhereBlock(e),
                                    new h.OrderByBlock(e),
                                    new h.LimitBlock(e)
                                ]),
                                t(
                                    this,
                                    (i.__proto__ || Object.getPrototypeOf(i)
                                    ).call(this, e, n)
                                )
                            );
                        }
                        return e(i, h.QueryBuilder), i;
                    })()),
                    (h.Delete = (function(n) {
                        function o(e) {
                            var n =
                                arguments.length > 1 && void 0 !== arguments[1]
                                    ? arguments[1]
                                    : null;
                            return (
                                r(this, o),
                                (n = n || [
                                    new h.StringBlock(e, 'DELETE'),
                                    new h.TargetTableBlock(e),
                                    new h.FromTableBlock(
                                        i({}, e, { singleTable: !0 })
                                    ),
                                    new h.JoinBlock(e),
                                    new h.WhereBlock(e),
                                    new h.OrderByBlock(e),
                                    new h.LimitBlock(e)
                                ]),
                                t(
                                    this,
                                    (o.__proto__ || Object.getPrototypeOf(o)
                                    ).call(this, e, n)
                                )
                            );
                        }
                        return e(o, h.QueryBuilder), o;
                    })()),
                    (h.Insert = (function(n) {
                        function i(e) {
                            var n =
                                arguments.length > 1 && void 0 !== arguments[1]
                                    ? arguments[1]
                                    : null;
                            return (
                                r(this, i),
                                (n = n || [
                                    new h.StringBlock(e, 'INSERT'),
                                    new h.IntoTableBlock(e),
                                    new h.InsertFieldValueBlock(e),
                                    new h.InsertFieldsFromQueryBlock(e)
                                ]),
                                t(
                                    this,
                                    (i.__proto__ || Object.getPrototypeOf(i)
                                    ).call(this, e, n)
                                )
                            );
                        }
                        return e(i, h.QueryBuilder), i;
                    })());
                var y = {
                    VERSION: '5.12.0',
                    flavour: c,
                    expr: function(t) {
                        return new h.Expression(t);
                    },
                    case: function(t, e) {
                        return new h.Case(t, e);
                    },
                    select: function(t, e) {
                        return new h.Select(t, e);
                    },
                    update: function(t, e) {
                        return new h.Update(t, e);
                    },
                    insert: function(t, e) {
                        return new h.Insert(t, e);
                    },
                    delete: function(t, e) {
                        return new h.Delete(t, e);
                    },
                    str: function() {
                        var t = new h.FunctionBlock();
                        return t.function.apply(t, arguments), t;
                    },
                    rstr: function() {
                        var t = new h.FunctionBlock({ rawNesting: !0 });
                        return t.function.apply(t, arguments), t;
                    },
                    registerValueHandler: h.registerValueHandler
                };
                return (y.remove = y.delete), (y.cls = h), y;
            }
            var f = function t(e, r, n) {
                    null === e && (e = Function.prototype);
                    var i = Object.getOwnPropertyDescriptor(e, r);
                    if (void 0 === i) {
                        var o = Object.getPrototypeOf(e);
                        return null === o ? void 0 : t(o, r, n);
                    }
                    if ('value' in i) return i.value;
                    var a = i.get;
                    if (void 0 !== a) return a.call(n);
                },
                p = (function() {
                    function t(t, e) {
                        for (var r = 0; r < e.length; r++) {
                            var n = e[r];
                            (n.enumerable = n.enumerable || !1),
                                (n.configurable = !0),
                                'value' in n && (n.writable = !0),
                                Object.defineProperty(t, n.key, n);
                        }
                    }
                    return function(e, r, n) {
                        return r && t(e.prototype, r), n && t(e, n), e;
                    };
                })(),
                d =
                    'function' == typeof Symbol &&
                    'symbol' == typeof Symbol.iterator
                        ? function(t) {
                              return typeof t;
                          }
                        : function(t) {
                              return t &&
                                  'function' == typeof Symbol &&
                                  t.constructor === Symbol &&
                                  t !== Symbol.prototype
                                  ? 'symbol'
                                  : typeof t;
                          },
                v = h();
            return (
                (v.flavours = {}),
                (v.useFlavour = function() {
                    var t =
                        arguments.length > 0 && void 0 !== arguments[0]
                            ? arguments[0]
                            : null;
                    if (!t) return v;
                    if (v.flavours[t] instanceof Function) {
                        var e = h(t);
                        return (
                            v.flavours[t].call(null, e),
                            (e.flavours = v.flavours),
                            (e.useFlavour = v.useFlavour),
                            e
                        );
                    }
                    throw new Error('Flavour not available: ' + t);
                }),
                (v.flavours.mssql = function(o) {
                    var a = o.cls;
                    (a.DefaultQueryBuilderOptions.replaceSingleQuotes = !0),
                        (a.DefaultQueryBuilderOptions.autoQuoteAliasNames = !1),
                        (a.DefaultQueryBuilderOptions.numberedParametersPrefix =
                            '@'),
                        o.registerValueHandler(Date, function(t) {
                            return (
                                "'" +
                                t.getUTCFullYear() +
                                '-' +
                                (t.getUTCMonth() + 1) +
                                '-' +
                                t.getUTCDate() +
                                ' ' +
                                t.getUTCHours() +
                                ':' +
                                t.getUTCMinutes() +
                                ':' +
                                t.getUTCSeconds() +
                                "'"
                            );
                        }),
                        (a.MssqlLimitOffsetTopBlock = (function(n) {
                            function i(n) {
                                r(this, i);
                                var o = t(
                                    this,
                                    (i.__proto__ || Object.getPrototypeOf(i)
                                    ).call(this, n)
                                );
                                (o._limits = null), (o._offsets = null);
                                var s = function(t) {
                                    (t = this._sanitizeLimitOffset(t)),
                                        (this._parent._limits = t);
                                };
                                return (
                                    (o.ParentBlock = (function(n) {
                                        function i(e) {
                                            r(this, i);
                                            var n = t(
                                                this,
                                                (i.__proto__ ||
                                                    Object.getPrototypeOf(i)
                                                ).call(this, e.options)
                                            );
                                            return (n._parent = e), n;
                                        }
                                        return e(i, a.Block), i;
                                    })()),
                                    (o.LimitBlock = (function(n) {
                                        function i(e) {
                                            r(this, i);
                                            var n = t(
                                                this,
                                                (i.__proto__ ||
                                                    Object.getPrototypeOf(i)
                                                ).call(this, e)
                                            );
                                            return (n.limit = s), n;
                                        }
                                        return (
                                            e(i, o.ParentBlock),
                                            p(i, [
                                                {
                                                    key: '_toParamString',
                                                    value: function() {
                                                        var t = '';
                                                        return (
                                                            this._parent
                                                                ._limits &&
                                                                this._parent
                                                                    ._offsets &&
                                                                (t =
                                                                    'FETCH NEXT ' +
                                                                    this._parent
                                                                        ._limits +
                                                                    ' ROWS ONLY'),
                                                            {
                                                                text: t,
                                                                values: []
                                                            }
                                                        );
                                                    }
                                                }
                                            ]),
                                            i
                                        );
                                    })()),
                                    (o.TopBlock = (function(n) {
                                        function i(e) {
                                            r(this, i);
                                            var n = t(
                                                this,
                                                (i.__proto__ ||
                                                    Object.getPrototypeOf(i)
                                                ).call(this, e)
                                            );
                                            return (n.top = s), n;
                                        }
                                        return (
                                            e(i, o.ParentBlock),
                                            p(i, [
                                                {
                                                    key: '_toParamString',
                                                    value: function() {
                                                        var t = '';
                                                        return (
                                                            this._parent
                                                                ._limits &&
                                                                !this._parent
                                                                    ._offsets &&
                                                                (t =
                                                                    'TOP (' +
                                                                    this._parent
                                                                        ._limits +
                                                                    ')'),
                                                            {
                                                                text: t,
                                                                values: []
                                                            }
                                                        );
                                                    }
                                                }
                                            ]),
                                            i
                                        );
                                    })()),
                                    (o.OffsetBlock = (function(n) {
                                        function i() {
                                            return (
                                                r(this, i),
                                                t(
                                                    this,
                                                    (i.__proto__ ||
                                                        Object.getPrototypeOf(i)
                                                    ).apply(this, arguments)
                                                )
                                            );
                                        }
                                        return (
                                            e(i, o.ParentBlock),
                                            p(i, [
                                                {
                                                    key: 'offset',
                                                    value: function(t) {
                                                        this._parent._offsets = this._sanitizeLimitOffset(
                                                            t
                                                        );
                                                    }
                                                },
                                                {
                                                    key: '_toParamString',
                                                    value: function() {
                                                        var t = '';
                                                        return (
                                                            this._parent
                                                                ._offsets &&
                                                                (t =
                                                                    'OFFSET ' +
                                                                    this._parent
                                                                        ._offsets +
                                                                    ' ROWS'),
                                                            {
                                                                text: t,
                                                                values: []
                                                            }
                                                        );
                                                    }
                                                }
                                            ]),
                                            i
                                        );
                                    })()),
                                    o
                                );
                            }
                            return (
                                e(i, a.Block),
                                p(i, [
                                    {
                                        key: 'LIMIT',
                                        value: function() {
                                            return new this.LimitBlock(this);
                                        }
                                    },
                                    {
                                        key: 'TOP',
                                        value: function() {
                                            return new this.TopBlock(this);
                                        }
                                    },
                                    {
                                        key: 'OFFSET',
                                        value: function() {
                                            return new this.OffsetBlock(this);
                                        }
                                    }
                                ]),
                                i
                            );
                        })()),
                        (a.MssqlUpdateTopBlock = (function(n) {
                            function i(e) {
                                r(this, i);
                                var n = t(
                                    this,
                                    (i.__proto__ || Object.getPrototypeOf(i)
                                    ).call(this, e)
                                );
                                return (
                                    (n._limits = null),
                                    (n.limit = n.top = function(t) {
                                        n._limits = n._sanitizeLimitOffset(t);
                                    }),
                                    n
                                );
                            }
                            return (
                                e(i, a.Block),
                                p(i, [
                                    {
                                        key: '_toParamString',
                                        value: function() {
                                            return {
                                                text: this._limits
                                                    ? 'TOP (' +
                                                      this._limits +
                                                      ')'
                                                    : '',
                                                values: []
                                            };
                                        }
                                    }
                                ]),
                                i
                            );
                        })()),
                        (a.MssqlInsertFieldValueBlock = (function(n) {
                            function i(e) {
                                r(this, i);
                                var n = t(
                                    this,
                                    (i.__proto__ || Object.getPrototypeOf(i)
                                    ).call(this, e)
                                );
                                return (n._outputs = []), n;
                            }
                            return (
                                e(i, a.InsertFieldValueBlock),
                                p(i, [
                                    {
                                        key: 'output',
                                        value: function(t) {
                                            var e = this;
                                            'string' == typeof t
                                                ? this._outputs.push(
                                                      'INSERTED.' +
                                                          this._sanitizeField(t)
                                                  )
                                                : t.forEach(function(t) {
                                                      e._outputs.push(
                                                          'INSERTED.' +
                                                              e._sanitizeField(
                                                                  t
                                                              )
                                                      );
                                                  });
                                        }
                                    },
                                    {
                                        key: '_toParamString',
                                        value: function(t) {
                                            var e = f(
                                                i.prototype.__proto__ ||
                                                    Object.getPrototypeOf(
                                                        i.prototype
                                                    ),
                                                '_toParamString',
                                                this
                                            ).call(this, t);
                                            if (
                                                e.text.length &&
                                                0 < this._outputs.length
                                            ) {
                                                var r =
                                                        'OUTPUT ' +
                                                        this._outputs.join(
                                                            ', '
                                                        ) +
                                                        ' ',
                                                    n = e.text.indexOf(
                                                        'VALUES'
                                                    );
                                                e.text =
                                                    e.text.substr(0, n) +
                                                    r +
                                                    e.text.substr(n);
                                            }
                                            return e;
                                        }
                                    }
                                ]),
                                i
                            );
                        })()),
                        (a.MssqlUpdateDeleteOutputBlock = (function(i) {
                            function o(e) {
                                r(this, o);
                                var n = t(
                                    this,
                                    (o.__proto__ || Object.getPrototypeOf(o)
                                    ).call(this, e)
                                );
                                return (n._outputs = []), n;
                            }
                            return (
                                e(o, a.Block),
                                p(o, [
                                    {
                                        key: 'outputs',
                                        value: function(t) {
                                            for (var e in t)
                                                this.output(e, t[e]);
                                        }
                                    },
                                    {
                                        key: 'output',
                                        value: function(t) {
                                            var e =
                                                arguments.length > 1 &&
                                                void 0 !== arguments[1]
                                                    ? arguments[1]
                                                    : null;
                                            (t = this._sanitizeField(t)),
                                                (e = e
                                                    ? this._sanitizeFieldAlias(
                                                          e
                                                      )
                                                    : e),
                                                this._outputs.push({
                                                    name: this.options.forDelete
                                                        ? 'DELETED.' + t
                                                        : 'INSERTED.' + t,
                                                    alias: e
                                                });
                                        }
                                    },
                                    {
                                        key: '_toParamString',
                                        value: function(t) {
                                            var e = '';
                                            if (this._outputs.length) {
                                                var r = !0,
                                                    i = !1,
                                                    o = void 0;
                                                try {
                                                    for (
                                                        var a,
                                                            s = this._outputs[
                                                                Symbol.iterator
                                                            ]();
                                                        !(r = (a = s.next())
                                                            .done);
                                                        r = !0
                                                    ) {
                                                        var l = a.value;
                                                        (e = n(e, ', ')),
                                                            (e += l.name),
                                                            l.alias &&
                                                                (e +=
                                                                    ' AS ' +
                                                                    this._formatFieldAlias(
                                                                        l.alias
                                                                    ));
                                                    }
                                                } catch (t) {
                                                    (i = !0), (o = t);
                                                } finally {
                                                    try {
                                                        !r &&
                                                            s.return &&
                                                            s.return();
                                                    } finally {
                                                        if (i) throw o;
                                                    }
                                                }
                                                e = 'OUTPUT ' + e;
                                            }
                                            return { text: e, values: [] };
                                        }
                                    }
                                ]),
                                o
                            );
                        })()),
                        (a.Select = (function(n) {
                            function i(e) {
                                var n =
                                    arguments.length > 1 &&
                                    void 0 !== arguments[1]
                                        ? arguments[1]
                                        : null;
                                r(this, i);
                                var o = new a.MssqlLimitOffsetTopBlock(e);
                                return (
                                    (n = n || [
                                        new a.StringBlock(e, 'SELECT'),
                                        new a.DistinctBlock(e),
                                        o.TOP(),
                                        new a.GetFieldBlock(e),
                                        new a.FromTableBlock(e),
                                        new a.JoinBlock(e),
                                        new a.WhereBlock(e),
                                        new a.GroupByBlock(e),
                                        new a.OrderByBlock(e),
                                        o.OFFSET(),
                                        o.LIMIT(),
                                        new a.UnionBlock(e)
                                    ]),
                                    t(
                                        this,
                                        (i.__proto__ || Object.getPrototypeOf(i)
                                        ).call(this, e, n)
                                    )
                                );
                            }
                            return e(i, a.QueryBuilder), i;
                        })()),
                        (a.Update = (function(n) {
                            function i(e) {
                                var n =
                                    arguments.length > 1 &&
                                    void 0 !== arguments[1]
                                        ? arguments[1]
                                        : null;
                                return (
                                    r(this, i),
                                    (n = n || [
                                        new a.StringBlock(e, 'UPDATE'),
                                        new a.MssqlUpdateTopBlock(e),
                                        new a.UpdateTableBlock(e),
                                        new a.SetFieldBlock(e),
                                        new a.MssqlUpdateDeleteOutputBlock(e),
                                        new a.WhereBlock(e)
                                    ]),
                                    t(
                                        this,
                                        (i.__proto__ || Object.getPrototypeOf(i)
                                        ).call(this, e, n)
                                    )
                                );
                            }
                            return e(i, a.QueryBuilder), i;
                        })()),
                        (a.Delete = (function(n) {
                            function o(e) {
                                var n =
                                    arguments.length > 1 &&
                                    void 0 !== arguments[1]
                                        ? arguments[1]
                                        : null;
                                return (
                                    r(this, o),
                                    (n = n || [
                                        new a.StringBlock(e, 'DELETE'),
                                        new a.TargetTableBlock(e),
                                        new a.FromTableBlock(
                                            i({}, e, { singleTable: !0 })
                                        ),
                                        new a.JoinBlock(e),
                                        new a.MssqlUpdateDeleteOutputBlock(
                                            i({}, e, { forDelete: !0 })
                                        ),
                                        new a.WhereBlock(e),
                                        new a.OrderByBlock(e),
                                        new a.LimitBlock(e)
                                    ]),
                                    t(
                                        this,
                                        (o.__proto__ || Object.getPrototypeOf(o)
                                        ).call(this, e, n)
                                    )
                                );
                            }
                            return e(o, a.QueryBuilder), o;
                        })()),
                        (a.Insert = (function(n) {
                            function i(e) {
                                var n =
                                    arguments.length > 1 &&
                                    void 0 !== arguments[1]
                                        ? arguments[1]
                                        : null;
                                return (
                                    r(this, i),
                                    (n = n || [
                                        new a.StringBlock(e, 'INSERT'),
                                        new a.IntoTableBlock(e),
                                        new a.MssqlInsertFieldValueBlock(e),
                                        new a.InsertFieldsFromQueryBlock(e)
                                    ]),
                                    t(
                                        this,
                                        (i.__proto__ || Object.getPrototypeOf(i)
                                        ).call(this, e, n)
                                    )
                                );
                            }
                            return e(i, a.QueryBuilder), i;
                        })());
                }),
                (v.flavours.mysql = function(i) {
                    var o = i.cls;
                    (o.MysqlOnDuplicateKeyUpdateBlock = (function(i) {
                        function a() {
                            return (
                                r(this, a),
                                t(
                                    this,
                                    (a.__proto__ || Object.getPrototypeOf(a)
                                    ).apply(this, arguments)
                                )
                            );
                        }
                        return (
                            e(a, o.AbstractSetFieldBlock),
                            p(a, [
                                {
                                    key: 'onDupUpdate',
                                    value: function(t, e, r) {
                                        this._set(t, e, r);
                                    }
                                },
                                {
                                    key: '_toParamString',
                                    value: function() {
                                        for (
                                            var t =
                                                    arguments.length > 0 &&
                                                    void 0 !== arguments[0]
                                                        ? arguments[0]
                                                        : {},
                                                e = '',
                                                r = [],
                                                i = 0;
                                            i < this._fields.length;
                                            ++i
                                        ) {
                                            e = n(e, ', ');
                                            var o = this._fields[i],
                                                a = this._values[0][i],
                                                s = this._valueOptions[0][i];
                                            if (void 0 === a) e += o;
                                            else {
                                                var l = this._buildString(
                                                    o +
                                                        ' = ' +
                                                        this.options
                                                            .parameterCharacter,
                                                    [a],
                                                    {
                                                        buildParameterized:
                                                            t.buildParameterized,
                                                        formattingOptions: s
                                                    }
                                                );
                                                (e += l.text),
                                                    l.values.forEach(function(
                                                        t
                                                    ) {
                                                        return r.push(t);
                                                    });
                                            }
                                        }
                                        return {
                                            text: e.length
                                                ? 'ON DUPLICATE KEY UPDATE ' + e
                                                : '',
                                            values: r
                                        };
                                    }
                                }
                            ]),
                            a
                        );
                    })()),
                        (o.Insert = (function(n) {
                            function i(e) {
                                var n =
                                    arguments.length > 1 &&
                                    void 0 !== arguments[1]
                                        ? arguments[1]
                                        : null;
                                return (
                                    r(this, i),
                                    (n = n || [
                                        new o.StringBlock(e, 'INSERT'),
                                        new o.IntoTableBlock(e),
                                        new o.InsertFieldValueBlock(e),
                                        new o.InsertFieldsFromQueryBlock(e),
                                        new o.MysqlOnDuplicateKeyUpdateBlock(e)
                                    ]),
                                    t(
                                        this,
                                        (i.__proto__ || Object.getPrototypeOf(i)
                                        ).call(this, e, n)
                                    )
                                );
                            }
                            return e(i, o.QueryBuilder), i;
                        })()),
                        (o.Replace = (function(n) {
                            function i(e) {
                                var n =
                                    arguments.length > 1 &&
                                    void 0 !== arguments[1]
                                        ? arguments[1]
                                        : null;
                                return (
                                    r(this, i),
                                    (n = n || [
                                        new o.StringBlock(e, 'REPLACE'),
                                        new o.IntoTableBlock(e),
                                        new o.InsertFieldValueBlock(e),
                                        new o.InsertFieldsFromQueryBlock(e)
                                    ]),
                                    t(
                                        this,
                                        (i.__proto__ || Object.getPrototypeOf(i)
                                        ).call(this, e, n)
                                    )
                                );
                            }
                            return e(i, o.QueryBuilder), i;
                        })()),
                        (i.replace = function(t, e) {
                            return new o.Replace(t, e);
                        });
                }),
                (v.flavours.postgres = function(o) {
                    var s = o.cls;
                    (s.DefaultQueryBuilderOptions.numberedParameters = !0),
                        (s.DefaultQueryBuilderOptions.numberedParametersStartAt = 1),
                        (s.DefaultQueryBuilderOptions.autoQuoteAliasNames = !1),
                        (s.DefaultQueryBuilderOptions.useAsForTableAliasNames = !0),
                        (s.PostgresOnConflictKeyUpdateBlock = (function(i) {
                            function o() {
                                return (
                                    r(this, o),
                                    t(
                                        this,
                                        (o.__proto__ || Object.getPrototypeOf(o)
                                        ).apply(this, arguments)
                                    )
                                );
                            }
                            return (
                                e(o, s.AbstractSetFieldBlock),
                                p(o, [
                                    {
                                        key: 'onConflict',
                                        value: function(t, e) {
                                            var r = this;
                                            (this._onConflict = !0),
                                                t &&
                                                    (a(t) || (t = [t]),
                                                    (this._dupFields = t.map(
                                                        this._sanitizeField.bind(
                                                            this
                                                        )
                                                    )),
                                                    e &&
                                                        Object.keys(
                                                            e
                                                        ).forEach(function(t) {
                                                            r._set(t, e[t]);
                                                        }));
                                        }
                                    },
                                    {
                                        key: '_toParamString',
                                        value: function() {
                                            for (
                                                var t =
                                                        arguments.length > 0 &&
                                                        void 0 !== arguments[0]
                                                            ? arguments[0]
                                                            : {},
                                                    e = '',
                                                    r = [],
                                                    i = 0;
                                                i < this._fields.length;
                                                ++i
                                            ) {
                                                e = n(e, ', ');
                                                var o = this._fields[i],
                                                    a = this._values[0][i],
                                                    s = this._valueOptions[0][
                                                        i
                                                    ];
                                                if (void 0 === a) e += o;
                                                else {
                                                    var l = this._buildString(
                                                        o +
                                                            ' = ' +
                                                            this.options
                                                                .parameterCharacter,
                                                        [a],
                                                        {
                                                            buildParameterized:
                                                                t.buildParameterized,
                                                            formattingOptions: s
                                                        }
                                                    );
                                                    (e += l.text),
                                                        l.values.forEach(
                                                            function(t) {
                                                                return r.push(
                                                                    t
                                                                );
                                                            }
                                                        );
                                                }
                                            }
                                            var u = { text: '', values: r };
                                            if (this._onConflict) {
                                                var c = this._dupFields
                                                        ? '(' +
                                                          this._dupFields.join(
                                                              ', '
                                                          ) +
                                                          ') '
                                                        : '',
                                                    h = e.length
                                                        ? 'UPDATE SET ' + e
                                                        : 'NOTHING';
                                                u.text =
                                                    'ON CONFLICT ' +
                                                    c +
                                                    'DO ' +
                                                    h;
                                            }
                                            return u;
                                        }
                                    }
                                ]),
                                o
                            );
                        })()),
                        (s.ReturningBlock = (function(i) {
                            function o(e) {
                                r(this, o);
                                var n = t(
                                    this,
                                    (o.__proto__ || Object.getPrototypeOf(o)
                                    ).call(this, e)
                                );
                                return (n._fields = []), n;
                            }
                            return (
                                e(o, s.Block),
                                p(o, [
                                    {
                                        key: 'returning',
                                        value: function(t) {
                                            var e =
                                                    arguments.length > 1 &&
                                                    void 0 !== arguments[1]
                                                        ? arguments[1]
                                                        : null,
                                                r =
                                                    arguments.length > 2 &&
                                                    void 0 !== arguments[2]
                                                        ? arguments[2]
                                                        : {};
                                            if (
                                                ((e = e
                                                    ? this._sanitizeFieldAlias(
                                                          e
                                                      )
                                                    : e),
                                                (t = this._sanitizeField(t)),
                                                this._fields.filter(function(
                                                    r
                                                ) {
                                                    return (
                                                        r.name === t &&
                                                        r.alias === e
                                                    );
                                                }).length)
                                            )
                                                return this;
                                            this._fields.push({
                                                name: t,
                                                alias: e,
                                                options: r
                                            });
                                        }
                                    },
                                    {
                                        key: '_toParamString',
                                        value: function() {
                                            var t =
                                                    arguments.length > 0 &&
                                                    void 0 !== arguments[0]
                                                        ? arguments[0]
                                                        : {},
                                                e = (t.queryBuilder,
                                                t.buildParameterized),
                                                r = '',
                                                i = [],
                                                o = !0,
                                                a = !1,
                                                s = void 0;
                                            try {
                                                for (
                                                    var l,
                                                        u = this._fields[
                                                            Symbol.iterator
                                                        ]();
                                                    !(o = (l = u.next()).done);
                                                    o = !0
                                                ) {
                                                    var c = l.value;
                                                    r = n(r, ', ');
                                                    var h = c.name,
                                                        f = c.alias,
                                                        p = c.options;
                                                    if ('string' == typeof h)
                                                        r += this._formatFieldName(
                                                            h,
                                                            p
                                                        );
                                                    else {
                                                        var d = h._toParamString(
                                                            {
                                                                nested: !0,
                                                                buildParameterized: e
                                                            }
                                                        );
                                                        (r += d.text),
                                                            d.values.forEach(
                                                                function(t) {
                                                                    return i.push(
                                                                        t
                                                                    );
                                                                }
                                                            );
                                                    }
                                                    f &&
                                                        (r +=
                                                            ' AS ' +
                                                            this._formatFieldAlias(
                                                                f
                                                            ));
                                                }
                                            } catch (t) {
                                                (a = !0), (s = t);
                                            } finally {
                                                try {
                                                    !o &&
                                                        u.return &&
                                                        u.return();
                                                } finally {
                                                    if (a) throw s;
                                                }
                                            }
                                            return {
                                                text:
                                                    r.length > 0
                                                        ? 'RETURNING ' + r
                                                        : '',
                                                values: i
                                            };
                                        }
                                    }
                                ]),
                                o
                            );
                        })()),
                        (s.WithBlock = (function(n) {
                            function i(e) {
                                r(this, i);
                                var n = t(
                                    this,
                                    (i.__proto__ || Object.getPrototypeOf(i)
                                    ).call(this, e)
                                );
                                return (n._tables = []), n;
                            }
                            return (
                                e(i, s.Block),
                                p(i, [
                                    {
                                        key: 'with',
                                        value: function(t, e) {
                                            this._tables.push({
                                                alias: t,
                                                table: e
                                            });
                                        }
                                    },
                                    {
                                        key: '_toParamString',
                                        value: function() {
                                            var t =
                                                    arguments.length > 0 &&
                                                    void 0 !== arguments[0]
                                                        ? arguments[0]
                                                        : {},
                                                e = [],
                                                r = [],
                                                n = !0,
                                                i = !1,
                                                o = void 0;
                                            try {
                                                for (
                                                    var a,
                                                        s = this._tables[
                                                            Symbol.iterator
                                                        ]();
                                                    !(n = (a = s.next()).done);
                                                    n = !0
                                                ) {
                                                    var l = a.value,
                                                        u = l.alias,
                                                        c = l.table._toParamString(
                                                            {
                                                                buildParameterized:
                                                                    t.buildParameterized,
                                                                nested: !0
                                                            }
                                                        );
                                                    e.push(u + ' AS ' + c.text),
                                                        c.values.forEach(
                                                            function(t) {
                                                                return r.push(
                                                                    t
                                                                );
                                                            }
                                                        );
                                                }
                                            } catch (t) {
                                                (i = !0), (o = t);
                                            } finally {
                                                try {
                                                    !n &&
                                                        s.return &&
                                                        s.return();
                                                } finally {
                                                    if (i) throw o;
                                                }
                                            }
                                            return {
                                                text: e.length
                                                    ? 'WITH ' + e.join(', ')
                                                    : '',
                                                values: r
                                            };
                                        }
                                    }
                                ]),
                                i
                            );
                        })()),
                        (s.DistinctOnBlock = (function(n) {
                            function i(e) {
                                r(this, i);
                                var n = t(
                                    this,
                                    (i.__proto__ || Object.getPrototypeOf(i)
                                    ).call(this, e)
                                );
                                return (n._distinctFields = []), n;
                            }
                            return (
                                e(i, s.Block),
                                p(i, [
                                    {
                                        key: 'distinct',
                                        value: function() {
                                            var t = this;
                                            this._useDistinct = !0;
                                            for (
                                                var e = arguments.length,
                                                    r = Array(e),
                                                    n = 0;
                                                n < e;
                                                n++
                                            )
                                                r[n] = arguments[n];
                                            r.forEach(function(e) {
                                                t._distinctFields.push(
                                                    t._sanitizeField(e)
                                                );
                                            });
                                        }
                                    },
                                    {
                                        key: '_toParamString',
                                        value: function() {
                                            var t = '';
                                            return (
                                                this._useDistinct &&
                                                    ((t = 'DISTINCT'),
                                                    this._distinctFields
                                                        .length &&
                                                        (t +=
                                                            ' ON (' +
                                                            this._distinctFields.join(
                                                                ', '
                                                            ) +
                                                            ')')),
                                                { text: t, values: [] }
                                            );
                                        }
                                    }
                                ]),
                                i
                            );
                        })()),
                        (s.Select = (function(n) {
                            function i(e) {
                                var n =
                                    arguments.length > 1 &&
                                    void 0 !== arguments[1]
                                        ? arguments[1]
                                        : null;
                                return (
                                    r(this, i),
                                    (n = n || [
                                        new s.WithBlock(e),
                                        new s.StringBlock(e, 'SELECT'),
                                        new s.FunctionBlock(e),
                                        new s.DistinctOnBlock(e),
                                        new s.GetFieldBlock(e),
                                        new s.FromTableBlock(e),
                                        new s.JoinBlock(e),
                                        new s.WhereBlock(e),
                                        new s.GroupByBlock(e),
                                        new s.HavingBlock(e),
                                        new s.OrderByBlock(e),
                                        new s.LimitBlock(e),
                                        new s.OffsetBlock(e),
                                        new s.UnionBlock(e)
                                    ]),
                                    t(
                                        this,
                                        (i.__proto__ || Object.getPrototypeOf(i)
                                        ).call(this, e, n)
                                    )
                                );
                            }
                            return e(i, s.QueryBuilder), i;
                        })()),
                        (s.Insert = (function(n) {
                            function i(e) {
                                var n =
                                    arguments.length > 1 &&
                                    void 0 !== arguments[1]
                                        ? arguments[1]
                                        : null;
                                return (
                                    r(this, i),
                                    (n = n || [
                                        new s.WithBlock(e),
                                        new s.StringBlock(e, 'INSERT'),
                                        new s.IntoTableBlock(e),
                                        new s.InsertFieldValueBlock(e),
                                        new s.InsertFieldsFromQueryBlock(e),
                                        new s.PostgresOnConflictKeyUpdateBlock(
                                            e
                                        ),
                                        new s.ReturningBlock(e)
                                    ]),
                                    t(
                                        this,
                                        (i.__proto__ || Object.getPrototypeOf(i)
                                        ).call(this, e, n)
                                    )
                                );
                            }
                            return e(i, s.QueryBuilder), i;
                        })()),
                        (s.Update = (function(n) {
                            function i(e) {
                                var n =
                                    arguments.length > 1 &&
                                    void 0 !== arguments[1]
                                        ? arguments[1]
                                        : null;
                                return (
                                    r(this, i),
                                    (n = n || [
                                        new s.WithBlock(e),
                                        new s.StringBlock(e, 'UPDATE'),
                                        new s.UpdateTableBlock(e),
                                        new s.SetFieldBlock(e),
                                        new s.FromTableBlock(e),
                                        new s.WhereBlock(e),
                                        new s.OrderByBlock(e),
                                        new s.LimitBlock(e),
                                        new s.ReturningBlock(e)
                                    ]),
                                    t(
                                        this,
                                        (i.__proto__ || Object.getPrototypeOf(i)
                                        ).call(this, e, n)
                                    )
                                );
                            }
                            return e(i, s.QueryBuilder), i;
                        })()),
                        (s.Delete = (function(n) {
                            function o(e) {
                                var n =
                                    arguments.length > 1 &&
                                    void 0 !== arguments[1]
                                        ? arguments[1]
                                        : null;
                                return (
                                    r(this, o),
                                    (n = n || [
                                        new s.WithBlock(e),
                                        new s.StringBlock(e, 'DELETE'),
                                        new s.TargetTableBlock(e),
                                        new s.FromTableBlock(
                                            i({}, e, { singleTable: !0 })
                                        ),
                                        new s.JoinBlock(e),
                                        new s.WhereBlock(e),
                                        new s.OrderByBlock(e),
                                        new s.LimitBlock(e),
                                        new s.ReturningBlock(e)
                                    ]),
                                    t(
                                        this,
                                        (o.__proto__ || Object.getPrototypeOf(o)
                                        ).call(this, e, n)
                                    )
                                );
                            }
                            return e(o, s.QueryBuilder), o;
                        })());
                }),
                v
            );
        });
    }),
    QueryBuilder = t => squel.useFlavour(t || 'mysql');
class Helpers {
    static getFieldsFromOperationString(t, e, r) {
        if (t.type === Nodes.OPERATION) {
            const n = t.a;
            return (r = [...r, ...this.getFieldsFromOperationString(n, e, r)]);
        }
        return t.type === Nodes.VARIABLE ? [e[t]] : [t];
    }
    static buildOperationString(t, e, r, n, i) {
        return buildOperationStringHelper(t, e, r, n, [], !1, i || {});
    }
    static interpolateVariables(t, e) {
        const r = /(\s+\?\s+)|(^\?\s+)|(\s+\?$)/g;
        let n = 0,
            i = 0,
            o = '',
            a = r.exec(t);
        if (null === a) return t;
        for (; null !== a; ) {
            const s = e[n];
            if (void 0 === s)
                throw new Error('Missing variable. Cannot interpolate.');
            (o += `${t.substring(i, a.index)} ${s}`),
                (i = a.index + (0 === a.index ? 1 : 2)),
                n++,
                (a = r.exec(t));
        }
        return (o += t.substring(i, t.length));
    }
}
var asyncGenerator = (function() {
        function t(t) {
            this.value = t;
        }
        function e(e) {
            function r(i, o) {
                try {
                    var a = e[i](o),
                        s = a.value;
                    s instanceof t
                        ? Promise.resolve(s.value).then(
                              function(t) {
                                  r('next', t);
                              },
                              function(t) {
                                  r('throw', t);
                              }
                          )
                        : n(a.done ? 'return' : 'normal', a.value);
                } catch (t) {
                    n('throw', t);
                }
            }
            function n(t, e) {
                switch (t) {
                    case 'return':
                        i.resolve({ value: e, done: !0 });
                        break;
                    case 'throw':
                        i.reject(e);
                        break;
                    default:
                        i.resolve({ value: e, done: !1 });
                }
                (i = i.next) ? r(i.key, i.arg) : (o = null);
            }
            var i, o;
            (this._invoke = function(t, e) {
                return new Promise(function(n, a) {
                    var s = {
                        key: t,
                        arg: e,
                        resolve: n,
                        reject: a,
                        next: null
                    };
                    o ? (o = o.next = s) : ((i = o = s), r(t, e));
                });
            }),
                'function' != typeof e.return && (this.return = void 0);
        }
        return (
            'function' == typeof Symbol &&
                Symbol.asyncIterator &&
                (e.prototype[Symbol.asyncIterator] = function() {
                    return this;
                }),
            (e.prototype.next = function(t) {
                return this._invoke('next', t);
            }),
            (e.prototype.throw = function(t) {
                return this._invoke('throw', t);
            }),
            (e.prototype.return = function(t) {
                return this._invoke('return', t);
            }),
            {
                wrap: function(t) {
                    return function() {
                        return new e(t.apply(this, arguments));
                    };
                },
                await: function(e) {
                    return new t(e);
                }
            }
        );
    })(),
    _extends =
        Object.assign ||
        function(t) {
            for (var e = 1; e < arguments.length; e++) {
                var r = arguments[e];
                for (var n in r)
                    Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
            }
            return t;
        };
class JoinProcessor extends Processor {
    _applyFields(t, e, r) {
        e.forEach(e => {
            e.alias
                ? r.includes(e.alias)
                  ? t.field(e.alias)
                  : (t.field(e.value, e.alias), r.push(e.alias))
                : t.field(e.value);
        });
    }
    _processJoin(t, e, r, n) {
        const { table: i, on: o, nodes: a } = e,
            s = o
                .map(n => {
                    const i = Helpers.buildOperationString(t, e.table, n, r);
                    return Helpers.interpolateVariables(i.text, i.variables);
                })
                .join(' AND '),
            l = [];
        a.filter(t => t.type === Nodes.JOIN).forEach(e => {
            l.push(this._processJoin(t, e, r, n));
        });
        const u = a
                .filter(t => t.type === Nodes.FIELD)
                .map(t => _extends({}, t, { value: `${i}.${t.value}` })),
            c = this._qb.select().from(i),
            h =
                0 < l.length
                    ? l.map(t => t.fields).reduce((t, e) => t.concat(e))
                    : [];
        return (
            u.forEach(t => {
                c.field(t.value);
            }),
            l.forEach(t => this._applyFields(c, t.fields, n)),
            o
                .map(t => Helpers.getFieldsFromOperationString(t, r, []))
                .reduce((t, e) => t.concat(e))
                .forEach(t => {
                    const e = `${i}.${t.value}`;
                    u.includes(e) || c.field(e);
                }),
            l.forEach(t => c.join(t.qb, t.table, t.on)),
            { qb: c, table: i, fields: [...u, ...h], on: s }
        );
    }
    process(t, e, r, n) {
        const i = [],
            o = e.nodes
                .filter(t => t.type === Nodes.JOIN)
                .map(e => this._processJoin(t, e, r, i));
        return (
            o.forEach(t => this._applyFields(n, t.fields, i)),
            o.forEach(t => n.join(t.qb, t.table, t.on)),
            n
        );
    }
}
var JoinProcessor$1 = t => new JoinProcessor(t);
class QueryProcessor$1 extends Processor {
    _processTable(t, e, r) {
        const { name: n, params: i, nodes: o } = e,
            a = i.map(e => Helpers.buildOperationString(t, null, e, r));
        let s = this._qb.select().from(n);
        return (
            o.filter(t => t.type === Nodes.FIELD).forEach(t => {
                t.alias ? s.field(t.value, t.alias) : s.field(t.value);
            }),
            (s = JoinProcessor$1(this._qb).process(t, e, r, s)),
            0 < a.length &&
                (s = s.where(
                    a.map(t => t.text).join(' AND '),
                    ...a.map(t => t.variables).reduce((t, e) => t.concat(e))
                )),
            s
        );
    }
    process(t, e, r) {
        let n = this._qb;
        const { variables: i, nodes: o } = e;
        return (
            i.forEach(t => {
                if (!r || !r.hasOwnProperty(t))
                    throw new Error(`Missing required variable ${t}`);
            }),
            o.forEach(e => {
                switch (e.type) {
                    case Nodes.TABLE:
                        n = this._processTable(t, e, r);
                }
            }),
            n
        );
    }
}
var QueryProcessor$2 = t => new QueryProcessor$1(QueryBuilder(t));
const dql = t =>
    function() {
        const e = Array.from(arguments),
            r = e[0];
        let n = 'string' == typeof r ? r : r[0];
        for (let t = 1; t < e.length; t++) (n += e[t]), (n += r[t]);
        const i = _parser.parse(n);
        return function() {
            let e = null,
                r = {},
                n = !1;
            switch (arguments.length) {
                case 1:
                    r = arguments[0];
                    break;
                case 2:
                    'string' == typeof arguments[0]
                        ? ((e = arguments[0]), (r = arguments[1]))
                        : ((r = arguments[0]), (n = arguments[1]));
                    break;
                case 3:
                    (e = arguments[0]), (r = arguments[1]), (n = arguments[2]);
            }
            const o =
                null === e ? i.length - 1 : i.findIndex(t => t.name === e);
            if (null !== e && 0 > o)
                throw new Error(`Could not find document \`${e}\``);
            const a = i[o];
            let s = null;
            switch (a.type) {
                case Nodes.QUERY:
                    s = QueryProcessor$2(t).process(i, a, r);
                    break;
                default:
                    throw new Error('Unrecognized document type');
            }
            if (null !== s) return n ? s.toString() : s.toParam();
            throw new Error('An error occurred processing the document');
        };
    };
var index = {
    postgres: dql('postgres'),
    mysql: dql('mysql'),
    mssql: dql('mssql')
};
module.exports = index;
