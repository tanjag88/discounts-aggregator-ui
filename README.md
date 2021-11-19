# Introduction

Dear reader, this project intention is to help me learn React by doing not just reading and following courses.   
The idea behind is to be UI for a backend service that will crawl the web for discounts.

I have split my learning into multiple sub projects or refactoring's of this code. I started with the plan to learn React, ReactRedux, React Callbacks, React Context, and decided to implement my application in all of this approaches.

This codebase is deployed on [heroku](https://discaunts-aggregator-ui.herokuapp.com/) so please fell free to check it out. The branch that is synced with heroku is react-query.

This project and also my learning is still not done, I'm continuing to learn by doing, and I'll be updating this repository as I go.

My main goal is to find job as react developer, please check out my [resume](https://www.linkedin.com/in/tgolibegovska/).
I'm located in Vancouver BC Canada, if you are local company or would like remote junior React developer please reach out. 

# Code structure

Code is split into multiple branches and each of them represents learning path that I have taken. All the implementation in all of the branches tries to keep the same features across all of them.

## Branches

### main
This is where I started with React. Here I decided to implement my application in the simplest form by only using react hooks. This branch contains the least of features.
This helped me grasp the simplest concepts and also allowed me to build on top of them and learn more as I go.
Here I learned the basic concepts of React Components, component state variables.

[Link](https://github.com/tanjag88/discounts-aggregator-ui) to main branch code.

### react-context
My second learning activity was React Context, this is build on-top of main branch and here I was learning the concepts of how to propagate data, locally persist data in state and share it with other components. This helped me learn how I can create bigger React projects and easily understand how the data flows.

[Link](https://github.com/tanjag88/discounts-aggregator-ui/tree/react-context) to react-context branch code.

### react-query
While learning React Context I discovered a project called React Query. This project which is intended to simplify the interaction between React and Backed seemed like interesting learning opportunity and I decided to create this branch.
Here I learned the basics of React Query and integrate it in my app.

The react-query branch is followup from react-context where I change the interaction with backend to be done via React Query

[Link](https://github.com/tanjag88/discounts-aggregator-ui/tree/react-query) to react-query branch code.

### react-redux
React Redux is one of the most widely used state/store management library, and I had to learn it.
This branch is follow up form react-query and I'm changing the implementation of React Context to React Redux.


[Link](https://github.com/tanjag88/discounts-aggregator-ui/tree/react-redux) to react-redux branch code.