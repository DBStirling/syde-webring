# SYDE Webring

## What is this?
SYDE is a mystery bag of a program. **This webring is designed to help you explore the current students and alumni of SYDE, while increasing the discoverability of our personal sites**. We're all linked in some way or another, so traverse the nodes by connections or search by name, year or skillset year to find someone specific. 

## How do I join?
To add your site to the webring, you must be a current student or alum of the Systems Design Engineering undergrad program at the University of Waterloo and create a pull request on this repo.

### Step-by-step guide for joining
1. Log in to your github account and **go to [this repo](https://github.com/DBStirling/syde-webring)**.
2. **Fork the repo** by clicking the "fork" button at the top-right of the page.
3. Open your forked copy and **click into the data.json file**.
4. **Edit the file** directly in your browser by clicking the pencil icon at the top right of the file.
5. **Scroll to the bottom and prep the file for your information**. Add a comma after the second last curly bracket and create a new line below it.
6. **Fill out the following template and paste it into the new line**. Make sure to: *copy your skills directly* from the skill list, *update your colour* to match your primary skill group and make your *id number 1 greater than the person before you*.
```
{
    "id": 1,
    "fullName": "David Stirling",
    "year": 2028,
    "skills": {
    "skill1": "UX/UI",
    "skill2": "Product",
    "skill3": "Frontend"
    },
    "website": "https://davidstirling.me/",
    "bio": "Add a sentence or two here",
    "color": "#BD17C0"
}
```
```
const skillOptions = [
    { label: "Design", skills: ["UX/UI", "UXR", "Graphic"], color: "#BD17C0" },
    { label: "Code", skills: ["Frontend", "Backend", "Full Stack", "AI/ML", "Quant", "QA"], color: "#8B32EB"  },
    { label: "PM", skills: ["Product", "Project", "Program"], color: "#413ce2"  },
    { label: "Mech", skills: ["Mech", "Manufacturing", "Product Design", "Materials", "Auto", "Aero"], color: "#24a9d9"  },
    { label: "Elec", skills: ["Elec", "Embedded", "Robotics"], color: "#30CFAA"  },
    { label: "Other", skills: ["Business", "VC", "IDK Yet!", "Other"], color: "#868686"  }
];
```

6. **Scroll down and propose changes**. Below the file, add the following title 'Add [Your Full Name]', then click the green “Propose changes” button.

7. Click the green **Create pull request** button.

8. **Done!** Wait for your PR to be reviewed and merged if everything looks good (no typos or innappropriate content).

## Don't see your skill?
Follow the steps above to make a pull request and edit the skillOptions.js file to add your own skill. Please only do so if there is a large oversight, like a missing skillset, NOT for similar or synonymous titles (i.e. Product Designer & UX/UI Designer).