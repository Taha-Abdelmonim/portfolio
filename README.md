## using

cd this folder
npm install or yarn install
npm run dev or prod

===================================================================
entry: {
index: path.resolve(**dirname, "../", "src/js/main.js"),
about: path.resolve(**dirname, "../", "src/js/pages/about.js"),
},
output: {
path: path.resolve(\_\_dirname, "../", "dist"),
filename: "js/[name].js",
assetModuleFilename: "assets/[name][ext]",
clean: true,
},

===========================
let btn = document.getElementById("btn");
btn.addEventListener("click", () => {
import(/_ webpackChunkName: "pref" _/ "./pages/about").then((btn) => {
btn.showAlert();
});
});
