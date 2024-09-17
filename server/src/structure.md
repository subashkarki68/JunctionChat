Structure

Here's the recommended file structure for Elysia if you don't strictly prefer a specific convention:

    src - Any file that associate with development of Elysia server.
        index.ts - Entry point for your Elysia server, ideal place for setting global plugin
        setup.ts - Composed of various plugins to be used as a Service Locator
        controllers - Instances which encapsulate multiple endpoints
        libs - Utility functions
        models - Data Type Objects (DTOs) for Elysia instance
        types - Shared TypeScript type if needed
    test - Test file for Elysia server