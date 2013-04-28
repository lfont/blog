Almost 7 months has passed since I wrote my last post about [Firefox OS](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox_OS). Many things have happened since. Mozilla has improved its [marketplace](https://marketplace.firefox.com/developers/) and on 23rd of April [Geeksphone](http://www.geeksphone.com/) began to sale the first Firefox OS smartphones for developers.    
I told myself that it was then time to become familiar with the deployment of applications on Firefox OS.

What is a Firefox OS App?
-------------------------

As a reminder, Firefox OS is not a new platform, the platform is the Web.   
A Firefox OS's application is completely written using HTML5 and Open Web standards.
Creating an application for Firefox OS is a very familiar task for a web developer. There is
no specific SDK or proprietary extension.    
With regard to application deployment, strategy is very similar to what exists on the
Chrome Web Store. Applications are distributed in one of two forms: hosted or packaged.

### Hosted app

An hosted app is just a web app hosted somewhere on the Web. In order to make an existing web app install on Firefox OS, it  requires very little modification. One simply needs to create an [Open Web App manifest](https://developer.mozilla.org/en-US/docs/Apps/Manifest), which is a simple JSON file that describes the application, and serve it with a special `Content-Type` (`application/x-web-app-manifest+json`) header.
Some Web servers automatically associates this `Content-Type` to files that end with the `.webapp` extension.    
With [express](http://expressjs.com/), this association can be registered as follows:

    express.static.mime.define({ 'application/x-web-app-manifest+json': [ 'webapp' ] });

### Packaged app

A packaged app is a zip file that contains all the code, assets and the Open Web App manifest of the application.
One of the main advantage of a packaged app is the fact that it can have access to sensitive API of the device on which it runs.    
There are 3 [types of packaged app](https://developer.mozilla.org/en-US/docs/Apps/Packaged_apps#Types_of_packaged_apps) that defined the level of authorization that the app can have on the device.

### Open Web App manifest

The manifest file can contains a lot of properties but not all of them are mandatory. The number of properties that should be defined vary mostly by the type of app (hosted/packaged), the permission required and the interaction that the app will have with the other apps installed on the devices (see Web Activities below).

### Hosted or Packaged app

The decision is quite easy to make. This will essentially depend of functionalities that will provide the application. Read the [App permissions](https://developer.mozilla.org/en-US/docs/Apps/App_permissions) page on the wiki.

### Web Activities

[Web Activities](https://developer.mozilla.org/en-US/docs/WebAPI/Web_Activities) define how the application on the device can exchange data or delegate action to another. Web Activities have not been standardized by the W3C yet. Indeed it's a counter proposal to the Google's [Web Intents](http://webintents.org/) specification. You can read this [Web Activities vs Web Intents comparison](http://codebits.glennjones.net/webactions/intentsvsactivities.html) for more informations. Don't panic it seems that Mozilla and Google are talking about how they can merge the two proposals.

### Distribution

Once your app is ready, you can [validate your manifest](https://marketplace.firefox.com/developers/validator) before submiting it to the [Firefox marketplace](https://marketplace.firefox.com/). The Firefox model for app distribution is Open, so you can expect to see alternative markets in a near future. It is even possible to [install an app](https://developer.mozilla.org/en-US/docs/Apps/Getting_Started) by visiting the app page.

### Is HTML5 ready for app?

We have read many things about it. The most significant episode is probably the one where Mark Zuckerberg said that [HTML5 for mobile was a 'mistake'](http://www.theverge.com/2012/9/11/3317230/mark-zuckerberg-betting-on-html5-for-mobile-was-a-mistake-hints-at). As it has been highlighted by Sencha with [Fastbook](http://www.sencha.com/blog/the-making-of-fastbook-an-html5-love-story), that was perhaps more a lack of knowledge that the technology itself.    
Anyway, I think that the reason Facebook and LinkedIn have failed with their HTML5 application is more likely the fact that neither one nor the other have the means to change or improve the platform.    
The big advantage of Firefox OS is that Mozilla has a lot of experience with the Web and they can afford to spend the necessary specifications to make HTML5 a better platform for application development.