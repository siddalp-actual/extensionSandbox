// ---
// jupyter:
//   jupytext:
//     formats: notebook///ipynb,extensionSandbox///js:light
//     text_representation:
//       extension: .js
//       format_name: light
//       format_version: '1.5'
//       jupytext_version: 1.9.1
//   kernelspec:
//     display_name: Javascript (Node.js)
//     language: javascript
//     name: javascript
// ---

// # Extending JupyterLab
//
// My objective here is to be able to get at the underlying notebook model.  Firstly so that I can get hold of the `modification time` of the file and secondly to be able to test a patch to this model to fix up the issue with splitting jupytext script files into a separate directory with a link.
//
// I started with the [JupyterLab extension tutorial](https://jupyterlab.readthedocs.io/en/latest/extension/extension_tutorial.html#extension-tutorial), but it dives off into the land of typescript.  Not wanting to pollute my fledging skills in javascript and node, I decided to go with javascript instead, which involved remoing some typing, and not using jlpm commands.
//
// ### Aside
//
// I also wanted to version control this notebook.  So I've modified the docuement properties to 
// ```json
// "jupytext": {
//         "formats": "notebook///ipynb,extensionSandbox///js:light",
//         "text_representation": {
//             "extension": ".js",
//             "format_name": "light",
//             "format_version": "1.5",
//             "jupytext_version": "1.9.1"
//         }
//     },
// ```
// Which has the effect of leaving the `.js` file under my `extensionSandbox` repository, but moves the `.ipynb` out into a separate `notebook` tree which is not shadowed to github.
//
// I'm still not sure how to make this happen for a new notebook.  I have a `.jupytext.yaml` in the repository folder, with the same rule, but that isn't being picked up.

// ## Take 1
//
// The `cookiecutter` script, pulls the source tree out of github and does renaming to your project name. No real magic there.
//
// The guts of this code are in `lib/plugin.js` which has a default export of a description of the extension and the `activate` code which that description defines.
//
// This tutorial is quite nice as it leads you gently into the process of building and testing an extension.  However, the extension itself is really a new application which displays a picture pulled from the web.  I want to get at existing docuements.
//
// ## Take 2
//
// I started reading about [notebooks](https://jupyterlab.readthedocs.io/en/latest/extension/notebook.html) and this section quickly gets into how they can be extended.  Again, the cookiecutter scheme is used, so I progressed from what I already had.  
//
// I have now managed to add a button which will run all cells in a notebook (actually useful for some of mine), however, I'm not getting the botton displayed, even though a space for it is being inserted in the list of buttons at the top of the page.  I think this is something to do with css and styles.  
// > checked other branches and the .ts version of the cookiecutter repository but none of them has anything in the css file
