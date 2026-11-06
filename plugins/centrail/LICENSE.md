# Centrail CLI License Agreement

*Draft pending legal review. It takes effect for the first release that ships it, on that
release's date. Bracketed items are still to be filled in.*

This agreement is between you and [Centrail legal entity] ("Centrail", "we"). It covers the
`centrail` command-line tool, the Centrail plugins and hooks for coding agents, and the code
bundled into them, in the versions that ship with this agreement (the "Software"). Your use
of the Centrail service is governed by the [Terms](https://centrail.org/docs/terms) and the
[Privacy policy](https://centrail.org/docs/privacy). If you use the Software for an
organization, you accept this agreement for that organization and confirm you may do so.

Versions released before this agreement were published under the Apache License 2.0 and
remain under it. This agreement applies to later versions.

## What you may do

Centrail grants you a limited, non-exclusive, non-transferable, non-sublicensable, revocable
licence to install and run the Software on devices you own or control, only to use the
Centrail service. An organization may install it on devices it manages for its own members.
You may keep copies needed to install, run and back up the Software.

## What you may not do

Except as this agreement allows, or where applicable law gives you a right that cannot be
waived, you may not:

- copy, modify, translate or make derivative works of the Software;
- reverse engineer, decompile, disassemble or deobfuscate it, or try to derive its source code,
  models or methods;
- distribute, sell, rent, lend, sublicense or host the Software, or make it available to others
  as a service;
- use the Software, or anything learned from it, to build, train or improve a competing
  product or service;
- use the Software with any service other than Centrail;
- get around its device limits, version checks, access controls or security measures; or
- remove or change its notices.

## What stays open to you

Nothing in this agreement restricts you from inspecting what the Software sends about you.

- The wire format and its allowlist are public in
  [centrail-contract](https://github.com/centrail-org/centrail-contract), under that
  repository's own licence.
- `centrail sync --dry-run` shows every payload without sending it, `centrail inspect` shows
  what was sent, and each payload sent is logged locally in `sent.jsonl` in the Centrail
  config folder.
- Your own exclusions (`centrail exclude`, scope settings, turning a source off) are always
  honoured on your machine, except where an organization's device management sets them on
  devices it manages.

## Your data

The Software reads your coding agents' local usage logs and Git metadata on your device. It
sends only the allowlisted fields the contract describes, never your prompts, responses,
source code or diffs. The usage it records is yours. How Centrail handles it is set out in the
Privacy policy and, for organizations, in any data processing agreement with Centrail.

## Ownership

The Software is licensed, not sold. Centrail and its licensors keep all rights in it not
expressly granted here, including all intellectual property rights.

## Updates

Centrail may release updates. If you turned on automatic updates for a plugin, your coding
agent installs them. The service may stop accepting data from outdated versions. Each version
is governed by the agreement it ships with.

## Ending this agreement

This agreement lasts until it ends. It ends automatically if you breach it, and Centrail may
end it if your account or your organization's access ends. When it ends, stop using the
Software and remove it (`centrail uninstall` removes its plugins and hooks). The sections on
restrictions, ownership, warranties, liability and governing law survive.

## No warranty

The Software is provided "as is" and "as available", without warranties of any kind, express
or implied, including merchantability, fitness for a particular purpose and non-infringement,
to the maximum extent the law allows.

## Liability

To the maximum extent the law allows, Centrail is not liable for indirect, incidental,
special, consequential or punitive damages, or for lost profits, data or goodwill. Its total
liability under this agreement is limited to the amount you paid for the Centrail service in
the twelve months before the claim, or $0 on the free plan. Some jurisdictions do not allow
some of these limits, so they may not all apply to you.

## Governing law

This agreement is governed by the laws of [jurisdiction], without regard to its conflict-of-law
rules. Disputes are resolved in the courts of [venue], unless a written agreement between
you and Centrail says otherwise.

## Contact

Questions about this agreement: `support@centrail.org`.
