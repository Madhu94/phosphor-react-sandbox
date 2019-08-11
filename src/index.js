import React from 'react';

//import ReactDOM from "react-dom";
import '@phosphor/widgets/style/index.css';
import { Widget, DockPanel, BoxPanel } from "@phosphor/widgets";
import { ReactWidget } from "@jupyterlab/apputils";

import "@phosphor/default-theme/style/index.css"
import './style/index.css';


const HNPosts = [
  { title: "something", description: "some cool thing" },
  { title: "another thing", description: "another cool thing" }
];

function Post(props) {
  return (
      <li>{props.title}</li>
  );
}

function PostsList(props) {
  const posts = props.posts.map(post => <Post {...post} />);
  return (
    <div>
      <h3>Posts</h3>
      <ul>{posts}</ul>
    </div>
  );
}

class PhosphorPostsList extends ReactWidget {
  render() {
    return <PostsList className="content" posts={HNPosts} />;
  }
}

const dockPanel = new DockPanel();

const widget = new PhosphorPostsList();

widget.id = "one";
widget.addClass('content');
widget.title.label = "One";
widget.title.closable = true;

const widget2 = new PhosphorPostsList();
widget2.addClass('content');
widget2.id = "two";
widget2.title.label = "Two";
widget2.title.closable = true;

dockPanel.addWidget(widget);
dockPanel.addWidget(widget2, {mode: 'split-right', ref: widget})
dockPanel.id = "dock";

BoxPanel.setStretch(dockPanel, 1);

window.onresize = () => { dockPanel.update(); }
Widget.attach(dockPanel, document.body);

