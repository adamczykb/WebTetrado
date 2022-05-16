/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

import { clientsClaim } from 'workbox-core';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';

declare const self: ServiceWorkerGlobalScope;

clientsClaim();

// Precache all of the assets generated by your build process.
// Their URLs are injected into the manifest variable below.
// This variable must be present somewhere in your service worker file,
// even if you decide not to use precaching. See https://cra.link/PWA
precacheAndRoute(self.__WB_MANIFEST);

function receivePushNotification(event:any) {
  console.log("[Service Worker] Push Received.");

  const { image, tag, url, title, text } = event.data.json();

  const options = {
    data: url,
    body: text,
    icon: image,
    vibrate: [200, 100, 200],
    tag: tag,
    image: image,
    badge: "https://webtetrado.cs.put.poznan.pl/static/favicon.ico",
    actions: [{ action: "Detail", title: "View", icon: url }]
  };
  event.waitUntil(self.registration.showNotification(title, options));
}

function openPushNotification(event: { notification: { data: string | URL; close: () => void; }; waitUntil: (arg0: Promise<WindowClient | null>) => void; }) {
  console.log("[Service Worker] Notification click Received.", event.notification.data);
  
  event.notification.close();
  event.waitUntil(self.clients.openWindow(event.notification.data));
}

self.addEventListener("push", receivePushNotification);
self.addEventListener("notificationclick", openPushNotification);




