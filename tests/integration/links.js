// /* eslint-env mocha */
// import { assert } from 'chai';
// import { uniq } from 'lodash';
// import URI from 'urijs';
// import request from 'request';
// import events from 'utils/eventsDirectoryToSlideArray';

// describe('Event Links', function() {
//   describe('are valid', function() {
//     const maxRedirects = 20;
//     const timeout = 10000;
//     this.timeout(timeout * 4);
//     this.slow(1200);

//     const eventsString = JSON.stringify(events, null, ' ');
//     const urls = [];
//     URI.withinString(eventsString, url => urls.push(url.split('\\">')[0]));
//     uniq(urls).forEach(url => {
//       it(url, function(done) {
//         const self = this;
//         function tryRequest(uri, tries = 0) {
//           request
//             .get(
//               { uri, timeout, maxRedirects, jar: true },
//               (error, response) => {
//                 if (error && tries < 4) {
//                   // Retry request if failed (usually due to a timeout)
//                   return tryRequest(uri, ++tries);
//                 }
//                 if (response.statusCode === 403) {
//                   self.skip();
//                 }
//                 assert.isNull(error);
//                 assert.equal(response.statusCode, 200);
//                 done();
//               }
//             )
//             .setMaxListeners(maxRedirects);
//         }
//         tryRequest(url);
//       });
//     });
//   });
// });
