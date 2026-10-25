---
id: guide-why-built
slug: why-we-built-groupify-subscriptions-notebook
title: "Why We Built Groupify: Notes From a Messy Subscriptions Page"
description: "The story behind Groupify: a subscriptions sidebar that became unusable, a spreadsheet that became annoying, and the realization that channel curation is a distinct kind of work. Honest notes about what it is — and what it isn't."
date: "2026-10-24"
readTime: "6 minutes"
category: "Product"
author: "Groupify Team"
image: "/images/guides/cover-organize.svg"
featured: false
---

# Why We Built Groupify: Notes From a Messy Subscriptions Page

Every product starts as a personal annoyance, so this origin story will not surprise anyone. But we think it is worth writing down — both for users who want to know who they are trusting their data to, and because the *reason* we built this explains a lot about what Groupify does and does not try to be.

## The annoyance

It was a subscriptions sidebar with 140 channels in it. Some were real daily fixtures. Some were from a "I'll definitely watch this series" phase. Some were friends' channels, some had stopped uploading around the last platform redesign, some we never could have explained to a time traveler. We never opened that feed again — YouTube's home page guessed for us, and we let it.

The practical consequence: interesting channels kept getting *lost*. Not deleted — just unfindable when the moment came to actually watch something. You would remember a channel that did great engineering explainers, type half its name into search, find nothing, and go to the algorithm which offered a makeup tutorial, crypto hype, and a botany channel's new series instead.

## The spreadsheet era

Our first fix was the classic one: a spreadsheet. It worked. For a while, it was good. It was also slowly terrible, in ways all spreadsheets are for this job:

- Nothing updated itself. Subscriber counts and channel names in the sheet were text we manually edited at some past date.
- Sharing meant file-sharing, which meant drift; three people, four "latest" versions.
- Adding a channel meant alt-tabbing, copy-pasting, formatting a row.
- It could not *do* anything. A list of links is inert; there was no click-to-watch, no quick "open all science channels".

What we truly wanted from a spreadsheet, it turned out, was a *database with an interface* — one that knows what a YouTube channel is, keeps up with the state of the channel while we sleep, and lets us add channels without breaking our browsing flow. Nobody builds that as a spreadsheet feature, because it isn't one.

## The idea

Somewhere between the third "which spreadsheet is current?" discussion and the tenth lost channel, it became clear this had a phrase: **channel curation as a distinct kind of work**. Watching is not the same as subscribing isn't the same as tracking sources; they are *components of one activity* — and every tool around YouTube optimizes one of those three parts (watching, subscribing, video queues) while assuming the curation part is somebody else's job.

So we built the smallest tool we could for exactly that part:

- **Groups with nesting** — the core structure; nothing more exotic than folders, kept honest.
- **Cheap capture** — the browser extension so "save this channel" happens in one click, mid-watching.
- **First-class channel objects** — avatars, subscriber counts, names — so your list looks like a set of channels, not a pile of URLs.
- **Share links with roles** — because curation is usually social work, from families to agencies to community lists.
- **Bulk operations & export** — because a system you can't restructure in bulk is fragile, and data you can't leave isn't an asset, it's a hostage.

That's it — that's Groupify, in one paragraph. There are no dashboards claiming to predict virality, no "AI-powered content strategy scores". Where your need is to *know the state of the channels you care about*, that is the case we manage. For watching itself — YouTube does fine.

## What it is not

We are explicit about the boundaries, because a curation tool marketed as something bigger ruins trust in both directions:

- **We are not a player calculus.** Groups are for organizing; for watching, click through and watch — YouTube stays YouTube.
- **We are not a recommendation engine.** We do not decide what is "good". The structure is yours; the taste is yours.
- **We are not a parental-control suite.** We're the tool behind a curated household list — the vetting is done by a person you know (see our family guide). Supervision features belong to the platforms.
- **We are not locked-in by design.** Export is a first-class feature. If we collect your curation, the collection should be portable and out-the-door whenever you choose.

## Where we're going

The roadmap is basically "make curation cheaper to maintain": better bulk flows, all sorts of ways to share, small quality-of-life things that practitioners suggest on Discord. We are guided by a rule of thumb — would a working curator say "yes, I would actually use this tomorrow?" — rather than "would this demo well?"

## If our story matches yours

If reading this made you think about the state of your "To watch" bar — welcome. Register on the site for free, build four groups from our getting-started guide, and see if the shape of the thing reframes your week the way it did ours. If your systems are stable and effective, keep doing them; the work of curating channels does not require our product (even though we think it makes it faster).

You'll run into us in the Discord, both to talk shop and to fix the occasional bug. Come say hi; the curation war stories are the best part of this job.
