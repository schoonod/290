var page1 = {
    paragraph1: "This is a guide on how to use handlebars partials. The existing documentation, while technically " +
    "complete, is downright difficult to follow for beginners to handlebars and UI templating libraries in general. " +
    "This guide is meant to show more detail so that you can leverage the utility of partials to build a more robust " +
    "and dynamic application.",

    paragraph2: "You already have an intermediate understanding of oop, javascript, DOM manipulation, and server-side programming. " +
    "You know what a templating library does and have a grasp over the core functionality of Handlebars. However, you have " +
    "not used partials before and believe they might be what you need to aid in a dynamic app development speed and improving " +
    "app performance. We will be using javascript for all of our examples, but you should have no trouble following along.",

    paragraph3: "Handlebars has this to say about partials: ",

    paragraph4: "Doesn't. mean. anything. I mean, what is 'template reuse'? In fact it doesn't even tell us when or why we would want to use them. " +
    "If you've ever wondered whether or not you will inevitably need to re-render entire templates anytime you want " +
    "to do some DOM modification, but want to keep the Single Page App-ness feel going, then know that re-rendering is unnecessary. " +
    "Partials helps to accomplish that while keep code more organized and perhaps a bit more semantic. Check out this example: <br/><br/>" +
    "Before Partial: ",

    paragraph5: "AAAND after: ",

    paragraph6: "So what's going on here? Before we added our partial in, our app was rendering everything as you saw it, " +
    "with the unordered list its list items. When we added in our partial (via the <span class=\"code-span\">{{> myPartial}}</span> " +
    "syntax), our template rendered <span class=\"code-span\">myPartial</span>",

    paragraph7: "Partials also have the added benefit of being able to sub in their own content, which we'll talk about " +
    "later. For this tut, we will be using <a href=\"https://github.com/ericf/express-handlebars\">express-handlebars</a> to " +
    "render our views. If you are just putting handlebars in your scripts as precompiled templates the old fashioned way," +
    " then you will still understand the mechanics."
};



module.exports.page1 = page1;

