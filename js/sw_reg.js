navigator.serviceWorker.register('./sw.js').then(function (reg) {
  console.log('Service worker registered.');
   if (!navigator.serviceWorker.controller) {
        return;
    }
});