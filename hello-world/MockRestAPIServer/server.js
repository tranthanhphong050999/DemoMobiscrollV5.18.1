var Chance = require('chance')
var chance = new Chance()
var moment = require('moment')
var casual = require('casual')

function generatePosts() {
    var posts = [];
    const MAX = 1000;
    var ids = chance.unique(chance.integer, MAX, { min: 1, max: 1000000 });
    for (var i=0; i<MAX; i++) {
        var id = ids[i]
        var title = chance.sentence({ words: 10})
        var content = chance.paragraph({sentences: 5})
        var author = chance.name()
        var regtime = moment(chance.date()).toISOString() 
        posts.push({
            "id": id,
            "title":title,
            "content": content,
            "author": author,
            "regtime":regtime
        })
    }
    return {"posts": posts}
}
module.exports= generatePosts