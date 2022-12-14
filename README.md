# Description

This is a web implementation of a game called "Who am I?" or "Friday game"

Design: [Figma](https://www.figma.com/file/m0VyQ6hj3AKPBwQQqUmJTM/Untitled?node-id=0%3A1&t=f4SIRrihxhqPt1Ck-0)

### Architecture

This projects inherits a "Feature Sliced" design in it's simplified form. Follow the heuristics:

1. We have **screens** instead of **pages**, to demonstrate intent to make the game run smoothly - maybe with transition and animations in future
2. We split layers only for components - all the services and utils are in mess in top-level folders. It's just easier for early development
3. Postpone creating middle-class components as **entities, features, etc.** in their own folders. Do it as refactoring after completing most of the roadmap

### Usage

To set up locally:

1. As prelude, run server from a repository [friday-game-server](https://github.com/alexmaltsevgit/friday-game-server)
2. Clone this repo
3. Execute `npm run dev`

### Roadmap

Step is considered completed if it's implementation is just fulfilled enough for playing the game with comfort and without obvious bugs

#### Basic components

- [x] Button
- [x] Input
- [ ] Modal
- [ ] Popup

#### Screens / stages

- [x] Index screen (desktop)
- [ ] Index screen (mobile)
- [x] Join screen (desktop)
- [ ] Join screen (mobile)
- [x] Awaiting stage (desktop)
- [ ] Awaiting stage (mobile)
- [ ] Filling stage (desktop)
- [ ] Guessing stage (mobile)

#### Misc

- [ ] Error handling, error boundaries
- [ ] Unit testing
- [ ] Documentation (storybook)
