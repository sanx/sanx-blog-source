var Metalsmith = require('metalsmith');
var dateInFilename = require('metalsmith-date-in-filename');
var drafts = require('metalsmith-drafts');
var markdown = require('metalsmith-markdown');
var collections = require('metalsmith-collections');
var permalinks = require('metalsmith-permalinks');
var templates = require('metalsmith-templates');
var paginate = require('metalsmith-paginate');
var feed = require('metalsmith-feed');
var metallic = require('metalsmith-metallic');
var _ = require('lodash');
var util = require('util');

Metalsmith(__dirname)
    .source('./_posts')
    .destination('./_site')
    .use(metallic())
    .use(dateInFilename(true))
    .use(collections({
        posts: {
            pattern: '????-??-??-*.md',
            sortBy: 'date',
            reverse: true
        }
    }))
    .use(function (files, metalsmith, done) {
        _.forEach(files, function (fileMeta, fileName) {
            console.log("file: " + fileName);
        });
        console.log('hier');
        var metadata = metalsmith.metadata(),
            collectionName = Object.keys(metadata.collections)[0],
            collection = metadata.collections[collectionName];

        metadata.site = {
            url: 'http://www.gerardomoad.com/',
            title: "Gerardo's musings",
            tagline: "(not) just another blog, hopefully, this time around",
            author: "Gerardo Moad"
        };

        _.forEach(collection, function (postMeta, idx) {
            if (!postMeta.template) {
                postMeta.template = 'post.html';
            }
            postMeta.rawHtml = postMeta.contents.toString();
        });
        done();
    })
    .use(drafts())
    .use(paginate({
        perPage: 5,
        path: "index"
    }))
    .use(markdown())
    .use(permalinks({
        pattern: "posts/:title",
        relative: false
        //collection: "posts"
    }))
    .use(function (files, metalsmith, done) {
            var collectionName = Object.keys(metalsmith.metadata().collections)[0],
                collection = metalsmith.metadata().collections[collectionName],
                paginationFilesMeta = _.filter(files, {paginate: collectionName});
            console.log("collectionName: " + util.inspect(collectionName));
            console.log("collection: " + util.inspect(collection));
            console.log("paginationFilesMeta: " + util.inspect(paginationFilesMeta));
            _.forEach(collection, function (postMeta) {
                // set default template for files in collection
                if (!postMeta.template) {
                    postMeta.template = 'post.html';
                }
                postMeta.rawHtml = postMeta.contents.toString();
            });
            _.forEach(paginationFilesMeta, function (fileMeta) {
                // add `pagePosts` content to `pagination` virtual pages for easy access on templates
                fileMeta.pagePosts = [];
                for (var i = fileMeta.pagination.start; i <= fileMeta.pagination.end; i++) {
                    console.log("on page: " + i);
                    console.log("page: " + util.inspect(collection[i]));
                    if (undefined === collection[i]) {
                        continue;
                    }
                    fileMeta.pagePosts.push(collection[i]);
                }
            });
            _.forEach(files, function (fileMeta, fileName) {
                // enrich all files' metadata with their own filenames
                fileMeta.fileName = fileName;
            });
            done();
    })
    .use(feed({
        collection: "posts"
    }))
    .use(templates({
        engine: "swig",
        directory: "_layouts"
    }))
    .use(function (files, metalsmith, done) {
        console.log("meta before build: " + util.inspect(metalsmith.metadata()));
        console.log("files before build: " + util.inspect(files));
        done();
    })
    .build(function (err) {
        if (err) {
            throw err;
        }
    });

console.log('hi');

var oldjson = {
  "source": "./_posts",
  "destination": "./_site",
  "metadata": {
    "site": {
        "blog_name": "My Jekyll-Powered Blog",
        "blog_tagline": "My second, super-cool, Jekyll-powered blog."
    }
  },
  "plugins": {
    "metalsmith-date-in-filename": {"override": true},
    "metalsmith-drafts": {},
    "metalsmith-markdown": {},
    "metalsmith-collections": {
      "posts": {
        "pattern": "flslfjdf*.md",
        "sortBy": "date",
        "reverse": true
      }
    },
    "metalsmith-permalinks": {
      "pattern": ":title"
    },
    "metalsmith-templates": {
      "engine": "swig",
      "directory": "_layouts"
    }
  }
};
