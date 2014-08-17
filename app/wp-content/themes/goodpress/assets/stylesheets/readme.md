# Bagel UI

Bagel UI is an powerful opinionated css system and set of UI components for creating terrific interfaces and living style guides. Bagel's opinions seek to use best practices to allow you to create scalable, performant, and robust css.

Bagel includes an initial set of components, layout helpers, abstractions, and a prototype theme to help you get started quickly.

## Why Bagel?

We believe Bagel provides a system that incorporates industry best practices, ui frameworks, and mixin libraries to create a powerful technology for creating website and web application interfaces.

Some of the challenges Bagel seeks to solve:

* Balance the needs of quick prototyping in the browser with UI and UX teams creating details aesthetic designs.
* Avoid writing CSS coupled to views
* Use current industry best practices to wrap up and ship CSS
* Easily separate structure from chrome
* Easily create a living style guide to document a UI
* Opt-in component system via configuration to minimize waste in CSS
* Define how and where to create your apps chrome and new components
* Provide a solution for layout level style in order to fit the component puzzle together

## Bagel vs. [Bootstrap](http://getbootstrap.com/)/[Foundation](http://foundation.zurb.com/)/[Semantic UI](http://semantic-ui.com/)

We've loved using all of these frameworks - but they did not address some key needs we had in nearly every interface we created. Our needs often went beyond the basic customization provided by these frameworks. We enjoyed not starting from scratch, but we wanted to build additional components. We wanted a best practice system for creating chrome and new components. We needed helpers at the layout level to combine components into a UI. Additionally we wanted to build living style guides along with our css.

We started with the ideas of these UI frameworks, authoring frameworks like [inuit.css](https://github.com/inuitcss), [Compass](http://compass-style.org/) and [Bourbon](http://bourbon.io/), and best practices from industry experts like [Nicole Sullivan](http://www.stubbornella.org/content/) to create Bagel.

## Bagel is a Great Solution When

If you're looking to start quickly, but need to create style guides and additional components on top of a base, you've come to the right place.

If you're building a mid to large size CMS, Bagel works great to streamline implementation and QA of the design. Check out [GoodPress](https://github.com/goodtwin/goodpress/) for how we use Bagel with WordPress.

Are you part an corporation that needs a set of corporate components, style guide, and rules for creating new css? Bagel is the solution for you.

## Running Bagel

Bagel requires node v0.10 installed.

```
npm install && grunt
```

The Bagel distribution includes a style guide documenting all the default components, a prototype theme, and a distribution css that the team can use to prototype UI immediately.

## Using Bagel in your app

Bagel-Boilerplate is the starting point for creating your application chrome, new components, and style guide enhancements on top of Bagel. See the Bagel-Boilerplate readme to get started.
