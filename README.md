# Centrail agent plugins

The marketplace Centrail's coding-agent plugins install from. It holds only what
those tools load: the marketplace file, each plugin's manifests and hooks, and the
`centrail` CLI bundle the hook runs.

```sh
npx centrail@latest connect
```

`connect` pairs the machine, adds this marketplace at its `release` branch and installs
the plugin, with Claude Code's auto-update on. By hand:

```sh
claude plugin marketplace add centrail-org/agent-plugins#release
claude plugin install centrail@centrail
```

## How it is built

`plugins/centrail/scripts/centrail.mjs` is the `dist/index.js` of the `centrail` npm
package at the same version, byte for byte. [`scripts/sync-from-npm.mjs`](scripts/sync-from-npm.mjs)
fetches the version npm tags `latest`, checks the tarball against npm's recorded
integrity, copies the bundle and the release's licence in and bumps the manifests. The
[sync workflow](.github/workflows/sync-from-npm.yml) runs it on a schedule, validates
the marketplace and moves `release` to the result. Nothing here is edited by hand
between releases.

What the CLI uploads, and how to inspect it before it leaves your machine
(`centrail sync --dry-run`, `centrail inspect`), is in the
[Centrail docs](https://centrail.org/docs). The wire format is public in
[centrail-contract](https://github.com/centrail-org/centrail-contract).

Each plugin is licensed as its release says: `LICENSE.md` once a release ships the Centrail CLI
License Agreement, and Apache-2.0 (`LICENSE`) for the versions published under it.
