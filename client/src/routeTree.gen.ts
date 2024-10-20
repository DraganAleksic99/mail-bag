/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as MailboxesIndexImport } from './routes/mailboxes/index'
import { Route as MailboxesMailboxIdImport } from './routes/mailboxes/$mailboxId'
import { Route as MessagesComposeIndexImport } from './routes/messages/compose/index'
import { Route as MessagesMailboxEmailIdImport } from './routes/messages/$mailbox/$emailId'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const MailboxesIndexRoute = MailboxesIndexImport.update({
  path: '/mailboxes/',
  getParentRoute: () => rootRoute,
} as any)

const MailboxesMailboxIdRoute = MailboxesMailboxIdImport.update({
  path: '/mailboxes/$mailboxId',
  getParentRoute: () => rootRoute,
} as any)

const MessagesComposeIndexRoute = MessagesComposeIndexImport.update({
  path: '/messages/compose/',
  getParentRoute: () => rootRoute,
} as any)

const MessagesMailboxEmailIdRoute = MessagesMailboxEmailIdImport.update({
  path: '/messages/$mailbox/$emailId',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/mailboxes/$mailboxId': {
      id: '/mailboxes/$mailboxId'
      path: '/mailboxes/$mailboxId'
      fullPath: '/mailboxes/$mailboxId'
      preLoaderRoute: typeof MailboxesMailboxIdImport
      parentRoute: typeof rootRoute
    }
    '/mailboxes/': {
      id: '/mailboxes/'
      path: '/mailboxes'
      fullPath: '/mailboxes'
      preLoaderRoute: typeof MailboxesIndexImport
      parentRoute: typeof rootRoute
    }
    '/messages/$mailbox/$emailId': {
      id: '/messages/$mailbox/$emailId'
      path: '/messages/$mailbox/$emailId'
      fullPath: '/messages/$mailbox/$emailId'
      preLoaderRoute: typeof MessagesMailboxEmailIdImport
      parentRoute: typeof rootRoute
    }
    '/messages/compose/': {
      id: '/messages/compose/'
      path: '/messages/compose'
      fullPath: '/messages/compose'
      preLoaderRoute: typeof MessagesComposeIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  MailboxesMailboxIdRoute,
  MailboxesIndexRoute,
  MessagesMailboxEmailIdRoute,
  MessagesComposeIndexRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/mailboxes/$mailboxId",
        "/mailboxes/",
        "/messages/$mailbox/$emailId",
        "/messages/compose/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/mailboxes/$mailboxId": {
      "filePath": "mailboxes/$mailboxId.tsx"
    },
    "/mailboxes/": {
      "filePath": "mailboxes/index.tsx"
    },
    "/messages/$mailbox/$emailId": {
      "filePath": "messages/$mailbox/$emailId.tsx"
    },
    "/messages/compose/": {
      "filePath": "messages/compose/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
