var gulp = require('gulp');
var args = require('yargs').argv;
var colors = require('colors');
var exec = require('child_process').exec;

var dotnetMappings = {
  'resource': {
    'dir': 'src/ResourceManagement/Resource/Generated/',
    'source': 'arm-resource/resources/2014-04-01-preview/resources.json'
  },
  'resource.subscription': {
    'dir': 'src/ResourceManagement/Resource/Generated/',
    'source': 'arm-resource/subscriptions/2014-04-01-preview/subscriptions.json'
  },
  'resource.authorization': {
    'dir': 'src/ResourceManagement/Resource/Generated/',
    'source': 'arm-resource/authorization/2015-01-01/authorization.json'
  },
  'resource.feature': {
    'dir': 'src/ResourceManagement/Resource/Generated/',
    'source': 'arm-resource/features/2014-08-01-preview/features.json'
  }
};

gulp.task('default', function() {
  console.log("Usage: gulp codegen [--spec-root <swagger specs root>] [--project <project name>]\n");
  console.log("--spec-root");
  console.log("\tRoot location of Swagger API specs, default value is \"https://raw.githubusercontent.com/Azure/azure-rest-api-specs/master\"");
  console.log("--project\n\tProject to regenerate, default is all. List of available project names:");
  Object.keys(dotnetMappings).forEach(function(i) {
      console.log('\t' + i.magenta);
  });
});

var specRoot = args['spec-root'] || "https://raw.githubusercontent.com/Azure/azure-rest-api-specs/master";
var project = args['project'];
var autoRestVersion = '0.14.0-Nightly20160112';
var autoRestExe = 'mono ../../packages/autorest.' + autoRestVersion + '/tools/AutoRest.exe';
var nugetSource = 'https://www.myget.org/F/autorest/api/v2';

gulp.task('codegen', function(cb) {
  exec('mono ../../autoresttools/NuGet.exe install autorest -Source ' + nugetSource + ' -Version ' + autoRestVersion + ' -o packages', function(err, stdout, stderr) {
    console.log(stdout);
    console.error(stderr);
    if (project === undefined) {
      Object.keys(dotnetMappings).forEach(function(proj) {
        codegen(proj, cb);
      });
    } else {
      if (dotnetMappings[project] === undefined) {
        console.error('Invalid project name "' + project + '"!');
        process.exit(1);
      }
      codegen(project, cb); 
    }
  });
});

var codegen = function(project, cb) {
  console.log('Generating "' + project + '" from spec file ' + specRoot + '/' + dotnetMappings[project].source);
  cmd = autoRestExe + ' -Modeler Swagger -CodeGenerator Azure.CSharp' + ' -Input ' + specRoot + '/' + dotnetMappings[project].source + 
    ' -outputDirectory ' + dotnetMappings[project].dir + ' -Namespace Microsoft.Azure.ResourceManager' + ' -Header MICROSOFT_MIT';
  if (dotnetMappings[project].ft !== null && dotnetMappings[project].ft !== undefined) cmd += ' -FT ' + dotnetMappings[project].ft;
  if (dotnetMappings[project].args !== undefined) {
    cmd = cmd + ' ' + args;
  }
  exec(cmd, function(err, stdout, stderr) {
    console.log(stdout);
    console.error(stderr);
  });
};
