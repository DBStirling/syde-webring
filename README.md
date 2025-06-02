# SYDE Webring

## What is this?
SYDE is a mystery bag of a program. **This webring is designed to help you explore the current students and alumni of SYDE, while increasing the discoverability of our personal sites.** We're all linked in some way or another, so traverse the nodes by connections or search by name, year or skillset year to find someone specific. 

## How do I join?
To add your site to the webring, you must be a current student or alum of the Systems Design Engineering undergrad program at the University of Waterloo and create a pull request on this repo.

### Step-by-step guide for joining
1. Log in to your github account and **go to [this repo](https://github.com/DBStirling/syde-webring)**.
2. **Fork the repo AND/OR edit directly in your browser**.
3. **Open the file** --> ```/public/data.json``` Either clone the forked repo to make your changes via code editor, or do so in your browser, using the edit button on the top right. 
4. **Add your information**. Scroll to the bottom of the file, and add a new "node" (insert comma after second last curly brace). **Use the following template**, and paste it in as another object in the array of nodes.
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
    { label: "Design", skills: ["UX/UI", "UXR", "Graphic", "Brand"], color: "#BD17C0" },
    { label: "Code", skills: ["Frontend", "Backend", "Full Stack", "AI/ML", "Quant", "QA", "Game Dev", "SRE"], color: "#8B32EB"  },
    { label: "PM", skills: ["Product", "Project", "Program"], color: "#413ce2"  },
    { label: "Mech", skills: ["CAD/Simulation", "Manufacturing", "Materials", "Automotive", "Aero"], color: "#24a9d9"  },
    { label: "Elec", skills: ["Embedded", "Signals", "Sensors", "Robotics", "Power Systems", "Communications"], color: "#30CFAA"  },
    { label: "Other", skills: ["Data", "Business", "VC", "IDK Yet!", "Other"], color: "#868686"  }
];
```
5. **Make sure to:** *copy your skills directly* from the skill list, *update your colour* to match your primary skill group and *make your id number 1 greater* than the person before you.

6. **Propose your changes**. If done in your browser, scroll down to the bottom. Below the file, add the following title 'Add [Your Full Name]', then click the green “Propose changes” button. If you're using a code editor, make sure to 
```
git add . 
git commit -m "Added profile!"
git push origin main
```

7. On github, click the green **Create pull request** button. If forked, this will appear in your forked repository. 

8. **Done!** Wait for your PR to be reviewed and merged if everything looks good (no typos or innappropriate content).

## Don't see your skill?
Follow the steps above to make a pull request and edit the skillOptions.js file to add your own skill. Please only do so if there is a large oversight, like a missing skillset, NOT for similar or synonymous titles (i.e. Product Designer & UX/UI Designer).
