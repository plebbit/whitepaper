import axios from 'axios';

(async () => {
    for (let i = 0; i < 100; ++i) {
        await axios.post('http://localhost:3000/comment', {
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi rhoncus velit eu justo varius, quis mollis justo euismod. Cras vel.",
            postCID: "QmRDsSXSNGdTYsy7KDU8L8VvvAfEFRp8ZY1Kr2xGqUZSU8"
        });
    }
    console.log("done");
})();