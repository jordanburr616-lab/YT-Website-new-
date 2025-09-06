//Days worked on 5/8/2025, 5/12/2025, 5/13/2025, 5/15/2025, 5/20/2025, 5/21/2025, 5/26/2025

/*Part 1: Create a function called addTask that takes a string (the task name) and adds it to a list of tasks (an array). Each task should be stored as an object with two properties:

name: the string

completed: a boolean (default to false) */


//Part 2: Write a function called toggleComplete(index) that switches the complete status of the task at the given index.


/*Part 3: Write a function called removeTask(index) that removes the task at the given index from the tasks array.

You can use the splice() method to remove a task at the specific index. Here’s how splice() works:

 array.splice(index, 1) removes one element at the given index.*/


//Part 4: Write a function called markAllComplete() that sets the complete property to true for all tasks in the array.


//Part 5: Write a function called clearAllTasks() that removes all tasks from the tasks array.


//Part 6: Write a function called countTasks() that returns the total number of tasks in the tasks array. You can simply return the length of the tasks array.


/*Part 7: Edit Task: Add a function editTask(index, newName) that allows you to update the name of a task at a given index.

Priority Levels: Add a priority level (low, medium, high) to each task when it’s created. You can add an extra argument to addTask(name, priority) to include this.

Sort Tasks: Add a function sortTasks() that sorts the tasks by priority or completion status.*/


/*Part 8: Write a function called filterTasks that takes an object like this:

{ complete: true, priority: "high", keyword: "code" }
…and returns only tasks that match all non-null filters.

complete is a boolean (true/false) or null if the filter should be skipped.

priority is a string ("high", "medium", "low") or null.

keyword is a string to match inside the objective, or null. */


/*Part 9: Next Feature: Projects (a.k.a. Lists or Categories)
You're going to:

Group tasks under named projects (like "Homework", "Chores", "Games").

Be able to add, remove, and list tasks within a project.

Support filtering and sorting tasks per project, too. */


/*Part 10: You're managing tasks within projects now. The natural next step is managing projects themselves.

Here are the features you might want to implement next — you decide how to approach them:

List all existing projects, optionally with how many tasks they contain.

Rename a project (e.g., from "daily" to "routine").

Delete a project entirely, including its tasks. */


//Part 11: Create 2 methods that will save and load the projects (I had AI help me through this part)


//Part 12: Let’s add the ability to export your project list to a JSON file, and then import from it. This is super useful for backups or sharing your task data.(AI also helped)

const fs = require('fs');
const path = './projects.json';

let projects = {};
//let tasks = []; (First 8 Parts)

const checkProject = projectName => { //Checks if the project exists, if it doesn't exist then it will create a new project
    if(!projects[projectName]){
        projects[projectName] = [];
    }
}

const addTask = (projectName, name, need) => { //Adds tasks based off mainly their objective but also adds priority if added
    
    checkProject(projectName);

    projects[projectName].push({
        objective: name, 
        complete: false, 
        priority: need === undefined ? 'medium' : need
    });
}

const toggleComplete = (projectName, index) => { //Changes specific tasks to incomplete or complete by their index
    const task = projects[projectName][index];
    task.complete = !task.complete;
}

const removeTask = (projectName, index) => { //Remove a specific task using the index
    projects[projectName].splice(index, 1);
}

const markAllComplete = projectName => { //Marks all tasks complete
    for(let i = 0; i < tasks.length; i++){
        projects[projectName][i].complete = true;
    }
}

const clearAllTasks = projectName => { //Will clears out tasks
    projects[projectName].length = 0;
}

 const countTasks = projectName => { //Count's the tasks, returns the count
    return projects[projectName].length;
}

const editTask = (projectName, index, newName) => { //Modify tasks
    projects[projectName][index].objective = newName;
}

const sortTasks = projectName => { //Function that organizes tasks by completion & calls to sortPriority for help

    let complete = [];
    let incomplete = [];
    for(let i = 0; i < projects[projectName].length; i++){
        let mainTask = projects[projectName];
        let current = projects[projectName][i].complete;
        if(current){complete.push(mainTask[i]); }
        else{incomplete.push(mainTask[i]);}
    }
    complete = sortPriority(complete);
    incomplete = sortPriority(incomplete);
    projects[projectName] = incomplete.concat(complete);
}

const sortPriority = (section) => { //Helper for sortTasks (Organizes tasks by priority)
    let high = [];
    let medium = [];
    let low = [];
    for(let i = 0; i < section.length; i++){
        if(section[i].priority === 'high'){high.push(section[i]);}
        else if(section[i].priority === 'medium'){medium.push(section[i]);}
        else{low.push(section[i]);}
    }
    return high.concat(medium.concat(low));
}

const filterTasks = (projectName, name, complete, priority) => { //Gets info from call then returns a list of the desired filter

    let mainTask = projects[projectName];
    let contents = [];
    
    for(let i = 0; i < mainTask.length; i++){

        const current = mainTask[i];

        if((name === null || current.objective.toLowerCase().includes(name.toLowerCase())) && 
           (complete === null || complete === current.complete) && 
           (priority === null || priority === current.priority)){
            contents.push(current);
        }
    }

    return contents;
}

const countProjects = () => { // This version can be improved but still got the right solution.

    let count = 0;
    let taskCounter = [];
    let listProjects = Object.keys(projects);
    while(count < listProjects.length){
        let tempCounter = 0;
        for(let j = 0; j < projects[listProjects[count]].length; j++){
            tempCounter++;
        }
        taskCounter.push(tempCounter);
        count++;
    }

    console.log(`Total projects: ${count}`);

    for(let i = 0; i < taskCounter.length; i++){
        console.log(`For project ${listProjects[i]}, there are ${taskCounter[i]} tasks to be done.`);
    }
}

const renameProject = (before, after) => {
    if(projects[before]){
        projects[after] = projects[before];
        delete projects[before]; //removes old project name
        return after;
    }else{
        console.log('Error, project does not exist but we just created one for you');
        return null;
    }
}

const deleteProject = (name) => {

    if(projects[name]){
    delete projects[name];
    console.log('The project has been deleted!');
    }else{
        console.log('Error, cannot find project')
    }
}

const saveProjects = () => {
    fs.writeFileSync(path, JSON.stringify(projects, null, 2), 'utf-8');
    console.log('Projects saved!');

/*path: the filename (like "projects.json")

JSON.stringify(): turns your projects object into a text string

'utf-8': tells it to save the text in a standard format*/

}

const loadProjects = () => {
    if (fs.existsSync(path)) {
        const data = fs.readFileSync(path, 'utf-8');
        projects = JSON.parse(data);
        console.log('Projects loaded!');
    } else {
        console.log('No saved project file found.');
    }

/*fs.readFileSync(): grabs the file content as a string

JSON.parse(): turns the text string back into an object you can work with*/

}

const exportProjects = (filename) => {
    fs.writeFileSync(filename, JSON.stringify(projects, null, 2), 'utf-8');
    console.log(`Projects exported to ${filename}`);

/*This function saves all your current project/task data to a JSON file.

JSON.stringify(..., null, 2) makes it nicely formatted with indentation.

fs.writeFileSync() writes the string to the file on disk.

// Great for backing up or sharing task lists.*/

}

const importProjects = (filename) => {
    const data = fs.readFileSync(filename, 'utf-8');
    projects = JSON.parse(data);
    console.log(`Projects imported from ${filename}`);

/*This function loads your task/project data from a saved file.

fs.readFileSync() reads the file contents.

JSON.parse() turns the string back into the original object.

Replaces the current projects variable with the imported data.*/
}

addTask('daily', 'Brush Teeth', 'medium');
addTask('freetime', 'Play Minecraft', 'high');
addTask('freetime', 'Play Fortnite', 'low');
addTask('daily', 'Kill Harambe', 'high');
addTask('freetime', 'Dab', 'medium')

console.log(`There are ${countTasks('daily')} daily tasks needed to be done.`);
console.log(`There are ${countTasks('freetime')} freetime tasks needed to be done.`);

toggleComplete('daily', 0);
sortTasks('daily');
console.log('');
console.log('Daily tasks organized & updated: ')
console.log(projects['daily'][0]);
console.log(projects['daily'][1]);

const result = filterTasks('freetime', 'Play', false, null);
console.log('');
console.log('Freetime tasks that still need to be done: ');
for(let task of result){
    console.log(task);
}

console.log('');
countProjects();

console.log('');
console.log(`I changed the first project name from ${Object.keys(projects)[0]} to ${renameProject(Object.keys(projects)[0], 'everyday')}`)

deleteProject('everyday');

console.log('');
addTask('daily', 'Do dishes', 'high');
saveProjects(); // saves to projects.json
loadProjects(); // loads from projects.json

console.log('');
addTask('daily', 'Eat cereal', 'low');
exportProjects('backup.json');

projects = {}; // wipe it
console.log(projects); // should be empty

importProjects('backup.json');
console.log(projects['freetime'][0]); // should have your stuff back!
console.log(projects['freetime'][1]);
console.log(projects['freetime'][2]);
console.log(projects['daily'][0]);
console.log(projects['daily'][1]);

//Stopped work on it on 5/26/2025