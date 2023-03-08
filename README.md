# Calculator Chrome Extension
Easy-to-use calculator displayed in a Chrome extension.


## 🎥 Video Demo: https://drive.google.com/file/d/1EtQq_rD4hYJ_iZVw75_FMUpmJ-Ru4_Yy/view?usp=share_link


## 📦 Installation
1. Open a new tab in Chrome.
2. Click the three dots at the top right corner of the screen.
3. Select "More tools".
4. Select "Extensions".
5. Click on "Developer mode".
![Chrome extensions](https://i.ibb.co/N7MwfQ8/Installation.png)
6. Click "Load unpacked".
![Developer mode](https://i.ibb.co/0YStL28/Installation.png)
7. Select the extension's folder.
![Load Unpacked](https://i.ibb.co/7JPzynh/Installation.png)


## 💡 Inspiration
I often found myself doing math homework on my computer but always searching "Calculator" in a new browser tab in order to solve simple calculations.
As my Internet connection is not always fast, I lost a lot of valuable time waiting until my browser's default calculator was fully loaded.
In consequence, after finishing CS50x, I thought that a good idea for my final project would be creating a Chrome extension that can solve basic mathematical calculations in a fast and elegant way.


## 📝 Description
`index` is an HTML file that configures the GUI. It is divided in:
- `Container-Input`: Handles the buttons the user can interact with.
- `Container-Output`: It returns the current status of the calculation and, when the user clicks the equal button, its result.

`styles` is a CSS file that styles the HTML and describes the way the HTML objects should be displayed. It contains the document's color palette, as well as the HTML and calculator properties.
  - The output textboxes are styled using the CSS flexbox.
  - The HTML buttons are ordered using the CSS grid.

`script` is a JavaScript file that configures the calculator functionalities using three main variables:
- `Current_number` stores the number the user is currently typing. Every time the user adds digits to the number, `updateNumber()` is called and the variable changes.
- `Decimals` stores the number of decimals the `current_number` has. When the user clicks the decimal operator, decimals is initialized to 1 and, from that moment on, it will increase every time the user adds a digit.
- `Calculation[]` stores the current calculation. Each element stores a number that can't be modified or an operator.
	- `AddOperator()` will add the operator selected as long as specific conditions are met. For the sake of clarity, `2√9` will appear in `calculation[]` as `[2, "√", 9]` (inverse order as it should be typed).
	- `Calculate()` will itinerate through every item in the array and:
      1. Spice `["-", 5]` into one item.
      2. Calculate the exponents and roots. For example, `[5, "^", 2] --> [25]`
      3. Calculate multiplications and divisions.
      4. Calculate additions and subtractions.
    
    To improve performance, after each step is over, the calculator will check if the calculation is over.
    
    The result will be stored in `calculation[0]` and displayed in the HTML. It will shrink or grow according to the number of digits it has.

In addition, `script.js` supports keyboard input by constantly checking if special keys were pressed.

`manifest` is a JSON file that specifies basic metadata about the extension.
As the calculator will only be opened when it is clicked, the "action" property specifies that `index.html` will be opened when `icon.png` is clicked.
It also contains a description, author information, the current version, and a link to the source code.


## 🌎 Contributing
Feel free to add pull requests.


<<<<<<< HEAD
## 🧾 License: [GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0)
=======
## 🧾 License: [GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0)
>>>>>>> 146b483510f3486a4c3e7a9167c7ce7f8aabf35c
