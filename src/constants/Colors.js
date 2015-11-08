let Colors = require('material-ui/lib/styles/colors');

let palette = [
    Colors.indigo500,
    Colors.blue500,
    Colors.lightBlue500,
    Colors.cyan500,
    Colors.teal500,
    Colors.green500,
    Colors.lightGreen500,
    Colors.lime500,
    Colors.yellow500,
    Colors.amber500,
    Colors.orange500,
    Colors.deepOrange500,
    Colors.brown500,
    Colors.blueGrey500,
    Colors.grey500,
    Colors.red500,
    Colors.pink500,
    Colors.purple500,
    Colors.deepPurple500
];

let cache = {};
let currentIdx = 0;

export default {
    getColor(key) {
        if (!cache[key]) {
            cache[key] = palette[(currentIdx++) % palette.length];
        }
        return cache[key];
    }
}