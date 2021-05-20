// import * as Sentry from "@sentry/react";
// import { Integrations } from "@sentry/tracing";
function init() {
//     Sentry.init({
//   dsn: "https://c5d15c5e2b054109a36e1e21510dd8a2@o555090.ingest.sentry.io/5684510",
//   integrations: [new Integrations.BrowserTracing()],

//   // Set tracesSampleRate to 1.0 to capture 100%
//   // of transactions for performance monitoring.
//   // We recommend adjusting this value in production
//   tracesSampleRate: 1.0,
// });
}
function log(error) {
      
  console.log("Your error is ",error)

}
export default{init,log}