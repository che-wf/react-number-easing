
// =========================
// Requires and Config
// =========================
const gulp = require("gulp");
const assign = require("lodash.assign");
const babelify = require("babelify");
const browserify = require("browserify");
const gutil = require("gulp-util");
const less = require("gulp-less");
const livereload = require("gulp-livereload");
const source = require("vinyl-source-stream");
const watchify = require("watchify");

const customOpts = {
  entries: ["./src/js/app.jsx"],
  debug: true,
};
const opts = assign({}, watchify.args, customOpts);

// =========================
// Build (one-off, non-watch)
// =========================
const browserifyBuild = browserify(customOpts).transform(babelify);

function buildJs() {
  return browserifyBuild
    .bundle()
    .on("error", logBrowserifyError)
    .pipe(source("app.js"))
    .pipe(gulp.dest("./dist"));
}

gulp.task("build-js", buildJs);

// =========================
// Watch (dev mode)
// =========================
const browserifyInstance = browserify(opts).transform(babelify);
const b = watchify(browserifyInstance);

function bundle() {
  return (
    b
      .bundle()
      .on("error", logBrowserifyError)
      .pipe(source("app.js"))
      .pipe(gulp.dest("./dist"))
      .pipe(livereload())
  );
}

b.on("update", bundle);
b.on("log", console.log);

gulp.task("js", bundle);

// =========================
// LESS tasks
// =========================
gulp.task("less", () =>
  gulp
    .src("./src/styles/main.less")
    .pipe(less())
    .on("error", function (err) {
      console.log("LESS ERROR", err);
      this.emit("end");
    })
    .pipe(gulp.dest("./dist"))
    .pipe(livereload())
);

gulp.task("lessWatch", function () {
  livereload.listen();
  gulp.watch("src/styles/**/*.less", gulp.series("less"));
});

// =========================
// Error Handling
// =========================
function logBrowserifyError(err) {
  console.log("\n");
  console.log(gutil.colors.yellow("BROWSERIFY ERROR"));
  if (err.filename) {
    const path = err.filename.split("\\");
    let errLoc = "";
    if ("loc" in err) {
      errLoc = ` (${err.loc.line}:${err.loc.column})`;
    }
    path.splice(0, 3);
    console.log(gutil.colors.yellow("File:", path.join("/") + errLoc));
    if ("codeFrame" in err) {
      console.log(gutil.colors.yellow("Error:\n", err.codeFrame));
    }
    this.emit("end");
  } else {
    console.log(err);
  }
}

// =========================
// Default Task
// =========================
gulp.task("default", gulp.parallel("js", "lessWatch"));

// Gulp tasks
gulp.task("js", bundle);
gulp.task("less", () =>
  gulp
    .src("./src/styles/main.less")
    .pipe(less())
    .on("error", function (err) {
      console.log("LESS ERROR", err);
      this.emit("end");
    })
    .pipe(gulp.dest("./dist"))
    .pipe(livereload())
);

gulp.task("lessWatch", function () {
  livereload.listen();
  gulp.watch("src/styles/**/*.less", gulp.series("less"));
});

gulp.task("default", gulp.parallel("js", "lessWatch"));