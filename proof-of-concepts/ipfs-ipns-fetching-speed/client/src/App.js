import './App.css';
import axios from 'axios';
import React, { useState } from 'react';
import PQueue from 'p-queue';

function App() {
  const [gateway, setGateway] = useState("https://cloudflare-ipfs.com");

  async function Case1() {
    console.log("Case 1 started");
    const startTime = new Date().getTime();
    let amount = 10;
    let result = [{title: "title", posts: []}, {title: "title", posts: []}, {title: "title", posts: []}, {title: "title", posts: []}, {title: "title", posts: []}, {title: "title", posts: []}, {title: "title", posts: []}, {title: "title", posts: []}, {title: "title", posts: []}, {title: "title", posts: []}];
    const queue = new PQueue({concurrency: 10});
    const postQueue = new PQueue({concurrency: 100});

    // Get the content of the IPFS containing the subplebbit's list
    const subplebbitList = await axios.get(gateway + '/ipns/k2k4r8l19q3ol24jpdpplgcopo7gofk0j7sw7scyvbyqd425a1vx074q');

    // go through the array of subplebbits
    for (let i = 0; i < amount; ++i) {
        queue.add(async () => {
            const subplebbit = await axios.get(gateway + '/ipfs/' + subplebbitList.data.subplebbits[i]);
            const subplebbitLatestPosts = await axios.get(gateway + '/ipns/' + subplebbit.data.latestPosts);

            console.log((i + 1) + "th IPNS record loaded at " + (new Date().getTime() - startTime) + " ms");
            result[i].title = subplebbit.data.title;
            for (const postCID of subplebbitLatestPosts.data.posts.splice(0, 10)) {
                postQueue.add(async () => {
                    const post = await axios.get(gateway + '/ipfs/' + postCID);

                    if (result[i].posts.length === 0 || result[i].posts.length === 9)
                        console.log((result[i].posts.length + 1) + "th post of " + (i + 1) + "th subplebbit loaded at " + (new Date().getTime() - startTime) + " ms");
                    result[i].posts.push(post.data);
                });
            }
        });
    }

    await queue.onIdle();
    await postQueue.onIdle();

    console.log(result);
    console.log("Case 1 ended and took " + (new Date().getTime() - startTime) + " ms");
  }

  async function Case2() {
    console.log("Case 2 started");
    const startTime = new Date().getTime();
    const CID = "QmNhhyJkyBppPfEuyvjqmpcSHFkisMxQcyY4Q4smrUM3BP";

    // retrieve the content of the IPFS subplebbit file
    const subplebbit = await axios.get(gateway + '/ipfs/' + CID);
    console.log("Contenant and title received at " + (new Date().getTime() - startTime) + " ms");

    // retrieve the data from the IPNS file linked to the IPFS subplebbit file
    const subplebbitLatestPosts = await axios.get(gateway + '/ipns/' + subplebbit.data.latestPosts);

    // retrieve the latest post data
    let count = 1;
    let subplebbitPosts = [];
    for (const y of subplebbitLatestPosts.data.posts) {
        const post = axios.get(gateway + '/ipfs/' + y).then(element => {
            switch (count) {
                default:
                    break;
                case 1:
                    console.log("First post received at " + (new Date().getTime() - startTime) + " ms");
                    break;
                case 5:
                    console.log("Fifth post received at " + (new Date().getTime() - startTime) + " ms");
                    break;
                case 10:
                    console.log("Tenth post received at " + (new Date().getTime() - startTime) + " ms");
                    break;
                case 20:
                    console.log("Twentieth post received at " + (new Date().getTime() - startTime) + " ms");
                    break;
                case 50:
                    console.log("Fiftith post received at " + (new Date().getTime() - startTime) + " ms");
                    break;
            }
            count += 1;
            return (element.data);
        });
        subplebbitPosts.push(post);
    }

    subplebbitPosts = (await Promise.all(subplebbitPosts));

    console.log({ "title": subplebbit.data.title, "posts": subplebbitPosts });
    console.log("Case 2 ended and took " + (new Date().getTime() - startTime) + " ms");
  }

  async function Case3() {
    console.log("Case 3 started");
    const startTime = new Date().getTime();
    const CID = 'QmRDsSXSNGdTYsy7KDU8L8VvvAfEFRp8ZY1Kr2xGqUZSU8';

    // retrieve the content of the IPFS post file
    const post = await axios.get(gateway + '/ipfs/' + CID);
    console.log("Contenant and title received at " + (new Date().getTime() - startTime) + " ms");

    // retrieve the data from the IPNS file linked to the IPFS post file
    const postLatestComments = await axios.get(gateway + '/ipns/' + post.data.latestComments);
    let latestPost = await axios.get(gateway + '/ipfs/' + postLatestComments.data.latestComment);
    console.log("First comment received at " + (new Date().getTime() - startTime) + " ms");

    // retrieve the latest comments data
    let postComments = [];
    while (latestPost.data.prev != null) {
        switch (postComments.length) {
            default:
                break;
            case 5:
                console.log("Fifth comment received at " + (new Date().getTime() - startTime) + " ms");
                break;
            case 10:
                console.log("Tenth comment received at " + (new Date().getTime() - startTime) + " ms");
                break;
            case 20:
                console.log("Twentieth comment received at " + (new Date().getTime() - startTime) + " ms");
                break;
            case 50:
                console.log("Fiftith comment received at " + (new Date().getTime() - startTime) + " ms");
                break;
        }
        postComments.push(latestPost.data);
        latestPost = await axios.get(gateway + '/ipfs/' + latestPost.data.prev);
    }
    postComments.push(latestPost.data);

    console.log({ "title": post.data.title, "content": post.data.content, "upvote": post.data.upvote, "comments": postComments });
    console.log("Case 3 ended and took " + (new Date().getTime() - startTime) + " ms");
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={Case1}>Case 1</button>
        <button onClick={Case2}>Case 2</button>
        <button onClick={Case3}>Case 3</button>
        <form>
          <label>
            Gateway:
            <input
              type="text"
              value={gateway}
              onChange={e => setGateway(e.target.value)}
            />
          </label>
        </form>
      </header>
    </div>
  );
}

export default App;
