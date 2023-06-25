const inquirer = require('inquirer');
const fs = require('fs-extra');

// Prompt for color selection. Will add hexi colors later
function promptColor() {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'color',
      message: 'Select a color:',
      choices: ['red', 'green', 'blue'],
    },
  ]);
}

// Prompt for shape selection
function promptShape() {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'shape',
      message: 'Select a shape:',
      choices: ['circle', 'square', 'triangle'],
    },
  ]);
}

// Prompt for text input
function promptText() {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'text',
      message: 'Enter text for the logo:',
    },
  ]);
}

// Generate the SVG logo
function generateLogo(color, shape, text) {
  const svg = `<svg width="200" height="200">
    <rect width="200" height="200" fill="${color}" />
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="20">${text}</text>
    <${shape} cx="100" cy="100" r="50" fill="white" />
  </svg>`;

  return svg;
}

// Save the SVG logo to a file
function saveLogoToFile(logo, filename) {
  fs.outputFile(filename, logo)
    .then(() => {
      console.log(`Logo saved as ${filename}`);
    })
    .catch((err) => {
      console.error('Error saving logo:', err);
    });
}

// Main function
async function run() {
  try {
    const { color } = await promptColor();
    const { shape } = await promptShape();
    const { text } = await promptText();

    const logo = generateLogo(color, shape, text);
    const filename = 'logo.svg';

    saveLogoToFile(logo, filename);
  } catch (err) {
    console.error('An error occurred:', err);
  }
}

// Run the application
run();
