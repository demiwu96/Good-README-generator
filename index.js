const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

const questions = [{
    message: "Enter your GitHub username",
    name: "username"
},
{
    message: "Label of your badge",
    name: "badgeLabel"
},
{
    message: "Message of your badge",
    name: "badgeMsg"
},
{
    type: 'list',
    message: "Color of your badge",
    name: "badgeColor",
    choices: ["brightgreen", "green", "yellowgreen", "yellow", "orange", "red", "blue", "lightgrey"]
},
{
    message: "Enter your project title",
    name: "title"
},
{
    message: "Enter a description",
    name: "description"
},
{
    message: "Table of contents",
    name: "contents"
},
{
    message: "Installation requirement?",
    name: "installation"
},
{
    message: "Describe the usage",
    name: "usage"
},
{
    message: "License",
    name: "license"
},
{
    message: "Who contribute to this project?",
    name: "contributor"
},
{
    message: "Demo link:",
    name: "demoURL"
}];

inquirer
    .prompt(questions)
    .then(function (response) {
        // badge information
        const msg = response.badgeMsg;
        const color = response.badgeColor;
        const label = response.badgeLabel;
        // create badge url
        const badgeURL = `https://img.shields.io/badge/${label}-${msg}-${color}`;

        // information from inquirer for the README
        const title = response.title;
        const description = response.description;
        const contents = response.contents;
        const installation = response.installation;
        const usage = response.usage;
        const license = response.license;
        const contributor = response.contributor;
        const demoURL = response.demoURL;

        // To get the user email and profile img
        const username = response.username;
        const queryUrl = `https://api.github.com/users/${username}`;
        axios
            .get(queryUrl)
            .then(function (response) {
                const data = response.data;
                const avatar = data.avatar_url;
                let email = data.email;
                if (email == null) {
                    email = "Sorry no email information";
                }

                const markDown = `
# ${title}
## Badges
![badge](${badgeURL}.svg)
## Description
${description}
## Table of Contents
${contents}
## Installation
${installation}
## Usage
${usage}
## License
${license}
## Contributing
${contributor}
## Demo
![demo link](${demoURL})
## Questions
If you have any questions, please contact ${username}.
Email: ${email}
<img src="${avatar}" width:"120" />
`;

                fs.writeFile("README-new.md", markDown, function (e) {
                    if (e) {
                        console.log(e);
                    } else {
                        console.log("Successful!");
                    };
                });
            });
    });