# The Frontend for the Calendar Web Application

## Usage
### Login/Registration
To use the WebApp you first have to register. \
Once you have created your account you can log in to access your calendar. \

When opening the homepage you will have the option to either login or create an account \
![Homepage](https://user-images.githubusercontent.com/57360857/72202125-40fa4300-345c-11ea-8fd9-6d62f5bce303.png)

### Calendar
After successfull registration or login, you will be forwarded to the calendar page
![Calendar page](https://user-images.githubusercontent.com/57360857/72202210-fd540900-345c-11ea-85e9-71f1318ea887.png)

#### Navigation
The navigation of the calendar is implemented in the Menu Bar.
The Menu Bar looks as shown below:
![Navigation Bar](https://user-images.githubusercontent.com/57360857/72202449-ee228a80-345f-11ea-89b4-0a890a69843d.png)

On the left you can navigate to the current day. Note that the calendar will automatically open up on the current day. \
However, if you navigated to a different month, it will help you get to the current day faster.

Next to the 'Today' Button, you will see 2 arrow-buttons. Use them to navigate forward or backward. \
On the right of these buttons, there is a label showing which days are currently displayed.

Then, on the very right of the menu bar, you can choose how many days you would like to have displayed. \
The current version supports the following views:
- 1 Day
- 4 Day
- 1 Week
- 1 Month
You can change it by using the dropdown menu on the very right.

#### Holidays
By default, national holidays from Austria will be displayed. This can be changed via the dropdown menu on the top right.
The holidays will be displayed in a orange color. \
Currently the application supports holidays from: 
- Austria
- Australia
- USA
- Japan 

In future versions, more countries can be added upon demand.

#### Events
The calendar displays all Events, which you have added, in a blue color \
In the current version, only "full-day" Events can be added. Events with start and end time will be added in a later version. \
Events have a description and a name. The description of the event can be shown by clicking on the event. \
The click on the event will open up a popup menu as shown below:
![Popup Menu](https://user-images.githubusercontent.com/57360857/72202287-cc280880-345d-11ea-95dd-9f8cb2e08f6e.png)

By clicking the edit button, the textfields showing the details and the name will be editable. \
![Editable Popup Menu](https://user-images.githubusercontent.com/57360857/72202332-80299380-345e-11ea-97fa-aeef8077e93b.png)
After editing, you can save the changes by clicking save, or discard the changes by clicking close.

Adding events can be done by clicking the 'Add Event' button on the left of the menu bar.
Clicking the button will open a popup menu, which will look like this:
![Add Event Popup](https://user-images.githubusercontent.com/57360857/72202668-828dec80-3462-11ea-97a4-981a545f0360.png)
After entering the information needed (Name and Date is mandatory, Details is optional) you can add the event by clicking the 'Create Event' Buttton






