import zip from "bestzip";

zip({
  source: 'build/*',
  destination: `./build/build-v${process.env.npm_package_version}.zip`
}).then(function() {
  console.log('all done!');
}).catch(function(err) {
  console.error(err.stack);
  process.exit(1);
});