# spo-rename-installation-v-2

## Summary

Simple app that allows non-technical users without administrator rights to rename SharePoint Online sites. It provides functionality to rename multiple sites in one request with clear feedback. 

Build with the SPFx framework (React, TypeScript) and dependend on the endpoints provided by the SPO Provisioning Engine.
## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.11-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)

## Prerequisites

This version of SPFx has a hard requirement on Node 10 and Gulp 3.9.1

## Version history

Version|Date|Comments
-------|----|--------
0.9.3|May 2, 2023|Updated endpoints to use v4 of SPO Provisioning Engine
0.9.2|April 1, 2021|Updated packages
0.9.1|March 10, 2021|Updated labels
0.9.0|January 29, 2021|Initial production release

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - **npm install**
  - **gulp serve**

To create a package for production:

1. gulp clean
1. gulp bundle --ship
1. gulp build
1. gulp package-solution --ship

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
