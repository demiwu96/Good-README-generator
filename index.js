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
        console.log(color);
        // create badge url
        const badgeURL = `https://img.shields.io/badge/${label}-${msg}-${color}`;
        console.log(badgeURL);

        // information from inquirer for the README
        const title = response.title;
        const description = response.description;
        const contents = response.contents;
        const installation = response.installation;
        const usage = response.usage;
        const license = response.license;
        const contributor = response.contributor;
        const demoURL = response.demoURL;

    });