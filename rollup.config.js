import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
export default {input:"src/card.ts", output:{file:"dist/lovelace-roborock.js",format:"es",sourcemap:true}, plugins:[resolve({browser:true}),typescript()]};
