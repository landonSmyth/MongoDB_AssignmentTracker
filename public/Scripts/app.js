/* SPA --> Single Page Application */
/* Client Side */

//IIFE Immeidately invoked function expression 
(function(){
    function Start()
    {
        console.log("Application Started");
        let deleteButton = document.querySelectorAll('#delButton');
        //Delete confirmation function 
        for(button of deleteButton)
    {
        button.addEventListener('click', (event)=>{
            //Prompts the user to confirm that they wish to delete the entry 
            if(!confirm("Are you sure?"))
            {
                event.preventDefault();
                window.location.assign('/assignment-tracker');
            }
        });
    }
    }
    window.addEventListener("load", Start()); //Window is an object for the browser
})();

