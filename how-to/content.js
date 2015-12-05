var page1 = {
    paragraph1: "This is a guide on how to use Handlebars partials using express-handlebars. The existing documentation, while technically " +
    "complete, is very difficult to piece together and follow for beginners to Handlebars and UI templating libraries in general. " +
    "You need to already have a firm grasp on Handlebars, without express-handlebars, to work things out. " +
    "This guide is meant to show more detail so that you can leverage the utility of partials to build a more robust " +
    "and dynamic application.",

    paragraph2: "You already have an intermediate understanding of oop, javascript, DOM manipulation, and server-side programming. " +
    "You know what a templating library does and have a grasp over the core functionality of Handlebars. However, you have " +
    "not used partials before and believe they might be what you need to aid in a dynamic app development speed and improving " +
    "app performance. We will be using javascript for all of our examples, but you should have no trouble following along " +
    "using other languages.",

    paragraph3: "Handlebars has this to say about partials: ",

    paragraph4: "Doesn't. mean. anything. I mean, what is 'template reuse'? In fact it doesn't even tell us when or why we would want to use them. " +
    "If you've ever wondered whether or not you will inevitably need to re-render entire templates anytime you want " +
    "to do some DOM modification, but want to keep the Single Page App-ness feel going, then know that re-rendering is unnecessary. " +
    "Partials helps to accomplish that while keeping code more organized and perhaps a bit more semantic. They seem to " +
    "be pretty useful for creating components to be reused on multiple views as well. Check out this example: <br/><br/>" +
    "Before Partial: ",

    paragraph5: "aaand after: ",

    paragraph6: "So what's going on here? Before we added our partial in, our app was rendering everything as you saw it, " +
    "with the unordered list and list items. When we added in our partial (via the <span class=\"code-span\">{{> myPartial}}</span> " +
    "syntax), our template rendered <span class=\"code-span\">myPartial</span>.",

    paragraph7: "Here is another way to visualize it: ",

    paragraph8: "Partials also have the added benefits of being able to sub in their own context, which we'll talk about " +
    "later. To top it off, you can dynamically swap out partials to make your app uber dynamic. " +
    "For this tut, we will be using <a href=\"https://github.com/ericf/express-handlebars\">express-handlebars</a> to " +
    "build our app. If you aren't using epxress-handlebars, then you will still be able to follow along and understand the mechanics."
};

var page2 = {
    paragraph1: "As mentioned earlier, we are using handlebars-express to demonstrate partials. I'm assuming you already have " +
    "Handlebars installed and that's why you're here. If you are not using express-handlebars, just follow along and try " +
    "out partials using your normal workflow.",

    paragraph2: "Making a partial is virtually the same process as a view. Just add in your handlebars expressions as you " +
    "normally would. For our example, we are going to use a partial that is frequently reused: a navbar. Inside your " +
    "'views' directory, create a directory named 'partials', and create a new handlebars file. ",

    paragraph3: "Next, you want to use this partial in one of your templates by using the <span class=\"code-span\">{{> navPartial}}</span> " +
    "syntax. So if this was a nav for your homepage, it might look like this:",

    paragraph4: "Which results in: ",

    paragraph5: "If using the express-handlebars view engine, you aren't required to register the partial in order " +
    "to use it. If not using express-handlebars, you must register the partial via the syntax " +
    "the code seen below. Though, it's going to be quite different than the above method, and requires extra work to implement. " +
    "It's recommended to use express-handlebars to simplify things, but if you're a glutton for punishment, then feast your eyes: ",

    paragraph6: "Since that looks more complicated, we're going to stick with express-handlebars. Express-handlebars " +
    "will know to look for partials in your partials folder and do all the heavy lifting. Now let's learn how to add in " +
    "unique context for our partial."
};

var page3 = {
    paragraph1: "By 'unique', we mean context for the partial to use other than the template's context " +
    "that the partial is rendering inside. This could be useful in a variety of scenarios, but the main idea is that it " +
    "allows you more dynamic options for creating your app.",

    paragraph2: "For example, perhaps you have a 'widget' that provides some kind of real-time updates, such as " +
    "stock tickers. If that widget is a main feature of your app and needs to be on several key views, then " +
    "compartmentalizing it inside a partial will make for easier insertion into each view. Though, it's context is " +
    "going to be it's own, and not part of the main view, so while you could add this context into each relevant " +
    "view's own context, it would be less work and more encapsulated by giving the widget partial own context. " +
    "Separation of concerns, and so on. So, lets make the stock ticker partial.",

    paragraph3: "There are a couple of ways to go about doing this. I'll save you a headache and advise you to use the " +
    "express-handlebars way, which is to add in some middleware to create your partial context. What is middleware you ask? " +
    "To keep us dumb and happy, think of it as something that gives you more capabilities in your app by being in the " +
    "middle of two things that connects those two things. In this case, it connects the context you want to the partial that " +
    "you want to give it to. First, define your context: ",

    paragraph4: "I'm putting this all in a simple express server, but you can put it anywhere that you feel comfortable " +
    "based on your workflow. Next, tie the context to your partials directory, via the magic middleware: ",

    paragraph5: "Let's go thru this code. This <span class=\"code-span\">app.use</span> is our all-purpose " +
    "middleware thing that says 'do this when our app is at this point of execution'. In other words, in our simple " +
    "express server, this middleware needs to go before we render our view, or else it will never execute since the view " +
    "will render, and control will pass back to the client. <span class=\"code-span\">res.locals.partials</span> is a js object " +
    "that is available to partials. Once set, it is available to the partial request at hand, <b>and nothing else</b>. " +
    "The locals are available for use by other partials thru the <span class=\"code-span\">partial</span> " +
    "object, however, they will still be scoped to the request that renders the view. Next, the " +
    "<span class=\"code-span\">.tickers</span> is our <b>arbitrarily</b> named object to reference the object that " +
    "<span class=\"code-span\">stockTickers()</span> returns. Call it whatever you fancy. Finally, the critical " +
    "<span class=\"code-span\">next()</span>. This keeps our app rolling until it hits the next function that matches " +
    "the request, which in our case is a request to our simple app homepage <span class=\"code-span\">/</span>. " +
    "Here is the full app: ",

    paragraph6: "Finally, lets make a quick partial to display our tickers: ",

    paragraph7: "Our amazing ticker results: ",

    paragraph8: "The stock ticker app source can be found <a href=\"https://github.com/schoonod/290prog/tree/master/ticker-partial-example\">here.</a> ",

    paragraph9: "That's all folks. Thanks for stopping by."
};

module.exports.page1 = page1;
module.exports.page2 = page2;
module.exports.page3 = page3;

