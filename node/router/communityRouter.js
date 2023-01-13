const express = require('express');
const router = express.Router();

const { User } = require('../model/userSchema');
const { Post } = require('../model/postSchema');
const { Counter } = require('../model/counterSchema');

//react로 부터 받은 요청처리
router.post('/create', (req, res) => {
  const temp = req.body;

  Counter.findOne({ name: 'counter' })
    .exec()
    .then((doc) => {
      temp.communityNum = doc.communityNum;

      User.findOne({ uid: temp.uid })
        .exec()
        .then((doc) => {
          temp.writer = doc._id;

          const PostModel = new Post(temp);
          PostModel.save().then(() => {
            Counter.updateOne({ name: 'counter' }, { $inc: { communityNum: 1 } }).then(() => {
              res.json({ success: true });
            });
          });
        });
    })
    .catch((err) => console.log(err));
});
router.get('/read/:count', (req, res) => {
  Post.find()
    .populate('writer')
    .limit(req.params.count)
    // sort({createdAt:-1}) 원래순서:1 / 역순:-1
    .exec()
    .then((doc) => {
      res.json({ success: true, communityList: doc });
    })
    .catch((err) => {
      console.log(err);
      res.json({ success: false });
    });
});
router.get('/detail/:num', (req, res) => {
  Post.findOne({ communityNum: req.params.num })
    .populate('writer')
    .exec()
    .then((doc) => {
      res.json({ success: true, detail: doc });
    })
    .catch((err) => {
      res.json({ success: false, err: err });
    });
});
router.put('/edit', (req, res) => {
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
router.delete('/delete/:num', (req, res) => {
  Post.deleteOne({ communityNum: req.params.num })

    .exec()
    .then(() => {
      res.json({ success: true });
    })
    .catch((err) => {
      console.log({ success: false, err: err });
    });
});

module.exports = router;
