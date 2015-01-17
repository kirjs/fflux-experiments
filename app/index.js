var dispatcher = FFlux.createDispatcher();

var questions = [
    {
        "text": "What is the difference between null and undefined?",
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
        return React.DOM.div(null, React.DOM.span(null, this.props.question.text));
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
        return React.createElement(Question, {question: questionStore.getQuestion()});

    }
});

React.render(React.createElement(Post), document.body);

