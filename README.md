# BetterLife - Wellbeing Guides for free

Access to the live demo [here](https://majestic-wisp-add432.netlify.app/)

# Project Summary

### Project Context

Our physical and mental health are key indicators of how we will perform as human beings, and throughout the COVID pandemic, there has been a prevalence of anxiety, burnout and higher levels of reported cases of depression. These problems in turn affects our overall ability to carry out essential activities in our daily lives and strips us of the ability to understand and communicate our emotions with love ones. However, mental issues like depression usually take time to manifest and thus these early symptoms can and should be combatted early. 

### User Goals

The website aims to provide a platform where users can create and look up existing wellbeing techniques/programs which targets various physical and mental health painpoints. A search function with filter options is also valiable to allow users to quickly find a program to suit their needs. Lastly, users can also login to comment on these techniques allowing users who created them to better identify areas the program can improve on. The website also needs to be responsive and work on multiple mobile platforms ranging from small phones to large screen desktops.

### Justification for the App

While wellbeing guides can be found online, the majority of them either lack clear instructions or contain too many irrelavant information. At the same time alot of these guides are too generic and often lack professional advice. Thus this website will serve as a wiki for users who genuine want to provide effective advice and techniques to improve people's wellbeing so as to combat the rising of mental health problems. With the addition of a comment section, users can also better identify well curated programs while avoiding ones that have a low score, and users who created these programs can also use the feedback from comments to better improve their techniques.

# UI/UX

### Strategy

_User:_
  * **Objective:** 
      * View instructions and benefits of program  
      * Search ideal technique/program based on a filter option (program category, duration, difficulty, targeted painpoint)
      * Leave comments and rate technique
      * Technique and comments can only be edited and deleted by creator.

  * **Needs:**
      * View all wellbeing techniques.
      * Prevent other users from editting / deleting user's comments / techniques

  * **Demographics:**
      * Users showing initial symptons of mental health issues
      * Users who just want to improve themselves
      * Therapist and physical trainiers

  * **Pain Point:** 
      * Lack of websites which consolidates programs for both physical and mental health.


| User Stories               | Acceptance Criteria(s).    | 
| -------------------------- |:--------------------------:| 
| As a user who has had a terrible week and is stressed out mentally, I want to find a suitable meditation guide so I can better improve my mental health. | Search feature that allows users to search for "meditation" techniques
| As a user who wants to improve a new aspect of my life, I want to browse through techniques and view all guides so I can try out many wellbeing programs| Unrestricted access to all technique programs along with detailed instructions and benefits
| As a therapist/physical traininer, I want to share my wellbeing program with users in need of advice so that I can help people overcome their difficulties or improve themselves| Feature that allows users to create/edit/delete technique programs. 
| As a therapist/physical traininer, I do not want other users to modify my program, so that my advice will not be tampled with | Login system to only allow creator of the technique program to edit / delete it.
| As a user who has used a technique program, I want a platform to provide feedback so that I can rate whether I have benefited from the program as well as what the program can improve on| Feedback and rating feature where users can leave and read comments


### Scope

_Functional Specifications:_
  * Register and login new / existing users
  * Create, display, edit and delete technique programs
  * Filter out technique programs based on category, technique, difficulty
  * Order technique programs based on duration
  * Create, display, edit and delete comments

_Content Requirements:_
  * Posting of technique title, description, duration, difficulty, instructions, benefits, wellbeing categories, targeted painpoints and respective supporting images (optional)
  * User's credentials 
  * Comment ratings and content

_Non-functional Requirements:_
  * Mobile Responsiveness
      * Using media queries and flex-box
  * User validation
      * Basic validation to determine user
      * Session saves user's information depsite refreshing of page

### Structure

![alt text](https://github.com/keithtanzihao/letstalk-frontend/blob/main/src/styles/vendors/imgs/structure.png)

### Surface

_Colors:_

![alt text](https://github.com/keithtanzihao/letstalk-frontend/blob/main/src/styles/vendors/imgs/colors.png?raw=true)

* A cool calm set of colors which is easy on the eyes was choosen as our app primarily focuses on users who are dealing with mental health symptons and bold colors might come off too strong.

_Fonts:_

* The Apercu font was used as the initial idea was to create an app very similar to the already existing meditation app "Headspace". And this font is very similar to that of the one used by Headspace.

# Features

1. **Users can register an account / login into their account.** This prevents other users from editting / delete comments created by the current user. At the same time, only registered users who are logged in are able to edit / delete existing technique programs.

2. **Users can create and view technique programs.** The app is intended to be a mini-wiki for users to view helpful wellbeing programs. This app will also allow users to create detailed programs with instructions and benefits while classifying them under the supposed categories and painpoints the program is intended to fix. Images can also be added to the instructions / benefits for better clarity.

3. **Users can edit and delete existing technique programs.** If mistakes were made during the process of creating the program, users will be able to edit or delete the program along with all the attached comments.

4. **Users can write and rate existing technique programs.** Users will need to login to write comments. They can also add ratings to their comments which would allow other users to judge whether the program is good and suitable for their needs.

5. **Error messages will appear if invalid inputs are entered during creation, editing of both programs and comments.** If a user inputs an invalid field, the app will provide a corresponding prompt to notify users of the problem.

### Limitations and Future Implementations

1. A smoother search function needs to be implemented. Currently users will always need to click the reset button to make sure the filter options are cleared, plus due to time constrains two way binding has not been done for the search filters, thus making the search function difficult to use.

2. Pagination will be required as the database grows. Currently all the techniques are rendered within a single page which could potential crash the backend if the database is too huge. This is the same for the comments for each techniques.

3. The login functionality has not been fully developed as a profile page is missing. The logout function as well as the current user logged in was also not completed due to the lack of time. This has to be fixed if not users will not be able to determine which current account is logged in, resulting in a bad UI.

# Testing

1. Access the testcases [here](https://github.com/keithtanzihao/trentP1-frontend/blob/main/src/static/files/testcases.pdf).
2. Mobile responsive testing was done using chrome developer tool across dimensions(width): 320px, 375px, 425px, 768px, 1024px, 1440px, 2560px.

# Technologies Used

* HTML
    * Styling and layout of the project

* CSS 
    * Style all elements throughout the web since no bootstrap is used

* ReactJs
    * For building a reactive UI

* React Icons
    * Some icons used were from this library

* Axios
    * For handling HTTP requests 

* [Inkscape](https://inkscape.org/)
    * For customising a variety of background images, icons, clusters, etc.

* [Github](https://github.com/)
    * Version control for project.

* Netlify
    * Deployment of website

* Google Font
    * Downloaded "Apercu" font used in project

# Credits

* Deployment steps
    * Extracted and edited based on TGC's deployment guide









