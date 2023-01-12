const express = require('express');
const router = express.Router();

const { Post } = require('../model/postSchema');
const { Counter } = require('../model/counterSchema');

//react로 부터 받은 요청처리
router.post('/create', (req, res) => {
  Counter.findOne({ name: 'counter' })
    .exec()
    .then((doc) => {
      console.log('doc:', doc);
      const PostModel = new Post({
        title: req.body.title,
        content: req.body.content,
        communityNum: doc.communityNum
      });

      PostModel.save().then(() => {
        Counter.updateOne({ name: 'counter' }, { $inc: { communityNum: 1 } })
          .then(() => {
            res.json({ success: true });
          })
          .catch((err) => console.log(err));
      });
    });
});

router.post('/read', (req, res) => {
  Post.find()
    .exec()
    .then((doc) => {
      res.json({ success: true, communityList: doc });
    })
    .catch((err) => {
      console.log(err);
      res.json({ success: false });
    });
});

router.post('/detail', (req, res) => {
  Post.findOne({ communityNum: req.body.num })
    .exec()
    .then((doc) => res.json({ success: true, detail: doc }))
    .catch((err) => res.json({ success: false, err }));
});

router.post('/edit', (req, res) => {
  const temp = {
    title: req.body.title,
    content: req.body.content
  };

  Post.updateOne({ communityNum: req.body.num }, { $set: temp })
    .exec()
    .then(() => {
      res.json({ success: true });
    })
    .catch((err) => res.json({ success: false, err: err }));
});
router.post('/delete', (req, res) => {
  Post.deleteOne({ communityNum: req.body.num })
    .exec()
    .then(() => {
      res.json({ success: true });
    })
    .catch((err) => {
      console.log({ success: false, err: err });
    });
});

module.exports = router;
