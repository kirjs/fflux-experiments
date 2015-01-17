var dispatcher = FFlux.createDispatcher();


var questions = [
    {
        "text": "What is the difference between null and undefined?",
        "answers": ["ONE", "TWO", "THREE"],
        "tags": [
            "javascript",
            "types"
        ]
    },
    {
        "text": "What is hoisting",
        "tags": [
            "javascript",
            "types"
        ]
    },
    {
        "text": "```function(){ console.log( this )}``` what the output will be?",
        "tags": [
            "javascript",
            "context"
        ]
    },
    {
        "text": "How can the context of the function be different?",
        "tags": [
            "javascript",
            "types"
        ]
    }

];


var questionStore = FFlux.createStore({
    actions: {
        'QUESTION:NEXT': 'nextQuestion'
    },

    _posts: [],


    getQuestion: function () {

        return questions[this.questionId || 0];
    },

    nextQuestion: function () {
        this.questionId = Math.floor() * questions.length;

        this.emitChange();
    },

    getPosts: function () {
        return this._posts;
    }
});

dispatcher.register(questionStore);

var Question = React.createClass({
    render: function () {
        return React.DOM.div(null, React.DOM.span(null, this.props.question));
    }
});
var Answer = React.createClass({
    render: function () {
        return React.DOM.li(null, this.props.answer);
    }
});
var Answers = React.createClass({
    render: function () {

        return React.DOM.ul(null,
            this.props.answers.map(function (answer) {
                return Answer({answer: answer});
            }));
    }
});

var Post = React.createClass({
    mixins: [FFlux.mixins.binding],
    displayName: 'PostContainer',

    listenTo: questionStore,

    storeDidUpdate: function () {
        this.forceUpdate();
    },

    render: function () {
        var question = questionStore.getQuestion();
        return React.DOM.div(null,
            [
                Question({question: question.text}),
                Answers({answers: question.answers})
            ]
        );


    }
});

React.render(React.createElement(Post), document.body);

