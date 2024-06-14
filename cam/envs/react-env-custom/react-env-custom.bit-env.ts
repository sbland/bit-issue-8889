/**
 * this env uses bitdev.react/react-env
 * to inspect its config @see https://bit.cloud/bitdev/react/react-env
 */
import { ReactEnv } from '@bitdev/react.react-env';
import typescript from 'typescript';
import { TypeScriptExtractor } from '@teambit/typescript';
import { SchemaExtractor } from '@teambit/schema';
import { Compiler } from '@teambit/compiler';
import { ReactPreview } from '@teambit/preview.react-preview';
import { EnvHandler } from '@teambit/envs';
import { Pipeline } from '@teambit/builder';
import { ESLint as ESLintLib } from 'eslint';
import {
  TypescriptCompiler,
  resolveTypes,
  TypescriptTask,
} from '@teambit/typescript.typescript-compiler';
import { ESLintLinter, EslintTask } from '@teambit/defender.eslint-linter';
// import {  JestTask } from '@teambit/defender.jest-tester';
import { VitestTester, VitestTask } from '@teambit/vite.vitest-tester';
import { PrettierFormatter } from '@teambit/defender.prettier-formatter';
import { Tester } from '@teambit/tester';
import { Preview } from '@teambit/preview';
import hostDependencies from './preview/host-dependencies.js';
import { webpackTransformer } from './config/webpack.config.js';

export class ReactEnvCustom extends ReactEnv {
  /**
   * name of the environment. used for friendly mentions across bit.
   */
  name = 'react-env-custom';

   /**
   * create an instance of a Bit Component Compiler.
   * Learn more: https://bit.dev/reference/compiling/set-up-compiler
   */
  compiler(): EnvHandler<Compiler> {
    return TypescriptCompiler.from({
      // esm: true, // Possibly causing some issues with websockets
      tsconfig: this.tsconfigPath,
      types: resolveTypes(__dirname, [this.tsTypesPath]),
      typescript,
    });
  }

  /**
   * returns an instance of the default TypeScript extractor.
   * used by default for type inference for both JS and TS.
   */
  schemaExtractor(): EnvHandler<SchemaExtractor> {
    return TypeScriptExtractor.from({
      tsconfig: this.tsconfigPath,
    });
  }

  /**
   * create an instance of the Bit Tester plugin.
   * learn more: https://bit.dev/reference/testing/set-up-tester
   */
  // Vitetest not working
  tester(): EnvHandler<Tester> {
    return VitestTester.from({
      config: require.resolve('./config/vitest.config.mjs'),
    });
  }
  // tester(): EnvHandler<Tester> {
  //   return JestTester.from({
  //     config: require.resolve('./config/jest.config.js'),
  //   });
  // }

  /**
   * add a Bit Linter plugin.
   * learn more: https://bit.dev/reference/testing/set-up-tester
   */
  linter() {
    return ESLintLinter.from({
      tsconfig: this.tsconfigPath,
      eslint: ESLintLib,
      configPath: this.eslintConfigPath,
      pluginsPath: __dirname,
      extensions: this.eslintExtensions,
    });
  }

  /**
   * create a formatter instance.
   * learn more: https://bit.dev/reference/formatting/set-up-formatter
   */
  formatter() {
    return PrettierFormatter.from({
      configPath: require.resolve('./config/prettier.config.js'),
    });
  }

  /**
   * create an instance for Bit Preview.
   */
  preview(): EnvHandler<Preview> {
    return ReactPreview.from({
      transformers: [
        webpackTransformer,
      ],
      mounter: this.previewMounter,
      hostDependencies,
    });
  }

  /**
   * Add your build pipeline.
   * learn more: https://bit.dev/docs/react-env/build-pipelines
   */
  build() {
    return Pipeline.from([
      TypescriptTask.from({
        tsconfig: this.tsconfigPath,
        types: resolveTypes(__dirname, [this.tsTypesPath]),
        typescript,
      }),
      EslintTask.from({
        eslint: ESLintLib,
        tsconfig: this.tsconfigPath,
        configPath: this.eslintConfigPath,
        pluginsPath: __dirname,
        extensions: this.eslintExtensions,
      }),
      VitestTask.from({
        config: require.resolve('./config/vitest.config.mjs'),
      }),
      // JestTask.from({
      //   config: this.jestConfigPath,
      // }),
    ]);
  }

  protected tsconfigPath = require.resolve('./config/tsconfig.json');

  protected tsTypesPath = './types';

  protected jestConfigPath = require.resolve('./config/jest.config');

  protected eslintConfigPath = require.resolve('./config/eslintrc.js');

  protected eslintExtensions = ['.ts', '.tsx', '.js', '.jsx', '.mjs'];

  protected prettierConfigPath = require.resolve('./config/prettier.config.js');

  protected prettierExtensions = [
    '.js',
    '.jsx',
    '.ts',
    '.tsx',
    '.mjs',
    '.cjs',
    '.json',
    '.css',
    '.scss',
    '.md',
    '.mdx',
    '.html',
    '.yml',
    '.yaml',
  ];

  protected previewMounter = require.resolve('./preview/mounter');
}

export default new ReactEnvCustom();
