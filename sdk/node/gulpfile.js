var gulp = require('gulp');
var args = require('yargs').argv;
var colors = require('colors');
var exec = require('child_process').exec;

var mappings = {
  'resource': {
    'dir': 'resourceManagement/lib/resource',
    'source': 'arm-resources/resources/2014-04-01-preview/swagger/resources.json'
  },
  'resource.subscription': {
    'dir': 'resourceManagement/lib/subscription',
    'source': 'arm-resources/subscriptions/2014-04-01-preview/swagger/subscriptions.json'
  },
  'resource.authorization': {
    'dir': 'resourceManagement/lib/authorization',
    'source': 'arm-resources/authorization/2015-01-01/swagger/authorization.json'
  },
  'resource.feature': {
    'dir': 'resourceManagement/lib/feature',
    'source': 'arm-resources/features/2014-08-01-preview/swagger/features.json'
  }
};

gulp.task('default', function() {
  console.log("Usage: gulp codegen [--spec-root <swagger specs root>] [--project <project name>]\n");
  console.log("--spec-root");
  console.log("\tRoot location of Swagger API specs, default value is \"https://raw.githubusercontent.com/Azure/azure-rest-api-specs/master\"");
  console.log("--project\n\tProject to regenerate, default is all. List of available project names:");
  Object.keys(mappings).forEach(function(i) {
      console.log('\t' + i.magenta);
  });
});

var specRoot = args['spec-root'] || "https://raw.githubusercontent.com/Azure/azure-rest-api-specs/master";
var project = args['project'];
var autoRestVersion = '0.14.0-Nightly20160112';
var autoRestExe = 'packages/autorest.' + autoRestVersion + '/tools/AutoRest.exe';
var nugetSource = 'https://www.myget.org/F/autorest/api/v2';

gulp.task('codegen', function(cb) {
  exec('tools/nuget.exe install autorest -Source ' + nugetSource + ' -Version ' + autoRestVersion + ' -o packages', function(err, stdout, stderr) {
    console.log(stdout);
    console.error(stderr);
    if (project === undefined) {
      Object.keys(mappings).forEach(function(proj) {
        codegen(proj, cb);
      });
    } else {
      if (mappings[project] === undefined) {
        console.error('Invalid project name "' + project + '"!');
        process.exit(1);
      }
      codegen(project, cb); 
    }
  });
});

var codegen = function(project, cb) {
  console.log('Generating "' + project + '" from spec file ' + specRoot + '/' + mappings[project].source);
  cmd = autoRestExe + ' -Modeler Swagger -CodeGenerator Azure.NodeJS' + ' -Input ' + specRoot + '/' + mappings[project].source + 
    ' -outputDirectory lib/services/' + mappings[project].dir + ' -Header MICROSOFT_MIT';
  if (mappings[project].ft !== null && mappings[project].ft !== undefined) cmd += ' -FT ' + mappings[project].ft;
  if (mappings[project].args !== undefined) {
    cmd = cmd + ' ' + args;
  }
  exec(cmd, function(err, stdout, stderr) {
    console.log(stdout);
    console.error(stderr);
  });
};
