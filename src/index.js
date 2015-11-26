import postcss                   from 'postcss';
import Core                      from 'css-modules-loader-core';
import generateScopedName        from './generateScopedName';
import getExports                from './getExports';
import addGlobalComments         from './addGlobalComments';
import cleanImportAndExportRules from './cleanImportAndExportRules';
import cleanUnusedClasses        from './cleanUnusedClasses';
import importModules             from './importModules';
import applyImports              from './applyImports';


export default postcss.plugin('postcss-modules', (opts = {}) => {
  const scope = Core.scope;
  scope.generateScopedName = opts.generateScopedName || generateScopedName;

  return postcss([
    addGlobalComments,
    Core.localByDefault(),
    Core.extractImports(),
    Core.scope(),
    importModules,
    applyImports,
    css => {
      if (opts.getJSON) opts.getJSON(getExports(css));
    },
    cleanUnusedClasses,
    cleanImportAndExportRules,
  ]);
});
