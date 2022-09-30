let d = {a: 'A', b: 'B', c: {d: 'D', e: 'E'}}
const {a, b, c={d, e}} = d;
console.log(a, b, d, e)