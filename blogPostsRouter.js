const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser');

const { BlogPosts } = require('./models');

// create blog post content
BlogPosts.create('Lorem Ipsum is the greatest!', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'Rev. Bob Ipsum');
BlogPosts.create('Kavanaugh is the worst', 'I can\'t believe we\'re even considering this guy', 'Joe Obvious');

router.get('', (req, res) => {
    res.json(BlogPosts.get());
});

router.post('', jsonParser, (req, res) => {
    const requiredFields = ['title', 'content', 'author'];
    for (let i=0; i<requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `missing ${field} in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    }
    const item = BlogPosts.create(req.body.title, req.body.content, req.body.author);
    res.status(201).json(item);
});

router.put('/:id', jsonParser, (req, res) => {
    const requiredFields = ['title', 'content', 'author'];
    for (let i=0; i<requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `missing ${field} in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    }
    if (req.params.id !== req.body.id) {
        const message = `Request path id ${req.params.id} and request body id ${req.body.id} must match`;
        console.error(message);
        return res.status(400).send(message);
    }
    console.log(`Updating shopping list item ${req.params.id}`);
    BlogPosts.update({
        id: req.params.id,
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    });
    res.status(204).end();
});

router.delete('/:id', (req, res) => {
    BlogPosts.delete(req.params.id);
    console.log(`Deleted shopping list item ${req.params.id}`);
    res.status(204).end();
});

module.exports = router;